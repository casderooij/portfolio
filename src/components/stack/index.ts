type ItemAnimationProps = {
  element: HTMLElement
  fromAngle: number
  toAngle: number
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

      
    })

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
      }
    })
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

      itemsToAnimate.push({
        element: item,
        fromAngle: currentAngle,
        toAngle: targetAngleForAnimation,
      })

      item.dataset.index = nextLogicalIndex.toString()
      item.style.setProperty('--stack-i', nextLogicalIndex.toString())
    })

    animateStack(itemsToAnimate, 800)

    this.itemAngles = newAngles
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
          this.shiftItems()

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
