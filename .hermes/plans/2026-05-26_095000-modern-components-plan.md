# Plan: Modern Design Components para DayByDay Web

## Goal
Actualizar el diseño de DayByDay Consulting con componentes modernos de 21st.dev/Aceternity, implementando tema claro/oscuro, animaciones premium y backgrounds distintivos.

## Contexto Actual
- Repo: `/root/projects/DaybyDay-HTML/`
- Live: https://daybydayweb-html.pages.dev
- Stack: Plain HTML/CSS, sin dependencias JS externas
- Tema actual: Dark (#0a0a0a), diseño funcional pero básico

## Componentes Solicitados

### 1. Background Effects
Elegir UNO de:
- **Shape Landing Hero** (kokonutd): SVG shapes animado con gradientes
- **Sparkles** (aceternity): Partículas brillantes/wikipediasparkles

### 2. Apple Tahoe Liquid Glass Button
- URL参考: https://21st.dev/community/components/easemize/apple-tahoe-liquid-glass-button/default
- Efecto: Glassmorphism líquido, reflujo en hover
- Compatibilidad: HTML/CSS puro

### 3. Pixel Logo Grid
- URL参考: https://21st.dev/community/components/pixel-paradise/pixel-logo-grid/default
- Grid de logos/íconos con efecto pixel

### 4. Dynamic Island TOC
- URL参考: Dynamic table of contents flotante
- Sticky, detecta scroll position

### 5. Story Scroll
- Referencia: shadcn@latest story-scroll + aceternity
- Scroll-triggered animations

### 6. Theme Toggle
- Light/Dark mode switcher
- Persistencia localStorage

## Propuesta de Implementación

### Step 1: Preparar CSS Variables
```css
:root {
  --bg-primary: #0a0a0a;  /* dark */
  --bg-secondary: #141414;
  --text-primary: #ffffff;
  --text-secondary: #a1a1a1;
}
[data-theme="light"] {
  --bg-primary: #fafafa;
  --bg-secondary: #ffffff;
  --text-primary: #0a0a0a;
  --text-secondary: #52525b;
}
```

### Step 2: Background Effect
- Opción recomendada: **Sparkles** (más ligero, HTML achievable)
- Implementar como pseudo-element o SVG inline
- Alternativa: Shape Landing Hero gradient mesh

### Step 3: Apple Tahoe Glass Button
- Adaptar a CSS puro (sin React/framer-motion)
- Props: backdrop-filter, gradient animation on hover
- Guardar en: `components/apple-glass-button.css`

### Step 4: Pixel Logo Grid
- Para sección "Clients" o "Founders"
- Grid responsivo con efecto hover

### Step 5: Dynamic Island TOC
- Implementar con vanilla JS
- Intersection Observer para scroll spy
- Floating card style

### Step 6: Story Scroll Animations
- CSS scroll-driven animations nativas
- Fade-up, stagger effects

### Step 7: Theme Toggle
- Button con iconos sol/luna
- JS: toggle data-theme attribute + localStorage

## Archivos a Modificar

| Archivo | Acción |
|---------|--------|
| `index.html` | Añadir theme toggle, nuevos componentes |
| `css/modern-components.css` | Nuevo: todos los estilos de componentes |
| `css/theme.css` | Nuevo: CSS variables light/dark |
| `js/theme-toggle.js` | Nuevo: lógica theme |
| `js/toc.js` | Nuevo: Table of Contents |
| `js/scroll-animations.js` | Nuevo: scroll trigger |

## Tests / Validación

```
- [ ] Theme toggle funciona y persiste
- [ ] Background animation smooth (60fps)
- [ ] Glass button hover states correctos
- [ ] Responsive mobile
- [ ] Lighthouse performance > 90
- [ ] No JS errors en consola
```

## Riesgos y Tradeoffs

1. **Complejidad**: Algunos componentes Aceternity usan React. Necesario adaptar a vanilla HTML/CSS.
2. **Performance**: Sparkles animation puede afectar LCP. Test con lighthouse.
3. **Browser support**: scroll-driven animations nativa solo Chrome 115+. Fallback para otros.
4. **Theme flicker**: Prevenir FOUC con script blocking en head.

## Preguntas Abiertas

1. Preferís **Shape Landing Hero** o **Sparkles** para el background?
2. Dónde vais a usar el **Pixel Logo Grid**? (clients/trusted by?)
3. Necesitáis el **Dynamic Island TOC** en homepage o solo en páginas largas?
4. Queréis implementar el tema claro desde el inicio o solo toggle opcional?