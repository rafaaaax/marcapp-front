import { useState } from "react";

// Función para validar la fecha
export const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
};

// Función para validar la hora
export const isValidTime = (timeString) => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return regex.test(timeString);
};

export const validateEmail = (text) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(text);
};
export const validatePassword = (text: string) => {
  return text.trim().length >= 6;
};
export const validateName = (text: string) => {
  const regex = /^[a-zA-Z\s]*$/;
  return regex.test(text) && text.trim().length > 0;
};





export const handleDateOfBirthPress = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  setShowDatePicker(true);
};

export const handleDateChange = (event, selectedDate) => {
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  setShowDatePicker(false);
  if (selectedDate) {
      const currentHour = new Date().getHours();
      const currentMinute = new Date().getMinutes();
      const newBirthday = new Date(selectedDate);
      newBirthday.setHours(currentHour);
      newBirthday.setMinutes(currentMinute);
      setBirthday(newBirthday);
  }
};
