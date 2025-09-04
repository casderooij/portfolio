import { useVideoTexture } from '@react-three/drei'
import { useEffect } from 'react'

interface VideoMaterialProps {
  url: string
  inView: boolean
}

export function VideoMaterial({ url, inView }: VideoMaterialProps) {
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
