import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import History from './History';
import EntryDetail from './EntryDetail';
import { puple, white } from '../utils/colors';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: white
                }
            }}
        >
            <Stack.Screen name="History" component={ History }/>
            <Stack.Screen
                name="Details"
                component={ EntryDetail }
                options={({ route }) => {
                    const { entryId } = route.params;
                    const year = entryId.slice(0, 4);
                    const month = entryId.slice(5, 7);
                    const day = entryId.slice(8, 10);
                    return {
                        title: `${day}-${month}-${year}`
                    };
                }}
            />
        </Stack.Navigator>
    )
}

export default MainNavigator;