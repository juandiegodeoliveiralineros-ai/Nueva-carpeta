// Crea las dos capas (roja y negra) que forman la transición
const overlay = document.createElement("div");
overlay.className = "transicion descubriendo";
overlay.innerHTML = '<div class="capa capa-roja"></div><div class="capa capa-negra"></div>';
document.body.appendChild(overlay);

// Cubre la pantalla y luego cambia de página
function irA(destino) {
  const sinAnimacion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (sinAnimacion) {
    window.location.href = destino;
    return;
  }
  overlay.classList.remove("descubriendo");
  overlay.classList.add("cubriendo");
  setTimeout(function () {
    window.location.href = destino;
  }, 650);
}

// Aplica la transición a todos los enlaces internos
document.querySelectorAll("a[href]").forEach(function (enlace) {
  enlace.addEventListener("click", function (evento) {
    const destino = enlace.getAttribute("href");
    const esInterno = !destino.startsWith("#") && !destino.startsWith("http") && enlace.target !== "_blank";
    if (esInterno) {
      evento.preventDefault();
      irA(destino);
    }
  });
});

// Si el usuario vuelve con el botón "atrás", se quita la capa
window.addEventListener("pageshow", function (evento) {
  if (evento.persisted) {
    overlay.classList.remove("cubriendo");
    overlay.classList.add("descubriendo");
  }
});