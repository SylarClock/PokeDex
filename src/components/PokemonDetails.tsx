import React from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { PokemonFull, Sprites } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';


interface Props {
    pokemon: PokemonFull;
}


export const PokemonDetails = ({pokemon}:Props) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                ...StyleSheet.absoluteFillObject,
            }}
        >
            <View style={{
                ...styles.container,
                marginTop: 380
            }}>
                {/* ****    TYPES    **** */}
                <Text style={ styles.title }>Types</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.types.map(({type})=>(
                            <Text
                                style={{ 
                                    ...styles.regularText,
                                    marginRight: 10 
                                }}
                                key={ type.name }
                            >
                                { type.name }
                            </Text>
                        ))
                    }
                </View>

                {/* ****    PESO    **** */}

                <Text style={ styles.title }>Peso</Text>
                <Text style={ styles.regularText }>{ pokemon.weight } lb</Text>
                

            </View>
            {/* ****    SPRITES    **** */}
            <View
                style={{
                    ...styles.container,
                }}
            >
                <Text style={ styles.title }>Sprites</Text>
            </View>

            <ScrollView
                //style={}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <FadeInImage 
                    uri={pokemon.sprites.front_default}
                    style={styles.basicSprite}
                />

                <FadeInImage 
                    uri={pokemon.sprites.back_default}
                    style={styles.basicSprite}
                />

                <FadeInImage 
                    uri={pokemon.sprites.front_shiny}
                    style={styles.basicSprite}
                />

                <FadeInImage 
                    uri={pokemon.sprites.back_shiny}
                    style={styles.basicSprite}
                />

                {
                    (pokemon.sprites.front_female && pokemon.sprites.back_female) && (
                        <>
                            <FadeInImage 
                                uri={pokemon.sprites.front_female}
                                style={styles.basicSprite}
                            />
                            <FadeInImage 
                                uri={pokemon.sprites.back_female}
                                style={styles.basicSprite}
                            />
                        </>
                    )
                    
                }
                {
                    (pokemon.sprites.front_shiny_female && pokemon.sprites.back_shiny_female) && (
                        <>
                            <FadeInImage 
                                uri={pokemon.sprites.front_shiny_female}
                                style={styles.basicSprite}
                            />
                            <FadeInImage 
                                uri={pokemon.sprites.back_shiny_female}
                                style={styles.basicSprite}
                            />
                        </>
                    )
                }

            </ScrollView>
            
            {/* ****    Habilidades    **** */}
            <View style={ styles.container }>
                <Text style={ styles.title } >Habilidades base</Text>
                <View style={{ flexDirection: 'row' }}>
                {
                    pokemon.abilities.map(({ability})=>(
                        <Text
                            style={{ 
                                ...styles.regularText,
                                marginRight: 10 
                            }}
                            key={ ability.name }
                        >
                            { ability.name }
                        </Text>
                    ))
                }
                </View>
            </View>

            {/* ****    Movimientos    **** */}
            <View style={ styles.container }>
                <Text style={ styles.title } >Movimientos</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                    pokemon.moves.map(({move})=>(
                        <Text
                            style={{ 
                                ...styles.regularText,
                                marginRight: 10 
                            }}
                            key={ move.name }
                        >
                            { move.name }
                        </Text>
                    ))
                }
                </View>
            </View>

            {/* ****    Stats    **** */}
            <View style={ styles.container }>
                <Text style={ styles.title } >Base stats</Text>
                <View>
                {
                    pokemon.stats.map((stat, i)=>(
                        <View 
                            key={stat.stat.name + i}
                            style={{ flexDirection: 'row'}}
                        >
                            <Text
                                style={{ 
                                    ...styles.regularText,
                                    marginRight: 10,
                                    width: 200
                                }}
                            >
                                { stat.stat.name }
                            </Text>

                            <Text
                                style={{ 
                                    ...styles.regularText,
                                    fontWeight: 'bold' 
                                }}
                            >
                                { stat.base_stat }
                            </Text>
                        </View>
                    ))
                }
                </View>

                {/* ****    SPRITE FINAL    **** */}
                <View style={{
                    marginBottom: 50,
                    alignItems: 'center'
                }}>
                    <FadeInImage 
                        uri={pokemon.sprites.front_default}
                        style={styles.basicSprite}
                    />
                </View>

            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    regularText: {
        fontSize: 20
    },
    basicSprite: {
        width: 100,
        height: 100
    }
});