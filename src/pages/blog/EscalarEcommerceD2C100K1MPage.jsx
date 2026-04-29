import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Cuánto se puede escalar un eCommerce D2C con paid media de 100K a 1M€ al año?",
    a: "El salto de 100K€ a 1M€ de facturación con paid media es realista en 12-24 meses si se cumplen tres condiciones: margen de contribución >40%, LTV/CAC >2,5x a 90 días y un sistema de validación creativa que genere mínimo 6-10 conceptos nuevos al mes. La trampa habitual es escalar presupuesto antes de tener señales de demanda validadas — eso multiplica el CAC sin mover ingresos. En las cuentas D2C que llevamos en DayByDay, las que escalan de forma sostenida son las que tratan el paid media como un sistema de validación de hipótesis, no como un grifo de presupuesto.",
  },
  {
    q: "¿Qué KPIs hay que monitorizar para escalar un eCommerce D2C sin romper la rentabilidad?",
    a: "Cuatro KPIs definen si el sistema escala: MER (Marketing Efficiency Ratio = ingresos totales / inversión total en marketing), CAC blended (gasto total / nuevos clientes), LTV a 90 días y nCPA (coste por nuevo cliente, no por compra). El ROAS de plataforma es ruido en fase de escala — durante un escalado, las ventanas de atribución se distorsionan. El MER es la métrica que no miente. Si el MER se mantiene estable o sube cuando subes el presupuesto, escala. Si baja >10% durante 14 días seguidos, has tocado el techo de la audiencia o las creatividades.",
  },
  {
    q: "¿Cuántas creatividades necesita un D2C para escalar de 100K a 1M€?",
    a: "Como referencia operativa: en fase 100-300K€ de facturación, mínimo 4-6 nuevos conceptos creativos al mes; en fase 300K-1M€, 8-12 nuevos conceptos al mes. No son 8-12 ediciones del mismo creativo — son ángulos, hooks y formatos distintos. Sin esa máquina de creatividades, el algoritmo de Meta agota la audiencia y el CPM sube entre un 15 y 30% trimestralmente. La causa más común de un techo de escala no es el presupuesto, es la fatiga creativa.",
  },
  {
    q: "¿Cuál es el orden correcto para escalar un D2C: presupuesto, audiencias o creatividades?",
    a: "El orden es: validación → creatividades → audiencias → presupuesto. Subir presupuesto sin haber validado que la creatividad funciona en tres audiencias distintas (lookalike, intereses amplios, retargeting) genera CACs falsamente bajos en la primera semana que se desploman al cuarto mes. La regla en DayByDay: ningún incremento >25% sobre el presupuesto medio de los últimos 7 días si no hay 3 creativos en producción con CPA por debajo del objetivo durante 14 días seguidos.",
  },
  {
    q: "¿Cuándo es momento de añadir Google Ads y otros canales a un D2C que escala con Meta Ads?",
    a: "El segundo canal entra cuando el primero da síntomas claros de saturación: CPM en subida sostenida (>20% en 60 días), frecuencia >4 en audiencias frías, MER en caída a pesar de creativos nuevos. Antes de eso, multiplicar canales antes de saturar el primero diluye el aprendizaje. En la mayoría de D2C que llevamos, esa señal aparece entre los 30K y 60K€/mes de inversión en Meta. Google Ads (Search + Performance Max) suele ser el siguiente canal lógico, no TikTok ni LinkedIn.",
  },
  {
    q: "¿Qué papel juega la IA y la automatización al escalar un eCommerce D2C?",
    a: "Tres áreas concretas donde la IA mueve la aguja al escalar: (1) generación y rotación de creatividades — herramientas de IA permiten producir 3-5x más conceptos por mes; (2) validación de hipótesis a escala — modelos predictivos sobre datos históricos del píxel y la API de Conversiones para identificar audiencias con alta probabilidad de conversión antes de testarlas con presupuesto; (3) automatización de reglas de cuenta — pausado y escalado de adsets según señales del backend (Shopify, CRM), no solo de la plataforma. La IA no sustituye la estrategia, acelera los ciclos de validación.",
  },
  {
    q: "¿Cuántos meses de paid media hacen falta para llevar un D2C de 100K a 1M€?",
    a: "El rango realista es 12-24 meses, dependiendo del margen y del LTV. Las cuentas que escalan en menos de 12 meses suelen tener: producto con repetición de compra (LTV >150€ a 6 meses), margen >50%, y un equipo capaz de producir 8+ creatividades nuevas al mes. Por debajo de eso, forzar el escalado en menos de 12 meses casi siempre destruye margen. El error más común es proyectar el ROAS de los primeros 30K€ al millón — el CAC sube de forma no lineal a partir del 60-70% de penetración del público objetivo realista.",
  },
  {
    q: "¿Qué errores hay que evitar para no romper la rentabilidad al escalar?",
    a: "Los cinco errores más caros: (1) subir presupuesto >50% en menos de 7 días — desestabiliza la fase de aprendizaje del algoritmo; (2) lanzar audiencias nuevas sin haber agotado el aprendizaje de la actual; (3) cambiar configuración de campañas en periodos de alta inversión sin documentar el cambio; (4) confiar solo en el ROAS de plataforma cuando el MER ya está dando señal de caída; (5) no parar campañas perdedoras por miedo a perder learning — un adset con 14 días sin venta no va a remontar, está consumiendo presupuesto que necesita el adset ganador para escalar.",
  },
];

