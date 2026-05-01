import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es mejor para un eCommerce D2C en España: Performance Max o Meta Ads?",
    a: "No es un mejor absoluto, es una pregunta de fase y rol. Meta Ads (Facebook + Instagram) gana en demand generation: lleva tu marca a usuarios que aún no te buscan, mediante creatividad y segmentación por intereses. Performance Max (PMax) gana en demand capture: cosecha intención existente en Search, Shopping, YouTube, Discover y Display de Google. Para un D2C que está empezando, Meta es prioritario porque sin demanda no hay nada que cosechar. Para un D2C consolidado con tráfico de marca y categorías muy buscadas, PMax aporta incremental real. La respuesta correcta para la mayoría de cuentas entre 30K y 500K€/mes es: ambos, pero con roles distintos y presupuestos distintos.",
  },
  {
    q: "¿Cuánto presupuesto mínimo necesito para que Performance Max funcione en España?",
    a: "El umbral mínimo realista para PMax es 30-50€/día por campaña (≈900-1.500€/mes), y eso asumiendo que tienes feed de Shopping bien configurado. Por debajo, el algoritmo no recibe suficiente señal para optimizar y termina sirviendo en placements de baja calidad (Display y Search Partners). Meta Ads, en cambio, puede arrancar con 20-30€/día por conjunto de anuncios y empezar a producir aprendizaje útil más rápido. Si tu presupuesto total es <2K€/mes, prioriza Meta. Entre 2K€ y 5K€/mes, considera Search clásico antes que PMax. A partir de 5K€/mes ya tiene sentido testar PMax con un control claro.",
  },
  {
    q: "¿Performance Max canibaliza el tráfico de marca y mis otras campañas de Google?",
    a: "Sí, casi siempre, y es el error más común al lanzar PMax. Por defecto, PMax también puja por tu marca (búsquedas con tu nombre), inflando el ROAS reportado con conversiones que ya tenías de SEO orgánico o Search de marca. Para evitarlo: (1) excluye términos de marca a nivel de cuenta vía formulario de Google, (2) mantén una campaña Search de marca dedicada con CPC bajo y prioridad alta, (3) revisa el Brand Lift y el ROAS sin marca como métrica real. Sin esta higiene, PMax parece milagroso en la planilla y ridículo en el banco.",
  },
  {
    q: "¿Cómo se compara el CPA y ROAS entre Performance Max y Meta Ads en eCommerce D2C?",
    a: "En cuentas D2C españolas que gestionamos, los rangos típicos por ticket medio (40-80€) son: Meta Ads BOFU (retargeting + Advantage+) suele dar ROAS 3-5x con un CPA 18-30€ — pero captura intención que no existía antes; Meta Ads TOFU (públicos fríos) baja a ROAS 1,5-2,5x; Performance Max bien configurado y con marca excluida da ROAS 4-7x con CPA 12-22€, pero con un techo claro: depende del volumen de búsqueda real de tu producto. Si comparas el ROAS plano sin entender el rol, Meta TOFU 'pierde' siempre. Por eso la métrica que importa es el MER (revenue total / spend total) y la incrementalidad medida con experimentos de geo o pausas controladas, no el ROAS por canal.",
  },
  {
    q: "¿Puedo sustituir Performance Max por Meta Ads o al revés?",
    a: "Técnicamente sí, estratégicamente casi nunca. Si sólo tienes Meta y desactivas, pierdes la cosecha de marca y de búsqueda categórica que Google capta a CPA bajo — eso son ventas que estabas teniendo prácticamente regaladas. Si sólo tienes PMax y desactivas Meta, pierdes el motor de demand creation: en 30-60 días el volumen de Search de marca cae porque nadie nuevo te descubre. Los D2C que escalan de forma sostenible operan los dos canales con MER blended como KPI, no ROAS por canal. La excepción real son productos commodity con altísima intención de búsqueda (electrodomésticos, recambios) donde Google domina, o productos puramente de impulso visual (moda, joyería) donde Meta tiene más palancas.",
  },
  {
    q: "¿Performance Max sirve para servicios o sólo para eCommerce con feed de productos?",
    a: "Sirve para ambos, pero la palanca cambia. Para eCommerce con feed de Shopping, PMax explota Shopping listings y es donde más rinde — el feed es el activo crítico. Para servicios o lead gen (sin feed), PMax usa los assets que le subes (textos, imágenes, vídeo) y se apoya más en Search y Display. En lead gen el rendimiento de PMax es más errático porque la calidad del lead es difícil de pasar al algoritmo: hay que enviar conversiones offline cualificadas (compras, ventas cerradas) por Google Ads API o uploads, no leads sin filtrar. Sin esa señal de calidad, PMax aprende a generar volumen barato pero con leads que no convierten.",
  },
];

