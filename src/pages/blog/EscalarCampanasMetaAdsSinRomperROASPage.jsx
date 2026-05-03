import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Cuánto se puede subir el presupuesto de Meta Ads sin romper el ROAS?",
    a: "La regla segura es no superar el 20-30% de subida en una misma semana. Subidas superiores al 30% sacan a las campañas de la fase de aprendizaje y el algoritmo necesita entre 7-14 días para recalibrarse, lo que provoca caídas temporales del ROAS. Si necesitas escalar más rápido, hazlo en pasos del 20-25% con al menos 5-7 días de estabilización entre subidas.",
  },
  {
    q: "¿Qué hacer si el ROAS cae al escalar Meta Ads?",
    a: "Depende de la magnitud de la caída. Una caída de hasta el 15% en los 5-7 días post-subida es normal y el ROAS suele recuperarse solo — no toques nada. Si la caída supera el 20% y se mantiene más de 10 días, reduce el presupuesto al nivel anterior, espera que el ROAS se estabilice y vuelve a intentar la subida de forma más gradual. Si el ROAS cae más del 30%, es señal de un problema subyacente: tracking, fatiga creativa o saturación de audiencia.",
  },
  {
    q: "¿Cuánto tiempo tarda el algoritmo de Meta en estabilizarse tras una subida de presupuesto?",
    a: "Entre 5 y 14 días, dependiendo de la magnitud de la subida y del volumen de conversiones de la cuenta. Cuentas con más de 50 conversiones semanales se estabilizan más rápido (5-7 días). Cuentas con pocas conversiones pueden tardar hasta 14 días. Durante ese período, no hagas más cambios: cada modificación reinicia el aprendizaje y alarga el período de inestabilidad.",
  },
  {
    q: "¿Cuándo está lista mi cuenta de Meta Ads para escalar?",
    a: "Tu cuenta está lista para escalar si cumple tres condiciones: (1) el ROAS lleva al menos 3 semanas estable por encima de tu objetivo, (2) tienes un pipeline de al menos 6-8 creatividades nuevas por mes para mantener el ritmo de la escala, y (3) el tracking es correcto (match rate superior al 80% en Events Manager). Intentar escalar sin estas bases destruye el ROAS y desperdicia presupuesto.",
  },
  {
    q: "¿Escalar con Advantage+ Shopping protege mejor el ROAS que las campañas manuales?",
    a: "Sí, en la mayoría de cuentas de ecommerce. Advantage+ Shopping Campaigns (ASC) redistribuye el presupuesto automáticamente entre prospecting y retargeting según la demanda real, lo que amortigua mejor las fluctuaciones de ROAS al escalar. Con campañas manuales, al subir el presupuesto en prospecting sin ajustar retargeting, el equilibrio se rompe y el ROAS cae más. Meta recomienda ASC como formato primario para ecommerce precisamente por su estabilidad en escala.",
  },
];

