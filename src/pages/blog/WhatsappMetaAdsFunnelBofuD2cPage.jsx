import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es un funnel WhatsApp + Meta Ads para D2C y por qué funciona en BOFU?",
    a: "Un funnel WhatsApp + Meta Ads para D2C combina campañas Click-to-WhatsApp en Meta Ads (CTWA) con flujos conversacionales en WhatsApp Business Platform para cerrar la venta vía mensajes 1:1. Funciona en BOFU porque elimina la fricción de la landing convencional para tickets medios-altos (\u003e80€), productos consultivos (suplementos, cosmética técnica, electrodomésticos, suscripciones) o mercados donde el comprador necesita resolver 2-4 dudas antes de comprar. El click envía al usuario directo a una conversación pre-poblada en WhatsApp, donde un flujo automatizado o un agente humano responde en <5 minutos, califica intención y empuja al checkout Shopify con link de pago directo. En cuentas D2C España 2026 vemos CR conversación→pedido entre 18-32%, vs 1,5-3,5% de CR landing→purchase tradicional, con CPA 20-40% menor en categorías de alto AOV."
  },
  {
    q: "¿Qué AOV mínimo justifica activar un funnel WhatsApp + Meta Ads en D2C?",
    a: "El umbral operativo para que el funnel CTWA rinda económicamente es AOV ≥80€ con margen contribución ≥30%, o ticket recurrente (suscripción) con LTV90 ≥120€. Por debajo de 80€ AOV el coste de conversación humana (4-12 min/cliente × salario operador) erosiona el margen y conviene que el flujo sea 100% automatizado. Verticales donde lo vemos rentable: suplementos AOV 60-110€ con suscripción, cosmética técnica AOV 75-140€, joyería/relojería AOV 120-450€, electrodomésticos AOV 180-700€, formación digital y memberships AOV 90-350€. En verticales con AOV <50€ (alimentación premium dosis única, accesorios baratos) el funnel WhatsApp suele canibalizar conversiones del checkout estándar sin aportar margen incremental."
  },
  {
    q: "¿Cuánto cuesta arrancar WhatsApp Business Platform + Click-to-WhatsApp y qué proveedor elegir?",
    a: "El coste total de arranque para D2C España 2026 es 600-1.800€ setup + 200-800€/mes operación según volumen de conversaciones. Componentes: WhatsApp Business Platform vía un BSP oficial (Meta cobra tarifas por conversación según país: España 0,06€ marketing-iniciada, 0,03€ utility, 0,01€ service-iniciada por usuario), plataforma conversacional (Twilio 0,005-0,012€/mensaje, 360dialog 25-50€/mes + tarifa por conversación, Respond.io 79-249$/mes con CRM integrado, MessageBird 50-150€/mes), integración con Shopify para inventario y links de pago (vía app Shopify Plus o webhook custom), y opcionalmente Klaviyo/HubSpot para CRM. La trampa es contratar plataformas conversacionales generalistas (Intercom, Zendesk) que no están optimizadas para WhatsApp comercial; Respond.io, MessageBird y 360dialog son las recomendadas para D2C eCommerce europeos."
  },
  {
    q: "¿Cuál es el CR realista de un funnel WhatsApp + Meta Ads vs un funnel landing tradicional?",
    a: "En cuentas D2C España 2026 con AOV ≥80€ y respuesta <5 min, el CR conversación iniciada → pedido cerrado se mueve entre 18-32%, vs 1,5-3,5% de CR landing→purchase tradicional sobre la misma campaña Meta Ads. El truco está en el denominador: en CTWA el coste por conversación iniciada (CPC equivalente) suele ser 2-3x más caro que un click a landing (CPM similar, pero CTR de click-to-WhatsApp 30-50% inferior por fricción de cambiar de app), por lo que el margen real entre CPA WhatsApp vs CPA landing es 20-40% en favor del funnel WhatsApp solo cuando el ticket lo soporta. Para AOV <60€ el funnel landing optimizado con Apple Pay/Bizum suele ganar; para AOV \u003e120€ con producto consultivo el WhatsApp gana siempre. Métrica north star: revenue por conversación iniciada (RPC) ≥ CPA objetivo × CR esperado."
  },
  {
    q: "¿Qué errores frecuentes ve DayByDay en funnels WhatsApp + Meta Ads de D2C españoles?",
    a: "Los 6 errores más frecuentes en auditorías 2025-2026: (1) Activar CTWA sin equipo de respuesta en <5 min — el lead se enfría y el CR cae del 25% al 6% si la primera respuesta tarda más de 10 minutos. (2) Mensaje pre-poblado genérico tipo 'Hola, quiero info' sin contexto del producto del anuncio — pierde tasa de respuesta humana 40-60%. (3) Conversación que termina en 'visita nuestra web' en lugar de cerrar con link de pago directo (Shopify checkout con prellenado producto/cantidad/cupón). (4) Sin sincronización CAPI Meta — los pedidos cerrados vía WhatsApp no se atribuyen al ad creative y Meta optimiza ciego, subiendo CPA 25-45%. (5) Mismo flujo para frío y warm — el cold debe educar 2-3 mensajes antes de pedir compra; el warm va directo al carrito. (6) Sin Consent Mode v2 + opt-in expreso WhatsApp marketing — multas AEPD 30K-300K€ por marketing iniciada sin opt-in válido. Resolver estos 6 puntos suele subir CR conversación→pedido del 8-12% al 22-30% en 60-90 días."
  },
  {
    q: "¿Es compatible Click-to-WhatsApp con el iOS 17/18 SKAdNetwork y la atribución Meta de 2026?",
    a: "Sí, CTWA es uno de los formatos menos afectados por el SKAdNetwork de iOS 17/18 porque la conversión ocurre dentro de la app de WhatsApp (propiedad de Meta), no en un dominio externo de marca. Meta cierra el loop atribución vía Conversions API for WhatsApp (CAPI específico para CTWA), permitiendo enviar eventos de conversación iniciada, mensaje cliente respondido, lead cualificado y purchase con event_id deduplicado entre pixel web (checkout Shopify) y CAPI WhatsApp. La cobertura atribución en iOS sube del 55-65% típico de funnels web a 82-92% en funnel CTWA bien configurado. Eso convierte CTWA en una palanca defensiva contra la pérdida de señal iOS, especialmente en cuentas D2C españolas con \u003e60% tráfico iOS donde Meta optimiza peor por falta de eventos web atribuidos."
  }
];

