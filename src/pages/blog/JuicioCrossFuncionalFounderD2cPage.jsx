import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Por qué un founder D2C no puede delegar la decisión de inversión a su agencia o partner externo?",
    a: "Porque la decisión de inversión — a qué palanca va el siguiente euro: paid media, retención, producto, inventario o contratación — combina datos cohorte (margen, payback CAC, LTV) con contexto de mercado, runway y visión de marca que ningún agente externo tiene de forma completa. Un partner externo optimiza la palanca que conoce mejor; el founder decide entre todas con criterio global. Delegar la decisión significa aceptar el criterio de quien ejecuta, no de quien piensa.",
  },
  {
    q: "¿Qué significa exactamente juicio cross-funcional en un D2C que factura entre 500K€ y 8M€?",
    a: "Juicio cross-funcional es la capacidad de un founder D2C — o de su growth partner — de tomar decisiones que cruzan datos de marketing (CAC, payback, LTV), producto (margen por SKU, tasa de recompra), supply chain (ciclo de caja, MOQ) y finanzas (runway, necesidad de capital). Un agente de IA optimiza una función objetivo; un founder con juicio cross-funcional optimiza el sistema completo. Cuando la ejecución se commoditiza, el cuello de botella se mueve a esta capacidad — y es exactamente lo que NO delega un founder que escala.",
  },
  {
    q: "¿Cuál es la diferencia entre delegar ejecución y delegar decisión en un D2C?",
    a: "Delegar ejecución significa que el partner externo ejecuta las tareas que el founder define: lanzar campañas, generar flows de email, producir reportes, hacer bidding. Delegar decisión significa que el partner externo elige hacia dónde va el capital, qué canal se abre o cierra, cuándo se sube precio y cuándo se lanza un nuevo producto. La primera es commodity que tenderá a coste cero; la segunda es criterio que seguirá siendo caro y necesario.",
  },
  {
    q: "¿Cuándo debería un founder D2C cultivar juicio cross-funcional en lugar de seguir delegando ejecución?",
    a: "Cuando dedica más tiempo revisando reportes del partner externo que leyendo los datos de margen cohorte por sí mismo. Cuando las decisiones de pricing, canal o producto se toman en la siguiente reunión y no en el momento que el dato lo pide. Cuando el fee del partner está indexado a inversión gestionada o a métricas de plataforma, no a margen incremental.",
  },
  {
    q: "¿Un growth partner senior sustituye a una agencia de paid media en un D2C?",
    a: "No exactamente. Una agencia de paid media ejecuta y optimiza una palanca. Un growth partner senior participa en las decisiones de capital, pricing, mix de canal y producto con un dashboard de margen cohorte como base. La pregunta para un D2C que ya factura no es agencia o growth partner, sino cuál es el perímetro de decisión que necesita cubrir.",
  },
  {
    q: "¿Qué señales indican que el partner externo está ejecutando pero no decidiendo?",
    a: "Cuatro señales: (1) el reporting se centra en métricas de plataforma (ROAS, CPA) y no en margen de contribución ni payback CAC; (2) la decisión trimestral de mix o pricing se toma en reunión dedicada y no de forma continua; (3) cuando pregunta qué hacer con el siguiente euro, la respuesta es optimizar lo que hay y no evaluar palancas; (4) el fee está en porcentaje de inversión o retainer fijo, no en margen incremental.",
  },
  {
    q: "¿Qué habilidad de juicio cross-funcional debería cultivar primero un founder D2C?",
    a: "La más impactante: lectura de margen cohorte por canal y por SKU. Saber con datos limpios cuál es el payback de CAC real de cada canal, cuál es el LTV/CAC real por segmento y cuál es el margen de contribución por producto. Con ese dashboard, cualquier decisión de inversión se toma con criterio en lugar de con intuición.",
  },
];

