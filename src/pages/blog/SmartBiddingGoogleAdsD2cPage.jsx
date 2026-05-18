import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es Smart Bidding en Google Ads y por qué es distinto a las pujas manuales?",
    a: "Smart Bidding es el conjunto de estrategias de puja automatizadas de Google Ads (Maximize Conversions, Maximize Conversion Value, Target CPA, Target ROAS, Enhanced CPC) que usan machine learning para fijar una puja distinta en cada subasta según señales contextuales en tiempo real (dispositivo, ubicación, hora del día, query exacta, audiencia, historial del usuario, contexto de navegación). A diferencia de las pujas manuales, el media buyer no fija un CPC fijo: define un objetivo (CPA, ROAS o maximizar conversiones dentro del presupuesto) y Google optimiza. En D2C eCommerce 2026, Smart Bidding es obligatorio en Performance Max y Demand Gen, y recomendado en Search/Shopping cuando hay ≥30 conversiones/mes por campaña y tracking server-side limpio (Enhanced Conversions o GA4 con Consent Mode v2)."
  },
  {
    q: "¿Cuándo conviene Target ROAS vs Target CPA vs Maximize Conversion Value en D2C?",
    a: "Target ROAS funciona en cuentas D2C con ticket variable amplio (joyería 80-450€, electrodomésticos 120-800€, tecnología 50-1.200€) y ≥50 conversiones/mes por campaña — fija un retorno objetivo y Google reparte spend hacia productos/audiencias que cumplen ese ratio. Target CPA funciona en cuentas con ticket homogéneo (suplementos 45-75€, mascotas 35-70€, cosmética 40-90€) donde la métrica de negocio es coste por cliente nuevo, no ingresos brutos. Maximize Conversion Value (sin tROAS) conviene en fases de escala agresiva o lanzamientos donde quieres que Google reparta presupuesto sin restricción de ratio durante 4-6 semanas para alimentar al algoritmo. Regla DayByDay: empezar siempre con Maximize Conversion Value 4-6 semanas, después migrar a tROAS con valor 15-25% por debajo del histórico para que Google encuentre espacio de optimización."
  },
  {
    q: "¿Cuánto tarda Smart Bidding en estabilizarse y cuándo intervenir manualmente?",
    a: "El periodo de aprendizaje (learning phase) oficial es 7-14 días tras crear la campaña o tras un cambio mayor (presupuesto ±20%, tROAS/tCPA ±15%, expansión geográfica, cambio de estructura). En cuentas D2C reales 2026 el algoritmo se estabiliza entre 14-21 días si hay ≥30 conversiones/semana; por debajo de ese volumen el aprendizaje no completa y conviene consolidar ad groups o subir presupuesto temporalmente. Intervenciones manuales recomendadas: ajustar tROAS/tCPA solo cada 7-10 días en saltos de máximo ±15%, no tocar presupuesto durante learning salvo emergencia, usar exclusiones de keywords/audiencias antes de bajar puja. Anti-patrón frecuente: bajar tROAS 30% en 24h porque un día CPA subió — Google reinicia aprendizaje y CPA empeora otros 14 días."
  },
  {
    q: "¿Smart Bidding funciona sin Enhanced Conversions o tracking server-side?",
    a: "Funciona pero pierde 20-40% de eficiencia. Smart Bidding depende totalmente de la calidad de la señal de conversión que recibe Google: si el píxel pierde eventos por iOS 17/18 Link Tracking Protection, Consent Mode v2 denied o cookies bloqueadas, el algoritmo optimiza con datos parciales y el CPA real diverge del CPA reportado. En cuentas D2C España 2026 con ≥40% tráfico iOS, activar Enhanced Conversions (envío de email/teléfono hasheado al servidor de Google) sube el match rate del 50-65% al 80-90% y baja el CPA real 12-22%. La ruta recomendada en Shopify es Enhanced Conversions for Web + tracking server-side vía GA4 + Google Tag Manager server-side (sGTM), con Consent Mode v2 configurado para modelar conversiones de usuarios que rechazan cookies."
  },
  {
    q: "¿Qué errores frecuentes ve DayByDay en cuentas D2C con Smart Bidding mal configurado?",
    a: "Los 6 errores más frecuentes en auditorías Google Ads 2025-2026: (1) Activar tROAS sin histórico de conversiones suficiente (<30/mes) — el algoritmo no tiene señal y limita spend al 30-50% del presupuesto. (2) Mezclar conversiones de diferente valor en la misma cuenta sin diferenciación (lead form + purchase + add-to-cart como 'conversiones primarias') — Smart Bidding optimiza hacia la conversión más fácil de conseguir, no hacia el revenue. (3) tROAS fijado al ROAS histórico exacto sin colchón — Google no encuentra subasta donde competir y el spend cae. (4) Cambios diarios de tROAS/tCPA — reset constante del learning phase, CPA real crece 20-35%. (5) Sin Enhanced Conversions ni GA4 con Consent Mode v2 — Smart Bidding optimiza ciego, pierde 20-40% eficiencia en iOS. (6) Performance Max con feed Merchant Center mal categorizado o sin product groups por margen — el algoritmo prioriza productos de bajo margen pero alto CTR, baja el margen contribución blended 8-15 puntos en 90 días."
  },
  {
    q: "¿Qué presupuesto mínimo necesita una campaña Search/Shopping con Smart Bidding para funcionar?",
    a: "El umbral operativo para que Smart Bidding rinda en una campaña Search/Shopping D2C es presupuesto que permita ≥30 conversiones/mes a CPA esperado. Fórmula: presupuesto mínimo mensual ≥ CPA objetivo × 30. Ejemplos reales D2C España 2026: cuenta moda CPA 18€ → presupuesto mínimo 540€/mes para que tROAS estabilice; cuenta suplementos CPA 28€ → 840€/mes; cuenta electrodomésticos CPA 65€ → 1.950€/mes. Por debajo de ese umbral conviene Maximize Clicks o Manual CPC enhanced para alimentar al algoritmo, y migrar a Smart Bidding cuando el volumen de conversiones supere ese mínimo. Performance Max necesita el doble: presupuesto ≥ CPA × 50-60 para que cada canal interno (Search, Shopping, YouTube, Discovery) reciba aprendizaje suficiente."
  },
];