const WhatsappMetaAdsFunnelBofuD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="WhatsApp + Meta Ads: el funnel BOFU que usan los D2C que más escalan (2026)"
    description="Guía operativa del funnel Click-to-WhatsApp (CTWA) + Meta Ads para eCommerce D2C España 2026: qué es un funnel WhatsApp + Meta Ads y cuándo activarlo (AOV ≥80€, margen ≥30%, ticket consultivo), CR conversación→pedido realista 18-32% vs 1,5-3,5% landing tradicional, comparativa coste-beneficio 4 BSPs (Twilio, 360dialog, Respond.io, MessageBird) con tarifas Meta por país, arquitectura técnica end-to-end (CTWA + WhatsApp Business Platform + Shopify checkout pre-llenado + CAPI for WhatsApp), 4 plantillas de flujo conversacional por intent (cold educativo, warm cierre directo, abandono carrito, post-purchase recurrencia), tabla decisión AOV vs flujo automatizado vs operador humano por vertical D2C, por qué CTWA es palanca defensiva contra la pérdida de señal iOS 17/18 (atribución 82-92% vs 55-65% web), 6 errores frecuentes en cuentas D2C españolas (sin respuesta <5min, sin sync CAPI, sin opt-in AEPD, mensaje genérico), enfoque DayByDay Pablo+Jorge con pipeline n8n + Shopify Admin API + Meta Marketing API + Twilio/Respond.io que cruza conversación × pedido × cohorte LTV90 y atribuye CAC adquisición específico por flujo WhatsApp."
    slug="whatsapp-meta-ads-funnel-bofu-d2c"
    datePublished="2026-05-18"
    dateModified="2026-05-18"
    readingTime="11 min"
    category="Canales emergentes"
    keywords={[
      "whatsapp meta ads ecommerce",
      "click to whatsapp ads",
      "ctwa meta ads d2c",
      "funnel whatsapp ecommerce",
      "whatsapp business platform shopify",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">El funnel WhatsApp + Meta Ads es la palanca BOFU con mayor lift de conversión en D2C España 2026 para tickets {'>'}80€, productos consultivos y mercados con alta penetración iOS</strong> — donde la landing tradicional pierde por fricción de checkout o por pérdida de señal SKAdNetwork. Hablamos de campañas Click-to-WhatsApp (CTWA) en Meta Ads que envían el click directo a una conversación pre-poblada en WhatsApp Business Platform, con flujo automatizado o agente humano que cierra la venta vía link de pago Shopify en 4-12 minutos. En auditorías DayByDay 2025-2026 vemos CR conversación→pedido del 18-32% vs 1,5-3,5% de CR landing→purchase tradicional, con CPA 20-40% menor para AOV ≥120€ y atribución iOS del 82-92% vs 55-65% del funnel web equivalente. Esta guía recorre cuándo activarlo, qué stack montar, qué flujos servir por intent y los 6 errores que cargan al funnel antes de los primeros 1.000 pedidos.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es un funnel WhatsApp + Meta Ads (definición operativa)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Un <strong className="text-white">funnel WhatsApp + Meta Ads</strong> es una arquitectura de paid media donde la campaña Meta Ads usa el formato Click-to-WhatsApp (CTWA) — el CTA del anuncio abre WhatsApp con un mensaje pre-poblado dirigido al WhatsApp Business Platform de la marca — y la conversión ocurre dentro de la conversación: el flujo automatizado o el operador humano califica intención, resuelve dudas y cierra venta con un link de pago Shopify pre-llenado. Sustituye o complementa al funnel web (anuncio → landing/PDP → checkout) y se usa principalmente en BOFU para tickets consultivos donde la decisión necesita 2-4 turnos de conversación antes del pago.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según <a href="https://www.facebook.com/business/m/click-to-message-ads" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Meta for Business</a>, los anuncios de mensajes click-to-conversation son uno de los formatos con mayor crecimiento global y particularmente fuertes en mercados con alta penetración WhatsApp (España, LATAM, India, Italia). El <a href="https://datareportal.com/reports/digital-2025-spain" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">informe Digital 2025 Spain de DataReportal</a> indica que WhatsApp tiene 36 millones de usuarios activos mensuales en España (88% de la población de internet), siendo la app de mensajería dominante por más de 35 puntos sobre la siguiente. Eso convierte CTWA en el formato Meta con menor fricción para BOFU en este mercado. En auditorías DayByDay sobre cuentas D2C España con AOV ≥100€, el funnel CTWA bien configurado supera al funnel web en CPA el 65-75% de los casos cuando producto es consultivo, y empata o pierde el 25-35% restante en categorías de bajo ticket o compra impulsiva.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cuándo activar CTWA y cuándo no (decisión por AOV y vertical)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      No todos los D2C ganan con CTWA. El umbral operativo combina AOV, margen contribución y grado de consulta del producto. Esta tabla resume cuándo conviene activar y qué flujo servir según vertical:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Vertical D2C</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">AOV típico</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Encaje CTWA</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Flujo recomendado</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">CR esperado conv→pedido</th>
          </tr>
        </thead>
        <tbody>
          {[
            { v: "Suplementos / nutrición", a: "60-110€", e: "Alto (con suscripción)", f: "Automatizado + operador en pedidos >150€", cr: "22-32%" },
            { v: "Cosmética técnica / capilar", a: "75-140€", e: "Alto", f: "Operador humano <5 min", cr: "24-34%" },
            { v: "Joyería / relojería", a: "120-450€", e: "Muy alto", f: "Operador humano + foto producto", cr: "26-38%" },
            { v: "Electrodomésticos / hogar premium", a: "180-700€", e: "Muy alto", f: "Operador humano + ficha técnica", cr: "20-30%" },
            { v: "Formación digital / memberships", a: "90-350€", e: "Alto", f: "Automatizado + agente para upsell", cr: "18-28%" },
            { v: "Moda básica / fast-fashion", a: "35-65€", e: "Bajo — preferir landing", f: "No activar CTWA", cr: "8-14%" },
            { v: "Alimentación impulso / snacks", a: "20-45€", e: "Bajo", f: "No activar CTWA", cr: "6-12%" },
            { v: "Mascotas (alimento + accesorios)", a: "45-90€", e: "Medio (con suscripción)", f: "100% automatizado", cr: "14-22%" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.v}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.a}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.e}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.f}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.cr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Regla DayByDay: por debajo de 80€ AOV sin suscripción, el funnel CTWA no compensa el coste operativo de respuesta humana ni el coste de conversación marketing-iniciada de Meta (0,06€/conversación España, según <a href="https://developers.facebook.com/docs/whatsapp/pricing" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">tarifas oficiales WhatsApp Business Platform</a>). Mejor invertir ese spend en landing optimizada con Apple Pay/Bizum como vimos en la <Link to="/blog/cro-landing-page-meta-ads-d2c" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía CRO landing Meta Ads</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Stack técnico end-to-end: qué necesitas para arrancar</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El stack mínimo viable para un funnel CTWA D2C en España 2026 combina 4 piezas: número WhatsApp Business Platform verificado, plataforma conversacional (BSP), integración Shopify para inventario y pago, y Conversions API for WhatsApp para cerrar atribución con Meta Ads.
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Componente</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Opciones recomendadas</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Coste mensual</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cuándo elegir</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "WhatsApp Business Platform (vía BSP)", o: "Twilio · 360dialog · Respond.io · MessageBird", co: "25-249€ + tarifa Meta por conversación", d: "Twilio para dev custom, 360dialog para europeos, Respond.io para CRM integrado" },
            { c: "Plataforma conversacional / flow builder", o: "Respond.io · ManyChat (limit) · Chatfuel · Tidio", co: "79-249$/mes según seats", d: "Respond.io para D2C con operadores, ManyChat para flujo simple" },
            { c: "Integración Shopify (inventario + pago)", o: "App Shop Pay · webhook custom + Shopify Storefront API · Bird Commerce", co: "0-150€/mes", d: "Webhook custom si AOV alto, app oficial si <30K€/mes" },
            { c: "Conversions API for WhatsApp", o: "CAPI Gateway · Stape · sGTM Cloud Run", co: "0-80€/mes", d: "CAPI Gateway gratis si stack Meta, Stape si ya tienes Stape" },
            { c: "Pipeline atribución CAC adquisición específico", o: "n8n + BigQuery · Hightouch · Census", co: "20-200€/mes", d: "n8n para D2C 10-50K€/mes, Hightouch para &gt;50K€" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.o}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.co}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.d}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Coste total realista para arrancar D2C España: 600-1.800€ setup one-off + 200-800€/mes operación, según volumen de conversaciones. Para D2C en fase de validación con {'<'}5K€/mes spend en CTWA, basta con 360dialog + Respond.io + webhook Shopify; para cuentas en escala {'>'}20K€/mes spend en CTWA conviene meter CAPI Gateway + pipeline n8n + BigQuery para cruzar pedidos con cohortes LTV90 como vimos en la <Link to="/blog/guia-api-conversiones-meta-ads-shopify" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía API de Conversiones Meta + Shopify</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 4 plantillas de flujo conversacional por intent</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Mismo CTWA, distinto flujo según madurez del usuario. Mezclar los 4 en un único flujo genérico es el error que más mata el CR. Esta es la arquitectura DayByDay para D2C España:
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Flujo COLD educativo (frío, audiencias prospecting cold): 3-4 mensajes en cadena. Primer mensaje agradecimiento + reformular dolor del anuncio en 1 línea (no copiar copy). Segundo mensaje 2-3 beneficios diferenciales con foto/video del producto. Tercer mensaje invitación a 'qué te gustaría saber' (pregunta abierta, no cierre directo). Cuarto mensaje cierre con link de pago + descuento exclusivo 10-15% válido 24h. CR esperado: 14-22%.",
        "Flujo WARM cierre directo (audiencias warm 7-30d, retargeting visitantes PDP): 1-2 mensajes. Mensaje 1 reconocer producto que vio + ofrecer cierre directo con link de pago pre-llenado + cupón 5-10%. Mensaje 2 (solo si no responde en 6h) último recordatorio con scarcity verdadera (stock limitado, precio sube X fecha). CR esperado: 28-38%.",
        "Flujo ABANDONO carrito (audiencias add-to-cart 1-7d sin compra): 1 mensaje + bot pregunta blocker. 'Vi que dejaste X producto en el carrito — ¿es por la talla, el envío o el precio?'. Según respuesta, dispara micro-flujo (talla → guía + foto; envío → fechas y coste exacto; precio → cupón 8-12% one-shot). Cierre con link pago. CR esperado: 32-42% sobre quien responde.",
        "Flujo POST-PURCHASE recurrencia (compradores 30-90d, suscripción opcional): 1 mensaje 30d post-pedido + 1 mensaje 60d. Mensaje 30d 'cómo te ha ido con X' + invitación a review + cross-sell del consumible/recambio. Mensaje 60d oferta suscripción -15% recurrente o pack 2-3 unidades. Sube tasa 2ª compra 8-14 puntos vs solo email-only en cuentas D2C suplementos/cosmética.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Por qué CTWA es palanca defensiva contra la pérdida de señal iOS 17/18</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      En la <Link to="/blog/ios-atribucion-meta-ads-2026-d2c" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía iOS atribución Meta Ads 2026</Link> vimos que las cuentas D2C con {'>'}60% tráfico iOS pierden 12-40% de eventos web atribuidos por SKAdNetwork + Link Tracking Protection + Private Relay. El funnel CTWA convierte dentro de la app de WhatsApp (propiedad de Meta), que escapa al sandbox SKAdNetwork porque la conversión es server-side via Conversions API for WhatsApp. Resultado medible:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "Cobertura atribución pedido → ad creative: 82-92% en CTWA vs 55-65% en funnel web optimizado con CAPI server-side.",
        "Tiempo desde click hasta conversión atribuida: <5 min en CTWA (real-time) vs hasta 7 días en SKAdNetwork postback.",
        "Calidad de aprendizaje Meta: el algoritmo recibe señal completa por creative, optimiza 30-50% más rápido en cold start vs funnel web iOS-dominant.",
        "Resistencia a Consent Mode v2 denied: CTWA no depende de cookies web, opera 100% sobre identificador WhatsApp.",
        "Sin caída de %match Customer Match: el número de teléfono se captura nativamente en el opt-in WhatsApp, sin hash manual.",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h2 className="text-2xl font-black mt-10 mb-4">6 errores frecuentes en funnels WhatsApp + Meta Ads D2C españoles</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Activar CTWA sin equipo de respuesta en <5 min: el lead se enfría y el CR cae del 25% al 6% cuando la primera respuesta tarda más de 10 minutos. Solución: bot automatizado responde en <30s con triage, operador humano entra solo si el lead llega a high-intent o ticket >150€.",
        "Mensaje pre-poblado genérico tipo 'Hola, quiero info' sin contexto del producto del anuncio: pierde tasa de respuesta humana 40-60% porque el operador no sabe de qué producto viene. Solución: prellenar mensaje con SKU/categoría/ángulo del creative ('Hola, vi vuestro anuncio del [PRODUCTO_X]').",
        "Conversación que termina en 'visita nuestra web' en lugar de cerrar con link de pago directo: pierde 60-80% de la intención generada. Solución: link de pago Shopify pre-llenado con producto + cantidad + cupón (vía Shopify Storefront API o app Shop Pay).",
        "Sin sincronización CAPI for WhatsApp: los pedidos cerrados vía WhatsApp no se atribuyen al ad creative y Meta optimiza ciego, subiendo CPA 25-45%. Solución: enviar eventos conversation_initiated, message_replied, lead_qualified, purchase con event_id deduplicado entre pixel web y CAPI WhatsApp.",
        "Mismo flujo conversacional para frío y warm: cold debe educar 2-3 mensajes antes de pedir compra; warm va directo al carrito. Mezclarlos baja CR cold 35% y CR warm 20%. Solución: trigger del flujo según audience source en el anuncio Meta + parámetro UTM en mensaje pre-poblado.",
        "Sin opt-in expreso para marketing iniciada por WhatsApp: las plantillas marketing requieren opt-in explícito según política Meta + AEPD. Enviar templates marketing-iniciada sin opt-in válido expone a multas AEPD 30K-300K€ y bloqueo del número WhatsApp Business por Meta. Solución: doble opt-in con checkbox en checkout/landing + log auditable con timestamp + IP.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría unit economics + AOV pre-onboarding (2-3h): calculamos AOV bruto/mediano por sector, margen contribución y proyección CR esperada en CTWA vs funnel web actual. Si el ticket no soporta el funnel WhatsApp con respuesta humana, lo decimos antes de cobrar setup y proponemos alternativa landing + Apple Pay/Bizum.",
        "Setup stack técnico end-to-end: BSP (360dialog o Respond.io según volumen), integración Shopify Storefront API para checkout pre-llenado con producto/cantidad/cupón, CAPI Gateway para Conversions API for WhatsApp con event_id deduplicado, Consent Mode v2 + opt-in auditable, dashboard Looker Studio con CPA WhatsApp vs CPA landing comparado.",
        "Diseño de 4 plantillas de flujo conversacional por intent (cold educativo / warm cierre / abandono carrito / post-purchase recurrencia) con copy adaptado al ángulo de cada creative + triage automático que escala a operador humano solo en high-intent o ticket >150€.",
        "Solución ad-hoc Pablo + Jorge: para una marca D2C de cosmética técnica AOV 95€ con 18K€/mes spend Meta, Jorge construyó pipeline n8n + Shopify Admin API + Respond.io API + Meta Marketing API que cada noche cruza conversación iniciada × pedido cerrado × cohorte LTV90 × CAC adquisición específico por flujo (cold / warm / abandono). Pablo lidera la sesión semanal con el founder para reasignar spend entre CTWA y funnel web según CPA blended por canal. Resultado en 75 días: CR conversación→pedido subió del 12% al 27%, CPA blended Meta cayó 23%, atribución iOS subió del 58% al 87% y la tasa 2ª compra a 90d subió 6 puntos por el flujo post-purchase WhatsApp.",
        "Revisión semanal 20 min cada lunes con founder + Pablo: leemos CPA WhatsApp vs CPA landing por creative, decidimos qué creatives migrar de funnel web a CTWA, qué flujos conversacionales iterar y qué % de spend dedicar a cada funnel para el siguiente sprint.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo lidera la estrategia paid media y la decisión de cuándo activar funnel CTWA según unit economics; Jorge construye el pipeline técnico (BSP + Shopify Storefront + CAPI for WhatsApp + n8n + BigQuery) que hace que el funnel atribuya pedidos al creative correcto y mida CAC adquisición específico por flujo conversacional. Donde otras agencias contratan un proveedor para el WhatsApp y otro para el paid media — con handoffs entre marketing y técnico que rompen la atribución —, en DayByDay Pablo y Jorge montan el funnel completo en la misma conversación. El cliente habla con los dos socios desde el primer día, sin account managers ni handoffs.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu D2C tiene AOV {'>'}80€ y estás perdiendo conversiones en checkout o señal iOS?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría CTWA gratuita 30 min: calculamos si tu ticket y margen soportan funnel WhatsApp + Meta Ads, proyectamos CPA esperado vs funnel web actual y entregamos plan técnico (BSP + Shopify + CAPI for WhatsApp + flujos conversacionales por intent) con coste y tiempo de setup.</p>
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
        <Link to="/blog/ios-atribucion-meta-ads-2026-d2c" className="text-white font-semibold hover:text-white/80">
          iOS 17/18 y atribución en Meta Ads: qué ha cambiado para D2C en 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué CTWA recupera 20-30 puntos de cobertura atribución vs funnel web en cuentas D2C iOS-dominant.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/guia-api-conversiones-meta-ads-shopify" className="text-white font-semibold hover:text-white/80">
          Guía API de Conversiones Meta + Shopify →
        </Link>
        <p className="text-white/40 text-xs mt-1">Setup CAPI base sobre el que se conecta Conversions API for WhatsApp con event_id deduplicado.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cro-landing-page-meta-ads-d2c" className="text-white font-semibold hover:text-white/80">
          CRO de landing page para Meta Ads (2026) →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cuándo el funnel landing optimizado supera a CTWA: AOV {'<'}60€ y compra impulsiva.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/email-marketing-meta-ads-ltv-d2c" className="text-white font-semibold hover:text-white/80">
          Email marketing + Meta Ads: cómo combinar paid + owned para escalar LTV →
        </Link>
        <p className="text-white/40 text-xs mt-1">WhatsApp como tercer canal owned junto a email + SMS para retención post-purchase.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/dashboard-paid-media-founder-d2c" className="text-white font-semibold hover:text-white/80">
          Dashboard de paid media: qué métricas debe ver un founder D2C cada lunes →
        </Link>
        <p className="text-white/40 text-xs mt-1">CPA WhatsApp vs CPA landing como métrica obligatoria en el dashboard del founder con funnel mixto.</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default WhatsappMetaAdsFunnelBofuD2cPage;
