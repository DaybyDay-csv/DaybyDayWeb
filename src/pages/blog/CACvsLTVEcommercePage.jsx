import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es la relación LTV/CAC y por qué se usa para saber si un D2C es escalable?",
    a: "El LTV/CAC mide cuánto vale un cliente a lo largo de su vida (Lifetime Value) frente a lo que cuesta adquirirlo (Customer Acquisition Cost). En eCommerce D2C español, el umbral operativo de salud es 3:1 — por cada euro invertido en adquisición se recuperan tres en margen bruto a lo largo del ciclo de vida del cliente. Por debajo de 2:1, el negocio paga adquisición con caja propia y no tiene margen para reinvertir; por encima de 4:1, normalmente está infrainvirtiendo y dejando crecimiento sobre la mesa. Para escalar Meta Ads sin romper rentabilidad, este ratio importa más que el ROAS de plataforma, porque el ROAS no contabiliza ni recompras ni costes reales del producto.",
  },
  {
    q: "¿Cómo se calcula el LTV de un eCommerce D2C de forma realista?",
    a: "La fórmula simple es: AOV × Margen bruto × Número medio de compras por cliente en una ventana fija (12 o 24 meses). En D2C el error más común es usar LTV teórico 'a vida' — para escalar adquisición con seguridad se trabaja con LTV a 90 o 180 días, que es el dinero que el cliente realmente devuelve dentro de un ciclo de caja útil. Por ejemplo, si tu AOV es 65€, margen bruto 60% y un cliente compra de media 1,8 veces en 180 días, el LTV-180d es 65 × 0,60 × 1,8 = 70,2€. Ese es el techo real para tu CAC, no el LTV teórico a 24 meses que tarda dos años en cobrarse.",
  },
  {
    q: "¿Cuál es un CAC bueno para un eCommerce D2C en España?",
    a: "No existe un CAC bueno absoluto — depende del LTV, el margen y el ciclo de caja. La regla operativa que aplicamos en DayByDay: el CAC máximo aceptable es LTV-180d × 0,40-0,50. Si tu LTV-180d es 70€, el CAC tope viable es 28-35€ para mantener un ratio LTV/CAC de 2,5-3,5x con caja sana. En sectores con recompra alta (suplementos, belleza, alimentación) se puede tensar más; en moda o producto único de ticket alto, el CAC tiene que ser más conservador porque la repetición es menor. La pregunta correcta nunca es '¿es alto?' sino '¿lo recupera el LTV antes de que se rompa la caja?'.",
  },
  {
    q: "¿Por qué el ROAS no es suficiente para saber si mi D2C escala?",
    a: "El ROAS de plataforma sobreestima entre un 20% y un 35% en cuentas D2C españolas en 2026 — atribuye conversiones que ya iban a ocurrir y no descuenta coste de mercancía, envío, devoluciones ni gastos de operación. Tres cuentas con ROAS 3 pueden tener una rentable y dos perdiendo dinero según margen y recurrencia. Para escalar, las métricas que mandan son CAC real (gasto en ads / clientes nuevos), nCPA (CPA solo de nuevos clientes excluyendo retargeting), MER (revenue total / inversión en marketing) y LTV/CAC. El ROAS sirve para gestionar puja y creatividades dentro de la cuenta, no para tomar decisiones de inversión sobre el negocio.",
  },
  {
    q: "¿Qué payback period es razonable en un eCommerce D2C antes de meterle más gasolina?",
    a: "El payback period es el tiempo que tarda un cliente en devolver lo que costó adquirirlo en margen bruto. En D2C español saludable está entre 60 y 120 días con un objetivo razonable de <90 días si el negocio se autofinancia. Por encima de 180 días la operación necesita capital externo o ralentizar adquisición. Cómo calcularlo: divide CAC entre el margen bruto generado por cliente al mes. Ejemplo, CAC 30€ y un cliente deja 12€ de margen al mes → payback 2,5 meses. Antes de subir presupuesto un 30% o más, este número tiene que estar bajo control — si no, la siguiente ronda de escala te asfixia el cash flow.",
  },
  {
    q: "¿Cómo se mejora el ratio LTV/CAC sin bajar el ritmo de adquisición?",
    a: "Hay dos palancas y se trabajan en paralelo. La primera es subir LTV: aumentar AOV con bundles y cross-sell, activar email/WhatsApp para empujar segunda compra dentro de los primeros 30 días, lanzar suscripciones cuando el producto lo permita, y mejorar la experiencia post-compra para subir tasa de recompra. La segunda es bajar CAC: mejorar tracking server-side (recupera 15-25% de conversiones perdidas por iOS), separar adquisición de retargeting para ver el CAC real, refinar audiencias con lookalikes sobre top 10% LTV, y subir el ratio de creativos ganadores con un sistema de testing serio. Subir LTV un 20% y bajar CAC un 15% multiplica el ratio sin tocar la inversión.",
  },
  {
    q: "¿Cuál es la diferencia entre CAC blended y CAC por canal, y cuál usar para escalar?",
    a: "CAC blended es la inversión total de marketing dividida entre clientes nuevos totales (incluye Meta Ads, Google Ads, contenido, email, orgánico). CAC por canal aísla cada fuente. Para tomar decisiones de negocio (¿podemos meter más gasolina al mes que viene?) manda el blended, porque es el coste real de adquirir un cliente sumando todo. Para optimizar dentro de un canal manda el CAC por canal — pero hay que descontar el efecto de retargeting y considerar que Meta Ads suele atribuirse conversiones que vienen de orgánico. La regla práctica: planifica con CAC blended, gestiona con CAC por canal, y vigila el ratio entre ambos para detectar cuándo un canal infla su rendimiento aparente.",
  },
  {
    q: "¿Cuándo deja de ser escalable un D2C aunque el ROAS parezca bueno?",
    a: "Cuando el LTV/CAC se acerca a 2:1 y la frecuencia de recompra cae por debajo del histórico, aunque el ROAS de Meta siga en 2,5-3. Señales tempranas: el nCPA sube semana a semana sin que aumente la inversión, el MER cae por debajo de 2,5, y el payback period supera los 150 días. En ese punto seguir metiendo gasolina destruye caja, no escala. Lo que toca es congelar inversión adicional, auditar tracking, separar adquisición de retargeting con métricas limpias y trabajar LTV antes de volver a abrir el grifo. Escalar sin estas métricas es la forma más cara de descubrir que no eras escalable.",
  },
];

