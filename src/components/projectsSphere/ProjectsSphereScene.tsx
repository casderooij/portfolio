import { animated, useSpring } from '@react-spring/web'
import { TrackballControls, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { ProjectsSphere } from './ProjectsSphere'

export type ProjectItem = {
  url: string
  type: 'video' | 'image'
  aspect: number
}

interface ProjectsSphereSceneProps {
  media: ProjectItem[]
}

export default function ProjectsSphereScene({
  media,
}: ProjectsSphereSceneProps) {
  const { progress } = useProgress()
  const { opacity } = useSpring({
    opacity: progress === 100 ? 1 : 0,
    config: { duration: 1000 },
  })

  return (
    <animated.div style={{ opacity }} className="h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 75 }}
        style={{ height: '100vh', backgroundColor: '#f0f0f0' }}
      >
        <fog attach="fog" args={['#f0f0f0', 4, 10]} />
        <ProjectsSphere media={media} />
        <TrackballControls noZoom rotateSpeed={2} />
      </Canvas>
    </animated.div>
  )
}
