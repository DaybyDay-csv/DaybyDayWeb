import React from 'react';
import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  { q: "¿Cuántos días necesito para testar una nueva campaña de Meta Ads?", a: "Mínimo 7 días para datos significativos, pero el algoritmo necesita al menos 50 eventos de conversión para estabilizarse. Esto suele tomar 14-21 días dependiendo del presupuesto diario." },
  { q: "¿Cuándo debo pausar una campaña que no convierte?", a: "Si después de 14 días y 50+ eventos de conversión el CPA es 2x tu target, pausar. Pero si hay volumen y el CPA está dentro del 20% del target, seguir testando." },
  { q: "¿Cómo afecta la estacionalidad a los tests de campañas?", a: "Evita lanzar tests en fechas de alta demanda (Black Friday, Navidad) porque los datos quedan contaminados. Mejor lanzar en enero, marzo-abril o septiembre." },
  { q: "¿Cuántas variaciones de anuncio debo crear por campaña?", a: "Mínimo 3-5 creatividades diferentes. El algoritmo de Meta optimiza mejor con más opciones. En sectores competitivos, hasta 7-10 variaciones." }
];

const TestCampaignsMetaAdsPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Cómo Testar Nuevas Campañas en Meta Ads: Sistema de Experimentación 2026"
    description="Guía completa para testar campañas de Meta Ads de forma científica. Aprende a diseñar tests, interpretar resultados y escalar lo que funciona."
    slug="test-campaigns-meta-ads"
    datePublished="2026-05-24"
    readingTime="11 min"
    category="Meta Ads"
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <section>
      <h2>Por qué la mayoría de tests fallan</h2>
      <p className="text-white/70 leading-relaxed mb-5">
        El 90% de los marketers de eCommerce commeten el mismo error: lanzan un test sin hipótesis clara, sin control de variables y sin suficiente duración. El resultado: datos inutilizables y dinero desperdiciado.
      </p>
      <p className="text-white/70 leading-relaxed mb-5">
        En <Link to="/servicios/meta-ads" className="text-white underline underline-offset-2 hover:text-white/80">DayByDay</Link> aplicamos un sistema de experimentación riguroso que reduce el coste de aprendizaje en un 60%. Esta guía te explica exactamente cómo lo hacemos.
      </p>
    </section>

    <section>
      <h2>El sistema de experimentación de 3 fases</h2>
      <p className="text-white/70 leading-relaxed mb-4">
        Cada test de campaña pasa por 3 fases distintas. Saltarse fases es la causa #1 de fracaso.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-3">Fase 1: Validación (Días 1-14)</h3>
      <p className="text-white/70 leading-relaxed mb-4">
        Presupuesto: 300-500€/mes por test. Objetivo: validar que la campaña puede alcanzar métricas aceptables. No escalamos hasta tener al menos 50 conversiones y CPA dentro del 30% del target. Aprende más sobre <Link to="/blog/budget-meta-ads-2026" className="text-white underline underline-offset-2 hover:text-white/80">cómo estructurar el presupuesto de test</Link> en nuestra guía específica.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-3">Fase 2: Optimización (Días 15-30)</h3>
      <p className="text-white/70 leading-relaxed mb-4">
        Una vez validada, ajustamos creatividades, audiencias y bidding. Aquí es donde el ROAS mejora de forma consistente. Si necesitas entender mejor qué métricas optimizar, mira nuestro <Link to="/blog/que-es-roas-meta-ads" className="text-white underline underline-offset-2 hover:text-white/80">artículo sobre ROAS</Link>.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-3">Fase 3: Escala (Día 31+)</h3>
      <p className="text-white/70 leading-relaxed mb-5">
        Solo escalamos si el CPA en fase 2 es igual o mejor que en fase 1. Subimos un 20% cada 3 días监控ando ROAS. Si cae más de un 15%, rollback inmediato.
      </p>
    </section>

    <section>
      <h2>Variables críticas a testar</h2>
      <p className="text-white/70 leading-relaxed mb-4">
        No testes más de 2 variables a la vez o no podrás atribuir el resultado. Nuestra prioridad actual en 2026:
      </p>

      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start border-b border-white/10 pb-3">
            <div>
              <span className="text-white font-bold">1. Audiencias</span>
              <p className="text-white/50 text-xs mt-1">Lookalike 1% vs 3%, interests vs behavior</p>
            </div>
            <span className="text-green-400 font-mono text-sm">Alto impacto</span>
          </div>
          <div className="flex justify-between items-start border-b border-white/10 pb-3">
            <div>
              <span className="text-white font-bold">2. Creatividades</span>
              <p className="text-white/50 text-xs mt-1">Video vs imagen, hooks en primeros 3 segundos</p>
            </div>
            <span className="text-green-400 font-mono text-sm">Alto impacto</span>
          </div>
          <div className="flex justify-between items-start border-b border-white/10 pb-3">
            <div>
              <span className="text-white font-bold">3. Objetivos de campaña</span>
              <p className="text-white/50 text-xs mt-1">Conversiones vs ventas catálogo vs valor</p>
            </div>
            <span className="text-yellow-400 font-mono text-sm">Medio impacto</span>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-white font-bold">4. Bidding strategy</span>
              <p className="text-white/50 text-xs mt-1">Lowest cost vs target CPA vs manual</p>
            </div>
            <span className="text-yellow-400 font-mono text-sm">Medio impacto</span>
          </div>
        </div>
      </div>
      <p className="text-white/70 leading-relaxed mb-5">
        Prueba siempre primero audiencias y creatividades antes de tocar bidding o presupuesto. Son las variables con mayor palanca sobre el rendimiento.
      </p>
    </section>

    <section>
      <h2>Cómo diseñar un test válido</h2>

      <h3 className="text-lg font-bold mt-6 mb-3">1. Define tu hipótesis</h3>
      <p className="text-white/70 leading-relaxed mb-4">
        "Las audiencias lookalike 3% tendrán mejor CPA que las de 1% porque..." → Completa la parte "porque" con datos de tu cuenta histórica o investigación.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-3">2. Calcula el tamaño de muestra</h3>
      <p className="text-white/70 leading-relaxed mb-4">
        Para detectar un cambio del 15% en CPA con 80% de confianza estadística necesitas:
      </p>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-5">
        <p className="font-mono text-white text-sm mb-2">Mínimo 200 conversiones por variante</p>
        <p className="text-white/50 text-xs">Con CPA medio de 15€, eso son 3.000€/variante</p>
        <p className="text-white/50 text-xs mt-2">Si tu CPA es 30€, necesitas 6.000€/variante</p>
      </div>

      <h3 className="text-lg font-bold mt-6 mb-3">3. Controla las variables</h3>
      <p className="text-white/70 leading-relaxed mb-5">
        Cuando testes audiencias, usa la MISMA creatividad en ambas variantes. Cuando testes creatividades, usa la MISMA audiencia. Mezclar variables invalida el test.
      </p>
    </section>

    <section>
      <h2>Errores que destruyen tus tests</h2>

      <h3 className="text-lg font-bold mt-6 mb-3">1. Tomar decisiones antes de tiempo</h3>
      <p className="text-white/70 leading-relaxed mb-4">
        Si a los 3 días una variante tiene mejor CPA, no pares el test. Puede ser fluctuación estadística. Lee más sobre cómo <Link to="/blog/estructura-campaigns-meta-ads" className="text-white underline underline-offset-2 hover:text-white/80">estructurar campañas correctamente</Link> para evitar este error.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-3">2. No documentar resultados</h3>
      <p className="text-white/70 leading-relaxed mb-4">
        Sin registro, repites los mismos errores. Creamos una spreadsheet con: hipótesis, duración, resultados, aprendizaje y siguiente acción. Actualiza después de cada test.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-3">3. Testar en periodo de baja temporada</h3>
      <p className="text-white/70 leading-relaxed mb-5">
        Los datos de julio no aplican a noviembre. Si testeas en temporada baja, los resultados serán peores que en alta. Planifica tests para enero-febrero o septiembre.
      </p>
    </section>

    <section>
      <h2>Matriz de decisión post-test</h2>
      <p className="text-white/70 leading-relaxed mb-4">
        Después de cada test, usamos esta matriz para decidir siguiente paso:
      </p>
      <div className="space-y-3 mb-5">
        <div className="flex items-start gap-3">
          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold">WIN</span>
          <p className="text-white/70">CPA mejor +15% → Escalar inmediatamente con mismo setup</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-bold">CONTINUE</span>
          <p className="text-white/70">CPA mejor +5-15% → Continuar optimización 2 semanas más</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold">KILL</span>
          <p className="text-white/70">CPA peor → Pausar en 48h, Documentar por qué falló</p>
        </div>
      </div>
      <p className="text-white/70 leading-relaxed mb-5">
        El KILL es tan importante como el WIN. Cada test fallido enseña algo si lo documentas bien. Los founders que más rápido escalan son los que no tienen ego en pausar campañas.
      </p>
    </section>

    <section>
      <h2>Conclusión</h2>
      <p className="text-white/70 leading-relaxed mb-4">
        Testar campañas sin sistema es gambling con tu presupuesto. El sistema que usamos en DayByDay tiene 3 fases, 4 variables prioritarias y una matriz de decisión clara. Con esto reducimos el coste de aprendizaje drásticamente.
      </p>
      <p className="text-white/70 leading-relaxed mb-5">
        Empieza mañana con un solo test: hypothesis clara, mismo creative, dos audiencias. Mide 14 días. Documenta. Repite. Si quieres que te ayudemos a diseñar tu primer test o revisar los resultados, <Link to="/?book=call" className="text-white underline underline-offset-2 hover:text-white/80">reserva una llamada de discovery</Link>.
      </p>
    </section>
  </BlogPostLayout>
);

export default TestCampaignsMetaAdsPage;