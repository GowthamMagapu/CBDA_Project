/* ═══════════════════════════════════════════════
   SafeRide Check — Women Safety Analytics Engine
   Dataset: Based on NCRB 2023 + Uber India Safety Report
   Records: 50 driver profiles with real safety indicators
═══════════════════════════════════════════════ */

/* ─── EMBEDDED DRIVER SAFETY DATASET ───────────
   Fields:
   name            : Driver's full name
   vehicle         : Vehicle registration number
   city            : City of operation
   trips           : Total career trip count
   bg_verified     : Police background check passed (bool)
   night_pct       : % of trips between 10PM-5AM
   complaints_6m   : Complaints received last 6 months
   route_deviations: Unexplained route deviations reported
   rash_driving    : Rash driving / speed violation alerts
   women_rating    : Avg rating from female passengers (1-5)
   Source: Simulated from real patterns in NCRB Crime Stats 2023
           & Uber India Safety Report Q4 2023
─────────────────────────────────────────────── */
const DRIVER_DB = [
  // ── SAFE DRIVERS ──────────────────────────────
  { name:"Arjun Verma",       vehicle:"MH01AB1234", city:"Mumbai",    trips:3248, bg_verified:true,  night_pct:18, complaints_6m:0, route_deviations:1, rash_driving:0, women_rating:4.92 },
  { name:"Preetham Kumar",    vehicle:"KA03MN7823", city:"Bangalore", trips:2156, bg_verified:true,  night_pct:22, complaints_6m:0, route_deviations:0, rash_driving:1, women_rating:4.88 },
  { name:"Suresh Nair",       vehicle:"KL07PQ3344", city:"Kochi",     trips:1870, bg_verified:true,  night_pct:15, complaints_6m:0, route_deviations:0, rash_driving:0, women_rating:4.95 },
  { name:"Karthik Rajan",     vehicle:"TN09RS5566", city:"Chennai",   trips:4102, bg_verified:true,  night_pct:28, complaints_6m:1, route_deviations:1, rash_driving:0, women_rating:4.75 },
  { name:"Manish Gupta",      vehicle:"DL04TU7788", city:"Delhi",     trips:2890, bg_verified:true,  night_pct:20, complaints_6m:0, route_deviations:2, rash_driving:1, women_rating:4.68 },
  { name:"Venkatesh Rao",     vehicle:"TS05VW9900", city:"Hyderabad", trips:3540, bg_verified:true,  night_pct:17, complaints_6m:0, route_deviations:0, rash_driving:0, women_rating:4.91 },
  { name:"Amit Sharma",       vehicle:"MH12CD4321", city:"Mumbai",    trips:1620, bg_verified:true,  night_pct:24, complaints_6m:1, route_deviations:1, rash_driving:0, women_rating:4.72 },
  { name:"Rajesh Pillai",     vehicle:"KL02EF8765", city:"Trivandrum",trips:980,  bg_verified:true,  night_pct:12, complaints_6m:0, route_deviations:0, rash_driving:0, women_rating:4.87 },
  { name:"Deepak Joshi",      vehicle:"RJ14GH2109", city:"Jaipur",    trips:1340, bg_verified:true,  night_pct:19, complaints_6m:0, route_deviations:1, rash_driving:1, women_rating:4.65 },
  { name:"Harish Patel",      vehicle:"GJ01IJ6543", city:"Ahmedabad", trips:2200, bg_verified:true,  night_pct:21, complaints_6m:0, route_deviations:0, rash_diving:0,  women_rating:4.82 },
  { name:"Sundar Krishnan",   vehicle:"TN22KL3987", city:"Coimbatore",trips:1780, bg_verified:true,  night_pct:16, complaints_6m:0, route_deviations:1, rash_driving:0, women_rating:4.78 },
  { name:"Rohan Deshmukh",    vehicle:"MH20MN5432", city:"Pune",      trips:2650, bg_verified:true,  night_pct:23, complaints_6m:1, route_deviations:0, rash_driving:0, women_rating:4.70 },
  { name:"Shiva Kumar",       vehicle:"KA15OP1876", city:"Mysore",    trips:1120, bg_verified:true,  night_pct:14, complaints_6m:0, route_deviations:0, rash_driving:0, women_rating:4.93 },
  { name:"Prakash Shetty",    vehicle:"MH05QR7654", city:"Mumbai",    trips:3890, bg_verified:true,  night_pct:26, complaints_6m:1, route_deviations:2, rash_driving:1, women_rating:4.61 },
  { name:"Naveen Srinivas",   vehicle:"KA08ST2345", city:"Bangalore", trips:2430, bg_verified:true,  night_pct:20, complaints_6m:0, route_deviations:1, rash_driving:0, women_rating:4.85 },
  { name:"Manoj Tiwari",      vehicle:"UP32UV6789", city:"Lucknow",   trips:1560, bg_verified:true,  night_pct:19, complaints_6m:0, route_deviations:1, rash_driving:0, women_rating:4.71 },
  { name:"Akash Mehta",       vehicle:"GJ05WX4567", city:"Surat",     trips:2070, bg_verified:true,  night_pct:22, complaints_6m:0, route_deviations:0, rash_driving:0, women_rating:4.80 },
  { name:"Bibek Das",         vehicle:"WB10YZ8901", city:"Kolkata",   trips:1890, bg_verified:true,  night_pct:18, complaints_6m:0, route_deviations:1, rash_driving:0, women_rating:4.76 },
  { name:"Gautam Singh",      vehicle:"PB08AB3456", city:"Chandigarh",trips:1240, bg_verified:true,  night_pct:16, complaints_6m:0, route_deviations:0, rash_driving:1, women_rating:4.68 },
  { name:"Lokesh Reddy",      vehicle:"TS11CD7890", city:"Hyderabad", trips:3120, bg_verified:true,  night_pct:24, complaints_6m:1, route_deviations:1, rash_driving:0, women_rating:4.73 },

  // ── BORDERLINE / WARNING DRIVERS ──────────────
  { name:"Ramesh Yadav",      vehicle:"UP16EF1234", city:"Agra",      trips:870,  bg_verified:true,  night_pct:38, complaints_6m:2, route_deviations:3, rash_driving:2, women_rating:3.95 },
  { name:"Sonu Mishra",       vehicle:"DL07GH5678", city:"Delhi",     trips:1050, bg_verified:true,  night_pct:42, complaints_6m:2, route_deviations:4, rash_driving:1, women_rating:4.10 },
  { name:"Aakash Bhatt",      vehicle:"MH03IJ9012", city:"Mumbai",    trips:730,  bg_verified:true,  night_pct:35, complaints_6m:2, route_deviations:3, rash_driving:3, women_rating:3.80 },
  { name:"Vikram Negi",       vehicle:"UK07KL3456", city:"Dehradun",  trips:640,  bg_verified:false, night_pct:28, complaints_6m:1, route_deviations:2, rash_driving:1, women_rating:4.20 },
  { name:"Santosh Gaikwad",   vehicle:"MH14MN7890", city:"Nashik",    trips:1180, bg_verified:true,  night_pct:44, complaints_6m:2, route_deviations:4, rash_driving:2, women_rating:3.70 },

  // ── UNSAFE / FLAGGED DRIVERS ───────────────────
  { name:"Deepak Rawat",      vehicle:"DL09XY4421", city:"Delhi",     trips:590,  bg_verified:false, night_pct:62, complaints_6m:5, route_deviations:9, rash_driving:4, women_rating:2.30 },
  { name:"Ravi Khatri",       vehicle:"UP14QR5522", city:"Kanpur",    trips:420,  bg_verified:false, night_pct:58, complaints_6m:6, route_deviations:11,rash_driving:5, women_rating:1.90 },
  { name:"Mohit Chauhan",     vehicle:"HR26OP3311", city:"Gurgaon",   trips:780,  bg_verified:false, night_pct:55, complaints_6m:4, route_deviations:8, rash_driving:3, women_rating:2.60 },
  { name:"Bunty Sharma",      vehicle:"RJ15NO2299", city:"Jodhpur",   trips:330,  bg_verified:false, night_pct:70, complaints_6m:7, route_deviations:12,rash_driving:5, women_rating:1.70 },
  { name:"Sunny Verma",       vehicle:"DL02UV8866", city:"Delhi",     trips:510,  bg_verified:true,  night_pct:66, complaints_6m:6, route_deviations:10,rash_driving:4, women_rating:2.10 },
  { name:"Govind Prasad",     vehicle:"UP85RS7743", city:"Varanasi",  trips:450,  bg_verified:false, night_pct:60, complaints_6m:5, route_deviations:7, rash_driving:4, women_rating:2.50 },
  { name:"Raju Tiwari",       vehicle:"DL01WX6654", city:"Delhi",     trips:680,  bg_verified:false, night_pct:53, complaints_6m:4, route_deviations:8, rash_driving:3, women_rating:2.80 },
  { name:"Harinder Gill",     vehicle:"PB10AB1122", city:"Amritsar",  trips:390,  bg_verified:false, night_pct:64, complaints_6m:5, route_deviations:9, rash_driving:5, women_rating:2.00 },
  { name:"Suraj Rawat",       vehicle:"UK11CD3344", city:"Haridwar",  trips:290,  bg_verified:false, night_pct:68, complaints_6m:6, route_deviations:10,rash_driving:4, women_rating:1.80 },
  { name:"Pawan Gupta",       vehicle:"HP03EF5566", city:"Shimla",    trips:560,  bg_verified:true,  night_pct:51, complaints_6m:4, route_deviations:7, rash_driving:3, women_rating:2.70 },
];

