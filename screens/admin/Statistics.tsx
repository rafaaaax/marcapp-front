// Statistics.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../constants/colors';
import { StatisticsStyles as styles } from '../../assets/styles/StatisticsStyles'; // Importa los estilos desde el nuevo archivo

const Statistics = ({ navigation, route }: { navigation: any, route: any }) => {
    const { userId } = route.params;

    const handleYear = () => {
        navigation.navigate('Year', { userId });
    };

    const handleWeek = () => {
        navigation.navigate('Week', { userId });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Dashboard</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.text}>
                    Seleccione el tipo de gráfico que desea visualizar!
                </Text>

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

export default Statistics;
