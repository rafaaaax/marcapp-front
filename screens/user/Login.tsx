import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/colors';
import Button from '../../components/Button';
import styles from '../../assets/styles/LoginStyles';
import { validateEmail, validatePassword } from '../../utils/validation';

const Login = ({ navigation }: { navigation: any }) => {
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const handleLogin = async () => {
        if (email === '' || password === '') {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }
    
        if (!validateEmail(email)) {
            Alert.alert('Error', 'Por favor, ingrese un correo electrónico válido');
            return;
        }
        if (!validatePassword(password)){
            Alert.alert('Error', 'Contraseña invalida');
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
    
            if (loginFetch.status === 201 || loginFetch.status === 200) {
                const data = await loginFetch.json();
    
                if (data.token && data.token.token) {
                    const token = data.token.token;
                    await AsyncStorage.setItem('token', token);
    
                    // Simulación de respuesta de no administrador
                    const isAdminResponse = await fetch('http://10.115.75.137:4000/schedule/isAdmin', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
    
                    const isAdminData = await isAdminResponse.json();
                    console.log(isAdminData);
                    if (isAdminData.isAdmin) {
                        setIsAdmin(true);
                        navigation.navigate('MenuAdmin');
                    } else {
                        navigation.navigate('Home');
                    }
                } else {
                    setMessage('Token no recibido del servidor');
                }
            } else if (loginFetch.status === 500) {
                // Simulación de respuesta de usuario no registrado
                Alert.alert('Error', 'Usuario no registrado');
            } else {
                // Simulación de respuesta de credenciales inválidas
                Alert.alert('Error', 'Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error al realizar el inicio de sesión:', error);
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo más tarde');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>MarcApp</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.welcomeText}>¡Bienvenido! 👋</Text>
                    <Text style={styles.introText}>Ingresa tu correo y contraseña para iniciar sesión</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Correo</Text>
                    <TextInput
                        placeholder='Ingresa tu correo'
                        placeholderTextColor={COLORS.black}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Contraseña</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder='Ingresa tu contraseña'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            value={password}
                            onChangeText={setPassword}
                            style={styles.passwordInput}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Button
                    title="Iniciar sesión"
                    filled
                    onPress={handleLogin}
                    style={styles.button}
                />

                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                    style={styles.linkButton}
                >
                    <Text style={styles.linkButtonText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                    style={styles.linkButton}
                >
                    <Text style={styles.linkButtonText}>Regístrate</Text>
                </TouchableOpacity>

                {loading && (
                    <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingIndicator} />
                )}

                {message !== '' && (
                    <Text style={styles.errorMessage}>{message}</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Login;
