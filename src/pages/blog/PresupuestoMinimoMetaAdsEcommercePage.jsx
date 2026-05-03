import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Cuál es el presupuesto mínimo real para empezar en Meta Ads en 2026?",
    a: "El suelo operativo realista para una cuenta D2C en España es 30-50€/día (≈900-1.500€/mes). Por debajo de 20€/día Meta no consigue salir del learning phase de un ad set optimizado a Purchase: necesita ~50 conversiones en 7 días para estabilizarse, y con CPA típico de eCommerce moda/belleza (25-45€) eso exige al menos 25-30€/día por ad set. Cuentas que arrancan con 10-15€/día gastan 2-3 meses sin que el algoritmo encuentre patrón estable, y el ROAS reportado oscila tanto que el negocio no puede tomar decisiones. El 'mínimo Meta Ads' no es lo que la plataforma deja activar (1€/día), sino lo que permite aprender.",
  },
  {
    q: "¿Por qué Meta exige ~50 conversiones para optimizar bien un ad set?",
    a: "El sistema de pujas de Meta funciona con un modelo predictivo que necesita ejemplos para construir la curva de probabilidad de conversión por usuario. Con menos de 50 eventos de Purchase por semana en un ad set, el modelo opera con incertidumbre alta y compensa pujando agresivamente sobre tráfico amplio (CPM bajo, conversión también baja). El umbral de 50 conv/semana es el que la propia documentación oficial de Meta recomienda para salir de learning phase. En presupuestos pequeños la solución no es bajar el objetivo a AddToCart (engaña al algoritmo y luego no escala), sino consolidar ad sets para que cada uno reciba volumen suficiente.",
  },
  {
    q: "¿Cuál es el coste mínimo si vendo producto de ticket alto (>200€)?",
    a: "Subir el ticket reduce el número de conversiones que el presupuesto compra, así que el suelo sube. Con ticket 200-400€ y CPA típico 50-90€, mantener 50 conv/semana en un ad set exige 350-650€/día. Para tickets altos el camino realista es: empezar optimizando a AddToCart o Initiate Checkout (eventos más frecuentes que Purchase) durante los primeros 30-45 días con presupuesto 50-80€/día, recoger señal, y migrar a Purchase cuando hay 100+ compradores en pixel + CAPI. La alternativa es invertir 200€/día desde el inicio aceptando que los primeros 30 días son aprendizaje caro.",
  },
  {
    q: "¿Cuánto presupuesto necesito para tener prospecting + retargeting bien estructurados?",
    a: "Estructura mínima viable: 70-80% prospecting + 20-30% retargeting, con prospecting recibiendo el grueso para alimentar el funnel. Si tu presupuesto total es 1.500€/mes (50€/día), eso significa ~35-40€/día prospecting + 10-15€/día retargeting. Por debajo de 1.000€/mes total, retargeting puro empieza a no rendir: las audiencias se queman en 2-3 semanas y el frequency sube a 6-8 sin renovación de pool. La regla operativa: si no puedes mantener al menos 30€/día estables en prospecting durante 90 días, el retargeting no compensa estructurar como capa separada — mejor dejar exclusión de compradores y trabajar todo desde un ad set Advantage+ Shopping.",
  },
  {
    q: "¿Es mejor empezar con Advantage+ Shopping o con campaña tradicional?",
    a: "Para presupuestos <50€/día, Advantage+ Shopping suele rendir mejor porque consolida volumen en un solo ad set y al algoritmo le es más fácil estabilizar. La trampa es que Advantage+ exige catálogo bien optimizado, eventos de calidad (CAPI con EMQ >7) y al menos 50-100 compradores históricos en pixel. Si la cuenta es nueva sin histórico, una campaña tradicional con audiencia broad amplia (España 18-65, sin intereses) optimizada a Purchase funciona como rampa de aprendizaje los primeros 30-45 días, y luego se migra a Advantage+. El error común es activar Advantage+ desde día 0 con cuenta vacía: el algoritmo no tiene de qué tirar y el CPA es 2-3x el realista.",
  },
  {
    q: "¿Cuánto debo aumentar el presupuesto para escalar sin romper el ROAS?",
    a: "Subidas máximas del 20-30% sobre el presupuesto del ad set cada 3-5 días, manteniendo el creativo y la audiencia estables. Una subida de +50% o más resetea total o parcialmente el aprendizaje del algoritmo: en la práctica el ad set vuelve a learning phase y el CPA se desestabiliza 5-10 días. Si necesitas duplicar presupuesto rápidamente, mejor duplicar el ad set y dejar ambos correr 7 días (el original con presupuesto estable, el clon con presupuesto nuevo) que subir el original de golpe. La regla del 20-30% no aplica a Advantage+ Shopping con CBO: ahí la lógica de subida es por campaña, y la tolerancia es algo mayor (hasta 40-50% sin reseteo).",
  },
  {
    q: "¿Qué pasa si activo Meta Ads con menos de 500€/mes?",
    a: "Con <500€/mes la realidad es que Meta no es la palanca correcta para tu eCommerce todavía. La plataforma seguirá gastando el dinero (no hay mensaje de error), pero el resultado típico es: 1-2 conversiones/semana sin patrón estable, ROAS reportado entre 0,8x y 3x sin coherencia, y aprendizaje bloqueado. Alternativas más eficientes en esa franja: Google Ads Search sobre keywords transaccionales de marca + producto (intent alto, CPC controlable), email marketing sobre lista existente, partnerships y contenido orgánico. Cuando el negocio puede destinar 1.000-1.500€/mes estables a Meta durante 6+ meses, entonces la palanca empieza a tener sentido económico.",
  },
];

