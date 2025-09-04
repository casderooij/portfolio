import { useProjectsSphereContext } from './ProjectsSphereProvider'

export function ProjectsSphereInfo() {
  const info = useProjectsSphereContext((state) => state.info)

  return <div className="absolute right-0 bottom-0 bg-white">{info}</div>
}