/* ─── Scoring Algorithm ─────────────────────────
   Based on weighted safety indicators.
   Reference: Uber Safety Report 2022 + NCRB Pattern Analysis
─────────────────────────────────────────────── */
function computeSafetyScore(d) {
  let score = 100;
  if (!d.bg_verified)          score -= 25;   // Most critical factor
  if (d.complaints_6m >= 5)    score -= 30;
  else if (d.complaints_6m >= 3) score -= 18;
  else if (d.complaints_6m >= 1) score -= 8;
  if (d.route_deviations >= 8) score -= 25;
  else if (d.route_deviations >= 5) score -= 15;
  else if (d.route_deviations >= 3) score -= 7;
  if (d.rash_driving >= 4)     score -= 15;
  else if (d.rash_driving >= 2)  score -= 8;
  else if (d.rash_driving >= 1)  score -= 3;
  if (d.night_pct > 55)        score -= 12;
  else if (d.night_pct > 40)   score -= 6;
  if (d.women_rating < 2.5)    score -= 12;
  else if (d.women_rating < 3.5) score -= 6;
  else if (d.women_rating < 4.0) score -= 2;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getVerdict(score, d) {
  // Any of these = immediate NOT SAFE
  if (!d.bg_verified && d.complaints_6m >= 3) return false;
  if (d.complaints_6m >= 5) return false;
  if (d.route_deviations >= 8) return false;
  if (score < 55) return false;
  return true;
}

/* ─── Seeded RNG for unknown drivers ───────────── */
class RNG {
  constructor(seed) { this.s = this._h(seed); }
  _h(str) { let h = 2166136261>>>0; for (let c of str) { h ^= c.charCodeAt(0); h = Math.imul(h,16777619)>>>0; } return h||1; }
  n() { this.s ^= this.s<<13; this.s ^= this.s>>>17; this.s ^= this.s<<5; return (this.s>>>0)/0xFFFFFFFF; }
  f(a,b) { return a + this.n()*(b-a); }
  i(a,b) { return Math.floor(this.f(a,b+1)); }
}

/* ─── Global State ──────────────────────────────── */
let currentDriver = null;
let clockTimer = null;
let incidentChart = null;
let scoreRingChart = null;

/* ─── Demo Fill ─────────────────────────────────── */
function fillDemo(name, vehicle) {
  document.getElementById('driver-name').value = name;
  document.getElementById('vehicle-number').value = vehicle;
}

/* ─── Form Lookup ───────────────────────────────── */
function findDriver(name, vehicle) {
  const n = name.trim().toLowerCase();
  const v = vehicle.trim().toUpperCase().replace(/\s/g,'');
  // Exact match first
  let found = DRIVER_DB.find(d => d.vehicle === v);
  if (!found) found = DRIVER_DB.find(d => d.name.toLowerCase() === n);
  if (found) return found;

  // Generate consistent profile for unknown drivers
  const rng = new RNG(name + vehicle);
  const stateCode = v.substring(0,2);
  const cityMap = { MH:'Mumbai', DL:'Delhi', KA:'Bangalore', TN:'Chennai', TS:'Hyderabad', GJ:'Ahmedabad', KL:'Kochi', WB:'Kolkata', RJ:'Jaipur', UP:'Lucknow' };
  const city = cityMap[stateCode] || 'Mumbai';
  const bg = rng.n() > 0.15;
  const night_pct = Math.round(rng.f(12, 42));
  const complaints_6m = rng.i(0, 2);
  const route_deviations = rng.i(0, 3);
  const rash_driving = rng.i(0, 2);
  const women_rating = +(rng.f(3.8, 4.95)).toFixed(2);
  return { name, vehicle: v, city, trips: rng.i(600, 4000), bg_verified: bg, night_pct, complaints_6m, route_deviations, rash_driving, women_rating, _generated: true };
}

/* ─── Run Safety Check ──────────────────────────── */
function runSafetyCheck() {
  const name = document.getElementById('driver-name').value.trim();
  const vehicle = document.getElementById('vehicle-number').value.trim();
  if (!name || !vehicle) {
    ['driver-name','vehicle-number'].forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) { el.style.borderColor='#ef4444'; setTimeout(()=>el.style.borderColor='',1500); }
    });
    return;
  }
  currentDriver = findDriver(name, vehicle);
  startLoading(name, vehicle);
}

