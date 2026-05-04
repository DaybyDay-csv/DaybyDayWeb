import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué tipo de reglas automáticas se pueden crear en Meta Ads Manager?",
    a: "Meta Ads Manager permite tres familias de reglas: (1) reglas de control de presupuesto y pausa (apagar ad sets que superen un CPA umbral, pausar creativos con frequency >5, desactivar ad sets con gasto >X y 0 compras); (2) reglas de escalado (subir presupuesto +15-20% si ROAS >objetivo durante 3 días, bajarlo si ROAS <suelo); (3) reglas de notificación (avisar por email cuando un ad set entra en learning limited, cuando un creativo cae por debajo de CTR mínimo, cuando el spend acumulado del día supera el plan). Las dos primeras actúan sobre la cuenta; las terceras solo informan y dejan al equipo decidir.",
  },
  {
    q: "¿Cuándo es contraproducente automatizar reglas en Meta Ads?",
    a: "Automatizar agresivamente sobre cuentas con poco volumen o en learning phase rompe el aprendizaje del algoritmo. Si un ad set tiene <50 conversiones/semana cualquier regla de pausa por CPA opera sobre ruido estadístico — un día malo no significa que el ad set rinda mal. Tampoco compensa automatizar subidas de presupuesto >30% (resetea learning) ni reglas que se ejecuten cada 30 minutos (Meta evalúa rendimiento sobre ventanas de 24-72h). Las reglas funcionan cuando hay volumen suficiente (>5.000€/mes spend, >100 conversiones/mes) y se aplican sobre ventanas de mínimo 3 días.",
  },
  {
    q: "¿Cómo configuro una regla para pausar creativos fatigados automáticamente?",
    a: "Regla típica: condición = frequency >4 AND CTR (todos) <0,8% AND impresiones >3.000 en últimos 7 días → acción = pausar creativo + notificación email. La frecuencia de evaluación debe ser diaria (no cada hora) y el ámbito a nivel anuncio individual, no ad set. Esta regla se complementa con otra que active rotación: cuando un creativo se pausa, el equipo recibe alerta para introducir variante nueva en 24-48h. Sin sistema de reposición la regla solo apaga inventario y deja la campaña sin combustible.",
  },
  {
    q: "¿Qué reglas de escalado automatizadas funcionan mejor para D2C?",
    a: "La regla de escalado conservador que aplicamos en cuentas D2C: si ROAS últimos 3 días ≥ROAS objetivo × 1,2 AND spend del ad set ≥ 70% del presupuesto AND frequency <3 → subir presupuesto +15% (no más). Evaluación cada 3 días, máximo 2 subidas consecutivas antes de pausar la regla durante 7 días para verificar estabilidad. Para bajadas: si ROAS últimos 3 días <ROAS suelo × 0,8 → bajar presupuesto -20% y notificar. Estas reglas evitan picos manuales emocionales y mantienen la cuenta en una banda controlada, pero no sustituyen la revisión semanal humana del estado del aprendizaje.",
  },
  {
    q: "¿Conviene automatizar reglas a nivel de campaña, ad set o anuncio?",
    a: "Depende de la decisión. Reglas de gasto y ROAS funcionan mejor a nivel ad set (es donde Meta optimiza el aprendizaje). Reglas de fatiga creativa van a nivel anuncio (frequency y CTR son del creativo, no del ad set). Reglas de presupuesto diario máximo o de pausa total por gasto excedido conviene tenerlas a nivel campaña como red de seguridad. Si usas Advantage+ Shopping con CBO, la mayoría de reglas se aplican a campaña porque ad sets dejan de ser unidad de optimización. Configurar reglas en el nivel equivocado genera falsos positivos (pausar ad sets enteros cuando solo un creativo fatigaba).",
  },
  {
    q: "¿Cómo combino reglas automáticas con scripts externos o APIs para más control?",
    a: "Meta Ads Manager cubre el 70-80% de los casos comunes con reglas nativas. Para lógica avanzada (cross-cuenta, condiciones que dependan de datos externos como inventario Shopify o métricas LTV) se usa la Marketing API con scripts que corren en n8n, Make o servidores propios. Casos típicos: pausar creativos cuando un SKU se queda sin stock, ajustar bid cap automáticamente según margen del producto, mover presupuesto entre cuentas según ROAS comparado. La regla práctica: empezar siempre con reglas nativas, solo subir a API cuando una limitación específica lo justifica. La API añade fricción de mantenimiento que solo se compensa si genera valor recurrente.",
  },
  {
    q: "¿Las reglas automáticas pueden romper el aprendizaje del algoritmo?",
    a: "Sí, y es el error más común. Cualquier cambio de presupuesto >30%, cambio de objetivo, edición de audiencia o pausa/reactivación frecuente del mismo ad set resetea o degrada el aprendizaje. Las reglas que ejecutan acciones fuertes (subir presupuesto +50% al detectar buen ROAS, pausar y reactivar al día siguiente) parecen reactivas pero generan inestabilidad estructural. La regla de oro: las acciones automáticas deben ser conservadoras (±15-20%), evaluarse sobre ventanas mínimas de 72h y limitarse en frecuencia (no más de una acción significativa por ad set por semana). Con esa disciplina las reglas amplifican una buena estrategia; sin ella, la rompen.",
  },
];

