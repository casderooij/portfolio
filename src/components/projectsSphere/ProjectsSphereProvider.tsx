import { createContext, useContext, useState, type ReactNode } from 'react'
import { createStore, useStore, type StoreApi } from 'zustand'

type State = {
  info: string
  setInfo: (info: string) => void
}

export const ProjectsSphereContext = createContext<StoreApi<State> | null>(null)

interface ProjectsSphereProviderProps {
  children: ReactNode
}

export default function ProjectsSphereProvider({
  children,
}: ProjectsSphereProviderProps) {
  const [store] = useState(() =>
    createStore<State>()((set) => ({
      info: '',
      setInfo: (info) => set(() => ({ info })),
    })),
  )

  return (
    <ProjectsSphereContext.Provider value={store}>
      {children}
    </ProjectsSphereContext.Provider>
  )
}

export function useProjectsSphereContext<T>(selector: (state: State) => T): T {
  const store = useContext(ProjectsSphereContext)
  if (!store) {
    throw new Error('Missing ProjectsSphereProvider')
  }
  return useStore(store, selector)
}
