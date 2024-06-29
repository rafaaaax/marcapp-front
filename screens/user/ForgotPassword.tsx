import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import Button from '../../components/Button';
import { handleForgotPassword } from '../../api/ForgotPasswordConexion';
import { validateEmail } from '../../utils/validation';
import { styles } from '../../assets/styles/ForgotPasswordStyles';


const ForgotPassword = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');



  const handleForgotPasswordPress = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Ingrese un correo electrónico válido');
      return;
    }
    setLoading(true);
    
    // Llamamos a la función de conexión y le pasamos los estados y la navegación
    await handleForgotPassword(email, navigation, setLoading, setError);
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
