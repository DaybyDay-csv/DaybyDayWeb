import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué son las Dynamic Product Ads (DPA) en Meta Ads y cómo funcionan?",
    a: "Las Dynamic Product Ads (también llamadas Advantage+ Catalog Ads) son un tipo de anuncio de Meta Ads que muestra automáticamente los productos correctos a cada usuario, en lugar de tener que crear una creatividad manual por producto. El sistema cruza tres piezas: (1) un catálogo de productos sincronizado con tu Shopify o feed XML, (2) los eventos del pixel y Conversions API (ViewContent, AddToCart, Purchase) que indican qué producto vio cada usuario, y (3) una plantilla de creatividad dinámica con campos variables (imagen, título, precio). Meta combina audiencia + producto + creatividad en tiempo real. Una marca D2C de moda con 800 SKUs deja de necesitar 800 ads y opera con 1-2 campañas DPA que rinden mejor que cualquier set manual, porque el algoritmo decide el match producto-usuario."
  },
  {
    q: "¿En qué se diferencian las DPA de retargeting y las DPA de prospecting?",
    a: "DPA de retargeting (también llamadas DABA - Dynamic Ads for Broad Audiences en modo retargeting) se sirven a usuarios que ya tienen evento ViewContent o AddToCart en los últimos 7-30 días: el sistema muestra el producto exacto que vieron o uno relacionado. CPM bajo, CTR alto (1,8-3,5%), CPA muy competitivo. DPA de prospecting se sirven a usuarios sin interacción previa con tu marca: el sistema elige producto basándose en señales de comportamiento de Meta (intereses, sitios visitados, similaridad con compradores existentes). CPM más alto, CTR menor (0,8-1,4%), pero generan new customers. La estructura típica D2C España es 30-40% del presupuesto en DPA retargeting + 25-35% en DPA prospecting + 30-40% en creatividades no-DPA (UGC, ángulos de marca). Mezclar ambas en la misma campaña sin segmentación de audiencias diluye señal y atribución."
  },
  {
    q: "¿Cómo configuro el catálogo de Shopify para que funcione bien en Meta DPA?",
    a: "Cuatro pasos no negociables. (1) Instalar Facebook & Instagram by Meta app en Shopify y conectar Business Manager + catálogo correcto. (2) Verificar que cada producto cumple los requisitos mínimos: imagen 1080x1080px o mayor sin texto sobreimpreso, título ≤60 caracteres descriptivo (no SKU), descripción ≤200 caracteres, precio con IVA, condición (new), GTIN/MPN si lo tienes. (3) Configurar product sets segmentados: best-sellers, new arrivals, descuento activo, agotados a excluir, margen alto. Esto permite servir colecciones específicas según campaña en lugar de tirar todo el catálogo a la audiencia. (4) Verificar que la URL de cada producto resuelve a una landing móvil rápida (LCP <2,5s) — Meta penaliza catálogos con landings lentas en el algoritmo de delivery. Sin estos 4 pasos, la mejor configuración DPA del mundo no rinde."
  },
  {
    q: "¿Necesito Conversions API (CAPI) para que las DPA funcionen bien en 2026?",
    a: "Sí, sin matices. Desde iOS 14.5 y especialmente desde 2024-2026 con la deprecación progresiva de cookies third-party, el pixel cliente solo captura el 55-70% de los eventos reales según vertical y dispositivo. Las DPA dependen críticamente del evento ViewContent y AddToCart con el campo content_ids correcto para hacer match con el catálogo. Si el evento llega solo por pixel cliente y se pierde por ITP/ETP/ad-blockers, el algoritmo no aprende qué producto vio el usuario y el retargeting DPA se sirve aleatoriamente. Configurar Conversions API server-side (vía Shopify Customer Events nativo, partner como Stape o implementación custom) sube la cobertura al 92-98% y el Event Match Quality (EMQ) al 7-9/10, lo que se traduce en CPA DPA un 18-30% mejor según auditorías DayByDay 2025-2026."
  },
  {
    q: "¿Cuánto presupuesto mínimo necesito para que una campaña DPA aprenda en Meta Ads?",
    a: "Una campaña DPA necesita salir de fase de aprendizaje (50 conversiones optimizadas en 7 días por ad set) igual que cualquier otra. Para D2C España con CPA medio 25-55€, el suelo operativo es 80-120€/día por ad set en DPA prospecting y 40-70€/día por ad set en DPA retargeting (porque la audiencia es más pequeña pero el CPA es 40-55% menor). Por debajo de 40€/día en retargeting o 60€/día en prospecting el ad set se queda en aprendizaje permanente y no genera señal suficiente para que el algoritmo elija producto óptimo. Si el catálogo tiene <30 SKUs activos, considera no separar prospecting y retargeting y consolidar en 1 ad set DPA broad con presupuesto agregado para acelerar aprendizaje."
  },
  {
    q: "¿Por qué mis Dynamic Product Ads sirven siempre los mismos 5 productos y cómo lo arreglo?",
    a: "Tres causas típicas. (1) Catálogo desbalanceado: si 5 SKUs concentran el 80% de las ventas históricas, el algoritmo de Meta los favorece porque maximizan probabilidad de conversión a corto plazo. Solución: crear product sets segmentados por categoría/colección y usar 'product set' filtrado en cada ad set para forzar exploración. (2) Filas de catálogo con errores o imagen pobre: productos con imagen <600px, sin descripción, sin GTIN o con precio mal formateado quedan despriorizados o desaprobados silenciosamente. Solución: revisar mensualmente la pestaña Diagnostics del catálogo en Commerce Manager. (3) Optimización demasiado agresiva a Purchase con poca señal: el algoritmo se cierra sobre lo más seguro. Solución: ad sets separados optimizando ViewContent o AddToCart para alimentar nuevos productos al funnel antes de empujarlos a Purchase."
  }
];

const DynamicProductAdsMetaShopifyPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Dynamic Product Ads en Meta para Shopify: guía técnica D2C 2026"
    description="Guía técnica completa de Dynamic Product Ads (DPA / Advantage+ Catalog Ads) en Meta Ads para tiendas Shopify D2C España 2026: qué son y cómo funcionan internamente las DPA, diferencias entre DPA retargeting y DPA prospecting (DABA), configuración paso a paso del catálogo Shopify + Conversions API + Event Match Quality, requisitos técnicos de feed (imagen, título, GTIN, condition), product sets segmentados por colección/margen/stock, presupuesto mínimo para salir de learning (80-120€/día prospecting, 40-70€/día retargeting), 7 errores frecuentes con catálogos D2C españoles (productos agotados, imágenes con texto, precios desactualizados, URLs lentas) y enfoque DayByDay Pablo+Jorge con pipeline n8n + Shopify Admin API + Meta Marketing API para sincronización catálogo + product sets dinámicos."
    slug="dynamic-product-ads-meta-shopify-d2c"
    datePublished="2026-05-14"
    dateModified="2026-05-14"
    readingTime="12 min"
    category="Meta Ads"
    keywords={[
      "dynamic product ads meta ads",
      "dpa meta ads shopify",
      "advantage plus catalog ads",
      "catalogo shopify meta ads",
      "dynamic ads ecommerce d2c",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Las Dynamic Product Ads (DPA) en Meta Ads son la diferencia entre que tu Shopify de 400 SKUs venda a través de 3 campañas o muera intentando manejar 400 ad sets manuales.</strong> Bien configuradas son el formato más rentable que existe en eCommerce D2C — CPA 30-55% inferior a una creatividad estática genérica y escalado sin tocar el ad set. Mal configuradas son la causa #1 por la que founders D2C españoles tiran 4.000-12.000€ al mes alimentando un catálogo roto. En auditorías DayByDay vemos siempre el mismo patrón: el catálogo está conectado, las DPA están activas, pero falla la fontanería (Conversions API mal configurada, product sets inexistentes, imágenes con texto, URLs lentas). Esta guía recorre la implementación técnica completa para tiendas Shopify en 2026.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué son las Dynamic Product Ads y por qué importan en 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Las <strong className="text-white">Dynamic Product Ads</strong> (renombradas Advantage+ Catalog Ads en la consola de Meta) son anuncios que se generan en tiempo real combinando tres piezas: tu catálogo de productos sincronizado, los eventos del pixel + Conversions API y una plantilla creativa con campos variables (imagen, título, precio, descuento). En lugar de producir una creatividad por SKU, el sistema decide qué producto mostrar a qué usuario y construye el ad dinámicamente. Para un D2C con 50-2.000 SKUs activos, las DPA pasan de ser un nice-to-have a la columna vertebral del 40-65% del presupuesto Meta.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      La importancia en 2026 es aún mayor porque <a href="https://www.facebook.com/business/help/1633334822807182" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Meta empuja activamente Advantage+ Shopping Campaigns</a> con catálogo integrado, porque la deprecación progresiva de cookies third-party hace que los eventos server-side (CAPI) sean obligatorios para mantener señal y porque el coste creativo manual (UGC + edición) ha subido a 80-250€/pieza, haciendo inviable producir creatividad estática por SKU en catálogos amplios.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según el informe <a href="https://www.statista.com/topics/2477/e-commerce-in-spain/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">eCommerce in Spain de Statista</a>, el mercado español de eCommerce supera los 70.000 M€ en facturación con un crecimiento sostenido por encima del 8% anual. En auditorías DayByDay de cuentas D2C España 2024-2026 con catálogos &gt;100 SKUs, las marcas con DPA bien configuradas (catálogo limpio + CAPI + product sets segmentados) consiguen un CPA 30-55% inferior frente a creatividad estática genérica y un Event Match Quality medio de 8/10 frente al 5-6/10 de cuentas sin CAPI server-side.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">DPA retargeting vs DPA prospecting: cuándo usar cada una</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Confundir ambos modos es el error estructural más caro. Cada uno tiene mecánica, KPI y presupuesto distintos:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Modo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Audiencia</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">CTR esperado</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">% presupuesto típico</th>
          </tr>
        </thead>
        <tbody>
          {[
            { m: "DPA retargeting (warm)", a: "ViewContent / AddToCart 7-30 días", c: "1,8-3,5%", p: "30-40%" },
            { m: "DPA retargeting (purchase exclude)", a: "Compradores 90-180 días, cross/upsell", c: "1,2-2,2%", p: "5-10%" },
            { m: "DPA prospecting (DABA)", a: "Cold, sin interacción previa", c: "0,8-1,4%", p: "25-35%" },
            { m: "DPA broad (Advantage+ Catalog)", a: "Mixto, decide Meta", c: "1,0-1,8%", p: "10-15%" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.a}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      El error frecuente: tirar todo el presupuesto DPA a Advantage+ Catalog (broad) sin segmentar retargeting/prospecting. Funciona los primeros 15-30 días, luego el algoritmo concentra spend en lo más fácil (warm) y deja sin alimentar el funnel superior. Resultado: ROAS alto durante 1 mes y caída en picado al 2º mes por agotamiento de audiencia.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Configuración técnica paso a paso (Shopify + Meta)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Esta es la secuencia operativa exacta para una tienda Shopify D2C que arranca DPA en 2026. Saltarse cualquier paso degrada rendimiento:
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Instalar Facebook & Instagram by Meta en Shopify (canal de ventas oficial). Conectar el Business Manager correcto, el píxel correcto y el catálogo. Verificar que solo hay UN catálogo conectado: catálogos duplicados causan eventos asignados al catálogo erróneo y DPA sin productos.",
        "Activar Conversions API nativa de Shopify (Customer Events) o vía Shopify Hydrogen + GTM server-side / Stape. Comprobar en Events Manager que cada evento llega con browser + server, deduplicación activa y Event Match Quality ≥7/10 en Purchase y AddToCart.",
        "Subir las imágenes mínimas: 1080×1080px o 1080×1350px, sin texto sobreimpreso (Meta penaliza >20% texto en imagen), formato producto sobre fondo neutro o lifestyle, primer plano del producto identificable.",
        "Configurar product sets en Commerce Manager: 'Best sellers' (top 20% ventas 30d), 'New arrivals' (últimos 30d), 'Sale activos' (compare_at_price > price), 'Margen alto' (manual o vía tag Shopify), 'Excluir agotados' (availability=in stock). Cada ad set DPA usará el product set que le corresponda.",
        "Excluir productos agotados o con stock <5 unidades vía regla automática: nada destruye más rápido un CPA que servir tráfico a un PDP con botón 'Agotado'.",
        "Verificar URLs móviles rápidas: cada URL del feed debe resolver con LCP <2,5s en móvil 4G. Meta despriorisa silenciosamente catálogos lentos en la subasta. Usar PageSpeed Insights con muestreo de 10-20 PDPs.",
        "Lanzar campañas: 1 ad set DPA retargeting 7-14d ViewContent (exclude purchase 30d), 1 ad set DPA retargeting AddToCart 14-30d (exclude purchase 60d), 1 ad set DPA prospecting LAL 1-5% high-value buyers, 1 ad set Advantage+ Catalog broad. Presupuesto inicial: 40-70€/día retargeting, 80-120€/día prospecting.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Requisitos técnicos del feed Shopify para Meta</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Meta aprueba el catálogo pero internamente puntúa cada producto. Productos mal completados quedan despriorizados o desaprobados silenciosamente. Estos son los campos críticos según la <a href="https://www.facebook.com/business/help/120325381656392" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía oficial de catálogos de Meta</a>:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "title: ≤60 caracteres, descriptivo, no SKU ni código interno. Bien: 'Camiseta orgánica algodón mujer talla M'. Mal: 'CTW-2024-W-M-BLK'.",
        "description: ≤200 caracteres con beneficio + material + uso. No copiar la descripción larga del PDP.",
        "availability: 'in stock' obligatorio. Productos 'out of stock' deben excluirse del feed activo o filtrarse en product set.",
        "condition: 'new' para D2C estándar. Algunas verticales (refurbished, segunda mano) usan otros valores.",
        "price: con IVA incluido y moneda EUR. Si hay descuento, usar sale_price + sale_price_effective_date.",
        "image_link: 1080×1080px mínimo, sin texto sobreimpreso, sin marcas de agua, fondo limpio o lifestyle limpio. Imagen secundaria opcional sube CTR un 8-12%.",
        "GTIN o MPN: opcional pero sube Event Match Quality y permite que Meta cruce con Google Shopping y otros catálogos para precisión.",
        "google_product_category: clasificación oficial. Influye en relevancia y subasta especialmente en DPA prospecting.",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h2 className="text-2xl font-black mt-10 mb-4">Por qué CAPI es no-negociable para DPA en 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Las DPA dependen de un dato muy concreto: <strong className="text-white">content_ids</strong>, el identificador del producto que el usuario vio. Si ese evento ViewContent o AddToCart se pierde por ITP, ETP, ad-blockers o navegación in-app, el algoritmo no sabe qué retargetizar y rellena con productos aleatorios. Según el <a href="https://www.thinkwithgoogle.com/intl/es-es/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">research de Google sobre tracking en eCommerce 2024-2025</a>, la pérdida media de eventos del lado cliente en eCommerce móvil España oscila entre el 30% y el 45% según vertical.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Configurar Conversions API server-side (Shopify Customer Events nativo es la opción más simple, Stape o implementación custom con GTM server-side son las opciones avanzadas) sube la cobertura al 92-98%, mejora el EMQ al 7-9/10 y se traduce en CPA DPA 18-30% mejor en cuentas auditadas. Ver detalle de implementación en la <Link to="/blog/guia-api-conversiones-meta-ads-shopify" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de API de Conversiones Meta + Shopify</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">7 errores frecuentes con DPA en D2C España</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Catálogo conectado pero con 15-30% de productos agotados o con imagen rota. Resultado: servimos tráfico a PDPs con 'Sin stock' y el CPA se duplica.",
        "Imágenes con texto sobreimpreso (>20% del área): Meta penaliza la entrega en feed y baja Hook Rate efectivo. Usar imagen producto pura y mover el texto a la plantilla dinámica de la creatividad.",
        "Mezclar DPA retargeting + DPA prospecting en el mismo ad set: el algoritmo concentra en warm y deja prospecting sin alimentar.",
        "Optimizar todos los ad sets DPA a Purchase con catálogos donde un 60% de SKUs tienen <3 ventas/mes: el algoritmo se cierra en los top sellers y nunca explora cola larga. Solución: 1-2 ad sets optimizan ViewContent o AddToCart para forzar exploración.",
        "Excluir compradores 30 días pero olvidar excluirlos también en el ad set de prospecting: se sirven a su propio cliente como nuevo, falsean atribución y suben CPA artificialmente.",
        "URL del producto en mobile lenta (LCP >3s): Meta despriorisa en subasta, CPM sube y CPA cae. Optimizar landing móvil debería ser parte del onboarding DPA.",
        "No configurar product sets segmentados y dejar 'todo el catálogo' en cada ad set: el algoritmo elige los 5-10 SKUs más fáciles y deja el resto sin spend. Imposible escalar.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Onboarding técnico de 5-7 días: auditoría completa del catálogo Shopify (campos por SKU, imágenes, URLs, stock), del píxel, de CAPI server-side y del Event Match Quality. Entregamos checklist con 25-40 puntos a corregir antes de tocar la campaña. En el 80% de cuentas que auditamos hay 12-25 puntos rotos.",
        "Configuración de product sets segmentados: best-sellers, new arrivals, sale activos, margen alto, exclusión de agotados. Cada ad set DPA recibe el product set correcto. Esto solo ya sube CTR un 15-25% sin tocar creatividades.",
        "Estructura DPA estándar: ad set retargeting ViewContent 7-14d, ad set retargeting AddToCart 14-30d (excluyendo purchase 60d), ad set prospecting LAL high-value buyers, ad set Advantage+ Catalog broad. Presupuesto distribuido 30-40% retargeting + 25-35% prospecting + 10-15% broad.",
        "Solución ad-hoc Pablo + Jorge: para una marca D2C de cosmética con 320 SKUs y rotación de stock semanal, Jorge construyó un pipeline n8n + Shopify Admin API + Meta Marketing API que cada noche recalcula product sets dinámicos (best-sellers 30d, sale activos, stock >10) y los sincroniza con los ad sets DPA correspondientes. Pablo usa esos product sets actualizados en la estructura de campañas. Resultado en 60 días: CPA DPA bajó 22%, % de spend sobre agotados pasó del 8% al 0%, y el equipo del cliente dejó de actualizar catálogo a mano.",
        "Reporting dedicado con Looker Studio: dashboard con CPA por product set, EMQ por evento, % spend sobre top 20% / cola larga, y comparativa retargeting vs prospecting. El cliente ve dónde se está concentrando el algoritmo y puede tomar decisiones sin abrir Ads Manager.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting es uno de los pocos consultoras en España que combina senior paid media y senior automation engineering en una sola conversación. Pablo Santirsó (founder · paid media) audita el catálogo, define product sets y estructura las campañas DPA con criterio de cuenta. Jorge González (CTO · automation) construye los pipelines n8n + Shopify Admin API + Meta Marketing API que mantienen el catálogo limpio y los product sets actualizados sin intervención humana. Donde otras agencias obligan a coordinar agencia de marketing + agencia técnica + freelance Shopify, Pablo y Jorge operan como un solo equipo. El cliente habla con los dos socios desde la primera reunión: sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tienes Shopify D2C con +100 SKUs y las DPA no escalan?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos catálogo, CAPI, Event Match Quality y estructura de campañas DPA. Te entregamos checklist con 25-40 puntos concretos y la estructura de product sets recomendada para tu vertical.</p>
      <button
        onClick={openCalendly}
        className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm"
      >
        Solicitar auditoría gratuita →
      </button>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Artículos relacionados</h2>
    <div className="space-y-3">
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/guia-api-conversiones-meta-ads-shopify" className="text-white font-semibold hover:text-white/80">
          Guía de API de Conversiones Meta + Shopify →
        </Link>
        <p className="text-white/40 text-xs mt-1">Configuración server-side de CAPI: la fontanería que hace que las DPA funcionen bien en 2026</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/server-side-tracking-shopify-conversions-api" className="text-white font-semibold hover:text-white/80">
          Server-side tracking en Shopify con Conversions API →
        </Link>
        <p className="text-white/40 text-xs mt-1">Implementación técnica detallada: Shopify Customer Events, GTM server, Stape</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/advantage-plus-shopping-cuando-usarlo-no" className="text-white font-semibold hover:text-white/80">
          Advantage+ Shopping Campaigns: cuándo usarlo y cuándo no →
        </Link>
        <p className="text-white/40 text-xs mt-1">El parente cercano de DPA broad: diferencias, casos de uso y limitaciones para D2C español</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/remarketing-dinamico-ecommerce-guia-practica" className="text-white font-semibold hover:text-white/80">
          Remarketing dinámico en eCommerce: guía práctica →
        </Link>
        <p className="text-white/40 text-xs mt-1">Estrategia warm con DPA retargeting: ventanas, exclusiones y secuencias post-AddToCart</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/internacionalizar-d2c-espanol-meta-ads-eu" className="text-white font-semibold hover:text-white/80">
          Internacionalizar un D2C español con Meta Ads en EU →
        </Link>
        <p className="text-white/40 text-xs mt-1">Catálogo Shopify Markets multi-currency con feeds DPA separados por país: requisitos para escalar DPA fuera de España</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default DynamicProductAdsMetaShopifyPage;
