import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../constants/colors";
import Button from "../../components/Button";
import styles from "../../assets/styles/LoginStyles";
import { validateEmail, validatePassword } from "../../utils/validation";
import axios from "axios";

const Login = ({ navigation }: { navigation: any }) => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [userType, setUserType] = useState<"parent" | "professor">("parent");

  const handleLogin = async () => {
    console.log(email, password);
    if (email === "" || password === "") {
      Alert.alert("Error", "Por favor, complete todos los campos");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Por favor, ingrese un correo electrónico válido");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert("Error", "Contraseña invalida");
      return;
    }

    setLoading(true);

    try {
      const loginFetch = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email: email,
          password: password,
          userType: userType,
        },
      );
      console.log(loginFetch);
      console.log(loginFetch.data)
      const access_token = loginFetch.data.accessToken;
      const refresh_token = loginFetch.data.refreshToken;


      await AsyncStorage.setItem("accessToken", access_token);
      await AsyncStorage.setItem("refreshToken", refresh_token);

      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      console.log("Access Token:", accessToken); // Log to verify the access token
      console.log("Refresh Token:", refreshToken); // Log to verify the refresh token

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error al realizar el inicio de sesión:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo más tarde"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Colegio</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.welcomeText}>¡Bienvenido! 👋</Text>
          <Text style={styles.introText}>
            Ingresa tu correo y contraseña para iniciar sesión
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Correo</Text>
          <TextInput
            placeholder="Ingresa tu correo"
            placeholderTextColor={COLORS.black}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Ingresa tu contraseña"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={isPasswordShown ? "eye-off" : "eye"}
                size={24}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title="Iniciar sesión"
          filled
          onPress={handleLogin}
          style={styles.button}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.linkButton}
        >
          <Text style={styles.linkButtonText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={styles.loadingIndicator}
          />
        )}

        {message !== "" && <Text style={styles.errorMessage}>{message}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default Login;
