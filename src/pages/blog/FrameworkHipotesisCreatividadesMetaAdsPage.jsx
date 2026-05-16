import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es un framework de hipótesis creativas en Meta Ads?",
    a: "Un framework de hipótesis creativas es la estructura escrita que define qué se va a testar antes de gastar dinero en producir una pieza de Meta Ads. En lugar de pedirle al creador 'haz un UGC de 15 segundos', el framework convierte cada brief en una afirmación falsable del tipo 'creemos que un hook con dolor físico (espalda) en segundo 0-2, narrado por una mujer 40-55 años, conseguirá un Hook Rate >32% y bajará el CPA en un 18% frente al baseline'. Cada elemento (audiencia objetivo, formato, hook, propuesta, prueba) se anota previamente y se valida con datos. En auditorías de DayByDay vemos que cuentas D2C España con framework escrito previo consiguen 2-3 veces más winners por trimestre que cuentas donde el brief sigue siendo 'haz algo bonito que convierta'."
  },
  {
    q: "¿Cuántas variantes debo testar por hipótesis creativa?",
    a: "El estándar operativo para eCommerce D2C España es 3-4 variantes por hipótesis: misma audiencia, mismo formato, mismo ángulo de fondo, pero cambiando una sola variable controlada (hook, hablante, prueba social, oferta destacada). Con 3-4 variantes y 200-400€ de spend cada una durante 5-7 días tienes señal suficiente para decidir ganador por Hook Rate, CTR outbound y CPA o coste add-to-cart. Si testas solo 1-2 variantes el resultado es ruido estadístico; si pasas de 5-6 variantes por hipótesis estás dispersando spend y reseteando aprendizaje. La regla DayByDay: una hipótesis = un ángulo, 3-4 variantes, 1 variable controlada, 5-7 días, 200-400€ por variante."
  },
  {
    q: "¿Qué dimensiones debe cubrir el brief antes de producir una creatividad para Meta Ads?",
    a: "Cinco dimensiones, ninguna opcional. (1) Audiencia objetivo: edad, género, momento de compra (problema-consciente, solución-consciente, marca-consciente), dolor concreto que verbaliza. (2) Ángulo emocional: dolor físico, miedo social, deseo aspiracional, comodidad, ahorro de tiempo. (3) Formato y duración: Reel vertical 9-25s, estático cuadrado/9:16, carrusel 3-5 slides. (4) Hook segundo 0-2: pregunta directa al dolor, declaración disruptiva, demostración visual, número impactante. (5) Prueba o evidencia: testimonio cliente real, before/after, antes/después de uso, dato cuantitativo, comparativa producto. Si una sola de estas 5 dimensiones queda sin definir, el brief es interpretativo y el creador adivina. Ese es el punto exacto donde se pierden 80-200€ por creatividad producida en vacío."
  },
  {
    q: "¿Cómo priorizo qué hipótesis producir primero cuando tengo presupuesto limitado?",
    a: "Tres criterios: (1) Impacto esperado: una hipótesis sobre el hook impacta más al CPA que una sobre el copy de pie de Reel — un hook malo apaga el funnel en segundo 1, un pie de Reel malo solo reduce 5-8% el CTR outbound. (2) Coste de producción: una variante de hook nuevo con el mismo creador (180-220€) es más eficiente que rodar 4 UGCs nuevos (700-900€) si no tienes señal previa. (3) Confianza basada en señal previa: si la cuenta lleva 60 días con UGC voz on-camera ganando, prioriza variantes del ángulo ganador (versión 2.0) antes que abrir un ángulo totalmente nuevo. Regla práctica DayByDay para cuentas <15K€/mes: 70% del backlog son variantes del winner del trimestre anterior, 30% son ángulos nuevos. Por encima de 20K€/mes ese reparto se mueve a 50/50 porque la cuenta necesita exploración constante para no fatigar."
  },
  {
    q: "¿Quién debe escribir las hipótesis creativas: el media buyer o el equipo creativo?",
    a: "El media buyer escribe la hipótesis y el equipo creativo la ejecuta. Es el error más caro de cuentas D2C en España: delegar el brief en la agencia creativa o en el creador UGC sin filtro de media buyer. El creador sabe rodar, el media buyer sabe qué hook funcionó en el último trimestre, qué audiencia tiene mejor CPA, qué formato concentra el spend de Advantage+ Shopping. Si el brief lo escribe el creador desde cero, el resultado es estéticamente bueno pero ciego a la economía de la cuenta. En DayByDay Pablo redacta cada hipótesis con datos del último trimestre (Hook Rate por ángulo, CTR por formato, CPA por audiencia) y entrega al creador UGC un brief de 1 página con la hipótesis cuantificada, las dimensiones cerradas y los criterios de éxito numéricos. Esto baja el % de creatividades fallidas del 60-70% al 25-35%."
  },
  {
    q: "¿Cuándo descarto una hipótesis creativa que no ha funcionado?",
    a: "Una hipótesis se descarta solo cuando las 3-4 variantes de ese ángulo, cada una con 200-400€ de spend durante 5-7 días, han mostrado Hook Rate <22%, CTR outbound <0,8% y CPA >130% del baseline. Si solo 1 variante ha fallado pero las otras 2-3 no se han llegado a producir, la hipótesis sigue viva. Si las 3-4 variantes han fallado en la misma audiencia, descártala para esa audiencia pero pruébala en una audiencia adyacente antes de matarla del todo. Y documenta siempre por qué se descarta: 'el ángulo dolor físico (espalda) no funcionó en mujer 40-55 con LAL 1% high-value buyers porque la oferta estaba sobreatribuida al beneficio cosmético, no al funcional'. Sin documentación, en 6 meses el equipo vuelve a producir el mismo ángulo fallido."
  }
];

