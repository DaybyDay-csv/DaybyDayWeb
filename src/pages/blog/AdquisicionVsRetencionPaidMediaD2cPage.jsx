import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué diferencia hay entre adquisición y retención en paid media D2C?",
    a: "Adquisición es el spend dirigido a conseguir clientes nuevos (first purchase): audiencias frías, lookalikes, Advantage+ Shopping con expansión, Google Search non-brand, Performance Max prospecting. Retención es el spend dirigido a generar segunda compra, upsell, cross-sell, reactivación de clientes inactivos y defensa de marca: audiencias warm (visitantes/AddToCart 7-30 días), audiencias de compradores con segunda compra pendiente, Google Search brand, email/SMS automatizado, WhatsApp retargeting. La distinción operativa es clave porque cada bucket tiene CPA distinto (retención 40-70% más barata), LTV distinto (compradores recurrentes 2,3-4,5x más rentables) y se mide con KPIs distintos (CAC blended vs ROAS por cohorte). Mezclar ambos en la misma cuenta sin separar presupuestos hace que el algoritmo concentre spend donde es más fácil convertir (warm) y deje sin alimentar el funnel superior, matando el crecimiento."
  },
  {
    q: "¿Qué porcentaje del presupuesto debe ir a adquisición vs retención en un D2C?",
    a: "Depende del momento de la marca y del LTV real. Regla operativa que aplicamos en DayByDay: D2C joven (<18 meses, <500K€ facturación) — 80-90% adquisición y 10-20% retención porque el problema es base de clientes pequeña. D2C en escala (18-36 meses, 500K-2M€) — 65-75% adquisición y 25-35% retención porque ya hay base recurrente que defender y exprimir. D2C maduro (>36 meses, >2M€) — 45-60% adquisición y 40-55% retención porque la rentabilidad marginal viene de LTV. Estos rangos asumen que email/SMS y comunidad propia no entran en paid media; si los metes, el split cambia. La trampa habitual es replicar el split de marcas grandes (50/50) cuando la marca todavía está en fase de crecimiento, lo que frena adquisición y aborta el escalado."
  },
  {
    q: "¿Cómo separo presupuestos de adquisición y retención dentro de Meta Ads?",
    a: "Estructura recomendada para D2C >5K€/mes Meta: dos campañas top-level claramente etiquetadas. Campaña Adquisición: objetivo Sales, optimización Purchase, audiencias broad + lookalike high-value buyers + Advantage+ Shopping con expansión activa, exclusión de compradores últimos 60-90 días, ad sets DPA prospecting (DABA), ángulo creativo educativo/aspiracional. Campaña Retención: objetivo Sales, optimización Purchase o Add to Cart según volumen, audiencias warm (ViewContent/AddToCart 7-30d), compradores 90-180d sin segunda compra, ad sets DPA retargeting con product sets cross-sell/upsell, ángulo creativo prueba social/urgencia/recompra. Naming convention: [ADQ]_ o [RET]_ al inicio de cada campaña y ad set para que el reporting separe el spend automáticamente en Looker Studio. Sin esta separación, calcular CAC adquisición real es imposible."
  },
  {
    q: "¿Por qué el CAC blended no basta para decidir entre adquisición y retención?",
    a: "El CAC blended mezcla el coste de adquirir clientes nuevos con el coste de generar repeticiones, y oculta la verdadera economía del negocio. Una marca puede tener CAC blended de 18€ que parece sano, pero si el desglose es CAC adquisición 42€ y CAC retención 7€, la realidad es que adquirir clientes nuevos es caro y el negocio está creciendo gracias a la base existente. Cuando esa base se queme (saturación retargeting, fatiga creativa, churn natural), el crecimiento se detiene de golpe. El número correcto a vigilar es CAC adquisición específico — solo cuenta first purchase de usuarios que NO eran clientes — y compararlo con LTV90 o LTV180 ajustado por margen contribución. Sin ese desglose, no se puede decidir cuánto subir/bajar presupuesto de adquisición sin romper margen."
  },
  {
    q: "¿Cuándo recortar presupuesto de adquisición y meter más en retención?",
    a: "Cuatro señales operativas claras. (1) CPA adquisición sube >30% durante 3-4 semanas seguidas sin mejora en CTR ni Hook Rate: la audiencia objetivo está saturada, escalar más adquisición tira margen. (2) Tasa de segunda compra <22% a 90 días: la base de clientes tiene fuga, antes de meter más leña arriba hay que tapar la fuga. (3) % de spend retención <10% con base de compradores >5.000 últimos 12 meses: estás regalando LTV. (4) Margen contribución por pedido cae 4-6 puntos mes a mes pese a ROAS estable: el LTV implícito está bajando, hay que rebalancear hacia retención y subir AOV. Cuando se dan 2 de las 4 señales, recortamos adquisición un 15-25% durante 2-4 semanas, metemos ese spend en retención (cross-sell, reactivación, post-purchase flows) y reevaluamos. Si el negocio aguanta, el equilibrio nuevo se vuelve permanente."
  },
  {
    q: "¿Cómo encajan Google Ads brand y email/SMS en el split adquisición vs retención?",
    a: "Google Ads brand (consultas con nombre de marca) es retención disfrazada de adquisición: el usuario ya te conoce, el clic es defensivo (que no te lo robe un competidor o un revendedor). Si no separas Google brand del resto en el reporting, infla artificialmente el ROAS de adquisición. Email y SMS no son paid media en el sentido estricto, pero compiten por el mismo objetivo: ingresos de base recurrente. La práctica DayByDay es construir un dashboard Looker Studio con 4 buckets de gasto/ingresos: (1) Adquisición pura (Meta cold + Google non-brand + TikTok prospecting), (2) Retención paid (Meta warm + DPA cross-sell + Google brand), (3) Owned (email + SMS + WhatsApp), (4) Orgánico (SEO + social orgánico + referrals). Esto permite ver el CAC marginal real y decidir dónde meter el siguiente euro."
  }
];

