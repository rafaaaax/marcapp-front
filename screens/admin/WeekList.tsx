import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/colors';

const Week = ({ navigation, route }) => {
  const { selectedUsers } = route.params; // Asegúrate de obtener selectedUsers correctamente
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());


  const screenWidth = Dimensions.get('window').width;
  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        // Ejemplo de obtención de datos desde AsyncStorage
        const storedData = await AsyncStorage.getItem(`user_${selectedUsers}_weekly_data`);
        
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setWeeklyData(parsedData);
        } else {
          // Ejemplo de datos si no hay datos almacenados
          setWeeklyData([
            [8,7,9,8,8],
            [7,8,9,6,2]
           
          ]);
        }
      } catch (error) {
        console.error('Error al obtener datos de AsyncStorage:', error);
      }
      setLoading(false);
    };


    fetchWeeklyData();
  }, [selectedUsers]);

  const handlePreviousWeek = () => {
    const previousWeek = new Date(currentWeek);
    previousWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(previousWeek);
    console.log(previousWeek)
};

const handleNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
    console.log(nextWeek);
};
   // Validación de yearlyData antes de utilizarlo
   if (!weeklyData || weeklyData.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text> Cargando datos...</Text>
      </SafeAreaView>
    );
  }
  // Aquí puedes realizar cualquier transformación necesaria en yearlyData
  const filteredData = weeklyData.map(data => {
    return [
      data[0], // Mantén la estructura de los datos
      data[1]
      // Asegúrate de ajustar los datos según tu lógica específica para filtrar por año
    ];
  });
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    withHorizontalLabels: true,
  };

  const lineColors = ['#45a19f', '#97b0d1'];

  const data = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
    datasets: selectedUsers.map((userId, index) => ({
      data: weeklyData[index], // Datos correspondientes al usuario actual
      color: (opacity = 1) => lineColors[index], // Color basado en el índice del usuario
      strokeWidth: 2,
      label: `ID ${userId}` // Nombre del usuario basado en el índice
    }))
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePreviousWeek} style={styles.button}>
            <Text style={styles.buttonText}>Semana Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextWeek} style={styles.button}>
            <Text style={styles.buttonText}>Semana Siguiente</Text>
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


export default Week;

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
