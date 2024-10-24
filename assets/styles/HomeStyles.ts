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
    editButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        width: '100%',       // Asegura que el botón ocupe todo el ancho del contenedor padre
        paddingVertical: 20,  // Asegura que la altura sea consistente (ajusta si es necesario)
        borderRadius: 15,
        marginTop: 10,        // Ajusta el espaciado entre los botones si lo necesitas
        height: 60,           // Establece una altura fija para que todos los botones tengan la misma altura
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
    },buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Espaciado entre los botones
        marginTop: 'auto', // Mueve los botones al final del contenedor
        padding: 100, // Espaciado interno
      },
      simpleButton: {
        padding: 10,
        borderRadius: 5,
      },
      reloadButtonText: {
        fontSize: 16,
        color: COLORS.white,
      },
      verticalButtonContainer: {
        flexDirection: "column",
        justifyContent: "space-around", // Espaciado equitativo entre los botones
        alignItems: "center",
        height: "50%", // Ajusta esta altura según lo necesites
        marginTop: 20, // Ajuste superior para separar el saludo
        width: "70%", // Asegura que los botones ocupen todo el ancho
      },
});

export default styles;
