import { FooterComponent } from './../../components/footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { Scene,PerspectiveCamera, WebGLRenderer, TorusGeometry, MeshBasicMaterial, Mesh, SphereGeometry, MathUtils} from 'three';

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

    //Torus
    const geometry = new TorusGeometry(10, 3, 16, 100)
    const material = new MeshBasicMaterial({color: "#be123c", wireframe: true})
    const torus = new Mesh( geometry, material)

    //Circle
    const geometryCircle = new SphereGeometry( 5, 32, 16 );
    const materialCircle = new MeshBasicMaterial( { color: "#be123c", wireframe:true } )
    const sphere = new Mesh( geometryCircle, materialCircle )

    scene.add(torus,sphere)

    //animation loop
    const animate = function(){
      requestAnimationFrame(animate)
      torus.rotation.x += 0.01
      torus.rotation.y += 0.01
      torus.rotation.z += 0.01
      sphere.rotation.x += 0.01
      sphere.rotation.y += 0.01
      sphere.rotation.z += 0.01
      renderer.render(scene,camera)
    }

    const randomElements = function(){
      const geometry = new SphereGeometry(0.5, 30, 30)
      const material = new MeshBasicMaterial( { color: "#be123c" } )
      const star = new Mesh(geometry,material)

     
      let x = MathUtils.randFloatSpread(100)
      let y = MathUtils.randFloatSpread(100)
      let z = MathUtils.randFloatSpread(100)
      star.position.set(x,y,z)
      scene.add(star)
    }

    animate()

    for (let index = 0; index < 100; index++) {
      randomElements()
    }

  }
}
