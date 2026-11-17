(function(){
  var top=document.getElementById('top'),bg=document.getElementById('burger');
  function zamknij(){top.classList.remove('open');bg.setAttribute('aria-expanded','false');bg.setAttribute('aria-label','Otwórz menu')}
  bg.addEventListener('click',function(){var o=top.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
  document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',zamknij)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){zamknij();zlb()}});
  var tk=false;function sc(){if(tk)return;tk=true;requestAnimationFrame(function(){top.classList.toggle('sc',window.pageYOffset>8);tk=false})}addEventListener('scroll',sc,{passive:true});
  var links=[].slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    links.forEach(function(l){var t=document.querySelector(l.getAttribute('href'));if(t)io.observe(t)});
    var st=document.getElementById('start');if(st)io.observe(st);
    var mob=document.getElementById('mob'),hc=document.getElementById('hcta');
    if(mob&&hc){new IntersectionObserver(function(es){var e=es[0];mob.classList.toggle('widac',!e.isIntersecting&&e.boundingClientRect.top<0)}).observe(hc)}
    var mapa=document.getElementById('mapa');
    if(mapa){var mo=new IntersectionObserver(function(es){if(es[0].isIntersecting){var f=document.createElement('iframe');f.src=mapa.dataset.src;f.title='Mapa dojazdu: ul. Malborska 130, Kraków';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';mapa.appendChild(f);mo.disconnect()}},{rootMargin:'300px'});mo.observe(mapa)}
  }
  document.querySelectorAll('[data-tor]').forEach(function(tor){
    var down=false,sx=0,sl=0,moved=false;
    function step(){var k=tor.children[0];return k?k.getBoundingClientRect().width+parseFloat(getComputedStyle(tor).columnGap||0):300}
    tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||tor.scrollWidth<=tor.clientWidth+2)return;down=true;moved=false;sx=e.clientX;sl=tor.scrollLeft});
    addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;tor.classList.add('drag')}tor.scrollLeft=sl-dx});
    addEventListener('pointerup',function(){if(!down)return;down=false;tor.classList.remove('drag');if(moved){var w=step();tor.scrollTo({left:Math.round(tor.scrollLeft/w)*w,behavior:'smooth'})}});
    tor.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
    tor.addEventListener('dragstart',function(e){e.preventDefault()});
    var nav=document.querySelector('[data-nav="'+tor.id+'"]');
    function upd(){if(!nav)return;nav.style.visibility=tor.scrollWidth>tor.clientWidth+2?'visible':'hidden'}
    if(nav)nav.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){tor.scrollBy({left:step()*(+b.dataset.k),behavior:'smooth'})})});
    addEventListener('load',function(){requestAnimationFrame(upd)});addEventListener('resize',upd);
  });
  var lb=document.getElementById('lb'),lbi=lb.querySelector('img'),lbp=lb.querySelector('p'),ost=null;
  function zlb(){if(lb.hidden)return;lb.hidden=true;lbi.removeAttribute('src');document.body.style.overflow='';if(ost)ost.focus()}
  document.querySelectorAll('[data-lb]').forEach(function(b){b.addEventListener('click',function(){ost=b;lbi.src=b.dataset.lb;lbi.alt=b.dataset.cap||'';lbp.textContent=b.dataset.cap||'';lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('button').focus()})});
  lb.addEventListener('click',function(e){if(e.target!==lbi)zlb()});
  var f=document.getElementById('form'),msg=document.getElementById('msg');
  f.addEventListener('submit',function(e){e.preventDefault();var ok=true;[].forEach.call(f.querySelectorAll('[required]'),function(i){var v=i.type==='checkbox'?(i.checked?'1':''):i.value.trim();var bad=!v||(i.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v));i.setAttribute('aria-invalid',bad);if(bad&&ok){ok=false;i.focus()}});if(!ok)return;msg.hidden=false;f.reset();msg.scrollIntoView({block:'nearest',behavior:'smooth'})});
  var r=document.getElementById('rok');if(r)r.textContent=new Date().getFullYear();
})();
