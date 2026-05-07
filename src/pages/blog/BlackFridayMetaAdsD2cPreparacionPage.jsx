import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Cuándo hay que empezar a preparar Black Friday en Meta Ads para una D2C en España?",
    a: "Mínimo 90 días antes del último viernes de noviembre. Para Black Friday 2026 (27 de noviembre), eso significa arrancar el 1 de septiembre como muy tarde. Las marcas D2C españolas que esperan a octubre llegan tarde por tres motivos: (1) los CPM en Meta suben entre un 25% y un 60% durante la semana del Black Friday según sector y tipo de cuenta, así que el aprendizaje de creatividades y audiencias tiene que estar cerrado antes del 1 de noviembre. (2) Los nuevos eventos de Conversions API y los nuevos pixel events necesitan 7-10 días de aprendizaje para que el algoritmo los priorice correctamente. (3) Las creatividades específicas de Black Friday (descuentos, urgencia, packs) tienen que estar en producción 6-8 semanas antes para A/B test previo, no improvisarlas la última semana. Las marcas que arrancan en septiembre con calendario de creatividades, lista de Custom Audiences expandida y warm-up de retargeting son las que doblan ROAS en BF vs marcas que solo suben presupuesto la semana clave."
  },
  {
    q: "¿Qué pasa con el CPM y el CPC en Meta Ads durante Black Friday y Cyber Monday en España?",
    a: "Suben en bloque y de forma asimétrica. Datos que medimos en cuentas D2C españolas 2024-2025: CPM medio sube +35-55% del 24 al 30 de noviembre vs media de octubre, y +60-80% el viernes y sábado mismos. CPC sube menos en proporción (+20-40%) porque el CTR también sube (la intención de compra es mayor), pero el CPA acaba subiendo +15-30% en sectores competidos como moda, belleza y suplementos. La consecuencia operativa es que el ROAS de Meta cae +0,5 a +1,0 puntos durante esa semana incluso si las creatividades son buenas: lo que compensa es el volumen, no la eficiencia. Una D2C que en octubre saca ROAS 3,2 puede acabar BF en ROAS 2,4-2,7, pero con 3-5x el volumen de pedidos. La regla operativa es: aceptas peor ROAS a cambio de volumen, pero solo si el LTV/CAC y el flujo post-purchase están preparados para monetizar la cohorte BF en los 60-90 días siguientes."
  },
  {
    q: "¿Cómo se reparte el presupuesto Meta Ads durante Q4 en una D2C que prepara Black Friday?",
    a: "En tres fases con presupuestos escalonados: warm-up, peak y post-peak. Fase warm-up (1 octubre — 20 noviembre): 110-130% del presupuesto medio de Q3 para alimentar Custom Audiences nuevas (visitas Q4, AddToCart, suscriptores BF), testar 6-10 creatividades específicas de oferta y construir frecuencia de retargeting. Fase peak (21 noviembre — 1 diciembre, 11 días): 250-400% del presupuesto medio. El gasto se concentra los días 24-30 de noviembre (BF) y 1-2 de diciembre (Cyber Monday). Fase post-peak (2 — 24 diciembre): 130-160% del presupuesto medio para capturar Christmas shopping, regalos de última hora y reactivación de carritos abandonados durante BF. La regla que aplicamos es no superar el 35% del presupuesto Q4 en una sola semana: distribución típica de cuenta D2C 50K€/mes que escala a Q4: octubre 60K€, noviembre 90-110K€, diciembre 75-90K€. Total Q4 = 225-260K€ vs 150K€ que sería el run-rate normal."
  },
  {
    q: "¿Qué creatividades funcionan mejor en Black Friday para D2C en Meta Ads?",
    a: "Cuatro tipos con orden de eficacia muy claro en cuentas que hemos optimizado. (1) UGC con voz-on-camera explicando la oferta concreta y el descuento exacto, no genéricos: ROAS 30-50% superior a creatividades de stock o rendering. (2) Statics con porcentaje de descuento grande, urgencia (cuenta atrás, 'solo hasta domingo') y producto principal claro — funcionan especialmente en cuentas con catálogo amplio donde Advantage+ Catalog se beneficia de creative templates. (3) Reels de 15-25 segundos con before/after o demo de producto con price tag tachado: rinden mejor que vídeos largos porque la frecuencia recomendada en BF es 4-6x y vídeos largos saturan más rápido. (4) Creatividades de pack/bundle con descuento marginal vs single product: AOV sube un 25-45% y el incremental compensa de sobra el descuento extra. Las que NO funcionan: creatividades con texto demasiado denso (Meta penaliza CTR), bundles confusos sin precio final claro, y creatividades de marca sin oferta explícita en BF (no sirven para conversion, solo para awareness y BF no es awareness)."
  },
  {
    q: "¿Hay que pausar las campañas habituales durante Black Friday o adaptarlas?",
    a: "Adaptarlas, no pausarlas. Pausar campañas evergreen el 24-30 de noviembre rompe el aprendizaje del algoritmo y obliga a reaprender en diciembre con CPMs altos. Lo que hacemos: (1) Mantener prospecting evergreen con presupuesto +20-30% pero sustituyendo creatividades por las de oferta BF en lugar de evergreen — el algoritmo conserva la audiencia entrenada. (2) Subir presupuesto de retargeting +150-300% porque la mayor parte del lift en BF viene de retargeting (visitas Q4, AddToCart 14d, suscriptores warm). (3) Activar campañas BF-only con Advantage+ Shopping y bid cap basado en CAC objetivo BF (15-25% más alto que el CAC normal). (4) Mantener exclusiones de compradores 30d activas para no canibalizar — solo se reabren para audiencias winback (compradores 90-180d) que sí queremos reactivar con oferta BF. La estructura final típica: 50% spend en retargeting/winback, 30% en prospecting con creativos BF, 20% en Advantage+ Shopping con catálogo BF."
  },
  {
    q: "¿Cómo se prepara el tracking y la API de Conversiones para que Black Friday no se rompa la atribución?",
    a: "Auditoría tracking obligatoria 6-8 semanas antes (mediados de octubre como muy tarde). Cuatro chequeos no negociables. (1) Verificar EMQ de Conversions API por encima de 7,5 — si está más bajo, hay datos de cliente sin pasar (email, teléfono hasheados) y el matching fallará durante BF cuando el volumen sea 4-5x el habitual. (2) Probar deduplicación cliente↔servidor con event_id único y comprobar que coverage de eventos servidor está por encima del 70% del cliente. (3) Configurar 8 web events priorizados en AEM (Aggregated Event Measurement) con Purchase, AddToCart, InitiateCheckout, ViewContent y subevent de bundle si aplica. Los cambios en AEM tardan 24-48h en propagarse, no se pueden hacer la semana de BF. (4) Stress-test del pixel con tagging assistant y test events 5 días antes. Si la cuenta migra a server-side ese trimestre, hay que cerrarla 30 días antes del BF para que el algoritmo aprenda con eventos enriquecidos. Más detalle en la guía de tracking server-side completo. Sin estos cuatro chequeos, el ROAS reportado durante BF queda subestimado un 15-30% y el algoritmo prioriza mal por falta de señal."
  }
];

