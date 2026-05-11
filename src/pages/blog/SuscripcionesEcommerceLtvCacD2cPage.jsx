import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué cambia en el cálculo del LTV cuando un eCommerce D2C añade suscripción?",
    a: "Sin suscripción, el LTV de un D2C es la suma del primer pedido más los repeats orgánicos en una ventana (típicamente 12-24 meses) y depende del comportamiento natural del cliente. Con suscripción, el LTV se vuelve predecible porque el segundo pedido y los siguientes ya están contratados: la fórmula pasa de ser un promedio histórico a un cálculo casi contable. LTV-12m suscripción = AOV neto × (1 − churn mensual)^N meses × ratio renovación, aplicado mes a mes. En cuentas D2C españolas reales el LTV-12m sube entre el 35% y el 80% al introducir suscripción frente al mismo cliente sin suscribir, y el LTV-24m hasta el 150%. Por eso el CAC objetivo también cambia: si el LTV se multiplica por 1,6, el CAC máximo permitido por la regla LTV/CAC ≥ 3:1 también puede subir un 60% sin romper la economía."
  },
  {
    q: "¿Cómo se calcula el CAC objetivo en un eCommerce D2C con suscripción?",
    a: "La fórmula operativa que usamos en DayByDay: CAC objetivo = LTV-12m suscripción × margen contribución / ratio LTV/CAC mínimo. Ejemplo cuenta suplementos España con AOV neto 45€, margen contribución 50%, churn mensual 8%, suscripción mensual: LTV-12m ≈ 45€ × 7,6 pedidos esperados = 342€, margen contribución acumulado ≈ 171€, CAC objetivo con ratio 3:1 = 57€. Sin suscripción, esa misma cuenta tendría 1,8 pedidos en 12 meses, LTV-12m ≈ 81€, margen 40,5€ y CAC objetivo 13,5€. La diferencia es 4,2x: una cuenta sin suscripción quiebra con CAC 40€, y la misma cuenta con suscripción opera rentable con CAC 55€. Para fijar el CAC objetivo final hay que ajustar por la tasa de adopción de suscripción (% de clientes que se suscriben en el primer pedido, típicamente 18-35% en suplementos)."
  },
  {
    q: "¿Cuál es el churn mensual saludable en una suscripción D2C en España?",
    a: "Rangos observados en cuentas D2C españolas a 12-24 meses de antigüedad: suplementos/nutrición churn mensual 6-10% (top decile 3-5%), café/té premium 5-8%, alimentación recurrente 7-12%, cosmética/skincare básica 8-13%, mascotas (comida/snacks) 4-7% (top 2-4%), productos higiene/cuidado personal 6-9%. Por debajo de los rangos típicos suele indicar curación de cohorte excesiva (descuento agresivo que retiene clientes no rentables). Por encima suele indicar producto no recurrente, fricción operativa (envíos tarde, packaging defectuoso, dificultad cancelar) o descuento de suscripción insuficiente para retener (<10% no genera percepción de valor). Calcular churn siempre sobre cohortes: clientes que se suscribieron en mes M y siguen activos en mes M+1, M+2, etc. La tasa instantánea (clientes activos hoy / clientes activos hace 30 días) es menos precisa porque mezcla cohortes de antigüedades distintas."
  },
  {
    q: "¿Cómo cambia el ratio LTV/CAC permitido en una D2C con suscripción frente a una sin ella?",
    a: "El ratio LTV/CAC ≥ 3:1 es el suelo estándar para D2C sin suscripción porque hay incertidumbre sobre repeats: si el LTV proyectado falla, el margen colchón evita pérdidas. Con suscripción contractual el ratio puede bajar al 2,5:1 e incluso al 2:1 en escenarios de captación agresiva, porque el LTV es predecible mes a mes y la cohorte de suscripción suele tener payback period 60-90 días (vs 120-180 días sin suscripción). El razonamiento operativo: si tu churn mensual es 7% y tu margen contribución acumulado supera el CAC en mes 3, puedes asumir un ratio LTV/CAC más agresivo porque tu caja se recupera en menos de un trimestre y el riesgo de captar mal cliente es limitado. Marcas como Hims, Ritual o, en España, marcas de cosmética con suscripción operan habitualmente con ratios 2,2-2,8:1 y escalan porque la suscripción protege el flujo de caja."
  },
  {
    q: "¿Qué descuento de suscripción funciona mejor en eCommerce D2C: -10%, -15% o -20%?",
    a: "Patrón observado en cuentas D2C españolas: -10% sobre precio one-time es insuficiente (tasa de adopción 8-14%, churn alto porque la diferencia no compensa la fricción de cancelar). -15% es el punto óptimo (adopción 18-28%, churn medio 6-9%, margen aún saludable). -20% sube la adopción al 30-40% pero comprime margen contribución cerca del umbral mínimo viable y atrae clientes price-sensitive con churn alto. -25% o más solo tiene sentido en producto con margen bruto >65% (suplementos, café, cosmética básica) y como herramienta táctica de lanzamiento. La decisión final depende del margen bruto del producto: con margen bruto <50% no se puede ir por debajo de -10/-12%; con margen bruto >60% el -15% es la zona óptima; con margen bruto >70% se puede agresivar a -18/-20% durante fase de growth y revisar a los 6-12 meses."
  },
  {
    q: "¿Cómo se mide la incrementalidad real de la suscripción en una D2C?",
    a: "La pregunta operativa: ¿el cliente que se suscribió compraría igual sin suscripción o estamos canibalizando repeats orgánicos? Tres métodos: (1) Holdout A/B: 50% de clientes ven oferta de suscripción en post-purchase, 50% no, durante 60-90 días. Comparar revenue 12m de ambas cohortes — la diferencia neta es la incrementalidad real. (2) Cohort comparison pre/post: comparar LTV-12m de cohorte adquirida 6 meses antes de lanzar suscripción vs cohorte adquirida 6 meses después con mismo canal/creative/audiencia. (3) Análisis comportamental: del % de clientes que se suscriben, qué % habría hecho repeat orgánico (estimable cruzando datos del cliente con su segmento de origen). Datos propios: la incrementalidad típica de suscripción en suplementos D2C España está entre 40% y 65% — el resto sería repeat orgánico que la suscripción simplemente capturó (y rentabilizó con descuento permanente). Es un cálculo crítico antes de fijar el CAC objetivo: si solo el 50% es incremental, el LTV neto de la suscripción es la mitad de lo proyectado."
  },
  {
    q: "¿En qué sectores D2C funciona la suscripción y en cuáles no?",
    a: "Sectores donde la suscripción tiene fit estructural alto: suplementos/nutrición (consumo diario predecible, recompra cada 30-45d), café/té premium (consumo semanal estable), cosmética/skincare básica (rutinas con recompra cada 30-60d), mascotas (comida/snacks con consumo predecible por peso del animal), alimentación recurrente (granolas, snacks saludables), productos higiene (afeitado, cuidado dental). Sectores donde la suscripción funciona regular: moda (consumo no predecible, churn alto, salvo modelos curados tipo Lookiero), hogar/decoración (consumo episódico), electrónica/gadgets (compra one-time mayoritaria). Sectores donde la suscripción casi nunca funciona: muebles, joyería, productos de gran ticket y consumo único. La regla operativa: si el producto tiene un ciclo de recompra natural <60 días y un margen bruto >50%, la suscripción es una palanca con ROI a 90 días. Si no cumple ambas, mejor trabajar bundle/cross-sell antes."
  }
];

