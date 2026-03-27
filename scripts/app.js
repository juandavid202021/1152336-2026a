// app.js
// Token: 1152336-2026A | Producto: CodeReview+ | Examen Diagnóstico 2026A
const STUDENT_TOKEN = '1152336-2026A';
// El token se usa como prefijo en variables: tokenTema, tokenScrollActivo

// ─────────────────────────────────────────────
// FUNCIÓN 1: Año automático en el footer
// ─────────────────────────────────────────────
/**
 * Qué hace        : Inserta el año actual en el elemento #anio-footer
 * Por qué así     : Evita hardcodear el año; se actualiza automáticamente sin mantenimiento
 * Alternativa desc: Podría usarse un atributo data en HTML, pero JS es más robusto y directo
 */
function generarAnioFooter() {
  const secAnioFooter = document.getElementById('anio-footer');
  if (secAnioFooter) {
    secAnioFooter.textContent = new Date().getFullYear();
  }
}

// ─────────────────────────────────────────────
// FUNCIÓN 2: Saludo dinámico según hora
// ─────────────────────────────────────────────
/**
 * Qué hace        : Muestra un saludo en el hero según la hora del sistema del usuario
 * Por qué así     : Personaliza la experiencia con datos disponibles sin backend
 * Alternativa desc: Usar geolocalización para timezone, descartado por requerir permiso del usuario
 */
function generarSaludoDinamico() {
  const secSaludo = document.getElementById('saludo-dinamico');
  if (!secSaludo) return;
  const hora = new Date().getHours();
  let tokenSaludoTexto = '';
  if (hora >= 5 && hora <= 11) {
    tokenSaludoTexto = '🌅 Buenos días — tu código te espera';
  } else if (hora >= 12 && hora <= 18) {
    tokenSaludoTexto = '☀️ Buenas tardes — analiza un repo ahora';
  } else {
    tokenSaludoTexto = '🌙 Buenas noches — el código no duerme';
  }
  secSaludo.textContent = tokenSaludoTexto;
}

// ─────────────────────────────────────────────
// FUNCIÓN 3: Cambio de tema claro/oscuro
// ─────────────────────────────────────────────
/**
 * Qué hace        : Alterna el atributo data-theme del body entre light y dark
 * Por qué así     : CSS variables en :root y body[data-theme="dark"] manejan todo el cambio visual
 * Alternativa desc: Clase toggle en body; descartado para mantener semántica clara con atributo data
 */
function iniciarCambioTema() {
  const tokenTema = document.getElementById('btn-tema');
  const body = document.body;
  if (!tokenTema) return;
  tokenTema.addEventListener('click', function () {
    const temaActual = body.getAttribute('data-theme');
    if (temaActual === 'dark') {
      body.setAttribute('data-theme', 'light');
      tokenTema.textContent = '☀︎';
    } else {
      body.setAttribute('data-theme', 'dark');
      tokenTema.textContent = '☽';
    }
  });
}

// ─────────────────────────────────────────────
// FUNCIÓN 4: Menú de navegación activo al hacer scroll
// ─────────────────────────────────────────────
/**
 * Qué hace        : Resalta el enlace del menú correspondiente a la sección visible
 * Por qué así     : IntersectionObserver es performante y no bloquea el hilo principal
 * Alternativa desc: Escuchar scroll y calcular offsetTop manualmente; descartado por costo en rendimiento
 */
function iniciarNavScrollActivo() {
  const tokenScrollActivo = document.querySelectorAll('#navbar .nav-links a');
  const secciones = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        tokenScrollActivo.forEach(function (enlace) {
          enlace.classList.remove('activo');
          if (enlace.getAttribute('href') === '#' + entry.target.id) {
            enlace.classList.add('activo');
          }
        });
      }
    });
  }, { threshold: 0.35 });
  secciones.forEach(function (seccion) {
    observer.observe(seccion);
  });
}

// ─────────────────────────────────────────────
// FUNCIÓN 5: Filtro de tarjetas de características
// ─────────────────────────────────────────────
/**
 * Qué hace        : Oculta/muestra tarjetas según data-categoria sin eliminarlas del DOM
 * Por qué así     : display:none preserva el DOM y el contador refleja solo las visibles
 * Alternativa desc: Usar opacity:0 + pointer-events:none; descartado porque ocupa espacio en grid
 */
function iniciarFiltroCaracteristicas() {
  const botonesF = document.querySelectorAll('.btn-filtro');
  const tarjetas = document.querySelectorAll('.tarjeta-caracteristica');
  const contadorEl = document.getElementById('contador');
  botonesF.forEach(function (boton) {
    boton.addEventListener('click', function () {
      botonesF.forEach(function (b) { b.classList.remove('activo'); });
      boton.classList.add('activo');
      const filtro = boton.getAttribute('data-filtro');
      let visibles = 0;
      tarjetas.forEach(function (tarjeta) {
        if (filtro === 'todas' || tarjeta.getAttribute('data-categoria') === filtro) {
          tarjeta.classList.remove('oculta');
          visibles++;
        } else {
          tarjeta.classList.add('oculta');
        }
      });
      if (contadorEl) contadorEl.textContent = visibles;
    });
  });
}

// ─────────────────────────────────────────────
// FUNCIÓN 6: Acordeón de pasos (cómo funciona)
// ─────────────────────────────────────────────
/**
 * Qué hace        : Expande el detalle de un paso al hacer clic en número o título; solo uno a la vez
 * Por qué así     : Toggle de clase CSS permite animación declarativa y lógica simple
 * Alternativa desc: Usar max-height en lugar de display:none; descartado por complejidad innecesaria
 */
function iniciarAcordeonPasos() {
  const pasos = document.querySelectorAll('.paso');
  pasos.forEach(function (paso) {
    const numero = paso.querySelector('.paso-numero');
    const titulo = paso.querySelector('.paso-titulo');
    [numero, titulo].forEach(function (el) {
      if (el) {
        el.addEventListener('click', function () {
          const yaExpandido = paso.classList.contains('expandido');
          pasos.forEach(function (p) { p.classList.remove('expandido'); });
          if (!yaExpandido) paso.classList.add('expandido');
        });
      }
    });
  });
}

// ─────────────────────────────────────────────
// FUNCIÓN 7: Toggle mensual / anual en precios
// ─────────────────────────────────────────────
/**
 * Qué hace        : Cambia los precios mostrados al alternar el switch mensual/anual (-20%)
 * Por qué así     : Los valores están en data attributes del HTML; JS solo los lee y formatea
 * Alternativa desc: Calcular el descuento en JS con el precio base; equivalente, se prefirió data attrs
 */
function iniciarTogglePrecios() {
  const toggleAnual = document.getElementById('toggle-anual');
  const montos = document.querySelectorAll('.monto');
  if (!toggleAnual) return;
  toggleAnual.addEventListener('change', function () {
    const esAnual = toggleAnual.checked;
    montos.forEach(function (monto) {
      const valorMensual = parseInt(monto.getAttribute('data-mensual'), 10);
      const valorAnual = parseInt(monto.getAttribute('data-anual'), 10);
      const valor = esAnual ? valorAnual : valorMensual;
      monto.textContent = valor === 0 ? '$0' : '$' + valor;
    });
  });
}

// ─────────────────────────────────────────────
// FUNCIÓN 8: Mensaje al seleccionar plan
// ─────────────────────────────────────────────
/**
 * Qué hace        : Muestra un mensaje de confirmación al hacer clic en un botón de plan
 * Por qué así     : No recarga la página; feedback inmediato sin modal ni redirección
 * Alternativa desc: Abrir modal con detalles del plan; descartado para mantener simplicidad requerida
 */
function iniciarSeleccionPlan() {
  const botonesPlan = document.querySelectorAll('.btn-plan');
  const mensajePlan = document.getElementById('mensaje-plan');
  botonesPlan.forEach(function (boton) {
    boton.addEventListener('click', function () {
      const plan = boton.getAttribute('data-plan');
      if (mensajePlan) {
        mensajePlan.textContent = '✓ Has seleccionado el plan ' + plan + '. Te contactaremos pronto.';
        mensajePlan.classList.remove('oculto');
        setTimeout(function () {
          mensajePlan.classList.add('oculto');
        }, 4000);
      }
    });
  });
}

// ─────────────────────────────────────────────
// FUNCIÓN 9: Carrusel de testimonios
// ─────────────────────────────────────────────
/**
 * Qué hace        : Muestra testimonios uno a la vez con nav manual y avance automático cada 5s
 * Por qué así     : Control explícito del índice activo con classList; el timer se reinicia al navegar
 * Alternativa desc: CSS-only carrusel con :target; descartado por no permitir autoplay
 */
function iniciarCarrusel() {
  const testimonios = document.querySelectorAll('.testimonio');
  const indicadoresContenedor = document.getElementById('indicadores');
  const btnAnt = document.getElementById('btn-anterior');
  const btnSig = document.getElementById('btn-siguiente');
  if (!testimonios.length) return;

  let indiceActual = 0;
  let tokenCarruselTimer = null;

  // Crear indicadores
  testimonios.forEach(function (_, i) {
    const dot = document.createElement('button');
    dot.classList.add('indicador');
    dot.setAttribute('aria-label', 'Testimonio ' + (i + 1));
    if (i === 0) dot.classList.add('activo');
    dot.addEventListener('click', function () {
      mostrarTestimonio(i);
      reiniciarTimer();
    });
    indicadoresContenedor.appendChild(dot);
  });

  function mostrarTestimonio(indice) {
    testimonios[indiceActual].classList.remove('activo');
    indicadoresContenedor.children[indiceActual].classList.remove('activo');
    indiceActual = (indice + testimonios.length) % testimonios.length;
    testimonios[indiceActual].classList.add('activo');
    indicadoresContenedor.children[indiceActual].classList.add('activo');
  }

  function reiniciarTimer() {
    clearInterval(tokenCarruselTimer);
    tokenCarruselTimer = setInterval(function () {
      mostrarTestimonio(indiceActual + 1);
    }, 5000);
  }

  if (btnAnt) {
    btnAnt.addEventListener('click', function () {
      mostrarTestimonio(indiceActual - 1);
      reiniciarTimer();
    });
  }
  if (btnSig) {
    btnSig.addEventListener('click', function () {
      mostrarTestimonio(indiceActual + 1);
      reiniciarTimer();
    });
  }

  reiniciarTimer();
}

