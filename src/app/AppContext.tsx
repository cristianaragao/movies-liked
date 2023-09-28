import React, { createContext, useContext, useState } from "react"


const _controllerApp = () => {

  const [ready, setReady] = useState(true)

  return {
    ready,
    setReady,
  }
}

export const AppContext = createContext(
  {} as ReturnType<typeof _controllerApp>
)

export const useApp = () => useContext(AppContext)

export const AppProvider = (props: { children: React.ReactNode }) => {
  const controller = _controllerApp()
  return (
    <AppContext.Provider value={controller}>
      {props.children}
    </AppContext.Provider>
  )
}
