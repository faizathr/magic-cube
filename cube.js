import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

const canvas = document.querySelector("#three-js-canvas");
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas,
  alpha: true,
});

const fov = 75;
const aspect = 2;
const near = 1;
const far = 25;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(-8, 8, 8);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.update();

const scene = new THREE.Scene();

let cubeinstance = [];
let textinstance = [];

function addLight(...pos) {
  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(...pos);
  scene.add(light);
}

addLight(-1, 2, 4);
addLight(1, -1, -2);

let textPosTranslate = [0.1, -0.3, 0];

function generateCube(numbers) {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
  scene.background = null;
  addLight(-1, 2, 4);
  addLight(1, -1, -2);
  cubeinstance = [];
  textinstance = [];

  const loader = new FontLoader();
  loader.load("/fonts/helvetiker_regular.typeface.json", function (font) {
    function makeInstance(x, y, z, value) {
      const textGeometry = new TextGeometry(value.toString(), {
        font: font,
        size: 0.5,
        depth: 0.1,
      });
      const textMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });

      const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
      const boxMaterial = new THREE.MeshPhongMaterial({
        color: 0xffc8c8,
        opacity: 0.14,
        transparent: true,
      });

      const cube = new THREE.Mesh(boxGeometry, boxMaterial);
      const text = new THREE.Mesh(textGeometry, textMaterial);

      cube.userData.value = value.toString();

      textGeometry.computeBoundingBox();
      if (textGeometry.boundingBox) {
        textGeometry.translate(-textGeometry.boundingBox.max.x / 2, 0, 0);
      }

      scene.add(cube);
      scene.add(text);

      cube.position.set(x, y, z);
      text.position.set(
        x + textPosTranslate[0],
        y + textPosTranslate[1],
        z + textPosTranslate[2]
      );

      return [cube, text];
    }

    function hsl(h, s, l) {
      return new THREE.Color().setHSL(h, s, l);
    }

    let counter = 0;
    for (let i = 0; i < 5; i++) {
      let cubeface = [],
        textface = [];
      for (let j = 0; j < 5; j++) {
        let cubeedge = [],
          textedge = [];
        for (let k = 0; k < 5; k++) {
          let newblock = makeInstance(
            -3 + 1.5 * i,
            -3 + 1.5 * j,
            -3 + 1.5 * k,
            numbers[counter]
          );
          cubeedge.push(newblock[0]);
          textedge.push(newblock[1]);
          counter++;
        }
        cubeface.push(cubeedge);
        textface.push(textedge);
      }
      cubeinstance.push(cubeface);
      textinstance.push(textface);
    }
  });

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

const initialMap = {
  "[0,0,0]": [-3, -3, -3],
  "[0,0,1]": [-3, -3, -1.5],
  "[0,0,2]": [-3, -3, 0],
  "[0,0,3]": [-3, -3, 1.5],
  "[0,0,4]": [-3, -3, 3],
  "[0,1,0]": [-3, -1.5, -3],
  "[0,1,1]": [-3, -1.5, -1.5],
  "[0,1,2]": [-3, -1.5, 0],
  "[0,1,3]": [-3, -1.5, 1.5],
  "[0,1,4]": [-3, -1.5, 3],
  "[0,2,0]": [-3, 0, -3],
  "[0,2,1]": [-3, 0, -1.5],
  "[0,2,2]": [-3, 0, 0],
  "[0,2,3]": [-3, 0, 1.5],
  "[0,2,4]": [-3, 0, 3],
  "[0,3,0]": [-3, 1.5, -3],
  "[0,3,1]": [-3, 1.5, -1.5],
  "[0,3,2]": [-3, 1.5, 0],
  "[0,3,3]": [-3, 1.5, 1.5],
  "[0,3,4]": [-3, 1.5, 3],
  "[0,4,0]": [-3, 3, -3],
  "[0,4,1]": [-3, 3, -1.5],
  "[0,4,2]": [-3, 3, 0],
  "[0,4,3]": [-3, 3, 1.5],
  "[0,4,4]": [-3, 3, 3],
  "[1,0,0]": [-1.5, -3, -3],
  "[1,0,1]": [-1.5, -3, -1.5],
  "[1,0,2]": [-1.5, -3, 0],
  "[1,0,3]": [-1.5, -3, 1.5],
  "[1,0,4]": [-1.5, -3, 3],
  "[1,1,0]": [-1.5, -1.5, -3],
  "[1,1,1]": [-1.5, -1.5, -1.5],
  "[1,1,2]": [-1.5, -1.5, 0],
  "[1,1,3]": [-1.5, -1.5, 1.5],
  "[1,1,4]": [-1.5, -1.5, 3],
  "[1,2,0]": [-1.5, 0, -3],
  "[1,2,1]": [-1.5, 0, -1.5],
  "[1,2,2]": [-1.5, 0, 0],
  "[1,2,3]": [-1.5, 0, 1.5],
  "[1,2,4]": [-1.5, 0, 3],
  "[1,3,0]": [-1.5, 1.5, -3],
  "[1,3,1]": [-1.5, 1.5, -1.5],
  "[1,3,2]": [-1.5, 1.5, 0],
  "[1,3,3]": [-1.5, 1.5, 1.5],
  "[1,3,4]": [-1.5, 1.5, 3],
  "[1,4,0]": [-1.5, 3, -3],
  "[1,4,1]": [-1.5, 3, -1.5],
  "[1,4,2]": [-1.5, 3, 0],
  "[1,4,3]": [-1.5, 3, 1.5],
  "[1,4,4]": [-1.5, 3, 3],
  "[2,0,0]": [0, -3, -3],
  "[2,0,1]": [0, -3, -1.5],
  "[2,0,2]": [0, -3, 0],
  "[2,0,3]": [0, -3, 1.5],
  "[2,0,4]": [0, -3, 3],
  "[2,1,0]": [0, -1.5, -3],
  "[2,1,1]": [0, -1.5, -1.5],
  "[2,1,2]": [0, -1.5, 0],
  "[2,1,3]": [0, -1.5, 1.5],
  "[2,1,4]": [0, -1.5, 3],
  "[2,2,0]": [0, 0, -3],
  "[2,2,1]": [0, 0, -1.5],
  "[2,2,2]": [0, 0, 0],
  "[2,2,3]": [0, 0, 1.5],
  "[2,2,4]": [0, 0, 3],
  "[2,3,0]": [0, 1.5, -3],
  "[2,3,1]": [0, 1.5, -1.5],
  "[2,3,2]": [0, 1.5, 0],
  "[2,3,3]": [0, 1.5, 1.5],
  "[2,3,4]": [0, 1.5, 3],
  "[2,4,0]": [0, 3, -3],
  "[2,4,1]": [0, 3, -1.5],
  "[2,4,2]": [0, 3, 0],
  "[2,4,3]": [0, 3, 1.5],
  "[2,4,4]": [0, 3, 3],
  "[3,0,0]": [1.5, -3, -3],
  "[3,0,1]": [1.5, -3, -1.5],
  "[3,0,2]": [1.5, -3, 0],
  "[3,0,3]": [1.5, -3, 1.5],
  "[3,0,4]": [1.5, -3, 3],
  "[3,1,0]": [1.5, -1.5, -3],
  "[3,1,1]": [1.5, -1.5, -1.5],
  "[3,1,2]": [1.5, -1.5, 0],
  "[3,1,3]": [1.5, -1.5, 1.5],
  "[3,1,4]": [1.5, -1.5, 3],
  "[3,2,0]": [1.5, 0, -3],
  "[3,2,1]": [1.5, 0, -1.5],
  "[3,2,2]": [1.5, 0, 0],
  "[3,2,3]": [1.5, 0, 1.5],
  "[3,2,4]": [1.5, 0, 3],
  "[3,3,0]": [1.5, 1.5, -3],
  "[3,3,1]": [1.5, 1.5, -1.5],
  "[3,3,2]": [1.5, 1.5, 0],
  "[3,3,3]": [1.5, 1.5, 1.5],
  "[3,3,4]": [1.5, 1.5, 3],
  "[3,4,0]": [1.5, 3, -3],
  "[3,4,1]": [1.5, 3, -1.5],
  "[3,4,2]": [1.5, 3, 0],
  "[3,4,3]": [1.5, 3, 1.5],
  "[3,4,4]": [1.5, 3, 3],
  "[4,0,0]": [3, -3, -3],
  "[4,0,1]": [3, -3, -1.5],
  "[4,0,2]": [3, -3, 0],
  "[4,0,3]": [3, -3, 1.5],
  "[4,0,4]": [3, -3, 3],
  "[4,1,0]": [3, -1.5, -3],
  "[4,1,1]": [3, -1.5, -1.5],
  "[4,1,2]": [3, -1.5, 0],
  "[4,1,3]": [3, -1.5, 1.5],
  "[4,1,4]": [3, -1.5, 3],
  "[4,2,0]": [3, 0, -3],
  "[4,2,1]": [3, 0, -1.5],
  "[4,2,2]": [3, 0, 0],
  "[4,2,3]": [3, 0, 1.5],
  "[4,2,4]": [3, 0, 3],
  "[4,3,0]": [3, 1.5, -3],
  "[4,3,1]": [3, 1.5, -1.5],
  "[4,3,2]": [3, 1.5, 0],
  "[4,3,3]": [3, 1.5, 1.5],
  "[4,3,4]": [3, 1.5, 3],
  "[4,4,0]": [3, 3, -3],
  "[4,4,1]": [3, 3, -1.5],
  "[4,4,2]": [3, 3, 0],
  "[4,4,3]": [3, 3, 1.5],
  "[4,4,4]": [3, 3, 3],
};

const swapMap = {
  "[1,0,1]": [-1.5, -4.5, -1.5],
  "[1,4,1]": [-1.5, 4.5, -1.5],
  "[1,1,0]": [-1.5, -1.5, -4.5],
  "[1,1,4]": [-1.5, -1.5, 4.5],
  "[0,1,1]": [-4.5, -1.5, -1.5],
  "[4,1,1]": [4.5, -1.5, -1.5],
  "[2,0,1]": [0, -4.5, -1.5],
  "[2,4,1]": [0, 4.5, -1.5],
  "[2,1,0]": [0, -1.5, -4.5],
  "[2,1,4]": [0, -1.5, 4.5],
  "[0,2,1]": [-4.5, 0, -1.5],
  "[4,2,1]": [4.5, 0, 0],
  "[3,0,1]": [1.5, -4.5, -1.5],
  "[3,4,1]": [1.5, 4.5, -1.5],
  "[3,1,0]": [1.5, -1.5, -4.5],
  "[3,1,4]": [1.5, -1.5, 4.5],
  "[0,3,1]": [-4.5, 1.5, -1.5],
  "[4,3,1]": [4.5, 1.5, 1.5],
  "[1,0,2]": [-1.5, -4.5, 0],
  "[1,4,2]": [-1.5, 4.5, 0],
  "[1,2,0]": [-1.5, 0, -4.5],
  "[1,2,4]": [-1.5, 0, 4.5],
  "[0,1,2]": [-4.5, -1.5, 0],
  "[4,1,2]": [4.5, -1.5, -1.5],
  "[2,0,2]": [0, -4.5, 0],
  "[2,4,2]": [0, 4.5, 0],
  "[2,2,0]": [0, 0, -4.5],
  "[2,2,4]": [0, 0, 4.5],
  "[0,2,2]": [-4.5, 0, 0],
  "[4,2,2]": [4.5, 0, 0],
  "[3,0,2]": [1.5, -4.5, 0],
  "[3,4,2]": [1.5, 4.5, 0],
  "[3,2,0]": [1.5, 0, -4.5],
  "[3,2,4]": [1.5, 0, 4.5],
  "[0,3,2]": [-4.5, 1.5, 0],
  "[4,3,2]": [4.5, 1.5, 1.5],
  "[1,0,3]": [-1.5, -4.5, 1.5],
  "[1,4,3]": [-1.5, 4.5, 1.5],
  "[1,3,0]": [-1.5, 1.5, -4.5],
  "[1,3,4]": [-1.5, 1.5, 4.5],
  "[0,1,3]": [-4.5, -1.5, 1.5],
  "[4,1,3]": [4.5, -1.5, -1.5],
  "[2,0,3]": [0, -4.5, 1.5],
  "[2,4,3]": [0, 4.5, 1.5],
  "[2,3,0]": [0, 1.5, -4.5],
  "[2,3,4]": [0, 1.5, 4.5],
  "[0,2,3]": [-4.5, 0, 1.5],
  "[4,2,3]": [4.5, 0, 0],
  "[3,0,3]": [1.5, -4.5, 1.5],
  "[3,4,3]": [1.5, 4.5, 1.5],
  "[3,3,0]": [1.5, 1.5, -4.5],
  "[3,3,4]": [1.5, 1.5, 4.5],
  "[0,3,3]": [-4.5, 1.5, 1.5],
  "[4,3,3]": [4.5, 1.5, 1.5],
  "[1,0,0]": [-1.5, -4.5, -4.5],
  "[1,4,0]": [-1.5, 4.5, -4.5],
  "[0,1,0]": [-4.5, -1.5, -4.5],
  "[0,1,4]": [-4.5, -1.5, 4.5],
  "[0,0,1]": [-4.5, -4.5, -1.5],
  "[4,0,1]": [4.5, -4.5, -1.5],
  "[2,0,0]": [0, -4.5, -4.5],
  "[2,4,0]": [0, 4.5, -4.5],
  "[0,2,0]": [-4.5, 0, -4.5],
  "[0,2,4]": [-4.5, 0, 4.5],
  "[0,0,2]": [-4.5, -4.5, 0],
  "[4,0,2]": [4.5, -4.5, 0],
  "[3,0,0]": [1.5, -4.5, -4.5],
  "[3,4,0]": [1.5, 4.5, -4.5],
  "[0,3,0]": [-4.5, 1.5, -4.5],
  "[0,3,4]": [-4.5, 1.5, 4.5],
  "[0,0,3]": [-4.5, -4.5, 1.5],
  "[4,0,3]": [4.5, -4.5, 1.5],
  "[1,0,4]": [-1.5, -4.5, 4.5],
  "[1,4,4]": [-1.5, 4.5, 4.5],
  "[4,1,0]": [4.5, -1.5, -4.5],
  "[4,1,4]": [4.5, -1.5, 4.5],
  "[0,4,1]": [-4.5, 4.5, -1.5],
  "[4,4,1]": [4.5, 4.5, -1.5],
  "[2,0,4]": [0, -4.5, 4.5],
  "[2,4,4]": [0, 4.5, 4.5],
  "[4,2,0]": [4.5, 0, -4.5],
  "[4,2,4]": [4.5, 0, 4.5],
  "[0,4,2]": [-4.5, 4.5, 0],
  "[4,4,2]": [4.5, 4.5, 0],
  "[3,0,4]": [1.5, -4.5, 4.5],
  "[3,4,4]": [1.5, 4.5, 4.5],
  "[4,3,0]": [4.5, 1.5, -4.5],
  "[4,3,4]": [4.5, 1.5, 4.5],
  "[0,4,3]": [-4.5, 4.5, 1.5],
  "[4,4,3]": [4.5, 4.5, 1.5],
  "[0,0,0]": [-4.5, -4.5, -4.5],
  "[0,0,4]": [-4.5, -4.5, 4.5],
  "[0,4,0]": [-4.5, 4.5, -4.5],
  "[0,4,4]": [-4.5, 4.5, 4.5],
  "[4,0,0]": [4.5, -4.5, -4.5],
  "[4,0,4]": [4.5, -4.5, 4.5],
  "[4,4,0]": [4.5, 4.5, -4.5],
  "[4,4,4]": [4.5, 4.5, 4.5],
  "[1,1,1]": [-6, 4.5, 4.5],
  "[1,1,2]": [-6, 4.5, 3],
  "[1,1,3]": [-6, 4.5, 1.5],
  "[1,2,1]": [-6, 4.5, 0],
  "[1,2,2]": [-6, 4.5, -1.5],
  "[1,2,3]": [-6, 4.5, -3],
  "[1,3,1]": [-6, 4.5, -4.5],
  "[1,3,2]": [-6, 3, 4.5],
  "[1,3,3]": [-6, 3, 3],
  "[2,1,1]": [-6, 3, 1.5],
  "[2,1,2]": [-6, 3, 0],
  "[2,1,3]": [-6, 3, -1.5],
  "[2,2,1]": [-6, 3, -3],
  "[2,2,2]": [-6, 3, -4.5],
  "[2,2,3]": [-6, 1.5, 4.5],
  "[2,3,1]": [-6, 1.5, 3],
  "[2,3,2]": [-6, 1.5, 1.5],
  "[2,3,3]": [-6, 1.5, 0],
  "[3,1,1]": [-6, 1.5, -1.5],
  "[3,1,2]": [-6, 1.5, -3],
  "[3,1,3]": [-6, 1.5, -4.5],
  "[3,2,1]": [-6, 0, 4.5],
  "[3,2,2]": [-6, 0, 3],
  "[3,2,3]": [-6, 0, 1.5],
  "[3,3,1]": [-6, 0, 0],
  "[3,3,2]": [-6, 0, -1.5],
  "[3,3,3]": [-6, 0, -3],
};

