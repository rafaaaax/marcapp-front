
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import COLORS from '../../constants/colors';
import { StatisticsListStyles as styles } from '../../assets/styles/StatisticsListStyles'; // Importa los estilos desde el nuevo archivo

const StatisticsList = ({ navigation, route }: { navigation: any, route: any }) => {
    const { selectedUsers } = route.params;

    const handleYear = () => {
        navigation.navigate('YearList', { selectedUsers: selectedUsers });
    };

    const handleWeek = () => {
        navigation.navigate('WeekList', { selectedUsers: selectedUsers });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Dashboard</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.text}>
                    IDs de los usuarios seleccionados:
                </Text>

                <FlatList
                    data={selectedUsers}
                    renderItem={({ item }) => (
                        <View style={styles.userItem}>
                            <Text style={styles.userId}>{item}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.toString()}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleYear}
                >
                    <Text style={styles.buttonText}>Año</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleWeek}
                >
                    <Text style={styles.buttonText}>Semana</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default StatisticsList;