const FrameworkHipotesisCreatividadesMetaAdsPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Framework de hipótesis creativas Meta Ads: cómo briefar antes de gastar en producción"
    description="Framework operativo para escribir hipótesis creativas testables antes de producir cualquier pieza Meta Ads en eCommerce D2C España: las 5 dimensiones obligatorias del brief (audiencia objetivo, ángulo emocional, formato/duración, hook seg 0-2, prueba), anatomía de una hipótesis falsable con métrica de éxito numérica, 7 ángulos canónicos D2C España 2026 (dolor físico, miedo social, aspiracional, comodidad, ahorro tiempo, transformación, ahorro económico) con Hook Rate y CTR esperados por vertical, plantilla DayByDay de brief de 1 página, regla 3-4 variantes/hipótesis con 200-400€/variante y 5-7 días, priorización por impacto × coste × señal previa, criterios para descartar hipótesis con datos y enfoque DayByDay Pablo+Jorge con pipeline n8n + agente IA para hipótesis automatizadas."
    slug="framework-hipotesis-creatividades-meta-ads"
    datePublished="2026-05-14"
    dateModified="2026-05-14"
    readingTime="11 min"
    category="Creatividades"
    keywords={[
      "framework creatividades meta ads",
      "brief creatividades meta ads",
      "hipótesis creativas meta ads",
      "testing creatividades meta ads d2c",
      "ugc meta ads brief",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Un framework de hipótesis creativas para Meta Ads es la diferencia entre gastar 2.000€ en cuatro UGCs que rinden y gastar 2.000€ en cuatro UGCs que el algoritmo no llega a estabilizar.</strong> El 60-70% de las creatividades que producen las cuentas D2C en España con presupuestos de 5-30K€/mes mueren antes del día 7 porque el brief que las generó era una frase del tipo "haz un UGC enseñando el producto" en lugar de una hipótesis falsable. En DayByDay vemos el mismo patrón en cada auditoría: el creador rueda bien, la agencia entrega a tiempo, el media buyer activa, y la pieza se desploma porque nadie escribió por adelantado qué se estaba intentando probar. Esta guía resume el framework operativo que aplicamos a cuentas D2C de 5K a 80K€/mes: las 5 dimensiones del brief, la anatomía de una hipótesis testable, los 7 ángulos canónicos para D2C España, cómo priorizar el backlog y cómo descartar hipótesis con datos en lugar de con intuición.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es un framework de hipótesis creativas y por qué importa en 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Un <strong className="text-white">framework de hipótesis creativas</strong> es un protocolo escrito que convierte cada brief en una afirmación falsable medible por una métrica concreta. En lugar de pedirle al creador "hazme un Reel con el producto", se escribe: "creemos que un hook con dolor físico (espalda) en segundo 0-2, narrado por una mujer 40-55 años en formato Reel 15-18s, conseguirá Hook Rate &gt;32% y reducirá el CPA un 15-20% frente al baseline de 38€". La pieza nace ya con un objetivo numérico, un público objetivo y una variable a aislar. La producción deja de ser arte y se vuelve infraestructura de testing.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Esta disciplina importa más en 2026 que hace 3 años porque <a href="https://www.facebook.com/business/help/355670007911605" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Meta empuja Advantage+ Shopping Campaigns</a> con 8-15 creatividades dispersando el algoritmo, porque la fatiga creativa ha pasado de ciclos de 60 días a ciclos de 21-35 días en audiencias medias y porque el coste por UGC con nano-creator de calidad oscila ya entre 80€ y 250€/pieza. Sin framework, una cuenta D2C 15K€/mes gasta 1.500-3.000€ de producción mensual sin saber qué está aprendiendo.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según el <a href="https://datareportal.com/reports/digital-2025-spain" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">informe Digital 2025 Spain de DataReportal</a>, el usuario español pasa una media de 1h 50min al día en redes sociales con Instagram y TikTok concentrando el 60-65% del tiempo. En auditorías DayByDay de cuentas D2C España 2024-2026, las cuentas con framework escrito previo a producción consiguen 2-3 veces más winners por trimestre y bajan el % de creatividades muertas pre-día-7 del 60-70% al 25-35%, con el mismo presupuesto de producción.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 5 dimensiones que todo brief debe cerrar antes de producir</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Un brief de Meta Ads válido cierra obligatoriamente estas 5 dimensiones. Si una sola queda abierta, el creador interpreta y el resultado es interpretativo:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Dimensión</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Qué cerrar antes de producir</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Métrica que impacta</th>
          </tr>
        </thead>
        <tbody>
          {[
            { d: "Audiencia objetivo", q: "Edad, género, momento de compra (problema/solución/marca-consciente), dolor verbal exacto", m: "CPA por audiencia, % new customers" },
            { d: "Ángulo emocional", q: "Dolor físico, miedo social, aspiracional, comodidad, ahorro tiempo/dinero", m: "CTR outbound, conversion rate post-click" },
            { d: "Formato y duración", q: "Reel 9-25s, estático cuadrado/9:16, carrusel 3-5 slides, UGC voz on-camera", m: "Hook Rate, Hold Rate, frecuencia" },
            { d: "Hook segundo 0-2", q: "Pregunta directa al dolor, declaración disruptiva, demostración visual, número grande", m: "Hook Rate (>25% baseline aceptable, >32% winner)" },
            { d: "Prueba o evidencia", q: "Testimonio cliente real, before/after, dato cuantificado, demo de uso, comparativa", m: "CTR outbound, CR post-click, % new customers" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.d}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.q}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.m}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      El error más caro: cerrar 4 de las 5 dimensiones y dejar el hook al criterio del creador. El hook concentra el 60-70% del impacto en Hook Rate y Hook Rate por debajo del 22% mata la creatividad en 48-72h independientemente de lo bueno que sea el resto del Reel.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Anatomía de una hipótesis creativa testable</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Una hipótesis creativa válida sigue una estructura fija de 5 bloques. Esto es lo que se escribe en una página A4 antes de gastar un solo euro en producción:
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Afirmación: 'Creemos que [HOOK / ÁNGULO] resonará más en [AUDIENCIA] porque verbalizan [DOLOR] y consumen contenido [FORMATO]'. Ejemplo: 'creemos que un hook con before/after de cabello frizz a hidratado, narrado por mujer 30-45 que reconoce el problema visualmente, resonará más en LAL 1-3% de clientes con AOV >50€'.",
        "Métrica de éxito: número concreto que define ganador. Ejemplo: 'Hook Rate >32%, CTR outbound >1,4%, CPA <34€ (15% mejor que baseline 40€), 200€ de spend mínimo'.",
        "Variable aislada: única cosa que cambia respecto al baseline o al control. Ejemplo: 'mantenemos creador, audiencia, oferta y CTA; solo cambiamos el hook visual de talking-head a before/after en segundo 0-2'.",
        "Riesgos y supuestos: qué tiene que ser cierto para que el test sea válido. Ejemplo: 'asumimos que la audiencia LAL 1-3% tiene volumen suficiente >100K usuarios y que la oferta -15% sigue activa durante todo el test'.",
        "Decisión por resultado: qué se hace si gana, si pierde y si queda indiferente. Ejemplo: 'si gana: producimos 2-3 variantes del before/after con creadores distintos. Si pierde: matamos el ángulo before/after para esta audiencia y probamos en LAL 5-10%. Si indiferente: extendemos 3 días el test antes de decidir'.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>
    <p className="text-white/70 leading-relaxed mb-5">
      Cualquier brief que no cierre los 5 bloques entra en el cajón hasta que el media buyer lo complete. Suena rígido; en la práctica reduce el % de creatividades fallidas del 60-70% al 25-35% en cuentas auditadas en DayByDay.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">7 ángulos canónicos D2C España 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Para acelerar la fase de ideación, todo backlog parte de los 7 ángulos canónicos que más rinden en D2C España según datos de cuentas auditadas (5-80K€/mes) y validación cruzada con <a href="https://www.facebook.com/ads/library" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Meta Ads Library</a>:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Ángulo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Vertical donde rinde más</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Hook Rate esperado</th>
          </tr>
        </thead>
        <tbody>
          {[
            { a: "Dolor físico (espalda, sueño, piel, digestión)", v: "Suplementos, cosmética funcional, mascotas", h: "30-42%" },
            { a: "Miedo social (calvicie, mal aliento, aspecto envejecido)", v: "Cosmética, higiene, salud capilar", h: "32-45%" },
            { a: "Aspiracional (versión mejor de ti)", v: "Moda, fitness, belleza premium", h: "26-38%" },
            { a: "Comodidad (ahorro de fricción diaria)", v: "Hogar, mascotas, alimentación premium", h: "28-36%" },
            { a: "Ahorro de tiempo (rutina 5 min)", v: "Belleza, suplementos, comida preparada", h: "30-40%" },
            { a: "Transformación visible (before/after)", v: "Cosmética, fitness, hogar (mancha/orden)", h: "34-48%" },
            { a: "Ahorro económico (vs alternativa)", v: "Suplementos, hogar, suscripciones", h: "24-34%" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.a}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.v}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.h}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Ningún ángulo es universal. Una marca de suplementos con audiencia 40-65 años suele rentar más con dolor físico + transformación; una marca de moda femenina 25-40 años rentar más con aspiracional + transformación; un D2C de hogar con audiencia 30-55 años rentar más con comodidad + ahorro tiempo. El backlog trimestral debería testar 2-3 ángulos distintos en paralelo para no concentrar la cuenta en un único registro emocional.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Plantilla DayByDay: brief de 1 página</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Estructura del brief que entregamos al creador antes de cualquier producción. Cabe en una página A4 y nunca pasa de 350 palabras:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "Cabecera: marca, fecha, código de hipótesis (H-2026-Q2-#12), media buyer responsable.",
        "Hipótesis (5 bloques): afirmación, métrica de éxito, variable aislada, riesgos/supuestos, decisión por resultado.",
        "Audiencia objetivo: 2-3 líneas con edad, género, momento de compra y dolor verbal exacto (citas reales de reviews o entrevistas).",
        "Formato y especificaciones técnicas: Reel 9:16 1080×1920px, duración 15-22s, audio voz on-camera + sub generados, primer fotograma con producto visible.",
        "Guión por escenas (segundos): seg 0-2 hook, seg 2-6 dolor o promesa, seg 6-12 demo o evidencia, seg 12-18 prueba social, seg 18-22 CTA.",
        "Don'ts explícitos: no MotionGraphics, no música cinematográfica, no más de 3 cortes/3s, no hablar a cámara durante >8s seguidos.",
        "Criterio de aceptación: Hook Rate >25% y CTR outbound >1% para considerar la pieza válida antes de escalar.",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo priorizar el backlog de hipótesis</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Una cuenta D2C activa puede tener 15-25 hipótesis vivas en el backlog en un trimestre. Producirlas todas no es viable; priorizarlas mal es la causa real de la mayoría de cuentas estancadas. Criterio de priorización en 3 ejes:
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Impacto esperado en CPA: hipótesis sobre el hook (impacto 15-30% en CPA) prioritarias sobre hipótesis de pie de Reel (impacto 3-8%). Hipótesis sobre formato (Reel vs estático) prioritarias sobre hipótesis de duración (15s vs 22s).",
        "Coste de producción: variante del winner actual con mismo creador 180-220€/pieza versus rodar UGC nuevo con creador nuevo 350-700€/pieza. Con presupuesto limitado, 70% del backlog debe ser iteración del ángulo ganador del trimestre anterior y 30% exploración de ángulos nuevos.",
        "Confianza basada en señal previa: si la cuenta lleva 60 días con dolor físico ganando en mujer 40-55, prioriza variantes 2.0 del ángulo (cambio de hablante, setting, hook visual) antes que abrir un ángulo totalmente nuevo con esa misma audiencia. La señal previa reduce el riesgo de la inversión.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>
    <p className="text-white/70 leading-relaxed mb-5">
      Ver protocolo de rotación creativa y ciclo de vida por audiencia en la <Link to="/blog/ad-fatigue-meta-ads-rotacion-creativa" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de ad fatigue en Meta Ads</Link> y método para extraer ángulos de la competencia sin copiar en la <Link to="/blog/meta-ads-library-analisis-competencia" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía de Meta Ads Library</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">7 errores frecuentes al briefar creatividades en Meta Ads</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Brief delegado al creador o a la agencia creativa sin filtro del media buyer: la pieza nace estéticamente correcta pero ciega a la economía de la cuenta (qué audiencia tiene mejor CPA, qué ángulo ganó el trimestre anterior).",
        "Mezclar 2-3 ángulos emocionales en la misma creatividad para 'cubrir más': la pieza no resuena fuerte con ningún segmento y el Hook Rate se queda en 18-22%.",
        "Producir 6-8 piezas con presupuesto pequeño en lugar de 3-4 con presupuesto suficiente: cada pieza no llega a 200€ de spend y queda en aprendizaje permanente.",
        "Cambiar 2-3 variables a la vez (hook + creador + formato): si gana o pierde no sabes cuál variable fue. El A/B testing real solo aísla una variable por hipótesis.",
        "No documentar las hipótesis fallidas: en 6 meses el equipo vuelve a proponer el mismo ángulo perdedor porque nadie recuerda que ya se testó.",
        "Confundir 'me gusta' interno con señal de mercado: la pieza que más gusta en la sala de reuniones suele ser la que peor convierte. Solo el dato Hook Rate + CTR + CPA decide.",
        "No incluir don'ts en el brief: el creador rellena el brief con su intuición visual (MotionGraphics, música épica, transiciones rápidas) y la pieza nace ya con anti-patrones documentados que matan Hook Rate en seg 0-2.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Onboarding incluye auditoría de las últimas 30-60 creatividades producidas: identificamos cuántas tenían brief escrito previo, cuántas se decidieron en reunión sin documentar, qué % murió antes del día 7 y qué % escaló. En cuentas D2C 5-30K€/mes el patrón típico es 60-70% de creatividades muertas pre-día-7 y 5-8% que escalan. Tras 90 días con framework esos números pasan a 25-35% muertas y 15-22% que escalan.",
        "Brief de 1 página firmado por Pablo antes de cualquier producción: la hipótesis (5 bloques), las 5 dimensiones cerradas, el guión por escenas y los don'ts explícitos. El creador no recibe el encargo hasta que el brief está firmado.",
        "Regla 3-4 variantes por hipótesis con 200-400€ de spend cada una y 5-7 días de test: ni 1-2 variantes (ruido estadístico) ni 6-8 variantes (dispersión de spend). Variable aislada estricta: cambia hook o cambia hablante, no ambos.",
        "Solución ad-hoc Pablo + Jorge: para una cuenta D2C de cosmética 22K€/mes con 6 ángulos vivos pero sin priorización, Jorge montó un workflow n8n + agente IA sobre OpenAI API que cruza datos del último trimestre (Hook Rate por ángulo, CPA por audiencia, % new customers por creatividad) con Meta Ads Library de 6 competidores y devuelve cada lunes un ranking del top 5 hipótesis a producir con coste estimado y métrica de éxito propuesta. Pablo revisa, firma 2-3 hipótesis y entrega al creador nano-creator (180-220€/pieza). En 90 días el % de winners pasó de 7% a 19% sin tocar presupuesto de producción.",
        "Documentación obligatoria de hipótesis ganadoras y fallidas: cada cuenta tiene un Notion compartido con histórico de hipótesis testadas, resultado numérico y conclusión. Cuando rota equipo del cliente o cuando aparece una nueva propuesta de ángulo, se valida contra el histórico no contra la intuición del momento.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo (founder · paid media) escribe cada hipótesis con datos del último trimestre, firma el brief y valida la pieza final contra criterio Hook Rate + CTR + CPA. Jorge (CTO · automation) construye el pipeline n8n + agente IA + Meta Marketing API que automatiza el ranking semanal de hipótesis, scrapea Meta Ads Library de competidores y centraliza el histórico en Notion. Donde otras agencias entregan briefs en formato "haz un UGC bonito", en DayByDay cada pieza nace de una hipótesis falsable escrita y firmada. El cliente habla con los dos socios desde la primera reunión: sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu cuenta produce 4-6 creatividades al mes y solo 1 sobrevive al día 7?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos las últimas 30 creatividades, cuántas tenían brief escrito previo, qué % escaló y entregamos plantilla DayByDay de hipótesis + ranking de top 5 ángulos a testar el próximo trimestre.</p>
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
        <Link to="/blog/ad-fatigue-meta-ads-rotacion-creativa" className="text-white font-semibold hover:text-white/80">
          Ad fatigue en Meta Ads: señales tempranas y protocolo de rotación creativa →
        </Link>
        <p className="text-white/40 text-xs mt-1">Ciclo de vida por audiencia y formato, 4 señales tempranas, pipeline 4-8 creatividades/mes con presupuesto fijo</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/meta-ads-library-analisis-competencia" className="text-white font-semibold hover:text-white/80">
          Análisis de competencia en Meta Ads Library →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo extraer ángulos ganadores de competidores y convertirlos en hipótesis testables sin copiar</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/ugc-meta-ads" className="text-white font-semibold hover:text-white/80">
          UGC en Meta Ads: por qué funciona y cómo producirlo →
        </Link>
        <p className="text-white/40 text-xs mt-1">Formato dominante en D2C España 2026 y cómo encajarlo en el framework de hipótesis creativas</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/creative-testing-meta-ads" className="text-white font-semibold hover:text-white/80">
          Creative testing en Meta Ads: framework paso a paso →
        </Link>
        <p className="text-white/40 text-xs mt-1">Estructura de cuenta para testar hipótesis sin canibalizar campañas evergreen</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/partnership-ads-meta-ugc-creators-d2c" className="text-white font-semibold hover:text-white/80">
          Partnership Ads en Meta para D2C con cuentas de creators →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo aplicar el framework de hipótesis al brief con creator y servirlo como Partnership Ad para subir Hook Rate 25-40%</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default FrameworkHipotesisCreatividadesMetaAdsPage;
