// Button.tsx

import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';

// Definimos las propiedades esperadas para el botón
interface ButtonProps {
  title: string;
  onPress: () => void;
  filled?: boolean;
  color?: string;
}

// Componente funcional de botón personalizado con opciones de estilo
const Button: React.FC<ButtonProps> = ({ title, onPress, filled = false, color }) => {
  // Definimos el color de fondo y el color del texto dependiendo de la propiedad "filled"
  const bgColor = filled ? color || COLORS.primary : COLORS.white;
  const textColor = filled ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: bgColor,
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 18, color: textColor }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingBottom: 16,
    paddingVertical: 10,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;
