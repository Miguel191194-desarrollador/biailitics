# AIFlow — Sitio Web de Automatización con IA

Sitio web personal de un consultor freelance especializado en automatización de procesos con Inteligencia Artificial.

## 📁 Estructura de Archivos

```
BiAilitics/
├── index.html      ← Página principal (HTML semántico + SEO completo)
├── styles.css      ← Estilos propios (CSS nativo, dark mode, animaciones)
├── script.js       ← Interactividad (menú móvil, dark mode, formulario)
├── sitemap.xml     ← Sitemap para buscadores
├── robots.txt      ← Directivas para crawlers
└── README.md       ← Este archivo
```

## 🚀 Despliegue

### Opción 1 — Netlify (recomendado, gratis)
1. Ve a [netlify.com](https://netlify.com) y crea una cuenta gratuita
2. Arrastra la carpeta `BiAilitics/` al panel de Netlify
3. Tu sitio estará online en segundos con HTTPS automático

### Opción 2 — GitHub Pages (gratis)
1. Sube los archivos a un repositorio de GitHub
2. Ve a **Settings → Pages → Source → main branch**
3. Tu sitio estará en `https://tuusuario.github.io/repositorio`

### Opción 3 — Servidor propio / Hosting compartido
Sube todos los archivos por FTP a la carpeta `public_html/` de tu hosting.

---

## ⚙️ Configuración Obligatoria Antes del Despliegue

### 1. Dominio real
Reemplaza `https://tudominio.com` en estos archivos:
- `index.html` → meta canonical, og:url, og:image, twitter:image, JSON-LD
- `sitemap.xml` → `<loc>`
- `robots.txt` → `Sitemap:`

### 2. Formulario de contacto (Formspree)
El formulario usa [Formspree](https://formspree.io) para recibir emails sin backend.

1. Regístrate gratis en [formspree.io](https://formspree.io)
2. Crea un nuevo formulario y copia tu ID (ej: `xpwzabcd`)
3. En `script.js`, línea ~50, reemplaza:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```
   por:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwzabcd';
   ```

> Si no configuras Formspree, el formulario abrirá automáticamente el cliente de email del usuario como fallback.

### 3. Email de contacto
En `script.js`, en el bloque `catch` del formulario, cambia `hola@aiflow.es` por tu email real.

### 4. Redes sociales
En `index.html` (footer), actualiza los enlaces de LinkedIn y GitHub con tus perfiles reales.

### 5. Imagen OG (Open Graph)
Crea una imagen de 1200×630px para redes sociales y súbela como `og-image.jpg` en la raíz del sitio.

---

## 🔍 SEO — Checklist Post-Despliegue

- [ ] Verificar el sitio en [Google Search Console](https://search.google.com/search-console)
- [ ] Enviar el `sitemap.xml` en Search Console
- [ ] Comprobar datos estructurados en [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Verificar Open Graph en [metatags.io](https://metatags.io)
- [ ] Ejecutar auditoría Lighthouse (objetivo: SEO ≥ 95, Performance ≥ 90)

---

## 🎨 Personalización

### Colores
Edita las variables CSS en `styles.css` (líneas 10-30):
```css
:root {
  --primary: #6366f1;  /* Color principal (índigo) */
  --accent:  #f97316;  /* Color de acento (naranja) */
}
```

### Contenido
Todo el contenido editable está en `index.html`. Busca y reemplaza:
- `AIFlow` → tu nombre de marca
- Textos de servicios, testimonios, métricas
- URLs de imágenes (actualmente Unsplash, puedes usar las tuyas)

---

## 📱 Características

- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Dark mode con persistencia en localStorage
- ✅ Menú hamburguesa para móvil
- ✅ Animaciones on-scroll (IntersectionObserver)
- ✅ Formulario de contacto con validación JS
- ✅ SEO completo (meta tags, Open Graph, Twitter Card, JSON-LD)
- ✅ Accesibilidad (ARIA labels, skip link, roles semánticos)
- ✅ Sin dependencias externas de CSS (no Tailwind CDN)
- ✅ Imágenes con lazy loading y alt descriptivos
