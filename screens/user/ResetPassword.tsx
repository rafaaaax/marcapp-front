import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';

import Button from '../../components/Button';
import { resetPassword } from '../../api/ResetPasswordConexion';
import { styles } from '../../assets/styles/ResetPasswordStyles';
import { serviceAxiosApi } from '../../services/serviceAxiosApi';


const ResetPassword = ({ route, navigation }: { route: any, navigation: any }) => {
    const { email: initialEmail , userType} = route.params ?? {};
    const [email, setEmail] = useState<string>(initialEmail ?? '');
    const [code, setCode] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleResetPassword = async () => {
        if (email === '' || code === '' || newPassword === '') {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }
        if (code.length !== 6) {
            Alert.alert('Error', 'El código debe tener 6 caracteres');
            return;
        }
        setLoading(true);
        try {
            const forgotFetch = await serviceAxiosApi.patch(`${userType}/reset-password-recovery/${email}`,{
                code: code,
                newPassword: newPassword
            });
            if (forgotFetch) {
              setError('');
              console.log('Email enviado');
              Alert.alert('Éxito', 'La clave ha sido restablecida.');
              navigation.navigate('Login');
            } else {
              setError('No se pudo enviar el correo. Intenta de nuevo.');
              Alert.alert('Error', 'Codigo de verificacion incorrecto. Intenta de nuevo.');
            }
        } catch (error: any) {
            console.error('Error en la solicitud:', error);
    
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
    
                if (errorMessage.includes('invalid') || errorMessage.includes('expired')) {
                    Alert.alert('Error', 'Código de verificación inválido o expirado. Inténtalo de nuevo.');
                } else {
                    Alert.alert('Error', errorMessage);
                }
            } else {
                Alert.alert('Error', 'Error de conexión. Verifica tu red.');
            }
            setError('Código de verificación incorrecto o expirado. Intenta de nuevo.');
        } finally {
            setLoading(false);
          }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <Text style={styles.title}>Restablecer contraseña</Text>
                <Text style={styles.text}>
                    Ingresa tu correo, el código de restablecimiento y la nueva contraseña.
                </Text>
                <View>
                    <Text>Correo electrónico</Text>
                    <TextInput
                        placeholder='Ingresa tu correo electrónico'
                        placeholderTextColor={COLORS.black}
                        value={email}
                        onChangeText={setEmail}
                        editable={initialEmail === undefined}
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text>Código de restablecimiento</Text>
                    <TextInput
                        placeholder='Ingresa el código'
                        placeholderTextColor={COLORS.black}
                        value={code}
                        onChangeText={setCode}
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text>Nueva Contraseña</Text>
                    <TextInput
                        placeholder='Ingresa la nueva contraseña'
                        placeholderTextColor={COLORS.black}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>
                <Button
                    title="Restablecer contraseña"
                    onPress={handleResetPassword}
                    filled
                    style={{ marginTop: 18, marginBottom: 4 }}
                />
                {loading && <ActivityIndicator size="large" color={COLORS.primary} />}
                {error !== '' && <Text style={styles.errorText}>{error}</Text>}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={styles.loginButton}
                >
                    <Text style={styles.loginButtonText}>Volver a login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ResetPassword;
