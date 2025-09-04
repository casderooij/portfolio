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
const DESKTOP_Y_SCALE = 1
const MOBILE_RADIUS = 2.5
const MOBILE_Y_SCALE = 1

export default function ProjectsSphereScene({
  media,
}: ProjectsSphereSceneProps) {
  const { progress } = useProgress()
  const [radius, setRadius] = useState(DESKTOP_RADIUS)
  const [yScale, setYScale] = useState(DESKTOP_Y_SCALE)

  const { opacity } = useSpring({
    opacity: progress === 100 ? 1 : 0,
    config: { duration: 1000 },
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const listener = () => {
      if (mediaQuery.matches) {
        setRadius(MOBILE_RADIUS)
        setYScale(MOBILE_Y_SCALE)
      } else {
        setRadius(DESKTOP_RADIUS)
        setYScale(DESKTOP_Y_SCALE)
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
        <ProjectsSphere media={media} radius={radius} yScale={yScale} />
        <TrackballControls noZoom rotateSpeed={2} />
      </Canvas>
    </animated.div>
  )
}
