import { Juego } from "./juego.interface";
export interface Estadisticas {
    totalJuegos: number;
    juegosGratis: number;
    juegosPago: number;
    mejorRating: Juego;
    promedioPrecio: number;
}