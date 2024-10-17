// AdminEdit.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { isValidDate, isValidTime } from '../../utils/validation';
import styles from '../../assets/styles/AdminEditStyles';

const AdminEdit = ({ navigation, route }: { navigation: any, route: any }) => {
  const { scheduleEntry, userId } = route.params;

  // Extraer el ID y los detalles de la entrada de horario
  const scheduleId = Object.keys(scheduleEntry)[0];
  const { date, entered, left } = scheduleEntry[scheduleId];

  const [editedDate, setEditedDate] = useState(date);
  const [editedEntered, setEditedEntered] = useState(entered);
  const [editedLeft, setEditedLeft] = useState(left);


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
        onPress={() => navigation.navigate('WorkerList')}
        style={[styles.button, styles.backButton]}
      >
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminEdit;
