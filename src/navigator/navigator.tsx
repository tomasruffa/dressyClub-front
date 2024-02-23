import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../views/home/home';
import CreateCarScreen from '../views/create-car-screen/create-car-screen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'HomeScreen'} screenOptions={{headerShown: false}}>
                <Stack.Screen name={'HomeScreen'} component={Home} />
                <Stack.Screen name={'CarCreateScreen'} component={CreateCarScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;