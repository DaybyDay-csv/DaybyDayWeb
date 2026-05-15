import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Cuándo está un D2C español preparado para internacionalizar con Meta Ads?",
    a: "Un D2C español está preparado para internacionalizar con Meta Ads cuando cumple cuatro condiciones operativas. (1) MER blended ≥2,2x en España con margen contribución positivo durante al menos 6 meses; sin negocio sano en mercado local, exportar problemas solo amplifica las pérdidas. (2) Pipeline de creatividades sostenido (4-8 variantes/mes) con sistema de UGC propio o adaptable; no se puede sostener Meta multi-país solo con piezas reutilizadas. (3) Logística cross-border resuelta: courier con coste predecible <12-18% del AOV, plazo entrega 2-5 días laborables y política de devolución en local del país. (4) Conversions API server-side con Event Match Quality ≥7/10 y feed Shopify multi-currency funcionando. Sin estas cuatro, lanzar Meta en PT/IT/FR/DE se convierte en una sangría de spend con CPA 35-60% peor que España."
  },
  {
    q: "¿Cuál es el orden recomendado de países para internacionalizar un D2C desde España?",
    a: "El orden recomendado para un D2C español que internacionaliza en EU es: (1) Portugal — proximidad logística, idioma adyacente, CPMs 25-40% más baratos que España, ideal para validar producto fuera de mercado local con riesgo limitado. (2) Italia — D2C maduro, CPMs similares a España, audiencias receptivas a moda/belleza/alimentación premium, pero exige adaptación creativa real (idioma+visual). (3) Francia — alto poder adquisitivo, CPMs 30-50% más altos que España, mercado exigente con copy y diseño localizado, regulación de promos restrictiva. (4) Alemania — mayor mercado D2C europeo en valor, pero CPMs 40-70% más altos que España, requiere creatividades nativas en alemán, traducciones literales fracasan. (5) Países Bajos / Bélgica / Austria — mercados secundarios que se activan como capas adicionales una vez los grandes están consolidados. Saltarse Portugal y empezar directamente en Francia o Alemania es el error más caro: el CPA puede ser 2-3x España durante meses."
  },
  {
    q: "¿Hay que crear ad accounts y Business Managers separados por país?",
    a: "Para D2C que están empezando a internacionalizar (1-3 países nuevos en EU) la práctica DayByDay es: un único Business Manager con un único ad account por marca, organizando los países dentro de campañas separadas con naming convention rígida ([ES]/[PT]/[IT]/[FR]/[DE]) y exclusiones geográficas correctas. Esto consolida señal en el pixel/CAPI, simplifica el catálogo Shopify multi-currency y permite que el algoritmo aprenda con más conversiones agregadas. Cuando un mercado pasa de >15-25K€/mes en spend y exige reporting fiscal o moneda separada, conviene migrar a un ad account dedicado por país (o región: Iberia, DACH, France, Italia). La excepción son marcas con razón social diferente por país: ahí sí hace falta un ad account independiente desde el día 1 por requisitos fiscales y de facturación. Crear 4-5 BM/ad accounts desde el inicio sin volumen real es un error que penaliza el aprendizaje del pixel y obliga a duplicar configuración técnica (CAPI, eventos, catálogos, audiencias) sin beneficio."
  },
  {
    q: "¿Hay que traducir las creatividades o se pueden reutilizar las españolas?",
    a: "Reutilizar creatividades españolas en otros países EU solo funciona como test inicial de 7-14 días para validar interés en cold prospecting, nunca como estrategia sostenida. La regla operativa DayByDay es: (1) Portugal — se pueden reutilizar creatividades españolas durante 4-8 semanas con copy traducido al portugués europeo (no brasileño) y CTA localizada; el Hook Rate baja 15-25% pero permite validar producto sin coste de producción. (2) Italia — exige creatividades nativas en italiano desde el día 1; las traducidas funcionan 2-3 semanas y luego el CTR cae 30-45%. (3) Francia — exige creatividades nativas con UGC francés o subtitulado local, copy escrito por nativo, formato de precio europeo (15,90€ no 15.90$); el rechazo a traducciones literales es altísimo. (4) Alemania — exige creatividades nativas en alemán con copy directo, sin floritura, datos concretos, prueba social local; las traducidas no superan 5-7 días de vida útil. El presupuesto de producción multi-país se calcula con +30-50% sobre el spend creativo de España: si España gasta 1.500€/mes en producción, multi-país (PT+IT+FR) sube a 2.500-3.000€/mes con pipeline UGC local."
  },
  {
    q: "¿Qué errores específicos cometen los D2C españoles al lanzar Meta Ads en EU?",
    a: "Los 7 errores más frecuentes que vemos en auditorías DayByDay de D2C españoles que han intentado internacionalizar con Meta Ads. (1) Lanzar 3-4 países a la vez sin validar producto fuera de España, duplicando spend total sin escala real en ninguno. (2) Crear campañas multi-país en una sola campaña con segmentación geográfica abierta, dejando que el algoritmo concentre spend donde es más barato (PT) mientras los mercados objetivo (FR/DE) quedan desabastecidos. (3) Catálogo Shopify single-currency sin Markets configurado, mostrando precios en € sin contexto local y disparando bounce rate >75% en checkout. (4) Política de devolución y atención al cliente solo en castellano: en Alemania y Francia esto baja conversion rate 40-60%. (5) Ignorar el OSS (One Stop Shop) IVA y los thresholds por país, generando deuda fiscal silenciosa que aparece a los 6-12 meses. (6) Configurar Conversions API solo para el dominio principal sin discriminar por país en el feed, perdiendo señal de Event Match Quality. (7) No bloquear envíos desde Meta Ads a países donde la logística no llega, generando pedidos imposibles de servir y reviews negativas en Trustpilot/Google."
  },
  {
    q: "¿Cuánto presupuesto mínimo hace falta para lanzar Meta Ads en un nuevo país EU?",
    a: "El presupuesto mínimo viable para lanzar Meta Ads en un país EU nuevo y obtener señal estadística real en 30 días es: 3.000-4.500€/mes por país en cold prospecting (broad + lookalike + Advantage+ Shopping), con un AOV español de 50-80€ y CPA esperado 30-55€. Por debajo de 2.500€/mes el algoritmo no llega a salir de learning phase en un mercado nuevo (50 conversiones/semana por ad set sigue siendo la regla operativa). Sumado al spend, el coste de internacionalizar incluye: traducción profesional 600-1.200€/idioma (one-off), creatividades nativas 1.500-3.000€/mes/país para pipeline de 4-6 piezas, configuración Shopify Markets + Conversions API multi-mercado 1.500-3.000€ (one-off técnico), reservar 4-8 semanas de spend sin esperar break-even. Total inversión mínima para lanzar un mercado nuevo en condiciones: 18-30K€ con horizonte 90 días para validar si funciona. Lanzar con 1.000-1.500€/mes 'a ver qué pasa' es regalar dinero a Meta sin posibilidad de extraer conclusiones."
  }
];

