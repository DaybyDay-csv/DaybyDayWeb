import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es el tracking server-side completo en Shopify y en qué se diferencia del píxel + CAPI básico?",
    a: "Tracking server-side completo es la arquitectura donde TODOS los eventos de marketing —Meta, Google Ads, TikTok, Pinterest, GA4— se enrutan a través de un único contenedor server-side (típicamente Google Tag Manager Server-Side, sGTM) alojado en un dominio propio bajo el subdominio de la marca, en lugar de enviarse desde el navegador del usuario a cada plataforma por separado. La diferencia con el setup básico píxel + CAPI nativa de Shopify es de fondo: aquí no dependes del proxy de Shopify ni de apps de partner, controlas el flujo completo, enriqueces los eventos con datos de cliente hasheados (email, teléfono, IP, user agent, fbp, fbc), unificas la deduplicación entre todas las plataformas y resistes mejor adblockers, ITP de Safari y Consent Mode v2. En cuentas D2C españolas serias en 2026 es el estándar técnico desde 80-100K€/mes de spend."
  },
  {
    q: "¿Cuándo conviene migrar a tracking server-side completo y cuándo basta con la CAPI nativa de Shopify?",
    a: "Conviene migrar cuando se cumplen dos o más de estas condiciones: (1) spend total mensual >50K€ en paid (Meta + Google + TikTok), (2) tráfico iOS/Safari >35%, (3) Event Match Quality (EMQ) actual <7/10 en Meta Events Manager, (4) discrepancia ROAS Meta vs Shopify >25%, (5) >2 plataformas de paid activas que necesitan deduplicación cruzada o (6) ya hay equipo data interno o consultor técnico. Si gastas <30K€/mes en una sola plataforma y tu Shopify Conversions API nativa marca EMQ >7,5 con Purchase coverage server-side >65%, no migres todavía: el ROI no aparece. Por encima de ese umbral, cada mes sin server-side completo es CPA reportado 15-25% peor de lo real y lookalikes entrenando con base parcial."
  },
  {
    q: "¿Qué arquitectura se usa: sGTM en Google Cloud, Stape, contenedor self-hosted o app Shopify?",
    a: "Hay cuatro rutas reales en 2026. (1) Google Tag Manager Server-Side en Google Cloud Platform: máximo control, ≈40-120€/mes de hosting Cloud Run, requiere conocimiento de GCP. (2) Stape.io: hosting gestionado de sGTM con dominio propio, plantillas listas para Meta CAPI/Google Ads/TikTok Events API/Pinterest CAPI/Snap CAPI, desde 20€ hasta 250€/mes según volumen — el sweet spot para 80-90% de los D2C españoles. (3) Self-hosted en VPS o contenedor Docker propio: barato pero exige mantenimiento (parches, certificados, escalado). (4) Apps Shopify especializadas (Elevar, Aimerce, Trackify): integración rápida sin servidor propio, 99-499€/mes según plan, menos flexibilidad pero implementación de 1-2 semanas. La regla DayByDay: para cuentas <150K€/mes recomendamos Stape; para cuentas >150K€/mes con equipo técnico y necesidad de eventos custom, sGTM en GCP."
  },
  {
    q: "¿Qué eventos hay que enviar server-side y con qué parámetros para que el matching no se desplome?",
    a: "Los eventos críticos en D2C son Purchase, AddToCart, InitiateCheckout, AddPaymentInfo, ViewContent y, para retargeting alto, Search y Lead. Cada evento server-side debe incluir: (a) event_id único compartido con el píxel cliente para deduplicación, (b) event_name estandarizado, (c) event_time en epoch UTC, (d) action_source = 'website', (e) datos de cliente hasheados SHA-256 (em, ph, fn, ln, ct, st, zp, country), (f) fbp y fbc (cookie y click ID Meta), (g) client_ip_address y client_user_agent reales, (h) custom_data completo (value, currency, content_ids, content_type, num_items). Sin email hasheado el EMQ no pasa de 5; con email + teléfono + IP + UA llegas a 8-9 fácil. La diferencia operativa: 1-2 puntos de EMQ extra equivalen a 10-15% más de eventos atribuidos correctamente, según las cuentas que hemos migrado."
  },
  {
    q: "¿Cómo se deduplica correctamente entre el píxel cliente y CAPI server-side para que Meta no cuente dos veces?",
    a: "La deduplicación correcta exige que píxel y CAPI envíen exactamente el mismo event_id y el mismo event_name para el mismo evento del usuario. En sGTM la práctica es: generar un UUID en el navegador al disparar el píxel, persistirlo en dataLayer/cookie y reenviarlo desde el servidor con el evento server-side. Meta deduplica si ambos llegan dentro de una ventana de 48 horas con el mismo event_id + event_name. Errores típicos que rompen la deduplicación: usar order_id como event_id (cambia entre intentos de pago), generar nuevo UUID en el servidor sin coordinar con el cliente, no enviar event_name idéntico ('Purchase' vs 'purchase'), o no incluir event_id en absoluto. La verificación se hace en Events Manager → Diagnostics → Deduplication: si aparece 'Duplicate events detected', falla el setup. Lo mismo aplica a Google Ads (transaction_id), TikTok (event_id) y Pinterest (event_id)."
  },
  {
    q: "¿Qué impacto real tiene el server-side completo en CPA, ROAS y EMQ frente a píxel + CAPI nativa Shopify?",
    a: "En las cuentas que hemos migrado de Shopify CAPI nativa a sGTM completo, los rangos consistentes son: EMQ +1,5-3 puntos (de 6,5-7 a 8-9,5), Purchase coverage server-side +15-25 puntos (del 60-70% al 80-92%), CPA reportado por Meta -8-18% (porque más eventos atribuidos correctamente), discrepancia ROAS Meta vs Shopify cae del 25-40% al 8-15%, calidad de lookalikes mejora visiblemente (+15-25% en CTR de campañas de prospecting con LAL fresca) y la fase de aprendizaje sale antes en ad sets nuevos (15-30% más rápido). No es magia: es la suma de eventos enriquecidos, deduplicación limpia, IP/UA reales y persistencia de fbc/fbp más allá de lo que dura una cookie de Safari. La inversión de 1-3K€ en setup + 50-300€/mes en hosting se paga en el primer mes de cuentas >50K€/mes."
  },
  {
    q: "¿Cómo afecta Consent Mode v2, RGPD y la AEPD al tracking server-side?",
    a: "Server-side no exime de RGPD ni de Consent Mode v2 — los reemplaza con una arquitectura más limpia, no más permisiva. La regla obligatoria: si el usuario rechaza cookies en el CMP (Cookiebot, OneTrust, Didomi, Iubenda), no se envía evento ni por píxel ni por servidor. Lo que server-side permite es enviar señales 'consent denied' a Meta y Google con datos modelados (ad_storage=denied, analytics_storage=denied) para que las plataformas aprovechen modelado de conversiones (Google Modeling, Meta AEM) sin violar consentimiento. La AEPD ha publicado guías claras (2024-2025) sobre cookies y tracking: el server-side debe respetar el flag de consent en cada request, no es una vía para saltarse la regulación. El setup correcto en Stape o sGTM lleva integración nativa con Cookiebot/OneTrust/Didomi y filtra requests automáticamente según el estado de consent. Cualquier proveedor que sugiera enviar eventos sin respetar consent es un riesgo legal y reputacional."
  },
  {
    q: "¿Qué errores frecuentes rompen un setup server-side y cómo se diagnostican?",
    a: "Los siete errores que vemos más en auditorías: (1) event_id distinto entre píxel y servidor (deduplicación rota → eventos duplicados → CPA inflado falsamente), (2) datos de cliente sin hashear o hasheados con algoritmo equivocado (EMQ <5), (3) IP del servidor en lugar de IP del cliente real (Meta detecta y baja matching), (4) user_agent del servidor en lugar del navegador (mismo problema), (5) fbc/fbp no persistidos cuando Safari ITP los borra a 7 días (pérdida de attribution window), (6) Consent Mode mal integrado: requests salen con consent=granted aunque el usuario rechazó (riesgo AEPD), (7) sin monitoring activo: nadie revisa Events Manager Diagnostics y un fallo silencioso pasa 3 semanas. El diagnóstico se hace con 4 herramientas: Meta Events Manager (Test Events + Diagnostics + EMQ), Google Tag Assistant para sGTM, Stape Event Builder, y comparativa semanal entre eventos enviados (server logs) vs recibidos (plataforma). Si los números no cuadran al 95%, hay fuga."
  },
];

const ServerSideTrackingShopifyConversionsApiPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Tracking server-side completo para Shopify con Conversions API: guía 2026"
    description="Guía técnica completa de tracking server-side para Shopify con Meta Conversions API en 2026: arquitectura sGTM vs Stape vs apps, eventos críticos y enriquecimiento de datos, deduplicación cliente-servidor, Consent Mode v2 y RGPD, errores frecuentes, impacto real en EMQ/CPA/ROAS y enfoque DayByDay para migrar cuentas D2C."
    slug="server-side-tracking-shopify-conversions-api"
    datePublished="2026-05-06"
    dateModified="2026-05-06"
    readingTime="12 min"
    category="Tracking"
    keywords={[
      "server side tracking shopify",
      "conversions api shopify",
      "sgtm shopify",
      "stape shopify capi",
      "tracking server side d2c 2026",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Tracking server-side completo para Shopify con Conversions API</strong> dejó de ser un proyecto de excelencia técnica y se convirtió en el suelo mínimo de una cuenta D2C en 2026. La Conversions API nativa de Shopify es un buen primer paso, pero está limitada: no enriquece todos los eventos, no permite deduplicación cruzada entre plataformas, no respeta Consent Mode v2 con la flexibilidad que necesita una marca europea y no escala bien cuando el negocio activa TikTok, Pinterest o Google Ads en paralelo a Meta. La arquitectura completa con sGTM o Stape resuelve todo eso a la vez.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Esta guía explica qué es el tracking server-side completo, qué se gana frente al setup básico píxel + CAPI Shopify, las cuatro arquitecturas reales en 2026 con coste y umbral de uso, qué eventos enviar y con qué parámetros para que el Event Match Quality no se hunda, cómo se hace la deduplicación correctamente entre cliente y servidor, cómo encaja Consent Mode v2 y la AEPD, los siete errores que vemos en auditorías y cómo lo aplicamos en DayByDay cuando una cuenta D2C cruza el umbral.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es el tracking server-side completo (y por qué Shopify Conversions API nativa se queda corto)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Tracking server-side completo es la arquitectura donde todos los eventos de marketing salen del navegador, pasan por un contenedor servidor en un dominio propio del cliente (ej. data.tumarca.com) y desde ahí se enrutan, enriquecen y envían a Meta CAPI, Google Ads Enhanced Conversions, TikTok Events API, Pinterest CAPI y GA4. La diferencia clave frente al píxel cliente es que el evento ya no depende del navegador del usuario: ni de Safari ITP, ni de adblockers, ni de extensiones de privacidad, ni del bloqueo de cookies de terceros que iOS aplica desde 2023.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      La Conversions API nativa que Shopify integró con la Facebook & Instagram app es funcional pero tiene tres limitaciones reales: cubre principalmente eventos de Purchase y Checkout, no enriquece IP/UA del cliente como sí hace un sGTM correctamente configurado, y no resuelve la deduplicación cruzada cuando metes TikTok, Pinterest o Google Ads en la ecuación. <a href="https://developers.facebook.com/docs/marketing-api/conversions-api/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">La documentación oficial de Meta sobre Conversions API</a> deja claro que la calidad de matching depende del envío de cliente data hasheada y de la deduplicación con el píxel — partes que Shopify CAPI nativa no controla con el detalle que sí permite sGTM o Stape.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Por qué importa en 2026: <a href="https://www.thinkwithgoogle.com/intl/en-emea/future-of-marketing/digital-transformation/measuring-marketing-effectiveness/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Think with Google documenta</a> que las marcas con tracking server-side completo y consent mode bien implementado recuperan entre el 15% y el 30% de conversiones modeladas frente a las que sólo dependen de tracking cliente. En D2C español, donde el peso de paid social pasa del 50% del presupuesto en muchas cuentas según el <a href="https://www.iabspain.es/estudio/estudio-de-inversion-publicitaria-en-medios-digitales-2025/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Estudio de Inversión Publicitaria de IAB Spain</a>, ese 15-30% extra de señal correctamente atribuida es la diferencia entre escalar bien y escalar a ciegas.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cuándo migrar a server-side completo (umbral por cuenta)</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Spend total /mes</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">¿Server-side completo?</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Setup recomendado</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">EMQ objetivo</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: "<10.000€", m: "No", a: "Píxel + Shopify CAPI nativa (Facebook & Instagram app)", e: ">7,0" },
            { s: "10.000-30.000€", m: "Solo si EMQ <6,5 o iOS >40%", a: "Shopify CAPI + app de partner ligera (Elevar, Aimerce)", e: ">7,5" },
            { s: "30.000-80.000€", m: "Recomendado", a: "Stape sGTM gestionado + Meta CAPI + Google Enhanced", e: ">8,0" },
            { s: "80.000-200.000€", m: "Sí, obligatorio", a: "Stape sGTM o sGTM en Google Cloud + multiplataforma", e: ">8,5" },
            { s: ">200.000€", m: "Sí, custom", a: "sGTM en GCP + endpoint propio + monitoring activo", e: ">9,0" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.a}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.e}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según <a href="https://www.facebook.com/business/help/308855623839366" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">la guía oficial de Meta sobre Event Match Quality</a>, cada punto adicional en EMQ (de 6 a 7, de 7 a 8) se traduce en aproximadamente 10-15% más de eventos correctamente atribuidos al usuario. En cuentas D2C migradas a server-side completo, el salto típico es de 1,5-3 puntos de EMQ — el equivalente a recuperar entre 15% y 35% de matching que Shopify CAPI nativa estaba perdiendo.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 4 arquitecturas reales en 2026 (con coste y trade-off)</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Arquitectura</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Coste mensual</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Implementación</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cuándo elegirla</th>
          </tr>
        </thead>
        <tbody>
          {[
            { a: "sGTM en Google Cloud Platform", c: "≈ 40-120€ Cloud Run + setup", i: "2-4 semanas", u: ">150K€/mes spend, equipo técnico interno, eventos custom complejos" },
            { a: "Stape.io (sGTM gestionado)", c: "≈ 20-250€/mes según volumen", i: "1-2 semanas", u: "30-200K€/mes spend, sin equipo data, plantillas listas multiplataforma" },
            { a: "Self-hosted Docker / VPS", c: "≈ 10-60€ VPS + tiempo dev", i: "3-5 semanas", u: "Stack interno con DevOps, control absoluto, evitar lock-in" },
            { a: "Apps Shopify (Elevar, Aimerce, Trackify)", c: "≈ 99-499€/mes", i: "1 semana", u: "<80K€/mes, sin equipo técnico, integración rápida sin servidor propio" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.a}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.i}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.u}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La regla operativa que aplicamos en DayByDay: para 80-90% de cuentas D2C españolas entre 30K€ y 200K€/mes, Stape.io es el sweet spot — coste contenido, plantillas oficiales para Meta, Google, TikTok y Pinterest, y dominio propio del cliente. Para cuentas >200K€/mes con equipo técnico, sGTM directo en Google Cloud Platform da más control sobre eventos custom y monitoring. Las apps Shopify (Elevar, Aimerce) son válidas hasta 80K€/mes pero a partir de ahí pagas suscripción para algo que sGTM hace por menos.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Eventos críticos y parámetros: el detalle que mueve el EMQ</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Lo que separa un setup server-side que mueve la aguja de uno que solo "funciona" es la calidad de los datos enviados con cada evento. Los parámetros mínimos para que Meta otorgue EMQ &gt; 8 son éstos, y los mismos principios aplican (con su nomenclatura propia) a Google Enhanced Conversions, TikTok Events API y Pinterest CAPI:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "event_id único compartido entre píxel cliente y CAPI server-side (UUID generado en navegador, persistido en dataLayer y reenviado desde el servidor con el mismo valor).",
        "event_name estandarizado y exactamente igual en ambas vías ('Purchase', no 'purchase' ni 'COMPLETE_PURCHASE'). Meta deduplica por par event_id + event_name.",
        "Datos de cliente hasheados SHA-256 lowercase: em (email), ph (teléfono E.164 sin espacios), fn/ln (nombre/apellido), ct (ciudad), st (provincia), zp (código postal), country.",
        "client_ip_address y client_user_agent del navegador real del usuario, NO del servidor — error frecuente que hunde el matching de cliente.",
        "fbp (cookie _fbp generada por píxel) y fbc (click ID que viene en el parámetro fbclid de la URL al click en anuncio Meta), persistidos en cookie first-party para sobrevivir a Safari ITP.",
        "custom_data completo: value (importe), currency, content_ids (SKUs), content_type ('product' o 'product_group'), num_items, contents (array detallado de productos con id, quantity, item_price).",
        "action_source = 'website' obligatorio para que Meta lo procese como conversión web.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Deduplicación cliente-servidor (el detalle que rompe la mayoría de setups)</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Generar UUID en el navegador en el momento del evento (ej. en el thank-you page de Shopify para Purchase, o en el evento Add to Cart). Persistirlo en dataLayer.event_id y en una cookie first-party con expiración de 48h.",
        "Disparar el píxel cliente (fbq o pixel manual) con event_id = UUID y event_name = 'Purchase'.",
        "Enviar al servidor (sGTM o Stape) el mismo event_id y event_name como parte del payload del evento, junto al resto de datos de cliente y custom_data.",
        "El servidor reenvía a Meta CAPI con event_id idéntico. Meta detecta el par event_id + event_name dentro de la ventana de 48 horas y conserva solo una conversión.",
        "Verificación obligatoria en Meta Events Manager → Diagnostics → Deduplication: si aparece 'Duplicate events detected' o el porcentaje deduplicado es <80%, falla el setup. Lo mismo con Google (transaction_id), TikTok (event_id) y Pinterest (event_id).",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>
    <p className="text-white/70 leading-relaxed mb-5">
      Errores típicos que hemos visto rompiendo deduplicación: usar order_id de Shopify como event_id (cambia entre intentos de pago, generando duplicados falsos), generar nuevo UUID en el servidor sin coordinar con el cliente (Meta cuenta dos eventos diferentes), no estandarizar event_name entre cliente y servidor, o no incluir event_id en absoluto. El resultado en los tres casos es el mismo: CPA inflado falsamente, cuentas que parecen rentables pero gastan demasiado, y founders que toman decisiones de presupuesto con números mal medidos.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Consent Mode v2, RGPD y AEPD: server-side ≠ vía libre</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Server-side no exime de RGPD ni de Consent Mode v2. La regla obligatoria en cualquier marca europea: si el usuario rechaza cookies en el banner del CMP, no se envía evento ni por píxel ni por servidor. Lo que server-side aporta es una capa de control: en sGTM o Stape se filtra la request por estado de consent antes de reenviarla a Meta/Google/TikTok, y se manda la señal 'consent denied' para que las plataformas activen modelado de conversiones (Google Modeling, Meta AEM) sin violar el rechazo del usuario.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      <a href="https://www.aepd.es/guias/guia-cookies.pdf" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">La Guía de Cookies de la AEPD</a> es explícita: el consentimiento debe ser libre, específico, informado e inequívoco, y aplica a cualquier tecnología de seguimiento (cookies y equivalentes). El server-side correctamente integrado con Cookiebot, OneTrust, Didomi o Iubenda lee el estado del flag de consent en cada request y filtra automáticamente las que no cumplen. Cualquier proveedor que sugiera "saltarse Consent Mode con server-side" es un riesgo legal y reputacional grave: la AEPD ha multado en casos de tracking sin consentimiento.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Impacto real medido: lo que cambia tras migrar a server-side completo</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Métrica</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Antes (Shopify CAPI nativa)</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Después (sGTM completo)</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Mejora</th>
          </tr>
        </thead>
        <tbody>
          {[
            { m: "Event Match Quality (EMQ) Purchase", a: "6,5-7,0", d: "8,0-9,5", v: "+1,5-3 puntos" },
            { m: "Coverage server-side Purchase", a: "55-70%", d: "80-92%", v: "+15-25 puntos" },
            { m: "CPA reportado por Meta", a: "Baseline", d: "-8 a -18%", v: "Más eventos atribuidos" },
            { m: "Discrepancia ROAS Meta vs Shopify", a: "25-40%", d: "8-15%", v: "Atribución más limpia" },
            { m: "CTR campañas LAL prospecting", a: "Baseline", d: "+15-25%", v: "Lookalikes mejor entrenadas" },
            { m: "Salida de fase de aprendizaje", a: "10-14 días", d: "7-10 días", v: "15-30% más rápido" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.a}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.d}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Estos rangos vienen de cuentas D2C españolas reales (moda, suplementos, hogar) en el tramo 30-150K€/mes de spend en Meta, migradas durante 2025-2026. La inversión de 1-3K€ en setup más 50-300€/mes en hosting se paga en el primer mes en cuentas &gt; 50K€/mes simplemente por mejor matching y menor desperdicio en audiencias contaminadas.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">7 errores frecuentes en setups server-side (auditoría rápida)</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "event_id distinto entre píxel cliente y servidor → deduplicación rota → eventos duplicados → CPA aparentemente mejor pero cuenta gasta de más en audiencias erróneas.",
        "Datos de cliente sin hashear o hasheados con algoritmo equivocado (no SHA-256, o sin lowercase previo) → EMQ <5 → Meta no puede emparejar usuarios.",
        "client_ip_address es la IP del servidor sGTM (Google Cloud, Stape) en lugar de la IP real del navegador → Meta detecta IP de datacenter y baja el matching automáticamente.",
        "client_user_agent del servidor en lugar del navegador → mismo problema, Meta detecta inconsistencia y descuenta calidad.",
        "fbc/fbp no persistidos en cookies first-party → Safari ITP los borra a 7 días → se pierde attribution window de campañas con ciclo >7 días (típico en ticket alto).",
        "Consent Mode mal integrado: requests salen con consent=granted aunque el usuario rechazó → riesgo AEPD y posible multa.",
        "Sin monitoring activo: nadie revisa Meta Events Manager Diagnostics, EMQ ni coverage semanal — un fallo silencioso pasa 3 semanas, 30K€ se pierden.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría inicial gratuita en los primeros 30 días de cuenta: revisamos a mano píxel, Shopify CAPI nativa, EMQ por evento, coverage server-side, deduplicación y discrepancia ROAS Meta vs Shopify. El 70% de cuentas D2C que llegan tienen al menos 2 de los 7 errores de la lista de arriba.",
        "Decisión de arquitectura por umbral de spend: <30K€/mes mantenemos Shopify CAPI nativa con app de partner si hace falta; 30-200K€/mes migramos a Stape.io con dominio propio del cliente (data.tumarca.com); >200K€/mes valoramos sGTM en Google Cloud con endpoint custom según necesidades.",
        "Implementación coordinada Pablo + Jorge: Pablo define qué eventos importan para optimización (Purchase prioritario, AddToCart y InitiateCheckout para retargeting, ViewContent para LAL); Jorge configura sGTM/Stape, integra Cookiebot/Didomi, valida hashing de datos cliente y monta la deduplicación. Es el tipo de pieza ad-hoc que diferencia a DayByDay de agencias playbook.",
        "Migración por fases con verificación cruzada: 1ª semana setup paralelo (sGTM corriendo en sombra junto a Shopify CAPI, sin tocar campañas); 2ª semana comparativa eventos enviados vs recibidos; 3ª semana corte en frío de Shopify CAPI nativa cuando coverage server-side >85% y EMQ >8,0 sostenido.",
        "Monitoring semanal continuo: dashboard Looker Studio con EMQ por evento, coverage server-side, deduplicación, discrepancia ROAS Meta vs Shopify, fbp/fbc persistencia. El founder ve cada lunes si el tracking sigue limpio o algo se ha movido.",
        "Sin sorpresas legales: integración Consent Mode v2 obligatoria con CMP del cliente, filtrado de requests por consent en sGTM y documentación firmada de qué datos se envían, a quién y bajo qué base legal. Es el tipo de detalle que evita multas AEPD.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo lidera paid media y estrategia; Jorge (CTO) lidera implementación tech, server-side tracking y pipelines de datos. Donde otras agencias separan paid media y data engineering entre dos proveedores que rara vez se coordinan, en DayByDay las decisiones de tracking se cierran en la misma reunión: Pablo plantea qué necesita medir Meta, Jorge valida cómo y monta la arquitectura. El cliente habla con los dos socios desde la primera reunión: sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu Shopify ya pide server-side completo o tu CAPI nativa basta todavía?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos píxel, Shopify CAPI, EMQ por evento, coverage server-side, deduplicación y discrepancia ROAS Meta vs Shopify. Te decimos si toca migrar ahora a Stape/sGTM, si conviene quedarse 6 meses más en CAPI nativa, o si tu problema real está antes (Consent Mode mal montado, eventos duplicados, hashing roto).</p>
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
        <Link to="/blog/tiktok-ads-ecommerce-d2c-espana-2026" className="text-white font-semibold hover:text-white/80">
          TikTok Ads para D2C en España 2026: guía completa de activación →
        </Link>
        <p className="text-white/40 text-xs mt-1">Misma arquitectura sGTM/Stape sirviendo Meta CAPI, TikTok Events API, Google y Pinterest en paralelo</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/black-friday-meta-ads-d2c-preparacion" className="text-white font-semibold hover:text-white/80">
          Black Friday Meta Ads para D2C: preparar Q4 con 90 días de antelación →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué la auditoría EMQ y el server-side tienen que estar cerrados 6 semanas antes del peak BF</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/guia-api-conversiones-meta-ads-shopify" className="text-white font-semibold hover:text-white/80">
          Guía API de Conversiones de Meta Ads con Shopify →
        </Link>
        <p className="text-white/40 text-xs mt-1">El paso anterior: qué es CAPI, por qué es no negociable y las 3 rutas básicas en Shopify</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/ios-atribucion-meta-ads-2026-d2c" className="text-white font-semibold hover:text-white/80">
          iOS 17/18 y atribución en Meta Ads: qué ha cambiado para D2C en 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué el server-side completo es ahora obligatorio en cuentas con tráfico iOS &gt;35%</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/modelos-atribucion-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Modelos de atribución para D2C: last-click, data-driven y MMM explicados →
        </Link>
        <p className="text-white/40 text-xs mt-1">Marco general de atribución donde el server-side es el suelo técnico necesario</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/por-que-anuncios-meta-no-convierten" className="text-white font-semibold hover:text-white/80">
          Por qué tus anuncios de Meta no convierten (y cómo solucionarlo) →
        </Link>
        <p className="text-white/40 text-xs mt-1">El tracking roto es la causa nº1 de "Meta no funciona" — diagnóstico en 5 capas</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/metricas-meta-ads-importantes-ecommerce" className="text-white font-semibold hover:text-white/80">
          Métricas Meta Ads que importan de verdad (y las que no) →
        </Link>
        <p className="text-white/40 text-xs mt-1">Las métricas que solo cobran sentido cuando el tracking server-side está limpio</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default ServerSideTrackingShopifyConversionsApiPage;
