let audio;
export function burst(element,celebrate=true){
 if(!element)return;const rect=element.getBoundingClientRect();const x=rect.left+rect.width/2,y=rect.top+rect.height/2,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const root=document.createElement('div');root.className='burst-layer';document.body.append(root);
 for(let i=0;i<(reduced?6:34);i++){const p=document.createElement('i');const angle=Math.PI*2*i/34;const distance=35+Math.random()*140;p.className='pop-particle';p.style.cssText=`left:${x}px;top:${y}px;--dx:${Math.cos(angle)*distance}px;--dy:${Math.sin(angle)*distance}px;--color:${['#ffc6ed','#b8fff1','#c2afff','#ffdc97'][i%4]};--spin:${Math.random()*500}deg`;root.append(p)}
 const ring=document.createElement('i');ring.className='pop-ring';ring.style.cssText=`left:${x}px;top:${y}px`;root.append(ring);
 if(celebrate){const text=document.createElement('strong');text.className='pop-word';text.textContent=['!POP','!עשית את זה','!איזה שחרור'][Math.floor(Math.random()*3)];text.style.cssText=`left:${x}px;top:${y}px`;root.append(text)}
 element.classList.add('bursting');setTimeout(()=>root.remove(),1200);
 if(localStorage.getItem('pop-sound')==='on'){try{audio??=new AudioContext();audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.connect(g);g.connect(audio.destination);o.frequency.setValueAtTime(650,audio.currentTime);o.frequency.exponentialRampToValueAtTime(80,audio.currentTime+.16);g.gain.setValueAtTime(.12,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.2);o.start();o.stop(audio.currentTime+.21)}catch{}}
}
