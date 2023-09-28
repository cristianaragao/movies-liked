import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Movies from "pages/Movies"
import Details from "pages/Movies/Details"
import MyMovies from "pages/MyMovies"

import { Clapperboard, Popcorn } from "lucide-react-native"

import { useToken } from "@gluestack-style/react"
import { Text } from "@gluestack-ui/themed"
import { TopBarInfoNet } from "components/TopBarInfoNet"
import * as SplashScreen from "expo-splash-screen"
import { View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { RootStackParamList } from "types/routes.type"
import { PRIMARY_COLOR } from "../constants/COLORS"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator<RootStackParamList>()

SplashScreen.preventAutoHideAsync()

const MoviesStack = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Destaques"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: PRIMARY_COLOR,
          },
        }}
      >
        <Stack.Screen name="Destaques" component={Movies} />
        <Stack.Screen name="Detalhes" component={Details} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  )
}

export const Routes = () => {
  const borderColor = useToken("colors", "white")

  return (
    <View style={{ flex: 1 }}>
      <TopBarInfoNet />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Movies"
          sceneContainerStyle={{
            backgroundColor: PRIMARY_COLOR,
          }}
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            lazy: true,
            tabBarActiveTintColor: "white",
            tabBarStyle: {
              height: 70,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: PRIMARY_COLOR,
              borderColor: borderColor,
            },
          }}
        >
          <Tab.Screen
            name="StackDestaques"
            component={MoviesStack}
            options={{
              tabBarLabel: "Destaques",
              tabBarIcon: ({ color, size }) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Clapperboard size={size} color={color} />
                  <Text mt={5} color={color} size="xs">
                    Destaques
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Meus Favoritos"
            component={MyMovies}
            options={{
              tabBarIcon: ({ color, size }) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Popcorn size={size} color={color} />
                  <Text mt={5} color={color} size="xs">
                    Meus favoritos
                  </Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  )
}
