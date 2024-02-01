// En tu archivo de interfaz IPoke (por ejemplo, IPoke.ts)
interface IPoke {
  id?: number;
  name?: string;
  image?: string;
  weight?: number;
  height?: number;
  species?: string
  type?: string[]; // Puede haber más de un tipo, por eso es un array
  ability?: string;
  hiddenAbility?: string; // Habilidad oculta
  stats?: {
    hp?: number;
    attack?: number;
    defense?: number;
    specialAttack?: number;
    specialDefense?: number;
    speed?: number;
  };

}

export default IPoke;
