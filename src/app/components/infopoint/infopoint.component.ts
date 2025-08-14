import { Component, Input } from '@angular/core';
import { Point } from '../../models/point';

@Component({
  selector: 'app-infopoint',
  imports: [],
  templateUrl: './infopoint.component.html',
  styleUrl: './infopoint.component.css'
})
export class InfopointComponent {

  @Input() point: Point | null = null;
  @Input() closeModal: () => void = () => {};
}
