import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';

import Button from '../../components/Button';
import { resetPassword } from '../../api/ResetPasswordConexion';
import { styles } from '../../assets/styles/ResetPasswordStyles';
import { serviceAxiosApi } from '../../services/serviceAxiosApi';


const ResetPassword = ({ route, navigation }: { route: any, navigation: any }) => {
    const { email: initialEmail } = route.params ?? {};
    const [email, setEmail] = useState<string>(initialEmail ?? '');
    const {userType : initialUser} = route.params ?? {};
    const [userType, setUserType] = useState<string>(initialUser ?? '');
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
            const forgotFetch = await serviceAxiosApi.patch(`${userType}/initial-password-recovery${email}`);
            if (forgotFetch) {
              setError('');
              console.log('Email enviado');
              Alert.alert('Éxito', 'El correo de recuperación ha sido enviado.');
              navigation.navigate('ResetPassword', { email: email });
            } else {
              setError('No se pudo enviar el correo. Intenta de nuevo.');
              Alert.alert('Error', 'No se pudo enviar el correo. Intenta de nuevo.');
            }
          } catch (error) {
            console.error('Error en la solicitud:', error);
            setError('Error de conexión. Verifica tu red.');
            Alert.alert('Error', 'Error de conexión. Verifica tu red.');
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
