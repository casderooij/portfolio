import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { TrackballControls, useProgress } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/web'
import { Sphere } from './Sphere'
// import { useSceneStoreContext } from './SceneProvider';

export type ProjectItem = {
  type: 'video' | 'image'
  url: string
}

export default function ProjectsSphereScene() {
  const { progress } = useProgress()
  const { opacity } = useSpring({
    opacity: progress === 100 ? 1 : 0,
    config: { duration: 2000 },
  })

  const media: ProjectItem[] = [
    {
      type: 'video',
      url: 'https://casderooij.nl/media/pages/artifacts/marching-squares/80f96d04dd-1752743595/marching-squares.mp4',
    },
    {
      type: 'video',
      url: 'https://casderooij.nl/media/pages/artifacts/green-hills/5713eae94f-1752694913/green-hills.mp4',
    },
    {
      type: 'video',
      url: 'https://casderooij.nl/media/pages/artifacts/running-horses/cbc5712bb9-1752683967/running-horses.mp4',
    },
    {
      type: 'video',
      url: 'https://casderooij.nl/media/pages/artifacts/lang-stack/060c006187-1752680354/lang-stack-recording.mp4',
    },
    {
      type: 'video',
      url: 'https://casderooij.nl/media/pages/artifacts/lang-stack-cli/update-1/b05ca7a2fc-1753112231/screen-recording.mp4',
    },
    {
      type: 'video',
      url: 'https://casderooij.nl/media/pages/artifacts/sliding-ui/9b1a9c1afc-1753260642/sliding-ui-2.mp4',
    },
    {
      type: 'video',
      url: 'https://casderooij.nl/media/pages/artifacts/marching-squares/lowres/f4dcc90cd6-1754575657/lowres.mp4',
    },
    {
      type: 'video',
      url: 'https://casderooij.nl/media/pages/artifacts/organic-charts/multiple/98695dd619-1756302699/screen-recording-2025-08-22-at-16.02.32.mp4',
    },

    {
      type: 'image',
      url: 'https://casderooij.nl/media/pages/artifacts/ping-pong/9dca1dfe09-1753084826/ping-pong-sketch-400x.webp',
    },
  ]

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
          <Sphere media={media} />
        </Suspense>
        <TrackballControls noZoom rotateSpeed={2} />
      </Canvas>
    </animated.div>
  )
}
