import { Pokemon } from './Pokemon.js';

const url = "https://pokeapi.co/api/v2/"

async function getPokemon(id){
    const parameter = "pokemon/"
    let newUr = `${url}${parameter}${id}`,
        pokemonData = {}; 
        let response =await fetch(newUr).then(
                                                response => response.json()
                                            ).then(e=>{
                                                        pokemonData = new Pokemon(e)
                                                        return pokemonData
                                            }).catch(
                                                e=>{
                                                    pokemonData = {}
                                                    return pokemonData
                                                }
                                            )
        return response
}


let connections = {
    'getPokemon':getPokemon
}


export { connections }