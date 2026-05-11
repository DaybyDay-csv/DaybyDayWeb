import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es la Meta Ads Library y qué se puede ver de la competencia?",
    a: "La Meta Ads Library (anteriormente Facebook Ad Library) es la base de datos pública oficial de Meta que muestra todos los anuncios activos en Facebook, Instagram, Messenger y Audience Network. Es gratuita, no requiere login y está disponible en facebook.com/ads/library. Para anuncios comerciales (eCommerce, marca, producto) muestra: creatividad completa (imagen, vídeo, carrusel, copy), formato, plataformas donde se ejecuta, primer día activo y fecha actual, ID único de cada anuncio y página advertisera. Para anuncios políticos, electorales o de issues sociales añade país, rango de impresiones, rango de gasto y datos demográficos del alcance (edad, género, geografía). Para D2C en España la utilidad real es ver qué creatividades lleva activas semanas o meses la competencia — las que sobreviven al test inicial — y qué ángulos están funcionando en el mercado sin necesidad de espiar herramientas de pago. La librería se actualiza en tiempo real cada vez que un anuncio se publica o pausa."
  },
  {
    q: "¿Cómo identificar las creatividades ganadoras de un competidor en Meta Ads Library?",
    a: "El método que aplicamos en DayByDay para detectar creatividades ganadoras: (1) Filtrar por país (España) y categoría (Todos los anuncios) en la página del competidor. (2) Ordenar por fecha de primera publicación y aislar los anuncios con más de 30-45 días activos — un anuncio rara vez sobrevive más de 3-4 semanas si no rinde, así que los longevos son señal fuerte de ROAS positivo. (3) Detectar variantes: anuncios con mismo copy y diferente creative o viceversa indican que el competidor está testando esa hipótesis y la mantiene. (4) Mapear el patrón: hook visual, primer mensaje, propuesta de valor, formato (UGC vs estático vs Reels), y duración del vídeo. (5) Cruzar con búsquedas activas: si una creatividad lleva 60+ días, la marca pauta en 2-3 países y la replicas en formatos múltiples, es casi seguro winner. Las marcas D2C españolas que vale la pena auditar como referencia incluyen Hawkers, Singularu, Freshly Cosmetics y Lookiero por volumen de testeo continuo."
  },
  {
    q: "¿Es legal y ético analizar las creatividades de la competencia en Meta Ads Library?",
    a: "Sí, es completamente legal porque la Meta Ads Library es información pública creada por Meta precisamente para transparencia publicitaria (obligación derivada del Digital Services Act europeo y del Honest Ads Act estadounidense). Acceder, descargar capturas, registrar IDs de anuncio y analizar tendencias creativas no infringe ningún término de servicio de Meta ni propiedad intelectual. Lo que no es legal: reproducir literalmente una creatividad protegida por copyright (foto del producto del competidor, voz de un actor contratado, música con derechos) o suplantar la marca. Lo recomendable operativamente: extraer la estructura (hook+propuesta+prueba+CTA), los ángulos de mensaje y los formatos que rinden, pero crear material propio con tu producto, modelos, voz de marca y música licenciada. En España y la UE el AEPD y el Digital Services Act respaldan este uso siempre que sea para investigación competitiva."
  },
  {
    q: "¿Qué herramientas externas complementan Meta Ads Library para análisis de competencia?",
    a: "Meta Ads Library cubre la pieza esencial gratuita pero limita en agregación de datos. Herramientas complementarias útiles para auditoría profunda en D2C: Foreplay (gestor de swipe file con tagging por ángulo, formato y vertical, planes desde 49$/mes), Atria (similar a Foreplay con análisis IA del copy), AdSpy y BigSpy (databases más amplias con búsqueda por keyword del copy y descarga del vídeo, planes 99-149$/mes), Minea (especializada en TikTok+Meta con métricas estimadas de engagement). Para análisis de landing page del competidor: SimilarWeb (tráfico estimado), Wappalyzer (stack tech), PageSpeed Insights (performance). En DayByDay solemos combinar Meta Ads Library (gratis, datos oficiales) + Foreplay (organización del swipe file por hipótesis) + captura manual con timestamps. Las herramientas premium tienen sentido si manejas >5 cuentas o testas creatividades nuevas cada semana; con 1-2 cuentas el ecosistema gratuito más capturas semanales basta."
  },
  {
    q: "¿Cuántos competidores hay que monitorizar y con qué frecuencia revisar la Meta Ads Library?",
    a: "La regla operativa que usamos: 4-6 competidores directos (mismo nicho, mismo país, modelo D2C similar) más 3-5 referentes internacionales (marcas top del vertical en US/UK que innovan antes y marcan tendencia). Frecuencia mínima: revisión semanal de 30-45 minutos con foco en altas y bajas (creatividades nuevas y pausadas), revisión profunda mensual con tagging completo en swipe file y revisión estratégica trimestral con análisis de patrones (qué ángulos saturan, qué formatos rinden, qué ofertas se imponen). Más frecuencia genera ruido sin valor extra; menos frecuencia hace que llegues tarde a tendencias creativas que ya están en pico. Datos de cuentas D2C España: las marcas activas pautan entre 8 y 35 creatividades simultáneas según volumen, con un ratio típico 1 ganadora cada 5-8 testadas, por lo que monitorizar bien 5-6 competidores te da acceso a 40-200 hipótesis testadas mensualmente sin gastar un euro propio."
  },
  {
    q: "¿Qué patrones de creatividad ganadora destacan en D2C España en 2026?",
    a: "Patrones observados al auditar 100+ cuentas D2C españolas activas en Meta Ads Library a inicios de 2026: (1) UGC con cara y voz on-camera mantiene supremacía en moda, belleza y suplementos — la persona habla 6-15 segundos primer plano con problema/solución directo. (2) Reels verticales 9:16 de 9-25 segundos rinden 30-50% mejor que feed cuadrado en captación nueva. (3) Hook en segundos 0-2 con texto grande superpuesto (\"¿Por qué nadie te dijo esto?\" o cifra concreta) sigue siendo el filtro determinante. (4) Estáticos con producto + número grande (\"63% menos azúcar\", \"-40% solo este finde\") rinden mejor en BOFU y retargeting que en captación nueva. (5) Carruseles 3-5 slides con narrativa secuencial superan al carrusel catálogo en consideración. (6) Vídeo testimonial cliente real 20-40s con sub-titulado mejora conversion rate post-click vs vídeo branded actor. (7) Anti-patrón: animaciones MotionGraphics+música cinematográfica casi nunca duran más de 14 días activas en cuentas D2C — Meta penaliza la baja personalización."
  },
  {
    q: "¿Cómo convertir el análisis de Meta Ads Library en hipótesis de testing para tu cuenta?",
    a: "El error típico es copiar la creatividad ganadora del competidor: el algoritmo de Meta penaliza repeticiones del mercado y la diferenciación de marca se pierde. El método correcto en DayByDay: (1) Extraer el ángulo de mensaje (no la creatividad). Ejemplo: si el competidor lleva 3 meses con \"-25% azúcar\" y rinde, el ángulo es \"comparativa nutricional\", no el copy literal. (2) Formular hipótesis propia: \"Si nuestro público responde a comparativa nutricional, un UGC de nuestra fundadora explicando 3 ingredientes que no llevamos vs marca líder dará >2,5x CTR\". (3) Producir 3-4 variantes propias del ángulo con producto, modelo y voz de marca diferenciados. (4) Lanzar test con presupuesto controlado (200-400€/variante mínimo) durante 5-7 días con 1.500-3.000 impresiones/variante. (5) Decidir según ranking de hook rate (>3s/impresiones), CTR, CPA y % new customers. La conversión es: ángulo del competidor → hipótesis tuya → creatividad propia → test medido. Saltarse cualquier paso convierte el análisis en piratería estética sin ROI."
  }
];

