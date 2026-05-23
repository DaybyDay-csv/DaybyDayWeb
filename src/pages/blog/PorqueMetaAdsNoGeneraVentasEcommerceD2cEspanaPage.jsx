import BlogPostLayout from "../../components/BlogPostLayout";
import relatedPostsData from "../../data/relatedPosts";

// CONFIGURABLE: 3 FAQs
const faqs = [
  {
    q: "¿Cómo sé si mi píxel de Meta está funcionando correctamente?",
    a: "Revisa el Event Match Quality (EMQ) en Events Manager → tu cuenta → Data Quality. El objetivo es un score EMQ ≥ 7. Si está por debajo, implementa CAPI server-side y asegúrate de enviar identificadores válidos (email hasheado, teléfono, nombre completo)."
  },
  {
    q: "¿Cuánto tiempo tardan en verse resultados con Meta Ads?",
    a: "Los primeros 7-14 días son de aprendizaje. Meta necesita entre 50-100 conversiones por conjunto de anuncios para salir del modo 'aprendizaje' y optimizar efectivamente. No tomes decisiones hasteadas antes de llegar a ese umbral."
  },
  {
    q: "¿Cuál es el presupuesto mínimo para Meta Ads en España?",
    a: "Recomendamos mínimo 50€/día para prospecting (1.500€/mes) para que Meta tenga suficiente señal para aprender. Con menos presupuesto, los costos por conversión suben porque hay menos competencia por las subastas."
  }
];

// CONFIGURABLE: Related posts (slugs from blog) - safely handle if data is not array
const relatedPosts = Array.isArray(relatedPostsData) ? relatedPostsData.filter(post => 
  ["como-mejorar-roas-meta-ads", "estado-paid-media-d2c-espana-2026", "por-que-anuncios-meta-no-convierten"].includes(post.slug)
) : [];

// CONFIGURABLE: Metadata
export const metadata = {
  title: "Por qué tu ecommerce D2C en España no genera ventas con Meta Ads (y cómo solucionarlo)",
  description: "Guía práctica para diagnosticar por qué tu campaña de Meta Ads no convierte en ecommerce D2C español: errores comunes de configuración, fallos en audience, problemas de creatividades, y solución paso a paso para mejorar ROAS.",
  keywords: "meta ads ecommerce españa, meta ads no genera ventas, problemas meta ads d2c, como mejorar roas meta ads, errores meta ads ecommerce",
  slug: "porque-meta-ads-no-genera-ventas-ecommerce-d2c-espania",
  published: "2026-05-22",
  modified: "2026-05-22"
};

