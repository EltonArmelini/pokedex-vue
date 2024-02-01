<template>
    <div class="sort-selectors" >
        <label for="orderBy">Order by:</label>
        <select v-model="orderBy" @change="sortPokemonList">
            <option value="id">Number</option>
            <option value="weight">Weight</option>
            <option value="height">Height</option>
        </select>
        <select v-model="orderDirection" @change="sortPokemonList">
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
        </select>
    </div>
    <div class="container">



        <div v-for="pokemon in pokeList" :key="pokemon.id" class="pokemon-card">
            <router-link :to="{ name: 'PokeDetail', params: { id: pokemon.id } }">
                <div class="pokemon-image-container">
                    <div class="pokemon-id-circle">{{ pokemon.id }}</div>
                    <img :src="pokemon.image" alt="Pokemon Image" class="pokemon-image">
                </div>
                <div class="pokemon-name">{{ pokemon.name }}</div>
                <div class="pokemon-info">
                    <div class="pokemon-weight">Weight: {{ pokemon.weight }}</div>
                    <div class="pokemon-height">Height: {{ pokemon.height }}</div>
                </div>
            </router-link>
        </div>


    </div>
</template>


<script lang="ts" setup>
import PokeService from '@/services/PokeService';
import IPoke from '@/interfaces/IPoke';
import { ref,onMounted } from 'vue';

const pokeService = new PokeService();
const pokeList = pokeService.getAll();

const orderBy = ref('id');
const orderDirection = ref('asc');



onMounted(async () => {
    await pokeService.fetchAll();
});


const sortPokemonList = () => {
  const sortedList = [...pokeList.value].sort((a, b) => {
    const order = orderDirection.value === 'asc' ? 1 : -1;

    // Asegúrate de que orderByKey sea una clave válida de IPoke
    const orderByKey: keyof IPoke = orderBy.value as keyof IPoke;

    // Usa el operador de fusión nula para asignar un valor predeterminado si la propiedad es undefined
    const aValue = a[orderByKey] ?? 0;
    const bValue = b[orderByKey] ?? 0;

    // Realiza una verificación de tipo para asegurarte de que los valores sean numéricos
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * order;
    }

    // Manejo si los valores no son numéricos
    return 0;
  });

  pokeList.value = sortedList;
};



</script>

<style  lang="scss" scoped>
/* Estilo para el contenedor principal */

.sort-selectors {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  label {
    margin-right: 10px;
  }

  select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
  }
}
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 25px;

    a {
        text-decoration: none;
        color: #000;
    }
}

/* Estilo para la tarjeta de Pokemon */
.pokemon-card {
    width: 300px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease; // Agregamos una transición al hacer hover

    &:hover {
        transform: scale(1.05); // Efecto de escala al hacer hover
        cursor: pointer;
    }
}

/* Estilo para el contenedor de la imagen del Pokemon */
.pokemon-image-container {
    width: 100%;
    max-height: 400px;
    overflow: hidden;
    position: relative;
}

/* Estilo para la imagen del Pokemon dentro del contenedor */
.pokemon-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

/* Estilo para el círculo del ID en la esquina superior izquierda */
.pokemon-id-circle {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 30px;
    height: 30px;
    background-color: #4CAF50;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

/* Estilo para el nombre del Pokemon */
.pokemon-name {
    font-size: 24px;
    font-weight: bold;
    margin: 10px;
    text-align: center;
    text-transform: capitalize;
}

/* Estilo para la línea de información de peso y altura */
.pokemon-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f1f1f1;
}

/* Estilo específico para el peso y la altura */
.pokemon-weight,
.pokemon-height {
    font-size: 16px;
    color: #555;
}
</style>