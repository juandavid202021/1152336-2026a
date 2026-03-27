// Token: 1152336-2026A | Producto: CodeReview+ | Examen Diagnóstico 2026A

/* 
Qué hace: Inicializa todos los eventos y datos
Por qué así: Centraliza la lógica al cargar
Alternativa descartada: Ejecutar funciones sueltas sin control
*/
document.addEventListener("DOMContentLoaded", () => {
  initHero();
  initCaracteristicas();
  initPrecios();
  initCarrusel();
  initFormulario();
  generarFooter();
  saludoHero();
  initTema();
});


// ================= HERO =================
function initHero() {
  const btn = document.getElementById("btnHero");
  btn.addEventListener("click", () => {
    document.getElementById("seccion-precios").scrollIntoView({ behavior: "smooth" });
  });
}

/* 
Qué hace: Saludo dinámico según hora
*/
function saludoHero() {
  const hora = new Date().getHours();
  let saludo = "";

  if (hora >= 5 && hora < 12) saludo = "Buenos días";
  else if (hora < 19) saludo = "Buenas tardes";
  else saludo = "Buenas noches";

  document.querySelector("#seccion-hero p").textContent =
    `${saludo}, mejora tu código con CodeReview+`;
}


// ================= CARACTERÍSTICAS =================
function initCaracteristicas() {
  const contenedor = document.getElementById("contenedor-caracteristicas");
  const contador = document.getElementById("contador");
  const botones = document.querySelectorAll("[data-filtro]");

  const data = [
    { titulo: "Análisis automático", categoria: "core" },
    { titulo: "Integración GitHub", categoria: "integracion" },
    { titulo: "Detección de vulnerabilidades", categoria: "seguridad" },
    { titulo: "Reportes inteligentes", categoria: "core" },
    { titulo: "Integración CI/CD", categoria: "integracion" },
    { titulo: "Auditoría de código", categoria: "seguridad" }
  ];

  function render(filtro) {
    contenedor.innerHTML = "";

    const filtrados = data.filter(item =>
      filtro === "todos" || item.categoria === filtro
    );

    filtrados.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("tarjeta");
      div.textContent = item.titulo;
      contenedor.appendChild(div);
    });

    contador.textContent = `${filtrados.length} / ${data.length}`;
  }

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      render(btn.dataset.filtro);
    });
  });

  render("todos");
}


// ================= PRECIOS =================
function initPrecios() {
  const contenedor = document.getElementById("contenedor-planes");
  const toggle = document.getElementById("togglePrecios");

  let anual = false;

  const planes = [
    { nombre: "Gratis", precio: 0 },
    { nombre: "Pro", precio: 20 },
    { nombre: "Empresarial", precio: 50 }
  ];

  function render() {
    contenedor.innerHTML = "";

    planes.forEach(p => {
      let precio = anual ? p.precio * 12 * 0.8 : p.precio;

      const div = document.createElement("div");
      div.classList.add("plan");
      if (p.nombre === "Pro") div.classList.add("destacado");

      div.innerHTML = `
        <h3>${p.nombre}</h3>
        <p>$${precio.toFixed(2)}</p>
        <button>Elegir</button>
      `;

      div.querySelector("button").addEventListener("click", () => {
        alert(`Elegiste el plan ${p.nombre}`);
      });

      contenedor.appendChild(div);
    });
  }

  toggle.addEventListener("click", () => {
    anual = !anual;
    render();
  });

  render();
}


// ================= CARRUSEL =================
function initCarrusel(){
 const data=[
  {n:"Ana",c:"Dev",r:5,t:"Esta herramienta cambió totalmente la forma en que reviso código, ahora todo es más seguro y eficiente en producción."},
  {n:"Luis",c:"Team Lead",r:4,t:"Muy útil para equipos grandes, permite detectar errores antes de que escalen y mejora la calidad del software."},
  {n:"Carlos",c:"Backend",r:5,t:"Las recomendaciones automáticas son precisas y ayudan a mantener estándares profesionales."},
  {n:"Marta",c:"QA",r:4,t:"Excelente para pruebas y validación, ahora encontramos errores mucho más rápido."},
  {n:"Sofia",c:"DevOps",r:5,t:"Integración perfecta con pipelines, realmente optimiza el flujo de trabajo."}
 ];

 let i=0;
 const cont=document.getElementById("carrusel");

 function render(){
  let x=data[i];
  cont.innerHTML=`<h3>${x.n}</h3><p>${x.c}</p><p>${"⭐".repeat(x.r)}</p><p>${x.t}</p>`;
 }

 function next(){ i=(i+1)%data.length; render(); reset(); }
 function prev(){ i=(i-1+data.length)%data.length; render(); reset(); }

 document.getElementById("next").onclick=next;
 document.getElementById("prev").onclick=prev;

 let timer=setInterval(next,5000);
 function reset(){ clearInterval(timer); timer=setInterval(next,5000); }

 render();
}


// ================= FORMULARIO =================
function initFormulario() {
  const form = document.getElementById("formulario");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre) return alert("Nombre obligatorio");
    if (!correo.includes("@")) return alert("Correo inválido");
    if (asunto.length < 5) return alert("Asunto mínimo 5 caracteres");
    if (mensaje.length < 20) return alert("Mensaje mínimo 20 caracteres");

    alert(`Gracias ${nombre}, mensaje enviado`);
    form.reset();
  });
}


// ================= FOOTER =================
function generarFooter() {
  const footer = document.getElementById("footer-texto");
  const year = new Date().getFullYear();
  footer.textContent = `CodeReview+ - Empresa ficticia - ${year}`;
}


// ================= TEMA OSCURO =================
function initTema() {
  const btn = document.createElement("button");
  btn.textContent = "Modo oscuro";
  document.body.prepend(btn);

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}