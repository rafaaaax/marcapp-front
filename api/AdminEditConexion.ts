
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.115.75.137:4000';

export const updateSchedule = async (scheduleId, editedDate, editedEntered, editedLeft, userId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token.');
    }

    const url = `${BASE_URL}/schedule`;
    const body = {
      updateScheduleDto: {
        id: Number(scheduleId),
        date: editedDate,
        entered: editedEntered,
        left: editedLeft,
      },
      userFound: Number(userId),
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorMessage = await response.json();
      if (response.status === 409) {
        throw new Error('Ya existe un horario para esta fecha y usuario. Por favor, verifica la información.');
      } else {
        throw new Error(errorMessage.message || 'Ocurrió un error en la actualización del horario.');
      }
    }
  } catch (error) {
    throw new Error(error.message || 'Ocurrió un error al conectar con el servidor. Por favor, revisa tu conexión e intenta de nuevo.');
  }
};
