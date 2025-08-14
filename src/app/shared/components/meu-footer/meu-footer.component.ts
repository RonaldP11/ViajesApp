import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-meu-footer',
  imports: [RouterModule, CommonModule],
  template: `
<!-- Menú de navegación fijo en la parte inferior -->
<div class="fixed bottom-0 left-0 right-0 px-5 pb-5 z-50">
    <div class="w-full max-w-md mx-auto">
        <div class="px-7 shadow-lg rounded-2xl backdrop-blur-sm bg-white/90">
            <div class="flex">
                <div class="flex-1 group">
                    <a routerLink="/maps"
                       [class]="'flex items-end justify-center text-center mx-auto px-4 pt-2 w-full ' + (currentRoute === '/maps' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-indigo-500')">
                        <span class="block px-1 pt-1 pb-1">
                            <i class="fas fa-home text-2xl pt-1 mb-1 block"></i>
                            <span class="block text-xs pb-2">Principal</span>
                            <span [class]="'block w-5 mx-auto h-1 rounded-full ' + (currentRoute === '/maps' ? 'bg-indigo-500' : 'group-hover:bg-indigo-500')"></span>
                        </span>
                    </a>
                </div>
                <div class="flex-1 group">
                    <a routerLink="/maps"
                       [class]="'flex items-end justify-center text-center mx-auto px-4 pt-2 w-full ' + (currentRoute === '/maps' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-indigo-500')">
                        <span class="block px-1 pt-1 pb-1">
                            <i class="fas fa-map-marked-alt text-2xl pt-1 mb-1 block"></i>
                            <span class="block text-xs pb-2">Mapa</span>
                            <span [class]="'block w-5 mx-auto h-1 rounded-full ' + (currentRoute === '/maps' ? 'bg-indigo-500' : 'group-hover:bg-indigo-500')"></span>
                        </span>
                    </a>
                </div>
                <div class="flex-1 group">
                    <a routerLink="/galeria"
                       [class]="'flex items-end justify-center text-center mx-auto px-4 pt-2 w-full ' + (currentRoute === '/galeria' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-indigo-500')">
                        <span class="block px-1 pt-1 pb-1">
                            <i class="fas fa-images text-2xl pt-1 mb-1 block"></i>
                            <span class="block text-xs pb-2">Galería</span>
                            <span [class]="'block w-5 mx-auto h-1 rounded-full ' + (currentRoute === '/galeria' ? 'bg-indigo-500' : 'group-hover:bg-indigo-500')"></span>
                        </span>
                    </a>
                </div>
                <div class="flex-1 group">
                    <a href="tareas" class="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
                        <span class="block px-1 pt-1 pb-1">
                            <i class="fas fa-calendar-check text-2xl pt-1 mb-1 block"></i>
                            <span class="block text-xs pb-2">Actividades</span>
                            <span class="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
`,
  styleUrl: './meu-footer.component.css',
})
export class MeuFooterComponent implements OnInit {
  currentRoute: string = '';

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Obtener la ruta inicial
    this.updateCurrentRoute(this.router.url);

    // Escuchar cambios en la navegación
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateCurrentRoute(event.urlAfterRedirects);
        this.cdr.detectChanges(); // Forzar detección de cambios
      });
  }

  private updateCurrentRoute(url: string): void {
    // Manejar la redirección de '/' a '/maps'
    if (url === '/' || url === '/maps') {
      this.currentRoute = '/maps';
    } else {
      this.currentRoute = url;
    }
  }
}
