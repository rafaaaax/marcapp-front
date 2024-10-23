import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './screens/user/Login';  
import ForgotPassword from './screens/user/ForgotPassword'; 
import ResetPassword from './screens/user/ResetPassword'; // Importa la pantalla de ResetPassword
import Home from './screens/user/Home';
import ProfileEdit  from './screens/user/ProfileEdit';
import  MenuAdmin  from './screens/admin/MenuAdmin';
import  UserDetails  from './screens/user/UserDetails';
import  AdminEdit  from './screens/admin/AdminEdit';
import  ParentHome  from './screens/parent/ParentHome';
import AdminHome from './screens/admin/AdminHome';
import StudentHome from './screens/student/StudentHome';
import ProfessorHome from './screens/professor/ProfessorHome';
const Stack = createNativeStackNavigator();

export default function App() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ResetPassword" 
          component={ResetPassword}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEdit}
          options={{
            headerShown: false
          }}
        />
         <Stack.Screen
          name="MenuAdmin"
          component={MenuAdmin}
          options={{
            headerShown: false
          }}
        />
         <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="AdminEdit"
          component={AdminEdit}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ParentHome"
          component={ParentHome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="AdminHome"
          component={AdminHome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="StudentHome"
          component={StudentHome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ProfessorHome"
          component={ProfessorHome}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}