function addMatrix(M1, M2) {
  return M1.map((r, i) => r + M2[i]);
}

async function translateCube(
  box1,
  box2,
  targetPosBox1,
  targetPosBox2,
  text1,
  text2,
  targetPosText1,
  targetPosText2,
  interval,
  timePartition
) {
  return new Promise((resolve) => {
    let counter = 1;
    box1.position.lerp(
      new THREE.Vector3(targetPosBox1[0], targetPosBox1[1], targetPosBox1[2]),
      counter / timePartition
    );
    box2.position.lerp(
      new THREE.Vector3(targetPosBox2[0], targetPosBox2[1], targetPosBox2[2]),
      counter / timePartition
    );

    text1.position.lerp(
      new THREE.Vector3(
        targetPosText1[0],
        targetPosText1[1],
        targetPosText1[2]
      ),
      counter / timePartition
    );
    text2.position.lerp(
      new THREE.Vector3(
        targetPosText2[0],
        targetPosText2[1],
        targetPosText2[2]
      ),
      counter / timePartition
    );
    render();
    let animateInterval = setInterval(() => {
      box1.position.lerp(
        new THREE.Vector3(targetPosBox1[0], targetPosBox1[1], targetPosBox1[2]),
        counter / timePartition
      );
      box2.position.lerp(
        new THREE.Vector3(targetPosBox2[0], targetPosBox2[1], targetPosBox2[2]),
        counter / timePartition
      );

      text1.position.lerp(
        new THREE.Vector3(
          targetPosText1[0],
          targetPosText1[1],
          targetPosText1[2]
        ),
        counter / timePartition
      );
      text2.position.lerp(
        new THREE.Vector3(
          targetPosText2[0],
          targetPosText2[1],
          targetPosText2[2]
        ),
        counter / timePartition
      );
      render();
      counter++;
      if (counter >= timePartition) {
        clearInterval(animateInterval);
        resolve();
      }
    }, interval / timePartition);
  });
}

async function moveCube(coord, pos, interval, timePartition) {
  let box1 = cubeinstance[coord[0][0]][coord[0][1]][coord[0][2]];
  let box2 = cubeinstance[coord[1][0]][coord[1][1]][coord[1][2]];
  let targetPosBox1 = pos[0];
  let targetPosBox2 = pos[1];

  let text1 = textinstance[coord[0][0]][coord[0][1]][coord[0][2]];
  let text2 = textinstance[coord[1][0]][coord[1][1]][coord[1][2]];
  let targetPosText1 = addMatrix(pos[0], textPosTranslate);
  let targetPosText2 = addMatrix(pos[1], textPosTranslate);
  return new Promise((resolve) => {
    translateCube(
      box1,
      box2,
      targetPosBox1,
      targetPosBox2,
      text1,
      text2,
      targetPosText1,
      targetPosText2,
      interval,
      timePartition
    ).then(() => {
      box1.position.set(pos[0][0], pos[0][1], pos[0][2]);
      box2.position.set(pos[1][0], pos[1][1], pos[1][2]);
      text1.position.set(
        targetPosText1[0],
        targetPosText1[1],
        targetPosText1[2]
      );
      text2.position.set(
        targetPosText2[0],
        targetPosText2[1],
        targetPosText2[2]
      );
      render();
      resolve();
    });
  });
}

async function swapCube(coord1, coord2, interval, timePartition) {
  return new Promise((resolve) => {
    let pos1 = swapMap[JSON.stringify(coord1)];
    let pos2 = swapMap[JSON.stringify(coord2)];
    moveCube([coord1, coord2], [pos1, pos2], interval, timePartition).then(
      () => {
        let pos1 = initialMap[JSON.stringify(coord1)];
        let pos2 = initialMap[JSON.stringify(coord2)];
        moveCube([coord1, coord2], [pos2, pos1], interval, timePartition).then(
          () => {
            [
              cubeinstance[coord1[0]][coord1[1]][coord1[2]],
              cubeinstance[coord2[0]][coord2[1]][coord2[2]],
            ] = [
              cubeinstance[coord2[0]][coord2[1]][coord2[2]],
              cubeinstance[coord1[0]][coord1[1]][coord1[2]],
            ];
            [
              textinstance[coord1[0]][coord1[1]][coord1[2]],
              textinstance[coord2[0]][coord2[1]][coord2[2]],
            ] = [
              textinstance[coord2[0]][coord2[1]][coord2[2]],
              textinstance[coord1[0]][coord1[1]][coord1[2]],
            ];
            resolve();
          }
        );
      }
    );
  });
}

/*
let swapLogs = [[[0,1,2],[3,1,1]],[[1,0,2],[1,3,2]],[[0,2,4],[2,2,2]],[[1,3,3],[4,4,4]],[[2,1,0],[2,4,2]],[[0,0,0],[0,0,3]],[[0,0,1],[1,4,3]],[[0,0,3],[1,1,2]],[[0,0,3],[0,1,3]],[[0,0,3],[0,0,4]],[[0,0,4],[1,4,0]],[[1,4,1],[3,4,0]],[[0,0,4],[4,4,2]],[[0,2,0],[2,0,3]],[[0,2,0],[3,2,0]],[[0,2,1],[1,1,3]],[[0,2,1],[4,0,0]],[[0,3,1],[4,1,4]],[[0,3,1],[2,4,1]],[[0,3,2],[1,2,4]],[[0,3,1],[1,2,2]],[[0,3,1],[2,0,4]],[[0,2,1],[2,3,1]],[[1,1,0],[4,1,0]],[[1,1,0],[4,3,2]],[[1,1,0],[3,0,1]],[[0,0,0],[4,4,3]],[[0,4,4],[2,0,0]],[[0,2,2],[4,3,1]],[[2,0,0],[2,0,3]],[[2,3,0],[4,0,4]],[[3,0,3],[4,4,3]],[[0,2,4],[2,2,3]],[[3,0,4],[3,4,1]],[[0,0,4],[3,3,4]],[[3,1,0],[3,3,2]],[[4,2,1],[4,3,0]],[[3,0,3],[4,1,1]]];

let swapIndex = 0;
async function playLoopCube() {
	await swapCube(swapLogs[swapIndex][0], swapLogs[swapIndex][1], 9, 9);
	swapIndex++;
}

let playIntervalCube;
q("#toggle-button").onclick = () => {
	if (q("#toggle-button").classList.contains("start")) {
		clearInterval(playIntervalCube);
	} else {
		playIntervalCube = setInterval(playLoopCube, 10 * 2);
	}
};
*/

generateCube([
  105, 60, 71, 25, 86, 19, 119, 11, 78, 108, 35, 89, 65, 58, 41, 114, 59, 95,
  33, 97, 49, 76, 61, 96, 73, 111, 37, 79, 32, 122, 8, 64, 42, 10, 5, 3, 43, 94,
  72, 26, 44, 124, 13, 53, 6, 100, 22, 15, 57, 87, 20, 82, 31, 63, 45, 70, 38,
  99, 47, 115, 85, 1, 23, 67, 121, 56, 18, 74, 123, 29, 12, 102, 16, 2, 125,
  107, 40, 120, 113, 117, 17, 27, 54, 110, 28, 81, 50, 109, 46, 14, 90, 92, 51,
  4, 24, 75, 77, 69, 68, 84, 88, 103, 80, 66, 39, 7, 118, 30, 34, 106, 83, 55,
  98, 9, 104, 21, 91, 36, 93, 116, 48, 101, 112, 52, 62,
]);

async function steepestSwap(interval = 10, timePartition = 10) {
  await swapCube([0, 1, 2], [3, 1, 1], interval, timePartition);
  await swapCube([1, 0, 2], [1, 3, 2], interval, timePartition);
  await swapCube([0, 2, 4], [2, 2, 2], interval, timePartition);
  await swapCube([1, 3, 3], [4, 4, 4], interval, timePartition);
  await swapCube([2, 1, 0], [2, 4, 2], interval, timePartition);
  await swapCube([0, 0, 0], [0, 0, 3], interval, timePartition);
  await swapCube([0, 0, 1], [1, 4, 3], interval, timePartition);
  await swapCube([0, 0, 3], [1, 1, 2], interval, timePartition);
  await swapCube([0, 0, 3], [0, 1, 3], interval, timePartition);
  await swapCube([0, 0, 3], [0, 0, 4], interval, timePartition);
  await swapCube([0, 0, 4], [1, 4, 0], interval, timePartition);
  await swapCube([1, 4, 1], [3, 4, 0], interval, timePartition);
  await swapCube([0, 0, 4], [4, 4, 2], interval, timePartition);
  await swapCube([0, 2, 0], [2, 0, 3], interval, timePartition);
  await swapCube([0, 2, 0], [3, 2, 0], interval, timePartition);
  await swapCube([0, 2, 1], [1, 1, 3], interval, timePartition);
  await swapCube([0, 2, 1], [4, 0, 0], interval, timePartition);
  await swapCube([0, 3, 1], [4, 1, 4], interval, timePartition);
  await swapCube([0, 3, 1], [2, 4, 1], interval, timePartition);
  await swapCube([0, 3, 2], [1, 2, 4], interval, timePartition);
  await swapCube([0, 3, 1], [1, 2, 2], interval, timePartition);
  await swapCube([0, 3, 1], [2, 0, 4], interval, timePartition);
  await swapCube([0, 2, 1], [2, 3, 1], interval, timePartition);
  await swapCube([1, 1, 0], [4, 1, 0], interval, timePartition);
  await swapCube([1, 1, 0], [4, 3, 2], interval, timePartition);
  await swapCube([1, 1, 0], [3, 0, 1], interval, timePartition);
  await swapCube([0, 0, 0], [4, 4, 3], interval, timePartition);
  await swapCube([0, 4, 4], [2, 0, 0], interval, timePartition);
  await swapCube([0, 2, 2], [4, 3, 1], interval, timePartition);
  await swapCube([2, 0, 0], [2, 0, 3], interval, timePartition);
  await swapCube([2, 3, 0], [4, 0, 4], interval, timePartition);
  await swapCube([3, 0, 3], [4, 4, 3], interval, timePartition);
  await swapCube([0, 2, 4], [2, 2, 3], interval, timePartition);
  await swapCube([3, 0, 4], [3, 4, 1], interval, timePartition);
  await swapCube([0, 0, 4], [3, 3, 4], interval, timePartition);
  await swapCube([3, 1, 0], [3, 3, 2], interval, timePartition);
  await swapCube([4, 2, 1], [4, 3, 0], interval, timePartition);
  await swapCube([3, 0, 3], [4, 1, 1], interval, timePartition);
}

