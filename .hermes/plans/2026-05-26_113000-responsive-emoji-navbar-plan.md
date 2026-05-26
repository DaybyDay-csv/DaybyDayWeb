# Plan: Responsive Audit, Emoji Removal, Navbar Update

## Goal
Auditar responsiveness, reemplazar TODOS los emojis con iconos SVG, e implementar navbar moderna tipo ShadCN.

## Contexto Actual
- Repo: `/root/projects/DaybyDay-HTML/`
- Live: https://daybydayweb-html.pages.dev
- Problemas identificados: emojis dispersos, navbar basic, responsive no auditado

## Auditoría Requerida

### 1. Responsive Breakpoints
Revisar que funciona en:
- Mobile: 320px - 480px (iPhone SE, standard)
- Large Mobile: 481px - 767px (Plus, Pro Max)
- Tablet: 768px - 1023px (iPad)
- Desktop: 1024px+
- Large Desktop: 1440px+

Verificar:
- [ ] Navegación colapsable en mobile
- [ ] Sidebar toggle visible < 1024px
- [ ] Texto legible sin zoom
- [ ] Botones táctiles (min 44px)
- [ ] Imágenes responsivas
- [ ] No horizontal scroll

### 2. Emoji Audit (TODOS los archivos)
Buscar y reemplazar:
```bash
grep -rE '[^\x00-\x7F]' /root/projects/DaybyDay-HTML/*.html
grep -rE '[^\x00-\x7F]' /root/projects/DaybyDay-HTML/**/*.html
```
Reemplazar con iconos SVG equivalentes:
- 🏠 → Home icon
- ⚠️ → Alert triangle
- 📈 → Trending up
- 👤 → User
- ✉️ → Mail
- 📊 → Bar chart
- 🛒 → Shopping cart
- 📉 → Trending down
- ⚙️ → Settings
- 🤖 → Bot
- 🎯 → Target
- ⭐ → Star
- 💡 → Lightbulb
- 🔧 → Wrench
- 🚀 → Rocket
- 💰 → Dollar sign
- 📱 → Smartphone
- 🌐 → Globe
- ⏰ → Clock
- ✅ → Check circle

### 3. Navbar ShadCN
Implementar navbar del color del header (dark glass):
```css
.navbar {
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  height: 64px;
  position: fixed;
}
```
Con:
- Logo left
- Links center (desktop) / hamburger mobile
- CTA right
- Blur effect igual que nav actual

## Archivos a Modificar

| Archivo | Acción |
|---------|--------|
| `index.html` | Emoji replace + navbar |
| Todos los `.html` | Emoji replace |
| `css/modern.css` | Add responsive fixes |
| `css/sidebar.css` | Fix mobile |

## Tests / Validación
```
- [ ] iPhone SE render OK
- [ ] iPhone Pro Max render OK
- [ ] iPad render OK
- [ ] No horizontal scroll anywhere
- [ ] Emoji count = 0
- [ ] Navbar glass effect works
- [ ] Sidebar toggle works < 1024px
```

## Riesgos
- Algunos emojis pueden ser decorativos (quotes tipográficas)
-Navbar conflict con sidebar existente

## Preguntas
Ninguna - continuar con auditoria estándar.