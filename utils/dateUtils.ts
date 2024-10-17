import { useState } from "react";

export const getWeekDates = (date: Date): string[] => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Assuming the week starts on Monday
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + i);
        weekDates.push(currentDate.toISOString().split('T')[0]); // Format as 'YYYY-MM-DD'
    }
    return weekDates;
};

export const formatDate = (dateString: string): string => {
    // Asegurarse de que el string de fecha tenga la hora si no la tiene.
    const localDateString = dateString.includes('T') ? dateString : `${dateString}T00:00:00`;
    const date = new Date(localDateString);
    return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};