import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es exactamente un cohort analysis en eCommerce D2C?",
    a: "Cohort analysis es una técnica que agrupa clientes según un evento común — habitualmente el mes de su primera compra — y sigue su comportamiento (recompra, gasto acumulado, retención) en el tiempo. En lugar de mirar la métrica agregada del negocio (que mezcla clientes nuevos y antiguos y oculta tendencias), miras cómo se comporta cada cohorte de adquisición. Es la única forma fiable de saber si los clientes nuevos de hoy son mejores, iguales o peores que los de hace 12 meses — y por tanto, si tu D2C realmente está mejorando o solo está creciendo en facturación pero degradándose en calidad."
  },
  {
    q: "¿Qué métricas se miden en un cohort analysis para D2C?",
    a: "Las cuatro críticas: (1) tasa de recompra a 30/60/90/180/365 días — qué % de la cohorte vuelve a comprar; (2) LTV acumulado por cohorte en cada hito temporal; (3) frecuencia de compra (pedidos por cliente acumulados); (4) AOV de la cohorte vs cohortes anteriores. La quinta opcional pero potente: payback period — cuántos meses tarda una cohorte en cubrir su CAC. En cuentas que auditamos, el simple cruce de payback period vs CAC blended detecta más del 60% de los problemas de escalado antes de que aparezcan en la cuenta de resultados."
  },
  {
    q: "¿Cuántas cohortes mínimas necesito para que el análisis sea útil?",
    a: "Mínimo 6 cohortes mensuales con >50 clientes cada una para detectar tendencias con cierta solidez. Con 12 cohortes ya puedes ver estacionalidad anual y diferenciar entre cohortes Q4 (Black Friday, peor calidad) y cohortes Q1-Q3 (mejor calidad). Por debajo de 50 clientes/cohorte el ruido estadístico hace que cualquier curva de retención sea poco fiable; en ese caso conviene agrupar en cohortes trimestrales en lugar de mensuales hasta tener volumen."
  },
  {
    q: "¿Cómo detecto que mi D2C está degradándose con cohortes aunque la facturación crezca?",
    a: "Tres patrones rojos típicos: (1) la tasa de recompra a 90 días de las cohortes recientes es inferior a las cohortes de hace 12 meses — significa que los clientes nuevos son peores; (2) el LTV a 6 meses de cohortes nuevas baja mientras el CAC sube — payback se alarga; (3) las cohortes adquiridas durante picos de spend (sales, BFCM) tienen retención significativamente peor que las orgánicas — el escalado paid está trayendo peor cliente. Si ves los tres, estás escalando facturación a costa de margen futuro, aunque el dashboard mensual diga lo contrario."
  },
  {
    q: "¿Sirven Shopify Analytics o GA4 para hacer cohort analysis serio?",
    a: "Para algo básico, sí. Shopify Analytics tiene reportes de retención por cohorte de adquisición y GA4 ofrece informe de cohortes de retención. Para análisis serio en D2C >100K€/mes ambos se quedan cortos: Shopify mezcla canales y no permite cruzar con CAC; GA4 mide visitas, no clientes. La realidad práctica es que la mayoría de D2C medianos hace cohort analysis en hojas (PostgreSQL/BigQuery + Looker o Sheets) o usa herramientas específicas como Triple Whale, Lifetimely o Polar Analytics — todas tienen vista de cohortes nativa cruzada con spend de marketing."
  },
  {
    q: "¿Qué payback period es bueno en eCommerce D2C español?",
    a: "Depende mucho de margen y recurrencia, pero rangos saludables que vemos: en consumibles (suplementos, café, cosmética con recompra alta) un payback de 2-4 meses es saludable, 6 meses es el límite aceptable. En moda y hogar 4-8 meses. En ticket alto/un solo uso, payback debe ser <1 pedido — el primer pedido tiene que cubrir CAC. Por encima de esos rangos, escalar significa quemar caja: cada nuevo cliente exige financiación durante meses antes de generar margen positivo, y eso solo es viable si hay capital de inversión asegurado."
  },
  {
    q: "¿Cómo cruzo cohort analysis con decisiones de paid media?",
    a: "Tres palancas concretas: (1) si una cohorte adquirida vía un canal concreto (ej. TikTok Ads) tiene retención significativamente peor que la media, ese canal está trayendo tráfico de peor calidad aunque el CAC plataforma parezca bueno — hay que reasignar presupuesto; (2) si las cohortes BFCM son peores, conviene reducir descuentos agresivos o filtrar audiencias para evitar cazadores de oferta; (3) la curva de LTV por cohorte permite calcular un ROAS objetivo realista — si tu LTV a 12 meses es 180€ con margen 40% y quieres payback en 6 meses, el ROAS objetivo de primer pedido se deriva de esos números, no de un benchmark genérico de internet."
  },
];

