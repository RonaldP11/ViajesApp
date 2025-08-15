import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Artesania {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  categoria: 'Azucareras' | 'Jarras de Barro' | 'Ajiceras' | 'Chocolateros' | 'madera' | 'metal' | 'orfebreria' | 'cesteria';
  region: string;
}

@Component({
  selector: 'app-principal',
  imports: [CommonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrincipalComponent implements OnInit {

  artesanias: Artesania[] = [
    {
      id: 1,
      nombre: 'La Humareda y Los Alto de Oso',
      descripcion: `Hecha con hojas de Chilca, arbol comun del municipio e inspiradas en los paisajes y tradiciones de La Belleza, Santander, estas artesanías de cerámica rinden homenaje a dos rincones emblemáticos del municipio.
      La pieza central, La Humareda, evoca la majestuosa caída de agua que, entre neblinas, guarda la frescura e imponencia  de las montañas bellezanas.
      Las piezas más pequeñas, Alto de Oso, recuerdan la serenidad de la cascada  donde se encuentra un espacio alejado y tranquilo`,
      imagen: 'https://i.ibb.co/4gfsLJ0h/Whats-App-Image-2025-08-09-at-7-06-52-PM.jpg',
      categoria: 'Jarras de Barro',
      region: 'La Belleza, Santander'
    },
    {
      id: 2,
      nombre: 'Dulce Belleza',
      descripcion: `Estas azucareras,hecha con pintura acriliva para obtener esos colores brillantes, son un homenaje a la alegría, la tradición y la calidez del pueblo de La Belleza, Santander. Sus tonos vivos representan la diversidad cultural, climas y el espíritu acogedor de su gente.
      Cada combinación de colores refleja un aspecto del municipio: el verde de sus cultivos y montañas frias, el azul de sus cielos nublados y soleados, su variedad de flora y fauna.`,
      imagen: 'https://i.ibb.co/TxX9g3JH/Whats-App-Image-2025-08-09-at-7-06-20-PM.jpg',
      categoria: 'Azucareras',
      region: ''
    },
    {
      id: 3,
      nombre: 'Clima y Tierra',
      descripcion: `Estas ajiceras, pintadas a mano y esmaldadas, son un recorrido por la diversidad pisos termicos del municipio, logrando variedad de climas y paisajes que hacen único al municipio de La Belleza, Santander.
      Cada color y trazo evoca un ambiente distinto: desde las frias  montañas cubiertas de neblina, con el verde intenso y el azul profundo dominan el horizonte, hasta las zonas cálidas y brillantes, bañadas por tonos amarillos, naranjas y rojos que recuerdan el calor tropical, la fertilidad  y la energía de la tierra.
      La variedad cromática simboliza la riqueza natural y productiva de La Belleza: Bosques tropicales con inmensa biodiversidad, sus cultivos de Cacao y aguacate en tierras calidas. Lulo, mora  entre otros en tierras altas. Logrando una combinacion de colores llamativa del municipio`,
      imagen: 'https://i.ibb.co/BDnX1c4/Whats-App-Image-2025-08-09-at-7-06-23-PM.jpg',
      categoria: 'Ajiceras',
      region: ''
    },
    {
      id: 4,
      nombre: 'Flores Calentanas',
      descripcion: `Inspirados en las flores comunes  del municipio se muestra la wedelia,ojo de poeta y Maxillaria sessilis(un tipo de Orquidea) cada pieza rinde homenaje a la naturaleza y transmite la escencia viva de La Belleza`,
      imagen: 'https://i.ibb.co/Wv3wmtdC/Whats-App-Image-2025-08-09-at-7-06-15-PM.jpg',
      categoria: 'Chocolateros',
      region: 'Santander'
    },
    {
      id: 5,
      nombre: 'Caminos de Herradura',
      descripcion: `Estos mugs capturan la grandeza y el encanto de los paisajes que acompañan a quienes recorren los caminos de La Belleza, Santander. Cada diseño refleja un momento distinto del día: el amanecer dorado que ilumina las montañas, la noche estrellada que cubre los valles y el atardecer ardiente que pinta el horizonte.
      Las escenas están pintadas a mano con colores vivos y contrastes intensos,intentando  evocar la inmensidad de la naturaleza que se despliega a cada paso por el municipio.`,
      imagen: 'https://i.ibb.co/zhSSDmsn/Whats-App-Image-2025-08-09-at-6-59-49-PM.jpg',
      categoria: 'Chocolateros',
      region: 'Santander'
    }
  ];

  artesaniaDestacada: Artesania = this.artesanias[0];

  ngOnInit(): void {
    // Inicialización si es necesaria
  }

  seleccionarArtesania(artesania: Artesania): void {
    this.artesaniaDestacada = artesania;
  }

  verDetalles(artesania: Artesania): void {
    console.log('Viendo detalles de:', artesania.nombre);
    // Aquí iría la lógica para mostrar más detalles
  }

  scrollHorizontal(direction: 'left' | 'right'): void {
    const container = document.querySelector('.overflow-x-auto');
    if (container) {
      // Detectar si es móvil para ajustar el scroll
      const isMobile = window.innerWidth < 640;
      const scrollAmount = isMobile ? 336 : 416; // 320px + 16px (mobile) o 384px + 32px (desktop)
      const currentScroll = container.scrollLeft;
      const targetScroll = direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }
}
