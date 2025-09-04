import { ProjectsSphereInfo } from './ProjectsSphereInfo'
import ProjectsSphereProvider from './ProjectsSphereProvider'
import type { ProjectItem } from './ProjectsSphereScene'
import ProjectsSphereScene from './ProjectsSphereScene'

interface ProjectsSphereWrapperProps {
  media: ProjectItem[]
}

export function ProjectsSphereWrapper({ media }: ProjectsSphereWrapperProps) {
  return (
    <div className="relative h-screen w-screen">
      <ProjectsSphereProvider>
        <ProjectsSphereScene media={media} />
        <ProjectsSphereInfo />
      </ProjectsSphereProvider>
    </div>
  )
}
