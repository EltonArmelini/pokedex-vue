import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Importar componentes y funciones necesarios para Font Awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

// Importar íconos específicos de Font Awesome
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";


// Agregar los íconos a la biblioteca de Font Awesome
library.add(fas, fab, far);

// Usar el enrutador en la aplicación, 
// Registrar el componente FontAwesomeIcon globalmente como 'font-awesome-icon',
// Montar la aplicación en el elemento con el id 'app' en el DOM
createApp(App).use(router).component("fa", FontAwesomeIcon).mount("#app");
