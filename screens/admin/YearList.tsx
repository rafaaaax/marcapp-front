import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/colors';

const Year = ({ navigation, route }) => {
  const { selectedUsers } = route.params;
  const [loading, setLoading] = useState(true);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [yearlyData, setYearlyData] = useState([]); // Inicializa yearlyData como un arreglo vacío

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchYearlyData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(`user_${selectedUsers.join('_')}_yearly_data`);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setYearlyData(parsedData);
        } else {
          // Ejemplo de datos para el primer usuario si no hay datos almacenados
          setYearlyData([
            [160, 150, 170, 180, 160, 150, 155, 165, 140, 150, 155, 165], // Ejemplo de datos para el primer usuario
            [145, 155, 170, 165, 180, 160, 165, 155, 145, 160, 170, 175], // Ejemplo de datos para el segundo usuario
            // Añadir más ejemplos de datos si es necesario para más usuarios
          ]);
        }
      } catch (error) {
        console.error('Error al obtener datos de AsyncStorage:', error);
      }
      setLoading(false);
    };

    fetchYearlyData();
  }, [selectedUsers]);

  const handlePreviousYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  // Validación de yearlyData antes de utilizarlo
  if (!yearlyData || yearlyData.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </SafeAreaView>
    );
  }

  // Aquí puedes realizar cualquier transformación necesaria en yearlyData
  const filteredData = yearlyData.map(data => {
    return [
      data[0], // Mantén la estructura de los datos
      data[1]
      // Asegúrate de ajustar los datos según tu lógica específica para filtrar por año
    ];
  });

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    withHorizontalLabels: true,
    barPercentage: 0.7,
  };

  // Definimos los colores de las líneas para cada usuario
  const lineColors = ['#45a19f', '#97b0d1']; // Puedes agregar más colores si tienes más usuarios

  // Transformamos los datos en el formato esperado por LineChart
  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: selectedUsers.map((userId, index) => ({
      data: yearlyData[index], // Datos correspondientes al usuario actual
      color: (opacity = 1) => lineColors[index], // Color basado en el índice del usuario
      strokeWidth: 2,
      label: `ID ${userId}` // Nombre del usuario basado en el índice
    }))
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePreviousYear} style={styles.button}>
            <Text style={styles.buttonText}>Año Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextYear} style={styles.button}>
            <Text style={styles.buttonText}>Siguiente Año</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Horas Trabajadas por Mes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chartContainer}>
            <LineChart
              data={data}
              width={screenWidth}
              height={400}
              chartConfig={chartConfig}
            />
          </View>
        </ScrollView>

        <View style={styles.userInfoContainer}>
          <Text style={styles.userIdText}>ID de Usuario: {selectedUsers.join(', ')}</Text>
          {/* Aquí puedes mostrar el nombre del usuario si tienes esa información disponible */}
          {/* <Text style={styles.userNameText}>Nombre del Usuario: {userName}</Text> */}
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10, // Espacio arriba del texto
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 10,
  },
  userIdText: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    height: 50,
    width: 150,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
