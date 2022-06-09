import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootStackParams } from '../navigator/Navigator';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{};

export const PokemonScreen = ({navigation, route}: Props) => {

    const { simplePokemon, color } = route.params;

    return (
        <View>
            {/* HEADER CONTINER */}
            <View
                style={{
                    ...styles.headerContainer,
                    backgroundColor: color,
                }}
            >
                <Text>{ simplePokemon.name } - {}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex:999,
        borderBottomLeftRadius: 1000,
        borderBottomRightRadius: 1000,
    }
});