async function sidewaysSwap(interval = 10, timePartition = 10) {
  await swapCube([0, 1, 2], [3, 1, 1], interval, timePartition);
  await swapCube([1, 0, 2], [1, 3, 2], interval, timePartition);
  await swapCube([0, 2, 4], [2, 2, 2], interval, timePartition);
  await swapCube([1, 3, 3], [4, 4, 4], interval, timePartition);
  await swapCube([2, 1, 0], [2, 4, 2], interval, timePartition);
  await swapCube([0, 0, 0], [0, 0, 3], interval, timePartition);
  await swapCube([0, 0, 1], [1, 4, 3], interval, timePartition);
  await swapCube([0, 0, 3], [1, 1, 2], interval, timePartition);
  await swapCube([0, 0, 3], [0, 1, 3], interval, timePartition);
  await swapCube([0, 0, 3], [0, 0, 4], interval, timePartition);
  await swapCube([0, 0, 4], [1, 4, 0], interval, timePartition);
  await swapCube([1, 4, 1], [3, 4, 0], interval, timePartition);
  await swapCube([0, 0, 4], [4, 4, 2], interval, timePartition);
  await swapCube([0, 2, 0], [2, 0, 3], interval, timePartition);
  await swapCube([0, 2, 0], [3, 2, 0], interval, timePartition);
  await swapCube([0, 2, 1], [1, 1, 3], interval, timePartition);
  await swapCube([0, 2, 1], [4, 0, 0], interval, timePartition);
  await swapCube([0, 3, 1], [4, 1, 4], interval, timePartition);
  await swapCube([0, 3, 1], [2, 4, 1], interval, timePartition);
  await swapCube([0, 3, 2], [1, 2, 4], interval, timePartition);
  await swapCube([0, 3, 1], [1, 2, 2], interval, timePartition);
  await swapCube([0, 3, 1], [2, 0, 4], interval, timePartition);
  await swapCube([0, 2, 1], [2, 3, 1], interval, timePartition);
  await swapCube([1, 1, 0], [4, 1, 0], interval, timePartition);
  await swapCube([1, 1, 0], [4, 3, 2], interval, timePartition);
  await swapCube([1, 1, 0], [3, 0, 1], interval, timePartition);
  await swapCube([0, 0, 0], [4, 4, 3], interval, timePartition);
  await swapCube([0, 4, 4], [2, 0, 0], interval, timePartition);
  await swapCube([0, 2, 2], [4, 3, 1], interval, timePartition);
  await swapCube([2, 0, 0], [2, 0, 3], interval, timePartition);
  await swapCube([2, 3, 0], [4, 0, 4], interval, timePartition);
  await swapCube([3, 0, 3], [4, 4, 3], interval, timePartition);
  await swapCube([0, 2, 4], [2, 2, 3], interval, timePartition);
  await swapCube([3, 0, 4], [3, 4, 1], interval, timePartition);
  await swapCube([0, 0, 4], [3, 3, 4], interval, timePartition);
  await swapCube([3, 1, 0], [3, 3, 2], interval, timePartition);
  await swapCube([4, 2, 1], [4, 3, 0], interval, timePartition);
  await swapCube([3, 0, 3], [4, 1, 1], interval, timePartition);
  await swapCube([0, 0, 2], [3, 0, 2], interval, timePartition);
  await swapCube([0, 0, 2], [3, 0, 2], interval, timePartition);
  await swapCube([0, 0, 2], [3, 0, 2], interval, timePartition);
  await swapCube([0, 0, 2], [3, 0, 2], interval, timePartition);
  await swapCube([0, 0, 2], [3, 0, 2], interval, timePartition);
  await swapCube([0, 0, 2], [3, 0, 2], interval, timePartition);
  await swapCube([0, 0, 2], [3, 0, 2], interval, timePartition);
  await swapCube([0, 0, 2], [3, 0, 2], interval, timePartition);
  await swapCube([0, 0, 2], [3, 0, 2], interval, timePartition);
  await swapCube([0, 0, 2], [3, 0, 2], interval, timePartition);
}

