import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import Button from '../components/Button';

const ForgotPassword = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const validateEmail = (text: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(text) && text.trim().length > 0;
    };

    const handleResetPassword = async () => {
        if (!validateEmail(email)) {
            Alert.alert('Error', 'Ingrese un correo electrónico válido');
            return;
        }
        setLoading(true);
        
        try {
            const ForgotPasswordFetch = await fetch('http://10.115.75.137:3000/user/reset-password', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                })
            });

            if (ForgotPasswordFetch.status == 200) {
                Alert.alert('Cambiar contraseña', `Se ha enviado un correo de restablecimiento de contraseña a ${email}`);
            } else {
                const data = await ForgotPasswordFetch.json();
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            console.error('Error al realizar el restablecimiento de contraseña:', error);
            Alert.alert('Error', 'Ocurrió un error al restablecer la contraseña. Por favor, intenta de nuevo más tarde');
        }

        setLoading(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22, justifyContent: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: COLORS.black }}>
                    Recupera tu cuenta
                </Text>
                <Text style={{ fontSize: 16, color: COLORS.black }}>
                    Por favor ingresa tu email para enviar un código.
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Text>Correo</Text>
                    <TextInput
                        placeholder='Ingresa tu Email'
                        placeholderTextColor={COLORS.black}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, paddingLeft: 22 }}
                    />
                </View>
                <Button
                    title="Cambiar contraseña"
                    onPress={handleResetPassword}
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.lightGray,
                        paddingVertical: 12,
                        borderRadius: 8,
                        marginTop: 10,
                    }}
                >
                    <Text style={{ fontSize: 16, color: COLORS.primary }}>Volver a login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPassword;