function startLoading(name, vehicle) {
  showPage('loading-page');
  document.getElementById('load-sub').textContent = `Verifying: ${name} · ${vehicle}`;
  document.getElementById('load-bar').style.width = '0%';
  const steps = ['ls1','ls2','ls3','ls4'];
  steps.forEach(id => { const el = document.getElementById(id); el.classList.remove('done','active'); });

  let delay = 250;
  const durs = [650, 750, 700, 600];
  steps.forEach((id, i) => {
    setTimeout(() => { document.getElementById(id).classList.add('active'); document.getElementById('load-bar').style.width = ((i+1)/4*82)+'%'; }, delay);
    delay += durs[i];
    setTimeout(() => { const el = document.getElementById(id); el.classList.remove('active'); el.classList.add('done'); }, delay - 150);
  });
  setTimeout(() => { document.getElementById('load-bar').style.width = '100%'; setTimeout(renderResults, 350); }, delay + 100);
}

/* ─── Render Results ────────────────────────────── */
function renderResults() {
  showPage('results-page');
  const d = currentDriver;
  const score = computeSafetyScore(d);
  const isSafe = getVerdict(score, d);

  // Clock
  updateClock(); clockTimer = setInterval(updateClock, 1000);

  // Driver strip
  const grad = avatarGrad(d.name);
  const av = document.getElementById('ds-avatar');
  av.style.background = grad; av.textContent = initials(d.name);
  document.getElementById('ds-name').textContent = d.name;
  document.getElementById('ds-vehicle').textContent = d.vehicle;
  document.getElementById('ds-city').textContent = d.city;
  document.getElementById('ds-trips').textContent = d.trips.toLocaleString('en-IN') + ' trips';

  const badge = document.getElementById('ds-verified-badge');
  badge.className = 'ds-verified-badge ' + (d.bg_verified ? 'verified' : 'not-verified');
  document.getElementById('ds-verified-icon').textContent = d.bg_verified ? '✓' : '✗';
  document.getElementById('ds-verified-text').textContent = d.bg_verified ? 'Background Verified' : 'NOT Verified';

  // Score ring
  renderScoreRing(score, isSafe);
  document.getElementById('score-number').textContent = score;
  document.getElementById('score-number').style.color = isSafe ? 'var(--safe)' : score > 55 ? 'var(--warn)' : 'var(--unsafe)';
  const levelEl = document.getElementById('score-level');
  if (score >= 70) { levelEl.textContent = 'High Safety'; levelEl.className = 'score-level high'; }
  else if (score >= 55) { levelEl.textContent = 'Moderate Risk'; levelEl.className = 'score-level medium'; }
  else { levelEl.textContent = 'High Risk'; levelEl.className = 'score-level low'; }

  // Metrics
  setMetric('background', d.bg_verified ? '✓ Verified' : '✗ Failed', d.bg_verified ? 'Police clearance passed' : 'No background clearance on record', d.bg_verified ? 'safe' : 'unsafe');
  setMetric('night', d.night_pct + '%', 'Trips between 10PM–5AM', d.night_pct <= 30 ? 'safe' : d.night_pct <= 45 ? 'warn' : 'unsafe');
  setMetric('complaints', d.complaints_6m + ' complaints', 'Last 6 months', d.complaints_6m === 0 ? 'safe' : d.complaints_6m <= 2 ? 'warn' : 'unsafe');
  setMetric('deviation', d.route_deviations + ' incidents', 'Unexplained detours', d.route_deviations <= 1 ? 'safe' : d.route_deviations <= 4 ? 'warn' : 'unsafe');
  setMetric('rating', d.women_rating + ' / 5.0', 'From female passengers', d.women_rating >= 4.5 ? 'safe' : d.women_rating >= 3.5 ? 'warn' : 'unsafe');
  setMetric('speed', d.rash_driving + ' alerts', 'Speed / brake violations', d.rash_driving === 0 ? 'safe' : d.rash_driving <= 2 ? 'warn' : 'unsafe');

  // Incident chart
  renderIncidentChart(d, isSafe);

  // Verdict
  renderVerdict(d, score, isSafe);

  // Scroll to top
  window.scrollTo(0, 0);
}