const SmartBiddingGoogleAdsD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Smart Bidding en Google Ads para D2C: cuándo confiar y cuándo intervenir (2026)"
    description="Guía operativa de Smart Bidding en Google Ads para eCommerce D2C España 2026: qué es y diferencias con pujas manuales, cuándo usar Target ROAS vs Target CPA vs Maximize Conversion Value vs Enhanced CPC por vertical D2C y volumen de conversiones, periodo de aprendizaje real 14-21 días, presupuesto mínimo CPA×30 para Search/Shopping y CPA×50-60 para Performance Max, papel de Enhanced Conversions y GA4 server-side con Consent Mode v2 (sube match rate 50-65%→80-90% y baja CPA real 12-22%), protocolo de intervención manual segura (cambios máximo ±15% cada 7-10 días, no tocar presupuesto en learning, exclusiones antes de bajar puja), tabla decisión por vertical D2C (moda, suplementos, cosmética, joyería, electrodomésticos, mascotas), 6 errores frecuentes en cuentas D2C españolas con Smart Bidding mal configurado y enfoque DayByDay Pablo+Jorge con pipeline n8n + Google Ads API + Shopify Admin + GA4 BigQuery + dashboard Looker Studio que cruza Smart Bidding × cohorte LTV90 × CAC adquisición específico por estrategia."
    slug="smart-bidding-google-ads-d2c"
    datePublished="2026-05-19"
    dateModified="2026-05-19"
    readingTime="10 min"
    category="Google Ads"
    keywords={[
      "smart bidding google ads ecommerce",
      "target roas google ads d2c",
      "target cpa google ads",
      "performance max smart bidding",
      "enhanced conversions google ads shopify",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Smart Bidding es la palanca de Google Ads que separa cuentas D2C que escalan de las que se atascan en 3-5K€/mes</strong> — bien configurada baja el CPA real 15-30% y libera horas de gestión manual; mal configurada le come al algoritmo el presupuesto en learning eterno y dispara el CPA blended 20-45%. La diferencia no está en qué estrategia eliges (Target ROAS, Target CPA, Maximize Conversion Value, Enhanced CPC) sino en si tu cuenta cumple los 3 prerrequisitos para que Smart Bidding funcione: volumen de conversiones suficiente, tracking server-side limpio con Enhanced Conversions y disciplina para no tocar tROAS/tCPA cada día. En auditorías DayByDay 2025-2026 sobre cuentas D2C España con 8-60K€/mes spend en Google Ads vemos que el 60-70% tiene Smart Bidding activado pero con uno de los 6 errores que explican esta guía. Recorremos cuándo usar cada estrategia, cómo intervenir sin romper el aprendizaje y qué presupuesto mínimo necesita cada formato.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es Smart Bidding (definición operativa)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Smart Bidding</strong> es el conjunto de estrategias de puja automatizadas de Google Ads que usan machine learning para fijar una puja distinta en cada subasta según señales contextuales en tiempo real: dispositivo, ubicación geográfica, hora del día, query exacta, lista de audiencia del usuario, historial de navegación, contexto de la búsqueda, sistema operativo, navegador y otras 50+ señales no expuestas. El media buyer no fija un CPC fijo: define un objetivo (CPA, ROAS o maximizar conversiones dentro del presupuesto) y Google optimiza cada puja. Las 5 estrategias Smart Bidding en uso D2C 2026 son Maximize Conversions, Maximize Conversion Value, Target CPA, Target ROAS y Enhanced CPC (este último en fase de retiro progresivo según <a href="https://support.google.com/google-ads/answer/2979071" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Google Ads Help</a>).
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según <a href="https://www.thinkwithgoogle.com/intl/en-emea/marketing-strategies/automation/smart-bidding-machine-learning-bid-optimisation/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Think with Google</a>, las cuentas que migran de pujas manuales a Smart Bidding mejoran conversiones con el mismo CPA un 20-35% promedio en 90 días — pero la mejora se concentra en cuentas con ≥30 conversiones/mes por campaña y tracking server-side completo. El <a href="https://www.statista.com/statistics/1414148/google-search-advertising-revenue-worldwide/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">informe Statista Google Search Advertising Revenue</a> indica que más del 80% del spend D2C global en Google Ads usa ya alguna estrategia Smart Bidding en 2025, frente al 45% en 2021. En auditorías DayByDay sobre cuentas D2C España, el 60-70% tiene Smart Bidding activado pero sólo el 35-40% cumple los 3 prerrequisitos (volumen, tracking, disciplina) que hacen que funcione realmente.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 5 estrategias Smart Bidding y cuándo usar cada una</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      No hay una estrategia universal. La elección depende del tipo de conversión que persigues, la variabilidad del ticket medio, el volumen de conversiones histórico y la fase de madurez de la cuenta. Esta tabla resume la decisión:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Estrategia</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Objetivo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Volumen mínimo conv/mes</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Cuándo usar en D2C</th>
          </tr>
        </thead>
        <tbody>
          {[
            { e: "Maximize Conversions", o: "Más conversiones dentro del presupuesto", v: "15-30", d: "Lanzamiento, validación nueva campaña, primeras 4-6 semanas para alimentar algoritmo" },
            { e: "Maximize Conversion Value", o: "Maximizar ingresos brutos sin restricción", v: "20-30", d: "Escala agresiva, productos con ticket variable, fase de capturar máximo spend rentable" },
            { e: "Target CPA (tCPA)", o: "Coste por conversión fijo", v: "30-50", d: "Ticket homogéneo (suplementos, mascotas, cosmética básica), métrica de negocio = CAC" },
            { e: "Target ROAS (tROAS)", o: "Retorno mínimo sobre spend", v: "50+", d: "Ticket variable amplio (joyería, electrodomésticos, tecnología), Performance Max maduro" },
            { e: "Enhanced CPC", o: "Ajuste manual + ML sobre CPC base", v: "<15", d: "Cuentas pequeñas en transición, en retiro progresivo Google 2025-2026" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.e}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.o}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.v}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.d}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Regla DayByDay para D2C 2026: empezar siempre con <strong className="text-white">Maximize Conversion Value sin tROAS</strong> 4-6 semanas para que Google encuentre patrones de optimización, después migrar a tROAS con un valor 15-25% por debajo del histórico para dejar espacio al algoritmo. Saltar directo a tROAS exigente en una cuenta nueva es el error #1 que vemos en auditorías — Google no encuentra subastas que cumplan el ratio y el spend cae al 30-40% del presupuesto en la primera semana.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Prerrequisito crítico: Enhanced Conversions y tracking server-side</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Smart Bidding funciona o falla según la calidad de la señal de conversión que recibe Google. En cuentas D2C España 2026 con ≥40% tráfico iOS, el píxel cliente-side pierde 20-40% de eventos por iOS 17/18 Link Tracking Protection, Consent Mode v2 denied o cookies bloqueadas en Safari. Sin Enhanced Conversions ni server-side tracking, el algoritmo optimiza con datos parciales y el CPA real diverge del CPA reportado.
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "Activar Enhanced Conversions for Web en Google Ads: envío de email/teléfono hasheado SHA256 al servidor de Google en el evento purchase de Shopify. Sube match rate del 50-65% al 80-90%.",
        "Implementar GA4 con Consent Mode v2 + modelado de conversiones para usuarios que rechazan cookies (recupera 15-25% de eventos perdidos según Google).",
        "Server-side tracking vía Google Tag Manager server-side (sGTM) en Cloud Run o Stape, especialmente si AOV >100€ y spend >15K€/mes Google Ads.",
        "Importar conversiones offline desde Shopify (devoluciones, segunda compra, LTV60) cada 24-48h vía Google Ads API o Customer Match para que Smart Bidding optimice hacia LTV, no solo first purchase.",
        "Marcar Purchase como única conversión primaria de campaña; lead_form, add_to_cart, view_item como secundarias (informan al algoritmo pero no entran en el objetivo de optimización).",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/70 leading-relaxed mb-5">
      El detalle técnico de Enhanced Conversions + GA4 + sGTM lo cubrimos en la <Link to="/blog/server-side-tracking-shopify-conversions-api" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía server-side tracking Shopify</Link> y en la <Link to="/blog/ga4-meta-ads-eventos-custom-d2c" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">implementación GA4 + Meta Ads para D2C</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Protocolo de intervención manual: cuándo tocar y cuándo no</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El error más caro con Smart Bidding no es elegir mal la estrategia: es intervenir demasiado. Cada cambio en tROAS/tCPA, presupuesto o estructura resetea total o parcialmente el aprendizaje. Estas son las 5 reglas operativas que aplicamos en cuentas D2C DayByDay:
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Cambios de tROAS/tCPA: máximo ±15% cada 7-10 días. Cambios más grandes o más frecuentes resetean el learning phase (7-14 días) y el CPA real sube 20-35% durante ese periodo.",
        "Cambios de presupuesto: máximo ±20% por semana, nunca durante learning phase (primeros 7-14 días tras crear campaña o cambio mayor). Subidas mayores generan over-pacing y el algoritmo gasta a CPA inflado las primeras 48h.",
        "Antes de bajar la puja: exclusiones primero. Exclusiones de keywords negativas, audiencias de baja calidad, ubicaciones con CPA alto, dispositivos con CR bajo. Bajar tROAS sin haber depurado señal es romper el algoritmo sin diagnóstico.",
        "Una intervención por semana, no por día. Lunes revisión + decisión, viernes lectura de impacto. Cambiar tROAS martes y jueves porque un día subió el CPA es anti-patrón #1 — el algoritmo necesita 5-7 días para asimilar cada cambio.",
        "Cambios estructurales (separar ad group, cambiar tipo de campaña, migrar Search a Performance Max) sólo cuando hay diagnóstico claro de por qué el actual no funciona, no por sensación. Cada cambio estructural reinicia learning de cero.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Performance Max y Smart Bidding: caso especial</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Performance Max (PMax) es 100% Smart Bidding obligatorio — sólo permite Maximize Conversions, Maximize Conversion Value o Target ROAS. El algoritmo reparte spend entre Search, Shopping, YouTube, Discovery, Display y Gmail sin que el media buyer pueda fijar split por canal. Eso amplifica los beneficios y los riesgos de Smart Bidding: si el tracking falla, PMax canibaliza brand search y se imputa conversiones que ya ibas a tener.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Recomendación operativa: activar PMax sólo con ≥30 conversiones/mes en Shopping/Search standalone, presupuesto ≥ CPA × 50-60, feed Merchant Center limpio con product groups por margen, brand search standalone protegido (no migrar brand a PMax) y monitorización vía channel-level reporting + holdout geo test cada 60-90 días. Cubrimos los criterios completos en la <Link to="/blog/performance-max-ecommerce-d2c-cuando-usar" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía Performance Max para D2C</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">6 errores frecuentes en cuentas D2C españolas con Smart Bidding</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Activar tROAS sin histórico de conversiones suficiente (<30/mes): el algoritmo no tiene señal y limita spend al 30-50% del presupuesto. Solución: empezar con Maximize Conversion Value 4-6 semanas y migrar a tROAS sólo cuando volumen lo soporta.",
        "Mezclar conversiones de diferente valor como primarias (lead_form + add_to_cart + purchase): Smart Bidding optimiza hacia la más fácil (add_to_cart), no hacia revenue. Solución: sólo Purchase como conversión primaria, resto como secundarias (informan algoritmo pero no objetivo).",
        "tROAS fijado al ROAS histórico exacto sin colchón: Google no encuentra subasta donde competir y el spend cae 40-60%. Solución: tROAS 15-25% por debajo del histórico para que algoritmo encuentre espacio.",
        "Cambios diarios de tROAS/tCPA: reset constante del learning phase, CPA real crece 20-35%. Solución: máximo ±15% cada 7-10 días, una intervención por semana.",
        "Sin Enhanced Conversions ni GA4 con Consent Mode v2: Smart Bidding optimiza ciego, pierde 20-40% eficiencia en iOS. Solución: Enhanced Conversions for Web + sGTM + modelado Consent Mode v2 obligatorio antes de activar Smart Bidding.",
        "Performance Max con feed Merchant Center mal categorizado o sin product groups por margen: el algoritmo prioriza productos de bajo margen pero alto CTR, baja margen contribución blended 8-15 puntos en 90 días. Solución: product groups por margen + exclusión de productos no rentables + ROAS objetivo por product group.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría de tracking previa obligatoria (2-3h): Enhanced Conversions activo, match rate ≥80%, GA4 con Consent Mode v2 modelando, sGTM si spend >15K€/mes, conversiones primarias bien definidas. Sin esta base, cualquier Smart Bidding optimiza ciego.",
        "Diagnóstico de volumen de conversiones por campaña: si <30 conv/mes, consolidamos ad groups o subimos presupuesto temporal antes de migrar a tROAS. No activamos Smart Bidding restrictivo si la cuenta no lo soporta.",
        "Protocolo de migración escalonado: Maximize Conversion Value 4-6 semanas → tROAS 15-25% por debajo del histórico → ajustes ±15% cada 7-10 días. Documentamos cada cambio en log con fecha, magnitud y razón.",
        "Solución ad-hoc Pablo + Jorge: para una marca D2C de cosmética AOV 78€ con 22K€/mes spend Google Ads, Jorge construyó pipeline n8n + Google Ads API + Shopify Admin API + GA4 BigQuery que cada noche cruza conversiones Google × pedidos reales Shopify × cohorte LTV90 × margen contribución por product group, e importa conversiones offline (devoluciones, segunda compra a 60d) a Google Ads vía Customer Match. Pablo lidera la sesión semanal con el founder para reasignar tROAS por product group según margen real, no según ROAS plataforma. Resultado en 90 días: CPA blended Google bajó 19%, % spend en learning bajó del 24% al 6%, margen contribución blended subió 4 puntos por reasignación a productos high-margin y atribución cross-channel mejoró con offline conversions feed.",
        "Revisión semanal 20 min cada lunes con founder + Pablo: leemos CPA real vs CPA reportado, % spend en learning, tROAS efectivo vs objetivo, channel-level reporting de Performance Max y decidimos las 1-2 intervenciones de la semana (no más).",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo lidera la estrategia paid media en Meta + Google y la disciplina de intervención semanal sobre Smart Bidding; Jorge construye el pipeline técnico (Enhanced Conversions + sGTM + GA4 BigQuery + Google Ads API + offline conversions feed) que hace que el algoritmo de Google reciba señal limpia y optimice hacia LTV, no hacia first purchase. Donde otras agencias activan Smart Bidding sin auditar el tracking previo — y luego echan la culpa al algoritmo cuando el CPA blended sube —, en DayByDay Pablo y Jorge montan la base de señal antes de tocar una sola estrategia de puja. El cliente habla con los dos socios desde el primer día, sin account managers ni handoffs.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tu cuenta Google Ads tiene Smart Bidding activado pero el CPA blended sube?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría Smart Bidding gratuita 30 min: revisamos Enhanced Conversions, match rate, conversiones primarias, % spend en learning y configuración tROAS/tCPA. Entregamos plan operativo de 30-60 días para limpiar señal y migrar estrategia sin romper el aprendizaje.</p>
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
        <Link to="/blog/performance-max-ecommerce-d2c-cuando-usar" className="text-white font-semibold hover:text-white/80">
          Performance Max para D2C: cuándo activarla y cómo medir si funciona →
        </Link>
        <p className="text-white/40 text-xs mt-1">PMax es 100% Smart Bidding obligatorio. Cuándo activarla, channel-level reporting y protección de brand search.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/server-side-tracking-shopify-conversions-api" className="text-white font-semibold hover:text-white/80">
          Tracking server-side completo para Shopify con Conversions API →
        </Link>
        <p className="text-white/40 text-xs mt-1">La base técnica que hace que Enhanced Conversions y Smart Bidding optimicen sobre señal limpia.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/combinar-google-ads-meta-ads-d2c" className="text-white font-semibold hover:text-white/80">
          Cómo combinar Google Ads y Meta Ads en una estrategia D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Rol de Google (cosecha demanda) vs Meta (generación demanda), reparto por fase de madurez.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/ga4-meta-ads-eventos-custom-d2c" className="text-white font-semibold hover:text-white/80">
          GA4 + Meta Ads para D2C: implementación de eventos custom paso a paso →
        </Link>
        <p className="text-white/40 text-xs mt-1">GA4 con Consent Mode v2 alimenta tanto Meta CAPI como Enhanced Conversions Google.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/dashboard-paid-media-founder-d2c" className="text-white font-semibold hover:text-white/80">
          Dashboard de paid media: qué métricas debe ver un founder D2C cada lunes →
        </Link>
        <p className="text-white/40 text-xs mt-1">CPA real vs CPA reportado y % spend en learning como métricas obligatorias del dashboard.</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default SmartBiddingGoogleAdsD2cPage;
