import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ImageData {
  id: number;
  url: string;
  title: string;
  description: string;
  author: string;
  sourceLink: string;
  height?: number;
  orientation?: 'vertical' | 'horizontal' | 'square';
}

@Component({
  selector: 'app-galeria',
  imports: [CommonModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GaleriaComponent implements OnInit {
  images: ImageData[] = [];
  selectedImage: ImageData | null = null;

  ngOnInit(): void {
    this.loadImages();
  }

  adjustMasonryLayout(): void {
    const grid = document.querySelector('.masonry-grid') as HTMLElement;
    const items = document.querySelectorAll('.masonry-item') as NodeListOf<HTMLElement>;

    if (!grid || !items.length) return;

    // Verificar si CSS columns está funcionando
    const computedStyle = window.getComputedStyle(grid);
    const columnCount = computedStyle.columnCount;

    console.log('Column count:', columnCount);

    // Si CSS columns no funciona, usar JavaScript
    if (columnCount === 'auto' || columnCount === '1') {
      this.fallbackMasonryLayout(grid, items);
    }
  }

  fallbackMasonryLayout(grid: HTMLElement, items: NodeListOf<HTMLElement>): void {
    // Implementación JavaScript fallback
    const columns = 2;
    const gap = 8; // 0.5rem

    // Reset grid
    grid.style.display = 'flex';
    grid.style.flexDirection = 'row';
    grid.style.gap = `${gap}px`;

    // Crear columnas
    const columnElements: HTMLElement[] = [];
    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.style.display = 'flex';
      column.style.flexDirection = 'column';
      column.style.flex = '1';
      column.style.gap = `${gap}px`;
      grid.appendChild(column);
      columnElements.push(column);
    }

    // Distribuir items en columnas
    items.forEach((item, index) => {
      const columnIndex = index % columns;
      columnElements[columnIndex].appendChild(item.cloneNode(true));
      item.style.display = 'none'; // Ocultar original
    });
  }

  // Método simplificado para compatibilidad - redirige al toast
  toggleFlip(imageId: number | null): void {
    const image = this.images.find(img => img.id === imageId);
    if (image) {
      this.openToast(image);
    }
  }

  openToast(image: ImageData): void {
    this.selectedImage = image;
    // Opcional: deshabilitar scroll del body
    document.body.style.overflow = 'hidden';
  }

  closeToast(): void {
    this.selectedImage = null;
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
  }

  private adjustCardHeight(imageId: number): void {
    const flipCard = document.querySelector(`[data-image-id="${imageId}"]`);
    if (flipCard) {
      const frontImg = flipCard.querySelector('.flip-card-front img') as HTMLImageElement;
      const backCard = flipCard.querySelector('.flip-card-back .bg-white') as HTMLElement;
      const description = flipCard.querySelector('.description-text') as HTMLElement;
      const titleElement = flipCard.querySelector('.content-area h3') as HTMLElement;
      const authorSection = flipCard.querySelector('.content-area > div:last-child') as HTMLElement;
      const buttonsArea = flipCard.querySelector('.buttons-area') as HTMLElement;

      if (frontImg && backCard) {
        const imageHeight = frontImg.offsetHeight;
        backCard.style.height = `${imageHeight}px`;

        // Calcular espacio disponible para contenido
        const padding = 24; // 3 sm:p-4 = aprox 24px
        const titleHeight = titleElement ? titleElement.offsetHeight : 60;
        const authorHeight = authorSection ? authorSection.offsetHeight : 40;
        const buttonsHeight = buttonsArea ? buttonsArea.offsetHeight : 60;
        const availableSpace = imageHeight - padding - titleHeight - authorHeight - buttonsHeight;

        // Ajustar descripción según espacio disponible
        if (description) {
          if (availableSpace < 40) {
            // Muy poco espacio - ocultar descripción
            description.style.display = 'none';
          } else if (availableSpace < 60) {
            // Poco espacio - una línea
            description.style.display = 'block';
            description.style.webkitLineClamp = '1';
            description.style.fontSize = '0.75rem';
            description.style.lineHeight = '1.2';
          } else if (availableSpace < 80) {
            // Espacio moderado - dos líneas
            description.style.display = 'block';
            description.style.webkitLineClamp = '2';
            description.style.fontSize = '0.75rem';
            description.style.lineHeight = '1.3';
          } else {
            // Espacio suficiente - tres líneas
            description.style.display = 'block';
            description.style.webkitLineClamp = '3';
            description.style.fontSize = '0.875rem';
            description.style.lineHeight = '1.4';
          }
        }

        // Ajustar padding en modo compacto
        if (imageHeight < 280) {
          backCard.style.padding = '0.5rem';
          if (buttonsArea) {
            const buttons = buttonsArea.querySelectorAll('button');
            buttons.forEach(button => {
              (button as HTMLElement).style.padding = '0.25rem 0.75rem';
              (button as HTMLElement).style.fontSize = '0.75rem';
            });
          }
        } else {
          backCard.style.padding = '0.75rem 1rem';
        }
      }
    }
  } private loadImages(): void {
    // Datos de ejemplo - en una aplicación real vendrían de un servicio
    this.images = [
      {
        id: 1,
        url: 'https://i.ibb.co/hRBjHwFT/BV.jpg',
        title: 'Parque Principal en los 90',
        description: 'Escena cotidiana en el parque principal durante la década de 1990, cuando la plaza de mercado se ubicaba allí.',
        author: 'Caren Gonzalez',
        sourceLink: 'https://carengonzalezcolbosco.blogspot.com/2014/05/la-belleza.html'
      },
      {
        id: 2,
        url: 'https://i.ibb.co/RTg7VbyK/80875810-Master.jpg',
        title: 'Chorro de la Humareda',
        description: 'Impresionante caída de agua de aproximadamente 250 metros de altura en la vereda La Humareda, La Belleza, Santander (ruta de septiembre de 2022 por DXMARIUS).',
        author: 'DXMARIUS',
        sourceLink: 'https://es.wikiloc.com/rutas-senderismo/buscando-el-chorro-la-humareda-la-belleza-santander-septiembre-de-2022-126622891/photo-80875810'
      },
      {
        id: 3,
        url: 'https://i.ibb.co/3mBWBZv3/484363126-1399428751393664-6757293111037892361-n.jpg',
        title: 'La Quitaz',
        description: 'Fotografía del corregimiento de La Quitaz, un pueblo rural de La Belleza (Santander) ubicado a unos 987 m sobre el nivel del mar, con vegetación montañosa y una comunidad pequeña de aproximadamente 206 habitantes (2018).',
        author: 'JuliánDid',
        sourceLink: 'https://www.instagram.com/juliandid_4?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
      },
      {
        id: 4,
        url: 'https://i.ibb.co/4ZDzkHkB/141725605-1758025927708966-9221455924495421158-n.jpg',
        title: 'Los 3 Amigos',
        description: 'Conjunto de tres árboles unidos entre sí en la entrada del municipio de La Belleza, Santander, que simbolizan la amistad y cercanía de su comunidad.',
        author: 'alexandra_marin.17',
        sourceLink: 'https://www.instagram.com/alexandra_marin.17/?utm_source=ig_web_button_share_sheet'
      },
      {
        id: 5,
        url: 'https://i.ibb.co/1YW6T7HX/Whats-App-Image-2025-08-14-at-11-31-54-PM.jpg',
        title: 'Parque de La Belleza',
        description: 'Vista panorámica del parque principal de La Belleza, Santander, donde se distinguen claramente la pileta central, la iglesia del pueblo y parte de su entorno urbano y natural. Una escena que retrata el corazón social y religioso del municipio.',
        author: 'carengonzalezcolbosco.blogspot.com',
        sourceLink: 'https://carengonzalezcolbosco.blogspot.com/2014/05/la-belleza.html'
      },
      {
        id: 6,
        url: 'https://i.ibb.co/hRFFzZVV/Whats-App-Image-2025-08-15-at-12-27-21-AM.jpg',
        title: 'Parque Central',
        description: 'Una vista hermosa y relajante del parque central, que invita a disfrutar de la tranquilidad y belleza natural que ofrece este espacio en La Belleza.',
        author: 'Peter Zanger',
        sourceLink: 'https://berlin-labelleza.blogspot.com/'
      },
      {
        id: 7,
        url: 'https://i.ibb.co/84NpBsKh/Whats-App-Image-2025-08-15-at-12-27-49-AM.jpg',
        title: 'Interior de la iglesia de La Belleza',
        description: 'Detalle del interior de la iglesia de La Belleza, que muestra su arquitectura tradicional y un ambiente solemne que refleja la historia y fe de la comunidad local.',
        author: 'Peter Zanger',
        sourceLink: 'https://berlin-labelleza.blogspot.com/'
      },
      {
        id: 8,
        url: 'https://i.ibb.co/Q3457shB/Whats-App-Image-2025-08-15-at-12-28-25-AM.jpg',
        title: 'Colegio Don Bosco',
        description: 'En la imagen se ve la entrada del Colegio Don Bosco de La Belleza, con sus rejas y rampa características que dan acceso a la institución educativa.',
        author: 'Peter Zanger',
        sourceLink: 'https://berlin-labelleza.blogspot.com/'
      },
      {
        id: 9,
        url: 'https://i.ibb.co/39jydZrS/Whats-App-Image-2025-08-15-at-12-55-22-AM.jpg',
        title: 'Iglesia',
        description: 'En la imagen se aprecia una parte del parque principal junto con la iglesia de La Belleza, un punto de referencia emblemático del municipio.',
        author: 'Alcaldía de La Belleza',
        sourceLink: 'https://www.bluradio.com/blu360/santanderes/tres-obreros-murieron-en-la-belleza-santander-por-inhalacion-de-gases-toxicos-rg10'
      }

    ];
  }

  trackByImageId(index: number, image: ImageData): number {
    return image.id;
  }

  openSourceLink(link: string): void {
    window.open(link, '_blank', 'noopener,noreferrer');
  }

  onImageLoad(event: any, image: ImageData): void {
    const img = event.target as HTMLImageElement;
    const aspectRatio = img.naturalWidth / img.naturalHeight;

    // Detectar orientación basada en aspect ratio
    if (aspectRatio > 1.3) {
      image.orientation = 'horizontal';
    } else if (aspectRatio < 0.8) {
      image.orientation = 'vertical';
    } else {
      image.orientation = 'square';
    }

    // Guardar las dimensiones naturales para referencia
    image.height = img.naturalHeight;
  }

  // Método para determinar las columnas del grid según el viewport
  getGridColumns(): string {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= 1024) {
        return 'repeat(auto-fit, minmax(280px, 1fr))';
      } else if (width >= 640) {
        return 'repeat(auto-fit, minmax(250px, 1fr))';
      }
      return '1fr';
    }
    return 'repeat(auto-fit, minmax(280px, 1fr))';
  }

  // Método para determinar la clase de imagen según orientación
  getImageClass(image: any): string {
    const baseClasses = 'rounded-xl shadow-lg transition-all duration-300';
    switch (image.orientation) {
      case 'vertical':
        return `${baseClasses} vertical-image`;
      case 'horizontal':
        return `${baseClasses} horizontal-image`;
      case 'square':
        return `${baseClasses} square-image`;
      default:
        return baseClasses;
    }
  }

  onImageError(event: any): void {
    // Evitar bucles infinitos verificando si ya se estableció un placeholder
    if (event.target.src.includes('data:image/svg+xml')) {
      return;
    }

    // Crear una imagen SVG simple como placeholder
    const svgPlaceholder = `data:image/svg+xml;charset=UTF-8,%3csvg width='400' height='600' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='%23e2e8f0'/%3e%3cg%3e%3ctext x='50%25' y='45%25' font-size='18' fill='%2364748b' text-anchor='middle' dy='.3em'%3eImagen no disponible%3c/text%3e%3ctext x='50%25' y='55%25' font-size='14' fill='%2364748b' text-anchor='middle' dy='.3em'%3ePor favor, verifica la URL%3c/text%3e%3c/g%3e%3c/svg%3e`;

    // Remover el event listener para evitar más errores
    event.target.onerror = null;
    event.target.src = svgPlaceholder;
  }
}
