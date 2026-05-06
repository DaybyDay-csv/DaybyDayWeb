import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es la API de Conversiones de Meta y en qué se diferencia del píxel?",
    a: "La API de Conversiones (CAPI) es un canal server-side que envía eventos de conversión directamente desde tu servidor al de Meta, sin depender del navegador del usuario. El píxel es client-side: se ejecuta en el navegador y se ve afectado por bloqueadores, ITP de Safari, ATT de iOS y extensiones de privacidad. CAPI complementa al píxel — no lo sustituye. Cuando ambos eventos están deduplicados (mediante event_id y event_name compartidos), Meta recibe la señal por dos vías y se queda con la más fiable. Sin CAPI, en 2026 estás perdiendo entre el 20% y el 40% de los eventos de compra que sí están ocurriendo en tu Shopify.",
  },
  {
    q: "¿Cuánto se mejora el rendimiento de Meta Ads tras implementar Conversions API?",
    a: "En las cuentas D2C que migramos a CAPI deduplicada, vemos consistentemente: +15-25% de eventos de compra capturados (los que el píxel perdía), -10-20% de CPA reportado por Meta (porque la atribución mejora con más señal), +20-40% de calidad de las audiencias lookalike (Meta entrena con eventos completos, no parciales) y mejor estabilidad del algoritmo en fase de aprendizaje. No es magia — es darle a Meta los datos que ya estaban ocurriendo pero no llegaban. La diferencia se nota especialmente en cuentas con mucho tráfico iOS/Safari, donde el píxel pierde más eventos.",
  },
  {
    q: "¿Cómo se implementa la API de Conversiones en Shopify? ¿Necesito desarrollador?",
    a: "Para Shopify hay tres rutas. (1) Shopify Conversions API nativa: integración oficial via Facebook & Instagram app, sin código, pero con limitaciones en eventos custom y deduplicación. (2) Apps de partner: Trackify, Aimerce, Elevar — añaden eventos avanzados, identidad first-party y deduplicación robusta, coste 30-150€/mes. (3) Implementación custom via Google Tag Manager server-side o endpoint propio: máximo control, requiere desarrollador y mantenimiento. Para 90% de los D2C españoles entre 30K€ y 500K€/mes, una app de partner como Aimerce o Elevar es el sweet spot: implementación en 1-2 semanas, cobertura completa de eventos y deduplicación correcta.",
  },
  {
    q: "¿Qué eventos debo enviar por CAPI para un eCommerce D2C?",
    a: "Los eventos prioritarios son los de la parte baja del funnel: Purchase (crítico, evento de optimización principal), AddToCart, InitiateCheckout, AddPaymentInfo y CompleteRegistration. Cada uno debe enviarse con: event_id único, event_name estandarizado, event_time, action_source (\"website\"), datos de cliente hasheados (email, teléfono, IP, user_agent, fbp, fbc) y custom_data (value, currency, content_ids, content_type). Sin estos parámetros, el matching de eventos se desploma. La calidad del Event Match Quality (EMQ) en Events Manager debe estar por encima de 7/10 — por debajo, hay un problema de identidad o hashing.",
  },
  {
    q: "¿La API de Conversiones reemplaza al consentimiento del usuario / RGPD?",
    a: "No. CAPI no exime de cumplir RGPD ni de obtener consentimiento informado. Lo que cambia es la vía técnica: si un usuario rechaza cookies, no debes enviar su evento por CAPI tampoco. El píxel y CAPI deben respetar el mismo flag de consentimiento. Lo que sí permite CAPI es enviar eventos de usuarios que sí han consentido pero cuyo navegador (Safari, Brave, bloqueadores) habría descartado el evento por píxel. La buena práctica es integrar el CMP (Cookiebot, OneTrust, Didomi) con la lógica server-side: si consent=granted, se envía píxel + CAPI; si consent=denied, no se envía nada. La AEPD ha publicado guías claras al respecto que conviene revisar.",
  },
  {
    q: "¿Cómo verifico que mi Conversions API está bien configurada?",
    a: "Tres comprobaciones obligatorias en Events Manager. (1) Event Match Quality (EMQ): puntuación de 8-10/10 indica matching óptimo de identidad de usuario. (2) Deduplicación: en \"Diagnostics\" no debe haber alertas de eventos duplicados — si las hay, falla event_id o event_name compartido entre píxel y CAPI. (3) Coverage: el porcentaje de eventos enviados por servidor vs navegador debe ser >70% para Purchase. Adicionalmente, prueba el \"Test Events\" tool antes de ir a producción y revisa la cobertura semanal durante el primer mes. Cualquier agencia que no te enseñe estos tres números en el reporte mensual no está midiendo bien.",
  },
];

const GuiaApiConversionesMetaShopifyPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Guía API de Conversiones de Meta: configuración y beneficios para eCommerce"
    description="Guía completa de la API de Conversiones de Meta (CAPI) para eCommerce D2C: qué es, por qué es no negociable en 2026, cómo se implementa en Shopify, eventos críticos, deduplicación con el píxel, RGPD y verificación en Events Manager."
    slug="guia-api-conversiones-meta-ads-shopify"
    datePublished="2026-04-30"
    dateModified="2026-04-30"
    readingTime="10 min"
    category="Tracking"
    keywords={[
      "api conversiones meta ads",
      "conversions api meta",
      "capi shopify",
      "api conversiones facebook",
      "implementar capi ecommerce",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      La <strong className="text-white">API de Conversiones de Meta Ads</strong> (CAPI) dejó de ser opcional hace dos años. En 2026, con iOS bloqueando cookies de terceros por defecto, Safari aplicando ITP agresivo y los navegadores Brave/Firefox limitando el seguimiento, un eCommerce que sólo confíe en el píxel está enviando a Meta entre un 20% y un 40% menos de eventos de compra de los que realmente ocurren — y el algoritmo aprende con datos parciales.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Esta guía cubre lo que un fundador D2C necesita entender para decidir cómo implementar CAPI: qué es realmente, qué impacto tiene en el rendimiento, cómo se implementa en Shopify, qué eventos enviar, cómo deduplicar correctamente con el píxel y cómo verificar que está bien configurada.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es la API de Conversiones (CAPI) y por qué importa</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      CAPI es un canal de envío de eventos server-side: tu servidor (Shopify, una app intermedia o un endpoint propio) envía directamente a los servidores de Meta los eventos de conversión, sin pasar por el navegador del usuario. El píxel hace lo mismo pero desde el navegador, y por tanto está sujeto a todas las limitaciones de privacidad modernas.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      La <a href="https://www.facebook.com/business/help/2041148702652965" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial de Meta sobre la API de Conversiones</a> es explícita: la combinación de píxel + CAPI es el setup recomendado para todos los anunciantes que dependan de optimización por conversión. No se trata de elegir uno u otro, sino de enviar la señal por las dos vías y dejar que Meta deduplique.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Impacto real en el rendimiento (datos de cuentas migradas)</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Estos son los rangos de mejora que hemos visto en cuentas D2C españolas tras migrar de píxel-only a píxel + CAPI deduplicada correctamente:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Métrica</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Mejora típica</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Por qué ocurre</th>
          </tr>
        </thead>
        <tbody>
          {[
            { m: "Eventos Purchase capturados", v: "+15-25%", p: "Recuperas eventos que el píxel perdía por ITP/ATT/bloqueadores" },
            { m: "CPA reportado por Meta", v: "-10-20%", p: "Más eventos atribuidos al canal real → CPA más cercano al MER" },
            { m: "Calidad de Lookalikes", v: "+20-40%", p: "Meta entrena con la base de compradores completa, no parcial" },
            { m: "Estabilidad fase aprendizaje", v: "Salida 30-50% más rápida", p: "Más señal por semana → 50 conversiones se alcanzan antes" },
            { m: "Event Match Quality (EMQ)", v: "+2-4 puntos", p: "Datos hasheados de cliente (email, IP) elevan el matching" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.v}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      No es un tema marginal de tracking: es la diferencia entre escalar con el algoritmo trabajando con buenos datos o escalar a ciegas. En cuentas con mucho tráfico iOS, donde Safari y la App Tracking Transparency capan más eventos, la mejora suele estar en la parte alta del rango.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo implementar CAPI en Shopify: 3 rutas</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Para Shopify hay tres formas de implementar CAPI, con diferente nivel de control, coste y mantenimiento:
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          ruta: "1. Shopify Conversions API nativa (Facebook & Instagram app)",
          coste: "Gratis (incluida en Shopify)",
          pros: "Sin código, activación en minutos, mantenida oficialmente.",
          contras: "Eventos limitados, deduplicación básica, control nulo sobre custom_data y matching avanzado.",
          cuando: "Tiendas que arrancan o cuentas pequeñas (<10K€/mes en Meta) sin equipo técnico.",
        },
        {
          ruta: "2. App de partner (Aimerce, Elevar, Trackify)",
          coste: "30-150€/mes según tier",
          pros: "Deduplicación robusta vía event_id compartido, eventos custom completos, identidad first-party, soporte y documentación buenos.",
          contras: "Coste recurrente, dependencia de un proveedor externo.",
          cuando: "Sweet spot para D2C entre 30K€ y 500K€/mes de facturación. Ratio impacto/coste imbatible.",
        },
        {
          ruta: "3. Implementación custom (GTM server-side o endpoint propio)",
          coste: "Desarrollo 3-8K€ + mantenimiento mensual",
          pros: "Control total, puede integrar otras plataformas (Google, TikTok, Klaviyo) en el mismo stack server-side.",
          contras: "Requiere desarrollador con experiencia, mantenimiento continuo, riesgo de fallos silenciosos.",
          cuando: "Cuentas >500K€/mes con equipo técnico interno o stack multi-canal complejo.",
        },
      ].map(({ ruta, coste, pros, contras, cuando }) => (
        <div key={ruta} className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
          <p className="font-semibold text-white text-sm mb-1">{ruta} <span className="text-white/40 font-normal">— {coste}</span></p>
          <p className="text-white/55 text-sm mb-1"><span className="text-white/70">Pros:</span> {pros}</p>
          <p className="text-white/55 text-sm mb-1"><span className="text-white/70">Contras:</span> {contras}</p>
          <p className="text-white/55 text-sm"><span className="text-white/70">Cuándo encaja:</span> {cuando}</p>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Eventos críticos a enviar y parámetros obligatorios</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      No todos los eventos pesan lo mismo. Estos son los que un eCommerce D2C debe enviar por CAPI sí o sí, en orden de prioridad:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Evento</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Para qué se usa</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Prioridad</th>
          </tr>
        </thead>
        <tbody>
          {[
            { e: "Purchase", p: "Evento de optimización principal de campañas BOFU. Sin esto, no hay CAPI útil", pr: "Crítica" },
            { e: "InitiateCheckout", p: "Optimización de campañas TOFU/MOFU + audiencias lookalike de mid-funnel", pr: "Alta" },
            { e: "AddToCart", p: "Audiencias de retargeting + señal temprana de intención", pr: "Alta" },
            { e: "AddPaymentInfo", p: "Indicador de fricción en checkout — tracking de drop-off", pr: "Media" },
            { e: "CompleteRegistration", p: "Sólo si captas leads/registros como evento de valor", pr: "Media" },
            { e: "ViewContent", p: "Señal temprana de interés — útil para remarketing dinámico", pr: "Baja-Media" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.e}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.pr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Cada evento debe enviarse con: <code className="text-white text-xs bg-white/5 px-1.5 py-0.5 rounded">event_id</code> (mismo en píxel y CAPI para deduplicar), <code className="text-white text-xs bg-white/5 px-1.5 py-0.5 rounded">event_time</code>, <code className="text-white text-xs bg-white/5 px-1.5 py-0.5 rounded">action_source</code>, datos de cliente hasheados (email, teléfono, IP, user_agent, fbp, fbc) y <code className="text-white text-xs bg-white/5 px-1.5 py-0.5 rounded">custom_data</code> (value, currency, content_ids). Si falta el hash de email o el fbp, el Event Match Quality cae y la deduplicación se rompe.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Deduplicación: el detalle que rompe la mayoría de implementaciones</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El error más común que vemos al auditar cuentas con CAPI activa: eventos duplicados porque la deduplicación no está bien hecha. Cuando ocurre, Meta cuenta dos compras donde sólo hubo una, infla el ROAS reportado y degrada la calidad de las audiencias.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Para deduplicar correctamente, el píxel y CAPI deben enviar el mismo <code className="text-white text-xs bg-white/5 px-1.5 py-0.5 rounded">event_id</code> y el mismo <code className="text-white text-xs bg-white/5 px-1.5 py-0.5 rounded">event_name</code> para el mismo evento. Meta entonces compara y se queda sólo con uno (prioriza el que tenga más datos, normalmente CAPI). Para verificarlo, en Events Manager → Diagnostics no debe aparecer ninguna alerta de eventos duplicados durante el primer mes tras la implementación.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Las apps de partner como Aimerce o Elevar gestionan esto out-of-the-box. En implementaciones custom es donde suele fallar: el desarrollador genera un event_id por cada vía y Meta no puede deduplicar. <a href="https://shopify.engineering/conversions-api-for-shopify-stores" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Shopify Engineering ha documentado los patrones de implementación recomendados</a> que conviene revisar antes de cualquier custom.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">RGPD, consentimiento y CAPI</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Una confusión peligrosa: pensar que CAPI sirve para esquivar el consentimiento. No es así. Si un usuario rechaza cookies en tu CMP, no debes enviar su evento ni por píxel ni por CAPI. Lo que CAPI permite es capturar eventos de usuarios que sí han consentido pero cuyo navegador habría descartado el píxel. La integración correcta lee el flag del CMP (Cookiebot, OneTrust, Didomi) en el servidor antes de disparar el evento server-side.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo verificar que tu CAPI está bien (3 chequeos)</h2>
    <div className="space-y-3 mb-6">
      {[
        "Event Match Quality (EMQ) por evento ≥ 8/10 en Events Manager. Si baja de 7, falta hashing de email o teléfono.",
        "Deduplicación: 0 alertas de eventos duplicados en Diagnostics durante el primer mes. Si aparecen, revisa event_id y event_name compartidos.",
        "Coverage server-side: ≥70% de eventos Purchase enviados desde servidor vs navegador. Por debajo, CAPI no está cubriendo realmente lo que el píxel pierde.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay con CAPI</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      No tocamos campañas hasta tener CAPI deduplicada y validada. Ese es nuestro día 1 con cualquier cuenta D2C nueva. Así lo implementamos:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría inicial: estado actual del píxel, EMQ, eventos enviados, cobertura server-side. Te entregamos el documento aunque no firmemos.",
        "Implementación CAPI mediante app de partner (Aimerce/Elevar) en 1-2 semanas — coste recurrente del cliente, sin overhead de desarrollo.",
        "Validación en Events Manager: EMQ ≥8/10 por evento, 0 alertas de deduplicación, cobertura ≥70%. No avanzamos hasta tenerlo.",
        "Integración con CMP (Cookiebot/Didomi) para que el flag de consentimiento se respete en píxel + CAPI.",
        "Reporte semanal cruzando eventos CAPI vs ventas reales en Shopify para detectar desviaciones antes de que escalen.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Quieres saber cómo está tu CAPI hoy?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita en 30 minutos: revisamos EMQ, deduplicación y cobertura server-side de tu cuenta. Te decimos exactamente cuántos eventos estás perdiendo y cómo recuperarlos.</p>
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
        <Link to="/blog/server-side-tracking-shopify-conversions-api" className="text-white font-semibold hover:text-white/80">
          Tracking server-side completo para Shopify con Conversions API: guía 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">El siguiente paso: arquitectura sGTM/Stape, deduplicación cliente-servidor y EMQ &gt;8,5</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/metricas-meta-ads-importantes-ecommerce" className="text-white font-semibold hover:text-white/80">
          Métricas Meta Ads que importan de verdad (y las que no) →
        </Link>
        <p className="text-white/40 text-xs mt-1">MER, CPA real vs ROAS de plataforma y por qué CAPI cambia los números reportados</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/por-que-anuncios-meta-no-convierten" className="text-white font-semibold hover:text-white/80">
          Por qué tus anuncios de Meta no convierten →
        </Link>
        <p className="text-white/40 text-xs mt-1">Diagnóstico en 5 capas — el tracking es la primera causa que descartar</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/checklist-auditoria-campanas-paid-media" className="text-white font-semibold hover:text-white/80">
          Checklist de auditoría de campañas paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">Auditoría operativa con CAPI, EMQ y cobertura server-side incluidos</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/guia-meta-ads-ecommerce-d2c-espana-2026" className="text-white font-semibold hover:text-white/80">
          Guía Meta Ads para eCommerce D2C en España 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">El pilar completo: tracking, estructura, creatividades y escalado para D2C</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/remarketing-dinamico-ecommerce-guia-practica" className="text-white font-semibold hover:text-white/80">
          Remarketing dinámico para ecommerce: guía práctica →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué CAPI server-side es requisito para que el DPA recupere ROAS post-iOS</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/audiencias-lookalike-meta-alta-calidad" className="text-white font-semibold hover:text-white/80">
          Audiencias lookalike en Meta de alta calidad: guía 2026 D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Sin CAPI con EMQ &gt;7, la semilla del lookalike pierde la mitad de su match rate</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/retargeting-meta-ads-ecommerce-2026" className="text-white font-semibold hover:text-white/80">
          Retargeting en Meta Ads para eCommerce: guía completa 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">Sin CAPI server-side las audiencias de retargeting pierden la mitad de su tamaño</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default GuiaApiConversionesMetaShopifyPage;
