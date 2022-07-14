import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import colors from "../assets/colors";

// import { useNavigation } from "@react-navigation/core";
function AroundMeScreen(route, navigation) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  // const navigation = useNavigation();

  useEffect(() => {
    const getLocationAndData = async () => {
      try {
        let { status } = await Location.requestBackgroundPermissionsAsync();

        let response;

        if (status === "granted") {
          // get rooms around
          const location = await Location.getCurrentPositionAsync();

          const lat = location.coords.latitude;
          const lng = location.coords.longitude;

          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${lat}&longitude=${lng}`
          );
        } else {
          // get all rooms
          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around`
          );
        }

        const coordsTab = [];
        for (let i = 0; i < response.data.length; i++) {
          coordsTab.push({
            latitude: response.data[i].location[1],
            longitude: response.data[i].location[0],
            id: response.data[i]._id,
          });
        }

        setData(coordsTab);
        setIsLoading(false);
      } catch (error) {
        alert("An error occurred");
      }
    };

    getLocationAndData();
  }, []);

  return isLoading ? (
    <ActivityIndicator
      color={colors.pink}
      size="large"
      style={styles.activityIndicator}
    />
  ) : (
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
      {data.map((item, index) => {
        return (
          <View>
            <MapView.Marker
              key={item}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.title}
              onPress={() => {
                <Text>{item.title}</Text>;
              }}
            ></MapView.Marker>
          </View>
        );
      })}
    </MapView>
  );
}

export default AroundMeScreen;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
