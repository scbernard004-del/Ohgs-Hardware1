(function(){
  'use strict';

  var STORAGE_KEY='ohgs-theme';
  var root=document.documentElement;
  var palettes={
    dark:{'--bg':'#07111f','--bg2':'#0b1726','--card':'#0d1c2b','--text':'#f7fbff','--muted':'#bdcada','--line':'rgba(159,231,255,.18)','--shadow':'0 22px 54px rgba(0,0,0,.30)'},
    light:{'--bg':'#f5f9fd','--bg2':'#ffffff','--card':'#ffffff','--text':'#0b1726','--muted':'#475569','--line':'rgba(8,66,98,.16)','--shadow':'0 22px 54px rgba(8,38,61,.12)'}
  };
  var icons={
    dark:'<span class="theme-icon theme-icon-moon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5 8.6 8.6 0 1 0 20.5 14.3Z"/></svg></span>',
    light:'<span class="theme-icon theme-icon-sun" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg></span>'
  };

  function savedTheme(){
    if(window.OHGSBoot)return window.OHGSBoot.readTheme()||current();
    try{var saved=localStorage.getItem(STORAGE_KEY);return saved==='light'||saved==='dark'?saved:current()}catch(error){return current()}
  }

  function current(){return root.getAttribute('data-theme')==='light'?'light':'dark'}

  function applyPalette(element,mode){
    if(!element||!element.style)return;
    Object.keys(palettes[mode]).forEach(function(name){element.style.setProperty(name,palettes[mode][name])});
  }

  function updateControls(mode){
    var sw=(root.lang||'').toLowerCase().indexOf('sw')===0;
    var action=mode==='light'?(sw?'Washa mandhari nyeusi':'Switch to dark mode'):(sw?'Washa mandhari nyeupe':'Switch to light mode');
    Array.prototype.forEach.call(document.querySelectorAll('.theme-toggle'),function(button){
      button.innerHTML=icons[mode];
      button.setAttribute('data-mode',mode);
      button.setAttribute('aria-pressed',mode==='light'?'true':'false');
      button.setAttribute('aria-label',action);
      button.setAttribute('title',action);
    });
  }

  function apply(mode,persist){
    var explicit=mode==='light'||mode==='dark';
    mode=explicit?mode:savedTheme();
    var light=mode==='light';
    root.setAttribute('data-theme',mode);
    root.classList.toggle('light',light);
    root.classList.toggle('theme-light',light);
    root.classList.toggle('theme-dark',!light);
    root.style.colorScheme='only '+mode;
    applyPalette(root,mode);
    if(document.body){
      document.body.setAttribute('data-theme',mode);
      document.body.classList.toggle('light',light);
      document.body.classList.toggle('theme-light',light);
      document.body.classList.toggle('theme-dark',!light);
      document.body.style.colorScheme='only '+mode;
      applyPalette(document.body,mode);
    }
    var meta=document.querySelector('meta[name="theme-color"]');
    if(meta)meta.setAttribute('content',light?'#f5f9fd':'#07111f');
    updateControls(mode);
    if(explicit&&persist!==false){
      if(window.OHGSBoot)window.OHGSBoot.saveTheme(mode);
      else try{localStorage.setItem(STORAGE_KEY,mode)}catch(error){}
    }
    try{window.dispatchEvent(new CustomEvent('ohgs:themechange',{detail:{theme:mode}}))}catch(error){}
    return mode;
  }

  function toggle(){return apply(current()==='light'?'dark':'light')}

  window.OHGSTheme={apply:apply,current:current,toggle:toggle,restore:function(){return apply(savedTheme(),false)},refresh:function(){return apply(current(),false)}};
  apply(savedTheme(),false);

  document.addEventListener('click',function(event){
    var button=event.target&&event.target.closest?event.target.closest('.theme-toggle'):null;
    if(!button)return;
    event.preventDefault();
    event.stopPropagation();
    toggle();
  },true);

  document.addEventListener('DOMContentLoaded',function(){apply(current(),false)},{once:true});
  window.addEventListener('pageshow',function(){apply(savedTheme(),false)});
  window.addEventListener('storage',function(event){if(event.key===STORAGE_KEY)apply(event.newValue,false)});
})();
