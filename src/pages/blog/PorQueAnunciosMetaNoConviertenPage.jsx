import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Por qué mis anuncios de Meta tienen muchos clics pero no convierten?",
    a: "Cuando hay clics y no hay ventas, el problema casi nunca está en la creatividad — está entre el clic y el carrito. En el 70% de las auditorías que hacemos en DayByDay encontramos una de tres causas: (1) tracking incompleto que sí mide clics pero no conversiones (píxel sin Conversions API server-side, eventos duplicados o sin deduplicar); (2) landing page con fricción real — velocidad >3s en móvil, texto que no continúa la promesa del anuncio, formulario de checkout largo; (3) audiencia demasiado fría para el ticket medio. Antes de tocar el creativo, audita esas tres capas con datos de Shopify y GA4, no solo con el dashboard de Meta.",
  },
  {
    q: "¿Cuántos días debo esperar antes de pausar un anuncio de Meta que no convierte?",
    a: "El umbral operativo es: 3 × CPA objetivo gastado sin una sola conversión, con un mínimo de 5-7 días en activo. Por debajo de eso, la fase de aprendizaje del algoritmo no ha terminado y matar el adset destruye el learning. Por encima, mantenerlo es tirar presupuesto. Si tu CPA objetivo es 30€, después de 90€ gastados sin conversión el anuncio se mata. Si llegas a 1-2 conversiones, se mantiene 7 días más en observación; si no consolida CPA dentro del rango, se mata también.",
  },
  {
    q: "¿Mis anuncios de Meta han dejado de funcionar de repente, qué puede haber pasado?",
    a: "Cinco causas explican el 90% de las caídas bruscas: (1) fatiga creativa — frecuencia >4 en audiencias frías sin nuevos creativos; (2) cambios estructurales recientes (subida de presupuesto >30%, nueva audiencia, cambio de optimización) que rompen la fase de aprendizaje; (3) actualización de iOS/Android que afecta atribución y modelado de conversiones; (4) problema de tracking (Conversions API caída, hash de eventos roto, cambio en el checkout de Shopify); (5) competencia agresiva subiendo CPM en tu sector. Antes de intervenir, revisa frecuencia, registro de cambios de los últimos 14 días y estado de la API de Conversiones — en ese orden.",
  },
  {
    q: "¿Cómo saber si el problema son los anuncios o la web?",
    a: "Mira tres ratios. (1) CTR exterior (link click): si está por debajo del 0,8-1% en feed, el problema es la creatividad o la audiencia. (2) Tasa de carga de la landing (View Content / Link Click): si es <70%, hay un problema técnico o de velocidad. (3) Tasa de conversión de landing (Add to Cart / View Content y Purchase / Add to Cart): si la primera está bien y la segunda mal, el problema es checkout o precio percibido; si ambas están mal, es la landing. La regla operativa: si el CTR es bueno y el CVR de landing es bajo, el cuello de botella no son los anuncios.",
  },
  {
    q: "¿Cuánto debo invertir mínimo para que un anuncio de Meta funcione?",
    a: "El umbral operativo es 3-5 × CPA objetivo por adset durante 5-7 días para tener una señal accionable. Para un D2C con CPA objetivo 25-40€, eso significa 20-30€/día por adset, mínimo 4 adsets activos en paralelo, lo que sitúa el suelo realista en 800-1.200€/mes solo en pruebas. Por debajo de 500€/mes en Meta Ads, los datos están dominados por el azar — el algoritmo no tiene volumen para encontrar señal. Esto no es opinión: es la consecuencia matemática de necesitar un mínimo de 50 conversiones por adset para salir de la fase de aprendizaje.",
  },
  {
    q: "¿Qué hago si los anuncios funcionan en el panel de Meta pero las ventas no aparecen en Shopify?",
    a: "Es el síntoma clásico de discrepancia de atribución. En 2026, el ROAS reportado por Meta sobreestima el real entre un 20% y un 35% en cuentas D2C españolas. Soluciones: (1) implementa Conversions API server-side bien deduplicada con el píxel — corrige hasta 15 puntos de discrepancia; (2) usa el MER (ingresos totales / inversión total) como métrica de verdad, no el ROAS de plataforma; (3) revisa la ventana de atribución — Meta muestra por defecto 7 días click + 1 día view, lo que reduplica conversiones que vendrían de otros canales. Si la discrepancia es >40%, hay un problema técnico, no de atribución.",
  },
  {
    q: "¿Pueden funcionar los anuncios de Meta para un eCommerce D2C con producto caro (>150€)?",
    a: "Sí, pero el setup cambia respecto a tickets bajos. Tres ajustes obligatorios: (1) ventana de atribución más larga (7d click + 7d view, no 1d view) porque el ciclo de decisión es mayor; (2) full-funnel obligatorio — TOFU informativo, MOFU comparativo, BOFU oferta — no se puede ir directo a venta como con un producto de 30€; (3) email/WhatsApp como segundo touchpoint capturando leads del primer impacto. En las cuentas D2C que llevamos con ticket >150€ (suplementos premium, hogar, moda diseño), el CAC es 2-4x más alto que en ticket bajo, pero el LTV compensa cuando hay repetición de compra.",
  },
  {
    q: "¿Es mejor pausar y relanzar un anuncio que no funciona o solo cambiar la creatividad?",
    a: "Depende de la causa. Si el adset llevaba conversiones aceptables y ha caído por fatiga (frecuencia >4, CTR bajando), se rota la creatividad dentro del mismo adset para conservar el learning. Si nunca ha funcionado (>3 × CPA sin conversiones), pausar y relanzar dentro de la misma campaña con un brief creativo distinto. Lo que destruye más rendimiento es el patrón intermedio: cambiar audiencia y creatividad al mismo tiempo dentro del mismo adset — pierdes la capacidad de saber qué variable era el problema. La regla: una variable cambiada por intervención.",
  },
];

const PorQueAnunciosMetaNoConviertenPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Por qué tus anuncios de Meta no convierten (y cómo solucionarlo)"
    description="Diagnóstico paso a paso para entender por qué tus anuncios de Meta no convierten: tracking, landing, audiencia, creatividad y estructura de campaña. Con tabla de causas reales, métricas de diagnóstico y protocolo de intervención sin romper el aprendizaje del algoritmo."
    slug="por-que-anuncios-meta-no-convierten"
    datePublished="2026-04-28"
    dateModified="2026-04-28"
    readingTime="9 min"
    category="Meta Ads"
    keywords={["anuncios meta no funcionan", "por qué meta ads no convierte", "anuncios facebook no convierten", "diagnóstico meta ads", "meta ads sin ventas"]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Cuando los anuncios de Meta no convierten</strong>, la primera reacción suele ser equivocada: cambiar el creativo. Lo hemos visto en cientos de auditorías. En la mayoría de los casos, el problema no está en lo que ve el usuario, sino en lo que ocurre entre el clic y el carrito — tracking roto, landing lenta, audiencia desalineada con el ticket, o estructura de campaña que impide salir de la fase de aprendizaje.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Este artículo es el protocolo de diagnóstico que aplicamos en DayByDay antes de tocar nada en una cuenta nueva con problemas de conversión. El objetivo no es darte 10 trucos genéricos: es darte el orden correcto en el que mirar cada capa del sistema para identificar cuál es el cuello de botella real, con datos de Shopify y de plataforma cruzados, no con la sensación de que "algo no va".
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 5 causas reales por las que un anuncio de Meta no convierte</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      En 2026, el 90% de los problemas de conversión que encontramos en Meta Ads se explican por una de estas cinco causas. La probabilidad de cada una varía según el sector y el ticket medio, pero el orden de revisión es siempre el mismo — y empieza por las más baratas de detectar.
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Causa</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Síntoma típico</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Frecuencia en auditorías</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "Tracking incompleto o roto", s: "Clics altos, conversiones a 0 o muy por debajo de Shopify", f: "70%" },
            { c: "Landing page con fricción", s: "CTR normal pero View Content / Link Click <70%", f: "55%" },
            { c: "Audiencia desalineada con el ticket", s: "CTR bajo (<0,8%) y CPM elevado por sector", f: "35%" },
            { c: "Fatiga creativa", s: "Frecuencia >4 en audiencias frías, CTR cayendo 30%+ en 14 días", f: "45%" },
            { c: "Estructura de campaña inestable", s: "CPA con varianza >40% semana a semana, fase de aprendizaje permanente", f: "40%" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-medium text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/70 text-xs">{row.f}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Las cuentas problemáticas suelen tener 2-3 causas activas a la vez. Tocar el creativo cuando el problema es tracking solo añade ruido. Por eso el orden de diagnóstico importa.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Capa 1 — Tracking: la causa más común y la más infravalorada</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Antes de mirar nada más, el tracking tiene que estar limpio. Sin datos correctos, todas las decisiones siguientes son ruido. La <a href="https://developers.facebook.com/docs/marketing-api/conversions-api" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial de Meta sobre la API de Conversiones</a> establece que el setup recomendado para 2026 es híbrido (píxel cliente + Conversions API server-side) con deduplicación por event_id. Sin esto, se pierde entre un 15% y un 25% de las conversiones reales en iOS.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Lista mínima de comprobación de tracking antes de declarar que un anuncio "no funciona":
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Píxel + Conversions API activos y deduplicados con event_id consistente. Sin esto, Meta optimiza con datos parciales en iOS 17/18.",
        "Eventos críticos validados en Events Manager: PageView, ViewContent, AddToCart, InitiateCheckout, Purchase. Si falta uno, la atribución del funnel se rompe.",
        "Match Quality del evento Purchase ≥7,5/10. Por debajo, Meta no encuentra al usuario y no puede atribuir.",
        "Cruce manual: ventas atribuidas en Meta vs ventas con utm_source=meta en Shopify durante 7 días. Diferencia esperada: 15-30%. Si es >40%, hay un problema técnico, no de atribución.",
        "Configuración de eventos web con priorización correcta (Aggregated Event Measurement) — máximo 8 eventos por dominio.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Capa 2 — Landing page: el cuello de botella invisible</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Según <a href="https://www.thinkwithgoogle.com/intl/es-es/futuro-del-marketing/experiencia-digital/page-speed-mobile-conversion/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Think with Google</a>, cada segundo adicional de carga en móvil reduce la tasa de conversión hasta un 20%. En las auditorías que hacemos, las landing pages D2C españolas tardan de media 4-6 segundos en cargar — duplicando el umbral recomendado de 2,5s.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Los puntos de fuga más caros en una landing de eCommerce D2C:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Velocidad móvil >3s (medida con PageSpeed Insights, no con tu wifi). Cada 500ms adicionales sobre 2,5s pierde un 5-10% del CVR.",
        "Hero que no continúa la promesa del anuncio. Si el ad dice '50% off primera compra' y la landing no lo muestra above the fold, la fricción es brutal.",
        "Checkout largo (>3 pasos) o que pide registro obligatorio. Activar Shop Pay en Shopify reduce abandono entre un 30% y un 50% en mercados maduros.",
        "Falta de prueba social cerca del CTA. Reseñas, valoraciones y trust badges visibles antes de añadir al carrito mueven la aguja, no como decoración.",
        "Costes de envío revelados solo en el checkout. La transparencia previa reduce hasta un 40% del abandono según el Baymard Institute.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Diagnóstico rápido: si el ratio Add to Cart / View Content es {"<"}5%, el problema es la página de producto (precio, prueba social, copy, hero). Si es bueno (8-15%) pero Purchase / Add to Cart es {"<"}15%, el problema está en el checkout (envíos, fricción, métodos de pago).
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Capa 3 — Audiencia y oferta: el match que casi nadie audita</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Una audiencia muy fría con un producto de ticket alto no convierte por mucho que el creativo sea bueno. La oferta tiene que estar calibrada al momento del usuario en el funnel. Errores que vemos en auditorías:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Audiencia 100% fría apuntada a la ficha de producto en lugar de a una landing de captación o un advertorial. Para tickets >80€, esto rara vez convierte.",
        "Lookalikes construidos sobre eventos pobres (page views) en lugar de sobre clientes con LTV alto. Un LAL al 1% sobre top 10% LTV bate a un LAL al 5% sobre Purchase total.",
        "Oferta sin urgencia ni motivo de compra hoy. Una oferta evergreen genérica convierte peor que una oferta calibrada al evento (lanzamiento, restock, edición limitada).",
        "Misma oferta para retargeting que para frío. El retargeting de carrito abandonado debería tener un código exclusivo o un beneficio que el TOFU no tiene.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Capa 4 — Creatividad: revisar solo cuando las anteriores están limpias</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Si tracking, landing y audiencia están bien y los anuncios siguen sin convertir, el problema es la creatividad. Las dos métricas que diagnostican fatiga o mal fit creativo en menos de 7 días:
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          num: "1",
          titulo: "Hook Rate (3-second video views / impresiones)",
          desc: "Por debajo del 25-30% en feed, la creatividad no para el scroll. El problema está en los primeros 3 segundos: gancho visual, copy o premisa. Cambiar el final del vídeo no soluciona un mal hook.",
        },
        {
          num: "2",
          titulo: "Hold Rate (15s o ThruPlay / 3s views)",
          desc: "Por debajo del 15-20%, el contenido no sostiene la atención. El hook funciona pero el cuerpo del mensaje no construye argumento de venta. Suele requerir reescritura del guion, no del hook.",
        },
        {
          num: "3",
          titulo: "CTR exterior (link clicks / impresiones)",
          desc: "Por debajo del 0,8% en feed, hay desconexión entre la creatividad y la oferta. Por encima del 1,5% con CVR de landing bajo, el creativo está sobre-prometiendo.",
        },
        {
          num: "4",
          titulo: "Frecuencia y CPM en 14 días",
          desc: "Frecuencia >4 con CPM subiendo un 20%+ es fatiga creativa: la audiencia está saturada. Solución: rotar creatividades, no pausar el adset (perderías el learning acumulado).",
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

    <h2 className="text-2xl font-black mt-10 mb-4">Capa 5 — Estructura: el error que rompe el aprendizaje del algoritmo</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      La <a href="https://www.facebook.com/business/help/112167992830700" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación de Meta sobre la fase de aprendizaje</a> es clara: un adset necesita mínimo 50 conversiones en su ventana de optimización (típicamente 7 días) para salir del learning. Cuentas que no convierten suelen tener una de estas patologías estructurales:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Demasiados adsets activos con presupuesto bajo (<10€/día). Ninguno reúne las 50 conversiones semanales necesarias y todos se quedan eternamente en aprendizaje.",
        "Cambios estructurales semanales (audiencia, optimización, presupuesto >30%) que reinician la fase de aprendizaje cada semana. El algoritmo nunca llega a estabilizar.",
        "TOFU, MOFU y BOFU mezclados en la misma campaña. Imposible saber qué capa funciona y la atribución se cruza dentro de la propia cuenta.",
        "Optimización por evento pobre (Add to Cart en lugar de Purchase) en cuentas con volumen suficiente para optimizar a Purchase. Trae carritos baratos pero no clientes.",
        "Sin separación entre adquisición y retargeting — el retargeting infla el ROAS de plataforma y te oculta que el TOFU no funciona.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay un diagnóstico de "Meta no convierte"</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El protocolo que seguimos cuando una cuenta llega con la queja de "los anuncios no convierten" tiene 5 pasos ordenados, sin saltar ninguno:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Día 1 — Auditoría de tracking: validamos píxel + Conversions API, deduplicación, Match Quality, eventos críticos y discrepancia Meta vs Shopify durante 7 días reales.",
        "Día 2 — Análisis de landing y checkout: PageSpeed móvil, ratios View Content / Link Click y Purchase / Add to Cart, fricción visible en checkout. Identificamos los 2-3 puntos con mayor impacto.",
        "Día 3 — Cruce de audiencia y oferta: revisamos si la audiencia y la oferta están alineadas con el ticket medio y el momento de funnel. Detectamos lookalikes mal construidos y ofertas sin urgencia.",
        "Día 4 — Análisis creativo: Hook Rate, Hold Rate, CTR, frecuencia y CPM por creativo. Identificamos cuáles están agotados y cuáles nunca arrancaron.",
        "Día 5 — Restructura: simplificamos campañas, separamos TOFU/retargeting, fijamos presupuesto suficiente por adset para superar la fase de aprendizaje. Roadmap de 30 días con un solo cambio estructural por semana.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      En las cuentas D2C que han llegado a DayByDay con problemas de conversión, en el 80% de los casos la causa principal estaba en las capas 1 o 2 (tracking o landing), no en la creatividad. Cambiar creativos sin auditar tracking primero es lo que más presupuesto destruye en eCommerce español.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tus anuncios de Meta no convierten y no sabes por qué?</p>
      <p className="text-white/50 text-sm mb-4">Auditamos tu cuenta gratis: tracking, landing, audiencia, creatividades y estructura. Te decimos exactamente cuál de las 5 capas es el cuello de botella.</p>
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
        <p className="text-white/40 text-xs mt-1">El orden correcto para activar tracking, estructura, creatividad y landing cuando la cuenta no rinde</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/metricas-meta-ads-importantes-ecommerce" className="text-white font-semibold hover:text-white/80">
          Métricas Meta Ads que importan de verdad (y las que no) →
        </Link>
        <p className="text-white/40 text-xs mt-1">MER, CPA real y nCPA — las métricas que diagnostican un problema de conversión real vs uno de atribución</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/checklist-auditoria-campanas-paid-media" className="text-white font-semibold hover:text-white/80">
          Checklist para auditar tus campañas de paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">Lista completa de validación antes de aceptar el diagnóstico de "los anuncios no funcionan"</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/creative-testing-meta-ads" className="text-white font-semibold hover:text-white/80">
          Creative Testing en Meta Ads: framework para encontrar ganadores →
        </Link>
        <p className="text-white/40 text-xs mt-1">Si el problema es creativo, el sistema de validación que produce ganadores en menos de 14 días</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default PorQueAnunciosMetaNoConviertenPage;
