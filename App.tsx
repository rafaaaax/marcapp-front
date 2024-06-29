import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './screens/user/Login'; 
import Signup from './screens/user/Signup'; 
import ForgotPassword from './screens/user/ForgotPassword'; 
import ResetPassword from './screens/user/ResetPassword'; // Importa la pantalla de ResetPassword
import Home from './screens/user/Home';
import Resumen from './screens/user/Resumen';
import ProfileEdit  from './screens/user/ProfileEdit';
import  MenuAdmin  from './screens/admin/MenuAdmin';
import  WorkerList  from './screens/admin/WorkerList';
import  UserDetails  from './screens/user/UserDetails';
import  AdminEdit  from './screens/admin/AdminEdit';
import  Statistics  from './screens/admin/Statistics';
import Week from './screens/admin/Week';
import StatisticsList  from './screens/admin/StatisticsList';
import YearList from './screens/admin/YearList';
import  WeekList  from './screens/admin/WeekList';
import { RegisterTime, Year } from './screens';
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
          name="Signup"
          component={Signup}
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
          name="RegisterTime"
          component={RegisterTime}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Resumen"
          component={Resumen}
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
          name="WorkerList"
          component={WorkerList}
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
          name="Statistics"
          component={Statistics}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Year"
          component={Year}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Week"
          component={Week}
          options={{
            headerShown: false
          }}
        />
         <Stack.Screen
          name="StatisticsList"
          component={StatisticsList}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="YearList"
          component={YearList}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="WeekList"
          component={WeekList}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}