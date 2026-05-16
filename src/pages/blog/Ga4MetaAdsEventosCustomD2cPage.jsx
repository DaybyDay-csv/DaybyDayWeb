import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Por qué necesito GA4 si ya tengo el pixel de Meta y CAPI configurados?",
    a: "El pixel + CAPI te dan optimización dentro de Meta Ads (algoritmo aprende, eventos de Purchase atribuidos a campaña/ad set/ad), pero no te dan visión de canal cruzado, atribución multi-touch ni cohortes por fuente de origen. GA4 es la única capa gratuita que une Meta, Google, TikTok, email y orgánico en un mismo modelo de atribución (data-driven por defecto desde 2023), con cohortes por canal de adquisición y predicción de probabilidad de compra/churn. En auditorías DayByDay vemos que el 60-70% de cuentas D2C españolas operan solo con Meta + Shopify Analytics y se pierden la única vista que les permitiría decidir reasignación de presupuesto entre canales con datos. Para un D2C >10K€/mes en paid media, GA4 bien implementado con eventos custom es el dashboard de negocio que falta entre las plataformas y la facturación real."
  },
  {
    q: "¿Qué eventos custom debe enviar GA4 para un eCommerce D2C que invierte en Meta Ads?",
    a: "Más allá de los 10 eventos enhanced ecommerce estándar (view_item, add_to_cart, begin_checkout, purchase, etc.), un D2C que invierte 10-50K€/mes en Meta Ads debería enviar 5-8 eventos custom específicos: (1) lead_magnet_download (descarga guía/cupón), (2) wishlist_add (señal de intent fuerte), (3) high_intent_scroll_pdp (>75% scroll en ficha producto), (4) coupon_applied (con código y % descuento), (5) video_pdp_played (>50% reproducción), (6) chat_started (WhatsApp/Intercom abierto), (7) shipping_calculated (intent BOFU), y (8) post_purchase_review (cuando aplique). Cada evento custom se sincroniza con audiencias de Meta para retargeting de capa intermedia (entre view_content y add_to_cart) y permite optimizar campañas a eventos predictivos cuando Purchase tiene volumen bajo (<50 conv/semana). El error típico es enviar 30+ eventos sin priorizar: dispersa señal, complica reporting y casi nunca se usan."
  },
  {
    q: "¿Cómo se sincronizan los eventos custom de GA4 con las audiencias de Meta Ads?",
    a: "Hay tres rutas operativas con coste/complejidad distinto. (1) Vía Customer Match / Custom Audience API: exportar audiencia GA4 (ej. usuarios con high_intent_scroll_pdp en últimos 14d) y subirla a Meta como Custom Audience con email/phone hasheado. Coste cero, refresh manual o vía script. (2) Vía Google Tag Manager server-side: el mismo evento se dispara simultáneamente a GA4 y a Meta CAPI con un evento custom (ej. HighIntentBrowse), creando audiencia dinámica en Meta basada en ese pixel event. Coste medio (sGTM Stape 20-40€/mes), tiempo real. (3) Vía pipeline n8n / Reverse ETL (Hightouch, Census): GA4 BigQuery export → segmento → API Meta Custom Audience cada hora. Coste medio-alto (50-200€/mes) pero permite lógica compleja (ej. usuarios con 2+ visits PDP + add_to_cart abandonado + LTV histórico >150€). Para cuentas D2C >20K€/mes en Meta, la ruta sGTM + Reverse ETL es la que mejor rinde."
  },
  {
    q: "¿Qué diferencias hay entre la implementación de GA4 vía gtag.js, GTM web y GTM server-side?",
    a: "gtag.js (snippet directo) es la implementación más simple: copia/pega en theme.liquid de Shopify y dispara los eventos enhanced ecommerce nativos. Limita personalización y rompe con ad-blockers (-25-40% eventos en navegadores iOS Safari/Firefox). GTM web client-side da control granular sobre triggers y variables (puedes disparar high_intent_scroll_pdp solo cuando scroll >75% Y tiempo en página >30s Y device mobile), pero sigue sufriendo bloqueo de ITP/ETP y ad-blockers. GTM server-side (sGTM, vía Google Cloud o Stape) ejecuta el contenedor desde tu dominio (ej. metrics.tumarca.com), evita ad-blockers y bloqueo cookies de terceros, mejora cobertura de eventos al 92-98% (vs 60-75% client-side puro) y permite enviar el mismo evento a GA4 + Meta CAPI + TikTok Events API desde una sola fuente. Para D2C >10K€/mes en spend, sGTM no es opcional: la pérdida de señal client-side cuesta más al mes que el coste de Stape."
  },
  {
    q: "¿Qué métricas de GA4 debo cruzar con Meta Ads Manager para validar atribución?",
    a: "El cruce mínimo viable cada semana son 5 métricas que deben encajar dentro de un margen razonable, y cuando no encajan algo está roto. (1) Purchases GA4 (modelo data-driven, last non-direct click) vs Purchases pixel Meta (last-click 7d-click+1d-view): GA4 reporta -15 a -30% menos en cuentas con CAPI bien (Meta sobreatribuye por modelo last-click), si la diferencia es >40% Meta atribuye duplicados o falta CAPI dedup. (2) Revenue GA4 ecommerce vs Revenue Shopify reports (single source of truth): debe encajar al ±3-5%, gaps mayores indican consent rate bajo o eventos rotos. (3) New users GA4 por canal vs % New Customers Meta (campaña ASC/CBO): identificar si Meta capta cliente nuevo o repite warm. (4) Sessions GA4 source/medium = facebook/cpc vs clicks Meta Ads Manager: gap <10% normal por bots, >20% UTM rotos. (5) Engagement rate por landing page filtrada por session_source = facebook: detecta landings que rinden mal vs CPC alto en Meta. El reporting cruzado cada lunes evita ceguera operativa."
  },
  {
    q: "¿Qué errores frecuentes ve DayByDay en cuentas D2C españolas con GA4 + Meta Ads?",
    a: "Los 5 errores más comunes en auditorías 2025-2026 son: (1) Doble conteo de Purchase por tener pixel cliente + CAPI sin event_id de deduplicación (revenue inflado +30-50%, decisiones sobre datos rotos). (2) UTMs incorrectos en URLs de Meta (utm_source=facebook vs fb vs meta inconsistentes), GA4 no consolida y reporting se rompe. (3) Consent Mode v2 mal configurado: usuarios que rechazan cookies no envían NADA a GA4 (en España 25-40% rechazo), perdiendo cohorte completa cuando lo correcto es enviar señales consent-aware con datos modelados. (4) Eventos enhanced ecommerce activados pero sin items array (sin product_id, sin price, sin currency): GA4 no muestra revenue por producto, dashboards rotos. (5) Audiencias GA4 creadas pero nunca sincronizadas con Meta (porque no hay sGTM ni reverse ETL): se usan solo para reporting interno y se desperdicia el activo más valioso del setup. La auditoría que hacemos pre-onboarding revisa los 5 puntos en 3-4 horas y entrega el plan de corrección priorizado."
  }
];