async function restartSwap(interval = 10, timePartition = 10) {
  await swapCube([0, 1, 2], [3, 1, 1], interval, timePartition);
  await swapCube([1, 0, 2], [1, 3, 2], interval, timePartition);
  await swapCube([0, 2, 4], [2, 2, 2], interval, timePartition);
  await swapCube([1, 3, 3], [4, 4, 4], interval, timePartition);
  await swapCube([2, 1, 0], [2, 4, 2], interval, timePartition);
  await swapCube([0, 0, 0], [0, 0, 3], interval, timePartition);
  await swapCube([0, 0, 1], [1, 4, 3], interval, timePartition);
  await swapCube([0, 0, 3], [1, 1, 2], interval, timePartition);
  await swapCube([0, 0, 3], [0, 1, 3], interval, timePartition);
  await swapCube([0, 0, 3], [0, 0, 4], interval, timePartition);
  await swapCube([0, 0, 4], [1, 4, 0], interval, timePartition);
  await swapCube([1, 4, 1], [3, 4, 0], interval, timePartition);
  await swapCube([0, 0, 4], [4, 4, 2], interval, timePartition);
  await swapCube([0, 2, 0], [2, 0, 3], interval, timePartition);
  await swapCube([0, 2, 0], [3, 2, 0], interval, timePartition);
  await swapCube([0, 2, 1], [1, 1, 3], interval, timePartition);
  await swapCube([0, 2, 1], [4, 0, 0], interval, timePartition);
  await swapCube([0, 3, 1], [4, 1, 4], interval, timePartition);
  await swapCube([0, 3, 1], [2, 4, 1], interval, timePartition);
  await swapCube([0, 3, 2], [1, 2, 4], interval, timePartition);
  await swapCube([0, 3, 1], [1, 2, 2], interval, timePartition);
  await swapCube([0, 3, 1], [2, 0, 4], interval, timePartition);
  await swapCube([0, 2, 1], [2, 3, 1], interval, timePartition);
  await swapCube([1, 1, 0], [4, 1, 0], interval, timePartition);
  await swapCube([1, 1, 0], [4, 3, 2], interval, timePartition);
  await swapCube([1, 1, 0], [3, 0, 1], interval, timePartition);
  await swapCube([0, 0, 0], [4, 4, 3], interval, timePartition);
  await swapCube([0, 4, 4], [2, 0, 0], interval, timePartition);
  await swapCube([0, 2, 2], [4, 3, 1], interval, timePartition);
  await swapCube([2, 0, 0], [2, 0, 3], interval, timePartition);
  await swapCube([2, 3, 0], [4, 0, 4], interval, timePartition);
  await swapCube([3, 0, 3], [4, 4, 3], interval, timePartition);
  await swapCube([0, 2, 4], [2, 2, 3], interval, timePartition);
  await swapCube([3, 0, 4], [3, 4, 1], interval, timePartition);
  await swapCube([0, 0, 4], [3, 3, 4], interval, timePartition);
  await swapCube([3, 1, 0], [3, 3, 2], interval, timePartition);
  await swapCube([4, 2, 1], [4, 3, 0], interval, timePartition);
  await swapCube([3, 0, 3], [4, 1, 1], interval, timePartition);
  await swapCube([0, 0, 2], [4, 3, 4], interval, timePartition);
  await swapCube([1, 1, 0], [2, 4, 4], interval, timePartition);
  await swapCube([0, 4, 3], [2, 4, 1], interval, timePartition);
  await swapCube([1, 3, 3], [3, 2, 3], interval, timePartition);
  await swapCube([3, 2, 2], [3, 4, 2], interval, timePartition);
  await swapCube([0, 0, 0], [0, 0, 1], interval, timePartition);
  await swapCube([0, 0, 1], [1, 0, 0], interval, timePartition);
  await swapCube([0, 0, 1], [3, 0, 3], interval, timePartition);
  await swapCube([0, 0, 1], [3, 4, 3], interval, timePartition);
  await swapCube([2, 0, 1], [4, 2, 0], interval, timePartition);
  await swapCube([0, 0, 3], [3, 2, 0], interval, timePartition);
  await swapCube([0, 0, 3], [1, 4, 4], interval, timePartition);
  await swapCube([0, 0, 3], [3, 3, 4], interval, timePartition);
  await swapCube([0, 1, 1], [1, 3, 0], interval, timePartition);
  await swapCube([0, 1, 1], [4, 2, 2], interval, timePartition);
  await swapCube([0, 1, 1], [0, 3, 1], interval, timePartition);
  await swapCube([0, 1, 1], [0, 2, 2], interval, timePartition);
  await swapCube([0, 1, 1], [1, 2, 2], interval, timePartition);
  await swapCube([0, 1, 1], [3, 2, 3], interval, timePartition);
  await swapCube([0, 1, 1], [0, 2, 1], interval, timePartition);
  await swapCube([0, 1, 1], [3, 1, 2], interval, timePartition);
  await swapCube([0, 1, 3], [4, 1, 4], interval, timePartition);
  await swapCube([0, 3, 4], [1, 3, 2], interval, timePartition);
  await swapCube([0, 4, 4], [3, 3, 0], interval, timePartition);
  await swapCube([1, 3, 2], [2, 1, 2], interval, timePartition);
  await swapCube([1, 0, 2], [3, 3, 0], interval, timePartition);
  await swapCube([2, 1, 3], [4, 3, 0], interval, timePartition);
  await swapCube([2, 4, 1], [4, 4, 1], interval, timePartition);
  await swapCube([2, 2, 3], [2, 4, 0], interval, timePartition);
  await swapCube([2, 4, 3], [4, 1, 2], interval, timePartition);
  await swapCube([0, 1, 4], [4, 3, 2], interval, timePartition);
  await swapCube([0, 1, 0], [3, 0, 0], interval, timePartition);
  await swapCube([0, 2, 1], [3, 2, 1], interval, timePartition);
  await swapCube([0, 3, 0], [3, 3, 3], interval, timePartition);
  await swapCube([1, 3, 1], [2, 0, 4], interval, timePartition);
  await swapCube([3, 0, 3], [3, 1, 0], interval, timePartition);
  await swapCube([2, 1, 4], [3, 0, 4], interval, timePartition);
  await swapCube([0, 0, 1], [0, 2, 1], interval, timePartition);
  await swapCube([0, 0, 1], [1, 4, 3], interval, timePartition);
  await swapCube([0, 0, 2], [0, 4, 1], interval, timePartition);
  await swapCube([0, 0, 2], [4, 2, 2], interval, timePartition);
  await swapCube([0, 0, 3], [2, 3, 1], interval, timePartition);
  await swapCube([0, 0, 4], [2, 3, 2], interval, timePartition);
  await swapCube([0, 0, 4], [4, 2, 4], interval, timePartition);
  await swapCube([0, 2, 0], [0, 2, 1], interval, timePartition);
  await swapCube([0, 3, 0], [0, 4, 4], interval, timePartition);
  await swapCube([0, 3, 1], [2, 3, 0], interval, timePartition);
  await swapCube([0, 3, 1], [1, 1, 2], interval, timePartition);
  await swapCube([0, 3, 1], [1, 2, 4], interval, timePartition);
  await swapCube([0, 3, 1], [2, 0, 1], interval, timePartition);
  await swapCube([0, 1, 3], [2, 1, 3], interval, timePartition);
  await swapCube([0, 4, 1], [4, 4, 4], interval, timePartition);
  await swapCube([1, 3, 0], [2, 3, 1], interval, timePartition);
  await swapCube([1, 3, 4], [3, 4, 4], interval, timePartition);
  await swapCube([1, 4, 3], [2, 2, 3], interval, timePartition);
  await swapCube([2, 1, 1], [2, 4, 3], interval, timePartition);
  await swapCube([2, 3, 1], [3, 1, 4], interval, timePartition);
  await swapCube([2, 4, 1], [2, 4, 2], interval, timePartition);
  await swapCube([3, 1, 2], [4, 3, 3], interval, timePartition);
  await swapCube([0, 0, 3], [1, 4, 0], interval, timePartition);
  await swapCube([0, 2, 0], [0, 4, 4], interval, timePartition);
  await swapCube([0, 0, 0], [2, 0, 1], interval, timePartition);
  await swapCube([0, 0, 1], [0, 2, 1], interval, timePartition);
  await swapCube([0, 0, 1], [0, 1, 4], interval, timePartition);
  await swapCube([0, 0, 1], [1, 1, 0], interval, timePartition);
  await swapCube([0, 0, 1], [0, 4, 3], interval, timePartition);
  await swapCube([0, 4, 2], [1, 3, 3], interval, timePartition);
  await swapCube([0, 0, 1], [1, 0, 2], interval, timePartition);
  await swapCube([0, 0, 1], [4, 3, 3], interval, timePartition);
  await swapCube([0, 0, 4], [0, 2, 0], interval, timePartition);
  await swapCube([0, 2, 0], [3, 1, 3], interval, timePartition);
  await swapCube([0, 2, 0], [2, 1, 1], interval, timePartition);
  await swapCube([0, 2, 3], [4, 3, 0], interval, timePartition);
  await swapCube([0, 2, 0], [4, 2, 4], interval, timePartition);
  await swapCube([0, 3, 3], [4, 1, 4], interval, timePartition);
  await swapCube([1, 0, 0], [2, 0, 0], interval, timePartition);
  await swapCube([1, 0, 3], [3, 4, 2], interval, timePartition);
  await swapCube([1, 1, 1], [3, 0, 4], interval, timePartition);
  await swapCube([1, 1, 1], [2, 3, 0], interval, timePartition);
  await swapCube([1, 1, 1], [2, 2, 4], interval, timePartition);
  await swapCube([1, 1, 1], [3, 2, 2], interval, timePartition);
  await swapCube([1, 2, 0], [2, 1, 0], interval, timePartition);
  await swapCube([1, 3, 0], [3, 2, 0], interval, timePartition);
  await swapCube([1, 3, 3], [4, 0, 1], interval, timePartition);
  await swapCube([1, 1, 1], [4, 0, 4], interval, timePartition);
  await swapCube([1, 0, 4], [1, 4, 0], interval, timePartition);
  await swapCube([1, 1, 4], [4, 2, 4], interval, timePartition);
  await swapCube([1, 2, 0], [4, 3, 3], interval, timePartition);
  await swapCube([1, 3, 4], [2, 1, 2], interval, timePartition);
  await swapCube([1, 4, 1], [1, 4, 2], interval, timePartition);
  await swapCube([2, 1, 2], [3, 0, 1], interval, timePartition);
  await swapCube([3, 0, 1], [4, 2, 0], interval, timePartition);
  await swapCube([3, 2, 0], [3, 3, 2], interval, timePartition);
  await swapCube([2, 1, 3], [4, 4, 2], interval, timePartition);
  await swapCube([2, 4, 3], [3, 4, 3], interval, timePartition);
  await swapCube([3, 4, 2], [4, 4, 1], interval, timePartition);
  await swapCube([0, 3, 2], [2, 4, 3], interval, timePartition);
  await swapCube([0, 3, 3], [2, 1, 0], interval, timePartition);
  await swapCube([1, 1, 1], [1, 3, 3], interval, timePartition);
  await swapCube([0, 4, 0], [3, 3, 1], interval, timePartition);
  await swapCube([0, 4, 2], [1, 2, 2], interval, timePartition);
  await swapCube([0, 0, 0], [0, 1, 3], interval, timePartition);
  await swapCube([0, 0, 2], [0, 1, 4], interval, timePartition);
  await swapCube([0, 0, 3], [0, 2, 4], interval, timePartition);
  await swapCube([0, 0, 3], [2, 2, 4], interval, timePartition);
  await swapCube([0, 0, 4], [0, 3, 1], interval, timePartition);
  await swapCube([0, 1, 2], [3, 4, 1], interval, timePartition);
  await swapCube([0, 1, 4], [3, 4, 0], interval, timePartition);
  await swapCube([0, 2, 2], [1, 0, 0], interval, timePartition);
  await swapCube([0, 2, 2], [3, 4, 2], interval, timePartition);
  await swapCube([0, 2, 4], [1, 0, 3], interval, timePartition);
  await swapCube([0, 2, 4], [3, 2, 1], interval, timePartition);
  await swapCube([0, 3, 2], [2, 0, 1], interval, timePartition);
  await swapCube([1, 0, 3], [1, 3, 4], interval, timePartition);
  await swapCube([1, 2, 4], [4, 2, 2], interval, timePartition);
  await swapCube([1, 2, 0], [3, 2, 2], interval, timePartition);
  await swapCube([1, 3, 1], [2, 0, 0], interval, timePartition);
  await swapCube([1, 4, 0], [3, 1, 1], interval, timePartition);
  await swapCube([1, 4, 2], [3, 3, 4], interval, timePartition);
  await swapCube([2, 0, 0], [4, 0, 1], interval, timePartition);
  await swapCube([2, 0, 0], [3, 0, 4], interval, timePartition);
  await swapCube([2, 0, 1], [2, 2, 3], interval, timePartition);
  await swapCube([2, 1, 0], [2, 1, 3], interval, timePartition);
  await swapCube([2, 2, 0], [4, 0, 0], interval, timePartition);
  await swapCube([2, 2, 1], [3, 3, 1], interval, timePartition);
  await swapCube([2, 3, 1], [3, 4, 4], interval, timePartition);
  await swapCube([2, 3, 0], [3, 1, 1], interval, timePartition);
  await swapCube([3, 1, 3], [3, 2, 3], interval, timePartition);
  await swapCube([2, 2, 3], [3, 3, 2], interval, timePartition);
  await swapCube([3, 3, 0], [4, 1, 2], interval, timePartition);
  await swapCube([0, 0, 0], [2, 0, 2], interval, timePartition);
  await swapCube([0, 2, 1], [0, 3, 4], interval, timePartition);
  await swapCube([0, 1, 1], [1, 2, 2], interval, timePartition);
  await swapCube([1, 1, 2], [4, 2, 0], interval, timePartition);
  await swapCube([1, 2, 4], [4, 1, 4], interval, timePartition);
  await swapCube([0, 4, 0], [4, 1, 3], interval, timePartition);
  await swapCube([1, 3, 1], [2, 1, 1], interval, timePartition);
  await swapCube([0, 0, 3], [2, 4, 4], interval, timePartition);
  await swapCube([2, 2, 3], [4, 3, 3], interval, timePartition);
  await swapCube([0, 1, 3], [0, 4, 2], interval, timePartition);
  await swapCube([0, 1, 2], [3, 1, 2], interval, timePartition);
  await swapCube([0, 3, 2], [0, 4, 4], interval, timePartition);
  await swapCube([0, 4, 4], [4, 0, 4], interval, timePartition);
  await swapCube([3, 4, 4], [4, 4, 4], interval, timePartition);
  await swapCube([0, 3, 3], [3, 2, 0], interval, timePartition);
  await swapCube([0, 3, 4], [2, 0, 1], interval, timePartition);
  await swapCube([0, 4, 3], [2, 2, 4], interval, timePartition);
  await swapCube([1, 1, 0], [2, 1, 3], interval, timePartition);
  await swapCube([1, 2, 0], [4, 4, 1], interval, timePartition);
  await swapCube([2, 0, 1], [2, 2, 2], interval, timePartition);
  await swapCube([0, 2, 3], [2, 2, 0], interval, timePartition);
  await swapCube([0, 2, 4], [1, 0, 1], interval, timePartition);
  await swapCube([0, 3, 0], [3, 2, 0], interval, timePartition);
  await swapCube([0, 3, 0], [4, 2, 2], interval, timePartition);
  await swapCube([1, 4, 1], [2, 1, 1], interval, timePartition);
  await swapCube([2, 3, 0], [3, 0, 3], interval, timePartition);
  await swapCube([3, 2, 2], [3, 4, 3], interval, timePartition);
  await swapCube([3, 1, 2], [3, 1, 3], interval, timePartition);
  await swapCube([0, 1, 4], [3, 1, 1], interval, timePartition);
  await swapCube([0, 2, 3], [0, 4, 2], interval, timePartition);
  await swapCube([0, 1, 3], [1, 0, 4], interval, timePartition);
  await swapCube([1, 1, 2], [3, 0, 1], interval, timePartition);
  await swapCube([2, 1, 4], [4, 3, 2], interval, timePartition);
  await swapCube([3, 2, 4], [4, 0, 3], interval, timePartition);
  await swapCube([0, 0, 0], [1, 2, 2], interval, timePartition);
  await swapCube([1, 4, 1], [3, 3, 0], interval, timePartition);
  await swapCube([1, 4, 3], [2, 0, 0], interval, timePartition);
  await swapCube([1, 0, 4], [1, 1, 3], interval, timePartition);
  await swapCube([0, 0, 1], [0, 0, 2], interval, timePartition);
  await swapCube([0, 0, 1], [0, 2, 0], interval, timePartition);
  await swapCube([0, 0, 4], [4, 0, 2], interval, timePartition);
  await swapCube([0, 0, 4], [4, 2, 2], interval, timePartition);
  await swapCube([0, 2, 0], [2, 0, 2], interval, timePartition);
  await swapCube([0, 2, 0], [1, 4, 4], interval, timePartition);
  await swapCube([0, 2, 0], [4, 3, 4], interval, timePartition);
  await swapCube([0, 2, 0], [3, 2, 0], interval, timePartition);
  await swapCube([0, 3, 4], [1, 0, 4], interval, timePartition);
  await swapCube([1, 0, 4], [1, 4, 1], interval, timePartition);
  await swapCube([1, 3, 2], [3, 4, 2], interval, timePartition);
  await swapCube([1, 3, 4], [2, 1, 1], interval, timePartition);
  await swapCube([1, 4, 0], [2, 4, 3], interval, timePartition);
  await swapCube([1, 4, 0], [4, 4, 3], interval, timePartition);
  await swapCube([1, 4, 0], [4, 3, 4], interval, timePartition);
  await swapCube([1, 4, 0], [4, 4, 2], interval, timePartition);
  await swapCube([2, 1, 1], [3, 1, 3], interval, timePartition);
  await swapCube([2, 3, 1], [3, 1, 2], interval, timePartition);
  await swapCube([2, 3, 2], [2, 3, 3], interval, timePartition);
  await swapCube([2, 1, 2], [4, 1, 0], interval, timePartition);
  await swapCube([2, 1, 1], [3, 4, 2], interval, timePartition);
  await swapCube([1, 0, 2], [4, 1, 1], interval, timePartition);
  await swapCube([3, 0, 0], [4, 2, 4], interval, timePartition);
  await swapCube([0, 0, 0], [0, 0, 3], interval, timePartition);
  await swapCube([0, 0, 1], [1, 2, 2], interval, timePartition);
  await swapCube([0, 0, 1], [0, 3, 4], interval, timePartition);
  await swapCube([0, 0, 1], [0, 1, 3], interval, timePartition);
  await swapCube([0, 0, 1], [1, 0, 0], interval, timePartition);
  await swapCube([0, 0, 1], [3, 0, 2], interval, timePartition);
  await swapCube([0, 0, 3], [1, 3, 4], interval, timePartition);
  await swapCube([0, 4, 4], [2, 2, 1], interval, timePartition);
  await swapCube([0, 0, 4], [1, 1, 4], interval, timePartition);
  await swapCube([1, 1, 4], [1, 3, 3], interval, timePartition);
  await swapCube([0, 2, 1], [4, 4, 2], interval, timePartition);
  await swapCube([0, 2, 2], [3, 0, 1], interval, timePartition);
  await swapCube([0, 4, 0], [2, 4, 4], interval, timePartition);
  await swapCube([0, 2, 3], [3, 3, 0], interval, timePartition);
  await swapCube([1, 0, 0], [1, 4, 0], interval, timePartition);
  await swapCube([1, 0, 4], [2, 0, 4], interval, timePartition);
  await swapCube([1, 2, 1], [4, 2, 4], interval, timePartition);
  await swapCube([1, 2, 3], [2, 1, 2], interval, timePartition);
  await swapCube([0, 4, 2], [4, 2, 0], interval, timePartition);
  await swapCube([1, 2, 4], [2, 1, 4], interval, timePartition);
  await swapCube([1, 2, 4], [2, 0, 1], interval, timePartition);
  await swapCube([1, 4, 3], [2, 3, 1], interval, timePartition);
  await swapCube([2, 1, 0], [4, 1, 2], interval, timePartition);
  await swapCube([2, 1, 2], [2, 3, 0], interval, timePartition);
  await swapCube([2, 2, 0], [4, 1, 3], interval, timePartition);
  await swapCube([2, 2, 0], [4, 2, 4], interval, timePartition);
  await swapCube([2, 3, 0], [4, 4, 3], interval, timePartition);
  await swapCube([2, 3, 3], [4, 2, 2], interval, timePartition);
  await swapCube([2, 4, 1], [3, 4, 2], interval, timePartition);
  await swapCube([2, 4, 1], [3, 2, 4], interval, timePartition);
  await swapCube([3, 0, 0], [3, 2, 2], interval, timePartition);
  await swapCube([0, 1, 1], [1, 0, 1], interval, timePartition);
  await swapCube([2, 4, 2], [3, 1, 2], interval, timePartition);
  await swapCube([0, 0, 0], [1, 3, 0], interval, timePartition);
  await swapCube([0, 0, 0], [0, 2, 4], interval, timePartition);
  await swapCube([0, 0, 4], [1, 0, 3], interval, timePartition);
  await swapCube([1, 1, 4], [2, 2, 2], interval, timePartition);
  await swapCube([0, 3, 0], [0, 3, 2], interval, timePartition);
  await swapCube([0, 3, 0], [0, 3, 3], interval, timePartition);
  await swapCube([0, 3, 1], [3, 3, 2], interval, timePartition);
  await swapCube([0, 3, 3], [2, 0, 2], interval, timePartition);
  await swapCube([0, 3, 3], [2, 4, 1], interval, timePartition);
  await swapCube([4, 1, 4], [4, 3, 3], interval, timePartition);
  await swapCube([0, 3, 4], [2, 2, 1], interval, timePartition);
  await swapCube([0, 3, 1], [4, 3, 1], interval, timePartition);
  await swapCube([0, 0, 1], [3, 3, 4], interval, timePartition);
  await swapCube([0, 4, 0], [0, 4, 4], interval, timePartition);
  await swapCube([2, 2, 0], [2, 4, 0], interval, timePartition);
  await swapCube([0, 4, 3], [1, 1, 2], interval, timePartition);
  await swapCube([0, 4, 3], [3, 4, 4], interval, timePartition);
  await swapCube([1, 0, 0], [1, 0, 3], interval, timePartition);
  await swapCube([1, 0, 0], [1, 1, 4], interval, timePartition);
  await swapCube([1, 1, 0], [2, 2, 4], interval, timePartition);
  await swapCube([1, 1, 3], [2, 1, 2], interval, timePartition);
  await swapCube([1, 1, 3], [3, 2, 4], interval, timePartition);
  await swapCube([2, 1, 1], [4, 3, 2], interval, timePartition);
  await swapCube([2, 2, 3], [4, 1, 0], interval, timePartition);
  await swapCube([0, 1, 0], [2, 2, 4], interval, timePartition);
  await swapCube([3, 0, 0], [4, 2, 1], interval, timePartition);
  await swapCube([3, 0, 2], [4, 2, 0], interval, timePartition);
  await swapCube([0, 1, 0], [3, 2, 0], interval, timePartition);
  await swapCube([0, 1, 0], [3, 0, 3], interval, timePartition);
  await swapCube([4, 1, 1], [4, 4, 0], interval, timePartition);
  await swapCube([4, 2, 3], [4, 4, 3], interval, timePartition);
  await swapCube([0, 3, 0], [3, 2, 0], interval, timePartition);
  await swapCube([0, 3, 1], [2, 3, 4], interval, timePartition);
  await swapCube([1, 2, 2], [2, 2, 2], interval, timePartition);
  await swapCube([3, 3, 2], [3, 4, 4], interval, timePartition);
  await swapCube([3, 4, 3], [4, 3, 2], interval, timePartition);
  await swapCube([0, 0, 0], [1, 4, 0], interval, timePartition);
  await swapCube([0, 0, 1], [1, 3, 1], interval, timePartition);
  await swapCube([0, 0, 1], [0, 1, 4], interval, timePartition);
  await swapCube([0, 0, 1], [1, 0, 4], interval, timePartition);
  await swapCube([0, 0, 1], [3, 1, 2], interval, timePartition);
  await swapCube([0, 0, 3], [0, 1, 0], interval, timePartition);
  await swapCube([0, 0, 3], [0, 4, 4], interval, timePartition);
  await swapCube([0, 0, 3], [1, 0, 0], interval, timePartition);
  await swapCube([0, 1, 1], [3, 1, 3], interval, timePartition);
  await swapCube([0, 2, 1], [4, 0, 4], interval, timePartition);
  await swapCube([0, 2, 4], [2, 3, 1], interval, timePartition);
  await swapCube([0, 3, 2], [4, 2, 2], interval, timePartition);
  await swapCube([0, 3, 4], [2, 0, 3], interval, timePartition);
  await swapCube([0, 4, 1], [1, 2, 2], interval, timePartition);
  await swapCube([0, 4, 4], [2, 0, 1], interval, timePartition);
  await swapCube([0, 4, 1], [3, 0, 1], interval, timePartition);
  await swapCube([1, 1, 0], [4, 2, 1], interval, timePartition);
  await swapCube([1, 1, 2], [3, 1, 3], interval, timePartition);
  await swapCube([1, 1, 2], [2, 0, 0], interval, timePartition);
  await swapCube([1, 1, 3], [4, 1, 2], interval, timePartition);
  await swapCube([1, 2, 1], [4, 2, 4], interval, timePartition);
  await swapCube([1, 2, 3], [3, 0, 3], interval, timePartition);
  await swapCube([2, 0, 0], [4, 0, 0], interval, timePartition);
  await swapCube([2, 1, 1], [2, 3, 0], interval, timePartition);
  await swapCube([3, 0, 1], [4, 1, 3], interval, timePartition);
  await swapCube([3, 0, 2], [4, 1, 3], interval, timePartition);
  await swapCube([2, 1, 3], [3, 0, 3], interval, timePartition);
  await swapCube([3, 3, 2], [4, 1, 2], interval, timePartition);
  await swapCube([0, 3, 0], [1, 0, 3], interval, timePartition);
  await swapCube([0, 4, 4], [2, 0, 4], interval, timePartition);
  await swapCube([1, 2, 2], [4, 0, 3], interval, timePartition);
  await swapCube([2, 0, 1], [2, 3, 4], interval, timePartition);
  await swapCube([3, 0, 4], [3, 1, 0], interval, timePartition);
  await swapCube([0, 0, 0], [0, 4, 0], interval, timePartition);
  await swapCube([0, 0, 2], [0, 3, 3], interval, timePartition);
  await swapCube([0, 0, 2], [1, 1, 4], interval, timePartition);
  await swapCube([0, 0, 2], [3, 1, 1], interval, timePartition);
  await swapCube([0, 0, 3], [3, 2, 4], interval, timePartition);
  await swapCube([0, 0, 3], [4, 1, 2], interval, timePartition);
  await swapCube([0, 0, 3], [0, 1, 4], interval, timePartition);
  await swapCube([1, 0, 3], [4, 3, 1], interval, timePartition);
  await swapCube([4, 1, 1], [4, 2, 2], interval, timePartition);
  await swapCube([0, 1, 1], [0, 3, 1], interval, timePartition);
  await swapCube([0, 2, 1], [2, 3, 4], interval, timePartition);
  await swapCube([0, 2, 1], [4, 0, 0], interval, timePartition);
  await swapCube([0, 2, 2], [0, 3, 4], interval, timePartition);
  await swapCube([0, 4, 1], [3, 4, 2], interval, timePartition);
  await swapCube([0, 4, 2], [4, 2, 1], interval, timePartition);
  await swapCube([1, 0, 0], [1, 4, 2], interval, timePartition);
  await swapCube([1, 2, 1], [3, 3, 4], interval, timePartition);
  await swapCube([0, 3, 4], [3, 1, 1], interval, timePartition);
  await swapCube([0, 3, 1], [4, 2, 0], interval, timePartition);
  await swapCube([1, 2, 1], [2, 1, 3], interval, timePartition);
  await swapCube([1, 2, 4], [4, 4, 3], interval, timePartition);
  await swapCube([1, 4, 1], [2, 4, 2], interval, timePartition);
  await swapCube([2, 1, 0], [4, 3, 0], interval, timePartition);
  await swapCube([2, 1, 2], [3, 1, 1], interval, timePartition);
  await swapCube([3, 1, 0], [3, 3, 0], interval, timePartition);
}

