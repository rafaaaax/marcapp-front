// components/AttendanceItem.tsx
// Este componente representa a cada estudiante y permite registrar su estado de asistencia

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { markAttendance } from '../api/AttendanceService';
import { AttendanceStatus } from '../constants/attendanceStatus';
import Button from './Button';  // Importamos el botón personalizado

// Definimos las propiedades esperadas para este componente
interface AttendanceItemProps {
  student: {
    id: string;
    name: string;
  };
}

// Componente funcional para mostrar la información del estudiante y opciones de asistencia
const AttendanceItem: React.FC<AttendanceItemProps> = ({ student }) => {
  // Función para manejar el registro de asistencia según el estado seleccionado
  const handleAttendance = (status: AttendanceStatus) => {
    markAttendance(student.id, status)
      .then(() => {
        alert(`Asistencia registrada para ${student.name} como ${status}`);
      })
      .catch((error) => {
        console.error("Error al registrar asistencia:", error);
        alert("Error al registrar la asistencia");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.studentName}>{student.name}</Text>
      <View style={styles.buttonsContainer}>
        <Button title="Presente" filled color="green" onPress={() => handleAttendance(AttendanceStatus.PRESENT)} />
        <Button title="Ausente" filled color="red" onPress={() => handleAttendance(AttendanceStatus.ABSENT)} />
        <Button title="Justificado" filled color="orange" onPress={() => handleAttendance(AttendanceStatus.JUSTIFIED)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default AttendanceItem;
