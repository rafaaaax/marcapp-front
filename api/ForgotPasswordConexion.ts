import { Alert } from 'react-native';

export const handleForgotPassword = async (email: string, navigation: any, setLoading: (loading: boolean) => void, setError: (error: string) => void) => {
  try {
    const forgotFetch = await fetch('http://10.115.75.137:3000/user/request-reset-password', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
      })
    });

    if (forgotFetch.ok) {
      setError('');
      navigation.navigate('ResetPassword', { email: email });
    } else if (forgotFetch.status === 500) {
      Alert.alert('Usuario no registrado');
    } else {
      const response = await forgotFetch.json();
      setError(response.error);
    }
  } catch (error) {
    setError('Error de conexión');
  } finally {
    setLoading(false);
  }
};
