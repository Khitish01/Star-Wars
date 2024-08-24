import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit, OnDestroy {
  @Input() enabled: boolean = false
  ngOnInit(): void {
    document.body.classList.add('hide-scroll')
  }
  ngOnDestroy(): void {
    document.body.classList.toggle('hide-scroll')
  }
}
