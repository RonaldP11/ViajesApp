import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  categoria: 'evento' | 'gastronomia' | 'cultura' | 'aventura';
  prioridad: 'alta' | 'media' | 'baja';
  completada: boolean;
  progreso: number;
  ubicacion?: string;
  duracion?: string;
  icono: string;
}

@Component({
  selector: 'app-tareas',
  imports: [CommonModule],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TareasComponent implements OnInit, OnDestroy {
  // 📱 ¡Comparte tu experiencia! Publica tus tareas completadas en Instagram
  // con el hashtag de cada actividad para que todos vean tu aventura en La Belleza 🎉

  private sliderInterval: any;

  tareas: Tarea[] = [
    {
      id: 1,
      titulo: 'Festival de Cine Estudiantil #CineLaBelleza',
      descripcion: 'Disfruta una noche de gala en el salón social donde brillará el talento cinematográfico de los estudiantes del Colegio Integrado Don Bosco.',
      fecha: 'Jueves 14 de Agosto',
      categoria: 'cultura',
      prioridad: 'alta',
      completada: false,
      progreso: 0,
      ubicacion: 'Salón Social',
      duracion: '3 horas',
      icono: 'fas fa-film'
    },
    {
      id: 2,
      titulo: 'Únete a los Despertares #DespertarLaBelleza',
      descripcion: 'Acompaña a los músicos tradicionales y vive la energía matutina que despierta todo el municipio con alegría y música.',
      fecha: 'Todo el fin de semana',
      categoria: 'cultura',
      prioridad: 'media',
      completada: false,
      progreso: 0,
      ubicacion: 'Recorrido por el municipio',
      duracion: '2 horas',
      icono: 'fas fa-music'
    },
    {
      id: 3,
      titulo: 'Apoya a los Deportistas #DeporteLaBelleza',
      descripcion: 'Vibra con la emoción deportiva y anima a los atletas locales en las competencias que llenan de orgullo al municipio.',
      fecha: 'Viernes 15 de agosto',
      categoria: 'evento',
      prioridad: 'alta',
      completada: false,
      progreso: 0,
      ubicacion: 'Escenarios deportivos',
      duracion: '2 horas',
      icono: 'fas fa-trophy'
    },
    {
      id: 4,
      titulo: 'Baila Carranga en la Plaza #CarrangaLaBelleza',
      descripcion: 'Déjate llevar por los ritmos auténticos Colombianos  y baila carranga bajo las estrellas en el corazón del pueblo.',
      fecha: 'Viernes 15 de agosto',
      categoria: 'evento',
      prioridad: 'alta',
      completada: false,
      progreso: 0,
      ubicacion: 'Polideportivo principal',
      duracion: '3 horas',
      icono: 'fas fa-music'
    },
    {
      id: 5,
      titulo: 'Tesoros Artesanales #ArtesaniasLaBelleza',
      descripcion: 'Descubre y llévate a casa auténticas artesanías locales: sombreros, tejidos, Ornamentacion, comida y  dulces caseros únicos.',
      fecha: 'Sábado 16 de agosto',
      categoria: 'cultura',
      prioridad: 'media',
      completada: false,
      progreso: 0,
      ubicacion: 'Feria artesanal',
      duracion: '1.5 horas',
      icono: 'fas fa-shopping-bag'
    },
    {
      id: 6,
      titulo: 'Aventura al Chorro la Humareda #ChorroLaBelleza',
      descripcion: 'Conquista la majestuosa cascada del Chorro la Humareda si te atreves.',
      fecha: 'Domingo 17 de agosto',
      categoria: 'aventura',
      prioridad: 'alta',
      completada: false,
      progreso: 0,
      ubicacion: 'Chorro de la Humareda',
      duracion: '4 horas',
      icono: 'fas fa-mountain'
    },
    {
      id: 7,
      titulo: 'Carroza y Comparsas #CarrozasLaBelleza',
      descripcion: 'Sé testigo de la creatividad y tradición en el desfile de carrosas, celebrando el municipio y los 60 años del Colegio Don Bosco.',
      fecha: 'Sábado 16 de agosto',
      categoria: 'evento',
      prioridad: 'alta',
      completada: false,
      progreso: 0,
      ubicacion: 'Recorrido del desfile',
      duracion: '3 horas',
      icono: 'fas fa-parade'
    },
    {
      id: 8,
      titulo: 'Memoria Fotográfica Don Bosco #DonBoscoLaBelleza',
      descripcion: 'Vuelve al pasado visitando el Colegio Integrado Don Bosco en su aniversario y revive recuerdos.',
      fecha: 'Domingo 17 de agosto',
      categoria: 'cultura',
      prioridad: 'media',
      completada: false,
      progreso: 0,
      ubicacion: 'Colegio Integrado Don Bosco',
      duracion: '2 horas',
      icono: 'fas fa-camera'
    },
    {
      id: 9,
      titulo: 'Superviviente de las Fiestas #SuperviventeLaBelleza',
      descripcion: 'Resiste hasta el final y vive la despedida  de las ferias, incluyendo la última noche de celebración completa.',
      fecha: 'Lunes 18 de agosto',
      categoria: 'evento',
      prioridad: 'baja',
      completada: false,
      progreso: 0,
      ubicacion: 'Todo el Municipio',
      duracion: 'Todo el día',
      icono: 'fas fa-medal'
    }
  ];

  tareasCompletadas = 0;
  progresoTotal = 0;


  currentSlide = 0;
  sliderItems = [
    {
      title: 'Patrimonio Cultural',
      description: 'Reencuentrate con las tradicions en La Belleza, Santander',
      icon: 'fas fa-church',
      gradient: 'from-amber-600 to-orange-700'
    },
    {
      title: 'La Belleza para el mundo',
      description: 'Comparte la belleza de nuestro municipio usando los hashtags únicos de cada actividad',
      icon: 'fab fa-instagram',
      gradient: 'from-slate-600 to-gray-700'
    },
    {
      title: 'Tierra Santandereana',
      description: 'Vive la autenticidad de nuestra región a través de sus sabores, música y paisajes únicos',
      icon: 'fas fa-mountain',
      gradient: 'from-emerald-700 to-teal-800'
    }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.calcularProgreso();
    this.startSlider();
  }

  ngOnDestroy(): void {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  startSlider(): void {
    this.sliderInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.sliderItems.length;
      this.cdr.detectChanges();
    }, 5000);
  }

  toggleTarea(id: number): void {
    const tarea = this.tareas.find(t => t.id === id);
    if (tarea) {
      tarea.completada = !tarea.completada;
      tarea.progreso = tarea.completada ? 100 : 0;
      this.calcularProgreso();
    }
  }

  incrementarProgreso(id: number): void {
    const tarea = this.tareas.find(t => t.id === id);
    if (tarea && tarea.progreso < 100) {
      tarea.progreso += 25;
      if (tarea.progreso >= 100) {
        tarea.completada = true;
        tarea.progreso = 100;
      }
      this.calcularProgreso();
    }
  }

  decrementarProgreso(id: number): void {
    const tarea = this.tareas.find(t => t.id === id);
    if (tarea && tarea.progreso > 0) {
      tarea.progreso -= 25;
      if (tarea.progreso <= 0) {
        tarea.completada = false;
        tarea.progreso = 0;
      }
      this.calcularProgreso();
    }
  }

  private calcularProgreso(): void {
    this.tareasCompletadas = this.tareas.filter(t => t.completada).length;
    this.progresoTotal = Math.round((this.tareas.reduce((acc, tarea) => acc + tarea.progreso, 0) / (this.tareas.length * 100)) * 100);
  }

  getCategoriaColor(categoria: string): string {
    switch (categoria) {
      case 'evento': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'gastronomia': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cultura': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'aventura': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  getPrioridadColor(prioridad: string): string {
    switch (prioridad) {
      case 'alta': return 'bg-red-500';
      case 'media': return 'bg-yellow-500';
      case 'baja': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  }

  getFiltroTareas(): Tarea[] {
    return this.tareas.sort((a, b) => {
      // Primero las no completadas, luego por prioridad
      if (a.completada !== b.completada) {
        return a.completada ? 1 : -1;
      }
      const prioridadOrder = { 'alta': 0, 'media': 1, 'baja': 2 };
      return prioridadOrder[a.prioridad] - prioridadOrder[b.prioridad];
    });
  }
}
