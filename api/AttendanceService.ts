// AttendanceService.ts
// Importamos Axios para realizar solicitudes HTTP
import axios from 'axios';

// Definimos el tipo para el estado de asistencia, lo cual ayuda a evitar errores de tipado
export type AttendanceStatus = 'presente' | 'ausente' | 'justificado';

// Función para obtener la lista de estudiantes en una clase específica
export const fetchStudents = async (classId: string) => {
  try {
    const response = await axios.get(`/classes/${classId}/students`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    throw error;
  }
};

// Función para registrar la asistencia de un estudiante específico
export const markAttendance = async (studentId: string, status: AttendanceStatus) => {
  try {
    const response = await axios.post(`/attendance`, { studentId, status });
    return response.data;
  } catch (error) {
    console.error("Error al registrar asistencia:", error);
    throw error;
  }
};
