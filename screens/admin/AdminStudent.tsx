import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal, Button } from "react-native";
import { serviceAxiosApi } from "../../services/serviceAxiosApi";
import styles2 from "../../assets/styles/HomeStyles";


const AdminStudents = ({ navigation }: { navigation: any }) => {
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [filterLevel, setFilterLevel] = useState<string>("");
  
  // States for modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newLevel, setNewLevel] = useState<string>("");

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await serviceAxiosApi.get("/student"); // Adjust the endpoint based on your API
      setStudents(response.data);
      setFilteredStudents(response.data); // Set initial students to display
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Filter students based on level
  const handleFilterChange = (level: string) => {
    setFilterLevel(level);
    if (level === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) => student.level === level);
      setFilteredStudents(filtered);
    }
  };

  // Function to open modal
  const openModal = (student: any) => {
    setSelectedStudent(student);
    setNewName(student.name);
    setNewEmail(student.email);
    setNewLevel(student.level);
    setModalVisible(true);
  };

  // Function to update student details
  const updateStudentDetails = async () => {
    try {
      const response = await serviceAxiosApi.patch(`/student/${selectedStudent.id_student}`, {
        updateStudentDto: { name: newName, email: newEmail, level: newLevel },
        level: newLevel,
      });
      console.log("Student details updated:", response.data);
      fetchStudents(); // Re-fetch students to reflect the changes
      setModalVisible(false); // Close the modal after updating
    } catch (error) {
      console.error("Error updating student details:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles2.title}>Administrar Alumnos</Text>

      {/* Input for filtering by level */}
      <TextInput
        style={styles.filterInput}
        placeholder="Filtrar por nivel"
        value={filterLevel}
        onChangeText={handleFilterChange}
      />
      {/* Button to create new student */}
      <TouchableOpacity
        style={styles2.editButton} // Usa el mismo estilo que en AdminHome
        onPress={() => navigation.navigate("CreateStudent")} 
      >
        <Text style={styles2.reloadButtonText}>Crear Nuevo Alumno</Text>
      </TouchableOpacity>

      {/* List of students */}
      <ScrollView>
        {filteredStudents.map((student) => (
          <View key={student.id_student} style={styles.studentCard}>
            <Text style={styles.studentText}>Nombre: {student.name}</Text>
            <Text style={styles.studentText}>Nivel: {student.level}</Text>
            <Text style={styles.studentText}>ID: {student.id_student}</Text>
            
            {/* Button to open modal */}
            <TouchableOpacity
              style={styles2.editButton}
              onPress={() => openModal(student)}
            >
              <Text style={styles2.reloadButtonText}>Modificar Información</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal for updating student details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Actualizar Detalles del Estudiante</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={newEmail}
              onChangeText={setNewEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Nivel"
              value={newLevel}
              onChangeText={setNewLevel}
              keyboardType="numeric" // Restrict to numeric input
            />

            <Button title="Actualizar" onPress={updateStudentDetails} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  filterInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  studentCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  studentText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AdminStudents;
