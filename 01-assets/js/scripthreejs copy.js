//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";



document.getElementById("nextbtn").addEventListener("click", changeTo3jsCanvas)

function changeTo3jsCanvas() {
  document.getElementById("canvas").style.display = "none";
  document.getElementById("webgl").style.display = "block";
  document.getElementById("upperCanvas").style.display = "none";
  console.log(window.points+"jno");
  modifyPoints();
  lineDrawing();

}


// Canvas
const canvas = document.querySelector('#webgl');

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color("grey");

// Sizes

const sizes = {
  width: 800,
  height: 600
}

// Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 2, 10);
scene.add(camera);

//nice ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

//nice directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
scene.add(directionalLight);


/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshLambertMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//object mirror
const shapemirror = new THREE.Shape();
shapemirror.moveTo(0, 0);
shapemirror.lineTo(0, 6);
shapemirror.lineTo(6, 6);
shapemirror.lineTo(6, 0);
shapemirror.lineTo(0, 0);

const extrudemirror = {
  bevelEnabled: false,
  steps: 1,
  depth: 0.1,
};

const geomtryMirror = new THREE.ExtrudeGeometry(shapemirror, extrudemirror);

const meshmirror = new THREE.Mesh(geomtryMirror, material)


//scene.add( meshmirror );

//onject 3
//===================================================//
//shape
const shape2 = new THREE.Shape();
shape2.moveTo(0, 0);
shape2.lineTo(0, 0.3);
shape2.lineTo(0.3, 0.3);
shape2.lineTo(0.3, 0);
shape2.lineTo(0, 0);






function modifyPoints() {
  for (var i = 0; i < window.points.length; i++) {
    window.points[i].x = (window.points[i].x) / 100;
    window.points[i].y = (window.points[i].y) / 100;
    window.points[i].z = 0;

  }
}


const linecurve = [];
const extrudeline = [];
const geometryline = [];
const meshline = [];



function lineDrawing() {

  for (var j = 0; j < window.points.length; j++) {

    linecurve[j] = new THREE.LineCurve3(
      new THREE.Vector3(window.points[j].x, window.points[j].y, window.points[j].z),
      new THREE.Vector3(window.points[(j+1)%window.points.length].x, window.points[(j+1)%window.points.length].y, window.points[(j+1)%window.points.length].z)
    );
    extrudeline[j] = {
      steps: 1,
      extrudePath: linecurve[j]
    };
    geometryline[j] = new THREE.ExtrudeGeometry(shape2, extrudeline[j]);
    meshline[j] = new THREE.Mesh(geometryline[j], material);
    scene.add(meshline[j]);

    console.log(window.points[0].x);
  }
}



//===================================================//
/*const linecurve = [];
const extrudeline = {};
let geometryline;
let meshline;

function from2dto3d(){
    for (var i = 0;  i <= points.length; i++) {

        linecurve = new THREE.LineCurve3(
            new THREE.Vector3(pt[i]),
            new THREE.Vector3(pt[i+1])
          );
        extrudeline[i]={
            steps: 4,
            extrudePath: linecurve[i]
        }
        geometryline[i] = new THREE.ExtrudeGeometry( shape2, extrudeline[i] );
        meshline[i] = new THREE.Mesh( geometryline[i], material);
        scene.add( meshline[i] );
    }
}*/

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)



//controls for orbit aroud the object
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => { renderer.render(scene, camera) });
controls.target.set(0, 0, 0);
controls.update();

renderer.render(scene, camera)


