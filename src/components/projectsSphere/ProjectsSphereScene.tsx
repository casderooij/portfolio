import { animated, useSpring } from '@react-spring/web'
import { TrackballControls, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
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
  const [isSmallScreen, setIsSmallScreen] = useState(true)

  const { opacity } = useSpring({
    opacity: progress === 100 ? 1 : 0,
    config: { duration: 1000 },
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const listener = () => {
      if (mediaQuery.matches) {
        setIsSmallScreen(true)
      } else {
        setIsSmallScreen(false)
      }
    }
    listener()
    mediaQuery.addEventListener('change', listener)
    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }, [])

  return (
    <animated.div style={{ opacity }} className="h-full">
      <Canvas
        className="bg-bg"
        camera={{ position: [0, 0, 7], fov: 75 }}
        style={{ height: '100vh' }}
      >
        <fog attach="fog" args={['#f0f0f0', 4, 10]} />
        <ProjectsSphere
          media={media}
          radius={isSmallScreen ? MOBILE_RADIUS : DESKTOP_RADIUS}
        />
        <TrackballControls noZoom rotateSpeed={isSmallScreen ? 1 : 2} />
      </Canvas>
    </animated.div>
  )
}
