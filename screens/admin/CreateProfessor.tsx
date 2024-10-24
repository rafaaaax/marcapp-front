import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { serviceAxiosApi } from "../../services/serviceAxiosApi";
import styles2 from "../../assets/styles/HomeStyles";

const CreateProfessor = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState<string>(""); // Nombre del profesor
  const [email, setEmail] = useState<string>(""); // Email del profesor
  const [password, setPassword] = useState<string>(""); // Contraseña del profesor

  const isValidEmail = (email: string) => {
    // Expresión regular para validar correo
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    // Validación de email
    if (!isValidEmail(email)) {
      Alert.alert(
        "Error",
        "El correo electrónico no es válido. Por favor, ingresa un correo electrónico válido.",
        [{ text: "OK" }]
      );
      return;
    }

    // Validar que los campos no estén vacíos
    if (!name || !email || !password) {
      Alert.alert(
        "Error",
        "Todos los campos son obligatorios. Por favor, completa toda la información.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      // Crear un profesor enviando los datos al backend
      await serviceAxiosApi.post("/professor", {
        name,
        email,
        password,
      });
      Alert.alert("Éxito", "Profesor creado exitosamente", [{ text: "OK" }]);
      navigation.goBack();
    } catch (error) {
      // Manejar errores
      Alert.alert(
        "Error al crear profesor",
        "Ocurrió un error al intentar crear el profesor. Por favor, inténtalo de nuevo.",
        [{ text: "OK" }]
      );
      console.error("Error creating professor:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Profesor</Text>

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
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles2.editButton} onPress={handleSubmit}>
        <Text style={styles2.reloadButtonText}>Crear Profesor</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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

export default CreateProfessor;
