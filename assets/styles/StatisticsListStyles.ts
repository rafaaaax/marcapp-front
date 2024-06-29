// StatisticsListStyles.js

import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export const StatisticsListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 20,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: COLORS.black,
    },
    userItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    userId: {
        fontSize: 18,
        fontWeight: 'bold',
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

export default StatisticsListStyles;
