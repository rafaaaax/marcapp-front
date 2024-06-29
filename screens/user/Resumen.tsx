// Resumen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Button from '../../components/Button';
import { formatDate } from '../../utils/dateUtils';
import styles from '../../assets/styles/ResumenStyles';


type Entry = {
    date: string;
    entered: string;
    left: string | null;
};

const Resumen = ({ navigation, workerId }: { navigation: any, workerId?: any }) => {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [weekEntries, setWeekEntries] = useState<any[]>([]);

    useEffect(() => {
        const formattedCurrentWeek = currentWeek.toISOString().split('T')[0];
        fetchWeeklyEntries(formattedCurrentWeek);
    }, [currentWeek]);

    const fetchWeeklyEntries = async (inputDate: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('No se encontró el token.');
            }

            const response = await axios.get(`http://10.115.75.137:4000/schedule/${inputDate}`, {
                params: {
                    inputDate: inputDate
                },
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });

            const data = response.data;
            setWeekEntries(Object.values(data));
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handlePreviousWeek = () => {
        const previousWeek = new Date(currentWeek);
        previousWeek.setDate(currentWeek.getDate() - 7);
        setCurrentWeek(previousWeek);
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(currentWeek);
        nextWeek.setDate(currentWeek.getDate() + 7);
        setCurrentWeek(nextWeek);
    };

    const renderEntry = ({ item }: { item: Entry }) => {
        return (
            <View style={styles.entryContainer}>
                <Text style={styles.entryDate}>
                    {formatDate(item.date)}
                </Text>
                <Text style={styles.entryTime}>
                    Entrada: {item.entered}
                </Text>
                <Text style={styles.entryTime}>
                    Salida: {item.left ? item.left : 'No hay registro de salida'}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Resumen Semanal</Text>
            <View style={styles.buttonContainer}>
                <Button title="Semana Anterior" onPress={handlePreviousWeek} filled />
                <Button title="Semana Siguiente" onPress={handleNextWeek} filled />
            </View>
            {weekEntries.length > 0 ? (
                <FlatList
                    data={weekEntries}
                    renderItem={renderEntry}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text style={styles.emptyMessage}>No hay registros para esta semana</Text>
            )}
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={styles.backButton}
            >
                <Text style={styles.backButtonText}>Volver al inicio</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Resumen;
