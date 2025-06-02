/* ===== Helpers ===== */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* ===== Footer year ===== */
$('#foot-year').textContent = new Date().getFullYear();

/* ===== Mobile-menu toggle ===== */
const menuToggle = $('#menu-toggle');
const mobileMenu = $('#mobile-menu');
menuToggle.addEventListener('click', () => {
  const open  = mobileMenu.style.display !== 'flex';
  mobileMenu.style.display = open ? 'flex' : 'none';
  menuToggle.innerHTML = `<i data-lucide="${open ? 'x' : 'menu'}"></i>`;
  lucide.createIcons();
});

/* ===== Smooth-scroll hero → timeline ===== */
$('#scroll-timeline').onclick = e => {
  e.preventDefault();
  $('#timeline').scrollIntoView({behavior:'smooth',block:'start'});
};

/* ===== Timeline data ===== */
const data = [
  { y:'1968', t:'Intel Founded', d:'Robert Noyce and Gordon Moore rename NM Electronics to Intel Corporation, laying the foundation for decades of innovation.', i:'leaf', img:'img/1.jpg' },
  { y:'1971', t:'First Microprocessor', d:"Intel debuts the 4004—the world's first commercial microprocessor—igniting the revolution.", i:'sun', img:'img/2.jpg' },
  { y:'1978', t:'8086 Processor', d:'Launch of the 8086 processor, establishing the x86 architecture that powers countless PCs.', i:'recycle', img:'img/3.jpg' },
  { y:'1985', t:'386 Processor', d:'Intel introduces the 32-bit 386 processor, ushering in new performance and multitasking.', i:'factory', img:'img/4.jpg' },
  { y:'2006', t:'Peak GHG Emissions', d:'Intel’s highest Scope 1+2 emissions; following years focus on abatement and renewables.', i:'wind', img:'https://images.unsplash.com/photo-1592664858534-4d54dd0c4c9f?auto=format&fit=crop&w=800&q=80' },
  { y:'2020', t:'RISE Strategy', d:'Intel launches RISE 2030 goals for climate action, water stewardship, and waste reduction.', i:'trees', img:'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=800&q=80' },
  { y:'2022', t:'Net-Zero by 2040', d:'Intel commits to net-zero Scope 1+2 emissions across global operations by 2040.', i:'droplet', img:'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80' },
  { y:'2023', t:'99 % Renewable Electricity', d:'Achieves 99 % renewable electricity worldwide, drastically lowering emissions.', i:'sun', img:'https://images.unsplash.com/photo-1592664858534-4d54dd0c4c9f?auto=format&fit=crop&w=800&q=80' },
  { y:'2024', t:'Sustainability Summit', d:'First Intel Sustainability Summit unites suppliers, officials, and industry leaders.', i:'leaf', img:'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=800&q=80' }
];

/* ===== Build MOBILE carousel ===== */
const carouselInner = $('#carousel-inner');
const dotsWrap      = $('#indicator-dots');

data.forEach((o, idx) => {
  /* slide */
  const slide = document.createElement('div');
  slide.className = 'carousel-item';
  slide.dataset.index = idx;
  slide.innerHTML = `
    <div class="card">
      <div class="card__img">
        <img src="${o.img}" alt="${o.y}" />
        <div class="card__year">${o.y}</div>
      </div>
      <div class="card__body">
        <div class="card__icon"><i data-lucide="${o.i}"></i></div>
        <h3 class="card__title">${o.t}</h3>
        <p class="card__desc">${o.d}</p>
      </div>
    </div>`;
  carouselInner.appendChild(slide);

  /* dot */
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.dataset.index = idx;
  dotsWrap.appendChild(dot);
});

/* ===== Build DESKTOP rows ===== */
const rowsWrap = $('#timeline-desktop');
data.forEach((o, idx) => {
  const row = document.createElement('div');
  row.className = `row${idx%2 ? ' reverse':''}`;
  row.innerHTML = `
    <div class="row__spacer"></div>
    <div class="row__connector">
      <div class="dot-lg"><div class="dot-lg__inner"></div></div>
    </div>
    <div class="row__content" data-row="${idx}">
      <div class="row__meta">
        <div class="card__icon"><i data-lucide="${o.i}"></i></div>
        <span class="row__year">${o.y}</span>
      </div>
      <h3 class="row__title">${o.t}</h3>
      <p class="row__desc">${o.d}</p>
      <div class="row__imgWrap"><img src="${o.img}" alt="${o.y}"></div>
    </div>`;
  rowsWrap.appendChild(row);
});

/* ===== Carousel behaviour ===== */
const carousel = $('#carousel');
const slides   = $$('.carousel-item');
const dots     = $$('.dot');
const prevBtn  = $('#prev-btn');
const nextBtn  = $('#next-btn');

let active = 0;
function updateArrows(){
  prevBtn.disabled = active === 0;
  nextBtn.disabled = active === slides.length-1;
}
function setActive(i, smooth=true){
  active = i;
  carousel.scrollTo({left:carousel.clientWidth*active,behavior:smooth?'smooth':'auto'});
  dots.forEach((d,ix)=>d.classList.toggle('dot--active',ix===active));
  $('#progress-text').innerHTML = `<span class="accent">${active+1}</span> of ${slides.length}`;
  slides.forEach((s,ix)=>{
    s.style.transform = `perspective(1000px) rotateY(${(ix-active)*30}deg) translateZ(${Math.abs(ix-active)?-150:0}px)`;
    s.style.opacity   = ix===active?1:0.6;
    s.style.zIndex    = slides.length-Math.abs(ix-active);
  });
  updateArrows();
}
setActive(0,false);

/* scroll-sync */
carousel.addEventListener('scroll',()=>{
  const i = Math.round(carousel.scrollLeft / carousel.clientWidth);
  if(i!==active) setActive(i,false);
});

/* arrows & dots */
prevBtn.addEventListener('click',()=> active && setActive(active-1));
nextBtn.addEventListener('click',()=> active<slides.length-1 && setActive(active+1));
dotsWrap.addEventListener('click',e=>{
  const b=e.target.closest('.dot');
  if(b) setActive(+b.dataset.index);
});

/* ===== Desktop row “persist-open” on click ===== */
let activeRow = null;
rowsWrap.addEventListener('click', e=>{
  const content = e.target.closest('.row__content');
  if(!content) return;
  if(activeRow) activeRow.classList.remove('row__content--active');
  content.classList.add('row__content--active');
  activeRow = content;
});

/* ===== Icons ===== */
lucide.createIcons();
