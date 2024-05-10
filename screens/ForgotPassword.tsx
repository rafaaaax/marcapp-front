import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import Button from '../components/Button';

const ForgotPassword = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState<string>('');
    
    const validateEmail = (text: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(text) && text.trim().length > 0;
    };

    const handleResetPassword = () => {
        if (!validateEmail(email)) {
            Alert.alert('Error', 'Ingrese un correo electrónico válido');
            return;
        }
        
        Alert.alert('Cambiar contraseña', `Se ha enviado un correo de restablecimiento de contraseña a ${email}`);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.green}}>
            <View style={{ flex: 1, marginHorizontal: 22, justifyContent: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: COLORS.black }}>
                    Recupera tu cuenta
                </Text>
                <Text style={{ fontSize: 16, color: COLORS.black }}>
                    Porfavor Ingresa tu email para enviar un codigo.
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
