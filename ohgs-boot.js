/* Inlined in the head of every page: no network request before restoring the theme. */
(function(){
  'use strict';
  var root=document.documentElement;
  var key='ohgs-theme',backup='ohgs-theme-backup';
  function valid(value){return value==='light'||value==='dark'}
  function cookieTheme(){
    try{var match=document.cookie.match(/(?:^|;\s*)ohgs-theme-backup=(light|dark)(?:;|$)/);return match?match[1]:null}catch(error){return null}
  }
  function readTheme(){
    var value=cookieTheme();if(valid(value))return value;
    try{value=sessionStorage.getItem(backup);if(valid(value))return value}catch(error){}
    try{value=localStorage.getItem(key);if(valid(value))return value}catch(error){}
    return null;
  }
  function saveTheme(mode){
    if(!valid(mode))return;
    var saved=false;
    try{localStorage.setItem(key,mode);saved=localStorage.getItem(key)===mode}catch(error){}
    var secure=location.protocol==='https:'?'; Secure':'';
    if(saved){
      try{sessionStorage.removeItem(backup)}catch(error){}
      try{document.cookie=backup+'=; Path=/; Max-Age=0; SameSite=Lax'+secure}catch(error){}
    }else{
      try{sessionStorage.setItem(backup,mode)}catch(error){}
      try{document.cookie=backup+'='+mode+'; Path=/; Max-Age=31536000; SameSite=Lax'+secure}catch(error){}
    }
  }
  var initial=readTheme()||'dark';
  root.setAttribute('data-theme',initial);
  root.style.colorScheme='only '+initial;
  var meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute('content',initial==='light'?'#f5f9fd':'#07111f');

  // Record early asset events so cached images/maps never get a late spinner.
  ['load','error'].forEach(function(name){document.addEventListener(name,function(event){
    var el=event.target;if(el&&/^(IMG|IFRAME)$/.test(el.tagName))el.dataset.ohgsAssetState=name==='load'?'loaded':'error';
  },true)});
  var ended=false,showTimer,limitTimer;
  function sw(){
    if(root.lang==='sw')return true;
    try{return localStorage.getItem('ohgs-lang')==='sw'}catch(error){return false}
  }
  function label(){
    var text=document.querySelector('.site-loading-text');if(!text)return;
    text.dataset.en='Loading…';
    text.dataset.sw='Inapakia…';
    text.textContent=sw()?text.dataset.sw:text.dataset.en;
  }
  function show(){
    if(ended||document.readyState==='complete')return;
    root.setAttribute('data-ohgs-loading','active');label();
  }
  function finish(){
    if(ended)return;ended=true;
    clearTimeout(showTimer);clearTimeout(limitTimer);
    root.removeAttribute('data-ohgs-loading');
    setTimeout(function(){var el=document.getElementById('ohgs-load-indicator');if(el)el.hidden=true},90);
  }
  window.OHGSBoot={readTheme:readTheme,saveTheme:saveTheme,finish:finish};
  showTimer=setTimeout(show,60);
  // Only the document startup uses this badge. Images, maps and video load locally.
  limitTimer=setTimeout(finish,2000);
  document.addEventListener('DOMContentLoaded',finish,{once:true});
  if(document.readyState!=='loading')finish();
  window.addEventListener('load',finish,{once:true});
  window.addEventListener('pageshow',function(event){if(event.persisted)finish()});
})();
