import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Por qué combinar Google Ads y Meta Ads en una estrategia D2C en lugar de elegir uno solo?",
    a: "Cumplen funciones distintas en el embudo: Meta Ads genera demanda en audiencias frías que todavía no buscan tu producto (descubrimiento), mientras Google Ads captura demanda existente — usuarios que ya escriben tu marca, categoría o problema. Un D2C que sólo invierte en Meta paga cada vez más caro a medida que escala porque genera awareness pero no capta esa demanda residual. Un D2C que sólo invierte en Google está limitado al volumen actual de búsquedas. Combinarlos no es opcional cuando se busca crecimiento sostenible: Meta crea el techo, Google lo recoge.",
  },
  {
    q: "¿En qué proporción debo distribuir el presupuesto entre Google Ads y Meta Ads?",
    a: "En D2C de descubrimiento (moda, belleza, suplementos, hogar) el reparto operativo en 2026 es 60-70% Meta, 20-30% Google y un 5-10% de reserva para tests. Si la marca ya tiene volumen de búsquedas (categoría conocida, marca con tracción), Google sube al 30-40%. Si el producto requiere educar al usuario antes de la compra, Meta domina hasta 75-80%. Lo que nunca recomendamos: 50/50 fijo. Cada categoría tiene un equilibrio óptimo y cambia según el momento de la marca.",
  },
  {
    q: "¿Qué tipo de campañas de Google Ads complementan mejor a Meta Ads en D2C?",
    a: "Tres capas obligatorias: 1) Marca + brand defense (ROAS típico >8, coste muy bajo, captura tráfico que Meta empuja). 2) Categorías top non-brand (ROAS 2-4x, vuelo medio, captura demanda informacional/transaccional). 3) Performance Max sólo cuando el feed de producto está limpio y hay >30 conversiones/mes — antes de eso suele canibalizar marca. Shopping estándar es la alternativa segura mientras PMax madura. La capa de Display y YouTube se evalúa cuando la base de Search ya rinde estable.",
  },
  {
    q: "¿Cómo evito que Google Ads y Meta Ads se atribuyan las mismas conversiones?",
    a: "El doble conteo es real y rompe la decisión de inversión. La solución operativa: 1) Mirar MER blended (ingresos totales / inversión paid total) en vez de ROAS por plataforma. 2) Excluir tráfico de marca del ROAS de Meta cuando se evalúa contribución incremental. 3) Hacer pause-tests trimestrales — apagar Google Brand 7 días y medir ingresos directos para validar incrementalidad real. 4) Configurar Conversions API y Enhanced Conversions en ambas plataformas para reducir discrepancias por tracking, no la atribución. La fuente de verdad operativa es siempre el MER, no el ROAS por canal.",
  },
  {
    q: "¿Tiene sentido activar Google Ads si todavía no tengo Meta Ads validado?",
    a: "Sólo Google Ads de marca, y aun así con presupuesto controlado. Activar Google non-brand sin Meta funcionando es invertir el orden natural: Google se alimenta de demanda y, si Meta no la genera, las búsquedas son escasas y los clics caros. La excepción son D2C en categorías con búsqueda madura (suplementos deportivos, decoración nicho, herramientas pro) donde la demanda existe sin necesidad de empujarla. En el 80% de D2C que vemos, validar Meta primero — 30 días con CAC objetivo estable — es el prerrequisito antes de invertir en Google non-brand.",
  },
  {
    q: "¿Qué KPI uso para saber si la combinación Google + Meta está funcionando?",
    a: "MER blended por encima de 3,5x sostenido durante 30 días con crecimiento de ingresos del 10-20% mes a mes es el patrón saludable. Si subes presupuesto y el MER cae más de 0,5 puntos manteniendo el CAC, has llegado al techo de uno de los canales y necesitas rebalancear. Otra señal clave: el porcentaje de búsquedas de marca en Google debería crecer en paralelo a la inversión en Meta — si Meta sube y Google brand no, la creatividad de Meta no está generando recuerdo de marca.",
  },
  {
    q: "¿Cuánto presupuesto mínimo necesito para combinar Google Ads y Meta Ads en serio?",
    a: "Suelo realista en 2026: 2.500-3.000€/mes de inversión total para que ambos canales tengan datos suficientes para salir de la fase de aprendizaje. Distribución típica de partida: 1.800-2.000€ Meta, 600-900€ Google (mayoría en marca + categorías top). Por debajo de 1.500€/mes total, cualquier reparto deja a uno de los canales subóptimo y la decisión de inversión se basa en ruido, no en señal. La capa de Performance Max o Display se incorpora a partir de 5.000€/mes total cuando los datos lo justifican.",
  },
];

