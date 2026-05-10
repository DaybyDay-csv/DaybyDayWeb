import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es el AOV en eCommerce y por qué es la palanca más rentable para escalar un D2C?",
    a: "El AOV (Average Order Value, o ticket medio) es el ingreso medio por pedido completado: revenue total dividido entre número de pedidos del periodo. Importa más que casi cualquier otra métrica porque cada euro extra de AOV cae directamente sobre el margen de contribución sin requerir más inversión en adquisición. Subir el AOV un 15% en una cuenta D2C con AOV 55€ y CAC 22€ pasa el margen de contribución por pedido del 24% al 32% sin cambiar el CPM ni el CTR. En 2026, con el CPM de Meta subiendo año a año entre el 15% y el 25% en España, las cuentas D2C que escalan sin reventar la caja son casi siempre las que han trabajado AOV antes que ROAS."
  },
  {
    q: "¿Cuál es un AOV saludable para un eCommerce D2C en España y cómo se compara por sector?",
    a: "Rangos observados en cuentas D2C españolas rentables a 12-24 meses (datos propios + benchmark sectorial): moda 45-75€ (top decile 90-130€ por bundle), belleza/cosmética 35-65€ (top 80-120€ con sets), suplementos 40-70€ (top 90-150€ con suscripción), hogar/decoración 60-150€ (top 200-350€), mascotas 35-65€ (top 80-120€ con suscripción), alimentación premium 30-55€ (top 70-110€ con bundles), tecnología/gadgets 80-200€ (top 350-700€). Si tu AOV está por debajo del rango típico de tu sector, el problema rara vez es el creative o la audiencia — es el catálogo, el bundling o la falta de cross-sell estructurado. Subir el AOV antes que escalar spend es casi siempre la palanca con mejor ROI a 90 días."
  },
  {
    q: "¿Qué palanca para subir el AOV tiene mayor impacto en un D2C español típico?",
    a: "Por orden de impacto medio observado en cuentas D2C España: (1) bundles y packs estructurados (+18-35% AOV, mayor ROI), (2) free shipping threshold dinámico al 110-115% del AOV actual (+8-15% AOV), (3) cross-sell automatizado en checkout con producto complementario y descuento (+10-20% AOV), (4) tier de descuento por volumen (-10% sobre 2 unidades, -15% sobre 3) (+12-22% AOV en consumibles), (5) upsell post-purchase one-click (+5-12% AOV con conversion 8-18%), (6) suscripción con descuento permanente (+15-30% LTV, eleva AOV efectivo 12-meses), (7) edición limitada/exclusiva con AOV mayor (+20-40% sobre AOV base, ventana corta). El orden cambia por sector: en suplementos la suscripción manda; en moda los bundles+free shipping; en belleza los sets+upsell post-purchase; en hogar el cross-sell complementario."
  },
  {
    q: "¿Cómo se calcula el free shipping threshold óptimo para subir el AOV sin sacrificar conversión?",
    a: "Fórmula que aplicamos en DayByDay: threshold óptimo = AOV mediano actual × 1,10-1,15. No usar la media — usar la mediana, porque la media está sesgada por outliers de pedidos grandes y suele indicar un threshold demasiado alto. Ejemplo: marca de belleza con AOV mediano 38€ → threshold óptimo 42-44€. El usuario percibe el envío gratis como alcanzable (un solo producto extra de 4-7€) y el % de pedidos que cruzan el threshold sube del 22% al 41-48% en 30-60 días. Si pones el threshold a 60€ con AOV mediano 38€, la mayoría no llegará y bajará la conversion rate global. Cada trimestre recalcular: cuando el AOV mediano sube por efecto del threshold, subir el threshold también para mantener la presión. Estudio Shopify Plus: el 64% de compradores online añade productos al carrito específicamente para alcanzar el envío gratis."
  },
  {
    q: "¿Qué es un upsell post-purchase y cuánto puede subir el AOV de un eCommerce D2C?",
    a: "El upsell post-purchase one-click es una oferta que aparece tras la compra (en la página de gracias o por email inmediato) con compra a un solo clic sin volver a meter datos de pago. Apps típicas Shopify: ReConvert, AfterSell, Zipify OCU. Cuando la oferta es relevante (producto complementario o upgrade a tamaño superior con descuento del 10-20%), las tasas de conversión observadas en cuentas D2C son del 8-18%, con un AOV incremental del 5-12% sobre el AOV base. Es la palanca de mayor impacto inmediato sin riesgo: no toca el funnel de adquisición, no afecta la conversion rate del checkout original, y el ticket extra cae sobre margen sin coste de adquisición adicional. Crítico que la oferta sea contextual al producto comprado (ej: tras comprar serum facial, ofrecer crema hidratante con -15%) — ofertas genéricas convierten mucho menos."
  },
  {
    q: "¿Cuándo NO conviene subir el AOV agresivamente en un D2C?",
    a: "En 3 escenarios concretos: (1) cuando el producto core tiene un precio psicológico anclado (ej: una vela aromática de 19€ — empujar el AOV a 45€ con bundle puede romper la propuesta de valor y bajar la conversion rate global más de lo que sube el AOV). (2) Cuando la cuenta opera con un volumen de conversiones bajo (<30/día en Meta) y los algoritmos aún están en fase de aprendizaje — primero estabilizar volumen, luego optimizar AOV. (3) Cuando el producto tiene devoluciones altas (moda 25-30%) y subir AOV con bundle multiplica la pérdida por devolución parcial — el cliente devuelve 1 de los 3 productos del bundle pero pierde el descuento, generando fricción y reembolsos manuales. La regla: subir AOV solo cuando el margen de contribución por pedido lo soporta, las devoluciones están bajo control (<20%) y el algoritmo ya tiene volumen de datos para optimizar."
  },
  {
    q: "¿Cómo se mide si una palanca de AOV está funcionando realmente y no canibalizando conversión?",
    a: "Las 3 métricas que vigilamos en DayByDay tras lanzar cualquier palanca de AOV: (1) AOV total (€) y AOV mediano (€), separadamente — la mediana detecta si la subida es real y distribuida o si está impulsada por unos pocos pedidos grandes. (2) Conversion rate global del checkout pre/post — si el AOV sube 15% pero la CR baja 25%, el revenue total cae. Hay que comparar ventana 30 días vs 30 días con tráfico equivalente. (3) Margen de contribución por pedido — el AOV puede subir mientras el margen baja por descuentos agresivos en bundle o cross-sell con producto de bajo margen. Test obligatorio: A/B test con 50% de tráfico viendo la palanca y 50% no, mínimo 14 días o 1.500 pedidos por variante. Sin holdout no se puede separar el efecto de la palanca del de estacionalidad o creative testing paralelo. Las cuentas que cambian 5 cosas a la vez no saben qué funcionó."
  }
];

