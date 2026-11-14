(() => {
  const tools = window.FERRAMENTAS || [];
  const N = tools.length;
  const root = document.documentElement;
  const stage = document.querySelector(".stage");
  const track = document.querySelector(".track");
  const dotsEl = document.querySelector(".dots");
  const live = document.getElementById("live");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");

  if (!N) {
    track.style.width = "auto";
    const p = document.createElement("p");
    p.className = "erro";
    p.textContent = "Não consegui carregar a lista de ferramentas.";
    track.append(p);
    return;
  }

  const mod = (a, n) => ((a % n) + n) % n;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };

  /* ---------- monta cards e pontos ---------- */
  const cards = tools.map((t, i) => {
    const card = el("article", "card");
    card.style.setProperty("--ca", t.cores[0]);
    card.style.setProperty("--cb", t.cores[1]);
    if (t.corTexto) card.style.setProperty("--desc", t.corTexto);
    if (t.nomeLargura) card.style.setProperty("--nome-w", t.nomeLargura);
    if (t.fundo) {
      card.style.backgroundImage = `url("${t.fundo}")`;
      card.style.backgroundSize = "100% 100%";
    }
    card.setAttribute("aria-label", `${t.nome}, ${i + 1} de ${N}`);

    const shot = el("div", "shot");
    const img = el("img");
    img.src = t.imagem;
    img.alt = "";
    img.draggable = false;
    img.decoding = "async";
    shot.append(img);

    const panel = el("div", "panel");
    const h2 = el("h2");
    if (t.nomeImagem) {
      const nm = el("img", "nome");
      nm.src = t.nomeImagem;
      nm.alt = t.nome;
      nm.draggable = false;
      h2.append(nm);
    } else {
      h2.textContent = t.nome;
    }
    panel.append(h2, el("p", null, t.descricao));
    let btn;
    if (t.estado === "breve") {
      btn = el("span", "btn", "Em breve");
      btn.setAttribute("aria-disabled", "true");
    } else {
      btn = el("a", "btn", "Abrir");
      btn.href = t.pasta + (t.entrada || "index.html");
      btn.setAttribute("aria-label", `Abrir ${t.nome}`);
    }
    panel.append(btn);

    card.append(shot, panel);
    card.addEventListener("click", (e) => {
      if (justDragged) { e.preventDefault(); return; }
      if (i !== cur) { e.preventDefault(); goTo(i); }
    });
    track.append(card);
    return { card, btn };
  });

  const dots = tools.map((t, i) => {
    const b = el("button", "dot");
    b.type = "button";
    b.setAttribute("aria-label", `Ir para ${t.nome}`);
    b.append(el("i"));
    b.addEventListener("click", () => goTo(i));
    dotsEl.append(b);
    return b;
  });

  const indexEl = document.querySelector(".index");
  const idxBtns = indexEl ? tools.map((t, i) => {
    const b = el("button", "idx");
    b.type = "button";
    b.append(el("span", "num", String(i + 1).padStart(2, "0")));
    if (t.nomeImagem) {
      const im = el("img");
      im.src = t.nomeImagem;
      im.alt = t.nome;
      im.draggable = false;
      b.append(im);
    } else {
      b.append(el("span", "nm", t.nome));
    }
    b.addEventListener("click", () => goTo(i));
    return b;
  }) : [];
  if (indexEl) {
    const ol = el("ol");
    idxBtns.forEach((b) => { const li = el("li"); li.append(b); ol.append(li); });
    indexEl.append(ol);
  }

  /* ---------- estado e desenho ---------- */
  let pos = 0, target = 0, spread = reduce.matches ? 1 : 0;
  let cur = -1, raf = 0, last = 0, dragging = false, justDragged = false;

  function draw() {
    const sp = 1 - Math.pow(1 - spread, 3);
    cards.forEach(({ card }, i) => {
      const d = mod(i - pos + N / 2, N) - N / 2;
      const ad = Math.abs(d), sg = d < 0 ? -1 : 1;
      const x = sg * (Math.min(ad, 1) * 0.8 + Math.max(ad - 1, 0) * 0.36) * sp;
      const zz = -0.42 * Math.min(ad, 2) * sp;
      const ry = -clamp(d * 42, -52, 52) * sp;
      const s = 1;
      const edge = N >= 3 ? (N / 2 - ad) / 0.5 : 1;
      const o = clamp(Math.min(edge, (2.7 - ad) / 0.7), 0, 1);
      card.style.setProperty("--x", x.toFixed(4));
      card.style.setProperty("--zz", zz.toFixed(4));
      card.style.setProperty("--ry", ry.toFixed(3));
      card.style.setProperty("--s", s.toFixed(4));
      card.style.setProperty("--o", o.toFixed(3));
      card.style.setProperty("--v", (Math.min(ad, 1) * 0.26).toFixed(3));
      card.style.setProperty("--z", String(100 - Math.round(ad * 10)));
      card.style.visibility = o <= 0.01 ? "hidden" : "visible";
    });
    const now = mod(Math.round(pos), N);
    if (now !== cur) setCurrent(now);
  }

  function setCurrent(i) {
    const first = cur === -1;
    cur = i;
    const t = tools[i];
    root.style.setProperty("--a", t.cores[0]);
    root.style.setProperty("--b", t.cores[1]);
    cards.forEach(({ card, btn }, k) => {
      card.classList.toggle("on", k === i);
      if (btn.tagName === "A") btn.tabIndex = k === i ? 0 : -1;
    });
    dots.forEach((b, k) => b.setAttribute("aria-current", k === i ? "true" : "false"));
    idxBtns.forEach((b, k) => b.setAttribute("aria-current", k === i ? "true" : "false"));
    if (!first) live.textContent = `${t.nome}, ${i + 1} de ${N}`;
  }

  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    if (spread < 1) spread = Math.min(1, spread + dt / 0.75);
    if (!dragging) {
      const diff = target - pos;
      if (reduce.matches || Math.abs(diff) < 0.0008) pos = target;
      else pos += diff * (1 - Math.exp(-dt * 10));
    }
    draw();
    raf = dragging || pos !== target || spread < 1 ? requestAnimationFrame(tick) : 0;
  }
  function kick() {
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
  }

  /* ---------- navegação ---------- */
  function goTo(i) {
    const base = Math.round(target);
    target = base + (mod(i - base + N / 2, N) - N / 2);
    kick();
  }
  const step = (n) => { target = Math.round(target) + n; kick(); };

  document.querySelector(".prev").addEventListener("click", () => step(-1));
  document.querySelector(".next").addEventListener("click", () => step(1));

  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowLeft") { step(-1); e.preventDefault(); }
    else if (e.key === "ArrowRight") { step(1); e.preventDefault(); }
    else if (e.key === "Home") { goTo(0); e.preventDefault(); }
    else if (e.key === "End") { goTo(N - 1); e.preventDefault(); }
  });

  /* rolagem: um giro por gesto (com pausa para a inércia do trackpad) */
  let acc = 0, lastWheel = 0, lastStep = 0;
  addEventListener("wheel", (e) => {
    if (e.ctrlKey) return;
    const horiz = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const pageScrolls = root.scrollHeight > innerHeight + 2;
    if (pageScrolls && !horiz) return;
    e.preventDefault();
    const now = performance.now();
    if (now - lastWheel > 220) acc = 0;
    lastWheel = now;
    acc += horiz ? e.deltaX : e.deltaY;
    if (Math.abs(acc) >= 50 && now - lastStep > 380) {
      step(acc > 0 ? 1 : -1);
      acc = 0;
      lastStep = now;
    }
  }, { passive: false });

  /* arrastar e deslizar */
  let drag = null;
  stage.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag = { id: e.pointerId, x: e.clientX, from: pos, moved: false, vx: 0, lx: e.clientX, lt: performance.now() };
  });
  stage.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 6) {
      drag.moved = true;
      dragging = true;
      stage.setPointerCapture(e.pointerId);
      stage.classList.add("drag");
      kick();
    }
    if (!drag.moved) return;
    const now = performance.now();
    const dt = now - drag.lt;
    if (dt > 0) drag.vx = (e.clientX - drag.lx) / dt;
    drag.lx = e.clientX; drag.lt = now;
    const stepPx = track.offsetWidth * 0.8;
    pos = target = drag.from - dx / stepPx;
  });
  function endDrag(e) {
    if (!drag || e.pointerId !== drag.id) return;
    if (drag.moved) {
      const stepPx = track.offsetWidth * 0.8;
      const proj = clamp(-drag.vx * 180 / stepPx, -1.5, 1.5);
      target = Math.round(pos + proj);
      justDragged = true;
      setTimeout(() => { justDragged = false; }, 0);
    }
    dragging = false;
    stage.classList.remove("drag");
    drag = null;
    kick();
  }
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);

  draw();
  kick();
})();