const CombinarGoogleAdsMetaAdsD2CPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Cómo combinar Google Ads y Meta Ads en una estrategia D2C"
    description="Cómo combinar Google Ads y Meta Ads en un eCommerce D2C: rol de cada canal, distribución de presupuesto según madurez, qué tipo de campaña activar primero, doble atribución y KPIs blended para validar incrementalidad real. Con tabla operativa por fase y errores frecuentes."
    slug="combinar-google-ads-meta-ads-d2c"
    datePublished="2026-04-29"
    dateModified="2026-04-29"
    readingTime="9 min"
    category="Estrategia"
    keywords={["google ads meta ads juntos", "combinar google ads y meta ads", "estrategia google meta ecommerce", "google ads vs meta ads d2c", "presupuesto google meta ads"]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Combinar Google Ads y Meta Ads juntos</strong> en una estrategia D2C no es repartir presupuesto al 50/50 ni replicar las mismas campañas en dos canales. Es operar dos motores con funciones distintas: Meta empuja demanda en audiencias que aún no buscan, Google recoge la que ya existe. La gran mayoría de eCommerce D2C españoles que llegan estancados a 30-50K€/mes lo hacen por sobreinvertir en uno de los dos canales sin entender qué rol cumple en el embudo.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Este artículo es la lógica operativa que aplicamos en DayByDay para combinar ambos canales: qué se activa primero, cómo se reparte presupuesto según fase de madurez, cómo evitar la doble atribución y qué KPIs blended miran de verdad si el sistema funciona o estás regalando dinero a un canal por inercia.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">El rol real de cada canal en un D2C</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Antes del reparto de presupuesto, hay que entender qué resuelve cada plataforma. Confundir esto es la causa raíz del 80% de cuentas que no escalan:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Canal</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Función principal</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Tipo de demanda</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">ROAS típico D2C</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "Meta Ads", f: "Generar demanda nueva con creatividad en audiencias frías", d: "Latente / no consciente", r: "1,8-3,5x (TOFU) / 4-8x (BOFU)" },
            { c: "Google Search marca", f: "Capturar tráfico que ya escribe tu nombre", d: "Existente, alta intención", r: "8-15x" },
            { c: "Google Search non-brand", f: "Capturar demanda informacional/transaccional categoría", d: "Existente, intención media-alta", r: "2-4x" },
            { c: "Google Shopping / PMax", f: "Capturar comparadores y consultas de producto", d: "Existente, transaccional", r: "3-6x" },
            { c: "Google Display / YouTube", f: "Reforzar awareness y remarketing visual", d: "Mixta", r: "1,5-3x" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.f}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.d}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La regla operativa: Meta crea el mercado, Google lo cosecha. Cuando Meta funciona bien, las búsquedas de marca en Google crecen y la cuenta de Google brand se vuelve enormemente rentable casi por inercia. Sin Meta, Google se queda limitado al volumen actual de búsquedas — un techo bajo para casi cualquier D2C de descubrimiento.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Orden operativo: qué se activa primero</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      No tiene sentido lanzar Performance Max, Search non-brand y Meta Advantage+ a la vez. El orden que aplicamos en cuentas D2C nuevas:
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          num: "1",
          titulo: "Tracking server-side y Conversions API en ambos canales",
          desc: "Meta CAPI deduplicado y Google Enhanced Conversions activos antes de gastar un euro. La documentación oficial de Meta sobre la API de Conversiones es referencia obligatoria. Sin esto, los CAC reportados son ficción.",
        },
        {
          num: "2",
          titulo: "Meta Ads como motor de adquisición fría",
          desc: "Validar CAC objetivo en TOFU durante 30 días con 1-2 campañas Advantage+ Shopping + lookalike top LTV. Hasta que Meta no esté estable, Google non-brand no tiene volumen suficiente que cosechar.",
        },
        {
          num: "3",
          titulo: "Google Ads de marca + brand defense",
          desc: "Cuando Meta empieza a empujar, las búsquedas de tu marca crecen. Capturarlas con Search de marca tiene ROAS >8, coste muy bajo y bloquea a competidores que pujan por tu nombre. Es el primer canal Google que activamos siempre.",
        },
        {
          num: "4",
          titulo: "Google Shopping / Search categorías top",
          desc: "Tras 60-90 días de Meta + brand estables, abrimos Search non-brand de las 5-10 categorías que más convierten en orgánico/Meta. Empieza con Shopping estándar antes que Performance Max para no canibalizar marca.",
        },
        {
          num: "5",
          titulo: "Performance Max sólo con feed limpio y >30 conversiones/mes",
          desc: "PMax aprende rápido si el feed de producto y los assets son sólidos. Activarlo antes de tener señal suficiente lo convierte en una caja negra que canibaliza marca y atribuye conversiones que iban a llegar igual.",
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
      <a href="https://www.thinkwithgoogle.com/intl/en-emea/marketing-strategies/data-and-measurement/measurement-strategy-business-impact/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Think with Google</a> documenta esta misma lógica de capas: la combinación Search + Shopping + Demand Gen rinde mejor cuando se incorpora por orden y no en paralelo.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Distribución de presupuesto por fase de madurez</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Fase</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Meta Ads</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Google brand</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Google non-brand / Shopping</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">PMax / Display</th>
          </tr>
        </thead>
        <tbody>
          {[
            { f: "0-3 meses (validar)", m: "75-85%", gb: "10-15%", gnb: "0-5%", pm: "0%" },
            { f: "3-9 meses (escalar)", m: "60-70%", gb: "10-15%", gnb: "10-15%", pm: "5-10%" },
            { f: "9-18 meses (diversificar)", m: "55-65%", gb: "10%", gnb: "15-20%", pm: "10-15%" },
            { f: "Maduro (>18 meses)", m: "45-55%", gb: "8-10%", gnb: "20-25%", pm: "15-20%" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.f}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.gb}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.gnb}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.pm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Estas franjas son punto de partida, no dogma. Categorías con búsqueda madura (suplementos, decoración nicho) suben Google antes y más rápido. Categorías de descubrimiento puro (moda nueva marca, lifestyle emergente) viven más tiempo en proporciones 75-80% Meta. La <a href="https://www.shopify.com/blog/marketing-funnel" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de marketing funnel de Shopify</a> documenta patrones similares para D2C internacionales.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Doble atribución: el problema invisible que rompe el reparto</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Cuando Meta y Google funcionan en paralelo, ambas plataformas se atribuyen las mismas conversiones. Un usuario que descubre la marca en Meta, busca el nombre en Google y compra desde Search aparece como conversión 1 en Meta (last-touch reportado por Meta) y como conversión 1 en Google. La suma de ROAS por plataforma sobreestima el rendimiento real entre un 20% y un 40%.
    </p>
    <div className="space-y-3 mb-6">
      {[
        "MER blended (ingresos totales / inversión paid total) es la fuente de verdad. Por encima de 3,5x sostenido = sistema sano.",
        "Excluir tráfico de marca del ROAS reportado de Meta para evaluar incrementalidad TOFU real.",
        "Pause-test trimestral: apagar Google brand 7 días y medir caída de ingresos directos. Si la caída es <50% de los ingresos brand reportados, el canal está canibalizando.",
        "Post-purchase survey con la pregunta '¿dónde nos conociste?' cruzada con datos de plataforma — la única señal humana cuando iOS limita atribución.",
        "Geo-tests cuando hay >25K€/mes de inversión: apagar un canal en una región durante 14 días para medir incrementalidad real.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Errores que vemos repetir al combinar Google + Meta</h2>
    <div className="space-y-3 mb-6">
      {[
        "Activar Google Search non-brand antes de validar Meta TOFU — sin demanda empujada, los clics non-brand son caros y de baja intención.",
        "Lanzar Performance Max el primer mes con feed sin optimizar — canibaliza marca y reporta conversiones que iban a llegar igual.",
        "Mirar ROAS por plataforma y subir presupuesto al canal con ROAS más alto sin validar incrementalidad — casi siempre lleva a sobreinvertir en BOFU/Brand.",
        "No excluir tráfico de marca de las campañas Search non-brand — los costes por click se inflan y la atribución se distorsiona.",
        "Replicar las mismas creatividades en Meta y YouTube esperando rendimiento similar — los formatos exigen lógicas distintas. Lo que funciona en Reels rara vez funciona en YouTube preroll.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay la combinación Google + Meta</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      En las cuentas D2C que entran en gestión con sólo Meta activo, el plan de incorporar Google es siempre el mismo:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Semana 1 — Auditoría de tracking Google: GA4, Enhanced Conversions, exclusiones de marca, configuración de offline conversions si hay venta telefónica.",
        "Semana 2 — Activación de Google Search marca + brand defense con presupuesto controlado (5-10% del total). ROAS objetivo >8 desde día 1.",
        "Semana 4-6 — Apertura de Shopping estándar con feed optimizado en las 5-10 categorías top según datos de Meta. ROAS objetivo 3-4x.",
        "Semana 8-10 — Search non-brand sólo si Shopping ya rinde estable. Empezar por keywords transaccionales, no informacionales.",
        "Mes 4+ — Performance Max sólo cuando hay >30 conversiones/mes en Google y feed maduro. Antes, el algoritmo no tiene señal suficiente.",
        "Mensual — Revisión de MER blended, post-purchase survey y al menos un pause-test al trimestre para validar incrementalidad de cada canal.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      El resultado típico al final de los 90 días con Google integrado es MER blended que sube 0,4-0,8 puntos respecto a la base sólo-Meta y CAC blended estable o ligeramente más bajo. Si el MER no mejora al añadir Google, casi siempre significa que el reparto está mal calibrado o hay canibalización de marca no controlada.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Quieres calibrar el reparto Google + Meta para tu D2C?</p>
      <p className="text-white/50 text-sm mb-4">Auditamos el reparto actual, identificamos canibalización y te montamos el orden de incorporación con tus datos reales — no plantillas genéricas.</p>
      <button
        onClick={openCalendly}
        className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm"
      >
        Solicitar análisis gratuito →
      </button>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Artículos relacionados</h2>
    <div className="space-y-3">
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/estrategia-full-funnel-d2c" className="text-white font-semibold hover:text-white/80">
          Estrategia full funnel D2C: del frío al cliente recurrente →
        </Link>
        <p className="text-white/40 text-xs mt-1">El sistema completo más allá de Meta + Google: paid + email/WhatsApp + retención y KPIs blended</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/meta-ads-vs-google-ads" className="text-white font-semibold hover:text-white/80">
          Meta Ads vs Google Ads: cuál elegir según tu eCommerce →
        </Link>
        <p className="text-white/40 text-xs mt-1">Comparativa profunda canal a canal cuando todavía estás eligiendo, no combinando</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/performance-max-vs-meta-ads-espana" className="text-white font-semibold hover:text-white/80">
          Performance Max vs Meta Ads: ¿cuál funciona mejor en España? →
        </Link>
        <p className="text-white/40 text-xs mt-1">Rol real de PMax en el mix Google + Meta, presupuesto mínimo y canibalización de marca</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/performance-max-ecommerce-d2c-cuando-usar" className="text-white font-semibold hover:text-white/80">
          Performance Max para D2C: cuándo activarla y cómo medir si funciona →
        </Link>
        <p className="text-white/40 text-xs mt-1">Condiciones mínimas (>30 conv/mes, feed limpio), modelo híbrido y holdout geo trimestral</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cuanto-invertir-meta-ads-calculadora" className="text-white font-semibold hover:text-white/80">
          Cuánto invertir en Meta Ads según tu ticket y margen →
        </Link>
        <p className="text-white/40 text-xs mt-1">Fórmula operativa para fijar el presupuesto Meta dentro del reparto blended</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-ecommerce-d2c-100k-1m-paid-media" className="text-white font-semibold hover:text-white/80">
          Cómo escalar un eCommerce D2C de 100K a 1M€ con paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">Sistema de escalado por hitos cuando Meta + Google ya rinden combinados</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default CombinarGoogleAdsMetaAdsD2CPage;
