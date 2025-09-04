import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Image,
  TrackballControls,
  useVideoTexture,
  Billboard,
  useProgress,
} from '@react-three/drei'
import { useSpring, animated } from '@react-spring/web'
import { animated as animatedThree } from '@react-spring/three'
// import { useSceneStoreContext } from './SceneProvider';

const GOLDENRATIO = (1 + Math.sqrt(5)) / 2

function VideoMaterial({ url, inView }) {
  const texture = useVideoTexture(url, {
    loop: true,
    muted: true,
    crossOrigin: 'Anonymous',
  })

  useEffect(() => {
    if (inView) {
      texture.source.data.play()
    } else {
      texture.source.data.pause()
    }
  }, [inView, texture])

  return <meshBasicMaterial map={texture} toneMapped={false} />
}

function MediaItem({ id, item, inView, position }) {
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
          <Image url={item.url} scale={[1, 1]} transparent />
        )}
      </Billboard>
    </animatedThree.group>
  )
}

function MediaSphere({ radius = 4, count = 20, media = [], ...props }) {
  const ref = useRef()
  const [active, setActive] = useState(null)
  // const setInfo = useSceneStoreContext((state) => state.setInfo);

  const positions = useMemo(() => {
    const points = []
    const phi = Math.PI * (3 - Math.sqrt(5)) // golden angle in radians
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2 // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y) // radius at y
      const theta = phi * i // golden angle increment
      const x = Math.cos(theta) * r
      const z = Math.sin(theta) * r
      points.push(new THREE.Vector3(x, y, z).multiplyScalar(radius))
    }
    return points
  }, [count, radius])

  useFrame((state) => {
    let selectedChild = null
    let minDistance = Infinity

    for (const child of ref.current.children) {
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
      // setInfo(selectedChild.userData.item.url);
    }
  })

  return (
    <group ref={ref} {...props}>
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

export default function Scene() {
  const { progress } = useProgress()
  const { opacity } = useSpring({
    opacity: progress === 100 ? 1 : 0,
    config: { duration: 2000 },
  })

  const media = [
    {
      url: '/project-sphere-media/marching-squares.mp4',
      type: 'video',
    },
    {
      url: '/project-sphere-media/green-hills.mp4',
      type: 'video',
    },
    {
      url: '/project-sphere-media/diffusion.mp4',
      type: 'video',
    },
  ]

  return (
    <animated.div style={{ opacity }} className="h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 75 }}
        style={{ height: '100vh', backgroundColor: '#f0f0f0' }}
      >
        <fog attach="fog" args={['#f0f0f0', 4, 10]} />

        <MediaSphere count={media.length} media={media} />

        <TrackballControls noZoom rotateSpeed={2} />
      </Canvas>
    </animated.div>
  )
}
