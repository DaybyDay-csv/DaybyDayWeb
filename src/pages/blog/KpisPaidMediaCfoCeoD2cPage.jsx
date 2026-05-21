import BlogPostLayout from "../../components/BlogPostLayout";
import relatedPostsData from "../../data/relatedPosts";

const faqs = [
  {
    q: "¿Qué KPIs de paid media debo presentar a mi CFO cada mes sin tecnicismos?",
    a: "Para CFO/CEO, presenta 5 métricas clave que caben en una diapositiva: (1) MER blended — revenue total / spend total, la rentabilidad real del euro invertido; (2) Margen contribución — cuánto queda después de COGS y paid media; (3) CAC promedio — coste de adquirir un cliente nuevo y cómo se compara con LTV; (4) Revenue atribuido — revenue total generado por canales paid, con modelo de atribución declarado; (5) Runway — meses de cash disponibles al ritmo de burn actual. Evita: ROAS in-platform, CPA granular, CTR, CPC. Esas son métricas de optimización operacional que el media buyer gestiona internamente."
  },
  {
    q: "¿Cómo explico el gasto en Meta Ads a un CEO que solo entiende EBITDA y clawback?",
    a: "Traduce paid media a lenguaje financiero en 3 pasos: (1) Expresa el spend como % del revenue generado — si gastas 50K€/mes en Meta yFacturas 150K€, el retorno es 3x tu inversión, comparable a cualquier línea de income; (2) Calcula el contribution margin post-paid — si tu margen bruto es 65% y gastas 50K€ en paid, resta eso del margen bruto y muestra el margen neto post-paid; (3) Explica el CAC vs LTV como payback period — si CAC es 45€ y LTV es 180€, el payback es 3 meses, y eso es lo que le importa a tesorería. El CEO no quiere ver ROAS 4,2x; quiere ver que invierte 1€ y recupera 3€ netos en 90 días."
  },
  {
    q: "¿Cada cuánto debo reporting a board/inversores sobre paid media?",
    a: "Board-friendly reporting sigue cadencia trimestral con monthly flash. Monthly flash (1 página, 5 métricas): MERblended, spend total, revenue atribuido, CAC vs LTV, runway. Quarterly deep dive (5-10 páginas): análisis de cohortes LTV-30/60/90 por canal de adquisición, contribución por canal vs objetivo anual, proyección de spend vs revenue para los próximos 4 trimestres, evaluación de canales con rendimiento decreciente, y plan de rebalanceo si un canal baja del umbral. Lo que NO va al board: detalle de campañas, creatives con mejor CTR, optimizaciones de bid, audiencias probadas. Eso es trabajo operativo."
  },
  {
    q: "¿Cómo construyo un reporting de paid media que valide el presupuesto anual ante inversores?",
    a: "El reporting para presupuesto anual sigue estructura ROI: (1) Histórico 12 meses con MERblended mensual y tendencia; (2) Proyección revenue = spend proyectado × MER objetivo. Si solicitas 600K€ anuales para paid media y tu MER objetivo es 2,5x, el revenue proyectado es 1,5M€; (3) Unit economics validated: CAC medio de los últimos 12 meses vs LTV-180d实测, payback period, y CLV:CAC ratio debe ser &gt;3x; (4) Escenarios:乐观ista (MER 3x), base (MER 2,5x), conservador (MER 2x) — esto muestra al inversor que has stress-testado el presupuesto. Incluye también: qué canales estásapagando o reduciendo porque el CAC supera el umbral y cuánto revenue limpias al hacerlo."
  },
  {
    q: "¿Qué сделать decir cuando el CFO pregunta por qué el ROAS reported por Meta no cuadra con el revenue en Shopify?",
    a: "La diferencia entre ROAS in-platform y revenue real es normal y tiene 3 causas principales: (1) Atribución different — Meta atribuye last-click, Shopify cuenta toda la ruta (orgánico + directo + paid); (2) Diferencias temporales — Meta atribuye en ventana de-click (1-28 días), Shopify firma cuando el pago realmente ocurre; (3) browser blocking — Meta pierde entre 15-40% de eventos por iOS/AdBlockers, pero Shopify registra todas las compras. La métrica que reconcilea ambas es el MER blended a nivel negocio (shopify revenue/shopify spend paid = true return). No intentes explicar el modelo de atribución al CFO; muéstrale el número de banco: ingresos - costes = neto, luego aplica el paid media como una línea de inversión con ROI demostrable."
  },
  {
    q: "¿Cuál es el ratio de spend en paid media vs revenue saludable para un D2C español en 2026?",
    a: "Depende del maturity del D2C: (1) D2C early-stage (<100K€ revenue/año): paid media representa 40-60% del revenue, el objetivo es test audience y generar data para optimizar; MER 1,5-2,0x es aceptable porque inviertes en aprendizaje; (2) D2C growth-stage (100K€-500K€ revenue/año): paid representa 25-40% del revenue, el objetivo es escala eficiente; MER 2,0-2,5x es el target; (3) D2C scale-stage (>500K€ revenue/año): paid representa 15-30% del revenue, el objetivo es eficiencia y retención; MER 2,5-3,5x es healthy. Por debajo de MER 1,8x sostenido 90 días, el modelo paid no es sostenible y hay que rebalancear mix de canales o aceptar márgenes más bajos. El CFO debe saber que MER <1,8x requiere intervención."
  },
  {
q: "¿Cómo presento resultados de paid media en una junta con inversores que no saben qué es un ROAS?",
    a: "Traduce todo a euros: 'Invertimos 50.000€ en canales digitales en el último trimestre y generamos 175.000€ en revenue atribuible a esa inversión, lo que supone un retorno de 3,5€ por cada euro invertido.' Eso es todo lo que necesitan oír. Después añade: 'De esos 175.000€, nuestro margen bruto es 115.000€ (65%) y tras restar los 50.000€ de inversión en paid, quedan 65.000€ de contribución neta.' El resto — CTR, CPM, frecuencia, audiencias, audiencias lookalike — es operativa y no es board-level. La唯一 pregunta de seguimiento que debe importar al board es: ¿estamos generando más euros de los que gastamos a un coste sostenible?"
  },
];

