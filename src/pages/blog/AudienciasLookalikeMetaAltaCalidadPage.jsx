import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Siguen funcionando las audiencias lookalike en Meta Ads en 2026?",
    a: "Sí, pero solo si la audiencia semilla es de calidad y los eventos están bien medidos vía CAPI server-side. Sin CAPI con EMQ >7, el match rate de la lista semilla cae al 50-65% y Meta construye el lookalike sobre datos parciales — el resultado es un público que se parece más a 'cualquier comprador online' que a tu cliente real. Con semilla limpia y eventos de alta calidad, los lookalikes 1-3% siguen siendo una de las palancas de prospecting con mejor coste por adquisición que vemos en cuentas D2C españolas. Lo que ha cambiado no es su rendimiento, sino la importancia de la base técnica.",
  },
  {
    q: "¿Qué tamaño mínimo necesita la audiencia semilla para crear un lookalike de calidad?",
    a: "Mínimo operativo: 1.000-2.000 personas en la semilla, ideal 5.000-10.000. Por debajo de 1.000 Meta sigue construyendo el público pero el algoritmo no tiene suficientes patrones para generar un lookalike estable — verás CPA volátil semana a semana. Si tu cuenta tiene <1.000 compradores, la mejor opción es lookalike sobre AddToCart 90d o ViewContent + tiempo en página >60s, no compradores. Si superas 10.000, no hace falta más: a partir de ahí el algoritmo no mejora la calidad del modelo, solo amplía el rango.",
  },
  {
    q: "¿Qué porcentaje (1%, 3%, 5%, 10%) es mejor para un lookalike en eCommerce D2C?",
    a: "Regla operativa por tamaño de cuenta: cuentas <10K€/mes en Meta empiezan con lookalike 3-5% para tener volumen suficiente sin fragmentar. Cuentas 10-50K€/mes pueden trabajar 1-3% como audiencia core de prospecting + 5-10% como respaldo de escala. Cuentas >50K€/mes se benefician más de un stack: 1% para máxima similitud, 3% para escala estable, 5-10% solo cuando el 1-3% empieza a saturar. El error frecuente es asumir que '1% siempre rinde mejor': en cuentas pequeñas el 1% es un público demasiado estrecho y entra y sale del aprendizaje constantemente.",
  },
  {
    q: "¿Lookalike sobre compradores o sobre otra fuente?",
    a: "Depende del volumen de eventos. Jerarquía de calidad de semillas en orden descendente: (1) compradores con LTV alto/clientes recurrentes — la mejor semilla, pero requiere ≥1.000 personas; (2) compradores totales 180d — semilla por defecto si tienes volumen; (3) AddToCart 90d sin compra — útil cuando compradores <1.000; (4) Visitantes con tiempo en página >60s — TOFU adicional; (5) suscriptores email comprometidos vía Customer File — semilla limpia que muchas cuentas ignoran. Lo que NO funciona como semilla: visitantes web 30d sin filtro de calidad (incluye rebote y bots), engagement IG genérico, y leads sin cualificación.",
  },
  {
    q: "¿Cuántas audiencias lookalike debo tener activas simultáneamente?",
    a: "Tres o cuatro como máximo, con función diferenciada. Estructura que rinde en cuentas D2C: (1) lookalike 1-3% compradores LTV alto (core prospecting BOFU-MOFU), (2) lookalike 3-5% AddToCart 90d (volumen MOFU), (3) lookalike 5-10% engagement IG/FB 365d (TOFU de bajo coste), (4) opcional: lookalike sobre lista de email de marca para campañas de lanzamiento. Más allá fragmentas el aprendizaje y ningún ad set sale de learning phase. El error clásico es crear 8-10 lookalikes por intuición y dejarlos competir entre sí — el algoritmo no sabe a cuál servir y el CPA se desestabiliza.",
  },
  {
    q: "¿Excluyo a clientes y visitantes recientes de mis lookalike audiences?",
    a: "Casi siempre sí. Sin exclusiones, el lookalike incluye personas que ya están en tu pixel — lo que infla el ROAS reportado con compras que iban a pasar igual vía retargeting. Exclusiones obligatorias: (1) compradores 180d, (2) carrito + ViewContent 30d, (3) suscriptores email recientes 60d. Excepción: si tu funnel es de adquisición pura sin overlap con remarketing (lanzamiento de producto nuevo, expansión geográfica), puedes desactivar exclusiones temporalmente. En operación normal, sin exclusiones cruzadas el reporte de prospecting roba revenue al retargeting y la atribución pierde sentido.",
  },
  {
    q: "¿Cuándo dejan de funcionar los lookalikes y qué los sustituye?",
    a: "Dejan de funcionar cuando: (1) la semilla deja de actualizarse — un lookalike de compradores 180d con ventana cerrada se vuelve obsoleto en 60-90 días; (2) la cuenta supera ~70K€/mes en Meta y el público disponible se satura — ahí el frequency sube y el CPA marginal se dispara; (3) Advantage+ Shopping Campaign con 'audience expansion' empieza a canibalizar el volumen del lookalike. Lo que los sustituye en cuentas grandes: Advantage+ Shopping con catálogo bien optimizado + listas Customer File enriquecidas + interés agregado broad. En cuentas <30K€/mes, los lookalikes siguen siendo la palanca más eficiente de prospecting.",
  },
];

