import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import Button from '../components/Button';

const Login = ({ navigation }: { navigation: any }) => {
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const validateEmail = (text: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(text);
    };

    const handleLogin = () => {
        if (!validateEmail(email)) {
            Alert.alert('Error', 'Ingrese un correo electrónico válido');
            return;
        }
        
        // Aquí iría la lógica para validar la contraseña
        // Por ahora, solo mostraremos un mensaje de error si la contraseña es vacía
        if (!password) {
            Alert.alert('Error', 'Ingrese una contraseña');
            return;
        }

        // Aquí iría la lógica para verificar si el usuario existe y si la contraseña es correcta
        // Por ahora, mostraremos un mensaje de error genérico
        Alert.alert('Error', 'Usuario no registrado o contraseña incorrecta');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22, justifyContent: 'center' }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: COLORS.black }}>
                        Bienvenido ! 👋
                    </Text>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Ingresa tu correo y contraseña para marcar hora</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Correo</Text>
                    <TextInput
                        placeholder='Ingresa tu Email'
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
                            secureTextEntry={isPasswordShown}
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
                    title="Login"
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
            </View>
        </SafeAreaView>
    );
};

export default Login;