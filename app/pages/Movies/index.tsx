import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../../api";

import * as SplashScreen from "expo-splash-screen";

import {
  Text,
  Image,
  Heading,
  LinearGradient,
  FlatList,
} from "@gluestack-ui/themed";

import { FontAwesome } from "@expo/vector-icons";

import { RootStackParamList } from "../../types/routes.type";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SECONDARY_COLOR } from "../../constants/COLORS";
import { parseDateString } from "../../utils/formatDate";

type Props = NativeStackScreenProps<RootStackParamList, "Destaques">;

export default function Movies({ route, navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<any[]>([]);
  const [moviesUpComming, setMoviesUpComming] = useState<any[]>([]);
  const [moviesPopular, setMoviesPopular] = useState<any[]>([]);
  const [moviesTopRated, setMoviesTopRated] = useState<any[]>([]);
  const [tvTrendinToday, setTvTrendingToday] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      let nowPlayingAux = await api("/movie/now_playing")
        .then((res) => res.results)
        .catch(() => []);
      let moviesUpCommingAux = await api("/movie/upcoming")
        .then((res) => res.results)
        .catch(() => []);
      let moviesPopularAux = await api("/movie/popular")
        .then((res) => res.results)
        .catch(() => []);
      let moviesTopRatedAux = await api("/movie/top_rated")
        .then((res) => res.results)
        .catch(() => []);
      let tvTrendinTodayAux = await api("/trending/tv/day")
        .then((res) => res.results)
        .catch(() => []);
      setNowPlaying(nowPlayingAux);
      setMoviesUpComming(moviesUpCommingAux);
      setMoviesPopular(moviesPopularAux);
      setMoviesTopRated(moviesTopRatedAux);
      setTvTrendingToday(tvTrendinTodayAux);
      await SplashScreen.hideAsync();
    };

    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop: 20, width: "100%" }}>
          <Heading style={{ color: "#ffffff" }} px={20}>
            Em exibição
          </Heading>
          <FlatList
            mt={10}
            data={nowPlaying.sort((movieA, movieB) =>
              movieA.popularity > movieB.popularity ? -1 : 1
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: movie, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Detalhes", {
                    id: (movie as any).id,
                  })
                }
                style={{
                  height: "auto",
                }}
              >
                <View
                  style={{
                    marginRight: index < nowPlaying.length - 1 ? 10 : 20,
                    marginLeft: index === 0 ? 20 : 0,
                    flex: 1,
                    width: 130,
                    height: "auto",
                    minHeight: "auto",
                  }}
                >
                  <View
                    style={{
                      height: 200,
                      width: "100%",
                      position: "relative",
                      backgroundColor: "#262626",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                      }}
                      source={{
                        uri: `http://image.tmdb.org/t/p/original${
                          (movie as any).poster_path
                        }`,
                      }}
                    />
                    <LinearGradient
                      colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "50%",
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "flex-end",
                      }}
                    >
                      <View
                        style={{
                          marginTop: "auto",
                          width: "auto",
                          display: "flex",
                          flexDirection: "row",
                          padding: 5,
                        }}
                      >
                        <FontAwesome name="star" size={15} color="yellow" />
                        <Text color="#ffffff" ml={5}>
                          {(movie as any).vote_average}
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>
                  <Text style={{ color: "#ffffff", marginTop: 5 }} isTruncated>
                    {(movie as any).title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 10,
            paddingVertical: 15,
            borderRadius: 10,
            backgroundColor: SECONDARY_COLOR,
          }}
        >
          <Heading style={{ color: "#ffffff" }} px={15}>
            Em breve
          </Heading>
          <FlatList
            mt={10}
            data={moviesUpComming.sort((movieA, movieB) =>
              movieA.release_date < movieB.release_date ? -1 : 1
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: movie, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Detalhes", {
                    id: (movie as any).id,
                  })
                }
                style={{
                  height: "auto",
                }}
              >
                <View
                  style={{
                    marginRight: index < moviesUpComming.length - 1 ? 10 : 15,
                    marginLeft: index === 0 ? 15 : 0,
                    flex: 1,
                    width: 130,
                  }}
                >
                  <View
                    style={{
                      height: 200,
                      width: "100%",
                      position: "relative",
                      backgroundColor: "#262626",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      size="md"
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                      }}
                      source={{
                        uri: `http://image.tmdb.org/t/p/original${
                          (movie as any).poster_path
                        }`,
                      }}
                    />
                    <LinearGradient
                      colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "50%",
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "flex-end",
                      }}
                    >
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
                    </LinearGradient>
                  </View>
                  <Text style={{ color: "#ffffff", marginTop: 5 }} isTruncated>
                    {(movie as any).title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ marginTop: 20, width: "100%" }}>
          <Heading style={{ color: "#ffffff" }} px={20}>
            Populares
          </Heading>
          <FlatList
            mt={10}
            data={moviesPopular.sort((movieA, movieB) =>
              movieA.popularity > movieB.popularity ? -1 : 1
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: movie, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Detalhes", {
                    id: (movie as any).id,
                  })
                }
                style={{
                  height: "auto",
                }}
              >
                <View
                  style={{
                    marginRight: index < moviesPopular.length - 1 ? 10 : 20,
                    marginLeft: index === 0 ? 20 : 0,
                    flex: 1,
                    width: 130,
                  }}
                >
                  <View
                    style={{
                      height: 200,
                      width: "100%",
                      position: "relative",
                      backgroundColor: "#262626",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      size="md"
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                      }}
                      source={{
                        uri: `http://image.tmdb.org/t/p/original${
                          (movie as any).poster_path
                        }`,
                      }}
                    />
                    <LinearGradient
                      colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "50%",
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "flex-end",
                      }}
                    >
                      <View
                        style={{
                          marginTop: "auto",
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          padding: 5,
                        }}
                      >
                        <FontAwesome name="star" size={15} color="yellow" />
                        <Text color="#ffffff" ml={5}>
                          {(movie as any).vote_average}
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>
                  <Text style={{ color: "#ffffff", marginTop: 5 }} isTruncated>
                    {(movie as any).title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ marginTop: 20, width: "100%" }}>
          <Heading style={{ color: "#ffffff" }} px={20}>Mais avaliados</Heading>
          <FlatList
            mt={10}
            data={moviesTopRated.sort((movieA, movieB) =>
              movieA.vote_average > movieB.vote_average ? -1 : 1
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: movie, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Detalhes", {
                    id: (movie as any).id,
                  })
                }
                style={{
                  height: "auto",
                }}
              >
                <View
                  style={{
                    marginRight: index < moviesTopRated.length - 1 ? 10 : 20,
                    marginLeft: index === 0 ? 20 : 0,
                    flex: 1,
                    width: 130,
                    height: "auto",
                  }}
                >
                  <View
                    style={{
                      height: 200,
                      width: "100%",
                      position: "relative",
                      backgroundColor: "#262626",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      size="md"
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                      }}
                      source={{
                        uri: `http://image.tmdb.org/t/p/original${
                          (movie as any).poster_path
                        }`,
                      }}
                    />
                    <LinearGradient
                      colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "50%",
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "flex-end",
                      }}
                    >
                      <View
                        style={{
                          marginTop: "auto",
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          padding: 5,
                        }}
                      >
                        <FontAwesome name="star" size={15} color="yellow" />
                        <Text color="#ffffff" ml={5}>
                          {(movie as any).vote_average}
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>
                  <Text style={{ color: "#ffffff", marginTop: 5 }} isTruncated>
                    {(movie as any).title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ marginVertical: 20, width: "100%" }}>
          <Heading style={{ color: "#ffffff" }} px={20}>Séries do momento</Heading>
          <FlatList
            mt={10}
            data={tvTrendinToday.sort((movieA, movieB) =>
              movieA.popularity > movieB.popularity ? -1 : 1
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: movie, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Detalhes", {
                    id: (movie as any).id,
                    tv: true,
                  })
                }
                style={{
                  height: "auto",
                }}
              >
                <View
                  style={{
                    marginRight: index < tvTrendinToday.length - 1 ? 10 : 20,
                    marginLeft: index === 0 ? 20 : 0,
                    flex: 1,
                    width: 130,
                    height: "auto",
                  }}
                >
                  <View
                    style={{
                      height: 200,
                      width: "100%",
                      position: "relative",
                      backgroundColor: "#262626",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                      }}
                      source={{
                        uri: `http://image.tmdb.org/t/p/original${
                          (movie as any).poster_path
                        }`,
                      }}
                    />
                    <LinearGradient
                      colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "50%",
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "flex-end",
                      }}
                    >
                      <View
                        style={{
                          marginTop: "auto",
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          padding: 5,
                        }}
                      >
                        <FontAwesome name="star" size={15} color="yellow" />
                        <Text color="#ffffff" ml={5}>
                          {(movie as any).vote_average.toFixed(1)}
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>
                  <Text style={{ color: "#ffffff", marginTop: 5 }} isTruncated>
                    {(movie as any).name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
