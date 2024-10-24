import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { serviceAxiosApi } from "../../services/serviceAxiosApi"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";  // Importa el ícono

const ParentAttendance = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<number | undefined>(undefined);
  const [selectedStudentName, setSelectedStudentName] = useState<string>("");
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | undefined>(undefined);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudentId) {
      fetchSubjects();
    }
  }, [selectedStudentId]);

  useEffect(() => {
    if (selectedStudentId && selectedSubjectId) {
      fetchAttendance();
    }
  }, [selectedStudentId, selectedSubjectId]);

  const fetchStudents = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) {
      Alert.alert("Error", "No se encontró el token.");
      return;
    }

    try {
      const response = await serviceAxiosApi.get(`/parent/get-students/${token}`);
      console.log("Students:", response.data);
      setStudents(response.data);
      if (response.data.length === 0) {
        Alert.alert("Error", "No tiene pupilos asignados.");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      Alert.alert("Error", "No se pudo cargar la lista de pupilos.");
    }
  };

  const fetchSubjects = async () => {
    if (!selectedStudentId) return;
    const selectedStudent = students.find((student) => student.id === selectedStudentId);
    if (!selectedStudent) return;

    try {
      const response = await serviceAxiosApi.get(`/subject`);
      console.log("All Subjects:", response.data);
      const filteredSubjects = response.data.filter((subject) => subject.level === selectedStudent.level);
      console.log("Filtered Subjects:", filteredSubjects);
      if (filteredSubjects.length === 0) {
        Alert.alert("Error", "No hay materias disponibles para el nivel del pupilo.");
      }
      setSubjects(filteredSubjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      Alert.alert("Error", "No se pudo cargar la lista de materias.");
    }
  };

  const fetchAttendance = async () => {
    if (!selectedSubjectId) return;

    try {
      const response = await serviceAxiosApi.get(`/attendance`);
      console.log("All Attendance Records:", response.data);
      const filteredAttendance = response.data.filter((record) => record.id_subject === parseInt(selectedSubjectId));
      console.log("Attendance Records:", filteredAttendance);
      setAttendanceRecords(filteredAttendance);
      if (filteredAttendance.length === 0) {
        Alert.alert("Error", "No hay registros de asistencia para la materia seleccionada.");
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      Alert.alert("Error", "No se pudo cargar los registros de asistencia.");
    }
  };

  const handleStudentChange = (itemValue: number) => {
    const selectedStudent = students.find((student) => student.id === itemValue);
    if (selectedStudent) {
      setSelectedStudentId(selectedStudent.id);
      setSelectedStudentName(selectedStudent.name);
      setSelectedSubjectId(undefined); // Reset selected subject
      setAttendanceRecords([]); // Reset attendance records
    }
  };

  const handleSubjectChange = (itemValue: string) => {
    setSelectedSubjectId(itemValue);
  };

  const isStudentPresent = (students: number[], studentId: number) => {
    return students.includes(studentId);
  };

  // Muestra la alerta para la justificación de inasistencias
  const handleJustifyAbsence = () => {
    Alert.alert(
      "Justificación en desarrollo",
      "La funcionalidad para justificar las inasistencias estará disponible próximamente.",
      [{ text: "Entendido" }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un Pupilo</Text>
      <Picker
        selectedValue={selectedStudentId}
        onValueChange={handleStudentChange}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un pupilo" value={undefined} />
        {students.map((student) => (
          <Picker.Item
            key={student.id}
            label={`${student.name} (Nivel ${student.level})`}
            value={student.id}
          />
        ))}
      </Picker>

      {selectedStudentId && (
        <View style={styles.selectedStudentContainer}>
          <Text style={styles.selectedStudentText}>
            Pupilo seleccionado: {selectedStudentName} (Nivel {students.find((s) => s.id === selectedStudentId)?.level})
          </Text>
        </View>
      )}

      {subjects.length > 0 && (
        <>
          <Text style={styles.title}>Selecciona una Materia</Text>
          <Picker
            selectedValue={selectedSubjectId}
            onValueChange={handleSubjectChange}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una materia" value={undefined} />
            {subjects.map((subject) => (
              <Picker.Item
                key={subject.id}
                label={`${subject.name} (Nivel ${subject.level})`}
                value={subject.id}
              />
            ))}
          </Picker>
        </>
      )}

      {attendanceRecords.length > 0 && selectedStudentId && selectedSubjectId && (
        <View style={styles.attendanceContainer}>
          <Text style={styles.attendanceTitle}>Registro de Asistencia:</Text>
          {attendanceRecords.map((record) => {
            const present = isStudentPresent(record.students, selectedStudentId);
            return (
              <View key={record._id} style={styles.attendanceRow}>
                <Text style={[styles.attendanceText, present ? styles.present : styles.absent]}>
                  Fecha: {new Date(record.date).toLocaleDateString()} - {present ? "Presente" : "Ausente"}
                </Text>
                {!present && (
                  <TouchableOpacity onPress={handleJustifyAbsence}>
                    <Icon name="edit" size={24} color="gray" style={styles.justifyIcon} />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  selectedStudentContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedStudentText: {
    fontSize: 16,
  },
  attendanceContainer: {
    marginTop: 20,
  },
  attendanceTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  attendanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attendanceText: {
    fontSize: 16,
    marginVertical: 5,
  },
  present: {
    color: "green",
  },
  absent: {
    color: "red",
  },
  justifyIcon: {
    marginLeft: 10,
  },
});

export default ParentAttendance;
