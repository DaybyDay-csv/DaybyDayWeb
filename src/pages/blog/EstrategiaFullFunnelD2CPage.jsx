import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es una estrategia full funnel para un eCommerce D2C?",
    a: "Una estrategia full funnel para D2C es el sistema de adquisición y retención que cubre las cuatro fases del recorrido del cliente: descubrimiento (frío), consideración, conversión y recompra. No se limita a Meta Ads — combina paid media (Meta + Google + TikTok), tráfico orgánico (SEO + redes), email/WhatsApp y retención post-compra. La diferencia con un enfoque sólo de paid es que el full funnel D2C optimiza el LTV completo, no únicamente el CAC del primer pedido.",
  },
  {
    q: "¿Cuál es la diferencia entre full funnel en Meta Ads y full funnel D2C completo?",
    a: "El full funnel en Meta Ads se queda dentro de la plataforma — TOFU/MOFU/BOFU vía Meta. El full funnel D2C es un nivel por encima: Meta es el motor de adquisición, pero Google Ads cubre demanda existente, email/WhatsApp construye recompra y SEO/contenido reduce dependencia del coste por click. Una marca D2C que sólo escala vía Meta tiene un techo claro: cuando la audiencia satura, el CAC se dispara. El full funnel D2C diluye ese riesgo distribuyendo presupuesto y atención entre adquisición fría, retención y demanda capturada.",
  },
  {
    q: "¿Por dónde empiezo si mi D2C todavía no tiene full funnel montado?",
    a: "El orden que aplicamos: 1) Validar tracking (Conversions API + GA4 + atribución por canal). 2) Activar adquisición pura en Meta hasta validar CAC objetivo. 3) Montar email/WhatsApp con flujos básicos (bienvenida, carrito abandonado, post-compra). 4) Añadir Google Ads de marca + categorías top. 5) Cuando el motor está estable, abrir TikTok o capa de contenido orgánico para diluir CAC. Saltarse el paso 1 invalida todo lo demás: sin tracking, no sabes qué canal está aportando incrementalidad real.",
  },
  {
    q: "¿Cuánto presupuesto necesito para una estrategia full funnel D2C en España?",
    a: "Suelo realista en 2026: 2.500-4.000€/mes de inversión publicitaria total para empezar a operar full funnel sin que ningún canal quede subóptimo. Distribución de partida: 60-70% Meta, 20-25% Google (marca + brand defense + categorías top), 5-10% reserva para test de TikTok o capa adicional. Por debajo de 2.000€/mes no hay datos suficientes para que ningún canal salga de la fase de aprendizaje. El email/WhatsApp no entra en esta cifra — es coste fijo de plataforma (Klaviyo, Brevo) que ronda 50-300€/mes según base.",
  },
  {
    q: "¿Cómo mido si mi estrategia full funnel está funcionando o no?",
    a: "Tres KPIs blended (no por canal): MER (ingresos totales / inversión paid total) > 3,5 en cuentas que escalan; CAC blended (inversión paid / clientes nuevos del periodo) en línea con LTV-180d para ratio LTV/CAC ≥3:1; tasa de recompra a 90 días >25% para validar que la capa de retención funciona. Mirar ROAS por canal aislado lleva a sobreinvertir en BOFU (que infla ROAS reportado pero no aporta clientes nuevos). El MER y el CAC blended son la fuente de verdad.",
  },
  {
    q: "¿Cómo afecta iOS 14+ y la pérdida de tracking a una estrategia full funnel D2C?",
    a: "Reduce la precisión de atribución por canal entre un 20% y un 35% según sector. La consecuencia operativa es que las decisiones de presupuesto se toman cada vez más sobre métricas blended (MER, CAC blended, post-purchase survey) y menos sobre ROAS por plataforma. Un full funnel D2C bien montado en 2026 incluye Conversions API server-side, GA4 con eventos custom, post-purchase survey ('¿dónde nos conociste?') y, en cuentas que invierten >15K€/mes, modelos de marketing mix simplificados. Sin esa capa, escalar a ciegas es la norma.",
  },
  {
    q: "¿Cuál es el error más común al implementar full funnel en un D2C?",
    a: "Empezar por la capa de retargeting/BOFU sin haber validado adquisición fría. La cuenta queda atrapada en un bucle: el ROAS reportado parece bueno porque el BOFU recoge usuarios que iban a comprar igual, pero el negocio no crece porque no entran clientes nuevos. La señal de alarma es MER blended >5 con crecimiento de ingresos plano. La regla operativa: hasta que la capa TOFU no genere CAC objetivo de forma estable durante 30 días, BOFU/MOFU son maquillaje, no motor.",
  },
];

