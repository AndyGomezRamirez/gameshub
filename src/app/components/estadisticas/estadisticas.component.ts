import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JuegosDataService } from '../../services/juegos-data.service';
import { Juego } from '../../interfaces/juego.interface';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

export interface Estadisticas {
  juegoTotal: number;
  juegosGratis: number;
  juegosdePago: number;
  mejorRating: Juego;
  promPrecio: number;
}

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css',
  providers: [CurrencyPipe, DecimalPipe]
})
export class EstadisticasComponent implements OnInit {
  estadisticas!: Estadisticas;

  constructor(private juegosService: JuegosDataService) {}

  ngOnInit(): void {
    this.juegosService.obtenerJuegos().subscribe((juegos: Juego[]) => {
      const juegosdePago = juegos.filter(j => j.precio > 0);
      const juegosGratis = juegos.filter(j => j.precio === 0);
      const mejor = juegos.reduce((prev, curr) => prev.rating > curr.rating ? prev : curr);
      const promPrecio = juegosdePago.reduce((acc, j) => acc + j.precio, 0) / (juegosdePago.length || 1);

      this.estadisticas = {
        juegoTotal: juegos.length,
        juegosGratis: juegosGratis.length,
        juegosdePago: juegosdePago.length,
        mejorRating: mejor,
        promPrecio: promPrecio
      };
    });
  }
}

//¿En que archivo se define la interfaz de juego?
//En el archivo de interfaces, juego.interface.ts

//2. ¿Qué archivo maneja el estado global de los filtros?
//Respuesta:
