import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Por qué combinar email marketing y Meta Ads en una marca D2C en lugar de tratarlos como canales separados?",
    a: "Porque el LTV se construye en owned y la primera compra se compra en paid. Meta Ads adquiere clientes nuevos a un CAC que en 2026 ronda 35-65€ para D2C españolas de ticket medio (50-150€), pero la rentabilidad real del cliente solo aparece en la segunda y tercera compra: la primera compra raramente cubre CAC + margen + costes operativos. Email y SMS son los canales con mejor ROI directo (Klaviyo reporta una media de 36-45€ generados por cada 1€ invertido en flujos automatizados bien montados). Tratarlos como silos separados —una persona gestiona Meta, otra Klaviyo, sin compartir audiencias, eventos ni reporting— es la causa #1 por la que un D2C que escala spend Meta no escala beneficio. La integración correcta convierte cada compra Meta en input de un flujo email/SMS que dispara la segunda compra en 30-60 días, y devuelve a Meta audiencias enriquecidas (compradores LTV alto, recurrentes, churn risk) para alimentar lookalike y retargeting."
  },
  {
    q: "¿Qué flujos email son obligatorios para que la combinación con Meta Ads funcione en una D2C?",
    a: "Cinco flujos mínimos, sin excepción. (1) Welcome series 4-6 emails para suscriptores que llegan por lead magnet o pop-up — abre la relación y rescata 12-22% de conversión a primera compra en 14 días. (2) Abandoned cart 3 emails (1h, 24h, 48h) más SMS al T+24h cuando hay número — recupera 8-15% de carritos abandonados, dependiendo de ticket. (3) Browse abandonment 1-2 emails para productos vistos sin añadir al carrito — recupera 3-7% de visitas con intent. (4) Post-purchase / thank you 3-5 emails con onboarding del producto, cross-sell relacionado y solicitud de UGC/review — eleva la segunda compra en 60 días del 18% al 28-32%. (5) Winback 2-3 emails para clientes inactivos 90-180 días con código de regreso — reactiva 4-8% de la base inactiva. Sin estos cinco flujos, escalar Meta Ads es subir el CAC sin construir LTV: la cuenta crece en revenue pero baja en margen."
  },
  {
    q: "¿Cómo se sincroniza la lista de Klaviyo (o Mailchimp/Brevo) con audiencias de Meta para que el algoritmo aprenda con datos enriquecidos?",
    a: "Vía Customer File upload + integración nativa, no a mano. Klaviyo tiene integración nativa con Meta Ads que sincroniza segmentos como Custom Audiences cada 24h (compradores LTV >X, suscriptores activos 30d, churn risk 90d, etc.). Sobre esos Custom Audiences se construyen lookalike de alta calidad: la jerarquía que mejor rinde en D2C españolas es Lookalike de top 25% LTV > Lookalike de compradores 180d > Lookalike de carrito abandonado convertido > Lookalike de Customer File completo. Para Mailchimp/Brevo el flujo equivalente requiere export CSV manual o Zapier/n8n; cualquier marca >5K€/mes de Meta debería estar en Klaviyo o equivalente con integración nativa. La sincronización inversa —compradores Meta entrando automáticamente en flujos Klaviyo— se hace por webhook desde Shopify (event order_paid → Klaviyo Profile + tag fuente), no desde Meta. Sin esa sincronización bidireccional el algoritmo de Meta no se entrena con clientes de calidad y el email no segmenta por origen de adquisición."
  },
  {
    q: "¿Qué porcentaje de revenue debería venir de email/SMS vs Meta Ads en una D2C que escala bien?",
    a: "Depende del ciclo de compra y la madurez de la base. Patrón saludable en D2C españolas que hemos auditado en 2025-2026: año 1 con base de clientes <5.000, email/SMS aporta 8-15% del revenue total (mayor parte abandono carrito + welcome). Año 2 con base 10-30K compradores y flujos completos, email/SMS sube al 18-28% del revenue, con paid bajando del 70% al 55-60%. Año 3 con base 50K+ y suscripción/recompra trabajadas, email/SMS aporta 25-35% del revenue, y paid se mantiene en 50-55% para crecimiento. Si email aporta menos del 12% del revenue cuando la base ya supera 10K compradores, hay flujos rotos o inexistentes. Si aporta más del 35% sin haber escalado paid, el negocio está en sub-inversión publicitaria y dejando crecimiento en la mesa. La métrica que mejor resume la salud es MER blended (revenue total / spend marketing total): en D2C maduras debe estar entre 4 y 7."
  },
  {
    q: "¿Tiene sentido subir gente a Meta Ads desde una lista de email vs adquirir tráfico nuevo?",
    a: "Sí, con dos casos de uso muy concretos. (1) Reactivación de churn: subir como Custom Audience los compradores que llevan 90-180 días sin comprar y servirles secuencia retargeting Meta con oferta cross-sell o reposición — CPA 12-25€ vs 35-65€ de cliente nuevo, ROAS 4,5-7x vs 2,8-3,5x de prospecting. (2) Activación de suscriptores que no compraron: subir suscriptores con engagement email pero 0 compras (>21 días desde suscripción) y servirles creativo de social proof + oferta — CPA 20-30€, mejor que prospecting frío. Lo que NO tiene sentido es replicar a Meta toda la lista de email cuando ya están comprando bien con email/SMS: pagas por impactar a quien iba a comprar igualmente, inflando CAC reportado. La regla operativa: usa Meta para adquirir y para reactivar segmentos donde email/SMS ya falló (>14 días sin abrir). Para todo lo demás, email es más barato y convierte mejor."
  },
  {
    q: "¿Cómo se mide el incremental real de email + Meta Ads sin doble contar conversiones?",
    a: "Con tres capas y aceptando que la atribución exacta no existe. (1) Atribución de plataforma: Meta atribuye con su modelo (7d-click + 1d-view), Klaviyo atribuye conversiones a flujos por cookie/email match dentro de su ventana (típicamente 5 días). La suma siempre es mayor que el revenue real Shopify por doble atribución. (2) Atribución unificada en GA4 o Triple Whale/Northbeam con modelo data-driven: distribuye crédito entre touchpoints, reduce solapamiento al 8-15% pero sigue subjetivo. (3) Validación incremental: holdout test trimestral apagando flujos email a un 10% aleatorio de la base 4 semanas y midiendo diferencia revenue/comprador entre control y test. Para Meta, geo-experiments mensuales (apagar campañas en regiones de control). El número clave que usamos en DayByDay es MER blended (revenue total Shopify / spend marketing total) y revenue por suscriptor activo (RPS). Si el MER baja al subir spend Meta sin que el RPS suba en paralelo, el incremental real está por debajo del reportado y hay que reasignar."
  }
];

