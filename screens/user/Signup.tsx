import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import Button from '../../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { validateEmail, validateName, validatePassword } from '../../utils/validation';
import styles from '../../assets/styles/SignUpStyles';

interface Props {
    navigation: any;
}

const Signup = ({ navigation }: Props) => {
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'Trabajador' | 'Administrador'>();
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('black');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateOfBirthPress = () => {
        setShowDatePicker(true);
    };
    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            // Establecer la hora actual
            const currentHour = new Date().getHours();
            const currentMinute = new Date().getMinutes();
            const newBirthday = new Date(selectedDate);
            newBirthday.setHours(currentHour);
            newBirthday.setMinutes(currentMinute);
            setBirthday(newBirthday);
        }
    };
    console.log(role)
    const handleRegister = async () => {
        if (!validateName(name)) {
            Alert.alert('Error', 'Ingrese un nombre válido');
            return;
        }
        if (!validateName(lastName)) {
            Alert.alert('Error', 'Ingrese un apellido válido');
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert('Error', 'Ingrese un correo electrónico válido');
            return;
        }
        if (!validatePassword(password)) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }
        if (!role) {
            Alert.alert('Error', 'Seleccione un rol (Trabajador o Administrador)');
            return;
        }
        if (!birthday) {
            Alert.alert('Error', 'Seleccione su fecha de nacimiento');
            return;
        }  // Verificar qué valor tiene role antes de asignar isAdminValue
        // console.log('Role seleccionado:', role);
    
        // // Mapear el valor de role a 0 o 1 según corresponda
        // const isAdminValue = role === 'Administrador' ? 1 : 0;
        // console.log('isAdminValue:', isAdminValue); // Verificar qué valor se está enviando
        setLoading(true);
      
    
        try {

            const registerReq = await fetch(`http://10.115.75.137:3000/user/create`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: name,
                    lastName: lastName,
                    email: email,
                    password: password,
                    birthday: birthday?.toISOString().split('T')[0], // Formato yyyy-mm-dd
                    isAdmin: role,
                })
            });
    
             if (registerReq.status === 201) {
                navigation.navigate('Login');
            } else {
                const data = await registerReq.json();
                if (registerReq.status === 409) {
                    Alert.alert('Error', 'El correo electrónico ya está registrado');
                } else {
                    setMessageColor('red');
                    setMessage(data.message);
                }
            }
        } catch (error) {
            console.log("2")
            console.error('Error:', error);
            setMessageColor('red');
            setMessage('Error de servidor');
        } finally {
            setLoading(false);
        }
    };   
                       

  
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={styles.sectionTitle}>Crear Cuenta!</Text>
                    <Text style={styles.sectionSubtitle}>Ingresa tus datos personales</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text>Nombre</Text>
                    <TextInput
                        placeholder='Ingresa tu nombre'
                        placeholderTextColor={COLORS.black}
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Apellido</Text>
                    <TextInput
                        placeholder='Ingresa tu apellido'
                        placeholderTextColor={COLORS.black}
                        value={lastName}
                        onChangeText={setLastName}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Email</Text>
                    <TextInput
                        placeholder='Ingresa tu correo'
                        placeholderTextColor={COLORS.black}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Contraseña</Text>
                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            placeholder='Ingresa tu contraseña'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            value={password}
                            onChangeText={setPassword}
                            style={{ width: '100%' }}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text>Selecciona tu rol</Text>
                    <View style={styles.roleContainer}>
                    <TouchableOpacity
                                 onPress={() => setRole('0')}
                                 style={[styles.roleButton, { backgroundColor: role === 'Trabajador' ? COLORS.blue : COLORS.primary }]}
                                >
                         <Text style={{ color: COLORS.white }}>Trabajador</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => setRole('1')}
                     style={[styles.roleButton, { backgroundColor: role === 'Administrador' ? COLORS.blue : COLORS.primary }]}
                    >
                <Text style={{ color: COLORS.white }}>Administrador</Text>
                    </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.dateOfBirthContainer}>
                    <TouchableOpacity onPress={handleDateOfBirthPress} style={styles.datePickerButton}>
                        <Text style={styles.dateOfBirthText}>Selecciona tu fecha de nacimiento</Text>
                        <Text>{birthday ? birthday.toLocaleDateString('en-US') : 'Elegir fecha'}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={birthday || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>
                <Button
                    title="Registrarse"
                    filled
                    onPress={handleRegister}
                    style={{ marginTop: 18, marginBottom: 4 }}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={styles.linkButton}
                >
                    <Text style={styles.linkButtonText}>Volver a login</Text>
                </TouchableOpacity>
                <View style={styles.messageContainer}>
                    <Text style={[styles.messageText, { color: messageColor }]}>{message}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Signup;

