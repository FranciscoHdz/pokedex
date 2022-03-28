'use strict';
import { connections } from './connection.js'

function getNewRandomPokemons(){
    let randomNumber = [],
        pokemonObject = [],
        counter = 1;

    for(let x = 0; x<8;x++){
        let number = parseInt(Math.random() *(898 - 1)+1)
        if (randomNumber.indexOf(number) === -1){
            randomNumber.push(number)
        }
    }

    randomNumber.map(e=>{
        connections.getPokemon(e).then(el => {    
            pokemonObject.push(el);
            let selector = `.pokemon${counter}`,
                pokemonImage = el.getImageAndId();
            document.querySelector(`${selector}`).querySelector("img").src = pokemonImage[0]
            document.querySelector(`${selector}`).querySelector("img").setAttribute("pk",pokemonImage[1])
            counter +=1;
        })        
    });
}



function getPokedexInfo(id){
        
        let pkElement = id
        connections.getPokemon(pkElement).then(el => {   
            try{
                let selector = `#imagePokedex img`,
                    pokemonImage = el.getAllData();
                console.log(pokemonImage)
                document.querySelector(`${selector}`).src = pokemonImage.sprites.front_default
                document.querySelector('#nameTable').textContent = pokemonImage.name
                let habilities = ''
                pokemonImage.abilities.map(e=>{

                    habilities += e.ability.name + ' , '
                });
                document.querySelector('#habilidadTable').textContent = habilities.substring(0,habilities.length-2)
                document.querySelector('#especieTable').textContent = pokemonImage.species.name

                let typesPokemon = '';
                pokemonImage.types.map(e=>{
                    typesPokemon += e.type.name + ' , '  
                });
                document.querySelector('#tipoTable').textContent = typesPokemon.substring(0,typesPokemon.length-2)

                let movesPokemon = ""
                pokemonImage.moves.map((e,pos)=>{
                    if(pos < 3){
                        movesPokemon += e.move.name  + ' , '
                    }
                });
                document.querySelector('#movimientosTable').textContent = movesPokemon.substring(0,movesPokemon.length-2)
                document.querySelector("#inputName").value = ""
            }
            catch{
                alert("pokemon no encontrado")
                document.querySelector("#imagePokedex img").src = "./assets/whois.png"
                document.querySelector('#nameTable').textContent = ""
                document.querySelector('#habilidadTable').textContent = ""
                document.querySelector('#especieTable').textContent = ""
                document.querySelector('#tipoTable').textContent = ""
                document.querySelector('#movimientosTable').textContent = ""
                document.querySelector("#inputName").value = ""

            }
            
        })       

}




document.addEventListener("DOMContentLoaded",()=>{
    getNewRandomPokemons()
    setTimeout(()=>{
        document.querySelector(".pokedex").removeAttribute("hidden")
    },6500);
});


document.querySelector("#decubrePokemon").addEventListener('click',function(){
    getNewRandomPokemons()
});


document.querySelector("#encender").addEventListener('click',function(){

    let pokedexIsOpen = document.querySelector(".pokedex")

    if(pokedexIsOpen === null){
        document.querySelector(".pokedex-open").classList.add("pokedex")
        document.querySelector(".pokedex-open").classList.remove("pokedex-open")
        document.querySelector("#screen-open").id = "screen"
        document.querySelector("#searchName").setAttribute('hidden',true)
        document.querySelector("#pokedexInfo").setAttribute("hidden",true)
    }
    else{
        pokedexIsOpen.style.animation = '';
        document.querySelector(".pokedex").classList.add("pokedex-open")
        document.querySelector(".pokedex").classList.remove("pokedex")
        document.querySelector("#screen").id = "screen-open"
        document.querySelector("#searchName").removeAttribute('hidden')
        document.querySelector("#pokedexInfo").removeAttribute('hidden')
    }
    
    
});



document.querySelector("#searchName").addEventListener('submit',function(e){
    e.preventDefault()
    let dataValue = document.querySelector("#inputName").value
    getPokedexInfo(dataValue)


})


document.querySelectorAll('[class^=pokemon] img').forEach(e=>{
    e.addEventListener('click',function(el){
        let pokedexIsOpen = document.querySelector(".pokedex")

        if(pokedexIsOpen !== null){
            document.querySelector(".pokedex").classList.add("pokedex-open")
            document.querySelector(".pokedex").classList.remove("pokedex")
            document.querySelector("#screen").id = "screen-open"
            document.querySelector("#searchName").removeAttribute('hidden')
            document.querySelector("#pokedexInfo").removeAttribute('hidden')
        }

        let pkElement = e.getAttribute("pk");
        getPokedexInfo(pkElement)
    })
        
});


