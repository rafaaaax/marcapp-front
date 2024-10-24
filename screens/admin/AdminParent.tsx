import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal, Button } from "react-native";
import { serviceAxiosApi } from "../../services/serviceAxiosApi";
import styles2 from "../../assets/styles/HomeStyles";

const AdminParent = ({ navigation }: { navigation: any }) => {
  const [parents, setParents] = useState<any[]>([]);
  const [filteredParents, setFilteredParents] = useState<any[]>([]);
  const [filterName, setFilterName] = useState<string>(""); // Estado para filtrar por nombre

  // States for modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");

  // Fetch parents on component mount
  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      const response = await serviceAxiosApi.get("/parent"); // Ajusta el endpoint de acuerdo con tu API
      setParents(response.data);
      setFilteredParents(response.data); // Inicialmente se muestran todos los padres
    } catch (error) {
      console.error("Error al obtener Apoderados:", error);
    }
  };

  // Función para manejar el filtro por nombre
  const handleFilterChange = (name: string) => {
    setFilterName(name);

    if (name === "") {
      setFilteredParents(parents); // Mostrar todos si el filtro está vacío
    } else {
      const filtered = parents.filter((parent) => 
        parent.name.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredParents(filtered);
    }
  };

  // Función para abrir el modal
  const openModal = (parent: any) => {
    setSelectedParent(parent);
    setNewName(parent.name);
    setNewEmail(parent.email);
    setModalVisible(true);
  };

  // Función para actualizar los detalles del padre
  const updateParentDetails = async () => {
    try {
      const response = await serviceAxiosApi.patch(`/parent/${selectedParent.id_parent}`, {
        updateParentDto: { name: newName, email: newEmail },
      });
      console.log("Detalles del padre actualizados:", response.data);
      fetchParents(); // Volver a obtener los padres para reflejar los cambios
      setModalVisible(false); // Cerrar el modal después de actualizar
    } catch (error) {
      console.error("Error al actualizar los detalles del apoderado:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles2.title}>Administrar Apoderados</Text>

      {/* Input para filtrar por nombre */}
      <TextInput
        style={styles.filterInput}
        placeholder="Filtrar por nombre"
        value={filterName}
        onChangeText={handleFilterChange} // Filtrar por nombre
      />

      {/* Botón para crear un nuevo padre */}
      <TouchableOpacity
        style={styles2.editButton}
        onPress={() => navigation.navigate("CreateParent")} 
      >
        <Text style={styles2.reloadButtonText}>Crear Nuevo Apoderado</Text>
      </TouchableOpacity>

      {/* Lista de padres */}
      <ScrollView>
        {filteredParents.map((parent) => (
          <View key={parent.id_parent} style={styles.parentCard}>
            <Text style={styles.parentText}>Nombre: {parent.name}</Text>
            <Text style={styles.parentText}>Correo: {parent.email}</Text>
            <Text style={styles.parentText}>ID: {parent.id_parent}</Text>
            
            {/* Botón para abrir el modal */}
            <TouchableOpacity
              style={styles2.editButton}
              onPress={() => openModal(parent)}
            >
              <Text style={styles2.reloadButtonText}>Modificar Información</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal para actualizar los detalles del padre */}
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
            <Text style={styles.modalTitle}>Actualizar Detalles del Apoderado</Text>
            
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

            <Button title="Actualizar" onPress={updateParentDetails} />
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
  parentCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  parentText: {
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

export default AdminParent;
