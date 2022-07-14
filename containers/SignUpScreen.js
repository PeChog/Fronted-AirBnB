import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";
import CustomInput from "../components/CustomInput";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    setErrorMessage("");
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
              // confirmPassword: confirmPassword,
            }
          );

          // if (response.data) {
          //   console.log("J'ai bien réussi à créer un compte");
          // }
          console.log(response.data);
        } catch (error) {
          //   console.log(error.message);

          console.log(error);
          console.log(error.response.data);
          if (error.response.data) {
            setErrorMessage(error.response.data.error);
          }
        }
      } else {
        setErrorMessage("Passwords don't match");
      }
    } else {
      setErrorMessage("A field is empty");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <View style={styles.logo}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logoImg}
            resizeMode="contain"
          ></Image>
          <Text
            style={{
              marginTop: 30,
              fontSize: 25,
              color: "gray",
              fontWeight: "600",
            }}
          >
            Sign up
          </Text>
          <View style={styles.inputs}>
            <CustomInput
              placeholder="email"
              setState={setEmail}
              value={email}
              style={{
                borderBottomWidth: 2,
                borderColor: "#FFBFC6",
                // marginTop: 10,
                height: 30,
              }}
            />
            <CustomInput
              placeholder="username"
              setState={setUsername}
              value={username}
              style={{
                borderBottomWidth: 2,
                borderColor: "#FFBFC6",
                // marginTop: 10,
                height: 30,
                marginTop: 40,
              }}
            />
            <TextInput
              placeholder="Describe yourself in a few words..."
              multiline={true}
              onChangeText={(text) => {
                setDescription(text);
              }}
              style={{
                borderWidth: 2,
                borderColor: "#FFBFC6",
                // marginTop: 10,
                height: 104,
                marginTop: 50,
                width: 322,
              }}
            />

            <CustomInput
              placeholder="password"
              secureTextEntry={true}
              setState={setPassword}
              password={true}
              style={{
                borderBottomWidth: 2,
                borderColor: "#FFBFC6",
                // marginTop: 10,
                height: 30,
                marginTop: 50,
              }}
            />
            <CustomInput
              placeholder="confirm password"
              secureTextEntry={true}
              setState={setConfirmPassword}
              confirmPassword
              style={{
                borderBottomWidth: 2,
                borderColor: "#FFBFC6",
                // marginTop: 10,
                height: 30,
                marginTop: 40,
              }}
            />
            {errorMessage ? (
              <Text style={{ color: "red" }}>{errorMessage}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={async () => {
              handleSignup();
            }}
          >
            <Text>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center", marginTop: 18 }}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text>Already have an account? Sign in</Text>
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

  logoImg: {
    height: 100,
    width: 100,
  },

  logo: {
    alignItems: "center",
    marginTop: 50,
  },

  inputs: {
    // alignItems: "center",
    marginTop: 10,
    height: 30,
    width: 350,
    marginLeft: 30,
  },

  signUpButton: {
    marginTop: 480,
    // marginLeft: 30,
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
