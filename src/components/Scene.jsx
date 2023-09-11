import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

export default function SceneComponent() {
  useEffect(() => {
    class SceneInit {
      constructor(canvasId) {
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;
        this.fov = 60;
        this.nearPlane = 1;
        this.farPlane = 1000;
        this.canvasId = canvasId;
        this.clock = undefined;
        this.controls = undefined;
        this.ambientLight = undefined;
        this.directionalLight = undefined;
        this.loadedModel1 = undefined; // Primer modelo GLTF
    /*     this.loadedModel2 = undefined; // Segundo modelo GLTF
        this.loadedModel3 = undefined */ // Tercer modelo GLTF
      }

      initialize() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
          this.fov,
          window.innerWidth / window.innerHeight,
          this.nearPlane,
          this.farPlane
        );
        this.camera.position.set(10, 5, 100);
        const canvas = document.getElementById(this.canvasId);
        this.renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.clock = new THREE.Clock();
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        this.scene.add(this.ambientLight);
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        this.directionalLight.position.set(0, 32, 64);
        this.scene.add(this.directionalLight);
        this.controls = new FirstPersonControls(this.camera, this.renderer.domElement);
        this.controls.movementSpeed = 20;
        this.controls.lookSpeed = 0.09;
        this.controls.activeLook = true;

        // Configuración del fondo degradado como un atardecer
        const gradientTexture = new THREE.Texture(generateGradientTexture());
        gradientTexture.needsUpdate = true;
        this.scene.background = gradientTexture;

        window.addEventListener('resize', () => this.onWindowResize(), false);
      }

      animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.controls.update(this.clock.getDelta());

        this.applyWind(); // Aplicar efecto de viento

        this.render();
      }

      render() {
        this.renderer.render(this.scene, this.camera);
      }

      onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }

      // Método para aplicar el efecto de viento a los objetos de la escena
      applyWind() {
        const windSpeed = 0.1; // Ajusta la velocidad del viento según tus necesidades
        if (this.loadedModel1) {
          this.loadedModel1.position.x -= windSpeed;
        }
        if (this.loadedModel2) {
          this.loadedModel2.position.x -= windSpeed;
        }
        if (this.loadedModel3) {
          this.loadedModel3.position.x -= windSpeed;
        }
      }
    }

    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();

    const gltfLoader = new GLTFLoader();

    // Carga el primer modelo GLTF
    gltfLoader.load('/src/assets/shiba/sea_shack.glb', (gltfScene) => {
      const loadedModel1 = gltfScene.scene;

      // Configura las propiedades del primer modelo
      loadedModel1.rotation.y = Math.PI / 8;
      loadedModel1.position.y = -30;
      loadedModel1.position.x = -5;
      loadedModel1.scale.set(5, 5, 5);

      test.scene.add(loadedModel1);

      // Inicia la animación
      test.animate();
    });

   
   /*  gltfLoader.load('/src/assets/shiba/sea_shack.glb', (gltfScene) => {
      const loadedModel2 = gltfScene.scene;

     
      loadedModel2.rotation.y = Math.PI / 4;
      loadedModel2.position.y = -30;
      loadedModel2.position.x = 1;
      loadedModel2.scale.set(2, 2, 2);

      test.scene.add(loadedModel2);
    });

   
    gltfLoader.load('/src/assets/shiba/sea_shack.glb', (gltfScene) => {
      const loadedModel3 = gltfScene.scene;

  
      loadedModel3.rotation.y = Math.PI / 6;
      loadedModel3.position.y = 30;
      loadedModel3.position.x = -109;
      loadedModel3.scale.set(5, 5, 5);

      test.scene.add(loadedModel3);
    }); */
  }, []);

  // Función para generar la textura de degradado
  function generateGradientTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;

    const context = canvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(250, 250, 250, 1)');
    gradient.addColorStop(0.34, 'rgba(230, 152, 79, 1)');
    gradient.addColorStop(0.65, 'rgba(184, 156, 255, 1)');
    gradient.addColorStop(1, 'rgba(250, 250, 250, 1)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
  }

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}