const AudienciasLookalikeMetaAltaCalidadPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Audiencias lookalike en Meta de alta calidad: guía 2026 D2C"
    description="Cómo crear audiencias lookalike de alta calidad en Meta Ads para eCommerce D2C: jerarquía de semillas (compradores LTV alto, AddToCart, engagement), tamaño semilla mínimo, qué porcentaje (1-10%) usar según tamaño de cuenta, exclusiones obligatorias y cuándo Advantage+ los sustituye."
    slug="audiencias-lookalike-meta-alta-calidad"
    datePublished="2026-05-02"
    dateModified="2026-05-02"
    readingTime="9 min"
    category="Estrategia"
    keywords={[
      "audiencias lookalike meta",
      "lookalike facebook ads",
      "lookalike audience ecommerce",
      "audiencias similares meta ads",
      "lookalike d2c españa",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      Las <strong className="text-white">audiencias lookalike en Meta</strong> siguen siendo, en 2026, una de las palancas más eficientes de prospecting para eCommerce D2C — pero solo cuando la semilla es de calidad y los eventos están medidos vía CAPI server-side. La mayoría de cuentas que auditamos tienen 6-10 lookalikes activos compitiendo entre sí, semillas obsoletas y exclusiones rotas. El resultado: prospecting que canibaliza retargeting y un ROAS reportado que no corresponde con el revenue incremental real.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Esta guía cubre cómo elegir la semilla, qué tamaño y porcentaje usar según tu cuenta, cómo construir un stack de 3-4 lookalikes que no se canibalicen, y cuándo Advantage+ Shopping Campaign los sustituye en cuentas grandes.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es realmente una audiencia lookalike en 2026</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Un lookalike no es "personas parecidas a tus clientes" en abstracto: es un modelo estadístico que Meta construye a partir de las señales de tu semilla y proyecta sobre el inventario disponible en un país. La calidad final depende de tres variables, en este orden:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Calidad de la semilla — qué evento de conversión define a la persona y qué match rate tienen los eventos en tu cuenta (vía píxel + CAPI server-side).",
        "Tamaño de la semilla — por debajo de 1.000 personas Meta no tiene suficientes patrones; entre 5.000 y 10.000 es el rango ideal.",
        "Frescura — una semilla de compradores con ventana cerrada (no se actualiza) se vuelve obsoleta en 60-90 días y el lookalike empieza a degradarse aunque el dashboard no lo avise.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La <a href="https://www.facebook.com/business/help/164749007013531" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial de Meta sobre lookalike audiences</a> recoge las fuentes válidas y los rangos %; lo que no recoge es cuáles funcionan en D2C español. Por eso la jerarquía siguiente.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Jerarquía de semillas: cuál usar según tu volumen</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Ordenadas de mayor a menor calidad de la señal. Si la primera no tiene volumen suficiente, baja al siguiente nivel:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Semilla</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Volumen mín.</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Calidad</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cuándo usarla</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: "Compradores LTV alto (top 25%)", v: "1.000+", c: "★★★★★", u: "Cuenta con 3.000+ compradores y datos de LTV en Shopify/Klaviyo" },
            { s: "Compradores 180d", v: "1.000+", c: "★★★★", u: "Semilla por defecto en cuentas con volumen estable" },
            { s: "AddToCart 90d sin compra", v: "2.000+", c: "★★★", u: "Compradores <1.000 — sustituye temporalmente" },
            { s: "Customer File (email/tel hash)", v: "1.000+", c: "★★★★", u: "Lista de email de calidad sincronizada con Meta" },
            { s: "Visitantes web tiempo >60s 30d", v: "5.000+", c: "★★", u: "TOFU adicional, complementa otras semillas" },
            { s: "Engagement IG/FB 365d", v: "5.000+", c: "★★", u: "Cuenta con marca consolidada en redes — TOFU bajo coste" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.v}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.u}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La semilla de compradores LTV alto es la diferencia entre un lookalike que escala y uno que se queda en CPA medio. Construirla requiere tener LTV calculado por cliente — algo que la <a href="https://www.shopify.com/blog/customer-lifetime-value" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de Shopify sobre Customer Lifetime Value</a> explica bien. Si tu Shopify ya tiene Klaviyo o un CRM enchufado, exportar el top 25% por revenue total es trivial; la inversión de tiempo se devuelve a los 30 días en CPA de prospecting.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué porcentaje (1%, 3%, 5%, 10%) elegir</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Decisión por tamaño de cuenta y objetivo. La regla "1% siempre es mejor" es falsa en cuentas pequeñas — fragmenta tanto el público que el ad set no estabiliza CPA.
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Spend Meta/mes</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">% recomendado</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Estructura típica</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: "<10K€", p: "3-5%", e: "1 lookalike core 3% sobre compradores 180d" },
            { s: "10-30K€", p: "1-3% + 5%", e: "1% compradores LTV + 3% compradores 180d + 5% AddToCart 90d (respaldo)" },
            { s: "30-70K€", p: "1% + 3% + 5-10%", e: "Stack de 3 lookalikes diferenciados con exclusiones cruzadas" },
            { s: ">70K€", p: "Mix + Advantage+", e: "Lookalike 1% LTV alto como semilla + Advantage+ Shopping para escala" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.e}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Lectura crítica: en cuentas pequeñas el 1% es un público demasiado estrecho — el ad set entra y sale del aprendizaje, gasta presupuesto sin estabilizar CPA. Empezar con 3-5% y bajar al 1% cuando el volumen lo permita es la secuencia que mejor escala.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Exclusiones cruzadas obligatorias</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Sin exclusiones, el lookalike incluye personas que ya están en tu pixel y el ROAS reportado de prospecting se infla con compras que iban a pasar igual vía retargeting. Exclusiones operativas en cada ad set lookalike:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Compradores 180d (custom audience desde evento Purchase) — evita pagar por reactivar a quien volvía igual.",
        "AddToCart + ViewContent 30d — separa demanda existente de demanda nueva, esencial para que prospecting y retargeting no canibalicen.",
        "Suscriptores email recientes 60d (vía Customer File sincronizado) — clientes que están recibiendo email + paid duplican coste sin incremento.",
        "Visitantes web 30d (opcional, según overlap con MOFU) — solo si tu retargeting ya cubre toda la franja.",
        "Empleados / IPs internas / dominios de prueba — el ruido de internal traffic distorsiona la semilla y el lookalike resultante.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Errores frecuentes que matan el lookalike</h2>
    <div className="space-y-3 mb-6">
      {[
        "Crear lookalike sobre 'visitantes web 30d' sin filtro de calidad: incluye rebotes, bots y tráfico de redes que no convierte. Resultado: público amplio que no se parece a tu cliente real.",
        "Semilla con <1.000 personas — Meta sigue construyendo el público pero el modelo es inestable, CPA volátil semana a semana.",
        "No actualizar la semilla: una lista cerrada se obsolece a los 60-90 días. Toda semilla operativa debe ser dinámica (custom audience con ventana móvil), no estática.",
        "Activar 6-10 lookalikes simultáneos por intuición. El algoritmo fragmenta el aprendizaje y ningún ad set estabiliza CPA. Tres o cuatro máximo, con función diferenciada.",
        "Sin CAPI server-side: el match rate de la semilla cae al 50-65%. El lookalike se construye sobre datos parciales y rinde un 30-40% peor que con CAPI bien implementada.",
        "No excluir compradores: el prospecting reporta un ROAS inflado, retargeting se queda sin presupuesto, escala se rompe.",
        "Confundir Advantage+ Audience (audience expansion) con lookalike: son cosas distintas. Advantage+ ignora parte de tus targeting hints, el lookalike no.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cuándo Advantage+ sustituye al lookalike</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      A partir de ~70K€/mes de spend en Meta, Advantage+ Shopping Campaign con catálogo bien optimizado + Customer File enriquecida suele rendir mejor que un stack de lookalikes — el algoritmo tiene suficiente volumen para reasignar dinámicamente entre intereses, broad y similares sin necesidad de targeting hints rígidos. Por debajo de ese volumen, el lookalike sigue siendo la palanca de prospecting más eficiente, especialmente combinado con un retargeting limpio. La transición no es binaria: en cuentas 50-100K€/mes habitualmente conviven Advantage+ Shopping con un ad set lookalike 1% LTV alto que actúa como "sembrador" de señal de calidad para el algoritmo.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos los lookalikes en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría previa de eventos píxel + CAPI: sin EMQ >7 en Purchase y AddToCart no creamos lookalikes. La base técnica primero.",
        "Construcción de la semilla LTV alto cuando hay datos disponibles (Klaviyo, Shopify CRM, datos de cliente). Top 25% por revenue total exportado a Customer File.",
        "Stack inicial de 3 lookalikes con función diferenciada (1% LTV / 3% compradores / 5-10% engagement) y exclusiones cruzadas explícitas.",
        "Refresco mensual de semilla: ventana móvil 180d para compradores, 90d para AddToCart. Nunca semillas estáticas.",
        "Test de % en escalada: empezar 3-5%, bajar al 1% cuando el ad set tiene 50+ conversiones/semana estables.",
        "Revisión semanal de overlap entre lookalikes y retargeting con Audience Insights — si el solapamiento >25% revisamos exclusiones antes de tocar puja o creativo.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tus lookalikes en Meta están construidos sobre la semilla correcta?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos calidad de eventos píxel + CAPI, semillas, exclusiones y stack de prospecting para detectar si tu lookalike está canibalizando retargeting.</p>
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
        <Link to="/blog/retargeting-meta-ads-ecommerce-2026" className="text-white font-semibold hover:text-white/80">
          Retargeting en Meta Ads para eCommerce: guía completa 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">La cara complementaria: cómo separar prospecting (lookalike) de retargeting con exclusiones limpias</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/guia-api-conversiones-meta-ads-shopify" className="text-white font-semibold hover:text-white/80">
          Guía API de Conversiones de Meta para eCommerce →
        </Link>
        <p className="text-white/40 text-xs mt-1">Sin CAPI server-side bien hecho, la semilla del lookalike pierde la mitad de su match rate</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/advantage-plus-shopping-cuando-usarlo-no" className="text-white font-semibold hover:text-white/80">
          Advantage+ Shopping Campaign: cuándo usarlo y cuándo no →
        </Link>
        <p className="text-white/40 text-xs mt-1">A partir de ~70K€/mes Advantage+ empieza a competir con el lookalike — cuándo migrar</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-campanas-meta-ads-sin-romper-roas" className="text-white font-semibold hover:text-white/80">
          Cómo escalar campañas Meta Ads sin romper el ROAS →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo escalar lookalikes sin saturar el público y disparar el frequency</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default AudienciasLookalikeMetaAltaCalidadPage;
