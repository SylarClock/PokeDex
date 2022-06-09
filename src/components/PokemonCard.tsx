import React, { useRef } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useState, useEffect } from 'react';
import ImageColors from 'react-native-image-colors';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon
}

export const PokemonCard = ({pokemon}:Props) => {

    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true);
    const navigation = useNavigation<any>();

    const changeBackground = async() => {
        const result = await ImageColors.getColors(pokemon.picture);
        
        if( !isMounted.current ) return;

        switch (result.platform) {
            case 'android':
                setBgColor(result.dominant ||'grey');
                break;
            case 'ios':
                setBgColor(result.background || 'grey');
                break;
        }
    }

    useEffect(()=>{

        changeBackground();
        

        return () =>{
            isMounted.current = false;
        }
    },[]);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={()=>navigation.navigate(
                'PokemonScreen', 
                {
                    simplePokemon: pokemon,
                    color: bgColor
                }
            )}
        >
            <View style={{
                ...styles.cardContainer,
                width: width*0.43,
                backgroundColor: bgColor
            }}>
                <View>
                    <Text style={styles.name}>
                        { pokemon.name }
                        { '\n#'+pokemon.id }
                    </Text>
                </View>

                <View style={ styles.pokebolaContainer}>
                    <Image 
                        source={ require('../assets/pokebola-blanca.png') }
                        style={styles.pokebola}
                    />
                </View>

                <FadeInImage 
                    uri={pokemon.picture}
                    style={ styles.pokemonImage }
                />

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        backgroundColor: 'grey',
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,

        elevation: 23,
    },
    name:{
        color:'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola:{
        width: 100,
        height: 100,
        position: 'absolute',
        right: -20,
        bottom: -20
    },
    pokemonImage:{
        width: 120,
        height: 120,
        position: 'absolute',
        right: -5
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        opacity: 0.5,
        overflow: 'hidden'
    }
});
