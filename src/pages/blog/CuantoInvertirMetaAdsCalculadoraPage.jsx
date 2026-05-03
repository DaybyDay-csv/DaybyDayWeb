import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Cuánto debo invertir mínimo en Meta Ads para que sea rentable en un eCommerce D2C?",
    a: "El suelo realista en 2026 para un D2C español es 800-1.200€/mes en Meta Ads. Por debajo de 500€/mes los datos están dominados por el azar: ningún adset reúne las 50 conversiones semanales que la fase de aprendizaje exige y el algoritmo no encuentra señal. Para un CPA objetivo de 25-40€ necesitas 3-5 × CPA por adset durante 5-7 días, mínimo 4 adsets activos en paralelo. Salvo que tu ticket sea muy alto y el LTV compense, invertir <500€/mes en Meta es quemar presupuesto sin generar aprendizaje accionable.",
  },
  {
    q: "¿Qué fórmula uso para calcular cuánto invertir en Meta Ads según mi ticket y margen?",
    a: "La fórmula operativa es: Inversión máxima por venta = Margen bruto unitario × (1 / ratio LTV/CAC objetivo). Si tu ticket medio es 80€, margen 60% (48€) y buscas LTV/CAC de 3:1 con LTV-180d de 130€, tu CAC objetivo es ~43€. Inversión mensual = (objetivo de pedidos nuevos) × CAC objetivo. Para 100 pedidos nuevos al mes: 4.300€/mes. Sin LTV claro, el atajo conservador es CAC objetivo = margen bruto unitario, lo que equivale a recuperar caja en la primera compra.",
  },
  {
    q: "¿Cómo escalo el presupuesto sin romper el ROAS cuando la cuenta empieza a funcionar?",
    a: "Subidas máximas del 20-30% semanal por campaña con CBO/Advantage+ activo, monitorizando que la frecuencia se mantenga <3,5 y el CPM no se dispare más de un 25%. Subir un 100% de un día para otro reinicia la fase de aprendizaje y suele tirar el ROAS un 30-40% durante 2 semanas. Si tu CAC se mantiene dentro del rango objetivo durante 7 días tras una subida, validas y vuelves a subir. Si se sale, mantienes presupuesto y revisas creatividad o estructura antes de la siguiente subida.",
  },
  {
    q: "¿Qué porcentaje de mis ingresos debería invertir en Meta Ads como D2C?",
    a: "El benchmark sano en eCommerce D2C español es 15-25% de los ingresos en paid media total (Meta + Google + TikTok), con Meta absorbiendo 50-70% de ese share en cuentas que escalan por descubrimiento. Por debajo del 10% rara vez consigues volumen para escalar. Por encima del 30% sostenido suele indicar margen bajo o LTV insuficiente para soportar adquisición agresiva. Cuentas con LTV/CAC >4:1 pueden invertir 25-35% temporalmente para ganar cuota antes de optimizar margen.",
  },
  {
    q: "¿Necesito presupuesto distinto para TOFU, MOFU y BOFU en Meta?",
    a: "Sí, y el split importa. La distribución de partida que aplicamos en cuentas D2C nuevas: 60-70% TOFU (frío, vídeo, audiencias amplias o Advantage+), 15-20% MOFU (visitantes, addtocart sin compra), 15-20% BOFU (carritos abandonados, retargeting de cliente). En cuentas maduras con LTV alto se puede subir TOFU al 75-80% porque el retargeting ya tiene volumen orgánico. Mezclar todo en una sola campaña infla el ROAS reportado con conversiones que iban a ocurrir igual y oculta si tu motor de adquisición funciona.",
  },
  {
    q: "¿Cuánto tarda Meta en estabilizar el rendimiento tras una subida de presupuesto?",
    a: "Entre 5 y 14 días si la subida es <30% del presupuesto del adset, manteniendo audiencia y optimización. Si la subida supera el 30%, el adset entra en aprendizaje de nuevo (re-learning) y necesita acumular las 50 conversiones de la nueva ventana antes de estabilizar — eso son típicamente 7-10 días extra. Por eso operamos con subidas pequeñas pero frecuentes en lugar de saltos grandes mensuales: minimizan el tiempo en aprendizaje y reducen la varianza de CAC.",
  },
  {
    q: "¿Tiene sentido invertir en Meta Ads si mi margen es <40%?",
    a: "Solo si tu LTV-180d compensa. Con margen <40% y LTV/CAC <2:1 vas a perder caja en cada nueva venta y el negocio no escala. La regla operativa: si tu margen unitario es 25€ y tu CPA es 45€, necesitas que el cliente vuelva a comprar al menos una vez en 90-180 días con margen similar para recuperar. Sin recompra real, lo que toca antes de subir presupuesto Meta es subir margen (cross-sell, bundles, suscripción) o bajar CAC (mejor tracking, mejor creatividad, mejor landing).",
  },
  {
    q: "¿Cómo reparto presupuesto entre Meta y Google Ads en un D2C que empieza?",
    a: "En D2C de descubrimiento (cosmética, moda, suplementos, hogar) la distribución de partida razonable es 65-75% Meta y 25-35% Google. Google captura demanda existente (marca + categoría con búsquedas), Meta crea demanda nueva con descubrimiento visual. En negocios con búsqueda fuerte (gourmet, regalos, segmentos con marca propia consolidada) la mezcla puede ser 50/50. El error más común es activar Google sin haber alcanzado todavía el suelo mínimo de aprendizaje en Meta: el resultado es dos canales subóptimos en lugar de uno dominado.",
  },
];

