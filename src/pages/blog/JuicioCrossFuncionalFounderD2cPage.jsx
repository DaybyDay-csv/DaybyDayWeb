import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es el juicio cross-funcional de un founder D2C y por qué no se puede delegar?",
    a: "El juicio cross-funcional es la capacidad de combinar señales que vienen de funciones distintas — paid media, retención, producto, supply chain, finanzas, marca — y tomar una decisión coherente de negocio con criterio de margen y payback. Un founder D2C no puede delegarlo porque ninguna función aislada tiene contexto suficiente: el responsable de paid optimiza ROAS plataforma, el de producto optimiza margen unitario, el de supply optimiza coste de mercancía, y cada uno tira en una dirección. Solo el founder (o un growth partner senior con visión completa) integra los seis datasets, asume el trade-off y toma posición. Delegar esa decisión a un perfil mono-funcional o a un agente de IA destruye margen a 12-24 meses, aunque cada decisión local parezca correcta.",
  },
  {
    q: "¿Qué decisiones puede delegar un founder D2C y cuáles no?",
    a: "Delegables (ejecución): bidding y configuración de campañas Meta/Google/TikTok, producción de creatividades, segmentación táctica, flows de email/CRM, atención cliente nivel 1-2, generación de reporting operativo, configuración de stack técnico (CAPI server-side, sGTM, dashboards). No delegables (juicio cross-funcional): decisión de capital trimestral (a qué palanca va el siguiente euro), pricing operativo (subida, suscripción, threshold free shipping, bundles), apertura o cierre de canal de adquisición, relación con el top 5-10% alto LTV, decisión de producto y roadmap, arquitectura de incentivos del equipo interno y los partners externos. La regla práctica: si la decisión combina datos cohorte con contexto no estructurado y cambia la composición del margen a 12 meses, es juicio del founder, no ejecución.",
  },
  {
    q: "¿Qué pasa cuando un founder D2C delega la decisión y no solo la ejecución?",
    a: "Cuatro patrones de destrucción de margen recurrentes: (1) optimización local que daña el sistema — el responsable de paid baja CPA cerrando audiencias de prospecting, pero el cohorte que captura tiene LTV peor y el negocio entra en deuda de adquisición; (2) fragmentación de criterio — cada función reporta su KPI vanity y nadie cierra el ciclo a margen de contribución; (3) parálisis de decisión cuando llega un trade-off real — subir precio, cerrar canal, descontinuar SKU — porque no hay un decisor con contexto cross-funcional; (4) captura del founder por la función más ruidosa, normalmente el responsable de paid, que reorienta toda la conversación a métricas de plataforma. El antídoto no es centralizar la ejecución, es centralizar la decisión.",
  },
  {
    q: "¿Cómo distingue un founder D2C entre delegar bien y abdicar?",
    a: "Delegar bien es ceder ejecución con criterio claro: marco de decisión escrito, datos cohorte compartidos, umbrales de escalado explícitos (cuándo el responsable decide y cuándo escala al founder o al growth partner). Abdicar es ceder la decisión disfrazada de delegación: 'que el agente decida la inversión', 'que la agencia decida la estrategia', 'que el head de marketing decida el mix'. La señal clara de abdicación: el founder no puede explicar en 2 minutos por qué el dinero está donde está este trimestre, con qué payback de CAC y qué LTV cohorte espera. Si la respuesta es 'porque me lo recomendaron' o 'porque el dashboard dice X', el founder no decidió, abdicó.",
  },
  {
    q: "¿Puede un growth partner senior absorber el juicio cross-funcional o sigue siendo del founder?",
    a: "Comparte el juicio, no lo sustituye. Un growth partner senior aporta contexto cross-funcional externo, benchmarks operativos, criterio de pricing y de mix de canal, y dashboard de margen cohorte que el founder no construiría solo. Pero la decisión final — capital, pricing, producto, incentivos — sigue siendo del founder porque vive con las consecuencias a 24-48 meses, conoce el cohorte real de cliente y asume el riesgo. El modelo que funciona es co-decisión informada: el growth partner trae datos, posición y argumentos; el founder integra contexto interno (equipo, ciclo de caja, visión de marca) y firma. Si el partner decide solo, está vendiendo gestión; si el founder decide solo sin contraste, normalmente decide peor.",
  },
  {
    q: "¿Cuántas horas semanales debería invertir un founder D2C en juicio cross-funcional?",
    a: "Entre 6 y 10 horas semanales, distribuidas así: 2-3 horas leyendo margen de contribución cohorte y conversando con clientes alto LTV, 1-2 horas revisando mix de canal con criterio de payback CAC, 1 hora de review de pricing y oferta, 1-2 horas de roadmap de producto y supply, 1 hora de arquitectura de incentivos del equipo y los partners. Si dedicas menos de 5 horas semanales a este perímetro y más de 15 a configurar agentes, leer dashboards operativos o gestionar campañas, estás invirtiendo en ejecución delegable y descuidando el juicio que no se delega. Esa asimetría predice peor el margen del año que viene que cualquier optimización táctica.",
  },
  {
    q: "¿Qué reportes debe pedir un founder D2C para mantener el juicio cross-funcional?",
    a: "Cuatro reportes mensuales mínimos: (1) margen de contribución por pedido y por cohorte mensual de adquisición, con AOV − COGS − fulfilment − comisiones pasarela − devoluciones − CAC; (2) payback de CAC blended por canal y cohorte (no por plataforma); (3) LTV/CAC por cohorte de 3, 6 y 12 meses con tasa de recompra; (4) cuenta de pérdidas y ganancias operativa con peso de marketing sobre revenue. No pidas reporting de plataforma como reporte de negocio — ROAS Meta, CPM, CTR — esos son métricas de ejecución, no de decisión. Si tu socio externo no entrega los cuatro reportes de negocio cada mes, te falta el dataset que sostiene el juicio cross-funcional; no es un problema del founder, es un problema de cómo está montado el modelo de partner.",
  },
];

