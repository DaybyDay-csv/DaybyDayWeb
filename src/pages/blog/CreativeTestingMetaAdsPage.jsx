import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Cuántos creativos necesito para hacer creative testing en Meta Ads?",
    a: "Para un test válido necesitas al menos 3-5 variaciones por variable que quieras testear (hook, formato, copy, oferta). En DayByDay recomendamos trabajar con un mínimo de 10-15 creativos activos simultáneamente en una cuenta con >50€/día de gasto, para que el algoritmo de Meta tenga suficientes opciones y datos para optimizar.",
  },
  {
    q: "¿Cuánto presupuesto hay que asignar a creative testing?",
    a: "La regla que seguimos: entre el 15-25% del presupuesto total de Meta Ads dedicado a testing de nuevos creativos. Si gastas 5.000€/mes, entre 750-1.250€ deberían ir a testear nuevos creativos. El resto va a escalar los ganadores probados.",
  },
  {
    q: "¿Cuándo sé que un creativo ha 'ganado' el test?",
    a: "Un creativo gana cuando alcanza al menos 50 eventos de optimización (conversiones o purchases) con un ROAS igual o superior al objetivo de la cuenta, en un periodo de 7-14 días. Con menos datos el resultado es estadísticamente poco fiable. No declaramos ganador antes de 50 conversiones.",
  },
  {
    q: "¿Es mejor usar DCO (Dynamic Creative Optimization) o creativos individuales para hacer tests?",
    a: "Depende del objetivo. DCO es útil para exploración rápida de combinaciones (Meta combina elementos automáticamente), pero no te dice qué elemento específico funcionó. Para aprendizaje real y construir un banco de insights accionables, usamos creativos individuales en fases de validación. DCO sirve más para escala que para aprendizaje.",
  },
  {
    q: "¿Con qué frecuencia hay que renovar los creativos en Meta Ads?",
    a: "Depende del presupuesto: con <200€/día, un buen creativo puede durar 3-6 semanas. Con >500€/día, la fatiga llega antes (1-2 semanas). La señal de alarma no es el tiempo sino la métrica: si el CTR del creativo cae más de un 25% respecto a su mejor semana, es hora de renovarlo aunque lleve pocos días activo.",
  },
];

const CreativeTestingMetaAdsPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Creative Testing en Meta Ads: el framework que usamos para encontrar creativos ganadores"
    description="Framework paso a paso para hacer creative testing en Meta Ads: estructura de campañas, métricas de evaluación, cuándo declarar un ganador y cómo construir un sistema de creatividades que escale."
    slug="creative-testing-meta-ads"
    datePublished="2026-03-25"
    readingTime="9 min"
    category="Meta Ads"
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <h2 className="text-2xl font-black mt-10 mb-4">
      Por qué el creative testing es la única ventaja competitiva real en Meta Ads
    </h2>
    <p className="text-white/70 leading-relaxed mb-5">
      En 2026, Meta Ads es un sistema casi completamente automatizado. La segmentación la gestiona el
      algoritmo. Las pujas las optimiza el sistema. El presupuesto lo distribuye Advantage Campaign Budget.
      Si las palancas técnicas están igualadas entre competidores, ¿qué separa al que escala al que se estanca?
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      La respuesta es una sola: <strong className="text-white">los creativos</strong>. El creativo es el único
      input del sistema publicitario que el algoritmo no puede generar por sí solo (todavía) y que marca la
      diferencia entre un ROAS de 2x y uno de 5x con el mismo presupuesto y el mismo producto.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      En DayByDay hemos gestionado decenas de cuentas D2C en España y el patrón es constante: las marcas que
      tienen un sistema de creative testing estructurado consiguen resultados entre 40-80% mejores que las que
      publican creativos sin metodología. No es suerte. Es proceso.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">
      El error más común: testear todo a la vez
    </h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La mayoría de los eCommerce D2C que llegan a DayByDay tienen el mismo problema: han publicado creativos
      variados sin saber qué testear ni cómo interpretarlo. Lanzan un vídeo UGC, un carrusel de producto y un
      estático lifestyle al mismo tiempo, en la misma campaña, y cuando uno funciona no saben por qué.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Sin saber por qué funciona algo, no puedes replicarlo ni escalarlo. El creative testing no es publicar
      muchos creativos — es publicar creativos diseñados para aprender algo específico.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">
      Las 4 variables que determinan el rendimiento de un creativo
    </h2>
    <div className="space-y-4 mb-8">
      {[
        {
          variable: "1. El hook (primeros 3 segundos)",
          desc: "Es la variable con mayor impacto en el CTR y la tasa de retención. El hook decide si el usuario para el scroll o sigue. En vídeo: los primeros 3 segundos. En estático: el titular o el elemento visual principal. Un hook diferente sobre el mismo producto puede triplicar el CTR.",
          metric: "Métrica clave: Hook Rate (% que ve >3 seg en vídeo) / CTR en estáticos",
        },
        {
          variable: "2. El formato",
          desc: "Vídeo UGC, vídeo producido, carrusel, imagen estática, Stories nativo. Cada formato tiene un coste de producción y un perfil de rendimiento diferente. En D2C español, el UGC de cliente real suele superar al contenido producido en adquisición fría, pero no siempre.",
          metric: "Métrica clave: CPA y ROAS por formato en audiencias frías",
        },
        {
          variable: "3. El ángulo del copy",
          desc: "Problema/solución, benchmark vs competencia, testimonial, urgencia/escasez, beneficio específico, educación. El mismo producto puede comunicarse con 6 ángulos completamente diferentes. El ángulo correcto depende del momento de compra del usuario.",
          metric: "Métrica clave: CVR (tasa de clic a compra) por ángulo de copy",
        },
        {
          variable: "4. La oferta o CTA",
          desc: "Descuento vs precio completo, envío gratis vs precio justo, prueba gratis vs compra directa, urgencia vs evergreen. La oferta afecta directamente al CVR y al tipo de cliente que atrae. Una oferta muy agresiva puede generar volumen pero atraer compradores de bajo LTV.",
          metric: "Métrica clave: CVR, AOV y tasa de repetición de compra a 30 días",
        },
      ].map(({ variable, desc, metric }) => (
        <div key={variable} className="bg-[#1a1616] border border-white/8 rounded-xl p-5">
          <p className="font-bold text-white mb-2">{variable}</p>
          <p className="text-white/60 text-sm mb-3">{desc}</p>
          <p className="text-xs text-[#e63946] font-semibold">{metric}</p>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">
      Nuestro framework de creative testing: 3 fases
    </h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El framework que usamos en DayByDay divide el proceso en tres fases distintas, cada una con objetivos
      y estructura de campañas diferentes.
    </p>

    <h3 className="text-xl font-bold mt-8 mb-3">Fase 1: Exploración — ¿qué ángulos resuenan?</h3>
    <p className="text-white/70 leading-relaxed mb-4">
      Objetivo: identificar qué hooks y ángulos de copy generan la mayor tasa de interacción.
      No buscamos conversiones todavía — buscamos señales de resonancia.
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Estructura: campaña de tráfico o engagement, CBO con mínimo 3 ad sets, 3-5 creativos por ad set",
        "Presupuesto: 10-20€/día por ad set (suficiente para generar datos en 5-7 días)",
        "Variables testadas: hook (primeros 3 seg o titular visual) con el mismo copy de fondo",
        "Criterio de avance: CTR > 1.5% en frío y Hook Rate > 30% en vídeos",
        "Duración: 7 días antes de evaluar — no tocar nada antes",
      ].map((item) => (
        <div key={item} className="flex items-start gap-3 text-sm text-white/70">
          <span className="text-[#e63946] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h3 className="text-xl font-bold mt-8 mb-3">Fase 2: Validación — ¿convierte con datos reales?</h3>
    <p className="text-white/70 leading-relaxed mb-4">
      Los creativos que superan los umbrales de Fase 1 pasan a validación en campaña de conversión.
      Aquí buscamos saber si el creativo realmente vende, no solo si llama la atención.
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Estructura: campaña de Purchase, CBO, 1 creativo por ad set para aislar resultados",
        "Presupuesto: 20-30€/día por ad set mínimo — necesitas datos de conversión suficientes",
        "Criterio de victoria: 50+ compras con ROAS ≥ objetivo de la cuenta en 7-14 días",
        "Combinación de variables: en esta fase sí se pueden testear copy + creativo juntos si el volumen lo permite",
        "Nunca declarar ganador con menos de 50 conversiones — el margen de error es demasiado alto",
      ].map((item) => (
        <div key={item} className="flex items-start gap-3 text-sm text-white/70">
          <span className="text-[#e63946] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h3 className="text-xl font-bold mt-8 mb-3">Fase 3: Escala — maximizar el ganador</h3>
    <p className="text-white/70 leading-relaxed mb-4">
      Un creativo validado pasa a la campaña principal con presupuesto escalado. El objetivo aquí es
      extraer el máximo valor del creativo antes de que la fatiga lo degrade.
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Mueve el creativo ganador a la campaña principal (Advantage+ Shopping o ASC con mejores performers)",
        "Monitoriza el CPM semana a semana — si sube más del 30%, la audiencia empieza a saturarse",
        "Crea variaciones del ganador: mismo hook con copy diferente, mismo copy con nuevo visual",
        "Señal de fatiga: CTR cae >25% vs mejor semana del creativo → planifica sustitución",
        "El ganador nunca dura para siempre — hay que tener sustitutos en Fase 2 continuamente",
      ].map((item) => (
        <div key={item} className="flex items-start gap-3 text-sm text-white/70">
          <span className="text-[#e63946] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">
      La estructura de campañas para testing continuo
    </h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El sistema que implementamos en las cuentas que gestionamos en DayByDay tiene siempre tres capas activas en paralelo:
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {[
        {
          layer: "Capa 1: Escala",
          desc: "60-70% del presupuesto. Creativos ganadores validados. Objetivo: conversiones al ROAS objetivo.",
          color: "border-green-500/30 bg-green-500/5",
        },
        {
          layer: "Capa 2: Validación",
          desc: "20-25% del presupuesto. Candidatos a ganador con buenas métricas de Fase 1. Objetivo: confirmar conversiones.",
          color: "border-yellow-500/30 bg-yellow-500/5",
        },
        {
          layer: "Capa 3: Exploración",
          desc: "10-15% del presupuesto. Nuevos conceptos creativos. Objetivo: aprendizaje y próximos candidatos.",
          color: "border-[#e63946]/30 bg-[#e63946]/5",
        },
      ].map(({ layer, desc, color }) => (
        <div key={layer} className={`border rounded-xl p-4 ${color}`}>
          <p className="font-bold text-white mb-2 text-sm">{layer}</p>
          <p className="text-white/60 text-xs">{desc}</p>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">
      Las métricas que miramos (y las que ignoramos)
    </h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El dashboard de Meta Ads tiene decenas de métricas. Estas son las que realmente importan para evaluar creativos:
    </p>
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 pr-4 text-white/50 font-semibold">Métrica</th>
            <th className="text-left py-3 pr-4 text-white/50 font-semibold">Para qué sirve</th>
            <th className="text-left py-3 text-white/50 font-semibold">Umbral referencia</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {[
            ["CTR (link clicks)", "Mide la capacidad del creativo de generar interés suficiente para el clic", ">1.5% en frío, >2.5% en retargeting"],
            ["Hook Rate (vídeos)", "% que ve más de 3 segundos — indica si el hook detiene el scroll", ">30% para pasar a validación"],
            ["CVR (clic → compra)", "Mide si el creativo atrae al buyer correcto y no solo curiosos", ">1.5% para producto <60€, >0.8% para >100€"],
            ["CPM", "Señal del nivel de competencia y saturación de audiencia", "Comparar vs benchmark del sector — sube si hay fatiga"],
            ["ROAS", "La métrica de negocio — lo que importa al final", "Definido por el objetivo de la cuenta, no universal"],
          ].map(([metric, use, ref]) => (
            <tr key={metric}>
              <td className="py-3 pr-4 text-white font-medium">{metric}</td>
              <td className="py-3 pr-4 text-white/60">{use}</td>
              <td className="py-3 text-white/50 text-xs">{ref}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Métricas que ignoramos para evaluar creativos:</strong> alcance, impresiones, frecuencia
      (a nivel de evaluación de creativo — la frecuencia sí importa a nivel de campaña). Estas métricas dicen cuánta
      gente vio el creativo, no si el creativo es bueno.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">
      Cuántos creativos necesitas según tu presupuesto
    </h2>
    <div className="space-y-4 mb-8">
      {[
        {
          budget: "50-150€/día",
          active: "6-10 creativos activos",
          rotation: "Renueva 2-3 creativos/mes",
          note: "Con poco presupuesto, la fatiga tarda más. Prioriza 1-2 formatos que sepas que convierten en tu sector.",
        },
        {
          budget: "150-500€/día",
          active: "10-20 creativos activos",
          rotation: "Renueva 4-6 creativos/mes",
          note: "Aquí empieza a merecer la pena tener las 3 capas activas. El testing ya genera ROI directo.",
        },
        {
          budget: "+500€/día",
          active: "20-40 creativos activos",
          rotation: "Renueva 8-12 creativos/mes",
          note: "A este nivel, el creative testing es el cuello de botella principal del crecimiento. Necesitas un sistema de producción continua.",
        },
      ].map(({ budget, active, rotation, note }) => (
        <div key={budget} className="bg-[#1a1616] border border-white/8 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#e63946] font-black">{budget}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-white/40 text-xs mb-1">Creativos activos</p>
              <p className="text-white text-sm font-semibold">{active}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Rotación recomendada</p>
              <p className="text-white text-sm font-semibold">{rotation}</p>
            </div>
          </div>
          <p className="text-white/50 text-xs">{note}</p>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">
      El banco de insights: cómo acumular ventaja competitiva
    </h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El objetivo final del creative testing no es solo encontrar el creativo ganador de esta semana.
      Es construir un banco de aprendizajes específico para tu marca y tu cliente: qué hooks funcionan
      en tu categoría, qué ángulos de copy convierten mejor en tu precio, qué formatos tienen mejor LTV.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      En DayByDay documentamos cada test con tres campos: la hipótesis inicial (qué pensábamos que iba a
      pasar), el resultado real (qué pasó) y el aprendizaje accionable (qué hacemos diferente a partir de
      ahora). Tras 3-6 meses, este banco de insights es imposible de replicar por un competidor nuevo
      — es la ventaja competitiva real.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      La mayoría de marcas D2C en España no tienen este sistema. Publican creativos de forma reactiva,
      sin aprender de cada iteración. Esa es la oportunidad.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">
      ¿Por qué muchas marcas D2C fallan en creative testing?
    </h2>
    <div className="space-y-3 mb-8">
      {[
        "Impaciencia: sacan conclusiones con 5-10 conversiones cuando se necesitan 50+",
        "Confunden 'muchos creativos' con 'sistema de testing' — sin hipótesis no hay aprendizaje",
        "No tienen proceso de producción de creativos: dependen de cuando 'sale' contenido nuevo",
        "Testean variables combinadas: no saben si ganó el hook o el copy porque los pusieron juntos",
        "No documentan: cada round de tests empieza de cero sin aprender del anterior",
      ].map((item) => (
        <div key={item} className="flex items-start gap-3 text-sm text-white/70">
          <span className="text-white/30 mt-0.5 flex-shrink-0">✗</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <div className="bg-[#1a1616] border border-[#e63946]/20 rounded-xl p-6 mb-8">
      <p className="text-white font-bold mb-2">¿Quieres implementar este framework en tu cuenta?</p>
      <p className="text-white/60 text-sm mb-4">
        En DayByDay implementamos este sistema de creative testing en cuentas D2C en España desde{" "}
        <strong className="text-white">el primer mes</strong>. Los resultados que publicamos (+156% ROAS en 90 días)
        vienen directamente de aplicar este proceso. Si quieres ver si hay margen de mejora en tus campañas actuales,
        hablamos 15 minutos.
      </p>
      <button
        onClick={openCalendly}
        className="bg-[#e63946] text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-[#c1121f] transition-colors"
      >
        Ver si aplica a mi cuenta →
      </button>
    </div>

    <p className="text-white/70 leading-relaxed mb-5">
      Si tienes curiosidad sobre cómo este framework se aplica a la escala de campañas,{" "}
      <Link to="/blog/escalar-meta-ads" className="text-[#e63946] hover:underline">
        aquí explicamos cómo escalar Meta Ads sin romper el ROAS
      </Link>
      . Y si quieres entender primero si Meta Ads o Google Ads es la mejor inversión para tu eCommerce,{" "}
      <Link to="/blog/meta-ads-vs-google-ads" className="text-[#e63946] hover:underline">
        tienes el análisis completo aquí
      </Link>
      .
    </p>
  </BlogPostLayout>
);

export default CreativeTestingMetaAdsPage;