const InternacionalizarD2cEspanolMetaAdsEuPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Internacionalizar un D2C español con Meta Ads: pasos y errores en EU"
    description="Guía operativa para internacionalizar un eCommerce D2C español a EU con Meta Ads en 2026: 4 prerrequisitos de salud antes de salir de España (MER blended ≥2,2x, pipeline creativo, logística cross-border, CAPI EMQ ≥7), orden recomendado de mercados (PT→IT→FR→DE), arquitectura Meta Ads multi-país (Business Manager único vs separado, naming convention [ES]/[PT]/[IT]/[FR]/[DE], catálogo Shopify Markets multi-currency), política de creatividades por país (qué se traduce, qué se produce nativo, vida útil esperada), 7 errores frecuentes en D2C españoles internacionalizando (lanzar 3-4 países simultáneos, OSS IVA ignorado, atención al cliente solo en castellano), presupuesto mínimo viable por mercado (3-4,5K€/mes spend + 18-30K€ inversión total 90 días) y enfoque DayByDay Pablo+Jorge con pipeline n8n + Shopify Markets + Meta Ads multi-feed para CAC adquisición específico por país."
    slug="internacionalizar-d2c-espanol-meta-ads-eu"
    datePublished="2026-05-15"
    dateModified="2026-05-15"
    readingTime="11 min"
    category="Internacionalización"
    keywords={[
      "meta ads internacionalización ecommerce",
      "internacionalizar d2c español eu",
      "meta ads multi país d2c",
      "expandir ecommerce portugal italia francia alemania",
      "shopify markets meta ads",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Internacionalizar un D2C español con Meta Ads es la decisión que más capital quema en eCommerce cuando se hace sin método y la que más palanca de crecimiento aporta cuando se ordena correctamente.</strong> En los últimos 24 meses hemos visto en DayByDay cómo marcas con cuentas sanas en España replican su estructura en Portugal, Italia, Francia y Alemania asumiendo que lo que funciona en mercado local funcionará igual fuera. La realidad: CPMs distintos, comportamiento de compra distinto, fricción logística, idioma, IVA OSS, regulación local de promociones y consent. Este artículo es la hoja de ruta operativa que usamos antes de que un cliente nuestro mueva 1€ de Meta Ads fuera de España.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué significa internacionalizar un D2C con Meta Ads en 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Internacionalizar un D2C español con Meta Ads en EU significa configurar simultáneamente: (a) un catálogo Shopify Markets multi-currency con precios localizados, (b) una arquitectura Meta Ads con campañas separadas por país y naming convention rígida, (c) Conversions API server-side capaz de discriminar señal por mercado, (d) un pipeline de creatividades nativas por idioma con vida útil controlada, (e) un esquema fiscal compatible con el régimen OSS (One Stop Shop) para IVA intra-comunitario, y (f) operaciones de logística + atención al cliente en el idioma local. Sin esos seis bloques, el spend en Meta es la parte fácil; la parte difícil es que el negocio aguante.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según <a href="https://ecommerce-europe.eu/wp-content/uploads/2023/10/CBCommerce.eu-2023-Full-Report.pdf" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Ecommerce Europe (informe Cross-Border Commerce 2023)</a>, el comercio electrónico transfronterizo en EU supera los 237.000 M€ anuales y crece entre un 11% y un 16% interanual. En auditorías DayByDay de D2C españoles que han lanzado Meta Ads en PT/IT/FR/DE en los últimos 18 meses vemos que el 62% perdió dinero los primeros 90 días por falta de prerrequisitos (creatividad nativa, logística, CAPI multi-país) y solo un 28% alcanzó MER ≥2,0x en el mercado nuevo dentro del primer trimestre. La media de inversión perdida en lanzamientos mal preparados ronda los 12-25K€ por país antes de cerrar el grifo.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">4 prerrequisitos antes de salir de España</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Antes de cualquier decisión de mercado, la cuenta debe pasar este filtro operativo:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "MER blended ≥2,2x en España durante 6 meses con margen contribución positivo. Sin cuenta sana local, internacionalizar amplifica pérdidas; no las resuelve.",
        "Pipeline de creatividades sostenido (4-8 variantes/mes) con sistema UGC propio o partner local que escala a otros idiomas en 2-3 semanas.",
        "Logística cross-border resuelta: courier predecible <12-18% del AOV, plazo 2-5 días laborables, política devolución en el idioma del país.",
        "Conversions API server-side con EMQ ≥7/10 en España, capaz de discriminar señal por país. Si esto falta, la internacionalización empezará ciega.",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h2 className="text-2xl font-black mt-10 mb-4">Orden recomendado de mercados EU</h2>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Mercado</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">CPM vs España</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Esfuerzo localización</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cuándo activar</th>
          </tr>
        </thead>
        <tbody>
          {[
            { p: "Portugal", c: "-25 a -40%", l: "Bajo (traducción)", w: "Primer mercado fuera de España" },
            { p: "Italia", c: "≈ ±10%", l: "Medio (nativo it)", w: "Tras consolidar PT con MER ≥2,0x" },
            { p: "Francia", c: "+30 a +50%", l: "Alto (UGC nativo fr)", w: "Tras consolidar PT+IT" },
            { p: "Alemania", c: "+40 a +70%", l: "Muy alto (UGC nativo de)", w: "Mercado más grande, último de los 4 grandes" },
            { p: "NL / BE / AT", c: "+20 a +60%", l: "Medio-alto", w: "Capas adicionales secundarias" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.l}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.w}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Saltarse Portugal y empezar directamente en Francia o Alemania es el error más caro que vemos. El CPA puede ser 2-3x el de España durante meses sin que el founder entienda por qué. La función de Portugal no es generar revenue grande, es validar con riesgo limitado que el producto funciona fuera de mercado local y dar tiempo a montar el pipeline creativo multi-país antes de gastar 6-cifras en Alemania.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Arquitectura Meta Ads multi-país: BM único vs separado</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Para D2C que están internacionalizando a 1-3 países nuevos en EU, la práctica DayByDay es un único Business Manager con un único ad account por marca, organizando los países dentro de campañas separadas con naming convention rígida:
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Naming convention obligatoria: [ES]_ADQ_Sales_Cold, [PT]_ADQ_Sales_Cold, [IT]_ADQ_Sales_Cold... Cada campaña arranca con código país de 2 letras para que el reporting Looker Studio agregue por mercado sin trabajo manual.",
        "Exclusiones geográficas estrictas: cada campaña con un único país en location targeting; nunca abrir 'EU' o varios países en una sola campaña porque el algoritmo concentra spend donde es más barato (PT) y deja sin alimentar los mercados objetivo.",
        "Catálogo Shopify Markets multi-currency con feeds separados por país en Meta Catalog; cada feed con precios localizados, moneda local y disponibilidad por SKU según logística del país.",
        "Conversions API server-side con un evento Purchase enriquecido con campo país (custom_data.country o user_data.country_code) para que el reporting CAPI permita filtrar EMQ por mercado.",
        "Pixel único compartido en TODOS los países; consolida señal de aprendizaje. Solo se separa cuando un mercado supera 15-25K€/mes y conviene aislar señal para auditoría fiscal o ad account dedicado.",
        "Audiencias lookalike construidas sobre seed España + país objetivo cuando el país nuevo tiene >300 first purchase. Antes de esos 300 compradores, solo broad + intereses + Advantage+ Shopping prospecting.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>
    <p className="text-white/70 leading-relaxed mb-5">
      La excepción son marcas con razón social diferente por país (S.L. España + Lda. Portugal + Srl. Italia). Ahí sí hace falta ad account independiente desde el día 1 por requisitos de facturación y reporting fiscal. Para el 90% de D2C españoles internacionalizando esto no aplica: una S.L. española factura intra-UE con régimen OSS y un solo ad account es suficiente.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Política de creatividades por país</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      No hay regla universal sobre traducir vs producir nativo. Hay una regla por país. La <a href="https://www.facebook.com/business/help/364072014328860" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial de Meta Business sobre Multi-Country Lookalikes y campañas regionales</a> deja claro que el rendimiento es muy dependiente de la coincidencia idioma-creatividad-audiencia:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Mercado</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Reutilización ES</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Vida útil traducida</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Necesidad UGC nativo</th>
          </tr>
        </thead>
        <tbody>
          {[
            { m: "Portugal", r: "Sí (PT-PT, no PT-BR)", v: "4-8 semanas", u: "Recomendable mes 3+" },
            { m: "Italia", r: "Solo test inicial 2-3 semanas", v: "2-3 semanas", u: "Obligatorio desde día 1" },
            { m: "Francia", r: "No funciona literal", v: "Casi nula", u: "Obligatorio + copy nativo" },
            { m: "Alemania", r: "No supera 5-7 días", v: "Casi nula", u: "Obligatorio + datos concretos" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.r}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.v}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.u}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      El presupuesto de producción multi-país se calcula con +30-50% sobre el spend creativo de España. Si España gasta 1.500€/mes en producción UGC, multi-país (PT+IT+FR) sube a 2.500-3.000€/mes con pipeline de creadores locales. Saltarse este coste y reutilizar todo en castellano traducido es la fuente nº1 de Hook Rate bajo y CPA disparado en mercados nuevos.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">IVA OSS, consent y atención al cliente</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Tres bloques no negociables que matan internacionalizaciones técnicamente buenas:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "Régimen OSS (One Stop Shop): desde julio 2021 las ventas B2C intra-UE se declaran trimestralmente vía OSS en España aplicando IVA del país del comprador. Threshold de 10.000€ acumulados intra-UE para activar la obligación. Ignorarlo genera deuda fiscal silenciosa que aparece a los 6-12 meses con sanciones AEAT.",
        "Consent Mode v2 multi-país: las exigencias de la AEPD española no son idénticas a CNIL (Francia) o BfDI (Alemania). El banner de cookies debe respetar la normativa más estricta de cada país objetivo; usar el de España en Alemania bloquea el envío de eventos a Meta CAPI y deja al algoritmo ciego.",
        "Atención al cliente y devolución en idioma local: en Alemania y Francia un soporte solo en castellano baja conversion rate 40-60% y dispara reviews negativas. Mínimo viable: email + chat con plantillas traducidas + persona referente que pueda responder en local en 24h. Helpdesk con IA traductora (Gorgias, Intercom, Front) cubre el 80% del volumen con coste razonable.",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/70 leading-relaxed mb-5">
      La <a href="https://www.shopify.com/plus/solutions/markets" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación de Shopify Markets</a> resuelve técnicamente la mayoría de estos bloques (multi-currency, multi-domain, tax rules por país, dominios localizados ES/PT/IT/FR/DE), pero la decisión fiscal y de atención al cliente la tiene que tomar el founder con su asesor antes de activar el primer país.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">7 errores específicos en D2C españoles internacionalizando</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Lanzar 3-4 países a la vez sin validar producto fuera de España, duplicando spend sin escala real en ninguno.",
        "Crear una sola campaña multi-país con segmentación geográfica abierta: el algoritmo concentra spend en el país más barato (PT) y deja desabastecidos los objetivos (FR/DE).",
        "Catálogo Shopify single-currency sin Markets: precios solo en € sin contexto local, bounce rate >75% en checkout en países con divisa percibida distinta.",
        "Política de devolución y soporte solo en castellano: en DACH y Francia baja CR 40-60%.",
        "Ignorar OSS IVA y thresholds: deuda fiscal silenciosa que aparece a los 6-12 meses con sanciones.",
        "CAPI solo para dominio principal sin discriminar por país en el feed: pérdida de EMQ y reporting roto.",
        "No bloquear envíos a países donde la logística no llega: pedidos imposibles de servir + reviews negativas Trustpilot/Google.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Presupuesto mínimo viable por mercado nuevo</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Para validar un mercado EU nuevo en 90 días con señal estadística suficiente:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Partida</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Coste</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {[
            { p: "Spend Meta Ads", c: "3.000-4.500€/mes/país", t: "Recurrente" },
            { p: "Traducción profesional inicial", c: "600-1.200€/idioma", t: "One-off" },
            { p: "Creatividades nativas pipeline", c: "1.500-3.000€/mes/país", t: "Recurrente" },
            { p: "Shopify Markets + CAPI multi-país", c: "1.500-3.000€", t: "One-off técnico" },
            { p: "Reserva runway 90 días", c: "8.000-12.000€", t: "Buffer pre-breakeven" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.t}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Total inversión mínima viable para abrir un mercado nuevo en condiciones: <strong className="text-white">18-30K€ con horizonte 90 días</strong>. Lanzar con 1.000-1.500€/mes 'a ver qué pasa' deja el ad set por debajo del umbral de 50 conversiones/semana y regala spend a Meta sin posibilidad de extraer conclusiones.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría de salud España: antes de hablar de internacionalización pedimos acceso a Meta Ads, Shopify y CAPI. Calculamos MER blended, margen contribución, EMQ y CAC adquisición específico. Si la cuenta no supera el filtro de 4 prerrequisitos, recomendamos posponer 3-6 meses la salida de España. Decir que no a un proyecto es parte del trabajo.",
        "Plan de mercados secuencial: definimos juntos el orden PT→IT→FR→DE con métricas de checkpoint para cada uno (MER, CPA, tasa 2ª compra a 60d). Cada mercado nuevo solo se activa si el anterior alcanza MER ≥2,0x en los primeros 90 días.",
        "Pipeline creativo multi-país: Pablo lidera el brief, ángulos y selección de creators locales; Jorge construye el workflow n8n + Shopify + Meta CAPI que sincroniza catálogo, audiencias y reporting por país. La producción UGC local se externaliza a partners en cada mercado (no agencia única para todo Europa).",
        "Solución ad-hoc Pablo + Jorge: para una marca D2C de cosmética con 22K€/mes spend en España, Jorge construyó un pipeline n8n que cada noche cruza Shopify Markets pedidos por país × Meta Ads Marketing API × tipo de cambio EUR/PLN-CHF-GBP × CAC objetivo localizado por margen. Pablo recibe en Slack cada lunes el dashboard con CAC adquisición específico por país, decide expansión vs consolidación y ajusta budget en consecuencia. En 9 meses la marca pasó de 1 país (ES) a 4 (ES + PT + IT + FR) con MER blended manteniéndose en 2,4x.",
        "Reporting fiscal compatible OSS: dejamos el reporting Meta + Shopify alineado con el formato que necesita el asesor fiscal para declarar trimestralmente vía OSS sin hacer doble trabajo. Es un detalle pequeño que evita 6 meses de fricción con contabilidad y AEAT.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo Santirsó (founder · paid media) lleva la estrategia de mercados, brief creativo multi-país y operación Meta Ads por país. Jorge González (partner · CTO · automation) construye el stack técnico — Shopify Markets, Conversions API multi-feed, pipelines n8n con Meta Marketing API y Shopify Admin — que hace operativamente viable internacionalizar sin duplicar trabajo manual. Donde otras agencias derivan la parte técnica a un partner externo (con semanas de handoff entre cada decisión), Pablo y Jorge operan como un solo equipo desde la primera reunión: sin account managers, sin perfiles junior, decisiones tomadas en el mismo Zoom.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Estás pensando en internacionalizar tu D2C a EU?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos los 4 prerrequisitos de salud, calculamos presupuesto mínimo viable por país y diseñamos el plan secuencial PT→IT→FR→DE adaptado a tu margen y catálogo.</p>
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
        <Link to="/blog/escalar-ecommerce-d2c-100k-1m-paid-media" className="text-white font-semibold hover:text-white/80">
          Escalar un eCommerce D2C de 100K a 1M€ con paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">Sistema en 5 fases con métricas de escala y motor de creatividades — paso previo a internacionalizar</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/adquisicion-vs-retencion-paid-media-d2c" className="text-white font-semibold hover:text-white/80">
          Adquisición vs retención: cómo separar presupuestos →
        </Link>
        <p className="text-white/40 text-xs mt-1">Antes de internacionalizar hay que tener claro qué parte del CAC es adquisición real y qué es retención disfrazada</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/guia-api-conversiones-meta-ads-shopify" className="text-white font-semibold hover:text-white/80">
          Guía API de Conversiones Meta Ads + Shopify →
        </Link>
        <p className="text-white/40 text-xs mt-1">Configurar Conversions API multi-país es el cimiento técnico de cualquier internacionalización seria</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/dynamic-product-ads-meta-shopify-d2c" className="text-white font-semibold hover:text-white/80">
          Dynamic Product Ads en Meta para Shopify →
        </Link>
        <p className="text-white/40 text-xs mt-1">DPA con catálogo Shopify Markets multi-currency es la palanca de retargeting cross-country más eficiente</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default InternacionalizarD2cEspanolMetaAdsEuPage;
