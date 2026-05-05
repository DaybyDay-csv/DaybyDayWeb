import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es Marketing Mix Modeling (MMM) en eCommerce D2C?",
    a: "Marketing Mix Modeling (MMM) es un modelo estadístico de regresión multivariable que correlaciona la inversión por canal con las ventas totales del negocio en el tiempo, sin depender de cookies, píxeles ni IDs de usuario. Mide impacto incremental real de cada canal (paid social, paid search, email, afiliación, OOH, TV) sobre la facturación, captura efectos offline y branding, y resiste iOS 17/18, GDPR y bloqueo de tracking sin degradarse. En D2C español se usa como capa independiente que valida lo que dicen Meta y Google, pensada para cuentas con >50K€/mes de spend, varios canales activos y al menos 12-18 meses de histórico semanal."
  },
  {
    q: "¿Cuándo conviene aplicar MMM en un D2C y cuándo es overkill?",
    a: "Conviene aplicar MMM cuando se cumplen las tres condiciones a la vez: spend total >50K€/mes, 4+ canales en paralelo (Meta, Google, TikTok, email, afiliación u offline) y >12 meses de histórico semanal granular. Por debajo de eso, MMM es teatro estadístico: el modelo no tiene varianza suficiente para separar señal de ruido. En cuentas pequeñas (<30K€/mes, 1-2 canales), data-driven en GA4 + análisis incremental por canal es suficiente. MMM también es overkill cuando el journey es muy corto (ticket impulsivo único) o cuando el negocio no puede mover sus presupuestos lo suficiente como para generar la variabilidad que el modelo necesita."
  },
  {
    q: "¿Qué diferencia a MMM de los modelos de atribución multi-touch (MTA)?",
    a: "MTA (multi-touch attribution) trabaja a nivel usuario: rastrea cada touchpoint con cookies/píxeles y reparte el crédito de cada conversión entre canales. MMM trabaja a nivel agregado: mira la inversión semanal por canal frente a las ventas semanales totales, sin necesidad de identificar usuarios. La consecuencia práctica: MTA se degrada con iOS, ITP, AdBlock y Consent Mode; MMM no, porque trabaja sobre series temporales agregadas. Pero MMM no es accionable a nivel anuncio o ad set — sirve para decisiones de mix de presupuesto entre canales y validación incremental, no para optimizar campañas día a día."
  },
  {
    q: "¿Qué datos mínimos necesita un MMM para ser fiable en D2C español?",
    a: "Como mínimo: 12-18 meses de histórico semanal con (1) inversión por canal y semana (Meta, Google, TikTok, email, afiliación, offline si aplica), (2) ventas totales semanales del negocio (Shopify), (3) variables externas controladas (estacionalidad, BFCM, promociones, lanzamientos producto, días festivos España). 24 meses es lo ideal porque captura dos ciclos completos de Q4. Sin ese volumen el modelo no separa el efecto canal del ruido estacional. Para D2C en España añadir además: tipo de cambio si vendes fuera, evento país (puente, rebajas oficiales) y, en moda/regalo, climatología por temporada."
  },
  {
    q: "¿Cuánto cuesta implementar MMM en un D2C y qué herramientas existen?",
    a: "Hay tres tramos. (1) Open-source/manual: librerías Robyn (Meta) o LightweightMMM (Google) en Python/R sobre BigQuery, coste 0 en licencia pero requiere equipo data interno o consultor (≈3.000-8.000€ implementación inicial + mantenimiento). (2) MMM-as-a-service especializado: Recast, Cassandra, Mass Analytics o Sellforte, entre 1.500-6.000€/mes según tamaño. (3) Suites multi-touch con MMM hybrid: Northbeam (~1.000-5.000€/mes) o Polar Analytics (~200-800€/mes) que combinan MTA con capa MMM ligera. La regla operativa: si gastas <50K€/mes en paid total, no inviertas en MMM premium; ROI no aparece. Si gastas >150K€/mes, MMM custom o Recast/Sellforte se pagan solos en el primer trimestre por mejor reasignación."
  },
  {
    q: "¿MMM sustituye al ROAS de plataforma o a GA4?",
    a: "No sustituye, complementa. ROAS plataforma sigue siendo necesario para optimización táctica (qué ad set escalar, qué creativo apagar) y GA4 da la vista user-level con data-driven. MMM se usa por encima de las dos como validación independiente macro: cada trimestre o cada mes, comparas qué dice MMM sobre el impacto incremental real de cada canal frente a lo que reportan Meta, Google y GA4. Cuando hay gaps grandes (>30%) entre ROAS plataforma y MMM, sabes que estás sobre o infravalorando un canal. La decisión de mix de presupuesto trimestral se cierra con MMM; las decisiones diarias con plataforma + GA4."
  },
  {
    q: "¿Cómo se valida que el MMM está dando señales reales y no inventando coeficientes?",
    a: "Con tres pruebas. (1) Holdout temporal: el modelo se entrena con los primeros 12 meses y se valida prediciendo los 3-6 meses siguientes — error MAPE razonable está entre 5% y 15%. (2) Geo-experiments controlados: apagar un canal en una región durante 2-4 semanas y medir el lift real en ventas vs lo que predijo el MMM; si los números no cuadran dentro de un margen aceptable, el modelo está mal calibrado. (3) Cross-check con incremental tests plataforma (Meta Conversion Lift, Google Geo Lift) y comparar el ROI incremental MMM vs plataforma. Sin estas tres validaciones, MMM es una caja negra que da números bonitos pero no decisión accionable."
  },
];

