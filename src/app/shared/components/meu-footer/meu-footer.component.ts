import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-meu-footer',
  imports: [],
  template: `
<!-- Contenido principal de la página -->
<div class="min-h-screen bg-gray-100 pb-24">
    <!-- Aquí iría el contenido principal de tu aplicación -->
    <div class="p-5">
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-8">ViajaLaBelleza</h1>
        <p class="text-center text-gray-600">Contenido principal de la aplicación</p>
    </div>
</div>

<!-- Menú de navegación fijo en la parte inferior -->
<div class="fixed bottom-0 left-0 right-0 px-5 pb-5">
    <div class="w-full max-w-md mx-auto">
        <div class="px-7 bg-white shadow-lg rounded-2xl">
            <div class="flex">
                <div class="flex-1 group">
                    <a href="#" class="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
                        <span class="block px-1 pt-1 pb-1">
                            <i class="fas fa-home text-2xl pt-1 mb-1 block"></i>
                            <span class="block text-xs pb-2">Home</span>
                            <span class="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                        </span>
                    </a>
                </div>
                <div class="flex-1 group">
                    <a href="#" class="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
                        <span class="block px-1 pt-1 pb-1">
                            <i class="fas fa-globe text-2xl pt-1 mb-1 block"></i>
                            <span class="block text-xs pb-2">Explore</span>
                            <span class="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                        </span>
                    </a>
                </div>
                <div class="flex-1 group">
                    <a href="#" class="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
                        <span class="block px-1 pt-1 pb-1">
                            <i class="fas fa-search text-2xl pt-1 mb-1 block"></i>
                            <span class="block text-xs pb-2">Search</span>
                            <span class="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                        </span>
                    </a>
                </div>
                <div class="flex-1 group">
                    <a href="#" class="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
                        <span class="block px-1 pt-1 pb-1">
                            <i class="fas fa-gear text-2xl pt-1 mb-1 block"></i>
                            <span class="block text-xs pb-2">Settings</span>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeuFooterComponent { }
