import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import Button from '../components/Button';

interface Props {
    navigation: any;
}

const Signup = ({ navigation }: Props) => {
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [day, setDay] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [year, setYear] = useState<string>('');

    const validateName = (text: string) => {
        const regex = /^[a-zA-Z\s]*$/;
        return regex.test(text) && text.trim().length > 0;
    };

    const validateLastName = (text: string) => {
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

    const handleRegister = () => {
        if (!validateName(name)) {
            Alert.alert('Error', 'Ingrese un nombre válido');
            return;
        }
        if (!validateLastName(lastName)) {
          
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
        if (phone.length !== 12) {
        
            Alert.alert('Error', 'El número de teléfono debe tener 8 dígitos');
            return;
        }
        // Construir la fecha de nacimiento
        const birthdayString = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
        const birthdayDate = new Date(birthdayString);
    
        Alert.alert('Registro Exitoso', '¡Tus datos han sido registrados con éxito!');
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
                 
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                    <View style={{ flex: 1, marginRight: 5 }}>
                        <Text>Día</Text>
                        <TextInput
                            placeholder='dd'
                            placeholderTextColor={COLORS.black}
                            value={day}
                            onChangeText={setDay}
                            keyboardType='numeric'
                            maxLength={2}
                            style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, paddingLeft: 22 }}
                        />
                    </View>
                    <View style={{ flex: 1, marginRight: 5 }}>
                        <Text>Mes</Text>
                        <TextInput
                            placeholder='mm'
                            placeholderTextColor={COLORS.black}
                            value={month}
                            onChangeText={setMonth}
                            keyboardType='numeric'
                            maxLength={2}
                            style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, paddingLeft: 22 }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text>Año</Text>
                        <TextInput
                            placeholder='yyyy'
                            placeholderTextColor={COLORS.black}
                            value={year}
                            onChangeText={setYear}
                            keyboardType='numeric'
                            maxLength={4}
                            style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, paddingLeft: 22 }}
                        />
                    </View>
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
                    <Text>Telefono</Text>
                    <TextInput
                        placeholder='+56912345678'
                        placeholderTextColor={COLORS.black}
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType='numeric'
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
                
                <Button
                    title="Registrar"
                    onPress={handleRegister}
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
                    <Text style={{ fontSize: 16, color: COLORS.black }}>ya tienes cuenta?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Signup;
