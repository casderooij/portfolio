import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { media } from '../../mediaSphere'
import { MediaItem } from './MediaItem'
import { useProjectsSphereContext } from './ProjectsSphereProvider'

const PHI = Math.PI * (3 - Math.sqrt(5))

interface ProjectsSphereProps {
  radius?: number
}

export function ProjectsSphere({ radius = 4 }: ProjectsSphereProps) {
  const [active, setActive] = useState(null)
  const setInfo = useProjectsSphereContext((state) => state.setInfo)

  const ref = useRef<THREE.Group | null>(null)
  const count = media.length

  const positions = useMemo(
    () => calculateSpherePositions(count, radius),
    [count, radius],
  )

  useFrame((state) => {
    let selectedChild = null
    let minDistance = Infinity

    for (const child of ref.current!.children) {
      const worldPosition = new THREE.Vector3()
      child.getWorldPosition(worldPosition)
      const distance = state.camera.position.distanceTo(worldPosition)
      if (distance < minDistance) {
        minDistance = distance
        selectedChild = child
      }
    }

    if (selectedChild) {
      setActive(selectedChild.userData.id)
      setInfo(selectedChild.userData.item.title)
    }
  })

  return (
    <group ref={ref} rotation={[0, -2, 0]}>
      {positions.map((pos, i) => {
        const mediaItem = media[i % media.length]
        const id = `item-${i}`
        const inView = active === id
        return (
          <MediaItem
            key={id}
            id={id}
            item={mediaItem}
            inView={inView}
            position={pos}
          />
        )
      })}
    </group>
  )
}

function calculateSpherePositions(numberOfItems: number, radius: number) {
  const points = []

  for (let i = 0; i < numberOfItems; i++) {
    let y = 1 - (i / (numberOfItems - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = PHI * i
    const x = Math.cos(theta) * r
    const z = Math.sin(theta) * r
    points.push(new THREE.Vector3(x, y, z).multiplyScalar(radius))
  }
  return points
}