// ─────────────────────────────────────────────
// FUNCIÓN 10: Validación del formulario de contacto
// ─────────────────────────────────────────────
/**
 * Qué hace        : Valida cada campo al perder foco y al enviar; muestra errores específicos
 * Por qué así     : Validación inline (blur) + submit mejora UX sin frameworks externos
 * Alternativa desc: Constraint Validation API nativa; descartado para controlar mensajes en español
 */
function iniciarFormularioContacto() {
  const campoNombre = document.getElementById('nombre');
  const campoCorreo = document.getElementById('correo');
  const campoAsunto = document.getElementById('asunto');
  const campoMensaje = document.getElementById('mensaje');
  const btnEnviar = document.getElementById('btn-enviar');
  const confirmacion = document.getElementById('confirmacion-envio');

  function mostrarError(campo, errorId, mensaje) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = mensaje;
    if (campo) campo.classList.add('invalido');
  }

  function limpiarError(campo, errorId) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = '';
    if (campo) campo.classList.remove('invalido');
  }

  function validarNombre() {
    if (!campoNombre.value.trim()) {
      mostrarError(campoNombre, 'error-nombre', 'El nombre no puede estar vacío.');
      return false;
    }
    limpiarError(campoNombre, 'error-nombre');
    return true;
  }

  function validarCorreo() {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patron.test(campoCorreo.value.trim())) {
      mostrarError(campoCorreo, 'error-correo', 'Ingresa un correo electrónico válido.');
      return false;
    }
    limpiarError(campoCorreo, 'error-correo');
    return true;
  }

  function validarAsunto() {
    if (campoAsunto.value.trim().length < 5) {
      mostrarError(campoAsunto, 'error-asunto', 'El asunto debe tener mínimo 5 caracteres.');
      return false;
    }
    limpiarError(campoAsunto, 'error-asunto');
    return true;
  }

  function validarMensaje() {
    if (campoMensaje.value.trim().length < 20) {
      mostrarError(campoMensaje, 'error-mensaje', 'El mensaje debe tener mínimo 20 caracteres.');
      return false;
    }
    limpiarError(campoMensaje, 'error-mensaje');
    return true;
  }

  if (campoNombre) campoNombre.addEventListener('blur', validarNombre);
  if (campoCorreo) campoCorreo.addEventListener('blur', validarCorreo);
  if (campoAsunto) campoAsunto.addEventListener('blur', validarAsunto);
  if (campoMensaje) campoMensaje.addEventListener('blur', validarMensaje);

  if (btnEnviar) {
    btnEnviar.addEventListener('click', function () {
      const valido = validarNombre() & validarCorreo() & validarAsunto() & validarMensaje();
      if (valido) {
        const nombre = campoNombre.value.trim();
        campoNombre.value = '';
        campoCorreo.value = '';
        campoAsunto.value = '';
        campoMensaje.value = '';
        if (confirmacion) {
          confirmacion.textContent = '¡Gracias, ' + nombre + '! Tu mensaje fue enviado correctamente.';
          confirmacion.classList.remove('oculto');
          setTimeout(function () {
            confirmacion.classList.add('oculto');
          }, 5000);
        }
      }
    });
  }
}

// ─────────────────────────────────────────────
// FUNCIÓN 11: Botón volver al inicio (scroll suave)
// ─────────────────────────────────────────────
/**
 * Qué hace        : Hace scroll suave hasta la parte superior al presionar el botón del footer
 * Por qué así     : scrollTo con behavior smooth es nativo y no requiere librerías
 * Alternativa desc: href="#top" en el HTML; descartado porque scroll-behavior en html ya lo cubre igual
 */
function iniciarBotonTop() {
  const btnTop = document.getElementById('btn-top');
  if (btnTop) {
    btnTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ─────────────────────────────────────────────
// INICIALIZACIÓN
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  generarAnioFooter();
  generarSaludoDinamico();
  iniciarCambioTema();
  iniciarNavScrollActivo();
  iniciarFiltroCaracteristicas();
  iniciarAcordeonPasos();
  iniciarTogglePrecios();
  iniciarSeleccionPlan();
  iniciarCarrusel();
  iniciarFormularioContacto();
  iniciarBotonTop();
});