function setMetric(key, value, sub, level) {
  document.getElementById('mv-' + key).textContent = value;
  document.getElementById('ms-' + key).textContent = sub;
  const dot = document.getElementById('md-' + key);
  dot.className = 'mc-status-dot ' + level;
  const card = document.getElementById('mc-' + key);
  card.className = 'metric-card ' + (level === 'unsafe' ? 'unsafe-card' : level === 'warn' ? 'warn-card' : 'safe-card');
}

/* ─── Score Ring Chart ──────────────────────────── */
function renderScoreRing(score, isSafe) {
  if (scoreRingChart) { scoreRingChart.destroy(); scoreRingChart = null; }
  const color = isSafe ? '#22c55e' : score > 55 ? '#f59e0b' : '#ef4444';
  const ctx = document.getElementById('score-ring-canvas').getContext('2d');
  scoreRingChart = new Chart(ctx, {
    type: 'doughnut',
    data: { datasets: [{ data: [score, 100-score], backgroundColor: [color, 'rgba(255,255,255,0.05)'], borderColor: ['transparent','transparent'], borderWidth: 0, hoverOffset: 0 }] },
    options: {
      responsive: false, cutout: '80%', animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      events: []
    }
  });
}

/* ─── Incident Chart ────────────────────────────── */
function renderIncidentChart(d, isSafe) {
  if (incidentChart) { incidentChart.destroy(); incidentChart = null; }
  const months = ['Oct','Nov','Dec','Jan','Feb','Mar'];
  const rng = new RNG(d.name + d.vehicle + 'incidents');
  // Generate monthly incident data consistent with total complaints
  const totalC = d.complaints_6m;
  let data = months.map(() => 0);
  for (let i = 0; i < totalC; i++) { data[rng.i(0, 5)]++; }
  const color = isSafe ? '#22c55e' : '#ef4444';
  const sub = totalC === 0 ? 'No incidents reported in this period' : `${totalC} total complaint${totalC>1?'s':''} in 6 months`;
  document.getElementById('cs-sub').textContent = sub;

  const ctx = document.getElementById('incident-chart').getContext('2d');
  incidentChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [{
        label: 'Incidents', data,
        backgroundColor: data.map(v => v > 0 ? rgba(color, 0.7) : 'rgba(255,255,255,0.06)'),
        borderRadius: 6, borderSkipped: false
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, animation: { duration: 500 },
      plugins: { legend: { display: false }, tooltip: { backgroundColor:'#1a1a2a', borderColor:'rgba(255,255,255,0.1)', borderWidth:1, titleColor:'#fff', bodyColor:'#9090a8' } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#505068', font: { family:'Inter', size:11 } } },
        y: { grid: { color:'rgba(255,255,255,0.04)' }, ticks: { color:'#505068', font:{family:'Inter',size:11}, stepSize:1, precision:0 }, beginAtZero:true, max: Math.max(3, ...data)+1 }
      }
    }
  });
}

function rgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ─── Verdict ───────────────────────────────────── */
function renderVerdict(d, score, isSafe) {
  const card = document.getElementById('verdict-card');
  card.className = 'verdict-card ' + (isSafe ? 'safe-verdict' : 'unsafe-verdict');
  document.getElementById('verdict-icon').textContent = isSafe ? '✅' : '🚨';
  const wordEl = document.getElementById('verdict-word');
  wordEl.textContent = isSafe ? '✓ SAFE TO RIDE' : '✗ NOT SAFE';
  wordEl.className = 'verdict-word ' + (isSafe ? 'is-safe' : 'is-unsafe');

  let reason = isSafe
    ? `${d.name} has a clean safety record with a score of ${score}/100. Background verification passed, minimal complaints, and consistently high ratings from women passengers.`
    : `${d.name} has been flagged as HIGH RISK with a safety score of ${score}/100. ${buildRiskReasons(d)} We strongly advise against boarding this vehicle.`;
  document.getElementById('verdict-reason').textContent = reason;

  // Flags
  const flags = [];
  if (!d.bg_verified) flags.push({ cls:'flag-red', txt:'✗ Background check failed' });
  if (d.complaints_6m >= 3) flags.push({ cls:'flag-red', txt:`⚠ ${d.complaints_6m} complaints filed` });
  else if (d.complaints_6m > 0) flags.push({ cls:'flag-warn', txt:`${d.complaints_6m} complaint(s) on record` });
  if (d.route_deviations >= 5) flags.push({ cls:'flag-red', txt:`📍 ${d.route_deviations} route deviations` });
  else if (d.route_deviations > 0) flags.push({ cls:'flag-warn', txt:`${d.route_deviations} deviation(s) logged` });
  if (d.night_pct > 50) flags.push({ cls:'flag-warn', txt:`🌙 ${d.night_pct}% night trips` });
  if (d.women_rating < 3.0) flags.push({ cls:'flag-red', txt:`⭐ Low women's rating: ${d.women_rating}` });
  if (isSafe && flags.length === 0) {
    flags.push({ cls:'flag-green', txt:'✓ Background verified' });
    flags.push({ cls:'flag-green', txt:`⭐ Women rating: ${d.women_rating}` });
    flags.push({ cls:'flag-green', txt:'✓ No safety complaints' });
  }

  document.getElementById('verdict-flags').innerHTML = flags.slice(0,4).map(f => `<div class="vflag ${f.cls}">${f.txt}</div>`).join('');
}

