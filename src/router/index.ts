// Importar funciones y tipos necesarios para el enrutador de Vue
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Importar las vistas que se utilizarán como componentes de las rutas
import PokeDexView from "@/views/PokeDexView.vue";
import PokeDetail from "@/views/PokeDetail.vue";

// Definir las rutas de la aplicación
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home', // Nombre de la ruta
    component: PokeDexView // Componente asociado a la ruta
  },
  {
    path: '/pokemon/:id',
    name: 'PokeDetail', // Nombre de la ruta
    component: PokeDetail // Componente asociado a la ruta
  }
];

// Crear el enrutador utilizando la configuración y las rutas definidas
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Modo de historial y base URL
  routes // Rutas definidas anteriormente
});

// Exportar el enrutador para que pueda ser utilizado en la aplicación
export default router;
