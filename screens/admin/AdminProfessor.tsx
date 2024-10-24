import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal, Button } from "react-native";
import { serviceAxiosApi } from "../../services/serviceAxiosApi";
import styles2 from "../../assets/styles/HomeStyles";

const AdminProfessor = ({ navigation }: { navigation: any }) => {
  const [professors, setProfessors] = useState<any[]>([]);
  const [filteredProfessors, setFilteredProfessors] = useState<any[]>([]);
  const [filterName, setFilterName] = useState<string>(""); // Estado para el nombre

  // States for modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState<any>(null);
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");

  // Fetch professors on component mount
  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await serviceAxiosApi.get("/professor"); // Ajusta el endpoint de acuerdo con tu API
      setProfessors(response.data);
      setFilteredProfessors(response.data); // Inicialmente se muestran todos los profesores
    } catch (error) {
      console.error("Error al obtener los profesores:", error);
    }
  };

  // Función para manejar el filtro por nombre
  const handleFilterChange = (name: string) => {
    setFilterName(name);

    if (name === "") {
      setFilteredProfessors(professors); // Mostrar todos si el filtro está vacío
    } else {
      const filtered = professors.filter((professor) => 
        professor.name.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredProfessors(filtered);
    }
  };

  // Función para abrir el modal
  const openModal = (professor: any) => {
    setSelectedProfessor(professor);
    setNewName(professor.name);
    setNewEmail(professor.email);
    setModalVisible(true);
  };

  // Función para actualizar los detalles del profesor
  const updateProfessorDetails = async () => {
    try {
      const response = await serviceAxiosApi.patch(`/professor/${selectedProfessor.id_professor}`, {
        updateProfessorDto: { name: newName, email: newEmail },
      });
      console.log("Detalles del profesor actualizados:", response.data);
      fetchProfessors(); // Volver a obtener los profesores para reflejar los cambios
      setModalVisible(false); // Cerrar el modal después de actualizar
    } catch (error) {
      console.error("Error al actualizar los detalles del profesor:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles2.title}>Administrar Profesores</Text>

      {/* Input para filtrar por nombre */}
      <TextInput
        style={styles.filterInput}
        placeholder="Filtrar por nombre"
        value={filterName}
        onChangeText={handleFilterChange} // Filtrar por nombre
      />

      {/* Botón para crear un nuevo profesor */}
      <TouchableOpacity
        style={styles2.editButton}
        onPress={() => navigation.navigate("CreateProfessor")} 
      >
        <Text style={styles2.reloadButtonText}>Crear Nuevo Profesor</Text>
      </TouchableOpacity>

      {/* Lista de profesores */}
      <ScrollView>
        {filteredProfessors.map((professor) => (
          <View key={professor.id_professor} style={styles.professorCard}>
            <Text style={styles.professorText}>Nombre: {professor.name}</Text>
            <Text style={styles.professorText}>Correo: {professor.email}</Text>
            <Text style={styles.professorText}>ID: {professor.id_professor}</Text>
            
            {/* Botón para abrir el modal */}
            <TouchableOpacity
              style={styles2.editButton}
              onPress={() => openModal(professor)}
            >
              <Text style={styles2.reloadButtonText}>Modificar Información</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal para actualizar los detalles del profesor */}
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
            <Text style={styles.modalTitle}>Actualizar Detalles del Profesor</Text>
            
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

            <Button title="Actualizar" onPress={updateProfessorDetails} />
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
  professorCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  professorText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semi-transparente
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

export default AdminProfessor;
