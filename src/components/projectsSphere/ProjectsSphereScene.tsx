import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { TrackballControls, useProgress } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/web'
import { ProjectsSphere } from './ProjectsSphere'

export type ProjectItem = {
  type: 'video' | 'image'
  url: string
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
    config: { duration: 2000 },
  })

  return (
    <animated.div style={{ opacity }} className="h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 75 }}
        style={{ height: '100vh', backgroundColor: '#f0f0f0' }}
      >
        <fog attach="fog" args={['#f0f0f0', 7, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <ProjectsSphere media={media} />
        </Suspense>
        <TrackballControls noZoom rotateSpeed={2} />
      </Canvas>
    </animated.div>
  )
}
