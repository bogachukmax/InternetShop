import { Component, inject } from '@angular/core';
import { GoodsService } from '../goods.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { PreviewComponent } from "../preview/preview.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, PreviewComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  goods = inject(GoodsService);
}
