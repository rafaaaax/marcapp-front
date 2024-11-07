// screens/attendance/AttendanceScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importación corregida
import AttendanceList from '../../components/AttendanceList';

// Listado de clases simuladas (esto puede venir de una API o del backend)
const classes = [
  { id: '1', name: 'Matemáticas' },
  { id: '2', name: 'Ciencias' },
  { id: '3', name: 'Historia' },
];

const AttendanceScreen = () => {
  // Estado para almacenar la clase seleccionada
  const [selectedClass, setSelectedClass] = useState(classes[0].id);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Seleccione una Clase</Text>
      <Picker
        selectedValue={selectedClass}
        onValueChange={(itemValue) => setSelectedClass(itemValue)}
        style={styles.picker}
      >
        {classes.map((cls) => (
          <Picker.Item key={cls.id} label={cls.name} value={cls.id} />
        ))}
      </Picker>
      <AttendanceList classId={selectedClass} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  picker: {
    marginBottom: 20,
  },
});

export default AttendanceScreen;
