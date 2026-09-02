/* bok-labs.com · page script.
   Three jobs: the language, the divider (the one bespoke system on this page),
   and the form. The scroll engine (engine/scrollcraft.js) is never edited. */
(function () {
  'use strict';

  /* ------------------------------------------------------------ language */
  var ES = {
    'meta.title': 'BOK Labs · Automatización y sistemas con IA para pequeños negocios · Maracaibo, Venezuela',
    'meta.desc': 'BOK Labs construye los flujos de trabajo, automatizaciones y sistemas con IA que hacen funcionar la operación de tu negocio. Herramientas de grandes empresas al alcance de todos, desde Maracaibo, Venezuela.',
    'meta.locale': 'es_VE', 'meta.locale_alt': 'en_US',
    'gain.lede': 'Automatiza el trabajo. Construye el sistema. Esto es lo que cambia para un negocio pequeño.',
    'foot.tag': 'Que un negocio pequeño se sienta grande.',
    'foot.where': 'Maracaibo, Venezuela · Barcelona, España',
    'cta': 'Cuéntanos qué te frena',
    'label.l': 'Hoy',
    'label.r': 'Con un sistema',
    'hero.l': 'Tu operación funciona con WhatsApp, hojas de cálculo y memoria.',
    'hero.r': 'Podría funcionar con un sistema.',
    'hero.sub': 'BOK Labs construye los flujos de trabajo, las automatizaciones y los sistemas con IA que hacen funcionar la operación de un negocio pequeño.',
    'hero.status': 'en marcha · nada pendiente de ti',
    't1.l': 'El precio está en la cabeza de alguien.',
    'notif.app': 'BOK Labs', 'notif.now': 'ahora',
    't1.t': 'Lista de precios actualizada', 't1.b': 'La v12 ya está en línea. Todos ven la misma.',
    't2.l': 'El pedido está en un chat del martes.',
    't2.t': 'Pedido 1042 confirmado', 't2.b': 'Desde WhatsApp. Guardado en el registro, factura enviada.',
    't3.l': 'El informe es una hoja de cálculo que solo una persona sabe abrir.',
    't3.t': 'Informe mensual enviado', 't3.b': 'Generado a las 07:00, entregado a tres personas.',
    'turn.stamp': 'Martes, 11:40 pm. Todavía en el escritorio.',
    'turn.line': 'Entonces alguien construye el sistema.',
    'c.wa.k': 'WhatsApp · 11:42 PM',
    'c.wa': '¿Todavía tienes el de 500 ml? Necesito 40 para el viernes.',
    'c.voice': 'Nota de voz · 0:47',
    'c.rc.k': 'RECIBO',
    'c.rc': 'TOTAL 184,20',
    'c.rc.n': 'foto, borrosa',
    'c.xlsx': 'modificado ayer · por Luis',
    'c.sticky': 'Llamar a Marta por la factura 1042',
    'c.em.k': 'Re: Re: Re: factura',
    'c.em': '¿Cuál versión es la buena?',
    'c.note': 'Mar · 12 unidades · Mié · ?',
    'n1': 'Entrada', 'n1.d': 'Chat, correo, foto, voz: todo entra por una sola puerta.',
    'n2': 'Reglas', 'n2.d': 'Precios, inventario, plazos: escritos una vez, aplicados siempre.',
    'n3': 'IA donde hace falta criterio', 'n3.d': 'Lee el mensaje, redacta la respuesta, marca lo que debe decidir una persona.',
    'n4': 'Un solo registro', 'n4.d': 'Cada pedido, factura y cliente en un mismo lugar, al día.',
    'n5': 'Informes y alertas', 'n5.d': 'A tiempo, a quien corresponde, sin que nadie los pida.',
    'n5.s': 'enviado · informe mensual · 3 personas',
    'offer': 'Flujos de trabajo, automatizaciones y sistemas con IA que hacen funcionar la operación. Una app web o móvil cuando el sistema necesita una pantalla.',
    'peak.r': 'Un solo flujo. Funciona solo.',
    'peak.l': 'Ya no hay nada que sostener a mano.',
    'gain.h': 'Herramientas de grandes empresas, al alcance de todos.',
    'g1.had': 'Crecer significa una persona más sosteniéndolo todo.',
    'g1.h': 'Escala', 'g1.p': 'El sistema absorbe el volumen extra. Tú te quedas con el negocio extra, no con las noches extra.',
    'g2.had': 'Las consultas esperan en un chat hasta que alguien llega a ellas.',
    'g2.h': 'Más ventas', 'g2.p': 'Cada consulta respondida, con seguimiento y cerrada a tiempo. Nada se pierde entre mensajes.',
    'g3.had': 'Te enteras del problema cuando un cliente llama por él.',
    'g3.h': 'Más control', 'g3.p': 'Inventario, pedidos, pagos y caja a la vista, con una alerta antes de que duela.',
    'g4.had': 'Las decisiones salen de la memoria y del olfato.',
    'g4.h': 'Mejores decisiones', 'g4.p': 'Números reales cada semana, sin que nadie tenga que armar una hoja de cálculo antes.',
    'proof.h': 'Construido, entregado, funcionando.',
    'proof.had': 'Tenían',
    'proof.runs': 'Lo que funciona hoy',
    'p1.had': 'Años de registros diarios de la finca en cuadernos y hojas de cálculo, y una sola persona que sabía dónde estaba todo.',
    'p1.runs': 'Producción, lluvias, finanzas, combustible y personal en una sola plataforma, en la web y en Android, para varias fincas a la vez.',
    'p1.out': '1.280 días de historia importados. En producción.',
    'p2.had': 'Pedidos que llegaban por chat, pagos confirmados a mano, inventario contado de memoria.',
    'p2.runs': 'Una tienda en línea que pasa cada pedido a WhatsApp con un enlace de confirmación, y un panel para la dueña con pedidos, pagos, inventario y ventas.',
    'p2.out': 'Los pedidos llegan ordenados. La dueña trabaja desde un solo panel.',
    'p3.had': 'Una consulta sin presencia en línea y solicitudes dispersas en mensajes.',
    'p3.runs': 'Un sitio de una sola página con servicios, precios y captación de clientes que llega a WhatsApp.',
    'p3.out': 'En línea en drdoulapoppins.com.',
    'close.quiet': 'O seguir sosteniéndolo todo a mano.',
    'close.h': 'Cuéntanos qué te frena.',
    'close.p': 'Con un mensaje basta. Lo leemos, respondemos y, si podemos ayudar, te decimos cómo.',
    'f.name': 'Nombre',
    'f.email': 'Correo',
    'f.msg': '¿Qué te frena?',
    'f.ph': 'Eso que haces a mano cada semana y que un sistema debería hacer por ti.',
    'f.send': 'Enviar',
    'f.err': 'No se pudo enviar. Escríbenos a info@bok-labs.com.',
    'f.ok': 'Recibido. Te escribimos pronto.',
    'f.okmail': 'Tu app de correo debería abrirse con el mensaje listo. Si no, escribe a <a href="mailto:info@bok-labs.com">info@bok-labs.com</a>.'
  };
  var HTML_KEYS = { 'f.okmail': 1 };

  function resolveLang() {
    var q = /[?&]lang=(en|es)\b/.exec(location.search);
    if (q) return q[1];
    try { var s = localStorage.getItem('bok.lang'); if (s === 'en' || s === 'es') return s; } catch (e) {}
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return /^es\b/i.test(nav) ? 'es' : 'en';
  }
  function applyLang(lang) {
    var root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('data-lang', lang);
    if (lang === 'es') {
      Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
        var k = el.getAttribute('data-i18n'); if (!(k in ES)) return;
        if (HTML_KEYS[k]) el.innerHTML = ES[k]; else el.textContent = ES[k];
      });
      Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-attr]'), function (el) {
        el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
          var p = pair.split(':'); var attr = p[0].trim(), k = p[1].trim();
          if (k in ES) el.setAttribute(attr, ES[k]);
        });
      });
    }
    var f = document.querySelector('input[name="lang"]'); if (f) f.value = lang;
    Array.prototype.forEach.call(document.querySelectorAll('[data-lang-set]'), function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang-set') === lang ? 'true' : 'false');
      b.addEventListener('click', function () {
        var to = b.getAttribute('data-lang-set');
        if (to === lang) return;
        try { localStorage.setItem('bok.lang', to); } catch (e) {}
        var u = new URL(location.href); u.searchParams.set('lang', to); u.hash = '';
        location.replace(u.toString());
      });
    });
  }
  var LANG = resolveLang();
  applyLang(LANG);
  try { localStorage.setItem('bok.lang', LANG); } catch (e) {}

  /* ----------------------------------------------------------- the engine */
  var coarse = matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (coarse) {
    document.body.setAttribute("data-sc-lerp", "0.6");   // keep the clip under the thumb
    /* a phone viewport is short: more scroll travel per text state so nothing is gone before it is read */
    var spans = { a1: "2.3", a2: "3", a4: "3.8", contact: "1.8" };
    Object.keys(spans).forEach(function (id) { var el = document.getElementById(id); if (el) el.setAttribute("data-sc-span", spans[id]); });
  }
  ScrollCraft.mount(document.body);
  var reduce = ScrollCraft.reduce;

  /* ---------------------------------------------------------- the divider */
  var root = document.documentElement;
  var a2 = document.getElementById('a2'), a4 = document.getElementById('a4'), a6 = document.getElementById('contact');
  var s2 = a2.querySelector('[data-sc-stage]'), s4 = a4.querySelector('[data-sc-stage]'), s6 = a6.querySelector('[data-sc-stage]');
  var flows = [document.getElementById('a3'), document.getElementById('a5')];
  var divider = document.querySelector('.divider');
  var phoneMQ = matchMedia('(max-width: 860px)');
  var lastSplit = -1, lastProg = -1, running = false, collapsed = false, hidden = false, lastState4 = "", built = false;

  function p(act) { var v = parseFloat(act.style.getPropertyValue('--sc-p')); return isNaN(v) ? 0 : v; }
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function smooth(x) { x = clamp01(x); return x * x * (3 - 2 * x); }
  function step(x) { return x >= 0.5 ? 1 : 0; }

  function frame() {
    var p2 = p(a2), p4 = p(a4), p6 = p(a6);
    var S = reduce ? step : smooth;
    /* 0.50 in the hero. 0.60 by the end of the tension. 0.40 across the peak. 0 at the close. */
    /* once the pipeline has run it stays built, and the ground it won stays won inside its own act */
    if (!built && p4 >= 0.86) { built = true; s4.classList.add("is-built"); }
    var peak = built ? S(p4 / 0.04) : S((p4 - 0.04) / 0.18);
    var split = 0.5 + 0.1 * S(p2) - 0.2 * peak - 0.4 * S((p6 - 0.05) / 0.45);
    split = Math.round(split * 1000) / 1000;
    if (split !== lastSplit) { root.style.setProperty('--split', split); lastSplit = split; }

    var doc = document.documentElement;
    var prog = clamp01(scrollY / Math.max(doc.scrollHeight - innerHeight, 1));
    prog = Math.round(prog * 1000) / 1000;
    if (prog !== lastProg) { root.style.setProperty('--prog', prog); lastProg = prog; }

    var col = split < 0.08;
    if (col !== collapsed) { collapsed = col; document.body.classList.toggle('is-collapsed', col); }

    /* the peak: what actually paints, for the harness */
    var run = built || p4 >= 0.86;
    if (run !== running) { running = run; s4.classList.toggle('is-running', run); }
    var starts = [0.24, 0.30, 0.36, 0.42, 0.48, 0.54, 0.60], landed = 0;
    for (var i = 0; i < starts.length; i++) if (built || (reduce ? p4 >= 0.5 : p4 >= starts[i] + 0.18)) landed++;
    var tangle = built ? 0 : reduce ? (p4 >= 0.5 ? 0 : 1) : 1 - clamp01((p4 - 0.26) / 0.52);
    var spine = built ? 1 : reduce ? (p4 >= 0.5 ? 1 : 0) : clamp01((p4 - 0.40) / 0.36);
    var st4 = 'split:' + split.toFixed(2) + '|landed:' + landed + '|tangle:' + tangle.toFixed(2) + '|spine:' + spine.toFixed(2) + '|run:' + (run ? 1 : 0);
    if (st4 !== lastState4) { s4.setAttribute('data-sc-verify-state', st4); lastState4 = st4; }
    if (reduce) s4.setAttribute('data-sc-verify-hold', p4 >= 0.5 && p4 < 1 ? 'true' : 'false');
    s2.setAttribute('data-sc-verify-state', 'split:' + split.toFixed(2));
    s6.setAttribute('data-sc-verify-state', 'split:' + split.toFixed(2) + '|left:' + (p6 >= 0.42 ? 1 : 0));

    /* on a phone the divider is horizontal and fixed; hide it while a flow section sits under it */
    var hide = false;
    if (phoneMQ.matches) {
      var y = split * innerHeight;
      for (var j = 0; j < flows.length; j++) {
        var r = flows[j].getBoundingClientRect();
        if (r.top < y && r.bottom > y) { hide = true; break; }
      }
    }
    if (hide !== hidden) { hidden = hide; divider.classList.toggle('is-hidden', hide); }
  }
  /* the latch: a text that has been seen is never hidden again. Cues are read through the engine's inline
     opacity (kinetic ones through their line units); the peak's CSS-driven nodes and caption through --sc-p. */
  var cueEls = Array.prototype.slice.call(document.querySelectorAll("[data-sc-cue]"));
  var nodeEls = Array.prototype.slice.call(document.querySelectorAll(".node"));
  var offerEl = document.querySelector(".offer");
  function shown(el) {
    var units = el.querySelectorAll(".sc-split__i");
    if (units.length) { for (var i = 0; i < units.length; i++) if (parseFloat(units[i].style.opacity) < 0.99) return false; return true; }
    return parseFloat(el.style.opacity) >= 0.99;
  }
  function latch() {
    for (var i = cueEls.length - 1; i >= 0; i--) { var el = cueEls[i]; if (shown(el)) { el.classList.add("is-latched"); cueEls.splice(i, 1); } }
    var p4 = p(a4);
    for (var j = nodeEls.length - 1; j >= 0; j--) { var n = parseFloat(nodeEls[j].style.getPropertyValue("--n")); if (p4 >= n + 0.06) { nodeEls[j].classList.add("is-latched"); nodeEls.splice(j, 1); } }
    if (offerEl && p4 >= 0.8) { offerEl.classList.add("is-latched"); offerEl = null; }
  }

  var queued = false;
  function ask() { if (queued) return; queued = true; requestAnimationFrame(function () { queued = false; frame(); latch(); }); }
  addEventListener('scroll', ask, { passive: true });
  addEventListener('resize', ask);
  /* the engine writes --sc-p in its own rAF after ours; run once more next frame so the first paint is right */
  frame(); requestAnimationFrame(function () { frame(); latch(); }); setTimeout(function () { frame(); latch(); }, 120); setTimeout(function () { frame(); latch(); }, 600);

  /* a pinned act holds one viewport position for its whole span, so the browser cannot scroll a
     focused control into an open cue by itself (verify.md). Park the hero where its copy is lit. */
  var heroCta = document.querySelector(".copy--hero-sys .cta");
  if (heroCta) heroCta.addEventListener("focus", function () { if (scrollY > 600) scrollTo({ top: 0, behavior: "instant" }); });

  /* -------------------------------------------------------------- the form */
  var WEB3FORMS_KEY = '';   /* David: paste the Web3Forms access key requested from info@bok-labs.com. Empty = mailto fallback. */
  var form = document.getElementById('form');
  var box = form.parentNode;
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    box.classList.remove('is-err');
    if (form.botcheck.checked) return;
    if (!form.name.value.trim() || !form.email.value.trim() || !form.message.value.trim()) { form.reportValidity(); return; }
    var btn = form.querySelector('.send');
    var data = { name: form.name.value.trim(), email: form.email.value.trim(), message: form.message.value.trim(), lang: form.lang.value };
    if (!WEB3FORMS_KEY) {
      var body = 'Name: ' + data.name + '\nEmail: ' + data.email + '\nLanguage: ' + data.lang + '\n\n' + data.message + '\n\n(sent from bok-labs.com)';
      location.href = 'mailto:info@bok-labs.com?subject=' + encodeURIComponent('bok-labs.com · ' + data.name) + '&body=' + encodeURIComponent(body);
      box.classList.add('is-sent');
      return;
    }
    btn.disabled = true;
    fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: 'bok-labs.com · ' + data.name, from_name: 'bok-labs.com', name: data.name, email: data.email, message: data.message, lang: data.lang, botcheck: '' })
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (j && j.success) { box.classList.add('is-sent'); box.querySelector('.sent__mail').hidden = true; }
      else { box.classList.add('is-err'); }
    }).catch(function () { box.classList.add('is-err'); }).then(function () { btn.disabled = false; });
  });
})();
