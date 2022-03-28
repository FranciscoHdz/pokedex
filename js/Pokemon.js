class Pokemon{
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.sprites = data.sprites
        this.species = data.species
        this.abilities = data.abilities
        this.moves = data.moves
        this.types = data.types
        this.stats = data.stats
    }

    getImageAndId(){
        let getImageUr = '',
            idPokemon = '';
        getImageUr = this.sprites.front_default
        idPokemon = this.id
        return [getImageUr,idPokemon]
    }

    getAllData(){
        return this
    }

    
}



export { Pokemon }


