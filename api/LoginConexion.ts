// api.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://locahost:3000';

export const loginUser = async (email, password, userType) => {
    try {
        const loginFetch = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                userType
            })
        });

        return loginFetch;
    } catch (error) {
        throw new Error('Error during login fetch');
    }
};

export const checkAdminStatus = async (token) => {
    try {
        const isAdminResponse = await fetch(`${BASE_URL}/schedule/isAdmin`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return isAdminResponse.json();
    } catch (error) {
        throw new Error('Error while checking admin status');
    }
};

export const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        throw new Error('Error storing token');
    }
};
