/* El Sobrinito como app (9-nov-2026): acceso directo en la pantalla de inicio y juego sin internet.
   Cada juego tiene su propio ícono. Se usa con <script src="app.js" data-app="Nombre" data-icon="icons/x-192.png"></script> */
(function(){
  var me=document.currentScript, nombre=(me&&me.dataset.app)||'El Sobrinito', icono=(me&&me.dataset.icon)||'';
  var deferred=null;
  function standalone(){return (window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true}
  var ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  var android=/android/i.test(navigator.userAgent);
  if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})})}
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e});
  window.addEventListener('appinstalled',function(){deferred=null;pintar('¡Listo! '+nombre+' quedó en la pantalla de inicio.')});
  var css=document.createElement('style');
  css.textContent='#instSob{position:fixed;inset:0;background:rgba(46,36,53,.5);z-index:90;display:none;align-items:flex-end;justify-content:center;padding:12px}'+
  '#instSob.on{display:flex}#instSob .bx{width:100%;max-width:500px;max-height:88vh;overflow:auto;background:#FFFCF5;border:4px solid #2E2435;border-radius:26px;box-shadow:6px 6px 0 #2E2435;padding:20px 18px;font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;color:#2E2435;font-size:17px;line-height:1.4}'+
  '#instSob h2{font-family:Chewy,"Baloo 2",system-ui,sans-serif;font-weight:400;font-size:26px;margin:0 0 8px;text-align:center}#instSob .ico{display:block;width:88px;height:88px;margin:0 auto 10px;border-radius:22px;box-shadow:3px 3px 0 #2E2435;border:3px solid #2E2435}'+
  '#instSob ol{margin:6px 0 0 22px;padding:0}#instSob li{margin:4px 0}#instSob .bt{display:block;width:100%;margin-top:12px;border:3px solid #2E2435;box-shadow:3px 3px 0 #2E2435;border-radius:16px;padding:12px;font:inherit;font-weight:800;font-size:18px;cursor:pointer;background:#A8E6D4;color:#2E2435}'+
  '#instSob .bt.cl{background:#fff}#instSob .mut{font-size:15px;color:#5b5163;margin-top:10px}';
  document.head.appendChild(css);
  var modal=document.createElement('div'); modal.id='instSob'; modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true');
  modal.innerHTML='<div class="bx" id="instSobBx"></div>'; document.body.appendChild(modal);
  modal.addEventListener('click',function(e){if(e.target===modal)modal.classList.remove('on')});
  function pintar(msg){
    var t;
    if(standalone()) t='<p>✅ Ya lo están usando como app. El niño puede abrirlo con un toque desde la pantalla de inicio.</p>';
    else if(deferred) t='<p>Con un toque queda el ícono de <b>'+nombre+'</b> en la pantalla de inicio, como cualquier app. Así el niño lo abre solo, sin buscar el link.</p><button type="button" class="bt" id="instSobGo">📲 Poner en la pantalla de inicio</button>';
    else if(ios) t='<p>En iPhone o iPad, desde <b>Safari</b>:</p><ol><li>Toca <b>Compartir</b> (el cuadrado con la flecha hacia arriba).</li><li>Elige <b>“Agregar a inicio”</b>.</li><li>Toca <b>Agregar</b>. Aparece el ícono de '+nombre+'.</li></ol>';
    else if(android) t='<p>En el celular, abre el menú del navegador (<b>⋮</b> arriba a la derecha) y elige <b>“Agregar a la pantalla principal”</b> o <b>“Instalar app”</b>.</p>';
    else t='<p>En el computador, busca el ícono <b>Instalar</b> en la barra de direcciones (a la derecha) o abre el menú del navegador (<b>⋮</b>) y elige <b>“Instalar”</b> o <b>“Crear acceso directo”</b>.</p>';
    document.getElementById('instSobBx').innerHTML=(icono?'<img class="ico" src="'+icono+'" alt="">':'')+'<h2>📲 '+nombre+' en tu pantalla</h2>'+(msg?'<p><b>'+msg+'</b></p>':'')+t+
      '<p class="mut">Después de abrirlo una vez, funciona sin internet.</p><button type="button" class="bt cl" id="instSobX">Cerrar</button>';
    var g=document.getElementById('instSobGo'); if(g) g.onclick=function(){if(!deferred)return;deferred.prompt();deferred.userChoice.then(function(){deferred=null;pintar('')}).catch(function(){})};
    document.getElementById('instSobX').onclick=function(){modal.classList.remove('on')};
  }
  window.abrirInstalar=function(){pintar('');modal.classList.add('on')};
})();
