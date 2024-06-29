// WorkerListStyles.js

import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export const WorkerListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    userItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
    },
    selectButton: {
        padding: 8,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    saveButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
});

export default WorkerListStyles;
