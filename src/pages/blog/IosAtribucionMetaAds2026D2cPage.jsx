import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué cambió exactamente con iOS 17 e iOS 18 en la atribución de Meta Ads?",
    a: "iOS 17 (septiembre 2023) introdujo Link Tracking Protection en Mensajes, Mail y Safari privado: cuando el usuario abre un anuncio Meta y termina aterrizando en una URL con parámetros de tracking conocidos (fbclid, gclid, utm en algunos contextos), Apple los limpia automáticamente, dejando a Meta sin click ID que matchear con la conversión posterior. iOS 17.4 ampliaba la lista de parámetros bloqueados. iOS 18 (septiembre 2024) reforzó Private Relay e Intelligent Tracking Prevention en Safari: ahora cookies first-party de scripts third-party caducan a 7 días salvo interacción directa, y la IP del usuario llega ofuscada al servidor de Meta cuando el usuario tiene Private Relay activo. El efecto neto sobre Meta Ads en cuentas D2C españolas con tráfico iOS >35%: pérdida de 18-32% de eventos atribuidos correctamente si la cuenta sigue dependiendo de píxel cliente puro, sin Conversions API server-side enriquecida ni Aggregated Event Measurement bien configurado."
  },
  {
    q: "¿Cuánto se desploma realmente la atribución de Meta Ads en cuentas D2C españolas con mucho tráfico iOS?",
    a: "En las auditorías que hemos hecho durante 2025-2026 en D2C españolas con 35-55% de tráfico iOS y setups que se quedaron en píxel + CAPI básica de Shopify, los rangos típicos son: -15 a -28% de eventos Purchase atribuidos correctamente a Meta vs total real medido en Shopify, EMQ que cae de 7,5 a 5,5-6 en los meses siguientes a una actualización iOS, ventana de atribución 7d-click + 1d-view que pierde 30-45% de conversiones que sí ocurrieron porque fbc se borró antes de la compra (típico en ticket alto >150€ con ciclo de decisión >7 días), discrepancia ROAS reportado por Meta vs ROAS real Shopify que se abre del 18-22% habitual al 30-45% en cuentas afectadas. La traducción operativa: founders que escalan presupuesto creyendo que Meta da ROAS 3,2 cuando realmente da 2,4, o al revés, founders que cortan campañas que sí funcionaban porque el reporting las pinta como pérdida."
  },
  {
    q: "¿Aggregated Event Measurement de Meta sigue siendo relevante en 2026 con iOS 17/18?",
    a: "Sí, AEM (Aggregated Event Measurement) es ahora más crítico, no menos. En 2021 nació para responder a App Tracking Transparency en iOS 14.5; en 2026 con iOS 17/18 sigue siendo el mecanismo por el que Meta agrega y modela conversiones de usuarios iOS que han denegado tracking o cuyo click ID se ha perdido por LTP/Private Relay. La regla obligatoria: tener configurados y priorizados los 8 web events del dominio en Events Manager, con Purchase siempre en posición 1 y los eventos críticos (AddToCart, InitiateCheckout, Lead) en las siguientes; verificación de dominio completa, y SKAdNetwork para campañas de app si las hay. Sin AEM bien priorizado, los usuarios iOS que rechazan tracking no se atribuyen de ninguna forma — ni server-side ni cliente — y la cuenta entera reporta peor de lo que rinde."
  },
  {
    q: "¿La Conversions API server-side resuelve el problema de iOS 17/18 o solo lo amortigua?",
    a: "Lo amortigua de forma sustancial pero no lo resuelve al 100%. CAPI server-side enriquecida (con email, teléfono, IP del cliente real, user agent, fbp/fbc persistidos en cookie first-party) recupera entre el 60% y el 85% del matching que iOS 17/18 te quita, según la limpieza de datos del checkout y el % de checkouts que pasan datos de usuario logueado vs anónimo. El 15-40% restante se pierde en usuarios iOS que: (a) tienen Private Relay activo y rechazan ATT, (b) compran desde una sesión donde Apple ya borró fbc por LTP antes de que tu sGTM lo pudiera persistir en cookie first-party, o (c) compran como guest sin pasar email durante el checkout. El gap real solo se cubre combinando CAPI server-side + AEM bien priorizado + modelado adicional propio (MMM, geo-experiments, holdout tests). Si una agencia te dice que CAPI por sí sola resuelve iOS 17/18 al 100%, está vendiendo humo."
  },
  {
    q: "¿Qué hacer concretamente para minimizar el daño de iOS 17/18 en una cuenta D2C de 50-150K€/mes en Meta?",
    a: "Plan operativo en 6 pasos. (1) Tracking server-side completo con sGTM o Stape (no solo Shopify CAPI nativa): EMQ objetivo >8,0, coverage Purchase server-side >85%, fbc/fbp persistidos en cookie first-party con dominio propio. (2) AEM correctamente priorizado: 8 web events activos, Purchase en 1, dominio verificado, sin solapamiento de event_name. (3) Eventos enriquecidos con datos cliente hasheados SHA-256 obligatorios: em, ph, fn, ln, ct, st, zp, country — con email solo no llegas a EMQ 8. (4) Ventanas de atribución actualizadas a 7d-click + 1d-view (no usar 1d-click para D2C de ticket >50€ con ciclo de decisión real). (5) MMM ligero o geo-experiments mensuales para validar lift real vs lift reportado: si Meta dice ROAS 3,5 y geo-test confirma incremental 2,8x, ajustas el modelo de presupuesto. (6) Dashboard blended ROAS y blended CAC (no solo Meta-attributed): al final lo que escala el negocio es la suma, no la atribución de plataforma."
  },
  {
    q: "¿Cómo afecta iOS 17/18 a las audiencias lookalike y al algoritmo de optimización de Meta?",
    a: "Doble impacto, ambos compuestos en el tiempo. Primero: las audiencias lookalike entrenadas con eventos de baja calidad (poco matching, datos cliente sin enriquecer, fbp/fbc perdidos) se vuelven más anchas y menos predictivas — el CTR de prospecting LAL cae 8-18% comparado con cohortes pre-iOS 17, según las cuentas que hemos migrado. Segundo: el algoritmo de pujas de Meta se entrena con menos señal real, lo que se traduce en fase de aprendizaje que dura más (12-18 días en lugar de 7-10), CPA inestable durante 2-3 semanas tras cualquier cambio significativo, y peor performance de campañas Advantage+ Shopping en cuentas con bajo coverage server-side. La solución no es dejar de usar LAL — sigue siendo el motor de prospecting D2C en 2026 — sino entrenar las semillas con eventos enriquecidos al máximo (LTV alto, no AddToCart genérico) y mantener server-side >85% de coverage para que el algoritmo aprenda con la señal completa."
  },
  {
    q: "¿Hay diferencia entre el impacto de iOS 17/18 en D2C de moda, suplementos, hogar o ticket alto?",
    a: "Sí, y el patrón es predecible. Sectores con ticket bajo (20-50€), ciclo de decisión <24h y compra impulsiva (cosmética básica, complementos moda, snacks): pérdida moderada (-12 a -18%) porque la conversión ocurre antes de que LTP/ITP borren fbc. Sectores con ticket medio (50-150€) y ciclo 1-7 días (ropa premium, suplementos suscripción, electrónica pequeña): pérdida media-alta (-18 a -28%) porque caen muchas conversiones en la ventana donde fbc ya se ha borrado pero la atribución 7d-click la captaría si el server-side estuviera limpio. Sectores con ticket alto (150€+), ciclo >7 días y mucho research (mobiliario, joyería, electrónica grande, suscripciones B2C anuales): pérdida alta (-25 a -40%) porque la mayoría de compras pasan ventana 7d-click por defecto y dependen casi entera de CAPI server-side bien montada. Por eso el umbral de migración a server-side completo no debe ser solo el spend, también el ticket medio del producto."
  }
];

