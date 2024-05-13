import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



const Login = ({ navigation }: { navigation: any }) => {
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>();
    const [messageColor, setMessageColor] = useState<'red' | 'green' | 'black'>('black');

    const validateEmail = (text: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(text);
    };

    const handleLogin = async () => {
        if (email == '' || password == '') {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        setLoading(true);

        try {
            const loginFetch = await fetch('http://10.115.75.137:3000/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            });

            if (loginFetch.status == 201) {
                const data = await loginFetch.json();
                setMessageColor('green');
                await AsyncStorage.setItem('token', data.token);
                setMessage('¡Inicio de sesión exitoso!');
                navigation.navigate('Home'); // Reemplaza 'Home' con el nombre de tu pantalla de inicio
            } else {
                const data = await loginFetch.json();
                setMessageColor('red');
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error al realizar el inicio de sesión:', error);
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo más tarde');
        }

        setLoading(false);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22, justifyContent: 'center' }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: COLORS.black }}>
                        ¡Bienvenido! 👋
                    </Text>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Ingresa tu correo y contraseña para iniciar sesión</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Correo</Text>
                    <TextInput
                        placeholder='Ingresa tu correo'
                        placeholderTextColor={COLORS.black}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                        style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, paddingLeft: 22 }}
                    />
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Contraseña</Text>
                    <View style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 22 }}>
                        <TextInput
                            placeholder='Ingresa tu contraseña'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            value={password}
                            onChangeText={setPassword}
                            style={{ width: '85%' }}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{ padding: 10 }}
                        >
                            <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Button
                    title="Iniciar sesión"
                    filled
                    onPress={handleLogin}
                    style={{ marginTop: 18, marginBottom: 4 }}
                />

                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.lightGray,
                        paddingVertical: 12,
                        borderRadius: 8,
                        marginTop: 20,
                    }}
                >
                    <Text style={{ fontSize: 16, color: COLORS.black }}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.lightGray,
                        paddingVertical: 12,
                        borderRadius: 8,
                        marginTop: 10,
                    }}
                >
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Regístrate</Text>
                </TouchableOpacity>

                {loading && <ActivityIndicator color={COLORS.blue} />}
                {message && <Text style={{ color: messageColor }}>{message}</Text>}
            </View>
        </SafeAreaView>
    );
};

export default Login;