import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serviceAxiosApi } from '../../services/serviceAxiosApi';

const StudentAttendance = ({ studentId }) => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [loadingSubjects, setLoadingSubjects] = useState(true);
    const [errorSubjects, setErrorSubjects] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [attendances, setAttendances] = useState([]);
    const [loadingAttendances, setLoadingAttendances] = useState(false);
    const [errorAttendances, setErrorAttendances] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                const response = await serviceAxiosApi.get('/student');
                const studentData = response.data.find(student => student.access_token === token);
                if (studentData) {
                    setStudent(studentData);
                    await fetchSubjects(studentData.level);
                } else {
                    setError('Estudiante no encontrado');
                }
            } catch (err) {
                console.error(err);
                setError('Error al obtener el estudiante');
            } finally {
                setLoading(false);
            }
        };

        const fetchSubjects = async (level) => {
            try {
                setLoadingSubjects(true);
                const response = await serviceAxiosApi.get(`/subject`);
                const filteredSubjects = response.data.filter(subject => subject.level === level);
                setSubjects(filteredSubjects);
            } catch (err) {
                console.error(err);
                setErrorSubjects('Error al obtener las materias');
            } finally {
                setLoadingSubjects(false);
            }
        };

        fetchStudent();
    }, [studentId]);

    useEffect(() => {
        const fetchAttendances = async () => {
            if (selectedSubject) {
                setLoadingAttendances(true);
                try {
                    const response = await serviceAxiosApi.get('/attendance');
                    const filteredAttendances = response.data.filter(attendance => attendance.id_subject === parseInt(selectedSubject));
                    setAttendances(filteredAttendances);
                } catch (err) {
                    console.error(err);
                    setErrorAttendances('Error al obtener las asistencias');
                } finally {
                    setLoadingAttendances(false);
                }
            }
        };

        fetchAttendances();
    }, [selectedSubject]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        Alert.alert('Error', error);
        return null;
    }

    if (loadingSubjects) {
        return <ActivityIndicator size="large" color="#00ff00" />;
    }

    if (errorSubjects) {
        Alert.alert('Error', errorSubjects);
        return null;
    }

    if (loadingAttendances) {
        return <ActivityIndicator size="large" color="#00ff00" />;
    }

    if (errorAttendances) {
        Alert.alert('Error', errorAttendances);
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Información del Estudiante</Text>
            <View style={styles.studentInfo}>
                <Text style={styles.studentText}>Nombre: {student.name}</Text>
                <Text style={styles.studentText}>Nivel: {student.level}</Text>
                <Text style={styles.studentText}>Email: {student.email}</Text>
            </View>

            <Text style={styles.title}>Selecciona una Materia</Text>
            {subjects.length > 0 ? (
                <Picker
                    selectedValue={selectedSubject}
                    onValueChange={(itemValue) => setSelectedSubject(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecciona una materia" value="" />
                    {subjects.map((subject) => (
                        <Picker.Item key={subject.id} label={subject.name} value={subject.id} />
                    ))}
                </Picker>
            ) : (
                <Text style={styles.errorText}>No hay materias para este nivel.</Text>
            )}

            {selectedSubject && (
                <View style={styles.attendanceContainer}>
                    <Text style={styles.attendanceTitle}>Asistencias para la materia seleccionada:</Text>
                    {attendances.length > 0 ? (
                        attendances.map(attendance => {
                            const present = attendance.students.includes(student.id_student);
                            return (
                                <Text
                                    key={attendance._id}
                                    style={[styles.attendanceText, present ? styles.present : styles.absent]}
                                >
                                    Fecha: {new Date(attendance.date).toLocaleDateString()} - {present ? 'Presente' : 'Ausente'}
                                </Text>
                            );
                        })
                    ) : (
                        <Text style={styles.errorText}>No hay asistencias para esta materia.</Text>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    studentInfo: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    studentText: {
        fontSize: 16,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    attendanceContainer: {
        marginTop: 20,
    },
    attendanceTitle: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    attendanceText: {
        fontSize: 16,
        marginVertical: 5,
    },
    present: {
        color: 'green',
    },
    absent: {
        color: 'red',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});

export default StudentAttendance;
