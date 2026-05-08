import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Cuándo conviene activar TikTok Ads para un eCommerce D2C en España?",
    a: "Cuando se cumplen tres condiciones: la cuenta de Meta Ads ya tiene una base estable (>15-20K€/mes con CAC controlado), existe capacidad de producir 4-6 creatividades nativas TikTok al mes (vertical 9:16, sin estética de anuncio, hook en los 2 primeros segundos) y el producto tiene un componente visual o de novedad que justifica descubrimiento. Activar TikTok antes de saturar Meta Ads suele canibalizar presupuesto sin escalar. En 2026 el perfil de comprador TikTok en España ya no es solo Gen Z: según el Estudio Anual de Redes Sociales de IAB Spain, la edad media del usuario activo de TikTok en España subió a 34 años, lo que abre ventana real para sectores como hogar, belleza adulta, suplementos y moda no-teen. La regla operativa que aplicamos en DayByDay: empezar con 2.000-3.000€/mes y subir solo cuando CPA TikTok ≤ 1,4× CPA Meta blended."
  },
  {
    q: "¿Qué presupuesto mínimo necesita TikTok Ads para empezar a aprender en una cuenta D2C?",
    a: "El umbral mínimo realista es 2.000-3.000€/mes para una sola campaña activa con al menos 3-5 ad groups y 4-6 creatividades. El algoritmo de TikTok (Smart Performance Campaigns y Value-Based Optimization) necesita 50 conversiones por ad group en 7 días para salir de aprendizaje, igual que Meta. Por debajo de 1.500€/mes la cuenta no genera datos suficientes y el CPA queda inflado entre 60% y 120% sobre lo que sería estable. Si el producto es de ticket alto (>80€) hay que añadir una segunda capa de eventos intermedios (AddToCart, ViewContent) para alimentar al algoritmo más rápido. En cuentas D2C españolas que hemos auditado, TikTok llega a paridad con Meta en CPA al cruzar los 8-10K€/mes de spend sostenido durante 60 días."
  },
  {
    q: "¿Cómo es el ROAS y CPA en TikTok Ads vs Meta Ads para D2C en España?",
    a: "Los rangos que vemos en cuentas D2C españolas en 2026: ROAS reportado TikTok 1,8-3,2x vs Meta 2,5-4,0x; CPM TikTok 4-8€ vs Meta 7-13€; CPC TikTok 0,30-0,70€ vs Meta 0,50-1,20€; CTR TikTok 1,2-2,5% vs Meta 0,9-1,8%. TikTok cuesta menos por impresión y por click, pero la tasa de conversión post-click suele ser 30-50% inferior a Meta porque el tráfico viene en estado discovery, no de búsqueda intencional. La ventaja real de TikTok no está en el ROAS aislado: está en lo que aporta al MER blended cuando la cuenta sube de canal único a multi-canal. Cuentas que añaden TikTok bien ejecutado al stack Meta+Google ven subidas del MER blended de 0,3-0,8 puntos en 90 días, principalmente por reach incremental que Meta y Google no estaban tocando."
  },
  {
    q: "¿Qué formato de TikTok Ads funciona mejor para un eCommerce D2C en España?",
    a: "Spark Ads (impulsar publicaciones orgánicas reales de la marca o de creadores) es el formato que mejor rinde en D2C español, con CTR medio 50-100% superior a un In-Feed Ad estándar y CPA 20-35% más bajo. Razón: el contenido pasa el primer filtro de 'esto no parece anuncio'. Los formatos por orden de rendimiento real en cuentas que hemos optimizado: (1) Spark Ads con UGC de creadores micro/nano, (2) Spark Ads con contenido orgánico propio de la marca, (3) In-Feed Ads producidos en estilo nativo (sin branding intrusivo, hook en 2s), (4) Collection Ads para catálogo amplio, (5) TopView (solo para lanzamientos puntuales con presupuesto >15K€). Lo que NO funciona: subir el creative de Meta tal cual a TikTok. La métrica de éxito de un creative TikTok es Hook Rate (visualizaciones >3s / impresiones); por debajo del 25% el creative no escala."
  },
  {
    q: "¿Cómo se configura el TikTok Pixel + Events API para que TikTok Ads optimice bien?",
    a: "Setup mínimo en 2026 para una D2C en Shopify: (1) TikTok Pixel base instalado vía app oficial Shopify o gestor de etiquetas (GTM web), (2) Events API server-side para los 5 eventos críticos (PageView, ViewContent, AddToCart, InitiateCheckout, CompletePayment) con deduplicación por event_id, (3) Advanced Matching activado con email hasheado y phone hasheado para subir EMQ (Event Match Quality) por encima de 7/10, (4) Consent Mode adaptado a RGPD (Spain) con default denied + update tras consentimiento, (5) Custom Events para upsell, suscripción o cualquier conversión secundaria que importe al negocio. Sin Events API el matching se queda en 5-6/10 (suficiente para empezar pero deja CPA 15-25% más alto que con server-side bien implementado). Es exactamente el mismo patrón que CAPI de Meta, y por eso lo configuramos en paralelo en DayByDay: misma arquitectura sGTM o Stape sirviendo a Meta, Google, TikTok y Pinterest."
  },
  {
    q: "¿Vale la pena vender en TikTok Shop España para una marca D2C en 2026?",
    a: "Depende del catálogo, del margen y de la estrategia D2C. TikTok Shop está en expansión en España desde finales de 2024 y abre ventana de visibilidad pero introduce dos problemas para una D2C: (1) la comisión de plataforma erosiona margen entre 5-12% según categoría, lo que puede romper la unit economics si el AOV es bajo (<35€); (2) el comprador TikTok Shop tiende a ser cazaofertas, lo que baja LTV y dificulta retención por email/SMS porque los datos del cliente quedan parcialmente en TikTok. El escenario donde sí compensa: producto con margen >55%, AOV 40-90€, marca con fuerte presencia orgánica TikTok y capacidad de producción rápida de contenido. El escenario donde NO compensa: marca premium D2C con AOV >100€ que monetiza por LTV vía email/SMS — TikTok Shop devalúa la propuesta y rompe el funnel directo a la web propia. La recomendación operativa: TikTok Ads SÍ desde 15-20K€/mes Meta. TikTok Shop solo si la unit economics encaja."
  },
  {
    q: "¿Cómo se mide si TikTok Ads aporta incremental real o solo canibaliza Meta Ads?",
    a: "Cuatro métodos operativos. (1) MER blended antes vs después: medir MER (revenue total / spend total Meta+Google+TikTok) los 30 días previos a activar TikTok y los 30 posteriores. Subida ≥0,2 puntos = incremental. (2) Holdout geo: apagar TikTok en una región (típicamente Cataluña o Madrid) durante 21-30 días y comparar caída de revenue total con la región control. Es el método más limpio. (3) Conversion lift study nativo de TikTok (disponible para cuentas con >5K€/mes de spend): TikTok divide la audiencia en expuesta y control sin coste extra y reporta el lift incremental. (4) Post-purchase survey en checkout Shopify ('¿Dónde nos has descubierto?'): contraste cualitativo con la atribución de plataforma. En cuentas D2C que hemos auditado, TikTok suele aportar 8-22% de lift incremental real cuando la creatividad es nativa; cuando se sube creative reciclado de Meta, el lift baja a 0-5% y el spend canibaliza Meta sin sumar."
  }
];

