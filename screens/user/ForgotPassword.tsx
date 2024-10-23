import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import Button from '../../components/Button';
import { validateEmail } from '../../utils/validation';
import { styles } from '../../assets/styles/ForgotPasswordStyles';
import { serviceAxiosApi } from '../../services/serviceAxiosApi';
import { Picker } from '@react-native-picker/picker'; // Importar el Picker

const ForgotPassword = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [userType, setUserType] = useState<'parent' | 'professor' | 'student' | 'admin'>('parent'); // Estado para el Picker

  const handleForgotPasswordPress = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Ingrese un correo electrónico válido');
      return;
    }
    setLoading(true);

    try {
      const forgotFetch = await serviceAxiosApi.patch(`${userType}/initial-password-recovery${email}`);
      if (forgotFetch) {
        setError('');
        console.log('Email enviado');
        Alert.alert('Éxito', 'El correo de recuperación ha sido enviado.');
        navigation.navigate('ResetPassword', { email: email, userType: userType });
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>¡Olvidé mi contraseña!</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>
          Ingresa tu correo electrónico para restablecer tu contraseña.
        </Text>
        <View style={styles.inputContainer}>
          <Text>Email</Text>
          <TextInput
            placeholder='Ingresa tu correo'
            placeholderTextColor={COLORS.black}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        {/* Añadir el Picker para seleccionar el tipo de usuario */}
        <View style={styles.inputContainer}>
          <Text>Tipo de Usuario</Text>
          <Picker
            selectedValue={userType}
            onValueChange={(itemValue) => setUserType(itemValue)}
            style={{ height: 50, width: '100%' }} 
          >
            <Picker.Item label="Apoderado" value="parent" />
            <Picker.Item label="Profesor" value="professor" />
            <Picker.Item label="Estudiante" value="student" />
            <Picker.Item label="Administración" value="admin" />
          </Picker>
        </View>

        <Button
          title="Solicitar restablecimiento"
          onPress={handleForgotPasswordPress}
          filled
          style={styles.button}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Volver a login</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color={COLORS.primary} />}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
