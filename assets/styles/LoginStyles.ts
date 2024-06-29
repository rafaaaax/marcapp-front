import { StyleSheet, Dimensions } from 'react-native';
import COLORS from '../../constants/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logoContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: width * 0.08, // Responsive font size based on screen width
        fontWeight: 'bold',
        marginVertical: height * 0.01, // Responsive margin based on screen height
        color: COLORS.black,
    },
    formContainer: {
        flex: 0.7,
        width: '100%',
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        marginBottom: height * 0.02,
        color: COLORS.black,
    },
    introText: {
        fontSize: width * 0.035,
        marginBottom: height * 0.02,
        color: COLORS.black,
    },
    inputContainer: {
        marginBottom: height * 0.015,
    },
    labelText: {
        fontSize: width * 0.035,
        fontWeight: '400',
        marginBottom: height * 0.01,
    },
    textInput: {
        width: '100%',
        height: height * 0.06,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: width * 0.05,
        fontSize: width * 0.035,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        height: height * 0.06,
        paddingLeft: width * 0.05,
    },
    passwordInput: {
        width: '85%',
        fontSize: width * 0.035,
    },
    eyeIcon: {
        padding: width * 0.03,
    },
    button: {
        marginTop: height * 0.02,
    },
    linkButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: height * 0.02,
        borderRadius: 8,
        marginTop: height * 0.02,
    },
    linkButtonText: {
        fontSize: width * 0.035,
        color: COLORS.primary,
    },
    loadingIndicator: {
        marginTop: height * 0.02,
    },
    errorMessage: {
        color: COLORS.red,
        textAlign: 'center',
        marginTop: height * 0.02,
    },
});

export default styles;
