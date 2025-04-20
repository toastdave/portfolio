import * as THREE from 'three';

interface ThreeCanvasOptions {
  elementId: string;
  interactive?: boolean;
  mouseMove?: boolean;
}

export class ThreeCanvas {
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private dnaStrands: THREE.Points[] = [];
  private clock: THREE.Clock;
  private targetX: number = 0;
  private targetY: number = 0;
  private windowHalfX: number = window.innerWidth / 2;
  private windowHalfY: number = window.innerHeight / 2;
  private options: ThreeCanvasOptions;
  private container: HTMLElement | null;
  
  constructor(options: ThreeCanvasOptions) {
    this.options = {
      interactive: true,
      mouseMove: true,
      ...options
    };
    
    this.container = document.getElementById(options.elementId);
    
    if (!this.container) {
      console.error(`Element with ID "${options.elementId}" not found`);
      return;
    }
    
    this.clock = new THREE.Clock();
    this.init();
    this.animate();
    
    if (this.options.mouseMove) {
      this.addMouseMoveListener();
    }
    
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }
  
  private init(): void {
    if (!this.container) return;
    
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 30;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);
    
    // Create DNA strands
    this.createDNAStrands();
  }
  
  private createDNAStrands(): void {
    const numPoints = 100;
    const radius = 8;
    const height = 40;
    const strandsCount = 2;
    const colors = [0x4984fa, 0x17b3a1];
    
    for (let s = 0; s < strandsCount; s++) {
      const points = new Float32Array(numPoints * 3);
      const sizes = new Float32Array(numPoints);
      const colors = new Float32Array(numPoints * 3);
      const colorObj = new THREE.Color(s === 0 ? 0x4984fa : 0x17b3a1);
      
      for (let i = 0; i < numPoints; i++) {
        const t = (i / numPoints) * Math.PI * 4;
        const phase = s * Math.PI;
        
        points[i * 3] = Math.cos(t + phase) * radius;
        points[i * 3 + 1] = (i / numPoints) * height - height / 2;
        points[i * 3 + 2] = Math.sin(t + phase) * radius;
        
        sizes[i] = 0.5;
        
        colors[i * 3] = colorObj.r;
        colors[i * 3 + 1] = colorObj.g;
        colors[i * 3 + 2] = colorObj.b;
      }
      
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(points, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const material = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: true
      });
      
      const strand = new THREE.Points(geometry, material);
      this.scene.add(strand);
      this.dnaStrands.push(strand);
    }
  }
  
  private addMouseMoveListener(): void {
    document.addEventListener('mousemove', (event) => {
      this.targetX = (event.clientX - this.windowHalfX) * 0.001;
      this.targetY = (event.clientY - this.windowHalfY) * 0.001;
    });
  }
  
  private onWindowResize(): void {
    if (!this.container) return;
    
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  
  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }
  
  private render(): void {
    const time = this.clock.getElapsedTime();
    
    // Rotate DNA strands
    this.dnaStrands.forEach((strand, index) => {
      strand.rotation.y = time * 0.5;
      strand.rotation.x = Math.sin(time * 0.3) * 0.2;
    });
    
    if (this.options.mouseMove) {
      this.scene.rotation.y += (this.targetX - this.scene.rotation.y) * 0.05;
      this.scene.rotation.x += (this.targetY - this.scene.rotation.x) * 0.05;
    }
    
    this.renderer.render(this.scene, this.camera);
  }
  
  public dispose(): void {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    document.removeEventListener('mousemove', () => {});
    
    this.dnaStrands.forEach(strand => {
      strand.geometry.dispose();
      (strand.material as THREE.Material).dispose();
    });
    
    this.renderer.dispose();
    
    if (this.container) {
      while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
      }
    }
  }
}