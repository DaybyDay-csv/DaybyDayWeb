import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es un modelo de atribución en eCommerce D2C?",
    a: "Un modelo de atribución es la regla que decide qué canal (o canales) se lleva el crédito de una venta cuando el cliente ha pasado por varios puntos de contacto antes de comprar. En eCommerce D2C importa porque el customer journey medio cruza 3-7 touchpoints (anuncio Meta, búsqueda branded, email, retargeting, orgánico) y cada modelo asigna ese crédito de forma distinta. Cambiar de last-click a data-driven puede reducir el ROAS aparente de Meta un 25-40% y subir el de orgánico/email — pero las decisiones de inversión deberían basarse en el modelo, no en lo que diga la plataforma."
  },
  {
    q: "¿Cuál es la diferencia entre last-click, first-click, lineal y data-driven?",
    a: "Last-click da el 100% al último canal que cerró la venta — sobreestima retargeting y branded search. First-click da el 100% al primer touchpoint — sobreestima descubrimiento (paid social TOFU). Lineal reparte el crédito a partes iguales entre todos los puntos de contacto — útil para visualizar journey pero no para decisiones. Data-driven (Google Ads, GA4) usa machine learning para asignar crédito en función del impacto incremental real de cada touchpoint en la conversión. En D2C español, data-driven suele dar la imagen más cercana a la realidad cuando hay >300 conversiones/mes; por debajo, el modelo es ruido."
  },
  {
    q: "¿Qué es Marketing Mix Modeling (MMM) y cuándo conviene usarlo en D2C?",
    a: "MMM es un modelo estadístico (regresión multivariable) que correlaciona inversión por canal con ventas totales del negocio en el tiempo, sin depender de cookies ni píxeles. Mide impacto incremental real, captura efectos offline (TV, OOH, branding) y aguanta iOS, GDPR y bloqueo de tracking sin degradarse. Conviene cuando un D2C invierte >50K€/mes en paid total, opera 5-7+ canales en paralelo, o quiere validar lo que dicen Meta y Google con una capa independiente. Por debajo de ese tamaño, MMM es overkill; data-driven en GA4 + análisis incremental por canal es suficiente."
  },
  {
    q: "¿Por qué Meta Ads sobreatribuye conversiones frente al modelo de negocio real?",
    a: "Tres razones: (1) Meta usa atribución 7-day-click + 1-day-view por defecto — cuenta como conversión cualquier compra dentro de los 7 días tras un click o 1 día tras una impresión, aunque la venta la cerrara realmente Google branded; (2) modeled conversions: desde iOS 14.5, Meta estima un 25-35% de las conversiones que no puede medir directamente y las añade al ROAS reportado; (3) double counting: si el cliente vio anuncio Meta y luego buscó la marca en Google, ambos canales reportan la conversión por separado. La discrepancia entre ROAS Meta y ROAS real (Shopify / blended) suele rondar 20-35% en D2C españoles que auditamos."
  },
  {
    q: "¿Qué modelo de atribución debería usar mi D2C español ahora mismo?",
    a: "Depende del tamaño y madurez. <30K€/mes spend total: data-driven en GA4 como referencia + Shopify para validar volumen real, con CAC blended como métrica de salud. 30-100K€/mes: data-driven + análisis incremental por canal trimestral (apagar y encender canales para medir lift real) + dashboard con CAC blended por cohorte. >100K€/mes con varios canales: MMM trimestral o mensual como capa de validación independiente, encima del data-driven plataforma. En todos los casos, last-click es insuficiente; usarlo solo en D2C de ticket único y journey corto (<2 touchpoints)."
  },
  {
    q: "¿Cómo afecta iOS 17/18 y la pérdida de cookies a los modelos de atribución?",
    a: "Reduce drásticamente la fiabilidad de modelos basados en píxel/cookies (last-click, data-driven plataforma) porque desaparece o se anonimiza la señal de muchos touchpoints. Apple ha movido la cuota de Safari móvil iOS al 27,5% global (Statcounter, 2026), y un alto % de esos usuarios bloquea tracking cross-site. La consecuencia: la atribución determinística pierde precisión, y por eso modelos probabilísticos como data-driven y especialmente MMM ganan peso. La respuesta operativa pasa por server-side tracking (Conversions API, server-side GTM), conversiones modeladas y MMM para validación independiente."
  },
  {
    q: "¿Vale la pena pagar herramientas de atribución multi-touch como Triple Whale, Northbeam o Polar Analytics?",
    a: "Sí en cuentas D2C >50-80K€/mes en paid con 3+ canales. Estas herramientas combinan datos plataforma, web tracking propio, datos Shopify y modelos de atribución multi-touch ajustables (last-click, lineal, data-driven, position-based) en una sola vista, con CAC blended y por canal cruzados con LTV. El valor real no es el dato bruto sino la unificación: misma fuente de verdad para founder, media buyer y CFO. Por debajo de ese tamaño, GA4 + dashboard Looker Studio + Shopify Reports cubre el 80% del valor a coste cero."
  },
];

