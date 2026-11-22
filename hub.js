(() => {
  const tools = window.FERRAMENTAS || [];
  const N = tools.length;
  const root = document.documentElement;
  const stage = document.querySelector(".stage");
  const track = document.querySelector(".track");
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

  /* ---------- monta os cards ---------- */
  const SETA = '<svg viewBox="0 0 98.1 37.04" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="1" width="96.1" height="35.04" rx="17.52"/><path d="M22.08 18.52h53.94"/><path d="M66.2 8.7l9.82 9.82-9.82 9.82"/></svg>';
  const cards = tools.map((t, i) => {
    const card = el("article", "card");
    card.style.setProperty("--grad", t.gradiente);
    if (t.fundo) card.style.backgroundImage = `url("${t.fundo}")`;
    card.setAttribute("aria-label", `${t.nome}, ${i + 1} de ${N}`);

    const face = el("div", "face");

    const titulo = el("h2", "titulo");
    if (t.nomeImagem && t.nomeLargura) {
      titulo.style.setProperty("--nw", t.nomeLargura / 100);
      const nm = el("img");
      nm.src = t.nomeImagem;
      nm.alt = t.nome;
      nm.draggable = false;
      titulo.append(nm);
    } else {
      titulo.classList.add("texto");
      titulo.textContent = t.nome;
    }

    const desc = el("p", "desc", t.descricao);

    const m = Object.assign({ esquerda: 0, topo: -1.413, largura: 100, altura: 101.62, corte: 36.82 }, t.mascote || {});
    const bicho = el("img", "bicho");
    bicho.src = t.imagem;
    bicho.alt = "";
    bicho.draggable = false;
    bicho.decoding = "async";
    bicho.style.left = m.esquerda + "%";
    bicho.style.top = m.topo + "%";
    bicho.style.width = m.largura + "%";
    bicho.style.height = m.altura + "%";
    bicho.style.clipPath = `inset(${m.corte}% 0 0 0)`;

    face.append(titulo, desc, bicho);

    let btn;
    if (t.estado === "breve") {
      btn = el("span", "go");
      btn.setAttribute("aria-disabled", "true");
      btn.setAttribute("aria-label", `${t.nome}: em breve`);
    } else {
      btn = el("a", "go");
      btn.href = t.pasta + (t.entrada || "index.html");
      btn.setAttribute("aria-label", `Abrir ${t.nome}`);
    }
    btn.insertAdjacentHTML("beforeend", SETA);

    card.append(face, btn);
    card.addEventListener("click", (e) => {
      if (justDragged) { e.preventDefault(); return; }
      if (i !== cur) { e.preventDefault(); goTo(i); }
    });
    track.append(card);
    return { card, btn };
  });

  /* ---------- estado e desenho ---------- */
  let pos = 0, target = 0, spread = reduce.matches ? 1 : 0;
  let cur = -1, raf = 0, last = 0, dragging = false, justDragged = false;

  /* posições do leque (medidas no desenho de 1920x1080, em fração da largura do card central) */
  const SLOT = {
    L: { tx: -0.7833, ty: 0.0879, r: -14.33, sx: 0.74, sy: 0.84, k: 1.53 },
    R: { tx: 0.8132, ty: 0.0841, r: 9.5451, sx: 0.7447, sy: 0.8344, k: -1.0427 }
  };

  function draw() {
    const sp = 1 - Math.pow(1 - spread, 3);
    cards.forEach(({ card }, i) => {
      const d = mod(i - pos + N / 2, N) - N / 2;
      const ad = Math.abs(d), sg = d < 0 ? -1 : 1;
      const S = d < 0 ? SLOT.L : SLOT.R;
      const t = Math.min(ad, 1), ex = Math.max(ad - 1, 0);
      const tx = (S.tx * t + sg * ex * 0.55) * sp;
      const ty = (S.ty * t + ex * 0.12) * sp;
      const r = (S.r * t + sg * ex * 6) * sp;
      const sx = 1 + ((S.sx - 1) * t - ex * 0.06) * sp;
      const sy = 1 + ((S.sy - 1) * t - ex * 0.06) * sp;
      const k = S.k * t * sp;
      const edge = N >= 3 ? (N / 2 - ad) / 0.5 : 1;
      const o = clamp(Math.min(edge, (2.7 - ad) / 0.7), 0, 1);
      const st = card.style;
      st.setProperty("--tx", tx.toFixed(4));
      st.setProperty("--ty", ty.toFixed(4));
      st.setProperty("--r", r.toFixed(3));
      st.setProperty("--sx", sx.toFixed(4));
      st.setProperty("--sy", sy.toFixed(4));
      st.setProperty("--k", k.toFixed(3));
      st.setProperty("--o", o.toFixed(3));
      st.setProperty("--v", (t * 0.26).toFixed(3));
      st.setProperty("--z", String(100 - Math.round(ad * 10)));
      st.visibility = o <= 0.01 ? "hidden" : "visible";
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