const CohortAnalysisEcommerceD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Cohort analysis para eCommerce D2C: la métrica que predice si tu negocio escala"
    description="Cómo usar cohort analysis para detectar si tu D2C está escalando con clientes de calidad o degradándose: métricas clave (retención, LTV acumulado, payback), número mínimo de cohortes para ser fiables, patrones que delatan un escalado tóxico, herramientas reales (Shopify, Triple Whale, Lifetimely) y cómo cruzar cohortes con decisiones de paid media."
    slug="cohort-analysis-ecommerce-d2c"
    datePublished="2026-05-04"
    dateModified="2026-05-04"
    readingTime="10 min"
    category="Métricas"
    keywords={[
      "cohort analysis ecommerce",
      "cohort analysis d2c",
      "retencion cohortes ecommerce",
      "payback period d2c",
      "ltv por cohorte",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      El <strong className="text-white">cohort analysis</strong> es la métrica que más D2C ignoran y la que mejor predice si un eCommerce está escalando bien o quemando caja en silencio. Mientras el dashboard mensual celebra crecimiento de facturación, las cohortes pueden estar diciéndote que los clientes nuevos repiten menos, gastan menos y tardan más en cubrir su CAC. La facturación crece, el negocio empeora — y en 6-12 meses lo nota la cuenta de resultados.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      En esta guía explicamos cómo montar un cohort analysis útil para eCommerce D2C, qué métricas medir, qué patrones avisan de problemas y cómo cruzarlo con decisiones de paid media para escalar sin romper el negocio.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué mide cada tipo de cohorte y para qué sirve</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Tipo de cohorte</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Qué mide</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Decisión que habilita</th>
          </tr>
        </thead>
        <tbody>
          {[
            { a: "Cohorte mensual de adquisición", b: "Retención y LTV acumulado por mes de primera compra", c: "Detectar si el cliente nuevo está mejorando o degradándose" },
            { a: "Cohorte por canal", b: "Calidad del cliente que trae cada canal de paid", c: "Reasignar presupuesto entre Meta, Google, TikTok según LTV real" },
            { a: "Cohorte por campaña/creatividad", b: "Calidad del cliente que captura cada anuncio", c: "Pausar creativos que traen tráfico barato pero no recompra" },
            { a: "Cohorte por producto de entrada", b: "LTV en función del primer SKU comprado", c: "Decidir qué producto destacar en paid como puerta de entrada" },
            { a: "Cohorte por descuento aplicado", b: "Retención de quien entra con cupón vs sin cupón", c: "Calibrar política de descuentos sin destruir margen futuro" },
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
      La mayoría de D2C españoles solo mira la primera (cohorte mensual). Las cuatro siguientes son las que diferencian la operativa de un media buyer senior: permiten decisiones de inversión basadas en LTV real, no en CAC plataforma. <a href="https://www.shopify.com/blog/cohort-analysis" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Shopify documenta el reporte de cohortes nativo</a> y conviene tenerlo activado siempre como mínimo común.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 4 métricas que toda cohorte D2C debe medir</h2>
    <div className="space-y-3 mb-6">
      {[
        "Tasa de recompra acumulada a 30 / 60 / 90 / 180 / 365 días: % de la cohorte que ha hecho una segunda compra antes de cada hito. Es el primer indicador de si el producto y el cliente encajan.",
        "LTV acumulado por cohorte: gasto medio acumulado por cliente en cada hito temporal. Permite comparar cohortes entre sí y proyectar LTV final cuando aún no han pasado 12 meses.",
        "Frecuencia de pedidos: pedidos medios por cliente acumulados. En productos con recompra alta (suplementos, café), una caída de 0,3 a 0,2 pedidos a los 90 días es una alarma temprana antes de que el LTV se hunda.",
        "Payback period: cuántos meses tarda la cohorte en generar margen acumulado igual al CAC blended con el que se adquirió. Es la métrica financiera real de salud del escalado — si crece mes a mes, estás escalando contra tu propio cash flow.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Patrones rojos: cuándo el cohort analysis avisa de problemas</h2>
    <div className="space-y-3 mb-6">
      {[
        "Recompra a 90 días bajando 3 meses seguidos: las últimas cohortes repiten menos que las anteriores. Casi siempre significa que el escalado de paid está trayendo cliente menos cualificado — pasa cuando se sube presupuesto sin tocar segmentación o creatividad.",
        "LTV de cohortes BFCM (noviembre/diciembre) <70% del LTV de cohortes Q1-Q3: el cliente cazaoportunidades no recompra. Si tu spend Q4 representa >40% del año, esto deforma todo el modelo financiero.",
        "Payback period creciendo mientras CAC se mantiene: el problema no es que sea más caro adquirir, es que el cliente nuevo retiene peor. Subida de CPMs no lo explica.",
        "Cohortes de un canal con LTV muy inferior al resto a 6 meses: ese canal trae visita barata pero no cliente real. Pasa con frecuencia en TikTok Ads y campañas Advantage+ Shopping mal configuradas.",
        "Frecuencia de pedido cayendo sin caída paralela en AOV: clientes compran una vez y no vuelven. Producto correcto, expectativa equivocada — habitualmente por discordancia entre el creativo y la experiencia post-compra.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Payback period saludable por tipo de D2C español</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Tipo producto</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Payback saludable</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Límite aceptable</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Señal de alarma</th>
          </tr>
        </thead>
        <tbody>
          {[
            { t: "Suplementos / café / consumibles", p: "2-4 meses", l: "6 meses", s: ">8 meses" },
            { t: "Cosmética con recompra", p: "3-5 meses", l: "7 meses", s: ">9 meses" },
            { t: "Moda D2C", p: "4-6 meses", l: "9 meses", s: ">12 meses" },
            { t: "Hogar / decoración", p: "Primer pedido", l: "2 pedidos", s: "Más de 12 meses" },
            { t: "Ticket alto / único uso", p: "Primer pedido (margen >CAC)", l: "Primer pedido", s: "CAC > margen primer pedido" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.t}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.l}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.s}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Estos rangos los derivamos de cuentas D2C españolas que auditamos en sectores moda, suplementos, cosmética y hogar. Coinciden razonablemente con benchmarks internacionales que publica <a href="https://www.klaviyo.com/blog/customer-lifetime-value-benchmarks" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Klaviyo en su informe de LTV por industria</a>, ajustando margen y AOV al mercado español.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Cohort dashboard mensual cruzado con CAC blended por cohorte: misma vista combina retención, LTV acumulado y payback period sobre el CAC con el que se adquirió esa cohorte. Sin esto, los datos sueltos no producen decisiones.",
        "Cohortes por canal y campaña en cuentas con >2 canales activos: Meta, Google, TikTok, orgánico y email. Es la única forma de descubrir que un canal con CAC bajo está trayendo cliente con LTV un 40% inferior — pasa más de lo que parece.",
        "Revisión trimestral de cohortes BFCM vs cohortes orgánicas Q2-Q3: si el gap supera el 30%, recalibramos política de descuentos y filtros de audiencia para Q4 siguiente.",
        "Proyección de LTV a 12 meses desde cohortes de 90 días: con datos de 3 meses se puede estimar LTV final con error <15% si la cohorte tiene volumen suficiente. Permite tomar decisiones de inversión sin esperar un año entero.",
        "Reglas de escalado paid derivadas del payback objetivo: si el cliente quiere payback ≤6 meses, el ROAS objetivo de primera compra se calcula desde ahí — no desde benchmarks genéricos. Esto evita escalar facturación con CAC que el negocio no puede aguantar.",
        "Herramientas: BigQuery + Looker Studio para cuentas >50K€/mes, o Triple Whale / Lifetimely para escalas menores. Shopify Analytics para validar cifras pero no como fuente única de verdad.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu D2C crece en facturación pero no sabes si las cohortes mejoran?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos tus cohortes de adquisición de los últimos 12 meses y detectamos si el escalado está trayendo cliente de calidad o degradando el negocio.</p>
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
        <Link to="/blog/cac-blended-vs-cac-canal-ecommerce" className="text-white font-semibold hover:text-white/80">
          CAC blended vs CAC por canal: qué métrica usar para escalar un D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">El CAC que se cruza con cohortes para calcular payback period real</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cac-vs-ltv-ecommerce-escalable" className="text-white font-semibold hover:text-white/80">
          CAC vs LTV: cómo construir un eCommerce escalable →
        </Link>
        <p className="text-white/40 text-xs mt-1">Marco completo CAC:LTV con LTV proyectado desde cohortes</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-ecommerce-d2c-100k-1m-paid-media" className="text-white font-semibold hover:text-white/80">
          Cómo escalar un eCommerce D2C de 100K€ a 1M€ con paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo las cohortes evitan escalar facturación a costa de margen futuro</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/metricas-meta-ads-importantes-ecommerce" className="text-white font-semibold hover:text-white/80">
          Métricas de Meta Ads que importan en eCommerce →
        </Link>
        <p className="text-white/40 text-xs mt-1">Métricas plataforma que se cruzan con cohortes para decisiones de escalado</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default CohortAnalysisEcommerceD2cPage;
