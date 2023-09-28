import { FlatList, Heading, Text } from "@gluestack-ui/themed"
import { TouchableOpacity, View } from "react-native"

import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"

import { FontAwesome } from "@expo/vector-icons"

export const FlatListTV = ({
  title,
  data,
  navigation,
}: {
  title: string
  data: any[]
  navigation: any
}) => (
  <View style={{ marginTop: 20, width: "100%" }}>
    <Heading style={{ color: "#ffffff" }} px={20}>
      {title}
    </Heading>
    <FlatList
      mt={10}
      data={data.sort((tvA, tvB) =>
        tvA.popularity > tvB.popularity ? -1 : 1
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: tv, index }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Detalhes", {
              id: (tv as any).id,
              tv: true,
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
                    (tv as any).poster_path
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
                    {(tv as any).vote_average.toFixed(1)}
                  </Text>
                </View>
              </LinearGradient>
            </View>
            <Text style={{ color: "#ffffff", marginTop: 5 }} isTruncated>
              {(tv as any).name}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
)
