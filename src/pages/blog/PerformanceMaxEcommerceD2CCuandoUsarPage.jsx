import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Cuándo conviene activar Performance Max para un eCommerce D2C en España?",
    a: "Cuando se cumplen tres condiciones a la vez: la cuenta tiene más de 30 conversiones/mes en Google Ads (umbral mínimo del algoritmo de PMax para no quemar presupuesto en aprendizaje), el feed de Google Merchant Center está limpio (sin disapprovals, con GTIN, custom labels y atributos de margen), y existe ya base de Search Brand + non-brand activa con datos de conversión. Activar Performance Max sin estas tres condiciones suele acabar en CPA inflado un 40-80% durante 4-6 semanas y canibalización de Search brand sin que el operador lo vea (PMax atribuye a sí mismo conversiones que la marca habría capturado igual). En cuentas D2C de menos de 15K€/mes en Google Ads recomendamos empezar con Standard Shopping + Search brand+non-brand y solo abrir PMax cuando el volumen mensual cruza 30 conversiones reales sostenidas tres meses seguidos."
  },
  {
    q: "¿Qué ROAS es bueno en Performance Max para un eCommerce D2C en España 2026?",
    a: "Depende del sector y de cómo se mida, pero los rangos que vemos en cuentas D2C que hemos auditado son: moda 2,8-4,2x, belleza 3,5-5,5x, suplementos 2,5-3,8x, hogar 3,2-4,8x, mascotas 2,8-4,0x. Hay que distinguir entre ROAS reportado por Google Ads (suele estar inflado entre 25 y 45% por sobreatribución de PMax a search brand y a remarketing dinámico que ya iba a convertir) y ROAS real medido con MMM o blended MER. El benchmark sectorial que cita Foundry CRO sitúa el ROAS medio de PMax para eCommerce entre 3,5x y 5x reportados, pero la conversación útil con un cliente nunca es sobre ROAS reportado: es sobre incremental. Si PMax sube tu MER blended cuando lo activas, está aportando volumen real; si solo sube el ROAS reportado de Google sin mover el MER, está canibalizando."
  },
  {
    q: "¿Cómo se mide si Performance Max está canibalizando Search brand y remarketing?",
    a: "Con tres comprobaciones operativas. (1) Brand search test: pausar 7-14 días la campaña Search Brand pura mientras PMax sigue activa y comparar conversiones de marca; si PMax no las recoge en el mismo volumen, está dejándolas escapar. (2) Comparar el % de conversiones que PMax atribuye a 'New customers' (segmento que Google muestra en el reporte de Insights) frente al % medio de la cuenta: si el % de new customers en PMax es menor que el % medio del resto de campañas, PMax está cosechando warm. (3) Activar el reporte de 'Asset group performance by channel' (sólo accesible desde 2024 con account script o Looker conector) para ver qué % del spend va a Search vs YouTube vs Display vs Discover; si más del 60% va a Search/Shopping y la cuenta ya tenía Search brand + Standard Shopping cubriendo eso, hay solapamiento. La regla operativa que aplicamos: PMax debe sumar al MER blended un mínimo de 0,2 puntos en 60 días. Si no lo hace, el incremental es cero y el ROAS reportado es ilusorio."
  },
  {
    q: "¿Qué cambios trae Performance Max en 2026 que afectan a un eCommerce D2C?",
    a: "Cuatro cambios relevantes que ya están en producción para cuentas en España. (1) Channel-level reporting: Google ha abierto reporte por canal dentro de PMax (Search, Shopping, YouTube, Display, Discover, Gmail), lo que permite por fin saber dónde se gasta el presupuesto. (2) Brand exclusions a nivel de campaña: ahora se pueden excluir marcas competidoras y términos de marca propia más finamente, evitando canibalización con Search Brand. (3) Asset group testing nativo: la opción de A/B test de asset groups dentro de la misma campaña sin tener que duplicarla. (4) Integración con Google Analytics 4 para cohortes: PMax ahora puede optimizar a una conversión basada en LTV/AOV de GA4, no solo a la conversión inmediata, lo que cambia el juego para D2C con suscripción o repetición alta. La consecuencia operativa: lo que en 2024 era una caja negra hoy se puede auditar y trocear, pero la mayoría de agencias siguen sin abrir el reporte por canal porque obliga a tomar decisiones incómodas (apagar el canal que no rinde)."
  },
  {
    q: "¿Es mejor Performance Max o Standard Shopping para un eCommerce D2C en 2026?",
    a: "Depende del volumen, del catálogo y de la madurez del feed. La estrategia que mejor rendimiento da en cuentas D2C españolas en 2026 es la híbrida: Standard Shopping para los SKUs core de mayor margen y rotación (control total, datos transparentes, exclusión por search query), y Performance Max para descubrimiento sobre el resto del catálogo y para activar canales que Standard Shopping no toca (YouTube, Discover). Search Engine Journal y los datos de cuentas que hemos optimizado lo confirman: el modelo híbrido supera al PMax-only en 15-30% de ROAS incremental cuando el catálogo tiene más de 80 SKUs activos. En catálogos pequeños (menos de 20 SKUs) Standard Shopping pierde sentido y PMax con feed bien estructurado y custom labels por margen funciona mejor. La regla práctica: si puedes nombrar cuáles son tus 5-10 SKUs hero, sepáralos en Standard Shopping con bid manual; el resto a PMax."
  },
  {
    q: "¿Cómo se prepara el feed de Google Merchant Center para que Performance Max funcione bien?",
    a: "El feed es el 70% del rendimiento de PMax. Cinco intervenciones obligatorias antes de activar la campaña. (1) Limpieza de disapprovals: el feed debe estar al 100% aprobado en GMC; cualquier producto bloqueado se queda fuera de la subasta y desbalancea el aprendizaje. (2) GTIN, MPN y brand correctos en cada producto (Google penaliza fuertemente productos sin GTIN en categorías regulables). (3) Custom labels por margen y por rotación: etiquetar productos como custom_label_0=margen_alto, custom_label_1=top_seller, custom_label_2=stock_bajo permite crear asset groups segmentados con ROAS objetivo distinto. (4) Imágenes optimizadas (1:1 mínimo 800x800px con producto centrado y fondo limpio para evitar penalización de ML). (5) Atributos enriquecidos: color, size, gender, age_group, material — Google los usa como señales de matching y elevan el CTR en Shopping un 15-25% según datos públicos de Google. Sin estos cinco puntos, PMax aprende sobre datos sucios y la cuenta tarda 60-90 días en estabilizarse."
  }
];

