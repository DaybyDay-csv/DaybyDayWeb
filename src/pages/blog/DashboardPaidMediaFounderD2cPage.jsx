import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué métricas debe ver un founder D2C en el dashboard de paid media cada lunes?",
    a: "Un founder D2C que invierte 10-50K€/mes en paid media necesita ver cada lunes 8-10 métricas como mucho, organizadas en 3 bloques: (1) Negocio — Revenue total semana, MER blended, margen contribución, CAC blended vs LTV90; (2) Adquisición paid — spend total, CAC adquisición específico (excluyendo brand y retargeting), % New Customers, CPM rolling 7d vs 28d; (3) Eficiencia operativa — Hook Rate medio top 5 creativas, % spend en creatividades con >7d activas, número de campañas en learning. Todo más allá de eso es ruido para el founder; quien gestiona la cuenta puede tener un dashboard más granular. La regla DayByDay es que el dashboard del founder se lee en 4-6 minutos y permite tomar una decisión semanal: subir, bajar o mantener spend por canal."
  },
  {
    q: "¿Qué diferencia hay entre el dashboard del founder y el del media buyer?",
    a: "El dashboard del founder es estratégico, semanal y orientado a decisión de presupuesto cross-channel; el del media buyer es táctico, diario y orientado a optimización de campañas dentro de cada plataforma. El founder mira MER blended, margen contribución, % New Customers, CAC adquisición específico y cohortes 30/60/90 — métricas que predicen si el negocio escala con margen. El media buyer mira ROAS in-platform, CPA por ad set, frecuencia, Hook Rate por creativa, CTR outbound y % spend en learning. Mezclar ambas vistas en el mismo dashboard es el error más frecuente: el founder se ahoga en métricas tácticas y el media buyer pierde tiempo justificando ROAS in-platform cuando lo que importa al final del trimestre es el MER blended y el cash en caja."
  },
  {
    q: "¿Qué herramienta es mejor para el dashboard semanal de un founder D2C: Looker Studio, Triple Whale, Northbeam o un Sheets manual?",
    a: "Depende del spend total y del stack de datos. Para D2C 5-15K€/mes en paid: Sheets manual + reporting Meta/Google + cuadro mando Shopify cubre el 80% del valor a coste 0€. Para D2C 15-40K€/mes: Looker Studio gratis con conectores Meta Ads, Google Ads, GA4 y Shopify es el sweet spot — flexibilidad total, 0€ de licencia, requiere 8-15h de setup inicial. Para D2C >40K€/mes con múltiples canales y atribución compleja: Triple Whale (199-799$/mes) o Northbeam (1.000-3.000$/mes) merecen la pena si el equipo va a usar diariamente las funciones de atribución pixel propietario, MMM o post-purchase survey. La trampa es comprar una herramienta de 800$/mes para una cuenta de 12K€/mes spend; ese dinero rinde más reinvertido en producción de creatividades."
  },
  {
    q: "¿Cómo se construye el MER blended y por qué es la métrica más importante del dashboard del founder?",
    a: "El MER (Marketing Efficiency Ratio) blended se calcula como Revenue total del negocio / Spend total en paid media (todos los canales sumados, sin descontar revenue orgánico). Es la métrica que mejor refleja la eficiencia real del negocio porque no depende de modelos de atribución (last-click, data-driven, etc.) que sobreatribuyen entre canales, y porque incluye el efecto halo del paid sobre orgánico y directo. Un MER blended de 2,5x significa que por cada 1€ invertido en paid, el negocio factura 2,5€ totales. La regla rápida es: MER blended × margen contribución >= 1 para ser rentable; MER blended >= 2,2x es saludable para D2C en escala; MER blended <1,8x sostenido 3-4 semanas exige rebalancear spend o pausar canales con CAC > LTV. ROAS in-platform no responde a esto porque cada plataforma sobreatribuye a sí misma y no consolida fuentes."
  },
  {
    q: "¿Con qué frecuencia debe actualizarse el dashboard de un founder D2C y cuántos minutos cuesta leerlo?",
    a: "El dashboard del founder se revisa una vez a la semana (lunes 8-10am), con datos actualizados al cierre de domingo. La revisión semanal cuesta 4-6 minutos al founder y dispara una conversación de 15-25 minutos con el media buyer o agencia el mismo lunes para decidir 3 cosas: subir/bajar/mantener spend por canal, prioridad de creatividades a producir esta semana y blockers operativos. Revisar el dashboard a diario es contraproducente para el founder — convierte señal en ruido y empuja a microgestión. Lo que sí debe estar siempre disponible es un dashboard de alertas automáticas (Slack o email) cuando un umbral crítico se rompe: MER blended <1,8x 3 días seguidos, CPA adquisición específico +35% vs baseline 7d, ROAS in-platform en learning >15% del spend. Esas alertas son operativas, no estratégicas; las dispara la agencia, no las mira el founder en tiempo real."
  },
  {
    q: "¿Qué errores típicos ve DayByDay en dashboards de paid media de founders D2C españoles?",
    a: "Los 5 errores más frecuentes en auditorías 2025-2026: (1) Mirar ROAS in-platform como métrica única y subir spend en canal que reporta ROAS 4,5x mientras MER blended cae de 2,4x a 1,9x (sobreatribución). (2) Dashboard con 40-60 métricas en 6 pestañas que nadie revisa, vs un cuadro de 8 métricas que se lee en 5 min y dispara decisión. (3) Reporting de la agencia que mide CAC blended (incluye retargeting, brand y orgánico atribuido) y oculta el CAC adquisición específico, único que importa para validar si el canal de adquisición rinde. (4) Datos desfasados: dashboard que se actualiza manualmente cada 15 días, founder revisa cuando lo manda la agencia y se pierden 2 semanas de mal funcionamiento. (5) Ausencia de cohortes: dashboards que muestran LTV histórico estático sin actualizar LTV-30/60/90 por cohorte de adquisición, imposibilitando ver si las cohortes recientes están degradándose. Corregir estos 5 puntos suele subir MER blended 0,3-0,7 puntos en 60-90 días sin tocar spend."
  }
];

