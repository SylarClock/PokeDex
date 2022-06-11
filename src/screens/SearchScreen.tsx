import React from 'react'
import { Text, View, Platform, ActivityIndicator, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';

import { styles as globalStyles } from "../theme/appTheme";

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList} = usePokemonSearch();

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
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth -40,
                    top: (Platform.OS === 'ios') ? top: top +10
                }}
            />

            <FlatList 
                data={simplePokemonList}
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
                    }}>Pokedex</Text>
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


