
const MEMORY_VIDEOS = [
  ["videos/theunseriousones1.mp4", "videos/theunseriousones2.mp4", "videos/theunseriousones3.mp4", "videos/theunseriousones4.mp4", "videos/theunseriousones5.mp4", "videos/theunseriousones6.mp4"],
  ["videos/maincharactermoment1.mp4", "videos/maincharacter2.mp4", "videos/maincharacter3.mp4", "videos/maincharacter4.mp4", "videos/maincharacter5.mp4", "videos/maincharacter6.mp4", "videos/maincharacter7.mp7", "videos/maincharacter8.mp4"],
  ["videos/shouldntpost1.mp4", "videos/shouldntpost2.mp4", "videos/shouldntpost3.mp4", "videos/shouldntpost4.mp4", "videos/shouldntpost5.mp4"],
  ["videos/aramideandbibi.mp4", "videos/ourmoment.mp4", "videos/ourmoment2.mp4", "videos/ourmoment3.mp4", "videos/ourmoment4.mp4", "videos/ourmoment5.mp4", "videos/ourmoment6.mp4"],
];
const WALL_PHOTOS = [
  { cap: "that day 💙", date: "2025", img: "images/aramidepicture4.jpeg" },
  { cap: "power group", date: "2026", img: "images/powergroup.jpeg" },
  { cap: "main character", date: "2026", img: "images/maincharacter.jpeg", },
  { cap: "Aunty K 💙", date: "2026", img: "images/aramidepicture2.jpeg" },
  { cap: " Our Birthday Girl", date: "2026", img: "images/aramidepicture3.jpeg" },
  { cap: "Sexiest", date: "2025", img: "images/aramidepicture.jpeg" },
  { cap: "sweet girl era", date: "2026", img: "images/sweetgirlera.jpeg" },
  { cap: "the goofiest", date: "2026", img: "images/goofy.jpeg" },
];
const THINGS = [
  "Your unpredictable madness", "Your selflessness", "Your playfulness (another fra)", "Your sense of responsibility", "Your confidence",
  "Your ability to make everything fun", "Your good energy", "Your friendship",
  "Your loyalty", "Your style", "How you always sing that your weird yoruba song for me -Somto", "Your glow", "Your honesty",
  "Your consideration", "A beautiful person inside out -Sali", "Your chaos", "Your patience with us", "How I never asked you to be a good friend to me -Bibi",
  "Your hugs", "Your support towards my business -Favour", "Your caring nature", "Your resilience", "Simply — you"
];
const PLAYLIST = [
  { title: "I Alone", artist: "BNXN (Buju)", src: "audio/buju1.mp3" },
  { title: "COMMANDER", artist: "BNXN (Buju)", src: "audio/buju2.mp3" },
  { title: "Ginger Me", artist: "BNXN (Buju)", src: "audio/buju3.mp3" },
];
const COLLAGE_NAMES = ["us", "her people", "the girls", "forever"];
/* ===================================================================== */

// intro
document.getElementById('enterBtn').addEventListener('click', () => {
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('site').classList.add('visible');
});

// starfield particles
(function () {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, stars = [];
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.documentElement.scrollHeight;
  }
  function init() {
    resize();
    stars = Array.from({ length: Math.min(140, Math.floor(w * h / 16000)) }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.4 + .3,
      s: Math.random() * .5 + .1, o: Math.random() * .6 + .2
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const st of stars) {
      ctx.globalAlpha = st.o;
      ctx.fillStyle = '#bcd6ff';
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fill();
      st.y += st.s * 0.15;
      if (st.y > h) st.y = 0;
    }
    requestAnimationFrame(draw);
  }
  init();
  window.addEventListener('resize', init);
  draw();
})();

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: .15 });
revealEls.forEach(el => io.observe(el));

let currentVids = [];
let currentVidIndex = 0;
function renderMemoryVideo() {
  const media = document.getElementById('lightboxMedia');
  if (!currentVids.length) { media.innerHTML = `<div class="ph-fill"></div>`; return; }
  const counter = currentVids.length > 1
    ? `<div class="vid-counter">${currentVidIndex + 1} / ${currentVids.length}</div>` : '';
  const arrows = currentVids.length > 1
    ? `<button class="vid-arrow vid-prev" id="vidPrev">&larr;</button><button class="vid-arrow vid-next" id="vidNext">&rarr;</button>` : '';
  media.innerHTML = `<div class="vid-wrap">
      <video src="${currentVids[currentVidIndex]}" controls autoplay style="width:100%;border-radius:6px;"></video>
      ${arrows}${counter}
    </div>`;
  if (currentVids.length > 1) {
    document.getElementById('vidPrev').addEventListener('click', () => { currentVidIndex = (currentVidIndex - 1 + currentVids.length) % currentVids.length; renderMemoryVideo(); });
    document.getElementById('vidNext').addEventListener('click', () => { currentVidIndex = (currentVidIndex + 1) % currentVids.length; renderMemoryVideo(); });
  }
}
document.querySelectorAll('.mcard').forEach(card => {
  card.addEventListener('click', () => {
    const cat = card.dataset.cat;
    currentVids = MEMORY_VIDEOS[cat] || [];
    currentVidIndex = 0;
    renderMemoryVideo();
    document.getElementById('lightboxCap').textContent = card.querySelector('h3').textContent;
    document.getElementById('lightbox').classList.add('open');
  });
});

