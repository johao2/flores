/* FloAesthetic Carousel (namespaced) */
(function(){
  const track = document.querySelector('.fa-carousel-track');
  const slides = document.querySelectorAll('.fa-slide');
  const prev = document.querySelector('.fa-prev');
  const next = document.querySelector('.fa-next');
  const dotsWrap = document.querySelector('.fa-dots');
  if(!track || slides.length===0) return;

  let idx = 0;
  const total = slides.length;
  let intervalId = null;
  const AUTOPLAY_MS = 4000;

  // create dots
  for(let i=0;i<total;i++){
    const d = document.createElement('button');
    d.className = 'fa-dot';
    d.dataset.index = i;
    d.setAttribute('aria-label','Ir a slide '+(i+1));
    dotsWrap.appendChild(d);
  }
  const dots = Array.from(dotsWrap.children);

  function update(){
    track.style.transform = `translateX(${-idx * 100}%)`;
    dots.forEach((dot,i)=>dot.classList.toggle('active', i===idx));
  }

  function nextSlide(){ idx = (idx+1) % total; update(); }
  function prevSlide(){ idx = (idx-1+total) % total; update(); }

  next.addEventListener('click', ()=>{
    nextSlide();
    resetInterval();
  });
  prev.addEventListener('click', ()=>{
    prevSlide();
    resetInterval();
  });

  dots.forEach(d=> d.addEventListener('click', e=>{
    idx = Number(e.currentTarget.dataset.index);
    update();
    resetInterval();
  }));

  function startInterval(){
    intervalId = setInterval(nextSlide, AUTOPLAY_MS);
  }
  function resetInterval(){
    clearInterval(intervalId);
    startInterval();
  }

  // start
  update();
  startInterval();

  // Optional: pause on hover
  const carousel = document.querySelector('.fa-carousel');
  carousel.addEventListener('mouseenter', ()=>clearInterval(intervalId));
  carousel.addEventListener('mouseleave', ()=>startInterval());
})();
