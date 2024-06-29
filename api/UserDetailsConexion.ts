// api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://10.115.75.137:4000'; // Puedes ajustar la URL base según tu entorno

export const fetchUserDetails = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        throw error;
    }
};

export const fetchUserSchedule = async (inputDate, userId) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('No se encontró el token.');
        }

        const response = await axios.post(`${baseURL}/schedule/findUserWeek`, {
            inputDate: inputDate,
            userFound: userId
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user schedule:', error.message);
        throw error;
    }
};
