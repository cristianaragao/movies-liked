import React, { useEffect, useState } from "react"

import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import * as SplashScreen from "expo-splash-screen"

import { Button, Heading, Text, VStack } from "@gluestack-ui/themed"

import { RootStackParamList } from "../../types/routes.type"

import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useApp } from "app/AppContext"
import { useNetwork } from "app/NetworkContext"
import { FlatListMovie } from "components/FlatlistMovie"
import { FlatListTV } from "components/FlatlistTV"
import { LinearGradient } from "expo-linear-gradient"
import { parseDateString } from "utils/formatDate"
import { api, apiGeneric } from "../../api"
import { Input } from "../../components/Input"

type Props = NativeStackScreenProps<RootStackParamList, "Destaques">

export default function Movies({ navigation }: Props) {
  const [loading, setLoading] = useState(true)
  const [nowPlaying, setNowPlaying] = useState<any[]>([])
  const [moviesUpComming, setMoviesUpComming] = useState<any[]>([])
  const [moviesPopular, setMoviesPopular] = useState<any[]>([])
  const [moviesTopRated, setMoviesTopRated] = useState<any[]>([])
  const [tvTrendinToday, setTvTrendingToday] = useState<any[]>([])

  const [movieSearch, setMovieSearch] = useState<any[]>([])
  const [tvSearch, setTvSearch] = useState<any[]>([])

  const [refreshing, setRefreshing] = useState(false)

  const { ready, setReady } = useApp()

  const load = async () => {
    setLoading(true)

    let nowPlayingAux = await api("/movie/now_playing")
      .then((res) => res.results)
      .catch(() => [])
    let moviesUpCommingAux = await api("/movie/upcoming")
      .then((res) => res.results)
      .catch(() => [])
    let moviesPopularAux = await api("/movie/popular")
      .then((res) => res.results)
      .catch(() => [])
    let moviesTopRatedAux = await api("/movie/top_rated")
      .then((res) => res.results)
      .catch(() => [])
    let tvTrendinTodayAux = await api("/trending/tv/day")
      .then((res) => res.results)
      .catch(() => [])
    setNowPlaying(nowPlayingAux)
    setMoviesUpComming(moviesUpCommingAux)
    setMoviesPopular(moviesPopularAux)
    setMoviesTopRated(moviesTopRatedAux)
    setTvTrendingToday(tvTrendinTodayAux)

    setLoading(false)

    const bool = await SplashScreen.hideAsync()

    if (bool) {
      setReady(true)
    }

  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await load()
    setRefreshing(false)
  }, [])

  const [search, setSearch] = useState("")

  useEffect(() => {
    load()
  }, [])


  const loadSearch = async () => {
    setLoading(true)

    let movieSearchAux = await apiGeneric("/search/movie?query=" + search)
      .then((res) => res.results)
      .catch(() => [])

    setMovieSearch(movieSearchAux)

    let tvSearchAux = await apiGeneric("/search/tv?query=" + search)
      .then((res) => res.results)
      .catch(() => [])

    setTvSearch(tvSearchAux)

    setLoading(false)
  }

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      // A função a ser executada após 1 segundo de inatividade do usuário
      if (search.trim().length > 2) loadSearch()
    }, 1000)

    // Limpar o temporizador se o usuário continuar digitando

    if (search.trim().length > 2) {
      setLoading(true)
    } else setLoading(false)

    return () => clearTimeout(typingTimeout)
  }, [search])

  const { show, setShow } = useNetwork()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            enabled={search.trim().length <= 2}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
          }}
        >
          <Heading size="2xl" color="white">
            I Love Movies
          </Heading>
          
          <Button onPress={() => setShow("connected")}>
            <Text>connected </Text>
          </Button>
          <Button onPress={() => setShow("not_connected")}>
            <Text>not_connected</Text>
          </Button>
          <Button onPress={() => setShow("nothing")}>
            <Text>nothing</Text>
          </Button>
          <Input
            placeholder="Busque qualquer filme ou série pelo título..."
            style={{ flex: 1, marginTop: 20 }}
            value={search}
            onChangeText={(newValue) => setSearch(newValue)}
          />
        </View>

        {loading ? (
          <VStack
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              size="large"
              color="#e11d48"
              style={{ marginTop: 100 }}
            />
          </VStack>
        ) : (
          <View style={{ flex: 1, paddingBottom: 20 }}>
            {search.trim().length > 2 ? (
              <VStack flex={1}>
                <FlatListMovie
                  title="Filmes"
                  data={movieSearch
                    .filter(
                      (movie) =>
                        movie?.poster_path &&
                        movie?.release_date &&
                        movie?.vote_average > 0
                    )
                    .sort((movieA, movieB) =>
                      movieA.popularity > movieB.popularity ? -1 : 1
                    )}
                  navigation={navigation}
                />
                <FlatListTV
                  title="Séries"
                  data={tvSearch
                    .filter((movie) => movie?.vote_average > 0)
                    .sort((movieA, movieB) =>
                      movieA.popularity > movieB.popularity ? -1 : 1
                    )}
                  navigation={navigation}
                />
              </VStack>
            ) : (
              <VStack flex={1}>
                <FlatListMovie
                  title="Em exibição"
                  data={nowPlaying.sort((movieA, movieB) =>
                    movieA.popularity > movieB.popularity ? -1 : 1
                  )}
                  navigation={navigation}
                />

                <LinearGradient
                  colors={["#4c1d95", "#000000"]}
                  start={{ x: 0.35, y: 0.2 }}
                  end={{ x: 0.65, y: 0.8 }}
                  style={{
                    marginTop: 20,
                    marginHorizontal: 10,
                    paddingBottom: 20,
                    borderRadius: 10,
                  }}
                >
                  <FlatListMovie
                    title="Em breve"
                    data={moviesUpComming.sort((movieA, movieB) =>
                      movieA.release_date < movieB.release_date ? -1 : 1
                    )}
                    showInPosth={(movie: any) => (
                      <View
                        style={{
                          marginTop: "auto",
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          padding: 5,
                        }}
                      >
                        <Text color="#ffffff" ml={5}>
                          {parseDateString((movie as any).release_date)}
                        </Text>
                      </View>
                    )}
                    navigation={navigation}
                  />
                </LinearGradient>

                <FlatListMovie
                  title="Populares"
                  data={moviesPopular.sort((movieA, movieB) =>
                    movieA.popularity > movieB.popularity ? -1 : 1
                  )}
                  navigation={navigation}
                />
                <FlatListMovie
                  title="Mais avaliados"
                  data={moviesTopRated.sort((movieA, movieB) =>
                    movieA.popularity > movieB.popularity ? -1 : 1
                  )}
                  navigation={navigation}
                />
                <FlatListTV
                  title="Séries do momento"
                  data={tvTrendinToday.sort((movieA, movieB) =>
                    movieA.popularity > movieB.popularity ? -1 : 1
                  )}
                  navigation={navigation}
                />
              </VStack>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
