# Fixes & Debug Guide — DayByDay Web

## Errores Comunes y Soluciones

### 1. "Pa.filter is not a function" / "X.filter is not a function"

**Causa:** Intentar usar `.filter()` en un `useRef.current` que puede no ser array.

**Archivos afectados:**
- `src/animation.js` (líneas 129, 171, 304, 419)
- `src/components/Sectores.jsx` (línea 199)

**Solución:**
```javascript
// ANTES (roto):
const cards = cardRefs.current?.filter(Boolean) || [];

// DESPUÉS (corregido):
const cards = Array.isArray(cardRefs.current) ? cardRefs.current.filter(Boolean) : [];
```

### 2. "ErrorBoundary is not defined"

**Causa:** ErrorBoundary usado en main.jsx pero no importado.

**Archivo afectado:**
- `src/main.jsx` (línea 11)

**Solución:**
```javascript
import ErrorBoundary from "./components/ErrorBoundary.jsx";
```

### 3. "Root is EMPTY - React not rendering"

**Causa:** Uno de los errores выше impide que React monte.

**Debug:**
- Abrir consola del navegador (F12)
- Buscar errores en rojo antes de "DBSD: Page loaded"
- Si dice "JS loaded" -> el JS carga, el problema es runtime

### 4. Vercel showing "Authentication Required"

**Causa:** Tier gratuito de Vercel fuerza password protection.

**Solución actual:** Usar Netlify en su lugar.

### 5. Netlify sirve index.html en vez de JS

**Causa:** Redirect mal configurado en netlify.toml.

**Solución:**
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 6. Blog posts: relatedPosts.filter errors

**Archivos:**
- `src/pages/blog/PorqueMetaAdsNoGeneraVentasEcommerceD2cEspanaPage.jsx`
- `src/pages/blog/CalcularRoasRealD2cPage.jsx`

**Solución:**
```javascript
const relatedPosts = Array.isArray(relatedPostsData) ? relatedPostsData.filter(...) : [];
```

## Deploy actual (2026-05-23)

- **Hosting:** Netlify
- **URL:** https://daybydayconsulting.netlify.app
- **Custom domain:** www.daybydayconsulting.com (pending DNS propagation)
- **Build trigger:** GitHub push to main

## Scripts relevantes

```bash
# Deploy manual a Netlify
cd /root/projects/DaybyDay
npm run build
git add -A && git commit -m "fix: ..." && git push origin main
```

Netlify rebuild otomatis dari GitHub push.

---
Last updated: 2026-05-23