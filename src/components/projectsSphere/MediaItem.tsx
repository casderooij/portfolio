import { animated as animatedThree, useSpring } from '@react-spring/three'
import { Billboard, Image } from '@react-three/drei'
import { type Vector3 } from 'three'
import type { ProjectItem } from './ProjectsSphereScene'
import { VideoMaterial } from './VideoMaterial'

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
            <VideoMaterial url={`${item.url}#${id}`} inView={inView} />
          </mesh>
        ) : (
          <Image url={item.url} scale={[0, 0]} transparent />
        )}
      </Billboard>
    </animatedThree.group>
  )
}