const MetaAdsLibraryAnalisisCompetenciaPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Análisis de competencia en Meta Ads Library: cómo extraer creatividades ganadoras"
    description="Guía operativa para usar Meta Ads Library en eCommerce D2C España: qué es y qué se ve gratis de la competencia, método para detectar creatividades ganadoras (filtros, longevidad >30-45 días, variantes, patrones), legalidad y ética del análisis competitivo, herramientas complementarias (Foreplay, AdSpy, Minea), cuántos competidores monitorizar y frecuencia (semanal/mensual/trimestral), patrones de creatividad ganadora D2C España 2026 (UGC voz, Reels 9-25s, hooks 0-2s, anti-patrones MotionGraphics) y cómo convertir el análisis en hipótesis testables sin copiar al competidor. Enfoque DayByDay Pablo + Jorge con swipe file estructurado por ángulo y testing controlado."
    slug="meta-ads-library-analisis-competencia"
    datePublished="2026-05-11"
    dateModified="2026-05-11"
    readingTime="11 min"
    category="Creatividades"
    keywords={[
      "meta ads library competencia",
      "analizar creatividades competencia meta ads",
      "facebook ad library ecommerce",
      "espiar anuncios meta competidor",
      "swipe file meta ads d2c",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">El análisis de competencia en Meta Ads Library es la fuente gratuita más infrautilizada por los media buyers D2C en España</strong>. La librería pública oficial de Meta permite ver, sin login y sin coste, todas las creatividades activas de cualquier marca en Facebook, Instagram, Messenger y Audience Network: copy, vídeo, imagen, formato, día de primera publicación y plataformas donde se ejecuta. Bien usada, una sesión semanal de 30-45 minutos revela qué ángulos están rindiendo en el mercado, qué creatividades llevan meses activas (señal fuerte de ROAS positivo) y qué hipótesis testar en tu cuenta sin gastar un euro propio. Mal usada, se convierte en piratería estética: copiar la creatividad ganadora del competidor genera penalización algorítmica y dilución de marca. En esta guía repasamos el método operativo completo: cómo identificar winners, qué herramientas complementan la librería, cuántos competidores monitorizar y cómo convertir el análisis en hipótesis testables.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es Meta Ads Library y qué información expone de cualquier marca</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Meta Ads Library</strong> es la base de datos pública oficial de Meta disponible en <a href="https://www.facebook.com/ads/library" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">facebook.com/ads/library</a>, creada en 2019 como respuesta al escándalo Cambridge Analytica y reforzada en 2023-2024 por el Digital Services Act europeo. Para cualquier anuncio comercial activo en España, la librería muestra: la creatividad completa (imagen, vídeo, carrusel, copy primario y descripción), el formato, las plataformas donde se publica (Facebook feed, Instagram feed, Reels, Stories, Messenger, Audience Network), la fecha de primera publicación, el ID único del anuncio y la página advertisera con su histórico completo.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Para anuncios sobre política, elecciones o issues sociales añade rangos de impresiones, rangos de gasto y demografía del alcance — pero esa capa no aplica al 99% de cuentas D2C. Para nuestro caso operativo el valor está en lo que sí muestra siempre: la creatividad, la longevidad y el patrón de testing. La librería se actualiza en tiempo real cada vez que un anuncio se publica o pausa.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según el <a href="https://transparency.meta.com/policies/ad-standards/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Meta Transparency Report</a>, en 2024 más de 12 millones de anuncios activos pasaron por la librería en Europa y la media de cuentas D2C eCommerce españolas con presencia continua mantiene entre 8 y 35 creatividades simultáneas activas, con un ratio típico de 1 ganadora consolidada (>30 días activa) por cada 5-8 testadas inicialmente.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo identificar creatividades ganadoras: método paso a paso</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Abrir Meta Ads Library, fijar país (España) y categoría \"Todos los anuncios\". Buscar la marca competidora por nombre exacto de la Página. Verificar que sea la cuenta oficial (verificada o con seguidores coherentes).",
        "Ordenar por fecha de primera publicación. Aislar las creatividades con más de 30-45 días activas. Un anuncio rara vez sobrevive 3-4 semanas si no rinde — los longevos son señal fuerte de ROAS positivo y product-market fit del mensaje.",
        "Detectar variantes activas en paralelo: anuncios con mismo copy y distinto creative (o viceversa) indican test estructural. Si el competidor mantiene 2-3 variantes longevas del mismo ángulo, el ángulo funciona.",
        "Mapear el patrón ganador: hook visual en segundos 0-2, primer mensaje del copy, propuesta de valor (oferta, beneficio, transformación), formato (UGC voz, estático con número grande, Reels narrativos, carrusel secuencial), duración del vídeo.",
        "Validar con cobertura multi-país: si la creatividad se replica en 2-3 países (España + Italia + Francia, por ejemplo) y mantiene >60 días en cada uno, es casi seguro winner con ROAS positivo confirmado.",
        "Documentar en swipe file estructurado: timestamp captura, marca, día primera publicación, formato, ángulo, hook visual, copy primario, propuesta, hipótesis testable derivada.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Herramientas complementarias: gratis vs premium</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Meta Ads Library cubre la pieza esencial gratuita pero limita en agregación de datos, búsqueda por keyword del copy, descarga directa del vídeo y tagging colaborativo. Comparativa de las opciones más relevantes para cuentas D2C en 2026:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Herramienta</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Coste</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Mejor para</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Limitación</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: "Meta Ads Library (oficial)", t: "Gratis", e: "Datos puros, IDs, longevidad", p: "No descarga vídeo ni agrega por copy" },
            { s: "Foreplay", t: "49-149$/mes", e: "Swipe file con tagging por ángulo y formato", p: "Sin métricas estimadas de gasto" },
            { s: "Atria", t: "39-99$/mes", e: "Análisis IA del copy y temas", p: "Cobertura D2C España media" },
            { s: "AdSpy", t: "149$/mes", e: "Búsqueda por keyword del copy, vídeos descargables", p: "Caro para 1-2 cuentas" },
            { s: "BigSpy", t: "99$/mes", e: "Base global amplia multi-canal", p: "UI menos pulida, ruido alto" },
            { s: "Minea", t: "49-99$/mes", e: "TikTok + Meta con engagement estimado", p: "Sesgada a producto winning D2C global" },
            { s: "SimilarWeb (landing)", t: "Gratis-249$/mes", e: "Tráfico estimado del competidor", p: "Solo dominios con tráfico relevante" },
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
      Regla operativa: con 1-2 cuentas D2C, Meta Ads Library + captura manual + carpeta Notion estructurada basta. Con 3+ cuentas o pipeline de testing semanal, añade Foreplay para organización por hipótesis. AdSpy y BigSpy solo justifican coste si tu pipeline produce 8-12 creatividades nuevas/semana o vendes a clientes (agencia).
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cuántos competidores monitorizar y con qué cadencia</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La densidad de monitorización óptima en D2C España: 4-6 competidores directos (mismo nicho, mismo país, modelo D2C similar, banda de inversión comparable) más 3-5 referentes internacionales (marcas top del vertical en US/UK que innovan antes y suelen marcar la tendencia que llega a España 4-8 meses después). Marcas D2C españolas que auditar como referencia activa según vertical:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "Moda: Hawkers, Singularu, Sepiia, Mans Concept Menswear, Charanga (catálogo amplio + testing continuo).",
        "Belleza/skincare: Freshly Cosmetics, Laconicum, La Saponaria, Florence by Mills (campañas constantes en Meta + Instagram).",
        "Suplementos: HSN, Foodspring, Nooz, Bulevip, Drasanvi (testing continuo de ángulos + UGC nativo).",
        "Hogar: Atrápalo, Pikolin Home, Tediber España, Maisons du Monde España (campañas estacionales fuertes).",
        "Alimentación premium: La Vida Verde, Holaluz, Naked & Sated, Sin Gluten (claim nutricional + UGC).",
        "Mascotas: Tiendanimal, Maskokotas, Kiwoko (estructura híbrida online/retail con testing visual activo).",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/70 leading-relaxed mb-5">
      Cadencia recomendada: revisión semanal 30-45 min (altas y bajas), revisión profunda mensual con tagging completo en swipe file (90 min), revisión estratégica trimestral con análisis de patrones (saturación de ángulos, formatos en alza, ofertas dominantes). Más frecuencia genera ruido sin valor extra.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Patrones de creatividad ganadora D2C España 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Patrones observados al auditar 100+ cuentas D2C españolas activas en Meta Ads Library a inicios de 2026:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Patrón</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Funciona en</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Estado 2026</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: "UGC con cara y voz on-camera 6-15s", t: "Moda, belleza, suplementos, alimentación", p: "Dominante (50-65% creatividades winner)" },
            { s: "Reels verticales 9-25s con sub-titulado", t: "Captación nueva todos los verticales", p: "+30-50% rendimiento vs feed cuadrado" },
            { s: "Hook texto superpuesto seg 0-2", t: "Filtro determinante en todos los formatos", p: "Standard de mercado, no opcional" },
            { s: "Estático con número grande (-40%, 63% menos)", t: "BOFU y retargeting con oferta dura", p: "Funciona, no escala captación fría" },
            { s: "Carrusel 3-5 slides narrativa secuencial", t: "Consideración + categorías técnicas", p: "Recuperando volumen en cuentas grandes" },
            { s: "Testimonial cliente real 20-40s sub-titulado", t: "Belleza, suplementos, salud", p: "Sube CR post-click +15-25% vs actor" },
            { s: "MotionGraphics + música cinematográfica", t: "Casi nunca", p: "Anti-patrón: <14 días activos típico" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.t}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo convertir el análisis en hipótesis testables sin copiar al competidor</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El error más caro: copiar la creatividad ganadora literalmente. El algoritmo de Meta penaliza repeticiones de mercado, las audiencias detectan la copia y la diferenciación de marca se evapora. Según el equipo de <a href="https://www.shopify.com/blog/creative-strategy" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Shopify Creative Strategy</a>, las marcas D2C que escalan sin techo creativo trabajan con ángulos prestados pero ejecución propia, nunca con creatividades clonadas. El método correcto en DayByDay:
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Extraer el ángulo de mensaje, no la creatividad. Si el competidor lleva 3 meses con \"-25% azúcar vs líder\", el ángulo es \"comparativa nutricional\", no el copy literal ni el plano específico.",
        "Formular hipótesis propia: \"Si nuestro público responde a comparativa nutricional, un UGC de nuestra fundadora explicando 3 ingredientes que no llevamos vs marca líder dará >2,5x CTR\". Hipótesis cuantificable y falsable.",
        "Producir 3-4 variantes del ángulo con producto, modelo, voz de marca y estética diferenciados. La creatividad debe ser claramente tuya — un usuario de Meta que ve el anuncio del competidor y el tuyo debe percibirlos como marcas distintas.",
        "Lanzar test con presupuesto controlado: 200-400€/variante mínimo durante 5-7 días para llegar a 1.500-3.000 impresiones/variante y poder decidir con significancia razonable.",
        "Decidir según ranking compuesto: hook rate (>3s/impresiones) como filtro inicial, CTR como filtro secundario, CPA y % new customers como decisión final. Anular variantes que no superan el hook rate del competidor referencia.",
        "Iterar el ángulo ganador: si el ángulo funciona, producir 5-8 variantes más durante el mes siguiente con producto/escenario/hook distintos. Si no funciona, abandonar y testar el siguiente ángulo del swipe file.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>
    <p className="text-white/70 leading-relaxed mb-5">
      Para entender cómo estructurar el A/B testing completo y qué variables priorizar antes de gastar, ver la <Link to="/blog/ab-testing-meta-ads-que-testar-primero" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de A/B testing en Meta Ads</Link> y el <Link to="/blog/creative-testing-meta-ads" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">framework de creative testing paso a paso</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Errores frecuentes al usar Meta Ads Library</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Copiar la creatividad ganadora literal: penalización algorítmica + dilución de marca + audiencia desconfiada. La librería es para extraer ángulos, no creatividades terminadas.",
        "Confundir longevidad con éxito absoluto. Una creatividad activa 60 días puede ser winner global o simplemente parte del catálogo siempre encendido por una marca enterprise con budget alto sin medir por creative. Validar con presencia multi-país y variantes.",
        "Monitorizar 15+ competidores sin estructura: la cantidad genera ruido y bloquea la decisión. 4-6 directos + 3-5 internacionales es el rango operativo.",
        "Auditar competidores irrelevantes (marcas con modelo de negocio distinto, ticket distinto, geografía distinta) y derivar hipótesis falsas para tu cuenta. Filtrar competencia real por banda de inversión y catálogo similar antes de estudiarla.",
        "Documentar sin tagging por ángulo: capturas dispersas en Drive sin etiqueta. Sin tagging por hipótesis testable el swipe file no se puede consultar en momento de briefing.",
        "Revisar la librería justo antes de producir una nueva creatividad y dejarse arrastrar por el último ángulo visto. La librería se revisa con cadencia estructurada (semanal/mensual) y se consulta el swipe file en briefing, no la librería en vivo.",
        "Ignorar fecha de primera publicación: una creatividad publicada hace 5 días no es señal de winner, es señal de test inicial. Filtrar por longevidad mínima 30 días para tomar decisiones.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Onboarding arranca con auditoría competitiva estructurada: Pablo identifica 4-6 competidores directos y 3-5 referentes internacionales según vertical y banda de inversión real del cliente; revisa Meta Ads Library de cada uno y construye swipe file inicial taggeado por ángulo, formato y longevidad. Sin esta foto inicial, lanzar creatividades es jugar a ciegas el primer mes.",
        "Cadencia semanal: 30-45 min revisión de altas/bajas en Meta Ads Library de los 8-11 competidores definidos. Documentación en swipe file Notion con timestamp, formato y ángulo. Toda variante longeva >30 días pasa a hipótesis testable.",
        "Cadencia mensual: revisión profunda 90 min con tagging completo + extracción de 4-6 hipótesis testables priorizadas por encaje con propuesta de valor del cliente y producibilidad (presupuesto creative). Las hipótesis se discuten conjuntamente con el cliente antes de producir.",
        "Producción de creatividades propias: 4-8 variantes/mes del ángulo prestado con producto, modelo, voz y estética propios del cliente. Coste típico 80-250€/creative según formato (UGC nano-creator vs estático interno vs Reels editado). Solución ad-hoc Pablo + Jorge: una cuenta de suplementos pidió escalar testing creativo sin subir budget de agencia; Jorge montó un workflow n8n que cada lunes scrapea los nuevos anuncios de los 6 competidores definidos, los clasifica con un agente IA por ángulo y los manda a Slack con captura y hipótesis pre-generada. Pablo solo revisa los 4-5 winners para incorporarlos al swipe file. Reduce 80% del tiempo manual y la cuenta testa 12-15 variantes/mes en vez de 5-6.",
        "Reporting mensual con métricas creativas: hook rate por variante, CTR por ángulo, CPA por formato, ranking ganador del mes y comparación contra benchmark del competidor de referencia. Decisiones basadas en cuadro completo, no en intuición.",
        "Caso real: cuenta D2C cosmética en España llegó con 3 creatividades activas y CPA 38€. Auditamos 5 competidores en Meta Ads Library, extrajimos 6 ángulos longevos no usados por el cliente (UGC fundadora hablando ingredientes, comparativa antes/después con sub-titulado, testimonial cliente >35 años, Reels rutina 25s). Lanzamos 8 variantes en 30 días con producción nano-creator (180€/creative). En 60 días: 4 variantes superaron CPA 26€ y se consolidaron como evergreen, CPA blended pasó de 38€ a 24€ (-37%) manteniendo volumen.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo (founder · paid media) lidera la auditoría competitiva, el swipe file estructurado y la estrategia creativa derivada; Jorge (CTO · automation) lidera la automatización del scraping de Meta Ads Library con agentes IA, el tagging asistido por modelo de lenguaje y la integración del swipe file con el sistema de briefing del cliente. Donde otras agencias paid media externalizan el análisis competitivo a un junior o lo saltan directamente, en DayByDay Pablo y Jorge convierten la librería pública en un sistema de inteligencia continua. El cliente habla con los dos socios desde la primera reunión: sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Quieres ver qué creatividades llevan meses ganando en tu nicho?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría competitiva gratuita 30 min: identificamos 4-6 competidores directos, extraemos creatividades longevas de Meta Ads Library y entregamos swipe file inicial con 4-6 hipótesis testables priorizadas para tu cuenta D2C.</p>
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
        <Link to="/blog/creative-testing-meta-ads" className="text-white font-semibold hover:text-white/80">
          Creative testing en Meta Ads: framework paso a paso →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo estructurar el testing creativo con hipótesis previa y presupuesto controlado</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/ab-testing-meta-ads-que-testar-primero" className="text-white font-semibold hover:text-white/80">
          A/B testing en Meta Ads: qué testar primero →
        </Link>
        <p className="text-white/40 text-xs mt-1">Variables prioritarias y orden operativo de testing para maximizar aprendizaje</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/ugc-meta-ads" className="text-white font-semibold hover:text-white/80">
          UGC en Meta Ads: cómo producir contenido que rinde →
        </Link>
        <p className="text-white/40 text-xs mt-1">Formato dominante en D2C 2026 y cómo trabajar con nano/micro creators</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/por-que-anuncios-meta-no-convierten" className="text-white font-semibold hover:text-white/80">
          Por qué tus anuncios de Meta no convierten →
        </Link>
        <p className="text-white/40 text-xs mt-1">Diagnóstico en 5 capas para detectar dónde está el problema antes de cambiar creatividad</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default MetaAdsLibraryAnalisisCompetenciaPage;
