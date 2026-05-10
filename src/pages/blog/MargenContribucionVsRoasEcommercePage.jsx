import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es el margen de contribución en un eCommerce D2C y por qué importa más que el ROAS?",
    a: "El margen de contribución es lo que queda de cada pedido después de restar todos los costes variables: COGS (coste del producto), packaging, fulfilment, comisiones de pasarela de pago, devoluciones esperadas, gastos de envío subsidiados y, sobre todo, el coste de adquisición pagado en Meta/Google. El ROAS solo mira ingresos / inversión publicitaria — ignora todo lo demás. Un D2C de moda con ROAS 3x y margen bruto del 35% puede estar perdiendo dinero después de COGS, devoluciones (15-25%) y operaciones, mientras que un D2C de suplementos con ROAS 1,8x y margen bruto del 70% puede ser muy rentable. La métrica que decide si la cuenta gana o pierde dinero a fin de mes es el margen de contribución por pedido, no el ROAS de la plataforma."
  },
  {
    q: "¿Cómo se calcula el margen de contribución por pedido en un eCommerce D2C español?",
    a: "Fórmula operativa: Margen de contribución = AOV − COGS − fulfilment − packaging − comisión pasarela − coste devoluciones esperado − coste adquisición. Ejemplo cuenta D2C moda España 2026: AOV 65€, COGS 22€ (34%), fulfilment 4,5€, packaging 1,2€, comisión Stripe/Bizum 1,8€, devoluciones 18% × coste medio devolución 4€ = 0,72€, coste adquisición Meta CAC 18€. Margen de contribución = 65 − 22 − 4,5 − 1,2 − 1,8 − 0,72 − 18 = 16,78€ por pedido (25,8% sobre AOV). Esta es la cifra real que entra en caja antes de costes fijos (equipo, software, alquiler). El error más frecuente en D2C es calcular ROAS objetivo sin haber calculado primero el margen de contribución mínimo aceptable — y por eso muchas cuentas escalan a pérdida sin saberlo."
  },
  {
    q: "¿Cuál es el margen de contribución mínimo saludable para un eCommerce D2C en España?",
    a: "Los rangos que vemos en cuentas D2C españolas rentables a 12-24 meses: margen de contribución por pedido del 20-35% sobre AOV es saludable; del 35-50% es excelente y permite escalar agresivamente; por debajo del 15% el negocio depende de subir el AOV o el LTV (suscripción, repetición) para no perder dinero. Por sector: moda 18-28% (penalizada por devoluciones del 20-30%), belleza 30-45% (devoluciones bajas, COGS bajo), suplementos 40-55% (mejor unit economics del D2C), hogar/decoración 25-40% (logística cara), mascotas 25-35%, alimentación premium 20-30% (logística refrigerada), tecnología/gadgets 15-25%. Si tu margen de contribución está por debajo del rango de tu sector, el problema rara vez es el ROAS — es la estructura de costes (COGS demasiado alto, AOV demasiado bajo, devoluciones descontroladas) o el coste de adquisición (CAC) inflado por una agencia que solo mira ROAS de plataforma."
  },
  {
    q: "¿Por qué el ROAS de Meta/Google puede ser engañoso al medir rentabilidad real?",
    a: "Tres razones principales: (1) ROAS in-platform reporta atribución last-click 7-day-click + 1-day-view, que sobreatribuye conversiones a la plataforma vs MER blended (Marketing Efficiency Ratio = revenue total / inversión paid total); en cuentas D2C el ROAS Meta suele ser 1,3-1,8x el MER real. (2) ROAS no descuenta devoluciones, que en moda llegan al 25-30% — un ROAS 3x pre-devoluciones es un MER 2,1-2,4x post-devoluciones. (3) ROAS no incluye descuentos automáticos aplicados en checkout (cupones, primer pedido) que sí aparecen en el revenue de plataforma; el AOV neto post-descuento suele ser 8-15% inferior. La conclusión: usar ROAS de plataforma como métrica única para decisiones de spend lleva a escalar campañas que parecen rentables pero queman caja. El indicador correcto combina margen de contribución, MER blended y CAC blended por canal."
  },
  {
    q: "¿Cuál es la relación entre margen de contribución, CAC objetivo y LTV en D2C?",
    a: "La regla operativa: el CAC objetivo = margen de contribución del primer pedido × ratio LTV/CAC deseado. Para D2C español saludable, ratio LTV/CAC mínimo 3:1 a 12 meses, ideal 4-5:1. Ejemplo: marca de suplementos con margen de contribución primer pedido 22€, repetición 2,8 pedidos/cliente en 12 meses con margen 24€/pedido extra (mejor por economías de escala), LTV 12 meses = 22 + (1,8 × 24) = 65,2€. CAC objetivo a ratio 3:1 = 21,7€; a ratio 4:1 = 16,3€. Si la cuenta opera con CAC 30€ pero el equipo paid mira solo ROAS, no detectará que está sub-2:1 hasta que la caja se quede sin colchón. Por eso en DayByDay arrancamos cada cuenta calculando margen de contribución, LTV por cohorte y CAC objetivo antes de tocar una sola campaña — sin ese cálculo, optimizar el ROAS es optimizar la métrica equivocada."
  },
  {
    q: "¿Qué dashboard o reporting hace falta para gestionar el margen de contribución de forma operativa?",
    a: "El stack mínimo que montamos para cuentas D2C: (1) Looker Studio o Power BI conectado a Shopify (revenue, AOV, devoluciones), Meta Ads (spend, ROAS in-platform), Google Ads (spend), GA4 (atribución cross-channel) y la pasarela (Stripe/Adyen) para comisiones reales. (2) Cálculo del margen de contribución por pedido automatizado con Google Sheets API o un script Node/Python que cruza COGS por SKU desde Shopify Inventory + costes operativos por categoría + spend paid blended por día. (3) Vista diaria de margen de contribución total (€), MER blended, CAC blended por canal, ratio LTV/CAC por cohorte mensual y % devoluciones. (4) Alerta automática cuando el margen de contribución diario cae bajo el umbral mínimo definido (típicamente -20% sobre baseline). En DayByDay el dashboard se entrega listo en la primera semana de onboarding — es la base para que las decisiones de spend dejen de mirar el ROAS y empiecen a mirar la métrica que realmente importa."
  },
  {
    q: "¿Cuándo es aceptable operar con margen de contribución negativo o muy bajo en D2C?",
    a: "Solo en 3 escenarios concretos y siempre con cap de gasto definido: (1) lanzamiento de marca con runway de 6-12 meses y modelo basado en suscripción/recurrencia donde el LTV12-24 cubrirá el CAC inicial — exige modelo financiero con cohortes proyectadas y validación de retención real >30% mes 3. (2) Test de canal nuevo (TikTok, YouTube, programmatic) con presupuesto acotado del 10-15% del spend total y horizonte de 60-90 días para alcanzar margen positivo. (3) Pico estacional con producto loss-leader que activa cross-sell de catálogo con margen mejor (ej: descuento brutal en producto entrada para captar lead que luego compra bundle). Fuera de esos 3 escenarios, operar con margen de contribución negativo es quemar caja sin estrategia — y es el motivo nº1 por el que D2C aparentemente exitosos cierran a los 24-36 meses. La disciplina de margen de contribución es la diferencia entre escalar de verdad y escalar a pérdida."
  }
];