const SuscripcionesEcommerceLtvCacD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Suscripciones en D2C: cómo cambia el cálculo de LTV y CAC objetivo"
    description="Guía operativa para integrar suscripciones en un eCommerce D2C en España: cómo se recalcula el LTV-12m con churn mensual, cómo se deriva el nuevo CAC objetivo, churn saludable por sector (suplementos 6-10%, mascotas 4-7%, café 5-8%, cosmética 8-13%), qué descuento funciona mejor (-15% óptimo), cómo medir la incrementalidad real con holdout A/B, ratios LTV/CAC permitidos con suscripción contractual (2,2-2,8:1) y enfoque DayByDay (Pablo + Jorge) con caso real cuenta suplementos."
    slug="suscripciones-ecommerce-ltv-cac-d2c"
    datePublished="2026-05-11"
    dateModified="2026-05-11"
    readingTime="11 min"
    category="Unit Economics"
    keywords={[
      "suscripciones ecommerce ltv cac",
      "modelo suscripción d2c españa",
      "cac objetivo ecommerce suscripción",
      "churn mensual saludable d2c",
      "descuento suscripción shopify",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Añadir suscripción a un eCommerce D2C cambia por completo el cálculo del LTV y del CAC objetivo</strong>. Lo que en una D2C sin suscripción es una proyección estadística basada en repeats orgánicos, en una D2C con suscripción se convierte en un cálculo casi contable: el segundo pedido y los siguientes ya están contratados, el churn mensual es medible por cohorte y el payback period se acorta entre un 30% y un 50%. La consecuencia directa es que el CAC máximo permitido sube, las cuentas pueden escalar spend más rápido y la sensibilidad al ROAS de Meta in-platform deja de ser el factor crítico. En esta guía repasamos cómo recalcular LTV con churn, cómo derivar el nuevo CAC objetivo, qué ratios LTV/CAC son aceptables con suscripción y los errores que destruyen valor.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es la suscripción D2C y por qué cambia las matemáticas del negocio</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Una suscripción D2C</strong> es un modelo de compra recurrente automatizada en el que el cliente acepta recibir el producto cada N días (típicamente 30, 45 o 60) con un descuento permanente sobre el precio one-time (habitualmente entre -10% y -20%). Apps Shopify típicas: <a href="https://www.shopify.com/subscriptions" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Shopify Subscriptions (nativo)</a>, Recharge, Bold Subscriptions, Smartrr y Loop. Lo que cambia respecto a un D2C tradicional no es el tipo de cliente — es la estructura del flujo de caja.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      En una D2C sin suscripción, el LTV-12m es un promedio histórico calculado sobre cohortes pasadas: depende del comportamiento orgánico del cliente y tiene varianza alta. En una D2C con suscripción, el LTV-12m es una función de tres variables medibles mes a mes: AOV neto, churn mensual y ratio de renovación. Esto convierte el negocio en mucho más predecible y permite tomar decisiones de spend más agresivas porque el riesgo se acota.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según <a href="https://www.mckinsey.com/industries/consumer-packaged-goods/our-insights/thinking-inside-the-subscription-box-new-research-on-ecommerce-consumers" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">McKinsey, el mercado global de eCommerce con suscripción crece a tasas del 17-20% anuales</a>, y los D2C con modelo suscripción muestran un LTV-12m promedio entre un 35% y un 80% superior al mismo cliente sin suscribir. En España el dato concreto en cuentas D2C reales: la cohorte suscriptor a 12 meses genera entre 1,5x y 2,2x más revenue que la cohorte one-time del mismo periodo, con un coste de adquisición igual.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo se recalcula el LTV con suscripción</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Fórmula operativa que aplicamos en DayByDay para LTV-12m de suscripción:
    </p>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-mono text-sm leading-relaxed">
        LTV-12m = Σ (AOV neto × (1 − churn mensual)^t) para t = 0 a 11
      </p>
      <p className="text-white/50 text-xs mt-3 leading-relaxed">
        Donde el AOV neto = precio suscripción × (1 − % devoluciones) y t = mes de la cohorte.
      </p>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Ejemplo cuenta suplementos España: precio one-time 50€, precio suscripción mensual 42€ (con -15%), devoluciones 3%, churn mensual 8%. AOV neto ≈ 40,7€. LTV-12m = 40,7 × (1 + 0,92 + 0,847 + 0,779 + 0,716 + 0,659 + 0,606 + 0,558 + 0,513 + 0,472 + 0,434 + 0,400) ≈ 40,7 × 7,9 ≈ 322€. Sin suscripción, esa misma cuenta tiene 1,7 pedidos en 12 meses con AOV neto 48€ → LTV-12m ≈ 82€. La cohorte suscriptora vale 3,9x más en 12 meses con el mismo coste de adquisición.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo se deriva el nuevo CAC objetivo</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Fórmula que usamos para fijar el CAC máximo permitido en D2C con suscripción:
    </p>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-mono text-sm leading-relaxed">
        CAC objetivo = LTV-12m × margen contribución / ratio LTV/CAC mínimo
      </p>
      <p className="text-white/50 text-xs mt-3 leading-relaxed">
        Ajustar siempre por la tasa de adopción de suscripción (% de clientes nuevos que se suscriben en el primer pedido).
      </p>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Continuando el ejemplo anterior: LTV-12m 322€, margen contribución 55% sobre revenue (suplementos típico) = 177€ margen acumulado. Con ratio LTV/CAC mínimo 2,5:1 (más agresivo que el 3:1 estándar porque la suscripción reduce el riesgo) → CAC objetivo = 177 / 2,5 = 70,8€. Si la tasa de adopción de suscripción en el primer pedido es del 25% (típico en suplementos D2C en España), el CAC blended objetivo se ajusta a la mezcla 25% suscriptor (CAC objetivo 70,8€) + 75% one-time (CAC objetivo del producto sin suscribir, típicamente 20-25€) → CAC blended ≈ 33-35€.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Para entender cómo el margen contribución entra en la fórmula y cómo aislarlo del ROAS in-platform, ver la <Link to="/blog/margen-contribucion-vs-roas-ecommerce" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía margen de contribución vs ROAS</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Churn mensual saludable por sector D2C en España 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Rangos observados en cuentas D2C españolas con suscripción operando a 12-24 meses. El top decile es el 10% superior de cada sector (suelen tener producto consumible claro, fricción de cancelación baja y descuento entre -12% y -18%).
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Sector D2C</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Churn mensual típico</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Top decile</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Fit suscripción</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: "Suplementos / nutrición", t: "6-10%", e: "3-5%", p: "Muy alto" },
            { s: "Café / té premium", t: "5-8%", e: "3-5%", p: "Muy alto" },
            { s: "Mascotas (comida/snacks)", t: "4-7%", e: "2-4%", p: "Excelente" },
            { s: "Cosmética / skincare básica", t: "8-13%", e: "5-8%", p: "Alto" },
            { s: "Higiene / cuidado personal", t: "6-9%", e: "4-6%", p: "Alto" },
            { s: "Alimentación recurrente", t: "7-12%", e: "5-8%", p: "Medio-alto" },
            { s: "Moda (curada)", t: "12-18%", e: "8-12%", p: "Bajo-medio" },
            { s: "Hogar / decoración", t: "15-25%", e: "10-15%", p: "Muy bajo" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.t}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.e}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Churn por debajo del rango típico suele indicar curación de cohorte excesiva (descuento agresivo del -25% retiene clientes price-sensitive con baja lealtad real). Churn por encima suele indicar producto no recurrente, fricción operativa o descuento insuficiente. Calcular siempre churn por cohorte mensual, no instantáneo, para evitar contaminación entre cohortes de antigüedad distinta.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué descuento de suscripción funciona mejor</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Descuento -10%: adopción baja (8-14%) en el primer pedido. Insuficiente para compensar la fricción operativa de cancelar. Útil solo en sectores con margen bruto <50% (alimentación premium, hogar consumibles) donde un descuento mayor compromete el margen contribución.",
        "Descuento -15%: punto óptimo en la mayoría de sectores. Adopción 18-28%, churn mensual medio 6-9%, margen contribución aún saludable. Recomendable como default en suplementos, cosmética, mascotas, higiene.",
        "Descuento -20%: adopción sube al 30-40% pero comprime margen contribución cerca del umbral viable. Atrae perfil price-sensitive con churn más alto (8-13%). Solo viable con margen bruto >65%.",
        "Descuento -25% o más: solo tiene sentido como herramienta táctica de lanzamiento (primeros 3-6 meses para construir base) o en producto con margen bruto >70%. Como descuento permanente comprime margen y atrae cohorte de calidad baja.",
        "Free trial 30 días: alternativa al descuento permanente, funciona muy bien en suplementos y cosmética porque permite probar producto sin compromiso. Conversión post-trial 35-55% en cuentas bien implementadas.",
        "Skip/pause en lugar de cancelar: reduce churn mensual entre 2 y 4 puntos al ofrecer pausa de 1-3 meses en vez de cancelación definitiva. App típica Shopify: Recharge nativo, Smartrr.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo medir la incrementalidad real de la suscripción</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La pregunta crítica antes de fijar el nuevo CAC objetivo: ¿el cliente que se suscribió compraría igual sin suscripción o estamos canibalizando repeats orgánicos? Si la incrementalidad real es solo del 50%, el LTV neto de la suscripción es la mitad de lo proyectado y el CAC objetivo derivado también. Tres métodos para medir incrementalidad:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Holdout A/B en post-purchase: 50% de clientes ven oferta de suscripción inmediata tras el primer pedido, 50% no. Comparar revenue 12 meses de ambas cohortes con mismo canal y creative. La diferencia neta es la incrementalidad real. Test mínimo 60-90 días con 2.000-3.000 nuevos clientes por cohorte para significancia.",
        "Cohort comparison pre/post: comparar LTV-12m de cohorte adquirida 6 meses antes de lanzar suscripción vs cohorte adquirida 6 meses después con mismo canal/creative/audiencia. Si la cohorte post-suscripción tiene LTV-12m 1,8x superior, esa es la incrementalidad observable (ajustada por estacionalidad).",
        "Análisis comportamental por segmento: cruzar la base de clientes suscritos con su segmento de origen (canal de adquisición, comportamiento web previo, valor primer pedido) para estimar qué % habría hecho repeat orgánico sin suscripción. Requiere data warehouse mínimo (Shopify + GA4 + email) pero da el % de canibalización más preciso.",
        "Encuesta post-suscripción: pregunta directa al cliente '¿habrías comprado otra vez sin suscribirte?'. Auto-reportada y sesgada pero útil como proxy rápido en cuentas pequeñas (<1.000 suscriptores). 30-45% suele responder que sí — esa es la canibalización percibida (suele subestimar la real).",
        "Métrica operativa: % de suscripciones cancelaadas que vuelven a comprar one-time en los 90 días siguientes. Si >40% vuelve a comprar sin suscripción, la incrementalidad real es baja y conviene revisar el descuento (suele ser demasiado generoso).",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Datos propios en cuentas D2C España: la incrementalidad típica de suscripción está entre el 40% y el 65% (el resto sería repeat orgánico capturado por la oferta de suscripción). Por debajo del 40% suele indicar descuento demasiado generoso; por encima del 70% indica que el producto tiene baja recompra orgánica y la suscripción está generando valor neto puro.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Ratio LTV/CAC permitido con suscripción contractual</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El ratio LTV/CAC ≥ 3:1 es el suelo estándar para D2C sin suscripción porque protege frente a la incertidumbre de repeats orgánicos. Con suscripción el ratio puede bajar porque el LTV es predecible mes a mes. Rangos operativos por fase de cuenta:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Fase cuenta</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Ratio LTV/CAC mínimo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Payback period objetivo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Comentario</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: "Lanzamiento (0-6m)", t: "2,0:1", e: "120-180d", p: "Aceptable porque suscripción acota riesgo y hay runway de caja" },
            { s: "Growth (6-18m)", t: "2,5:1", e: "90-120d", p: "Zona óptima con suscripción consolidada" },
            { s: "Madurez (18m+)", t: "3,0:1", e: "60-90d", p: "Empieza a haber datos de churn reales por cohorte" },
            { s: "Sin suscripción", t: "3,0:1", e: "120-180d", p: "Suelo estándar D2C tradicional" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.t}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.e}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Errores frecuentes al implementar suscripción en una D2C</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Subir el CAC objetivo asumiendo el LTV proyectado sin medir incrementalidad. Si la incrementalidad real es del 50% y se asume 100%, el CAC permitido fijado destruye margen.",
        "Calcular churn instantáneo (clientes activos hoy / clientes activos hace 30 días) en lugar de churn por cohorte. El cálculo instantáneo mezcla cohortes y subestima el churn de las primeras cohortes (las más leales).",
        "Descuento permanente del -20% en producto con margen bruto del 45%. Comprime margen contribución cerca del umbral viable y atrae clientes price-sensitive con churn alto.",
        "No ofrecer skip/pause como alternativa a cancelar. Cuentas que solo ofrecen 'cancelar' tienen churn 2-4 puntos superior a cuentas que ofrecen pausar 1-3 meses.",
        "Fricción operativa para cancelar (formulario largo, llamar a soporte). Genera churn de marca y reseñas negativas que destruyen LTV de futuras cohortes. En España legalmente debe ser tan fácil cancelar como suscribirse.",
        "No segmentar audiencias de Meta entre suscriptores y one-time. Mostrar el mismo creative a quien ya está suscrito quema spend en retargeting innecesario.",
        "Asumir que el AOV de la suscripción es el AOV total del cliente. Muchos suscriptores compran productos one-time en paralelo: el AOV efectivo combinado puede ser un 15-30% superior al precio de suscripción.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Onboarding con suscripción arranca con auditoría de fit: Pablo audita ciclo natural de recompra del producto y AOV mediano por cohorte; Jorge cruza Shopify + pasarela + 3PL para calcular margen contribución real por SKU y proyectar churn esperado por sector. Sin ese análisis previo, lanzar suscripción es decidir a ciegas el descuento y el CAC objetivo.",
        "Cálculo del nuevo CAC objetivo: derivamos LTV-12m con fórmula de churn por cohorte, aplicamos ratio LTV/CAC ajustado a la fase de la cuenta (2,0-3,0:1) y ajustamos por tasa de adopción real para fijar CAC blended objetivo. El CAC objetivo se revisa trimestral con datos de cohortes reales, no con la proyección inicial.",
        "Implementación técnica: Jorge integra Shopify Subscriptions o Recharge según volumen, conecta tracking server-side compartido para que Meta CAPI reciba el evento 'subscription_started' con LTV proyectado como custom data y agrupa audiencias en Meta entre suscriptores y one-time para evitar quemar spend en retargeting innecesario.",
        "Solución ad-hoc Pablo + Jorge: una cuenta de cosmética con margen bruto 58% pidió subir adopción sin tocar el -15%. Pablo diseñó una landing post-purchase con bundle 'rutina completa' que solo era suscribible (no one-time) y Jorge montó la integración entre Recharge y Klaviyo con un flow específico de retención por cohorte de antigüedad. Resultado en 90 días: adopción del 22% al 38%, churn estable en 9%, CAC blended -18%.",
        "Reporting mensual con churn por cohorte, LTV-12m proyectado, payback period real, ratio LTV/CAC observado, tasa de adopción y % devoluciones por cohorte. Decisiones de descuento, payback y spend tomadas sobre cuadro completo, no sobre adopción aislada.",
        "Caso real reciente: cuenta D2C suplementos en España llegó con AOV 45€, sin suscripción, CAC blended 32€, payback period 6 meses. Implementamos suscripción mensual con -15%, ajustamos creatividades Meta para destacar suscripción en post-purchase y dashboard de seguimiento. En 6 meses: adopción 28%, churn mensual 7%, LTV-12m 285€, CAC blended objetivo se subió a 42€ permitiendo escalar spend +60% manteniendo ratio LTV/CAC 2,8:1.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo (founder · paid media) lidera diseño del modelo de suscripción y posicionamiento del descuento sobre el margen objetivo del cliente; Jorge (CTO · automation) lidera implementación técnica Recharge/Shopify Subscriptions, integración tracking server-side con Meta CAPI, dashboards de cohortes en Looker Studio y scripts de retención por cohorte de antigüedad. Donde otras agencias separan paid media y tech — el media buyer pide al cliente que contrate un developer aparte para integrar Recharge con Klaviyo —, en DayByDay Pablo y Jorge resuelven la suscripción completa en la misma reunión. Sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu D2C tiene fit para suscripción y no la has activado?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos ciclo de recompra, margen contribución por SKU y proyectamos LTV-12m con suscripción para fijar el nuevo CAC objetivo permitido. Entregamos plan de implementación priorizado por ROI a 90 días.</p>
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
          CAC vs LTV: la métrica que define si tu D2C es escalable →
        </Link>
        <p className="text-white/40 text-xs mt-1">Fórmula LTV-180d, ratio LTV/CAC saludable y payback period en D2C sin suscripción</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/margen-contribucion-vs-roas-ecommerce" className="text-white font-semibold hover:text-white/80">
          Margen de contribución vs ROAS en eCommerce D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué el margen contribución es la métrica que decide si tu CAC objetivo es viable</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/aumentar-aov-ecommerce-d2c-palancas" className="text-white font-semibold hover:text-white/80">
          Cómo subir el AOV en D2C: 7 palancas reales →
        </Link>
        <p className="text-white/40 text-xs mt-1">Suscripción como una de las 7 palancas con mayor ROI sobre AOV y margen</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cohort-analysis-ecommerce-d2c" className="text-white font-semibold hover:text-white/80">
          Cohort analysis para eCommerce D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo medir churn por cohorte y LTV acumulado en cuentas con suscripción</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default SuscripcionesEcommerceLtvCacD2cPage;
