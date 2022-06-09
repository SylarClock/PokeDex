import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  
    const [isLoading, setIsLoading] = useState(true);
    const [simplePokemonList, setSimplePokemonList] =useState<SimplePokemon[]>([]);

    console.log(simplePokemonList);
    

    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon/?limit=40');

    const loadPokemons = async () =>{
        setIsLoading(true);
        const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
        nextPageUrl.current = resp.data.next;
        mapPokemonList( resp.data.results );
        
    }

    const mapPokemonList = (pokemonList: Result[]) =>{
        const newPokemonLinst: SimplePokemon[] = pokemonList.map(({name, url}, index)=>{

            const urlParts = url.split('/');
            const id = urlParts[urlParts.length -2 ]
            return {
                id,
                name,
                picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            }
        });

        setSimplePokemonList([...simplePokemonList, ...newPokemonLinst]);
        setIsLoading(false);
    }

    useEffect(()=>{
        loadPokemons();
    },[]);

    return {
        isLoading,
        simplePokemonList,
        loadPokemons
    }
}
