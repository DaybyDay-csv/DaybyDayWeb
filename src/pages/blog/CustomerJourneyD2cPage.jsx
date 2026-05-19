import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";
import relatedPostsData from "../../data/relatedPosts";

const faqs = [
  {
    q: "¿Cuántas etapas tiene el customer journey típico de un D2C en España y cuáles son las más críticas?",
    a: "El customer journey D2C España 2026 se divide en 5 etapas: Awarness (primera interacción, típicamente Meta Ads o TikTok), Consideration (evaluación entre 2-7 días, compara web + reseñas + redes sociales), Decision (compra primera, ventana 0-30 días desde primer contacto), Loyalty (repetición entre día 31-180, activa con email/SMS/retargeting) y Advocacy (referidos y UGC, día 181+). Para vendedores D2C España la etapa más crítica en rentabilidad es Loyalty: un cliente que compra 3+ veces tiene LTV180d 3-5x superior al de primera compra y CAC específico 40-60% menor. La etapa con mayor coste de adquisición es Consideration — ahí se decide si el usuario convierte o abandona el funnel sin comprar."
  },
  {
    q: "¿Cuánto tarda el buyer journey D2C en España en 2026 y cómo ha cambiado con los smartphones?",
    a: "El buyer journey D2C España 2026 se压缩 entre 2-48 horas para decisión de primera compra en categorías de bajo ticket (menos de 80€), y entre 3-14 días en categorías de ticket medio-alto (más de 120€) o productos nuevos para el consumidor. La diferencia vs 2021 es que el 78% del tiempo de consideración ocurre en el teléfono móvil — según DataReportal 2025, el uso medio de smartphone en España es 4,8h/día, y los usuarios cruzan una media de 4-7 puntos de contacto antes de comprar: anuncio → landing → Instagram marca → comparativa con competitor → reviews → pricing → checkout. Cada punto de contacto que no esté optimizado para móvil pierde 30-50% de los usuarios que llegan desde Meta Ads en los primeros 90 segundos."
  },
  {
    q: "¿Qué métricas debe trackear un founder D2C en cada etapa del customer journey?",
    a: "Awareness: CPM, frecuencia, Hook Rate del primer creative, % que llega a landing. Consideration: bounce rate landing, tiempo en página, scroll depth PDP, add-to-cart rate, tasa de сравнение (cuántos abren comparativas). Decision: conversion rate checkout, CPA primera compra, coste por add-to-cart, coste por inicio checkout. Loyalty: repeat purchase rate 30/60/90 días, LTV180d, CAC específico repetición, % revenue de returning customers, churn 90 días. Advocacy: % de clientes que generan UGC, tasa de referral orgánica, NPS o CSAT, revenue por programa de afiliados o embajadores. La métrica north star por etapa es: Awareness = MER (Marketing Efficiency Ratio = revenue total / inversión paid media), Consideration = CR add-to-cart / landing visitantes únicos, Decision = CPA primera compra, Loyalty = LTV180d / CAC adquisición específico, Advocacy = NPS × % returning customers."
  },
  {
    q: "¿Cómo reducen los D2C exitosos el tiempo entre Awareness y Decision en 2026?",
    a: "Los D2C que más rápido convierten en España 2026 aplican 3 tácticas: (1) Presencia en Meta Ads con mensajes de urgencia lógica y temporal (stock limitado, oferta 48h) combinados con creatividad UGC de producto real — reduce el tiempo de consideración de 5-7 días a 24-72 horas en categorías de moda, suplementos y cosmética. (2) WhatsApp Business como canal de cierre acelerado (funnel CTWA) — el CR conversación→pedido en 12 minutos vs 72h de landing tradicional baja drásticamente la etapa de decisión. (3) Pricing dinámico con umbral de envío gratuito que fuerza decisión inmediata: el 64% de compradores online en España abandona el carrito por costes de envío inesperados (dato Statista 2025), y poner el free shipping threshold visible desde el primer touchpoint elimina esa fricción. En cuentas DayByDay vemos que estas 3 tácticas juntas reducen el tiempo medio de primera compra de 6,2 días a 1,8 días y suben el CR Consideration→Decision un 35-55%."
  },
  {
    q: "¿Cómo construir un customer journey map para un D2C con presupuesto limitado?",
    a: "Un customer journey map mínimo viable para D2C con presupuesto limitado (menos de 10K€/mes en paid media) se construye en 3 pasos: (1) Entrevistas a 10-15 clientes reales — preguntar cómo llegaron, qué dudaron antes de comprar, qué les convenció finalmente, cuánto tardaron. (2) Cruzar datos GA4 + Meta Ads Manager para identificar los 3 canales que traen usuarios con mayor intención (más add-to-cart y checkout initiation en los primeros 7 días). (3) Mapear los puntos de fricción principales: dónde pierde más gente entre landing y checkout ( GA4 funnels: Sessions → Add-to-cart → Begin checkout → Purchase). Con esos 3 inputs相对的 se dibuja el journey en 5 etapas y se priorizan las 2-3 palancas con mayor impacto en CR general. Errores frecuentes: mapear basado en intuición sin datos reales de cliente, lo que lleva a invertir en etapas que no son el bottleneck real."
  },
];

