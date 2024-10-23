import { Alert } from 'react-native';
import { serviceAxiosApi } from '../services/serviceAxiosApi';

export const handleForgotPassword = async (email: string, navigation: any, setLoading: (loading: boolean) => void, setError: (error: string) => void) => {
  try {
    const forgotFetch = await serviceAxiosApi.post(`mail/send`, {
      to: email,
      subject: 'Recuperación de contraseña',
      text: 'Recuperación de contraseña',
      html: `<p>Hola, has solicitado recuperar tu contraseña. Haz clic en el siguiente enlace para restablecerla: <a href="http://localhost:3000/reset-password?email=${email}">Recuperar contraseña</a></p>`  
    });

    if (forgotFetch.status === 200) {
      setError('');
      navigation.navigate('ResetPassword', { email: email });
    }
  } catch (error) {
    setError('Error de conexión');
  } finally {
    setLoading(false);
  }
};