async function stochasticSwap(interval = 10, timePartition = 10) {
  await swapCube([0, 1, 1], [1, 3, 0], interval, timePartition);
  await swapCube([3, 0, 1], [3, 4, 2], interval, timePartition);
  await swapCube([4, 3, 4], [4, 4, 0], interval, timePartition);
  await swapCube([1, 0, 3], [2, 3, 3], interval, timePartition);
  await swapCube([4, 3, 2], [4, 4, 4], interval, timePartition);
  await swapCube([0, 3, 3], [3, 1, 4], interval, timePartition);
  await swapCube([0, 4, 2], [3, 0, 2], interval, timePartition);
  await swapCube([1, 4, 1], [2, 3, 0], interval, timePartition);
  await swapCube([2, 4, 2], [4, 1, 4], interval, timePartition);
  await swapCube([2, 2, 0], [4, 0, 1], interval, timePartition);
  await swapCube([0, 1, 0], [2, 4, 0], interval, timePartition);
  await swapCube([1, 1, 2], [4, 0, 1], interval, timePartition);
  await swapCube([3, 0, 0], [3, 1, 4], interval, timePartition);
  await swapCube([3, 2, 3], [3, 4, 0], interval, timePartition);
  await swapCube([4, 1, 3], [4, 4, 2], interval, timePartition);
  await swapCube([3, 0, 3], [4, 2, 4], interval, timePartition);
  await swapCube([1, 1, 1], [4, 2, 1], interval, timePartition);
  await swapCube([2, 1, 2], [3, 2, 0], interval, timePartition);
  await swapCube([1, 1, 4], [2, 4, 4], interval, timePartition);
  await swapCube([3, 2, 3], [4, 4, 1], interval, timePartition);
  await swapCube([2, 1, 1], [2, 4, 3], interval, timePartition);
  await swapCube([0, 0, 4], [3, 3, 3], interval, timePartition);
  await swapCube([2, 4, 3], [3, 0, 3], interval, timePartition);
  await swapCube([3, 2, 2], [3, 3, 2], interval, timePartition);
  await swapCube([1, 0, 2], [4, 1, 4], interval, timePartition);
  await swapCube([1, 0, 2], [3, 0, 4], interval, timePartition);
  await swapCube([0, 2, 1], [0, 3, 4], interval, timePartition);
  await swapCube([1, 0, 2], [1, 1, 2], interval, timePartition);
}

