import { FlatList, Heading, Text } from "@gluestack-ui/themed"
import { TouchableOpacity, View } from "react-native"

import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"

import { FontAwesome } from "@expo/vector-icons"

export const FlatListMovie = ({
title,
data,
navigation,
showInPosth,
}: {
    title: string,
    data: any[],
    navigation: any,
    showInPosth?: (movie: any) => React.ReactNode
}) => (
  <View style={{ marginTop: 20, width: "100%" }}>
    <Heading style={{ color: "#ffffff" }} px={20}>
      {title}
    </Heading>
    <FlatList
      mt={10}
      data={data}
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
              marginRight: index < data.length - 1 ? 10 : 20,
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
                {showInPosth ? showInPosth(movie) :<View
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
                    {(movie as any).vote_average.toFixed(1)}
                  </Text>
                </View>}
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
)
