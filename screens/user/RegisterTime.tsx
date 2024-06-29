// RegisterTime.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import COLORS from '../../constants/colors';
import styles from '../../assets/styles/RegisterTime';


const RegisterTime = ({ navigation }: { navigation: any }) => {
    const [entryTime, setEntryTime] = useState('');
    const [exitTime, setExitTime] = useState('');
    const [error, setError] = useState('');
    const [location, setLocation] = useState<string | null>(null);
    const [isFetchingLocation, setIsFetchingLocation] = useState(true);

    // Función para obtener la hora actual en formato HH:mm:ss
    const getCurrentTime = () => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        const currentSecond = currentDate.getSeconds();
        return `${currentHour}:${currentMinute}:${currentSecond}`;
    };

    useEffect(() => {
        // Función asincrónica para obtener la ubicación actual
        (async () => {
            try {
                console.log('Solicitando permisos de ubicación...');
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permiso no concedido');
                    setError('Permiso de ubicación no concedido');
                    setIsFetchingLocation(false);
                    return;
                }

                console.log('Permiso concedido');
                const locationData = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                console.log('Ubicación obtenida:', locationData);
                const { latitude, longitude, accuracy } = locationData.coords;
                setLocation(`${latitude}/${longitude}/${accuracy}`);
            } catch (err) {
                console.error('Error obteniendo la ubicación:', err);
                setError('Error obteniendo la ubicación');
            } finally {
                setIsFetchingLocation(false);
            }
        })();
    }, []);

    useEffect(() => {
        // Función para verificar si ya se ha marcado la entrada y salida para el día actual
        const checkAlreadyMarked = async () => {
            try {
                const currentDate = new Date().toISOString().split('T')[0];
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    throw new Error('No se encontró el token.');
                }

                const entryResponse = await fetch(`http://10.115.75.137:4000/schedule/entry/${currentDate}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                });

                if (entryResponse.status === 200) {
                    const entryData = await entryResponse.json();
                    setEntryTime(entryData.entered);
                }

                const exitResponse = await fetch(`http://10.115.75.137:4000/schedule/departure/${currentDate}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                });

                if (exitResponse.status === 200) {
                    const exitData = await exitResponse.json();
                    setExitTime(exitData.left);
                }
            } catch (error) {
                console.error('Error al obtener datos de entrada y salida:', error.message);
                setError('Error al obtener datos de entrada y salida');
            }
        };

        checkAlreadyMarked();
    }, []);

    // Función para manejar el registro de tiempo de entrada o salida
    const handleTime = async (type: 'Ingreso' | 'Salida') => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('No se encontró el token.');
            }
    
            const currentTime = new Date().toISOString().split('T')[0];
    
            const url = type === 'Ingreso' ? 'http://10.115.75.137:4000/schedule/entry' : 'http://10.115.75.137:4000/schedule/departure';
            const body = {
                date: currentTime,
                entered: type === 'Ingreso' ? entryTime || getCurrentTime() : undefined,
                left: type === 'Salida' ? exitTime || getCurrentTime() : undefined,
                enteredLocation: type === 'Ingreso' ? location : undefined,
                leftLocation: type === 'Salida' ? location : undefined
            };
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(body)
            });
    
            if (response.status === 201) {
                Alert.alert(
                    type === 'Ingreso' ? 'Hora de entrada registrada' : 'Hora de salida registrada',
                    `Tu hora de ${type.toLowerCase()} es: ${getCurrentTime()}`
                );
                type === 'Ingreso' ? setEntryTime(getCurrentTime()) : setExitTime(getCurrentTime());
            } else if (response.status === 400) {
                const errorMessage = await response.json();
                Alert.alert('Error', errorMessage.message || 'Error desconocido al registrar la hora');
            } else {
                throw new Error('Error desconocido al registrar la hora');
            }
        } catch (error) {
            console.error('Error al registrar hora:', error.message);
            Alert.alert('Error', error.message || 'Ocurrió un error al conectar con el servidor. Por favor, revisa tu conexión e intenta de nuevo.');
        }
    };
    
    // Renderizado mientras se obtiene la ubicación
    if (isFetchingLocation) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.locationText}>Obteniendo ubicación...</Text>
            </SafeAreaView>
        );
    }
    
    // Renderizado del componente principal
    return (
        <SafeAreaView style={styles.container}>
            {error ? (
                <Text style={styles.locationText}>{error}</Text>
            ) : (
                <View style={styles.content}>
                    <Text style={styles.locationText}>
                        Ubicación: {location}
                    </Text>
    
                    <Text style={styles.header}>Registra tu hora!</Text>
    
                    {entryTime === '' && (
                        <TouchableOpacity
                            onPress={() => handleTime('Ingreso')}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Ingreso</Text>
                        </TouchableOpacity>
                    )}
    
                    {exitTime === '' && (
                        <TouchableOpacity
                            onPress={() => handleTime('Salida')}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Salida</Text>
                        </TouchableOpacity>
                    )}
    
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        style={styles.backButton}
                    >
                        <Text style={{ fontSize: 20, color: COLORS.primary }}>Volver al perfil</Text>
                    </TouchableOpacity>
    
                    {exitTime !== '' && (
                        <View style={styles.timeContainer}>
                            <Text>Última salida:</Text>
                            <Text>{exitTime}</Text>
                        </View>
                    )}
                </View>
            )}
        </SafeAreaView>
    );
};

export default RegisterTime;
