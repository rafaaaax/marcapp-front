import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { serviceAxiosApi } from "../../services/serviceAxiosApi";

const CreateSubject = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [day, setDay] = useState("");
  const [block, setBlock] = useState("");
  const [professors, setProfessors] = useState<any[]>([]);
  const [idProfessor, setIdProfessor] = useState<number | null>(null);

  // Fetch professors on component mount
  useEffect(() => {
    fetchProfessors();
  }, []);

  // Function to fetch professors from the API
  const fetchProfessors = async () => {
    try {
      const response = await serviceAxiosApi.get("/professor");
      setProfessors(response.data); // Asume que la respuesta es un array de profesores
    } catch (error) {
      console.error("Error fetching professors:", error);
      Alert.alert("Error", "No se pudo obtener la lista de profesores");
    }
  };

  // Function to handle subject creation
  const handleCreateSubject = async () => {
    if (!name || !level || !day || !block || idProfessor === null) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const newSubject = {
      name,
      level,
      day,
      block,
      id_professor: idProfessor,
    };

    try {
      await serviceAxiosApi.post("/subject", newSubject);
      Alert.alert("Éxito", "Asignatura creada correctamente");
      navigation.goBack(); // Navega de vuelta a la pantalla anterior
    } catch (error: any) {
      const errorMessages = error.response?.data?.message || ["Error al crear la asignatura"];
      Alert.alert("Error", errorMessages.join("\n"));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Asignatura</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nivel (1-13)"
        keyboardType="numeric"
        value={level}
        onChangeText={setLevel}
      />
      <Picker
        selectedValue={day}
        style={styles.input}
        onValueChange={(itemValue) => setDay(itemValue)}
      >
        <Picker.Item label="Selecciona un día" value="" />
        <Picker.Item label="Lunes" value="Lunes" />
        <Picker.Item label="Martes" value="Martes" />
        <Picker.Item label="Miércoles" value="Miercoles" />
        <Picker.Item label="Jueves" value="Jueves" />
        <Picker.Item label="Viernes" value="Viernes" />
      </Picker>
      <Picker
        selectedValue={block}
        style={styles.input}
        onValueChange={(itemValue) => setBlock(itemValue)}
      >
        <Picker.Item label="Selecciona un bloque" value="" />
        <Picker.Item label="A" value="A" />
        <Picker.Item label="B" value="B" />
        <Picker.Item label="C" value="C" />
        <Picker.Item label="D" value="D" />
        <Picker.Item label="E" value="E" />
      </Picker>
      <Picker
        selectedValue={idProfessor}
        style={styles.input}
        onValueChange={(itemValue) => setIdProfessor(itemValue)}
      >
        <Picker.Item label="Selecciona un profesor" value={null} />
        {professors.map((professor) => (
          <Picker.Item key={professor.id_professor} label={professor.name} value={professor.id_professor} />
        ))}
      </Picker>

      <Button title="Crear Asignatura" onPress={handleCreateSubject} />
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
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CreateSubject;