const EstrategiaFullFunnelD2CPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Estrategia full funnel D2C: del frío al cliente recurrente"
    description="Cómo montar una estrategia full funnel real para un eCommerce D2C en España: paid media (Meta + Google), email/WhatsApp y retención. Suelo de presupuesto, distribución por canal, KPIs blended y orden operativo de implementación."
    slug="estrategia-full-funnel-d2c"
    datePublished="2026-04-29"
    dateModified="2026-04-29"
    readingTime="9 min"
    category="Estrategia"
    keywords={["estrategia full funnel D2C", "full funnel ecommerce", "funnel adquisición D2C", "embudo conversión ecommerce", "estrategia paid media D2C"]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      Una <strong className="text-white">estrategia full funnel D2C</strong> no es lanzar Meta Ads en TOFU/MOFU/BOFU. Eso es full funnel dentro de Meta. El full funnel real de un eCommerce D2C cubre cuatro capas — descubrimiento, consideración, conversión y recompra — combinando paid media (Meta + Google + TikTok), email/WhatsApp y SEO. Las cuentas que escalan en España de 100K a 1M€ no lo hacen estirando una sola plataforma; lo hacen montando un sistema donde cada canal cumple un rol específico y los KPIs se miden blended, no por canal.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Este artículo es el orden operativo que aplicamos en DayByDay para montar full funnel D2C: qué canal entra primero, cómo se distribuye el presupuesto, qué KPIs validan que funciona y los errores que vemos repetir cada mes en cuentas que llegan estancadas.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Las cuatro capas del full funnel D2C (más allá de Meta)</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El error de partida más habitual es asumir que full funnel = Meta Ads en distintas fases. La realidad operativa de un D2C español que escala:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Capa</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Objetivo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Canal principal</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">KPI clave</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "Descubrimiento", o: "Generar demanda en audiencia fría", ch: "Meta Advantage+ / lookalike + TikTok orgánico", k: "CPM, CTR, CAC frío" },
            { c: "Consideración", o: "Cualificar visitantes y educar", ch: "Meta MOFU + SEO / blog + email lead-magnet", k: "Lead-to-cart, view-to-add" },
            { c: "Conversión", o: "Cerrar la primera compra", ch: "Google Ads (marca + categoría) + Meta BOFU + carrito abandonado email/WhatsApp", k: "CAC blended, conv. rate" },
            { c: "Recompra", o: "Aumentar LTV y diluir CAC", ch: "Email post-compra + WhatsApp + suscripción + retargeting cliente", k: "LTV-180d, recompra 90d, MER" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.o}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.ch}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.k}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La fricción crítica está entre conversión y recompra. La mayoría de D2C españoles que llegan estancados invierten 80-90% de la atención en las dos primeras capas y dejan email/WhatsApp en automático con un par de flujos genéricos. Resultado: CAC creciente, LTV plano y techo de escala.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Orden operativo: qué canal montar primero (y por qué)</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      No tiene sentido activar TikTok Ads, Google Performance Max y email automation en paralelo si la base no está. El orden que aplicamos en cuentas D2C nuevas:
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          num: "1",
          titulo: "Tracking server-side antes que cualquier campaña",
          desc: "Pixel + Conversions API deduplicados, GA4 con eventos custom, discrepancia Meta vs Shopify <30%. Si esto está roto, todos los CAC reportados son ficción y cualquier decisión de escalado es ciega. La documentación oficial de Meta sobre la API de Conversiones es la referencia obligatoria aquí.",
        },
        {
          num: "2",
          titulo: "Meta Ads como motor de adquisición fría",
          desc: "Es el canal con mayor capacidad de generar demanda en D2C de descubrimiento (moda, belleza, suplementos, hogar). Validar CAC objetivo en TOFU antes de pasar a la siguiente capa: 30 días con CAC dentro de rango es el suelo para considerar la base estable.",
        },
        {
          num: "3",
          titulo: "Email + WhatsApp para captura y carrito abandonado",
          desc: "Con tráfico ya entrando, los flujos básicos (bienvenida, carrito, post-compra) levantan 8-15% de los ingresos sin coste variable. Sin email funcionando, el dinero invertido en MOFU/BOFU paga doble.",
        },
        {
          num: "4",
          titulo: "Google Ads de marca + brand defense",
          desc: "Cuando Meta empieza a generar demanda, las búsquedas de tu marca crecen. No capturarlas con Google Ads de marca es regalar conversiones a competidores que pujan por tu nombre. Coste bajo, ROAS muy alto, y bloquea defensa.",
        },
        {
          num: "5",
          titulo: "Capa adicional (TikTok, Performance Max, contenido orgánico)",
          desc: "Sólo cuando los pasos 1-4 están en régimen estable. Abrir un canal nuevo antes diluye atención y presupuesto, y suele resultar en dos canales subóptimos en lugar de uno dominado.",
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
      La <a href="https://www.shopify.com/blog/marketing-funnel" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de marketing funnel de Shopify</a> describe esta misma lógica: capa de adquisición + capa de retención + medición blended es el patrón estándar para D2C que escala con paid media.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Distribución de presupuesto recomendada por fase de madurez</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Fase</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Meta Ads</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Google Ads</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">TikTok / otros</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Reserva test</th>
          </tr>
        </thead>
        <tbody>
          {[
            { f: "0-3 meses (validar)", m: "75-85%", g: "10-15% (sólo marca)", t: "0%", r: "5-10%" },
            { f: "3-9 meses (escalar)", m: "60-70%", g: "20-25%", t: "5-10%", r: "5%" },
            { f: "9-18 meses (diversificar)", m: "50-60%", g: "20-25%", t: "10-15%", r: "5-10%" },
            { f: "Mantenimiento maduro", m: "45-55%", g: "20-30%", t: "10-20%", r: "5-10%" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.f}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.g}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.t}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">KPIs blended: la fuente de verdad cuando hay 3+ canales</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Cuando el full funnel está activo en 3 o más canales, mirar ROAS por plataforma deja de ser útil — todos los canales se atribuyen las mismas conversiones. Las métricas que validan que el sistema funciona:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "MER (ingresos totales / inversión paid total): >3,5 en cuentas que escalan, >5 en cuentas con mucha recompra orgánica. Si baja al subir presupuesto, la última subida no fue productiva.",
        "CAC blended: inversión paid total / clientes nuevos del mes. Es el coste real de adquirir un cliente, sin doble contar entre canales.",
        "Tasa de recompra a 90 días: >25% en D2C consumible, >15% en producto único. Por debajo, la capa de retención no funciona y el negocio depende 100% del paid.",
        "LTV-180d: los seis primeros meses son el horizonte realista para validar unit economics. Trabajar con LTV anual sobreestima.",
        "Contribución incremental por canal vía geo-test o pause-test trimestral: la única forma honesta de saber qué canal aporta de verdad cuando el tracking está limitado por iOS.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Errores que vemos repetir en full funnel D2C</h2>
    <div className="space-y-3 mb-6">
      {[
        "Activar BOFU/retargeting antes de validar adquisición fría — el ROAS reportado parece bueno pero no entran clientes nuevos.",
        "Dejar email/WhatsApp en piloto automático con flujos genéricos — la capa de retención es la que dilata el LTV, sin ella el CAC va a estrangular el negocio.",
        "Activar TikTok Ads sin haber estabilizado Meta — abrir un canal nuevo cuando el primero todavía no aporta CAC objetivo es duplicar problemas.",
        "Mirar ROAS por canal en vez de MER blended — sobreinvierte en BOFU y oculta dónde está la incrementalidad real.",
        "Asumir que full funnel = más campañas activas. Cuando hay >12 campañas paralelas, el algoritmo se canibaliza a sí mismo. Menos es más.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay el full funnel D2C</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Cuando entra una marca D2C nueva en gestión, la primera fase no es lanzar campañas — es montar el sistema. En las cuentas que escalan con nosotros la secuencia de los primeros 90 días sigue siempre el mismo orden:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Semana 1-2 — Auditoría de tracking: Conversions API, GA4, eventos custom, discrepancia Meta vs Shopify. Cualquier escalado a partir de aquí descansa en este paso.",
        "Semana 2-4 — Validación de Meta Ads en TOFU: 1-2 campañas Advantage+ Shopping + lookalike top LTV. Objetivo: CAC objetivo estable durante 30 días.",
        "Semana 3-6 — Activación de email/WhatsApp con flujos básicos: bienvenida (3 emails), carrito abandonado (2 emails + 1 WhatsApp), post-compra (2 emails + cross-sell). Apunta a +10-15% ingresos no atribuibles a paid.",
        "Semana 5-8 — Google Ads marca + brand defense + categorías top. ROAS típicamente >8 en marca, >3 en categorías.",
        "Semana 8-12 — Apertura de capa adicional (TikTok o capa MOFU específica) sólo si MER blended >3,5 y CAC objetivo respetado.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      El resultado típico al final de los 90 días es un sistema con 3 canales activos, MER blended estable en 3,5-4,5x, recompra >25% y un techo de escala identificado por capa, no por intuición. Sin esto, escalar inversión es como pisar el acelerador con los ojos cerrados.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Quieres una hoja de ruta full funnel para tu D2C?</p>
      <p className="text-white/50 text-sm mb-4">Te montamos el orden de implementación, distribución de presupuesto y KPIs blended con tus datos reales — no plantillas genéricas.</p>
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
        <Link to="/blog/estrategia-full-funnel-meta-ads-d2c" className="text-white font-semibold hover:text-white/80">
          Estrategia full funnel dentro de Meta Ads (TOFU / MOFU / BOFU) →
        </Link>
        <p className="text-white/40 text-xs mt-1">El zoom dentro de Meta: cómo estructurar las tres capas con audiencias, formatos y presupuestos por fase</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-ecommerce-d2c-100k-1m-paid-media" className="text-white font-semibold hover:text-white/80">
          Cómo escalar un eCommerce D2C de 100K a 1M€ con paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">Sistema de escalado, hitos por fase y cuándo activar cada canal sin romper rentabilidad</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cac-vs-ltv-ecommerce-escalable" className="text-white font-semibold hover:text-white/80">
          CAC vs LTV: la métrica que define si tu D2C es escalable →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué la capa de retención del full funnel es la que dilata LTV y permite seguir subiendo CAC</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cuanto-invertir-meta-ads-calculadora" className="text-white font-semibold hover:text-white/80">
          Cuánto invertir en Meta Ads según tu ticket y margen (con calculadora) →
        </Link>
        <p className="text-white/40 text-xs mt-1">Fórmula operativa para fijar presupuesto Meta y suelo mínimo realista por ticket medio</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/combinar-google-ads-meta-ads-d2c" className="text-white font-semibold hover:text-white/80">
          Cómo combinar Google Ads y Meta Ads en una estrategia D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Rol de cada canal, orden de activación y reparto de presupuesto entre Meta y Google por fase de madurez</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default EstrategiaFullFunnelD2CPage;
