import { FooterComponent } from './../../components/footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { Scene,PerspectiveCamera, WebGLRenderer, TorusGeometry, MeshBasicMaterial, Mesh, SphereGeometry, MathUtils, TorusKnotGeometry, PointLight, AmbientLight, PointLightHelper, GridHelper} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  standalone:true,
  imports:[HeaderComponent,FooterComponent,RouterOutlet],
})
export class HomeComponent implements OnInit {

  torusReference:any
  cameraReference:any

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
    camera.position.setZ(30)
    document.body.appendChild( renderer.domElement );
    this.cameraReference = camera
    //Add materials 

    //Torus
    const geometry = new TorusGeometry(10, 3, 16, 100)
    const material = new MeshBasicMaterial({color: "#be123c", wireframe: true})
    const torus = new Mesh( geometry, material)
    this.torusReference = torus
    //Circle
    const geometryCircle = new SphereGeometry( 5, 32, 16 );
    const materialCircle = new MeshBasicMaterial( { color: "#be123c", wireframe:true } )
    const sphere = new Mesh( geometryCircle, materialCircle )

    scene.add(torus,sphere)

    //LIghts 
    const pointLight = new PointLight(0xffffff)
    pointLight.position.set(5,5,5)
    const ambientLight = new AmbientLight(0xffffff)
    scene.add(pointLight,ambientLight)
    const controls = new OrbitControls(camera,renderer.domElement)

    //animation loop
    const animate = function(){
      requestAnimationFrame(animate)
      torus.rotation.x += 0.01
      torus.rotation.y += 0.01
      torus.rotation.z += 0.01
      sphere.rotation.x += 0.01
      sphere.rotation.y += 0.01
      sphere.rotation.z += 0.01

      controls.update()
      renderer.render(scene,camera)
    }

    // print random elements
    const randomElements = function(){
      const geometry = new TorusKnotGeometry( 0.10, 1, 3, 10 );
      const material = new MeshBasicMaterial( { color: "#be123c" ,wireframe: true } );
      const torusKnot = new Mesh( geometry, material );

      let x = MathUtils.randFloatSpread(100)
      let y = MathUtils.randFloatSpread(100)
      let z = MathUtils.randFloatSpread(100)
      torusKnot.position.set(x,y,z)
      scene.add(torusKnot)
    }

    animate()

    //initial random elements
    for (let index = 0; index < 200; index++) {
      randomElements()
    }

    const moveCamera = function(){  
      const t = document.body.getBoundingClientRect().top
      torus.rotation.x += 0.05
      torus.rotation.y += 0.075
      torus.rotation.z += 0.05

      //camera.position.z = t*-0.01
      camera.position.x = t*-0.0002
      camera.position.y = t*-0.0002
    }
  }

  moveCamera(){  
    console.log("hago cosas");
    
    const t = document.body.getBoundingClientRect().top
    this.torusReference.rotation.x += 0.05
    this.torusReference.rotation.y += 0.075
    this.torusReference.rotation.z += 0.05

    //camera.position.z = t*-0.01
    this.cameraReference.position.x = t*-0.0002
    this.cameraReference.position.y = t*-0.0002
  }

}
