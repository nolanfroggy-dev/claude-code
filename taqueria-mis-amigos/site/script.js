/* Taqueria Mis Amigos — site script (no dependencies) */
(function () {
  "use strict";

  /* =========================================================
   * HOURS — edit here. 0 = Sunday … 6 = Saturday. 24h "HH:MM".
   * null = closed. Times are Arizona time (America/Phoenix).
   * Keep in sync with the JSON-LD in index.html <head>.
   * ========================================================= */
  var HOURS = {
    0: null,
    1: ["08:00", "14:00"],
    2: ["08:00", "14:00"],
    3: ["08:00", "14:00"],
    4: ["08:00", "14:00"],
    5: ["08:00", "14:00"],
    6: ["08:00", "14:00"]
  };

  /* =========================================================
   * MENU — edit here. Each item needs a category, name and desc
   * in both languages. Set price to a string like "$3.50" when
   * known, or null to show "Ask in store".
   * image: optional file in images/ (swap in real photos later).
   * id: unique key used by the order cart (same id = same item).
   * noOrder: true hides the "Add" button for that item.
   * ========================================================= */
  var CATEGORIES = [
    { id: "tacos",     en: "Tacos",     es: "Tacos" },
    { id: "burritos",  en: "Burritos",  es: "Burritos" },
    { id: "breakfast", en: "Breakfast", es: "Desayuno" },
    { id: "specials",  en: "Specials",  es: "Especiales" }
  ];

  var MENU = [
    { id: "asada-taco", cat: "tacos", price: "$3.50", image: "images/tacos.jpg",
      en: { name: "Carne Asada Taco", desc: "Grilled steak on a corn tortilla with onion, cilantro and lime." },
      es: { name: "Taco de Carne Asada", desc: "Carne asada en tortilla de maíz con cebolla, cilantro y limón." } },
    { id: "pastor-taco", cat: "tacos", price: "$3.50",
      en: { name: "Al Pastor Taco", desc: "Marinated pork with onion and cilantro." },
      es: { name: "Taco al Pastor", desc: "Cerdo adobado con cebolla y cilantro." } },
    { id: "carnitas-taco", cat: "tacos", price: "$3.50",
      en: { name: "Carnitas Taco", desc: "Slow-cooked pork, crisped on the grill." },
      es: { name: "Taco de Carnitas", desc: "Cerdo cocinado lentamente y dorado en la plancha." } },
    { id: "chicken-taco", cat: "tacos", price: "$3.50",
      en: { name: "Chicken Taco", desc: "Seasoned grilled chicken with onion and cilantro." },
      es: { name: "Taco de Pollo", desc: "Pollo asado sazonado con cebolla y cilantro." } },
    { id: "fish-taco", cat: "tacos", price: null,
      en: { name: "Fish Taco", desc: "Fish with cabbage and a creamy house sauce." },
      es: { name: "Taco de Pescado", desc: "Pescado con repollo y salsa cremosa de la casa." } },
    { id: "shrimp-taco", cat: "tacos", price: null,
      en: { name: "Shrimp Taco", desc: "Shrimp with cabbage and a creamy house sauce." },
      es: { name: "Taco de Camarón", desc: "Camarón con repollo y salsa cremosa de la casa." } },

    { id: "asada-burrito", cat: "burritos", price: null, image: "images/burrito.jpg",
      en: { name: "Carne Asada Burrito", desc: "Grilled steak, beans, rice and salsa in a big flour tortilla." },
      es: { name: "Burrito de Carne Asada", desc: "Carne asada, frijoles, arroz y salsa en tortilla de harina." } },
    { id: "breakfast-burrito", cat: "burritos", price: null, tag: "fav",
      en: { name: "Breakfast Burrito", desc: "Eggs, potatoes, cheese and your choice of meat. Our regulars' favorite." },
      es: { name: "Burrito de Desayuno", desc: "Huevo, papas, queso y la carne que prefieras. El favorito de nuestros clientes." } },

    { id: "chorizo-egg", cat: "breakfast", price: null, image: "images/breakfast.jpg",
      en: { name: "Chorizo & Egg Plate", desc: "Chorizo scrambled with eggs, served with beans, rice and tortillas." },
      es: { name: "Plato de Chorizo con Huevo", desc: "Chorizo con huevo, acompañado de frijoles, arroz y tortillas." } },
    { id: "breakfast-burrito", cat: "breakfast", price: null,
      en: { name: "Breakfast Burrito", desc: "Also on the burrito list, and it's the reason people come in early." },
      es: { name: "Burrito de Desayuno", desc: "También está en la lista de burritos, y es la razón por la que la gente llega temprano." } },

    { id: "menudo", cat: "specials", price: null, image: "images/menudo.jpg",
      en: { name: "Menudo", desc: "Traditional slow-simmered soup. Ask which days it's on." },
      es: { name: "Menudo", desc: "Sopa tradicional cocinada a fuego lento. Pregunta qué días hay." } },
    { id: "fajitas", cat: "specials", price: null,
      en: { name: "Fajitas", desc: "Sizzling grilled meat with peppers and onions, served with tortillas." },
      es: { name: "Fajitas", desc: "Carne asada con pimientos y cebolla, servida con tortillas." } },
    { id: "salsas", cat: "specials", price: null, noOrder: true,
      en: { name: "House Salsas", desc: "Red and green, made fresh. Try them both." },
      es: { name: "Salsas de la Casa", desc: "Roja y verde, hechas en casa. Prueba las dos." } }
  ];

  /* =========================================================
   * UI STRINGS
   * ========================================================= */
  var STRINGS = {
    en: {
      demo: "Preview site prepared for Taqueria Mis Amigos",
      skip: "Skip to content",
      navMenu: "Menu", navAbout: "About", navReviews: "Reviews", navVisit: "Hours",
      heroEyebrow: "Queen Creek, Arizona",
      tagline: "Family-made tacos & breakfast burritos in Queen Creek",
      call: "Call", directions: "Directions",
      heroAlt: "Plate of street tacos with lime and salsa",
      open: "Open now", closed: "Closed",
      todayHours: "Today: {h}", todayClosed: "Closed today",
      opensAt: "Opens {d} at {t}", closesAt: "Closes at {t}",
      menuTitle: "Menu",
      menuLede: "Made to order with house red and green salsas. Prices change, so ask in store for today's prices.",
      ask: "Ask in store", fav: "Local favorite",
      aboutTitle: "A family kitchen, open to the neighborhood",
      aboutAlt: "The kitchen at Taqueria Mis Amigos",
      about1: "Taqueria Mis Amigos is a small, family-run spot in the Queen Creek Town Center area. We cook the way we cook at home: fresh tortillas off the plancha, meats seasoned and grilled to order, and salsas made in-house every morning.",
      about2: "Mornings start with breakfast burritos and chorizo and egg plates. By lunch the grill is full of carne asada and al pastor. No shortcuts, no chain recipes, just the food we grew up on.",
      about3: "Whether you grab a seat inside, sit out on the patio with your dog, or call ahead for takeout, you'll be treated like a friend. That's the whole idea behind the name.",
      reviewsTitle: "What people say",
      rating: "About 4.5 stars across 160+ reviews",
      q1: "The real deal. Homemade flavor you just can't find at the chains.",
      q2: "The breakfast burritos are worth the drive, and the salsas are the best in town.",
      q3: "A true family place. They're warm and welcoming, and service is quick even when it's packed.",
      q4: "Great food at great prices. So glad they reopened!",
      cite: "— Local reviewer",
      readReviews: "Read our reviews",
      visitTitle: "Hours & location",
      hoursCaption: "Opening hours",
      today: "Today",
      amenitiesTitle: "Good to know",
      amDine: "Dine-in", amTakeout: "Takeout", amPatio: "Outdoor patio", amKids: "Kid-friendly",
      amDogs: "Dogs OK on patio", amAccess: "Wheelchair accessible", amParking: "Free parking", amCards: "Cards accepted",
      footerHours: "Mon–Sat 8:00 AM – 2:00 PM · Sunday closed",
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      tomorrow: "tomorrow",
      orderCta: "Order ahead for pickup",
      add: "Add", addAria: "Add {n} to order", inOrder: "{q} in order",
      added: "Added {n} to your order", removed: "Removed {n}",
      viewOrder: "View order", yourOrder: "Your pickup order", close: "Close",
      cartDemo: "Preview: online ordering isn't live yet. You can build an order to see how it works, but it won't be sent to the restaurant.",
      cartEmpty: "Your order is empty. Tap \u201cAdd\u201d on anything in the menu.",
      pickupTime: "Pickup time", asap: "As soon as possible (about 20 min)",
      notes: "Notes for the kitchen (optional)", notesPh: "No onions, extra green salsa…",
      subtotal: "Subtotal", unpriced: "{n} item(s) priced in store",
      payAtPickup: "Pay at pickup. Tax is added in store.",
      placeOrder: "Place pickup order",
      decrease: "One less {n}", increase: "One more {n}",
      doneFlag: "Preview only", doneTitle: "Here's how your order would look",
      doneBody: "This is a demo, so your order was not sent to the restaurant. Once online ordering is live, the kitchen will get it right away and you'll see a confirmation here.",
      doneCall: "Hungry now? Call and they'll have it ready.",
      startOver: "Start a new order", pickupAt: "Pickup: {t}", notesLabel: "Notes: {t}"
    },
    es: {
      demo: "Sitio de muestra preparado para Taqueria Mis Amigos",
      skip: "Ir al contenido",
      navMenu: "Menú", navAbout: "Nosotros", navReviews: "Reseñas", navVisit: "Horario",
      heroEyebrow: "Queen Creek, Arizona",
      tagline: "Tacos y burritos de desayuno hechos en familia en Queen Creek",
      call: "Llamar", directions: "Cómo llegar",
      heroAlt: "Plato de tacos con limón y salsa",
      open: "Abierto", closed: "Cerrado",
      todayHours: "Hoy: {h}", todayClosed: "Cerrado hoy",
      opensAt: "Abre {d} a las {t}", closesAt: "Cierra a las {t}",
      menuTitle: "Menú",
      menuLede: "Preparado al momento con nuestras salsas roja y verde. Los precios cambian; pregunta en el local por los precios de hoy.",
      ask: "Pregunta en el local", fav: "Favorito",
      aboutTitle: "Una cocina familiar, abierta al vecindario",
      aboutAlt: "La cocina de Taqueria Mis Amigos",
      about1: "Taqueria Mis Amigos es un lugar pequeño y familiar en la zona de Town Center de Queen Creek. Cocinamos como en casa: tortillas recién hechas en la plancha, carnes sazonadas y asadas al momento, y salsas preparadas cada mañana.",
      about2: "Las mañanas empiezan con burritos de desayuno y platos de chorizo con huevo. A la hora de la comida, la plancha se llena de carne asada y al pastor. Sin atajos ni recetas de cadena, solo la comida con la que crecimos.",
      about3: "Ya sea que te sientes adentro, en el patio con tu perro, o que llames para llevar, aquí te tratamos como a un amigo. De eso se trata el nombre.",
      reviewsTitle: "Lo que dice la gente",
      rating: "Alrededor de 4.5 estrellas en más de 160 reseñas",
      q1: "Auténtico de verdad. Un sabor casero que no encuentras en las cadenas.",
      q2: "Los burritos de desayuno valen el viaje, y las salsas son las mejores del pueblo.",
      q3: "Un lugar verdaderamente familiar. Son cálidos y amables, y atienden rápido aunque esté lleno.",
      q4: "Buena comida a buen precio. ¡Qué bueno que reabrieron!",
      cite: "— Cliente local",
      readReviews: "Lee nuestras reseñas",
      visitTitle: "Horario y ubicación",
      hoursCaption: "Horario de atención",
      today: "Hoy",
      amenitiesTitle: "Para tu visita",
      amDine: "Comer aquí", amTakeout: "Para llevar", amPatio: "Patio al aire libre", amKids: "Para niños",
      amDogs: "Perros en el patio", amAccess: "Acceso para silla de ruedas", amParking: "Estacionamiento gratis", amCards: "Aceptamos tarjetas",
      footerHours: "Lun–Sáb 8:00 AM – 2:00 PM · Domingo cerrado",
      days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      tomorrow: "mañana",
      orderCta: "Ordena para recoger",
      add: "Agregar", addAria: "Agregar {n} a la orden", inOrder: "{q} en la orden",
      added: "Agregaste {n} a tu orden", removed: "Quitaste {n}",
      viewOrder: "Ver orden", yourOrder: "Tu orden para recoger", close: "Cerrar",
      cartDemo: "Vista previa: los pedidos en línea aún no están activos. Puedes armar una orden para ver cómo funciona, pero no se enviará al restaurante.",
      cartEmpty: "Tu orden está vacía. Toca \u201cAgregar\u201d en cualquier platillo del menú.",
      pickupTime: "Hora para recoger", asap: "Lo antes posible (unos 20 min)",
      notes: "Notas para la cocina (opcional)", notesPh: "Sin cebolla, extra salsa verde…",
      subtotal: "Subtotal", unpriced: "{n} artículo(s) con precio en el local",
      payAtPickup: "Pagas al recoger. El impuesto se agrega en el local.",
      placeOrder: "Enviar orden para recoger",
      decrease: "Uno menos de {n}", increase: "Uno más de {n}",
      doneFlag: "Solo vista previa", doneTitle: "Así se vería tu orden",
      doneBody: "Esto es una demostración, así que tu orden no se envió al restaurante. Cuando los pedidos en línea estén activos, la cocina la recibirá al instante y verás una confirmación aquí.",
      doneCall: "¿Tienes hambre ya? Llama y te la tienen lista.",
      startOver: "Empezar una orden nueva", pickupAt: "Recoger: {t}", notesLabel: "Notas: {t}"
    }
  };

  var LANG_KEY = "tma-lang";
  var BANNER_KEY = "tma-demo-dismissed";
  var lang = "en";

  function store(key, val) {
    try {
      if (val === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, val);
    } catch (e) { /* storage blocked: ignore */ }
    return null;
  }

  function t(key) { return (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.en[key] || ""; }
  function fill(str, map) { return str.replace(/\{(\w+)\}/g, function (_, k) { return map[k]; }); }

  /* ---------- Time helpers (Arizona has no DST) ---------- */
  function phoenixNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Phoenix", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date());
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    var dayIdx = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday);
    return { day: dayIdx, minutes: parseInt(o.hour, 10) * 60 + parseInt(o.minute, 10) };
  }
  function toMin(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }
  function fmtTime(hhmm) {
    var m = toMin(hhmm), h = Math.floor(m / 60), mm = m % 60;
    var ap = h >= 12 ? "PM" : "AM", h12 = h % 12 || 12;
    return h12 + ":" + (mm < 10 ? "0" : "") + mm + " " + ap;
  }
  function fmtRange(r) { return fmtTime(r[0]) + " – " + fmtTime(r[1]); }

  /* ---------- Open / closed badge ---------- */
  function renderStatus() {
    var now = phoenixNow();
    var today = HOURS[now.day];
    var isOpen = !!today && now.minutes >= toMin(today[0]) && now.minutes < toMin(today[1]);

    var badge = document.getElementById("open-badge");
    badge.dataset.state = isOpen ? "open" : "closed";
    badge.textContent = isOpen ? t("open") : t("closed");

    var line;
    if (isOpen) {
      line = fill(t("todayHours"), { h: fmtRange(today) }) + " · " + fill(t("closesAt"), { t: fmtTime(today[1]) });
    } else if (today && now.minutes < toMin(today[0])) {
      line = fill(t("todayHours"), { h: fmtRange(today) });
    } else {
      // find next open day
      for (var i = 1; i <= 7; i++) {
        var d = (now.day + i) % 7;
        if (HOURS[d]) {
          var dayName = i === 1 ? t("tomorrow") : t("days")[d];
          line = (today ? "" : t("todayClosed") + " · ") + fill(t("opensAt"), { d: dayName, t: fmtTime(HOURS[d][0]) });
          break;
        }
      }
    }
    document.getElementById("today-hours").textContent = line || "";
    return now.day;
  }

  /* ---------- Hours table ---------- */
  function renderHours(todayIdx) {
    var body = document.getElementById("hours-body");
    var order = [1, 2, 3, 4, 5, 6, 0]; // Monday first
    body.innerHTML = "";
    order.forEach(function (d) {
      var tr = document.createElement("tr");
      if (d === todayIdx) { tr.className = "is-today"; }
      var th = document.createElement("th");
      th.scope = "row";
      th.textContent = t("days")[d];
      if (d === todayIdx) th.setAttribute("data-today", t("today"));
      var td = document.createElement("td");
      if (HOURS[d]) { td.textContent = fmtRange(HOURS[d]); }
      else { td.textContent = t("closed"); td.className = "closed"; }
      tr.appendChild(th); tr.appendChild(td);
      body.appendChild(tr);
    });
  }

  /* ---------- Menu ---------- */
  function renderMenu() {
    var tabs = document.getElementById("menu-tabs");
    var groups = document.getElementById("menu-groups");
    tabs.innerHTML = ""; groups.innerHTML = "";

    CATEGORIES.forEach(function (c) {
      var items = MENU.filter(function (m) { return m.cat === c.id; });
      if (!items.length) return;

      var a = document.createElement("a");
      a.href = "#cat-" + c.id;
      a.textContent = c[lang];
      tabs.appendChild(a);

      var sec = document.createElement("div");
      sec.className = "menu-group";
      sec.id = "cat-" + c.id;
      var h = document.createElement("h3");
      h.textContent = c[lang];
      sec.appendChild(h);

      var ul = document.createElement("ul");
      ul.className = "menu-grid";
      items.forEach(function (m) {
        var copy = m[lang] || m.en;
        var li = document.createElement("li");
        li.className = "card";
        if (m.image) {
          var img = document.createElement("img");
          img.src = m.image; img.alt = copy.name;
          img.width = 800; img.height = 450;
          img.loading = "lazy"; img.decoding = "async";
          li.appendChild(img);
        }
        var b = document.createElement("div");
        b.className = "card-body";
        var top = document.createElement("div");
        top.className = "card-top";
        var name = document.createElement("h4");
        name.textContent = copy.name;
        var price = document.createElement("span");
        if (m.price) { price.className = "price"; price.textContent = m.price; }
        else { price.className = "price-ask"; price.textContent = t("ask"); }
        top.appendChild(name); top.appendChild(price);
        var p = document.createElement("p");
        p.textContent = copy.desc;
        b.appendChild(top); b.appendChild(p);
        if (m.tag) {
          var tag = document.createElement("span");
          tag.className = "tag"; tag.textContent = t(m.tag);
          b.appendChild(tag);
        }
        if (!m.noOrder) {
          var add = document.createElement("button");
          add.type = "button";
          add.className = "add-btn";
          add.dataset.add = m.id;
          add.setAttribute("aria-label", fill(t("addAria"), { n: copy.name }));
          add.innerHTML = '<span aria-hidden="true">+</span> ';
          add.appendChild(document.createTextNode(t("add")));
          var inCart = document.createElement("span");
          inCart.className = "in-cart";
          inCart.dataset.inCart = m.id;
          var foot = document.createElement("div");
          foot.className = "card-foot";
          foot.appendChild(add); foot.appendChild(inCart);
          b.appendChild(foot);
        }
        li.appendChild(b);
        ul.appendChild(li);
      });
      sec.appendChild(ul);
      groups.appendChild(sec);
    });
  }

  /* =========================================================
   * ORDER CART (demo). Builds a pickup order in the browser only.
   * Nothing is sent anywhere: "Place pickup order" shows a
   * preview confirmation. To go live, replace submitOrder() with a
   * call to a real ordering service (or link out to one).
   * ========================================================= */
  var CART_KEY = "tma-cart";
  var LEAD_MIN = 20;   // minutes the kitchen needs before the first pickup slot
  var SLOT_MIN = 15;   // pickup slot spacing
  var cart = {};
  try { cart = JSON.parse(store(CART_KEY) || "{}") || {}; } catch (e) { cart = {}; }

  function findItem(id) {
    for (var i = 0; i < MENU.length; i++) if (MENU[i].id === id) return MENU[i];
    return null;
  }
  function cents(price) { return price ? Math.round(parseFloat(price.replace(/[^0-9.]/g, "")) * 100) : null; }
  function money(c) { return "$" + (c / 100).toFixed(2); }
  function itemName(m) { return (m[lang] || m.en).name; }
  function saveCart() { store(CART_KEY, JSON.stringify(cart)); }
  function announce(msg) {
    var live = document.getElementById("cart-live");
    live.textContent = "";
    setTimeout(function () { live.textContent = msg; }, 50);
  }

  function cartSummary() {
    var sum = { qty: 0, subtotal: 0, unpriced: 0, lines: [] };
    Object.keys(cart).forEach(function (id) {
      var m = findItem(id), q = cart[id];
      if (!m || !q) { delete cart[id]; return; }
      var c = cents(m.price);
      sum.qty += q;
      if (c === null) sum.unpriced += q; else sum.subtotal += c * q;
      sum.lines.push({ id: id, item: m, qty: q, unit: c });
    });
    return sum;
  }

  function fmtMin(m) {
    var h = Math.floor(m / 60), mm = m % 60;
    return fmtTime((h < 10 ? "0" : "") + h + ":" + (mm < 10 ? "0" : "") + mm);
  }
  function cap(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

  // Pickup times for the next day the restaurant is open, in Arizona time.
  function pickupSlots() {
    var now = phoenixNow(), slots = [];
    for (var i = 0; i < 8 && !slots.length; i++) {
      var d = (now.day + i) % 7, h = HOURS[d];
      if (!h) continue;
      var open = toMin(h[0]), close = toMin(h[1]);
      var start = open;
      if (i === 0) {
        var soonest = Math.ceil((now.minutes + LEAD_MIN) / SLOT_MIN) * SLOT_MIN;
        start = Math.max(open, soonest);
        if (now.minutes >= open && now.minutes < close - LEAD_MIN) slots.push({ v: "asap", l: t("asap") });
      }
      var prefix = i === 0 ? "" : (i === 1 ? cap(t("tomorrow")) : t("days")[d]) + " ";
      for (var m = start; m <= close - SLOT_MIN; m += SLOT_MIN) slots.push({ v: d + "-" + m, l: prefix + fmtMin(m) });
    }
    return slots;
  }

  function renderCart() {
    var sum = cartSummary();
    var fab = document.getElementById("cart-fab");
    fab.hidden = sum.qty === 0;
    document.body.classList.toggle("has-cart", sum.qty > 0);
    document.getElementById("cart-fab-count").textContent = sum.qty;
    document.getElementById("cart-fab-total").textContent =
      sum.subtotal ? money(sum.subtotal) + (sum.unpriced ? "+" : "") : "";

    document.querySelectorAll("[data-in-cart]").forEach(function (el) {
      var q = cart[el.dataset.inCart] || 0;
      el.textContent = q ? fill(t("inOrder"), { q: q }) : "";
    });

    var list = document.getElementById("cart-items");
    list.innerHTML = "";
    sum.lines.forEach(function (line) {
      var name = itemName(line.item);
      var li = document.createElement("li");
      li.className = "cart-line";
      var info = document.createElement("div");
      var n = document.createElement("p"); n.className = "cart-line-name"; n.textContent = name;
      var pr = document.createElement("p"); pr.className = "cart-line-price";
      pr.textContent = line.unit === null ? t("ask") : money(line.unit * line.qty);
      info.appendChild(n); info.appendChild(pr);

      var step = document.createElement("div");
      step.className = "stepper";
      var dec = document.createElement("button");
      dec.type = "button"; dec.dataset.dec = line.id; dec.textContent = "−";
      dec.setAttribute("aria-label", fill(t("decrease"), { n: name }));
      var qty = document.createElement("span"); qty.textContent = line.qty;
      var inc = document.createElement("button");
      inc.type = "button"; inc.dataset.inc = line.id; inc.textContent = "+";
      inc.setAttribute("aria-label", fill(t("increase"), { n: name }));
      step.appendChild(dec); step.appendChild(qty); step.appendChild(inc);

      li.appendChild(info); li.appendChild(step);
      list.appendChild(li);
    });

    document.getElementById("cart-empty").hidden = sum.qty > 0;
    document.getElementById("cart-fields").hidden = sum.qty === 0;
    document.getElementById("cart-subtotal").textContent = money(sum.subtotal);
    var unp = document.getElementById("cart-unpriced");
    unp.hidden = sum.unpriced === 0;
    document.getElementById("cart-unpriced-label").textContent = fill(t("unpriced"), { n: sum.unpriced });

    var sel = document.getElementById("pickup-time"), prev = sel.value;
    sel.innerHTML = "";
    pickupSlots().forEach(function (slot) {
      var o = document.createElement("option");
      o.value = slot.v; o.textContent = slot.l;
      sel.appendChild(o);
    });
    if (prev) sel.value = prev;
    if (!sel.value && sel.options.length) sel.selectedIndex = 0;
  }

  function changeQty(id, delta) {
    var m = findItem(id);
    if (!m) return;
    cart[id] = Math.max(0, Math.min(50, (cart[id] || 0) + delta));
    if (!cart[id]) delete cart[id];
    saveCart();
    renderCart();
    announce(fill(t(delta > 0 ? "added" : "removed"), { n: itemName(m) }));
  }

  // Demo "checkout": show what the confirmation would look like. Nothing leaves the browser.
  function submitOrder() {
    var sum = cartSummary();
    if (!sum.qty) return;
    var sel = document.getElementById("pickup-time");
    var notes = document.getElementById("cart-notes").value.trim();
    var receipt = document.getElementById("cart-receipt");
    receipt.innerHTML = "";
    var ul = document.createElement("ul");
    sum.lines.forEach(function (line) {
      var li = document.createElement("li");
      li.textContent = line.qty + " × " + itemName(line.item) +
        (line.unit === null ? " — " + t("ask") : " — " + money(line.unit * line.qty));
      ul.appendChild(li);
    });
    receipt.appendChild(ul);
    var when = document.createElement("p");
    when.textContent = fill(t("pickupAt"), { t: sel.options[sel.selectedIndex] ? sel.options[sel.selectedIndex].text : "" });
    receipt.appendChild(when);
    if (notes) {
      var np = document.createElement("p");
      np.textContent = fill(t("notesLabel"), { t: notes });
      receipt.appendChild(np);
    }
    var tot = document.createElement("p");
    tot.className = "cart-receipt-total";
    tot.textContent = t("subtotal") + ": " + money(sum.subtotal) +
      (sum.unpriced ? " + " + fill(t("unpriced"), { n: sum.unpriced }) : "");
    receipt.appendChild(tot);

    cart = {};
    saveCart();
    document.getElementById("cart-notes").value = "";
    document.getElementById("cart-form").hidden = true;
    var done = document.getElementById("cart-done");
    done.hidden = false;
    dialog.scrollTop = 0;
    done.focus({ preventScroll: true });
    renderCart();
  }

  function resetCartView() {
    document.getElementById("cart-form").hidden = false;
    document.getElementById("cart-done").hidden = true;
  }

  var dialog = document.getElementById("cart");
  function openCart() {
    renderCart();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  function closeCart() {
    if (typeof dialog.close === "function") dialog.close();
    else { dialog.removeAttribute("open"); resetCartView(); }
  }

  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-add],[data-inc],[data-dec]") : null;
    if (!el) return;
    if (el.dataset.add) changeQty(el.dataset.add, 1);
    else if (el.dataset.inc) changeQty(el.dataset.inc, 1);
    else if (el.dataset.dec) changeQty(el.dataset.dec, -1);
  });
  document.getElementById("cart-fab").addEventListener("click", openCart);
  document.getElementById("cart-close").addEventListener("click", closeCart);
  document.getElementById("cart-restart").addEventListener("click", closeCart);
  dialog.addEventListener("click", function (e) { if (e.target === dialog) closeCart(); }); // backdrop
  dialog.addEventListener("close", resetCartView);
  document.getElementById("cart-form").addEventListener("submit", function (e) {
    e.preventDefault();
    submitOrder();
  });

  /* ---------- Language ---------- */
  function applyLang(next) {
    lang = STRINGS[next] ? next : "en";
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.alt = t(el.getAttribute("data-i18n-alt"));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    renderHours(renderStatus());
    renderMenu();
    renderCart();
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      store(LANG_KEY, b.dataset.lang);
      applyLang(b.dataset.lang);
    });
  });

  /* ---------- Demo banner ---------- */
  var bar = document.getElementById("demo-bar");
  if (bar) {
    if (store(BANNER_KEY) === "1") bar.hidden = true;
    document.getElementById("demo-close").addEventListener("click", function () {
      bar.hidden = true;
      store(BANNER_KEY, "1");
    });
  }

  /* ---------- Init ---------- */
  var saved = store(LANG_KEY);
  var initial = saved || ((navigator.language || "").toLowerCase().indexOf("es") === 0 ? "es" : "en");
  applyLang(initial);
  document.getElementById("year").textContent = new Date().getFullYear();

  // Keep the open/closed badge fresh if the page stays open
  setInterval(function () { renderHours(renderStatus()); }, 60 * 1000);
})();
