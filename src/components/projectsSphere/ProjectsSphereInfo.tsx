import { useProjectsSphereContext } from './ProjectsSphereProvider'
import { useTransition, animated } from '@react-spring/web'

export function ProjectsSphereInfo() {
  const info = useProjectsSphereContext((state) => state.info)

  const transitions = useTransition(info, {
    from: { opacity: 0, y: 80 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 80 },
  })

  return transitions((style, item) => (
    <animated.div
      style={style}
      className="absolute right-4 bottom-4 rounded bg-white/80 px-4 py-2 text-2xl backdrop-blur-sm"
    >
      {item}
    </animated.div>
  ))
}
