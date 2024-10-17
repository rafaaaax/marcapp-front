// MenuAdmin.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MenuAdminStyles as styles } from '../../assets/styles/MenuAdminStyles'; // Importa los estilos desde el nuevo archivo

const MenuAdmin = ({ navigation }: { navigation: any }) => {

    const handleLogout = async () => {
        try {
            // Eliminar el token de AsyncStorage
            await AsyncStorage.removeItem('token');
            // Navegar de vuelta a la pantalla de Login
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Manejar cualquier error que ocurra durante el proceso de cierre de sesión
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Menú de Administrador</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('WorkerList')}
                >
                    <Text style={styles.buttonText}>Ver lista de trabajadores</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={handleLogout}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.lightGray,
                        paddingVertical: 12,
                        borderRadius: 8,
                        marginTop: 10,
                    }}
                >
                    <Text style={{ fontSize: 16, color: COLORS.primary }}>Cerrar Sesión</Text>
                </TouchableOpacity>
                
                {/* Agrega más opciones según sea necesario */}
            </View>
        </SafeAreaView>
    );
};

export default MenuAdmin;