const DashboardPaidMediaFounderD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Dashboard de paid media: qué métricas debe ver un founder D2C cada lunes (2026)"
    description="Guía operativa del dashboard de paid media para founders D2C España 2026: por qué el founder necesita un cuadro de 8-10 métricas semanal (no 40-60 diarias), las 3 capas obligatorias del dashboard (negocio MER blended + margen contribución + CAC blended vs LTV90, adquisición paid CAC adquisición específico + % New Customers + CPM rolling, eficiencia operativa Hook Rate + % spend creatividades >7d + campañas en learning), diferencia entre dashboard estratégico del founder y dashboard táctico del media buyer, comparativa Looker Studio gratis vs Triple Whale 199-799$ vs Northbeam 1.000-3.000$ vs Sheets manual por tramo de spend, cómo construir MER blended como métrica north star y por qué supera a ROAS in-platform, sistema de alertas Slack para umbrales críticos (MER<1,8x 3 días, CPA adquisición +35% baseline 7d, % spend learning >15%), cadencia semanal 4-6 min de lectura + 15-25 min conversación con media buyer, 5 errores frecuentes en cuentas D2C españolas y enfoque DayByDay Pablo+Jorge con pipeline n8n + Shopify Admin + Meta/Google/TikTok Marketing APIs + GA4 BigQuery + dashboard Looker Studio cross-channel publicado cada lunes 8am con cohortes LTV-30/60/90."
    slug="dashboard-paid-media-founder-d2c"
    datePublished="2026-05-17"
    dateModified="2026-05-17"
    readingTime="10 min"
    category="Reporting"
    keywords={[
      "dashboard paid media d2c",
      "dashboard meta ads founder",
      "métricas paid media semanales",
      "looker studio paid media ecommerce",
      "mer blended d2c",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">El dashboard de paid media de un founder D2C debe leerse en 4-6 minutos cada lunes y disparar una sola conversación con el media buyer o agencia donde se decide subir, bajar o mantener spend por canal.</strong> No es un cuadro táctico para optimizar campañas — eso lo gestiona la persona que toca la cuenta a diario. Es un cuadro estratégico de 8-10 métricas organizadas en 3 capas (negocio, adquisición paid, eficiencia operativa) que permite al founder responder cada lunes a una pregunta: ¿estamos escalando con margen, o estamos quemando caja contra el reporting in-platform? En auditorías DayByDay 2025-2026 vemos que el 60-70% de cuentas D2C españolas con spend >10K€/mes operan con dashboards de 40-60 métricas en 6 pestañas que nadie revisa, o peor, con el reporting que la agencia envía cada 15 días por PDF. Esta guía recorre qué métricas importan, qué herramienta elegir por tramo de spend y cómo construirlo en una tarde con Looker Studio.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es un dashboard de paid media para founder (definición operativa)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Un <strong className="text-white">dashboard de paid media para founder D2C</strong> es un cuadro de mando semanal con 8-10 métricas cross-channel que mide salud del negocio en relación al spend publicitario total: MER blended, margen contribución, CAC adquisición específico vs LTV90, % New Customers, eficiencia operativa por canal. Se distingue de un dashboard táctico de media buyer en que no incluye CPA por ad set ni frecuencia por audiencia ni reporting in-platform de cada plataforma; eso vive en otra capa para quien gestiona la cuenta. La función única del dashboard del founder es soportar 1 decisión semanal de presupuesto cross-channel en menos de 30 minutos de reunión.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según el <a href="https://www.thinkwithgoogle.com/marketing-strategies/data-and-measurement/marketing-data-strategy/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">informe de Think with Google sobre data maturity</a>, las empresas con un cuadro de mando consolidado cross-channel toman decisiones de presupuesto entre 2,5x y 3x más rápido que las que dependen del reporting individual por plataforma. La <a href="https://www.statista.com/statistics/1259676/dtc-ecommerce-tracking-metrics/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">encuesta de Statista sobre métricas D2C 2024</a> apunta que el 71% de los founders D2C declara revisar dashboards de paid semanalmente, pero solo el 28% tiene un MER blended consolidado fuera del reporting de cada plataforma. En auditorías DayByDay sobre cuentas D2C España con spend 10-50K€/mes, ese gap se traduce en una infraestimación de CAC adquisición específico del 22-38% cuando solo se mira CAC blended: el founder cree estar pagando 22€ por cliente cuando en realidad paga 46€ por cliente nuevo en frío.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 3 capas obligatorias del dashboard del founder</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El cuadro se organiza en 3 bloques visualmente separados. Cada bloque responde a una pregunta de negocio distinta:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Capa</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Pregunta que responde</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Métricas (4 max)</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Umbral acción</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "1. Negocio", p: "¿Estamos escalando con margen?", m: "Revenue 7d, MER blended, margen contribución %, CAC blended vs LTV90", u: "MER <1,8x · margen <baseline -4pts" },
            { c: "2. Adquisición paid", p: "¿El canal de adquisición rinde?", m: "Spend total, CAC adquisición específico, % New Customers, CPM rolling 7d vs 28d", u: "CAC ADQ >LTV90 × margen · %New <40%" },
            { c: "3. Eficiencia operativa", p: "¿Estamos sirviendo bien el spend?", m: "Hook Rate top 5 creativas, % spend creatividades >7d activas, # campañas learning, frecuencia retargeting", u: "Hook Rate <22% · learning >15% spend" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.u}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Cada capa cabe en una fila visual del dashboard con 4 tiles métricas + 1 mini-gráfico de evolución 8-12 semanas. Total: 12-15 tiles + 3 gráficos. Si la persona que lo abre necesita pestañas adicionales para entender lo que ve, el dashboard está mal diseñado. Detalle del enfoque cohortes y CAC adquisición específico en la <Link to="/blog/cac-blended-vs-cac-canal-ecommerce" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de CAC blended vs CAC por canal</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Por qué MER blended es la métrica north star del founder</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      MER (Marketing Efficiency Ratio) blended = Revenue total negocio ÷ Spend total paid media. Es la única métrica que no depende del modelo de atribución de cada plataforma y refleja el efecto real del paid sobre orgánico y directo. Un MER blended de 2,5x significa que cada 1€ invertido en paid devuelve 2,5€ de revenue total al negocio.
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "MER blended × margen contribución ≥ 1 → rentable a nivel marketing puro (sin contar overheads).",
        "MER blended ≥ 2,2x sostenido 60-90 días → saludable para D2C en escala con margen contribución 25-35%.",
        "MER blended 1,8-2,2x → zona de vigilancia: revisar mix de canales, % spend en learning y CPM rolling.",
        "MER blended <1,8x sostenido 3-4 semanas → rebalancear urgente: pausar canales con CAC > LTV, reducir spend en saturación, reasignar a creatividades winners.",
        "ROAS in-platform NO sustituye a MER blended: Meta reporta 4,5x mientras MER cae a 1,9x es señal de sobreatribución (no de canal sano).",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h2 className="text-2xl font-black mt-10 mb-4">Looker Studio vs Triple Whale vs Northbeam vs Sheets manual</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La decisión de herramienta depende del spend total mensual y del nivel de complejidad del stack de datos. No comprar herramientas caras antes de necesitarlas es regla de oro:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Herramienta</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Coste mensual</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Setup</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Recomendado para</th>
          </tr>
        </thead>
        <tbody>
          {[
            { h: "Sheets manual + reporting plataforma", c: "0€", s: "2-4h/semana manual", r: "D2C <5K€/mes spend, fase prueba" },
            { h: "Looker Studio + conectores Meta/Google/GA4/Shopify", c: "0€ + 30-80€ Supermetrics opcional", s: "8-15h setup inicial", r: "D2C 5-40K€/mes, sweet spot calidad/coste" },
            { h: "Triple Whale (pixel propietario + dashboards)", c: "199-799$/mes", s: "1-2 días + integración Shopify", r: "D2C 30-80K€/mes con foco atribución" },
            { h: "Northbeam (atribución MTA + MMM)", c: "1.000-3.000$/mes", s: "2-4 semanas onboarding", r: "D2C >80K€/mes multi-canal con equipo dedicado" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.h}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Para el 70% de D2C españoles entre 10K€ y 40K€/mes spend, Looker Studio gratis con conectores nativos cubre todo lo necesario. La trampa es pagar 800$/mes por Triple Whale cuando ese dinero rinde más reinvertido en producción de creatividades o auditoría tracking. Más contexto en la <Link to="/blog/ga4-meta-ads-eventos-custom-d2c" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de GA4 + Meta Ads con BigQuery Export gratis hasta 1M eventos/día</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo construir el dashboard semanal paso a paso (Looker Studio)</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Conectar fuentes de datos a Looker Studio: Meta Ads (conector oficial), Google Ads (conector oficial), GA4 (conector oficial), Shopify (vía Supermetrics 30-80€/mes o exportación BigQuery custom). TikTok Ads vía Supermetrics si aplica.",
        "Crear blended source (Looker Studio nativo, gratis): unir Spend Meta + Spend Google + Spend TikTok en una sola dimensión spend_total y unir Revenue Shopify como métrica única para calcular MER blended = Revenue Shopify ÷ Spend total.",
        "Diseñar layout en 3 filas horizontales con identidad visual de la marca: fila 1 Negocio (4 tiles), fila 2 Adquisición paid (4 tiles), fila 3 Eficiencia operativa (4 tiles). Cada fila + 1 mini-gráfico evolución 8-12 semanas.",
        "Configurar filtro de fecha por defecto: últimos 7 días con comparación a 7 días anteriores y a 28 días anteriores. Esto permite ver tendencia rolling sin manipular controles.",
        "Crear segmentación por canal en cada métrica de adquisición: CAC adquisición específico debe excluir explícitamente campañas brand, retargeting y compradores 60d (filtros sobre campaign name o utm_campaign con convención naming).",
        "Configurar tabla resumen con cohortes LTV-30/60/90 por canal de adquisición: requiere conector Shopify a BigQuery o exportación semanal manual de la cohorte. Esto es lo que permite ver degradación de cohortes recientes.",
        "Programar envío automático del dashboard por email cada lunes 8am al founder + equipo (función nativa Looker Studio: Share → Schedule email delivery). Adjuntar PDF + link al dashboard live.",
        "Configurar alertas Slack vía webhook + script (n8n / Zapier) cuando umbrales críticos se rompen: MER blended <1,8x 3 días seguidos, CPA adquisición +35% vs baseline 7d, % spend learning >15%, frecuencia retargeting >5,5.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">5 errores frecuentes en dashboards de paid media D2C</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Mirar ROAS in-platform como métrica única: Meta reporta ROAS 4,5x y el founder sube spend, mientras MER blended cae de 2,4x a 1,9x por sobreatribución. La decisión correcta era pausar, no escalar.",
        "Dashboard con 40-60 métricas en 6 pestañas: nadie las revisa, nadie sabe cuál mirar primero. Mejor 8-10 métricas en 3 capas que se leen en 5 minutos y disparan decisión.",
        "Reporting de agencia que oculta CAC adquisición específico: solo muestra CAC blended (incluye retargeting, brand, orgánico atribuido) infravalorando el coste real de adquisición en 22-38%.",
        "Dashboard actualizado manualmente cada 15 días: el founder se entera de un mal funcionamiento 2 semanas tarde. Automatizar fuentes + envío programado es no-negociable.",
        "Ausencia de cohortes LTV-30/60/90 por canal: imposible ver si las cohortes recientes se degradan vs las de 6 meses atrás. Sin esto, el founder no sabe si está captando peor cliente o solo gastando más.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría reporting pre-onboarding (2-3h): revisamos el dashboard actual del cliente, identificamos métricas redundantes y métricas ausentes (MER blended, CAC adquisición específico, cohortes LTV-30/60/90). Entregamos plan de rediseño priorizado en 1 documento.",
        "Setup Looker Studio cross-channel: conectores Meta + Google + TikTok + GA4 + Shopify, blended source para MER, 3 capas de métricas (negocio / adquisición / eficiencia operativa), 12-15 tiles, 3 mini-gráficos rolling, filtros de comparación 7d/28d, envío programado lunes 8am.",
        "Sistema de alertas Slack vía pipeline n8n: cuando MER blended cae <1,8x 3 días, cuando CPA adquisición sube +35% vs baseline o cuando % spend en learning >15%, salta alerta automática al canal cliente con contexto y posible causa.",
        "Solución ad-hoc Pablo + Jorge: para una marca D2C de suplementos con 18K€/mes spend Meta + 6K€/mes Google + 3K€/mes TikTok, Jorge construyó pipeline n8n + Shopify Admin API + Meta/Google/TikTok Marketing APIs + GA4 BigQuery Export que cada noche cruza pedidos × cohorte × canal × LTV90 × margen contribución y publica Looker Studio con 12 tiles cross-channel a las 8am cada lunes. Pablo lidera la reunión semanal de 20 min con el cliente para decidir reasignación de spend. Resultado en 90 días: el founder dejó de pedir reports en PDF (ya tenía el dashboard en su móvil cada lunes), MER blended subió de 2,2x a 2,7x y la tasa de 2ª compra a 90d subió 7 puntos por mejor mix de canales.",
        "Revisión semanal estratégica de 20-25 min cada lunes con founder + media buyer + Pablo: leemos los 12 tiles, decidimos subir/bajar/mantener spend por canal, priorizamos 2-3 hipótesis creativas a producir esta semana y cerramos blockers operativos. Acta en Notion compartida.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo lidera la lectura semanal del dashboard con el founder y la decisión de reasignación de presupuesto entre canales; Jorge construye y mantiene el pipeline técnico (n8n + APIs + BigQuery + Looker Studio) que alimenta el dashboard cada noche sin intervención manual. Donde otras agencias mandan PDF con métricas de plataforma cada 15 días, en DayByDay el cliente tiene un dashboard cross-channel en su móvil cada lunes 8am con MER blended, CAC adquisición específico, % New Customers, cohortes LTV-30/60/90 y alertas Slack automáticas cuando algo crítico se rompe. El cliente habla con los dos socios desde el primer día: sin account managers, sin handoffs entre equipo de marketing y equipo de datos.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu agencia te manda PDF con métricas de Meta cada 15 días y no sabes si estás escalando con margen?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría reporting gratuita 30 min: revisamos tu dashboard actual, identificamos métricas redundantes y ausentes (MER blended, CAC adquisición específico, cohortes LTV) y te entregamos plan de rediseño en Looker Studio con coste, tiempo de setup y métricas críticas para tu tramo de spend.</p>
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
        <Link to="/blog/cac-blended-vs-cac-canal-ecommerce" className="text-white font-semibold hover:text-white/80">
          CAC blended vs CAC por canal: qué métrica usar para escalar →
        </Link>
        <p className="text-white/40 text-xs mt-1">Diferencia entre CAC blended y CAC adquisición específico, y por qué ocultar el segundo infravalora el coste real 22-38%.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/ga4-meta-ads-eventos-custom-d2c" className="text-white font-semibold hover:text-white/80">
          GA4 + Meta Ads para D2C: implementación de eventos custom →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo alimentar el dashboard del founder con GA4 BigQuery gratis y eventos custom específicos D2C.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/modelos-atribucion-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Modelos de atribución para D2C: last-click, data-driven y MMM →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué el ROAS in-platform sobreatribuye y el MER blended es la única métrica neutral del founder.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/metricas-meta-ads-importantes-ecommerce" className="text-white font-semibold hover:text-white/80">
          Métricas Meta Ads que importan de verdad (y las que no) →
        </Link>
        <p className="text-white/40 text-xs mt-1">MER vs ROAS de plataforma, CPA real, CPNC y cadencia de revisión para quien gestiona la cuenta a diario.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/adquisicion-vs-retencion-paid-media-d2c" className="text-white font-semibold hover:text-white/80">
          Adquisición vs retención: cómo separar presupuestos de paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">Estructura de presupuestos ADQ/RET y los 4 buckets de gasto/ingresos que deben aparecer en el dashboard del founder.</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default DashboardPaidMediaFounderD2cPage;
