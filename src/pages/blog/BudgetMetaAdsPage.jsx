import React from 'react';
import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  { q: "¿Cuántos euros debería invertir en Meta Ads mi eCommerce?", a: "La inversión mínima recomendada para que Meta pueda optimizar depende del objetivo. Para ventas, mínimo 10€/día (300€/mes). Pero el punto de entrada real para datos significativos es a partir de 1.000€/mes, donde el algoritmo tiene suficientes datos para aprender." },
  { q: "¿Cuánto presupuesto necesito para empezar en Meta Ads?", a: "Con 300-500€/mes puedes empezar a testar y aprender, pero los resultados significativos llegan a partir de 1.000€/mes. Lo importante es no fragmentar el presupuesto en demasiadas campañas." },
  { q: "¿Cómo estructurar mi presupuesto entre campañas?", a: "Divide tu presupuesto en 3 niveles del embudo: 50-60% en prospección (nuevos clientes), 30-40% en conversión y remarketing, y 10% en brand awareness. Ajusta según tu sector y datos." },
  { q: "¿Conviene usar Campaign Budget Optimization (CBO)?", a: "Sí, para la mayoría de casos. CBO permite al algoritmo redistribuir automáticamente el presupuesto entre los Ad Sets que mejor rendimiento tienen. Es más eficiente que gestionar presupuestos por Ad Set manualmente." }
];

const BudgetMetaAdsPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Cuánto Presupuesto Necesitas para Meta Ads en 2026: Guía por Sector"
    description="Descubre cuánto deberías invertir en Meta Ads según tu sector, facturación y objetivos. Incluye calculadora de presupuesto mínimo y estructura de inversión por embudo."
    slug="budget-meta-ads-2026"
    datePublished="2026-05-23"
    readingTime="9 min"
    category="Meta Ads"
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <section>
      <h2>La pregunta que todo founder se hace</h2>
      <p className="text-white/70 leading-relaxed mb-5">
        Cuántas veces has escuchado "invierte lo que puedas permetirte perder" o "prueba con 5€ al día"? La realidad es que Meta Ads funciona con lógica de mercado: necesitas presupuesto suficiente para que el algoritmo tenga datos y pueda optimizar. Sin datos, sin resultados.
      </p>
      <p className="text-white/70 leading-relaxed mb-5">
        En <Link to="/servicios/meta-ads" className="text-white underline underline-offset-2 hover:text-white/80">DayByDay</Link> trabajamos con eCommerce D2C que facturan entre 500K€ y 5M€ al año, y la pregunta del presupuesto es siempre la primera que respondemos en discovery. La respuesta corta: si no puedes permitirte al menos 1.000€/mes en Meta Ads, probablemente necesitas先去 trabajar otros canales (SEO, contenido, email) antes de付费 media.
      </p>
    </section>

    <section>
      <h2>Presupuesto mínimo por fase de negocio</h2>
      <p className="text-white/70 leading-relaxed mb-4">
        No existe un número mágico, pero sí hay rangos que funcionan mejor según tu situación actual:
      </p>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-white/60">Test/Validación</span>
            <span className="font-mono text-yellow-400">300-500€/mes</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-white/60">Crecimiento inicial</span>
            <span className="font-mono text-green-400">1.000-2.000€/mes</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-white/60">Escala</span>
            <span className="font-mono text-blue-400">2.000-5.000€/mes</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/60">Escala agresiva</span>
            <span className="font-mono text-purple-400">5.000€+/mes</span>
          </div>
        </div>
      </div>
      <p className="text-white/70 leading-relaxed mb-5">
        La fase de test es crítica: dedicamos 2-3 semanas a testar audiencias, creatividades y上山 plannings antes de escalar. Este proceso de validación cuesta entre 600€ y 1.500€ dependiendo del sector.
      </p>
    </section>

    <section>
      <h2>Estructura de inversión por embudo</h2>
      <p className="text-white/70 leading-relaxed mb-4">
        Una vez tienes presupuesto confirmado, la distribución por etapas del embudo marca la diferencia entre gastar y invertir. La estructura que usamos con clientes que escalan de forma sostenible:
      </p>

      <h3 className="text-lg font-bold mt-6 mb-3">Prospección (50-60% del presupuesto)</h3>
      <p className="text-white/70 leading-relaxed mb-4">
        Advantage+ Shopping Campaigns para descubrimiento de nuevos clientes. Dejamos que Meta encuentre personas similares a tus mejores compradores. El CPA objetivo aquí es mayor que en remarketing porque estás educando a nuevos usuarios, pero el lifetime value justifica la inversión. Si quieres entender cómo strukturamos estas campañas, mira nuestro caso de éxito con <Link to="/blog/estrategia-meta-ads-2026" className="text-white underline underline-offset-2 hover:text-white/80">estrategia full-funnel para D2C</Link>.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-3">Remarketing (30-40% del presupuesto)</h3>
      <p className="text-white/70 leading-relaxed mb-4">
        Usuarios que han visitado tu web, añadido al carrito o comprado antes. Aquí el CPA cae drásticamente porque ya conocen tu marca. Estructura en 3 niveles: visitors (7-30 días), cart abandoners (1-7 días), y past purchasers (30-90 días). Aprende más sobre <Link to="/blog/estrategia-remarketing-meta-2026" className="text-white underline underline-offset-2 hover:text-white/80">remarketing efectivo</Link> en nuestra guía específica.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-3">Brand Awareness (10% del presupuesto)</h3>
      <p className="text-white/70 leading-relaxed mb-5">
        Campañas de video in-stream para construir reconocimiento de marca. Especialmente útil en sectores con ciclos de decisión largos donde el cliente necesita varios touchpoints antes de comprar.
      </p>
    </section>

    <section>
      <h2>Calculadora de presupuesto mínimo</h2>
      <p className="text-white/70 leading-relaxed mb-4">
        Usa esta fórmula para calcular tu presupuesto mínimo viable:
      </p>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-5">
        <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Regla del 10x</p>
        <p className="font-mono text-white text-sm mb-3">Presupuesto mensual = CAC objetivo × 10</p>
        <p className="text-white/50 text-xs">Ejemplo: Si quieres CAC de 20€, invierte mínimo 200€/mes para que Meta tenga datos suficientes</p>
      </div>
      <p className="text-white/70 leading-relaxed mb-5">
        Esta regla no es arbitraria. Meta necesita aproximadamente 50 eventos de optimización por semana para aprender y estabilizar el algoritmo. Con un CPA medio de 20€, eso son 1.000€/semana = 4.000€/mes de gasto mínimo para operación estable.
      </p>
    </section>

    <section>
      <h2>Errores comunes con el presupuesto</h2>

      <h3 className="text-lg font-bold mt-6 mb-3">1. Fragmentar en demasiadas campañas</h3>
      <p className="text-white/70 leading-relaxed mb-4">
        Muy común en founders que quieren testar todo. Crear 10 campañas con 100€/mes cada una es garantía de fracaso: ninguna tiene suficientes datos para optimizar. Mejor 2-3 campañas con presupuesto concentrado.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-3">2. Reducir presupuesto cuando el ROAS baja</h3>
      <p className="text-white/70 leading-relaxed mb-4">
        El error más costoso. Cuando el ROAS baja, Meta está aprendiendo. Reducir presupuesto durante esta fase mata el proceso de aprendizaje. Mejor esperar 2-3 semanas y luego evaluar con datos completos. Entra en nuestro <Link to="/blog/que-es-roas-meta-ads" className="text-white underline underline-offset-2 hover:text-white/80">artículo sobre ROAS</Link> para entender mejor los ciclos de optimización.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-3">3. No separar test de scale</h3>
      <p className="text-white/70 leading-relaxed mb-5">
        La mayoría de cuentas que fracasan no separan el presupuesto de validación del presupuesto de escala. reserva un 20% para testar siempre, y el 80% restante en lo que ya está validado.
      </p>
    </section>

    <section>
      <h2>¿Cuándo escalar presupuesto?</h2>
      <p className="text-white/70 leading-relaxed mb-4">
        Subir presupuesto solo tiene sentido cuando se cumplen estas 3 condiciones:
      </p>
      <div className="space-y-3 mb-5">
        <div className="flex items-start gap-3">
          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold">✓</span>
          <p className="text-white/70">ROAS estable durante al menos 14 días consecutivos</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold">✓</span>
          <p className="text-white/70">Frecuencia entre 4-8 (no hay fatiga si es menor)</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold">✓</span>
          <p className="text-white/70">CPA dentro del target de unit economics</p>
        </div>
      </div>
      <p className="text-white/70 leading-relaxed mb-5">
        Cuando escales, hazlo de forma gradual: sube un 20% cada 3-5 días y监控 las métricas. Si el ROAS cae más de un 15%, rollback inmediato.
      </p>
    </section>

    <section>
      <h2>Conclusión</h2>
      <p className="text-white/70 leading-relaxed mb-4">
        No hay atajos con el presupuesto de Meta Ads. La inversión mínima viable para resultados significativos empieza en 1.000€/mes, pero el sweet spot para eCommerce D2C está entre 2.000€ y 5.000€/mes dependiendo del sector y objetivos.
      </p>
      <p className="text-white/70 leading-relaxed mb-5">
        La estructura de inversión importa tanto como el total: 50-60% en prospección, 30-40% en remarketing, y 10% en brand. Y sobre todo, ten paciencia: el algoritmo de Meta necesita tiempo para aprender. Si quieres que analicemos tu situación específica y te给 un presupuesto personalizado, <Link to="/?book=call" className="text-white underline underline-offset-2 hover:text-white/80">reserva una llamada de discovery</Link>.
      </p>
    </section>
  </BlogPostLayout>
);

export default BudgetMetaAdsPage;