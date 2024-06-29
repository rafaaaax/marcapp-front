// styles.ts

import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 10,
        color: COLORS.black,
        textAlign: 'center',
    },
    profileContainer: {
        width: '100%',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 45,
        textAlign: 'center',
    },
    reloadButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 20,
        marginTop: 20,
    },
    reloadButton: {
        fontSize: 16,
        color: COLORS.primary,
    },
    editButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    logoutButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightGray,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    registerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 30,
    },
    summaryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightGray,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 30,
    },
});

export default styles;
