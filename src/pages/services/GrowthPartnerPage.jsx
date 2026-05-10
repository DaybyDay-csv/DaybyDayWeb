import SEOHead from "../../components/SEOHead";
import FaqSection from "../../components/FaqSection";
import ServiceLayout, {
  ServiceHero,
  PainPoints,
  HowWeDoIt,
  ResultsBar,
  ServiceCTA,
} from "../../components/ServiceLayout";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Growth Partner para D2C — Socio de crecimiento, no agencia",
  "provider": {
    "@type": "Organization",
    "name": "DayByDay Consulting",
    "url": "https://www.daybydayconsulting.com",
  },
  "description":
    "Socio de crecimiento para D2C que ya facturan. Operamos con criterio sobre las decisiones reales del negocio: margen de contribución, payback de CAC, LTV por cohorte y cash-conversion. Paid media es solo una palanca.",
  "areaServed": "ES",
  "url": "https://www.daybydayconsulting.com/servicios/growth-partner",
};

const painItems = [
  {
    icon: "📉",
    title: "ROAS sube, caja no",
    desc: "La cuenta de Meta dice que vas bien pero la caja no acompaña. Falta lectura de margen de contribución, payback de CAC y mix de canales con su LTV real por cohorte.",
  },
  {
    icon: "🧭",
    title: "Decisiones de negocio sin operador",
    desc: "Subir precio, lanzar segundo producto, cerrar un canal, bajar inversión. Necesitas un socio que opere contigo, no un media buyer ejecutando una hoja de ruta de plataforma.",
  },
  {
    icon: "🪞",
    title: "Reportes que miran al canal, no al P&L",
    desc: "Dashboards llenos de métricas de plataforma. Cero conexión con margen real, working capital y cash-conversion. El crecimiento sostenible se mide en el P&L, no en Ads Manager.",
  },
];

const steps = [
  {
    title: "Diagnóstico de negocio, no de cuenta publicitaria",
    desc: "Lectura conjunta de margen de contribución por SKU, payback de CAC por canal, LTV por cohorte y cash-conversion-cycle. La cuenta publicitaria es un input más, no el sujeto del análisis.",
  },
  {
    title: "Decisiones-negocio con criterio cross-funcional",
    desc: "Pricing, mix de productos, canales activos, working capital, ritmo de inversión. Pablo aporta el criterio comercial; Jorge filtra viabilidad técnica y automatización. Una conversación, dos cabezas.",
  },
  {
    title: "Paid media como palanca dentro del sistema",
    desc: "Activamos paid media donde la economía unitaria lo justifica. Si el payback de CAC no cierra, el problema es el producto, el precio o el customer journey — no la creatividad. Paid es una palanca, nunca el producto.",
  },
  {
    title: "Reporte mensual de operador, no de plataforma",
    desc: "Cada mes recibes un informe con margen de contribución, payback CAC por cohorte, LTV 30/60/90 días, cash conversion y la decisión recomendada para los próximos 30 días. Sin jerga de plataforma.",
  },
];

const stats = [
  { value: "P&L", label: "lectura por contribución, no ROAS plataforma" },
  { value: "Cohortes", label: "LTV 30/60/90 días por canal" },
  { value: "Payback", label: "CAC con cash-conversion real" },
  { value: "2 socios", label: "operando, sin account managers" },
];

