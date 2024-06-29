// MenuAdminStyles.js

import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export const MenuAdminStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: COLORS.black,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 15,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
    },
});

export default MenuAdminStyles;
