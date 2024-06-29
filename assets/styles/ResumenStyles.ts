// styles.ts

import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    entryContainer: {
        marginBottom: 12,
        padding: 12,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
    },
    entryDate: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    entryTime: {
        fontSize: 14,
        color: COLORS.black,
    },
    emptyMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    backButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    backButtonText: {
        fontSize: 16,
        color: COLORS.white,
    },
});

export default styles;
