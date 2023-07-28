var h=Object.defineProperty;var o=(n,t,e)=>t in n?h(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var s=(n,t,e)=>(o(n,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();class u{constructor(){s(this,"health");s(this,"hunger");s(this,"energy");s(this,"fun");s(this,"state");s(this,"isPlaying");s(this,"isSleeping");s(this,"isEating");s(this,"timeOfGame");s(this,"timer");s(this,"displayHealth",t=>{const e=document.querySelector(t);this.health.value===10?(e.style.fontSize="40px",e.style.letterSpacing="-0.15em"):e.removeAttribute("style"),e.innerText=this.health.value.toString()});s(this,"displayHunger",t=>{const e=document.querySelector(t);this.hunger.value===10?(e.style.fontSize="40px",e.style.letterSpacing="-0.15em"):e.removeAttribute("style"),e.innerText=this.hunger.value.toString()});s(this,"displayEnergy",t=>{const e=document.querySelector(t);this.energy.value===10?(e.style.fontSize="40px",e.style.letterSpacing="-0.15em"):e.removeAttribute("style"),e.innerText=this.energy.value.toString()});s(this,"displayFun",t=>{const e=document.querySelector(t);this.fun.value===10?(e.style.fontSize="40px",e.style.letterSpacing="-0.15em"):e.removeAttribute("style"),e.innerText=this.fun.value.toString()});s(this,"mount",({healthElement:t,hungerElement:e,energyElement:l,funElement:i})=>{document.querySelector(".action-buttons__gameon").addEventListener("click",this.handleActions.bind(this)),this.displayHealth(t),this.displayHunger(e),this.displayEnergy(l),this.displayFun(i),this.setState(),this.setActionButtons(),this.timer=setInterval(()=>{this.handleParameters(),this.setState(),this.timeOfGame++,console.log(this.timeOfGame+" seconds passed")},1e3)});s(this,"startFeeding",()=>{this.state!=="dead"&&(this.isEating=!0,this.setState())});s(this,"stopFeeding",()=>{this.isEating=!1,this.setState()});s(this,"startSleeping",()=>{this.state!=="dead"&&(this.isSleeping=!0,this.setState())});s(this,"stopSleeping",()=>{this.isSleeping=!1,this.setState()});s(this,"startPlaying",()=>{this.state!=="dead"&&(this.isPlaying=!0,this.setState())});s(this,"stopPlaying",()=>{this.isPlaying=!1,this.setState()});this.health={value:10,importance:1},this.hunger={value:10,importance:3},this.energy={value:10,importance:2},this.fun={value:10,importance:4},this.state="happy",this.isPlaying=!1,this.isSleeping=!1,this.isEating=!1,this.timeOfGame=0,console.log("Tamagotchi initialized")}updateDisplay(){this.displayHealth(".health"),this.displayHunger(".hunger"),this.displayEnergy(".energy"),this.displayFun(".fun")}setActionButtons(){const t=document.querySelector(".action-buttons__gameon"),e=document.querySelector(".action-buttons__gameover");this.state==="dead"?(t.classList.remove("active"),t.setAttribute("disabled","true"),e.classList.add("active"),e.setAttribute("disabled","false"),clearInterval(this.timer),console.log(`time of game ${this.timeOfGame}`)):(t.className="action-buttons__gameon active",t.setAttribute("disabled","false"),e.className="action-buttons__gameover",e.setAttribute("disabled","false"))}handleParameters(){this.energy.value>0&&!this.isSleeping?(this.energy.importance-=1,this.energy.importance<=0&&(this.energy.value-=1,this.energy.importance=2)):this.isSleeping&&this.energy.value<10&&(this.energy.value===9?this.energy.value++:this.energy.value+=2),this.hunger.value>0&&!this.isEating?this.hunger.value-=1:this.isEating&&this.hunger.value<10&&(this.hunger.value===9?this.hunger.value++:this.hunger.value+=2),this.fun.value>0&&!this.isPlaying?this.fun.value-=1:this.isPlaying&&this.fun.value<10&&(this.fun.value===9?this.fun.value++:this.fun.value+=2,this.energy.value>0&&(this.energy.value-=1)),(this.hunger.value<=0||this.energy.value<=0)&&this.health.value>0&&(this.health.value-=1),this.fun.value<=0&&!this.isSleeping&&(this.energy.importance-=.5,this.energy.importance<=0&&this.energy.value>0&&(this.energy.value-=1,this.energy.importance=2)),this.updateDisplay()}setState(){this.health.value<=0?this.state="dead":this.isEating?this.state="eating":this.isSleeping?this.state="sleeping":this.isPlaying?this.state="playing":this.hunger.value<=6?this.state="hungry":this.energy.value<=6?this.state="sleepy":this.fun.value<=6?this.state="sad":this.state="happy",this.setAvatar(),this.setActionButtons()}setAvatar(){const t=document.querySelector(".display__tamagotchi"),e=document.querySelector(".display__tamagotchi-status");t.className=`display__tamagotchi display__tamagotchi--${this.state}`,e.textContent=this.state.toUpperCase()}handleActions(t){const e=document.querySelector(".action-buttons__gameon"),l=t.target;l!==e&&(l.closest(".action-button--hunger")&&(this.isEating?this.stopFeeding():(this.isPlaying=!1,this.isSleeping=!1,this.startFeeding())),l.closest(".action-button--sleep")&&(this.isSleeping?this.stopSleeping():(this.isEating=!1,this.isPlaying=!1,this.startSleeping())),l.closest(".action-button--fun")&&(this.isPlaying?this.stopPlaying():(this.isEating=!1,this.isSleeping=!1,this.startPlaying())))}}class g{constructor(){s(this,"gameInRow");s(this,"tamagotchi");s(this,"start",({healthElement:t,hungerElement:e,energyElement:l,funElement:i})=>{this.tamagotchi=new u,this.tamagotchi.mount({healthElement:t,hungerElement:e,energyElement:l,funElement:i}),this.gameInRow++,console.log(`Game number ${this.gameInRow} started`)});this.gameInRow=0}}document.addEventListener("DOMContentLoaded",()=>{const n=new g,t=document.querySelector(".action-button--restart");n.start({healthElement:".health",hungerElement:".hunger",energyElement:".energy",funElement:".fun"}),t.addEventListener("click",()=>{n.start({healthElement:".health",hungerElement:".hunger",energyElement:".energy",funElement:".fun"})})});