const IosAtribucionMetaAds2026D2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="iOS 17/18 y atribución en Meta Ads: qué ha cambiado para D2C en 2026"
    description="Análisis técnico de cómo iOS 17 e iOS 18 afectan a la atribución de Meta Ads para eCommerce D2C en España: Link Tracking Protection, Private Relay, ITP de Safari, impacto medido en EMQ, coverage y discrepancia ROAS Meta vs Shopify, papel de Aggregated Event Measurement, qué resuelve CAPI server-side y qué no, plan operativo en 6 pasos para D2C de 50-150K€/mes y enfoque DayByDay."
    slug="ios-atribucion-meta-ads-2026-d2c"
    datePublished="2026-05-06"
    dateModified="2026-05-06"
    readingTime="11 min"
    category="Tracking"
    keywords={[
      "ios atribución meta ads 2026",
      "ios 17 meta ads",
      "ios 18 atribución",
      "private relay meta ads",
      "link tracking protection meta",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">iOS 17 e iOS 18 cambiaron las reglas de la atribución en Meta Ads</strong> para cualquier cuenta D2C con tráfico iOS relevante, y el efecto se ha consolidado a lo largo de 2025-2026 conforme la base instalada de iPhone se ha actualizado. La pérdida de matching ya no es teoría: en cuentas D2C españolas con 35-55% de tráfico iOS y setups que se quedaron en píxel + CAPI básica de Shopify, vemos -15 a -28% de eventos Purchase atribuidos correctamente, EMQ cayendo de 7,5 a 5,5-6 y discrepancia ROAS Meta vs Shopify abriéndose del 18-22% habitual al 30-45%. Quien siga reportando sin asumir esto está tomando decisiones de presupuesto con números rotos.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Este artículo explica qué cambió exactamente con iOS 17 e iOS 18, cuánto se pierde en una cuenta D2C real, por qué Aggregated Event Measurement es más crítico que en 2021, qué resuelve la Conversions API server-side y qué no, cómo afecta al algoritmo de pujas y a las lookalike, y un plan operativo en 6 pasos que aplicamos en DayByDay para minimizar el daño en cuentas de 50-150K€/mes.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué cambió exactamente con iOS 17 e iOS 18 (definición técnica)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Apple introdujo en iOS 17 (septiembre 2023) <strong className="text-white">Link Tracking Protection</strong> para Mensajes, Mail y la navegación privada de Safari: cuando un usuario hace clic en un anuncio Meta y aterriza en una URL con parámetros de tracking conocidos (fbclid entre ellos), Apple los limpia automáticamente antes de que el navegador cargue la página. iOS 17.4 amplió la lista de parámetros bloqueados. iOS 18 (septiembre 2024) endureció dos piezas adicionales: <strong className="text-white">Private Relay</strong>, que enmascara la IP real del usuario y el dominio que visita en dos saltos cifrados, y la <strong className="text-white">Intelligent Tracking Prevention</strong> de Safari, que ahora caduca cookies first-party generadas desde scripts third-party (Meta Pixel incluido) a 7 días salvo interacción directa.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      <a href="https://developer.apple.com/documentation/safariservices/privacy-preserving-ad-attribution" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">La documentación oficial de Apple sobre Privacy-Preserving Ad Attribution</a> y los release notes de WebKit confirman las tres piezas del puzzle: LTP, ITP y Private Relay. El efecto combinado para Meta Ads es que el click ID (fbc) que históricamente permitía emparejar al usuario que clicó con la conversión posterior, ya no llega completo, llega caducado o llega ofuscado en una parte significativa del tráfico iOS. Cualquier setup que dependa del píxel cliente puro pierde matching de forma estructural.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cuánto se pierde realmente: datos por tipo de cuenta D2C española</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Tipo de cuenta</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">% tráfico iOS</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Pérdida matching Purchase</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Caída EMQ típica</th>
          </tr>
        </thead>
        <tbody>
          {[
            { t: "D2C ticket bajo (20-50€), compra impulsiva", i: "30-45%", p: "-12 a -18%", e: "7,5 → 6,5-7,0" },
            { t: "D2C ticket medio (50-150€), ciclo 1-7d", i: "35-55%", p: "-18 a -28%", e: "7,5 → 5,5-6,5" },
            { t: "D2C ticket alto (150€+), ciclo >7d, research", i: "40-60%", p: "-25 a -40%", e: "7,5 → 5,0-6,0" },
            { t: "D2C suscripción anual / B2C SaaS", i: "35-50%", p: "-22 a -35%", e: "7,0 → 5,5-6,0" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.t}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.i}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.e}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Estos rangos vienen de auditorías hechas durante 2025-2026 en cuentas D2C españolas en moda, suplementos, hogar y belleza, con spend mensual entre 30K€ y 200K€ y setups que se quedaron en píxel + CAPI básica de Shopify (sin sGTM ni Stape). En cuentas que ya migraron a server-side completo y AEM bien priorizado, la pérdida residual cae al 5-12% en lugar del 15-40%, pero rara vez llega a cero — porque iOS 18 es estructural, no un bug que parchee.
    </p>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según <a href="https://www.statista.com/statistics/495966/mobile-os-market-share-spain/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">datos de Statista sobre cuota de iOS en España</a>, iOS supera el 25% de la cuota nacional de móvil — pero en cuentas D2C de moda premium, belleza y suplementos el peso real del tráfico iOS sube al 40-55% (poder adquisitivo medio-alto, mayor uso de Instagram/Reels). Eso significa que el daño de iOS 17/18 no es simétrico entre marcas: a más exposición a iOS, más urgente la migración a server-side completo y AEM correctamente priorizado.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Aggregated Event Measurement: por qué importa más, no menos, en 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      AEM nació en 2021 como respuesta de Meta a App Tracking Transparency en iOS 14.5. En 2026 con iOS 17/18, AEM sigue siendo el mecanismo por el que Meta agrega y modela conversiones de usuarios iOS que han denegado tracking o cuyo click ID se ha perdido por LTP/Private Relay. <a href="https://www.facebook.com/business/help/721422165168355" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">La guía oficial de Meta sobre Aggregated Event Measurement</a> documenta el límite de 8 web events por dominio y la importancia del orden de prioridad: el evento en posición 1 es el único que se reportará para usuarios iOS sin consentimiento.
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Verificar el dominio en Meta Business Manager — sin verificación de dominio, AEM no funciona y se pierde toda la atribución de usuarios iOS sin tracking.",
        "Configurar los 8 web events del dominio en orden de prioridad: Purchase siempre en posición 1, después AddPaymentInfo, InitiateCheckout, AddToCart, Lead, ViewContent (si aplica) y dos eventos custom relevantes.",
        "Evitar event_name duplicados o solapados: 'Purchase' y 'PurchaseV2' compiten y degradan la señal. Estandarizar eventos en píxel y servidor.",
        "Para cuentas con app móvil: configurar SKAdNetwork (SKAN) en paralelo a AEM web — son sistemas distintos pero complementarios.",
        "Revisar mensualmente Events Manager → Aggregated Event Measurement: si aparece un evento como 'Inactive' o el Purchase no está en 1, el setup está roto.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">¿La Conversions API server-side resuelve el problema? Sí, pero no del todo</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Una CAPI server-side bien montada (sGTM o Stape, dominio propio, eventos enriquecidos con datos cliente hasheados SHA-256, fbp/fbc persistidos en cookie first-party del propio dominio del cliente) recupera entre el 60% y el 85% del matching que iOS 17/18 te quita. No el 100%, y cualquiera que prometa lo contrario miente. El 15-40% residual se pierde en tres escenarios concretos:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Usuarios con Private Relay activo + rechazo ATT que compran como guest sin pasar email/teléfono — sin datos cliente hasheados, EMQ no pasa de 4-5 incluso en server-side.",
        "Compras donde Apple ya borró fbc por LTP antes de que tu sGTM pudiera persistirlo en cookie first-party (caso típico de ticket alto con ciclo >7 días).",
        "Usuarios que cambian de dispositivo entre el clic en el anuncio (móvil iOS) y la compra (desktop, otro navegador) — la deduplicación cross-device se cae sin Customer Match Key adicional.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Para cubrir ese gap residual hace falta combinar tres cosas: CAPI server-side al máximo, AEM correctamente priorizado, y modelado adicional propio (MMM ligero, geo-experiments trimestrales o holdout tests sobre regiones controladas). Los detalles del setup técnico server-side están en la <Link to="/blog/server-side-tracking-shopify-conversions-api" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía completa de tracking server-side para Shopify con CAPI</Link>; los modelos de atribución y MMM en la <Link to="/blog/marketing-mix-modeling-ecommerce-d2c" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de Marketing Mix Modeling para D2C</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo afecta iOS 17/18 al algoritmo de Meta y a las lookalike</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El daño no es solo de reporting, es de optimización real. El algoritmo de pujas de Meta se entrena con la señal de eventos que recibe; cuando esa señal cae 18-28% por iOS 17/18, el algoritmo aprende con menos información, lo que se traduce en tres efectos compuestos:
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Fase de aprendizaje más larga: 12-18 días en cuentas con bajo coverage server-side, en lugar de los 7-10 que necesita un ad set bien instrumentado. Cada cambio significativo (creativo, presupuesto, audiencia) reinicia el reloj.",
        "CPA inestable durante 2-3 semanas tras cualquier cambio: el algoritmo no estabiliza porque la muestra de conversiones reportadas es ruidosa.",
        "Lookalike entrenadas con semillas de baja calidad (poco matching, datos cliente sin enriquecer, fbc perdido) se vuelven más anchas y menos predictivas. CTR de prospecting LAL cae 8-18% comparado con cohortes pre-iOS 17.",
        "Campañas Advantage+ Shopping rinden peor en cuentas con coverage server-side <70%: el sistema necesita señal limpia para asignar bien los activos creativos a las audiencias.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>
    <p className="text-white/70 leading-relaxed mb-5">
      La solución no es dejar de usar lookalike ni huir de Advantage+ — siguen siendo el motor de prospecting D2C en 2026 — sino entrenar las semillas con eventos enriquecidos al máximo (compradores LTV alto en lugar de AddToCart genérico) y mantener server-side por encima del 85% de coverage para que el algoritmo aprenda con la señal completa. Los detalles operativos de las lookalike están en la <Link to="/blog/audiencias-lookalike-meta-alta-calidad" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de audiencias lookalike de alta calidad</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Plan operativo en 6 pasos para una cuenta D2C de 50-150K€/mes</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Tracking server-side completo con sGTM o Stape (no solo Shopify CAPI nativa): EMQ objetivo >8,0, coverage Purchase server-side >85%, fbc/fbp persistidos en cookie first-party del dominio propio del cliente (data.tumarca.com).",
        "AEM correctamente priorizado en Events Manager: 8 web events activos, Purchase en posición 1, dominio verificado, sin solapamiento de event_name. Revisión mensual.",
        "Eventos enriquecidos con datos cliente hasheados SHA-256: em (email), ph (teléfono), fn/ln, ct, st, zp, country. Solo email no llega a EMQ 8; con email + teléfono + IP/UA reales se llega a 8,5-9.",
        "Ventanas de atribución actualizadas a 7d-click + 1d-view (no usar 1d-click para D2C de ticket >50€ con ciclo de decisión real >24h). Revisar en cada audit que la cuenta no esté en defaults antiguos.",
        "MMM ligero o geo-experiments trimestrales para validar lift real vs lift reportado: si Meta dice ROAS 3,5 y geo-test confirma incremental 2,8x, el modelo de presupuesto se ajusta con el dato real, no con el reportado.",
        "Dashboard blended ROAS y blended CAC (no solo Meta-attributed): al final lo que escala el negocio es la suma de canales, no la atribución de plataforma. Detalles en la guía de CAC blended vs CAC por canal.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría iOS-aware en los primeros 30 días: medimos % tráfico iOS por dispositivo, EMQ por evento antes/después de cada actualización iOS, ratio Purchase server-side / Purchase total, discrepancia ROAS Meta vs Shopify segmentada por iOS vs Android. La mayoría de cuentas que llegan tienen al menos un blind spot en uno de esos cuatro indicadores.",
        "Implementación coordinada Pablo + Jorge: Pablo decide qué eventos hay que rescatar para optimización (Purchase prioritario, AddToCart e InitiateCheckout para retargeting fino, ViewContent para LAL); Jorge configura sGTM/Stape, valida persistencia de fbc/fbp en cookie first-party del dominio del cliente, monta hashing SHA-256 lowercase y verifica AEM y verificación de dominio. Es el tipo de pieza ad-hoc que separa a DayByDay de agencias playbook.",
        "Migración por fases con verificación cruzada: 1ª semana setup paralelo (sGTM corriendo en sombra junto a píxel + CAPI básica, sin tocar campañas); 2ª semana comparativa eventos enviados vs recibidos por dispositivo; 3ª semana corte en frío de la CAPI básica cuando coverage server-side >85% y EMQ >8,0 sostenido en muestra iOS y Android.",
        "Geo-experiments trimestrales para validar incrementalidad real: dividimos España en regiones de control y test, cortamos campañas Meta en control durante 2-3 semanas y medimos lift real en Shopify. Si Meta reporta ROAS 3,5 y el geo-test confirma incremental 2,8x, el modelo de presupuesto se ajusta con el dato real.",
        "Dashboard Looker Studio mensual con blended ROAS, blended CAC, % matching iOS, EMQ por evento, coverage server-side, discrepancia Meta vs Shopify. El founder ve cada mes si iOS le está costando más o menos atribución que en el mes anterior, y si las acciones tomadas funcionaron.",
        "Sin sorpresas legales: integración Consent Mode v2 con CMP del cliente (Cookiebot, OneTrust, Didomi), filtrado de requests por consent en sGTM y documentación de qué datos cliente se envían y bajo qué base legal. iOS 17/18 no es excusa para saltarse RGPD ni AEPD.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo lidera paid media y estrategia; Jorge (CTO) lidera implementación tech, server-side tracking y pipelines de datos. Donde otras agencias separan paid media y data engineering entre dos proveedores que rara vez se coordinan, en DayByDay las decisiones sobre cómo recuperar atribución iOS se cierran en la misma reunión: Pablo plantea qué eventos necesita Meta para optimizar, Jorge valida cómo persistir fbc/fbp y enriquecer eventos sin violar Consent Mode v2. El cliente habla con los dos socios desde la primera reunión: sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Sabes cuánta atribución te está costando iOS 17/18 ahora mismo?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: medimos % tráfico iOS de tu cuenta, EMQ por evento, coverage server-side Purchase, discrepancia ROAS Meta vs Shopify segmentada por iOS vs Android, y AEM/verificación de dominio. Te decimos cuánto matching has perdido y qué se recupera realmente con server-side completo en tu setup actual.</p>
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
          Tracking server-side completo para Shopify con CAPI: guía 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">El setup técnico que recupera 60-85% de la atribución que iOS 17/18 te quita</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/guia-api-conversiones-meta-ads-shopify" className="text-white font-semibold hover:text-white/80">
          Guía API de Conversiones de Meta Ads con Shopify →
        </Link>
        <p className="text-white/40 text-xs mt-1">Las 3 rutas de CAPI en Shopify y el suelo técnico mínimo</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/modelos-atribucion-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Modelos de atribución para D2C: last-click, data-driven y MMM explicados →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo elegir modelo de atribución cuando Meta sobreatribuye 20-35% por defecto</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/marketing-mix-modeling-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Marketing Mix Modeling (MMM) para D2C: cuándo aplicarlo y qué resuelve →
        </Link>
        <p className="text-white/40 text-xs mt-1">El modelado complementario que cubre el gap residual de iOS 17/18</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default IosAtribucionMetaAds2026D2cPage;
