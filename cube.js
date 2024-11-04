import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const canvas = document.querySelector('#three-js-canvas');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const fov = 75;
const aspect = 2;
const near = 1;
const far = 25;
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
camera.position.set(-8, 8, 8);

const controls = new OrbitControls( camera, canvas );
controls.target.set( 0, 0, 0 );
controls.update();

const scene = new THREE.Scene();
scene.background = new THREE.Color( 'black' );

let cubeinstance = [];
let textinstance = [];

function addLight( ...pos ) {
	const color = 0xFFFFFF;
	const intensity = 3;
	const light = new THREE.DirectionalLight( color, intensity );
	light.position.set( ...pos );
	scene.add( light );
}

addLight( - 1, 2, 4 );
addLight( 1, - 1, - 2 );

let textPosTranslate = [0.1, -0.3, 0];

function generateCube(numbers) {
	const loader = new FontLoader();
	loader.load( '/fonts/helvetiker_regular.typeface.json', function ( font ) {
		function makeInstance( x, y, z, value) {
			const textGeometry = new TextGeometry( value.toString(), {
				font: font,
				size: 0.5,
				depth: 0.1
			});
			const textMaterial = new THREE.MeshStandardMaterial( {
				color: hsl( 60, 1, 0.5 ),
				side: THREE.DoubleSide
			});

			const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
			const boxMaterial = new THREE.MeshPhongMaterial( {
				color: hsl( 0, 0, 1 ),
				opacity: 0.2,
				transparent: true,
			});

			const cube = new THREE.Mesh( boxGeometry, boxMaterial );
			const text = new THREE.Mesh( textGeometry, textMaterial );

			cube.userData.value = value.toString();

			textGeometry.computeBoundingBox();
			if (textGeometry.boundingBox) {
				textGeometry.translate(-textGeometry.boundingBox.max.x / 2, 0, 0);
			}

			scene.add( cube );
			scene.add( text )

			cube.position.set( x, y, z );
			text.position.set( x + textPosTranslate[0], y + textPosTranslate[1], z + textPosTranslate[2]);

			return [cube, text];
		}

		function hsl( h, s, l ) {
			return ( new THREE.Color() ).setHSL( h, s, l );
		}

		let counter = 0;
		for (let i = 0; i < 5; i++) {
			let cubeface = [], textface = [];
			for (let j = 0; j < 5; j++) {
				let cubeedge = [], textedge = [];
				for (let k = 0; k < 5; k++) {
					let newblock = makeInstance(-3 + 1.5 * i, -3 + 1.5 * j, -3 + 1.5 * k, numbers[counter]);
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
}

const initialMap = {
	"[0,0,0]":[-3,-3,-3],
	"[0,0,1]":[-3,-3,-1.5],
	"[0,0,2]":[-3,-3,0],
	"[0,0,3]":[-3,-3,1.5],
	"[0,0,4]":[-3,-3,3],
	"[0,1,0]":[-3,-1.5,-3],
	"[0,1,1]":[-3,-1.5,-1.5],
	"[0,1,2]":[-3,-1.5,0],
	"[0,1,3]":[-3,-1.5,1.5],
	"[0,1,4]":[-3,-1.5,3],
	"[0,2,0]":[-3,0,-3],
	"[0,2,1]":[-3,0,-1.5],
	"[0,2,2]":[-3,0,0],
	"[0,2,3]":[-3,0,1.5],
	"[0,2,4]":[-3,0,3],
	"[0,3,0]":[-3,1.5,-3],
	"[0,3,1]":[-3,1.5,-1.5],
	"[0,3,2]":[-3,1.5,0],
	"[0,3,3]":[-3,1.5,1.5],
	"[0,3,4]":[-3,1.5,3],
	"[0,4,0]":[-3,3,-3],
	"[0,4,1]":[-3,3,-1.5],
	"[0,4,2]":[-3,3,0],
	"[0,4,3]":[-3,3,1.5],
	"[0,4,4]":[-3,3,3],
	"[1,0,0]":[-1.5,-3,-3],
	"[1,0,1]":[-1.5,-3,-1.5],
	"[1,0,2]":[-1.5,-3,0],
	"[1,0,3]":[-1.5,-3,1.5],
	"[1,0,4]":[-1.5,-3,3],
	"[1,1,0]":[-1.5,-1.5,-3],
	"[1,1,1]":[-1.5,-1.5,-1.5],
	"[1,1,2]":[-1.5,-1.5,0],
	"[1,1,3]":[-1.5,-1.5,1.5],
	"[1,1,4]":[-1.5,-1.5,3],
	"[1,2,0]":[-1.5,0,-3],
	"[1,2,1]":[-1.5,0,-1.5],
	"[1,2,2]":[-1.5,0,0],
	"[1,2,3]":[-1.5,0,1.5],
	"[1,2,4]":[-1.5,0,3],
	"[1,3,0]":[-1.5,1.5,-3],
	"[1,3,1]":[-1.5,1.5,-1.5],
	"[1,3,2]":[-1.5,1.5,0],
	"[1,3,3]":[-1.5,1.5,1.5],
	"[1,3,4]":[-1.5,1.5,3],
	"[1,4,0]":[-1.5,3,-3],
	"[1,4,1]":[-1.5,3,-1.5],
	"[1,4,2]":[-1.5,3,0],
	"[1,4,3]":[-1.5,3,1.5],
	"[1,4,4]":[-1.5,3,3],
	"[2,0,0]":[0,-3,-3],
	"[2,0,1]":[0,-3,-1.5],
	"[2,0,2]":[0,-3,0],
	"[2,0,3]":[0,-3,1.5],
	"[2,0,4]":[0,-3,3],
	"[2,1,0]":[0,-1.5,-3],
	"[2,1,1]":[0,-1.5,-1.5],
	"[2,1,2]":[0,-1.5,0],
	"[2,1,3]":[0,-1.5,1.5],
	"[2,1,4]":[0,-1.5,3],
	"[2,2,0]":[0,0,-3],
	"[2,2,1]":[0,0,-1.5],
	"[2,2,2]":[0,0,0],
	"[2,2,3]":[0,0,1.5],
	"[2,2,4]":[0,0,3],
	"[2,3,0]":[0,1.5,-3],
	"[2,3,1]":[0,1.5,-1.5],
	"[2,3,2]":[0,1.5,0],
	"[2,3,3]":[0,1.5,1.5],
	"[2,3,4]":[0,1.5,3],
	"[2,4,0]":[0,3,-3],
	"[2,4,1]":[0,3,-1.5],
	"[2,4,2]":[0,3,0],
	"[2,4,3]":[0,3,1.5],
	"[2,4,4]":[0,3,3],
	"[3,0,0]":[1.5,-3,-3],
	"[3,0,1]":[1.5,-3,-1.5],
	"[3,0,2]":[1.5,-3,0],
	"[3,0,3]":[1.5,-3,1.5],
	"[3,0,4]":[1.5,-3,3],
	"[3,1,0]":[1.5,-1.5,-3],
	"[3,1,1]":[1.5,-1.5,-1.5],
	"[3,1,2]":[1.5,-1.5,0],
	"[3,1,3]":[1.5,-1.5,1.5],
	"[3,1,4]":[1.5,-1.5,3],
	"[3,2,0]":[1.5,0,-3],
	"[3,2,1]":[1.5,0,-1.5],
	"[3,2,2]":[1.5,0,0],
	"[3,2,3]":[1.5,0,1.5],
	"[3,2,4]":[1.5,0,3],
	"[3,3,0]":[1.5,1.5,-3],
	"[3,3,1]":[1.5,1.5,-1.5],
	"[3,3,2]":[1.5,1.5,0],
	"[3,3,3]":[1.5,1.5,1.5],
	"[3,3,4]":[1.5,1.5,3],
	"[3,4,0]":[1.5,3,-3],
	"[3,4,1]":[1.5,3,-1.5],
	"[3,4,2]":[1.5,3,0],
	"[3,4,3]":[1.5,3,1.5],
	"[3,4,4]":[1.5,3,3],
	"[4,0,0]":[3,-3,-3],
	"[4,0,1]":[3,-3,-1.5],
	"[4,0,2]":[3,-3,0],
	"[4,0,3]":[3,-3,1.5],
	"[4,0,4]":[3,-3,3],
	"[4,1,0]":[3,-1.5,-3],
	"[4,1,1]":[3,-1.5,-1.5],
	"[4,1,2]":[3,-1.5,0],
	"[4,1,3]":[3,-1.5,1.5],
	"[4,1,4]":[3,-1.5,3],
	"[4,2,0]":[3,0,-3],
	"[4,2,1]":[3,0,-1.5],
	"[4,2,2]":[3,0,0],
	"[4,2,3]":[3,0,1.5],
	"[4,2,4]":[3,0,3],
	"[4,3,0]":[3,1.5,-3],
	"[4,3,1]":[3,1.5,-1.5],
	"[4,3,2]":[3,1.5,0],
	"[4,3,3]":[3,1.5,1.5],
	"[4,3,4]":[3,1.5,3],
	"[4,4,0]":[3,3,-3],
	"[4,4,1]":[3,3,-1.5],
	"[4,4,2]":[3,3,0],
	"[4,4,3]":[3,3,1.5],
	"[4,4,4]":[3,3,3]
}

const swapMap = {
	"[1,0,1]":[-1.5,-4.5,-1.5],
	"[1,4,1]":[-1.5,4.5,-1.5],
	"[1,1,0]":[-1.5,-1.5,-4.5],
	"[1,1,4]":[-1.5,-1.5,4.5],
	"[0,1,1]":[-4.5,-1.5,-1.5],
	"[4,1,1]":[4.5,-1.5,-1.5],
	"[2,0,1]":[0,-4.5,-1.5],
	"[2,4,1]":[0,4.5,-1.5],
	"[2,1,0]":[0,-1.5,-4.5],
	"[2,1,4]":[0,-1.5,4.5],
	"[0,2,1]":[-4.5,0,-1.5],
	"[4,2,1]":[4.5,0,0],
	"[3,0,1]":[1.5,-4.5,-1.5],
	"[3,4,1]":[1.5,4.5,-1.5],
	"[3,1,0]":[1.5,-1.5,-4.5],
	"[3,1,4]":[1.5,-1.5,4.5],
	"[0,3,1]":[-4.5,1.5,-1.5],
	"[4,3,1]":[4.5,1.5,1.5],
	"[1,0,2]":[-1.5,-4.5,0],
	"[1,4,2]":[-1.5,4.5,0],
	"[1,2,0]":[-1.5,0,-4.5],
	"[1,2,4]":[-1.5,0,4.5],
	"[0,1,2]":[-4.5,-1.5,0],
	"[4,1,2]":[4.5,-1.5,-1.5],
	"[2,0,2]":[0,-4.5,0],
	"[2,4,2]":[0,4.5,0],
	"[2,2,0]":[0,0,-4.5],
	"[2,2,4]":[0,0,4.5],
	"[0,2,2]":[-4.5,0,0],
	"[4,2,2]":[4.5,0,0],
	"[3,0,2]":[1.5,-4.5,0],
	"[3,4,2]":[1.5,4.5,0],
	"[3,2,0]":[1.5,0,-4.5],
	"[3,2,4]":[1.5,0,4.5],
	"[0,3,2]":[-4.5,1.5,0],
	"[4,3,2]":[4.5,1.5,1.5],
	"[1,0,3]":[-1.5,-4.5,1.5],
	"[1,4,3]":[-1.5,4.5,1.5],
	"[1,3,0]":[-1.5,1.5,-4.5],
	"[1,3,4]":[-1.5,1.5,4.5],
	"[0,1,3]":[-4.5,-1.5,1.5],
	"[4,1,3]":[4.5,-1.5,-1.5],
	"[2,0,3]":[0,-4.5,1.5],
	"[2,4,3]":[0,4.5,1.5],
	"[2,3,0]":[0,1.5,-4.5],
	"[2,3,4]":[0,1.5,4.5],
	"[0,2,3]":[-4.5,0,1.5],
	"[4,2,3]":[4.5,0,0],
	"[3,0,3]":[1.5,-4.5,1.5],
	"[3,4,3]":[1.5,4.5,1.5],
	"[3,3,0]":[1.5,1.5,-4.5],
	"[3,3,4]":[1.5,1.5,4.5],
	"[0,3,3]":[-4.5,1.5,1.5],
	"[4,3,3]":[4.5,1.5,1.5],
	"[1,0,0]":[-1.5,-4.5,-4.5],
	"[1,4,0]":[-1.5,4.5,-4.5],
	"[0,1,0]":[-4.5,-1.5,-4.5],
	"[0,1,4]":[-4.5,-1.5,4.5],
	"[0,0,1]":[-4.5,-4.5,-1.5],
	"[4,0,1]":[4.5,-4.5,-1.5],
	"[2,0,0]":[0,-4.5,-4.5],
	"[2,4,0]":[0,4.5,-4.5],
	"[0,2,0]":[-4.5,0,-4.5],
	"[0,2,4]":[-4.5,0,4.5],
	"[0,0,2]":[-4.5,-4.5,0],
	"[4,0,2]":[4.5,-4.5,0],
	"[3,0,0]":[1.5,-4.5,-4.5],
	"[3,4,0]":[1.5,4.5,-4.5],
	"[0,3,0]":[-4.5,1.5,-4.5],
	"[0,3,4]":[-4.5,1.5,4.5],
	"[0,0,3]":[-4.5,-4.5,1.5],
	"[4,0,3]":[4.5,-4.5,1.5],
	"[1,0,4]":[-1.5,-4.5,4.5],
	"[1,4,4]":[-1.5,4.5,4.5],
	"[4,1,0]":[4.5,-1.5,-4.5],
	"[4,1,4]":[4.5,-1.5,4.5],
	"[0,4,1]":[-4.5,4.5,-1.5],
	"[4,4,1]":[4.5,4.5,-1.5],
	"[2,0,4]":[0,-4.5,4.5],
	"[2,4,4]":[0,4.5,4.5],
	"[4,2,0]":[4.5,0,-4.5],
	"[4,2,4]":[4.5,0,4.5],
	"[0,4,2]":[-4.5,4.5,0],
	"[4,4,2]":[4.5,4.5,0],
	"[3,0,4]":[1.5,-4.5,4.5],
	"[3,4,4]":[1.5,4.5,4.5],
	"[4,3,0]":[4.5,1.5,-4.5],
	"[4,3,4]":[4.5,1.5,4.5],
	"[0,4,3]":[-4.5,4.5,1.5],
	"[4,4,3]":[4.5,4.5,1.5],
	"[0,0,0]":[-4.5,-4.5,-4.5],
	"[0,0,4]":[-4.5,-4.5,4.5],
	"[0,4,0]":[-4.5,4.5,-4.5],
	"[0,4,4]":[-4.5,4.5,4.5],
	"[4,0,0]":[4.5,-4.5,-4.5],
	"[4,0,4]":[4.5,-4.5,4.5],
	"[4,4,0]":[4.5,4.5,-4.5],
	"[4,4,4]":[4.5,4.5,4.5],
	"[1,1,1]":[-6,4.5,4.5],
	"[1,1,2]":[-6,4.5,3],
	"[1,1,3]":[-6,4.5,1.5],
	"[1,2,1]":[-6,4.5,0],
	"[1,2,2]":[-6,4.5,-1.5],
	"[1,2,3]":[-6,4.5,-3],
	"[1,3,1]":[-6,4.5,-4.5],
	"[1,3,2]":[-6,3,4.5],
	"[1,3,3]":[-6,3,3],
	"[2,1,1]":[-6,3,1.5],
	"[2,1,2]":[-6,3,0],
	"[2,1,3]":[-6,3,-1.5],
	"[2,2,1]":[-6,3,-3],
	"[2,2,2]":[-6,3,-4.5],
	"[2,2,3]":[-6,1.5,4.5],
	"[2,3,1]":[-6,1.5,3],
	"[2,3,2]":[-6,1.5,1.5],
	"[2,3,3]":[-6,1.5,0],
	"[3,1,1]":[-6,1.5,-1.5],
	"[3,1,2]":[-6,1.5,-3],
	"[3,1,3]":[-6,1.5,-4.5],
	"[3,2,1]":[-6,0,4.5],
	"[3,2,2]":[-6,0,3],
	"[3,2,3]":[-6,0,1.5],
	"[3,3,1]":[-6,0,0],
	"[3,3,2]":[-6,0,-1.5],
	"[3,3,3]":[-6,0,-3]
}

function addMatrix(M1, M2) {
	return M1.map((r, i) => r + M2[i]);
}

async function translateCube(box1, box2, targetPosBox1, targetPosBox2, text1, text2, targetPosText1, targetPosText2, interval, timePartition) {
	return new Promise(resolve => {
		let counter = 1;
		box1.position.lerp(new THREE.Vector3(targetPosBox1[0], targetPosBox1[1], targetPosBox1[2]), counter / timePartition);
		box2.position.lerp(new THREE.Vector3(targetPosBox2[0], targetPosBox2[1], targetPosBox2[2]), counter / timePartition);
	
		text1.position.lerp(new THREE.Vector3(targetPosText1[0], targetPosText1[1], targetPosText1[2]), counter / timePartition);
		text2.position.lerp(new THREE.Vector3(targetPosText2[0], targetPosText2[1], targetPosText2[2]), counter / timePartition);
		render();
		let animateInterval = setInterval(() => {
			box1.position.lerp(new THREE.Vector3(targetPosBox1[0], targetPosBox1[1], targetPosBox1[2]), counter / timePartition);
			box2.position.lerp(new THREE.Vector3(targetPosBox2[0], targetPosBox2[1], targetPosBox2[2]), counter / timePartition);
		
			text1.position.lerp(new THREE.Vector3(targetPosText1[0], targetPosText1[1], targetPosText1[2]), counter / timePartition);
			text2.position.lerp(new THREE.Vector3(targetPosText2[0], targetPosText2[1], targetPosText2[2]), counter / timePartition);
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
	return new Promise(resolve => {
		translateCube(box1, box2, targetPosBox1, targetPosBox2, text1, text2, targetPosText1, targetPosText2, interval, timePartition).then(()=>{
			box1.position.set(pos[0][0], pos[0][1], pos[0][2]);
			box2.position.set(pos[1][0], pos[1][1], pos[1][2]);
			text1.position.set(targetPosText1[0], targetPosText1[1], targetPosText1[2]);
			text2.position.set(targetPosText2[0], targetPosText2[1], targetPosText2[2]);
			render();
			resolve();
		});
	});
}

async function swapCube(coord1, coord2, interval, timePartition) {
	return new Promise(resolve => {
		let pos1 = swapMap[JSON.stringify(coord1)];
		let pos2 = swapMap[JSON.stringify(coord2)];
		moveCube([coord1, coord2], [pos1, pos2], interval, timePartition).then(()=>{
			let pos1 = initialMap[JSON.stringify(coord1)];
			let pos2 = initialMap[JSON.stringify(coord2)];
			moveCube([coord1, coord2], [pos2, pos1], interval, timePartition).then(()=>{
				[cubeinstance[coord1[0]][coord1[1]][coord1[2]], cubeinstance[coord2[0]][coord2[1]][coord2[2]]] = [cubeinstance[coord2[0]][coord2[1]][coord2[2]], cubeinstance[coord1[0]][coord1[1]][coord1[2]]];
				[textinstance[coord1[0]][coord1[1]][coord1[2]], textinstance[coord2[0]][coord2[1]][coord2[2]]] = [textinstance[coord2[0]][coord2[1]][coord2[2]], textinstance[coord1[0]][coord1[1]][coord1[2]]];
				resolve();
			});
		});
	});
}

generateCube([25,16,80,104,90,115,98,4,1,97,42,111,85,2,75,66,72,27,102,48,67,18,119,106,5,91,77,71,6,70,52,64,117,69,13,30,118,21,123,23,26,39,92,44,114,116,17,14,73,95,47,61,45,76,86,107,43,38,33,94,89,68,63,58,37,32,93,88,83,19,40,50,81,65,79,31,53,112,109,10,12,82,34,87,100,103,3,105,8,96,113,57,9,62,74,56,120,55,49,35,121,108,7,20,59,29,28,122,125,11,51,15,41,124,84,78,54,99,24,60,36,110,46,22,101]);

async function doSwap(interval=10, timePartition=10) {
	await swapCube([4, 2, 4], [0, 4, 0], interval, timePartition);
	await swapCube([2, 1, 0], [0, 4, 3], interval, timePartition);
	await swapCube([4, 0, 0], [1, 3, 1], interval, timePartition);
	await swapCube([2, 3, 2], [3, 4, 0], interval, timePartition);
	await swapCube([3, 1, 1], [4, 1, 0], interval, timePartition);
	await swapCube([2, 0, 0], [4, 0, 2], interval, timePartition);
	await swapCube([0, 1, 2], [1, 1, 2], interval, timePartition);
	await swapCube([4, 3, 0], [4, 3, 1], interval, timePartition);
	await swapCube([0, 2, 3], [3, 4, 4], interval, timePartition);
	await swapCube([4, 4, 1], [2, 3, 3], interval, timePartition);
	await swapCube([1, 4, 4], [2, 2, 3], interval, timePartition);
	await swapCube([4, 4, 2], [2, 2, 1], interval, timePartition);
	await swapCube([1, 3, 2], [2, 0, 1], interval, timePartition);
	await swapCube([0, 1, 1], [0, 0, 1], interval, timePartition);
	await swapCube([4, 2, 4], [1, 2, 1], interval, timePartition);
	await swapCube([3, 0, 1], [0, 0, 3], interval, timePartition);
	await swapCube([2, 4, 0], [2, 3, 0], interval, timePartition);
	await swapCube([2, 1, 4], [2, 3, 1], interval, timePartition);
	await swapCube([3, 0, 3], [2, 1, 3], interval, timePartition);
	await swapCube([1, 0, 4], [0, 3, 1], interval, timePartition);
	await swapCube([1, 1, 3], [1, 3, 1], interval, timePartition);
	await swapCube([4, 3, 1], [4, 2, 0], interval, timePartition);
	await swapCube([1, 0, 0], [3, 0, 2], interval, timePartition);
	await swapCube([0, 2, 2], [0, 4, 4], interval, timePartition);
	await swapCube([2, 0, 2], [1, 4, 3], interval, timePartition);
	await swapCube([0, 2, 4], [3, 4, 1], interval, timePartition);
	await swapCube([0, 0, 4], [1, 3, 1], interval, timePartition);
	await swapCube([4, 3, 3], [0, 0, 4], interval, timePartition);
	await swapCube([2, 0, 4], [0, 1, 2], interval, timePartition);
	await swapCube([2, 4, 2], [0, 3, 3], interval, timePartition);
	await swapCube([0, 4, 0], [4, 4, 2], interval, timePartition);
	await swapCube([2, 3, 1], [0, 0, 1], interval, timePartition);
	await swapCube([2, 4, 2], [4, 4, 3], interval, timePartition);
	await swapCube([1, 3, 1], [1, 1, 1], interval, timePartition);
	await swapCube([4, 4, 4], [0, 2, 3], interval, timePartition);
	await swapCube([3, 1, 0], [2, 0, 0], interval, timePartition);
	await swapCube([3, 4, 1], [0, 1, 3], interval, timePartition);
	await swapCube([2, 0, 0], [0, 2, 0], interval, timePartition);
	await swapCube([1, 3, 0], [3, 4, 4], interval, timePartition);
	await swapCube([3, 4, 2], [1, 3, 1], interval, timePartition);
	await swapCube([3, 0, 3], [2, 4, 0], interval, timePartition);
	await swapCube([1, 4, 4], [4, 2, 1], interval, timePartition);
	await swapCube([1, 2, 0], [1, 4, 4], interval, timePartition);
	await swapCube([0, 2, 0], [0, 1, 0], interval, timePartition);
	await swapCube([4, 2, 2], [3, 4, 3], interval, timePartition);
	await swapCube([3, 4, 0], [0, 0, 4], interval, timePartition);
	await swapCube([0, 1, 0], [3, 1, 1], interval, timePartition);
	await swapCube([0, 2, 0], [1, 4, 1], interval, timePartition);
	await swapCube([2, 0, 3], [0, 0, 3], interval, timePartition);
	await swapCube([2, 1, 0], [0, 3, 4], interval, timePartition);
	await swapCube([3, 2, 3], [3, 1, 4], interval, timePartition);
	await swapCube([4, 0, 0], [2, 0, 4], interval, timePartition);
	await swapCube([1, 0, 2], [1, 3, 1], interval, timePartition);
	await swapCube([1, 0, 2], [1, 2, 4], interval, timePartition);
	await swapCube([1, 0, 2], [0, 2, 1], interval, timePartition);
	await swapCube([2, 2, 1], [1, 4, 2], interval, timePartition);
	await swapCube([2, 0, 1], [3, 4, 1], interval, timePartition);
	await swapCube([4, 1, 1], [1, 4, 3], interval, timePartition);
	await swapCube([4, 0, 2], [4, 2, 3], interval, timePartition);
	await swapCube([4, 2, 4], [0, 4, 1], interval, timePartition);
	await swapCube([3, 0, 1], [0, 2, 4], interval, timePartition);
	await swapCube([4, 4, 1], [4, 1, 2], interval, timePartition);
	await swapCube([3, 2, 1], [3, 2, 3], interval, timePartition);
	await swapCube([1, 3, 3], [2, 3, 1], interval, timePartition);
	await swapCube([3, 4, 1], [2, 3, 3], interval, timePartition);
	await swapCube([4, 3, 4], [3, 4, 2], interval, timePartition);
	await swapCube([0, 4, 1], [2, 0, 1], interval, timePartition);
	await swapCube([0, 2, 3], [4, 2, 2], interval, timePartition);
	await swapCube([2, 0, 3], [1, 1, 4], interval, timePartition);
	await swapCube([2, 4, 4], [3, 3, 0], interval, timePartition);
	await swapCube([0, 4, 3], [1, 4, 3], interval, timePartition);
	await swapCube([3, 3, 3], [4, 3, 1], interval, timePartition);
	await swapCube([2, 4, 3], [1, 4, 1], interval, timePartition);
	await swapCube([4, 3, 0], [0, 0, 4], interval, timePartition);
	await swapCube([4, 3, 2], [0, 2, 3], interval, timePartition);
	await swapCube([0, 1, 1], [0, 3, 3], interval, timePartition);
	await swapCube([3, 0, 2], [1, 3, 1], interval, timePartition);
	await swapCube([2, 1, 1], [4, 2, 3], interval, timePartition);
	await swapCube([2, 4, 4], [3, 4, 4], interval, timePartition);
	await swapCube([2, 4, 4], [2, 2, 3], interval, timePartition);
	await swapCube([1, 3, 3], [2, 1, 3], interval, timePartition);
	await swapCube([1, 3, 2], [2, 3, 4], interval, timePartition);
	await swapCube([0, 1, 4], [2, 0, 0], interval, timePartition);
	await swapCube([1, 0, 0], [0, 1, 4], interval, timePartition);
	await swapCube([3, 2, 2], [4, 0, 4], interval, timePartition);
	await swapCube([2, 2, 4], [0, 2, 4], interval, timePartition);
	await swapCube([3, 2, 3], [2, 4, 1], interval, timePartition);
	await swapCube([4, 2, 4], [0, 0, 2], interval, timePartition);
	await swapCube([1, 1, 3], [4, 3, 0], interval, timePartition);
	await swapCube([3, 4, 4], [1, 1, 4], interval, timePartition);
	await swapCube([0, 2, 3], [4, 0, 0], interval, timePartition);
	await swapCube([1, 1, 4], [1, 0, 2], interval, timePartition);
	await swapCube([0, 0, 1], [0, 3, 2], interval, timePartition);
	await swapCube([1, 4, 2], [1, 2, 1], interval, timePartition);
	await swapCube([0, 4, 2], [0, 1, 0], interval, timePartition);
	await swapCube([3, 3, 2], [4, 4, 0], interval, timePartition);
	await swapCube([4, 2, 0], [0, 4, 0], interval, timePartition);
	await swapCube([3, 4, 4], [1, 0, 3], interval, timePartition);
	await swapCube([0, 0, 1], [2, 0, 4], interval, timePartition);
	await swapCube([1, 3, 0], [1, 4, 1], interval, timePartition);
}

setTimeout(doSwap, 2000);

function resizeRendererToDisplaySize( renderer ) {

	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	if ( needResize ) {

		renderer.setSize( width, height, false );

	}

	return needResize;

}

let renderRequested = false;

function render() {

	renderRequested = undefined;

	if ( resizeRendererToDisplaySize( renderer ) ) {

		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}

	for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				for (let k = 0; k < 5; k++) {
					textinstance[i][j][k].lookAt( camera.position );
				}
			}
		}

	renderer.render( scene, camera );

}

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	render();
}

window.onload = () => animate;

function requestRenderIfNotRequested() {

	if ( ! renderRequested ) {

		renderRequested = true;
		requestAnimationFrame( render );

	}

}

controls.addEventListener( 'change', requestRenderIfNotRequested );
window.addEventListener( 'resize', requestRenderIfNotRequested );