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
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("nono@airbnb-api.com");
  const [password, setPassword] = useState("pass");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: "nono@airbnb-api.com",
          password: "pass",
        }
      );

      console.log(response.data);
      if (response.data.token) {
        setToken(response.data.token);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View>
        <View style={styles.logo}>
          <Image
            source={require("../assets/logo.png")}
            // style={styles.logoImg}
            resizeMode="contain"
          ></Image>
          <Text
            style={{
              marginTop: 30,
              fontSize: 26,
              color: "gray",
              fontWeight: "600",
            }}
          >
            Sign in
          </Text>
        </View>
        <View>
          <View style={styles.inputs}>
            <TextInput
              placeholder="email"
              style={{
                borderBottomWidth: 2,
                borderColor: "#FFBFC6",
                // marginTop: 10,
                height: 30,
              }}
              value={email}
            />

            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={{
                borderBottomWidth: 2,
                borderColor: "#FFBFC6",
                height: 30,
                marginTop: 40,
              }}
              value={password}
            />
          </View>

          <TouchableOpacity
            title="Sign in"
            style={styles.signInButton}
            onPress={async () => {
              handleLogin();
            }}
          >
            <Text>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center", marginTop: 25 }}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 300,
  },

  logo: {
    alignItems: "center",
    marginTop: 120,
  },
  logoImg: {
    height: 100,
    width: 100,
  },

  inputs: {
    // alignItems: "center",
    marginTop: 150,
    height: 30,
    width: 350,
    marginLeft: 30,
  },
  signInButton: {
    marginTop: 240,
    marginLeft: 110,
    borderWidth: 3,
    borderColor: "red",
    backgroundColor: "white",
    height: 60,
    borderRadius: 30,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});
