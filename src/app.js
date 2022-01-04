import { 
  PerspectiveCamera, 
  WebGLRenderer, 
  Scene, 
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  BufferGeometry,
  BufferAttribute,
  Float32BufferAttribute,
  MathUtils} from 'three';

class App {
  constructor() {
    const fov = 75;
    this.camera = new PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z= (window.innerHeight / 2) / Math.tan(MathUtils.degToRad(fov / 2));
    this.scene = new Scene();
    this.scene.background = null;
  
    this.renderer = new WebGLRenderer({
        antialias: true,
        alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.createScene();

    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  createScene() {
    const geometry = new BufferGeometry();
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.5;
    const angleStep = Math.PI * 2 / 3;
    const offsetAngle = Math.PI / 2;

    const vertices = [];
    const normals = [];
    for (let i = 0; i < 3; i++) {
      vertices.push(Math.cos(i * angleStep + offsetAngle) * radius, Math.sin(i * angleStep + offsetAngle) * radius, 0);
      normals.push(0, 0, 1);
    }
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));

    const colors = new Float32Array([
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ]);
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    geometry.center();

    const mesh = new Mesh(geometry, new MeshStandardMaterial({ vertexColors: true }));
    this.scene.add(mesh);

    const light = new HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    this.scene.add(light);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera); 
  }
}

new App();
