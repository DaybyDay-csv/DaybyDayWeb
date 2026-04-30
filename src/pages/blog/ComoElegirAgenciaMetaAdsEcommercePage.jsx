import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué hace que una agencia sea la mejor para Meta Ads en eCommerce en España?",
    a: "Tres cosas: especialización exclusiva en D2C/eCommerce (no agencias full-service que tocan B2B, locales y D2C a la vez), capacidad técnica real (Conversions API server-side, atribución cruzada con Shopify/WooCommerce, motor de creatividades con tests semanales) y honestidad operativa (te enseñan la estructura de campañas, cruzan ROAS de plataforma con MER y ventas reales, te dan acceso al Business Manager bajo tu propiedad). Una agencia que en la primera reunión no habla de tracking, atribución y creatividad sino sólo de ROAS prometido es señal de que no domina la parte técnica que mueve la aguja en 2026.",
  },
  {
    q: "¿Cómo comparo dos agencias de Meta Ads que dicen tener resultados parecidos?",
    a: "Pide tres cosas a cada una: 1) Caso de éxito en tu sector con métricas verificables — ingresos, MER blended, CAC y crecimiento mes a mes (no sólo capturas de ROAS de plataforma). 2) Acceso de lectura a un Business Manager activo con cuentas similares a la tuya en tamaño y categoría. 3) Una auditoría escrita de tu cuenta actual antes de firmar — no un PDF genérico sino observaciones concretas sobre tu píxel, estructura, creatividades y atribución. La que pueda hacer las tres es la que realmente sabe lo que está haciendo. La que se niega o se pone vaga es la que vende humo.",
  },
  {
    q: "¿Las agencias grandes son mejores que las boutique para un eCommerce D2C?",
    a: "Para un D2C que factura entre 30K€ y 1M€/mes, casi nunca. Las agencias grandes tienen procesos sólidos pero los D2C suelen acabar gestionados por juniors con plantillas, mientras los seniors se reservan para cuentas top. Las boutiques especializadas en D2C suelen dar acceso directo a un senior que ha gestionado decenas de cuentas similares. La excepción son D2C ya consolidados (>2M€/mes) que necesitan integración multi-canal compleja, equipo creativo interno y operativa internacional. Por debajo de eso, una boutique D2C-pure suele rendir mejor porque entiende exactamente tu tipo de cuenta.",
  },
  {
    q: "¿Cuánto tiempo necesito para evaluar si una agencia de Meta Ads es realmente la mejor para mi eCommerce?",
    a: "El primer mes es de diagnóstico, configuración y entrada en aprendizaje — no se evalúa por resultados, sino por calidad del setup (tracking server-side, estructura de campañas, primeras creatividades). El mes 2 ya empiezas a ver señales: estabilidad del CAC, cadencia de tests creativos, comunicación semanal. La evaluación real seria es a partir del mes 3 con MER blended sostenido y crecimiento de ingresos. Cualquier agencia que prometa resultados definitivos en 30 días está siendo deshonesta sobre cómo funciona el algoritmo de Meta y la fase de aprendizaje.",
  },
  {
    q: "¿Cuál es el coste medio de una agencia de Meta Ads para eCommerce en España?",
    a: "Los modelos típicos en 2026 para eCommerce son: fee fijo (1.000-2.500€/mes para cuentas hasta 20K€/mes de inversión), porcentaje sobre la inversión (10-15% en cuentas 20-100K€/mes) o híbrido fee + bonus por performance. Por debajo de 1.000€/mes es casi imposible que una agencia te dé senior dedicado y testing creativo serio — suelen ser plantillas y juniors. Por encima de 3.500€/mes en una cuenta pequeña es desproporcionado salvo que incluya producción creativa pesada. Lo importante no es el precio absoluto sino el coste relativo: el fee debería costar entre el 5% y el 12% del impacto incremental real generado.",
  },
  {
    q: "¿Qué señales me dicen que una agencia de Meta Ads NO es buena opción para mi eCommerce?",
    a: "Banderas rojas claras: (1) reportan sólo el ROAS de plataforma sin cruzarlo con ingresos reales de tu Shopify; (2) no tienen Conversions API configurada o no la mencionan en la auditoría inicial; (3) no muestran un calendario semanal de tests creativos; (4) gestionan tu cuenta desde su propio Business Manager en vez de desde el tuyo; (5) prometen ROAS específicos antes de auditar tu cuenta; (6) cobran fee bajo y subcontratan a freelancers sin trazabilidad; (7) no tienen casos de éxito en tu sector o se niegan a presentártelos. Cualquiera de estas señales por sí sola es motivo para descartar — combinadas, garantizan problemas en 90 días.",
  },
];