const Calculadora = () => {
  const [ticket, setTicket] = useState(70);
  const [margen, setMargen] = useState(60);
  const [ltvMultiplier, setLtvMultiplier] = useState(1.6);
  const [pedidos, setPedidos] = useState(100);
  const [ratio, setRatio] = useState(3);

  const data = useMemo(() => {
    const margenUnit = ticket * (margen / 100);
    const ltv = ticket * ltvMultiplier;
    const margenLtv = ltv * (margen / 100);
    const cacObjetivo = margenLtv / ratio;
    const inversionMes = pedidos * cacObjetivo;
    const payback = cacObjetivo / margenUnit;
    return {
      margenUnit: margenUnit.toFixed(1),
      ltv: ltv.toFixed(0),
      cacObjetivo: cacObjetivo.toFixed(1),
      inversionMes: inversionMes.toFixed(0),
      payback: payback.toFixed(2),
    };
  }, [ticket, margen, ltvMultiplier, pedidos, ratio]);

  const Field = ({ label, value, setter, min, max, step, suffix }) => (
    <div>
      <label className="text-white/60 text-xs uppercase tracking-wider block mb-1">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setter(Number(e.target.value))}
          className="flex-1 accent-[#de0015]"
        />
        <span className="text-white font-bold text-sm w-20 text-right">{value}{suffix}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-[#1a1616] border border-white/10 rounded-xl p-6 mb-8">
      <p className="text-white font-bold mb-4">Calculadora rápida — inversión Meta Ads recomendada</p>
      <div className="space-y-4 mb-6">
        <Field label="Ticket medio (€)" value={ticket} setter={setTicket} min={20} max={300} step={5} suffix="€" />
        <Field label="Margen bruto (%)" value={margen} setter={setMargen} min={20} max={85} step={1} suffix="%" />
        <Field label="Multiplicador LTV-180d (x ticket)" value={ltvMultiplier} setter={setLtvMultiplier} min={1} max={4} step={0.1} suffix="x" />
        <Field label="Pedidos nuevos al mes objetivo" value={pedidos} setter={setPedidos} min={10} max={1000} step={10} suffix="" />
        <Field label="Ratio LTV/CAC objetivo" value={ratio} setter={setRatio} min={2} max={5} step={0.5} suffix=":1" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4 border-t border-white/10">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Margen unitario</p>
          <p className="text-white font-bold text-lg">{data.margenUnit}€</p>
        </div>
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">LTV-180d est.</p>
          <p className="text-white font-bold text-lg">{data.ltv}€</p>
        </div>
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">CAC objetivo</p>
          <p className="text-white font-bold text-lg">{data.cacObjetivo}€</p>
        </div>
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Payback (compras)</p>
          <p className="text-white font-bold text-lg">{data.payback}</p>
        </div>
        <div className="col-span-2">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Inversión Meta/mes recomendada</p>
          <p className="text-[#de0015] font-bold text-2xl">{data.inversionMes}€</p>
        </div>
      </div>
      <p className="text-white/40 text-xs mt-4">
        Estimación operativa basada en LTV-180d. No sustituye un análisis con datos reales de cohorte y atribución mixta. Para validar tu caso concreto, agenda una llamada.
      </p>
    </div>
  );
};

