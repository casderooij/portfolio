import { animated, useSpring } from '@react-spring/web'
import { TrackballControls, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useMedia } from '../hooks/useMedia'
import { ProjectsSphere } from './ProjectsSphere'

export type ProjectItem = {
  url: string
  type: 'video' | 'image'
  aspect: number
  title: string
}

interface ProjectsSphereSceneProps {
  media: ProjectItem[]
}

const DESKTOP_RADIUS = 4
const MOBILE_RADIUS = 3

export default function ProjectsSphereScene({
  media,
}: ProjectsSphereSceneProps) {
  const { progress } = useProgress()
  const isSmallScreen = useMedia({
    initialValue: true,
    mediaQuery: '(max-width: 769px)',
  })

  const { opacity } = useSpring({
    opacity: progress === 100 ? 1 : 0,
    config: { duration: 1000 },
  })

  return (
    <animated.div style={{ opacity }} className="h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 75 }}
        style={{ height: '100vh' }}
      >
        <ProjectsSphere
          media={media}
          radius={isSmallScreen ? MOBILE_RADIUS : DESKTOP_RADIUS}
        />
        <TrackballControls noZoom rotateSpeed={isSmallScreen ? 1 : 2} />
      </Canvas>
    </animated.div>
  )
}