const KpisPaidMediaCfoCeoD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="KPIs de paid media para CFO/CEO: cómo presentar resultados sin tecnicismos (2026)"
    description="Guía práctica para presentar resultados de paid media a CFO/CEO y board sin tecnicismos. Aprende a traducir MER blend, CAC, LTV y ROAS a euros y porcentajes que entienda cualquier CFO. Incluye plantillas de reporting mensual (1 página) y quarterly deep dive (5-10 páginas), los 5 KPIs obligatorios, 3 errores frecuentes en presentations al board, y framework DayByDay Pablo+Jorge para reporting que-valida-presupuestos-y-sostiene-inversiones."
    slug="kpis-paid-media-cfo-ceo-d2c"
    datePublished="2026-05-21"
    dateModified="2026-05-21"
    readingTime="11 min"
    category="Reporting"
    keywords={[
      "KPIs paid media CFO",
      "reporting paid media CEO",
      "métricas paid media board",
      "presentar resultados inversionespaid media",
      "MER blended CFO"
    ]}
    faqs={faqs}
    relatedPosts={relatedPostsData["kpis-paid-media-cfo-ceo-d2c"] || []}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Tu CFO no necesita saber qué es un ROAS in-platform ni un CTR.</strong> Lo que necesita es entender una cosa: ¿estamos invirtiendo 1€ en paid media y recuperando X€ en beneficio neto? En términos financieros, paid media es una línea de inversión más en el P&L, y debe presentarse con el mismo rigor que cualquier otra inversión de capital. Este artículo te da la plantilla exacta para reporting de paid media que tu CFO entenderá en 30 segundos: 5 KPIs esenciales, la estructura de monthly flash (1 página) y quarterly deep dive (5-10 páginas), y cómo traducir métricas operativas a euros.y percentages que validen presupuestos ante el board.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Por qué el reporting tradicional de paid media no sirve para CFD/CEO</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El media buyer vive en ROAS in-platform, CPA por ad set y CTR. Esas métricas tienen sentido para optimizar campañas día a día, pero son illegibles para un CFO que evalúa inversiones. La diferencia fundamental es que <strong className="text-white">el CFO pregunta por ROI y payback period</strong>, no por la eficiencia de un creativo específico. КогдаPresentas ROAS 4,2x desde Meta Ads al CFO, la pregunta inmediata es: «¿pero eso qué relación tiene con mi cuenta corriente?» Y si no tienes una respuesta limpia en euros, has perdido la atención del CFO para el resto de la презентация.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      La solución es un reporting en dos capas: monthly flash (1 página, leitourgical) и quarterly deep dive (5-10 páginas, para presupuestos). Pero antes de lasplantillas, necesitas dominar los 5 KPIs que el CFO entiende: MER blend, margen contribución, CAC vs LTV, revenue atribuido y runway. El resto— métricas operacionales — sonpara ti, no para el CFO.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">🎯 Regla DayByDay</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Si necesitas más de 2 frases paraExplain un KPI al CFO, no es el KPI correcto. El reportingboard-ready debe funcionar como un financials slide:左边 ingresos, derecha inversión, centro ratio de retorno. Todo lo que requiera explicarmodelo de atribución ya ha perdido al CFO.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Los 5 KPIs que tu CFO entiende: MER blend, margen, CAC, revenue atribuido, runway</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Estos 5 KPIs son universales, finance-alignados y caben en 1úna página. No dependen de la plataforma (Meta, Google, TikTok), nicht del modelo de atribución. Son lo que tesorería y el board necesitan paravalidar el presupuesto.
    </p>

    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-4 text-white/60 font-semibold">KPI</th>
            <th className="text-left py-3 px-4 text-white/60 font-semibold">Definición</th>
            <th className="text-left py-3 px-4 text-white/60 font-semibold">Para qué sirve</th>
          </tr>
        </thead>
        <tbody className="text-white/80">
          {[
            { k: "MER blend", d: "Revenue total (todos canales) / Spend total (todos canales)", s: "Rentabilidad real del euro invertido. Ej: MER 2,5x = 1€ invertido genera 2,5€ de revenue total" },
            { k: "Margen contribución", d: "(Revenue - COGS) - Spend paid media", s: "Cuánto sobra después de pagar producto y publicidad. Debe ser >0 para ser sostenible" },
            { k: "CAC vs LTV", d: "Coste adquirir cliente / Valor de vida del cliente", s: "Ratio determina scalability. LTV:CAC &gt;3x es el umbral; payback <6 meses es healthy" },
            { k: "Revenue atribuido", d: "Revenue generado por canales paid (modelo declarado)", s: "Revenue total atribuible a la inversión. Declara siempre el modelo (last-click, data-driven)" },
            { k: "Runway", d: "Cash disponible / Burn rate monthly", s: "Meses de operación con cash actual. <6 meses = alerta para board" }
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5">
              <td className="py-3 px-4 font-semibold text-white">{row.k}</td>
              <td className="py-3 px-4">{row.d}</td>
              <td className="py-3 px-4">{row.s}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Monthly flash: la plantilla de 1 página que seu CFO leerá cada mes</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El monthly flash es el único reporting que el CFO mira cada mes. Debe caber en un slide de una presentación y contener únicamente las 5 métricas anteriores con comparación vs mes anterior y vs objetivo. No hay excuse para que ocupe más de una página: si tu herramienta de analytics no te permite exportar esto en 30 segundos, tu stack de reporting está roto.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6 space-y-4">
      <p className="text-white font-bold text-lg">Plantilla Monthly Flash (1 página)</p>
      <div className="space-y-2 text-white/70 text-sm">
        <p><span className="text-white font-semibold">Encabezado:</span> Mes [ENE/FEB...] 2026 | Paid Media Report</p>
        <p><span className="text-white font-semibold">Spend total:</span> [50.000€] vs mes anterior [48.000€] | Objetivo [55.000€]</p>
        <p><span className="text-white font-semibold">Revenue attribuido:</span> [175.000€] ( MER 3,5x ) vs obj. [165.000€]</p>
        <p><span className="text-white font-semibold">Margen contribución:</span> [65.000€] (40%) | Objetivo [55.000€]</p>
        <p><span className="text-white font-semibold">CAC:</span> [45€] vs LTV [180€] | Ratio 4,0x | Payback 3 meses</p>
        <p><span className="text-white font-semibold">Runway:</span> [14 meses] ao burn actual</p>
        <p><span className="text-white font-semibold">Notas:</span> [1 frase sobre desviación principal + acción tomada]</p>
      </div>
    </div>

    <p className="text-white/70 leading-relaxed mb-5">
      Esta plantilla es lo único que el CFO espera recibir el primer día hábil de cadames. No necesitas más. Si hay una desviación >15% vs objetivo, include un short reason + action taken en 1 frase. Ejemplo: "MER cayó a 2,4x vs objetivo 2,8x: reducir spend Google -20% semana 2, concentrar en Meta donde MER es 3,2x."
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Quarterly deep dive: la presentación de presupuesto ante el board</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El quarterly deep dive se hace cada fin de trimestre y tiene 3 objectifs: (1) analizar performance de cohortes, (2) solicitar/validar presupuesto para el siguiente trimestre/y (3) decisiones estratégicas de mix de canales. Son 5-10 páginas máximo, y el CFO las revisa con el controller antes del board.
    </p>

    <div className="space-y-4 mb-6">
      {[
        { n: "1", t: "Executive Summary", d: "1 página: resultado trimestral vs objetivo, principales decisiones tomadas, proyección siguiente trimestre" },
        { n: "2", t: "Cohorte Analysis", d: "LTV-30, LTV-60, LTV-90 por canal de adquisición: ¿las cohortes reciente mantienen el profile de lifetime value?" },
        { n: "3", t: "Attribución y Revenue", d: "Revenue por canal, modelo usado (decláralo), ajuste vs revenue real Shopify, explicación de gaps" },
        { n: "4", t: "Unit Economics", d: "CAC medio vs LTV-180d, payback period, LTV:CAC ratio por canal — aquí se decide si un canal sigue o sale" },
        { n: "5", t: "Stress Test", d: "Escenarios: conservador (MER -0,5x), base (MER target), optimista (MER +0,5x) — cuánto revenue en cad escenario" },
        { n: "6", t: "Presupuesto Solicitado", d: "Cantidad solicitada para siguiente trimestre, MER objetivo, revenue proyectado, breakdown por canal" },
      ].map(( row, i) => (
        <div key={i} className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-white font-black text-lg flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">{row.n}</span>
            <div>
              <p className="text-white font-semibold text-sm mb-1">{row.t}</p>
              <p className="text-white/60 text-xs leading-relaxed">{row.d}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <p className="text-white/70 leading-relaxed mb-5">
      El board decidirá principalmente en las páginas 4 (unit economics) y 5 (stress test). Si el LTV:CAC ratio es menor a 3x por un canal durante 2+ trimestres consecutivos, la recomendación estratégica es reducir o eliminar ese canal. Si el estrés test muestra que con MER conservador el negocio sigue siendo break-even positivo, el presupuesto se aprueba automáticamente. Esto elimina la discusión subjetiva sobre "si el gasto en paid media está funcionando" porque está todo expresado en ratios financieros.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo traducir CTR, ROAS in-platform, CPM y CPA para el CFO</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El CFO no necesita esas métricas. Pero por si te lo preguntan, aquí tienes la traducción:
    </p>

    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-4 text-white/60 font-semibold">Métrica operativa</th>
            <th className="text-left py-3 px-4 text-white/60 font-semibold">Traducción CFO</th>
          </tr>
        </thead>
        <tbody className="text-white/80">
          {[
            { o: "CTR (Click-through rate)", t: "% de gente que ve el anuncio y hace click => mide eficiencia del creativo para captar atención, no rentabilidad" },
            { o: "ROAS in-platform", t: "Revenue atribuido por ESA plataforma específica / spend en esa plataforma => no es el ROI real del negocio" },
            { o: "CPM (Cost per mille)", t: "Coste por 1.000 impresiones => correlaciona con tamaño de audiencia, no con eficiencia de conversión" },
            { o: "CPA (Cost per acquire)", t: "Coste por cliente adquirido, dentro de una plataforma específicamente => interesante para optimización, pero luego se reconcilia con CAC real" }
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5">
              <td className="py-3 px-4 font-semibold">{row.o}</td>
              <td className="py-3 px-4">{row.t}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Nota importante:</strong> Cuando el CFO pregunta «¿por qué el ROAS de Meta no cuadra con el revenue de Shopify?», no intentes explicarmodelos de atribución. La respuesta correcta es: «El ROAS in-platform de Meta sobreatribute vs otros canales porque cuenta last-click. El revenue real del negocio vs inversión real es el MER blend, quefue de 3,5x este trimestre y está alineado con nuestro objetivo de 3,0x.» Punto. Fin de la discusión.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">3 errores frecuentes en reporting al board y cómo evitarlos</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      En las auditorías de DayByDay a cuentas D2C españolas, estos son los 3 errores que vemos repetir}:
    </p>

    <div className="space-y-4 mb-6">
      {[
        { e: "1. Presentar ROAS in-platform sin contexto", s: "El CFO ve ROAS 4,2x y pregunta por qué no ganamos 4,2€ por cada euro. El problema: ROAS in-platform es attribution-limited. Error: Always presentation MER blend alongside ROAS in-platform, o el CFO concluirá incorrectamente." },
        { e: "2. Reporting quarterly con datos de agencia", s: "Muchas agencias reportan CAC blend (incluye retargeting, brand search, orgánico atribuido) para inflar看起来mejor. Error: Separate CAC de adquisición nueva (cold) del resto; eso es lo que valida sipaid media genera clientes nuevos reales." },
        { e: "3. No mostrar cohortes LTV", s: "Si solo Presentas LTV histórico sin breakdown por cohorte, no puedes detectar si las últimas cohorts están degradándose. Error: Siempre muestra LTV-30, LTV-60, LTV-90 por quarter de adquisición;能看到 tendencia real." }
      ].map((row, i) => (
        <div key={i} className="bg-[#1a1616] border border-red-500/20 border-l-4 rounded-r-xl p-4">
          <p className="text-white font-semibold text-sm mb-2">{row.e}</p>
          <p className="text-white/60 text-xs">{row.s}</p>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Framework DayByDay: el stack de reporting quevalida presupuestos</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      En DayByDay usamos un pipeline automatizado que genera el monthly flash cadalunes 8am y el quarterly deep dive el último día de cada quarter. El stack:
    </p>
    <ul className="text-white/70 space-y-2 mb-5 list-disc pl-5">
      <li><strong className="text-white">Datos:</strong> Shopify Admin API (revenue real) + Meta Ads API + Google Ads API + TikTok Ads API + GA4 (attribution) + Stripe (payments)</li>
      <li><strong className="text-white">ETL:</strong> n8n automatizado — extracción diaria, enrichment con cohortes LTV-30/60/90, cálculo de MER blend por canal</li>
      <li><strong className="text-white">Presentation:</strong> Looker Studio dashboard (1 página) + Google Slides template (quarterly) — ambos se generan automáticamente con datos de n8n</li>
      <li><strong className="text-white">Entregable:</strong> Monday 8am: monthly flash emailed al CFO. Último día Q: quarterly deep dive preparado para board.</li>
    </ul>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">💡 Nota técnica</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Este stack requiere setup inicial estimado en 15-25 horas de desarrollo n8n + Looker Studio, pero una vez implementado, funciona automáticamente. Para cuentas <10K€/mes de spend onde el reporting manual es viable, un Sheets con conexiones de Shopify + Meta + Google +TikTok export puede cubrir el monthly flash. No compres herramientas caras (Triple Whale, Northbeam) hasta que tengas >50K€/mes de spend y el CFO te pida reporting más sofisticado daily.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Resumen: tu checklist de reporting para CFO/CEO</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      TL;DR: Si solo te llevas una cosa de esteartículo, que sea esta Checklist:
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <div className="space-y-2 text-white/70 text-sm">
        <p className="flex items-start gap-2"><span className="text-green-400">✓</span><span>Monta un monthly flash con estas 5 métricas: MER blend, margen contribución,CAC vs LTV, revenue atribuido, runway</span></p>
        <p className="flex items-start gap-2"><span className="text-green-400">✓</span><span>Cada monthly flash: máximo 1 página, comparación vs mes anterior + objetivoy 1 frase de desviación</span></p>
        <p className="flex items-start gap-2"><span className="text-green-400">✓</span><span>Cada quarterly: incluye cohortes LTV-30/60/90 por canal, unit economics porcanal, stress test (3 escenarios), presupuesto solicitado</span></p>
        <p className="flex items-start gap-2"><span className="text-green-400">✓</span><span>NUNCA_presentes ROAS in-platform sin MER blend al lado — el CFO concludeincorrectamente</span></p>
        <p className="flex items-start gap-2"><span className="text-green-400">✓</span><span>NUNCA mezcles CAC blend (incluye retargeting + brand) con CAC adquisición (cold)nuevo —会计distorsion</span></p>
        <p className="flex items-start gap-2"><span className="text-green-400">✓</span><span>Declara siempre el modelo de atribución cuando presentes revenue atribuido: last-click, data-driven, etc.</span></p>
        <p className="flex items-start gap-2"><span className="text-green-400">✓</span><span>Si LTV:CAC &lt;3x por 2+ trimestres en un canal, recomienda reducir o salir — datos驱动decisión</span></p>
      </div>
    </div>

    <p className="text-white/70 leading-relaxed mb-5">
      Paid media no es distinto a cualquier otra inversión de capital. Se evalúa con los mismos criterios: ¿cuánto pongo, cuánto vuelvo, cuánto tarda en volver, y el riesgo de que no vuelva. El reporting que te he dado en esteartículo traduce paid media exactamente a eselenguaje financiero. No necesitas más paravalidar presupuestos ante el CFO. Y cuando el CFO te pregunte «¿funciona?» tú le dices: «MER blend 3,5x, LTV:CAC ratio 4x, payback 3 meses. Sí, funciona.»
    </p>

    <p className="text-white/50 text-sm leading-relaxed mt-8 pt-6 border-t border-white/10">
      <em>Artículo escrito por Pablo Santirsó (Growth Partner, paid media) y Jorge González (CTO, automatización yreporting). Si mounting tu stack de reporting o necesitas help traduciendo tus métricas actuales al lenguaje CFO, agenda un call con DayByDay Consulting.</em>
    </p>
  </BlogPostLayout>
);

export default KpisPaidMediaCfoCeoD2cPage;