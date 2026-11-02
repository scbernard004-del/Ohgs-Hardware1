(function(){
  'use strict';
  if(window.OHGSMediaReady)return;
  window.OHGSMediaReady=true;
  document.documentElement.dataset.ohgsMediaRelease='v41-visible-video-autoplay';
  var videos=Array.prototype.slice.call(document.querySelectorAll('video[data-video-src]'));
  function isSw(){return document.documentElement.lang==='sw'}
  function orderLanguage(){
    document.querySelectorAll('a[href*="wa.me/"]').forEach(function(link){
      if(!link.dataset.englishOrderHref)link.dataset.englishOrderHref=link.getAttribute('href');
      if(!isSw()){link.setAttribute('href',link.dataset.englishOrderHref);return}
      var card=link.closest('.product-card,.product-detail');
      var title=card&&card.querySelector('h1,h3');
      var product=title?(title.dataset.sw||title.textContent):'bidhaa, stok na bei ya leo';
      if(link.dataset.product==='Project supply request')product='zana na vifaa kwa mradi wangu';
      link.setAttribute('href','https://wa.me/255689528193?text='+encodeURIComponent('Habari OHGS, naomba taarifa kuhusu '+product+'.'));
    });
  }
  window.addEventListener('ohgs:languagechange',orderLanguage);
  orderLanguage();
  function loadPoster(video){if(video.dataset.poster&&!video.poster)video.poster=video.dataset.poster}
  if('IntersectionObserver' in window){
    var posterObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){loadPoster(entry.target);posterObserver.unobserve(entry.target)}})},{rootMargin:'240px 0px'});
    videos.forEach(function(video){if(video.dataset.poster)posterObserver.observe(video)});
  }else{videos.forEach(loadPoster)}
  var connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  var reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  var players=[],activeAuto=null,currentPlayer=null,manualPlayer=null,selectionTimer,pausingPage=false;
  function dataRestricted(){return document.hidden||navigator.onLine===false||reducedMotion.matches||(connection&&connection.saveData)}
  function autoAllowed(){
    // Bandwidth estimates are often missing or stale on phones. Let the small
    // muted preview buffer normally; respect explicit device preferences.
    return !dataRestricted()&&'IntersectionObserver' in window;
  }
  function scheduleAuto(){clearTimeout(selectionTimer);selectionTimer=setTimeout(selectAuto,120)}
  function selectAuto(){
    if(dataRestricted()){players.forEach(function(p){p.stopAuto()});return}
    // Manual controls own this viewport, not the rest of the page visit.
    if(manualPlayer){
      if(manualPlayer.visible)return;
      releaseControl(manualPlayer);
    }
    // A changing bandwidth estimate must not interrupt a video already playing.
    if(activeAuto&&activeAuto.visible&&!activeAuto.blocked&&!activeAuto.finished)return;
    if(activeAuto)activeAuto.stopAuto();
    if(!autoAllowed())return;
    var next=players.find(function(p){return p.visible&&!p.blocked&&!p.finished});
    if(next)next.startAuto();
  }
  function takeControl(selected){
    manualPlayer=selected;currentPlayer=selected;clearTimeout(selectionTimer);
    players.forEach(function(p){
      if(p===selected)p.leaveAuto();
      else {p.stopAuto();if(!p.video.paused)p.video.pause()}
    });
  }
  function releaseControl(selected){
    if(manualPlayer!==selected)return;
    manualPlayer=null;
    if(currentPlayer===selected)currentPlayer=null;
    selected.cancelRequest();
    if(!selected.video.paused)selected.video.pause();
  }
  function syncPlaying(){document.body.classList.toggle('premium-video-playing',videos.some(function(v){return !v.paused&&!v.ended&&!v.muted}))}
  function videoMessage(player,message){
    var p=player.querySelector('.video-error');
    if(!p){p=document.createElement('p');p.className='video-error';p.setAttribute('role','status');player.appendChild(p)}
    p.textContent=message;
  }
  videos.forEach(function(video){
    video.controls=false;
    var player=video.closest('.media-player');
    var button=player&&player.querySelector('.video-play');
    if(!button)return;
    var started=false,triedFull=false,generation=0,bufferTimer,feedbackTimer,exitTimer;
    var state={video:video,visible:false,automatic:false,pending:false,playRequested:false,blocked:false,finished:false,lastRequest:''};
    players.push(state);
    var buffering=document.createElement('div');buffering.className='video-buffering';buffering.hidden=true;buffering.setAttribute('role','status');
    var brand=document.querySelector('#ohgs-load-indicator .loading-brand');
    if(brand)buffering.appendChild(brand.cloneNode(true));
    var bufferText=document.createElement('span');bufferText.className='video-buffering-text';bufferText.dataset.en='Loading video…';bufferText.dataset.sw='Video inapakia…';buffering.appendChild(bufferText);player.appendChild(buffering);
    var sound=document.createElement('button');sound.type='button';sound.className='video-sound';sound.hidden=true;
    sound.dataset.en='Sound on';sound.dataset.sw='Washa sauti';player.appendChild(sound);
    var playLabel=button.querySelector('.video-play-label');
    function bufferLanguage(){
      bufferText.textContent=isSw()?bufferText.dataset.sw:bufferText.dataset.en;sound.textContent=isSw()?sound.dataset.sw:sound.dataset.en;
      if(playLabel){playLabel.dataset.en=state.finished?'Replay video':'Play video';playLabel.dataset.sw=state.finished?'Cheza tena':'Cheza video';playLabel.textContent=isSw()?playLabel.dataset.sw:playLabel.dataset.en}
      if(state.finished)button.setAttribute('aria-label',isSw()?'Cheza tena':'Replay video');
      else button.setAttribute('aria-label',isSw()?'Cheza video':'Play video');
    }
    bufferLanguage();window.addEventListener('ohgs:languagechange',bufferLanguage);
    function syncSound(){sound.hidden=video.paused||video.ended||!video.muted}
    function buffer(waiting){
      clearTimeout(bufferTimer);clearTimeout(feedbackTimer);
      if(!waiting){buffering.hidden=true;video.removeAttribute('aria-busy');player.classList.remove('is-buffering-slow');return}
      video.setAttribute('aria-busy','true');
      bufferTimer=setTimeout(function(){buffering.hidden=false},160);
      // Long waits offer Play again. Never clear the source, time or buffered data.
      feedbackTimer=setTimeout(function(){buffering.hidden=true;video.removeAttribute('aria-busy');player.classList.add('is-buffering-slow')},8000);
    }
    function loadVideo(automatic){
      loadPoster(video);video.preload='auto';
      var lowData=automatic||window.matchMedia('(max-width: 699px)').matches||(connection&&connection.saveData);
      if(!started||video.error){
        video.src=lowData&&!triedFull?video.dataset.mobileSrc:video.dataset.videoSrc;started=true;video.load();
      }
    }
    function showPlay(){player.classList.remove('is-loaded');video.controls=false;sound.hidden=true;buffer(false)}
    state.leaveAuto=function(){
      if(!state.automatic)return;
      state.automatic=false;state.pending=false;state.playRequested=false;generation++;
      video.autoplay=false;video.loop=false;if(activeAuto===state)activeAuto=null;
    };
    state.cancelRequest=function(){state.pending=false;state.playRequested=false;generation++;buffer(false)};
    state.stopAuto=function(){
      if(!state.automatic)return;
      state.leaveAuto();video.pause();video.preload='metadata';buffer(false);syncSound();syncPlaying();
      // Keep src/currentTime so returning to the video resumes without a restart.
    };
    function tryAutoPlay(){
      if(!state.automatic||!state.pending)return;
      if(dataRestricted()||!state.visible||activeAuto!==state||currentPlayer!==state){state.stopAuto();return}
      state.pending=false;player.classList.add('is-loaded');video.controls=true;
      var attempt=generation;
      state.playRequested=true;
      var promise=video.play();
      if(promise&&promise.catch)promise.catch(function(){
        if(attempt!==generation||!state.automatic)return;
        state.blocked=true;state.stopAuto();showPlay();scheduleAuto();
      });
    }
    state.startAuto=function(){
      if(!autoAllowed()||!state.visible||state.blocked||state.finished)return;
      activeAuto=state;currentPlayer=state;state.automatic=true;state.pending=true;state.lastRequest='auto';generation++;
      video.defaultMuted=true;video.muted=true;video.playsInline=true;
      video.autoplay=true;video.loop=true;
      player.querySelectorAll('.video-error').forEach(function(p){p.remove()});
      loadVideo(true);buffer(true);tryAutoPlay();
    };
    function play(){
      takeControl(state);generation++;var attempt=generation;state.lastRequest='manual';
      state.blocked=false;
      if(state.finished||video.ended){video.currentTime=0;state.finished=false;bufferLanguage()}
      video.autoplay=false;video.loop=false;video.muted=false;video.defaultMuted=false;
      player.querySelectorAll('.video-error').forEach(function(p){p.remove()});
      loadVideo(false);player.classList.add('is-loaded');video.controls=true;buffer(true);
      state.playRequested=true;var promise=video.play();
      if(promise&&promise.catch)promise.catch(function(error){
        if(attempt!==generation||(error&&error.name==='AbortError'))return;
        state.playRequested=false;
        showPlay();videoMessage(player,isSw()?'Gusa kucheza tena, au fungua video moja kwa moja.':'Tap to play again, or open the video directly.');
      });
    }
    button.addEventListener('click',play);
    sound.addEventListener('click',function(){takeControl(state);state.lastRequest='manual';video.muted=false;video.defaultMuted=false;syncSound();syncPlaying()});
    ['pointerdown','keydown'].forEach(function(name){video.addEventListener(name,function(){takeControl(state);state.lastRequest='manual'})});
    video.addEventListener('error',function(){
      if(!started)return;buffer(false);generation++;
      state.playRequested=false;
      if(currentPlayer!==state)return;
      var mobile=video.src.indexOf('-mobile.mp4')!==-1;
      if(state.automatic){triedFull=mobile;state.blocked=true;state.stopAuto();showPlay();scheduleAuto();return}
      if(!triedFull&&mobile){
        triedFull=true;video.src=video.dataset.videoSrc;video.load();buffer(true);
        state.playRequested=true;var attempt=generation,promise=video.play();
        if(promise&&promise.catch)promise.catch(function(){if(attempt===generation)showPlay()});return;
      }
      showPlay();videoMessage(player,isSw()?'Video haikupakia. Tumia kiungo cha kufungua video.':'The video could not load. Use the direct video link.');
    });
    video.addEventListener('play',function(){
      if(video.paused)return;
      if(state.playRequested){if(currentPlayer!==state)video.pause();return}
      // Native controls and assistive technologies can start playback without a pointer event.
      takeControl(state);state.lastRequest='manual';
    });
    video.addEventListener('playing',function(){
      // Media events may arrive after another video was selected. They cannot take ownership back.
      if(currentPlayer!==state||video.paused){if(!video.paused)video.pause();buffer(false);return}
      if(state.lastRequest==='auto'&&(dataRestricted()||!state.visible||activeAuto!==state)){video.pause();buffer(false);return}
      state.playRequested=false;
      buffer(false);player.classList.add('is-loaded');video.controls=true;
      players.forEach(function(other){if(other!==state){other.stopAuto();if(!other.video.paused)other.video.pause()}});
      syncPlaying();syncSound();
    });
    ['waiting','stalled','seeking'].forEach(function(name){video.addEventListener(name,function(){if(started&&!video.paused)buffer(true)})});
    video.addEventListener('canplay',function(){buffer(false);tryAutoPlay()});
    video.addEventListener('volumechange',function(){syncSound();syncPlaying()});
    video.addEventListener('pause',function(){
      if(!video.paused&&!video.ended)return;
      state.playRequested=false;
      buffer(false);syncPlaying();syncSound();
      if(state.automatic){state.blocked=true;state.leaveAuto();manualPlayer=state}
      else if(manualPlayer===state&&!pausingPage&&!video.ended)state.blocked=true;
    });
    video.addEventListener('ended',function(){if(!video.ended)return;state.finished=true;state.playRequested=false;state.leaveAuto();showPlay();bufferLanguage();syncPlaying();syncSound();if(currentPlayer===state)currentPlayer=null;if(manualPlayer===state)manualPlayer=null;scheduleAuto()});
    state.updateVisibility=function(entry){
      clearTimeout(exitTimer);
      var ratio=entry.intersectionRatio||0;
      if(state.visible){
        if(entry.isIntersecting&&ratio>0.05)return;
        // Ignore small scroll/header movements and momentary viewport changes.
        exitTimer=setTimeout(function(){state.visible=false;state.stopAuto();releaseControl(state);scheduleAuto()},450);
      }else if(entry.isIntersecting&&ratio>=0.3){state.visible=true;scheduleAuto()}
    };
  });
  if('IntersectionObserver' in window){
    var playbackObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){
      var state=players.find(function(p){return p.video===entry.target});if(state)state.updateVisibility(entry);
    })},{threshold:[0,0.05,0.3,0.8,1]});
    players.forEach(function(p){playbackObserver.observe(p.video)});
  }
  function pausePage(){pausingPage=true;players.forEach(function(p){p.stopAuto();if(!p.video.paused)p.video.pause()});pausingPage=false}
  document.addEventListener('visibilitychange',function(){if(document.hidden)pausePage();else scheduleAuto()});
  window.addEventListener('pagehide',pausePage);window.addEventListener('pageshow',scheduleAuto);
  window.addEventListener('online',scheduleAuto);window.addEventListener('offline',selectAuto);
  if(connection&&connection.addEventListener)connection.addEventListener('change',selectAuto);
  if(reducedMotion.addEventListener)reducedMotion.addEventListener('change',selectAuto);
  else if(reducedMotion.addListener)reducedMotion.addListener(selectAuto);

  // Content stays visible without animation or JavaScript; only headings animate on entry.
  if('IntersectionObserver' in window&&!reducedMotion.matches){
    var entranceObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){
      if(entry.isIntersecting){entry.target.classList.add('is-in-view');entranceObserver.unobserve(entry.target)}
    })},{threshold:0.2});
    document.querySelectorAll('main section h2').forEach(function(h){entranceObserver.observe(h)});
  }

  var catalog=document.getElementById('product-catalog');
  if(catalog){
    var input=document.getElementById('product-search');
    var clear=document.getElementById('clear-product-search');
    var cards=Array.prototype.slice.call(catalog.querySelectorAll('.product-card'));
    var count=document.querySelector('.catalog-count');
    var empty=document.querySelector('.catalog-empty');
    function normalize(s){return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim()}
    cards.forEach(function(card){card.__ohgsSearch=normalize(card.textContent+' '+Array.prototype.map.call(card.querySelectorAll('[data-en][data-sw]'),function(el){return el.dataset.en+' '+el.dataset.sw}).join(' '))});
    function filter(){
      var query=normalize(input.value),total=0;
      cards.forEach(function(card){card.hidden=query!==''&&card.__ohgsSearch.indexOf(query)===-1;if(!card.hidden)total++});
      count.dataset.en=total+' '+(total===1?'product':'products');count.dataset.sw=total+' '+(total===1?'bidhaa':'bidhaa');count.textContent=isSw()?count.dataset.sw:count.dataset.en;
      empty.hidden=total!==0;
    }
    input.addEventListener('input',filter);
    clear.addEventListener('click',function(){input.value='';filter();input.focus()});
    window.addEventListener('ohgs:languagechange',filter);
    filter();
  }

  function keyboard(){
    var el=document.activeElement;
    document.body.classList.toggle('keyboard-open',!!(el&&/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)));
  }
  document.addEventListener('focusin',keyboard);
  document.addEventListener('focusout',function(){setTimeout(keyboard,0)});
  if(window.visualViewport)window.visualViewport.addEventListener('resize',keyboard,{passive:true});
})();