const CuantoInvertirMetaAdsCalculadoraPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Cuánto invertir en Meta Ads según tu ticket y margen (con calculadora)"
    description="Fórmula operativa para decidir cuánto invertir en Meta Ads según ticket medio, margen, LTV y ratio LTV/CAC. Con calculadora interactiva, suelo mínimo realista, distribución TOFU/MOFU/BOFU y protocolo de subida de presupuesto sin romper el aprendizaje del algoritmo."
    slug="cuanto-invertir-meta-ads-calculadora"
    datePublished="2026-04-28"
    dateModified="2026-04-28"
    readingTime="10 min"
    category="Estrategia"
    keywords={["cuánto invertir meta ads", "presupuesto meta ads ecommerce", "calculadora meta ads", "presupuesto facebook ads d2c", "inversión publicidad meta"]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Decidir cuánto invertir en Meta Ads</strong> sin un modelo de unidad económica detrás es la causa #1 por la que vemos cuentas D2C españolas estancadas. Subir el presupuesto sin saber qué CAC puede absorber el negocio destruye caja; bajarlo sin entender el suelo mínimo de aprendizaje del algoritmo destruye datos. La pregunta correcta no es "cuánto invierto", es "qué CAC puedo permitirme y cuánto presupuesto necesito para que ese CAC sea estadísticamente real".
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Este artículo te da la fórmula que aplicamos en DayByDay para fijar presupuesto Meta en cuentas D2C: ticket, margen, LTV-180d y ratio LTV/CAC objetivo, cruzados con el suelo operativo que el algoritmo de Meta exige para aprender. Incluye una calculadora interactiva con la que puedes meter tus números y ver inversión recomendada y payback en segundos.
    </p>

    <Calculadora />

    <h2 className="text-2xl font-black mt-10 mb-4">La fórmula operativa: del margen al presupuesto Meta</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      La inversión en Meta Ads no se decide por intuición ni por porcentaje genérico de facturación. Se deduce de cuatro variables que tienen que estar medidas:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Ticket medio real de los últimos 90 días (no del año entero — incluye estacionalidad).",
        "Margen bruto unitario después de descuentos, COGS y envío. Sin esto, el cálculo es ciencia ficción.",
        "LTV-180d: cuánto factura un cliente medio en sus 6 primeros meses. Para D2C de recompra alta puede ser 1,8-3x ticket; para producto único, 1-1,2x.",
        "Ratio LTV/CAC objetivo: 3:1 es el estándar saludable según el consenso documentado por Shopify y otros operadores de eCommerce. Por encima de 4:1 estás dejando crecimiento sobre la mesa; por debajo de 2:1 el negocio no escala.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Con esos cuatro inputs, el CAC objetivo es: <strong className="text-white">(LTV × margen%) / ratio LTV/CAC</strong>. Y la inversión Meta recomendada es: <strong className="text-white">CAC objetivo × pedidos nuevos al mes</strong>. La calculadora de arriba aplica exactamente esta lógica.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">El suelo mínimo realista en Meta Ads en 2026</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Hay un suelo operativo que la fórmula anterior no captura: el algoritmo de Meta necesita volumen para aprender. Según la <a href="https://www.facebook.com/business/help/112167992830700" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial sobre la fase de aprendizaje</a>, cada adset necesita unas 50 conversiones en su ventana de optimización (típicamente 7 días) para salir del learning. Si no llegas a ese volumen, tu cuenta opera con datos incompletos permanentemente.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Tabla de suelo mínimo por ticket medio en eCommerce D2C español (CAC objetivo ≈ margen bruto unitario):
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Ticket medio</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">CAC objetivo aprox.</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Inversión mínima/mes</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Foco recomendado</th>
          </tr>
        </thead>
        <tbody>
          {[
            { t: "30-50€", c: "15-25€", i: "600-900€", f: "TOFU concentrado, 1-2 adsets, foco en CPA" },
            { t: "50-80€", c: "25-40€", i: "1.000-1.800€", f: "TOFU + retargeting básico, 3-4 adsets" },
            { t: "80-150€", c: "40-65€", i: "2.000-3.500€", f: "Full funnel TOFU/MOFU/BOFU, 4-6 adsets" },
            { t: "150-250€", c: "65-110€", i: "3.500-6.500€", f: "Full funnel + lead capture (email/WhatsApp)" },
            { t: ">250€", c: ">110€", i: "6.500-15.000€", f: "Funnel largo, advertorial, retargeting prolongado" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-medium text-xs">{row.t}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.i}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.f}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Si la calculadora te da un número por debajo del suelo de tu fila, tienes dos opciones honestas: subir presupuesto hasta el suelo (asumiendo que el LTV/CAC empeore al inicio y compensar después) o no entrar todavía en Meta y usar Google Ads de marca + SEO + email/WhatsApp para construir base antes.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo distribuir el presupuesto entre TOFU, MOFU y BOFU</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Una vez fijada la inversión total, el split entre capas del funnel marca el techo de escala. La distribución que aplicamos en D2C nuevos:
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          num: "1",
          titulo: "TOFU — 60-70% del presupuesto",
          desc: "Frío puro: Advantage+ Shopping, audiencias amplias o lookalikes 1-3% sobre top LTV. Es el motor de adquisición real. Si esta capa no funciona, el ROAS de retargeting es ilusión.",
        },
        {
          num: "2",
          titulo: "MOFU — 15-20% del presupuesto",
          desc: "Visitantes 30-90 días, AddToCart sin compra >7 días, vídeos vistos >50%. Aquí van creatividades de prueba social, comparativa y FAQ que cierran objeciones.",
        },
        {
          num: "3",
          titulo: "BOFU — 15-20% del presupuesto",
          desc: "Carrito abandonado <7 días + retargeting de clientes existentes. Cap de frecuencia 3-4. Mensaje con beneficio diferencial respecto a TOFU (no cupón genérico).",
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
    <p className="text-white/70 leading-relaxed mb-5">
      Cuentas D2C maduras (>6 meses con tráfico orgánico estable y base de email) pueden subir TOFU al 75-80% porque el retargeting absorbe orgánico de email y SEO. Cuentas nuevas suelen necesitar más MOFU porque el tráfico cualificado es escaso.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Protocolo para subir presupuesto sin romper el ROAS</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El error más caro al escalar inversión Meta es subir demasiado de golpe. La <a href="https://www.shopify.com/blog/marketing-budget" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de presupuesto de marketing de Shopify</a> y la operativa estándar en cuentas D2C que escalan apuntan al mismo principio: subidas pequeñas y validadas baten a saltos grandes.
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Subidas máximas del 20-30% semanal por campaña con CBO/Advantage+ activo. Por encima reinicias la fase de aprendizaje y pierdes 7-14 días de eficiencia.",
        "Ventana de validación: 7 días de CAC dentro del rango objetivo antes de la siguiente subida. Si se sale, mantienes presupuesto y revisas creatividad/audiencia/landing antes de volver a subir.",
        "Frecuencia <3,5 en TOFU. Si sube tras la subida de presupuesto, la audiencia se está saturando — toca añadir creatividades nuevas, no más euros.",
        "CPM tracking: subida de CPM >25% sin mejora de calidad de audiencia significa que estás compitiendo contra ti mismo. Suele indicar saturación.",
        "MER (ingresos totales / inversión total) como métrica techo. Si sube la inversión y baja el MER blended, la última subida no era productiva — vuelves al presupuesto previo.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Errores comunes al fijar presupuesto Meta en D2C</h2>
    <div className="space-y-3 mb-6">
      {[
        "Usar ROAS de plataforma como métrica de techo. Meta sobreestima entre un 20% y un 35% en D2C español. Si fijas presupuesto contra ROAS de Meta, sobreinviertes.",
        "Calcular CAC sobre ticket medio en lugar de margen unitario. Vendes 80€ con 30% margen = 24€ por venta. Si pagas 35€ de CAC sin recompra, pierdes 11€/cliente.",
        "Repartir presupuesto entre demasiados adsets. 10 adsets a 10€/día rara vez salen del aprendizaje — uno solo a 100€/día sí.",
        "Cambiar presupuesto a mitad de semana sin esperar señal completa. Los datos de Meta tienen ruido alto en ventanas <5 días.",
        "Activar Google y TikTok antes de validar Meta solo porque 'hay que diversificar'. Diversificar es válido cuando el primer canal está optimizado, no antes.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay la decisión de presupuesto</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Cuando una marca D2C nos pide validar cuánto debería invertir en Meta, el proceso tiene 4 pasos antes de tocar presupuesto:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Día 1 — Modelo de unit economics: extraemos ticket, margen, LTV-180d real (no estimado), tasa de recompra y AOV por cohorte. Sin esto, cualquier presupuesto es un disparo al aire.",
        "Día 2 — Validación de tracking: píxel + Conversions API deduplicados, eventos de calidad, discrepancia Meta vs Shopify <30%. Si esto está roto, todos los CAC reportados son ficción.",
        "Día 3 — Definición de CAC objetivo y suelo mínimo: usamos la fórmula LTV × margen / ratio. Si el suelo de aprendizaje exige más de lo que el modelo de unidad permite, ajustamos el ratio temporalmente o esperamos.",
        "Día 4 — Plan de escalado en 90 días: presupuesto inicial, hitos de validación semanales, regla de subida (20-30%) y MER objetivo. Operamos sin sobresaltos: subimos cuando los datos lo dicen, no cuando hay prisa.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      En las cuentas D2C que escalan con nosotros, la inversión Meta crece entre un 60% y un 180% en 6 meses manteniendo el CAC objetivo. La diferencia con cuentas que se estancan no es presupuesto inicial — es disciplina de escalado y modelo de unidad robusto antes de subir el primer euro.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Quieres validar cuánto deberías invertir en Meta Ads en tu caso?</p>
      <p className="text-white/50 text-sm mb-4">Te calculamos CAC objetivo, suelo mínimo y plan de escalado a 90 días con tus datos reales de Shopify, no estimaciones genéricas.</p>
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
        <Link to="/blog/presupuesto-minimo-meta-ads-ecommerce" className="text-white font-semibold hover:text-white/80">
          Presupuesto mínimo Meta Ads: ¿cuánto necesito invertir? (D2C 2026) →
        </Link>
        <p className="text-white/40 text-xs mt-1">Antes de la calculadora: el suelo operativo por debajo del cual Meta no aprende y por qué el "mínimo" no es lo que la plataforma deja activar</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/estrategia-full-funnel-d2c" className="text-white font-semibold hover:text-white/80">
          Estrategia full funnel D2C: del frío al cliente recurrente →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo encaja el presupuesto Meta dentro del sistema multi-canal (Google, email/WhatsApp) según fase de madurez del D2C</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cac-vs-ltv-ecommerce-escalable" className="text-white font-semibold hover:text-white/80">
          CAC vs LTV: la métrica que define si tu D2C es escalable →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo calcular LTV-180d real y por qué el ratio 3:1 es el techo operativo razonable para escalar paid media</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-campanas-meta-ads-sin-romper-roas" className="text-white font-semibold hover:text-white/80">
          Cómo escalar campañas Meta Ads sin romper el ROAS →
        </Link>
        <p className="text-white/40 text-xs mt-1">Protocolo de subidas semanales del 20-30%, validación por MER y señales que indican que toca parar</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-ecommerce-d2c-100k-1m-paid-media" className="text-white font-semibold hover:text-white/80">
          Cómo escalar un eCommerce D2C de 100K a 1M€ con paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">Sistema completo: hitos de presupuesto, métricas de escala y cuándo activar un segundo canal sin romper rentabilidad</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/metricas-meta-ads-importantes-ecommerce" className="text-white font-semibold hover:text-white/80">
          Métricas Meta Ads que importan de verdad (y las que no) →
        </Link>
        <p className="text-white/40 text-xs mt-1">MER, nCPA y CAC blended: las métricas que validan si la subida de presupuesto está siendo realmente productiva</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default CuantoInvertirMetaAdsCalculadoraPage;
