import { type Vector3 } from 'three'
import { animated as animatedThree, useSpring } from '@react-spring/three'
import { Billboard, Image } from '@react-three/drei'
import { VideoMaterial } from './VideoMaterial'
import type { ProjectItem } from './ProjectsSphereScene'

interface MediaItemProps {
  id: string
  item: ProjectItem
  inView: boolean
  position: Vector3
}

export function MediaItem({ id, item, inView, position }: MediaItemProps) {
  const { scale } = useSpring({
    scale: inView ? 2 : 1,
    config: { mass: 1, tension: 170, friction: 26 },
  })

  return (
    <animatedThree.group
      scale={scale}
      position={position}
      userData={{ id, item }}
    >
      <Billboard>
        {item.type === 'video' ? (
          <mesh>
            <planeGeometry args={[1, 1]} />
            <VideoMaterial url={`${item.url}`} inView={inView} />
          </mesh>
        ) : (
          <Image url={item.url} scale={[1, 1]} transparent />
        )}
      </Billboard>
    </animatedThree.group>
  )
}
