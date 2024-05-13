import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';

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

    const validateName = (text: string) => {
        const regex = /^[a-zA-Z\s]*$/;
        return regex.test(text) && text.trim().length > 0;
    };

    const validateEmail = (text: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(text) && text.trim().length > 0;
    };

    const validatePassword = (text: string) => {
        return text.trim().length >= 6;
    };

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
        }

        setLoading(true);

        try {
            const registerReq = await fetch(`http://10.115.75.137:3000/user`, {
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
                setMessage('');
                navigation.navigate('Login');
            } else {
                const data = await registerReq.json();
                setMessageColor('red');
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessageColor('red');
            setMessage('Error de servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: COLORS.black }}>
                        Crear Cuenta!
                    </Text>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Ingresa tus datos personales</Text>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text>Nombre</Text>
                    <TextInput
                        placeholder='Ingresa tu nombre'
                        placeholderTextColor={COLORS.black}
                        value={name}
                        onChangeText={setName}
                        style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, paddingLeft: 22 }}
                    />
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text>Apellido</Text>
                    <TextInput
                        placeholder='Ingresa tu apellido'
                        placeholderTextColor={COLORS.black}
                        value={lastName}
                        onChangeText={setLastName}
                        style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, paddingLeft: 22 }}
                    />
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text>Email </Text>
                    <TextInput
                        placeholder='Ingresa tu correo'
                        placeholderTextColor={COLORS.black}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, paddingLeft: 22 }}
                    />
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text>Contraseña</Text>
                    <View style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
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
                            style={{ position: "absolute", right: 12 }}
                        >
                            <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text>Rol</Text>
                    <TouchableOpacity
                        onPress={() => setRole('0')}
                        style={{
                            backgroundColor: role === 'Trabajador' ? COLORS.blue : COLORS.lightGray,
                            paddingVertical: 12,
                            borderRadius: 8,
                            marginTop: 10,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: role === 'Trabajador' ? COLORS.white : COLORS.black }}>Trabajador</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setRole('1')}
                        style={{
                            backgroundColor: role === 'Administrador' ? COLORS.blue : COLORS.lightGray,
                            paddingVertical: 12,
                            borderRadius: 8,
                            marginTop: 10,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: role === 'Administrador' ? COLORS.white : COLORS.black }}>Administrador</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity onPress={handleDateOfBirthPress}>
                        <Text>{birthday ? birthday.toLocaleDateString('en-US') : 'Seleccionar fecha de nacimiento'}</Text>
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
                    title='Registrarse'
                    color={'blue'}
                    onPress={handleRegister}
                />
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ color: messageColor }}>{message}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Signup;

