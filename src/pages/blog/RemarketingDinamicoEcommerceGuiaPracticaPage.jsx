import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es el remarketing dinámico y en qué se diferencia del retargeting normal?",
    a: "El remarketing dinámico (DPA en Meta, Dynamic Remarketing en Google) muestra automáticamente a cada usuario los productos exactos que vio, añadió al carrito o miró en categorías relacionadas, en lugar de un creativo genérico. El retargeting estándar enseña el mismo anuncio a todo el público que visitó el sitio. La diferencia operativa es enorme: el dinámico requiere un catálogo de productos sincronizado y eventos detallados (ViewContent, AddToCart, Purchase con product_id), pero a cambio multiplica el CTR 2-3x y baja el CPA 30-50% en cuentas D2C con catálogo >50 SKUs. Si tu eCommerce tiene catálogo de 5 productos no compensa el setup; a partir de 30-40 SKUs es la palanca BOFU más rentable.",
  },
  {
    q: "¿Qué necesito para arrancar remarketing dinámico en Meta Ads?",
    a: "Cuatro piezas mínimas: (1) Catálogo en Meta Commerce Manager sincronizado vía feed (Shopify, WooCommerce, BigCommerce tienen integración nativa) o feed CSV/XML actualizado al menos cada 24h; (2) Píxel + API de Conversiones enviando eventos ViewContent, AddToCart, InitiateCheckout y Purchase con parámetros content_ids y content_type='product'; (3) Catálogo verificado y conectado al ad account; (4) Audiencia dinámica creada (visitantes 14-30 días, carrito 7-14 días, compradores 30-90 días). Sin estas cuatro piezas el algoritmo no puede emparejar usuario con producto. La mayoría de errores que auditamos vienen de catálogos con >10% de productos rechazados o de ViewContent mal disparado en colecciones en lugar de PDPs.",
  },
  {
    q: "¿Qué ventanas de retargeting funcionan mejor para D2C en España?",
    a: "Depende del ticket y del ciclo de decisión. Para tickets <40€ (impulso): ViewContent 7 días + AddToCart 3 días + Purchase 60-90 días. Para tickets 40-150€ (consideración media): ViewContent 14 días + AddToCart 7 días + Purchase 90-180 días. Para tickets >150€ (alta consideración: muebles, joyería, electrónica): ViewContent 30 días + AddToCart 14 días + Purchase 180 días. Más allá de esas ventanas la frecuencia se dispara y el ROAS cae sin convertir. Excluye siempre los compradores recientes de la audiencia de carrito, salvo que estés haciendo cross-sell con catálogo distinto (accesorio del producto comprado).",
  },
  {
    q: "¿Cuánto presupuesto debo asignar al remarketing dinámico vs prospecting?",
    a: "Regla operativa que aplicamos en cuentas D2C: el remarketing dinámico no debería superar el 15-25% del spend total de Meta. Si supera el 30%, normalmente significa que el prospecting está infraalimentado y estás cosechando demanda existente sin crear nueva — el ROAS reportado sube pero el revenue total se estanca. La distribución típica que rinde mejor es 70-75% prospecting/Advantage+ + 15-20% remarketing dinámico + 5-10% retargeting clásico (engagement, vídeo views). Cuando una cuenta se queda atrapada en 'el remarketing es lo único rentable', el problema casi siempre está arriba del funnel, no en BOFU.",
  },
  {
    q: "¿El remarketing dinámico todavía funciona después de iOS 17 y la pérdida de cookies?",
    a: "Sí, pero requiere infraestructura técnica que antes era opcional. Sin API de Conversiones server-side bien implementada, el match rate de eventos cae al 50-65% y el algoritmo no consigue mapear usuario con producto visto en una proporción que mate la rentabilidad. Con CAPI server-side + parámetros enriquecidos (email hash, phone hash, user_agent, fbc/fbp), el match rate sube al 85-95% y el remarketing dinámico recupera prácticamente el rendimiento pre-iOS 14. La diferencia de ROAS entre una cuenta con CAPI básica vs CAPI server-side completa que vemos es de 1,8x a 4x en el mismo público. Sin esa base, no merece la pena ni encender remarketing dinámico.",
  },
  {
    q: "¿Cómo evito la fatiga publicitaria en remarketing dinámico?",
    a: "El remarketing dinámico tiene fatiga más rápida que prospecting porque el público es pequeño. Tres palancas: (1) rota la plantilla creativa (carrusel, colección, vídeo dinámico, single image dinámico) cada 3-4 semanas; (2) usa el creativo dinámico de Meta — distintos textos, headlines y CTAs sobre el mismo feed — para multiplicar combinaciones automáticamente; (3) controla la frecuencia: si supera 4-5 impresiones/semana en la audiencia de carrito 7d, baja la puja o reduce el público. Indicador clave: si el CPA del DPA sube >25% en 14 días sin cambios externos, casi siempre es fatiga creativa. Cambiar la plantilla suele recuperar el rendimiento en 5-7 días.",
  },
];

