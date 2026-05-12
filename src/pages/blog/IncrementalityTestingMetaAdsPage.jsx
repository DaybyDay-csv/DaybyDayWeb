import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es incrementality testing en Meta Ads y por qué importa para un eCommerce D2C?",
    a: "Incrementality testing es el método experimental que mide qué ventas adicionales (lift) genera realmente Meta Ads frente a lo que se habría vendido sin esa inversión. En vez de fiarse del ROAS in-platform (last-click, sobreatribuido 1,3-1,8x respecto al MER blended según observaciones internas de cuentas D2C España), se construye un grupo expuesto a anuncios y un grupo holdout sin exposición, y se compara la conversión incremental. Para un D2C importa porque Meta atribuye ventas que habrían ocurrido orgánicamente (clientes recurrentes, branded search, tráfico directo) y eso lleva a sobreinvertir en retargeting o subestimar prospecting. Sin un test de incrementalidad, las decisiones de escalado se toman sobre ROAS atribuido, no sobre euros marginales ganados."
  },
  {
    q: "¿Qué diferencia hay entre incrementality testing, atribución y Marketing Mix Modeling?",
    a: "Los tres miden cosas distintas y se complementan. Atribución (last-click, data-driven, modelos por plataforma) asigna ventas a touchpoints concretos pero no responde 'qué habría pasado sin paid media'. Marketing Mix Modeling (MMM) estima la contribución de cada canal con regresión sobre spend histórico y variables exógenas — bueno para mix anual y planificación, débil para decisiones tácticas semanales. Incrementality testing es un experimento causal en tiempo real: divides geográficamente o por usuario, expones a unos y no a otros, y mides el delta de revenue. Es el más caro de montar pero el único que da causalidad real. En DayByDay lo usamos para validar el ROAS reportado por Meta antes de tomar decisiones de escalado >50% del spend mensual."
  },
  {
    q: "¿Qué tipos de incrementality test existen y cuál usar en un eCommerce D2C español?",
    a: "Tres tipos principales. (1) Conversion Lift Studies de Meta (gratuito en cuentas con >100K€ de spend/mes y conversion volume >500/mes en la ventana del test): Meta divide usuarios elegibles en exposed/holdout y reporta el lift incremental. Es el más rápido de montar pero solo válido para conversion events Meta-tracked. (2) Geo holdout tests: se apaga Meta Ads en 2-4 regiones representativas (ej: Aragón + Castilla-La Mancha) durante 2-4 semanas y se compara revenue vs regiones control con misma estacionalidad. Funciona para cuentas con spend distribuido geográficamente y >500-1.000 pedidos/mes. (3) Pre/post holistic (apagado total temporal 5-7 días): solo aplicable si el negocio aguanta el shock — útil para auditar dependencia real de Meta. Para D2C España con 10-40K€/mes Meta, geo holdout es el sweet spot."
  },
  {
    q: "¿Cuánto cuesta y cuánto tarda un test de incrementalidad en Meta Ads?",
    a: "Coste y duración dependen del método. Conversion Lift de Meta: gratuito en spend operativo, requiere 14-28 días con presupuesto sostenido y >500 conversiones en cada celda para significancia estadística (p<0,05). Geo holdout: el coste es el revenue perdido en regiones apagadas — típicamente 8-15% del revenue Meta mensual durante 2-4 semanas. Cuenta D2C con 20K€/mes Meta puede esperar 1.500-3.000€ de coste de oportunidad por test. Pre/post total: coste alto (todo el revenue Meta de los días apagados) pero 1 semana suele bastar. Tiempo de implementación operativa: 3-5 días para diseño + 14-28 días de test + 3-5 días de análisis = 4-6 semanas end-to-end. En DayByDay corremos uno por trimestre como mínimo en cuentas con >15K€/mes para auditar el ROAS reportado."
  },
  {
    q: "¿Qué lift incremental es realista para Meta Ads en eCommerce D2C España?",
    a: "Rangos observados en cuentas D2C España 2024-2026 con tests bien diseñados. Prospecting con audiencias broad o LAL: lift incremental 60-85% del revenue atribuido por Meta — es decir, Meta sobreatribuye 15-40%. Retargeting 7-30 días web visitors: lift incremental 20-45% del revenue atribuido — la mayoría de esas conversiones habrían ocurrido orgánicamente. Retargeting 30-180 días + reactivación: lift 10-30% (muchos compradores ya iban a volver). Campañas branded keyword en Google Ads (no Meta pero relevante): 5-25% incremental. La conclusión operativa: el ROAS in-platform de prospecting es bastante representativo (±20%), el de retargeting está inflado 2-4x. Tras un test, lo habitual en DayByDay es redistribuir 15-30% del spend de retargeting hacia prospecting con audiencias nuevas."
  },
  {
    q: "¿Cómo se diseña un geo holdout test paso a paso para Meta Ads?",
    a: "Protocolo operativo. (1) Seleccionar regiones test y control con perfiles demográficos y revenue Meta históricos comparables (último trimestre, mismo % del revenue total ±2 puntos). Recomendado 4-8 regiones agrupadas en 2 celdas. (2) Definir métrica primaria: revenue incremental por euro invertido (iROAS = lift€ / spend€ ahorrado en holdout). (3) Duración mínima 14 días, recomendado 21-28 días para superar ciclo de compra D2C medio. (4) Apagar Meta Ads en celda holdout — pausar campañas, no solo audiencias geográficas. (5) Bloquear cambios estructurales (creatividades nuevas, presupuestos, lanzamiento de producto) durante el test en ambas celdas. (6) Medición: comparar revenue daily de regiones test vs holdout, normalizado por baseline pre-test 28 días. (7) Significancia: test t pareado, p<0,1 mínimo (con tamaños de muestra pequeños difícil llegar a p<0,05). En DayByDay Jorge automatiza el dashboard de seguimiento con scripts Python conectados a Shopify + Meta Marketing API."
  },
  {
    q: "¿Qué errores cometen los media buyers al hacer incrementality testing?",
    a: "Los siete errores que más vemos auditando cuentas D2C España. (1) Comparar exposed vs holdout sin baseline previa: las regiones siempre tienen diferencia natural de revenue, hay que normalizar. (2) Test demasiado corto (<14 días): no captura el ciclo de compra y los resultados son ruido. (3) Lanzar producto nuevo, descuento o campaña paralela durante el test: invalida la comparación. (4) Confundir Meta Conversion Lift con un experimento independiente: Meta diseña, ejecuta y reporta — útil pero auditarlo con un geo holdout cruzado da más confianza. (5) Asumir que lift retargeting bajo significa pausarlo todo: 20-30% incremental sigue siendo rentable si el margen lo soporta. (6) No incluir el spend ahorrado en el holdout como input del iROAS: el cálculo correcto es (revenue test − revenue holdout) / (spend test − spend holdout). (7) No repetir trimestralmente: el lift cambia con saturación de audiencia, estacionalidad y mix creativo. Un test puntual de hace 9 meses ya no es válido para decisiones de escalado actuales."
  }
];

const IncrementalityTestingMetaAdsPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Incrementality testing en Meta Ads: cómo medir el lift real en eCommerce D2C"
    description="Guía operativa de incrementality testing para Meta Ads en eCommerce D2C España: qué es y por qué importa, diferencia entre incrementalidad, atribución y MMM, los 3 tipos de test (Meta Conversion Lift, geo holdout, pre/post holistic), cuándo aplicar cada uno según volumen y spend, coste real y duración esperada (4-6 semanas end-to-end), lift incremental realista por tipo de campaña en D2C España 2026 (prospecting 60-85%, retargeting 7-30d 20-45%, retargeting 30-180d 10-30%), protocolo paso a paso para diseñar un geo holdout test (selección de regiones, baseline, duración 14-28 días, significancia), 7 errores frecuentes y enfoque DayByDay Pablo+Jorge con dashboard custom Python + Shopify + Meta Marketing API."
    slug="incrementality-testing-meta-ads-d2c"
    datePublished="2026-05-12"
    dateModified="2026-05-12"
    readingTime="11 min"
    category="Medición"
    keywords={[
      "incrementality testing meta ads",
      "geo holdout test ecommerce",
      "lift incremental paid media",
      "conversion lift study meta",
      "medir incrementalidad meta ads d2c",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">El incrementality testing en Meta Ads es la única forma rigurosa de saber cuánto revenue genera realmente tu paid social frente a lo que habría vendido sin él</strong>. El ROAS que ves en el Ads Manager está construido sobre atribución last-click y modelos de Meta que sobreatribuyen entre un 15% y un 40% según el tipo de campaña, lo que lleva a decisiones de escalado erróneas y sobreinversión sistemática en retargeting. En cuentas D2C España con spend 10-40K€/mes, montar 1-2 tests de incrementalidad al año redefine la asignación de presupuesto y suele liberar entre un 15% y un 30% del spend de retargeting hacia prospecting con audiencias nuevas. Esta guía resume qué es, qué tipos existen, cuál se ajusta a cada tamaño de cuenta, cuánto cuesta y cómo diseñar el geo holdout test paso a paso.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es incrementality testing en paid media</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Incrementality testing</strong> (o lift testing) es un experimento causal que aísla qué parte del revenue atribuido a una campaña es realmente incremental — es decir, no habría ocurrido sin la inversión publicitaria. Se construye un grupo exposed (ve los anuncios) y un grupo holdout (no los ve), comparables en perfil y comportamiento histórico, y se mide la diferencia de revenue. Es la metodología que <a href="https://www.thinkwithgoogle.com/marketing-strategies/data-and-measurement/incrementality-testing-marketing/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Think with Google</a> y Meta recomiendan para auditar la efectividad real de cada canal por encima de los modelos de atribución, que son correlacionales, no causales.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según <a href="https://www.facebook.com/business/m/lift-measurement" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Meta Lift Measurement</a>, los Conversion Lift Studies estiman el lift incremental con un intervalo de confianza del 90-95%. En cuentas D2C España 2024-2026 auditadas por DayByDay, el lift incremental medio de retargeting 7-30 días web visitors se sitúa en 28% del revenue atribuido por Meta — es decir, 72% de esas ventas habría ocurrido también sin retargeting activo.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Incrementalidad vs atribución vs Marketing Mix Modeling</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Las tres metodologías se solapan en uso cotidiano pero responden preguntas distintas. La tabla resume cuándo aplicar cada una en un eCommerce D2C español:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Método</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Pregunta que responde</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Coste / duración</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cuándo usar</th>
          </tr>
        </thead>
        <tbody>
          {[
            { m: "Atribución (Meta/GA4)", q: "¿A qué touchpoint asignamos la venta?", c: "Bajo / continuo", w: "Decisiones tácticas semanales" },
            { m: "Marketing Mix Modeling", q: "¿Qué % del revenue aporta cada canal a lo largo del año?", c: "Medio / 4-8 semanas montar, ejecución continua", w: "Mix anual + planificación budget" },
            { m: "Conversion Lift Study (Meta)", q: "¿Cuánto lift causal genera Meta sobre conversion event?", c: "Spend operativo / 14-28 días", w: "Cuentas >100K€/mes y >500 conv/mes" },
            { m: "Geo holdout test", q: "¿Cuánto revenue total se pierde si apago Meta?", c: "Coste oportunidad 8-15% revenue Meta / 4-6 semanas end-to-end", w: "Cuentas 10-40K€/mes con revenue distribuido geográficamente" },
            { m: "Pre/post total apagado", q: "¿Cuál es la dependencia real del negocio a Meta?", c: "Alto / 5-7 días", w: "Auditoría puntual anual" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.q}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.w}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Para profundizar en cómo se combinan en un sistema de medición coherente, ver la <Link to="/blog/marketing-mix-modeling-ecommerce-d2c" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de Marketing Mix Modeling para D2C</Link> y los <Link to="/blog/modelos-atribucion-ecommerce-d2c" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">modelos de atribución en ecommerce D2C</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Lift incremental realista por tipo de campaña Meta Ads</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Rangos observados en cuentas D2C España 2024-2026 con tests bien diseñados. Asume regiones comparables, baseline 28 días normalizado y >500 pedidos por celda en la ventana del test:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "Prospecting broad o Advantage+ Shopping con audiencias amplias: lift incremental 60-85% del revenue atribuido por Meta. Sobreatribución 15-40%.",
        "Prospecting LAL 1-3% sobre compradores: lift 55-75%. La parte sobreatribuida sube por solape con tráfico ya familiarizado con la marca.",
        "Retargeting web visitors 7-30 días: lift 20-45%. La mayoría de esas conversiones habrían ocurrido orgánicamente (branded search, directo, email).",
        "Retargeting catálogo (DPA) 30-180 días: lift 10-30%. Muchos compradores ya planeaban volver — el anuncio acelera pero no genera.",
        "Reactivación 180-365 días: lift 15-35%. Útil en categorías de recompra (suplementos, café, cosmética) pero sobreatribuido en categorías con ciclo largo.",
        "Branded keyword Google Ads (no Meta pero comparable): lift 5-25%. Mucho de ese tráfico llegaría igual por SEO o tipeando la URL.",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/70 leading-relaxed mb-5">
      La conclusión operativa: el ROAS in-platform de prospecting suele estar dentro de ±20% del lift real, el de retargeting está inflado 2-4x. Tras un test, lo habitual es redistribuir 15-30% del spend de retargeting hacia prospecting con audiencias nuevas o creative testing.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo diseñar un geo holdout test paso a paso</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Para una cuenta D2C España con 10-40K€/mes en Meta Ads, el geo holdout es el método con mejor relación coste / fiabilidad. Protocolo en 7 pasos:
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Seleccionar regiones test y holdout con perfiles demográficos, ticket medio y revenue Meta históricos comparables. Mínimo 4-8 regiones agrupadas en 2 celdas. Recomendado: agrupar comunidades autónomas con peso similar (ej. Aragón + Castilla-La Mancha vs Cantabria + La Rioja).",
        "Construir baseline 28 días pre-test: revenue diario por región, normalizado por estacionalidad (ratio región/total nacional). Esto permite detectar diferencias naturales antes de empezar.",
        "Definir métrica primaria: iROAS = (revenue celda test − revenue celda holdout) / (spend celda test − spend celda holdout). Métrica secundaria: lift % = (revenue test − revenue holdout) / revenue test.",
        "Duración mínima 14 días, recomendada 21-28 días para superar el ciclo de compra D2C medio (10-21 días según sector). En suplementos y belleza ciclos largos pueden exigir 28-35 días.",
        "Apagar Meta Ads en la celda holdout pausando campañas enteras, no solo audiencias geográficas — Meta puede entregar anuncios por solape de interés aunque limites geo a nivel ad set.",
        "Bloquear cambios estructurales durante el test en ambas celdas: nada de nuevas creatividades nacionales, descuentos extra, lanzamientos de producto ni email pushes diferenciados. Cualquier shock invalida la comparación.",
        "Análisis final: test t pareado sobre revenue diario normalizado. Aceptar resultado con p<0,1 mínimo (con tamaños muestrales típicos D2C es difícil llegar a p<0,05). Documentar el iROAS y la decisión de redistribución de spend.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cuándo usar Meta Conversion Lift en vez de geo holdout</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Meta Conversion Lift Studies es la herramienta nativa de Meta Ads para medir lift incremental, gratis para cuentas elegibles. Para una visión completa de las métricas Meta que conviene monitorizar junto con el lift, ver las <Link to="/blog/metricas-meta-ads-importantes-ecommerce" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">métricas de Meta Ads importantes en eCommerce</Link>. Criterios para optar por Conversion Lift en lugar de geo holdout:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "Spend mensual Meta >100K€ (Meta no abre Conversion Lift en cuentas pequeñas por falta de volumen estadístico).",
        ">500 conversiones del evento test (purchase, add-to-cart) por celda durante la ventana del test.",
        "Quieres medir lift sobre un evento concreto (purchase) y no sobre revenue total del negocio.",
        "No tienes capacidad de operar diferenciadamente por geografía (catálogo único, fulfilment unificado).",
        "Necesitas el test rápido (4-6 semanas con geo holdout vs 2-4 con Conversion Lift bien parametrizado).",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/70 leading-relaxed mb-5">
      Limitación importante: Meta diseña, ejecuta y reporta — auditarlo cruzando con un geo holdout independiente cada 6-12 meses aporta confianza adicional, sobre todo en decisiones de escalado >50% del spend mensual.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Errores frecuentes en incrementality testing</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Comparar exposed vs holdout sin baseline pre-test: las regiones siempre tienen diferencias naturales de revenue. Hay que normalizar contra los 28 días previos.",
        "Test demasiado corto (<14 días): no captura el ciclo de compra D2C y los resultados son ruido estadístico.",
        "Lanzar producto, descuento, push de email diferenciado o campaña paralela durante el test. Cualquier shock externo invalida la comparación.",
        "Confiar 100% en Meta Conversion Lift sin auditar con un test independiente cada 6-12 meses.",
        "Asumir que lift retargeting bajo significa pausarlo todo. 20-30% incremental sigue siendo rentable si el margen lo soporta — la decisión es de % de spend, no de on/off.",
        "Calcular el iROAS solo dividiendo revenue lift entre spend test, ignorando el spend ahorrado en holdout. El cálculo correcto incluye el delta de spend entre celdas.",
        "No repetir trimestralmente. El lift cambia con saturación de audiencia, estacionalidad y mix creativo. Un test de hace 9 meses ya no es válido para decisiones actuales.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Onboarding incluye auditoría de incrementalidad histórica: Pablo revisa el ratio ROAS Meta vs MER blended de últimos 90 días para estimar el grado de sobreatribución estructural. Si la divergencia es >25%, se planifica geo holdout test en los primeros 60 días.",
        "Cadencia mínima 1 test de incrementalidad por trimestre en cuentas >15K€/mes Meta. Documentamos iROAS por tipo de campaña (prospecting / retargeting / reactivación) y se ajusta la asignación de spend en base al resultado, no al ROAS in-platform.",
        "Solución ad-hoc Pablo + Jorge: una cuenta D2C cosmética 28K€/mes Meta tenía ROAS reportado 4,1x pero MER blended 2,3x — gap del 44% que indicaba sobreatribución severa. Jorge montó un pipeline Python sobre la API de Meta Marketing y Shopify Admin que automatizó el split geográfico, normalización por baseline 28d y test t pareado diario. Pablo diseñó las celdas (4 regiones por celda) y la duración (28 días). Resultado: lift retargeting 22% (esperado 30-45%) y prospecting 71% (esperado 60-85%). Redistribución: -35% spend retargeting, +28% prospecting + creative testing. MER blended subió de 2,3x a 2,9x en 60 días con mismo presupuesto.",
        "Reporting transparente: cada test se entrega con tabla de resultados (revenue test, revenue holdout, lift €, iROAS, p-value) y decisión operativa documentada. El cliente entiende qué cambió y por qué — no solo el output.",
        "Caso real complementario: cuenta D2C suplementos 16K€/mes Meta hizo Meta Conversion Lift gratuito sobre purchase event durante 21 días. Lift 38% sobre prospecting + 19% retargeting 7d. Decisión: mantener mix pero reasignar 4K€/mes de retargeting hacia testing creative en prospecting. ROAS atribuido bajó de 3,8x a 3,2x; MER blended subió de 2,4x a 2,7x — el spend reasignado generó más revenue real aunque Meta lo reportara peor.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo (founder · paid media) lidera el diseño de las celdas geográficas, la duración y la decisión de redistribución de spend en base al iROAS; Jorge (CTO · automation) lidera el pipeline Python conectando Meta Marketing API + Shopify Admin + tests estadísticos para que la lectura del experimento sea automática y reproducible. Donde otras agencias se quedan con el ROAS reportado por Meta, en DayByDay Pablo y Jorge auditan trimestralmente con experimentos causales reales. El cliente habla con los dos socios desde la primera reunión: sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu ROAS Meta no cuadra con el revenue real del negocio?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos el gap entre ROAS in-platform y MER blended y diseñamos el geo holdout test que tu cuenta necesita para validar dónde está la incrementalidad real.</p>
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
        <Link to="/blog/marketing-mix-modeling-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Marketing Mix Modeling para eCommerce D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo MMM y incrementality testing se complementan en un sistema de medición coherente</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/modelos-atribucion-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Modelos de atribución en eCommerce D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué el last-click sobreatribuye Meta Ads y qué alternativas hay antes de un test causal</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cac-blended-vs-cac-canal-ecommerce" className="text-white font-semibold hover:text-white/80">
          CAC blended vs CAC por canal en eCommerce D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">El MER blended como termómetro de la sobreatribución antes de invertir en un test de incrementalidad</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-campanas-meta-ads-sin-romper-roas" className="text-white font-semibold hover:text-white/80">
          Escalar campañas Meta Ads sin romper el ROAS →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo usar el resultado de un test de incrementalidad para tomar decisiones de escalado >50% del spend</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default IncrementalityTestingMetaAdsPage;
