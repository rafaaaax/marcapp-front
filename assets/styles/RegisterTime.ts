// styles.ts

import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        height: 50,
        width: '80%',
        borderRadius: 8,
        marginVertical: 10,
    },
    backButton: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: '80%',
        borderRadius: 8,
        backgroundColor: COLORS.lightGray,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    timeContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default styles;
