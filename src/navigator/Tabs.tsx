import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchScreen } from '../screens/SearchScreen';
import { Navigator } from './Navigator';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    
    return (
        <Tab.Navigator

            sceneContainerStyle={{
                backgroundColor: 'white'
            }}
            screenOptions={{
                tabBarActiveTintColor: '#5856D5',
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.82)',
                    paddingBottom: 10,
                    borderWidth: 0,
                    elevation: 0,
                    height: 60
                },
                tabBarLabelStyle:{
                    marginBottom: ( Platform.OS == 'ios' ) ? 0:10
                },
                headerShown: false
            }}
        >
            <Tab.Screen 
                name="HomeScreen" 
                component={Navigator}
                options={{
                    tabBarLabel: "Listado",
                    tabBarIcon: ({color}) => (
                        <Icon 
                            color={color} 
                            size={25} 
                            name="list-outline" 
                        />
                    )
                }} 
            />
            <Tab.Screen 
                name="SearchScreen" 
                component={SearchScreen} 
                options={{
                    tabBarLabel: "Buscar",
                    tabBarIcon: ({color}) => (
                        <Icon 
                            color={color} 
                            size={25} 
                            name="search-outline" 
                        />
                    )
                }} 
            />
        </Tab.Navigator>
    )
}
