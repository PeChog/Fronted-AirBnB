import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  BackHandler,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import StarRating from "react-native-star-rating";
import MapView, { Marker } from "react-native-maps";
import BackButton from "../components/BackButton";

// import { useNavigation } from "@react-navigation/native";

const RoomScreen = ({ route, navigation }) => {
  const [data, setData] = useState();
  const { id } = route.params;
  //   console.log(id);
  const [loading, setIsLoading] = useState(true);
  //   console.log(route);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return loading === true ? (
    // <ActivityIndicator size="small" color="#0000ff" />
    <Text>en cours</Text>
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton></BackButton>
        <Image
          source={require("../assets/logo.png")}
          // style={styles.logoImg}
          resizeMode="contain"
          style={styles.logo}
        ></Image>
      </View>

      <FlatList
        //   autoplay
        //   autoplayDelay={2}
        //   autoplayLoop
        // index={0}
        // showPagination
        horizontal
        data={data.photos}
        keyExtractor={(item) => item.picture_id}
        renderItem={({ item }) => {
          // console.log(item.url);
          return (
            <>
              <View>
                <ImageBackground
                  style={styles.roomPhoto}
                  source={{ uri: item.url }}
                >
                  <View
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      height: 50,
                      width: 90,
                      backgroundColor: "black",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",

                        fontSize: 19,
                      }}
                    >
                      {data.price} €
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </>
          );
        }}
      />

      <View>
        <View style={styles.description}>
          <TouchableOpacity style={styles.titleReview}>
            <TouchableOpacity>
              <Text numberOfLines={1} style={{ fontSize: 18 }}>
                {data.title}
              </Text>
            </TouchableOpacity>

            <View style={styles.ratings}>
              <View style={{ marginTop: 18 }}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={data.ratingValue}
                  fullStarColor="#FFB100"
                  emptyStarColor="white"
                  starSize={20}
                />
              </View>

              <Text
                style={{
                  marginTop: 20,
                  marginLeft: 5,
                  color: "lightgray",
                }}
              >
                {data.reviews} reviews
              </Text>
            </View>
          </TouchableOpacity>
          <Image
            style={styles.profilPic}
            source={{
              uri: data.user.account.photo.url,
            }}
            resizeMode="contain"
          />
        </View>
        <Text
          numberOfLines={3}
          style={{ marginTop: 10, width: 380, marginLeft: 20 }}
        >
          {data.description}
        </Text>
      </View>
      <View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation={true}
        >
          <MapView.Marker
            coordinate={{
              latitude: data.location[1],
              longitude: data.location[0],
            }}
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: 414,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

    marginTop: 40,
  },
  logo: {
    height: 30,
    width: 30,
  },
  roomPhoto: {
    height: 300,
    width: 500,
  },
  profilPic: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 50,
    marginTop: 10,
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 380,
    marginLeft: 20,
  },
  titleReview: {
    width: 250,
    marginTop: 20,
  },
  ratings: {
    flexDirection: "row",
  },
  map: {
    height: 280,
    width: "100%",
    marginTop: 20,
  },
});

export default RoomScreen;