const Ga4MetaAdsEventosCustomD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="GA4 + Meta Ads para D2C: implementación de eventos custom paso a paso (2026)"
    description="Guía técnica completa de implementación GA4 + Meta Ads para eCommerce D2C España 2026: por qué GA4 sigue siendo el dashboard cross-channel obligatorio aunque tengas pixel + CAPI, los 10 eventos enhanced ecommerce estándar más 5-8 eventos custom específicos para D2C (lead_magnet_download, wishlist_add, high_intent_scroll_pdp, coupon_applied, video_pdp_played, chat_started, shipping_calculated, post_purchase_review), las 3 implementaciones técnicas comparadas (gtag.js, GTM web client-side, GTM server-side / sGTM con cobertura 92-98%), 3 rutas de sincronización GA4 → audiencias Meta (Customer Match manual, sGTM con eventos simultáneos a CAPI, pipeline reverse ETL con n8n/Hightouch), las 5 métricas obligatorias para cruzar GA4 vs Meta Ads Manager cada semana (Purchases con dedup, Revenue ecommerce vs Shopify, % New Users por canal, Sessions facebook/cpc vs clicks Meta, Engagement rate por landing), consent mode v2 con AEPD y modelado de usuarios sin consentimiento, 7 errores frecuentes en cuentas D2C españolas (doble conteo Purchase sin event_id, UTMs inconsistentes, Consent Mode mal, items array vacío, audiencias GA4 sin sincronizar a Meta), tabla de impacto medido en cuentas auditadas y enfoque DayByDay Pablo+Jorge con pipeline n8n + GA4 BigQuery export + Meta Marketing API + dashboard Looker Studio cross-channel."
    slug="ga4-meta-ads-eventos-custom-d2c"
    datePublished="2026-05-16"
    dateModified="2026-05-16"
    readingTime="13 min"
    category="Tracking"
    keywords={[
      "ga4 meta ads ecommerce",
      "eventos custom ga4 d2c",
      "ga4 shopify implementación",
      "ga4 server side tracking",
      "atribución cross channel ga4 meta",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">GA4 + Meta Ads bien implementado con eventos custom es lo que separa a un D2C que decide reasignación de presupuesto con datos cross-channel de uno que opera a ciegas mirando solo el reporting de Meta Ads Manager.</strong> El pixel y la API de Conversiones te dan optimización dentro de Meta, pero no te dan visión de canal cruzado, atribución multi-touch ni cohortes por fuente de origen — y sin eso, cualquier decisión de subir o bajar spend en Meta vs Google vs TikTok es una apuesta. En auditorías DayByDay 2025-2026 vemos que el 60-70% de cuentas D2C españolas con presupuestos paid >10K€/mes operan con GA4 instalado pero mal configurado: eventos custom inexistentes, audiencias creadas sin sincronizar a Meta, doble conteo de Purchase, UTMs rotos. Esta guía recorre la implementación paso a paso para que GA4 deje de ser un dashboard decorativo y se convierta en el cerebro cross-channel del negocio.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es GA4 + Meta Ads para D2C (definición operativa)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">GA4 + Meta Ads</strong> es la combinación de Google Analytics 4 (capa de medición cross-channel con modelo data-driven) más el pixel y la API de Conversiones de Meta Ads (capa de optimización dentro de la plataforma) configurados de forma que ambos sistemas reciben los mismos eventos con identificadores compartidos, permitiendo: atribución comparada, sincronización de audiencias bidireccional y reporting cross-channel sin tener que cruzar manualmente CSV cada lunes. Funciona solo si los eventos se envían con coherencia (mismos nombres, misma estructura de items, mismo timestamp, mismo event_id para deduplicación) y si el consent mode está configurado para no perder señal en usuarios que rechazan cookies.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      La pieza crítica que la mayoría de cuentas D2C españolas saltan es el set de eventos custom específicos del negocio — más allá de los enhanced ecommerce que vienen de serie con la integración Shopify-GA4 o el snippet gtag.js. Sin esos eventos custom, no hay audiencias avanzadas, no hay segmentación BOFU intermedia y la optimización de Meta se queda corta cuando Purchase tiene volumen bajo.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según la <a href="https://developers.google.com/analytics/devguides/collection/ga4/enhanced-measurement" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial de GA4 Enhanced Measurement</a>, los eventos automáticos cubren solo 6-7 interacciones de nivel base (page_view, scroll 90%, click outbound, file_download, video_progress, site_search, form_start/submit). En auditorías DayByDay de cuentas D2C España entre 10K€ y 60K€/mes en Meta Ads, el porcentaje de cuentas que opera con menos de 12 eventos totales en GA4 (entre estándar + ecommerce + custom) es del 68%, dejando fuera señales BOFU críticas como wishlist_add o high_intent_scroll_pdp que rinden CPA un 18-32% mejor cuando se usan como evento de optimización en Meta vs Purchase puro con volumen bajo. La <a href="https://www.statista.com/statistics/1379280/cookie-consent-rate-europe/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">tasa de aceptación de cookies en España (Statista 2024)</a> se sitúa entre el 58% y el 75% según vertical, lo que significa que entre el 25% y el 42% de tráfico se pierde sin Consent Mode v2 con modelado activo.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">gtag.js vs GTM web vs GTM server-side: qué implementación elegir</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La decisión técnica más importante antes de tocar ningún evento es qué capa de tagging usas para GA4 y Meta. Cada opción tiene impacto medible en cobertura, mantenimiento y coste:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Implementación</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cobertura eventos</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Resistencia AdBlock/ITP</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Coste mensual</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Recomendado para</th>
          </tr>
        </thead>
        <tbody>
          {[
            { i: "gtag.js directo en theme.liquid", c: "60-70%", r: "Baja", co: "0€", re: "D2C <5K€/mes spend, prueba de concepto" },
            { i: "GTM web client-side", c: "65-78%", r: "Baja-Media", co: "0€ GTM", re: "D2C 5-10K€/mes con triggers custom" },
            { i: "GTM server-side (sGTM Cloud Run)", c: "92-98%", r: "Alta", co: "30-120€ Google Cloud", re: "D2C >10K€/mes con stack técnico interno" },
            { i: "GTM server-side (Stape gestionado)", c: "92-98%", r: "Alta", co: "20-80€ Stape", re: "D2C >10K€/mes sin equipo DevOps" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.i}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.r}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.co}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.re}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Para cualquier cuenta D2C con spend Meta >10K€/mes, sGTM no es opcional: la pérdida de señal entre client-side y server-side (20-30 puntos porcentuales) cuesta más al mes en CPA inflado y atribución rota que los 20-80€ de Stape. Detalle completo en la <Link to="/blog/server-side-tracking-shopify-conversions-api" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de server-side tracking en Shopify con Conversions API</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Los 10 eventos enhanced ecommerce + 8 eventos custom para D2C</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La base obligatoria son los 10 eventos enhanced ecommerce de GA4 (view_item_list, view_item, select_item, add_to_cart, view_cart, begin_checkout, add_shipping_info, add_payment_info, purchase, refund). Cada uno debe enviarse con el array <code className="text-white text-xs bg-white/5 px-1.5 py-0.5 rounded">items[]</code> completo (item_id, item_name, price, currency, quantity, item_brand, item_category). Sin items array, el reporting de revenue por producto en GA4 se rompe.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Sobre esa base, estos son los 8 eventos custom que más rinden en D2C España 2026, ordenados por impacto operativo:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "lead_magnet_download: descarga de guía, lookbook o cupón. Audiencia de retargeting top-funnel con CR a Purchase del 4-9% en 14d.",
        "wishlist_add: producto añadido a wishlist sin checkout. Señal de intent fuerte; CPA optimizando a este evento +ASC top of funnel es 18-32% mejor que view_content puro cuando Purchase <50/semana.",
        "high_intent_scroll_pdp: scroll >75% en ficha producto + tiempo >30s + device mobile. Combinación de 3 triggers en GTM; audiencia warm para campañas BOFU.",
        "coupon_applied: código + % descuento aplicado en checkout. Permite segmentar audiencias por price-sensitivity y excluirlas de campañas full-price.",
        "video_pdp_played: >50% reproducción de video en ficha. Indica engagement profundo; correlacionado con CR x1,8-2,4 vs visitas sin play.",
        "chat_started: WhatsApp Business o Intercom abierto. Trigger para flujo de seguimiento manual o automatizado vía CRM.",
        "shipping_calculated: cálculo de envío en cart sin completar. Audiencia BOFU caliente; retargeting 3-7d con descuento envío convierte 12-22%.",
        "post_purchase_review: review enviada tras compra. Señal de cliente satisfecho; alimenta lookalike high-LTV de calidad superior a Purchase puro.",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h2 className="text-2xl font-black mt-10 mb-4">Configuración técnica paso a paso (Shopify + GTM server-side)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Secuencia operativa exacta para una tienda Shopify con sGTM Stape y envío simultáneo a GA4 + Meta CAPI. Esto es lo que un D2C >10K€/mes en Meta debería tener montado:
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Crear propiedad GA4 + Data Stream Web. Activar Enhanced Measurement con scrolls 90%, outbound clicks, site search, video engagement, file downloads. Anotar Measurement ID (G-XXXXXXX).",
        "Crear contenedor GTM Web (gtm.js) e instalar en theme.liquid de Shopify (head). Crear tag GA4 Configuration con Measurement ID y server_container_url apuntando a sGTM (paso 5).",
        "Crear contenedor GTM Server. Desplegar en Stape (Free plan inicial, upgrade a Pro 20€/mes cuando >100K eventos/mes) o en Google Cloud Run. Configurar dominio custom tipo metrics.tumarca.com con DNS CNAME y SSL automático.",
        "Configurar Shopify Customer Events: en Settings → Customer events, añadir Pixel con código JavaScript que dispara dataLayer.push con los 10 eventos enhanced ecommerce sobre los hooks nativos de Shopify (product_viewed, product_added_to_cart, checkout_started, checkout_completed). Probar con vista previa GTM.",
        "Crear los 8 eventos custom como variables y triggers en GTM Web: para wishlist_add un trigger sobre click en botón con clase específica; para high_intent_scroll_pdp un trigger combinando Scroll Depth 75% + Timer 30s + Window URL contains /products/ + Browser Built-in Variable mobile.",
        "Configurar tag Meta Pixel + CAPI en GTM Server: para cada evento, tag GA4 que envía a sGTM y tag Meta Pixel server-side que envía a CAPI con event_id idéntico para deduplicación. Incluir parámetros Advanced Matching (em, ph, fn, ln, external_id) hasheados SHA-256.",
        "Configurar Consent Mode v2: pop-up CMP (Cookiebot/Iubenda/Didomi) con categorías analytics_storage, ad_storage, ad_user_data, ad_personalization. Activar consent_default denied y consent_update on accept. GA4 y Meta procesarán señales modeladas para usuarios sin consent (cumple AEPD).",
        "Validar Event Match Quality en Meta Events Manager: cada evento debe mostrar EMQ ≥7/10 tras 48h de datos. Si está por debajo, revisar Advanced Matching y eventos enviados sin email/phone. Validar en GA4 DebugView que todos los eventos llegan con items array completo.",
        "Crear audiencias GA4 (Configure → Audiences) basadas en eventos custom: wishlist_add 14d sin Purchase, high_intent_scroll_pdp 7d sin add_to_cart, coupon_applied sin Purchase 3d. Vincular GA4 con Meta Ads vía Customer Match o sincronizar vía Reverse ETL (n8n/Hightouch).",
        "Activar BigQuery Export (gratis hasta 1M eventos/día): GA4 → Admin → BigQuery Linking. Esto desbloquea análisis SQL custom, dashboard Looker Studio con métricas blended Meta+Google+TikTok y pipeline de cohortes por canal de adquisición sin pagar GA4 360.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Sincronización GA4 → audiencias Meta (3 rutas operativas)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Crear las audiencias en GA4 sin sincronizarlas con Meta es desperdiciar el activo más valioso del setup. Tres rutas según madurez y presupuesto:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "Ruta 1 — Customer Match manual: exportar audiencia GA4 (CSV con email/phone hasheado) y subir a Meta como Custom Audience. Coste cero, refresh manual cada 7-14 días. Útil para D2C <8K€/mes en spend o cuentas que arrancan el setup.",
        "Ruta 2 — sGTM con eventos simultáneos: el mismo evento custom (ej. HighIntentBrowse) se dispara a GA4 + Meta CAPI vía server-side con event_id deduplicado. Crear Custom Audience en Meta basada en ese pixel event, refresh en tiempo real. Coste 20-80€/mes Stape. Estándar para D2C 10-30K€/mes.",
        "Ruta 3 — Reverse ETL (n8n / Hightouch / Census): GA4 BigQuery Export → segmento SQL avanzado (ej. usuarios con 2+ visitas PDP + add_to_cart abandonado + LTV histórico Shopify >150€ + Consent Mode aceptado) → API Meta Custom Audience cada hora. Coste 50-200€/mes + dev inicial. Para cuentas >30K€/mes que necesitan audiencias compuestas con datos de Shopify.",
        "Bidireccionalidad: la misma lógica permite enviar conversiones offline de Shopify a Meta vía CAPI Offline Conversions (Purchase desde admin sin tracking online, pedidos por teléfono, devoluciones) para cerrar el loop de atribución.",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 5 métricas semanales para cruzar GA4 vs Meta Ads Manager</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Sin cruce semanal, GA4 y Meta operan como dos verdades paralelas y nadie sabe cuál mirar. Estas son las 5 métricas que deben encajar dentro de un margen razonable:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Métrica</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Fuente GA4</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Fuente Meta</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Gap aceptable</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Si gap >, qué revisar</th>
          </tr>
        </thead>
        <tbody>
          {[
            { m: "Purchases", g: "session_source=facebook/cpc DDA", me: "Purchases pixel 7d-click+1d-view", ga: "-15 a -30%", r: "CAPI dedup event_id, doble conteo" },
            { m: "Revenue", g: "Ecommerce revenue por canal", me: "Revenue Shopify (source of truth)", ga: "±3-5%", r: "Consent rate bajo, items array vacío" },
            { m: "% New Customers", g: "New users / canal", me: "% New Customers ASC/CBO", ga: "±5-8 pts", r: "Lookalike sin LTV, exclusiones rotas" },
            { m: "Sessions paid", g: "Sessions source/medium=facebook/cpc", me: "Clicks (link clicks) Meta Ads", ga: "<10%", r: "UTM rotos, bots, redirects" },
            { m: "Engagement rate", g: "Engagement rate landing filtrada", me: "Hook Rate + CTR creative", ga: "Correlación", r: "Mismatch creative-landing, CRO" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.g}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.me}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.ga}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">7 errores frecuentes en GA4 + Meta Ads en D2C españoles</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Doble conteo de Purchase: pixel client-side + CAPI server-side enviando el mismo evento sin event_id compartido para deduplicación. Revenue inflado +30-50% en Meta Ads Manager y decisiones de spend tomadas sobre datos rotos.",
        "UTMs inconsistentes: utm_source=facebook en unas campañas, fb en otras, meta en otras. GA4 no consolida y el reporting cross-channel se rompe. Estándar: utm_source=facebook + utm_medium=cpc + utm_campaign=[ID] + utm_content=[ad_id].",
        "Consent Mode v2 mal configurado: usuarios que rechazan cookies no envían NADA a GA4 ni a Meta cuando lo correcto es enviar señales modeladas (ads_data_redaction + url_passthrough). En España con rechazo 25-42%, perder esa cohorte rompe optimización.",
        "Eventos enhanced ecommerce sin items array: purchase enviado solo con value/currency sin item_id, item_name, price. GA4 no muestra revenue por producto, dashboards de top sellers rotos, no se puede crear DPA basado en GA4.",
        "Audiencias GA4 creadas pero nunca sincronizadas con Meta: se ven en el panel, alimentan algún reporting interno, pero ningún ad set las usa para targeting o exclusión. El 60% del valor del setup desperdiciado.",
        "Eventos custom mal triggered: high_intent_scroll_pdp disparándose en cualquier scroll de cualquier página (no solo PDP), inflando volumen y rompiendo la calidad de la audiencia para retargeting.",
        "No vincular GA4 con BigQuery: pierdes la única capa que permite reporting cross-channel real con SQL custom + dashboard Looker Studio con métricas blended. Y es gratis hasta 1M eventos/día.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría tracking pre-onboarding obligatoria (3-4h): revisamos los 10 eventos enhanced ecommerce, eventos custom, dedup event_id Pixel/CAPI, EMQ por evento, Consent Mode v2 según AEPD, UTMs por campaña Meta/Google/TikTok, y la lista de audiencias GA4 vs su uso real en Meta. Entregamos plan de corrección priorizado por impacto.",
        "Setup técnico end-to-end: contenedor GTM Web + sGTM Stape con dominio custom metrics.tumarca.com, Shopify Customer Events configurado, 10 eventos enhanced + 5-8 eventos custom específicos de tu negocio, Pixel + CAPI server-side con event_id deduplicado, Consent Mode v2 con CMP integrado.",
        "Sincronización GA4 → Meta vía sGTM y Reverse ETL: audiencias dinámicas en tiempo real basadas en comportamiento (wishlist, scroll PDP, coupon apply) con refresh horario para que Meta optimice sobre datos vivos.",
        "Solución ad-hoc Pablo + Jorge: para una marca D2C de cosmética con 320 SKUs y 28K€/mes en Meta, Jorge construyó un pipeline n8n + GA4 BigQuery Export + Shopify Admin API + Meta Marketing API que cada noche cruza pedidos por SKU × cohorte de adquisición × LTV-90 × margen contribución y publica dashboard Looker Studio cross-channel cada lunes 8am con CAC por canal, MER blended, ROAS plataforma vs MER y % New Customers por audiencia. Pablo decide reasignación semanal de presupuesto entre Meta/Google/TikTok sobre datos limpios. Resultado en 90 días: MER blended subió de 2,1x a 2,8x, % spend en canales con CAC > LTV bajó de 18% a 4% y el equipo del cliente dejó de exportar CSV a mano.",
        "Reporting cruzado semanal: dashboard Looker Studio con las 5 métricas semanales GA4 vs Meta y alertas Slack automáticas cuando algún gap supera el umbral aceptable.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo lidera la decisión estratégica sobre qué eventos custom merece la pena instrumentar según el modelo de negocio y la fase de la cuenta; Jorge construye el stack técnico (sGTM, BigQuery, Reverse ETL, pipeline n8n) y valida que el setup soporta la escala sin romper la atribución. Donde otras agencias separan media buyer y equipo de analytics en dos proveedores con sus propios silos de datos, en DayByDay Pablo y Jorge operan como un solo equipo desde la misma reunión. El cliente habla con los dos socios desde el primer día: sin account managers, sin handoffs, sin perfiles junior tocando el contenedor GTM en producción.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu GA4 te dice algo distinto que Meta Ads Manager y no sabes a quién creer?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría tracking gratuita 30 min: revisamos eventos enhanced ecommerce, dedup Pixel/CAPI, eventos custom, Consent Mode, UTMs y sincronización de audiencias GA4 → Meta. Te entregamos plan de corrección priorizado y benchmark de gap GA4 vs Meta esperado para tu vertical.</p>
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
        <Link to="/blog/server-side-tracking-shopify-conversions-api" className="text-white font-semibold hover:text-white/80">
          Tracking server-side completo para Shopify con Conversions API →
        </Link>
        <p className="text-white/40 text-xs mt-1">Arquitectura sGTM vs Stape vs apps Shopify y eventos críticos con datos cliente hasheados.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/guia-api-conversiones-meta-ads-shopify" className="text-white font-semibold hover:text-white/80">
          Guía API de Conversiones de Meta: configuración y beneficios →
        </Link>
        <p className="text-white/40 text-xs mt-1">CAPI paso a paso para Shopify, deduplicación event_id y verificación EMQ ≥7/10.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/ios-atribucion-meta-ads-2026-d2c" className="text-white font-semibold hover:text-white/80">
          iOS 17/18 y atribución en Meta Ads para D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Pérdida de señal por dispositivo y plan operativo en 6 pasos para recuperar cobertura.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/modelos-atribucion-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Modelos de atribución para D2C: last-click, data-driven y MMM →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo interpretar lo que GA4 muestra como data-driven vs lo que reporta Meta last-click.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cac-blended-vs-cac-canal-ecommerce" className="text-white font-semibold hover:text-white/80">
          CAC blended vs CAC por canal: qué métrica usar para escalar →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo usar GA4 cross-channel para construir CAC blended sin sesgo de plataforma.</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default Ga4MetaAdsEventosCustomD2cPage;
