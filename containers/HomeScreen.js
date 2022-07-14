import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import StarRating from "react-native-star-rating";
import BackButton from "../components/BackButton";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
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

  return isLoading === true ? (
    <ActivityIndicator size="small" color="#0000ff" />
  ) : (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Image
            source={require("../assets/logo.png")}
            // style={styles.logoImg}
            resizeMode="contain"
            style={styles.logo}
          ></Image>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.vignette}
          data={data}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "lightgray",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Room", {
                      id: item._id,
                    });
                  }}
                >
                  <ImageBackground
                    style={styles.roomPhoto}
                    source={{ uri: item.photos[0].url }}
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
                        {item.price} €
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>

                <View style={styles.description}>
                  <TouchableOpacity style={styles.titleReview}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Room", {
                          id: item._id,
                        });
                      }}
                    >
                      <Text numberOfLines={1} style={{ fontSize: 18 }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>

                    <View style={styles.ratings}>
                      <View style={{ marginTop: 18 }}>
                        <StarRating
                          disabled={true}
                          maxStars={5}
                          rating={item.ratingValue}
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
                        {item.reviews} reviews
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Image
                    style={styles.profilPic}
                    source={{
                      uri: item.user.account.photo.url,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 380,
  },

  header: {
    height: 50,
    width: 414,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    flexDirection: "row",
    // borderBottom: "gray",
    marginTop: 40,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },

  logo: {
    height: 30,
    width: 30,
  },

  vignette: {
    marginBottom: 30,
    marginLeft: 35,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  profilPic: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 50,
    marginTop: 10,
  },
  roomPhoto: {
    height: 190,
    width: 400,
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 380,
  },
  titleReview: {
    width: 250,
    marginTop: 20,
  },
  ratings: {
    flexDirection: "row",
  },
});
