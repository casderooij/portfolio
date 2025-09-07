import { ProjectsSphereInfo } from './ProjectsSphereInfo'
import ProjectsSphereProvider from './ProjectsSphereProvider'
import ProjectsSphereScene from './ProjectsSphereScene'

export function ProjectsSphereWrapper() {
  return (
    <div className="relative h-screen w-screen">
      <ProjectsSphereProvider>
        <ProjectsSphereScene />
        <ProjectsSphereInfo />
      </ProjectsSphereProvider>
    </div>
  )
}
