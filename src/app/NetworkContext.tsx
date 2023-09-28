import React, { createContext, useContext, useEffect, useState } from "react"

import NetInfo, { NetInfoState } from "@react-native-community/netinfo"
import { useApp } from "./AppContext"

const _controllerNetwork = () => {
  const [isConnected, setIsConnected] = useState(true)

  const [show, setShow] = useState<"connected" | "not_connected" | "nothing">(
    "nothing"
  )

  const [firstView, setFirstView] = useState(true)

  const { ready } = useApp()

  console.log("ready ", ready)
  console.log("show ", show)

  useEffect(() => {

    if(!ready) return;
  
    const handleConnectivityChange = (state: NetInfoState) => {
      
      const newStateFirst = state.isInternetReachable
      ? "nothing"
      : "not_connected"

      const newState = state.isInternetReachable ? "connected" : "not_connected"
      
      if (firstView && newStateFirst !== show) {
        setShow(newStateFirst)
        setFirstView(false)
      }
      
      if (!firstView && newState !== show && state.isInternetReachable !== isConnected) {
        setShow(newState)
      }

      setIsConnected(Boolean(state.isInternetReachable))
    }

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange)

    return () => unsubscribe()
  }, [firstView, show, isConnected])

  return {
    isConnected,
    show,
    setShow,
  }
}

export const NetworkContext = createContext(
  {} as ReturnType<typeof _controllerNetwork>
)

export const useNetwork = () => useContext(NetworkContext)

export const NetworkProvider = (props: { children: React.ReactNode }) => {
  const controller = _controllerNetwork()
  return (
    <NetworkContext.Provider value={controller}>
      {props.children}
    </NetworkContext.Provider>
  )
}
