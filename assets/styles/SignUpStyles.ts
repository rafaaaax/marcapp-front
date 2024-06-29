// SignupStyles.js
import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 22,
        backgroundColor: COLORS.white,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 12,
        color: COLORS.black,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: COLORS.black,
    },
    inputContainer: {
        marginBottom: 12,
    },
    input: {
        width: '100%',
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 22,
        color: COLORS.black,
    },
    passwordInputContainer: {
        width: '100%',
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 22,
    },
    eyeIcon: {
        position: "absolute",
        right: 12,
    },
    roleContainer: {
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    roleButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        marginRight: 10,
    },
    dateOfBirthContainer: {
        marginVertical: 10,
    },
    dateOfBirthText: {
        marginBottom: 6,
    },
    datePickerButton: {
        marginTop: 6,
    },
    messageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    messageText: {
        fontSize: 16,
    },
    linkButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    linkButtonText: {
        fontSize: 16,
        color: COLORS.primary,
    },
});

export default styles;
