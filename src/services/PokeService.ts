import { Ref, ref } from "vue";
import IPoke from "@/interfaces/IPoke";

class PokeService {
  private pokemonList: Ref<Array<IPoke>>;
  private pokemon: Ref<IPoke>;
  private apiUrl: string;

  // Constructor de la clase PokeService
  constructor() {
    // Inicializa las propiedades reactivas
    this.pokemonList = ref<Array<IPoke>>([]);
    this.pokemon = ref<IPoke>({});
    // Define la URL base de la API de Pokémon
    this.apiUrl = "https://pokeapi.co/api/v2/pokemon";
  }

  // Método para obtener la lista de Pokémon
  getAll(): Ref<Array<IPoke>> {
    return this.pokemonList;
  }

  // Método para obtener los detalles de un Pokémon específico
  getPokeDetail(): Ref<IPoke> {
    return this.pokemon;
  }

  // Método asincrónico para obtener la lista de los primeros Pokémon
  async fetchAll(): Promise<void> {
    try {
      // Número de Pokémon a obtener
      const numberOfPokemon = 10;
      const pokemonArray: IPoke[] = [];

      // Itera sobre los IDs de los primeros Pokémon
      for (let id = 1; id <= numberOfPokemon; id++) {
        const url = `${this.apiUrl}/${id}`;
        const response = await fetch(url);

        if (response.ok) {
          // Procesa los datos del Pokémon y añádelo al array
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

      // Actualiza la lista de Pokémon
      this.pokemonList.value = pokemonArray;
    } catch (error) {
      console.error(error);
    }
  }

  // Método asincrónico para obtener los detalles de un Pokémon por su ID
  async fetchById(id: string | string[]): Promise<void> {
    try {
      // Construye la URL para obtener los detalles del Pokémon
      const url = `${this.apiUrl}/${id}`;
      const response = await fetch(url);

      if (response.ok) {
        // Procesa los datos del Pokémon y actualiza la propiedad reactiva
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
          stats: {
            hp: pokemonData.stats[0].base_stat,
            attack: pokemonData.stats[1].base_stat,
            defense: pokemonData.stats[2].base_stat,
            specialAttack: pokemonData.stats[3].base_stat,
            specialDefense: pokemonData.stats[4].base_stat,
            speed: pokemonData.stats[5].base_stat,
          },
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

// Exporta la clase PokeService como el valor predeterminado del módulo
export default PokeService;
