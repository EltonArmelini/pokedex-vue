<template>

    <router-link :to="{name:'home'}">
        <fa icon="arrow-left"/>
        Volver
    </router-link>
    
    <div class="pokemon-card">

        <div class="pokemon-details">
            <div class="pokemon-id">ID: {{ pokemon.id }}</div>
            <div class="pokemon-name">{{ pokemon.name }}</div>
            <img :src="pokemon.image" alt="Pokemon Image" class="pokemon-image">
            <div class="pokemon-weight-height">
                <div>Weight: {{ pokemon.weight }}</div>
                <div>Height: {{ pokemon.height }}</div>
            </div>

            <div class="base-stats">
                <div class="hp">HP: {{ pokemon.stats?.hp }}</div>
                <div class="attack">Attack: {{ pokemon.stats?.attack }}</div>
                <div class="defense">Defense: {{ pokemon.stats?.defense }}</div>
                <div class="specialAttack">Special Attack: {{ pokemon.stats?.specialAttack }}</div>
                <div class="specialDefense">Special Defense: {{ pokemon.stats?.specialDefense }}</div>
                <div class="speed">Speed: {{ pokemon.stats?.speed }}</div>
            </div>


            <div class="type">Type: {{ pokemon.type?.join(', ') }}</div>
            <div class="ability">Ability: {{ pokemon.ability }}</div>
            <div v-if="pokemon.hiddenAbility" class="hidden-ability">Hidden Ability: {{ pokemon.hiddenAbility }}</div>

        </div>
    </div>
</template>

<style scoped lang="scss">


a {
  text-decoration: none;
  color: #000;
  padding: 8px 12px;  // Añade espacio alrededor del texto
  border-radius: 4px;  // Agrega esquinas redondeadas
  transition: background-color 0.3s, color 0.3s, transform 0.2s;  // Agrega transiciones suaves

  &:hover {
    background-color: #4CAF50;  // Nuevo color de fondo al hacer hover
    color: #fff;  // Nuevo color de texto al hacer hover
    transform: scale(1.1);  // Hace que el enlace sea ligeramente más grande al hacer hover
  }
}
.pokemon-card {
text-align: center;
    width: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .pokemon-details {
        padding: 15px;

        .pokemon-id {
            font-size: 14px;
            color: #555;
            text-align: left;
        }

        .pokemon-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .pokemon-image {
            width: 30%;
            height: auto;
            border-radius: 8px;
        }

        .pokemon-weight-height {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            color: #777;

            div {
                flex: 1;
            }
        }

        .base-stats {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            /* Alinea los elementos en la misma línea */

            div {
                flex: 1;
                margin-right: 5px;
                /* Ajusta el espacio entre los elementos */

                &.hp {
                    background-color: #ff8080;
                }

                &.attack {
                    background-color: #ffcc66;
                }

                &.defense {
                    background-color: #99cc99;
                }

                &.specialAttack {
                    background-color: #66b3ff;
                }

                &.specialDefense {
                    background-color: #cc99ff;
                }

                &.speed {
                    background-color: #ff6666;
                }

                /* Aplicar bordes redondeados */
                border-radius: 5px;
                padding: 8px;
                text-align: center;
                /* Centrar el texto dentro de cada div */
            }
        }

        .type,
        .ability,
        .hidden-ability {
            margin-top: 15px;
            color: #555;
        }

        .hidden-ability {
            font-style: italic;
        }
    }
}
</style>

  
  

<script lang="ts" setup>
import PokeService from "@/services/PokeService";
import { ref, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";

const service = new PokeService();
const pokemon = service.getPokeDetail();
const route = useRoute();

onMounted(async () => {
    const pokElm = route.params.id;
    await service.fetchById(pokElm);
});

</script>