const EmailMarketingMetaAdsLtvD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Email marketing + Meta Ads: cómo combinar paid y owned para escalar LTV en D2C"
    description="Guía operativa de cómo combinar email marketing (Klaviyo) y Meta Ads en una D2C española para escalar LTV: 5 flujos email obligatorios, sincronización bidireccional Klaviyo↔Meta, jerarquía de Custom Audiences y lookalike, % revenue saludable email vs paid por madurez, casos donde subir lista a Meta sí compensa, medición incremental con MER blended y enfoque DayByDay."
    slug="email-marketing-meta-ads-ltv-d2c"
    datePublished="2026-05-07"
    dateModified="2026-05-07"
    readingTime="11 min"
    category="Estrategia"
    keywords={[
      "email marketing meta ads ecommerce",
      "klaviyo meta ads d2c",
      "ltv ecommerce españa",
      "paid owned d2c",
      "retención ecommerce d2c",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Email marketing y Meta Ads no compiten, se alimentan</strong>: Meta adquiere el cliente nuevo y email construye el LTV que hace rentable la cuenta. La mayoría de marcas D2C españolas con las que trabajamos en 2025-2026 siguen tratándolos como silos separados —una persona en Klaviyo, otra en Meta, sin audiencias compartidas ni reporting cruzado—, y eso es la causa #1 por la que un D2C escala revenue pero no margen. Este artículo explica cómo se combinan en operativa real: qué flujos email son obligatorios, cómo se sincronizan las listas con Custom Audiences y lookalike, qué porcentaje de revenue debería venir de cada canal según la madurez de la base, y cómo se mide el incremental real con MER blended.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Por qué owned (email/SMS) y paid (Meta Ads) son interdependientes en D2C</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Email marketing combinado con Meta Ads</strong> es la práctica de usar paid media como motor de adquisición y email/SMS como motor de retención y recompra, con sincronización bidireccional de audiencias y eventos para que cada canal alimente al otro. La primera compra de un cliente Meta raramente cubre CAC + margen + costes operativos: en D2C españolas con ticket 50-150€ y margen contribución 55-65%, el CAC Meta de 35-65€ deja al primer pedido en breakeven o ligera pérdida. La rentabilidad aparece en la segunda y tercera compra, y esa recompra la dispara email/SMS, no Meta.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      <a href="https://www.klaviyo.com/marketing-resources/ecommerce-email-marketing-statistics" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Klaviyo publica datos de ROI medio del email marketing</a> en eCommerce que sitúan los flujos automatizados (welcome, abandono, post-purchase) entre 36 y 45€ generados por cada euro invertido cuando están bien configurados. Ese ratio explica por qué founders que solo escalan Meta sin construir flujos owned se topan con un techo de margen: el revenue crece, el CAC blended se mantiene, pero el LTV/CAC no mejora porque no hay segunda compra automatizada.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según el <a href="https://www.statista.com/topics/1446/e-mail-marketing/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">informe de Statista sobre email marketing global</a>, el email marketing mantiene una tasa de retorno medio superior a la de la mayoría de canales digitales y crece año tras año en presupuesto B2C. Combinado con la <a href="https://business.adobe.com/blog/the-latest/marketing-automation-statistics" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">research de Adobe sobre marketing automation</a>, las marcas que integran flujos automatizados con campañas paid reportan +20-40% de LTV vs marcas que operan paid en silo. Para D2C españolas el efecto se amplifica porque el ticket medio (60-120€) requiere segunda compra para alcanzar payback período &lt;6 meses.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Los 5 flujos email obligatorios para combinar con Meta Ads</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Sin estos cinco flujos activos, escalar Meta Ads sube CAC sin construir LTV. Son el suelo mínimo en cualquier D2C &gt;10K€/mes de spend paid:
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Welcome series (4-6 emails, T+0/T+1d/T+3d/T+5d/T+7d/T+14d): captura suscriptores del pop-up o lead magnet. Objetivo: convertir 12-22% a primera compra en 14 días con descuento de bienvenida (10-15%) y posicionamiento de marca.",
        "Abandoned cart (3 emails: T+1h, T+24h, T+48h) + SMS T+24h cuando hay número: recupera 8-15% de carritos abandonados. Es el flujo de mayor ROI directo: 25-40€ generados por euro invertido en setup.",
        "Browse abandonment (1-2 emails: T+4h, T+24h) para productos vistos sin AddToCart. Recupera 3-7% de visitas con intent y alimenta retargeting Meta con audience qualified.",
        "Post-purchase (3-5 emails: T+0d/T+3d/T+10d/T+21d/T+45d): onboarding del producto, cross-sell relacionado, solicitud UGC/review, oferta segunda compra. Eleva tasa de segunda compra en 60 días del 18% al 28-32%.",
        "Winback (2-3 emails para inactivos 90-180 días: T+90d, T+150d, T+180d): código regreso, novedades catálogo, oferta agresiva final. Reactiva 4-8% de la base inactiva y feeds reactivación a Meta.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Sincronización Klaviyo ↔ Meta Ads: qué pasa por dónde</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La integración correcta es bidireccional y automatizada, no un export CSV mensual. <a href="https://help.klaviyo.com/hc/en-us/articles/115001531311" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">La integración nativa de Klaviyo con Meta Ads</a> sincroniza segmentos como Custom Audiences cada 24h. La jerarquía de Custom Audiences que mejor rinde en D2C españolas:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Segmento Klaviyo → CA Meta</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Uso en Meta</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">CPA esperado</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">ROAS esperado</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: "Compradores LTV top 25% (180d)", u: "Semilla LAL 1% prospecting", p: "30-50€", r: "3,5-5x" },
            { s: "Compradores 1 pedido 30-90d", u: "Retargeting cross-sell", p: "20-35€", r: "5-8x" },
            { s: "Suscriptores activos sin compra 21d", u: "Retargeting activación", p: "20-30€", r: "3-4,5x" },
            { s: "Inactivos 90-180d (winback)", u: "Retargeting reactivación", p: "12-25€", r: "4,5-7x" },
            { s: "Customer File completo (anti)", u: "Exclusión prospecting", p: "—", r: "—" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.u}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La sincronización inversa —cliente Meta entrando automáticamente en flujos Klaviyo— se hace por webhook Shopify (event order_paid → Klaviyo Profile + tag con fuente UTM) o por integración Shopify-Klaviyo nativa con paso de UTM en metadata. Sin esa parte, los flujos email no segmentan por canal de adquisición y pierdes capacidad de personalizar el welcome series con copy diferente para cliente Meta vs cliente Google vs cliente orgánico. Detalles operativos de las semillas LAL en la <Link to="/blog/audiencias-lookalike-meta-alta-calidad" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de audiencias lookalike de alta calidad</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cuándo subir lista de email a Meta y cuándo no</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Subir suscriptores email a Meta como Custom Audience tiene dos casos de uso claros y un anti-patrón frecuente. Casos válidos:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Reactivación de churn: subir compradores con 90-180 días sin compra y servir secuencia Meta con oferta cross-sell o reposición. CPA 12-25€ vs 35-65€ de cliente nuevo. ROAS 4,5-7x. Es el uso de mayor incremental medido.",
        "Activación de suscriptores que no han comprado: suscriptores con engagement email pero 0 compras tras 21 días. Servir creativo social proof + oferta de bienvenida ampliada. CPA 20-30€, supera a prospecting frío en cuentas con base >5K suscriptores activos.",
        "Anti-patrón: subir toda la lista email a Meta y servir las mismas creatividades que a frío. Pagas por impactar a quien iba a comprar por email igualmente, inflas CAC reportado y no añades incremental — el geo-test lo expone en 2-3 semanas.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">% de revenue saludable email vs Meta Ads según madurez de la base</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Madurez D2C</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Base compradores</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">% revenue email/SMS</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">% revenue paid (Meta+Google)</th>
          </tr>
        </thead>
        <tbody>
          {[
            { m: "Año 1 / lanzamiento", b: "<5.000", e: "8-15%", p: "65-75%" },
            { m: "Año 2 / crecimiento", b: "10-30K", e: "18-28%", p: "55-60%" },
            { m: "Año 3+ / madura", b: "50K+", e: "25-35%", p: "50-55%" },
            { m: "D2C suscripción/recompra alta", b: "20K+", e: "30-40%", p: "40-50%" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.b}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.e}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Si email/SMS aporta menos del 12% del revenue cuando la base ya supera 10K compradores, hay flujos rotos o inexistentes — empezar por auditar abandono de carrito y post-purchase. Si supera el 35% sin haber escalado paid, la marca está en sub-inversión publicitaria y dejando crecimiento sobre la mesa. La métrica que mejor resume la salud del mix es <strong className="text-white">MER blended</strong> (revenue total Shopify / spend marketing total): en D2C maduras españolas debe estar entre 4 y 7. Detalles de cómo calcularlo en la <Link to="/blog/cac-blended-vs-cac-canal-ecommerce" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de CAC blended vs CAC por canal</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo medir el incremental real sin doble contar</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Meta atribuye con 7d-click + 1d-view, Klaviyo atribuye flujos en su ventana (típicamente 5 días por cookie/email match), GA4 reparte con data-driven. La suma de los tres siempre supera el revenue real Shopify por doble atribución, en D2C españolas el solapamiento medio es del 18-30%. Tres capas para acercarse al incremental real:
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Atribución unificada en GA4, Triple Whale o Northbeam con modelo data-driven que distribuye crédito entre touchpoints. Reduce solapamiento al 8-15% pero sigue subjetivo.",
        "Holdout test trimestral apagando flujos email a un 10% aleatorio de la base durante 4 semanas, midiendo diferencia revenue/comprador entre control y test. Es el único método que aísla el lift real del email.",
        "Geo-experiments mensuales para Meta: apagar campañas en regiones de control durante 2-3 semanas y medir lift incremental en Shopify. Si Meta reporta ROAS 3,5 y geo-test confirma incremental 2,8x, ajustas presupuesto con dato real.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría conjunta paid + owned en los primeros 30 días: revisamos los 5 flujos email (welcome, carrito, browse, post-purchase, winback) en Klaviyo, configuración Custom Audiences sincronizadas con Meta, calidad de las semillas lookalike, segmentación por fuente UTM en flujos email y MER blended últimos 6 meses. La mayoría de cuentas que llegan tienen al menos 2 de los 5 flujos rotos o sin enviar.",
        "Implementación coordinada Pablo + Jorge: Pablo decide la jerarquía de segmentos Klaviyo que se sincronizan con Meta (qué Custom Audiences, qué exclusiones, qué semillas LAL); Jorge configura webhooks Shopify→Klaviyo para que cada compra entre con tag fuente UTM, integración Klaviyo↔Meta nativa, y dashboard Looker con MER blended por cohorte de adquisición. Es el tipo de pieza ad-hoc que separa a DayByDay de agencias playbook.",
        "Setup paralelo de los 5 flujos email obligatorios cuando faltan, con copy basado en review/UGC del cliente y A/B test de subject + first-line en cada email. Tiempo medio a primer flujo en producción: 5-7 días desde kickoff.",
        "Holdout test trimestral del email para validar incremental real: 10% de la base sale de flujos automatizados durante 4 semanas, medimos diferencia revenue/comprador. Si el incremental es <8% del revenue email reportado, los flujos están sub-optimizados y se reescriben.",
        "Dashboard Looker Studio mensual con MER blended por cohorte, % revenue email vs paid, CPA por audiencia Meta, LTV 90/180d por canal de adquisición y revenue por suscriptor activo (RPS). El founder ve en una pantalla si el mix paid+owned está sano o si hay que reasignar.",
        "Sin sorpresas legales: integración Consent Mode v2, suscripción con doble opt-in donde aplica, separación de bases marketing vs transaccional y filtrado por consent en sGTM antes de pasar eventos a Meta. RGPD y AEPD son baseline, no negociable.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo lidera paid media y la estrategia de mix paid+owned; Jorge (CTO) lidera la integración técnica entre Shopify, Klaviyo, sGTM y Meta. Donde otras agencias separan paid media y CRM/email entre dos proveedores que rara vez se hablan, en DayByDay las decisiones sobre qué segmentos sincronizar, qué flujos automatizar y qué incremental medir se cierran en la misma reunión: Pablo plantea el mix, Jorge valida cómo se cablea sin romper RGPD ni atribución. El cliente habla con los dos socios desde la primera reunión: sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu mix email + Meta Ads está dejando margen sobre la mesa?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos los 5 flujos email en Klaviyo (o equivalente), Custom Audiences sincronizadas con Meta, segmentación por fuente, MER blended últimos 6 meses y % revenue email vs paid por cohorte. Te decimos qué flujos faltan, qué Custom Audiences están mal montadas y cuánto LTV puedes recuperar en 60 días.</p>
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
        <Link to="/blog/cac-vs-ltv-ecommerce-escalable" className="text-white font-semibold hover:text-white/80">
          CAC vs LTV: la métrica que define si tu D2C es escalable →
        </Link>
        <p className="text-white/40 text-xs mt-1">La fórmula operativa LTV-180d / CAC blended y por qué la segunda compra es la que paga el negocio</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cohort-analysis-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Cohort analysis para eCommerce D2C: la métrica que predice si escalas →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo cruzar cohortes de adquisición Meta con recompra email para detectar canales sanos vs canales que solo dan revenue</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/audiencias-lookalike-meta-alta-calidad" className="text-white font-semibold hover:text-white/80">
          Audiencias lookalike en Meta de alta calidad para D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Jerarquía de semillas y cómo Klaviyo alimenta lookalike de top 25% LTV</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/retargeting-meta-ads-ecommerce-2026" className="text-white font-semibold hover:text-white/80">
          Retargeting en Meta Ads para eCommerce: guía completa 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">Escalera de 4 peldaños y cómo se cruzan con flujos email para evitar canibalización</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default EmailMarketingMetaAdsLtvD2cPage;
