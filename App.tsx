import { GluestackUIProvider, config } from "@gluestack-ui/themed"
import { AppProvider } from "app/AppContext"
import { NetworkProvider } from "app/NetworkContext"
import { Routes } from "app/Routes"

export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <AppProvider>
        <NetworkProvider>
          <Routes />
        </NetworkProvider>
      </AppProvider>
    </GluestackUIProvider>
  )
}
