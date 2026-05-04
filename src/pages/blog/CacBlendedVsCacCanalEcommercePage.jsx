import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué diferencia hay entre CAC blended y CAC por canal?",
    a: "CAC blended (o blended CAC) divide todo el gasto de marketing del periodo entre todos los clientes nuevos del mismo periodo, sin distinguir canal. CAC por canal, en cambio, intenta atribuir cada cliente al canal que lo trajo (Meta, Google, email, orgánico) usando el modelo de atribución de la plataforma o el del CRM. El blended es resistente al ruido de atribución y refleja la realidad financiera del negocio; el CAC por canal es útil para decisiones de asignación de presupuesto pero depende totalmente del modelo de atribución elegido y suele inflar al canal con más cookies (last-click)."
  },
  {
    q: "¿Cuál de los dos CAC se usa para escalar un D2C?",
    a: "Para decisiones de escalado a nivel negocio (cuánto puedo invertir en marketing manteniendo márgenes) se usa el CAC blended comparado contra el LTV blended. Para decisiones tácticas dentro de cada canal (subir/bajar presupuesto en un ad set, pausar una campaña Google) se usa el CAC del canal con la métrica que ofrece la plataforma. La regla práctica que aplicamos: la dirección del negocio mira blended; el media buyer mira por canal. Mezclarlos genera decisiones contradictorias — el media buyer sube presupuesto porque su CAC en plataforma es bueno, mientras el blended se dispara porque el incremental real es bajo."
  },
  {
    q: "¿Por qué mi CAC por canal es mucho mejor que el CAC blended?",
    a: "Casi siempre por dos motivos: (1) atribución last-click duplica conversiones — Meta y Google se apuntan la misma venta porque ambos tocaron al usuario; (2) hay tráfico orgánico, recurrente o de marca que las plataformas se atribuyen pero que habría convertido igual sin pagar. El gap típico que vemos en cuentas D2C españolas es 30-60%: si la suma de CAC por canal da 25€ pero el blended da 38€, sobra atribución en algún sitio. El blended no miente; las plataformas sí."
  },
  {
    q: "¿Cómo calculo el CAC blended correctamente?",
    a: "Fórmula: (gasto total marketing del periodo + costes herramientas + fees agencia) / clientes nuevos del periodo. Cliente nuevo = primera compra histórica, no primera compra del mes. Periodo mínimo recomendado 30 días para amortiguar ciclo de conversión; en tickets altos (>200€) usar 60-90 días. Excluye del numerador costes que no generan adquisición (retención, CRM puro). Excluye del denominador a clientes recurrentes — si los cuentas, infla el resultado y rompe la comparación con LTV de primer pedido."
  },
  {
    q: "¿Qué relación CAC blended / LTV es saludable en eCommerce D2C?",
    a: "Depende del horizonte de LTV considerado. Con LTV a 12 meses, el ratio LTV:CAC blended sano para escalar D2C en España está en 3:1 mínimo — por debajo cuesta crecer sin comerse el margen. En productos de recompra alta (suplementos, café, cosmética) puede aceptarse 2:1 a 12 meses si LTV a 24 meses sube a 4-5:1. En productos de un solo uso (regalo, electrónica) el ratio debe medirse contra margen de la primera venta, no LTV proyectado, y conviene exigir CAC blended ≤60% del margen bruto del primer pedido."
  },
  {
    q: "¿Vale la pena montar Marketing Mix Modeling para resolver el CAC por canal?",
    a: "Sí cuando el negocio supera ~50K€/mes de spend total y hay >2 canales relevantes. Por debajo, MMM es un cañonazo para matar mosca: el coste de implementarlo y mantenerlo no se recupera en eficiencia. Antes que MMM, en cuentas medianas funciona muy bien combinar tres lecturas paralelas: CAC blended (verdad financiera), CAC plataforma (decisión táctica) y geo lift o holdout tests trimestrales para medir incrementalidad real de un canal concreto. Esa triangulación cubre el 80% de las decisiones que tomaría un MMM sin la complejidad."
  },
  {
    q: "¿Cómo afecta iOS y la pérdida de cookies al CAC por canal?",
    a: "Mucho, y desigual. Meta sufrió más que Google porque dependía más de la cookie cross-site, pero ambos han recuperado parte vía modeled conversions y CAPI/Enhanced Conversions. El efecto neto: el CAC por canal que reportan las plataformas hoy mezcla conversiones reales con conversiones modeladas estadísticamente — fiabilidad menor que pre-2021. Por eso el blended ha ganado peso: no depende de cookies, mide outputs (clientes nuevos) contra inputs (gasto total) sin atribución. En cuentas D2C medianas, mirar solo CAC plataforma en 2026 es ir ciego."
  },
];

