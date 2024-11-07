// components/AttendanceList.tsx
// Este componente muestra la lista de estudiantes para tomar la asistencia

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AttendanceItem from './AttendanceItem';
import { fetchStudents } from '../api/AttendanceService';

// Definimos las propiedades esperadas para este componente
interface AttendanceListProps {
  classId: string; // El ID de la clase para obtener estudiantes
}

// Definimos el tipo de datos para un estudiante
interface Student {
  id: string;
  name: string;
}

const AttendanceList: React.FC<AttendanceListProps> = ({ classId }) => {
  // Estado para almacenar la lista de estudiantes
  const [students, setStudents] = useState<Student[]>([]);

  // Cargar la lista de estudiantes cuando el componente se monte
  useEffect(() => {
    fetchStudents(classId)
      .then((data) => {
        setStudents(data); // Guardar la lista de estudiantes en el estado
      })
      .catch((error) => {
        console.error("Error al cargar estudiantes:", error);
        alert("Error al cargar estudiantes");
      });
  }, [classId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Estudiantes</Text>
      {students.map((student) => (
        <AttendanceItem key={student.id} student={student} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default AttendanceList;