const PerformanceMaxEcommerceD2CCuandoUsarPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Performance Max para D2C: cuándo activarla y cómo medir si funciona en 2026"
    description="Guía operativa para activar Performance Max en un eCommerce D2C en España: condiciones mínimas (30+ conversiones/mes, feed limpio, base Search activa), cómo detectar canibalización con Search Brand y remarketing, ROAS objetivo por sector, novedades 2026 (channel-level reporting, brand exclusions, GA4 cohorts), modelo híbrido Standard Shopping + PMax, preparación de feed Merchant Center y enfoque DayByDay."
    slug="performance-max-ecommerce-d2c-cuando-usar"
    datePublished="2026-05-08"
    dateModified="2026-05-08"
    readingTime="12 min"
    category="Google Ads"
    keywords={[
      "performance max ecommerce d2c",
      "performance max cuando activar",
      "performance max españa 2026",
      "pmax vs standard shopping",
      "performance max canibalización search brand",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Performance Max para un eCommerce D2C en España no es plug-and-play</strong>: activarla sin volumen, sin feed limpio y sin entender qué canibaliza es la forma más rápida de inflar el ROAS reportado en Google Ads mientras el MER blended de la cuenta no se mueve. En 2026 PMax ya no es una caja negra absoluta —Google ha abierto channel-level reporting, brand exclusions y testing nativo de asset groups—, pero la mayoría de cuentas que auditamos siguen activándola en el momento equivocado y sin las condiciones mínimas. Esta guía es el protocolo que usamos en DayByDay para decidir cuándo abrir Performance Max, cómo medir si está aportando incremental real y cuándo apagarla.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es Performance Max para un eCommerce D2C</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Performance Max</strong> es el formato automatizado de Google Ads que combina en una única campaña los inventarios de Search, Shopping, YouTube, Display, Discover y Gmail, optimizando con machine learning hacia un objetivo de conversión definido (Maximize Conversion Value con ROAS objetivo es el setup estándar para eCommerce D2C). El operador entrega assets (imágenes, vídeos, headlines, descriptions), feed de productos y señales de audiencia; Google decide en qué canal, a qué subasta y a qué usuario se sirve cada impresión.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      <a href="https://www.searchenginejournal.com/performance-max-for-ecommerce-the-hybrid-strategy-thats-actually-working/571885/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Según Search Engine Journal, la estrategia híbrida (Standard Shopping para SKUs core + Performance Max para el resto) es la que mejor rinde para eCommerce en 2026</a>, superando al PMax-only en transparencia y permitiendo control granular donde el margen lo justifica. El consenso del sector es claro: PMax funciona como parte de un portfolio multi-campaña, no como solución única.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según <a href="https://foundrycro.com/blog/roas-benchmarks-by-industry-2026/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">los benchmarks 2026 publicados por Foundry CRO</a>, Performance Max promedia un ROAS de 3,5x a 5x reportado para eCommerce, mientras que las campañas de Search puro promedian 5,17x. La diferencia no significa que PMax sea peor: significa que PMax incluye discovery y prospecting que Search puro no toca, y que hay que mirar el ROAS incremental sobre la mezcla, no el ROAS aislado de cada campaña.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 3 condiciones obligatorias antes de activar Performance Max</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Activar PMax sin cumplir estas tres condiciones es la causa nº1 de cuentas D2C españolas que llegan a DayByDay con CPA disparado y ROAS reportado que no cuadra con el cierre de Shopify:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Condición</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Umbral mínimo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Riesgo si no se cumple</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cómo verificar</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "Volumen de conversión", u: ">30 conv/mes sostenidas 3 meses", r: "Aprendizaje infinito + CPA inflado +40-80%", v: "Reporte de conversiones Google Ads últimos 90 días" },
            { c: "Feed Merchant Center", u: "100% aprobado, GTIN, custom labels", r: "Aprendizaje sobre datos sucios + 60-90d de inestabilidad", v: "GMC > Diagnostics + Products tab" },
            { c: "Search Brand + non-brand activa", u: "Mínimo 4 semanas con datos de conversión", r: "PMax canibaliza brand sin baseline para detectarlo", v: "Search terms report últimos 30 días" },
            { c: "Tracking GA4 + Enhanced Conversions", u: "Enhanced Conversions activado, eventos completos", r: "Optimización ciega, ROAS reportado falso", v: "GA4 DebugView + Conversion Action diagnostic" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.u}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.r}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Más detalle sobre cómo combinar Google Ads y Meta Ads en una D2C en la <Link to="/blog/combinar-google-ads-meta-ads-d2c" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de combinación Google Ads + Meta Ads para D2C</Link> y cómo se compara con Meta Ads en presupuesto en <Link to="/blog/performance-max-vs-meta-ads-espana" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Performance Max vs Meta Ads en España</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo medir si Performance Max está canibalizando o aportando incremental</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Brand search test (semana 1-2 tras activar PMax): pausar 7-14 días la campaña Search Brand pura mientras PMax sigue activa. Si las conversiones de marca caen >25% en ese periodo, PMax no está recogiéndolas y solo está reportando lo que Search Brand habría capturado igual.",
        "Channel-level reporting: abrir el reporte por canal dentro de PMax (Search, Shopping, YouTube, Display, Discover) y validar el % de spend por canal. Si más del 60% va a Search+Shopping y la cuenta ya tenía Search Brand + Standard Shopping cubriendo eso, hay solapamiento estructural y conviene aplicar brand exclusions o reducir presupuesto PMax.",
        "% New Customers en PMax vs cuenta: revisar el segmento 'New Customer' que Google muestra en Insights. Si el % de new customers en PMax es menor al % medio del resto de campañas, PMax está cosechando warm que ya iba a convertir.",
        "MER blended antes vs después: medir el MER blended (revenue total / spend total Meta+Google+TikTok) los 30 días previos a activar PMax y los 30 días posteriores. Subida ≥0,2 puntos = incremental real. Plano o bajada = canibalización pura.",
        "Search query report de PMax: con script de Google Ads se pueden extraer las search queries que activan PMax. Si las top 20 son términos de marca propia, hay que activar brand exclusions inmediatamente.",
        "Holdout geo (cuentas grandes >30K€/mes Google): apagar PMax en una región (Madrid o Cataluña) durante 30 días y comparar caída de revenue total con la región control. Es el método más limpio para medir incremental real, sin atribución.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Modelo híbrido: Standard Shopping + Performance Max</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La estructura que mejor rendimiento da en cuentas D2C españolas con catálogo &gt;80 SKUs activos:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Bloque</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">% spend Google Ads</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cobertura</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">ROAS objetivo</th>
          </tr>
        </thead>
        <tbody>
          {[
            { b: "Search Brand", p: "10-15%", c: "Términos marca propia + variantes", r: "8-15x" },
            { b: "Search non-brand", p: "15-25%", c: "Categoría + producto genérico", r: "2,5-4,0x" },
            { b: "Standard Shopping (hero SKUs)", p: "20-30%", c: "Top 5-15 SKUs por margen y rotación", r: "4-6x" },
            { b: "Performance Max (long tail)", p: "30-45%", c: "Resto catálogo + YouTube/Discover", r: "3-5x" },
            { b: "Remarketing dinámico (Display)", p: "5-10%", c: "Visitas 14-30d + AddToCart", r: "5-8x" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.b}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      <a href="https://www.storegrowers.com/performance-max-campaigns/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Store Growers en su análisis 2026 de Performance Max para eCommerce</a> coincide en que la activación con bid muy agresivo desde el día 1 reduce volumen de conversión hasta un 50%. La regla operativa: arrancar con ROAS target conservador (-15% sobre objetivo final), dejar 4 semanas de aprendizaje y subir gradualmente el target en incrementos de 0,3-0,5 puntos cada 14 días.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Novedades Performance Max 2026 que cambian el juego</h2>
    <div className="space-y-3 mb-6">
      {[
        "Channel-level reporting nativo: Google ha abierto el reporte por canal dentro de cada campaña PMax. Por fin se puede saber qué % del spend va a Search vs Shopping vs YouTube vs Display vs Discover sin scripts externos.",
        "Brand exclusions a nivel de campaña: ahora se pueden excluir marcas competidoras y términos de marca propia más finamente, evitando canibalización con Search Brand sin tener que apagar PMax.",
        "Asset group A/B testing nativo: opción de testar variantes de asset group dentro de la misma campaña sin duplicarla; reduce inflación de aprendizaje.",
        "Integración GA4 + LTV cohorts: PMax puede optimizar a un evento de conversión basado en LTV/AOV de GA4, no solo a la conversión inmediata. Cambio crítico para D2C con suscripción o repetición alta.",
        "Demand Gen overlap reporting: Google ahora reporta solapamiento entre PMax y Demand Gen, permitiendo decidir qué campaña apagar si están compitiendo en la misma audiencia.",
        "Customer Match priorización: las listas Customer Match suben en peso dentro del algoritmo PMax — sincronizar Klaviyo/Shopify customers con Google Ads pasa de nice-to-have a obligatorio.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Más contexto sobre cómo elegir entre Google y Meta para un D2C en <Link to="/blog/meta-ads-vs-google-ads" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Meta Ads vs Google Ads para eCommerce</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Diagnóstico previo a activar PMax: auditamos volumen de conversión últimos 90 días, salud del feed Merchant Center (disapprovals, GTIN, custom labels), baseline Search Brand + non-brand y tracking GA4+Enhanced Conversions. Si una de las cuatro condiciones no se cumple, NO activamos PMax — preparamos la base primero.",
        "Estructura híbrida desde el día 1: separamos hero SKUs (top 5-15 por margen) en Standard Shopping con bid manual, dejamos PMax solo para el resto del catálogo y discovery. Ningún cliente nuestro corre PMax-only salvo en catálogos <20 SKUs.",
        "Implementación Pablo + Jorge en paralelo: Pablo cierra la estrategia de campañas, asset groups y ROAS targets; Jorge configura la integración Shopify→GA4 con Enhanced Conversions, sincronización Customer Match desde Klaviyo, dashboard Looker Studio con MER blended cruzando Meta + Google + TikTok y script Google Ads para extraer search query report de PMax (no expuesto en UI).",
        "Brand search test obligatorio en semana 2: pausamos Search Brand 10-14 días para medir si PMax recoge marca o solo la canibaliza. Decisión basada en datos, no en intuición.",
        "Reporting MER-first, no ROAS-first: el dashboard que ve el cliente cada lunes muestra MER blended por canal y por semana, con anotaciones de cambios; el ROAS reportado de Google Ads se muestra en segundo plano porque sabemos que sobreatribuye 25-45%.",
        "Holdout geo trimestral en cuentas >30K€/mes Google: apagamos PMax en una región (típicamente Cataluña o Madrid) durante 30 días para medir incremental real sin depender de la atribución de plataforma.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo (founder · paid media) lidera la estrategia de campañas Google Ads, asset groups y decisiones de ROAS target; Jorge (CTO · automation) lidera Enhanced Conversions, Customer Match Klaviyo↔Google, scripts Google Ads para reporting que la UI no expone, y dashboard Looker con MER blended. Donde otras agencias separan paid Google de tracking server-side entre dos proveedores que rara vez se hablan, en DayByDay las decisiones de qué señales pasar a Customer Match, qué canal apagar dentro de PMax y qué SKUs separar en Standard Shopping se cierran en la misma reunión. El cliente habla con los dos socios desde la primera reunión: sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu cuenta está lista para Performance Max o te está canibalizando?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos volumen de conversión, salud del feed Merchant Center, baseline Search Brand, tracking GA4+Enhanced Conversions y % de spend PMax que va a Search vs Shopping vs YouTube. Te decimos si activar, si reestructurar a híbrido o si pausar.</p>
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
        <Link to="/blog/performance-max-vs-meta-ads-espana" className="text-white font-semibold hover:text-white/80">
          Performance Max vs Meta Ads en España: cuál escoger para D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Comparativa de Performance Max y Meta Ads en presupuesto, atribución y rendimiento real</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/combinar-google-ads-meta-ads-d2c" className="text-white font-semibold hover:text-white/80">
          Cómo combinar Google Ads y Meta Ads para escalar un D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Distribución óptima de presupuesto entre Google y Meta según madurez de cuenta</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/meta-ads-vs-google-ads" className="text-white font-semibold hover:text-white/80">
          Meta Ads vs Google Ads para eCommerce: cuál encaja con cada D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Diferencias estructurales entre Meta Ads y Google Ads para eCommerce D2C</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/modelos-atribucion-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Modelos de atribución para D2C: last-click, data-driven y MMM →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo PMax sobreatribuye 25-45% y por qué medir con MER blended es obligatorio</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default PerformanceMaxEcommerceD2CCuandoUsarPage;