const faqItems = [
  {
    q: "¿En qué se diferencia un growth partner de una agencia de paid media?",
    a: "Una agencia de paid media ejecuta inversión en plataformas y reporta ROAS, CPA y CTR. Un growth partner opera contigo sobre las decisiones del negocio: margen de contribución, payback de CAC, LTV por cohorte, mix de canales y cash. El paid media es solo una palanca dentro del sistema, no el producto contratado.",
  },
  {
    q: "¿Por qué no medís el éxito por ROAS de plataforma?",
    a: "El ROAS de plataforma puede subir mientras la caja del negocio no mejora: descuentos que canibalizan margen, cohortes con LTV bajo, costes logísticos crecientes, mix de SKU con contribución pobre. Reportamos sobre margen de contribución, payback de CAC por cohorte y cash-conversion. Esos sí son indicadores que mueven el P&L de un D2C.",
  },
  {
    q: "¿Para qué tipo de D2C tiene sentido un growth partner?",
    a: "Para marcas D2C que ya facturan, han validado producto y necesitan decidir las próximas palancas: subir precio, lanzar un segundo producto, abrir o cerrar canales, decidir D2C puro vs marketplace, escalar paid media o consolidar antes de seguir invirtiendo. No es para validar producto desde cero.",
  },
  {
    q: "¿Cómo trabajáis las decisiones-negocio en el día a día?",
    a: "Operamos en cadencia mensual con dos socios senior (Pablo, paid y operaciones; Jorge, CTO y automation). Cada mes revisamos margen, payback, LTV, cash y proponemos la decisión-negocio recomendada (pricing, mix, canales, ritmo de inversión, automatización). El cliente nunca habla con account managers ni perfiles junior.",
  },
  {
    q: "¿Qué se automatiza y qué requiere criterio humano en growth?",
    a: "Activación, optimización de pujas, creatividades base, atribución y reporting se automatizan cada vez más. Lo que no se automatiza: decidir cuándo subir precio, cuándo lanzar producto adyacente, cuándo cerrar un canal con buen ROAS pero mal payback, cuándo consolidar en lugar de escalar. Ese juicio cross-funcional es el rol del growth partner en los próximos 24 meses.",
  },
  {
    q: "¿Sustituís a la agencia de paid media actual?",
    a: "Depende. Si la ejecución de paid funciona pero falta capa de decisión sobre el negocio, podemos operar como growth partner por encima del proveedor existente. Si además falta ejecución con criterio, asumimos también la palanca paid media. La conversación arranca por el P&L, no por el ad account.",
  },
];

const GrowthPartnerPage = ({ openCalendly }) => (
  <ServiceLayout openCalendly={openCalendly}>
    <SEOHead
      title="Growth Partner para D2C en España — Socio de crecimiento, no agencia"
      description="Socio de crecimiento para D2C que ya facturan. Operamos con criterio sobre margen de contribución, payback de CAC, LTV por cohorte y cash-conversion. Paid media es una palanca, no el producto."
      canonical="/servicios/growth-partner"
      schema={schema}
    />

    <ServiceHero
      badge="Growth Partner D2C"
      h1="Socio de crecimiento para D2C que ya facturan. Paid media es solo una palanca."
      subtitle="Operamos contigo sobre las decisiones que mueven el P&L: margen de contribución, payback de CAC, LTV por cohorte y cash-conversion. Sin account managers, sin reportes de plataforma."
      cta="Hablar con un socio"
      openCalendly={openCalendly}
    />

    <PainPoints
      title="Lo que un growth partner resuelve y una agencia paid media no toca"
      items={painItems}
    />

    <HowWeDoIt
      title="Cómo operamos como growth partner D2C"
      steps={steps}
    />

    <section className="bg-[#181414] py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-black text-center mb-8">
          Qué reportamos cada mes (y qué no)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1f1a1a] border border-white/8 rounded-2xl p-6">
            <div className="text-white/40 text-[10px] uppercase tracking-wider mb-3">
              Sí reportamos
            </div>
            <ul className="space-y-2 text-sm text-white/85">
              <li>· Margen de contribución por SKU y por canal</li>
              <li>· Payback de CAC por cohorte y por fuente</li>
              <li>· LTV 30/60/90 días por cohorte de adquisición</li>
              <li>· Cash-conversion-cycle del negocio</li>
              <li>· Decisión-negocio recomendada para los próximos 30 días</li>
            </ul>
          </div>
          <div className="bg-[#1f1a1a] border border-white/8 rounded-2xl p-6">
            <div className="text-white/40 text-[10px] uppercase tracking-wider mb-3">
              No reportamos como métrica final
            </div>
            <ul className="space-y-2 text-sm text-white/85">
              <li>· ROAS de plataforma como indicador de éxito</li>
              <li>· CTR, CPC o CPM aislados del payback real</li>
              <li>· Vanity metrics de Ads Manager o GA4</li>
              <li>· Comparativas de creatividad sin lectura de margen</li>
              <li>· Optimizaciones que suben ROAS y bajan caja</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <ResultsBar stats={stats} />

    <FaqSection faqs={faqItems} />

    <ServiceCTA
      headline="¿Tu D2C necesita un socio que opere el crecimiento, no una agencia que ejecute medios?"
      sub="Reserva una llamada de 30 minutos con Pablo y Jorge. Revisamos margen, payback, LTV y cash, y te decimos qué decisión-negocio mueve más caja en los próximos 90 días."
      openCalendly={openCalendly}
    />
  </ServiceLayout>
);

export default GrowthPartnerPage;