const AutomatizacionesReglasMetaAdsManagerPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Automatizaciones y reglas en Meta Ads Manager para escalar (D2C 2026)"
    description="Cómo usar reglas automáticas y automatizaciones en Meta Ads Manager para escalar campañas D2C sin romper el learning phase: tipos de reglas (control, escalado, notificación), umbrales realistas, niveles correctos (campaña/ad set/anuncio), errores que rompen el algoritmo y cuándo conviene saltar a Marketing API con scripts externos."
    slug="automatizaciones-reglas-meta-ads-manager"
    datePublished="2026-05-04"
    dateModified="2026-05-04"
    readingTime="9 min"
    category="Operaciones"
    keywords={[
      "automatizaciones meta ads",
      "reglas automaticas meta ads manager",
      "escalar meta ads automatizado",
      "meta ads marketing api",
      "automatizar facebook ads",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      Las <strong className="text-white">automatizaciones y reglas en Meta Ads Manager</strong> son la diferencia entre una cuenta D2C que escala con disciplina y otra donde el media buyer se pasa el día persiguiendo CPAs y apagando creativos a mano. Bien configuradas amplifican una buena estrategia; mal configuradas rompen el learning phase y dejan la cuenta en bucle de inestabilidad. La gran mayoría de cuentas que auditamos no usan reglas porque "se han quemado" antes — siempre por automatizar acciones demasiado agresivas sobre ventanas demasiado cortas.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      En esta guía cubrimos qué reglas merecen la pena, en qué nivel aplicarlas, qué umbrales son seguros y cuándo conviene salir de Ads Manager hacia la Marketing API.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Tres familias de reglas en Meta Ads Manager</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Antes de configurar nada, ubica cada regla en una de estas tres categorías. Mezclarlas en una sola regla mal pensada es la primera fuente de problemas:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Familia</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Qué hace</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Riesgo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Nivel ideal</th>
          </tr>
        </thead>
        <tbody>
          {[
            { f: "Control / pausa", q: "Pausar ad set/anuncio si CPA, frequency o gasto exceden umbral", r: "Pausar sobre ruido si volumen <50 conv/sem", n: "Ad set + anuncio" },
            { f: "Escalado", q: "Subir/bajar presupuesto si ROAS supera/incumple objetivo", r: "Resetear learning con saltos >30%", n: "Ad set (CBO: campaña)" },
            { f: "Notificación", q: "Avisar por email/Slack ante anomalía sin actuar", r: "Bajo — solo informa", n: "Cuenta entera" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.f}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.q}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.r}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.n}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      Como recoge la <a href="https://www.facebook.com/business/help/1064323036022510" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial de reglas automatizadas de Meta</a>, las acciones se aplican sobre ventanas que van desde el día actual hasta los últimos 30 días — elegir bien la ventana es lo que separa una regla útil de un cuchillo en la cuenta.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Reglas que merecen la pena en cuentas D2C</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      No todas las reglas que sugiere Meta valen para eCommerce D2C. Estas son las que mantenemos activas en cuentas gestionadas con &gt;5.000€/mes de spend:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Pausa creativo fatigado: frequency >4 AND CTR (todos) <0,8% AND impresiones >3.000 últimos 7d → pausar anuncio + notificar. Evita gastar en creativos quemados.",
        "Pausa ad set sin compras: spend >2x CPA objetivo AND 0 compras en últimos 3 días → pausar ad set + notificar. Solo tiene sentido si hay reposición de ad sets activa.",
        "Escalado conservador: ROAS últimos 3d ≥ ROAS objetivo × 1,2 AND frequency <3 AND spend ≥70% del presupuesto → subir presupuesto +15%. Máx una vez cada 3 días.",
        "Bajada por bajo rendimiento: ROAS últimos 3d <ROAS suelo × 0,8 → bajar presupuesto -20% y notificar. No pausar — bajar mantiene aprendizaje vivo.",
        "Aviso learning limited: ad set en estado 'learning limited' >5 días → email al equipo. Solo notifica, decisión humana.",
        "Tope de gasto diario: si spend del día >130% del presupuesto plan → pausar campaña + Slack al lead. Red de seguridad, no operativa.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Errores frecuentes que rompen el aprendizaje</h2>
    <div className="space-y-3 mb-6">
      {[
        "Reglas que evalúan cada 30 minutos: Meta optimiza sobre ventanas de 24-72h, nada más corto tiene sentido. Frecuencia de evaluación mínima recomendada: diaria.",
        "Subidas o bajadas >30% automatizadas: cualquier cambio mayor resetea o degrada el learning. La regla del 15-20% existe por motivos algorítmicos, no por estética.",
        "Reglas de pausa/reactivación del mismo ad set: cada pausa+reactivación reinicia el aprendizaje. Mejor bajar presupuesto que pausar y reactivar 24h después.",
        "Reglas que actúan sobre cuentas con <50 conv/sem por ad set: el sistema decide sobre ruido, no sobre patrón. En presupuestos pequeños, mejor revisión manual semanal.",
        "Reglas de pausa por CPA en evento secundario (ATC, IC) cuando se optimiza a Purchase: confunden la lectura del algoritmo y generan pausas espurias.",
        "Reglas en Advantage+ Shopping a nivel ad set: en ASC el ad set deja de ser unidad de optimización; las reglas deben ir a nivel campaña o no aplicarse.",
        "Apilar muchas reglas que se contradicen: una regla sube +15% por ROAS bueno y otra baja -20% por CPA alto el mismo día. Auditar conflictos antes de activar.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cuándo subir a Marketing API y scripts externos</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Las reglas nativas cubren el 70-80% de casos. El salto a la <a href="https://developers.facebook.com/docs/marketing-apis/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Marketing API de Meta</a> con scripts en n8n, Make o servidores propios solo compensa cuando hay valor recurrente que las reglas nativas no resuelven:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Caso de uso</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Por qué nativo no llega</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Stack típico</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "Pausar creativos por SKU sin stock", p: "Reglas nativas no leen inventario externo", s: "n8n + API Shopify + Marketing API" },
            { c: "Bid cap dinámico por margen real producto", p: "Reglas no acceden a margen, solo CPA", s: "Script Python + cron + Marketing API" },
            { c: "Reasignar presupuesto cross-cuenta por ROAS", p: "Reglas nativas trabajan dentro de una cuenta", s: "Make/n8n con multi-cuenta" },
            { c: "Alertas en Slack con contexto enriquecido", p: "Notificaciones nativas son email plano", s: "Webhook + Slack API" },
            { c: "Pausa por LTV proyectado bajo cohort", p: "Reglas no leen datos LTV externos", s: "BigQuery + Cloud Function + API" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white font-medium text-xs">{row.s}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      La regla práctica: si una automatización requiere mantenimiento técnico mensual y no genera al menos 2-3% de eficiencia adicional sobre el spend, no compensa. La fricción de mantener scripts custom (cambios en la API, tokens que caducan, edge cases) suma horas que en cuentas medianas (&lt;30K€/mes spend) rara vez se recuperan.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Auditoría inicial: revisamos qué reglas existen, conflictos entre ellas, frecuencia de evaluación y ventanas. En 8 de cada 10 cuentas hay reglas heredadas que ejecutan acciones sin que nadie las controle.",
        "Stack base por cuenta: 4-6 reglas nativas máximo, todas con ventanas mínimas de 3 días, evaluación diaria, y limitadas en frecuencia de acción (no más de 1 acción/ad set/semana).",
        "Documentación obligatoria: cada regla activa tiene una ficha que explica qué hace, por qué, qué umbral usa y qué se mide para validar que rinde. Sin ficha, la regla se elimina.",
        "Revisión mensual: comparamos qué decisiones tomaron las reglas frente a qué habría decidido un humano con el mismo dato. Si la regla acertó <70% de las veces, se reajusta o se quita.",
        "Salto a Marketing API solo cuando hay caso de uso recurrente y valor cuantificable: lo más habitual son automatizaciones por inventario y bid caps por margen real, casi nunca lógica de pujas.",
        "Punto de corte: si la cuenta no tiene volumen suficiente (>5.000€/mes spend, >100 conv/mes), no activamos automatizaciones — la revisión semanal humana rinde más que cualquier regla sobre poco dato.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Tienes reglas activas que nadie revisa hace meses?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos todas las reglas activas en tu cuenta Meta Ads, conflictos, ventanas mal configuradas y oportunidades de automatización segura sin romper learning phase.</p>
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
        <Link to="/blog/escalar-campanas-meta-ads-sin-romper-roas" className="text-white font-semibold hover:text-white/80">
          Cómo escalar campañas Meta Ads sin romper el ROAS →
        </Link>
        <p className="text-white/40 text-xs mt-1">Las reglas de escalado automatizado son una de las palancas — aquí el marco completo para subir presupuesto sin reset</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/presupuesto-minimo-meta-ads-ecommerce" className="text-white font-semibold hover:text-white/80">
          Presupuesto mínimo Meta Ads: ¿cuánto necesito invertir? →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué automatizar reglas en cuentas con poco volumen es contraproducente y dónde está el suelo operativo</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/checklist-auditoria-campanas-paid-media" className="text-white font-semibold hover:text-white/80">
          Checklist para auditar campañas de paid media →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo detectar reglas heredadas mal configuradas y conflictos entre automatizaciones en una cuenta nueva</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/advantage-plus-shopping-cuando-usarlo-no" className="text-white font-semibold hover:text-white/80">
          Advantage+ Shopping Campaign: cuándo usarlo y cuándo no →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué en ASC las reglas deben ir a nivel campaña y no ad set</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default AutomatizacionesReglasMetaAdsManagerPage;
