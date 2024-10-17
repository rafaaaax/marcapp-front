// Home.tsx

import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/HomeStyles";

enum UserType {
  Admin = "admin",
  Professor = "professor",
  Parent = "parent",
  Student = "student",
}

interface User {
  name: string;
  email: string;
  accessToken: string;
  userType: UserType;
}

const Home = ({ navigation }: { navigation: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    setLoading(true);

    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    console.log("Access Token:", accessToken); // Log to verify the access token
    console.log("Refresh Token:", refreshToken); // Log to verify the refresh token

    if (!accessToken || !refreshToken) {
      setError("No token found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/parent", {
        params: {
          access_token: accessToken,
        },
      });
      console.log(response)
      setUser(response.data);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      setError("Failed to fetch user profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      // Eliminar el token de AsyncStorage
      await AsyncStorage.removeItem("token");
      // Navegar de vuelta a la pantalla de Login
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejar cualquier error que ocurra durante el proceso de cierre de sesión
    }
  };

  const getRoleName = (isAdmin: string) => {
    if (isAdmin === "1") {
      return "Administrador";
    } else if (isAdmin === "0") {
      return "Trabajador";
    }
  };

  const handleReload = () => {
    setLoading(true);
    fetchProfile();
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.reloadButtonContainer}>
        <TouchableOpacity onPress={handleReload}>
          <Text style={styles.reloadButton}>Recargar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Mi perfil!</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileEdit", { user: user })}
          style={styles.editButton}
        >
          <Text style={{ fontSize: 16, color: COLORS.white }}>
            Editar Datos
          </Text>
        </TouchableOpacity>
        {user && (
          <>
            <Text style={styles.label}>Nombre: {user.name}</Text>
            <Text style={styles.label}>Email: {user.email}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterTime")}
              style={styles.registerButton}
            >
              <Text style={{ fontSize: 16, color: COLORS.white }}>
                Registrar Hora
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Resumen")}
              style={styles.summaryButton}
            >
              <Text style={{ fontSize: 16, color: COLORS.primary }}>
                Resumen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Text style={{ fontSize: 16, color: COLORS.primary }}>
                Cerrar Sesion
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