const RemarketingDinamicoEcommerceGuiaPracticaPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Remarketing dinámico para ecommerce: guía práctica (2026)"
    description="Guía operativa de remarketing dinámico para eCommerce D2C: qué es y cuándo merece la pena, requisitos técnicos en Meta y Google, ventanas óptimas por ticket, distribución de presupuesto vs prospecting, plantillas creativas que rinden y cómo evitar fatiga. Con tabla de KPIs reales."
    slug="remarketing-dinamico-ecommerce-guia-practica"
    datePublished="2026-05-01"
    dateModified="2026-05-01"
    readingTime="9 min"
    category="Estrategia"
    keywords={[
      "remarketing dinámico ecommerce",
      "remarketing dinámico meta ads",
      "dpa meta ads",
      "retargeting catálogo productos",
      "dynamic ads ecommerce d2c",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      El <strong className="text-white">remarketing dinámico para ecommerce</strong> sigue siendo, en 2026, la palanca BOFU más rentable de un D2C bien montado — y la peor configurada en la mayoría de cuentas que auditamos. La diferencia entre un DPA que rinde 6-9x ROAS y uno que da 2x está casi siempre en la base técnica (catálogo, eventos, CAPI), no en el creativo.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Esta guía resuelve qué necesitas para arrancarlo bien, qué ventanas y exclusiones aplicar según tu ticket, qué porcentaje del presupuesto debe ir a remarketing dinámico vs prospecting, qué plantillas creativas funcionan después de iOS 17 y cómo controlar la fatiga sin pausar la campaña.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">¿Cuándo merece la pena el remarketing dinámico?</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      No todos los D2C deberían encenderlo desde el día 1. Las condiciones reales para que rinda:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Catálogo con >30-40 SKUs activos. Por debajo, el creativo dinámico no aporta sobre un retargeting estático bien hecho.",
        "Tráfico mensual >8.000 sesiones únicas. Audiencias dinámicas de <1.000 usuarios queman frecuencia en 5 días.",
        "Píxel + API de Conversiones server-side con match rate >80%. Sin esto, el algoritmo no puede emparejar usuario y producto.",
        "Feed sincronizado al menos cada 24h, con <5% de productos rechazados en Commerce Manager / Merchant Center.",
        "Tiempo medio entre primera visita y compra >24h (si es <12h ya conviertes con retargeting de 1-3 días, no necesitas DPA).",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Si fallas en 2 o más de estos puntos, el ROI de implementar bien el remarketing dinámico está por encima del de mantener un retargeting estándar. Es la primera deuda técnica a pagar.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Setup técnico mínimo en Meta Ads</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      La <a href="https://www.facebook.com/business/help/1612355914396453" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial de Meta sobre anuncios dinámicos</a> exige un setup que mucha gente da por hecho y nunca verifica. El protocolo que aplicamos:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Componente</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Mínimo aceptable</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Ideal D2C escalable</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "Catálogo (Commerce Manager)", m: "Feed CSV/XML actualizado cada 24h", i: "Integración nativa Shopify/Woo + sync horaria" },
            { c: "Píxel ViewContent", m: "Disparado en PDP con content_ids", i: "Disparado solo en PDPs reales, no en colecciones" },
            { c: "Píxel AddToCart / InitiateCheckout", m: "Con product_id y value", i: "Con product_id, value, currency, num_items, contents[]" },
            { c: "Píxel Purchase", m: "Con value y currency", i: "+content_ids, num_items, order_id, customer email hash" },
            { c: "API de Conversiones (CAPI)", m: "Eventos básicos server-side", i: "Server-side completo con dedup + EMQ >7" },
            { c: "Audiencias dinámicas", m: "Visitantes 30d + carrito 14d", i: "Segmentadas por ticket/categoría/intención" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.i}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Ventanas de retargeting óptimas por ticket</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Una de las decisiones que más impacto tiene y casi nadie ajusta. Estas son las ventanas que usamos en cuentas D2C españolas según ticket medio (AOV) y ciclo de decisión real:
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          ticket: "Ticket <40€ (impulso, suplementos, snacks, accesorios)",
          ventanas: "ViewContent 7d · AddToCart 3d · Purchase 60-90d",
          razon: "Decisión rápida. Más allá de 7 días la intención cae y la frecuencia mata el ROAS.",
        },
        {
          ticket: "Ticket 40-150€ (moda, belleza, hogar pequeño)",
          ventanas: "ViewContent 14d · AddToCart 7d · Purchase 90-180d",
          razon: "Punto dulce del DPA en España. Ventana suficiente para volver tras comparar.",
        },
        {
          ticket: "Ticket 150-500€ (electrónica, deporte, hogar grande)",
          ventanas: "ViewContent 30d · AddToCart 14d · Purchase 180d",
          razon: "Ciclo de decisión largo. Acompañamiento creativo con prueba social y vídeo.",
        },
        {
          ticket: "Ticket >500€ (muebles, joyería, productos premium)",
          ventanas: "ViewContent 60d · AddToCart 30d · Purchase 365d",
          razon: "Volumen pequeño obliga a ventanas largas. Prioridad: cross-sell tras compra.",
        },
      ].map(({ ticket, ventanas, razon }) => (
        <div key={ticket} className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
          <p className="font-semibold text-white text-sm mb-1">{ticket}</p>
          <p className="text-white/70 text-sm mb-1"><span className="text-white/40">Ventanas:</span> {ventanas}</p>
          <p className="text-white/55 text-sm"><span className="text-white/40">Por qué:</span> {razon}</p>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">CPA y ROAS reales del remarketing dinámico (D2C España)</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Datos agregados de cuentas D2C que gestionamos con CAPI server-side, ticket 40-120€ y catálogo 100-1.500 SKUs. Tras la consolidación post-iOS:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Audiencia DPA</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">CTR</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">CPA</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">ROAS</th>
          </tr>
        </thead>
        <tbody>
          {[
            { a: "AddToCart 7d (excl. compradores)", ctr: "2,5-4,5%", cpa: "10-18€", r: "6-12x" },
            { a: "ViewContent 14d (excl. ATC y compra)", ctr: "1,5-2,8%", cpa: "18-30€", r: "3,5-6x" },
            { a: "Compradores 90d (cross-sell)", ctr: "2,0-3,5%", cpa: "14-22€", r: "4-7x" },
            { a: "Broad DPA (top X% público amplio)", ctr: "1,2-2,0%", cpa: "22-38€", r: "2-3,5x" },
            { a: "Carrito abandonado <24h", ctr: "3,5-6,0%", cpa: "8-14€", r: "8-15x" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.a}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.ctr}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.cpa}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Cuidado con leer este cuadro y concluir "concentro todo en carrito 24h". Ese ROAS de 8-15x es real pero el público es pequeñísimo (cientos de usuarios/día en una cuenta media). Saturar esa audiencia con presupuesto la quema en 48h. La regla es: cosechar lo evidente con presupuesto justo, alimentar prospecting arriba.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Plantillas creativas que rinden en DPA</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      No todos los formatos dinámicos rinden igual. El orden que vemos en cuentas que escalan:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Carrusel dinámico con producto + precio + reseña corta superpuesta. Best-seller absoluto en BOFU 7-14d.",
        "Colección dinámica (Collection Ad) con vídeo cabecera de marca + grid de productos vistos. Eleva CTR 25-40% vs single image.",
        "Vídeo dinámico (Dynamic Video Ad) con plantilla que inserta producto y precio sobre B-roll. Rinde mejor en ViewContent 14-30d.",
        "Single image dinámico con overlay de envío gratis o descuento condicionado. Útil para reactivar carrito >7d.",
        "Anuncio de catálogo + UGC: combinar feed con creativo UGC mejora CPA 15-25% en categorías de moda y belleza.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Las pautas que <a href="https://www.shopify.com/blog/dynamic-product-ads" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Shopify recoge sobre Dynamic Product Ads</a> coinciden con lo que vemos: el feed limpio + creatividad iterada cada 3-4 semanas es lo que mantiene el rendimiento por encima del benchmark de la categoría.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos el remarketing dinámico en DayByDay</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      No empezamos por "creamos el DPA y a correr". Antes de encender la campaña aplicamos este protocolo:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría del feed: productos rechazados, imágenes <500px, precios desactualizados, falta de GTIN. Sin feed limpio no hay DPA.",
        "Verificación de eventos píxel + CAPI: ViewContent solo en PDP, AddToCart con product_id correcto, deduplicación dedup_key activa. EMQ objetivo >7.",
        "Segmentación de catálogos: separar best-sellers, novedades y stock saturado en catálogos lógicos para tener control de puja por línea.",
        "Diseño de audiencias por ticket: ATC corto (3-7d), VC medio (14d), compradores cross-sell (90d) — siempre con exclusiones cruzadas.",
        "Creativo bracket: 3 plantillas distintas en testing simultáneo (carrusel, colección, vídeo) para detectar fatiga antes de que mate la campaña.",
        "Revisión semanal de frecuencia + sustitución creativa antes de superar 4-5 impresiones/semana en cualquier ad set.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu remarketing dinámico está rindiendo lo que debería?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos catálogo, eventos píxel + CAPI, audiencias y creativo para detectar las fugas que están matando tu ROAS de DPA.</p>
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
        <Link to="/blog/dynamic-product-ads-meta-shopify-d2c" className="text-white font-semibold hover:text-white/80">
          Dynamic Product Ads en Meta para Shopify: guía técnica D2C 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">Configuración técnica completa de DPA: catálogo, CAPI, product sets segmentados y feeds Shopify</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/retargeting-meta-ads-ecommerce-2026" className="text-white font-semibold hover:text-white/80">
          Retargeting en Meta Ads para eCommerce: guía completa 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">La escalera completa de retargeting (no solo dinámico) y cómo combinarla con DPA</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/guia-api-conversiones-meta-ads-shopify" className="text-white font-semibold hover:text-white/80">
          Guía API de Conversiones de Meta para eCommerce →
        </Link>
        <p className="text-white/40 text-xs mt-1">Sin CAPI server-side el remarketing dinámico pierde 30-50% del match rate</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/advantage-plus-shopping-cuando-usarlo-no" className="text-white font-semibold hover:text-white/80">
          Advantage+ Shopping en Meta Ads: cuándo usarlo y cuándo no →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo conviven Advantage+ y DPA sin solaparse y matar audiencias</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/creative-testing-meta-ads" className="text-white font-semibold hover:text-white/80">
          Cómo hacer creative testing en Meta Ads →
        </Link>
        <p className="text-white/40 text-xs mt-1">Protocolo para rotar plantillas dinámicas y evitar la fatiga publicitaria</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/metricas-meta-ads-importantes-ecommerce" className="text-white font-semibold hover:text-white/80">
          Métricas Meta Ads que importan de verdad (y las que no) →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué el ROAS del DPA aislado engaña sin mirar MER blended</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default RemarketingDinamicoEcommerceGuiaPracticaPage;
