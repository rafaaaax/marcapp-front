import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/colors';


const Year = ({ navigation, route }) => {
  const { userId } = route.params;
  const [loading, setLoading] = useState(true);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const fetchYearlyData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(`user_${userId}_yearly_data`);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setYearlyData(parsedData);
        } else {
          // Ejemplo de datos de horas trabajadas por defecto si no se encuentra en AsyncStorage
          setYearlyData([160, 145, 180, 160, 170, 150, 155, 165, 140, 150, 155, 165]); // Ejemplo de horas por mes
        }
      } catch (error) {
        console.error('Error al obtener datos de AsyncStorage:', error);
      }
      setLoading(false);
    };

    fetchYearlyData();
  }, [userId]);

  const handlePreviousYear = () => {
    setCurrentYear(currentYear - 1);
    console.log(currentYear-1);
  };

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
    console.log(currentYear+1);
  };

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

  const formattedData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        data: yearlyData,
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlePreviousYear} style={styles.button}>
            <Text style={styles.buttonText}>Año Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextYear} style={styles.button}>
            <Text style={styles.buttonText}>Siguiente Año</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Horas Trabajadas por Mes</Text>
          <Text style={styles.userIdText}>ID de Usuario: {userId}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row' }}>
            <BarChart
              yAxisSuffix=''
              data={formattedData}
              width={Dimensions.get('window').width * 1.2} // Ajusta según tu diseño
              height={400} // Ajusta según tu diseño
              yAxisLabel={''}
              chartConfig={chartConfig}
              verticalLabelRotation={0}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('WorkerList')} style={styles.button}>
          <Text style={styles.buttonText}>Volver atrás</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Year;

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
    alignItems: 'center',
    marginTop: 20,
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