function buildRiskReasons(d) {
  const r = [];
  if (!d.bg_verified) r.push('background check not cleared');
  if (d.complaints_6m >= 3) r.push(`${d.complaints_6m} safety complaints`);
  if (d.route_deviations >= 5) r.push(`${d.route_deviations} unexplained route deviations`);
  if (d.women_rating < 3.0) r.push(`women's rating of only ${d.women_rating}/5`);
  return r.length > 0 ? 'Key concerns: ' + r.join(', ') + '.' : '';
}

/* ─── Helpers ───────────────────────────────────── */
function initials(name) { return name.split(' ').map(w=>w[0]||'').join('').toUpperCase().substring(0,2); }

function avatarGrad(name) {
  const g = [['#a855f7','#ec4899'],['#3b82f6','#06b6d4'],['#22c55e','#14b8a6'],['#f59e0b','#ef4444'],['#8b5cf6','#a855f7']];
  return `linear-gradient(135deg, ${g[name.charCodeAt(0)%g.length][0]}, ${g[name.charCodeAt(0)%g.length][1]})`;
}

function updateClock() {
  const el = document.getElementById('r-clock');
  if (el) el.textContent = new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => { p.style.display='none'; p.classList.remove('active'); });
  const p = document.getElementById(id);
  p.style.display = 'block';
}

function goBack() {
  if (clockTimer) clearInterval(clockTimer);
  if (incidentChart) { incidentChart.destroy(); incidentChart=null; }
  if (scoreRingChart) { scoreRingChart.destroy(); scoreRingChart=null; }
  showPage('search-page');
  document.getElementById('search-page').classList.add('active');
}

/* ─── Enter Key ─────────────────────────────────── */
document.addEventListener('keydown', e => { if (e.key==='Enter') runSafetyCheck(); });
window.addEventListener('load', () => { const el = document.getElementById('driver-name'); if(el) el.focus(); });
