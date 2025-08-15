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
  private readonly zoom = 16;
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
  ]

    ;

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

    // Inicializar InfoWindow
    this.infoWindow = new window.google.maps.InfoWindow();

    // Mostrar notificación de exploración al inicializar el mapa
    setTimeout(() => {
      this.showZoomNotification();
    }, 1000); // Delay de 1 segundo para que se vea bien
  }  private addAdventureMarkers(): void {
    // Usar el icono thumbtack predefinido de Google Maps o crear uno simple
    const adventureIcon = {
      url: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
          <!-- Sombra -->
          <ellipse cx="16" cy="38" rx="6" ry="2" fill="rgba(0,0,0,0.2)"/>
          <!-- Cuerpo del thumbtack -->
          <path d="M16 8 L14 10 L14 32 L16 36 L18 32 L18 10 Z" fill="#e74c3c"/>
          <!-- Cabeza del thumbtack -->
          <circle cx="16" cy="8" r="6" fill="#f39c12" stroke="#fff" stroke-width="1"/>
          <!-- Brillo -->
          <circle cx="14" cy="6" r="2" fill="rgba(255,255,255,0.6)"/>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(32, 40),
      anchor: new window.google.maps.Point(16, 36)
    }; this.adventurePoints.forEach(point => {
      const marker = new window.google.maps.Marker({
        position: { lat: point.lat, lng: point.lng },
        map: this.map,
        title: point.title,
        icon: adventureIcon,
        animation: window.google.maps.Animation.DROP
      });

      // Agregar listener para mostrar información al hacer clic
      marker.addListener('click', () => {
        this.showAdventureInfo(point, marker);
      });

      this.markers.push(marker);
    });
  }

  private showAdventureInfo(point: AdventurePoint, marker: any): void {
    const contentString = `
      <div style="
        max-width: 380px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        border-radius: 20px;
        overflow: hidden;
        background: white;
        margin: -15px;
        position: relative;
      ">
        <!-- Header mejorado con gradiente más elegante -->
        <div style="
          background: linear-gradient(135deg, #2D3748 0%, #4A5568 50%, #667EEA 100%);
          margin-bottom: 20px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          color: white;
          padding: 30px 25px 25px 25px;
          position: relative;

        ">
          <!-- Patrón decorativo sutil -->
          <div style="
            position: absolute;
            top: -20px;
            right: -20px;
            width: 120px;
            height: 120px;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 15px 15px;
            opacity: 0.3;
            border-radius: 50%;
          "></div>


          <!-- Título principal mejorado -->
          <h2 style="
            margin: 0 0 8px 0;
            font-size: 28px;
            font-weight: 800;
            position: relative;
            z-index: 1;
            text-shadow: 0 3px 12px rgba(0,0,0,0.4);
            line-height: 1.1;
            letter-spacing: -0.5px;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          ">${point.title}</h2>

          <!-- Línea decorativa -->
          <div style="
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #F7FAFC 0%, rgba(255,255,255,0.3) 100%);
            border-radius: 2px;
            margin-bottom: 5px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          "></div>

          <!-- Subtítulo/categoría -->
          <p style="
            margin: 0;
            font-size: 14px;
            font-weight: 500;
            opacity: 0.9;
            letter-spacing: 0.3px;
            color: #E2E8F0;
          ">Destino Turístico</p>

          <!-- Icono decorativo mejorado -->
          <div style="
            position: absolute;
            top: 25px;
            right: 25px;
            width: 50px;
            height: 50px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid rgba(255,255,255,0.2);
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          ">
            <i class="fas fa-mountain" style="font-size: 20px; color: #F7FAFC; text-shadow: 0 1px 3px rgba(0,0,0,0.3);"></i>
          </div>
        </div>

        <!-- Contenido principal mejorado -->
        <div style="padding: 25px 20px;">
          <!-- Imagen con efectos mejorados -->
          <div style="
            position: relative;
            margin-bottom: 20px;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
            transform: translateY(0);
            transition: transform 0.3s ease;
          ">
            <img src="${point.image}" alt="${point.title}" style="
              width: 100%;
              height: 200px;
              object-fit: cover;
              transition: transform 0.4s ease;
            " onmouseover="this.style.transform='scale(1.05)'"
               onmouseout="this.style.transform='scale(1)'">

            <!-- Overlay con gradiente más sutil -->
            <div style="
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 50px;
              background: linear-gradient(transparent, rgba(0,0,0,0.4));
              display: flex;
              align-items: end;
              padding: 10px 15px;
            ">
              <div style="
                color: white;
                font-size: 12px;
                font-weight: 500;
                text-shadow: 0 1px 3px rgba(0,0,0,0.5);
              ">📸 Toca para ver imagen completa</div>
            </div>
          </div>

          <!-- Descripción mejorada -->
          <p style="
            margin: 0 0 20px 0;
            line-height: 1.7;
            color: #4a5568;
            font-size: 15px;
            text-align: justify;
            position: relative;
            padding-left: 15px;
            border-left: 3px solid #667eea;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 15px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
          ">${point.description}</p>

          <!-- Información de ubicación mejorada -->
          <div style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            padding: 15px;
            margin: 20px 0;
            color: white;
            position: relative;
            overflow: hidden;
          ">
            <!-- Fondo decorativo -->
            <div style="
              position: absolute;
              top: -10px;
              right: -10px;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background: rgba(255,255,255,0.1);
            "></div>

            <div style="
              display: flex;
              align-items: center;
              font-size: 14px;
              font-weight: 500;
              position: relative;
              z-index: 1;
            ">
              <i class="fas fa-map-marker-alt" style="
                margin-right: 10px;
                font-size: 16px;
                color: #f093fb;
                text-shadow: 0 1px 2px rgba(0,0,0,0.2);
              "></i>
              <span>Lat: ${point.lat.toFixed(4)}, Lng: ${point.lng.toFixed(4)}</span>
            </div>
          </div>

          <!-- Botones de navegación mejorados -->
          <div style="margin-top: 20px;">
            <div style="
              display: flex;
              gap: 10px;
              margin-bottom: 12px;
            ">
              <!-- Botón Conducir -->
              <button style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                transition: all 0.3s ease;
                flex: 1;
                position: relative;
                overflow: hidden;
              " onmouseover="
                this.style.transform='translateY(-3px)';
                this.style.boxShadow='0 8px 25px rgba(102, 126, 234, 0.4)';
                this.style.background='linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)';
              " onmouseout="
                this.style.transform='translateY(0)';
                this.style.boxShadow='0 4px 15px rgba(102, 126, 234, 0.3)';
                this.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
              " onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}&travelmode=driving', '_blank')">
                <i class="fas fa-car" style="margin-right: 8px;"></i> Conducir
              </button>

              <!-- Botón Caminar -->
              <button style="
                background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
                transition: all 0.3s ease;
                flex: 1;
                position: relative;
                overflow: hidden;
              " onmouseover="
                this.style.transform='translateY(-3px)';
                this.style.boxShadow='0 8px 25px rgba(72, 187, 120, 0.4)';
                this.style.background='linear-gradient(135deg, #38a169 0%, #2f855a 100%)';
              " onmouseout="
                this.style.transform='translateY(0)';
                this.style.boxShadow='0 4px 15px rgba(72, 187, 120, 0.3)';
                this.style.background='linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
              " onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}&travelmode=walking', '_blank')">
                <i class="fas fa-walking" style="margin-right: 8px;"></i> Caminar
              </button>
            </div>

            <!-- Botón Ver en Maps centrado -->
            <button style="
              background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 10px;
              font-size: 13px;
              font-weight: 500;
              cursor: pointer;
              box-shadow: 0 3px 12px rgba(237, 137, 54, 0.3);
              transition: all 0.3s ease;
              width: 100%;
              position: relative;
              overflow: hidden;
            " onmouseover="
              this.style.transform='scale(1.02)';
              this.style.boxShadow='0 5px 18px rgba(237, 137, 54, 0.4)';
              this.style.background='linear-gradient(135deg, #dd6b20 0%, #c05621 100%)';
            " onmouseout="
              this.style.transform='scale(1)';
              this.style.boxShadow='0 3px 12px rgba(237, 137, 54, 0.3)';
              this.style.background='linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)';
            " onclick="window.open('https://www.google.com/maps/search/?api=1&query=${point.lat},${point.lng}', '_blank')">
              <i class="fas fa-map-marked-alt" style="margin-right: 6px;"></i> Ver ubicación completa en Maps
            </button>
          </div>
        </div>
      </div>

      <style>
        @keyframes float {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          33% { transform: translateX(30px) translateY(-10px) rotate(5deg); }
          66% { transform: translateX(-20px) translateY(5px) rotate(-3deg); }
        }
      </style>
    `;    // Configurar el InfoWindow con estilos mejorados
    this.infoWindow.setContent(contentString);
    this.infoWindow.setOptions({
      pixelOffset: new window.google.maps.Size(0, -10),
      disableAutoPan: false,
      maxWidth: 380,
      ariaLabel: point.title
    });
    this.infoWindow.open(this.map, marker);
  }

  private showZoomNotification(): void {
    // Limpiar timeout anterior si existe
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }

    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.5s ease-out;
        border: 1px solid rgba(255,255,255,0.2);
        backdrop-filter: blur(10px);
      ">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <i class="fas fa-search-minus" style="margin-right: 10px; font-size: 16px; color: #f093fb;"></i>
          <strong style="font-size: 15px;">�️ Explora La Belleza</strong>
        </div>
        <div style="font-size: 13px; line-height: 1.4; opacity: 0.95;">
          Haz zoom out para descubrir todos los puntos turísticos de La Belleza, Santander
        </div>
        <div style="
          position: absolute;
          top: 8px;
          right: 10px;
          cursor: pointer;
          font-size: 16px;
          opacity: 0.7;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
        " onclick="this.parentElement.parentElement.remove()"
           onmouseover="this.style.opacity='1'; this.style.backgroundColor='rgba(255,255,255,0.2)'"
           onmouseout="this.style.opacity='0.7'; this.style.backgroundColor='transparent'">
          ×
        </div>
      </div>

      <style>
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      </style>
    `;

    // Agregar al DOM
    document.body.appendChild(notification);

    // Auto-remover después de 5 segundos con animación
    this.notificationTimeout = setTimeout(() => {
      const notificationElement = notification.querySelector('div') as HTMLElement;
      if (notificationElement) {
        notificationElement.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 500);
      }
    }, 5000);
  }

  private navigateToPoint(lat: number, lng: number, title: string): void {
    // URL para abrir Google Maps con direcciones
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;

    // Abrir en una nueva pestaña
    window.open(googleMapsUrl, '_blank');
  }
}
