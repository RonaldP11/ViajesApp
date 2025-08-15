import { ChangeDetectionStrategy, Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare global {
  interface Window {
    google: any;
  }
}

interface AdventurePoint {
  id: number;
  title: string;
  description: string;
  lat: number;
  lng: number;
  image: string;
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
  private readonly zoom = 13;
  private markers: any[] = [];
  private infoWindow: any;
  private notificationTimeout: any;

  // Puntos de aventura cerca de la ubicación central
  private adventurePoints: AdventurePoint[] = [
    {
      "id": 1,
      "title": "Tres Amigos",
      "description": "Un grupo de árboles unidos que representan la amistad del municipio de La Belleza.",
      "lat": 5.862603580365422,
      "lng": -73.96275611097556,
      "image": "https://upload.wikimedia.org/wikipedia/commons/7/79/Atardecer_en_Los_Tres_Amigos-La_Belleza.jpg"
    },
    {
      "id": 2,
      "title": "Chorro de la Humareda",
      "description": "Una impresionante cascada natural ubicada en La Belleza, Santander.",
      "lat": 5.8929158,
      "lng": -73.9683727,
      "image": "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqxR7gOOuDjtpzyGEPXD8qLIc3U8zSz1KGELTPunDa7y6qm9eEejPDexwmQL88_UfH09ijL2NZ0h0bikuRL3awOR-wRCXmvKgSHxHOPP41vUWvyMXLem3I2S4O7KRxkhXQMC70=s1360-w1360-h1020-rw"
    },
    {
      "id": 3,
      "title": "Piscinas Pedro Ruiz",
      "description": "Piscinas naturales ideales para refrescarse y disfrutar del entorno.",
      "lat": 5.9227213,
      "lng": -74.0140306,
      "image": ""
    },
    {
      "id": 4,
      "title": "Parque Acuático Miguel Duarte",
      "description": "Un parque acuático recreativo ubicado cerca de La Belleza, Santander.",
      "lat": 5.8917162,
      "lng": -74.0660695,
      "image": "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noUyLzewoIR_YGAug-L3EjKQLX79ptL2NzJXLvY8P2x6sLmvdwSK2xAO409HGy_ZIMpLulxhzA9xUq04OovbE8ZXo7tXrM3eg-voQqf7WvGRnTi_VTdGvTlZJxMbEFnbylCznE=s1360-w1360-h1020-rw"
    },
    {
      "id": 6,
      "title": "Corregimiento de La Quitaz",
      "description": "Un corregimiento del municipio de La Belleza, parte integral del territorio local.",
      "lat": 5.934608,
      "lng": -74.011073,
      "image": "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrC1q0GtPdAd_LJs17XKxm8M1kK-pKAd4-6prWizM_iva1EkfYPwuN1K6zGvL4VFWGfb7ymzkn3rFk1cntDBdwxgWQ5ryfjw9uG90AFKRzCOBjI0ealNiZLCeAAqWoYAciAGV2N=s1360-w1360-h1020-rw"
    },
    {
      "id": 7,
      "title": "Cascada El Tequendama (Santander)",
      "description": "Una cascada ubicada en Santander, perfecta para exploración y fotografía de naturaleza.",
      "lat": 5.9219432,
      "lng": -73.9695314,
      "image": "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrT3fXMWbg1bYoLOWs-ObGM7szrOTDgeptNbR1NDXVCqoLkU5XjFYwUXD5VB9YXHW0rnSM0M3E5d30q1BsUPnILAfzUgicg1t_Ixktv8U3LCdyfMOW_IcFf3H3hhGXJOmYUVFeFKg=s1360-w1360-h1020-rw"
    },
    {
      "id": 8,
      "title": "Cascada Alto de Oso",
      "description": "Una cascada natural ubicada en la región de La Belleza, rodeada de entorno boscoso y recomendado para caminatas.",
      "lat": 5.8420987,
      "lng": -74.0252938,
      "image": "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npfStKoe8wd47AhDqZyxJJWXoh_Q2t7Mbwb-lHMuHENx2kjRjfObTTFbf7cfDKfen9DJCxbtkj6Yu6jEGvISud9nGZkWx5cZzjCbzupIHRCHuyXBqDVwfVMoPSCzE-NqK8odh9m=s1360-w1360-h1020-rw"
    },
    {
      "id": 9,
      "title": "Mirador Montaña (Vereda Los Valles)",
      "description": "Un mirador en la montaña ubicado en la Vereda Los Valles, ideal para contemplar vistas panorámicas de la región.",
      "lat": 5.90361,
      "lng": -74.06528,
      "image": ""
    }
  ];

  ngAfterViewInit(): void {
    this.waitForGoogleMaps().then(() => {
      this.initializeMap();
      this.addAdventureMarkers();
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
    this.infoWindow = new window.google.maps.InfoWindow();

    // Mostrar notificación de exploración al inicializar el mapa
    setTimeout(() => {
      this.showZoomNotification();
    }, 1000);
  }

  private addAdventureMarkers(): void {
    const adventureIcon = {
      url: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="16" cy="38" rx="6" ry="2" fill="rgba(0,0,0,0.2)"/>
          <path d="M16 8 L14 10 L14 32 L16 36 L18 32 L18 10 Z" fill="#e74c3c"/>
          <circle cx="16" cy="8" r="6" fill="#f39c12" stroke="#fff" stroke-width="1"/>
          <circle cx="14" cy="6" r="2" fill="rgba(255,255,255,0.6)"/>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(32, 40),
      anchor: new window.google.maps.Point(16, 36)
    };

    this.adventurePoints.forEach(point => {
      const marker = new window.google.maps.Marker({
        position: { lat: point.lat, lng: point.lng },
        map: this.map,
        title: point.title,
        icon: adventureIcon,
        animation: window.google.maps.Animation.DROP
      });

      marker.addListener('click', () => {
        this.showAdventureInfo(point, marker);
      });

      this.markers.push(marker);
    });
  }

  private showAdventureInfo(point: AdventurePoint, marker: any): void {
    const contentString = `
      <div style="
        max-width: 320px;
        width: 100%;
        font-family: system-ui, -apple-system, sans-serif;
        border-radius: 16px;
        overflow: hidden;
        background: white;
        margin: -8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      ">
        <!-- Header simplificado -->
        <div style="
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          padding: 16px;
          text-align: center;
        ">
          <h3 style="
            margin: 0;
            font-size: 18px;
            font-weight: 700;
            line-height: 1.2;
          ">${point.title}</h3>
          <p style="
            margin: 4px 0 0 0;
            font-size: 12px;
            opacity: 0.9;
          ">📍 Destino Turístico</p>
        </div>

        <!-- Contenido -->
        <div style="padding: 16px;">
          ${point.image ? `
          <!-- Imagen -->
          <div style="
            margin-bottom: 12px;
            border-radius: 12px;
            overflow: hidden;
          ">
            <img src="${point.image}" alt="${point.title}" style="
              width: 100%;
              height: 160px;
              object-fit: cover;
              display: block;
            ">
          </div>
          ` : ''}

          <!-- Descripción -->
          <p style="
            margin: 0 0 16px 0;
            font-size: 14px;
            line-height: 1.5;
            color: #374151;
          ">${point.description}</p>

          <!-- Coordenadas -->
          <div style="
            background: #f3f4f6;
            padding: 8px 12px;
            border-radius: 8px;
            margin-bottom: 16px;
            font-size: 12px;
            color: #6b7280;
          ">
            📍 ${point.lat.toFixed(4)}, ${point.lng.toFixed(4)}
          </div>

          <!-- Botones -->
          <div style="display: flex; gap: 8px;">
            <button style="
              flex: 1;
              background: #4f46e5;
              color: white;
              border: none;
              padding: 10px 16px;
              border-radius: 8px;
              font-size: 13px;
              font-weight: 600;
              cursor: pointer;
            " onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}&travelmode=driving', '_blank')">
              🚗 Conducir
            </button>
            <button style="
              flex: 1;
              background: #059669;
              color: white;
              border: none;
              padding: 10px 16px;
              border-radius: 8px;
              font-size: 13px;
              font-weight: 600;
              cursor: pointer;
            " onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}&travelmode=walking', '_blank')">
              🚶 Caminar
            </button>
          </div>
        </div>
      </div>
    `;

    this.infoWindow.setContent(contentString);
    this.infoWindow.setOptions({
      pixelOffset: new window.google.maps.Size(0, -10),
      disableAutoPan: false,
      maxWidth: Math.min(320, window.innerWidth - 40),
      ariaLabel: point.title
    });
    this.infoWindow.open(this.map, marker);
  }

  private showZoomNotification(): void {
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }

    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 16px;
        left: 16px;
        right: 16px;
        background: #4f46e5;
        color: white;
        padding: 12px 16px;
        border-radius: 12px;
        font-family: system-ui, sans-serif;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideDown 0.3s ease;
        max-width: 400px;
        margin: 0 auto;
      ">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">🗺️ Explora La Belleza</div>
            <div style="font-size: 13px; opacity: 0.9;">Haz zoom out para ver todos los destinos</div>
          </div>
          <button onclick="this.parentElement.parentElement.remove()" style="
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            line-height: 1;
          ">×</button>
        </div>
      </div>

      <style>
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      </style>
    `;

    document.body.appendChild(notification);

    this.notificationTimeout = setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 4000);
  }
}
