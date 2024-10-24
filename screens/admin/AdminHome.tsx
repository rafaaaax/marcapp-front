import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../assets/styles/HomeStyles";

const AdminHome = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la sección de administrador</Text>

      {/* Buttons for managing different users */}
      <View style={styles.verticalButtonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("AdminStudent")}
        >
          <Text style={styles.reloadButtonText}>Administrar Alumnos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("AdminProfessor")}
        >
          <Text style={styles.reloadButtonText}>Administrar Profesores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("AdminParent")}
        >
          <Text style={styles.reloadButtonText}>Administrar Apoderados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("AdminSubject")}
        >
          <Text style={styles.reloadButtonText}>Administrar Materias</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  );
};

export default AdminHome;