const CacBlendedVsCacCanalEcommercePage = ({ openCalendly }) => (
  <BlogPostLayout
    title="CAC blended vs CAC por canal: qué métrica usar para escalar un D2C"
    description="Diferencias entre CAC blended y CAC por canal en eCommerce D2C: cuándo usar cada uno, cómo calcularlos sin inflar resultados, ratios LTV:CAC saludables, por qué la suma de CAC por canal no cuadra con el blended y cuándo merece la pena saltar a Marketing Mix Modeling."
    slug="cac-blended-vs-cac-canal-ecommerce"
    datePublished="2026-05-04"
    dateModified="2026-05-04"
    readingTime="9 min"
    category="Métricas"
    keywords={[
      "cac blended ecommerce",
      "cac por canal d2c",
      "blended cac vs platform cac",
      "ltv cac ratio ecommerce",
      "metricas escalado d2c",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      El <strong className="text-white">CAC blended</strong> es la métrica que más fricción genera entre dirección y media buyer en un D2C. La plataforma dice que el CAC en Meta está en 22€, el de Google en 18€, y la dirección mira el dashboard financiero y ve un CAC real de 41€. ¿Quién miente? Ninguno. Están midiendo cosas distintas — y entender la diferencia es lo que separa a los D2C que escalan rentables de los que escalan facturación pero hunden margen.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      En esta guía explicamos qué mide cada CAC, cuándo usar uno u otro, cómo calcularlos sin inflar el dato y qué ratios LTV:CAC son realistas en eCommerce D2C español en 2026.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">CAC blended vs CAC por canal: en qué se diferencian</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Aspecto</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">CAC blended</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">CAC por canal</th>
          </tr>
        </thead>
        <tbody>
          {[
            { a: "Cómo se calcula", b: "Gasto total marketing / clientes nuevos totales", c: "Gasto canal / conversiones atribuidas al canal" },
            { a: "Depende de atribución", b: "No", c: "Totalmente — last-click, data-driven o modelo CRM" },
            { a: "Refleja realidad financiera", b: "Sí (es lo que cuadra con P&L)", c: "Aproximación — suele optimismo plataforma" },
            { a: "Útil para", b: "Decisiones de inversión total y ratios LTV:CAC", c: "Decisiones tácticas dentro del canal" },
            { a: "Sufre con iOS y cookies", b: "Cero", c: "Mucho — ahora con modeled conversions" },
            { a: "Quién la usa", b: "CFO, founder, head of growth", c: "Media buyer, performance manager" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.a}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.b}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La <a href="https://www.shopify.com/blog/customer-acquisition-cost" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de Shopify sobre CAC</a> insiste en lo mismo: el CAC blended es la única métrica que cuadra con el negocio real. Todo lo demás son aproximaciones útiles para tomar decisiones tácticas.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Por qué la suma de CAC por canal nunca cuadra con el blended</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Caso real recurrente en cuentas que auditamos: el CFO ve CAC blended de 38€ y la suma ponderada de CAC por canal da 25€. Gap del 52%. Las causas habituales:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Doble atribución entre plataformas: Meta cuenta una venta porque hizo last-click después de ver un anuncio; Google la cuenta porque el usuario buscó la marca tras ver Meta. Ambos suman, el negocio solo cobra una vez.",
        "Conversiones modeladas: Meta y Google reportan conversiones que no se han observado, las estiman estadísticamente. En 2026 el % modelado puede llegar al 25-35% en cuentas D2C sin CAPI o Enhanced Conversions correctamente configurados.",
        "Tráfico orgánico/marca contado como pago: el usuario buscaba 'marca + producto' y Google Ads se atribuye la venta porque pujó por su propia marca. Esa venta habría sucedido sin spend.",
        "Recurrentes mezclados con nuevos: si el denominador de CAC plataforma incluye recompras, el CAC sale artificialmente bajo. El blended bien calculado solo cuenta clientes nuevos.",
        "Costes ocultos no asignados: fees de agencia, herramientas (Triple Whale, Northbeam, Klaviyo), influencer pagado fuera de plataforma. El blended los recoge, el CAC por canal los ignora.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo calcular el CAC blended sin inflarlo ni desinflarlo</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Fórmula correcta:
    </p>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6 text-white/80 text-sm leading-relaxed">
      <strong className="text-white">CAC blended</strong> = (gasto Meta + gasto Google + otros pagados + fees agencia + herramientas adquisición + influencer/PR pagado) / clientes nuevos del periodo
    </div>
    <p className="text-white/70 leading-relaxed mb-4">
      Reglas de cálculo que evitan errores típicos:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Cliente nuevo = primera compra de su historial, no primera compra del mes. Usa el order_number = 1 del CRM o Shopify, no el filtro 'new customers' de la plataforma.",
        "Periodo mínimo 30 días. Tickets >200€ o ciclo de decisión largo: usa 60-90 días para amortiguar el delay entre clic y compra.",
        "Excluye del numerador costes de retención puros: email marketing transaccional, costes CRM solo para recurrentes, programa de referidos sobre compradores existentes.",
        "Incluye en el numerador todo gasto que toca usuario nuevo: fees de agencia paid media, herramientas de adquisición (no las de retención), gasto en creatividad si es atribuible.",
        "Si tienes orgánico fuerte y quieres aislar el CAC de pago, calcula CAC pagado blended = (gasto pagado total) / (clientes nuevos llegados por canales pagados). Necesitas atribución mínima decente para hacerlo, pero es más útil que el CAC blended global cuando >40% del tráfico es orgánico.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Ratios LTV:CAC blended saludables en D2C español 2026</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Tipo producto</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">LTV horizonte</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Ratio mínimo escalable</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Ratio sano</th>
          </tr>
        </thead>
        <tbody>
          {[
            { t: "Suplementos / café / consumibles recurrentes", l: "12 meses", m: "2,5:1", s: "4:1" },
            { t: "Cosmética / cuidado personal", l: "12 meses", m: "3:1", s: "4-5:1" },
            { t: "Moda D2C", l: "12 meses", m: "3:1", s: "4:1" },
            { t: "Ticket alto / hogar / electrónica", l: "Primer pedido (margen)", m: "CAC ≤60% margen bruto", s: "CAC ≤40% margen bruto" },
            { t: "Producto de un solo uso (regalo)", l: "Primer pedido", m: "CAC ≤50% margen", s: "CAC ≤30% margen" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.t}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.l}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.s}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      El benchmark clásico LTV:CAC 3:1 que circula en blogs anglosajones (popularizado por <a href="https://www.klipfolio.com/resources/kpi-examples/saas/customer-lifetime-value-to-customer-acquisition-ratio" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Klipfolio y otros</a>) viene de SaaS — en eCommerce D2C español hay que ajustarlo a recurrencia y margen real, no aplicarlo plano.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Dashboard único con tres CAC en paralelo: blended (financiero), CAC por canal según plataforma y CAC pagado blended (gasto pagado / clientes nuevos vía pago). Ver los tres elimina discusiones eternas sobre 'cuál es el real'.",
        "Definición compartida con el cliente: qué entra en numerador, qué entra en denominador, qué periodo. Sin esto, cada vez que sube alguien nuevo al equipo se vuelve a discutir el dato.",
        "Revisión mensual de gap blended vs suma plataforma: si crece más del 60%, hay problema de atribución (CAPI mal, marca pujada por Google, exceso modeled). Lo investigamos antes de tomar decisiones de presupuesto.",
        "Decisiones de escalado a nivel negocio sobre CAC blended + LTV a 12m. Decisiones tácticas dentro de Meta/Google sobre métricas plataforma con ROAS objetivo derivado del blended.",
        "Holdout o geo-lift trimestral en cuentas >30K€/mes spend: apagamos un canal en una región durante 2-4 semanas para medir incrementalidad real. Es la única forma rigurosa de saber qué pasaría sin ese canal.",
        "MMM solo cuando spend supera 50K€/mes y hay >2 canales relevantes. Por debajo, la triangulación blended + plataforma + holdouts cubre el 80% de decisiones sin la complejidad.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu CAC plataforma y tu CAC financiero no cuadran?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos cómo calculas CAC blended, qué atribución usas y dónde está el gap real entre lo que dice la plataforma y lo que cuadra en P&L.</p>
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
        <Link to="/blog/cac-vs-ltv-ecommerce-escalable" className="text-white font-semibold hover:text-white/80">
          CAC vs LTV: cómo construir un eCommerce escalable →
        </Link>
        <p className="text-white/40 text-xs mt-1">Marco completo para usar la relación CAC:LTV en decisiones de inversión y precio</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/benchmark-roas-sector-espana-2026" className="text-white font-semibold hover:text-white/80">
          Benchmark ROAS por sector en España 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo derivar tu ROAS objetivo desde el CAC blended y márgenes reales del sector</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/metricas-meta-ads-importantes-ecommerce" className="text-white font-semibold hover:text-white/80">
          Métricas de Meta Ads que importan en eCommerce →
        </Link>
        <p className="text-white/40 text-xs mt-1">Qué mirar dentro de la plataforma cuando ya tienes el CAC blended bajo control</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/checklist-auditoria-campanas-paid-media" className="text-white font-semibold hover:text-white/80">
          Checklist para auditar campañas de paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo detectar problemas de atribución que inflan el CAC plataforma frente al blended</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default CacBlendedVsCacCanalEcommercePage;
