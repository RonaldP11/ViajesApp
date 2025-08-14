import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-meu-footer',
  imports: [RouterModule],
  template: `
<!-- Menú de navegación fijo en la parte inferior -->
<div class="fixed bottom-0 left-0 right-0 px-5 pb-5 z-50">
    <div class="w-full max-w-md mx-auto">
        <div class="px-7 shadow-lg rounded-2xl backdrop-blur-sm bg-white/90">
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
                    <a routerLink="/maps" class="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-indigo-500">
                        <span class="block px-1 pt-1 pb-1">
                            <i class="fas fa-globe text-2xl pt-1 mb-1 block"></i>
                            <span class="block text-xs pb-2">Maps</span>
                            <span class="block w-5 mx-auto h-1 bg-indigo-500 rounded-full"></span>
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
