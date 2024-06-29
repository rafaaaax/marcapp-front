import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/colors';

const Week = ({ navigation, route }: { navigation: any, route: any }) => {
  const { userId } = route.params;
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [weeklyHours, setWeeklyHours] = useState<number[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Aquí puedes realizar operaciones necesarias al cargar la semana actual
        // Por ejemplo, obtener datos de AsyncStorage, si es necesario
        setLoading(false);
      } catch (error) {
        console.error('Error:', error.message);
        setLoading(false);
      }
    };

    loadData();
  }, [userId, currentWeek]);

  useEffect(() => {
    // Función para obtener los datos de horas trabajadas desde AsyncStorage o un servicio
    const fetchWeeklyHours = async () => {
      try {
        // Ejemplo de obtención de datos desde AsyncStorage (debes adaptarlo según tu implementación)
        const storedData = await AsyncStorage.getItem(`user_${userId}_weekly_hours`);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setWeeklyHours(parsedData);
        } else {
          // Ejemplo de datos de horas trabajadas por defecto si no se encuentra en AsyncStorage
          setWeeklyHours([8, 7, 6, 8, 9, 6, 5]); // Ejemplo de horas por día de lunes a domingo
        }
      } catch (error) {
        console.error('Error al obtener datos de AsyncStorage:', error);
        // Manejar el error apropiadamente según tu aplicación
      }
    };

    fetchWeeklyHours();
  }, [userId]);

  const handlePreviousWeek = () => {
    const previousWeek = new Date(currentWeek);
    previousWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(previousWeek);
    console.log(previousWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
    console.log(nextWeek);
  };

  // Configuración del gráfico
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  // Preparar los datos para el gráfico
  const formattedData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        data: weeklyHours,
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlePreviousWeek} style={styles.button}>
            <Text style={styles.buttonText}>Semana Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextWeek} style={styles.button}>
            <Text style={styles.buttonText}>Siguiente Semana</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Horas Trabajadas por Día de la Semana</Text>
          <Text style={styles.userIdText}>ID de Usuario: {userId}</Text>
        </View>
        <View style={styles.chartContainer}>
          {/* Gráfico de barras */}
          <View style={styles.chart}>
            <BarChart
              yAxisSuffix=''
              data={formattedData}
              width={Dimensions.get('window').width - 20}
              height={400}
              yAxisLabel={'h'}
              chartConfig={chartConfig}
              verticalLabelRotation={0}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('WorkerList')} style={styles.button}>
          <Text style={styles.buttonText}>Volver atrás</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Week;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userIdText: {
    fontSize: 16,
    marginTop: 5,
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
  },
  chart: {
    marginTop: 20,
    borderRadius: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    height: 50,
    width: '45%',
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});