const AdquisicionVsRetencionPaidMediaD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Adquisición vs retención: cómo separar presupuestos de paid media en D2C"
    description="Guía operativa para separar presupuestos de adquisición y retención en paid media para eCommerce D2C España 2026: definición operativa de adquisición vs retención, splits recomendados por madurez de marca (joven 80-90/10-20, escala 65-75/25-35, maduro 45-60/40-55), estructura de cuenta Meta Ads con campañas ADQ/RET separadas y naming convention, por qué CAC blended esconde la economía real del negocio, fórmula CAC adquisición específico vs LTV90 ajustado por margen contribución, 4 señales para rebalancear hacia retención, encaje de Google Ads brand y email/SMS en el split, dashboard Looker Studio con 4 buckets de gasto/ingresos y enfoque DayByDay Pablo+Jorge con pipeline n8n + Shopify + Meta/Google Ads APIs para reporting blended automatizado."
    slug="adquisicion-vs-retencion-paid-media-d2c"
    datePublished="2026-05-15"
    dateModified="2026-05-15"
    readingTime="10 min"
    category="Estructura de cuenta"
    keywords={[
      "adquisición vs retención ecommerce",
      "cac adquisición vs retención d2c",
      "presupuesto paid media ecommerce",
      "split adquisición retención meta ads",
      "estructura cuenta paid media d2c",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Separar presupuestos de adquisición y retención en paid media es lo que diferencia a un D2C que escala con margen sano de uno que crece en facturación pero se desangra en EBITDA.</strong> La mayoría de cuentas D2C españolas que auditamos en DayByDay tienen un CAC blended decente, pero al desglosar adquisición pura vs retención el cuadro cambia: la marca crece gracias a la base recurrente mientras el coste de captar clientes nuevos sube mes a mes sin que nadie lo vea. Este artículo describe el marco operativo que aplicamos para separar buckets, decidir splits por madurez de marca y construir el reporting que permite mover presupuesto sin romper margen.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es adquisición y qué es retención en paid media D2C</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Adquisición</strong> es el spend dirigido a conseguir clientes nuevos: first purchase, primer usuario que pasa de no conocer la marca a comprar. <strong className="text-white">Retención</strong> es el spend dirigido a generar repeticiones de compra, cross-sell, upsell, reactivación y defensa de marca sobre usuarios que ya están en tu universo. Operativamente, cada bucket tiene CPA distinto (retención suele costar 40-70% menos), LTV distinto (compradores recurrentes generan 2,3-4,5x más margen que compradores únicos según benchmarks D2C maduros) y exige métricas distintas: CAC adquisición y LTV90 ajustado por margen contribución para el primero; ROAS por cohorte, tasa de segunda compra y AOV para el segundo.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según <a href="https://hbr.org/2014/10/the-value-of-keeping-the-right-customers" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Harvard Business Review</a>, conseguir un cliente nuevo cuesta entre 5 y 25 veces más que retener uno existente, y un aumento del 5% en la tasa de retención puede aumentar los beneficios entre un 25% y un 95%. En auditorías DayByDay de cuentas D2C España con facturación 500K-3M€ vemos sistemáticamente que el CAC adquisición específico está infravalorado entre un 22% y un 38% cuando se mide en CAC blended, porque el spend retención (warm + brand search) infla el numerador de pedidos sin que el equipo lo aísle.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Split recomendado por madurez de marca</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El error más común es replicar el split de marcas grandes (50/50 o 40/60) en una marca joven que todavía necesita inyectar adquisición. Estos son los rangos que aplicamos en DayByDay tras auditar más de 40 cuentas D2C España 2024-2026:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Madurez D2C</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">% Adquisición</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">% Retención</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">KPI principal</th>
          </tr>
        </thead>
        <tbody>
          {[
            { m: "Joven (<18m, <500K€)", a: "80-90%", r: "10-20%", k: "CAC adquisición vs LTV90" },
            { m: "Escala (18-36m, 500K-2M€)", a: "65-75%", r: "25-35%", k: "Tasa 2ª compra + CAC blended" },
            { m: "Madura (>36m, >2M€)", a: "45-60%", r: "40-55%", k: "LTV180 + margen contribución" },
            { m: "Defensiva (post-fundraising o margen estrecho)", a: "35-50%", r: "50-65%", k: "Cash payback period" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.a}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.r}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.k}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Estos rangos asumen que email/SMS y comunidad propia se contabilizan aparte. Si los metes en retención paid, el split cambia y la lectura también. En verticales con baja recurrencia natural (muebles, electrónica grande), el split adquisición debe ser más agresivo durante más tiempo porque la base de clientes recurrentes nunca llegará al peso de una marca de cosmética o suplementos.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo separar presupuestos dentro de Meta Ads</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Estructura operativa para una cuenta D2C que invierte 5-30K€/mes en Meta:
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Crear 2 campañas top-level: [ADQ]_Sales_Cold y [RET]_Sales_Warm. Naming convention rígida para que el reporting en Looker Studio agregue spend e ingresos por bucket sin trabajo manual.",
        "Campaña ADQ: ad sets con audiencias broad, lookalike high-value buyers 1-5%, Advantage+ Shopping con expansión activa, DPA prospecting (DABA). Exclusión obligatoria: compradores últimos 60-90 días en TODOS los ad sets — sin esto el algoritmo encuentra compradores existentes y los cuenta como adquisición, falseando el CAC.",
        "Campaña RET: ad sets con audiencias warm (ViewContent/AddToCart 7-30d), compradores 90-180d sin segunda compra, audiencias de engagement, DPA retargeting con product sets de cross-sell/upsell.",
        "Optimización por ad set: ADQ siempre a Purchase (aunque señal sea débil, hay que enseñar al algoritmo el evento final). RET puede optimizar a Purchase o Add to Cart según volumen y CPA esperado.",
        "Creatividades diferenciadas: ADQ usa ángulos educativos, aspiracionales o de diferenciación de marca (qué problema resolvemos, quién está detrás, por qué somos distintos). RET usa prueba social, urgencia, descuentos, recomendaciones por cesta o producto visto.",
        "Reporting separado: cada lunes se mira el spend total, los pedidos atribuidos y el CAC por bucket. Si CAC ADQ sube >30% durante 3 semanas o tasa 2ª compra <22%, se rebalancea.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Por qué el CAC blended esconde la economía real</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Imaginemos una cuenta D2C que invierte 12.000€/mes y genera 600 pedidos. CAC blended: 20€. Parece sano. Pero si el desglose es 50% adquisición (6.000€, 130 first purchase = CAC adquisición 46€) y 50% retención (6.000€, 470 repeticiones = CAC retención 12,7€), la realidad es que captar nuevos clientes cuesta 46€ y eso solo es sostenible si LTV90 supera 90-100€ con margen contribución del 50%. Si LTV90 está en 65€, la marca está perdiendo dinero por cada cliente nuevo y solo crece porque exprime la base.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Esta lectura no se ve sin separar buckets. Tampoco se ve sin <Link to="/blog/cac-vs-ltv-ecommerce-escalable" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">cohort analysis</Link> ni sin <Link to="/blog/cac-blended-vs-cac-canal-ecommerce" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">desglose CAC por canal</Link>. Los founders D2C que descubren este desfase suelen reaccionar tarde, cuando la base recurrente ya se ha quemado y los pedidos caen 25-40% en 2 trimestres.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">4 señales para rebalancear hacia retención</h2>
    <ul className="space-y-2 mb-6">
      {[
        "CPA adquisición específico sube >30% durante 3-4 semanas seguidas sin mejora en CTR, Hook Rate ni Thumbstop Ratio: audiencia objetivo saturada, escalar más adquisición tira margen sin ganar volumen real.",
        "Tasa de segunda compra a 90 días cae por debajo del 22%: la base de clientes tiene fuga estructural. Antes de meter más spend arriba, hay que tapar la fuga con flows post-purchase, cross-sell DPA y email/SMS automation.",
        "% spend retención <10% con base de compradores >5.000 en últimos 12 meses: estás regalando LTV. Cada cliente que no recibe un retargeting cross-sell o reactivación a 90-180d es margen que no se cobra.",
        "Margen contribución por pedido cae 4-6 puntos mes a mes pese a ROAS estable: el LTV implícito está bajando porque el mix está empeorando (más first purchase pequeñas, menos repeticiones). Señal clara de rebalancear.",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/70 leading-relaxed mb-5">
      Según el <a href="https://www.thinkwithgoogle.com/marketing-strategies/data-and-measurement/customer-lifetime-value/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">research de Think with Google sobre Customer Lifetime Value</a>, las marcas que miden y optimizan por LTV en lugar de CAC puro tienen entre un 30% y un 40% más probabilidades de mantener crecimiento sostenido en horizontes de 24-36 meses. Esto es coherente con lo que vemos en cuentas D2C España que aceptan rebalancear a tiempo: el ROAS blended baja 0,3-0,6 puntos los primeros 2 meses, pero el margen contribución recupera 5-8 puntos y el cash payback period mejora.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Google brand, email y SMS: dónde encajan</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Google Ads brand</strong> (consultas con el nombre de la marca) es técnicamente retención: el usuario ya te conoce, el clic es defensivo. Si lo metes en el bucket de adquisición, inflas el ROAS porque el coste por clic brand es 5-10x menor que non-brand. La práctica correcta es separarlo: bucket Retención paid incluye Google brand, Meta warm/DPA retargeting y campañas de cross-sell. Bucket Adquisición pura incluye Meta cold/lookalike/Advantage+ Shopping prospecting, Google non-brand, Performance Max prospecting y TikTok Ads prospecting.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Email y SMS</strong> no son paid media en sentido estricto, pero compiten por el mismo resultado: ingresos sobre base existente. Cuando un D2C invierte fuerte en flows Klaviyo o Sendcloud, parte de los pedidos atribuidos a retención paid son realmente owned. La <a href="https://www.klaviyo.com/blog" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación de Klaviyo sobre revenue attribution</a> insiste en separar paid de owned con last-click + view-through analysis para no doble-contar.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Dashboard Looker Studio con 4 buckets</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La estructura de reporting que recomendamos para founders D2C es un dashboard con 4 buckets de gasto e ingresos:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Bucket</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Qué incluye</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">KPI clave</th>
          </tr>
        </thead>
        <tbody>
          {[
            { b: "Adquisición pura", c: "Meta cold/LAL, Google non-brand, TikTok prospecting", k: "CAC adquisición vs LTV90" },
            { b: "Retención paid", c: "Meta warm, DPA retargeting, Google brand, cross-sell", k: "ROAS warm + tasa 2ª compra" },
            { b: "Owned", c: "Email Klaviyo, SMS, WhatsApp automatizado, push", k: "Revenue/contacto activo" },
            { b: "Orgánico", c: "SEO, social orgánico, referrals, PR ganada", k: "Tráfico cualificado + asisted conversions" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.b}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.k}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría inicial del split actual: pedimos acceso a Meta Ads, Google Ads, Shopify y Klaviyo. En 5-7 días entregamos un desglose real del CAC por bucket, identificamos qué % del CAC blended esconde retención y comparamos con LTV90 ajustado por margen contribución. En el 70% de cuentas auditadas el CAC adquisición específico está infravalorado entre 22% y 38%.",
        "Reestructuración Meta con naming convention rígida [ADQ]_/[RET]_, exclusiones de compradores en todos los ad sets de adquisición y optimización separada por bucket. Esto solo (sin tocar creatividades) reduce el sesgo de atribución y deja el reporting limpio para tomar decisiones.",
        "Definición del split objetivo por madurez de marca y diseño del plan de transición. Si recortamos adquisición un 20% para meter en retención, lo hacemos en sprints de 2-4 semanas con métricas de control (ROAS blended, margen contribución, tasa 2ª compra) y reversión inmediata si el negocio se rompe.",
        "Solución ad-hoc Pablo + Jorge: para una marca D2C de suplementos con 14K€/mes spend Meta, Jorge construyó un pipeline n8n + Shopify Admin API + Meta Marketing API + Google Ads API que cada mañana publica en Looker Studio el CAC adquisición específico (excluyendo compradores existentes vía cross-reference con Shopify customers), el ROAS retención y la tasa de segunda compra por cohorte. Pablo usa ese dashboard para decidir cada lunes si subir adquisición, si rebalancear o si meter capa de cross-sell. En 90 días: margen contribución +6,4 puntos, tasa 2ª compra +9 puntos.",
        "Reporting semanal para founder: cada lunes el cliente recibe un PDF de 1 página con CAC por bucket, evolución vs semana anterior, decisión recomendada para la semana en curso y razón. Sin floritura. Sin meter al founder a abrir Ads Manager.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo Santirsó (founder · paid media) lleva la auditoría del split adquisición vs retención, define la estructura Meta/Google y opera la cuenta con criterio de margen. Jorge González (partner · CTO · automation) construye los pipelines n8n + APIs que unifican Shopify, Meta, Google y Klaviyo en un dashboard único, dejando al cliente con un solo número de verdad. Donde otras agencias separan equipo paid media de equipo data/automation —con handoffs y semanas de retraso—, Pablo y Jorge operan como un solo equipo. El cliente habla con los dos socios desde la primera reunión: sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Sabes qué % de tu spend va a adquisición real y cuánto a defender base existente?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos tu split adquisición vs retención, calculamos CAC adquisición específico vs LTV90 y te entregamos un mapa de decisiones para el próximo trimestre.</p>
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
          CAC vs LTV en eCommerce escalable →
        </Link>
        <p className="text-white/40 text-xs mt-1">La relación matemática que define cuánto puedes pagar por adquirir un cliente nuevo en D2C</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cac-blended-vs-cac-canal-ecommerce" className="text-white font-semibold hover:text-white/80">
          CAC blended vs CAC por canal →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué medir CAC por canal aislado distorsiona decisiones y cómo construir un CAC blended honesto</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cohort-analysis-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Cohort analysis en eCommerce D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo leer cohortes de compradores y detectar si la base recurrente está creciendo o quemándose</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/retargeting-meta-ads-ecommerce-2026" className="text-white font-semibold hover:text-white/80">
          Retargeting Meta Ads para eCommerce 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">Estructura warm del bucket retención: ventanas, exclusiones y secuencias post-AddToCart</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default AdquisicionVsRetencionPaidMediaD2cPage;
