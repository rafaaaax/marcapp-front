import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  titleContainer: {
    flex: 0.2,
    marginHorizontal: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 40,
    color: COLORS.black,
  },
  contentContainer: {
    flex: 0.5,
    marginHorizontal: 22,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: COLORS.black,
  },
  inputContainer: {
    marginTop: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 22,
  },
  button: {
    marginTop: 30,
    marginBottom: 4,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 16,
    color: COLORS.primary,
  },
});