// photo wall build
const wall = document.getElementById('wall');
WALL_PHOTOS.forEach(p => {
  const div = document.createElement('div');
  div.className = 'wpolaroid';
  const thumb = p.img ? `<img class="ph-fill" src="${p.img}">` : `<div class="ph-fill"></div>`;
  div.innerHTML = `<div class="wtape"></div>${thumb}<div class="wcap">${p.cap}</div>`;
  div.addEventListener('click', () => {
    document.getElementById('lightboxMedia').innerHTML = `<div class="ph-fill"></div>`;
    document.getElementById('lightboxCap').textContent = `${p.cap} — ${p.date}`;
    document.getElementById('lightbox').classList.add('open');
  });
  wall.appendChild(div);
});

// lightbox close
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  const vid = document.querySelector('#lightboxMedia video');
  if (vid) vid.pause();
}
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', (e) => { if (e.target.id === 'lightbox') closeLightbox(); });

// messages carousel
const slides = document.getElementById('msgSlides');
const slideCount = slides.children.length;
let msgIndex = 0;
const dotsWrap = document.getElementById('msgDots');
for (let i = 0; i < slideCount; i++) {
  const d = document.createElement('div');
  d.className = 'd' + (i === 0 ? ' active' : '');
  dotsWrap.appendChild(d);
}
function updateMsgHeight() { const track = document.querySelector('.msg-track'); const activeCard = slides.children[msgIndex]; track.style.height = activeCard.offsetHeight + 'px'; } function updateMsg() { slides.style.transform = `translateX(-${msgIndex * 100}%)`;[...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === msgIndex)); updateMsgHeight(); } updateMsgHeight();

document.getElementById('msgPrev').addEventListener('click', () => { msgIndex = (msgIndex - 1 + slideCount) % slideCount; updateMsg(); });
document.getElementById('msgNext').addEventListener('click', () => { msgIndex = (msgIndex + 1) % slideCount; updateMsg(); });

const music = document.getElementById("birthdayMusic");
window.addEventListener("load", () => {
  music.play().catch(() => {
    console.log("Autoplay blocked — waiting for user interaction.");
  });
});

document.addEventListener("click", () => {


  music.play();

}, { once: true });
const audio = document.getElementById('audioEl');
const playToggle = document.getElementById('playToggle');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const curTime = document.getElementById('curTime');
const durTime = document.getElementById('durTime');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const playlistEl = document.getElementById('playlist');
let songIndex = 0;

function fmt(t) { if (isNaN(t)) return '0:00'; const m = Math.floor(t / 60), s = Math.floor(t % 60); return `${m}:${s < 10 ? '0' : ''}${s}`; }
function loadSong(i) {
  songIndex = (i + PLAYLIST.length) % PLAYLIST.length;
  const song = PLAYLIST[songIndex];
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  audio.src = song.src || '';
  progressFill.style.width = '0%';
  curTime.textContent = '0:00'; durTime.textContent = '0:00';
  playToggle.classList.remove('playing');
  [...playlistEl.children].forEach((el, idx) => el.style.color = idx === songIndex ? 'var(--soft-blue)' : 'inherit');
}
PLAYLIST.forEach((s, i) => {
  const row = document.createElement('div');
  row.className = 'playlist-item';
  row.innerHTML = `<span>${s.title}</span><span>${s.artist}</span>`;
  row.addEventListener('click', () => loadSong(i));
  playlistEl.appendChild(row);
});
loadSong(0);

playToggle.addEventListener('click', () => {
  if (!audio.src) { return; }
  if (audio.paused) {
    document.getElementById('birthdayMusic').pause();
    audio.play().catch(() => { });
    playToggle.classList.add('playing');
  } else {
    audio.pause();
    playToggle.classList.remove('playing');
  }
});
document.getElementById('nextSong').addEventListener('click', () => loadSong(songIndex + 1));
document.getElementById('prevSong').addEventListener('click', () => loadSong(songIndex - 1));
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progressFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
    curTime.textContent = fmt(audio.currentTime);
    durTime.textContent = fmt(audio.duration);
  }
});
progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  if (audio.duration) audio.currentTime = pct * audio.duration;
});
document.getElementById('volSlider').addEventListener('input', (e) => audio.volume = e.target.value);
audio.volume = 0.6;

// 23 things
const thingsGrid = document.getElementById('thingsGrid');
THINGS.forEach((t, i) => {
  const card = document.createElement('div');
  card.className = 'thing';
  card.innerHTML = `<div class="num">${String(i + 1).padStart(2, '0')}</div><div class="txt">${t}</div>`;
  card.addEventListener('click', () => card.classList.toggle('open'));
  thingsGrid.appendChild(card);
});

// collage
const collage = document.getElementById('collage');
COLLAGE_NAMES.forEach(n => {
  const c = document.createElement('div');
  c.className = 'collage-face';
  c.textContent = n;
  collage.appendChild(c);
});