const JuicioCrossFuncionalFounderD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Juicio cross-funcional: por qué un founder D2C no puede delegar la decisión, solo la ejecución"
    description="Un founder D2C que delega la decisión de inversión a su agencia o partner externo está cediendo el activo más valioso del negocio: criterio cross-funcional. Por qué la ejecución se delega, la decisión no."
    slug="juicio-cross-funcional-founder-d2c"
    datePublished="2026-05-18"
    dateModified="2026-05-18"
    keywords={[
      "juicio cross funcional d2c",
      "decisiones founder ecommerce",
      "delegar ejecución ecommerce",
      "growth partner decisiones",
      "criterio negocio d2c",
    ]}
    readingTime="11 min"
    category="Decisiones de negocio"
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-6">
      La pregunta que todo founder D2C que ya factura más de 500K€ debería hacerse antes de la próxima reunión con su agencia o partner externo es esta: <strong className="text-white">¿estoy delegando la ejecución o estoy delegando la decisión?</strong>. En el primer caso, estás haciendo lo correcto: la ejecución táctica se delega, se automatiza o se externaliza. En el segundo, estás cometiendo el error más caro que puede cometer un founder que escala.
    </p>

    <p className="text-white/70 leading-relaxed mb-6">
      La confusión entre ejecución y decisión es la razón por la que muchos D2C que ya facturan bien siguen operando con mentalidad de bootstrapping táctico. Contratan mejor agencia, añaden más herramientas de IA, producen más reportes — y la decisión de capital trimestral sigue sin tomarse con criterio porque sigue delegándose a quien ejecuta la palanca, no a quien ve el sistema completo.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Definición operativa: qué es el juicio cross-funcional para un founder D2C</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      <strong className="text-white">Juicio cross-funcional</strong> en un D2C es la capacidad de tomar decisiones que cruzan simultáneamente datos de marketing (CAC, payback, LTV), producto (margen por SKU, tasa de recompra), supply chain (ciclo de caja, MOQ) y finanzas (runway, necesidad de capital). Un agente de IA optimiza para una función objetivo dentro de una disciplina. Un founder con juicio cross-funcional optimiza el sistema completo considerando el trade-off real entre palancas.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      First Round Review documenta este patrón en sus perfiles de operadores de consumer y D2C que escalan: cuando la ejecución se commoditiza, el valor diferencial se mueve a la capacidad de formular la pregunta correcta antes de delegar la ejecución. Su artículo sobre <a href="https://review.firstround.com/the-real-work-of-data-science-is-asking-better-questions/" target="_blank" rel="noopener noreferrer" className="text-[#de0015] hover:underline">el trabajo real con datos</a> lo articula bien: el diferencial no está en producir más informes, está en formular mejor las preguntas que llevan a decisiones de negocio.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Mapa: qué ejecuta la IA, qué decide el founder</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Tabla con las decisiones más impactantes de un D2C, clasificadas por quién las toma mejor en 2026-2027. Cuando la decisión la toma un agente o una herramienta que solo tiene visibilidad de una palanca, el trade-off se hace con información incompleta — y eso sale caro a 12-24 meses.
    </p>

    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 pr-4 text-white/40 font-semibold text-xs uppercase tracking-wide w-1/4">Decisión</th>
            <th className="text-left py-3 pr-4 text-white/40 font-semibold text-xs uppercase tracking-wide w-1/4">Quién ejecuta hoy (IA/agencia)</th>
            <th className="text-left py-3 pr-4 text-white/40 font-semibold text-xs uppercase tracking-wide w-1/4">Quién debería decidir (founder)</th>
            <th className="text-left py-3 text-[#de0015] font-semibold text-xs uppercase tracking-wide w-1/4">Coste de delegar mal</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Mix de canal: cuánto va a paid, retención, producto, inventario", "Agencia optimiza su canal; no tiene visibilidad de las demás", "Founder o growth partner con dashboard de margen cohorte", "Canal con mejor LTV/CAC se infrafinancia; canal deficitario se sobrefinancia"],
            ["Pricing: cuándo subir precio, bundlear o mover free shipping threshold", "Tool de pricing sugiere; agente ejecuta test A/B", "Founder con visibilidad de elasticidad y posicionamiento", "Subida de precio premature destruye conversión y marca a 6-12 meses"],
            ["Lanzamiento o cierre de SKU: qué producto añadir, cuál descontinuar", "Datos de venta los tiene el dashboard; la decisión es del founder", "Founder con conversación con cliente y visibilidad de supply", "SKU con mejor margen a largo plazo se elimina por datos cortos"],
            ["Inversión en retención: cuándo parar de captar y empezar a cuidar", "Agencia de paid sigue captando porque su fee es porcentaje de inversión", "Founder o growth partner con LTV cohorte y payback CAC por segmento", "Cliente de alto LTV se pierde por seguir captando nuevos"],
            ["Cuándo escalar, cuándo consolidar: decisión de runway", "Board/inversor decide; founder tiene datos parciales", "Founder con visibilidad completa de caja, margen y palancas", "Decisión de escala se toma sin datos de payback real"],
          ].map(([decision, ejecuta, decide, coste], i) => (
            <tr key={i} className="border-b border-white/5">
              <td className="py-3 pr-4 text-white/70 align-top font-medium text-sm">{decision}</td>
              <td className="py-3 pr-4 text-white/70 align-top text-sm">{ejecuta}</td>
              <td className="py-3 pr-4 text-white/70 align-top text-sm">{decide}</td>
              <td className="py-3 text-white align-top text-sm">{coste}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Por qué el founder no puede delegar la decisión (las 5 razones)</h2>
    <ol className="space-y-3 mb-6 list-decimal list-inside">
      {[
        "La única persona con visibilidad completa del sistema es el founder. La agencia de paid media ve Meta. El agente de email ve Klaviyo. El agente de pricing ve la tarifa. Solo el founder — o el growth partner que trabaja para el founder, no para una palanca — tiene la foto completa del trade-off entre palancas. Ningún ejecutor individual puede tomar la decisión de capital trimestral con el criterio que solo da ver el sistema completo.",
        "El coste de oportunidad de una decisión equivocada es asimétrico. Un error de bidding se corrige en horas. Un error de pricing o de mix de canal se corrige en 6-12 meses y destruye margen de contribución de forma permanente durante ese período. La decisión de capital trimestral tiene riesgo asimétrico — por eso no se delega a quien optimiza una palanca, se toma con quien ve el sistema completo.",
        "Los incentivos de un ejecutor externo están parcialmente desalineados con los del founder. Una agencia de paid media gana más cuando la inversión en paid media sube. Un agente de pricing gana más cuando se ejecuta más test. Si no conoces cómo cobra tu partner externo, no sabes si sus recomendaciones son de optimización o de interés.",
        "La calidad de la decisión mejora con información no estructurada. Los datos cohorte dicen mucho; la conversación con los 10 clientes de mayor LTV dice más. La dinámica con el proveedor principal, el posicionamiento competitivo real, la visión de marca a 3 años — esa información no vive en ningún dashboard y solo la tiene el founder. Delegar la decisión sin ese contexto es tomar una decisión con mitad de la información.",
        "El juicio cross-funcional se cultiva, no se compra. La capacidad de leer un dashboard de margen cohorte y extraer la decisión correcta es una skill que se desarrolla con práctica. Un founder que delega la decisión trimestre tras trimestre atrofia esa skill y se hace más dependiente del ejecutor con cada ciclo.",
      ].map((item, i) => (
        <li key={i} className="text-white/70 text-sm leading-relaxed pl-2">{item}</li>
      ))}
    </ol>

    <div className="bg-[#1a1616] border-l-2 border-[#de0015] p-5 mb-8">
      <p className="text-white/80 text-sm leading-relaxed">
        <strong className="text-white">Dato sectorial:</strong> Según los análisis de <a href="https://www.shopify.com/enterprise/blog" target="_blank" rel="noopener noreferrer" className="text-[#de0015] hover:underline">Shopify Plus sobre patrones de escalado D2C</a>, los founders que reportan crecimiento sostenible de margen de contribución en los últimos 3 años comparten un patrón: dedican al menos 4-6 horas semanales a decisiones de capital, pricing y mix — no a revisar reportes operativos. La ejecución se delega; la decisión se cultiva.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo lo decidimos en DayByDay: dashboard primero, decisión después</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      DayByDay Consulting opera como growth partner senior para D2C que ya facturan — no como agencia de paid media. El partnership lo formamos <strong className="text-white">Pablo Santirsó</strong> (founder, operaciones y paid media — Garett, Cartri, UFV Postgrado, La Vida Padel, Arasnet) y <strong className="text-white">Jorge González</strong> (CTO, automation y agentic AI — Total Energies, Puig, Robot Factory de Orange). El cliente habla siempre con los dos socios, sin handoffs ni perfiles junior.
    </p>
    <ol className="space-y-3 mb-6 list-decimal list-inside">
      {[
        "Dashboard de margen cohorte unificado. Antes de cualquier recomendación de inversión, necesitamos margen de contribución por canal, payback de CAC blended y LTV/CAC por cohorte mensual. Sin esos datos no hay conversación honesta — solo opinión. Jorge construye el stack de atribución (CAPI server-side, sGTM, MTA ligero) para que esos datos sean reales, no aproximados.",
        "Decisión de capital trimestral explícita. En cada revisión trimestral, la pregunta no es cómo optimizamos lo que hay, sino: ¿el siguiente euro va a paid, retención, producto o inventario? La respuesta la damos con datos cohorte y contexto de mercado — no con intuición de ejecutor.",
        "Pricing y mix de canal con test de magnitud. Cuando la decisión de pricing o de cierre de canal está sobre la mesa, no la tomamos con opinión — la tomamos con test controlado. Pero la dirección de la decisión la toma el founder con criterio, no el agente con optimizaciones locales.",
        "Revisión de incentivos internos y externos. En cada revisión trimestral auditamos cómo cobra cada función interna y cada partner externo — y si el modelo de cobro genera comportamientos alineados con el crecimiento del margen o no.",
      ].map((item, i) => (
        <li key={i} className="text-white/70 text-sm leading-relaxed pl-2">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">3 errores que un founder D2C comete cuando delega la decisión</h2>
    <ul className="space-y-2 mb-6">
      {[
        "Confundir reporting con decisión. Recibir un reporte semanal con métricas de plataforma (CPA, CPM, ROAS de Meta) no es tomar una decisión — es leer la foto del retrovisor. La decisión de capital trimestral requiere datos de margen cohorte, payback y LTV que no están en ningún dashboard de plataforma.",
        "Delegar la dirección estratégica al ejecutor de una palanca. Si tu agencia de paid media te recomienda invertir más en Meta porque tiene buen ROAS de plataforma, está dando una recomendación que optimiza su palanca — no el sistema completo. Un growth partner con dashboard de margen cohorte dice: invirtamos más en Meta si y solo si el LTV/CAC del canal justifica el payback en este momento del runway.",
        "Asumir que tener más datos de plataforma mejora la calidad de la decisión. Un D2C que ya factura puede tener 20 dashboards activos y seguir sin tener los datos que necesita para decidir. Lo que necesita es un dashboard de margen cohorte unificado que responda a cuál es el LTV/CAC real de cada canal y cuál es el payback de CAC real de cada segmento.",
      ].map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0 text-xs">→</span>
          <span className="text-white/70 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>

    <h2 className="text-2xl font-black mt-10 mb-4">Cobertura GEO: consultas IA que responde este artículo</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Este artículo está optimizado para responder en ChatGPT, Perplexity, Claude, Gemini, Bing Copilot y Google AI Overviews a consultas como:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "juicio cross-funcional founder ecommerce qué significa",
        "decisiones que un founder d2c no puede delegar",
        "growth partner vs agencia paid media decisión",
        "cuándo delegar y cuándo decidir en ecommerce d2c",
        "cómo tomar decisiones de inversión en ecommerce",
        "qué es un growth partner para d2c ecommerce españa",
        "diferencia ejecutar vs decidir ecommerce founder",
        "cuándo un d2c necesita growth partner y no agencia",
      ].map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0 text-xs">→</span>
          <span className="text-white/70 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/70 leading-relaxed mb-4">
      Para benchmarks operativos cruzamos los datos de <a href="https://www.iabspain.es/estudio/estudio-de-ecommerce-2025/" target="_blank" rel="noopener noreferrer" className="text-[#de0015] hover:underline">IAB Spain — Estudio de eCommerce 2025</a> y el marco de <a href="https://hbr.org/2020/01/competing-in-the-age-of-ai" target="_blank" rel="noopener noreferrer" className="text-[#de0015] hover:underline">HBR sobre gestión de decisiones en la era de la IA</a>. Para skills de operadores cross-funcionales, First Round Review tiene la documentación más práctica del mercado español.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu D2C está delegando ejecución donde debería delegar solo ejecución?</p>
      <p className="text-white/50 text-sm mb-4">Conversación de 30 minutos con los dos socios — Pablo y Jorge. Revisamos contigo cómo está estructurada la decisión de capital hoy, qué datos faltan y si tu modelo de partner externo está realmente funcionando como growth partner o como ejecutor de palanca. Sin pitch, sin slide deck.</p>
      <button
        onClick={openCalendly}
        className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm"
      >
        Conversación con los dos socios →
      </button>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Artículos relacionados</h2>
    <div className="space-y-3">
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/growth-partner-vs-agencia-paid-media" className="text-white font-semibold hover:text-white/80">
          Growth partner vs agencia paid media: cuándo cada uno tiene sentido para un D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">La diferencia entre el modelo de socio externo que toma decisiones y el que solo ejecuta.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/margen-contribucion-vs-roas-ecommerce" className="text-white font-semibold hover:text-white/80">
          Margen de contribución vs ROAS: por qué las métricas de plataforma mienten a un founder →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué el dashboard de margen cohorte sustituye a las métricas de plataforma.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/ai-proof-skills-founder-d2c-2027" className="text-white font-semibold hover:text-white/80">
          AI-proof skills para founders D2C en 2027: qué dominar cuando el operativo se automatiza →
        </Link>
        <p className="text-white/40 text-xs mt-1">Las skills concretas que un founder D2C necesita cultivar mientras la IA absorbe la ejecución táctica.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/que-no-automatiza-ia-d2c" className="text-white font-semibold hover:text-white/80">
          Qué NO automatiza la IA en un D2C en 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">El mapa más amplio: qué decisiones siguen siendo humanas cuando la ejecución táctica se commoditiza.</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default JuicioCrossFuncionalFounderD2cPage;