const BlackFridayMetaAdsD2cPreparacionPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Black Friday Meta Ads para D2C: cómo preparar Q4 con 90 días de antelación"
    description="Guía operativa para preparar Black Friday y Q4 en Meta Ads para eCommerce D2C en España: calendario de 90 días, fases de warm-up/peak/post-peak con presupuestos escalonados, qué creatividades funcionan, cómo adaptar campañas evergreen, auditoría tracking y CAPI obligatoria, manejo de CPM +35-55% durante BF y enfoque DayByDay."
    slug="black-friday-meta-ads-d2c-preparacion"
    datePublished="2026-05-08"
    dateModified="2026-05-08"
    readingTime="12 min"
    category="Estacional"
    keywords={[
      "black friday meta ads d2c",
      "black friday ecommerce españa",
      "preparar black friday meta ads",
      "campañas q4 meta ads d2c",
      "cyber monday meta ads ecommerce",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Black Friday en Meta Ads para una D2C no se gana la semana del Black Friday, se gana en septiembre</strong>. Las marcas españolas que doblan ROAS durante Q4 frente a las que se quedan planas tienen una cosa en común: arrancan calendario, creatividades, audiencias y tracking 90 días antes del último viernes de noviembre. El resto improvisa, sube presupuesto el lunes 24 y descubre que los CPM han subido un 35-55% mientras el algoritmo aún está aprendiendo creatividades nuevas. Este artículo es la guía operativa que usamos en DayByDay con cuentas D2C de 30K-300K€/mes para preparar BF y Cyber Monday: fases, presupuestos, creatividades, tracking y errores que matan la cuenta.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es preparar Black Friday en Meta Ads para una D2C</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Preparar Black Friday Meta Ads para D2C</strong> es el conjunto de decisiones operativas que se toman entre septiembre y noviembre para que la cuenta llegue al último viernes de noviembre con audiencias entrenadas, creatividades validadas en A/B test, tracking estable y presupuesto distribuido por fases. No es subir gasto la semana clave: es construir 90 días antes la base que permite escalar un 250-400% en 11 días sin que el algoritmo se rompa ni el CPA se descontrole.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      <a href="https://www.statista.com/topics/991/cyber-monday/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Según Statista, el gasto online global durante Cyber Week supera los 70.000 millones de dólares anuales</a>, con crecimiento sostenido año tras año. En España, <a href="https://iabspain.es/estudio/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">IAB Spain reporta en sus estudios anuales que el peso del Q4 en eCommerce supera el 38% del gasto digital total</a>. Para una D2C que factura 1,2M€/año, eso suele traducirse en 450-550K€ concentrados en 8 semanas: ganar o perder Q4 cambia el cierre del año.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según <a href="https://www.shopify.com/enterprise/black-friday-cyber-monday-statistics" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">los datos públicos de Shopify sobre Black Friday y Cyber Monday</a>, las marcas D2C que activan creatividades de oferta y warm-up de retargeting al menos 6 semanas antes del BF reportan AOV un 12-18% más alto y ROAS un 25-40% superior frente a marcas que activan oferta solo la semana clave. La razón es operativa: el algoritmo de Meta necesita 7-10 días para validar nuevos eventos de compra y nueva señal creativa antes de optimizar a coste eficiente.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 3 fases de preparación de Black Friday y su calendario</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El calendario que aplicamos en DayByDay para Black Friday 2026 (27 de noviembre) parte del 1 de septiembre y se divide en tres fases con objetivos y presupuestos diferenciados:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Fase</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Fechas</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">% presupuesto vs media Q3</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Objetivo principal</th>
          </tr>
        </thead>
        <tbody>
          {[
            { f: "Foundation", d: "1 sept — 30 sept", p: "100% (igual)", o: "Auditoría tracking + CAPI + AEM" },
            { f: "Warm-up", d: "1 oct — 20 nov", p: "110-130%", o: "Construir CA Q4 + testar 6-10 creatividades BF" },
            { f: "Peak", d: "21 nov — 1 dic", p: "250-400%", o: "Maximizar volumen aceptando ROAS -0,5 a -1 punto" },
            { f: "Post-peak", d: "2 dic — 24 dic", p: "130-160%", o: "Capturar Christmas + reactivar carritos BF" },
            { f: "Cooldown", d: "26 dic — 7 ene", p: "70-90%", o: "Bajar CPM, retomar evergreen, planificar Q1" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.f}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.d}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.o}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La fase Foundation es la que más se salta y la que más diferencia hace: si el tracking llega roto al peak, no hay creatividad que lo arregle. Detalle de qué auditar exactamente en la <Link to="/blog/server-side-tracking-shopify-conversions-api" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de tracking server-side con Conversions API</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Checklist operativo por fase: qué hace cada semana</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Septiembre semana 1-2 (Foundation): auditoría completa del píxel, Conversions API, AEM con 8 web events priorizados, EMQ >7,5, deduplicación cliente↔servidor verificada con event_id, Consent Mode v2 funcionando con AEPD compliance.",
        "Septiembre semana 3-4: definición del calendario de oferta (% descuento por línea, packs, exclusiones de catálogo si aplica), brief creativo para 8-12 piezas BF (UGC, statics, Reels, packs), suscripción anticipada BF en pop-up con doble lead magnet (descuento BF + early access).",
        "Octubre semana 1-2 (Warm-up): producción y publicación de las primeras 4 creatividades BF en campañas A/B test, lanzamiento Custom Audience suscriptores Q4 BF, retargeting visitas 7d con creativo de teaser sin descuento todavía.",
        "Octubre semana 3-4: A/B test de las otras 4-6 creatividades, validación de winners (CTR >1,8%, ROAS sobre umbral evergreen), expansión Custom Audiences AddToCart 14d/28d, sincronización Klaviyo↔Meta de top 25% LTV.",
        "Noviembre semana 1-2: warm-up final, frecuencia retargeting subiendo a 4-6x sobre suscriptores BF, primera comunicación email de pre-BF (early access 48h antes), pre-aprobación de incremento de límite de gasto en Business Manager (Meta lo bloquea durante BF si no se sube antes).",
        "Noviembre semana 3 (21-23 nov, pre-peak): activación creatividades de oferta, exclusión de compradores 30d en prospecting, reabierta winback 90-180d, presupuesto +50% sobre warm-up.",
        "Noviembre semana 4 (24-30 nov, peak): presupuesto al máximo (250-400% vs Q3), revisión 2x al día de CPA y frequency cap por audiencia, refresh de creativos saturados (frequency >7), apertura de Advantage+ Shopping con catálogo BF.",
        "Diciembre semana 1 (Cyber Week tardía + Christmas warm-up): mantener presupuesto Cyber Monday +30% sobre BF, reactivar carritos abandonados durante BF con secuencia 1h/24h/72h, lanzar campaña Christmas con creativos regalo.",
        "Diciembre semana 2-3: campañas Christmas + last-chance shipping, mantener retargeting alto, preparar oferta enero (saldos, recurrencia).",
        "Enero semana 1 (Cooldown): bajar presupuesto al 70-90%, dejar reaprender al algoritmo con CPM bajos, kickoff de plan Q1 con cohorte adquirida en BF como base de retención.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué creatividades funcionan en Black Friday y cuáles matan la cuenta</h2>
    <div className="space-y-3 mb-6">
      {[
        "UGC con voz-on-camera mostrando producto + descuento exacto: ROAS 30-50% superior a stock. La autenticidad supera al rendering caro durante BF.",
        "Statics con % descuento grande + urgencia (cuenta atrás, 'solo hasta domingo') + producto hero claro: rinden bien en Advantage+ Catalog cuando hay catálogo amplio.",
        "Reels 15-25s con before/after o demo + price tag tachado: la frecuencia recomendada en BF es 4-6x; vídeos largos saturan demasiado rápido.",
        "Bundles/packs con descuento marginal vs single: AOV sube +25-45% y compensa el descuento extra. Funciona especialmente bien en moda, belleza y suplementos.",
        "ANTI-PATRÓN: creatividades de marca sin oferta explícita en BF — Black Friday no es awareness, es conversion. Cualquier euro gastado en branding puro durante 24-30 nov es euro tirado.",
        "ANTI-PATRÓN: bundles confusos sin precio final visible en la creatividad — el CTR baja y el CPM penaliza al ad set entero.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Más detalle sobre cómo estructurar el A/B test de creatividades en la <Link to="/blog/creative-testing-meta-ads" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de creative testing en Meta Ads</Link> y cómo trabajar el retargeting durante BF en <Link to="/blog/retargeting-meta-ads-ecommerce-2026" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">retargeting en Meta Ads para eCommerce</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Estructura de campañas durante el peak: 50/30/20</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La distribución de spend durante el peak (21 nov — 1 dic) que mejor rendimiento da en cuentas D2C españolas que hemos optimizado:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Bloque</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">% spend peak</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Audiencias</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">ROAS objetivo</th>
          </tr>
        </thead>
        <tbody>
          {[
            { b: "Retargeting + winback", p: "50%", a: "Visitas Q4, AddToCart 14d, compradores 90-180d", r: "4-7x" },
            { b: "Prospecting con creativos BF", p: "30%", a: "LAL 1% top 25% LTV + frío qualified", r: "1,8-2,8x" },
            { b: "Advantage+ Shopping BF", p: "20%", a: "Auto + exclusión 30d + creativos catálogo BF", r: "2,5-4x" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.b}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.a}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La razón por la que retargeting pesa el 50% durante el peak: el lift incremental de BF viene del cierre de demanda existente que no había convertido (visitas Q4, suscriptores BF, carritos abandonados, ex-compradores), no de adquirir frío nuevo cuando los CPM están al doble. Más detalle de cómo se cablea Advantage+ Shopping en la <Link to="/blog/advantage-plus-shopping-cuando-usarlo-no" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de Advantage+ Shopping</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Kickoff Black Friday con 90 días de antelación (1 septiembre): auditoría tracking + CAPI + AEM, brief creativo BF (8-12 piezas), calendario de oferta cerrado por línea de producto, presupuesto Q4 acordado por fases y plan de incremento de límite gasto en Business Manager pre-aprobado.",
        "Implementación Pablo + Jorge en paralelo: Pablo cierra la estrategia de creatividades BF (qué descuentos, qué hero products, qué bundles, qué LP), distribución de spend por fase y estructura 50/30/20; Jorge configura sGTM con eventos enriquecidos BF (purchase con bundle metadata, AddToCart con discount applied), webhook Shopify→Klaviyo con tag fuente BF, integración Klaviyo↔Meta para Custom Audiences BF, dashboard Looker con MER blended por día y por bloque (retargeting/prospecting/Advantage+).",
        "A/B test de creatividades en octubre con learning budget acotado (€2.500-€5.000 según volumen): 6-10 piezas BF, criterio de winner CTR >1,8% + ROAS sobre umbral evergreen; los winners se publican en escala el 21 noviembre.",
        "Auditoría EMQ semanal en septiembre y octubre: si EMQ <7,5 disparamos sprint técnico para que llegue a >8 antes del peak (pasar email/teléfono hasheados, fbc/fbp consistentes, IP server-side correcta).",
        "Daily review durante el peak (24-30 nov): revisión 2x al día de CPA por bloque, frequency cap por audiencia, refresh de creativos saturados (>7 frequency), reasignación de presupuesto en directo entre retargeting/prospecting/Advantage+ según ROAS de las últimas 6h.",
        "Plan post-BF de monetización de cohorte: la base de compradores BF se carga en flujos Klaviyo de cross-sell + segunda compra desde el día 1 de diciembre, con creatividades retargeting Meta segmentadas por SKU comprado en BF para alimentar AOV de Christmas.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo (founder · paid media) lidera estrategia, calendario y creatividades; Jorge (CTO · automation) lidera tracking server-side, integración Shopify↔Klaviyo↔Meta y dashboard de control diario. Donde otras agencias separan paid media y tech entre dos proveedores que rara vez se hablan, en DayByDay las decisiones de qué eventos enriquecer, qué Custom Audiences sincronizar y qué presupuesto reasignar a las 18:00 del Black Friday se cierran en la misma reunión. El cliente habla con los dos socios desde la primera reunión: sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu cuenta D2C está lista para Black Friday 2026?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos tracking + CAPI + AEM, calendario de creatividades, estructura de Custom Audiences, distribución de presupuesto Q4 y plan de monetización post-BF. Te decimos qué falta y cuántos días tienes para arreglarlo antes del 27 de noviembre.</p>
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
        <Link to="/blog/escalar-campanas-meta-ads-sin-romper-roas" className="text-white font-semibold hover:text-white/80">
          Cómo escalar campañas Meta Ads sin que se rompa el ROAS →
        </Link>
        <p className="text-white/40 text-xs mt-1">Protocolo de escala con regla 7 días aplicable al peak de Black Friday</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/server-side-tracking-shopify-conversions-api" className="text-white font-semibold hover:text-white/80">
          Tracking server-side completo para Shopify con Conversions API →
        </Link>
        <p className="text-white/40 text-xs mt-1">Auditoría EMQ y deduplicación obligatoria 6 semanas antes del BF</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/retargeting-meta-ads-ecommerce-2026" className="text-white font-semibold hover:text-white/80">
          Retargeting en Meta Ads para eCommerce: guía completa 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">Escalera de 4 peldaños y cómo se ajusta durante el peak BF</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/email-marketing-meta-ads-ltv-d2c" className="text-white font-semibold hover:text-white/80">
          Email marketing + Meta Ads para escalar LTV en D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo se monetiza la cohorte adquirida en BF en los 60-90 días siguientes</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default BlackFridayMetaAdsD2cPreparacionPage;
