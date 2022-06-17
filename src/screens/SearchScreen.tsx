import React, { useEffect, useState } from 'react'
import { Text, View, Platform, ActivityIndicator, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';

import { styles as globalStyles } from "../theme/appTheme";
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList} = usePokemonSearch();

    const [pokemonFiltered, setpokemonFiltered] = useState<SimplePokemon []>([]);
    
    const [term, setTerm] = useState('');

    useEffect(() => {
        if(term.length ===0){
            return setpokemonFiltered([]);
        }

        if(isNaN( Number(term) )){
            setpokemonFiltered(
                simplePokemonList.filter(poke => poke.name.toLocaleLowerCase().includes( term.toLocaleLowerCase() ))
            );
        }else{
            const pokemonById = simplePokemonList.find((poke) => poke.id === term);

            setpokemonFiltered( (pokemonById) ? [pokemonById] : [] )
        }


    }, [term])
    

    if(isFetching){
        return <Loading />
    }

    return (
        <View 
            style={{
                flex: 1,
                marginHorizontal: 10
            }}
        >
            <SearchInput 
                onDebounce={(value)=> setTerm(value)}
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth -40,
                    top: (Platform.OS === 'ios') ? top: top +10
                }}
            />

            <FlatList 
                data={pokemonFiltered}
                keyExtractor={(poke)=> poke.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}

                //header
                ListHeaderComponent={(
                    <Text style={{
                        ...globalStyles.title,
                        ...globalStyles.globalMargin,
                        paddingBottom: 10,
                        marginTop: (Platform.OS === 'ios') ? top + 60: top + 80
                    }}>{term}</Text>
                )}

                renderItem={ ({item})=> ( 
                    <PokemonCard
                        pokemon={item}
                    /> 
                ) }

            />

        </View>
    )
}


