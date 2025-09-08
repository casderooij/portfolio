const MAX_OPACITY_VALUE = 0.75

type ItemAnimationProps = {
  element: HTMLElement
  fromAngle: number
  toAngle: number
  fromOpacity: number
  toOpacity: number
}

function ease(v: number, pow = 4) {
  return 1 - Math.pow(1 - v, pow)
}

function animateStack(items: ItemAnimationProps[], duration: number) {
  const start = performance.now()

  function frame(time: number) {
    const elapsed = time - start
    const progress = Math.min(elapsed / duration, 1)

    items.forEach((item) => {
      const angle =
        item.fromAngle + (item.toAngle - item.fromAngle) * ease(progress)
      item.element.style.setProperty('--angle', angle + 'deg')

      const opacity =
        item.fromOpacity + (item.toOpacity - item.fromOpacity) * ease(progress)
      item.element.style.setProperty('--fog-opacity', opacity.toString())
    })

    if (progress < 1) {
      requestAnimationFrame(frame)
    }
  }

  requestAnimationFrame(frame)
}

export class Stack {
  stackElement: HTMLElement
  stackItems: HTMLElement[]
  numberOfStackItems: number
  topStackItem: HTMLElement
  indicatorElement: HTMLElement | null
  itemAngles: number[]
  offset: number

  constructor(stackElement: HTMLElement) {
    this.stackElement = stackElement
    this.stackItems = Array.from(
      stackElement.querySelectorAll('.stack-item'),
    ) as HTMLElement[]
    this.numberOfStackItems = this.stackItems.length
    this.topStackItem = this.stackItems[0]
    this.indicatorElement = stackElement.querySelector('#indicator')
    this.itemAngles = []
    this.offset = 0

    this.intialize()
  }

  async intialize() {
    const offsetString = getComputedStyle(this.stackElement).getPropertyValue(
      '--offset',
    )
    this.offset = parseInt(offsetString) || -80

    this.stackItems.forEach((item, index) => {
      item.dataset.index = index.toString()
      item.style.setProperty('--stack-i', index.toString())

      const angle = index * (360 / this.numberOfStackItems) + this.offset
      this.itemAngles[index] = angle
      item.style.setProperty('--angle', angle + 'deg')

      const opacity =
        (index / (this.numberOfStackItems - 1)) * MAX_OPACITY_VALUE
      item.style.setProperty('--fog-opacity', opacity.toString())
    })

    const observer = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0]

      const topItemVideo = this.getVideo(this.topStackItem)
      if (!topItemVideo) return

      if (isIntersecting && topItemVideo.paused) {
        topItemVideo.play()
      } else if (!isIntersecting) {
        topItemVideo.pause()
      }
    })
    observer.observe(this.stackElement)

    if (this.numberOfStackItems === 1) {
      return
    }

    this.updateIndicator()

    this.stackElement.addEventListener('click', () => {
      this.updateStackIndex()
      this.pauseAndHideTopItem()
      this.updateIndicator()
    })

    this.stackItems.forEach((item) => {
      if (item.dataset.index !== '0') {
        item.classList.remove('is-hidden')
      } else {
        const video = this.getVideo(item)
        if (video) {
          video.play()
        }
      }
    })
  }

  getVideo(stackItem: HTMLElement) {
    return stackItem.querySelector('video')
  }

  getTopItem() {
    return this.stackItems.find(
      (item) => parseInt(item.dataset.index || '0') === 0,
    )
  }

  getCurrentStackIndex() {
    return parseInt(this.stackElement.dataset.index || '0')
  }

  shiftItems() {
    const newAngles = [...this.itemAngles]
    const itemsToAnimate: ItemAnimationProps[] = []

    this.stackItems.forEach((item, i) => {
      const logicalIndex = parseInt(item.dataset.index || '0')
      const currentAngle = this.itemAngles[i]
      const fromOpacity =
        (logicalIndex / (this.numberOfStackItems - 1)) * MAX_OPACITY_VALUE

      const nextLogicalIndex =
        (logicalIndex - 1 + this.numberOfStackItems) % this.numberOfStackItems

      const newAngle =
        nextLogicalIndex * (360 / this.numberOfStackItems) + this.offset
      newAngles[i] = newAngle

      let targetAngleForAnimation = newAngle
      const diff = targetAngleForAnimation - currentAngle
      if (diff > 180) {
        targetAngleForAnimation -= 360
      } else if (diff < -180) {
        targetAngleForAnimation += 360
      }

      const toOpacity =
        (nextLogicalIndex / (this.numberOfStackItems - 1)) * MAX_OPACITY_VALUE

      itemsToAnimate.push({
        element: item,
        fromAngle: currentAngle,
        toAngle: targetAngleForAnimation,
        fromOpacity,
        toOpacity,
      })

      item.dataset.index = nextLogicalIndex.toString()
      item.style.setProperty('--stack-i', nextLogicalIndex.toString())
    })

    animateStack(itemsToAnimate, 800)

    this.itemAngles = newAngles
  }

  playTopItem() {
    const topItem = this.getTopItem()
    if (!topItem) return

    const video = topItem.querySelector('video')
    if (!video) return
    video.play()
  }

  updateStackIndex() {
    const nextIndex =
      (this.getCurrentStackIndex() + 1) % this.numberOfStackItems
    this.stackElement.dataset.index = nextIndex.toString()
  }

  pauseAndHideTopItem() {
    const topItem = this.getTopItem()

    if (topItem) {
      topItem.classList.add('fading-out')
      topItem.addEventListener(
        'transitionend',
        () => {
          const video = this.getVideo(topItem)
          if (video) {
            video.pause()
          }

          this.shiftItems()
          this.playTopItem()

          // Allow DOM to update before removing the class
          setTimeout(() => {
            topItem.classList.remove('fading-out')
          }, 0)
        },
        { once: true },
      )
    }
  }

  updateIndicator() {
    if (!this.indicatorElement) return

    const index = this.getCurrentStackIndex()
    const indicatorString = Array.from(
      { length: this.stackItems.length },
      (_, i) => (i === index ? '#' : '-'),
    ).join('')

    this.indicatorElement.textContent = indicatorString
  }
}
