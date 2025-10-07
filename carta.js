function cargarCarta(idioma) {
  fetch(`data/carta_${idioma}.json`)
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar el archivo JSON");
      return res.json();
    })
    .then(data => {
      const contenedor = document.getElementById('contenido');
      contenedor.innerHTML = '';
      data.familias.forEach(fam => {
        const bloque = document.createElement('section');
        bloque.className = 'familia';

        const boton = document.createElement('button');
        boton.className = 'toggle';
        //boton.innerHTML = `<img src="img/${fam.icono}" alt="${fam.nombre}"> ${fam.nombre}`;
        boton.innerHTML = `<alt="${fam.nombre}"> ${fam.nombre}`;
        boton.addEventListener('click', () => {
          contenido.classList.toggle('visible');
        });

        const contenido = document.createElement('div');
        contenido.className = 'contenido';
        fam.articulos.forEach(art => {
          const p = document.createElement('p');
          p.innerHTML = `<strong>${art.nombre}</strong> - €${art.precio.toFixed(2)}<br><em>${art.descripcion || ''}</em>`;
          contenido.appendChild(p);
        });

        bloque.appendChild(boton);
        bloque.appendChild(contenido);
        contenedor.appendChild(bloque);
      });
    })
    .catch(err => {
      document.getElementById('contenido').innerHTML = `<p>Error al cargar la carta: ${err.message}</p>`;
    });
}

// Recuperar idioma guardado o usar español por defecto
const idiomaGuardado = localStorage.getItem('idioma') || 'es';
document.getElementById('idioma').value = idiomaGuardado;
cargarCarta(idiomaGuardado);

// Guardar idioma al cambiar
document.getElementById('idioma').addEventListener('change', e => {
  const nuevoIdioma = e.target.value;
  localStorage.setItem('idioma', nuevoIdioma);
  cargarCarta(nuevoIdioma);
});

// Fallback si no existe cabecera personalizada
const header = document.querySelector('.cabecera');
const img = new Image();
img.src = 'img/cabecera.jpg';
img.onerror = () => {
  header.style.backgroundImage = "url('img/cabecera_default.jpg')";
};
