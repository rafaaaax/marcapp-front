// AdminEdit.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/colors';
import { isValidDate, isValidTime } from '../../utils/validation';
import { updateSchedule } from '../../api/AdminEditConexion';
import styles from '../../assets/styles/AdminEditStyles';

const AdminEdit = ({ navigation, route }: { navigation: any, route: any }) => {
  const { scheduleEntry, userId } = route.params;

  // Extraer el ID y los detalles de la entrada de horario
  const scheduleId = Object.keys(scheduleEntry)[0];
  const { date, entered, left } = scheduleEntry[scheduleId];

  const [editedDate, setEditedDate] = useState(date);
  const [editedEntered, setEditedEntered] = useState(entered);
  const [editedLeft, setEditedLeft] = useState(left);

  const handleUpdate = async () => {
    if (!isValidDate(editedDate)) {
      Alert.alert('Error', 'La fecha debe estar en formato yyyy-mm-dd.');
      return;
    }

    if (!isValidTime(editedEntered)) {
      Alert.alert('Error', 'La hora de entrada debe estar en formato hh:mm:ss.');
      return;
    }

    if (!isValidTime(editedLeft)) {
      Alert.alert('Error', 'La hora de salida debe estar en formato hh:mm:ss.');
      return;
    }

    try {
      const { success } = await updateSchedule(scheduleId, editedDate, editedEntered, editedLeft, userId);

      if (success) {
        Alert.alert('Éxito', 'Horario actualizado correctamente');
        // Puedes navegar a la pantalla anterior o a otra pantalla de tu aplicación
      }
    } catch (error) {
      console.error('Error al actualizar horario:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Horario</Text>

      <TextInput
        style={styles.input}
        placeholder="Fecha (yyyy-mm-dd)"
        value={editedDate}
        onChangeText={text => setEditedDate(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Hora de entrada (hh:mm:ss)"
        value={editedEntered}
        onChangeText={text => setEditedEntered(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Hora de salida (hh:mm:ss)"
        value={editedLeft}
        onChangeText={text => setEditedLeft(text)}
      />

      <TouchableOpacity
        onPress={handleUpdate}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Actualizar Horario</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('WorkerList')}
        style={[styles.button, styles.backButton]}
      >
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminEdit;
