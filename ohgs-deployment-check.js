(function(){
  'use strict';
  var button=document.getElementById('check-deployment');
  if(!button)return;
  var expected=document.querySelector('meta[name="ohgs-release"]').content;
  var status=document.getElementById('deployment-check-status');
  var fileRelease=null,result='ready';
  function sw(){return document.documentElement.lang==='sw'}
  function render(){
    var runtime=document.documentElement.dataset.ohgsMediaRelease;
    document.getElementById('release-html').textContent=expected;
    document.getElementById('release-runtime').textContent=runtime||(sw()?'Haijapakia':'Not loaded');
    document.getElementById('release-file').textContent=fileRelease||(sw()?'Bado haijakaguliwa':'Not checked yet');
    var messages={
      ready:['Check that the page, video controller and version file all match.','Hakikisha ukurasa, kidhibiti cha video na faili la toleo vinafanana.'],
      checking:['Checking deployed files…','Mafaili yanakaguliwa…'],
      success:['All three versions match. Check video playback on Home next.','Matoleo yote matatu yanafanana. Sasa kagua video kwenye Mwanzo.'],
      mismatch:['The files do not match. Upload the complete package and redeploy the connected project.','Mafaili hayafanani. Pakia kifurushi kizima kisha sambaza upya mradi uliounganishwa.'],
      error:['The version file could not be checked. Confirm the upload and try again.','Faili la toleo halikuweza kukaguliwa. Hakikisha limepakiwa kisha jaribu tena.']
    };
    status.textContent=messages[result][sw()?1:0];status.dataset.result=result;
  }
  button.addEventListener('click',async function(){
    if(button.disabled)return;
    button.disabled=true;button.classList.add('is-sending');button.setAttribute('aria-busy','true');result='checking';render();
    var controller=window.AbortController?new AbortController():null;
    var timer=setTimeout(function(){if(controller)controller.abort()},5000);
    try{
      var response=await fetch('version-check.txt',{cache:'no-store',signal:controller?controller.signal:undefined});
      if(!response.ok)throw new Error('Version request failed');
      var content=await response.text();var match=content.match(/^OHGS RELEASE (v\d+-[a-z0-9-]+)/);
      fileRelease=match?match[1]:null;
      result=fileRelease===expected&&document.documentElement.dataset.ohgsMediaRelease===expected?'success':'mismatch';
    }catch(error){result='error'}
    finally{clearTimeout(timer);button.disabled=false;button.classList.remove('is-sending');button.removeAttribute('aria-busy');render()}
  });
  window.addEventListener('ohgs:languagechange',render);render();
})();