const TikTokAdsEcommerceD2cEspana2026Page = ({ openCalendly }) => (
  <BlogPostLayout
    title="TikTok Ads para D2C en España 2026: guía completa de activación"
    description="Guía operativa para activar TikTok Ads en un eCommerce D2C en España: cuándo abrir el canal sobre Meta Ads, presupuesto mínimo realista, formatos que mejor rinden (Spark Ads, In-Feed nativo, Collection), CPM/CPC/CPA reales 2026, configuración TikTok Pixel + Events API server-side, decisión TikTok Shop sí/no según unit economics, medición incremental con MER blended y holdout geo, y enfoque DayByDay para escalar sin canibalizar Meta."
    slug="tiktok-ads-ecommerce-d2c-espana-2026"
    datePublished="2026-05-08"
    dateModified="2026-05-08"
    readingTime="12 min"
    category="TikTok Ads"
    keywords={[
      "tiktok ads ecommerce españa",
      "tiktok ads d2c",
      "tiktok ads vs meta ads",
      "tiktok pixel events api",
      "tiktok ads roas españa 2026",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">TikTok Ads para un eCommerce D2C en España no es Meta Ads con vídeo vertical</strong>: es un canal con economía propia, un algoritmo que premia el contenido que no parece anuncio y un perfil de comprador en discovery puro. En 2026 ya no se discute si TikTok merece presupuesto en una D2C que ha saturado Meta — la pregunta operativa es cuándo abrirlo, con qué creatividad, qué presupuesto mínimo necesita para aprender y cómo se mide si suma al MER blended o solo canibaliza Meta. Esta guía es el protocolo que usamos en DayByDay para activar TikTok Ads en cuentas D2C españolas que han llegado al techo de Meta y necesitan reach incremental real.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es TikTok Ads para un eCommerce D2C</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">TikTok Ads</strong> es la plataforma publicitaria de ByteDance que sirve anuncios dentro del feed de TikTok (For You), TopView, Search y red de partners (Pangle). Para un eCommerce D2C el setup estándar combina campañas de Web Conversion (objetivo CompletePayment u optimización por valor) con creatividades verticales 9:16 nativas, integradas con TikTok Pixel + Events API y, opcionalmente, con TikTok Shop para venta dentro de la plataforma. El algoritmo se llama Smart Performance Campaign en su versión automatizada (similar a Advantage+ de Meta o Performance Max de Google).
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      <a href="https://www.tiktok.com/business/es/blog/tiktok-marketing-science-2026" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Según TikTok for Business, el 78% de los usuarios activos en España consume contenido de marca a diario en la plataforma</a>, y el tiempo medio de sesión sigue siendo el más alto entre redes sociales. Esa atención convertida en subastas explica por qué TikTok Ads se ha convertido en canal complementario obligatorio para D2C que han escalado Meta más allá de los 20K€/mes y necesitan reach que Meta y Google ya no aportan.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según <a href="https://www.statista.com/statistics/1305782/tiktok-users-in-spain/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Statista, TikTok superó los 22 millones de usuarios activos mensuales en España</a> y la edad media del usuario activo subió a 34 años — un cambio estructural que abre ventana de adquisición para sectores que antes consideraban TikTok exclusivamente Gen Z (hogar, suplementos, belleza adulta, moda no-teen). Para una D2C española en 2026, ignorar TikTok ya no es decisión estratégica, es renunciar a reach incremental.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 3 condiciones obligatorias antes de activar TikTok Ads</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Activar TikTok sin cumplir estas condiciones es la causa nº1 de cuentas D2C españolas que llegan a DayByDay con CPA disparado en TikTok y MER blended estancado:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Condición</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Umbral mínimo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Riesgo si no se cumple</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cómo verificar</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "Meta Ads estabilizado", u: ">15-20K€/mes con CAC controlado", r: "Canibalización: TikTok roba spend a Meta sin sumar reach", v: "Reporte 90d Meta + MER blended estable" },
            { c: "Capacidad creativa nativa", u: "4-6 creatividades 9:16 nuevas/mes", r: "Hook Rate <25%, creative quema en 7-10 días sin escalar", v: "Audit pipeline UGC + producción interna" },
            { c: "TikTok Pixel + Events API", u: "EMQ ≥7/10, deduplicación por event_id", r: "Optimización ciega, CPA inflado +15-25%", v: "TikTok Events Manager > Diagnostics" },
            { c: "Presupuesto mínimo TikTok", u: "≥2.000-3.000€/mes durante 60d", r: "Aprendizaje infinito, datos insuficientes, CPA falso", v: "Ad group con ≥50 conv/7d antes de juzgar" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.u}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.r}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Si la cuenta aún no tiene la base Meta saturada, el orden correcto es escalar Meta primero — más detalle en la <Link to="/blog/escalar-meta-ads" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía operativa para escalar Meta Ads sin romper el ROAS</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">CPM, CPC, CPA y ROAS reales TikTok vs Meta para D2C en España 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Rangos observados en cuentas D2C españolas activas en ambos canales durante 2026 (datos propios y benchmark sectorial):
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Métrica</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">TikTok Ads</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Meta Ads</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Lectura</th>
          </tr>
        </thead>
        <tbody>
          {[
            { m: "CPM medio", t: "4-8€", mt: "7-13€", l: "TikTok ~40% más barato en impresión" },
            { m: "CPC medio", t: "0,30-0,70€", mt: "0,50-1,20€", l: "TikTok ~35% más barato en click" },
            { m: "CTR medio", t: "1,2-2,5%", mt: "0,9-1,8%", l: "TikTok atrae más click pero menos intención" },
            { m: "Conversion Rate post-click", t: "0,8-1,8%", mt: "1,5-3,0%", l: "Meta convierte 30-50% más por click" },
            { m: "CPA reportado", t: "30-65€", mt: "22-45€", l: "TikTok más caro por venta cerrada" },
            { m: "ROAS reportado", t: "1,8-3,2x", mt: "2,5-4,0x", l: "Meta gana en eficiencia aislada" },
            { m: "Lift incremental al MER blended", t: "+0,3-0,8 pts", mt: "baseline", l: "TikTok aporta reach que Meta no toca" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.t}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.mt}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.l}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      <a href="https://influencermarketinghub.com/tiktok-ads-benchmark-report/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">El benchmark global 2026 de Influencer Marketing Hub para TikTok Ads</a> coincide en que el CPC y CPM siguen significativamente por debajo de Meta, pero la tasa de conversión post-click queda 30-50% por debajo. La conclusión operativa: TikTok no es para reemplazar Meta — es para sumar reach incremental cuando Meta empieza a saturar y CAC sube por encima del objetivo.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Formatos de TikTok Ads que mejor rinden para D2C</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Spark Ads con UGC de creadores micro/nano (1.000-50.000 followers): el formato de mayor rendimiento. CTR 50-100% superior a In-Feed estándar, CPA 20-35% más bajo. Razón: el contenido pasa el filtro 'esto no parece anuncio' del usuario y del algoritmo.",
        "Spark Ads con contenido orgánico propio de la marca: especialmente útil cuando la marca ya tiene presencia orgánica TikTok con publicaciones que han funcionado. Promocionar lo que ya validó el algoritmo orgánico es la jugada más rentable.",
        "In-Feed Ads producidos en estilo nativo: producción interna o agencia, pero con hook en los 2 primeros segundos, sin branding intrusivo, sin estética de spot publicitario. Sirve cuando no hay creadores disponibles.",
        "Collection Ads + Catalog: para D2C con catálogo >50 SKUs activos. Permite servir productos del feed Shopify dentro del anuncio, con sync automatizado vía DPA (Dynamic Product Ads).",
        "TopView (formato premium): solo para lanzamientos puntuales con presupuesto >15K€ y producto que justifique reach masivo en 24h. No es formato de adquisición continua.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">⚡ Métrica que importa antes de juzgar un creative TikTok</p>
      <p className="text-white/70 text-sm leading-relaxed">
        <strong className="text-white">Hook Rate</strong> (visualizaciones &gt;3 segundos / impresiones totales). Es la métrica de filtro nº1: por debajo del 25% el creative no escala. Por encima del 35% el creative tiene techo alto y conviene producir variantes. La mayoría de creatividades fallan en el segundo 1-2 — el problema casi nunca es el producto, es el primer frame.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Configuración técnica TikTok Pixel + Events API para Shopify</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La configuración mínima en 2026 para que TikTok optimice bien y EMQ supere 7/10:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "TikTok Pixel base instalado vía app oficial Shopify (TikTok for Business) o vía gestor de etiquetas (GTM) si la cuenta ya tiene arquitectura sGTM con Stape o GTM server-side.",
        "Events API server-side para los 5 eventos críticos: PageView, ViewContent, AddToCart, InitiateCheckout, CompletePayment. Deduplicación obligatoria por event_id para evitar doble conteo cliente-servidor.",
        "Advanced Matching activado con email hasheado (sha256), phone hasheado, external_id (customer_id de Shopify) y datos de billing — sube EMQ de 5/10 a 7-8/10 y baja CPA reportado entre 15-25%.",
        "Consent Mode adaptado a RGPD España: default denied, update tras consentimiento explícito en banner cookies. TikTok respeta el flag de Consent Mode v2 desde 2024.",
        "Custom Events para conversiones secundarias que importan al negocio: SubscriptionStart, UpsellAdded, BundlePurchased — alimentan al algoritmo con señales de mayor valor.",
        "Verificación final con TikTok Events Manager > Diagnostics: EMQ ≥7/10, deduplicación verde, eventos llegando con coverage >85%.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La arquitectura técnica del tracking es prácticamente idéntica a Meta CAPI — más detalle en <Link to="/blog/server-side-tracking-shopify-conversions-api" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">la guía de tracking server-side completo para Shopify</Link>. En cuentas DayByDay el mismo sGTM o Stape sirve a Meta, Google, TikTok y Pinterest en paralelo.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">TikTok Shop España: ¿activarlo o no para una D2C?</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      <a href="https://shop.tiktok.com/business/es" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">TikTok Shop está en expansión en España desde finales de 2024</a> y plantea una decisión estratégica delicada para D2C: visibilidad masiva a cambio de comisión + erosión del LTV. La regla operativa que aplicamos:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Perfil D2C</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">¿TikTok Shop?</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Razón</th>
          </tr>
        </thead>
        <tbody>
          {[
            { p: "AOV <35€, margen <45%", s: "❌ NO", r: "Comisión 5-12% rompe unit economics" },
            { p: "AOV 40-90€, margen 50-65%, marca con tracción orgánica TikTok", s: "✅ SÍ piloto 60d", r: "Sweet spot: visibilidad incremental + economics aceptable" },
            { p: "AOV >100€, marca premium, monetización por LTV vía email/SMS", s: "❌ NO", r: "Devalúa marca + rompe funnel directo a web propia" },
            { p: "Producto novedad/impulso, ticket bajo/medio, sin LTV alto", s: "✅ SÍ canal principal", r: "TikTok Shop encaja con comportamiento de compra impulsivo" },
            { p: "D2C suscripción/recurrencia (consumibles, suplementos)", s: "❌ NO", r: "TikTok no facilita modelo subscription nativo, pierdes datos cliente" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La decisión TikTok Shop sí/no se cruza siempre con el modelo de negocio, no con la oportunidad de visibilidad — más detalle de cómo separar adquisición vs retención en <Link to="/blog/cac-vs-ltv-ecommerce-escalable" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">CAC vs LTV en eCommerce escalable</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo medir si TikTok aporta incremental real o canibaliza Meta</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "MER blended antes vs después: medir MER (revenue total / spend total Meta+Google+TikTok) los 30 días previos a activar TikTok y los 30 posteriores. Subida ≥0,2 puntos = incremental real. Plano o bajada = canibalización pura.",
        "Holdout geo (cuentas >10K€/mes TikTok): apagar TikTok en una región (Cataluña o Madrid) durante 21-30 días y comparar caída de revenue total con la región control. Es el método más limpio.",
        "Conversion lift study nativo de TikTok: disponible para cuentas con >5K€/mes. TikTok divide audiencia expuesta vs control sin coste extra y reporta el lift incremental. Solo válido en spend sostenido.",
        "Post-purchase survey en checkout Shopify ('¿Dónde nos has descubierto?'): contraste cualitativo con la atribución de plataforma. Si TikTok atribuye 25% de conversiones pero la encuesta dice 8%, hay sobreatribución.",
        "Cohort de New Customers: revisar % de clientes nuevos (sin compra previa en últimos 365d) en TikTok vs Meta. Si TikTok tiene <50% New Customer rate y Meta tiene >70%, TikTok está cosechando warm de Meta.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Diagnóstico de readiness antes de activar TikTok: validamos saturación real de Meta (>15-20K€/mes con CAC estable), capacidad de producción creativa nativa (4-6 creatives/mes mínimo), salud TikTok Pixel + Events API y modelo de negocio para decidir TikTok Shop sí/no. Si una condición no se cumple, NO activamos — preparamos primero.",
        "Implementación Pablo + Jorge en paralelo: Pablo cierra estrategia de campañas, asset hub creativo, ROAS targets y briefing UGC; Jorge configura TikTok Pixel server-side via sGTM compartido con Meta CAPI, integración Shopify→TikTok Events API con deduplicación, sincronización Customer Match desde Klaviyo y dashboard Looker Studio con MER blended cruzando Meta+Google+TikTok.",
        "Pipeline UGC ad-hoc con creadores micro/nano españoles: en lugar de comprar creators caros, montamos pipeline con 6-10 creadores nano (1K-20K followers) por nicho, briefing semanal y revisión Hook Rate. Coste por creative producido baja a 80-200€ vs 600-1.500€ de agencia creative tradicional.",
        "Reporting MER-first, no ROAS-first: el dashboard que ve el cliente cada lunes muestra MER blended por canal y por semana, con anotaciones de cambios. El ROAS reportado de TikTok Ads se muestra en segundo plano porque sabemos que sobreatribuye 15-30% por modelo de atribución 7-day click + 1-day view.",
        "Holdout geo trimestral en cuentas >10K€/mes TikTok: apagamos TikTok en una región durante 21-30 días para medir incremental real sin depender de la atribución de plataforma. Es el único método que aguanta auditoría externa.",
        "Decisión TikTok Shop por unit economics, no por hype: si AOV<35€ y margen<45%, NO recomendamos activarlo aunque el CMO lo pida. Si AOV 40-90€ y marca con tracción orgánica, abrimos piloto de 60d y medimos canibalización del checkout web.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo (founder · paid media) lidera la estrategia TikTok, asset hub creativo, briefing de creadores y decisiones de ROAS target; Jorge (CTO · automation) lidera TikTok Events API server-side, deduplicación con Meta CAPI en sGTM compartido, sincronización Customer Match desde Klaviyo y dashboard Looker con MER blended cruzando Meta+Google+TikTok. Donde otras agencias separan paid TikTok del tracking server-side entre dos proveedores que rara vez se hablan, en DayByDay las decisiones de qué eventos pasar a TikTok, qué creadores producir y qué presupuesto cerrar se cierran en la misma reunión. El cliente habla con los dos socios desde la primera reunión: sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu cuenta D2C está lista para abrir TikTok Ads sin canibalizar Meta?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos saturación Meta, capacidad creativa nativa, salud TikTok Pixel+Events API, unit economics para decisión TikTok Shop y pipeline UGC. Te decimos si activar, si esperar o si reestructurar Meta primero.</p>
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
        <Link to="/blog/escalar-meta-ads" className="text-white font-semibold hover:text-white/80">
          Cómo escalar Meta Ads sin romper el ROAS →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cuándo Meta empieza a saturar y conviene abrir un canal incremental como TikTok</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/server-side-tracking-shopify-conversions-api" className="text-white font-semibold hover:text-white/80">
          Tracking server-side para Shopify con Conversions API →
        </Link>
        <p className="text-white/40 text-xs mt-1">Misma arquitectura sGTM para servir Meta, TikTok, Google y Pinterest en paralelo</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/ugc-meta-ads" className="text-white font-semibold hover:text-white/80">
          UGC en Meta Ads (y por qué es aún más crítico en TikTok) →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo montar pipeline de creadores nano y micro para alimentar Spark Ads</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/combinar-google-ads-meta-ads-d2c" className="text-white font-semibold hover:text-white/80">
          Cómo combinar Google Ads y Meta Ads en una D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Distribución óptima de presupuesto cuando se añade TikTok como tercer canal</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default TikTokAdsEcommerceD2cEspana2026Page;
