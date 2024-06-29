import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/colors';
import styles from '../../assets/styles/UserDetailsStyles';


const UserDetails = ({ navigation, route }: { navigation: any, route: any }) => {
    const { userId } = route.params;
    const [user, setUser] = useState<any>(null);
    const [schedule, setSchedule] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentWeek, setCurrentWeek] = useState<Date>(new Date());

    useEffect(() => {
        const loadData = async () => {
            try {
                const inputDate = currentWeek.toISOString().split('T')[0];
                await fetchUserDetails(userId);
                const fetchedSchedule = await fetchUserSchedule(inputDate, userId);
                setSchedule(fetchedSchedule);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error.message);
                setLoading(false);
            }
        };

        loadData();
    }, [userId, currentWeek]);

    const fetchUserDetails = async (id: number) => {
        try {
            const response = await axios.get(`http://10.115.75.137:3000/user/${id}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error.message);
            throw error;
        }
    };

    const fetchUserSchedule = async (inputDate: string, userId: number) => {
    
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('No se encontró el token.');
            }

            const response = await axios.post(`http://10.115.75.137:4000/schedule/findUserWeek`, {
                inputDate: inputDate,
                userFound: userId
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error('Error fetching user schedule:', error.message);
            throw error;
        }
    };

    const handlePreviousWeek = () => {
        const previousWeek = new Date(currentWeek);
        previousWeek.setDate(currentWeek.getDate() - 7);
        setCurrentWeek(previousWeek);
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(currentWeek);
        console.log(nextWeek)
        nextWeek.setDate(currentWeek.getDate() + 7);
        setCurrentWeek(nextWeek);
    };

    const handleEditSchedule = (scheduleEntry: any) => {
        navigation.navigate('AdminEdit', { userId: userId, scheduleEntry });
    };

    const handleVerEstadisticas = () => {
        // Aquí deberías navegar a la pantalla de estadísticas
        navigation.navigate('Statistics', { userId: userId });
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Cargando detalles del usuario...</Text>
            </View>
        );
    }

    if (!user || !schedule) {
        return (
            <View style={styles.container}>
                <Text>No se pudieron cargar los detalles del usuario.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handlePreviousWeek} style={styles.button}>
                    <Text style={styles.buttonText}>Semana Anterior</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextWeek} style={styles.button}>
                    <Text style={styles.buttonText}>Siguiente Semana</Text>
                </TouchableOpacity>
            </View>
           
            <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <View style={styles.scheduleContainer}>
                {Object.entries(schedule).map(([id, entry]: [string, any]) => (
                    <TouchableOpacity key={id} style={styles.scheduleItem} onPress={() => handleEditSchedule({ [id]: entry })}>
                        <Text>Fecha: {entry.date}</Text>
                        <Text>Entrada: {entry.entered}</Text>
                        <Text>Salida: {entry.left ? entry.left : 'No registrado'}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity onPress={handleVerEstadisticas} style={styles.button}>
                <Text style={styles.buttonText}>Ver Estadísticas</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('WorkerList')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Volver al inicio</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UserDetails;