const ModelosAtribucionEcommerceD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Modelos de atribución para D2C: last-click, data-driven y MMM explicados"
    description="Guía práctica de modelos de atribución para eCommerce D2C en España: diferencias reales entre last-click, first-click, lineal, data-driven y Marketing Mix Modeling (MMM); por qué Meta Ads sobreatribuye 20-35% frente al ROAS real; qué modelo conviene según tamaño de cuenta; impacto de iOS 17/18 y pérdida de cookies; herramientas (GA4, Triple Whale, Northbeam) y cómo decide DayByDay qué modelo aplicar."
    slug="modelos-atribucion-ecommerce-d2c"
    datePublished="2026-05-05"
    dateModified="2026-05-05"
    readingTime="11 min"
    category="Métricas"
    keywords={[
      "modelos atribución ecommerce",
      "atribución meta ads",
      "data-driven attribution d2c",
      "marketing mix modeling ecommerce",
      "atribución multi-touch d2c",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      Los <strong className="text-white">modelos de atribución en eCommerce</strong> son la regla que decide qué canal se lleva el crédito de cada venta cuando el cliente ha cruzado varios touchpoints antes de comprar. En D2C español es el debate más caro y peor resuelto: la mayoría de cuentas se rige por lo que dice Meta Business Manager (last-click + modeled), y eso suele sobrevalorar paid social entre un 20% y un 35% frente al ROAS real del negocio. Inversión, escalado y decisiones de canal acaban tomados sobre datos que no representan la realidad.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Esta guía explica los modelos de atribución que importan en D2C (last-click, first-click, lineal, position-based, data-driven y Marketing Mix Modeling), cuándo usar cada uno según tamaño y madurez, qué cambia con iOS 17/18 y pérdida de cookies, y cómo decidimos en DayByDay qué modelo aplicar para que el founder tenga una sola fuente de verdad y no tres dashboards contradictorios.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es un modelo de atribución y por qué importa en D2C</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Un modelo de atribución es la regla que asigna el crédito de una conversión entre los distintos puntos de contacto que ha tenido el cliente antes de comprar. En un D2C medio español, el customer journey cruza entre 3 y 7 touchpoints — anuncio Meta de descubrimiento, búsqueda branded en Google, email de bienvenida, retargeting dinámico, orgánico social — antes de cerrar el primer pedido. Cada modelo reparte ese crédito de forma distinta, y eso cambia radicalmente qué canal parece "rentable" y cuál no.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      La atribución importa porque condiciona la inversión: si tu dashboard dice que Meta tiene ROAS 4,5x y Google branded 12x, vas a meter más en Google. Pero si Google branded está cerrando ventas que originó Meta tres días antes, estás midiendo demanda generada por otro canal. <a href="https://www.thinkwithgoogle.com/intl/en-emea/marketing-strategies/data-and-measurement/marketing-attribution-guide/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Think with Google documenta</a> que journeys digitales en retail superan los 5 touchpoints en más del 50% de los casos — atribuir todo a uno solo deforma la realidad.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Los 6 modelos de atribución relevantes para eCommerce D2C</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Modelo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cómo asigna el crédito</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cuándo es útil</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Riesgo principal</th>
          </tr>
        </thead>
        <tbody>
          {[
            { m: "Last-click", c: "100% al último touchpoint antes de comprar", u: "Negocios con journey corto (<2 touchpoints), ticket impulsivo", r: "Sobrevalora retargeting y branded search; ignora canales TOFU" },
            { m: "First-click", c: "100% al primer touchpoint", u: "Validar qué canal abre demanda nueva (paid social TOFU)", r: "Ignora canales que cierran venta; útil solo como contraste" },
            { m: "Lineal", c: "Reparto a partes iguales entre todos los touchpoints", u: "Visualizar journey, comparar canales sin sesgo", r: "No refleja impacto real; ningún canal queda bien medido" },
            { m: "Position-based (40-20-40)", c: "40% primero, 40% último, 20% intermedios", u: "D2C con journey medio (3-5 touchpoints) y embudo claro TOFU/MOFU/BOFU", r: "Ponderación arbitraria; no captura impacto real por canal" },
            { m: "Data-driven (GA4, Google Ads)", c: "ML asigna crédito según impacto incremental medido", u: ">300 conversiones/mes y multi-canal con tracking limpio", r: "Caja negra; degradación con pérdida de cookies; no ve offline" },
            { m: "Marketing Mix Modeling (MMM)", c: "Regresión sobre inversión vs ventas totales", u: ">50K€/mes spend, multi-canal, validación independiente", r: "Requiere 12-18 meses de datos; cuesta tiempo o herramienta dedicada" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.u}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      En D2C español, los tres modelos que sí merecen ser comparados son <strong className="text-white">last-click</strong> (referencia plataforma), <strong className="text-white">data-driven</strong> (referencia probabilística determinística) y <strong className="text-white">MMM</strong> (referencia independiente macro). Los otros sirven como contraste pero rara vez como modelo único de decisión.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Por qué Meta Ads sobreatribuye 20-35% en cuentas D2C españolas</h2>
    <div className="space-y-3 mb-6">
      {[
        "Atribución 7-day-click + 1-day-view por defecto: cuenta como conversión cualquier compra dentro de los 7 días tras un click o 1 día tras una impresión. En D2C con cliente recurrente o branded fuerte, eso atrapa ventas que cerraría el branded search igualmente.",
        "Modeled conversions: desde iOS 14.5 Apple bloquea tracking determinístico en Safari/iOS sin consentimiento. Meta usa modelos probabilísticos para estimar las conversiones que no puede medir y añade entre un 25% y un 35% al volumen reportado, según mercado.",
        "Double counting cross-canal: si el cliente vio anuncio Meta y luego buscó la marca en Google, Meta y Google reportan la misma conversión. La suma de canales nunca cuadra con Shopify.",
        "Atribución vista (view-through) en vídeo y reels: una visualización parcial sin click puede contar como conversión si el usuario compra dentro de 24h por cualquier canal. Sobreestima reels TOFU sistemáticamente.",
        "Eventos duplicados por píxel + CAPI mal configurado: cuando Conversions API y píxel client-side envían el mismo evento sin deduplicación correcta, Meta cuenta la compra dos veces. Es uno de los errores más frecuentes en cuentas que auditamos.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según el informe <a href="https://www.iabspain.es/estudio/estudio-de-inversion-publicitaria-en-medios-digitales-2025/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Inversión Publicitaria en Medios Digitales 2025 de IAB Spain</a>, redes sociales pagadas concentran más del 30% de la inversión digital en España, y en D2C esa cuota suele superar el 50%. Cuanto mayor es el peso de un canal, más caro es equivocarse en su atribución — un 25% de sobrestimación sobre el 50% del presupuesto distorsiona toda la planificación financiera.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué modelo aplicar según tamaño de cuenta D2C</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Spend total /mes</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Modelo recomendado</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Validación cruzada</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Frecuencia revisión</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: "<5.000€", m: "Last-click plataforma + Shopify total", v: "CAC blended mensual", f: "Mensual" },
            { s: "5.000-30.000€", m: "Data-driven GA4 + Shopify por fuente", v: "CAC blended por cohorte mensual", f: "Mensual + revisión trimestral" },
            { s: "30.000-100.000€", m: "Data-driven GA4 + análisis incremental por canal", v: "Apagar/encender canal trimestre + Triple Whale opcional", f: "Quincenal + incremental trimestral" },
            { s: "100.000-500.000€", m: "Data-driven + MMM trimestral", v: "MMM + incremental + dashboard unificado tipo Northbeam", f: "Semanal táctico, MMM trimestral" },
            { s: ">500.000€", m: "MMM mensual + data-driven + tracking server-side completo", v: "Geo-experiments anuales, lift studies plataforma", f: "Semanal táctico, MMM mensual" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.v}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.f}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La regla operativa: usar el modelo más sofisticado que el volumen de datos sostenga sin convertirse en ruido. MMM en una cuenta de 8K€/mes es teatro estadístico; last-click en una de 200K€/mes es negligencia. <a href="https://support.google.com/analytics/answer/10596866" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Google documenta el modelo data-driven en GA4</a> y conviene activarlo desde el día uno aunque no sea el modelo principal de decisión.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">iOS 17/18 y pérdida de cookies: qué cambia en atribución 2026</h2>
    <div className="space-y-3 mb-6">
      {[
        "Safari iOS bloquea cookies de terceros y limita tracking cross-site sin consentimiento explícito; representa más del 27% del tráfico móvil global (Statcounter 2026).",
        "Atribución determinística (last-click clásico, multi-touch basado en píxel) pierde precisión: entre un 20% y un 40% del journey cross-canal queda sin firma identificable.",
        "Modelos probabilísticos (data-driven, modeled conversions) ganan peso porque rellenan huecos con estimación basada en patrones agregados.",
        "MMM se vuelve imprescindible en cuentas grandes porque no depende de cookies ni IDs: trabaja sobre series temporales de inversión vs ingresos totales.",
        "Server-side tracking (Conversions API en Meta, server-side GTM, Enhanced Conversions en Google) es el suelo técnico mínimo para que cualquier modelo siga funcionando con calidad razonable.",
        "Consent Mode v2 obligatorio en EU: sin él, GA4 y Google Ads pierden la mayoría del tracking en visitantes sin consentimiento (~30-50% según vertical).",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Herramientas reales para gestionar atribución en D2C español</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Herramienta</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Modelo principal</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Coste orientativo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cuándo merece la pena</th>
          </tr>
        </thead>
        <tbody>
          {[
            { h: "GA4 + Looker Studio", m: "Data-driven + position-based + last-click", c: "Gratis", u: "Cualquier D2C; capa base obligatoria" },
            { h: "Shopify Reports + Sales by Source", m: "Last-click corregido por sesión Shopify", c: "Incluido en Shopify", u: "Validar volumen real vs plataformas" },
            { h: "Meta Attribution / Events Manager", m: "Last-click + modeled (7d click / 1d view)", c: "Gratis con cuenta Ads", u: "Optimización campañas, no decisión inversión" },
            { h: "Triple Whale", m: "Multi-touch ajustable + CAC blended", c: "≈ 100-500€/mes según spend", u: "30-200K€/mes spend, multi-canal" },
            { h: "Northbeam", m: "Multi-touch + MTA + MMM hybrid", c: "≈ 1.000-5.000€/mes", u: ">100K€/mes spend, founder-led growth" },
            { h: "Polar Analytics", m: "Multi-touch + data warehouse", c: "≈ 200-800€/mes", u: "30-150K€/mes spend, equipo data ligero" },
            { h: "MMM custom (BigQuery + R/Python o Recast)", m: "Marketing Mix Modeling", c: "Variable / equipo data", u: ">200K€/mes spend o multi-país" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.h}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.u}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría inicial de píxel + CAPI + GA4 + Consent Mode v2 antes de hablar de modelos: si la base de datos está rota, ningún modelo arregla la decisión. En el 70% de las cuentas que entran encontramos eventos duplicados o sin deduplicar.",
        "Modelo principal data-driven en GA4 + last-click plataforma como contraste, con CAC blended como métrica de salud financiera. Misma vista en Looker Studio para founder y media buyer — una sola fuente de verdad.",
        "Comparativa mensual ROAS Meta vs ROAS Shopify por fuente vs ROAS data-driven GA4: si el gap supera el 25%, abrimos investigación (atribución, fraud, modeled excessivo).",
        "Análisis incremental por canal cada trimestre en cuentas >30K€/mes: apagamos un canal 14-21 días en geos secundarias y medimos lift real vs lo que decía el modelo. Nada predice incrementalidad como apagar el canal.",
        "Soluciones ad-hoc combinando paid media (Pablo) y stack tech (Jorge): para cuentas con 4+ canales montamos pipeline propio en BigQuery + dashboard Looker que cruza spend plataforma, pedidos Shopify, CRM y datos de marketing automation. Es el tipo de pieza ad-hoc que diferencia a DayByDay de agencias playbook.",
        "MMM trimestral cuando el spend supera 50K€/mes y hay >12 meses de histórico: validación independiente que no depende de cookies ni iOS y que aguanta cualquier cambio futuro de privacidad.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo lidera paid media y estrategia; Jorge lidera implementación tech, server-side tracking y dashboards custom. Donde otras agencias separan marketing y tech entre dos proveedores que rara vez se coordinan, en DayByDay las decisiones de atribución se cierran en la misma reunión: Pablo propone qué medir, Jorge valida cómo medirlo y monta la pipeline. Sin account managers, sin handoffs.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu ROAS plataforma no cuadra con lo que cobra Shopify?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos tu modelo de atribución, píxel, CAPI y discrepancia plataforma vs negocio. Te decimos qué modelo te toca según tu spend y dónde estás dejando dinero sobre la mesa.</p>
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
        <Link to="/blog/marketing-mix-modeling-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Marketing Mix Modeling (MMM) para D2C: cuándo aplicarlo y qué resuelve →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cuándo MMM tiene sentido como capa independiente de validación</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cac-blended-vs-cac-canal-ecommerce" className="text-white font-semibold hover:text-white/80">
          CAC blended vs CAC por canal: qué métrica usar para escalar un D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">La métrica de salud financiera que valida cualquier modelo de atribución</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cohort-analysis-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Cohort analysis para eCommerce D2C: la métrica que predice si tu negocio escala →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo cruzar atribución con LTV real por cohorte de adquisición</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/metricas-meta-ads-importantes-ecommerce" className="text-white font-semibold hover:text-white/80">
          Métricas de Meta Ads que importan en eCommerce →
        </Link>
        <p className="text-white/40 text-xs mt-1">Qué leer dentro de Meta Ads cuando ya sabes que sobreatribuye</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cac-vs-ltv-ecommerce-escalable" className="text-white font-semibold hover:text-white/80">
          CAC vs LTV: cómo construir un eCommerce escalable →
        </Link>
        <p className="text-white/40 text-xs mt-1">Marco financiero que da sentido a cualquier número de atribución</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default ModelosAtribucionEcommerceD2cPage;
