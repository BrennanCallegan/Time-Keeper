import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Time-Keeper';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.applyScaling();
      }
    });
  }

  applyScaling() {
    const baseWidth = 1920;
    const baseHeight = 1080;
    const scale = Math.min(window.innerWidth / baseWidth, window.innerHeight / baseHeight);
    const offsetX = (window.innerWidth - baseWidth * scale) / 2;
    const offsetY = (window.innerHeight - baseHeight * scale) / 2;

    const wrapper = document.getElementById('scale-wrapper');
    if(wrapper) {
      wrapper.style.transform = `translate(${offsetX}px, ${offsetY}px, scale${scale})`;
    }
  }
}
