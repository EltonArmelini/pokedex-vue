import { Ref, ref } from "vue";
import IPoke from "@/interfaces/IPoke";

class PokeService {
  private pokemonList: Ref<Array<IPoke>>;
  private pokemon: Ref<IPoke>;
  private apiUrl: string;
  constructor() {
    this.pokemonList = ref<Array<IPoke>>([]);
    this.pokemon = ref<IPoke>({});
    this.apiUrl = "https://pokeapi.co/api/v2/pokemon";
  }

  getAll(): Ref<Array<IPoke>> {
    return this.pokemonList;
  }
  getPokeDetail(): Ref<IPoke> {
    return this.pokemon;
  }

  async fetchAll(): Promise<void> {
    try {
      const numberOfPokemon = 10;
      const pokemonArray: IPoke[] = [];

      for (let id = 1; id <= numberOfPokemon; id++) {
        const url = `${this.apiUrl}/${id}`;
        const response = await fetch(url);

        if (response.ok) {
          const pokemonData = await response.json();
          const pokemon: IPoke = {
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites.other["official-artwork"].front_default,
            weight: pokemonData.weight,
            height: pokemonData.height,
          };

          pokemonArray.push(pokemon);
        } else {
          console.error(`Error fetching Pokemon with ID ${id}`);
        }
      }

      this.pokemonList.value = pokemonArray;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchById(id: string | string[]): Promise<void> {
    try {
      const url = `${this.apiUrl}/${id}`;
      const response = await fetch(url);

      if (response.ok) {
        const pokemonData = await response.json();
        const pokemon: IPoke = {
          id: pokemonData.id,
          name: pokemonData.name,
          image: pokemonData.sprites.other["official-artwork"].front_default,
          weight: pokemonData.weight,
          height: pokemonData.height,
          species: pokemonData.species.name,
          type: pokemonData.types.map((type: any) => type.type.name),
          ability: pokemonData.abilities[0].ability.name,
          hiddenAbility:
            pokemonData.abilities.length > 1
              ? pokemonData.abilities[1].ability.name
              : undefined,
          stats:{
            hp: pokemonData.stats[0].base_stat,
            attack: pokemonData.stats[1].base_stat,
            defense: pokemonData.stats[2].base_stat,
            specialAttack: pokemonData.stats[3].base_stat,
            specialDefense: pokemonData.stats[4].base_stat,
            speed: pokemonData.stats[5].base_stat
          }
        };

        this.pokemon.value = pokemon;
      } else {
        console.error(`Error fetching Pokemon with ID ${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default PokeService;
