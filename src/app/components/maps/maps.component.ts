import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar *ngIf
import { GoogleMap, GoogleMapsModule, MapInfoWindow } from '@angular/google-maps'; // Importa GoogleMapsModule para usar <google-map>
import { Geo } from '../../models/geopoint';
import { Point } from '../../models/point';
import { InfopointComponent } from "../infopoint/infopoint.component";

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-maps',
  imports: [CommonModule, GoogleMapsModule, InfopointComponent],
  providers: [MapInfoWindow, GoogleMap],
  template: `
    <div class="w-full h-screen">
      <google-map
        mapId="959ff3c887e13fe29f79a291"
        [height]="'100%'"
        [width]="'100%'"
        [center]="center"
        [zoom]="zoom"
        [options]="mapOptions"
        (mapClick)="addMarkers($event)">
          @for (m of markers; track m.title) {
            <map-advanced-marker
            #marker="mapAdvancedMarker"
            [position]="{ lat: m.coord.lat, lng: m.coord.lng }" [options]="{
              title: m.title,
            }" (mapClick)="openModal(m, marker)"
            />
          }
      </google-map>
        <map-info-window [hidden]="!selectedPoint" class="dialog justify-center items-center">
          <div class=" overflow-y-auto overflow-x-hidden fixed top-1/3 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow-sm ">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 class="text-xl font-semibold text-black-900">
                            {{selectedPoint?.title}}
                        </h3>
                        <button (click)="closeModal()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                    <app-infopoint [point]="selectedPoint" [closeModal]="closeModal"></app-infopoint>
                </div>
              </div>
            </div>
        </map-info-window>
    </div>
  `,
  styleUrl: './maps.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapsComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  private mapReference = viewChild.required<GoogleMap>(GoogleMap);
  private infoWindowReference = viewChild.required<MapInfoWindow>(MapInfoWindow);

  private map: any;

  mapOptions: any = {
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
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'administrative',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'road',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    };
  readonly center: Geo = { lat: 5.8575, lng: -73.965555555556 };
  readonly zoom: number = 16;

  readonly markers: Point[] = [
    {
      title: 'Punto de Interés 1',
      description: 'Descripción del punto 1',
      images: [],
      coord: { lat: 5.858, lng: -73.965 },
    },
    {
      title: 'Punto de Interés 2',
      description: 'Descripción del punto 2',
      images: [],
      coord: { lat: 5.857, lng: -73.966 },
    },
    {
      title: 'Punto central',
      description: 'Descripción del punto central',
      images: [],
      coord: { lat: 5.8575, lng: -73.965555555556 },
    },
  ];

  selectedPoint: Point | null = null;

  ngAfterViewInit(): void {
    this.waitForGoogleMaps().then(() => {
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


  addMarkers(e: google.maps.MapMouseEvent) {

    this.markers.forEach((markerData, i) => {
      new google.maps.marker.AdvancedMarkerElement({
        position: markerData.coord,
        title: markerData.title,
        gmpClickable: true,
      });
      
    });
  }

  async openModal(point: Point, marker: any): Promise<void> {
    this.selectedPoint = point;
    this.mapReference().panTo(point.coord);

    const anchor = marker.marker ? marker.marker : marker;
    this.infoWindowReference().open({
      getAnchor: () => anchor
    });
  }

  closeModal(): void {
    this.selectedPoint=null;
  }
}