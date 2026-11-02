(function(){
  'use strict';
  var brand=document.querySelector('#ohgs-load-indicator .loading-brand');
  if(!brand)return;
  function isSw(){return document.documentElement.lang==='sw'}
  function track(node,host,type){
    var ended=false,started=false,showTimer,limitTimer,observer;
    var badge=document.createElement('span');badge.className='resource-loading';badge.hidden=true;badge.setAttribute('role','status');
    badge.appendChild(brand.cloneNode(true));
    var label=document.createElement('span');label.className='resource-loading-label';
    label.dataset.en=type==='map'?'Loading map…':'Loading image…';
    label.dataset.sw=type==='map'?'Ramani inapakia…':'Picha inapakia…';badge.appendChild(label);host.appendChild(badge);
    function language(){label.textContent=isSw()?label.dataset.sw:label.dataset.en}
    language();window.addEventListener('ohgs:languagechange',language);
    function complete(){return node.dataset.ohgsAssetState==='loaded'||node.dataset.ohgsAssetState==='error'||(node.tagName==='IMG'&&node.complete)}
    function finish(){
      ended=true;clearTimeout(showTimer);clearTimeout(limitTimer);badge.hidden=true;host.removeAttribute('aria-busy');
      if(observer)observer.disconnect();
      window.removeEventListener('ohgs:languagechange',language);
    }
    function start(){
      if(started||ended)return;started=true;
      if(complete()){finish();return}
      showTimer=setTimeout(function(){if(complete())finish();else if(!ended){badge.hidden=false;host.setAttribute('aria-busy','true')}},60);
      limitTimer=setTimeout(finish,12000);
    }
    node.addEventListener('load',finish,{once:true});node.addEventListener('error',finish,{once:true});
    if(complete()){finish();return}
    if(node.loading==='lazy'&&'IntersectionObserver' in window){
      observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){observer.disconnect();start()}})},{rootMargin:'120px 0px'});
      observer.observe(host);
    }else start();
  }
  document.querySelectorAll('main img').forEach(function(img){
    var host=img.closest('.product-image-frame,.page-hero-photo,.resource-image-frame');
    if(host)track(img,host,'image');
  });
  document.querySelectorAll('.map-frame iframe').forEach(function(frame){track(frame,frame.parentElement,'map')});
})();
