import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { serviceAxiosApi } from "../../services/serviceAxiosApi";
import styles2 from "../../assets/styles/HomeStyles";

const CreateParent = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Función para manejar la creación del padre
  const handleCreateParent = async () => {
    // Validaciones básicas
    if (!name || !email || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await serviceAxiosApi.post("/parent", {
        name,
        email,
        password,
      });

      console.log("Apoderado creado exitosamente:", response.data);
      Alert.alert("Éxito", "Apoderado creado exitosamente");

      // Redirigir a la pantalla de administración de padres
      navigation.navigate("AdminParent");
    } catch (error) {
      console.error("Error al crear Apoderado:", error);
      Alert.alert("Error", "No se pudo crear el Apoderado");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles2.title}>Crear Nuevo Apoderado</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles2.editButton} onPress={handleCreateParent}>
        <Text style={styles2.reloadButtonText}>Crear Apoderado</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default CreateParent;
