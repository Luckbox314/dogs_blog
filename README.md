# GUAU-BLOG.NET

Demo de sitio web estatico con estetica de principios de los 2000s: un weblog escrito por perros.

- HTML + CSS + JS puro, sin dependencias ni build.
- Layout con tablas, `<marquee>`, texto parpadeante, contador de visitas, libro de visitas (localStorage), encuesta, webring y botones 88x31.
- Todas las imagenes son SVG generados a mano (sin assets externos).

## Ver localmente

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python -m http.server 8000
```

## Estructura

```
index.html            portada con los posts
perros.html           perfiles de los cuatro perros
libro-visitas.html    libro de visitas
enlaces.html          enlaces
posts/*.html          entradas completas
style.css / script.js
img/                  fondos, avatares y decoraciones (SVG)
```

Contenido ficticio con fines humoristicos.