const ComoElegirAgenciaMetaAdsEcommercePage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Cómo elegir la mejor agencia de Meta Ads para tu eCommerce en España"
    description="Guía operativa para identificar la mejor agencia de Meta Ads para un eCommerce D2C en España: criterios técnicos, scorecard comparativo, modelos de pricing, banderas rojas y cómo evaluar resultados reales en los primeros 90 días."
    slug="como-elegir-agencia-meta-ads-ecommerce"
    datePublished="2026-04-30"
    dateModified="2026-04-30"
    readingTime="9 min"
    category="Agencias"
    keywords={[
      "mejor agencia meta ads ecommerce españa",
      "mejor agencia meta ads",
      "como elegir agencia meta ads ecommerce",
      "agencia meta ads ecommerce españa",
      "elegir agencia facebook ads ecommerce",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      Encontrar la <strong className="text-white">mejor agencia de Meta Ads para un eCommerce en España</strong> no es elegir la que más promete ni la que tiene la web más impactante. Es identificar a la que domina la parte técnica (tracking, atribución, estructura), tiene un motor real de creatividades y entiende cómo funciona un D2C — porque gestionar Meta Ads para una marca de moda con ticket medio de 80€ no se parece en nada a hacerlo para una clínica dental.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Este artículo es la metodología que usamos cuando un fundador nos pide ayuda para evaluar a otra agencia (o a nosotros mismos): qué criterios pesan de verdad, qué scorecard usar para comparar dos propuestas, qué modelo de pricing tiene sentido en cada fase y qué señales delatan a las agencias que viven de prometer ROAS y subcontratar a juniors.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Los 6 criterios que definen a la mejor agencia para tu eCommerce</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      No todos los criterios pesan lo mismo. En 2026, con iOS limitando atribución y los costes de adquisición subiendo cada año, estos son los 6 criterios que de verdad mueven el rendimiento — ordenados por impacto real:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Criterio</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Por qué importa</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Peso</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "Especialización D2C exclusiva", p: "Una agencia que también gestiona B2B, locales y leadgen no domina los matices D2C: feeds, catálogos, full-funnel con retención", w: "Alto" },
            { c: "Tracking server-side (CAPI) y atribución", p: "Sin Conversions API deduplicada, Meta optimiza a ciegas y reporta un ROAS 20-40% inflado vs ventas reales", w: "Alto" },
            { c: "Motor de creatividades sistemático", p: "El creativo es el factor #1 de rendimiento en 2026 — más que audiencias o pujas. Sin testing semanal estructurado, no se escala", w: "Alto" },
            { c: "Acceso directo a un senior", p: "Los D2C entre 30K€ y 1M€/mes necesitan decisiones rápidas — gestor que entiende el negocio, no juniors con plantillas", w: "Medio-Alto" },
            { c: "Casos de éxito verificables en tu sector", p: "Capturas de ROAS no valen — ingresos, MER blended y crecimiento mes a mes en cuentas similares a la tuya", w: "Medio" },
            { c: "Modelo de pricing alineado", p: "Fee fijo + bonus por performance suele ser más sano que % sobre inversión — incentiva eficiencia, no gasto", w: "Medio" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.w}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La <a href="https://www.facebook.com/business/help/2041148702652965" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial de Meta sobre la API de Conversiones</a> deja claro por qué el tracking server-side ya no es opcional: sin él, una parte significativa de los eventos de compra se pierde en navegadores con prevención de seguimiento.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Scorecard para comparar dos agencias en una hoja</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Cuando un fundador tiene dos propuestas encima de la mesa, este es el scorecard operativo que usamos para forzar una comparación honesta — no por marketing sino por capacidad real:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Pregunta</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Respuesta sana</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Bandera roja</th>
          </tr>
        </thead>
        <tbody>
          {[
            { q: "¿Qué % de tu cartera son eCommerce D2C?", s: ">70% o exclusivo D2C", r: "Mezcla con leadgen, locales, B2B" },
            { q: "¿Implementáis CAPI server-side desde el día 1?", s: "Sí, con auditoría previa de eventos", r: "‘Está incluida en el píxel’ o evasivas" },
            { q: "¿Cuántos tests creativos lanzáis a la semana?", s: "5-15 con plan documentado", r: "‘Cuando hace falta’ / sin cadencia" },
            { q: "¿Con qué herramienta cruzáis ROAS plataforma vs ventas reales?", s: "Shopify/Triple Whale/Northbeam o panel propio con post-purchase survey", r: "Sólo el ROAS de Ads Manager" },
            { q: "¿Quién gestionará mi cuenta semana a semana?", s: "Senior con nombre y experiencia documentada", r: "‘El equipo’ sin nombrar persona" },
            { q: "¿Sobre qué Business Manager se opera?", s: "Sobre el del cliente; agencia como socio", r: "Sobre el de la agencia" },
            { q: "¿Cuál es vuestra cláusula de salida?", s: "30 días aviso, datos y assets se devuelven", r: "Permanencia 12 meses, IP creativa retenida" },
            { q: "¿Podéis enseñarme un caso real de mi sector?", s: "Sí, con ingresos y MER blended", r: "Capturas sueltas de ROAS sin contexto" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.q}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/55 text-xs">{row.r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Si la agencia que estás evaluando responde sana en 6 de 8 preguntas, está dentro del rango realmente competente. Por debajo de 5 es señal de que estás mirando una agencia generalista o un equipo sin la madurez técnica que requiere un D2C en 2026.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Modelos de pricing y cuándo tiene sentido cada uno</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      No hay un modelo universalmente mejor. Lo que importa es que esté alineado con la fase de tu eCommerce:
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          modelo: "Fee fijo mensual",
          rango: "1.000-2.500€/mes para cuentas hasta 20K€/mes de inversión",
          cuando: "Marcas en validación o crecimiento estable. Predecible para ambos lados, no penaliza meses de menor inversión.",
        },
        {
          modelo: "Porcentaje sobre la inversión",
          rango: "10-15% en cuentas 20-100K€/mes",
          cuando: "Cuentas en escalado activo. Permite a la agencia dedicar más recursos cuando creces. Riesgo: incentiva subir presupuesto incluso cuando no es óptimo.",
        },
        {
          modelo: "Fee fijo + bonus por performance",
          rango: "Fee 1.500-3.000€ + bonus 5-15% sobre incremental",
          cuando: "Marcas con datos sólidos y baseline claro. Modelo más sano: alinea incentivos a resultados reales (MER blended, ingresos incrementales) sin presionar a gastar más.",
        },
        {
          modelo: "% sobre revenue (paga por ROAS)",
          rango: "8-12% del revenue paid",
          cuando: "Casi siempre mala señal. Suele venir con cláusulas de atribución infladas. Funciona en pocos casos muy específicos con tracking robusto y baseline pre-acordado.",
        },
      ].map(({ modelo, rango, cuando }) => (
        <div key={modelo} className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
          <p className="font-semibold text-white text-sm mb-1">{modelo} <span className="text-white/40 font-normal">— {rango}</span></p>
          <p className="text-white/55 text-sm">{cuando}</p>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La <a href="https://www.iabspain.es/estudio/estudio-de-inversion-publicitaria-en-espana-2024/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">IAB Spain</a> publica los estándares de inversión y modelos de fee que usa la industria publicitaria española — útil como referencia para no salirse de mercado en ninguna dirección.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Banderas rojas que descartan a una agencia automáticamente</h2>
    <div className="space-y-3 mb-6">
      {[
        "Promete un ROAS específico (‘te garantizamos 4x’) antes de auditar tu cuenta — imposible saberlo sin ver tracking, creatividades y producto.",
        "Reporta sólo el ROAS de Ads Manager y no cruza con ingresos reales de Shopify/WooCommerce — significa que viven del ROAS inflado, no del impacto real.",
        "Gestiona tu cuenta desde su propio Business Manager en vez del tuyo — pierdes el activo cuando cambies de agencia.",
        "No tiene Conversions API server-side configurada o se niega a explicar su setup técnico — en 2026 es no-negociable.",
        "No muestra un proceso documentado de testing creativo (calendario, hooks, variantes, resultados) — la creatividad es lo que mueve la aguja, sin proceso es ruido.",
        "Permanencia de 12 meses con cláusulas duras de salida — las agencias buenas no necesitan retenerte legalmente, te retienen por resultados.",
        "Casos de éxito en sectores muy distintos al tuyo (B2B, locales, leadgen) — eCommerce D2C tiene matices que no se aprenden gestionando otras categorías.",
        "Equipo de cuenta cambia cada pocos meses o subcontrata sin transparencia — pierdes contexto y la curva de aprendizaje empieza de cero.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo evaluar resultados en los primeros 90 días</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Las agencias buenas no tienen miedo de un calendario claro de evaluación. Este es el ritmo que recomendamos firmar al inicio para no llegar al mes 6 sin saber si funciona:
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          fase: "Días 0-30 — Diagnóstico y setup",
          que: "Auditoría completa: píxel, CAPI, estructura, audiencias, creatividades. Reseteo de campañas que no aportan, configuración de tracking server-side, primer batch de creatividades. KPI: calidad del setup, no resultados.",
        },
        {
          fase: "Días 30-60 — Aprendizaje del algoritmo",
          que: "Las campañas necesitan 50-100 conversiones semanales para salir de la fase de aprendizaje. KPI: estabilidad del CAC, frecuencia de tests creativos, comunicación semanal con datos.",
        },
        {
          fase: "Días 60-90 — Resultados estables",
          que: "Aquí ya se evalúa de verdad. KPI: MER blended, CAC vs baseline, crecimiento de ingresos paid mes a mes, % de creatividades nuevas que escalan vs total testeado.",
        },
      ].map(({ fase, que }) => (
        <div key={fase} className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
          <p className="font-semibold text-white text-sm mb-1">{fase}</p>
          <p className="text-white/55 text-sm">{que}</p>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Si al día 90 el MER blended no se ha estabilizado mejor que tu baseline pre-agencia, es momento de una conversación honesta: o el setup no es suficiente, o la cuenta tenía un techo más bajo del que se asumía. Las agencias buenas tienen esa conversación de forma proactiva — las malas la evitan hasta que las despides.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay y por qué encajamos con D2C</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      No somos para todo el mundo. El perfil de cliente con el que damos los mejores resultados es muy concreto: eCommerce D2C españoles entre 30K€ y 500K€/mes de facturación, sin Amazon como canal principal, con producto físico y margen sano para invertir en paid. Si encajas con eso, así trabajamos:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Onboarding de 2 semanas con auditoría escrita: tracking, atribución, estructura, creatividades. Te quedas con el documento aunque no firmemos.",
        "CAPI server-side y deduplicación obligatorias antes de tocar campañas — si no podemos implementarla, no aceptamos la cuenta.",
        "Acceso directo a Pablo (founder) en cada llamada estratégica + gestor senior dedicado a tu cuenta semana a semana.",
        "Motor de creatividades con cadencia documentada: 8-15 variantes a la semana, post-mortem semanal de qué funciona y por qué.",
        "Reporte semanal cruzando ROAS de Meta con ingresos reales de Shopify/WooCommerce y MER blended — nunca vendemos el ROAS de plataforma como verdad.",
        "Sin permanencia. Mes a mes desde el día 1. Si no aportamos en 90 días, te ayudamos a moverte sin fricción.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Quieres comparar tu agencia actual con este scorecard?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita en 30 minutos: revisamos tracking, estructura, creatividades y atribución de tu cuenta — y te decimos honestamente si tu agencia está rindiendo o regalando dinero.</p>
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
        <Link to="/blog/elegir-agencia-anuncios-meta-ads-d2c" className="text-white font-semibold hover:text-white/80">
          Cómo elegir una agencia de anuncios en Meta Ads para tu marca D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Habilidades técnicas que debe tener una agencia de Meta Ads y cómo validar su nivel real</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/senales-agencia-publicidad-no-rinde" className="text-white font-semibold hover:text-white/80">
          Señales de que tu agencia de publicidad no está rindiendo →
        </Link>
        <p className="text-white/40 text-xs mt-1">Las banderas rojas que delatan a una agencia que no está aportando — antes del mes 6</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/checklist-auditoria-campanas-paid-media" className="text-white font-semibold hover:text-white/80">
          Checklist de auditoría de campañas paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">Auditoría operativa para revisar el trabajo de cualquier agencia con datos en mano</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cuanto-cuesta-agencia-paid-media-espana-precios-2026" className="text-white font-semibold hover:text-white/80">
          Cuánto cuesta una agencia de paid media en España (precios 2026) →
        </Link>
        <p className="text-white/40 text-xs mt-1">Modelos de pricing detallados y cuándo cada uno tiene sentido para un D2C</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default ComoElegirAgenciaMetaAdsEcommercePage;
