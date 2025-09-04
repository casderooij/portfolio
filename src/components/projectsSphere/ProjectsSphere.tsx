import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { MediaItem } from './MediaItem'
import { type ProjectItem } from './ProjectsSphereScene'
import { useProjectsSphereContext } from './ProjectsSphereProvider'

interface ProjectsSphereProps {
  radius?: number
  media: ProjectItem[]
}

export function ProjectsSphere({ radius = 4, media }: ProjectsSphereProps) {
  const ref = useRef<THREE.Group | null>(null)
  const [active, setActive] = useState(null)

  const count = media.length
  const setInfo = useProjectsSphereContext((state) => state.setInfo)

  const positions = useMemo(() => {
    const points = []
    const phi = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      let y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = phi * i
      const x = Math.cos(theta) * r
      const z = Math.sin(theta) * r
      points.push(new THREE.Vector3(x, y, z).multiplyScalar(radius))
    }
    return points
  }, [count, radius])

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
    setActive(selectedChild?.userData.id)
    if (selectedChild) {
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
