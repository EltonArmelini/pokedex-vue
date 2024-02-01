import { ref } from "vue";

class PokeSerive
{
    private pokemonList;
    private pokemon; 

    constructor()
    {
        this.pokemonList= ref([]);
        this.pokemon= ref([]);
    }
    getAll()
    {
        return this.pokemonList;
    }
    getPokemon()
    {
        return this.pokemon;
    }

    async fetchAll()
    {
        try {
            const url = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0'
            const response = await fetch(url);
            const json = await response.json();
        } catch (error) {
            console.log(error);
            
        }
    }


}