async function simmulatedSwap(interval = 10, timePartition = 10) {
  await swapCube([2, 3, 3], [2, 4, 0], interval, timePartition);
  await swapCube([1, 1, 2], [4, 2, 1], interval, timePartition);
  await swapCube([1, 2, 4], [3, 0, 3], interval, timePartition);
  await swapCube([3, 1, 3], [4, 0, 0], interval, timePartition);
  await swapCube([2, 3, 2], [4, 0, 0], interval, timePartition);
  await swapCube([2, 4, 2], [3, 4, 4], interval, timePartition);
  await swapCube([1, 4, 3], [2, 1, 3], interval, timePartition);
  await swapCube([1, 1, 2], [3, 1, 3], interval, timePartition);
  await swapCube([2, 3, 1], [3, 0, 3], interval, timePartition);
  await swapCube([4, 3, 1], [4, 4, 0], interval, timePartition);
  await swapCube([4, 4, 2], [4, 4, 3], interval, timePartition);
  await swapCube([0, 3, 0], [0, 4, 4], interval, timePartition);
  await swapCube([2, 3, 2], [3, 0, 2], interval, timePartition);
  await swapCube([3, 1, 1], [3, 3, 2], interval, timePartition);
  await swapCube([2, 4, 4], [4, 1, 1], interval, timePartition);
  await swapCube([0, 0, 0], [3, 4, 2], interval, timePartition);
  await swapCube([4, 2, 1], [4, 3, 1], interval, timePartition);
  await swapCube([1, 0, 2], [2, 2, 1], interval, timePartition);
  await swapCube([1, 3, 0], [1, 4, 2], interval, timePartition);
  await swapCube([2, 0, 4], [2, 1, 4], interval, timePartition);
  await swapCube([1, 1, 3], [1, 4, 0], interval, timePartition);
  await swapCube([3, 1, 1], [4, 0, 0], interval, timePartition);
  await swapCube([3, 0, 0], [4, 3, 3], interval, timePartition);
  await swapCube([3, 0, 1], [4, 2, 3], interval, timePartition);
  await swapCube([2, 1, 2], [2, 2, 2], interval, timePartition);
  await swapCube([3, 3, 0], [4, 4, 1], interval, timePartition);
  await swapCube([2, 4, 2], [4, 2, 1], interval, timePartition);
  await swapCube([0, 1, 3], [1, 3, 1], interval, timePartition);
  await swapCube([1, 1, 2], [2, 2, 0], interval, timePartition);
  await swapCube([0, 1, 1], [0, 3, 4], interval, timePartition);
  await swapCube([2, 0, 3], [3, 0, 3], interval, timePartition);
  await swapCube([3, 2, 0], [3, 2, 4], interval, timePartition);
  await swapCube([3, 1, 0], [4, 1, 0], interval, timePartition);
  await swapCube([4, 1, 0], [4, 2, 4], interval, timePartition);
  await swapCube([2, 1, 3], [3, 2, 0], interval, timePartition);
  await swapCube([4, 0, 4], [4, 3, 4], interval, timePartition);
  await swapCube([0, 4, 1], [1, 2, 3], interval, timePartition);
  await swapCube([2, 4, 1], [2, 4, 4], interval, timePartition);
  await swapCube([1, 4, 2], [4, 2, 2], interval, timePartition);
  await swapCube([2, 3, 2], [3, 3, 4], interval, timePartition);
  await swapCube([2, 3, 2], [4, 3, 0], interval, timePartition);
  await swapCube([1, 1, 1], [4, 3, 2], interval, timePartition);
  await swapCube([0, 3, 3], [1, 1, 3], interval, timePartition);
  await swapCube([1, 3, 1], [1, 4, 2], interval, timePartition);
  await swapCube([2, 0, 2], [3, 1, 0], interval, timePartition);
  await swapCube([0, 2, 0], [1, 3, 2], interval, timePartition);
  await swapCube([1, 0, 4], [3, 1, 3], interval, timePartition);
  await swapCube([3, 1, 1], [4, 4, 4], interval, timePartition);
  await swapCube([4, 2, 3], [4, 2, 4], interval, timePartition);
  await swapCube([2, 4, 4], [3, 4, 2], interval, timePartition);
  await swapCube([3, 3, 3], [4, 3, 0], interval, timePartition);
  await swapCube([2, 3, 2], [4, 0, 3], interval, timePartition);
  await swapCube([2, 0, 1], [2, 1, 2], interval, timePartition);
  await swapCube([3, 3, 3], [4, 0, 1], interval, timePartition);
  await swapCube([3, 2, 3], [4, 0, 2], interval, timePartition);
  await swapCube([0, 2, 2], [1, 1, 1], interval, timePartition);
  await swapCube([3, 3, 1], [4, 3, 4], interval, timePartition);
  await swapCube([2, 3, 4], [3, 2, 3], interval, timePartition);
  await swapCube([4, 4, 1], [4, 4, 2], interval, timePartition);
  await swapCube([4, 2, 3], [4, 4, 3], interval, timePartition);
  await swapCube([4, 4, 0], [4, 4, 1], interval, timePartition);
  await swapCube([2, 4, 0], [3, 1, 4], interval, timePartition);
  await swapCube([1, 3, 3], [3, 2, 0], interval, timePartition);
  await swapCube([1, 3, 2], [1, 4, 4], interval, timePartition);
  await swapCube([3, 4, 4], [4, 2, 0], interval, timePartition);
  await swapCube([0, 3, 2], [4, 2, 2], interval, timePartition);
  await swapCube([4, 0, 1], [4, 3, 4], interval, timePartition);
  await swapCube([0, 2, 3], [1, 4, 1], interval, timePartition);
  await swapCube([0, 3, 2], [1, 0, 4], interval, timePartition);
  await swapCube([1, 0, 2], [2, 4, 2], interval, timePartition);
  await swapCube([3, 3, 2], [4, 2, 2], interval, timePartition);
  await swapCube([0, 3, 4], [4, 3, 1], interval, timePartition);
  await swapCube([1, 4, 4], [2, 0, 4], interval, timePartition);
  await swapCube([2, 4, 1], [4, 3, 3], interval, timePartition);
  await swapCube([2, 1, 2], [4, 3, 2], interval, timePartition);
  await swapCube([3, 3, 1], [4, 3, 2], interval, timePartition);
  await swapCube([3, 4, 3], [4, 4, 2], interval, timePartition);
  await swapCube([2, 0, 3], [3, 0, 4], interval, timePartition);
  await swapCube([1, 1, 4], [2, 4, 2], interval, timePartition);
  await swapCube([3, 3, 4], [4, 4, 1], interval, timePartition);
  await swapCube([4, 4, 0], [4, 4, 2], interval, timePartition);
  await swapCube([4, 2, 2], [4, 4, 0], interval, timePartition);
  await swapCube([1, 4, 3], [2, 0, 2], interval, timePartition);
  await swapCube([3, 1, 4], [4, 2, 0], interval, timePartition);
  await swapCube([0, 2, 2], [3, 0, 1], interval, timePartition);
  await swapCube([2, 2, 4], [4, 4, 3], interval, timePartition);
  await swapCube([0, 0, 2], [3, 3, 0], interval, timePartition);
  await swapCube([3, 2, 2], [4, 0, 1], interval, timePartition);
  await swapCube([2, 2, 4], [2, 4, 2], interval, timePartition);
  await swapCube([2, 4, 4], [4, 3, 2], interval, timePartition);
  await swapCube([1, 2, 2], [3, 4, 0], interval, timePartition);
  await swapCube([3, 4, 3], [4, 3, 4], interval, timePartition);
  await swapCube([1, 3, 3], [2, 3, 1], interval, timePartition);
  await swapCube([4, 3, 0], [4, 4, 1], interval, timePartition);
  await swapCube([1, 3, 0], [4, 4, 3], interval, timePartition);
  await swapCube([3, 2, 4], [4, 1, 3], interval, timePartition);
  await swapCube([0, 3, 0], [1, 1, 3], interval, timePartition);
  await swapCube([2, 0, 1], [2, 3, 3], interval, timePartition);
  await swapCube([0, 3, 2], [1, 4, 4], interval, timePartition);
  await swapCube([0, 4, 4], [3, 1, 2], interval, timePartition);
  await swapCube([0, 3, 4], [3, 4, 2], interval, timePartition);
  await swapCube([0, 1, 4], [4, 2, 0], interval, timePartition);
  await swapCube([3, 0, 2], [4, 4, 0], interval, timePartition);
  await swapCube([1, 2, 2], [2, 0, 4], interval, timePartition);
  await swapCube([1, 4, 0], [2, 2, 4], interval, timePartition);
  await swapCube([1, 4, 1], [4, 4, 4], interval, timePartition);
  await swapCube([3, 4, 2], [4, 0, 2], interval, timePartition);
  await swapCube([0, 2, 0], [2, 2, 1], interval, timePartition);
  await swapCube([3, 0, 1], [4, 0, 3], interval, timePartition);
  await swapCube([1, 3, 2], [4, 2, 2], interval, timePartition);
  await swapCube([0, 1, 4], [3, 2, 2], interval, timePartition);
  await swapCube([1, 3, 4], [4, 3, 0], interval, timePartition);
  await swapCube([4, 0, 2], [4, 3, 2], interval, timePartition);
  await swapCube([1, 2, 1], [4, 3, 4], interval, timePartition);
  await swapCube([0, 3, 3], [3, 1, 0], interval, timePartition);
  await swapCube([0, 4, 2], [4, 2, 3], interval, timePartition);
  await swapCube([0, 1, 4], [0, 4, 4], interval, timePartition);
  await swapCube([4, 0, 2], [4, 4, 3], interval, timePartition);
  await swapCube([1, 1, 0], [2, 2, 0], interval, timePartition);
  await swapCube([1, 0, 1], [4, 3, 1], interval, timePartition);
  await swapCube([3, 4, 1], [4, 1, 1], interval, timePartition);
  await swapCube([2, 4, 1], [3, 4, 0], interval, timePartition);
  await swapCube([1, 1, 4], [4, 1, 4], interval, timePartition);
  await swapCube([3, 2, 2], [4, 1, 3], interval, timePartition);
  await swapCube([2, 4, 2], [4, 1, 1], interval, timePartition);
  await swapCube([2, 1, 2], [2, 3, 2], interval, timePartition);
  await swapCube([3, 0, 4], [3, 4, 0], interval, timePartition);
  await swapCube([3, 3, 3], [4, 4, 1], interval, timePartition);
  await swapCube([3, 4, 1], [4, 4, 4], interval, timePartition);
  await swapCube([0, 1, 2], [1, 0, 0], interval, timePartition);
  await swapCube([1, 4, 4], [3, 2, 2], interval, timePartition);
  await swapCube([4, 2, 3], [4, 3, 2], interval, timePartition);
  await swapCube([3, 3, 1], [4, 1, 1], interval, timePartition);
  await swapCube([1, 1, 0], [1, 2, 0], interval, timePartition);
  await swapCube([0, 0, 2], [1, 1, 4], interval, timePartition);
  await swapCube([0, 2, 1], [0, 3, 1], interval, timePartition);
  await swapCube([2, 2, 3], [4, 4, 2], interval, timePartition);
  await swapCube([1, 0, 0], [2, 0, 3], interval, timePartition);
  await swapCube([4, 4, 2], [4, 4, 3], interval, timePartition);
  await swapCube([1, 2, 2], [2, 2, 4], interval, timePartition);
  await swapCube([1, 4, 2], [3, 2, 4], interval, timePartition);
  await swapCube([1, 2, 1], [3, 0, 1], interval, timePartition);
  await swapCube([4, 0, 1], [4, 2, 2], interval, timePartition);
  await swapCube([3, 0, 2], [3, 3, 3], interval, timePartition);
  await swapCube([0, 3, 0], [2, 4, 4], interval, timePartition);
  await swapCube([0, 2, 0], [2, 0, 3], interval, timePartition);
  await swapCube([3, 3, 2], [4, 0, 1], interval, timePartition);
  await swapCube([2, 1, 2], [3, 0, 0], interval, timePartition);
  await swapCube([1, 4, 3], [2, 2, 4], interval, timePartition);
  await swapCube([0, 1, 1], [4, 4, 3], interval, timePartition);
  await swapCube([2, 2, 4], [4, 2, 1], interval, timePartition);
  await swapCube([1, 4, 2], [4, 4, 1], interval, timePartition);
  await swapCube([4, 3, 0], [4, 4, 1], interval, timePartition);
  await swapCube([0, 2, 0], [4, 1, 1], interval, timePartition);
  await swapCube([2, 3, 3], [4, 0, 2], interval, timePartition);
  await swapCube([2, 3, 1], [4, 3, 3], interval, timePartition);
  await swapCube([3, 2, 2], [4, 2, 2], interval, timePartition);
  await swapCube([0, 3, 4], [0, 4, 2], interval, timePartition);
  await swapCube([3, 3, 0], [3, 4, 1], interval, timePartition);
  await swapCube([1, 1, 2], [3, 4, 0], interval, timePartition);
  await swapCube([1, 1, 3], [2, 3, 0], interval, timePartition);
  await swapCube([4, 3, 1], [4, 3, 2], interval, timePartition);
  await swapCube([4, 4, 2], [4, 4, 4], interval, timePartition);
  await swapCube([4, 3, 2], [4, 3, 4], interval, timePartition);
  await swapCube([2, 1, 0], [4, 0, 0], interval, timePartition);
  await swapCube([2, 1, 1], [4, 0, 1], interval, timePartition);
  await swapCube([3, 3, 0], [3, 4, 1], interval, timePartition);
  await swapCube([2, 2, 4], [3, 2, 3], interval, timePartition);
  await swapCube([3, 3, 3], [4, 1, 1], interval, timePartition);
  await swapCube([4, 1, 2], [4, 1, 3], interval, timePartition);
  await swapCube([0, 2, 3], [3, 4, 3], interval, timePartition);
  await swapCube([1, 4, 3], [4, 0, 4], interval, timePartition);
  await swapCube([1, 3, 1], [3, 0, 3], interval, timePartition);
  await swapCube([2, 4, 4], [4, 1, 3], interval, timePartition);
  await swapCube([0, 3, 0], [1, 4, 1], interval, timePartition);
  await swapCube([3, 4, 0], [4, 3, 3], interval, timePartition);
  await swapCube([0, 1, 3], [3, 3, 0], interval, timePartition);
  await swapCube([2, 0, 3], [3, 0, 1], interval, timePartition);
  await swapCube([0, 1, 3], [0, 2, 3], interval, timePartition);
  await swapCube([1, 3, 0], [2, 0, 0], interval, timePartition);
  await swapCube([0, 2, 0], [4, 0, 3], interval, timePartition);
  await swapCube([2, 0, 4], [4, 0, 0], interval, timePartition);
  await swapCube([1, 4, 4], [4, 1, 2], interval, timePartition);
  await swapCube([0, 0, 0], [0, 4, 3], interval, timePartition);
  await swapCube([0, 0, 3], [3, 2, 4], interval, timePartition);
  await swapCube([3, 1, 3], [4, 0, 4], interval, timePartition);
  await swapCube([1, 3, 1], [2, 2, 2], interval, timePartition);
  await swapCube([4, 4, 1], [4, 4, 4], interval, timePartition);
  await swapCube([4, 1, 2], [4, 4, 1], interval, timePartition);
  await swapCube([4, 0, 3], [4, 1, 3], interval, timePartition);
  await swapCube([0, 3, 0], [3, 0, 1], interval, timePartition);
  await swapCube([2, 2, 0], [4, 2, 4], interval, timePartition);
  await swapCube([2, 1, 3], [3, 2, 0], interval, timePartition);
  await swapCube([1, 2, 2], [3, 4, 2], interval, timePartition);
  await swapCube([0, 1, 4], [1, 0, 4], interval, timePartition);
  await swapCube([1, 2, 3], [1, 3, 2], interval, timePartition);
  await swapCube([2, 0, 0], [4, 0, 0], interval, timePartition);
  await swapCube([1, 2, 2], [1, 4, 4], interval, timePartition);
  await swapCube([0, 2, 2], [1, 0, 4], interval, timePartition);
  await swapCube([3, 0, 2], [3, 2, 1], interval, timePartition);
  await swapCube([1, 4, 3], [4, 2, 1], interval, timePartition);
  await swapCube([2, 0, 4], [3, 1, 4], interval, timePartition);
  await swapCube([2, 1, 3], [4, 2, 0], interval, timePartition);
  await swapCube([1, 1, 4], [2, 3, 3], interval, timePartition);
  await swapCube([0, 0, 4], [3, 0, 0], interval, timePartition);
  await swapCube([4, 3, 2], [4, 4, 0], interval, timePartition);
  await swapCube([3, 0, 4], [4, 1, 3], interval, timePartition);
  await swapCube([3, 0, 2], [3, 2, 4], interval, timePartition);
  await swapCube([2, 4, 1], [3, 0, 3], interval, timePartition);
  await swapCube([4, 4, 0], [4, 4, 4], interval, timePartition);
  await swapCube([1, 1, 0], [3, 1, 0], interval, timePartition);
  await swapCube([2, 3, 4], [4, 0, 4], interval, timePartition);
  await swapCube([2, 4, 4], [4, 4, 4], interval, timePartition);
  await swapCube([0, 1, 3], [4, 3, 1], interval, timePartition);
  await swapCube([1, 2, 2], [3, 3, 0], interval, timePartition);
  await swapCube([2, 1, 2], [4, 0, 3], interval, timePartition);
  await swapCube([2, 4, 2], [3, 0, 4], interval, timePartition);
  await swapCube([2, 4, 3], [3, 3, 0], interval, timePartition);
  await swapCube([3, 2, 2], [3, 4, 1], interval, timePartition);
  await swapCube([1, 3, 4], [2, 0, 4], interval, timePartition);
  await swapCube([3, 0, 0], [3, 0, 3], interval, timePartition);
  await swapCube([1, 2, 4], [3, 2, 0], interval, timePartition);
  await swapCube([1, 2, 2], [4, 1, 3], interval, timePartition);
  await swapCube([0, 4, 2], [4, 4, 3], interval, timePartition);
  await swapCube([3, 0, 2], [4, 4, 2], interval, timePartition);
  await swapCube([4, 2, 0], [4, 2, 4], interval, timePartition);
  await swapCube([0, 4, 3], [2, 4, 1], interval, timePartition);
  await swapCube([2, 0, 0], [4, 1, 4], interval, timePartition);
  await swapCube([0, 1, 2], [1, 1, 0], interval, timePartition);
  await swapCube([1, 1, 0], [4, 4, 1], interval, timePartition);
  await swapCube([3, 3, 3], [4, 1, 4], interval, timePartition);
  await swapCube([3, 0, 4], [4, 2, 0], interval, timePartition);
  await swapCube([3, 4, 4], [4, 3, 1], interval, timePartition);
  await swapCube([1, 0, 0], [1, 1, 1], interval, timePartition);
  await swapCube([1, 1, 2], [3, 1, 1], interval, timePartition);
  await swapCube([4, 3, 2], [4, 4, 2], interval, timePartition);
  await swapCube([0, 1, 4], [1, 1, 2], interval, timePartition);
  await swapCube([2, 1, 0], [4, 2, 1], interval, timePartition);
  await swapCube([2, 1, 3], [3, 2, 1], interval, timePartition);
  await swapCube([1, 0, 1], [2, 1, 3], interval, timePartition);
  await swapCube([3, 1, 2], [4, 0, 2], interval, timePartition);
  await swapCube([4, 0, 4], [4, 2, 1], interval, timePartition);
  await swapCube([0, 4, 3], [1, 1, 2], interval, timePartition);
  await swapCube([3, 1, 3], [4, 4, 2], interval, timePartition);
  await swapCube([0, 1, 0], [1, 3, 4], interval, timePartition);
  await swapCube([2, 4, 0], [2, 4, 3], interval, timePartition);
  await swapCube([1, 2, 1], [2, 2, 0], interval, timePartition);
  await swapCube([4, 0, 2], [4, 4, 0], interval, timePartition);
  await swapCube([3, 4, 4], [4, 0, 4], interval, timePartition);
  await swapCube([1, 3, 3], [1, 3, 4], interval, timePartition);
  await swapCube([3, 1, 4], [3, 4, 0], interval, timePartition);
  await swapCube([1, 2, 0], [1, 3, 1], interval, timePartition);
  await swapCube([1, 1, 2], [2, 0, 3], interval, timePartition);
  await swapCube([0, 2, 1], [3, 0, 1], interval, timePartition);
  await swapCube([2, 0, 1], [2, 3, 0], interval, timePartition);
  await swapCube([0, 1, 3], [4, 0, 2], interval, timePartition);
  await swapCube([4, 0, 0], [4, 1, 2], interval, timePartition);
  await swapCube([0, 1, 2], [0, 3, 3], interval, timePartition);
  await swapCube([1, 1, 0], [4, 0, 0], interval, timePartition);
  await swapCube([1, 3, 4], [4, 3, 2], interval, timePartition);
  await swapCube([3, 3, 1], [4, 2, 0], interval, timePartition);
  await swapCube([1, 4, 4], [2, 4, 1], interval, timePartition);
  await swapCube([1, 3, 2], [1, 4, 3], interval, timePartition);
  await swapCube([0, 1, 3], [2, 4, 0], interval, timePartition);
  await swapCube([4, 1, 3], [4, 4, 0], interval, timePartition);
  await swapCube([1, 3, 2], [1, 4, 1], interval, timePartition);
  await swapCube([0, 3, 0], [1, 3, 3], interval, timePartition);
  await swapCube([3, 4, 3], [4, 1, 4], interval, timePartition);
  await swapCube([0, 3, 2], [4, 1, 3], interval, timePartition);
  await swapCube([4, 3, 3], [4, 4, 4], interval, timePartition);
  await swapCube([3, 0, 1], [3, 4, 2], interval, timePartition);
  await swapCube([2, 2, 1], [3, 2, 3], interval, timePartition);
  await swapCube([1, 3, 2], [3, 3, 3], interval, timePartition);
  await swapCube([4, 3, 0], [4, 4, 3], interval, timePartition);
  await swapCube([2, 2, 4], [4, 3, 2], interval, timePartition);
  await swapCube([0, 3, 1], [3, 2, 0], interval, timePartition);
  await swapCube([4, 0, 2], [4, 1, 0], interval, timePartition);
  await swapCube([4, 0, 4], [4, 4, 3], interval, timePartition);
  await swapCube([0, 0, 1], [1, 1, 0], interval, timePartition);
  await swapCube([0, 2, 4], [2, 1, 3], interval, timePartition);
  await swapCube([4, 3, 0], [4, 3, 3], interval, timePartition);
  await swapCube([3, 0, 1], [4, 1, 1], interval, timePartition);
  await swapCube([4, 1, 0], [4, 4, 3], interval, timePartition);
  await swapCube([4, 0, 1], [4, 0, 4], interval, timePartition);
  await swapCube([1, 0, 3], [1, 1, 2], interval, timePartition);
  await swapCube([1, 4, 0], [2, 4, 3], interval, timePartition);
  await swapCube([4, 2, 3], [4, 4, 3], interval, timePartition);
  await swapCube([2, 0, 4], [4, 2, 0], interval, timePartition);
  await swapCube([0, 0, 1], [3, 4, 0], interval, timePartition);
  await swapCube([4, 3, 1], [4, 3, 4], interval, timePartition);
  await swapCube([0, 3, 0], [1, 1, 1], interval, timePartition);
  await swapCube([1, 3, 1], [2, 1, 4], interval, timePartition);
  await swapCube([3, 3, 0], [4, 1, 2], interval, timePartition);
  await swapCube([0, 1, 4], [2, 3, 2], interval, timePartition);
  await swapCube([1, 2, 0], [3, 0, 4], interval, timePartition);
  await swapCube([1, 0, 2], [3, 3, 4], interval, timePartition);
  await swapCube([3, 4, 0], [4, 4, 3], interval, timePartition);
  await swapCube([3, 4, 3], [4, 3, 3], interval, timePartition);
  await swapCube([0, 0, 4], [1, 3, 4], interval, timePartition);
  await swapCube([4, 1, 4], [4, 4, 4], interval, timePartition);
  await swapCube([3, 1, 3], [4, 4, 0], interval, timePartition);
  await swapCube([4, 1, 4], [4, 2, 3], interval, timePartition);
  await swapCube([1, 3, 0], [4, 0, 0], interval, timePartition);
  await swapCube([2, 4, 2], [3, 1, 4], interval, timePartition);
  await swapCube([4, 3, 2], [4, 3, 3], interval, timePartition);
  await swapCube([2, 0, 0], [4, 1, 2], interval, timePartition);
  await swapCube([0, 1, 0], [4, 3, 0], interval, timePartition);
  await swapCube([1, 3, 3], [2, 4, 1], interval, timePartition);
  await swapCube([0, 4, 4], [2, 1, 3], interval, timePartition);
  await swapCube([3, 4, 4], [4, 2, 0], interval, timePartition);
  await swapCube([4, 0, 0], [4, 2, 4], interval, timePartition);
  await swapCube([0, 1, 4], [1, 1, 4], interval, timePartition);
  await swapCube([0, 2, 3], [2, 2, 2], interval, timePartition);
  await swapCube([2, 0, 2], [3, 1, 4], interval, timePartition);
  await swapCube([2, 1, 0], [2, 2, 0], interval, timePartition);
  await swapCube([4, 2, 2], [4, 4, 4], interval, timePartition);
  await swapCube([3, 4, 4], [4, 4, 0], interval, timePartition);
  await swapCube([0, 4, 0], [4, 4, 1], interval, timePartition);
  await swapCube([2, 1, 3], [2, 4, 1], interval, timePartition);
  await swapCube([4, 4, 1], [4, 4, 4], interval, timePartition);
  await swapCube([2, 4, 0], [4, 3, 4], interval, timePartition);
  await swapCube([2, 4, 4], [3, 0, 4], interval, timePartition);
  await swapCube([1, 2, 0], [1, 3, 1], interval, timePartition);
  await swapCube([4, 0, 4], [4, 3, 1], interval, timePartition);
  await swapCube([1, 3, 0], [3, 4, 1], interval, timePartition);
  await swapCube([3, 2, 2], [4, 0, 0], interval, timePartition);
  await swapCube([4, 0, 2], [4, 3, 2], interval, timePartition);
  await swapCube([1, 4, 2], [2, 2, 2], interval, timePartition);
  await swapCube([4, 0, 2], [4, 3, 4], interval, timePartition);
  await swapCube([2, 1, 2], [2, 4, 0], interval, timePartition);
  await swapCube([3, 4, 0], [4, 0, 4], interval, timePartition);
  await swapCube([3, 4, 3], [4, 3, 4], interval, timePartition);
  await swapCube([1, 0, 3], [1, 4, 0], interval, timePartition);
  await swapCube([2, 4, 0], [4, 2, 0], interval, timePartition);
  await swapCube([2, 0, 1], [3, 0, 3], interval, timePartition);
  await swapCube([4, 0, 0], [4, 1, 3], interval, timePartition);
  await swapCube([2, 2, 2], [4, 2, 4], interval, timePartition);
  await swapCube([1, 2, 1], [1, 4, 4], interval, timePartition);
  await swapCube([2, 4, 4], [3, 0, 4], interval, timePartition);
  await swapCube([0, 2, 1], [3, 1, 3], interval, timePartition);
  await swapCube([2, 0, 0], [4, 3, 3], interval, timePartition);
  await swapCube([3, 0, 2], [3, 4, 0], interval, timePartition);
  await swapCube([2, 4, 2], [4, 1, 2], interval, timePartition);
  await swapCube([0, 2, 2], [1, 1, 3], interval, timePartition);
  await swapCube([1, 1, 1], [2, 1, 2], interval, timePartition);
  await swapCube([1, 4, 2], [3, 4, 4], interval, timePartition);
  await swapCube([0, 1, 1], [0, 4, 2], interval, timePartition);
  await swapCube([3, 4, 3], [4, 1, 3], interval, timePartition);
  await swapCube([0, 3, 4], [3, 1, 4], interval, timePartition);
  await swapCube([4, 2, 1], [4, 4, 4], interval, timePartition);
  await swapCube([2, 2, 4], [2, 4, 2], interval, timePartition);
  await swapCube([1, 1, 4], [3, 3, 4], interval, timePartition);
  await swapCube([4, 3, 2], [4, 4, 4], interval, timePartition);
  await swapCube([2, 0, 4], [3, 0, 0], interval, timePartition);
  await swapCube([0, 3, 4], [1, 4, 2], interval, timePartition);
  await swapCube([1, 3, 4], [2, 0, 2], interval, timePartition);
  await swapCube([0, 2, 4], [0, 4, 2], interval, timePartition);
  await swapCube([4, 1, 3], [4, 2, 1], interval, timePartition);
  await swapCube([4, 3, 3], [4, 4, 3], interval, timePartition);
  await swapCube([1, 2, 0], [2, 4, 1], interval, timePartition);
  await swapCube([3, 0, 2], [3, 2, 0], interval, timePartition);
  await swapCube([3, 1, 4], [4, 2, 2], interval, timePartition);
  await swapCube([0, 0, 0], [2, 0, 2], interval, timePartition);
  await swapCube([4, 4, 1], [4, 4, 3], interval, timePartition);
  await swapCube([0, 0, 2], [2, 1, 4], interval, timePartition);
  await swapCube([0, 1, 0], [1, 4, 3], interval, timePartition);
  await swapCube([1, 1, 4], [3, 1, 0], interval, timePartition);
  await swapCube([2, 2, 3], [2, 3, 1], interval, timePartition);
  await swapCube([4, 3, 3], [4, 4, 0], interval, timePartition);
  await swapCube([2, 4, 0], [3, 1, 1], interval, timePartition);
  await swapCube([3, 2, 1], [4, 1, 1], interval, timePartition);
  await swapCube([0, 0, 4], [1, 2, 4], interval, timePartition);
  await swapCube([0, 0, 2], [4, 0, 0], interval, timePartition);
  await swapCube([3, 3, 0], [4, 0, 4], interval, timePartition);
  await swapCube([0, 3, 3], [3, 0, 4], interval, timePartition);
  await swapCube([2, 0, 1], [3, 2, 1], interval, timePartition);
  await swapCube([3, 4, 1], [4, 0, 3], interval, timePartition);
  await swapCube([4, 2, 3], [4, 3, 4], interval, timePartition);
  await swapCube([3, 3, 4], [4, 0, 3], interval, timePartition);
  await swapCube([4, 3, 4], [4, 4, 1], interval, timePartition);
  await swapCube([2, 1, 0], [3, 3, 1], interval, timePartition);
  await swapCube([3, 0, 0], [3, 4, 4], interval, timePartition);
  await swapCube([2, 2, 1], [2, 3, 3], interval, timePartition);
  await swapCube([3, 1, 2], [4, 4, 3], interval, timePartition);
  await swapCube([4, 1, 0], [4, 4, 4], interval, timePartition);
  await swapCube([2, 4, 3], [4, 0, 3], interval, timePartition);
  await swapCube([3, 3, 4], [4, 4, 3], interval, timePartition);
  await swapCube([2, 2, 2], [4, 4, 3], interval, timePartition);
  await swapCube([3, 2, 4], [3, 4, 4], interval, timePartition);
  await swapCube([4, 2, 1], [4, 3, 4], interval, timePartition);
  await swapCube([1, 2, 2], [2, 0, 3], interval, timePartition);
  await swapCube([4, 3, 2], [4, 4, 2], interval, timePartition);
  await swapCube([4, 4, 3], [4, 4, 4], interval, timePartition);
  await swapCube([2, 4, 2], [4, 0, 1], interval, timePartition);
  await swapCube([0, 2, 2], [2, 0, 2], interval, timePartition);
  await swapCube([0, 0, 3], [1, 4, 2], interval, timePartition);
  await swapCube([4, 3, 4], [4, 4, 1], interval, timePartition);
  await swapCube([3, 4, 3], [4, 3, 4], interval, timePartition);
  await swapCube([3, 1, 0], [4, 2, 2], interval, timePartition);
  await swapCube([3, 2, 1], [4, 0, 1], interval, timePartition);
  await swapCube([3, 4, 1], [4, 0, 0], interval, timePartition);
  await swapCube([4, 1, 4], [4, 2, 3], interval, timePartition);
  await swapCube([2, 4, 1], [4, 2, 4], interval, timePartition);
  await swapCube([2, 3, 3], [3, 2, 1], interval, timePartition);
  await swapCube([3, 2, 3], [4, 1, 3], interval, timePartition);
  await swapCube([1, 4, 3], [3, 0, 4], interval, timePartition);
  await swapCube([2, 2, 4], [2, 3, 0], interval, timePartition);
  await swapCube([3, 2, 4], [4, 1, 0], interval, timePartition);
  await swapCube([3, 1, 4], [4, 4, 3], interval, timePartition);
  await swapCube([1, 2, 2], [4, 2, 3], interval, timePartition);
  await swapCube([1, 0, 2], [3, 1, 1], interval, timePartition);
  await swapCube([1, 0, 3], [3, 3, 4], interval, timePartition);
  await swapCube([3, 2, 1], [4, 2, 1], interval, timePartition);
  await swapCube([2, 3, 0], [3, 0, 3], interval, timePartition);
  await swapCube([3, 2, 4], [4, 0, 3], interval, timePartition);
  await swapCube([4, 1, 1], [4, 1, 2], interval, timePartition);
  await swapCube([1, 3, 3], [4, 4, 0], interval, timePartition);
  await swapCube([3, 1, 4], [4, 4, 0], interval, timePartition);
  await swapCube([0, 0, 3], [4, 3, 0], interval, timePartition);
  await swapCube([1, 0, 3], [4, 3, 4], interval, timePartition);
  await swapCube([2, 4, 0], [3, 4, 1], interval, timePartition);
  await swapCube([4, 1, 2], [4, 2, 2], interval, timePartition);
  await swapCube([4, 2, 3], [4, 4, 2], interval, timePartition);
  await swapCube([3, 1, 0], [3, 2, 0], interval, timePartition);
  await swapCube([4, 3, 4], [4, 4, 0], interval, timePartition);
  await swapCube([2, 4, 4], [3, 2, 0], interval, timePartition);
  await swapCube([4, 0, 1], [4, 1, 1], interval, timePartition);
  await swapCube([3, 1, 1], [3, 2, 4], interval, timePartition);
  await swapCube([0, 0, 3], [1, 0, 2], interval, timePartition);
  await swapCube([4, 1, 2], [4, 1, 4], interval, timePartition);
  await swapCube([3, 0, 3], [4, 4, 0], interval, timePartition);
  await swapCube([0, 1, 0], [3, 4, 0], interval, timePartition);
  await swapCube([3, 4, 4], [4, 0, 4], interval, timePartition);
  await swapCube([0, 0, 1], [2, 2, 1], interval, timePartition);
  await swapCube([2, 2, 0], [3, 1, 2], interval, timePartition);
  await swapCube([2, 2, 0], [4, 1, 1], interval, timePartition);
  await swapCube([4, 0, 0], [4, 1, 3], interval, timePartition);
  await swapCube([2, 2, 0], [4, 4, 2], interval, timePartition);
  await swapCube([1, 0, 2], [2, 4, 1], interval, timePartition);
  await swapCube([1, 2, 0], [4, 2, 0], interval, timePartition);
  await swapCube([3, 1, 0], [4, 2, 0], interval, timePartition);
  await swapCube([3, 2, 3], [4, 1, 3], interval, timePartition);
  await swapCube([2, 3, 3], [4, 3, 4], interval, timePartition);
  await swapCube([3, 3, 0], [3, 4, 0], interval, timePartition);
  await swapCube([4, 0, 2], [4, 4, 0], interval, timePartition);
  await swapCube([1, 0, 3], [2, 1, 4], interval, timePartition);
  await swapCube([1, 2, 4], [3, 3, 3], interval, timePartition);
  await swapCube([2, 3, 2], [4, 2, 0], interval, timePartition);
  await swapCube([0, 3, 3], [0, 3, 4], interval, timePartition);
  await swapCube([4, 0, 2], [4, 3, 3], interval, timePartition);
  await swapCube([3, 1, 1], [4, 2, 3], interval, timePartition);
  await swapCube([0, 1, 4], [4, 0, 4], interval, timePartition);
  await swapCube([4, 2, 3], [4, 4, 2], interval, timePartition);
  await swapCube([1, 3, 2], [4, 3, 0], interval, timePartition);
  await swapCube([2, 4, 0], [3, 3, 2], interval, timePartition);
  await swapCube([0, 4, 2], [4, 2, 4], interval, timePartition);
  await swapCube([3, 1, 0], [4, 2, 2], interval, timePartition);
  await swapCube([2, 2, 1], [4, 4, 0], interval, timePartition);
  await swapCube([0, 1, 0], [3, 1, 4], interval, timePartition);
  await swapCube([3, 3, 3], [4, 3, 3], interval, timePartition);
  await swapCube([4, 2, 0], [4, 3, 1], interval, timePartition);
  await swapCube([4, 2, 1], [4, 4, 4], interval, timePartition);
  await swapCube([1, 0, 0], [4, 0, 0], interval, timePartition);
  await swapCube([1, 2, 1], [4, 3, 0], interval, timePartition);
  await swapCube([1, 1, 0], [2, 3, 1], interval, timePartition);
  await swapCube([0, 1, 0], [0, 3, 0], interval, timePartition);
  await swapCube([2, 4, 1], [3, 1, 0], interval, timePartition);
  await swapCube([3, 2, 1], [4, 3, 4], interval, timePartition);
  await swapCube([1, 3, 3], [4, 1, 3], interval, timePartition);
  await swapCube([0, 0, 2], [0, 2, 0], interval, timePartition);
  await swapCube([3, 1, 1], [4, 0, 2], interval, timePartition);
  await swapCube([4, 1, 1], [4, 2, 0], interval, timePartition);
  await swapCube([4, 3, 0], [4, 4, 0], interval, timePartition);
  await swapCube([4, 3, 4], [4, 4, 0], interval, timePartition);
  await swapCube([2, 4, 4], [3, 2, 3], interval, timePartition);
  await swapCube([3, 0, 2], [3, 0, 3], interval, timePartition);
  await swapCube([1, 0, 3], [2, 0, 2], interval, timePartition);
  await swapCube([1, 3, 0], [3, 2, 2], interval, timePartition);
  await swapCube([1, 3, 0], [3, 3, 2], interval, timePartition);
  await swapCube([4, 4, 0], [4, 4, 2], interval, timePartition);
  await swapCube([3, 0, 2], [4, 0, 4], interval, timePartition);
  await swapCube([2, 1, 0], [4, 3, 3], interval, timePartition);
  await swapCube([0, 1, 4], [3, 0, 2], interval, timePartition);
  await swapCube([1, 1, 2], [1, 3, 2], interval, timePartition);
  await swapCube([1, 1, 4], [4, 2, 0], interval, timePartition);
  await swapCube([2, 1, 3], [3, 1, 3], interval, timePartition);
  await swapCube([4, 3, 4], [4, 4, 1], interval, timePartition);
  await swapCube([2, 0, 4], [2, 3, 2], interval, timePartition);
  await swapCube([3, 0, 1], [3, 2, 4], interval, timePartition);
  await swapCube([1, 2, 3], [3, 0, 0], interval, timePartition);
  await swapCube([4, 0, 2], [4, 4, 2], interval, timePartition);
  await swapCube([3, 4, 0], [4, 2, 2], interval, timePartition);
  await swapCube([4, 1, 0], [4, 1, 3], interval, timePartition);
  await swapCube([3, 4, 2], [4, 4, 0], interval, timePartition);
  await swapCube([1, 0, 4], [2, 0, 3], interval, timePartition);
  await swapCube([0, 1, 4], [2, 3, 1], interval, timePartition);
  await swapCube([2, 0, 3], [2, 1, 1], interval, timePartition);
  await swapCube([3, 2, 0], [4, 0, 3], interval, timePartition);
  await swapCube([1, 2, 4], [3, 3, 0], interval, timePartition);
  await swapCube([0, 1, 1], [1, 2, 0], interval, timePartition);
  await swapCube([4, 1, 3], [4, 3, 0], interval, timePartition);
  await swapCube([3, 3, 4], [4, 3, 0], interval, timePartition);
  await swapCube([4, 0, 4], [4, 2, 2], interval, timePartition);
  await swapCube([0, 0, 1], [1, 2, 2], interval, timePartition);
  await swapCube([3, 0, 1], [4, 1, 4], interval, timePartition);
  await swapCube([2, 1, 1], [4, 2, 2], interval, timePartition);
  await swapCube([2, 4, 1], [3, 4, 1], interval, timePartition);
  await swapCube([2, 0, 2], [3, 0, 0], interval, timePartition);
  await swapCube([2, 0, 2], [4, 0, 3], interval, timePartition);
  await swapCube([3, 0, 0], [3, 2, 4], interval, timePartition);
  await swapCube([3, 0, 4], [3, 1, 1], interval, timePartition);
  await swapCube([2, 1, 3], [3, 3, 1], interval, timePartition);
  await swapCube([0, 1, 3], [4, 2, 3], interval, timePartition);
  await swapCube([1, 2, 4], [3, 3, 4], interval, timePartition);
  await swapCube([3, 0, 1], [3, 2, 2], interval, timePartition);
  await swapCube([1, 2, 3], [4, 1, 3], interval, timePartition);
  await swapCube([3, 4, 2], [4, 0, 3], interval, timePartition);
  await swapCube([1, 0, 4], [4, 3, 0], interval, timePartition);
  await swapCube([0, 3, 3], [2, 0, 0], interval, timePartition);
  await swapCube([3, 2, 2], [4, 2, 1], interval, timePartition);
  await swapCube([4, 3, 0], [4, 3, 1], interval, timePartition);
  await swapCube([2, 3, 3], [4, 4, 2], interval, timePartition);
  await swapCube([2, 4, 2], [3, 0, 3], interval, timePartition);
  await swapCube([3, 2, 1], [4, 1, 4], interval, timePartition);
  await swapCube([0, 4, 4], [4, 1, 3], interval, timePartition);
  await swapCube([0, 3, 2], [4, 0, 3], interval, timePartition);
  await swapCube([2, 3, 4], [3, 0, 0], interval, timePartition);
  await swapCube([0, 0, 2], [2, 4, 0], interval, timePartition);
  await swapCube([0, 3, 1], [2, 1, 0], interval, timePartition);
  await swapCube([1, 3, 0], [2, 1, 4], interval, timePartition);
  await swapCube([4, 0, 1], [4, 0, 3], interval, timePartition);
  await swapCube([1, 3, 2], [4, 3, 1], interval, timePartition);
  await swapCube([4, 0, 0], [4, 4, 4], interval, timePartition);
  await swapCube([0, 4, 0], [2, 1, 4], interval, timePartition);
  await swapCube([0, 4, 0], [1, 0, 2], interval, timePartition);
  await swapCube([1, 0, 3], [1, 3, 0], interval, timePartition);
  await swapCube([2, 4, 1], [3, 0, 4], interval, timePartition);
  await swapCube([0, 0, 0], [1, 0, 0], interval, timePartition);
  await swapCube([0, 3, 0], [4, 0, 1], interval, timePartition);
  await swapCube([3, 0, 1], [3, 2, 4], interval, timePartition);
  await swapCube([0, 3, 3], [2, 4, 1], interval, timePartition);
  await swapCube([3, 0, 4], [4, 2, 1], interval, timePartition);
  await swapCube([3, 0, 4], [4, 4, 2], interval, timePartition);
  await swapCube([0, 2, 4], [0, 3, 0], interval, timePartition);
  await swapCube([3, 3, 1], [4, 2, 0], interval, timePartition);
  await swapCube([4, 3, 2], [4, 3, 4], interval, timePartition);
  await swapCube([2, 1, 0], [3, 0, 3], interval, timePartition);
  await swapCube([0, 3, 0], [4, 3, 1], interval, timePartition);
  await swapCube([1, 1, 4], [3, 3, 2], interval, timePartition);
  await swapCube([2, 3, 0], [4, 4, 0], interval, timePartition);
  await swapCube([0, 1, 3], [3, 4, 1], interval, timePartition);
  await swapCube([2, 1, 0], [3, 3, 2], interval, timePartition);
  await swapCube([3, 2, 0], [3, 4, 0], interval, timePartition);
  await swapCube([1, 3, 0], [3, 1, 3], interval, timePartition);
  await swapCube([0, 4, 2], [2, 4, 1], interval, timePartition);
  await swapCube([1, 3, 1], [3, 1, 0], interval, timePartition);
  await swapCube([3, 2, 1], [4, 1, 0], interval, timePartition);
  await swapCube([3, 3, 0], [4, 2, 3], interval, timePartition);
  await swapCube([3, 0, 1], [4, 0, 2], interval, timePartition);
}