const MargenContribucionVsRoasEcommercePage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Margen de contribución vs ROAS: la métrica que media buyers olvidan"
    description="Por qué el ROAS de Meta/Google es insuficiente para decidir spend en eCommerce D2C España: definición de margen de contribución, fórmula operativa por pedido, rangos saludables por sector D2C 2026, relación con CAC objetivo y LTV, errores frecuentes de media buyers que solo miran ROAS de plataforma, dashboard mínimo viable y enfoque DayByDay (Pablo + Jorge)."
    slug="margen-contribucion-vs-roas-ecommerce"
    datePublished="2026-05-09"
    dateModified="2026-05-09"
    readingTime="11 min"
    category="Unit Economics"
    keywords={[
      "margen contribución roas ecommerce",
      "margen contribución d2c",
      "roas vs margen contribución",
      "rentabilidad real ecommerce d2c",
      "unit economics d2c españa",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">El margen de contribución es la métrica que decide si tu eCommerce D2C gana o pierde dinero — el ROAS, no</strong>. La mayoría de media buyers en España siguen reportando ROAS in-platform como si fuera el indicador final de rentabilidad, cuando en realidad ignora COGS, devoluciones, comisiones de pasarela, fulfilment y descuentos en checkout. En cuentas D2C que hemos auditado en DayByDay, hemos visto campañas con ROAS Meta 3,2x reportar margen de contribución negativo después de cruzar todos los costes — y al cliente nadie se lo había explicado. En 2026, con el CPM de Meta subiendo año a año entre el 15% y el 25% en España, escalar mirando solo ROAS es escalar a pérdida con efecto retardado. Esta guía es el protocolo que aplicamos para que cada decisión de spend en una cuenta D2C se tome sobre la métrica correcta.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es el margen de contribución en un eCommerce D2C</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">El margen de contribución</strong> es la cantidad que queda de cada pedido después de restar todos los costes variables: COGS (coste del producto), packaging, fulfilment (warehouse + envío), comisión de pasarela de pago, coste esperado de devolución y coste de adquisición pagado en paid media. Es la cifra que aporta cada pedido a cubrir costes fijos (equipo, software, alquiler) y a generar beneficio. A diferencia del margen bruto (que solo descuenta COGS) o del ROAS (que solo mira revenue / spend paid), el margen de contribución es el único indicador que refleja la rentabilidad real por unidad vendida.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      <a href="https://www.shopify.com/blog/contribution-margin" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Según Shopify, el margen de contribución es la métrica financiera que mejor predice la viabilidad a largo plazo de un eCommerce D2C</a>: por encima del 30% sobre AOV el negocio puede absorber subidas de CPM y aún financiar crecimiento; por debajo del 15% cualquier shock externo (subida de costes logísticos, devolución masiva, evento fiscal) compromete la caja.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según <a href="https://www.statista.com/topics/871/online-shopping/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Statista, en 2026 el coste medio de adquisición (CAC) de un cliente nuevo en eCommerce D2C europeo subió un 22% respecto a 2024</a>, mientras que el AOV medio subió solo un 6%. La consecuencia operativa: cualquier marca que gestione spend mirando solo ROAS de plataforma, sin recalcular margen de contribución cada trimestre, está perdiendo entre 3 y 8 puntos de margen sin darse cuenta.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Fórmula operativa: cómo calcular el margen de contribución por pedido</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La fórmula que usamos en DayByDay para cada cuenta D2C nueva, recalculada cada mes:
    </p>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-mono text-sm leading-relaxed">
        Margen contribución (€) = AOV − COGS − fulfilment − packaging − comisión pasarela − (% devolución × coste devolución) − CAC
      </p>
      <p className="text-white/50 text-xs mt-3 leading-relaxed">
        Margen contribución (%) = Margen contribución (€) / AOV × 100
      </p>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Ejemplo cuenta D2C de moda España 2026 — AOV 65€:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Componente</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Importe</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">% sobre AOV</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cómo calcularlo</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "AOV (revenue por pedido)", i: "65,00€", p: "100%", h: "Shopify Analytics, neto post-descuento" },
            { c: "− COGS (coste producto)", i: "−22,00€", p: "−33,8%", h: "Inventory cost por SKU × mix de pedido" },
            { c: "− Fulfilment (warehouse+envío)", i: "−4,50€", p: "−6,9%", h: "Coste 3PL real, no tarifa lista" },
            { c: "− Packaging", i: "−1,20€", p: "−1,8%", h: "Caja + relleno + albarán por pedido" },
            { c: "− Comisión pasarela", i: "−1,80€", p: "−2,8%", h: "Stripe/Adyen/Bizum: ~2,5-3%" },
            { c: "− Coste devoluciones (18% × 4€)", i: "−0,72€", p: "−1,1%", h: "% real devolución × coste devolución" },
            { c: "− CAC (paid media)", i: "−18,00€", p: "−27,7%", h: "Spend total / nuevos clientes (blended)" },
            { c: "= Margen de contribución", i: "16,78€", p: "25,8%", h: "Cifra que entra en caja por pedido" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.i}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.h}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      En este ejemplo el ROAS in-platform Meta podría reportarse como 3,6x (revenue 65€ / spend Meta 18€), pero el margen real es solo el 25,8% del AOV — y eso antes de costes fijos. Quien escala una cuenta así mirando solo ROAS de plataforma escala revenue pero comprime margen, y la caja lo nota 60-90 días después.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Margen de contribución saludable por sector D2C en España 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Rangos observados en cuentas D2C españolas rentables a 12-24 meses (datos propios + benchmark sectorial). El % se calcula sobre AOV y ya incluye CAC blended:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Sector D2C</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Margen contribución típico</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Excelente (top decile)</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Penalización principal</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: "Moda", t: "18-28%", e: "30-38%", p: "Devoluciones 20-30%" },
            { s: "Belleza / cosmética", t: "30-45%", e: "48-58%", p: "CPM Meta saturado" },
            { s: "Suplementos / nutrición", t: "40-55%", e: "58-65%", p: "Regulación + creative compliance" },
            { s: "Hogar / decoración", t: "25-40%", e: "42-50%", p: "Logística cara, AOV alto" },
            { s: "Mascotas", t: "25-35%", e: "38-45%", p: "Devoluciones logísticas" },
            { s: "Alimentación premium", t: "20-30%", e: "33-40%", p: "Logística refrigerada" },
            { s: "Tecnología / gadgets", t: "15-25%", e: "28-35%", p: "COGS alto + devoluciones técnicas" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.t}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.e}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Si tu margen de contribución está por debajo del rango típico de tu sector, el problema rara vez es el ROAS de plataforma — son los costes de COGS, devoluciones o el CAC blended inflado. Para profundizar en cómo calcular el CAC blended correctamente, ver la <Link to="/blog/cac-blended-vs-cac-canal-ecommerce" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía CAC blended vs CAC por canal en eCommerce</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Por qué el ROAS de Meta/Google es engañoso (y qué métricas usar en su lugar)</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "El ROAS in-platform Meta usa atribución last-click 7-day-click + 1-day-view, que sobreatribuye conversiones a la plataforma vs el MER blended real. En cuentas D2C españolas el ROAS Meta suele ser 1,3-1,8x el MER real — el cliente cree que escala con ROAS 3x y en realidad opera a MER 2x.",
        "El ROAS no descuenta devoluciones. En moda con 25-30% de devolución, un ROAS 3x pre-devoluciones es un MER 2,1-2,4x post-devoluciones — la diferencia entre rentable y deficitario en cuentas con margen ajustado.",
        "El ROAS no descuenta descuentos automáticos aplicados en checkout (cupón primer pedido, código influencer, descuento por abandono). El AOV neto post-descuento suele ser 8-15% inferior al AOV bruto que reporta Meta.",
        "El ROAS no asigna correctamente el coste de adquisición incremental de campañas de retargeting/brand. Una campaña de retargeting con ROAS 8x in-platform suele tener incrementalidad real <40% — el cliente habría comprado igual sin ese impacto. El benchmark correcto es incrementalidad medida con holdout geo.",
        "El ROAS ignora completamente el LTV. Una cuenta con ROAS 1,8x y LTV/CAC 5:1 a 12 meses (suplementos con suscripción) es más rentable que una cuenta con ROAS 3,5x y LTV/CAC 1,8:1 (tecnología sin recurrencia).",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>
    <p className="text-white/70 leading-relaxed mb-5">
      Las métricas que sustituyen al ROAS in-platform como cuadro de mando real: <strong className="text-white">MER blended</strong> (revenue total / inversión paid total, dato no manipulable por la plataforma), <strong className="text-white">CAC blended por canal</strong> (spend total canal / nuevos clientes atribuidos), <strong className="text-white">margen de contribución por pedido</strong> y <strong className="text-white">ratio LTV/CAC por cohorte</strong>. Para entender el detalle de la atribución y por qué iOS empeoró aún más el ROAS in-platform, ver la <Link to="/blog/ios-atribucion-meta-ads-2026-d2c" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía iOS atribución Meta Ads 2026 para D2C</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">CAC objetivo: cómo derivarlo desde el margen de contribución</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La fórmula operativa para definir el CAC objetivo correcto, no el que dicta la plataforma:
    </p>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-mono text-sm leading-relaxed">
        CAC objetivo = (Margen contribución 1er pedido × ratio LTV/CAC deseado)
      </p>
      <p className="text-white/50 text-xs mt-3 leading-relaxed">
        Ratio LTV/CAC mínimo saludable: 3:1 a 12 meses · Ideal: 4-5:1 · Por debajo de 2:1 la cuenta consume caja
      </p>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Ejemplo marca de suplementos: margen contribución primer pedido (sin CAC) = 28€. Repetición esperada 12 meses = 1,8 pedidos extra × margen 24€/pedido = 43,2€. LTV bruto 12 meses = 28 + 43,2 = 71,2€. CAC objetivo a ratio 3:1 = 23,7€; a ratio 4:1 = 17,8€. Si la cuenta opera con CAC 32€ pero el equipo paid solo mira ROAS Meta, no detectará que está sub-2:1 hasta que la caja se quede sin colchón. Para entender cómo calcular LTV correctamente por cohorte, ver la <Link to="/blog/cac-vs-ltv-ecommerce-escalable" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía CAC vs LTV en eCommerce escalable</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Dashboard mínimo viable para gestionar margen de contribución</h2>
    <div className="space-y-3 mb-6">
      {[
        "Conexión Shopify (revenue, AOV, devoluciones, descuentos checkout) + Meta Ads (spend, ROAS in-platform, CPMs por audience) + Google Ads (spend, ROAS, brand vs non-brand) + GA4 (atribución cross-channel, sesiones, paid vs orgánico) + pasarela Stripe/Adyen (comisiones reales por método de pago).",
        "Cálculo automatizado del margen de contribución por pedido cruzando COGS por SKU desde Shopify Inventory + costes operativos por categoría (fulfilment, packaging) + spend paid blended por día. Stack típico: Google Sheets API + Apps Script para D2C <500K€/año, BigQuery + Dataform para >500K€/año, Power BI con conector ERP para B2B con SAP/Dynamics.",
        "Vista diaria de las 5 métricas críticas: margen contribución total (€), MER blended (revenue/spend), CAC blended por canal, ratio LTV/CAC por cohorte mensual, % devoluciones. ROAS in-platform queda como métrica secundaria, no primaria.",
        "Alerta automática cuando margen de contribución diario cae bajo umbral mínimo (típico: −20% sobre baseline 30 días). Slack/email + acción definida (pausar campaña con CAC outlier, revisar mix producto, auditar devoluciones).",
        "Reporting semanal al cliente con esas 5 métricas + lectura cualitativa: ¿el margen cae por CAC, por mix producto, por devoluciones o por descuento agresivo? Decisión de spend basada en el driver real, no en mover sliders sobre ROAS de plataforma.",
        "Auditoría trimestral del modelo: recalcular COGS reales (precios proveedor, FX), recalcular tasa devolución por SKU, recalcular ratio LTV/CAC por cohorte 12 meses. Sin auditoría trimestral el modelo se desfasa y las decisiones se vuelven a tomar sobre supuestos viejos.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Onboarding de cuenta D2C arranca SIEMPRE con cálculo de margen de contribución antes de tocar campañas: Pablo audita unit economics (AOV, COGS, devoluciones, mix producto), Jorge cruza datos Shopify + pasarela + 3PL para validar costes reales por pedido. Entregamos el modelo de margen de contribución en la primera semana — sin él, optimizar es optimizar a ciegas.",
        "Stack dashboard ad-hoc según madurez: Google Sheets + Apps Script para cuentas <500K€/año (rápido, mantenible, sin sobre-ingeniería); Looker Studio + BigQuery para 500K-5M€/año (cohorts, retención, MER blended automatizado); Power BI con conectores ERP para B2B con SAP/Dynamics. Jorge implementa el stack, Pablo define las métricas que importan al cliente concreto.",
        "CAC objetivo recalculado cada trimestre por cohorte y por canal — no se hereda del trimestre anterior. Si el ratio LTV/CAC cae bajo 3:1 en una cohorte, pausamos escalado y atacamos las palancas del numerador (LTV: AOV, repetición, suscripción) o del denominador (CAC: creative testing, audiencia, deduplicación CAPI).",
        "Solución ad-hoc Pablo + Jorge: Pablo cierra estrategia de spend, mix de canal y creative testing en función del margen objetivo; Jorge implementa server-side tracking con event_id deduplicado, dashboard con alertas automáticas y agente IA que monitoriza márgenes y avisa cuando una campaña se desvía. Donde otras agencias entregan reporting de ROAS in-platform, en DayByDay entregamos margen de contribución por pedido, MER blended y ratio LTV/CAC en tiempo real.",
        "Reporting al cliente con foco en rentabilidad real, no en métricas de vanidad: el dashboard que recibe cada lunes lleva margen contribución diario, MER blended semanal, CAC blended por canal y ratio LTV/CAC por cohorte. ROAS in-platform aparece como métrica secundaria de control, no como KPI de decisión.",
        "Caso real reciente: cuenta de moda D2C llegó a DayByDay con ROAS Meta 3,1x reportado, margen de contribución calculado real -2% (perdiendo dinero por devoluciones del 28% no descontadas en el modelo). En 90 días subimos margen de contribución a +18% sin tocar el ROAS — bajando devoluciones con sizing guide en landing, subiendo AOV con bundle automatizado y deduplicando CAPI para que el CAC blended cayera un 22%.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo (founder · paid media) lidera estrategia de spend, creative testing y mix de canal en función del margen objetivo del cliente; Jorge (CTO · automation) lidera implementación técnica del modelo de margen, dashboard automatizado, server-side tracking deduplicado y agentes IA que monitorizan rentabilidad en tiempo real. DayByDay es uno de los pocos consultoras en España que combina senior paid media y senior automation engineering en una sola conversación — el cliente nunca tiene que coordinar a dos proveedores ni perder semanas en handoffs entre marketing y data. Sin account managers, sin perfiles junior, decisiones tomadas en la misma reunión.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu agencia te reporta ROAS pero no margen de contribución?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos tu modelo de unit economics, calculamos margen de contribución real por pedido, validamos CAC objetivo vs LTV por cohorte y entregamos plan de palancas priorizado por impacto en margen.</p>
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
          CAC vs LTV en eCommerce escalable: ratios, cohortes y cuándo escalar →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo derivar el CAC objetivo desde el margen de contribución y proyectar LTV por cohorte</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cac-blended-vs-cac-canal-ecommerce" className="text-white font-semibold hover:text-white/80">
          CAC blended vs CAC por canal en eCommerce →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué el CAC in-platform engaña y cómo calcular el CAC blended real</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/modelos-atribucion-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Modelos de atribución en eCommerce D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Last-click, data-driven, MMM y holdout geo: qué modelo usar según etapa de la cuenta</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/que-es-roas-meta-ads" className="text-white font-semibold hover:text-white/80">
          Qué es el ROAS en Meta Ads y cómo se calcula →
        </Link>
        <p className="text-white/40 text-xs mt-1">Definición, fórmula y por qué el ROAS in-platform no es la métrica final de rentabilidad</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/aumentar-aov-ecommerce-d2c-palancas" className="text-white font-semibold hover:text-white/80">
          Cómo subir el AOV en D2C: 7 palancas reales →
        </Link>
        <p className="text-white/40 text-xs mt-1">La palanca con mejor ROI sobre el margen de contribución sin tocar el spend de adquisición</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default MargenContribucionVsRoasEcommercePage;