const PresupuestoMinimoMetaAdsEcommercePage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Presupuesto mínimo Meta Ads: ¿cuánto necesito invertir? (D2C 2026)"
    description="Cuánto presupuesto mínimo necesitas para que Meta Ads funcione en eCommerce D2C en 2026: suelo operativo realista (30-50€/día), por qué el algoritmo necesita 50 conversiones/semana para estabilizar, mínimos por ticket (40€ a 200€+), distribución prospecting/retargeting según presupuesto, Advantage+ vs tradicional y reglas de escalado sin romper el aprendizaje."
    slug="presupuesto-minimo-meta-ads-ecommerce"
    datePublished="2026-05-03"
    dateModified="2026-05-03"
    readingTime="9 min"
    category="Estrategia"
    keywords={[
      "presupuesto minimo meta ads",
      "cuanto invertir meta ads ecommerce",
      "presupuesto facebook ads minimo",
      "inversion minima meta ads d2c",
      "meta ads presupuesto inicial",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      El <strong className="text-white">presupuesto mínimo en Meta Ads</strong> no es lo que la plataforma deja activar (1€/día) sino lo que permite que el algoritmo aprenda. La diferencia entre esos dos números es lo que separa una cuenta D2C que escala de otra que gasta tres meses sin patrón estable. La mayoría de eCommerce que arrancan con 10-15€/día llegan a la conclusión equivocada de que "Meta no funciona para ellos" cuando el problema real es que estaban operando por debajo del umbral de aprendizaje del sistema.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      En esta guía cubrimos qué presupuesto necesita realmente Meta Ads para rendir en eCommerce D2C, cómo varía según el ticket medio, qué estructura de campañas tiene sentido en cada franja y cómo escalar sin reventar el aprendizaje del algoritmo.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Por qué existe un suelo operativo y dónde está</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Meta optimiza con un modelo predictivo que necesita ejemplos para construir la curva de probabilidad de conversión por usuario. Sin volumen suficiente de eventos, el modelo no aprende — gasta dinero pero no estabiliza CPA. El umbral oficial:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "50 conversiones/semana por ad set para salir de learning phase (recomendación oficial de Meta).",
        "Eso son ~7 conversiones/día estables por ad set, no como pico semanal.",
        "Con CPA típico D2C (25-45€ moda, 35-60€ belleza, 40-80€ suplementos), 7 conv/día requieren 200-400€/día por ad set.",
        "Cuentas pequeñas no pueden permitirse ese volumen — la solución es consolidar todo en uno o dos ad sets, no fragmentar.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La <a href="https://www.facebook.com/business/help/112167992830700" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial de Meta sobre la learning phase</a> es explícita: por debajo de 50 conversiones por ventana de 7 días el rendimiento del ad set es inestable. Esto no es una recomendación blanda — es el límite por debajo del cual el algoritmo opera con incertidumbre estadística alta.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Suelo realista por ticket medio</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El presupuesto mínimo no es una cifra única — depende del ticket. Cuanto mayor el ticket, mayor el CPA, y por tanto mayor el spend necesario para alcanzar el volumen de conversiones que estabiliza el aprendizaje:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Ticket medio</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">CPA típico</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Suelo operativo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Evento óptimo</th>
          </tr>
        </thead>
        <tbody>
          {[
            { t: "30-60€", c: "20-40€", s: "30-50€/día (≈1.000-1.500€/mes)", e: "Purchase desde día 1" },
            { t: "60-100€", c: "30-55€", s: "50-80€/día (≈1.500-2.400€/mes)", e: "Purchase desde día 1" },
            { t: "100-200€", c: "45-80€", s: "80-150€/día (≈2.400-4.500€/mes)", e: "Purchase + AddToCart secundario" },
            { t: "200-400€", c: "60-110€", s: "150-300€/día (≈4.500-9.000€/mes)", e: "AddToCart/IC primero, Purchase a 30-45 días" },
            { t: ">400€", c: "100-200€", s: "300€+/día (≈9.000€+/mes)", e: "AddToCart + IC primero, ventana atribución 7d click" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.t}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.e}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Cifras de auditorías reales de cuentas D2C en España gestionadas por DayByDay y benchmark cruzado con datos sectoriales de <a href="https://www.statista.com/topics/2057/social-media-marketing/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Statista sobre social media marketing</a>. CPA varía ±25% según sector, estacionalidad y calidad de creativo, pero los suelos operativos son consistentes.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Distribución prospecting / retargeting según presupuesto</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Otra decisión que cambia con el presupuesto: cuándo separar prospecting y retargeting en estructuras independientes y cuándo es contraproducente:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Spend mensual</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Estructura recomendada</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Distribución</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: "<1.000€/mes", e: "1 ad set Advantage+ Shopping con exclusión compradores 180d", d: "100% en una sola caja" },
            { s: "1.000-2.500€/mes", e: "Advantage+ Shopping + 1 ad set retargeting carrito 0-7d", d: "85% prospecting + 15% retargeting" },
            { s: "2.500-6.000€/mes", e: "Prospecting (broad o lookalike 3-5%) + retargeting 2 niveles (carrito + ViewContent)", d: "75-80% prospecting + 20-25% retargeting" },
            { s: ">6.000€/mes", e: "Stack de 3-4 ad sets prospecting + escalera retargeting de 3-4 peldaños", d: "70% prospecting + 25% retargeting + 5% reactivación clientes" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.e}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.d}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Por debajo de 1.000€/mes no separes prospecting y retargeting — el retargeting puro consume el presupuesto en 2-3 semanas, las audiencias se queman, el frequency sube a 6-8 y el ROAS reportado se infla con compras que iban a pasar igual. Con tan poco presupuesto, Advantage+ Shopping con exclusión de compradores 180d cumple las dos funciones sin fragmentar.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Errores frecuentes en presupuestos pequeños</h2>
    <div className="space-y-3 mb-6">
      {[
        "Activar 4-6 ad sets con 5-10€/día cada uno: ninguno alcanza volumen para salir de learning phase. Resultado: 6 ad sets dispersos rindiendo todos mal en lugar de 1-2 estables.",
        "Cambiar de objetivo (Purchase → AddToCart → Traffic) cada 2 semanas porque 'no funciona': cada cambio resetea el aprendizaje y prolonga el problema. Mejor mantener Purchase 30-45 días con presupuesto consolidado.",
        "Empezar con Advantage+ Shopping en cuenta nueva sin histórico: el algoritmo no tiene compradores de referencia y el CPA es 2-3x el realista. Mejor 30 días de tradicional broad + Purchase, luego migrar.",
        "Subir presupuesto +50% o +100% de golpe cuando el ad set rinde: resetea el aprendizaje y devuelve la cuenta a inestabilidad. Subidas máximas del 20-30% cada 3-5 días.",
        "No tener CAPI server-side con EMQ >7: en presupuestos pequeños el match rate de eventos cae y el algoritmo aprende sobre datos parciales — el CPA reportado se separa del CPA real.",
        "Poner objetivos de ROAS antes del aprendizaje: pedir ROAS 4x al ad set durante learning phase fuerza una puja restrictiva que impide encontrar volumen y bloquea el aprendizaje permanentemente.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo escalar sin romper el ROAS</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Subir presupuesto es la operación más delicada en Meta Ads. La regla operativa que aplicamos en cuentas D2C:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "+20-30% sobre el presupuesto del ad set cada 3-5 días, manteniendo creativo y audiencia estables. Subidas mayores resetean aprendizaje.",
        "Si necesitas duplicar rápido: clona el ad set y deja ambos correr 7 días — el original con presupuesto estable, el clon con presupuesto nuevo. Mejor que subir el original.",
        "Advantage+ Shopping con CBO tolera subidas algo mayores (40-50%) por la lógica de campaña vs ad set, pero no más.",
        "No subir presupuesto si el ad set lleva <7 días estables o si el CPA está fuera de rango la última semana — primero estabilizar, luego escalar.",
        "Renovar creativo cada 2-3 semanas cuando subes presupuesto: la frecuencia se acelera proporcionalmente y sin creativo nuevo el ad set fatiga en 10-14 días.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cuándo Meta Ads no es la palanca correcta todavía</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Si el negocio no puede destinar al menos 1.000€/mes estables a Meta durante 6+ meses, la inversión rinde mejor en otras palancas: Google Ads Search sobre keywords de marca y producto (intent alto, CPC controlable y suelo de presupuesto más bajo), email marketing sobre lista existente, contenido orgánico y partnerships. Meta Ads tiene retorno asimétrico: con presupuesto suficiente y consistente escala muy bien, pero por debajo del suelo operativo el dinero se diluye sin generar aprendizaje. La pregunta correcta no es "¿cuánto cobra Meta?" sino "¿qué presupuesto puedo sostener 6 meses sin que un mes flojo me obligue a parar la cuenta?".
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo definimos el presupuesto inicial en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría previa de unit economics: ticket medio, margen bruto, LTV a 12 meses, ratio LTV/CAC objetivo. Sin estos cuatro datos no se puede definir suelo operativo realista.",
        "Cálculo de CPA máximo permitido: ticket × margen × (1 - reserva operativa). Si el suelo operativo del sector queda por encima del CPA máximo, Meta no es viable a ese ticket todavía.",
        "Definición de fase 0 (aprendizaje, 30-45 días) con presupuesto en suelo operativo y objetivo de validar CPA y ROAS marginales — no de rentabilizar.",
        "Estructura inicial mínima: 1-2 ad sets prospecting + 1 retargeting si presupuesto >2.500€/mes, todo bajo CBO, con CAPI server-side validada antes de activar.",
        "Protocolo de escalado documentado: subidas +20-30% cada 3-5 días, renovación creativa cada 2 semanas, revisión semanal de frequency y solapamiento de audiencias.",
        "Punto de corte: si en 60 días con presupuesto en suelo operativo el CPA marginal supera el CPA máximo permitido en >25%, recomendamos pausar Meta y reasignar a Google Search + email — no insistimos por ego.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu presupuesto en Meta está por encima o por debajo del suelo operativo?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos ticket, margen, CPA actual y estructura para detectar si tu cuenta opera bajo el umbral de aprendizaje y qué presupuesto mínimo necesitas para que Meta empiece a rendir.</p>
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
        <Link to="/blog/cuanto-invertir-meta-ads-calculadora" className="text-white font-semibold hover:text-white/80">
          Cuánto invertir en Meta Ads según tu ticket y margen (con calculadora) →
        </Link>
        <p className="text-white/40 text-xs mt-1">El paso siguiente al suelo mínimo: cuánto invertir según ticket, margen y LTV para rentabilizar</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-campanas-meta-ads-sin-romper-roas" className="text-white font-semibold hover:text-white/80">
          Cómo escalar campañas Meta Ads sin romper el ROAS →
        </Link>
        <p className="text-white/40 text-xs mt-1">Una vez superado el suelo operativo, cómo subir presupuesto sin resetear el aprendizaje del algoritmo</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/audiencias-lookalike-meta-alta-calidad" className="text-white font-semibold hover:text-white/80">
          Audiencias lookalike en Meta de alta calidad: guía 2026 D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cuándo el presupuesto permite construir lookalikes y cómo elegir semilla por volumen</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/advantage-plus-shopping-cuando-usarlo-no" className="text-white font-semibold hover:text-white/80">
          Advantage+ Shopping Campaign: cuándo usarlo y cuándo no →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué Advantage+ rinde mejor en presupuestos pequeños y cuándo no activarlo desde día 0</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default PresupuestoMinimoMetaAdsEcommercePage;
