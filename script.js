// ============================================================
//  GUAU-BLOG.NET - scripts.js
//  (c) 2003-2004 Firulais Webmaster. Prohibido copiar sin permiso!!
//  Probado en IE6, Netscape 7 y Mozilla Firebird 0.7
// ============================================================

// ---- Contador de visitas (guardado en la "base de datos" localStorage) ----
function contador() {
  var el = document.getElementById("contador");
  if (!el) return;
  var n = 48213; // visitas antes de instalar el contador
  try {
    var guardado = parseInt(localStorage.getItem("guau_visitas"), 10);
    if (!isNaN(guardado)) n = guardado;
    n = n + 1;
    localStorage.setItem("guau_visitas", n);
  } catch (e) { n = n + 1; }
  var s = String(n);
  while (s.length < 6) s = "0" + s;
  el.innerHTML = s;
}

// ---- Reloj en la barra de estado (ahora en la pagina, porque ya no dejan) ----
function reloj() {
  var el = document.getElementById("reloj");
  if (!el) return;
  var d = new Date();
  var h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
  el.innerHTML = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  setTimeout(reloj, 1000);
}

// ---- Ventana de bienvenida (solo la primera vez, no somos animales) ----
function bienvenida() {
  try {
    if (!sessionStorage.getItem("guau_hola")) {
      sessionStorage.setItem("guau_hola", "1");
      setTimeout(function () {
        alert("GUAU!! Bienvenido/a a GUAU-BLOG.NET\n\nEl unico blog escrito 100% por perros.\n\nRecuerda firmar el libro de visitas!!!");
      }, 500);
    }
  } catch (e) {}
}

// ---- Encuesta ----
function votar(opcion) {
  var votos;
  try { votos = JSON.parse(localStorage.getItem("guau_encuesta") || "null"); } catch (e) {}
  if (!votos) votos = { pelota: 41, palo: 27, calcetin: 19, cartero: 58 };
  if (opcion) {
    try {
      if (localStorage.getItem("guau_voto")) { alert("Ya votaste, tramposo!! (un voto por perro)"); return; }
      localStorage.setItem("guau_voto", opcion);
    } catch (e) {}
    votos[opcion]++;
    try { localStorage.setItem("guau_encuesta", JSON.stringify(votos)); } catch (e) {}
  }
  var total = 0, k;
  for (k in votos) total += votos[k];
  var nombres = { pelota: "La pelota", palo: "Un buen palo", calcetin: "Calcetin robado", cartero: "Perseguir al cartero" };
  var html = '<table class="encuesta" width="100%">';
  for (k in votos) {
    var pct = Math.round(votos[k] * 100 / total);
    html += '<tr><td>' + nombres[k] + '</td><td width="60"><div class="barra" style="width:' + pct + '%"></div></td><td>' + pct + '%</td></tr>';
  }
  html += '</table><div style="font-size:9px;color:#666">Total: ' + total + ' votos</div>';
  var res = document.getElementById("resultados");
  if (res) res.innerHTML = html;
}

// ---- Libro de visitas ----
function cargarLibro() {
  var lista = document.getElementById("firmas");
  if (!lista) return;
  var firmas = [];
  try { firmas = JSON.parse(localStorage.getItem("guau_libro") || "[]"); } catch (e) {}
  var base = [
    { n: "Toby (Beagle)", w: "www.tobyelbeagle.com.ar", m: "GUAU GUAU!! Me encanta tu pagina, ya te agregue a mis favoritos. Visita la mia, tiene un juego de flash!!", f: "12/03/2004 22:14" },
    { n: "Pelusa", w: "", m: "hola firulais soy pelusa la de la esquina. porq no me contestas los ladridos?? :(", f: "11/03/2004 19:02" },
    { n: "Max_Rottweiler_2000", w: "geocities.com/max_rott", m: "muy buen blog pero le faltan mas fotos de huesos. saludos desde Rosario", f: "09/03/2004 15:47" },
    { n: "Gato Anonimo", w: "", m: "miau", f: "08/03/2004 03:33" },
    { n: "Lassie", w: "www.lassie-oficial.net", m: "Los invito a todos a mi webring de perros famosos. Ya somos 14 sitios!", f: "05/03/2004 11:20" }
  ];
  var todas = firmas.concat(base);
  var html = "";
  for (var i = 0; i < todas.length; i++) {
    var f = todas[i];
    html += '<div class="chat-msg"><span class="quien">' + esc(f.n) + '</span>';
    if (f.w) html += ' <a href="http://' + esc(f.w) + '" target="_blank">[web]</a>';
    html += ' <span class="cuando">' + esc(f.f) + '</span><br>' + esc(f.m) + '</div>';
  }
  lista.innerHTML = html;
  var c = document.getElementById("num-firmas");
  if (c) c.innerHTML = todas.length;
}

function firmar(form) {
  var n = form.nombre.value.replace(/^\s+|\s+$/g, "");
  var m = form.mensaje.value.replace(/^\s+|\s+$/g, "");
  if (!n || !m) { alert("Tienes que poner tu nombre y un mensaje!!"); return false; }
  if (form.captcha.value.toLowerCase() !== "guau") { alert("Respuesta incorrecta. Que dice un perro?? (pista: empieza con G)"); return false; }
  var d = new Date();
  var f = pad(d.getDate()) + "/" + pad(d.getMonth() + 1) + "/" + d.getFullYear() + " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
  var firmas = [];
  try { firmas = JSON.parse(localStorage.getItem("guau_libro") || "[]"); } catch (e) {}
  firmas.unshift({ n: n, w: form.web.value.replace(/^https?:\/\//, ""), m: m, f: f });
  try { localStorage.setItem("guau_libro", JSON.stringify(firmas)); } catch (e) {}
  form.reset();
  cargarLibro();
  alert("Gracias por firmar!! Tu mensaje ya aparece en el libro.");
  return false;
}

function pad(n) { return (n < 10 ? "0" : "") + n; }
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ---- Estrellitas que siguen al mouse (muy profesional) ----
function estrellas() {
  var colores = ["#ff0000", "#ff9900", "#ffff00", "#00cc00", "#0066ff", "#ff00ff"];
  document.addEventListener("mousemove", function (e) {
    if (Math.random() > 0.35) return;
    var s = document.createElement("div");
    s.innerHTML = "*";
    s.style.cssText = "position:fixed;pointer-events:none;font-weight:bold;font-size:14px;z-index:9999;" +
      "left:" + e.clientX + "px;top:" + e.clientY + "px;color:" + colores[Math.floor(Math.random() * colores.length)] +
      ";transition:transform .7s linear,opacity .7s linear;";
    document.body.appendChild(s);
    setTimeout(function () { s.style.transform = "translateY(20px)"; s.style.opacity = "0"; }, 10);
    setTimeout(function () { s.parentNode && s.parentNode.removeChild(s); }, 750);
  });
}

// ---- Boton de agregar a favoritos ----
function favoritos() {
  alert("Presiona CTRL + D para agregar GUAU-BLOG.NET a tus favoritos!\n\n(Antes esto funcionaba solo en Internet Explorer, ahora hay que hacerlo a mano)");
}

window.onload = function () {
  contador();
  reloj();
  bienvenida();
  votar(null);
  cargarLibro();
  estrellas();
};
