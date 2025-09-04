import { useVideoTexture } from '@react-three/drei'
import { useEffect } from 'react'

interface VideoMaterialProps {
  url: string
  inView: boolean
}

export function VideoMaterial({ url, inView }: VideoMaterialProps) {
  const texture = useVideoTexture(
    'http://localhost:4321/one-minute-capture.mp4',
    {
      loop: true,
      muted: true,
    },
  )

  useEffect(() => {
    if (inView) {
      texture.source.data.play()
    } else {
      texture.source.data.pause()
    }
  }, [inView, texture])

  return <meshBasicMaterial map={texture} toneMapped={false} />
}
