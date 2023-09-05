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
      }

      initialize() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
          this.fov,
          window.innerWidth / window.innerHeight,
          1,
          1000
        );

        this.camera.position.set(20, 10, 50);

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
        this.controls.movementSpeed = 10;
        this.controls.lookSpeed = 0.09;
        this.controls.activeLook = true;

        window.addEventListener('resize', () => this.onWindowResize(), false);
        
      }

      animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.controls.update(this.clock.getDelta());
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
    }

    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/src/assets/shiba/scene.gltf', (gltfScene) => {
      const loadedModel = gltfScene.scene;

      loadedModel.rotation.y = Math.PI / 8;
      loadedModel.position.y = 0;
      loadedModel.position.x = 0;
      loadedModel.scale.set(10, 10, 10);

      test.scene.add(loadedModel);

      test.animate();
    });
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}
