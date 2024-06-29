import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import axios from 'axios';
import COLORS from '../../constants/colors';
import styles from '../../assets/styles/WorkerListStyles';

const WorkerList = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        fetchUserList();
    }, []);

    const fetchUserList = async () => {
        try {
            const response = await axios.post('http://10.115.75.137:3000/user');
            setUsers(response.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const navigateToUserDetail = (userId) => {
        navigation.navigate('UserDetails', { userId });
    };

    const toggleUserSelection = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const handleSaveSelection = () => {
        if (selectedUsers.length === 1 || selectedUsers.length === 0) {
            Alert.alert('Alerta', 'Por favor selecciona al menos dos usuarios.');
            return;
        }
        console.log(selectedUsers);
        navigation.navigate('StatisticsList', { selectedUsers: selectedUsers });
    };
   
    const renderUser = ({ item }) => (
        <TouchableOpacity
            style={styles.userItem}
            onPress={() => navigateToUserDetail(item.id)}
        >
            <View>
                <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            <TouchableOpacity
                onPress={() => toggleUserSelection(item.id)}
                style={[styles.selectButton, {
                    backgroundColor: selectedUsers.includes(item.id) ? COLORS.primary : '#fff',
                    borderColor: COLORS.primary,
                }]}
            >
                <Text style={{ color: selectedUsers.includes(item.id) ? '#fff' : COLORS.primary }}>
                    {selectedUsers.includes(item.id) ? 'Seleccionado' : 'Seleccionar'}
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const filteredUsers = users.filter(user =>
        user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar usuario..."
                onChangeText={text => setSearchText(text)}
                value={searchText}
            />
            <FlatList
                data={filteredUsers}
                renderItem={renderUser}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                onPress={handleSaveSelection}
                style={styles.saveButton}
            >
                <Text style={styles.buttonText}>Guardar selección</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('MenuAdmin')} // Cambiado a goBack() para volver a la pantalla anterior
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.white,
                    paddingVertical: 12,
                    borderRadius: 8,
                    marginTop: 20,
                }}
            >
                <Text style={{ fontSize: 16, color: COLORS.primary }}>Volver al inicio</Text>
            </TouchableOpacity>
        </View>
    );
};

export default WorkerList;