const PerformanceMaxVsMetaAdsEspanaPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Performance Max vs Meta Ads: ¿cuál funciona mejor en España? (2026)"
    description="Comparativa operativa Performance Max vs Meta Ads para eCommerce D2C en España: rol real de cada canal, cuándo usar cada uno, presupuesto mínimo, CPA y ROAS reales por fase, errores frecuentes (canibalización de marca) y estrategia combinada con MER blended."
    slug="performance-max-vs-meta-ads-espana"
    datePublished="2026-05-01"
    dateModified="2026-05-01"
    readingTime="10 min"
    category="Estrategia"
    keywords={[
      "performance max vs meta ads",
      "performance max vs meta ads espana",
      "google ads vs meta ads ecommerce",
      "pmax ecommerce d2c",
      "comparativa performance max meta",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Performance Max vs Meta Ads en España</strong> no es la pregunta correcta para un eCommerce D2C en 2026 — la pregunta correcta es qué rol juega cada uno en tu mix y cómo medirlos juntos. Aún así, la comparación sigue apareciendo cada semana en discoveries con founders que están eligiendo dónde poner el primer euro o por qué su ROAS se ha desplomado al activar PMax.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Esta guía resuelve eso: qué hace bien cada canal, dónde fallan los dos, qué CPA y ROAS reales vemos en cuentas D2C españolas, cuánto presupuesto mínimo necesita PMax para funcionar, los errores que matan el ROAS reportado (sí, hablamos de canibalización de marca) y cómo decidir el mix correcto según fase de madurez.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">El rol real de cada canal (no son sustitutos)</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      La confusión empieza aquí: comparar dos canales que técnicamente son complementarios. Meta Ads opera principalmente en demand generation; Performance Max en demand capture. Saltarse esta distinción lleva a decisiones malas.
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Dimensión</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Meta Ads</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Performance Max</th>
          </tr>
        </thead>
        <tbody>
          {[
            { d: "Función principal", m: "Crear demanda, descubrimiento", p: "Capturar demanda existente" },
            { d: "Trigger del usuario", m: "Interés/contexto en feed", p: "Búsqueda activa o intención" },
            { d: "Placements", m: "Feed, Reels, Stories, Audience Network", p: "Search, Shopping, YouTube, Display, Discover, Gmail" },
            { d: "Activo crítico", m: "Creatividad (vídeo + imagen)", p: "Feed de productos + assets" },
            { d: "Curva de aprendizaje", m: "Rápida (días con creatividad nueva)", p: "Lenta (2-4 semanas para estabilizar)" },
            { d: "Visibilidad de datos", m: "Media (ad set, ad)", p: "Baja (caja negra por canal)" },
            { d: "Mejor caso de uso", m: "Producto visual, ticket 30-150€, marca emergente", p: "Producto buscado, feed limpio, marca con volumen" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.d}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La <a href="https://support.google.com/google-ads/answer/10724817" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial de Google sobre Performance Max</a> es clara en que su valor está en optimizar a través de los inventarios de Google con un sólo objetivo de conversión — no fue diseñado para reemplazar a Meta, sino para reemplazar al stack manual de Search + Shopping + Display dentro del ecosistema Google.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Presupuesto mínimo realista por canal en España</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Este es el dato que más founders ignoran al planificar mix. PMax tiene un suelo de inversión por debajo del cual el algoritmo no encuentra señal y termina enviando tráfico basura.
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          fase: "Hasta 2.000€/mes total",
          mix: "100% Meta Ads (Advantage+ Shopping + retargeting básico)",
          razon: "PMax por debajo de 30€/día no aprende. Search clásico de marca + Meta es el mejor uso del euro.",
        },
        {
          fase: "2.000-5.000€/mes total",
          mix: "70% Meta + 20% Search marca/categoría + 10% retargeting Google",
          razon: "Sigue sin haber suficiente para PMax. Search manual con keywords de alta intención cosecha mejor.",
        },
        {
          fase: "5.000-15.000€/mes total",
          mix: "60% Meta + 25% PMax (con marca excluida) + 15% Search categoría",
          razon: "Punto de entrada real para PMax. Hay volumen para que aprenda y diversificación útil.",
        },
        {
          fase: "15.000-50.000€/mes total",
          mix: "55% Meta + 30% PMax + 10% Search + 5% YouTube/Demand Gen",
          razon: "Cuenta madura. PMax pesa más pero Meta sigue siendo motor de demand creation imprescindible.",
        },
        {
          fase: ">50.000€/mes total",
          mix: "50% Meta + 30% PMax + 10% Search + 10% experimentos (TikTok, Demand Gen)",
          razon: "Diversificación de canal y experimentos de incrementalidad como prioridad operativa.",
        },
      ].map(({ fase, mix, razon }) => (
        <div key={fase} className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
          <p className="font-semibold text-white text-sm mb-1">{fase}</p>
          <p className="text-white/70 text-sm mb-1"><span className="text-white/40">Mix recomendado:</span> {mix}</p>
          <p className="text-white/55 text-sm"><span className="text-white/40">Por qué:</span> {razon}</p>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">CPA y ROAS reales por canal (D2C español, ticket 40-80€)</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Datos agregados de cuentas D2C que gestionamos en sectores moda, belleza, suplementos y hogar. Ticket medio entre 40-80€, margen bruto 60-75%, después de iOS 17 y con CAPI deduplicada.
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Canal / Estructura</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">CPA típico</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">ROAS reportado</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Rol</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "Meta Advantage+ Shopping", cpa: "18-26€", r: "3-5x", rol: "BOFU/MOFU, motor principal" },
            { c: "Meta TOFU (público frío)", cpa: "28-45€", r: "1,5-2,5x", rol: "Demand creation, alimenta el resto" },
            { c: "Meta Retargeting", cpa: "12-20€", r: "5-9x", rol: "Cosecha de visitantes, techo bajo" },
            { c: "PMax (marca excluida)", cpa: "12-22€", r: "4-7x", rol: "Captura Google, complementario a Meta" },
            { c: "PMax (marca incluida)", cpa: "6-12€", r: "8-15x", rol: "Falsa señal — canibaliza orgánico" },
            { c: "Search marca", cpa: "3-8€", r: "10-25x", rol: "Defensiva, casi gratis si tienes SEO" },
            { c: "Search categoría", cpa: "20-40€", r: "2,5-4x", rol: "Cosecha intención no-marca" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.cpa}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.r}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Mirar este cuadro y concluir "PMax con marca incluida es lo mejor" es exactamente el error que mata el negocio. Ese ROAS de 8-15x está cosechando ventas que ya tenías por SEO orgánico o por la demanda que crearon Meta y otras palancas — no es incremental. La medición correcta es MER blended y test de incrementalidad por geo o pausa.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">El error que mata PMax: la canibalización de marca</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Es el problema más frecuente que encontramos al auditar cuentas con PMax activo. Por defecto, PMax puja también por términos que contienen el nombre de tu marca, mostrándose en búsquedas como "<em>tu_marca</em>" o "<em>tu_marca + producto</em>". Esas búsquedas iban a convertir igualmente vía SEO orgánico o Search clásico — pero ahora se atribuyen a PMax con un CPA artificialmente bajo.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Resultado: el ROAS de PMax parece milagroso en el panel de Google Ads, mientras el MER total no sube o incluso baja. Cómo cortarlo:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Solicita exclusión de marca a nivel de cuenta vía formulario de soporte de Google Ads (lleva 2-5 días).",
        "Activa una campaña Search de marca dedicada con CPC bajo, prioridad de campaña alta y match phrase/exact de tu marca.",
        "Revisa los términos de búsqueda en el reporte de Insights de PMax mensualmente: si aparecen variantes de marca, sigue habiendo fuga.",
        "Mide el ROAS sin marca: spend PMax / (revenue total - revenue Search marca) para ver el coste real de la captura no-marca.",
        "Test de incrementalidad cada 6-9 meses: pausa PMax durante 2 semanas en una región y mide caída real de ventas vs proyección.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Estructura combinada que funciona en D2C</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      No es una respuesta única, pero el patrón que repetimos en cuentas que escalan sin romper unit economics:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Capa</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Canal / Campaña</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Objetivo</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "Defensa de marca", ca: "Google Search marca + (opcional) Meta marca", o: "Proteger SEO orgánico, evitar pujas competencia" },
            { c: "Cosecha intención", ca: "PMax con marca excluida + Search categoría", o: "Capturar búsquedas no-marca de alta intención" },
            { c: "Cosecha visual", ca: "Meta Advantage+ Shopping + retargeting", o: "Convertir visitantes y públicos calientes" },
            { c: "Demand creation", ca: "Meta TOFU + creativos UGC + (opcional) TikTok", o: "Generar demanda nueva con creatividad" },
            { c: "Aprendizaje", ca: "Tests de creatividad y públicos en Meta", o: "Alimentar el motor de demand creation" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.ca}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.o}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Las recomendaciones de <a href="https://www.thinkwithgoogle.com/intl/es-es/marketing-strategies/automation/performance-max-best-practices/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Think with Google sobre buenas prácticas de Performance Max</a> insisten en alimentar el algoritmo con feed limpio, assets diversos y suficiente señal de conversión — confirma lo que vemos: PMax no es plug-and-play, requiere foundation técnica antes de dar resultado.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo decidimos en DayByDay entre PMax y Meta para una cuenta nueva</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      No empezamos por la pregunta "¿activamos PMax o no?". Empezamos por revisar tres cosas:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Volumen de búsqueda real: si Google Keyword Planner muestra <500 búsquedas/mes para tu categoría, PMax tiene poco que cosechar y Meta es prioritario.",
        "Estado del feed: si Google Merchant Center tiene >5% de productos rechazados o sin imagen optimizada, no se enciende PMax hasta arreglar el feed.",
        "Presupuesto y madurez: por debajo de 5K€/mes tota,l PMax no aporta — Search manual + Meta rinden mejor por euro.",
        "Atribución actual: si MER es la métrica norte y CAPI está deduplicada, podemos medir incrementalidad de PMax con un test geo. Sin eso, no hay decisión informada.",
        "Marca: si hay >300 búsquedas/mes de marca, exclusión de marca en PMax es no negociable desde el día 1.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Quieres saber qué mix Meta + PMax tiene sentido en tu cuenta?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos tu volumen real, feed, atribución y MER para decirte exactamente dónde poner cada euro y qué ROAS realista esperar.</p>
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
        <Link to="/blog/combinar-google-ads-meta-ads-d2c" className="text-white font-semibold hover:text-white/80">
          Cómo combinar Google Ads y Meta Ads en una estrategia D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Distribución de presupuesto por fase, doble atribución y MER blended</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/meta-ads-vs-google-ads" className="text-white font-semibold hover:text-white/80">
          Meta Ads vs Google Ads: ¿cuál elegir según tu negocio? →
        </Link>
        <p className="text-white/40 text-xs mt-1">Comparativa amplia de plataformas con pros, contras y casos de uso</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/advantage-plus-shopping-cuando-usarlo-no" className="text-white font-semibold hover:text-white/80">
          Advantage+ Shopping en Meta Ads: cuándo usarlo y cuándo no →
        </Link>
        <p className="text-white/40 text-xs mt-1">El equivalente en Meta a PMax: ventajas, riesgos y protocolo de transición</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/metricas-meta-ads-importantes-ecommerce" className="text-white font-semibold hover:text-white/80">
          Métricas Meta Ads que importan de verdad (y las que no) →
        </Link>
        <p className="text-white/40 text-xs mt-1">MER blended, ROAS reportado vs real y por qué la atribución por canal engaña</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default PerformanceMaxVsMetaAdsEspanaPage;
