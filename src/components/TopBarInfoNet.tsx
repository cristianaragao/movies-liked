import { Text, useToken } from "@gluestack-ui/themed"
import { useNetwork } from "app/NetworkContext"
import { PRIMARY_COLOR } from "constants/COLORS"
import { useEffect, useState } from "react"

import { getStatusBarHeight } from "react-native-status-bar-height"

import Animated, { useSharedValue, withTiming } from "react-native-reanimated"

const DURATION = 500

export const TopBarInfoNet = () => {
  const { show, setShow } = useNetwork()

  const height = useSharedValue(0)

  const [color, setColor] = useState(PRIMARY_COLOR)

  const [paddingTop, setPaddingTop] = useState(0)

  const red = useToken("colors", "rose600")
  const green = useToken("colors", "green600")

  const heightBar = getStatusBarHeight()

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined

    if (show === "not_connected" || show === "connected") {
      height.value = withTiming(heightBar * 2, {
        duration: DURATION,
      })
      setPaddingTop(heightBar)
    } else {
      height.value = withTiming(0, {
        duration: DURATION,
      })
    }

    if (show === "not_connected") {
      setColor(red)
    }
    if (show === "connected") {
      setColor(green)

      timeout = setTimeout(() => {
        setShow("nothing")
      }, 1250)
    }
    if (show === "nothing") {
      timeout = setTimeout(() => {
        setPaddingTop(0)
      }, DURATION * 0.6)
    }

    return () => timeout && clearTimeout(timeout)
  }, [show])

  return (
    <Animated.View
      style={{
        height,
        paddingTop,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color,
      }}
    >
      <Text color="$white" bold>
        {show === "not_connected" ? "Sem conexão com a internet" : "Conectado"}
      </Text>
    </Animated.View>
  )
}
