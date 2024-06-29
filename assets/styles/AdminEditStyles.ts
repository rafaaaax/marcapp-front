// adminEditStyles.js

import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';


const adminEditStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
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
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  backButton: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '80%',
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
});

export default adminEditStyles;
