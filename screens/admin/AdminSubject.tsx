import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { serviceAxiosApi } from "../../services/serviceAxiosApi";
import styles2 from "../../assets/styles/HomeStyles";

const AdminSubject = ({ navigation }: { navigation: any }) => {
  const [subjects, setSubjects] = useState<any[]>([]);

  // Fetch subjects on component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  // Function to fetch subjects from the API
  const fetchSubjects = async () => {
    try {
      const response = await serviceAxiosApi.get("/subject"); // Ajusta la ruta según tu API
      setSubjects(response.data); // Asume que la respuesta es un array de asignaturas
    } catch (error) {
      console.error("Error fetching subjects:", error);
      Alert.alert("Error", "No se pudo obtener la lista de asignaturas");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles2.title}>Administrar Asignaturas</Text>

      {/* ScrollView para mostrar las asignaturas */}
      <ScrollView>
        {subjects.map((subject, index) => (
          <View key={index} style={styles.subjectCard}>
            <Text style={styles.subjectText}>Nombre: {subject.name}</Text>
            <Text style={styles.subjectText}>Nivel: {subject.level}</Text>
            <Text style={styles.subjectText}>Día: {subject.day}</Text>
            <Text style={styles.subjectText}>Bloque: {subject.block}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Botón para agregar nueva asignatura */}
      <TouchableOpacity
        style={styles2.editButton}
        onPress={() => navigation.navigate("CreateSubject")} // Ajusta la navegación a la pantalla de creación de asignaturas
      >
        <Text style={styles2.reloadButtonText}>Agregar Nueva Asignatura</Text>
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
  subjectCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  subjectText: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default AdminSubject;
