/* Crypts & Creatures — PLAYABLE layer
   Adds keyboard combat, Continue, New Game, safer saves, and a visible control bar. */
(function(){
  const $=id=>document.getElementById(id);
  function hasSave(){return !!localStorage.getItem('cryptsCreaturesSave')}
  function refreshContinue(){const b=$('continueBtn');if(b)b.classList.toggle('hidden',!hasSave())}

  function continueGame(){
    const raw=localStorage.getItem('cryptsCreaturesSave');
    if(!raw)return;
    try{
      const d=JSON.parse(raw);
      hero=d.hero; questState=d.questState||{goblins:0,spiders:0,wyrm:0}; activeQuest=d.activeQuest||null;
      $('character-setup').classList.add('hidden');$('game').classList.remove('hidden');
      update();town();log('📂 Welcome back, Adventurer! Your save was loaded.');
    }catch(e){localStorage.removeItem('cryptsCreaturesSave');refreshContinue()}
  }

  function newGame(){
    localStorage.removeItem('cryptsCreaturesSave');
    localStorage.removeItem('ccExpansion');localStorage.removeItem('ccMega');
    location.reload();
  }

  const start=$('startBtn');
  if(start){
    start.insertAdjacentHTML('afterend','<button id="newGameBtn" class="secondaryBtn">🗑️ New Game</button>');
    $('newGameBtn').onclick=newGame;
  }
  const cont=$('continueBtn');if(cont)cont.onclick=continueGame;
  refreshContinue();

  // Keyboard combat controls. Buttons remain fully usable with mouse/touch.
  document.addEventListener('keydown',e=>{
    if(!hero||!enemy)return;
    if(e.target&&['INPUT','TEXTAREA'].includes(e.target.tagName))return;
    const actions={
      '1':()=>attack(), '2':()=>power(), '3':()=>potion(),
      '4':()=>bomb(), '5':()=>defend(), '6':()=>run()
    };
    if(actions[e.key]){e.preventDefault();actions[e.key]()}
  });

  // Autosave after useful progression without replacing the game's existing save system.
  const originalUpdate=window.update;
  window.update=function(){originalUpdate();if(hero){try{localStorage.setItem('cryptsCreaturesSave',JSON.stringify({hero,questState,activeQuest}))}catch(e){}}refreshContinue()};

  // Add a compact in-game controls strip after the game becomes visible.
  const oldStart=start&&start.onclick;
  if(start){start.addEventListener('click',()=>setTimeout(()=>{
    if(!$('playControls')){
      const hud=document.querySelector('.hud');
      if(hud){const bar=document.createElement('div');bar.id='playControls';bar.innerHTML='🎮 <b>Keys:</b> 1 Attack · 2 Ability · 3 Potion · 4 Bomb · 5 Defend · 6 Flee';hud.appendChild(bar)}
    }
    refreshContinue();
  },50))}
})();
