import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/HomeStyles";
import { serviceAxiosApi } from "../../services/serviceAxiosApi";

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
    const access_Token = await AsyncStorage.getItem("accessToken");

    if (!access_Token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    try {
      // Modificar la URL para incluir el token de acceso
      const response = await serviceAxiosApi.get(`parent/${access_Token}`);
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
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
      await AsyncStorage.removeItem("token");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleReload = () => {
    setLoading(true);
    fetchProfile();
  };

  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
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
          <Text style={styles.editButton}>Recargar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>{user?.name ? `Hola  ${user.name} !` : "Mi perfil!"}</Text>

        {/* Non-editable text boxes for name and email */}
        <View style={styles.nonEditableContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <View style={styles.nonEditableInput}>
            <Text style={styles.nonEditableText}>{user?.name}</Text>
          </View>
        </View>

        <View style={styles.nonEditableContainer}>
          <Text style={styles.label}>Email:</Text>
          <View style={styles.nonEditableInput}>
            <Text style={styles.nonEditableText}>{user?.email}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileEdit", { user })}
          style={styles.editButton}
        >
          <Text style={{ fontSize: 16, color: COLORS.white }}>
            Editar Datos
          </Text>
        </TouchableOpacity>

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
          style={styles.editButton}
        >
          <Text style={{ fontSize: 16, color: COLORS.primary }}>
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
