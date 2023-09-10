import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

import Movies from "./app/pages/Movies";
import Details from "./app/pages/Movies/Details";
import MyMovies from "./app/pages/MyMovies";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { GluestackUIProvider, config } from "@gluestack-ui/themed";

import * as SplashScreen from "expo-splash-screen";
import { RootStackParamList } from "./app/types/routes.type";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "./app/constants/COLORS";

import "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

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
  );
};

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="transparent" style="light" />
      <GluestackUIProvider config={config.theme}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Movies"
            sceneContainerStyle={{
              backgroundColor: PRIMARY_COLOR,
            }}
            screenOptions={{
              headerShown: false,
              lazy: true,
              tabBarActiveTintColor: "white",
              tabBarStyle: {
                backgroundColor: SECONDARY_COLOR,
                borderColor: "transparent",
              },
            }}
          >
            <Tab.Screen
              name="StackDestaques"
              component={MoviesStack}
              options={{
                tabBarLabel: "Destaques",
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons
                    name="local-movies"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Meus Filmes"
              component={MyMovies}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="movie-open-star"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </>
  );
}
