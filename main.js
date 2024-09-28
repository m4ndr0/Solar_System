import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import FakeGlowMaterial from './FakeGlowMaterial.js'


import starsImage from '/background_images/milky_way4.png'

import sunTexture from '/textures/sun_texture.jpg'
import mercuryTexture from '/textures/mercury_texture.jpg'
import venusTexture from '/textures/venus_atmosphere.jpg'
import earthTexture from '/textures/earth_texture.jpg'
import moonTexture from '/textures/moon_texture.jpg'
import marsTexture from '/textures/mars_texture.jpg'
import jupiterTexture from '/textures/jupiter_texture.jpg'
import saturnTexture from '/textures/saturn_texture.jpg'
import saturnRingTexture from '/textures/saturn_ring_texture.png'
import uranusTexture from '/textures/uranus_texture.jpg'
import neptuneTexture from '/textures/neptune_texture.jpg'

//element hosting the 3D scene
const canvas = document.getElementById('canvas')

//initializing the scene
const scene = new THREE.Scene();

//initializing the camera
const camera = new THREE.PerspectiveCamera( 
	55, 
	window.innerWidth / window.innerHeight, 
	0.1, 
	1000 
);


//initializing the rendere
const renderer = new THREE.WebGLRenderer({
	antialias: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
const maxPixelRatio = Math.min(window.devicePixelRatio, 2)
renderer.setPixelRatio(maxPixelRatio.devicePixelRatio)

canvas.appendChild( renderer.domElement );

//initializing orbit controls
const orbit = new OrbitControls(camera, renderer.domElement)
orbit.enableDamping = true
//orbit.update() "moved into the renderLoop"

//initializing ambient light
const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

//initializing spot light
const pointLight = new THREE.PointLight(0xFFFFFF, 200, 5000.0)
scene.add(pointLight)


//initializing cubeTextureLoader
const cubeTextureLoader = new THREE.CubeTextureLoader()
scene.background = cubeTextureLoader.load([
	starsImage,
	starsImage,
	starsImage,
	starsImage,
	starsImage,
	starsImage,
])

//initialize textureLoader
const textureLoader = new THREE.TextureLoader()


//initializing planet geometry
const sunGeo = new THREE.SphereGeometry( 1, 64, 32 );
const sunGlowGeo = new THREE.SphereGeometry( 1.8, 64, 32 );
const mercuryGeo = new THREE.SphereGeometry( 0.1, 64, 32 )
const venusGeo = new THREE.SphereGeometry( 0.2, 64, 32 )
const earthGeo = new THREE.SphereGeometry( 0.201, 64, 32 )
const moonGeo = new THREE.SphereGeometry( 0.03, 64, 32 )
const marsGeo = new THREE.SphereGeometry( 0.13, 64, 32 )
const jupiterGeo = new THREE.SphereGeometry( 0.5, 64, 32 )
const saturnGeo = new THREE.SphereGeometry( 0.445, 64, 32 )
const saturnRingGeo = new THREE.RingGeometry( 0.58, 0.85, 32 )
const uranusGeo = new THREE.SphereGeometry( 0.345, 64, 32 )
const neptuneGeo = new THREE.SphereGeometry( 0.345, 64, 32 )

//initializing planet materials
const sunMaterial = new THREE.MeshBasicMaterial({
	map: textureLoader.load(sunTexture),
	color: '#ECEC29',
});

const sunGlowMaterial = new FakeGlowMaterial({
	opacity: 0.2,
	glowColor: '#ECEC29',
	glowSharpness: 0.2,
	falloff: 0.5
})

const mercuryMaterial = new THREE.MeshStandardMaterial({
	map: textureLoader.load(mercuryTexture)
})
const venusMaterial = new THREE.MeshStandardMaterial({
	map: textureLoader.load(venusTexture)
})
const earthMaterial = new THREE.MeshStandardMaterial({
	map: textureLoader.load(earthTexture)
})
const moonMaterial = new THREE.MeshStandardMaterial({
	map: textureLoader.load(moonTexture)
})
const marsMaterial = new THREE.MeshStandardMaterial({
	map: textureLoader.load(marsTexture)
})
const jupiterMaterial = new THREE.MeshStandardMaterial({
	map: textureLoader.load(jupiterTexture)
})
const saturnMaterial = new THREE.MeshStandardMaterial({
	map: textureLoader.load(saturnTexture)
})
const saturnRingMaterial = new THREE.MeshStandardMaterial({
	map: textureLoader.load(saturnRingTexture),
	side: THREE.DoubleSide
})
const uranusMaterial = new THREE.MeshStandardMaterial({
	map: textureLoader.load(uranusTexture)
})
const neptuneMaterial = new THREE.MeshStandardMaterial({
	map: textureLoader.load(neptuneTexture)
})





//initializing Mesh
const sun = new THREE.Mesh( sunGeo, sunMaterial );
const sunGlow = new THREE.Mesh( sunGlowGeo, sunGlowMaterial );
const mercury = new THREE.Mesh( mercuryGeo, mercuryMaterial );
const venus = new THREE.Mesh( venusGeo, venusMaterial );
const earth = new THREE.Mesh( earthGeo, earthMaterial );
const moon = new THREE.Mesh( moonGeo, moonMaterial );
const mars = new THREE.Mesh( marsGeo, marsMaterial );
const jupiter = new THREE.Mesh( jupiterGeo, jupiterMaterial );
const saturn = new THREE.Mesh( saturnGeo, saturnMaterial );
const saturnRing = new THREE.Mesh( saturnRingGeo, saturnRingMaterial );
const uranus = new THREE.Mesh( uranusGeo, uranusMaterial );
const neptune = new THREE.Mesh( neptuneGeo, neptuneMaterial );



//initializing virtual object HIDDEN (used for having different orbit speeds)
const mercuryFather = new THREE.Object3D()
const venusFather = new THREE.Object3D()
const earthFather = new THREE.Object3D()
const marsFather = new THREE.Object3D()
const jupiterFather = new THREE.Object3D()
const saturnFather = new THREE.Object3D()
const uranusFather = new THREE.Object3D()
const neptuneFather = new THREE.Object3D()

//adding mesh to parent element
sun.add(sunGlow)
mercuryFather.add( mercury )
venusFather.add( venus )
earthFather.add( earth )
earth.add( moon )
marsFather.add( mars )
jupiterFather.add( jupiter )
saturnFather.add( saturn )
saturn.add(saturnRing)
uranusFather.add( uranus )
neptuneFather.add( neptune )


//adding mesh to scene
scene.add( sun, mercuryFather, venusFather, earthFather, marsFather, jupiterFather, saturnFather, uranusFather, neptuneFather );




//setting planet position
mercury.position.x = 3
venus.position.x = 5
earth.position.x = 7
moon.position.x = 0.4
mars.position.x = 9
jupiter.position.x = 12
saturn.position.x = 16
uranus.position.x = 19
neptune.position.x = 22

//rotating Saturn's ring
saturnRing.rotateX(5)
saturnRing.rotateY(-0.5)

//positioning the camera
camera.position.x = 0
camera.position.y = 13
camera.position.z = 20;

scene.rotateY(1)

function animate() {
	sun.rotation.y += 0.001;
	mercury.rotation.y += 0.01;
	venus.rotation.y += 0.01;
	earth.rotation.y += 0.01;
	moon.rotation.y += 0.002;
	mars.rotation.y += 0.02;
	jupiter.rotation.y += 0.004;
	saturn.rotation.y += 0.0041;
	uranus.rotation.y += 0.0047;
	neptune.rotation.y += 0.005;
	 
	mercuryFather.rotation.y += 0.01;
	venusFather.rotation.y += 0.0095;
	earthFather.rotation.y += 0.009;
	marsFather.rotation.y += 0.0084;
	jupiterFather.rotation.y += 0.007;
	saturnFather.rotation.y += 0.0065;
	uranusFather.rotation.y += 0.006;
	neptuneFather.rotation.y += 0.0055;

  	//renderinng the scene
	renderer.render( scene, camera );
	orbit.update()


}

renderer.setAnimationLoop( animate );

//resize the rendering according to the screen size
window.addEventListener('resize', function() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth , window.innerHeight)
})