const AumentarAovEcommerceD2cPalancasPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Cómo subir el AOV en D2C: 7 palancas reales para ecommerce"
    description="Guía operativa para aumentar el AOV (ticket medio) en un eCommerce D2C en España: definición y cálculo, AOV saludable por sector D2C 2026, las 7 palancas con mayor ROI ordenadas por impacto (bundles, free shipping threshold, cross-sell, tier descuento, upsell post-purchase, suscripción, edición limitada), cómo medir si funcionan sin canibalizar conversión, errores frecuentes y enfoque DayByDay (Pablo + Jorge)."
    slug="aumentar-aov-ecommerce-d2c-palancas"
    datePublished="2026-05-10"
    dateModified="2026-05-10"
    readingTime="11 min"
    category="Unit Economics"
    keywords={[
      "aumentar aov ecommerce",
      "subir ticket medio ecommerce d2c",
      "palancas aov d2c",
      "free shipping threshold óptimo",
      "upsell post-purchase shopify",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Subir el AOV es la palanca con mejor ROI para escalar un eCommerce D2C en España en 2026</strong>. Cada euro extra de ticket medio cae directamente sobre el margen de contribución sin requerir más inversión en adquisición — y con el CPM de Meta subiendo año a año entre el 15% y el 25%, las cuentas D2C que aguantan rentabilidad son casi siempre las que han trabajado AOV antes que ROAS. En esta guía repasamos cómo se calcula, qué AOV es saludable por sector D2C español, las 7 palancas con mayor impacto medido en cuentas reales y cómo evitar el error clásico de subir AOV mientras se canibaliza la conversion rate.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es el AOV y cómo se calcula correctamente</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">El AOV (Average Order Value)</strong> es el ingreso medio por pedido completado en un periodo concreto: revenue total dividido entre número de pedidos. La fórmula operativa que usamos en DayByDay separa siempre AOV bruto y AOV neto:
    </p>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-mono text-sm leading-relaxed">
        AOV bruto (€) = Revenue total / Pedidos completados
      </p>
      <p className="text-white/50 text-xs mt-3 leading-relaxed">
        AOV neto (€) = (Revenue total − Descuentos − Devoluciones esperadas) / Pedidos completados
      </p>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La diferencia importa: en cuentas D2C de moda con 25-30% de devolución y descuentos checkout del 8-15%, el AOV bruto que reporta Shopify suele estar 18-25% por encima del AOV neto real. Para decisiones de spend y de free shipping threshold trabajamos siempre sobre AOV neto. Y para detectar si una palanca de AOV está sesgando los datos por pedidos grandes, comparamos también AOV mediano vs medio — la mediana es más robusta y refleja el comportamiento real del comprador típico.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      <a href="https://www.shopify.com/blog/average-order-value" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Según Shopify, el AOV es uno de los KPIs más subestimados en eCommerce D2C</a>: subir un 15% el AOV equivale a aumentar la rentabilidad de cada campaña de Meta o Google sin tocar el creative ni la audiencia.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según <a href="https://www.statista.com/topics/871/online-shopping/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Statista, el AOV medio en eCommerce europeo en 2026 subió solo un 6% interanual</a>, mientras el coste medio de adquisición (CAC) subió un 22%. La consecuencia operativa: cualquier marca D2C que escale spend sin trabajar palancas de AOV en paralelo está comprimiendo el margen de contribución cada trimestre sin darse cuenta.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">AOV saludable por sector D2C en España 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Rangos observados en cuentas D2C españolas con unit economics positivos a 12-24 meses (datos propios + benchmark sectorial). Top decile = el 10% superior de cada sector:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Sector D2C</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">AOV típico</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Top decile</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Palanca más efectiva</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: "Moda", t: "45-75€", e: "90-130€", p: "Bundles + free shipping threshold" },
            { s: "Belleza / cosmética", t: "35-65€", e: "80-120€", p: "Sets + upsell post-purchase" },
            { s: "Suplementos / nutrición", t: "40-70€", e: "90-150€", p: "Suscripción + tier descuento" },
            { s: "Hogar / decoración", t: "60-150€", e: "200-350€", p: "Cross-sell complementario" },
            { s: "Mascotas", t: "35-65€", e: "80-120€", p: "Suscripción + bundle multi-producto" },
            { s: "Alimentación premium", t: "30-55€", e: "70-110€", p: "Bundles + free shipping" },
            { s: "Tecnología / gadgets", t: "80-200€", e: "350-700€", p: "Cross-sell accesorio + financiación" },
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
      Si tu AOV está por debajo del rango típico de tu sector, antes de tocar campañas conviene revisar catálogo, bundling y cross-sell. Para entender cómo el AOV impacta directamente sobre el indicador de rentabilidad real (margen de contribución), ver la <Link to="/blog/margen-contribucion-vs-roas-ecommerce" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía margen de contribución vs ROAS</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 7 palancas para subir el AOV ordenadas por impacto</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Bundles y packs estructurados (+18-35% AOV). Crear sets de 2-4 productos complementarios con un descuento del 10-15% sobre la suma individual. Funcionan mejor cuando se posicionan como solución a un problema concreto (ej: 'rutina antiedad noche' en cosmética, 'starter pack moda' en básicos). Apps Shopify típicas: Bundler, Bold Bundles, Frequently Bought Together. Crítico que el bundle tenga un nombre distinto a 'pack 2x1' — la narrativa importa para el ticket medio.",
        "Free shipping threshold dinámico (+8-15% AOV). Establecer un umbral de envío gratis al 110-115% del AOV mediano actual. Mostrar la barra de progreso en el carrito ('te quedan 4€ para envío gratis') y recalcular el threshold cada trimestre cuando el AOV mediano suba. La clave es la mediana, no la media — usar la media suele dar un threshold demasiado alto y reduce conversion.",
        "Cross-sell automatizado en checkout (+10-20% AOV). Mostrar 1-2 productos complementarios con descuento del 10-15% en la página de carrito o checkout. La oferta debe ser contextual al producto añadido, no un cross-sell genérico. Apps: Shopify nativo, ReConvert, Bold Upsell. En sectores con producto complementario claro (cosmética, mascotas, suplementos) el ROI es alto; en moda funciona peor por la dificultad de predecir gusto.",
        "Tier de descuento por volumen (+12-22% AOV en consumibles). Estructura típica: 1 unidad precio base, 2 unidades -10%, 3 unidades -15%, 4+ unidades -20%. Funciona muy bien en suplementos, cosmética, alimentación, mascotas (productos de consumo recurrente). En moda/tecnología funciona peor porque el comprador no necesita 3 unidades del mismo producto. Mostrar el ahorro absoluto en €, no solo el %.",
        "Upsell post-purchase one-click (+5-12% AOV). Oferta contextual tras la compra (página de gracias o email inmediato) con compra a un clic sin re-introducir datos. Apps: ReConvert, AfterSell, Zipify OCU. Conversión típica del 8-18% cuando la oferta es relevante. Es la palanca con mayor ROI inmediato porque no toca el funnel de adquisición ni la conversion rate del checkout original.",
        "Suscripción con descuento permanente (+15-30% LTV, eleva AOV efectivo 12 meses). Oferta -10% a -15% por suscripción mensual recurrente. Funciona perfectamente en suplementos (recompra natural cada 30-45d), café, mascotas, cosmética básica. App típica: Shopify Subscriptions, Recharge, Bold Subscriptions. La métrica relevante no es el AOV de pedido individual sino el AOV efectivo a 12 meses (ticket medio × pedidos esperados).",
        "Edición limitada / colaboración exclusiva (+20-40% sobre AOV base, ventana corta). Drop de producto con stock limitado y AOV superior (premium materials, packaging especial, colaboración con creator). Crea urgencia natural y atrae al segmento de mayor LTV. Aplicable 4-8 veces al año, no como estrategia continua. Funciona muy bien en moda, belleza nicho, hogar diseño.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>
    <p className="text-white/70 leading-relaxed mb-5">
      El orden cambia por sector. En suplementos la suscripción manda; en moda los bundles + free shipping; en belleza los sets + upsell post-purchase; en hogar el cross-sell complementario. La palanca correcta depende del unit economics actual y del comportamiento de compra del comprador típico.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo calcular el free shipping threshold óptimo</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La fórmula que aplicamos en cuentas D2C nuevas:
    </p>
    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-mono text-sm leading-relaxed">
        Threshold óptimo (€) = AOV mediano actual × 1,10-1,15
      </p>
      <p className="text-white/50 text-xs mt-3 leading-relaxed">
        Recalcular cada trimestre. Cuando el AOV mediano sube por efecto del threshold, subir el threshold también.
      </p>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      <a href="https://www.shopify.com/blog/free-shipping" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Según Shopify Plus, el 64% de compradores online añade productos al carrito específicamente para alcanzar el envío gratis</a>. Ejemplo cuenta belleza España con AOV mediano 38€: threshold óptimo 42-44€. El comprador percibe el envío gratis como alcanzable con un solo producto extra de 4-7€, y el % de pedidos que cruzan el threshold sube del 22% al 41-48% en 30-60 días sin caída de conversion rate. Si el threshold se pone a 60€ con AOV mediano 38€, la mayoría no llegará y la conversion rate global cae.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo medir si una palanca de AOV está funcionando</h2>
    <div className="space-y-3 mb-6">
      {[
        "Comparar siempre AOV bruto y AOV mediano antes/después. La media se distorsiona con outliers de pedidos grandes y puede ocultar que la palanca solo funciona para una minoría. La mediana refleja el comportamiento del comprador típico.",
        "Vigilar la conversion rate global del checkout pre/post. Si el AOV sube un 15% pero la CR cae un 25%, el revenue total baja y la palanca destruye valor. Comparar ventanas de 30 días vs 30 días con volumen y mix de tráfico equivalente.",
        "Calcular el margen de contribución por pedido pre/post. Una palanca de bundle con descuento del 25% puede subir AOV pero comprimir margen — el ticket sube pero la rentabilidad por pedido baja. Cruzar AOV con margen siempre.",
        "A/B test obligatorio: 50% del tráfico ve la palanca, 50% no, mínimo 14 días o 1.500 pedidos por variante. Sin holdout no se puede separar el efecto de la palanca del de estacionalidad o creative testing en paralelo. Las cuentas que cambian 5 cosas a la vez no saben qué funcionó.",
        "Vigilar % devoluciones post-palanca. Bundles agresivos pueden disparar devoluciones parciales en moda (cliente devuelve 1 de 3 productos del pack) y romper la economía de pedido. Cruzar AOV con tasa devolución por SKU del bundle.",
        "Reporting semanal con AOV bruto, AOV mediano, CR global, margen contribución y % devoluciones — no solo AOV en aislado. La decisión de mantener o retirar una palanca se toma sobre el cuadro completo, no sobre una sola métrica.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Errores frecuentes al trabajar palancas de AOV</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Lanzar 5 palancas a la vez sin holdout. Es imposible saber cuál funcionó y cuál canibalizó conversion. Lanzar de una en una con A/B test de 14-30 días.",
        "Usar AOV medio en lugar de mediano para calibrar el free shipping threshold. La media está sesgada por outliers — el threshold queda demasiado alto y la conversion rate cae.",
        "Bundles con descuento del 25-30%: suben AOV nominal pero comprimen margen de contribución. El descuento óptimo en bundle suele estar entre 8% y 15%.",
        "Cross-sell genérico no contextual al producto principal. Convierte 3-5x menos que un cross-sell relevante (ej: ofrecer ropa de hombre tras compra de cosmética femenina vs ofrecer crema hidratante tras compra de serum).",
        "Ignorar el impacto de devoluciones post-bundle en moda. El cliente devuelve 1 de 3 productos del pack, pierde el descuento y el equipo de soporte gestiona el reembolso parcial — fricción operativa que puede comerse el AOV ganado.",
        "Subir AOV agresivamente cuando la cuenta tiene <30 conversiones/día y el algoritmo aún está en fase de aprendizaje. Primero estabilizar volumen, luego optimizar AOV.",
        "No recalibrar el threshold de free shipping cada trimestre. Cuando el AOV mediano sube por efecto del threshold, mantenerlo en el viejo valor pierde toda su capacidad de presión.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Onboarding D2C arranca con auditoría de unit economics: Pablo audita AOV mediano vs medio por sector y mix de producto, Jorge cruza datos Shopify + pasarela + 3PL para validar coste real por pedido y devoluciones por SKU. Sin ese cálculo previo, decidir qué palanca activar es decidir a ciegas.",
        "Diseño ad-hoc del stack de palancas en función del sector y momento de la cuenta: en suplementos arrancamos por suscripción + tier descuento; en moda por bundles + free shipping; en belleza por sets + upsell post-purchase. No usamos plantilla — cada cuenta recibe combinación priorizada por impacto sobre margen, no sobre revenue.",
        "Implementación técnica: Jorge integra los apps Shopify (Bundler, ReConvert, Recharge según caso) con tracking server-side compartido para que cada palanca de AOV tenga atribución limpia en Meta CAPI y GA4. Sin tracking limpio, el A/B test del bundle queda contaminado por discrepancias de atribución.",
        "Solución ad-hoc Pablo + Jorge: cuando una marca de moda necesitaba subir AOV sin reventar devoluciones, Pablo diseñó un bundle 'estilismo completo' con sizing guide reforzada y Jorge montó un script Node que detectaba combinaciones bundle con tasa devolución >35% y las desactivaba automáticamente del catálogo. Resultado en 90 días: AOV +28%, devoluciones -6 puntos.",
        "Reporting semanal con AOV bruto, AOV mediano, CR global, margen contribución por pedido y % devoluciones por palanca activa. Decisiones de mantener/retirar palanca tomadas sobre cuadro completo, no sobre AOV aislado.",
        "Caso real reciente: cuenta D2C suplementos llegó con AOV 42€ y CAC 28€ (margen contribución 14%). En 90 días subimos AOV a 58€ con suscripción + bundle + tier descuento, manteniendo CAC y CR estables. Margen contribución pasó del 14% al 27% sin tocar el spend de Meta.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo (founder · paid media) lidera estrategia de spend, mix de palancas y posicionamiento del catálogo en función del margen objetivo del cliente; Jorge (CTO · automation) lidera implementación técnica de bundles, suscripciones, upsell post-purchase, scripts de control de devoluciones y dashboards automatizados. Donde otras agencias separan marketing y tecnología — el media buyer pide al cliente que contrate un developer aparte para integrar Bundler con Recharge —, en DayByDay Pablo y Jorge resuelven la palanca completa en la misma reunión. Sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu AOV está por debajo del rango de tu sector?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos tu AOV mediano vs medio por sector, identificamos las 2-3 palancas con mayor impacto sobre tu margen de contribución y entregamos plan de implementación priorizado por ROI a 90 días.</p>
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
        <Link to="/blog/margen-contribucion-vs-roas-ecommerce" className="text-white font-semibold hover:text-white/80">
          Margen de contribución vs ROAS en eCommerce D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué el AOV es la palanca que más impacta sobre el margen de contribución por pedido</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cac-vs-ltv-ecommerce-escalable" className="text-white font-semibold hover:text-white/80">
          CAC vs LTV en eCommerce escalable →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo derivar el CAC objetivo desde el AOV, el margen y el ratio LTV/CAC</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cuanto-invertir-meta-ads-calculadora" className="text-white font-semibold hover:text-white/80">
          Cuánto invertir en Meta Ads según ticket medio y margen →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo el AOV define el suelo mínimo de inversión y la distribución TOFU/MOFU/BOFU</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cro-landing-page-meta-ads-d2c" className="text-white font-semibold hover:text-white/80">
          CRO de landing page para Meta Ads →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo el bundle/upsell se integra en la landing sin romper la conversion rate</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default AumentarAovEcommerceD2cPalancasPage;
