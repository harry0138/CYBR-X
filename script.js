const loader=document.getElementById('loader');
window.addEventListener('load',()=>setTimeout(()=>{loader.style.opacity='0';loader.style.visibility='hidden'},1700));
const cursor=document.querySelector('.cursor');
let mouseX=innerWidth/2,mouseY=innerHeight/2,rx=mouseX,ry=mouseY;
window.addEventListener('pointermove',e=>{mouseX=e.clientX;mouseY=e.clientY});
function cursorLoop(){rx+=(mouseX-rx)*.16;ry+=(mouseY-ry)*.16;cursor.style.left=rx+'px';cursor.style.top=ry+'px';requestAnimationFrame(cursorLoop)}cursorLoop();
document.querySelectorAll('a,.event-card').forEach(el=>{el.addEventListener('mouseenter',()=>{cursor.style.width='46px';cursor.style.height='46px'});el.addEventListener('mouseleave',()=>{cursor.style.width='22px';cursor.style.height='22px'})});
const reveals=document.querySelectorAll('.reveal');const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.2});reveals.forEach(x=>io.observe(x));
const progress=document.querySelector('.progress i');window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.height=(scrollY/Math.max(1,max)*100)+'px'});
// Three.js atmospheric scene
if(window.THREE){
 const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x05070b,.018);
 const camera=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,500);camera.position.set(0,0,15);
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setSize(innerWidth,innerHeight);document.getElementById('scene').appendChild(renderer.domElement);
 const starGeo=new THREE.BufferGeometry();const count=1800;const pos=new Float32Array(count*3);for(let i=0;i<count;i++){pos[i*3]=(Math.random()-.5)*90;pos[i*3+1]=(Math.random()-.5)*55;pos[i*3+2]=(Math.random()-.5)*90}starGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));const stars=new THREE.Points(starGeo,new THREE.PointsMaterial({color:0x8bdfff,size:.045,transparent:true,opacity:.7}));scene.add(stars);
 const group=new THREE.Group();scene.add(group);const geo=new THREE.IcosahedronGeometry(2.5,1);const mat=new THREE.MeshBasicMaterial({color:0x102833,wireframe:true,transparent:true,opacity:.35});const core=new THREE.Mesh(geo,mat);group.add(core);const inner=new THREE.Mesh(new THREE.IcosahedronGeometry(1.65,1),new THREE.MeshBasicMaterial({color:0x071016,wireframe:true,transparent:true,opacity:.55}));group.add(inner);
 const torus=new THREE.Mesh(new THREE.TorusGeometry(3.6,.012,8,160),new THREE.MeshBasicMaterial({color:0x61ddff,transparent:true,opacity:.5}));torus.rotation.x=Math.PI/2.5;group.add(torus);const torus2=torus.clone();torus2.material=torus.material.clone();torus2.material.color.setHex(0xff8d49);torus2.rotation.x=-Math.PI/2.8;torus2.rotation.z=.7;group.add(torus2);
 const light=new THREE.PointLight(0x61ddff,8,25);light.position.set(2,3,5);scene.add(light);const light2=new THREE.PointLight(0xff8d49,5,20);light2.position.set(-5,-3,2);scene.add(light2);
 let tx=0,ty=0,cx=0,cy=0;window.addEventListener('pointermove',e=>{tx=(e.clientX/innerWidth-.5);ty=(e.clientY/innerHeight-.5)});
 function animate(){requestAnimationFrame(animate);cx+=(tx-cx)*.025;cy+=(ty-cy)*.025;group.rotation.y+=.0018;group.rotation.x+=.0006;group.position.x=cx*2.8;group.position.y=-cy*1.7;group.rotation.y+=cx*.0008;stars.rotation.y+=.00012;camera.position.x=cx*1.1;camera.position.y=-cy*.7;camera.lookAt(0,0,0);renderer.render(scene,camera)}animate();
 window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
}