const MarketingMixModelingEcommerceD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Marketing Mix Modeling (MMM) para D2C: cuándo aplicarlo y qué resuelve"
    description="Guía práctica de Marketing Mix Modeling (MMM) para eCommerce D2C en España: qué es, cuándo aplicarlo según tamaño de spend, qué datos necesita, diferencias frente a MTA, herramientas reales (Robyn, LightweightMMM, Recast, Northbeam), cómo se valida con holdout y geo-experiments, y cómo decide DayByDay si MMM tiene sentido para tu cuenta."
    slug="marketing-mix-modeling-ecommerce-d2c"
    datePublished="2026-05-05"
    dateModified="2026-05-05"
    readingTime="11 min"
    category="Métricas"
    keywords={[
      "mmm ecommerce d2c",
      "marketing mix modeling españa",
      "mmm vs atribución multi-touch",
      "robyn mmm meta",
      "incremental lift d2c",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Marketing Mix Modeling (MMM) en eCommerce D2C</strong> es el modelo estadístico que más founders españoles preguntan en 2026 y peor se aplica: o se monta en cuentas demasiado pequeñas para que el modelo respire, o se ignora justo en las cuentas grandes donde Meta, Google y GA4 ya no cuadran entre sí. La realidad es que MMM no es la solución universal a la atribución, pero sí la única capa que aguanta iOS 17/18, GDPR y la pérdida de cookies sin degradarse, porque trabaja con datos agregados, no con usuarios identificados.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Esta guía explica qué es MMM en cristiano, cuándo conviene aplicarlo en un D2C español según tamaño de spend y madurez, qué datos necesita para no ser teatro estadístico, en qué se diferencia de los modelos multi-touch tradicionales, qué herramientas existen (Robyn, LightweightMMM, Recast, Sellforte, Northbeam, Polar) con coste real, y cómo decidimos en DayByDay si una cuenta está lista para MMM o si toca quedarse en data-driven + incrementalidad por geo.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es Marketing Mix Modeling y por qué se vuelve imprescindible en 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Marketing Mix Modeling es una técnica de regresión multivariable que estima el impacto incremental de cada canal de marketing sobre las ventas totales del negocio, mirando series temporales semanales o mensuales de inversión vs facturación. La gran diferencia frente a la atribución multi-touch (MTA) es que MMM no necesita rastrear usuarios individuales: trabaja con datos agregados, lo que lo hace inmune a iOS 17/18, ITP de Safari, ad blockers y consent mode v2. <a href="https://github.com/facebookexperimental/Robyn" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Robyn, el framework MMM open source de Meta</a>, formaliza esa idea: ajustar curvas de saturación y adstock por canal y medir el lift incremental real.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Por qué importa ahora más que nunca: <a href="https://www.thinkwithgoogle.com/intl/en-emea/future-of-marketing/digital-transformation/measuring-marketing-effectiveness/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Think with Google documenta</a> que las marcas que usan MMM combinado con experimentos geo y atribución plataforma toman decisiones de mix con un margen de error 30-50% menor que las que dependen sólo de last-click. En D2C español, donde el peso del paid social supera el 50% del presupuesto en muchas cuentas según el <a href="https://www.iabspain.es/estudio/estudio-de-inversion-publicitaria-en-medios-digitales-2025/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Estudio de Inversión Publicitaria de IAB Spain</a>, equivocarse en la atribución de ese canal no es un error de medición, es un error de inversión que mueve seis cifras al año.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué resuelve MMM (y qué NO resuelve) en un D2C</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Pregunta</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">¿Lo resuelve MMM?</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Por qué</th>
          </tr>
        </thead>
        <tbody>
          {[
            { q: "¿Cuánto invertir en Meta vs Google vs TikTok el próximo trimestre?", r: "Sí", p: "MMM compara el ROI incremental real de cada canal a nivel agregado y propone reasignación óptima" },
            { q: "¿Está saturándose mi inversión en Meta?", r: "Sí", p: "MMM ajusta curvas de saturación que muestran el punto donde 1€ extra deja de aportar venta incremental" },
            { q: "¿Mi presencia en TV/OOH/podcast aporta venta o branding?", r: "Sí", p: "Es la única forma de medir canales offline sin tracking directo a la conversión" },
            { q: "¿Qué creativo de Meta funciona mejor?", r: "No", p: "MMM no trabaja a nivel anuncio; eso es A/B testing dentro de Meta Ads" },
            { q: "¿Qué keyword Google convierte mejor?", r: "No", p: "MMM no llega a nivel keyword; eso requiere data-driven y Google Ads scripts" },
            { q: "¿Qué cliente individual hizo journey por qué canales?", r: "No", p: "MMM trabaja con datos agregados, no a nivel usuario; eso es MTA o GA4" },
            { q: "¿Cuál es el lift incremental real de mi paid social este mes?", r: "Sí, con validación geo", p: "MMM lo estima, geo-experiments lo confirman; combinarlos es el estándar" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.q}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.r}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      MMM es una capa estratégica, no operativa. Resuelve preguntas de mix de presupuesto, saturación de canal, validación independiente y medición de canales offline. No resuelve preguntas tácticas de optimización dentro de plataforma (creativo, audiencia, keyword, ad set), donde sigue mandando ROAS plataforma + GA4 + experimentación A/B.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cuándo aplicar MMM según tamaño y madurez del D2C</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Spend total /mes</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">¿MMM tiene sentido?</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Alternativa recomendada</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Frecuencia</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: "<10.000€", m: "No", a: "Last-click plataforma + Shopify total + CAC blended", f: "—" },
            { s: "10.000-30.000€", m: "No", a: "Data-driven GA4 + análisis incremental cualitativo por canal", f: "—" },
            { s: "30.000-80.000€", m: "Pre-MMM: validar primero con geo-experiments", a: "Data-driven GA4 + apagar/encender canal en geo secundaria", f: "Trimestral" },
            { s: "80.000-150.000€", m: "Sí, modelo open-source (Robyn/LightweightMMM)", a: "MMM trimestral validado con geo-experiments", f: "Trimestral" },
            { s: "150.000-500.000€", m: "Sí, MMM premium (Recast, Sellforte) o Northbeam hybrid", a: "MMM mensual + geo-experiments + dashboard unificado", f: "Mensual" },
            { s: ">500.000€", m: "Sí, MMM custom o suite enterprise", a: "MMM continuo + lift studies plataforma + tracking server-side", f: "Semanal/mensual" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.a}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.f}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según el análisis de <a href="https://hbr.org/2017/07/marketers-need-to-stop-focusing-on-loyalty-and-start-thinking-about-relevance" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Harvard Business Review sobre attribution modeling</a>, las marcas que migran de last-click a MMM combinado con experimentación incremental detectan que entre el 20% y el 50% de las conversiones atribuidas a canales BOFU (retargeting, branded search) son en realidad demanda generada por canales TOFU (paid social, OOH, branding). Sin MMM, ese dinero se reasigna mal sistemáticamente.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Datos mínimos que necesita un MMM para no ser teatro</h2>
    <div className="space-y-3 mb-6">
      {[
        "12-18 meses mínimo de histórico semanal (24 meses ideal para capturar dos ciclos Q4 completos). Menos histórico = el modelo no separa estacionalidad de efecto canal.",
        "Spend semanal por canal granular: Meta (separar prospecting/retargeting si posible), Google Search, Google Shopping/PMax, TikTok, email/SMS (coste plataforma), afiliación, OOH, TV/podcast si aplica.",
        "Ventas totales semanales del negocio (Shopify u origen), separadas idealmente por categoría producto y por nuevos vs recurrentes.",
        "Variables exógenas controladas: BFCM, rebajas oficiales (enero, julio en España), Reyes, festivos locales, lanzamientos de producto, cambios de pricing, problemas de stock.",
        "Promociones y descuentos por semana (impacto del 10%-30% en conversión hay que aislarlo o el modelo lo atribuye al canal que casualmente esté activo).",
        "Variables externas opcionales pero útiles: climatología (relevante en moda/regalo/jardín), tipo de cambio (si vendes a otros mercados), búsquedas branded en Google Trends como proxy de awareness.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">MMM vs atribución multi-touch (MTA): cuándo usar cada uno</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Dimensión</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">MMM</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">MTA (multi-touch)</th>
          </tr>
        </thead>
        <tbody>
          {[
            { d: "Nivel de granularidad", m: "Canal y semana", t: "Usuario y touchpoint" },
            { d: "Dependencia de cookies/píxel", m: "Ninguna", t: "Total — degradación 30-50% con iOS 17/18" },
            { d: "Captura efectos offline (TV, OOH)", m: "Sí", t: "No" },
            { d: "Granularidad para optimizar creativos/ad sets", m: "No", t: "Sí" },
            { d: "Histórico mínimo necesario", m: "12-18 meses", t: "Semanas (en cuanto haya tracking limpio)" },
            { d: "Coste implementación", m: "Alto (data engineering)", t: "Medio (suite SaaS)" },
            { d: "Robustez frente a cambios privacidad", m: "Muy alta", t: "Baja, en degradación" },
            { d: "Decisión que habilita", m: "Mix de presupuesto entre canales", t: "Ajuste fino dentro de cada canal" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.d}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.t}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La regla en cuentas grandes: MTA y MMM no compiten, cooperan. MTA optimiza dentro de cada canal (qué creativo, qué audiencia, qué keyword). MMM optimiza entre canales (cuánto a Meta vs Google vs TikTok vs offline). Las dos capas se cruzan trimestralmente con experimentos incrementales reales — apagar un canal en una geo durante 2-4 semanas — para validar que ambas están dando señales coherentes.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Herramientas reales de MMM para D2C español (con coste y umbral de uso)</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Herramienta</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Tipo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Coste orientativo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cuándo elegirla</th>
          </tr>
        </thead>
        <tbody>
          {[
            { h: "Robyn (Meta open-source)", t: "Open-source R", c: "0€ licencia + equipo data", u: "80-200K€/mes spend, equipo técnico interno" },
            { h: "LightweightMMM (Google open-source)", t: "Open-source Python", c: "0€ licencia + equipo data", u: "80-200K€/mes spend, stack Python/BigQuery" },
            { h: "Recast", t: "MMM-as-a-service", c: "≈ 2.000-6.000€/mes", u: ">150K€/mes spend, founder-led growth, sin equipo data" },
            { h: "Sellforte", t: "MMM-as-a-service EU", c: "≈ 1.500-5.000€/mes", u: ">100K€/mes, marca europea con offline" },
            { h: "Mass Analytics", t: "Enterprise MMM", c: "≈ 5.000-15.000€/mes", u: ">500K€/mes spend, multi-país" },
            { h: "Northbeam", t: "MTA + MMM hybrid", c: "≈ 1.000-5.000€/mes", u: "100-300K€/mes, quiere todo en una suite" },
            { h: "Polar Analytics", t: "MTA + MMM ligero", c: "≈ 200-800€/mes", u: "30-150K€/mes, equipo data ligero" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.h}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.t}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.u}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo se valida un MMM (sin esto no es modelo, es opinión)</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Holdout temporal: entrenar el modelo con los primeros 12-18 meses, predecir los 3-6 siguientes y medir el error MAPE (Mean Absolute Percentage Error). Razonable: 5-15%. Por encima del 20% el modelo no es fiable para decisiones.",
        "Geo-experiments controlados: apagar un canal (típicamente Meta o paid search) en una geo secundaria 2-4 semanas, medir el lift real en ventas vs el lift que predijo el MMM. Si los números no cuadran dentro de un margen, el modelo está mal calibrado.",
        "Cross-check con incremental tests plataforma: Meta Conversion Lift, Google Geo Experiments, TikTok Brand Lift. Comparar el ROI incremental MMM contra el ROI incremental plataforma — deberían apuntar a la misma dirección, aunque con magnitud diferente.",
        "Estabilidad temporal de coeficientes: re-entrenar el modelo cada mes y observar si el coeficiente de cada canal se mueve drásticamente. Variaciones >30% mes a mes sin causa de negocio = modelo inestable, ajustar regularización o revisar variables exógenas.",
        "Sanity check de saturación: las curvas de saturación deben tener forma de S (saturación creciente decreciente). Si un canal aparece con saturación lineal infinita o coeficiente negativo, es señal de overfitting o variable mal especificada.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Antes de hablar de MMM, validamos volumen y madurez: si el spend total es <80K€/mes o el histórico granular es <12 meses, no recomendamos MMM. Hacer MMM mal pierde más dinero que no hacerlo. En esos casos vamos a data-driven GA4 + análisis incremental por geo.",
        "Auditoría inicial de la calidad de datos: Shopify limpio, spend por canal exportable a semana, separación clara prospecting/retargeting en Meta, Conversions API y Consent Mode v2 en orden. Sin esa base, ningún MMM convergerá a algo útil.",
        "Pipeline custom en BigQuery cuando una cuenta requiere MMM serio: Pablo define qué decisiones de mix queremos resolver y qué canales modelar; Jorge monta la pipeline (extracción Meta, Google, TikTok, Shopify a BigQuery, transformación dbt, modelo Robyn o LightweightMMM, dashboard Looker Studio). Es el tipo de pieza ad-hoc que diferencia a DayByDay de agencias playbook.",
        "Validación obligatoria con geo-experiments: cada trimestre apagamos un canal en una geo secundaria 14-21 días y medimos el lift real vs el predicho. El MMM solo se cree cuando dos validaciones consecutivas cuadran dentro del margen.",
        "Reasignación de mix con margen de seguridad: ningún cambio de mix supera el ±25% del presupuesto de un canal en un trimestre, aunque MMM diga que el lift está al doble. Los modelos tienen incertidumbre, y mover demasiado rápido el dinero rompe el aprendizaje plataforma.",
        "MMM no sustituye a la conversación: incluso con MMM activo, el founder ve cada mes ROAS plataforma, ROAS Shopify por fuente y MMM lift por canal en la misma vista Looker. Si los tres divergen, abrimos investigación; si los tres apuntan a lo mismo, escalamos con confianza.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo lidera paid media y estrategia; Jorge lidera implementación tech, server-side tracking y pipelines de datos. Donde otras agencias separan paid media y data engineering entre dos proveedores que rara vez se coordinan, en DayByDay las decisiones de MMM se cierran en la misma reunión: Pablo plantea la pregunta de negocio, Jorge valida si los datos sostienen el modelo y monta la pipeline. Sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu cuenta D2C ya pide MMM o todavía no toca?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos spend, histórico, calidad de datos y mix de canales. Te decimos si MMM tiene sentido ahora, si conviene esperar 6-12 meses, o si tu problema real está en data-driven y server-side tracking antes de pensar en modelos.</p>
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
        <Link to="/blog/modelos-atribucion-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Modelos de atribución para D2C: last-click, data-driven y MMM explicados →
        </Link>
        <p className="text-white/40 text-xs mt-1">El marco general donde MMM se sitúa como capa independiente macro</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cac-blended-vs-cac-canal-ecommerce" className="text-white font-semibold hover:text-white/80">
          CAC blended vs CAC por canal: qué métrica usar para escalar un D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">La métrica financiera que MMM ayuda a calcular sin doble conteo</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cohort-analysis-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Cohort analysis para eCommerce D2C: la métrica que predice si tu negocio escala →
        </Link>
        <p className="text-white/40 text-xs mt-1">El otro pilar de medición que se cruza con MMM para decisiones de mix</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cac-vs-ltv-ecommerce-escalable" className="text-white font-semibold hover:text-white/80">
          CAC vs LTV: cómo construir un eCommerce escalable →
        </Link>
        <p className="text-white/40 text-xs mt-1">Marco financiero que da sentido a cualquier output del MMM</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default MarketingMixModelingEcommerceD2cPage;
