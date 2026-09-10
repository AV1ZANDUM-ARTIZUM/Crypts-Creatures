// Crypts & Creatures — illustrated character system
// All art is original inline SVG so the game needs no external image files.
const characterDesigns={
 warrior:{skin:'#c98d67',hair:'#3b2419',cloth:'#7b2638',metal:'#c8c8c8',weapon:'sword',accent:'#e0a84d'},
 mage:{skin:'#d7a078',hair:'#4b315f',cloth:'#493b86',metal:'#b9a7ff',weapon:'staff',accent:'#65d8ff'},
 rogue:{skin:'#b87858',hair:'#17151b',cloth:'#252832',metal:'#9b9fa8',weapon:'daggers',accent:'#9b72ff'},
 ranger:{skin:'#c99068',hair:'#5b321f',cloth:'#315b45',metal:'#a7b58c',weapon:'bow',accent:'#75c96b'},
 cleric:{skin:'#d8a57c',hair:'#d7d0bd',cloth:'#e8e4d6',metal:'#c8a94e',weapon:'mace',accent:'#ffe28a'},
 paladin:{skin:'#c88b64',hair:'#32241d',cloth:'#344f72',metal:'#d8c17b',weapon:'sword',accent:'#f5df91'},
 warlock:{skin:'#ad725d',hair:'#17101d',cloth:'#3b204c',metal:'#7c4ca3',weapon:'staff',accent:'#d65cff'},
 druid:{skin:'#ce956c',hair:'#6d4427',cloth:'#456b39',metal:'#8fa85f',weapon:'staff',accent:'#8ee56f'}
};
const enemyDesigns={
 'Goblin Scout':{skin:'#72a34b',cloth:'#5d412c',accent:'#d4a44d',eyes:'#f4dc62'},
 'Crypt Spider':{skin:'#27212d',cloth:'#17131b',accent:'#8e58bb',eyes:'#e96b85'},
 'Bandit':{skin:'#b77b5e',cloth:'#333945',accent:'#b64e54',eyes:'#e7c09e'},
 'Orc Brute':{skin:'#658d55',cloth:'#49372d',accent:'#c56e42',eyes:'#f2d36d'},
 'Bone Knight':{skin:'#ddd4bd',cloth:'#30303a',accent:'#9e7bca',eyes:'#75d6ff'},
 'Vampire':{skin:'#d7a7ae',cloth:'#24182b',accent:'#b83d63',eyes:'#ff596e'},
 'Grave Wyrm':{skin:'#465c5e',cloth:'#202b2d',accent:'#86a34d',eyes:'#ffca55'},
 'Ancient Dragon':{skin:'#7b4d62',cloth:'#32232d',accent:'#e4a34e',eyes:'#fff09a'}
};
function svgFigure(type, enemy=false){
 const d=enemy?enemyDesigns[type]:characterDesigns[type];
 if(!d)return '';
 if(enemy&&type==='Crypt Spider') return `<svg class="figure spider" viewBox="0 0 220 220" aria-label="${type}"><ellipse cx="110" cy="126" rx="48" ry="55" fill="${d.skin}"/><circle cx="91" cy="112" r="8" fill="${d.eyes}"/><circle cx="129" cy="112" r="8" fill="${d.eyes}"/><path d="M78 140Q110 164 142 140" fill="none" stroke="${d.accent}" stroke-width="6"/>${[0,1,2,3].map(i=>`<path d="M75 ${125+i*10} Q35 ${95+i*18} 18 ${115+i*20} M145 ${125+i*10} Q185 ${95+i*18} 202 ${115+i*20}" fill="none" stroke="${d.cloth}" stroke-width="8" stroke-linecap="round"/>`).join('')}</svg>`;
 const weapon={sword:`<path d="M165 122L205 38" stroke="#ddd" stroke-width="9"/><path d="M150 135L180 150" stroke="${d.accent}" stroke-width="9"/>`,staff:`<path d="M174 155V42" stroke="#7a4d2f" stroke-width="8"/><circle cx="174" cy="35" r="16" fill="${d.accent}"/>`,daggers:`<path d="M155 125l48-45M145 132l-36-45" stroke="#ddd" stroke-width="8"/>`,bow:`<path d="M168 65Q205 110 168 155M168 65Q135 110 168 155" fill="none" stroke="${d.accent}" stroke-width="7"/><path d="M168 65V155" stroke="#ddd" stroke-width="3"/>`,mace:`<path d="M166 150V80" stroke="#8a623f" stroke-width="9"/><circle cx="166" cy="65" r="20" fill="${d.metal}"/>`}[d.weapon]||'';
 return `<svg class="figure" viewBox="0 0 220 220" aria-label="${enemy?type:d.name||type}">
 <ellipse cx="110" cy="201" rx="62" ry="10" fill="#000" opacity=".35"/>
 <path d="M72 130Q110 112 148 130L160 192H60Z" fill="${d.cloth}" stroke="#16131a" stroke-width="5"/>
 <circle cx="110" cy="83" r="39" fill="${d.skin}" stroke="#16131a" stroke-width="5"/>
 <path d="M72 78Q76 37 110 39Q145 38 149 78Q130 61 110 63Q90 61 72 78" fill="${d.hair}"/>
 <circle cx="96" cy="88" r="5" fill="#17131a"/><circle cx="124" cy="88" r="5" fill="#17131a"/>
 <path d="M96 106Q110 114 124 106" fill="none" stroke="#522c2b" stroke-width="4" stroke-linecap="round"/>
 <path d="M72 137L48 170M148 137L172 170M85 190L80 211M135 190L140 211" stroke="#16131a" stroke-width="11" stroke-linecap="round"/>
 ${weapon}</svg>`;
}
function heroFigure(cls){return `<div class="heroFigure">${svgFigure(cls)}</div>`}
function enemyFigure(name){return `<div class="enemyFigure">${svgFigure(name,true)}</div>`}
function installCharacterArt(){
 document.querySelectorAll('.classCard').forEach(card=>{const cls=card.dataset.class;const c=classes[cls];card.querySelector('.classIcon').outerHTML=`<div class="cardFigure">${svgFigure(cls)}</div>`;card.querySelector('p').textContent=`${c.ability} — ${classFlavor[cls]}`});
 const start=document.getElementById('startBtn');
 start.addEventListener('click',()=>setTimeout(refreshHeroArt,30));
}
const classFlavor={warrior:'armored front-line fighter',mage:'arcane spellcaster with ranged power',rogue:'fast shadow duelist',ranger:'precision hunter and scout',cleric:'holy healer and battle priest',paladin:'shielded champion of light',warlock:'dark magic wielder',druid:'nature-bound shapeshifter'};
function refreshHeroArt(){const hud=document.querySelector('.hud');if(!hud||!hero)return;let art=document.getElementById('heroArt');if(!art){art=document.createElement('div');art.id='heroArt';hud.prepend(art)}art.innerHTML=heroFigure(hero.class)}
const originalCombat=combat;
combat=function(msg=''){scene(enemy.name,`${enemyFigure(enemy.name)}<div class="enemyStats"><b>HP ${enemy.hp}/${enemy.maxHp}</b><div class="bar"><div class="fill" style="width:${Math.max(0,enemy.hp/enemy.maxHp*100)}%"></div></div><p>${msg}</p><div class="dice">🎲 Roll for action</div></div>`,`<button onclick="attack()">⚔️ Attack</button><button onclick="power()">✨ ${classes[hero.class].ability}</button><button onclick="potion()">🧪 Use Potion</button><button onclick="bomb()">💣 Fire Bomb</button><button onclick="defend()">🛡️ Defend</button><button onclick="run()">🏃 Flee</button>`);refreshHeroArt()};
const originalCharacter=character;
character=function(){originalCharacter();setTimeout(refreshHeroArt,0)};
window.addEventListener('DOMContentLoaded',installCharacterArt);
installCharacterArt();
