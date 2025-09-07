import { useEffect, useState } from 'react'

interface UseMediaProps {
  initialValue: boolean
  mediaQuery: string
}

export function useMedia({ initialValue, mediaQuery }: UseMediaProps) {
  const [isMedia, setIsMedia] = useState(initialValue)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const listener = () => {
      if (mediaQuery.matches) {
        setIsMedia(true)
      } else {
        setIsMedia(false)
      }
    }

    listener()
    mediaQuery.addEventListener('change', listener)

    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }, [mediaQuery])

  return isMedia
}
