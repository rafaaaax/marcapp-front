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
        marginBottom: 5, // Adjusted for better spacing
        textAlign: 'center',
    },
    nonEditableContainer: {
        width: '80%', // Adjust width to fit nicely
        marginBottom: 20, // Space between items
    },
    nonEditableInput: {
        borderWidth: 1,
        borderColor: COLORS.lightGray, // Use a light gray color
        borderRadius: 5,
        padding: 10,
        backgroundColor: COLORS.lightGray, // A light background color
    },
    nonEditableText: {
        color: COLORS.black, // Text color
        fontSize: 16, // Text size
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