q("#toggle-button").onclick = steepestSwap;

q("#algorithm").oninput = () => {
  generateCube([
    105, 60, 71, 25, 86, 19, 119, 11, 78, 108, 35, 89, 65, 58, 41, 114, 59, 95,
    33, 97, 49, 76, 61, 96, 73, 111, 37, 79, 32, 122, 8, 64, 42, 10, 5, 3, 43,
    94, 72, 26, 44, 124, 13, 53, 6, 100, 22, 15, 57, 87, 20, 82, 31, 63, 45, 70,
    38, 99, 47, 115, 85, 1, 23, 67, 121, 56, 18, 74, 123, 29, 12, 102, 16, 2,
    125, 107, 40, 120, 113, 117, 17, 27, 54, 110, 28, 81, 50, 109, 46, 14, 90,
    92, 51, 4, 24, 75, 77, 69, 68, 84, 88, 103, 80, 66, 39, 7, 118, 30, 34, 106,
    83, 55, 98, 9, 104, 21, 91, 36, 93, 116, 48, 101, 112, 52, 62,
  ]);

  let algo = q("#algorithm").value;
  switch (algo) {
    case "1":
      q("#maxRestart").value = -1;
      q("#maxSideways").value = -1;
      q("#population").value = -1;
      q("#maxIteration").value = -1;

      q("#toggle-button").onclick = steepestSwap;
      chartdata = [
        109, 107, 105, 103, 101, 99, 98, 97, 96, 95, 94, 93, 91, 90, 89, 88, 87,
        86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69,
        68, 67, 66, 65,
      ];
      q("#progress-slider").max = (chartdata.length - 1).toString();
      q("#progress-slider").value = 0;

      q("#iteration").innerText = "38";
      q("#timeElapsed").innerText = "6474 ms";
      q("#initialValue").innerText = "109";
      q("#finalValue").innerText = "65";
      q("#restartValue").innerText = "-";
      q("#stuckValue").innerText = "-";
      break;
    case "2":
      q("#maxRestart").value = -1;
      q("#maxSideways").value = 10;
      q("#population").value = -1;
      q("#maxIteration").value = -1;

      q("#toggle-button").onclick = sidewaysSwap;
      chartdata = [
        109, 107, 105, 103, 101, 99, 98, 97, 96, 95, 94, 93, 91, 90, 89, 88, 87,
        86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69,
        68, 67, 66, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65,
      ];
      q("#progress-slider").max = (chartdata.length - 1).toString();
      q("#progress-slider").value = 0;

      q("#iteration").innerText = "48";
      q("#timeElapsed").innerText = "8188 ms";
      q("#initialValue").innerText = "109";
      q("#finalValue").innerText = "65";
      q("#restartValue").innerText = "-";
      q("#stuckValue").innerText = "-";
      break;
    case "3":
      q("#maxRestart").value = 10;
      q("#maxSideways").value = -1;
      q("#population").value = -1;
      q("#maxIteration").value = -1;

      q("#toggle-button").onclick = restartSwap;
      chartdata = [
        109, 107, 105, 103, 101, 99, 98, 97, 96, 95, 94, 93, 91, 90, 89, 88, 87,
        86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69,
        68, 67, 66, 65, 109, 107, 105, 103, 101, 99, 98, 97, 96, 95, 93, 92, 91,
        89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72,
        71, 108, 106, 104, 102, 100, 98, 96, 95, 94, 93, 91, 90, 89, 88, 87, 86,
        85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 109, 107, 105, 104,
        103, 102, 101, 100, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86,
        85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 109,
        107, 105, 103, 101, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87,
        86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 109,
        107, 105, 103, 101, 99, 97, 95, 94, 92, 91, 90, 89, 87, 85, 84, 83, 82,
        81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 109, 107, 105, 103, 101, 99,
        97, 96, 94, 92, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77,
        76, 75, 74, 73, 72, 71, 70, 69, 109, 107, 105, 104, 103, 102, 101, 100,
        99, 98, 96, 95, 93, 92, 91, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79,
        78, 77, 76, 75, 74, 73, 72, 71, 109, 107, 105, 104, 103, 101, 99, 98,
        97, 96, 95, 94, 92, 91, 90, 89, 88, 86, 85, 84, 83, 82, 81, 80, 79, 78,
        77, 76, 75, 74, 73, 72, 71, 70, 109, 107, 105, 103, 101, 99, 98, 97, 96,
        95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78,
        77, 76, 75, 74, 73, 72, 71, 108, 106, 104, 102, 100, 98, 97, 96, 95, 94,
        93, 92, 91, 89, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74,
        73, 72, 71,
      ];
      q("#progress-slider").max = (chartdata.length - 1).toString();
      q("#progress-slider").value = 0;

      q("#iteration").innerText = "38, 31, 28, 37, 34, 28, 31, 33, 33, 33, 30";
      q("#timeElapsed").innerText = "61357 ms";
      q("#initialValue").innerText = "109";
      q("#finalValue").innerText = "71";
      q("#restartValue").innerText = "10";
      q("#stuckValue").innerText = "-";
      break;
    case "4":
      q("#maxRestart").value = -1;
      q("#maxSideways").value = -1;
      q("#population").value = -1;
      q("#maxIteration").value = 10000;

      q("#toggle-button").onclick = stochasticSwap;
      chartdata = [
        109, 108, 107, 106, 105, 104, 103, 102, 101, 100, 99, 98, 97, 96, 95,
        94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81,
      ];
      q("#progress-slider").max = (chartdata.length - 1).toString();
      q("#progress-slider").value = 0;

      q("#iteration").innerText = "10000";
      q("#timeElapsed").innerText = "206 ms";
      q("#initialValue").innerText = "109";
      q("#finalValue").innerText = "81";
      q("#restartValue").innerText = "-";
      q("#stuckValue").innerText = "-";
      break;
    case "5":
      q("#maxRestart").value = -1;
      q("#maxSideways").value = -1;
      q("#population").value = -1;
      q("#maxIteration").value = -1;

      q("#toggle-button").onclick = simmulatedSwap;
      chartdata = [
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 108,
        108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 108, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108,
        108, 108, 108, 108, 108, 108, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 108,
        107, 107, 107, 107, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108,
        108, 108, 108, 108, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107,
        108, 108, 108, 108, 108, 109, 109, 109, 109, 109, 108, 108, 108, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
        108, 108, 108, 107, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106,
        106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106,
        106, 106, 106, 105, 105, 105, 106, 106, 107, 107, 107, 107, 107, 107,
        107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 106, 106, 106, 106,
        105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105,
        105, 105, 105, 105, 105, 105, 105, 105, 104, 104, 104, 104, 104, 104,
        104, 104, 104, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103,
        103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103,
        103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103,
        103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103,
        103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103,
      ];
      chartdata2 = [
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.999897, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        0.998785, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.995911, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.986884, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 0.971641, 1.0, 1.0, 1.0, 1.0, 0.966491, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 0.956059, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.253437, 1.0, 1.0, 1.0,
        1.0, 0.180942, 1.0, 0.154466, 0.020138, 0.129841, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 0.04685, 1.0, 1.0, 1.0, 0.025374, 0.000456, 1.0,
        1.0, 0.012069, 1.0, 1.0, 1.0, 1.0, 1.0, 0.002908, 0.002196, 1.0, 1.0,
        1.0, 1.0, 1.0, 0.000295, 1.0, 1.0, 1.0, 1.0, 0.000033, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0,
        1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0,
        1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0,
        0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0,
      ];
      q("#progress-slider").max = (chartdata.length - 1).toString();
      q("#progress-slider").value = 0;

      q("#iteration").innerText = "559";
      q("#timeElapsed").innerText = "18 ms";
      q("#initialValue").innerText = "109";
      q("#finalValue").innerText = "103";
      q("#restartValue").innerText = "-";
      q("#stuckValue").innerText = "544";
      break;
    case "6":
      q("#maxRestart").value = -1;
      q("#maxSideways").value = -1;
      q("#population").value = 10;
      q("#maxIteration").value = 10000;

      setTimeout(() => {
        generateCube([
          92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92,
          92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92,
          92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92,
          92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92,
          92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92,
          92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92,
          92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92,
          92, 92, 92, 92, 92, 92,
        ]);
      }, 10000);
      q("#iteration").innerText = "10000";
      q("#timeElapsed").innerText = "3020 ms";
      q("#initialValue").innerText = "109";
      q("#finalValue").innerText = "109";
      q("#restartValue").innerText = "-";
      q("#stuckValue").innerText = "-";
      break;
  }
};

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }

  return needResize;
}

let renderRequested = false;

function render() {
  renderRequested = undefined;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        textinstance[i][j][k].lookAt(camera.position);
      }
    }
  }

  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

window.onload = () => animate;

function requestRenderIfNotRequested() {
  if (!renderRequested) {
    renderRequested = true;
    requestAnimationFrame(render);
  }
}

controls.addEventListener("change", requestRenderIfNotRequested);
window.addEventListener("resize", requestRenderIfNotRequested);
