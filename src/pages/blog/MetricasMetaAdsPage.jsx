import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Cuáles son las métricas más importantes en Meta Ads para ecommerce?",
    a: "Para ecommerce, las métricas que realmente importan son: ROAS real de negocio (ingresos totales / inversión publicitaria), CPA (coste por compra), MER (Marketing Efficiency Ratio = ingresos totales / gasto total en marketing) y CPNC (coste por nuevo cliente). El CTR y el CPM son métricas auxiliares útiles para diagnosticar problemas, no para evaluar si las campañas funcionan. El ROAS que reporta Meta sobreestima entre un 20-35% respecto al ROAS real.",
  },
  {
    q: "¿Qué es el MER y por qué importa más que el ROAS?",
    a: "El MER (Marketing Efficiency Ratio) es el ratio entre los ingresos totales del negocio y el gasto total en publicidad. A diferencia del ROAS de plataforma, el MER no depende de ventanas de atribución ni de modelos de atribución — solo mira la caja. Si el MER sube cuando subes la inversión en Meta Ads, las campañas están funcionando. Si baja, algo falla. Es la métrica que recomendamos para tomar decisiones de escala porque no puede ser manipulada por el algoritmo.",
  },
  {
    q: "¿Por qué el ROAS de Meta Ads no es fiable?",
    a: "El ROAS que reporta Meta Ads Manager sobreestima el rendimiento real por tres razones: atribuye conversiones a anuncios que no fueron el último contacto antes de la compra (ventana de atribución de 7 días post-clic + 1 día post-view), cuenta a compradores que habrían comprado igualmente sin ver el anuncio, y puede duplicar conversiones si el píxel y la API de Conversiones no están configurados correctamente. La discrepancia típica en cuentas D2C españolas es del 20-35%.",
  },
  {
    q: "¿Qué CTR es bueno en Meta Ads para ecommerce?",
    a: "El CTR por sí solo no dice nada sobre si las campañas funcionan o no. Un CTR del 3% con un ROAS de 1,5x es peor que un CTR del 0,8% con un ROAS de 4x. Dicho esto, como referencia para D2C en España en 2026: CTR inferior al 0,8% en frío suele indicar problemas de creatividad o audiencia; CTR superior al 2,5% en frío suele indicar buena resonancia. Pero nunca optimices por CTR — optimiza por coste por compra.",
  },
  {
    q: "¿Qué métricas de Meta Ads son una pérdida de tiempo?",
    a: "Las métricas que no deberían informar decisiones de negocio son: alcance (no es objetivo, es consecuencia del presupuesto), frecuencia (mirarla en exceso genera paranoia sin datos suficientes para actuar), puntuación de relevancia (retirada por Meta en 2019, sustituida por métricas de diagnóstico sin peso en optimización real), y resultados en objetivos de conciencia (impresiones, visitas a perfil) si tu objetivo es vender.",
  },
  {
    q: "¿Con qué frecuencia hay que revisar las métricas de Meta Ads?",
    a: "La cadencia correcta depende de la métrica: ROAS de plataforma y CPA → revisar semanalmente, no diariamente (las fluctuaciones de 24-48h no son significativas). MER → revisar semanalmente con los datos del negocio. CTR y CPM → revisar cuando haya caída de rendimiento, no como rutina diaria. Cambios en campañas → esperar mínimo 7 días antes de evaluar, para que el algoritmo salga de la fase de aprendizaje.",
  },
];

const MetricasMetaAdsPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Métricas Meta Ads que importan de verdad (y las que no)"
    description="Guía práctica sobre qué métricas de Meta Ads usar para tomar decisiones en ecommerce D2C: ROAS real vs ROAS de plataforma, MER, CPA, CTR y cuáles ignorar para no optimizar hacia los KPIs equivocados."
    slug="metricas-meta-ads-importantes-ecommerce"
    datePublished="2026-04-07"
    dateModified="2026-04-07"
    readingTime="6 min"
    category="Meta Ads"
    keywords={["métricas meta ads", "métricas meta ads importantes", "kpis meta ads ecommerce", "mer marketing efficiency ratio", "roas meta ads fiable"]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Las métricas de Meta Ads que importan de verdad</strong> no son las que el Ads Manager pone en primera fila. En la mayoría de cuentas D2C que auditamos, los gestores toman decisiones basándose en el ROAS de plataforma, el CTR o el alcance — métricas que, sin contexto, pueden llevar a optimizar campañas que en realidad están destruyendo margen.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Este artículo recoge qué métricas usamos en DayByDay para evaluar si una cuenta funciona de verdad, cuáles son trampa y con qué frecuencia hay que mirarlas para no tomar decisiones con datos incompletos.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">El problema con las métricas por defecto de Meta</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Meta Ads Manager está optimizado para que los anunciantes vean sus campañas con el mejor rendimiento posible. Eso no significa que mienta — significa que las métricas por defecto responden a la pregunta "¿qué hicieron mis anuncios según Meta?" en lugar de "¿están generando negocio real mis anuncios?".
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      La discrepancia más común: el ROAS que reporta Meta sobreestima el rendimiento real entre un 20-35% en cuentas D2C españolas, según los datos que manejamos de nuestros clientes. Esto ocurre porque Meta usa ventanas de atribución amplias (7 días post-clic + 1 día post-view por defecto) y atribuye conversiones que habrían ocurrido igualmente sin el anuncio.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Tabla: qué métricas importan y para qué</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Métrica</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Sirve para</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">No sirve para</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Prioridad</th>
          </tr>
        </thead>
        <tbody>
          {[
            { metrica: "MER (Marketing Efficiency Ratio)", sirve: "Decisiones de escala y presupuesto global", noSirve: "Comparar campañas individuales", prioridad: "⭐⭐⭐⭐⭐" },
            { metrica: "CPA (coste por compra real)", sirve: "Evaluar rentabilidad de campañas", noSirve: "Comparar entre sectores sin contexto de margen", prioridad: "⭐⭐⭐⭐⭐" },
            { metrica: "ROAS de plataforma (Meta)", sirve: "Diagnóstico relativo entre campañas", noSirve: "Tomar decisiones absolutas de rentabilidad", prioridad: "⭐⭐⭐" },
            { metrica: "CTR (click-through rate)", sirve: "Diagnóstico de creatividades y audiencias", noSirve: "Evaluar si las campañas generan negocio", prioridad: "⭐⭐" },
            { metrica: "CPM (coste por mil impresiones)", sirve: "Detectar saturación de audiencia o competencia estacional", noSirve: "Comparar entre campañas de distinto objetivo", prioridad: "⭐⭐" },
            { metrica: "CPNC (coste por nuevo cliente)", sirve: "Medir eficiencia de captación pura", noSirve: "Evaluar campañas de retargeting", prioridad: "⭐⭐⭐⭐" },
            { metrica: "Frecuencia", sirve: "Detectar fatiga publicitaria en audiencias pequeñas", noSirve: "Tomar decisiones sin mirar la tendencia temporal", prioridad: "⭐" },
            { metrica: "Alcance", sirve: "Auditorías de cobertura de audiencia", noSirve: "Evaluar resultados de negocio", prioridad: "⭐" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-medium text-xs">{row.metrica}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.sirve}</td>
              <td className="py-3 px-3 text-white/40 text-xs">{row.noSirve}</td>
              <td className="py-3 px-3 text-white/70 text-xs">{row.prioridad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 3 métricas que usamos para evaluar si una cuenta funciona</h2>

    <div className="space-y-4 mb-6">
      {[
        {
          num: "1",
          titulo: "MER — Marketing Efficiency Ratio",
          desc: "El MER es la métrica más honesta que existe: ingresos totales del negocio dividido entre gasto total en publicidad. No depende de atribución, no puede ser inflado por ventanas de conversión y refleja el impacto real en caja. Fórmula: MER = Ingresos totales / Inversión total en paid media. Si el MER es 4, cada euro invertido en publicidad genera 4€ de ingreso. Cuando escalamos una cuenta, miramos si el MER sube, se mantiene o baja — esa es la única señal que necesitamos para saber si el incremento de presupuesto está funcionando.",
        },
        {
          num: "2",
          titulo: "CPA real (no el de Meta)",
          desc: "El CPA de Meta Ads Manager incluye conversiones atribuidas con ventanas amplias que sobreestiman su contribución. El CPA real que miramos nosotros sale de dividir la inversión en Meta entre las compras registradas en Shopify o en el servidor (vía API de Conversiones), no las que reporta Meta. La diferencia media en cuentas D2C es del 20-35%. Operar con el CPA de plataforma sin cruzarlo con los datos del negocio es tomar decisiones con información incompleta.",
        },
        {
          num: "3",
          titulo: "CPNC — Coste por Nuevo Cliente",
          desc: "En ecommerce D2C, la pregunta relevante no es solo cuánto cuesta una compra — es cuánto cuesta conseguir un cliente que no ha comprado antes. El CPNC requiere que el CRM o el sistema de pedidos identifique si el comprador es nuevo o recurrente. Meta puede dar una aproximación con la configuración de Advantage+ Shopping, pero el dato limpio viene del backend. Si el CPNC está por encima del LTV esperado en los primeros 90 días, la estrategia de captación no es rentable independientemente del ROAS de plataforma.",
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

    <h2 className="text-2xl font-black mt-10 mb-4">Métricas de diagnóstico: útiles cuando algo falla</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El CTR y el CPM no son métricas de negocio, pero sí son útiles para diagnosticar por qué el rendimiento ha caído. Así las usamos:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "CTR cae de forma sostenida (>20% en 2 semanas) → señal de fatiga creativa. Prioridad: producir nuevas creatividades antes de tocar presupuesto o audiencias.",
        "CPM sube de forma brusca sin cambios en la cuenta → señal de presión competitiva estacional (rebajas, Black Friday, Navidad) o aumento de competencia en el sector. Acción: revisar el calendario y valorar ajustar presupuesto temporalmente.",
        "CTR alto + CPA alto → la creatividad engancha pero la landing no convierte. El problema está fuera de Meta Ads, no dentro.",
        "CTR bajo + CPA bajo → audiencia poco interesada pero que convierte bien la poca que llega. Suele indicar una audiencia muy cualificada con bajo volumen — ideal para escalar con lookalikes.",
        "Frecuencia >3 en menos de 30 días en audiencias <50.000 personas → riesgo real de saturación. Ampliar audiencia o rotar creatividades.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Con qué frecuencia revisar cada métrica</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Uno de los errores más comunes en la gestión de Meta Ads es revisar los resultados cada día. Los algoritmos de Meta necesitan al menos 7 días para estabilizarse después de cualquier cambio. Revisar antes genera decisiones precipitadas que interrumpen el aprendizaje y empeoran los resultados. Esta es la cadencia que seguimos:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Métrica</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Frecuencia de revisión</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cuándo actuar</th>
          </tr>
        </thead>
        <tbody>
          {[
            { metrica: "MER", frecuencia: "Semanal", actuar: "Si baja >10% dos semanas consecutivas" },
            { metrica: "CPA real (Shopify vs Meta)", frecuencia: "Semanal", actuar: "Si divergencia supera el 40% respecto a período anterior" },
            { metrica: "ROAS plataforma", frecuencia: "Semanal", actuar: "Comparar tendencia, no valor absoluto aislado" },
            { metrica: "CPNC", frecuencia: "Mensual", actuar: "Si supera el LTV proyectado a 90 días" },
            { metrica: "CTR y CPM", frecuencia: "Al detectar caída de CPA/ROAS", actuar: "Como diagnóstico, no como alarma autónoma" },
            { metrica: "Frecuencia", frecuencia: "Quincenal en audiencias <100K", actuar: "Si supera 3-4 en menos de 30 días" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-medium text-xs">{row.metrica}</td>
              <td className="py-3 px-3 text-white/70 text-xs">{row.frecuencia}</td>
              <td className="py-3 px-3 text-white/50 text-xs">{row.actuar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo medimos el rendimiento en DayByDay</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      En todas las cuentas que gestionamos, el reporting semanal incluye tres números: MER del período, CPA real cruzado con Shopify y CPNC cuando el volumen de datos es suficiente. El ROAS de Meta Ads Manager aparece como referencia de tendencia, no como criterio de decisión.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Para que el CPA real sea fiable, implementamos siempre la <a href="https://developers.facebook.com/docs/marketing-api/conversions-api" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">API de Conversiones de Meta</a> correctamente configurada desde el servidor, no solo el píxel de navegador. Esto reduce la discrepancia de atribución y da al algoritmo señales de conversión más precisas, lo que mejora directamente la calidad de la optimización.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      El informe de <a href="https://www.iabspain.es/wp-content/uploads/2024-Estudio-Inversion-Publicitaria-en-Medios-Digitales-IAB.pdf" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">IAB Spain sobre inversión publicitaria digital 2024</a> documenta que la fragmentación de los modelos de atribución es uno de los principales retos del sector — precisamente porque cada plataforma atribuye conversiones con criterios propios, el MER como métrica agnóstica de plataforma es cada vez más relevante.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu reporting actual refleja el rendimiento real de tus campañas?</p>
      <p className="text-white/50 text-sm mb-4">Revisamos tu estructura de métricas y configuración de atribución — y te decimos qué cambiar para tomar mejores decisiones.</p>
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
        <Link to="/blog/como-mejorar-roas-meta-ads-7-palancas" className="text-white font-semibold hover:text-white/80">
          Cómo mejorar el ROAS en Meta Ads: 7 palancas reales →
        </Link>
        <p className="text-white/40 text-xs mt-1">Qué tocar primero cuando el ROAS real no está donde debería estar</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/benchmark-roas-sector-espana-2026" className="text-white font-semibold hover:text-white/80">
          Benchmark ROAS por sector en España 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">Los rangos de ROAS real esperables por industria para contextualizar tus métricas</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-campanas-meta-ads-sin-romper-roas" className="text-white font-semibold hover:text-white/80">
          Cómo escalar campañas Meta Ads sin romper el ROAS →
        </Link>
        <p className="text-white/40 text-xs mt-1">Qué métricas vigilar específicamente durante una fase de escala de presupuesto</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/checklist-auditoria-campanas-paid-media" className="text-white font-semibold hover:text-white/80">
          Checklist para auditar tus campañas de paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">El proceso completo para diagnosticar qué está fallando usando las métricas correctas</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default MetricasMetaAdsPage;
