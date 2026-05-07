import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Sigue funcionando el retargeting en Meta Ads en 2026 después de iOS y la pérdida de cookies?",
    a: "Sí, pero con una condición innegociable: API de Conversiones server-side bien implementada con match rate (EMQ) >7. Sin CAPI server-side, el match de eventos cae al 50-65% y las audiencias de retargeting se quedan a la mitad de su tamaño real, con un coste por resultado que duplica el benchmark. Con CAPI server-side + parámetros enriquecidos (email hash, fbc/fbp, user_agent), el retargeting recupera prácticamente el rendimiento pre-iOS 14. La diferencia entre cuentas D2C que mantienen retargeting rentable y las que lo ven morir está casi siempre en la base técnica, no en el creativo ni en la puja.",
  },
  {
    q: "¿Qué porcentaje de mi presupuesto debe ir a retargeting en Meta Ads?",
    a: "Regla operativa para eCommerce D2C: entre el 15% y el 25% del spend total de Meta. Si supera el 30%, la cuenta está cosechando demanda existente sin crear nueva — el ROAS reportado se ve bien pero el revenue total se estanca y a las semanas el CPA empieza a subir porque los pools de audiencia se agotan. Si está por debajo del 10%, normalmente es porque alguien lo apagó tras una fatiga creativa que no se solucionó. La distribución que mejor escala en cuentas que gestionamos: 70-75% prospecting (Advantage+ Shopping incluido) + 15-20% retargeting BOFU + 5-10% retargeting MOFU (engagement, vídeo views, listas).",
  },
  {
    q: "¿Cuántas audiencias de retargeting debo crear?",
    a: "Cuatro o cinco como máximo, con exclusiones cruzadas claras. Más allá fragmentas tanto el público que ningún ad set sale del aprendizaje. Estructura mínima que rinde: (1) Carrito abandonado 0-7 días, (2) ViewContent 14-30 días excluyendo carrito y compra, (3) Engagement 60-90 días (interacción con perfil, vídeo >50%) excluyendo visitantes web, (4) Compradores 60-180 días para cross-sell o repetición, (5) opcional: lista de clientes/newsletter no compradores. Multiplicar audiencias por hora del día, dispositivo o género suele tener efecto contrario al esperado.",
  },
  {
    q: "¿Qué ventanas de retargeting funcionan mejor según mi ticket medio?",
    a: "Ticket <40€ (impulso): carrito 3 días, ViewContent 7 días, compradores 60 días. Ticket 40-150€ (consideración media — moda, belleza, hogar): carrito 7 días, ViewContent 14 días, compradores 90-180 días. Ticket 150-500€ (electrónica, deporte): carrito 14 días, ViewContent 30 días, compradores 180 días. Ticket >500€ (premium, joyería): carrito 30 días, ViewContent 60 días, compradores 365 días. La regla es simple: cuanto más caro el producto, más larga la ventana, porque el ciclo de decisión real es más largo. Forzar ventanas cortas en ticket alto desperdicia el cookie/evento antes de que el usuario decida.",
  },
  {
    q: "¿Cómo evito que el retargeting queme a los usuarios y mate la marca?",
    a: "Tres palancas: (1) Frequency cap implícita rotando creativo cada 3-4 semanas. Si un usuario ve >5 impresiones/semana del mismo anuncio, mentalmente lo asocia a 'spam' y baja el CTR de futuras campañas; (2) Exclusiones cruzadas obligatorias (compradores fuera del retargeting de carrito, salvo cross-sell); (3) Diversificar formato — alternar carrusel dinámico, vídeo, UGC y collection ads para que la marca no sea siempre el mismo plano. Indicador clave: si el frequency en una audiencia de carrito 7d sube por encima de 6/semana, baja la puja o reduce el público. Por encima de 8 ya estás quemando.",
  },
  {
    q: "¿Debo separar retargeting estático y retargeting dinámico (DPA) en campañas distintas?",
    a: "Sí, casi siempre. El retargeting estático (creativo único, mensaje de marca/oferta general) y el dinámico (DPA con catálogo) tienen objetivos y CPMs distintos. Mezclarlos en la misma campaña hace que el algoritmo concentre presupuesto en el formato con CPA más bajo aparente — normalmente el carrito 7d con DPA — y deje los formatos de marca sin servir. La estructura limpia: una campaña BOFU dinámica (DPA con audiencias por intención) y una campaña BOFU estática para mensajes que el feed no sabe contar (envío gratis, primera compra, vídeo testimonio). Cada una con su presupuesto y su métrica.",
  },
];

