import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Cuánto cobra una agencia de paid media en España en 2026?",
    a: "En España en 2026, los honorarios de una agencia de paid media se sitúan normalmente entre 800€ y 3.000€/mes en función del volumen de inversión gestionado, los canales cubiertos y el nivel de especialización. Lo más común es una combinación de tarifa fija mensual + un porcentaje sobre la inversión gestionada (entre el 10% y el 20%). A esto hay que sumar la inversión en medios, que va por separado directamente a las plataformas (Meta, Google).",
  },
  {
    q: "¿Cuál es la diferencia entre honorarios de agencia e inversión en medios?",
    a: "Son dos costes completamente distintos. Los honorarios de agencia son lo que le pagas a la agencia por gestionar tus campañas — el coste de su trabajo. La inversión en medios es el dinero que va directamente a las plataformas publicitarias (Meta Ads, Google Ads) para mostrar tus anuncios. Una agencia con honorarios de 1.000€/mes puede gestionar una inversión en medios de 5.000€/mes — el coste total sería 6.000€, pero 5.000€ van a las plataformas y 1.000€ a la agencia.",
  },
  {
    q: "¿Qué modelos de precios usan las agencias de paid media?",
    a: "Los modelos más frecuentes en España son: (1) Tarifa fija mensual — importe fijo independientemente de la inversión, más predecible para el cliente; (2) Porcentaje sobre inversión (10%-20%) — sube con el presupuesto, puede alinear o desalinear incentivos; (3) Modelo mixto: tarifa base + % sobre inversión por encima de un umbral; (4) Modelo basado en resultados: tarifa base reducida + % sobre ventas o leads generados — el más alineado con los intereses del cliente pero menos común por el riesgo que asume la agencia.",
  },
  {
    q: "¿Es mejor pagar un porcentaje sobre inversión o una tarifa fija?",
    a: "Depende de tu situación. El porcentaje sobre inversión es proporcional a tu escala — pagás más cuando invertís más, lo que puede ser justo si la carga de trabajo de la agencia sube con la inversión. Pero si el porcentaje es alto (\u003e15%), puede crear un incentivo perverso para que la agencia suba tu presupuesto aunque no sea necesario. La tarifa fija es más predecible y elimina ese incentivo, pero puede no ajustarse si tu inversión crece mucho. El modelo mixto (base fija + % sobre inversión adicional) es el más equilibrado para la mayoría de casos.",
  },
  {
    q: "¿Merece la pena el coste de una agencia de paid media vs gestionarlo yo mismo?",
    a: "La comparativa honesta: gestionarlo tú mismo tiene coste 0 en honorarios pero tiene un coste de tiempo (aprendizaje + gestión diaria) y un coste de oportunidad (resultados subóptimos mientras aprendes). Una agencia bien elegida debería generar un incremento de ROAS suficiente para cubrir sus honorarios y generar beneficio neto adicional. Si tu agencia cobra 1.500€/mes y tu inversión mensual es de 10.000€, debería generar al menos 2.000-3.000€ adicionales en ventas respecto a lo que conseguirías tú solo para justificar el coste.",
  },
];

const CuantoCuestaAgenciaPaidMediaPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Cuánto Cuesta una Agencia de Paid Media en España: Guía de Precios 2026"
    description="Guía completa de precios de agencias de paid media en España para 2026: modelos de honorarios, rangos por volumen de inversión, qué incluye cada modelo y cómo evaluar si merece la pena."
    slug="cuanto-cuesta-agencia-paid-media-espana-precios-2026"
    datePublished="2026-03-11"
    dateModified="2026-03-11"
    readingTime="7 min"
    category="Estrategia"
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-6">
      El coste de una agencia de paid media en España en 2026 tiene un rango amplio y pocas agencias son transparentes sobre sus precios en la web. Esta guía desglosa los modelos de precios más comunes, los rangos reales del mercado y cómo calcular si el coste se justifica según el retorno esperado.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-8">
      <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Importante distinguir</p>
            {link_para}
            
      <p className="text-white/70 text-sm leading-relaxed">
        <strong className="text-white">Honorarios de agencia</strong> (lo que le pagas a la agencia por su trabajo) y <strong className="text-white">inversión en medios</strong> (lo que va a Meta Ads, Google Ads) son dos costes separados. Este artículo habla de honorarios de agencia. La inversión en medios va por separado.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Rangos de precios reales en España 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Basándonos en el mercado español actual, estos son los rangos de honorarios que manejan las agencias de paid media según el volumen de inversión gestionado:
    </p>

    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 pr-4 text-white/40 font-semibold text-xs uppercase tracking-wide">Inversión mensual en medios</th>
            <th className="text-left py-3 pr-4 text-white/40 font-semibold text-xs uppercase tracking-wide">Honorarios típicos</th>
            <th className="text-left py-3 text-white/40 font-semibold text-xs uppercase tracking-wide">Modelo más frecuente</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["500€ – 2.000€/mes", "400€ – 800€/mes", "Tarifa fija baja o freelance"],
            ["2.000€ – 5.000€/mes", "700€ – 1.500€/mes", "Tarifa fija o mixto (fija + %)"],
            ["5.000€ – 15.000€/mes", "1.200€ – 2.500€/mes", "Mixto (fija + % sobre inversión)"],
            ["15.000€ – 50.000€/mes", "2.000€ – 5.000€/mes", "% sobre inversión (10%-15%)"],
            [">50.000€/mes", "A negociar (5%-10%)", "% sobre inversión o retainer alto"],
          ].map(([inv, hon, modelo]) => (
            <tr key={inv} className="border-b border-white/5">
              <td className="py-3 pr-4 font-medium text-white/80">{inv}</td>
              <td className="py-3 pr-4 text-[#de0015] font-semibold">{hon}</td>
              <td className="py-3 text-white/50">{modelo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/50 text-xs mb-8">
      * Rangos orientativos. Pueden variar según el número de canales, la complejidad de la cuenta y el nivel de especialización de la agencia.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Los 4 modelos de precio más comunes</h2>

    <div className="space-y-4 mb-8">
      {[
        {
          modelo: "1. Tarifa fija mensual",
          desc: "Un importe fijo independientemente de la inversión en medios. El cliente sabe exactamente lo que paga cada mes.",
          pros: "Predecible, transparente, sin incentivo para inflar la inversión",
          cons: "No se ajusta al trabajo real si la inversión varía mucho; la agencia puede priorizar cuentas más rentables",
          ejemplo: "1.200€/mes gestionando hasta 8.000€/mes en medios",
        },
        {
          modelo: "2. Porcentaje sobre inversión",
          desc: "La agencia cobra un porcentaje (normalmente 10%-20%) del total invertido en medios.",
          pros: "Se escala con tu crecimiento, la agencia asume trabajo proporcional a la inversión",
          cons: "Incentiva a la agencia a subir tu presupuesto aunque no sea necesario; coste puede ser alto con inversiones grandes",
          ejemplo: "15% sobre 10.000€/mes = 1.500€/mes de honorarios",
        },
        {
          modelo: "3. Modelo mixto (más equilibrado)",
          desc: "Tarifa base fija que cubre la gestión estándar + porcentaje sobre la inversión que supere un umbral.",
          pros: "Equilibra previsibilidad para el cliente y compensación justa para la agencia",
          cons: "Más complejo de gestionar y de entender a primera vista",
          ejemplo: "800€/mes base + 12% sobre inversión que supere los 5.000€/mes",
        },
        {
          modelo: "4. Basado en resultados",
          desc: "Tarifa base baja + comisión sobre ventas o leads generados directamente atribuibles a las campañas.",
          pros: "La alineación de incentivos es máxima — la agencia gana si tú ganas",
          cons: "La atribución es compleja en paid media (¿qué es 'directamente atribuible'?); raro en la práctica",
          ejemplo: "400€/mes + 3% sobre ventas atribuidas a Meta Ads",
        },
      ].map(({ modelo, desc, pros, cons, ejemplo }) => (
        <div key={modelo} className="bg-[#1a1616] border border-white/8 rounded-xl p-5">
          <h3 className="font-bold text-sm text-white mb-2">{modelo}</h3>
          <p className="text-white/60 text-sm leading-relaxed mb-3">{desc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-xs">
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-white/60">{pros}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#de0015]">✗</span>
              <span className="text-white/60">{cons}</span>
            </div>
          </div>
          <p className="text-white/30 text-xs border-t border-white/5 pt-2">Ejemplo: {ejemplo}</p>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo calcular si el coste de la agencia se justifica</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      La pregunta correcta no es "¿cuánto cuesta la agencia?" sino "¿cuánto genera la agencia adicional respecto a lo que conseguiría yo solo?". Un cálculo simple:
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-8">
      <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Ejemplo de cálculo ROI de la agencia</p>
      <div className="space-y-2 text-sm">
        {[
          ["Inversión en medios (Meta + Google)", "8.000€/mes"],
          ["Honorarios agencia", "1.200€/mes"],
          ["Coste total", "9.200€/mes"],
          ["ROAS gestionado por agencia (estimado)", "4,2x"],
          ["Ventas atribuidas", "33.600€/mes"],
          ["Ventas adicionales vs gestión propia (ROAS 3x)", "+9.600€/mes"],
          ["ROI de los honorarios de agencia", "+700% sobre honorarios"],
        ].map(([label, value], i) => (
          <div key={i} className={`flex justify-between items-center py-2 ${i < 6 ? "border-b border-white/5" : "border-t border-white/10 pt-3 mt-1"}`}>
            <span className={`text-white/60 ${i === 6 ? "font-bold text-white" : ""}`}>{label}</span>
            <span className={`font-semibold ${i === 6 ? "text-[#de0015] text-base" : "text-white/80"}`}>{value}</span>
          </div>
        ))}
      </div>
      <p className="text-white/30 text-xs mt-3">* Ejemplo ilustrativo. Los resultados reales varían según sector, producto y cuenta.</p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué debe incluir el servicio de una agencia de paid media</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Antes de contratar, verifica que los honorarios incluyen estos elementos (no son "extras"):
    </p>
    <ul className="space-y-2 mb-8">
      {[
        "Configuración y auditoría inicial de la cuenta (píxel, CAPI, audiencias, estructura)",
        "Gestión activa y optimización semanal de las campañas",
        "Testing sistemático de creatividades (no solo publicar anuncios — probar y rotar según rendimiento)",
        "Reporting mensual con datos reales de negocio (ventas en Shopify, no solo datos de plataforma)",
        "Acceso a un gestor de cuenta contactable directamente",
        "Estrategia y roadmap trimestral alineado con objetivos del negocio",
      ].map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
          <span className="text-white/70 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay y qué incluye nuestro servicio</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      En DayByDay trabajamos con un modelo mixto (tarifa base + % sobre inversión) con presupuesto mínimo de inversión en medios de 3.000€/mes. Nuestro servicio incluye todo lo mencionado arriba más: automatización de flujos de marketing (email, WhatsApp), integración con Shopify para atribución real y acceso a nuestro sistema de reporting con datos en tiempo real.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Si quieres entender exactamente cómo estructuramos el trabajo, puedes leer{" "}
      <Link to="/como-trabajamos" className="text-[#de0015] hover:text-red-400 underline">
        nuestra metodología
      </Link>{" "}
      antes de solicitar información.
    </p>

    <div className="bg-[#1a1616] border border-white/10 rounded-2xl p-6 mb-8 text-center">
      <p className="text-white/60 text-sm mb-4">
        ¿Quieres saber si tu inversión actual está rindiendo al máximo?
      </p>
      <button
        onClick={openCalendly}
        className="bg-[#de0015] hover:bg-red-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
      >
        Auditoría gratuita →
      </button>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Artículos relacionados</h2>
    <ul className="space-y-2 mb-4">
      {[
        ["/blog/como-elegir-agencia-meta-ads-ecommerce", "Cómo elegir la mejor agencia de Meta Ads para tu eCommerce en España"],
        ["/blog/mejores-agencias-paid-media-espana-ecommerce-d2c", "Mejores agencias de paid media en España para eCommerce D2C (2026)"],
        ["/blog/agencia-vs-inhouse-vs-ia", "Agencia vs In-House vs IA: desglose honesto de costes y resultados"],
        ["/blog/preguntas-contratar-agencia-paid-media", "10 preguntas que debes hacer antes de contratar una agencia de paid media"],
        ["/blog/agencia-paid-media-vs-agencia-marketing-generalista", "Agencia de paid media especializada vs agencia de marketing generalista"],
      ].map(([to, label]) => (
        <li key={to}>
          <Link to={to} className="text-[#de0015] hover:text-red-400 text-sm underline">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </BlogPostLayout>
);

export default CuantoCuestaAgenciaPaidMediaPage;