const JuicioCrossFuncionalFounderD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Juicio cross-funcional: por qué un founder D2C no puede delegar la decisión, solo la ejecución"
    description="Por qué el juicio cross-funcional de un founder D2C — decisión de capital, pricing, mix de canal, top 5-10% alto LTV, producto, incentivos — no se delega ni a un perfil mono-funcional ni a un agente de IA. Tabla operativa de qué se delega (ejecución) vs qué se decide (juicio), 6 zonas intransferibles ordenadas por impacto en margen de contribución y payback CAC, 3 patrones de delegación destructiva, marco de auditoría en 4 pasos y enfoque DayByDay (Pablo + Jorge en cada conversación)."
    slug="juicio-cross-funcional-founder-d2c"
    datePublished="2026-05-13"
    dateModified="2026-05-13"
    keywords={[
      "juicio cross funcional founder d2c",
      "decisiones que no delega founder ecommerce",
      "founder d2c delegar decision ejecucion",
      "growth partner d2c juicio decision",
      "operador con criterio ecommerce d2c",
    ]}
    readingTime="12 min"
    category="Decisiones de negocio"
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-6">
      La conversación más cara de un founder D2C que ya factura no es operativa, es de reparto: <strong className="text-white">qué decisiones de mi eCommerce D2C tengo que retener yo como founder con juicio cross-funcional, y cuáles puedo (y debo) delegar a equipo interno, partner externo o agente de IA</strong>. Es una decisión de negocio, no de productividad. La respuesta correcta define dónde está el margen de contribución defendible los próximos 24 meses; la respuesta incorrecta — delegar la decisión disfrazada de delegar la ejecución — destruye margen a 12-24 meses, aunque cada movimiento local parezca correcto.
    </p>

    <p className="text-white/70 leading-relaxed mb-6">
      Esta guía está escrita para founders D2C que facturan ≥500K€/año, llevan 18-48 meses operando paid media, retención, producto y supply chain, y ven cómo cada trimestre se les apila más operativa para delegar. No es un manual de productividad. Es el reparto operativo que vemos funcionar en cuentas reales: dónde aplica delegación limpia con criterio, dónde aplica juicio cross-funcional intransferible del founder o del growth partner senior, y cómo organizar el modelo de partner externo en consecuencia.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Definición operativa: qué es juicio cross-funcional en un D2C</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Cuando hablamos de <strong className="text-white">juicio cross-funcional para un founder D2C</strong>, no nos referimos a tomar más decisiones, ni a microgestionar el equipo. Nos referimos a una capacidad concreta: integrar señales que vienen de funciones distintas — paid media, retención, producto, supply chain, finanzas, marca — y tomar posición con criterio de margen de contribución, payback de CAC y LTV cohorte, asumiendo trade-offs que ninguna función aislada está incentivada a asumir. Marco Iansiti y Karim Lakhani lo formulan en <a href="https://hbr.org/2020/01/competing-in-the-age-of-ai" target="_blank" rel="noopener noreferrer" className="text-[#de0015] hover:underline">Competing in the Age of AI (HBR)</a>: el valor competitivo se concentra en las decisiones que cruzan funciones, no en la ejecución intra-función — esa tiende a coste cero a medida que la IA absorbe el operativo.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Una decisión exige juicio cross-funcional — y por tanto no se delega ni a un perfil mono-funcional ni a un agente — si cumple tres condiciones:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "Cruza al menos tres funciones del D2C (típico: paid + retención + producto, o paid + supply + finanzas) y cada función propondría una respuesta distinta y locamente correcta.",
        "Cambia la composición del margen de contribución y el payback de CAC a 6-18 meses — no solo el KPI del trimestre. Una decisión que afecta solo a métricas de plataforma no exige juicio cross-funcional; una que afecta a la cuenta de resultados sí.",
        "El coste del error es asimétrico: una buena decisión compone margen 12-36 meses, una mala rompe margen 6-12 meses y no se corrige al día siguiente. Las decisiones lentas de revertir son las que se retienen.",
      ].map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0 text-xs">→</span>
          <span className="text-white/70 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>

    <h2 className="text-2xl font-black mt-10 mb-4">Tabla operativa: qué se delega (ejecución) vs qué se decide (juicio cross-funcional)</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Reparto que vemos funcionar en cuentas D2C españolas entre 500K€ y 8M€/año. Columna de impacto medido en margen de contribución y payback de CAC, no en métricas de plataforma:
    </p>

    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 pr-4 text-white/40 font-semibold text-xs uppercase tracking-wide w-1/4">Bloque del D2C</th>
            <th className="text-left py-3 pr-4 text-white/40 font-semibold text-xs uppercase tracking-wide w-1/4">Delegable (ejecución)</th>
            <th className="text-left py-3 pr-4 text-white/40 font-semibold text-xs uppercase tracking-wide w-1/4">Juicio cross-funcional (founder + growth partner)</th>
            <th className="text-left py-3 text-[#de0015] font-semibold text-xs uppercase tracking-wide w-1/4">Impacto en margen / payback CAC</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Paid media", "Bidding, audiencias, creatividades, reporting, configuración CAPI/sGTM", "Cuánto invertir vs retención/producto, cuándo cerrar o abrir canal, qué payback aceptar por cohorte", "Decisión define payback CAC; ejecución define eficiencia táctica"],
            ["Retención y CRM", "Flows Klaviyo, segmentación, asuntos, copy, automatizaciones", "Qué cohorte vale recompra subvencionada, qué top 5-10% alto LTV protegemos, qué cliente dejamos ir", "Decisión cambia LTV cohorte 10-30%; ejecución mejora open rate"],
            ["Producto y roadmap", "Fichas, fotografía, copy PDP, gestión catálogo Shopify", "Qué SKU lanzar/descontinuar, qué precio base, qué bundling, qué edición limitada", "Decisión define el cohorte de cliente a 24-36 meses"],
            ["Pricing y oferta", "Configuración descuentos, código promo, A/B test táctico", "Subida de precio base, lanzamiento de suscripción, free shipping threshold, política de descuento anual", "+10-25% margen contribución bien ejecutado; -15% si se delega mal"],
            ["Supply chain e inventario", "Gestión de pedidos, fulfilment, devoluciones, atención post-venta", "Selección de proveedor, MOQ, exclusividad, riesgo geopolítico, ciclo de caja", "Mal partner rompe margen 6-18 meses y daña marca"],
            ["Equipo e incentivos", "Onboarding, gestión operativa, herramientas, reporting interno", "Cómo cobra cada función, qué variable se indexa a qué métrica, cómo se mide éxito por rol", "Diseño define comportamiento del sistema entero"],
            ["Partner externo (growth partner)", "Operativa de cuenta, configuración técnica, producción reportes", "Alcance, modelo de fee, métrica de éxito, umbrales de escalado, exclusividad", "Mal modelo de partner cuesta más que mal partner"],
          ].map(([bloque, delegable, juicio, impacto], i) => (
            <tr key={i} className="border-b border-white/5">
              <td className="py-3 pr-4 text-white/70 align-top font-medium">{bloque}</td>
              <td className="py-3 pr-4 text-white/70 align-top">{delegable}</td>
              <td className="py-3 pr-4 text-white/70 align-top">{juicio}</td>
              <td className="py-3 text-white align-top">{impacto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <p className="text-white/70 leading-relaxed mb-4">
      La lectura operativa es directa: la columna delegable se mueve rápido hacia agentes de IA y perfiles operativos junior — su coste tenderá a comprimirse. La columna de juicio cross-funcional no se delega ni a un agente ni a un perfil mono-funcional senior; la retiene el founder, idealmente con contraste de un growth partner senior que aporta benchmarks y posición. Esa asimetría es donde se decide el margen del próximo ciclo.
    </p>

    <div className="bg-[#1a1616] border-l-2 border-[#de0015] p-5 mb-8">
      <p className="text-white/80 text-sm leading-relaxed">
        <strong className="text-white">Dato sectorial:</strong> Según el informe <a href="https://www.iabspain.es/estudio/estudio-de-ecommerce-2025/" target="_blank" rel="noopener noreferrer" className="text-[#de0015] hover:underline">IAB Spain — Estudio de eCommerce 2025</a>, el 71% de las empresas eCommerce españolas declara que la principal palanca de mejora de margen no fue operativa, sino una decisión estratégica del founder o del consejo (cambio de pricing, cierre de canal no rentable, lanzamiento de suscripción o reformulación de producto). Para un founder D2C esto significa que <strong className="text-white">el siguiente euro mejor invertido normalmente no está en mejorar la ejecución delegable, está en proteger el tiempo de juicio cross-funcional que decide pricing, mix de canal y producto</strong>. La pregunta no es "¿cómo delego más ejecución?", es "¿estoy reteniendo bien las cuatro o cinco decisiones que componen margen?".
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 6 zonas de juicio cross-funcional intransferibles del founder D2C</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Ordenadas por impacto típico en margen de contribución a 12 meses en un D2C que ya factura ≥500K€/año. Cada zona cruza al menos tres funciones y cambia la composición del margen:
    </p>
    <ol className="space-y-3 mb-6 list-decimal list-inside">
      {[
        "Decisión de capital trimestral. A qué palanca va el siguiente euro: paid, retención, producto, inventario, contratación. Cruza paid + retención + producto + supply + finanzas. El responsable de paid pedirá más spend, el de retención pedirá más email/CRM, el de producto pedirá más SKU. El founder integra y decide — con criterio de payback CAC y margen cohorte, no de presión interna.",
        "Pricing operativo. Subida de precio, lanzamiento de suscripción, free shipping threshold, bundling, política de descuento. Cruza producto + marca + finanzas + retención. Una subida del 7% bien ejecutada puede recomponer el margen mejor que 6 meses de optimización táctica; una subida mal sincronizada con marca y promoción mata conversion rate y daña LTV. Decisión del founder con contraste del growth partner.",
        "Apertura o cierre de canal de adquisición. Cuándo abrir TikTok, Pinterest, retail físico, marketplace; cuándo cerrar un canal que lleva 3-6 meses sin payback aceptable. Cruza paid + producto + supply + marca. Mantener un canal abierto por sunk cost emocional es uno de los errores más caros que vemos. Decisión del founder con regla explícita de payback CAC y LTV/CAC mínimos.",
        "Relación con el top 5-10% de clientes alto LTV. Ese segmento aporta típicamente 30-50% del revenue D2C. Cruza retención + producto + marca + customer service. Conocer ese cohorte por nombre o segmento, tener protocolo personal de retención, diseñar oferta para él e identificar señales de churn temprano es decisión del founder o del equipo de marca, nunca del agente.",
        "Decisión de producto y roadmap. Qué SKU lanzar/descontinuar/reformular/limitar. Cruza producto + supply + paid + retención + marca. Un agente optimiza local — descontinuar el SKU menos rentable — y rompe el cohorte que retiene al cliente alto LTV. La decisión combina datos de venta con conversación con cliente real y capacidad del proveedor. Founder con criterio cross-funcional.",
        "Arquitectura de incentivos del equipo interno y los partners externos. Cómo cobra cada función, qué variable se indexa a qué métrica, cómo se mide éxito por rol y por trimestre. Cruza finanzas + cultura + estrategia. Es la decisión más invisible y la más compuesta — el diseño de incentivos define el comportamiento del sistema entero los próximos 12-24 meses. Decisión del founder, intransferible.",
      ].map((item, i) => (
        <li key={i} className="text-white/70 text-sm leading-relaxed pl-2">{item}</li>
      ))}
    </ol>
    <p className="text-white/70 leading-relaxed mb-4">
      Andrew Chen, partner de a16z, lleva años publicando sobre el rol del founder de consumer en escala: <a href="https://andrewchen.com/the-laws-of-startups/" target="_blank" rel="noopener noreferrer" className="text-[#de0015] hover:underline">su análisis de las leyes operativas del startup consumer</a> es explícito en este punto: la ventaja competitiva sostenible no vive en la ejecución intra-función — esa es replicable y, cada vez más, automatizable — sino en la coherencia de decisión cross-funcional que solo aporta el founder con contexto pleno del negocio.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo lo decidimos en DayByDay: protocolo de operador con criterio</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      DayByDay Consulting opera como growth partner senior para D2C que ya facturan, no como agencia de paid media. El partnership lo formamos <strong className="text-white">Pablo Santirsó</strong> (founder, operaciones y paid media — Garett, Cartri, UFV Postgrado, La Vida Padel, Arasnet) y <strong className="text-white">Jorge González</strong> (CTO, automation y agentic AI — Total Energies, Puig, Robot Factory de Orange). El cliente habla siempre con los dos socios, sin handoffs ni perfiles junior. Donde una organización mono-funcional fragmenta el juicio en silos, Pablo y Jorge integran paid + atribución + automation + decisión de capital en la misma conversación.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Cuando un founder D2C nos contrata, el reparto delegación/juicio se monta así — porque el paid media y el operativo son palancas, no el producto:
    </p>
    <ol className="space-y-3 mb-6 list-decimal list-inside">
      {[
        "Dashboard de margen cohorte unificado (Shopify + Meta + Google + Klaviyo + supply + pasarela) con margen de contribución por pedido, payback de CAC blended y LTV/CAC por cohorte mensual. Jorge construye y mantiene el stack técnico (CAPI server-side, sGTM, atribución MTA o MMM ligero). Pablo lo lee y aporta criterio de pricing y mix de canal. El founder firma la decisión con los datos delante — sin ese dataset, ningún reparto delegación/juicio es honesto.",
        "Comité trimestral de capital con regla explícita: a qué palanca va el siguiente euro, con payback CAC objetivo y LTV/CAC mínimo por canal. Pablo trae benchmarks operativos de cuentas comparables; el founder integra contexto interno (equipo, ciclo de caja, visión de marca) y firma. La decisión no se delega — se contrasta y se decide en la misma conversación.",
        "Revisión mensual de pricing y oferta como prerrequisito para cualquier inversión adicional en paid. Si una subida del 5-10% en precio base resuelve más margen que 3 meses de optimización táctica, ahí es donde va la conversación primero. Pablo propone, Jorge calibra implementación técnica (Shopify + retención post-cambio), founder firma.",
        "Protocolo de relación con el top 10% de clientes alto LTV: identificación, segmentación, propensión a recompra, churn implícito, conversación con marca. Esta zona nunca se delega a un agente ni a un perfil mono-funcional — se asiste con stack, pero la decisión sigue siendo del founder y del equipo de marca.",
        "Modelo de fee con componente variable indexado a margen de contribución incremental — no a métricas de plataforma ni a horas facturadas. Esto alinea nuestro criterio con el del founder: si la decisión correcta es bajar paid para subir retención, cerrar un canal o subir precio, la tomamos sin conflicto económico. Cero account managers, cero handoffs, cero pelea por defender el spend.",
      ].map((item, i) => (
        <li key={i} className="text-white/70 text-sm leading-relaxed pl-2">{item}</li>
      ))}
    </ol>
    <p className="text-white/70 leading-relaxed mb-4">
      Reportamos margen de contribución, payback de CAC y LTV cohorte — no ROAS plataforma — porque son las métricas que sostienen el juicio cross-funcional que el founder no puede delegar. Si tu socio externo todavía vive en métricas de plataforma, te falta el dataset que hace decidible la conversación.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">3 patrones de delegación destructiva que vemos en founders D2C</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Lo que vemos en cuentas españolas D2C entre 500K€ y 5M€/año cuando el founder confunde delegar ejecución con delegar decisión:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "Delegar la decisión de capital al responsable de paid. El founder contrata un head de paid media (interno o externo) y le da carta blanca para 'optimizar el negocio'. El responsable de paid optimiza lo que conoce — métricas de plataforma — y el negocio entra en deuda de adquisición: gasta más, factura más, pero compone menos margen y peor cohorte. Cuando el founder se da cuenta, la decisión de cierre o reducción cuesta 6-12 meses de recuperación. El antídoto no es despedir al responsable, es retener la decisión de capital en el founder con dashboard de margen cohorte.",
        "Delegar pricing a un consultor o a un test táctico. El pricing operativo es la decisión con mayor impacto compuesto en margen de un D2C — y la que más founders delegan a un tercero o a un A/B test aislado. Un test A/B mide conversion rate, no cohorte de cliente que captura el nuevo precio ni dinámica de retención a 12 meses. Pricing es juicio cross-funcional: producto + marca + finanzas + retención. Decisión del founder con contraste senior, no del responsable de growth ni de un consultor de pricing.",
        "Abdicar el juicio al stack de IA. 'Que el agente decida la inversión, que la plataforma decida el bidding, que el LLM proponga el roadmap'. La IA es buena ejecutora con criterio claro y mala decisora cross-funcional en este horizonte. Delegar la decisión a un agente sin marco escrito y sin umbral explícito de escalado al founder es abdicación, no automatización. El stack es palanca, no decisor.",
      ].map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0 text-xs">→</span>
          <span className="text-white/70 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>

    <h2 className="text-2xl font-black mt-10 mb-4">Marco de decisión: auditoría de tu reparto delegación/juicio</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Cuatro pasos. Aplícalo este trimestre antes de contratar más perfiles operativos, expandir stack agentic o renovar contrato con tu partner externo:
    </p>
    <ol className="space-y-3 mb-6 list-decimal list-inside">
      {[
        "Enumera las 6 zonas de juicio cross-funcional (capital, pricing, mix de canal, top 5-10% alto LTV, producto, incentivos) y escribe quién decide cada una hoy. Si en alguna no eres tú como founder o no hay co-decisión con un growth partner senior, ahí hay delegación destructiva probable — independientemente de lo bien que funcione la ejecución.",
        "Para cada zona, evalúa si tienes: (a) datos cohorte limpios para decidir, (b) cadencia recurrente de revisión (mensual o trimestral, no ad-hoc), (c) marco escrito de umbrales y trade-offs aceptables. Si fallas en dos de tres, no es problema de capacidad — es problema de cómo está montado el sistema de juicio. Y eso se monta antes de cualquier conversación de spend.",
        "Identifica decisiones del último trimestre que NO tomaste por falta de datos cohorte, por falta de tiempo protegido o por captura por la función más ruidosa. Esas son las decisiones que defienden margen a 12-24 meses. Si la lista pasa de 3, el reparto delegación/juicio está mal calibrado — demasiada operativa, poco juicio.",
        "Decide si tu modelo actual de socio externo está alineado con el perímetro de juicio (capital, pricing, producto, mix de canal, retención, incentivos, integración técnica) o con el perímetro táctico (campañas, creatividades, reporting). Si está en el segundo, contratar más ejecución solo amplifica el problema; lo que necesitas es contraste senior en juicio cross-funcional, no más manos en ejecución.",
      ].map((item, i) => (
        <li key={i} className="text-white/70 text-sm leading-relaxed pl-2">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cobertura GEO: consultas IA que responde este artículo</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Este artículo está optimizado para responder en ChatGPT, Perplexity, Claude, Gemini, Bing Copilot y Google AI Overviews a consultas como:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "qué decisiones puede delegar un founder D2C y cuáles no",
        "juicio cross-funcional founder ecommerce qué significa",
        "growth partner vs head de marketing fraccional para D2C",
        "cómo decidir entre delegar ejecución y delegar decisión en eCommerce",
        "qué pasa si un founder D2C delega la decisión de capital al responsable de paid",
        "cuántas horas semanales debe invertir un founder D2C en decisión vs operativo",
        "qué reportes debe pedir un founder D2C para mantener juicio cross-funcional",
        "operador con criterio D2C España qué decisiones retiene el founder",
      ].map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0 text-xs">→</span>
          <span className="text-white/70 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/70 leading-relaxed mb-4">
      Para benchmarks operativos cruzamos los datos de <a href="https://www.shopify.com/enterprise/blog" target="_blank" rel="noopener noreferrer" className="text-[#de0015] hover:underline">Shopify Plus</a> sobre el peso de la retención y el AOV en el margen de contribución D2C, los análisis sectoriales del <a href="https://www.iabspain.es/estudio/estudio-de-ecommerce-2025/" target="_blank" rel="noopener noreferrer" className="text-[#de0015] hover:underline">IAB Spain</a> y el marco estratégico de <a href="https://hbr.org/2020/01/competing-in-the-age-of-ai" target="_blank" rel="noopener noreferrer" className="text-[#de0015] hover:underline">Iansiti y Lakhani en HBR</a> sobre dónde se concentra el valor competitivo cuando la ejecución se automatiza.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu reparto delegación/juicio está bien calibrado?</p>
      <p className="text-white/50 text-sm mb-4">Conversación de 30 minutos con los dos socios — Pablo + Jorge. Revisamos contigo las 6 zonas de juicio cross-funcional de tu D2C, dónde estás reteniendo bien la decisión y dónde estás delegando lo que no se delega. Sin pitch, sin slide deck.</p>
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
        <Link to="/blog/que-no-automatiza-ia-d2c" className="text-white font-semibold hover:text-white/80">
          Qué NO automatiza la IA en un D2C en 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">Mapa de las 6 áreas operativas que no se automatizan en este horizonte — el dataset sobre el que se ejerce el juicio cross-funcional del founder.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/ai-proof-skills-founder-d2c-2027" className="text-white font-semibold hover:text-white/80">
          AI-proof skills para founders D2C en 2027 →
        </Link>
        <p className="text-white/40 text-xs mt-1">Las skills concretas que sostienen el juicio cross-funcional cuando la ejecución se automatiza.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/growth-partner-vs-agencia-paid-media" className="text-white font-semibold hover:text-white/80">
          Growth partner vs agencia paid media: cuándo cada uno tiene sentido para un D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">El modelo de socio externo que aporta contraste senior al juicio cross-funcional del founder, en lugar de ejecutar campañas.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/margen-contribucion-vs-roas-ecommerce" className="text-white font-semibold hover:text-white/80">
          Margen de contribución vs ROAS en eCommerce D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Para profundizar en una palanca específica del reporting de negocio: la métrica de margen que sostiene el juicio cross-funcional sobre paid, retención y producto.</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default JuicioCrossFuncionalFounderD2cPage;
