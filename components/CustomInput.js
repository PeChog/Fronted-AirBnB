import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomInput = ({ placeholder, setState, value, password }) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      style={styles.input}
      onChangeText={(text) => {
        setState(text);
      }}
      secureTextEntry={password ? true : false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    // backgroundColor: "red",
    width: "92%",
    marginTop: 30,
    borderColor: "#FFBAC0",
    borderBottomWidth: 2,
    height: 35,
    // marginRight: 20,
  },
});

export default CustomInput;