const EscalarEcommerceD2C100K1MPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Cómo escalar un eCommerce D2C de 100K a 1M€ con paid media"
    description="Sistema completo para escalar un eCommerce D2C de 100K a 1M€ de facturación con paid media: validación de hipótesis, métricas de escala (MER, nCPA, LTV/CAC), motor de creatividades, escalado de presupuesto y el orden correcto para activar nuevos canales sin romper la rentabilidad."
    slug="escalar-ecommerce-d2c-100k-1m-paid-media"
    datePublished="2026-04-27"
    dateModified="2026-04-27"
    readingTime="14 min"
    category="Estrategia"
    keywords={["escalar ecommerce D2C paid media", "escalar ecommerce 1M", "estrategia paid media D2C", "MER ecommerce escalable", "validación hipótesis paid media"]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Escalar un eCommerce D2C de 100K a 1M€ con paid media</strong> no es un problema de presupuesto, es un problema de sistema. Las marcas que se quedan atascadas en 200-400K€ de facturación anual no fallan por falta de inversión — fallan porque tratan Meta Ads y Google Ads como un grifo que se abre, no como un sistema de validación de hipótesis donde cada euro produce información antes de producir ventas.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Esta guía es la metodología que aplicamos en DayByDay para llevar cuentas D2C españolas del rango 100-300K€ al millón de facturación: cómo se valida el ajuste producto-creatividad, cómo se construye el motor de creatividades que alimenta el algoritmo, qué métricas miramos en cada fase, cuándo se sube presupuesto, cuándo se añade un segundo canal y qué errores destruyen margen aunque el ROAS de plataforma diga lo contrario.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Por qué la mayoría de D2C se atasca antes del millón</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Según el <a href="https://www.iabspain.es/wp-content/uploads/2024-Estudio-Inversion-Publicitaria-en-Medios-Digitales-IAB.pdf" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">estudio de inversión publicitaria digital de IAB Spain</a>, la inversión en social ads y search en España creció un 11,2% en 2024, pero la mayoría de D2C españoles se quedan estancados entre los 250K y 600K€ de facturación anual. La causa raíz no es saturación de mercado: el mercado D2C español facturó más de 6.000 millones en publicidad digital en 2024.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Lo que falla no es la demanda. Falla el sistema. En las auditorías que hacemos a marcas que llegan estancadas, los patrones se repiten:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Cuenta con 1-2 creatividades en producción durante meses, sin proceso sistemático para producir nuevas. Resultado: el algoritmo agota la audiencia y el CPM sube un 25-40% en 90 días.",
        "Decisiones de escala basadas exclusivamente en ROAS de plataforma — sin cruzar con el MER ni el nCPA real desde Shopify. Cuando se cruzan los datos, el ROAS real es un 25-30% inferior al reportado por Meta.",
        "Subidas de presupuesto >50% de un día para otro porque 'la campaña va bien'. La fase de aprendizaje se rompe y el adset entra en una espiral de coste por compra creciente.",
        "Mezcla de TOFU, MOFU y BOFU en las mismas campañas, sin separar señal de aprendizaje. Imposible saber si lo que escala es la captación, el retargeting o un sesgo de atribución.",
        "Sin sistema de validación de hipótesis: cada audiencia o creativo nuevo se prueba a presupuesto pequeño durante 3-4 días y se mata antes de que salga del periodo de aprendizaje. Se pierde el learning antes de capturarlo.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">El sistema en 5 fases (no es un funnel, es un loop)</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      La diferencia entre un D2C que escala y uno que no escala es que el primero opera como un sistema cerrado: cada euro invertido produce un dato, cada dato modifica una hipótesis, cada hipótesis genera el siguiente test. Llevamos a las marcas a este loop antes de subirles el presupuesto. El framework que aplicamos tiene 5 fases.
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Fase</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Rango de facturación</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Foco operativo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">KPI principal</th>
          </tr>
        </thead>
        <tbody>
          {[
            { fase: "1. Validación", rango: "0-100K€/año", foco: "Encontrar product-message fit. Testar 3-5 ángulos creativos por mes en audiencias frías.", kpi: "nCPA y CVR de landing" },
            { fase: "2. Tracción", rango: "100-300K€/año", foco: "Sistema de creatividades estable (4-6/mes). Estructura de campañas separada por intención (TOFU / retargeting).", kpi: "MER y CPA real (Shopify)" },
            { fase: "3. Escala", rango: "300-700K€/año", foco: "Motor de creatividades (8-12/mes). Adopción API de Conversiones server-side. Pruebas controladas de Advantage+.", kpi: "MER por canal + LTV 90d" },
            { fase: "4. Diversificación", rango: "700K-1,5M€/año", foco: "Segundo canal (Google Ads Search + PMax). Reglas automatizadas. Reporting cruzado backend + plataformas.", kpi: "Blended CAC + LTV/CAC 180d" },
            { fase: "5. Sistema", rango: "1,5M€+/año", foco: "Atribución propia, modelos predictivos sobre Conversions API, equipo especializado por canal.", kpi: "Contribución incremental real" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-medium text-xs">{row.fase}</td>
              <td className="py-3 px-3 text-white/70 text-xs">{row.rango}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.foco}</td>
              <td className="py-3 px-3 text-white/70 text-xs">{row.kpi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Saltar de fase sin tener cerrada la anterior es el error que destruye más margen en D2C español. Una marca con product-message fit no validado intentando escalar a 50K€/mes en Meta Ads quema el presupuesto en aprendizaje sin producir ingresos sostenibles. Cada fase tiene un criterio de salida concreto — y antes de cumplirlo, no se sube presupuesto.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Validación de hipótesis: el módulo central del sistema</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      En el primer mes de cualquier cuenta nueva, lo que tratamos no es campañas — son hipótesis. Cada combinación de ángulo creativo + audiencia + landing es una hipótesis con un coste de validación finito. La pregunta no es "¿está funcionando?", es "¿cuánto presupuesto necesito invertir para saber si funciona o no?".
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Como referencia operativa basada en cuentas D2C españolas con ticket medio entre 40 y 90€:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Presupuesto mínimo de validación por hipótesis: 3 × CPA objetivo. Si tu CPA objetivo es 25€, necesitas invertir mínimo 75€ por hipótesis para tener una señal accionable.",
        "Periodo mínimo: 5-7 días por hipótesis. Por debajo de esto, los datos están dominados por la fase de aprendizaje del algoritmo, no por el rendimiento real de la creatividad.",
        "Criterio de muerte: si tras 3 × CPA objetivo no hay 1 conversión, se mata la hipótesis. Si hay 1-2 conversiones, se mantiene 7 días más en observación. A partir de 3 conversiones consistentes con CPA dentro del objetivo, se promueve a campaña de escala.",
        "Documentación: cada hipótesis se registra antes de lanzarse — qué se está probando, qué resultado se espera, cuándo se mata. Esto es lo que diferencia un sistema de un caos.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      El motor de validación es lo que permite escalar después: para llegar a 1M€/año en facturación con un CAC saludable, una marca D2C necesita haber acumulado entre 80 y 150 hipótesis testadas y documentadas a lo largo de 18-24 meses. Esa base de datos de aprendizajes es lo que alimenta el algoritmo cuando se sube presupuesto — y es lo que la mayoría de marcas estancadas no tienen.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 4 métricas que miramos para decidir si escalamos</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Cuando una cuenta entra en fase de escala (de 300K a 1M€), las decisiones de subida de presupuesto las toma el sistema, no la intuición. Estas son las 4 métricas que cruzamos cada lunes por la mañana antes de modificar nada:
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          num: "1",
          titulo: "MER (Marketing Efficiency Ratio) — la métrica que no se puede inflar",
          desc: "Ingresos totales del negocio dividido entre gasto total en marketing (Meta + Google + lo que sea). No depende de atribución de plataforma. Si subes presupuesto y el MER se mantiene o sube → señal verde para escalar más. Si el MER baja >10% durante 14 días seguidos → has tocado el techo. Operativo: en cuentas D2C españolas con margen 45-55%, un MER >3 es saludable; <2,5 empieza a ser problema.",
        },
        {
          num: "2",
          titulo: "nCPA (coste por NUEVO cliente)",
          desc: "Diferenciar entre coste por compra y coste por nuevo cliente es lo que separa una cuenta que escala de una que solo recompra. El nCPA se calcula cruzando datos de Shopify (¿es un cliente nuevo o recurrente?) con la inversión publicitaria. Cuando empieza a subir, suele ser la primera señal de saturación de audiencia — antes de que aparezca en el ROAS o el MER.",
        },
        {
          num: "3",
          titulo: "LTV / CAC a 90 y 180 días",
          desc: "El ratio LTV/CAC es la métrica que indica si la escala es sostenible. En fase 100-300K, miramos LTV a 90 días. En fase 300K-1M, miramos LTV a 180 días — porque a esa escala los costes de captación necesitan más tiempo para amortizarse. Regla operativa: LTV/CAC <2,5 a 90 días → no se sube presupuesto, se trabaja en email/CRM y repetición de compra antes de captar más.",
        },
        {
          num: "4",
          titulo: "CPM por audiencia + frecuencia",
          desc: "El CPM en audiencias frías y la frecuencia en audiencias <100K personas son las dos señales tempranas de fatiga creativa. CPM en subida sostenida + frecuencia >4 en menos de 30 días → la creatividad se ha agotado, el algoritmo está pagando más por menos atención. Cualquier subida de presupuesto en este escenario amplifica el problema.",
        },
      ].map(({ num, titulo, desc }) => (
        <div key={num} className="bg-[#1a1616] border border-white/8 rounded-xl p-4 flex gap-4">
          <div className="w-8 h-8 rounded-full bg-[#de0015]/20 border border-[#de0015]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-[#de0015] font-bold text-sm">{num}</span>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-1">{titulo}</p>
            <p className="text-white/55 text-sm">{desc}</p>
          </div>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">El motor de creatividades: por qué es el cuello de botella real</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      A partir de los 30K€/mes de inversión en Meta Ads, el factor que limita el crecimiento no es el presupuesto ni la audiencia — es el ritmo de producción creativa. El algoritmo necesita material nuevo para no agotar la atención de la audiencia. Sin motor de creatividades, escalar es imposible: en 90 días el CPM sube, el CTR cae y el CAC se dispara.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Lo que llamamos "motor" no es producir más vídeos. Es un sistema documentado con tres componentes:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Componente</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Output mensual</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Fuente</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "Banco de ángulos (problema, identidad, prueba social, comparación, urgencia)", o: "8-12 nuevos ángulos validados", f: "Reseñas, reddit, support tickets, encuestas a clientes" },
            { c: "Pipeline UGC (creadores reales, formato vertical)", o: "6-10 vídeos UGC nuevos", f: "Plataformas de UGC + creadores propios bajo brief" },
            { c: "Iteraciones sobre ganadores (re-edición, variaciones de hook, longitudes)", o: "4-8 variaciones del top creativo", f: "Editor interno o agencia con SLA de 5 días" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-medium text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/70 text-xs">{row.o}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.f}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La <a href="https://www.facebook.com/business/help/418985315843515" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial de Meta sobre creative diversity</a> confirma que las cuentas con mayor variedad creativa tienen CPMs más bajos y mejor rendimiento sostenido. Operativamente, esto significa que producir 8-12 conceptos nuevos al mes no es un lujo, es lo que evita que el algoritmo se quede sin material y suba el coste por mil impresiones.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Protocolo de escalado de presupuesto (sin romper aprendizaje)</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El error más caro al escalar es subir presupuesto demasiado rápido. La fase de aprendizaje de Meta Ads se rompe con incrementos superiores al 30-50% en menos de 7 días. Cuando se rompe, el algoritmo vuelve a explorar y el CPA sube un 30-60% durante las semanas siguientes. Esto es lo que aplicamos:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Regla del +20-25% / 4-7 días: ningún incremento sobre el presupuesto medio de los últimos 7 días superior al 25%, esperando 4-7 días entre subidas para evaluar estabilidad.",
        "Una subida por adset por semana, máximo. Subir simultáneamente 5 adsets desestabiliza la cuenta entera.",
        "Antes de subir: el adset debe llevar 14 días dentro del CPA objetivo y haber salido de la fase de aprendizaje (>50 conversiones en la ventana de optimización).",
        "Si tras una subida el CPA sube >20% durante 5 días seguidos: se vuelve al presupuesto anterior. No se mantiene 'a ver si remonta'.",
        "Cambios estructurales (audiencias, optimización, creatividades) NUNCA se hacen el mismo día de una subida de presupuesto. Se aísla la variable.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cuándo entra el segundo canal (y cuándo no)</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Un error muy común a partir de los 200K€/año es diversificar canales antes de tiempo. La intuición dice "no pongas todos los huevos en Meta" — la realidad operativa dice que un canal sin saturar genera mejores retornos que dos canales mal gestionados.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Las señales objetivas que indican que es momento de añadir Google Ads (Search + Performance Max) son:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "CPM en audiencias frías de Meta sube >20% durante 60 días seguidos — la audiencia está saturada y la competencia es estructural, no estacional.",
        "Frecuencia >4 en audiencias frías incluso tras inyectar 6+ creatividades nuevas en un mes — síntoma claro de techo de audiencia.",
        "Búsquedas de marca en Google con tendencia creciente — la presión de Meta está generando demanda capturable en Search.",
        "MER se mantiene o sube cuando Meta cubre el 100% de inversión actual, pero pequeñas pruebas de Google brand-search dan CAC por debajo de Meta — señal verde para mover el 15-25% del presupuesto.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Según <a href="https://www.thinkwithgoogle.com/intl/es-es/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Think with Google España</a>, las búsquedas relacionadas con marcas D2C en sectores como moda, belleza y suplementos crecen de forma desproporcionada cuando esas marcas invierten >30K€/mes en social ads — la capa de Search captura demanda generada por los anuncios sociales. Activar Search antes de tener volumen en Meta es invertir en demanda que no existe.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">IA y automatización en el sistema de escala</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      La IA no escala una cuenta — un sistema sí. Pero hay tres áreas donde la IA acelera el ciclo de validación de hipótesis y permite operar con menos fricción:
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          num: "1",
          titulo: "Generación y rotación de creatividades",
          desc: "Modelos generativos para producir 3-5x más conceptos por mes (variaciones de hook, copy, formatos) bajo el control de un media buyer senior que filtra y aprueba. Lo que antes requería un equipo de 4 personas, lo hace una persona con un sistema bien montado.",
        },
        {
          num: "2",
          titulo: "Validación predictiva de hipótesis",
          desc: "Modelos sobre los datos históricos del píxel + API de Conversiones que asignan una probabilidad a cada nueva audiencia o creativo antes de testarla con presupuesto. No sustituye el test real, pero permite priorizar las hipótesis con mayor probabilidad de funcionar y matar antes las que tienen señal débil.",
        },
        {
          num: "3",
          titulo: "Reglas automatizadas conectadas al backend",
          desc: "Reglas que pausan o escalan adsets según señales de Shopify (clientes nuevos vs recurrentes, margen real del producto vendido) y no solo según métricas de plataforma. Esto es lo que evita que el algoritmo escale ventas que no son rentables porque tienen margen negativo.",
        },
      ].map(({ num, titulo, desc }) => (
        <div key={num} className="bg-[#1a1616] border border-white/8 rounded-xl p-4 flex gap-4">
          <div className="w-8 h-8 rounded-full bg-[#de0015]/20 border border-[#de0015]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-[#de0015] font-bold text-sm">{num}</span>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-1">{titulo}</p>
            <p className="text-white/55 text-sm">{desc}</p>
          </div>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La <a href="https://developers.facebook.com/docs/marketing-api/conversions-api" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">API de Conversiones de Meta</a> bien implementada en server-side (no solo el píxel del navegador) es prerequisito de cualquier sistema de IA serio sobre la cuenta — sin esos datos limpios, los modelos predictivos aprenden sobre ruido. La <a href="https://www.shopify.com/blog/conversions-api" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación de Shopify sobre Conversions API</a> recoge la implementación recomendada para D2C.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay con cuentas en fase de escala</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Cuando una cuenta entra en escala (300K-1M€/año), la operación semanal en DayByDay es la siguiente:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Lunes 10:00 — revisión cruzada de MER, nCPA y LTV/CAC con datos de Shopify y plataformas. Una sola decisión por semana sobre subidas o bajadas de presupuesto. No 'optimizamos' en mitad de semana sin causa documentada.",
        "Martes — pipeline creativo: revisión de los conceptos enviados por el equipo UGC y editor, brief de los próximos 4-6 conceptos del mes. Un creativo que entra en producción tiene un objetivo claro de validación.",
        "Miércoles — auditoría de hipótesis abiertas: cuáles han alcanzado el presupuesto de validación, cuáles se matan, cuáles se promueven a escala. Documentación al CRM operativo.",
        "Jueves — revisión de reglas automatizadas y cruces backend (Shopify) para detectar adsets escalando ventas con margen negativo. Ajuste de reglas y lista negra de SKUs si procede.",
        "Viernes — reporting al cliente: MER, CPA real, nCPA, evolución del LTV. Acceso directo a Pablo, no juniors. Decisiones de la semana siguiente acordadas en una llamada de 30 min.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      En las cuentas que llevamos, el escalado de 100K a 1M€ de facturación tarda entre 14 y 22 meses. Las que escalan más rápido tienen producto con repetición de compra natural (LTV >150€ a 6 meses). Las que tardan más son las que parten sin tracking limpio o sin sistema de creatividades — y la primera fase del trabajo es montar esa base antes de tocar presupuesto.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu D2C está listo para escalar de 100K a 1M€ con paid media?</p>
      <p className="text-white/50 text-sm mb-4">Auditamos tu cuenta gratis: revisamos tracking, estructura de campañas, motor de creatividades y métricas reales. Te decimos exactamente qué fase del sistema te falta.</p>
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
        <Link to="/blog/estrategia-full-funnel-d2c" className="text-white font-semibold hover:text-white/80">
          Estrategia full funnel D2C: del frío al cliente recurrente →
        </Link>
        <p className="text-white/40 text-xs mt-1">Orden operativo para montar el sistema multi-canal completo (Meta + Google + email/WhatsApp) antes de escalar</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cuanto-invertir-meta-ads-calculadora" className="text-white font-semibold hover:text-white/80">
          Cuánto invertir en Meta Ads según tu ticket y margen (con calculadora) →
        </Link>
        <p className="text-white/40 text-xs mt-1">Calculadora interactiva para fijar el presupuesto Meta inicial antes de entrar en el sistema de escalado</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-campanas-meta-ads-sin-romper-roas" className="text-white font-semibold hover:text-white/80">
          Cómo escalar campañas Meta Ads sin romper el ROAS →
        </Link>
        <p className="text-white/40 text-xs mt-1">Protocolo táctico de subida de presupuesto y umbrales de decisión a nivel de campaña</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/metricas-meta-ads-importantes-ecommerce" className="text-white font-semibold hover:text-white/80">
          Métricas Meta Ads que importan de verdad (y las que no) →
        </Link>
        <p className="text-white/40 text-xs mt-1">MER, CPA real y nCPA — las métricas que no se pueden inflar al escalar</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/creative-testing-meta-ads" className="text-white font-semibold hover:text-white/80">
          Creative Testing en Meta Ads: framework para encontrar ganadores →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo construir el motor de creatividades que alimenta la fase de escala</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/metodologia-daybyday-ia-automatizacion-paid-media" className="text-white font-semibold hover:text-white/80">
          Metodología DayByDay: IA + automatización + paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">El proceso completo en 4 fases que aplicamos en cuentas en fase de escala</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cac-vs-ltv-ecommerce-escalable" className="text-white font-semibold hover:text-white/80">
          CAC vs LTV: la métrica que define si tu D2C es escalable →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo calcular LTV-180d y CAC blended para saber si el negocio aguanta la siguiente subida de presupuesto</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default EscalarEcommerceD2C100K1MPage;
