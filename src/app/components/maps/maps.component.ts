import { ChangeDetectionStrategy, Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-maps',
  imports: [],
  template: `
    <div class="w-full h-screen">
      <div #mapContainer class="w-full h-full" id="map"></div>
    </div>
  `,
  styleUrl: './maps.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapsComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  private map: any;
  private readonly center = { lat: 5.8575, lng: -73.965555555556 };
  private readonly zoom = 16;

  ngAfterViewInit(): void {
    this.waitForGoogleMaps().then(() => {
      this.initializeMap();
    });
  }

  private waitForGoogleMaps(): Promise<void> {
    return new Promise((resolve) => {
      if (window.google && window.google.maps) {
        resolve();
      } else {
        const checkGoogleMaps = () => {
          if (window.google && window.google.maps) {
            resolve();
          } else {
            setTimeout(checkGoogleMaps, 100);
          }
        };
        checkGoogleMaps();
      }
    });
  }

  private initializeMap(): void {
    const mapOptions: any = {
      center: this.center,
      zoom: this.zoom,
      mapId: '959ff3c887e13fe29f79a291',
      mapTypeId: 'satellite',
      disableDefaultUI: true,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'administrative',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'road',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    };

    this.map = new window.google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }
}
