# Portfolio de Maritza Cieza

Sitio estático (gratis en GitHub Pages) con su propio panel visual en `/admin`.
Todo el contenido vive en `content.json`. El panel lo edita con botones y lo publica en tu repo.

## Dónde vive

- Tu web: **https://madamemaritza.github.io**
- Tu panel: **https://madamemaritza.github.io/admin/**

GitHub Pages publica sola cada cambio en la rama `main` (tarda uno o dos minutos).

## Entrar al panel la primera vez (5 minutos)

1. GitHub → tu foto → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
2. Nombre: `panel portfolio`. Expiración: 1 año.
3. Repository access: **Only select repositories** → `madamemaritza.github.io`.
4. Permissions → Repository permissions → **Contents: Read and write**. Generate y copia el token (empieza con `github_pat_`).
5. Abre tu panel, escribe `madamemaritza`, repositorio `madamemaritza.github.io`, rama `main`, pega el token y listo. Queda guardado en ese navegador.

## Usar el panel

- A la izquierda eliges la sección: Hero, Cifras, Casos, Empresas, Testimonios, etc.
- En las listas tienes botones para **Agregar**, **Editar**, **Ocultar**, **Borrar** y **subir/bajar** el orden.
- Cada texto tiene su versión **EN** y **FR**. La vista previa de la derecha cambia de idioma con el botón "Vista".
- Para fotos y logos, usa el botón de archivo. Se suben solas a `assets/uploads/`.
- Cuando termines, aprieta **Publicar**. Tu web se actualiza en uno o dos minutos.
- "Probar sin conectar" sirve para jugar sin tocar nada: los cambios no se publican.

## Pendientes

- Logos de Alicorp, Grupo Breca y La French Tech Lyon (PNG o SVG con fondo transparente) en "Empresas". TotalEnergies, BNP Paribas, SUEZ y EDF ya están.
- Resultados reales de los casos donde dice `[X]`, testimonios, email y CVs en PDF.
- Big Sexy Sans no se usa en esta versión. Irene Florentina ya está incluida.

## Archivos

- `index.html`, `styles.css`, `app.js`: la web.
- `content.json`: todo tu contenido.
- `admin/index.html`: el panel.
- `assets/`: fotos, marco, Bernie, laptop, fuentes y lo que subas.