export default function PorQueMetaAdsNoGeneraVentasPage({ openCalendly }) {
  return (
    <BlogPostLayout {...metadata} relatedPosts={relatedPosts}>
      {/* HOOK: 1 línea impactante */}
      <p className="text-xl text-white/90 leading-relaxed mb-8">
        Si estás gastando en Meta Ads y no vendes, el problema casi nunca es Meta. Es uno de estos 8 errores — y todos tienen solución.
      </p>

      {/* 8 ERRORES COMUNES */}
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">LOS 8 ERRORES QUE MATAN TUS CAMPAÑAS</h2>
      
      <div className="space-y-6">
        {/* Error 1 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">1. Píxel defectuoso sin CAPI server-side</h3>
          <p className="text-white/70 mb-3">El error más crítico. Sin CAPI correcto, Meta no puede optimizar hacia conversiones reales — da igual el mejor copy.</p>
          <ul className="text-white/60 text-sm space-y-1">
            <li>• Revisa EMQ en Events Manager → Data Quality → Event Match Quality Score</li>
            <li>• Implementa CAPI server-side para mejorar EMQ significativamente</li>
            <li>• EMQ objetivo: ≥ 7 antes de escalar budget</li>
          </ul>
        </div>

        {/* Error 2 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">2. Audiencias demasiado amplias o irrelevantes</h3>
          <p className="text-white/70 mb-3">Interest generic ('moda', 'ecommerce') = millones de personas saturadas de anuncios.</p>
          <ul className="text-white/60 text-sm space-y-1">
            <li>• Custom Audiences: compradores últimos 90-180 días</li>
            <li>• Listas de email de clientes (subir a Meta si tienes &gt;1.000)</li>
            <li>• Lookalike 1-3% basado en mejores compradores por LTV</li>
            <li>• Audiencias de engagement en Instagram (365 días)</li>
          </ul>
        </div>

        {/* Error 3 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">3. Creatividades que no comunican valor</h3>
          <p className="text-white/70 mb-3">Fotos del producto + marca no bastan. Tienes 2 segundos para destacar.</p>
          <ul className="text-white/60 text-sm space-y-1">
            <li>• Marco Problema-Solución: muestra el problema que resuelves</li>
            <li>• Prueba social: reviews, testimonios, menciones en medios</li>
            <li>• Urgencia: stock limitado, oferta temporal</li>
            <li>• Beneficio claro vs. característica del producto</li>
          </ul>
        </div>

        {/* Error 4 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">4. Copy irrelevante para el mercado español</h3>
          <p className="text-white/70 mb-3">Los compradores españoles tienen objeciones específicas. traducciones del inglés no funcionan.</p>
          <ul className="text-white/60 text-sm space-y-1">
            <li>• Envío gratis a partir de X€ (ej. 50€)</li>
            <li>• Política de devolución clara (30 días, sin preguntas)</li>
            <li>• Atención al cliente en español</li>
            <li>• Entrega 24-72h en España</li>
          </ul>
        </div>

        {/* Error 5 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">5. Estructura de campañas incorrecta</h3>
          <p className="text-white/70 mb-3">Meter todo en una campaña妨碍 la optimización por etapa del funnel.</p>
          <ul className="text-white/60 text-sm space-y-1">
            <li>• Separar prospecting de retargeting</li>
            <li>• Presupuesto independiente por etapa del funnel</li>
            <li>• Bidding diferenciado por objetivo</li>
            <li>• Advantage+ para prospecting automático</li>
          </ul>
        </div>

        {/* Error 6 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">6. Fallos en seguimiento de conversiones</h3>
          <p className="text-white/70 mb-3">Lo que Meta reporta ≠ conversiones reales en tu plataforma.</p>
          <ul className="text-white/60 text-sm space-y-1">
            <li>• Compara purchases plataforma vs. Meta en mismo período</li>
            <li>• Usa 'Test Events' tool para validar Purchase</li>
            <li>• Discrepancia aceptable: ≤ 10-15%</li>
          </ul>
        </div>

        {/* Error 7 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">7. No testear creatividades ni audiencias</h3>
          <p className="text-white/70 mb-3">Activos estáticos = rendimiento degrade con el tiempo.</p>
          <ul className="text-white/60 text-sm space-y-1">
            <li>• Testea 3-5 creatividades nuevas por semana</li>
            <li>• Threshold: CTR &gt; 1.5% + Purchase Rate &gt; 2%</li>
            <li>• Descartar en 48-72 horas si no rendiran</li>
          </ul>
        </div>

        {/* Error 8 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">8. Bidding strategy inadecuada</h3>
          <p className="text-white/70 mb-3">Bidding mal elegido =money tirado.</p>
          <ul className="text-white/60 text-sm space-y-1">
            <li>•新規: Lower Cost (sin cap) primero</li>
            <li>• Escalando: Highest Volume con cap de costo</li>
            <li>• Valor alto: Target Cost con ROAS objetivo</li>
          </ul>
        </div>
      </div>

      {/* ACCIÓN INMEDIATA */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-4">CÓMO DIAGNOSTICAR TU CUENTA</h2>
      <div className="bg-white/5 rounded-lg p-4">
        <p className="text-white/70 mb-4">Audit rápido en 15 minutos:</p>
        <ol className="text-white/60 space-y-2">
          <li><strong className="text-white">1.</strong> Revisa EMQ en Events Manager (obj. ≥ 7)</li>
          <li><strong className="text-white">2.</strong> Custom Audiences &gt; interest broad (obj. ratio 70/30)</li>
          <li><strong className="text-white">3.</strong> Mide discrepancia Purchase: tu plataforma vs. Meta</li>
          <li><strong className="text-white">4.</strong> Cuenta creatividades ultime90 días (obj. ≥ 20)</li>
        </ol>
      </div>

      {/* FAQ */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-4">PREGUNTAS FRECUENTES</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
            <p className="text-white/70">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-4">¿LISTO PARA MEJORAR TUS RESULTADOS?</h3>
        <p className="text-white/80 mb-4">Auditamos tu cuenta gratis. Sin compromiso.</p>
        <button 
          onClick={openCalendly}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition"
        >
          AGENDAR AUDITORÍA
        </button>
      </div>
    </BlogPostLayout>
  );
}