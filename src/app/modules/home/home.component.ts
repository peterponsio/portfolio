import { FooterComponent } from './../../components/footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { Scene,PerspectiveCamera, WebGLRenderer, TorusGeometry, MeshBasicMaterial, Mesh} from 'three';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  standalone:true,
  imports:[HeaderComponent,FooterComponent,RouterOutlet]
})
export class HomeComponent implements OnInit {

  constructor() { 
   this.set3DBackGround()
  }

  ngOnInit(): void {}

  set3DBackGround(){
    const scene = new Scene()
    const camera = new PerspectiveCamera(75, window.innerWidth / innerHeight, 0.1, 1000)
    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    camera.position.setZ(40)
    document.body.appendChild( renderer.domElement );

    //Add materials 
    const geometry = new TorusGeometry(10, 3, 16, 100)
    const material = new MeshBasicMaterial({color: "#be123c", wireframe: true})
    const torus = new Mesh( geometry, material)
    scene.add(torus)

    //animation loop
    const animate = function(){
      requestAnimationFrame(animate)
      torus.rotation.x += 0.01
      torus.rotation.y += 0.01
      torus.rotation.z += 0.01
      renderer.render(scene,camera)
    }
    animate()
  }

}