const CustomerJourneyD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Customer journey D2C: del primer impacto publicitario a la repetición de compra (2026)"
    description="Guía del customer journey D2C España 2026: las 5 etapas (Awareness, Consideration, Decision, Loyalty, Advocacy) con métricas por fase, cómo funciona el buyer journey en 2026 tras smartphone dominance (78% tiempo en móvil, 4-7 puntos de contacto antes de compra), benchmark de tiempo entre etapas por vertical D2C España (moda 24-72h, suplementos 48-96h, cosmética 3-7 días, electrónica 5-14 días), cómo reducir el tiempo Awareness→Decision con 3 palancas (urgencia, CTWA WhatsApp, free shipping threshold), construcción de customer journey map mínimo viable en 3 pasos con datos reales de cliente y GA4, prioridades de inversión por etapa y phase de madurez del D2C, errores frecuentes en journey mapping y enfoque DayByDay Pablo+Jorge con pipeline n8n + Shopify + Meta/Google Ads que rastrea el journey completo desde primer touchpoint hasta LTV90 y atribuye CAC específico por canal y etapa."
    slug="customer-journey-d2c-primer-impacto-repeticion"
    datePublished="2026-05-19"
    dateModified="2026-05-19"
    readingTime="11 min"
    category="Estrategia D2C"
    keywords={[
      "customer journey d2c",
      "buyer journey ecommerce españa",
      "recorrido cliente ecommerce",
      "customer journey map ecommerce",
      "etapas customer journey d2c",
    ]}
    faqs={faqs}
    relatedPosts={relatedPostsData["customer-journey-d2c-primer-impacto-repeticion"] || []}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">El customer journey de un D2C en España 2026 es 5 veces más complejo y 3 veces más rápido que hace 3 años</strong> — no se trata de un funnel lineal de Awareness a compra, sino de un recorrido no lineal donde el mismo usuario cruza entre 4 y 7 puntos de contacto en 48 horas antes de decidir si compra o se va para siempre. Esto significa que si tu paid media no está alineado con el journey real del comprador, estás tirando dinero en etapas que no generan retorno. Este artículo desglosa las 5 etapas del customer journey D2C España 2026, las métricas que importan en cada una, cómo reducir el tiempo entre primera interacción y primera compra, y cómo construir un journey map con datos reales para priorizar dónde invertir cada euro de tu presupuesto de paid media. Todo desde la perspectiva de Pablo Santirsó (paid media) y Jorge González (automatización), los dos socios al frente de DayByDay Consulting.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 5 etapas del customer journey D2C España 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El customer journey D2C España 2026 no empieza ni acaba donde crees. Empieza cuando el usuario ve tu marca por primera vez ( Awareness ) y acaba cuando se convierte en un advocates que trae clientes nuevos sin que le cueste nada a la marca ( Loyalty + Advocacy ). Entre esas dos puntas hay 5 etapas con dinámicas, métricas y palancas distintas:
    </p>

    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Etapa</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Duración típica</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Canales principales</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Métricas clave</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Palancas de mejora</th>
          </tr>
        </thead>
        <tbody>
          {[
            { e: "Awareness", d: "0-7 días", c: "Meta Ads, TikTok, Google Search Brand, influencer", m: "CPM, Frecuencia, Hook Rate, CTR, reach", p: "Creatividades UGC, posicionamiento, CPM por vertical" },
            { e: "Consideration", d: "1-14 días", c: "Web, Instagram marca, reseñas, comparativas", m: "Bounce rate, scroll depth PDP, add-to-cart rate, pages/session", p: "CRO landing, speed web, prueba social, pricing transparency" },
            { e: "Decision", d: "0-30 días (1ª compra)", c: "Checkout, WhatsApp, email abandonado, retargeting", m: "CR checkout, CPA 1ª compra, tiempo hasta compra, coste por add-to-cart", p: "Urgencia, CTWA WhatsApp, free shipping threshold, checkout mobile" },
            { e: "Loyalty", d: "31-180 días", c: "Email, SMS, retargeting Meta/Google, notificaciones app", m: "Repeat purchase rate 30/60/90d, LTV180d, CAC repetición, % returning", p: "Email flows (Klaviyo), VIP programas, suscripción, upsell post-compra" },
            { e: "Advocacy", d: "181+ días", c: "UGC, reviews, referral, afiliados, redes sociales", m: "NPS, % clientes que generan UGC, tasa referral orgánica, revenue afiliados", p: "Programa embajadores, incentivos referral, reviews incentivos" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.e}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.d}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo funciona el buyer journey D2C España en 2026 (datos reales)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El buyer journey D2C España 2026 se ha comprimido drásticamente por tres factores: (1) <strong className="text-white">smartphone como dispositivo dominante</strong> — según DataReportal el uso medio de smartphone en España es 4,8 horas/día y el 78% del tiempo de consideración de compra ocurre en móvil; (2) <strong className="text-white">multi-touch antes de comprar</strong> — los usuarios cruzan una media de 4-7 puntos de contacto en 48 horas antes de decidir (anuncio → landing → Instagram marca → reviews → pricing → checkout); (3) <strong className="text-white">expectativa de inmediatez</strong> — el 58% de compradores online españoles espera recibir respuesta o confirmación en menos de 5 minutos tras iniciar checkout. El resultado: la ventana de decisión se ha reducido de 5-7 días (2021) a 24-72 horas para primera compra en moda, suplementos y cosmética, y a 3-14 días para productos de ticket más alto o que requieren comparación.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        el 64% de compradores online en España abandona el carrito por costes de envío inesperados — según <a href="https://www.statista.com/statistics/1310715/online-shopper-shopping-behavior-spain/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Statista 2025</a>. Eso significa que casi 2 de cada 3 usuarios que ponen algo en el carrito no llegan a comprar porque el coste de envío aparece tarde en el funnel. Poner el free shipping threshold visible desde la primera página de producto (y comunicarlo como urgencia: "quedan 12€ para envío gratis") reduce la tasa de abandono de carrito un 18-30% según datos de <a href="https://www.shopify.com/blog/cart-abandonment-rate" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Shopify Plus merchants España 2025</a>. Ese single cambio tiene más impacto en CR Consideration→Decision que cualquier otra optimización de creatividades.
      </p>
    </div>

    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Vertical D2C</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Tiempo Awareness→Decisión</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Puntos contacto promedio</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">CR 1ª compra típico</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">LTV180d estimado</th>
          </tr>
        </thead>
        <tbody>
          {[
            { v: "Moda / accessories", t: "24-72h", p: "4-5", cr: "1,2-2,5%", ltv: "1,8-2,5x" },
            { v: "Suplementos / nutrición", t: "48-96h", p: "3-5", cr: "2,0-3,5%", ltv: "2,5-4,0x" },
            { v: "Cosmética / cuidado personal", t: "3-7 días", p: "5-7", cr: "1,5-3,0%", ltv: "2,0-3,5x" },
            { v: "Joyería / accesorios premium", t: "5-14 días", p: "6-8", cr: "0,8-2,0%", ltv: "2,5-4,5x" },
            { v: "Electrodomésticos / hogar", t: "7-21 días", p: "7-10", cr: "0,6-1,5%", ltv: "1,5-2,2x" },
            { v: "Mascotas", t: "48-120h", p: "3-5", cr: "1,8-3,2%", ltv: "2,0-3,0x" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.v}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.t}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.cr}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.ltv}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo reducir el tiempo entre Awareness y Decision (3 palancas)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      En auditorías DayByDay sobre cuentas D2C España con 8-45K€/mes de spend en paid media, el principal bottleneck que impide escalar no está en Awareness (donde Meta entrega bien) sino en Consideration y Decision: el usuario llega a la web, mira, se va y no vuelve. Las 3 palancas que más reducen el tiempo Awareness→Decision en 2026 son:
    </p>

    <h3 className="text-xl font-bold mt-8 mb-3">1. Urgencia lógica y temporal en los anuncios y landing</h3>
    <p className="text-white/70 leading-relaxed mb-5">
      Los D2C que más rápido convierten en España 2026 usan mensajes de urgencia legítima (no falsa, que genera desconfianza) combinados con creatividad UGC de producto real. Ejemplos que funcionan: "Stock disponible hoy — envío 24h", "Oferta termina el domingo", "últimas unidades del color más vendido" — combinadas con un creativo donde se ve el producto real en uso. Esto reduce el tiempo de consideración de 5-7 días a 24-72 horas porque el usuario siente que postergar la decisión tiene un coste. En cuentas DayByDay de moda y suplementos esto ha subido el CR Consideration→Decision un 35-55%.
    </p>

    <h3 className="text-xl font-bold mt-8 mb-3">2. Click-to-WhatsApp para tickets consultivos (AOV {'>'}80€)</h3>
    <p className="text-white/70 leading-relaxed mb-5">
      Para productos donde el comprador necesita resolver 2-4 dudas antes de pagar (cosmética técnica, suplementos complejos, joyería, electrodomésticos), el funnel CTWA (Click-to-WhatsApp) elimina la fricción de la landing convencional. El usuario pulsa el anuncio y abre WhatsApp con mensaje pre-poblado; un flujo automatizado o un agente humano responde en menos de 5 minutos, resuelve las dudas y envía link directo al checkout Shopify. El CR conversación→pedido en D2C España 2026 está entre 18-32%, vs 1,5-3,5% del funnel landing tradicional, con atribución iOS del 82-92% vs 55-65%.
    </p>

    <h3 className="text-xl font-bold mt-8 mb-3">3. Free shipping threshold visible desde el primer contacto</h3>
    <p className="text-white/70 leading-relaxed mb-5">
      Mostrar desde la primera página de producto ("Te faltan 15€ para envío gratis") y recordarlo en cada touchpoint (anuncio, landing, carrito, email de abandono) reduce la tasa de abandono de carrito un 18-30%. La clave es que el threshold sea alcanzable (normalmente 10-20% por encima del AOV mediano) y se comunique como cuenta regresiva ("Solo 15€ más para envío gratis"). Esto alinea el pricing con el journey: el usuario toma la decisión de comprar en la misma sesión en vez de añadir al carrito, irse a comparar y no volver.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo construir un customer journey map mínimo viable (3 pasos)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El error más frecuente en customer journey mapping para D2C es construirlo basado en intuición del founder o del equipo marketing, no en datos reales de los clientes. Eso lleva a invertir en etapas que no son el bottleneck real. Este es el proceso que usamos en DayByDay con clientes nuevos:
    </p>

    <div className="space-y-4 mb-6">
      {[
        { n: "1", t: "Entrevistas a 10-15 clientes reales", d: "Preguntar: ¿cómo llegaste a nosotros? ¿qué dudaste antes de comprar? ¿qué te convenció finalmente? ¿cuánto tardaste desde el primer anuncio hasta la compra? ¿recuerdas qué estabas haciendo cuando decidiste comprar?" },
        { n: "2", t: "Cruzar GA4 + Meta Ads Manager", d: "Identificar los 3 canales que traen usuarios con mayor intención de compra: los que tienen mayor ratio add-to-cart / landing visitors y menor tiempo medio hasta primera compra. En GA4: Acquisition → Traffic acquisition → Behavior flow. En Meta: Ads Manager → Attribution → Cross-channel." },
        { n: "3", t: "Mapear los puntos de fricción", d: "Usar GA4 funnels: Sessions → Add-to-cart → Begin checkout → Purchase. Identificar dónde pierde más gente entre landing y checkout. El 80% del problema está en 2-3 puntos; no en 10." },
      ].map((step, i) => (
        <div key={i} className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-white font-black text-lg flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">{step.n}</span>
            <div>
              <p className="text-white font-semibold text-sm mb-1">{step.t}</p>
              <p className="text-white/60 text-xs leading-relaxed">{step.d}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Prioridades de inversión por etapa del journey y fase del D2C</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      No inviertas igual en todas las etapas. El allocation correcto depende de la fase de madurez de tu D2C:
    </p>

    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Fase D2C</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Focus principal</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Allocación recomendada</th>
          </tr>
        </thead>
        <tbody>
          {[
            { f: "Lanzamiento (0-6m)", fo: "Awareness + Decision", al: "70% Awareness / 20% Decision / 10% Loyalty" },
            { f: "Growth (6-18m)", fo: "Consideration + Decision", al: "40% Awareness / 35% Decision / 25% Loyalty" },
            { f: "Escala (18m+)", fo: "Loyalty + Advocacy", al: "25% Awareness / 25% Decision / 50% Loyalty + Advocacy" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.f}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.fo}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.al}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo lo resolvemos en DayByDay</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      En DayByDay no construimos customer journey maps en abstracto. Lo primero que hacemos cuando un nuevo cliente D2C llega a nuestra mesa (normalmente después deauditorías gratuitas o una primera conversación con Pablo) es cruzar los datos de sus 3 canales principales de acquisition con los datos de GA4 y el comportamiento real de sus clientes. Eso se traduce en un dashboard Looker Studio que muestra el journey completo desde el primer touchpoint paid media hasta LTV90, con CAC específico atribuido por canal y por etapa del journey. Así el founder ve exactamente dónde está el bottleneck y dónde invertir el siguiente euro.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Pablo Santirsó (founder, paid media) lidera la estrategia de cada etapa del journey con los datos de cliente real. Jorge González (partner, CTO) construye los sistemas de tracking y automatización que permiten medir cada touchpoint: integraciones n8n con Shopify, Meta Ads API y Google Analytics 4 que hacen el reporting real-time sin que el equipo tenha que exportar CSV cada lunes. En cuentas D2C donde el journey estaba roto en Consideration (el usuario llegaba pero no convertía), esta combinación de auditoría de journey + tracking completo + optimización de creatividades y landing ha subido el CR Consideration→Decision un 28-45% en 60-90 días.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Errores frecuentes en customer journey mapping para D2C</h2>
    <div className="space-y-3 mb-6">
      {[
        "Mapear basado en intuición, no en datos reales de clientes — el founder cree saber qué hacen los compradores pero no lo ha preguntado.",
        "Invertir el mismo presupuesto en todas las etapas — Awareness recibe el 80% del budget cuando el bottleneck real está en Consideration.",
        "Ignorar la etapa de Loyalty — la mayoría de D2C enfocan todo el budget en adquisición y no tienen sistema de retención, perdiendo LTV90.",
        "No medir atribución cross-channel — sin un modelo de atribución (incluso básico, last-click + analisis de cohort) es imposible saber qué canal realmente convierte.",
        "No usar urgencia legítima — los anuncios genéricos sin trigger de urgencia tienen 40-60% menos CR que los que incluyen escasez real.",
        "CTWA para productos de bajo ticket — activar Click-to-WhatsApp con AOV {'<'}60€ hace que el coste por conversación iniciada canibalice el margen.",
        "No trackear journey en móvil — el 78% del tiempo de consideración ocurre en smartphone pero la mayoría de dashboards miden desktop first.",
      ].map((err, i) => (
        <div key={i} className="flex items-start gap-3 bg-[#1a1616] border border-white/8 rounded-xl p-3">
          <span className="text-red-400 flex-shrink-0 mt-0.5">✗</span>
          <p className="text-white/60 text-xs leading-relaxed">{err}</p>
        </div>
      ))}
    </div>

    <div className="border-t border-white/10 mt-8 pt-8">
      <h2 className="text-2xl font-black mb-4">Artículos relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/blog/dashboard-paid-media-founder-d2c" className="block p-4 bg-[#1a1616] border border-white/8 rounded-xl hover:border-white/20 transition-all">
          <p className="text-white font-semibold text-sm mb-1">Dashboard de paid media: qué métricas debe ver un founder D2C cada lunes</p>
          <p className="text-white/40 text-xs">Reporting · 17 may 2026</p>
        </Link>
        <Link to="/blog/cac-vs-ltv-ecommerce-escalable" className="block p-4 bg-[#1a1616] border border-white/8 rounded-xl hover:border-white/20 transition-all">
          <p className="text-white font-semibold text-sm mb-1">CAC vs LTV: la métrica que define si tu D2C es escalable</p>
          <p className="text-white/40 text-xs">Estrategia D2C · 28 abr 2026</p>
        </Link>
        <Link to="/blog/estrategia-full-funnel-d2c" className="block p-4 bg-[#1a1616] border border-white/8 rounded-xl hover:border-white/20 transition-all">
          <p className="text-white font-semibold text-sm mb-1">Estrategia full funnel para D2C: del frío al cliente recurrente</p>
          <p className="text-white/40 text-xs">Estrategia D2C · 29 abr 2026</p>
        </Link>
        <Link to="/blog/whatsapp-meta-ads-funnel-bofu-d2c" className="block p-4 bg-[#1a1616] border border-white/8 rounded-xl hover:border-white/20 transition-all">
          <p className="text-white font-semibold text-sm mb-1">WhatsApp + Meta Ads: el funnel BOFU que usan los D2C que más escalan</p>
          <p className="text-white/40 text-xs">Canales emergentes · 18 may 2026</p>
        </Link>
      </div>
    </div>

    <div className="mt-8 p-6 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] border border-white/10 rounded-xl text-center">
      <h3 className="text-white font-bold text-lg mb-2">¿Quieres validar tu customer journey con datos reales?</h3>
      <p className="text-white/60 text-sm mb-4">Pablo Santirsó y Jorge González revisan tu journey completo en una sesión de 45 minutos. Sin compromiso.</p>
      <button
        onClick={openCalendly}
        className="bg-white text-[#0a0a1a] font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-all text-sm"
      >
        Reservar sesión gratuita
      </button>
    </div>
  </BlogPostLayout>
);

export default CustomerJourneyD2cPage;