import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { serviceAxiosApi } from "../../services/serviceAxiosApi";
import styles2 from "../../assets/styles/HomeStyles";

const CreateStudent = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [idParent, setIdParent] = useState<number | string>("");
  const [parents, setParents] = useState<any[]>([]);

  // Fetch parents on component mount
  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      const response = await serviceAxiosApi.get("/parent"); // Adjust the endpoint based on your API
      setParents(response.data); // Assuming the response is an array of parents
    } catch (error) {
      console.error("Error fetching parents:", error);
    }
  };

  const isValidEmail = (email: string) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    // Check if a parent is selected
    if (!idParent) {
      Alert.alert(
        "Error",
        "No se ha seleccionado un padre. Es necesario crearlo previamente.",
        [{ text: "OK" }]
      );
      return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
      Alert.alert(
        "Error",
        "El correo electrónico no es válido. Por favor, ingresa un correo electrónico válido.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      await serviceAxiosApi.post("/student", {
        name,
        email,
        password,
        id_parent: idParent,
      });
      navigation.goBack();
    } catch (error) {
      // Handle errors and display an alert
      Alert.alert(
        "Error al crear estudiante",
        "Ocurrió un error al intentar crear el estudiante. Por favor, inténtalo de nuevo.",
        [{ text: "OK" }]
      );
      console.error("Error creating student:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Estudiante</Text>

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

      <Text style={styles.label}>Seleccionar Padre:</Text>
      <Picker
        selectedValue={idParent}
        onValueChange={(itemValue) => setIdParent(itemValue)}
      >
        <Picker.Item label="Seleccione un padre" value="" />
        {parents.map((parent) => (
          <Picker.Item key={parent.id_parent} label={parent.name} value={parent.id_parent} />
        ))}
      </Picker>

      <TouchableOpacity style={styles2.editButton} onPress={handleSubmit}>
        <Text style={styles2.reloadButtonText}>Crear Estudiante</Text>
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
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CreateStudent;