const EscalarCampanasMetaAdsSinRomperROASPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Cómo escalar campañas Meta Ads sin que se rompa el ROAS"
    description="Protocolo para escalar Meta Ads sin perder rentabilidad: umbrales de decisión, reglas de subida de presupuesto, señales de alarma y el sistema que usamos en DayByDay para escalar de 5K a 80K€/mes sin sacrificar ROAS."
    slug="escalar-campanas-meta-ads-sin-romper-roas"
    datePublished="2026-03-25"
    dateModified="2026-03-25"
    readingTime="8 min"
    category="Meta Ads"
    keywords={["escalar campañas meta ads", "escalar meta ads sin romper roas", "cómo escalar meta ads", "protocolo escala meta ads", "subir presupuesto meta ads"]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      El problema con <strong className="text-white">escalar campañas de Meta Ads</strong> no es técnico — es que la mayoría de los ecommerces lo hacen sin un protocolo claro. Suben el presupuesto demasiado rápido, el ROAS cae, entran en pánico y vuelven al presupuesto inicial. El resultado es una cuenta estancada donde nunca se puede crecer sin perder rentabilidad.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Este artículo recoge el protocolo que usamos en DayByDay para llevar cuentas de 5.000€/mes a 80.000€/mes sin que el ROAS caiga por debajo del objetivo. No es teoría: son las reglas concretas que seguimos en cada subida de presupuesto, con los umbrales exactos de decisión.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Por qué el ROAS se rompe al escalar</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El algoritmo de Meta aprende con datos. Cuando subes el presupuesto de golpe, el sistema tiene que recalibrar todo su modelo de optimización con el nuevo volumen de gasto. Durante ese período de recalibración — que Meta llama "fase de aprendizaje" — las campañas rinden peor. Si la subida es demasiado grande, la recalibración puede tardar hasta 14 días.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      El segundo problema es la saturación: con más presupuesto, el sistema tiene que impactar a más personas en el mismo tiempo. Si la audiencia es pequeña, el CPM sube porque hay más competencia por las mismas impresiones. La frecuencia se dispara, los creativos se fatigan más rápido y el ROAS cae incluso aunque el algoritmo esté funcionando bien.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Los prerequisitos antes de escalar</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Intentar escalar una cuenta que no está lista es la causa número uno de ROAS destruido. Antes de subir presupuesto, verifica estos tres requisitos:
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          num: "1",
          req: "ROAS estable ≥3 semanas",
          desc: "El ROAS debe llevar al menos 3 semanas por encima de tu objetivo sin caídas significativas. Si el ROAS fluctúa mucho semana a semana, el problema no es falta de presupuesto — hay algo que arreglar primero.",
        },
        {
          num: "2",
          req: "Tracking correcto (match rate >80%)",
          desc: "Verifica en Meta Events Manager que el match rate de tus eventos de compra está por encima del 80% y que no hay duplicaciones. Un tracking roto hace que el algoritmo optimice con datos incorrectos y el ROAS se destruye al escalar.",
        },
        {
          num: "3",
          req: "Pipeline de creatividades activo",
          desc: "Necesitas al menos 6-8 creatividades nuevas por mes para mantener el rendimiento al escalar. A más presupuesto, más rápido se fatigan los creativos. Sin un sistema de producción activo, el ROAS cae a las 2-3 semanas de la subida.",
        },
      ].map(({ num, req, desc }) => (
        <div key={num} className="bg-[#1a1616] border border-white/8 rounded-xl p-4 flex gap-4">
          <div className="w-8 h-8 rounded-full bg-[#de0015]/20 border border-[#de0015]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-[#de0015] font-bold text-sm">{num}</span>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-1">{req}</p>
            <p className="text-white/55 text-sm">{desc}</p>
          </div>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Tabla de decisión: cuánto subir y cuándo parar</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Esta es la tabla que usamos internamente en DayByDay. Define exactamente cuánto presupuesto subir, cuánto tiempo esperar y qué hacer según el comportamiento del ROAS tras la subida:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Subida de presupuesto</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Caída de ROAS tolerable</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Días de espera</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Acción si el ROAS no se recupera</th>
          </tr>
        </thead>
        <tbody>
          {[
            { subida: "≤20%", caida: "Hasta -10%", dias: "5-7 días", accion: "Continuar — caída normal de aprendizaje" },
            { subida: "20-30%", caida: "Hasta -15%", dias: "7-10 días", accion: "Monitorizar — si persiste, mantener 7 días más" },
            { subida: "30-50%", caida: "Hasta -20%", dias: "10-14 días", accion: "Reducir al 80% del presupuesto actual y esperar" },
            { subida: ">50%", caida: "No recomendable", dias: "—", accion: "Dividir en 2 subidas de ≤25% con 2 semanas entre ellas" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-medium">{row.subida}</td>
              <td className={`py-3 px-3 ${i === 3 ? "text-red-400" : "text-white/70"}`}>{row.caida}</td>
              <td className="py-3 px-3 text-white/60">{row.dias}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.accion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/50 text-xs mb-6">
      Fuente: datos internos DayByDay Consulting — análisis de 40+ cuentas de ecommerce D2C en España con inversiones entre 5.000€ y 80.000€/mes.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">La regla de los 7 días: no toques nada</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El error más frecuente después de una subida de presupuesto es hacer más cambios cuando el ROAS cae los primeros días. Cambiar pujas, pausar conjuntos o modificar audiencias mientras el algoritmo está recalibrando lo empeora — cada cambio reinicia el aprendizaje.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      La regla es simple: tras cualquier subida de presupuesto superior al 20%, no hagas ningún otro cambio significativo durante 7 días. Deja que el algoritmo procese los nuevos datos. Si en el día 7 el ROAS sigue por debajo del objetivo más del 15%, entonces sí actúas — pero no antes.
    </p>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Cambios que reinician el aprendizaje (evitar durante 7 días tras subida)</p>
      <div className="space-y-2">
        {[
          "Cambiar la estrategia de puja o el objetivo de optimización",
          "Modificar las audiencias o añadir nuevas exclusiones",
          "Pausar conjuntos de anuncios activos o cambiar su presupuesto",
          "Añadir o eliminar creatividades de conjuntos activos",
          "Cambiar el evento de conversión objetivo",
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 text-white/55 text-sm">
            <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Advantage+ Shopping: la estructura que mejor protege el ROAS en escala</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      En campañas manuales, al subir el presupuesto de prospecting sin ajustar retargeting, el equilibrio entre audiencias frías y calientes se rompe y el ROAS cae. <strong className="text-white">Advantage+ Shopping Campaigns (ASC)</strong> resuelve esto gestionando automáticamente la distribución del presupuesto en tiempo real.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      Según la documentación oficial de <a href="https://www.facebook.com/business/help/1986556321743605" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Meta Business Help sobre Advantage+ Shopping</a>, estas campañas usan señales de comportamiento de toda la cuenta para optimizar la distribución del gasto entre usuarios nuevos y compradores anteriores. El resultado práctico: al escalar el presupuesto, el ROAS es más estable porque el algoritmo puede redistribuir hacia donde hay más oportunidades de conversión.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      En las cuentas que hemos migrado a ASC antes de escalar, la caída de ROAS post-subida ha sido un 35-40% menor que en cuentas con estructura manual equivalente.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Métricas a monitorizar durante la escala</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      No basta con mirar el ROAS. Estas son las métricas que revisamos diariamente durante los 10-14 días posteriores a cualquier subida de presupuesto relevante:
    </p>
    <div className="space-y-3 mb-6">
      {[
        { metrica: "ROAS (ventana 7 días)", umbral: "No debe caer >15% respecto a la semana anterior", señal: "Si cae >20%, aplicar protocolo de recuperación" },
        { metrica: "CPM", umbral: "Subida de hasta +20% es normal al escalar", señal: "Si sube >30%, hay saturación de audiencia o aumento de competencia" },
        { metrica: "Frecuencia (audiencias frías)", umbral: "Mantener por debajo de 2,5 en los últimos 7 días", señal: "Si supera 3, necesitas más audiencia o nuevos creativos urgente" },
        { metrica: "CTR del creativo", umbral: "No debe caer >25% respecto al promedio histórico", señal: "Si cae más, el creativo está en fatiga — rotar" },
        { metrica: "Tasa de conversión post-clic", umbral: "Debe mantenerse estable al escalar", señal: "Si cae, el problema no está en Meta sino en la landing o el checkout" },
      ].map(({ metrica, umbral, señal }) => (
        <div key={metrica} className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
          <p className="font-semibold text-white text-sm mb-1">{metrica}</p>
          <p className="text-white/55 text-sm mb-1"><span className="text-green-400">Normal:</span> {umbral}</p>
          <p className="text-white/40 text-xs"><span className="text-red-400">Alarma:</span> {señal}</p>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Caso real: de 8.000€/mes a 45.000€/mes en 5 meses</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Un ecommerce D2C de suplementos llegó a nosotros con un ROAS de 3,1x pero incapaz de superar los 8.000€/mes de inversión sin que el ROAS se destruyera. Cada vez que intentaban escalar, el ROAS caía por debajo del punto de equilibrio en menos de dos semanas.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      El diagnóstico reveló tres problemas: tracking con duplicaciones en el evento de compra (ROAS real era 2,4x, no 3,1x), estructura con 12 conjuntos de anuncios con presupuesto insuficiente para aprender, y cero sistema de producción de creatividades.
    </p>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-5">
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Inversión mes 1 (post-diagnóstico)", value: "8.000 €/mes" },
          { label: "Inversión mes 5", value: "45.000 €/mes" },
          { label: "ROAS mes 1 (real, post-fix tracking)", value: "2,4x" },
          { label: "ROAS mes 5", value: "3,8x" },
        ].map(({ label, value }) => (
          <div key={label}>
            <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{label}</div>
            <div className="font-bold text-white">{value}</div>
          </div>
        ))}
      </div>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      El proceso: arreglamos el tracking primero, consolidamos a 2 campañas ASC, pusimos en marcha un ciclo de 8-10 creatividades nuevas por mes y aplicamos el protocolo de subida del 20-25% cada 2 semanas. En 5 meses, multiplicamos la inversión por 5,6x con un ROAS 58% más alto que el punto de partida.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      La clave no fue hacer algo especial al escalar — fue tener las bases en orden antes de intentarlo. Puedes ver el detalle completo del proceso de diagnóstico en nuestro artículo sobre <a href="https://www.facebook.com/business/help/562949378025779" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">la calidad de los eventos en Meta Events Manager</a>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay la fase de escala</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Cuando gestionamos una cuenta en fase de escala, seguimos un proceso de revisión semanal con cuatro momentos fijos:
    </p>
    <div className="space-y-3 mb-8">
      {[
        { dia: "Lunes", accion: "Revisión de métricas semanales vs objetivos de ROAS, CPM y frecuencia" },
        { dia: "Miércoles", accion: "Decisión de subida: ¿cumple los requisitos para la siguiente subida del 20-25%?" },
        { dia: "Jueves", accion: "Introducción de nuevas creatividades (si la frecuencia media supera 2,5)" },
        { dia: "Viernes", accion: "Report al cliente con estado de la escala y proyección del mes siguiente" },
      ].map(({ dia, accion }) => (
        <div key={dia} className="flex gap-4 bg-[#1a1616] border border-white/8 rounded-xl p-4">
          <div className="text-[#de0015] font-bold text-sm w-20 flex-shrink-0">{dia}</div>
          <div className="text-white/60 text-sm">{accion}</div>
        </div>
      ))}
    </div>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu cuenta lleva meses sin poder escalar sin romper el ROAS?</p>
      <p className="text-white/50 text-sm mb-4">Diagnosticamos el problema en 48h — tracking, estructura o creatividades. Sin coste ni compromiso.</p>
      <button
        onClick={openCalendly}
        className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm"
      >
        Solicitar diagnóstico gratuito →
      </button>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Artículos relacionados</h2>
    <div className="space-y-3">
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cuanto-invertir-meta-ads-calculadora" className="text-white font-semibold hover:text-white/80">
          Cuánto invertir en Meta Ads según tu ticket y margen (con calculadora) →
        </Link>
        <p className="text-white/40 text-xs mt-1">La fórmula y la calculadora para fijar el presupuesto Meta antes de aplicar el protocolo de subidas del 20-30%</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-ecommerce-d2c-100k-1m-paid-media" className="text-white font-semibold hover:text-white/80">
          [PILAR] Cómo escalar un eCommerce D2C de 100K a 1M€ con paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">Sistema completo en 5 fases — la visión estratégica que enmarca la táctica de subir presupuesto</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/como-mejorar-roas-meta-ads-7-palancas" className="text-white font-semibold hover:text-white/80">
          Cómo mejorar el ROAS en Meta Ads: 7 palancas reales →
        </Link>
        <p className="text-white/40 text-xs mt-1">Las causas raíz del ROAS bajo y el orden correcto para atacarlas antes de escalar</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-meta-ads" className="text-white font-semibold hover:text-white/80">
          Cómo escalar Meta Ads de 100€ a 1.000€/día →
        </Link>
        <p className="text-white/40 text-xs mt-1">Guía completa de escala vertical y horizontal con Advantage+ Shopping</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/benchmark-roas-sector-espana-2026" className="text-white font-semibold hover:text-white/80">
          Benchmark ROAS por sector en España 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">Saber si tu ROAS objetivo es realista antes de planificar la escala</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/checklist-auditoria-campanas-paid-media" className="text-white font-semibold hover:text-white/80">
          Checklist para auditar tus campañas de paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">Verificar que tracking, estructura y creatividades están listos antes de escalar</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/audiencias-lookalike-meta-alta-calidad" className="text-white font-semibold hover:text-white/80">
          Audiencias lookalike en Meta de alta calidad: guía 2026 D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo evitar saturar lookalikes al subir presupuesto y qué stack mantener al escalar</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/advantage-plus-shopping-cuando-usarlo-no" className="text-white font-semibold hover:text-white/80">
          Advantage+ Shopping: cuándo usarlo y cuándo no →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo estructura ASC la distribución presupuesto/audiencia y por qué protege mejor el ROAS en fase de escala</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/ab-testing-meta-ads-que-testar-primero" className="text-white font-semibold hover:text-white/80">
          A/B testing en Meta Ads: qué testar primero para maximizar aprendizaje →
        </Link>
        <p className="text-white/40 text-xs mt-1">Antes de escalar, prioriza tests por impacto: pirámide en 7 niveles del creativo a la estructura</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default EscalarCampanasMetaAdsSinRomperROASPage;