const RetargetingMetaAdsEcommerce2026Page = ({ openCalendly }) => (
  <BlogPostLayout
    title="Retargeting en Meta Ads para eCommerce: guía completa 2026"
    description="Guía completa de retargeting en Meta Ads para eCommerce D2C en 2026: cómo construir la escalera de audiencias, ventanas por ticket, exclusiones obligatorias, distribución de presupuesto vs prospecting, sequenciado creativo y errores que matan el ROAS. Con tabla de KPIs reales por audiencia."
    slug="retargeting-meta-ads-ecommerce-2026"
    datePublished="2026-05-02"
    dateModified="2026-05-02"
    readingTime="10 min"
    category="Estrategia"
    keywords={[
      "retargeting meta ads ecommerce",
      "retargeting meta ads 2026",
      "audiencias retargeting facebook ads",
      "remarketing meta ads d2c",
      "estrategia retargeting ecommerce españa",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      El <strong className="text-white">retargeting en Meta Ads para eCommerce</strong> dejó de ser un único ad set con "visitantes 30 días" hace mucho tiempo. En 2026, con CAPI server-side, audiencias de engagement sin cookies y un funnel post-iOS estabilizado, el retargeting es una escalera de 4-5 audiencias coordinadas que decide el 30-40% del revenue de Meta — y donde se concentran los errores más caros que vemos al auditar cuentas D2C.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Esta guía resuelve cómo construir esa escalera de retargeting, qué ventanas aplicar según tu ticket medio, qué porcentaje del presupuesto debe ir a retargeting, cómo orquestar el creativo para no quemar al usuario, y qué errores estructurales matan el ROAS sin que el dashboard lo avise.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">¿Qué cuenta como retargeting en Meta Ads en 2026?</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Más allá del clásico "visitante web", el inventario real de audiencias de retargeting que Meta sigue ofreciendo bien después de iOS y la depreciación de cookies de tercera parte:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Eventos web (vía píxel + CAPI server-side): ViewContent, AddToCart, InitiateCheckout, Purchase. Es el núcleo del BOFU.",
        "Engagement de Instagram y Facebook (server-side de Meta, no depende de cookies): interacciones con perfil, mensaje, anuncio o post.",
        "Vídeo views: 25%, 50%, 75%, 95%. Útil para construir MOFU sin tracking web.",
        "Listas de clientes (Customer File): emails y teléfonos hasheados subidos a Meta o sincronizados vía Shopify/Klaviyo.",
        "Lead Form (si has captado leads en formularios nativos): excelente para campañas de descuento o reactivación.",
        "Catálogo (DPA): audiencias dinámicas asociadas a productos vistos/añadidos/comprados.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La <a href="https://www.facebook.com/business/help/2497099693032946" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial de Meta sobre custom audiences</a> recoge todas las fuentes; lo que no recoge es cuáles rinden de verdad en D2C español: las top 4 son AddToCart 7d, Engagement IG 90d, Compradores 90d y Vídeo View 75% 60d. El resto es relleno.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">La escalera de retargeting que aplicamos en cuentas D2C</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Cuatro peldaños, ordenados de mayor a menor intención. Cada audiencia con exclusiones cruzadas para que un usuario solo vea el anuncio del peldaño donde realmente está:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Peldaño</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Audiencia</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Excluir</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {[
            { p: "1 — Caliente", a: "Carrito 0-7d", e: "Compradores 30d", m: "Recordatorio del producto + envío gratis o urgencia" },
            { p: "2 — Tibio", a: "ViewContent 14-30d", e: "Carrito + Compradores", m: "DPA con prueba social y reseñas" },
            { p: "3 — MOFU", a: "Engagement IG/FB 90d + Vídeo 75% 60d", e: "Visitantes web 90d", m: "Marca + propuesta de valor + entrada a catálogo" },
            { p: "4 — Recompra", a: "Compradores 60-180d", e: "Compradores 30d", m: "Cross-sell, novedades, programa fidelización" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.a}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.e}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.m}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Las exclusiones cruzadas no son un detalle: son la diferencia entre un retargeting que escala y uno que canibaliza. Sin exclusiones, los compradores de hace 7 días siguen viendo el anuncio de carrito y el ROAS reportado se infla con personas que iban a comprar de todas formas.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">CPA y ROAS reales por audiencia (D2C España)</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Datos agregados de cuentas D2C que gestionamos con CAPI server-side, ticket medio 40-120€, presupuesto Meta entre 8K y 60K€/mes:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Audiencia</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">CTR</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">CPA</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">ROAS</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">% del spend</th>
          </tr>
        </thead>
        <tbody>
          {[
            { a: "Carrito 0-7d (DPA)", ctr: "3,5-6,0%", cpa: "8-14€", r: "8-15x", s: "3-5%" },
            { a: "ViewContent 14d (DPA)", ctr: "1,5-2,8%", cpa: "18-30€", r: "3,5-6x", s: "5-8%" },
            { a: "Engagement IG/FB 90d", ctr: "0,9-1,6%", cpa: "22-35€", r: "2,5-4x", s: "4-6%" },
            { a: "Vídeo 75% 60d", ctr: "0,8-1,4%", cpa: "25-40€", r: "2-3,5x", s: "3-5%" },
            { a: "Compradores 60-180d (cross-sell)", ctr: "2,0-3,5%", cpa: "14-22€", r: "4-7x", s: "2-4%" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.a}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.ctr}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.cpa}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.r}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.s}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Lectura crítica: el carrito 0-7d marca un ROAS de 8-15x pero solo absorbe 3-5% del spend total. Saturarlo con presupuesto no escala — quema audiencia en 48h. La regla de oro: <em>cosechar lo evidente con presupuesto justo, alimentar arriba</em>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Sequenciado creativo: qué mensaje en cada peldaño</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Mostrar el mismo creativo a un visitante de hace 30 días que a un carrito abandonado de hace 4 horas es una de las decisiones que más ROAS deja sobre la mesa. La secuencia que rinde:
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          peldano: "Caliente (carrito 0-7d)",
          creativo: "DPA con producto + reseña corta + urgencia ('quedan X' o envío en 24h). Variante con descuento condicionado solo si AOV lo permite.",
          que_evitar: "Mensajes de marca, vídeos de >15s, reels narrativos. El usuario está a 1 click, no necesita persuasión, necesita fricción cero.",
        },
        {
          peldano: "Tibio (ViewContent 14-30d)",
          creativo: "DPA con prueba social — reseñas, badge 'best-seller', estrellas. Carrusel mostrando 3-5 productos relacionados.",
          que_evitar: "Anuncio de marca genérico. El usuario ya conoce la marca, lo que falta es confianza en el producto.",
        },
        {
          peldano: "MOFU (engagement + vídeo 75%)",
          creativo: "Vídeo de marca corto (15-30s) + UGC + propuesta de valor. Single image con oferta de primera compra para listas.",
          que_evitar: "DPA puro. La audiencia no ha visto productos en el web, lanzar un feed de catálogo es prematuro.",
        },
        {
          peldano: "Recompra (compradores 60-180d)",
          creativo: "Cross-sell con catálogo de complementos, novedades, programa de fidelización. Vídeo testimonio de cliente recurrente.",
          que_evitar: "Mostrar el mismo producto que ya compraron. Excluir SKUs comprados via custom audience por product_id.",
        },
      ].map(({ peldano, creativo, que_evitar }) => (
        <div key={peldano} className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
          <p className="font-semibold text-white text-sm mb-1">{peldano}</p>
          <p className="text-white/70 text-sm mb-1"><span className="text-white/40">Creativo:</span> {creativo}</p>
          <p className="text-white/55 text-sm"><span className="text-white/40">Qué evitar:</span> {que_evitar}</p>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Errores frecuentes en el retargeting de eCommerce</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Patrones que vemos en cada auditoría y que matan el ROAS sin avisar:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Sin exclusiones cruzadas: el comprador de ayer ve el anuncio del carrito de hoy. ROAS reportado inflado con compras que iban a pasar igual.",
        "Asignar más del 30% del spend a retargeting. La cuenta cosecha demanda existente, prospecting se queda sin combustible y a las 4-6 semanas el CPA total sube.",
        "Una sola ventana para todo: 'visitantes 30 días' como única audiencia. Pierdes la diferenciación crítica entre carrito 1d y carrito 25d.",
        "No rotar creativo: la misma plantilla 8 semanas. Frequency >7/semana, CTR cae 40-60%, CPA dobla en 3-4 semanas.",
        "Mezclar prospecting y retargeting en la misma campaña Advantage+. El algoritmo concentra spend en lo más eficiente aparente y mata el TOFU.",
        "Audiencias <500 personas como ad set independiente. No salen del aprendizaje, queman frecuencia, no estabilizan CPA. Mejor consolidar.",
        "Ignorar las listas de clientes/newsletter. Audiencia gratuita, match rate alto y CPA típicamente 30-50% inferior a engagement web.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Las recomendaciones que <a href="https://www.shopify.com/blog/retargeting" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Shopify documenta sobre estrategia de retargeting</a> coinciden con esta lista en lo esencial: estructura limpia, exclusiones obligatorias y rotación creativa cada 3-4 semanas. Lo que añade nuestra experiencia auditando cuentas españolas es el orden de prioridad de los fixes: primero exclusiones, después rotación creativa, después rebalanceo del spend. El error de saltarse el orden suele ser quemar presupuesto reescribiendo creatividades sobre una estructura rota.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos el retargeting en DayByDay</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Antes de tocar puja o creativo, aplicamos este protocolo en cada cuenta D2C que recogemos:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría de eventos píxel + CAPI: ViewContent solo en PDP, AddToCart con product_id correcto, deduplicación dedup_key, EMQ >7. Sin esto, ninguna estrategia de audiencias funciona.",
        "Diseño de la escalera de 4 peldaños con exclusiones cruzadas explícitas y ventanas adaptadas al ticket medio del cliente.",
        "Separación obligatoria de campaña dinámica (DPA) y campaña estática (mensajes que el feed no sabe contar).",
        "Asignación inicial del spend: 70-75% prospecting, 20% retargeting BOFU, 5-10% MOFU. Ajuste semanal según marginal CPA.",
        "Bracket creativo: 3 plantillas por peldaño en testing simultáneo, rotación cada 3-4 semanas según frequency.",
        "Revisión semanal de canibalización: % de compras retargeting vs prospecting, frequency por audiencia, CPA marginal.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu retargeting en Meta Ads está rindiendo lo que debería?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos audiencias, exclusiones, eventos píxel + CAPI, distribución del spend y creativo para detectar las fugas que están matando tu ROAS.</p>
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
        <Link to="/blog/audiencias-lookalike-meta-alta-calidad" className="text-white font-semibold hover:text-white/80">
          Audiencias lookalike en Meta de alta calidad: guía 2026 D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">La cara prospecting del retargeting: cómo construir lookalikes de calidad y separar TOFU/MOFU de BOFU</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/email-marketing-meta-ads-ltv-d2c" className="text-white font-semibold hover:text-white/80">
          Email marketing + Meta Ads: cómo combinar paid y owned para escalar LTV →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo retargeting Meta y flujos Klaviyo se cruzan sin canibalizarse en abandono y winback</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/remarketing-dinamico-ecommerce-guia-practica" className="text-white font-semibold hover:text-white/80">
          Remarketing dinámico para ecommerce: guía práctica (2026) →
        </Link>
        <p className="text-white/40 text-xs mt-1">El detalle del DPA, requisitos de catálogo y plantillas creativas dinámicas</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/guia-api-conversiones-meta-ads-shopify" className="text-white font-semibold hover:text-white/80">
          Guía API de Conversiones de Meta para eCommerce →
        </Link>
        <p className="text-white/40 text-xs mt-1">Sin CAPI server-side bien hecho, las audiencias de retargeting pierden la mitad de su tamaño</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/creative-testing-meta-ads" className="text-white font-semibold hover:text-white/80">
          Cómo hacer creative testing en Meta Ads →
        </Link>
        <p className="text-white/40 text-xs mt-1">Protocolo para rotar creativo en cada peldaño antes de que la fatiga mate el CTR</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-campanas-meta-ads-sin-romper-roas" className="text-white font-semibold hover:text-white/80">
          Cómo escalar campañas Meta Ads sin romper el ROAS →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cuándo el retargeting deja de escalar y por qué hay que rebalancear hacia prospecting</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default RetargetingMetaAdsEcommerce2026Page;
