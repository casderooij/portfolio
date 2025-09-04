import { useProjectsSphereContext } from './ProjectsSphereProvider'

export function ProjectsSphereInfo() {
  const info = useProjectsSphereContext((state) => state.info)

  return (
    <div className="absolute right-4 bottom-4 rounded-lg bg-white p-4 shadow-2xl">
      {info}
    </div>
  )
}