const CACvsLTVEcommercePage = ({ openCalendly }) => (
  <BlogPostLayout
    title="CAC vs LTV: la métrica que define si tu D2C es escalable"
    description="Cómo calcular CAC y LTV de forma realista en un eCommerce D2C, qué ratio LTV/CAC indica que el negocio escala, payback period razonable y palancas concretas para mejorarlo sin frenar adquisición. Con tabla de benchmarks por sector y errores que destruyen caja."
    slug="cac-vs-ltv-ecommerce-escalable"
    datePublished="2026-04-28"
    dateModified="2026-04-28"
    readingTime="9 min"
    category="Estrategia"
    keywords={["cac ltv ecommerce", "ltv cac d2c", "customer acquisition cost ecommerce", "lifetime value d2c", "payback period ecommerce"]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">La relación CAC/LTV es la métrica que decide si un eCommerce D2C es escalable o solo parece rentable</strong>. Hemos auditado decenas de cuentas con ROAS de plataforma por encima de 3 que estaban perdiendo dinero — y otras con ROAS 2 que escalaban con caja sana. La diferencia siempre estuvo en el mismo sitio: cuánto cuesta de verdad un cliente nuevo y cuánto devuelve antes de que la caja se rompa.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Este artículo es la guía práctica que damos a los founders D2C que llegan a DayByDay queriendo subir presupuesto. Sin este cálculo bien hecho, escalar Meta Ads no es crecimiento: es acelerar una pérdida. Con él, las decisiones de inversión dejan de depender del feeling y pasan a ser matemáticas.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué son CAC y LTV y por qué se miran juntos</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      <strong className="text-white">CAC (Customer Acquisition Cost)</strong> es lo que te cuesta conseguir un cliente nuevo: inversión total de marketing dividida entre clientes nuevos en un periodo. <strong className="text-white">LTV (Lifetime Value)</strong> es el margen bruto que ese cliente devuelve a lo largo de su relación con la marca. La pregunta de fondo es simple: ¿cuánto pagas por una factura y cuánto te genera esa factura antes de que cierre la caja del mes?
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Según el <a href="https://www.shopify.com/blog/customer-lifetime-value" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">benchmark de Shopify para D2C</a>, los eCommerce que escalan de forma sostenida mantienen un LTV/CAC entre 3:1 y 4:1 en ventana de 12 meses. Por debajo, queman caja; por encima, suelen estar dejando crecimiento sobre la mesa. Es el rango donde el negocio se autofinancia y deja margen para reinvertir en operaciones, equipo y nueva oferta.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo calcular el LTV sin engañarte</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El error clásico es trabajar con LTV teórico a vida — un número que tarda 24 meses en cobrarse y no sirve para decidir si subir presupuesto el mes que viene. Para escalar adquisición con seguridad usamos LTV a 90 y 180 días: el dinero que el cliente devuelve dentro de un ciclo de caja útil.
    </p>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-semibold mb-2">Fórmula operativa de LTV-180d</p>
      <p className="text-white/70 text-sm mb-3 font-mono">LTV-180d = AOV × Margen bruto × Compras medias en 180 días</p>
      <p className="text-white/55 text-sm">Ejemplo D2C suplementos: AOV 55€ × Margen 65% × 2,1 compras/180d = 75,7€ de LTV-180d. Ese es el techo para fijar el CAC máximo aceptable, no un número a 24 meses.</p>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Para que el LTV refleje la realidad y no la ilusión, descuenta del margen bruto: coste de mercancía, envío, devoluciones (entre 4% y 15% según sector) y procesado de pago. El LTV "limpio" es lo que de verdad puedes reinvertir en adquirir el siguiente cliente sin endeudarte.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo calcular el CAC real (no el que muestra Meta)</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El CAC que importa no es el que aparece en el dashboard de Meta. Es el CAC blended: toda la inversión de marketing del periodo dividida entre clientes nuevos del periodo. Incluye Meta Ads, Google Ads, herramientas, agencia o freelancer, contenido pagado y cualquier coste atribuible a adquisición.
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Métrica</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Qué mide</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cuándo usarla</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "CAC blended", s: "Inversión total marketing / clientes nuevos totales", f: "Decisiones de negocio y presupuesto global" },
            { c: "CAC por canal", s: "Gasto del canal / clientes nuevos atribuidos", f: "Optimización dentro de cada canal" },
            { c: "nCPA (CPA new customer)", s: "Gasto Meta / clientes nuevos (sin retargeting)", f: "Saber el coste real de adquirir cliente frío" },
            { c: "MER", s: "Revenue total / inversión total en marketing", f: "Métrica de verdad para Q4 y picos de venta" },
            { c: "ROAS plataforma", s: "Revenue atribuido / gasto en plataforma", f: "Gestión interna de puja y creativo" },
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
      En cuentas D2C españolas auditadas en 2026, el CAC blended suele ser entre un 30% y un 60% mayor que el CPA reportado por Meta. Tomar decisiones con el CPA de plataforma es la forma más rápida de escalar una pérdida.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">El ratio LTV/CAC: qué significa cada nivel</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Ratio LTV/CAC</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Diagnóstico</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Acción recomendada</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "<1:1", s: "Pierdes dinero con cada cliente nuevo", f: "Frenar adquisición. Auditar tracking, márgenes y propuesta de valor" },
            { c: "1:1 — 2:1", s: "Apenas cubres adquisición, sin margen para operación", f: "Mantener inversión. Trabajar LTV (recompra, AOV) antes de escalar" },
            { c: "2:1 — 3:1", s: "Zona límite, sostenible solo con caja propia", f: "Optimizar embudo y tracking server-side. Reducir CAC en 15-20%" },
            { c: "3:1 — 4:1", s: "Saludable. El negocio se autofinancia y deja margen", f: "Escalar adquisición de forma controlada (+20-30% mensual)" },
            { c: ">4:1", s: "Probablemente infrainvertido", f: "Aumentar inversión y testar canales nuevos. Hay crecimiento dejado en la mesa" },
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

    <h2 className="text-2xl font-black mt-10 mb-4">Payback period: el límite que la caja no perdona</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El payback period es el tiempo que tarda un cliente en devolver en margen bruto lo que costó adquirirlo. Es el límite real para subir el grifo de Meta Ads — si tu payback es 200 días pero tu proveedor cobra a 60, no importa que el LTV/CAC sea 3:1: la caja se rompe antes.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Según los benchmarks de <a href="https://www.thinkwithgoogle.com/marketing-strategies/data-and-measurement/customer-lifetime-value/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Think with Google sobre LTV en retail</a>, los D2C europeos que escalan de forma sostenible mantienen un payback &lt;90 días. Cómo calcularlo:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Calcula el margen bruto medio que un cliente genera al mes (no en su primera compra — en media mensual del primer trimestre).",
        "Divide CAC entre ese margen mensual. Resultado: payback en meses.",
        "Si el payback es <60 días, puedes acelerar adquisición. Entre 60 y 120 días, mantén ritmo. Entre 120 y 180, optimiza antes de escalar. >180 días, congela y revisa.",
        "Cruza el payback con el ciclo de cobro de proveedores y plataformas. Si proveedores cobran a 30 días y tu payback es 90, necesitas colchón de caja de al menos 60 días.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Palancas reales para mejorar el ratio LTV/CAC</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Mejorar el ratio se trabaja por dos lados: subir LTV y bajar CAC. Atacar los dos en paralelo multiplica el efecto sin necesidad de subir presupuesto.
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          num: "1",
          titulo: "Activar segunda compra dentro de los primeros 30 días",
          desc: "Email + WhatsApp con flujo post-compra, oferta calibrada al producto comprado y plazo realista. Subir tasa de segunda compra del 18% al 28% sube LTV-180d entre un 20% y un 35% sin tocar adquisición.",
        },
        {
          num: "2",
          titulo: "Subir AOV con bundles y cross-sell",
          desc: "Bundles temáticos en página de producto, cross-sell en checkout y umbrales de envío gratis calibrados al ticket. Subir AOV un 15% en un D2C con margen 60% sube LTV en proporción directa.",
        },
        {
          num: "3",
          titulo: "Implementar tracking server-side (Conversions API)",
          desc: "Recupera entre un 15% y un 25% de conversiones perdidas por iOS y mejora la calidad de optimización de Meta. Efecto neto: el mismo gasto trae más clientes nuevos y baja el CAC real un 10-20%.",
        },
        {
          num: "4",
          titulo: "Separar adquisición de retargeting",
          desc: "Mezclar TOFU y retargeting en la misma campaña infla el ROAS y oculta que el frío no funciona. Separados, ves el nCPA real y puedes subir el creative testing en TOFU sin tocar el retargeting que ya rinde.",
        },
        {
          num: "5",
          titulo: "Lookalikes sobre top 10% LTV, no sobre Purchase total",
          desc: "Una audiencia LAL al 1% sobre tus 1.000 mejores clientes (LTV alto + recompra) bate sistemáticamente a un LAL al 5% sobre toda la base de compradores. Mejora la calidad del cliente nuevo y baja el CAC ajustado por LTV.",
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

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay un análisis CAC/LTV</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Antes de proponer cualquier subida de presupuesto a un cliente nuevo, este es el bloque de análisis que ejecutamos en la primera semana:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Día 1 — Extracción de datos brutos: pedidos de Shopify de los últimos 12 meses con clasificación cliente nuevo / recurrente, CSV de gastos de marketing por canal, costes de mercancía y devoluciones.",
        "Día 2 — Cálculo de LTV-90d y LTV-180d por cohorte mensual. Detectamos si la recompra está estable, mejorando o cayendo — y si hay sectores del catálogo con LTV mucho mayor que el medio.",
        "Día 3 — Cálculo de CAC blended, nCPA y MER mensuales en ventana de 6 meses. Cruzamos con la inversión por canal para identificar qué canal tiene el mejor LTV/CAC ajustado.",
        "Día 4 — Payback period real considerando ciclo de cobro de proveedores. Resultado: cuánta gasolina puede meter el negocio sin tensar caja.",
        "Día 5 — Roadmap 90 días: dos palancas para subir LTV (recompra + AOV), dos para bajar CAC (tracking + estructura) y plan de inversión escalonado con KPIs semanales.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      En el 70% de las cuentas D2C que llegan a DayByDay, el LTV/CAC real es entre un 20% y un 40% peor que el que calculaba el founder con datos parciales. La buena noticia: trabajando en paralelo recompra, tracking y estructura, en 90 días suele recuperarse el rango 3:1 sin necesidad de bajar inversión.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Quieres saber tu LTV/CAC real antes de subir presupuesto?</p>
      <p className="text-white/50 text-sm mb-4">Auditamos gratis tu CAC blended, nCPA, LTV-180d y payback period. Te decimos si tu D2C escala con caja sana o si necesita trabajar LTV antes de meter más gasolina.</p>
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
        <Link to="/blog/cac-blended-vs-cac-canal-ecommerce" className="text-white font-semibold hover:text-white/80">
          CAC blended vs CAC por canal: qué métrica usar para escalar →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué el CAC plataforma y el CAC financiero nunca cuadran y cuál usar para cada decisión</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/email-marketing-meta-ads-ltv-d2c" className="text-white font-semibold hover:text-white/80">
          Email marketing + Meta Ads: cómo combinar paid y owned para escalar LTV →
        </Link>
        <p className="text-white/40 text-xs mt-1">Los 5 flujos email obligatorios que disparan la segunda compra y elevan LTV sobre el CAC Meta</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/estrategia-full-funnel-d2c" className="text-white font-semibold hover:text-white/80">
          Estrategia full funnel D2C: del frío al cliente recurrente →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo la capa de retención (email + WhatsApp) dilata el LTV y permite seguir subiendo CAC sin romper unit economics</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cuanto-invertir-meta-ads-calculadora" className="text-white font-semibold hover:text-white/80">
          Cuánto invertir en Meta Ads según tu ticket y margen (con calculadora) →
        </Link>
        <p className="text-white/40 text-xs mt-1">Aplica tu LTV y margen en la calculadora para obtener CAC objetivo y presupuesto Meta recomendado</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-ecommerce-d2c-100k-1m-paid-media" className="text-white font-semibold hover:text-white/80">
          Cómo escalar un eCommerce D2C de 100K a 1M€ con paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">El sistema completo de validación de hipótesis, MER, nCPA y LTV/CAC para escalar sin romper rentabilidad</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/metricas-meta-ads-importantes-ecommerce" className="text-white font-semibold hover:text-white/80">
          Métricas Meta Ads que importan de verdad (y las que no) →
        </Link>
        <p className="text-white/40 text-xs mt-1">MER, nCPA y CPA real frente al ROAS de plataforma: las métricas que mandan en decisiones de inversión</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/benchmark-roas-sector-espana-2026" className="text-white font-semibold hover:text-white/80">
          Benchmark ROAS por sector en España 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">Tabla comparativa de 10 sectores D2C españoles para contextualizar tu LTV/CAC frente a la media</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-campanas-meta-ads-sin-romper-roas" className="text-white font-semibold hover:text-white/80">
          Cómo escalar campañas Meta Ads sin romper el ROAS →
        </Link>
        <p className="text-white/40 text-xs mt-1">Protocolo de subida de presupuesto basado en payback period y nCPA, no en ROAS de plataforma</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default CACvsLTVEcommercePage;
