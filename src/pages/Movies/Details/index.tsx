import { api, apiGeneric } from "api";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Image, ImageBackground } from "expo-image";

import { FlatList, Heading, HStack, Text, VStack } from "@gluestack-ui/themed";

import { LinearGradient } from "expo-linear-gradient";

import { AntDesign } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native-gesture-handler";

import YoutubePlayer from "react-native-youtube-iframe";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
import { RootStackParamList } from "../../../types/routes.type";
import { TypeVideo } from "../../../types/video.type";

import { FontAwesome } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../../constants/COLORS";
import { parseStringToDate } from "../../../utils/formatDate";

import {
  LucideIcon,
  MonitorPlay,
  MonitorUp,
  Star,
  Timer,
} from "lucide-react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Detalhes">;

export default function Details({ route, navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<any>({});
  const [videos, setVideos] = useState<TypeVideo[]>([]);
  const [similars, setSimilars] = useState<any[]>([]);
  const [casts, setCasts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [streams, setStreams] = useState<any[]>([]);

  const isTV = Boolean(route.params?.tv);

  useEffect(() => {
    const id = route.params.id;

    const load = async () => {
      setLoading(true);

      setCasts([]);
      setSimilars([]);
      setReviews([]);
      setStreams([]);

      let movieAux = await api(`/${isTV ? "tv" : "movie"}/${id}`)
        .then((res) => res)
        .catch(() => {});
      setMovie(movieAux);

      let videosAux = await api(`/${isTV ? "tv" : "movie"}/${id}/videos`)
        .then((res) => res.results)
        .catch(() => []);

      setVideos(videosAux);

      setLoading(false);

      let castAux = await api(`/${isTV ? "tv" : "movie"}/${id}/credits`)
        .then((res) => res.cast)
        .catch(() => []);

      setCasts(castAux);

      let similarsAux = await api(`/${isTV ? "tv" : "movie"}/${id}/similar`)
        .then((res) => res.results)
        .catch(() => []);

      setSimilars(similarsAux);

      let reviewsAux = await apiGeneric(
        `/${isTV ? "tv" : "movie"}/${id}/reviews`,
      )
        .then((res) => res.results)
        .catch(() => []);

      setReviews(reviewsAux);

      let streamsAux = await apiGeneric(
        `/${isTV ? "tv" : "movie"}/${id}/watch/providers`,
      )
        .then((res) => res.results?.BR?.flatrate || [])
        .catch(() => []);

      setStreams(streamsAux);
    };

    load();

    return () => {
      setLoading(true);
      setCasts([]);
      setSimilars([]);
      setReviews([]);
      setStreams([]);
    };
  }, [route.params.id]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#e11d48" />
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ padding: 20 }}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <HStack
            mt={10}
            style={{ justifyContent: "space-between", paddingHorizontal: 20 }}
          >
            <View
              style={{
                height: 300,
                width: 200,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <ImageBackground
                source={{
                  uri: `https://image.tmdb.org/t/p/original${movie?.poster_path}`,
                }}
                priority="high"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <VStack ml={30} flex={1} justifyContent="space-around">
              <Info
                text={
                  isTV
                    ? `${movie?.number_of_seasons}`
                    : `${Math.floor(movie?.runtime / 60)}h ${
                        movie?.runtime % 60
                      }m`
                }
                Icon={isTV ? MonitorPlay : Timer}
              />
              <Info text={movie?.vote_average?.toFixed(1)} Icon={Star} />
              <Info
                text={parseStringToDate(
                  isTV ? movie?.first_air_date : movie?.release_date,
                )}
                Icon={MonitorUp}
              />
            </VStack>
          </HStack>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              marginTop: 30,
            }}
          >
            {movie?.genres?.map((genre: any, index: number) => (
              <Text
                key={genre?.id || ""}
                mr={index < movie?.genres?.length - 1 ? 10 : 20}
                ml={index === 0 ? 20 : 0}
                color="white"
                py={5}
                px={15}
                borderColor="gray"
                backgroundColor={PRIMARY_COLOR}
                borderWidth={1}
                borderRadius={20}
              >
                {genre?.name}
              </Text>
            ))}
          </ScrollView>
          <View
            style={{
              margin: 20,
              padding: 20,
              borderRadius: 10,
              backgroundColor: PRIMARY_COLOR,
            }}
          >
            <Heading color="white">{isTV ? movie?.name : movie?.title}</Heading>
            {movie?.overview && (
              <Text mt={20} textAlign="justify" color="white">
                {movie?.overview}
              </Text>
            )}
          </View>

          {videos.length > 0 && (
            <View
              style={{
                margin: 20,
                marginTop: 5,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <YoutubePlayer
                height={200}
                videoId={videos[videos.length - 1].key}
                onFullScreenChange={(isFullScreen) => {
                  lockAsync(
                    isFullScreen
                      ? OrientationLock.LANDSCAPE
                      : OrientationLock.PORTRAIT,
                  );
                }}
              />
            </View>
          )}
          {casts.length > 0 && (
            <View style={{ marginBottom: 20, width: "100%" }}>
              <Heading style={{ color: "#ffffff" }} px={20}>
                Elenco
              </Heading>
              <FlatList
                mt={10}
                data={casts
                  .filter((cast, index) => index < 20)
                  .sort((castA, castB) => (castA.order < castB.order ? -1 : 1))}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: cast, index }) => (
                  <View
                    key={(cast as any)?.cast_id}
                    style={{
                      marginRight:
                        index <
                        casts.filter((cast, index) => index < 20).length - 1
                          ? 10
                          : 20,
                      marginLeft: index === 0 ? 20 : 0,
                      flex: 1,
                      width: 110,
                      backgroundColor: "white",
                      borderRadius: 5,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        height: 150,
                        width: "100%",
                        position: "relative",
                        backgroundColor: "#262626",
                      }}
                    >
                      <Image
                        priority="high"
                        style={{
                          height: "100%",
                          width: "100%",
                          position: "absolute",
                        }}
                        source={{
                          uri: `https://image.tmdb.org/t/p/original${
                            (cast as any).profile_path
                          }`,
                        }}
                      />
                    </View>
                    <View style={{ paddingHorizontal: 5 }}>
                      <Text style={{ marginTop: 5 }} bold isTruncated>
                        {(cast as any).character}
                      </Text>
                      <Text style={{ marginVertical: 5 }} isTruncated>
                        {(cast as any).name}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          )}

          {similars.length > 0 && (
            <View style={{ marginBottom: 20, width: "100%" }}>
              <Heading style={{ color: "#ffffff" }} px={20}>
                Similares
              </Heading>
              <FlatList
                mt={10}
                data={similars.sort((movieA, movieB) =>
                  movieA.popularity > movieB.popularity ? -1 : 1,
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: movie, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Detalhes", {
                        id: (movie as any).id,
                        tv: isTV,
                      });
                    }}
                    style={{
                      height: "auto",
                    }}
                  >
                    <View
                      style={{
                        marginRight: index < similars.length - 1 ? 10 : 20,
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
                          priority="high"
                          style={{
                            height: "100%",
                            width: "100%",
                            position: "absolute",
                          }}
                          source={{
                            uri: `https://image.tmdb.org/t/p/original${
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
                      <Text
                        style={{ color: "#ffffff", marginTop: 5 }}
                        isTruncated
                      >
                        {isTV ? (movie as any).name : (movie as any).title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {streams.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Heading style={{ color: "#ffffff" }} px={20}>
                Onde Assistir
              </Heading>
              <FlatList
                mt={10}
                data={streams.sort((streamA, streamB) =>
                  streamA.display_priority < streamB.display_priority ? -1 : 1,
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: stream, index }) => (
                  <View
                    style={{
                      marginRight: index < streams.length - 1 ? 10 : 20,
                      marginLeft: index === 0 ? 20 : 0,
                      backgroundColor: PRIMARY_COLOR,
                      borderRadius: 10,
                      overflow: "hidden",
                      height: 80,
                      width: 80,
                    }}
                  >
                    <Image
                      priority="high"
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                      source={{
                        uri: `https://image.tmdb.org/t/p/original${(
                          stream as any
                        )?.logo_path}`,
                      }}
                    />
                  </View>
                )}
              />
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const Info = ({ text, Icon }: { text: string; Icon: LucideIcon }) => (
  <VStack
    style={{
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: PRIMARY_COLOR,
      paddingVertical: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "gray",
    }}
  >
    <Heading color="white">{text}</Heading>
    <Icon style={{ height: 5, width: 5, color: "white" }} />
  </VStack>
);
