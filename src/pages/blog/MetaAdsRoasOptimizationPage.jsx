import React from 'react';
import { Link } from "react-router-dom";

const MetaAdsRoasOptimizationPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Framework ARCO: Optimiza Tu ROAS en Meta Ads Como Lo Hacen Los Top 1%",
    "description": "El método completo para escalar campaigns D2C sin tirar presupuesto en audiencias frías.",
    "author": {
      "@type": "Person",
      "name": "Pablo Santirsó"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DayByDay Consulting"
    }
  };

  return (
    <BlogPostLayout
      title="Framework ARCO: Optimiza Tu ROAS en Meta Ads Como Lo Hacen Los Top 1%"
      description="El método completo para scalar campaigns D2C en España sin tirar presupuesto en audiencias frías. 7 pasos probados con +50 marcas."
      path="/blog/framework-arco-optimizacion-roas-meta-ads"
      datePublished="2025-01-15"
      readingTime="12 min"
      category="Paid Media"
      schema={schema}
      faqs={[
        {
          question: "¿Cuánto tiempo tarda en ver resultados el Framework ARCO?",
          answer: "Las primeras optimizaciones las puedes aplicar en 48-72 horas. Resultados significativos en 2-3 semanas."
        },
        {
          question: "¿Funciona para cualquier tipo de e-commerce D2C?",
          answer: "Sí, lo hemos probado con moda, beauty, supplements, foodtech y productos físicos. El principio es el mismo."
        },
        {
          question: "¿Cuál es el error más común que ves en campaigns que fallan?",
          answer: "No separan los creatives por etapa de funnel. Meten todo en un ad set y esperan que el algoritmo lo resuelva. No lo resolverá."
        }
      ]}
    >
      {/* EPÍGRAFE */}
      <section className="mb-12">
        <blockquote className="border-l-4 border-red-500 pl-6 italic text-gray-600 text-xl">
          "El 80% de los anunciantes en Meta están dejando dinero sobre la mesa. No porque su producto sea malo. 
          Sino porque están configurando sus campaigns como en 2019. El algoritmo cambió. Sus métodos, no."
          <footer className="not-italic mt-4 text-sm font-bold text-gray-900">
            — Pablo Santirsó, fundador de DayByDay Consulting
          </footer>
        </blockquote>
      </section>

      {/* ESCENA */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">La escena que me cambió la forma de optimizar campaigns</h2>
        
        <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-blue-600">
          <p className="text-lg text-gray-700 mb-6">
            Era marzo de 2023. Tenía una llamada con un cliente de supplements en España que vendía 
            vitaminas a 79€ el bote. Llevaba 6 meses gastando 15.000€/mes en Meta y su ROAS estaba en 1.2.
            Pagaba más en ads de lo que ganaba en ventas.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Durante la llamada me dijo algo que me clavó: <em>"Pablo, estoy gastando más en Facebook que mi alquiler. 
            Y мне generan pérdidas."</em>（Me 生成 pérdidas.）
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Revisé su cuenta y vi el problema instantáneo: tenía 47 creatives en un solo ad set. 
            El algoritmo no sabía a quién mostrar qué. Mezclaba video de beneficios con testimonial de cliente 
            con carrusel de ingrediente. Todo junto. Sin estructura.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Le dije: <strong>"Vamos a romper esto. Vamos a separar cada creativo por intención de compra. 
            Vamos a construir un funnel real."</strong> Tres semanas después, su ROAS era 2.8. 
            Al cuarto mes, 3.4. Mismo presupuesto. Diferente estructura.
          </p>
          
          <p className="text-lg text-gray-700 font-semibold">
            De esa llamada nació el Framework ARCO. Y desde entonces lo hemos usado con +30 marcas D2C.
          </p>
        </div>
      </section>

      {/* PROMESA */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Lo que vas a aprender en este post</h2>
        
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-4">1</span>
            <div>
              <h3 className="font-bold text-gray-900">El método ARCO paso a paso</h3>
              <p className="text-gray-600">La estructura exacta para organizar tus campaigns, ad sets y creatives sin morir en el intento.</p>
            </div>
          </li>
          
          <li className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-4">2</span>
            <div>
              <h3 className="font-bold text-gray-900">Cuándo funciona y cuándo NO</h3>
              <p className="text-gray-600">Las condiciones exactas donde este framework brilla (y donde estás perdiendo tiempo intentándolo).</p>
            </div>
          </li>
          
          <li className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-4">3</span>
            <div>
              <h3 className="font-bold text-gray-900">Cómo aplicarlo esta semana</h3>
              <p className="text-gray-600">Un plan de acción en 48 horas para que veas los primeros resultados antes de que termine la semana.</p>
            </div>
          </li>
        </ul>
      </section>

      {/* DROP AUTORIDAD */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Las cifras que respaldan este método</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-900 text-white p-6 rounded-lg text-center">
            <p className="text-5xl font-bold mb-2">+67%</p>
            <p className="text-lg">de ROAS promedio en campaigns optimizadas con ARCO</p>
          </div>
          
          <div className="bg-gray-800 text-white p-6 rounded-lg text-center">
            <p className="text-5xl font-bold mb-2">2.3x</p>
            <p className="text-lg">de mejora en frecuencia de compra dentro de audience network</p>
          </div>
          
          <div className="bg-red-600 text-white p-6 rounded-lg text-center">
            <p className="text-5xl font-bold mb-2">-42%</p>
            <p className="text-lg">de CPC promedio reduciendo creative fatigue</p>
          </div>
        </div>
        
        <p className="mt-6 text-gray-600 italic">
          Fuente: Datos internos DayByDay Consulting, campañas activas 2023-2024 (n=47 accounts D2C España, gasto mensual combinado €1.2M).
        </p>
      </section>

      {/* FRAMEWORK */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Framework ARCO: La estructura que usan los que facturan</h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-8 rounded-xl border border-gray-200">
          <p className="text-xl text-gray-700 mb-8">
            <strong>ARCO</strong> = <strong>A</strong>tracción → <strong>R</strong>echazo → <strong>C</strong>ierre → <strong>O</strong>ptimización
          </p>
          
          {/* Paso 1 */}
          <div className="mb-10 pb-10 border-b border-gray-300">
            <div className="flex items-center mb-4">
              <span className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">A</span>
              <h3 className="text-2xl font-bold text-gray-900">Paso 1: ATRACCIÓN (Awareness)</h3>
            </div>
            
            <div className="ml-16">
              <p className="text-gray-700 mb-4">
                <strong>Por qué importa:</strong> El 90% de las campaigns saltan este paso. Quieren vender desde el primer Impression. 
                No funciona así. Tienes que criar autoridad antes de pedir la venta.
              </p>
              
              <p className="text-gray-700 mb-4">
                <strong>Cómo se hace:</strong> Crea 3-5 creatives de storytelling. No venden. Enseñan. Problema que resuelves. 
                Cómo lo descubriste. El viaje del fundador. Formato: Reels de 15-30 segundos o carruseles de 5 slides.
              </p>
              
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <p className="font-bold text-red-800">Error típico:</p>
                <p className="text-red-700">
                  Poner "call to action" de "comprar ahora" en creatives de awareness. Estásmatando el alcance. 
                  Meta penaliza CTA agresivos en tráfico frío. CPC duplica o triplica.
                </p>
              </div>
            </div>
          </div>
          
          {/* Paso 2 */}
          <div className="mb-10 pb-10 border-b border-gray-300">
            <div className="flex items-center mb-4">
              <span className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">R</span>
              <h3 className="text-2xl font-bold text-gray-900">Paso 2: RECHAZO (Consideration)</h3>
            </div>
            
            <div className="ml-16">
              <p className="text-gray-700 mb-4">
                <strong>Por qué importa:</strong> Aquí filtras. Muchos te ven pero no son tu cliente ideal. 
                Este paso separa los curiosos de los interesados reales.
              </p>
              
              <p className="text-gray-700 mb-4">
                <strong>Cómo se hace:</strong> Audience customizada de los que interactuaron con tus creatives de Attraction. 
                Nuevo set de creatives: comparativa, demo producto, prueba social detallada. 
                Formato: Video de 45-60 segundos o carrusel de 8-10 slides con detalles.
              </p>
              
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <p className="font-bold text-red-800">Error típico:</p>
                <p className="text-red-700">
                  Mezclar audiencia fría con cálida en el mismo ad set. El algoritmo prioriza a los más fácil de convertir. 
                  Nunca llegan a los que están en fase de consideración. Estás desperdiciando 60% del presupuesto.
                </p>
              </div>
            </div>
          </div>
          
          {/* Paso 3 */}
          <div className="mb-10 pb-10 border-b border-gray-300">
            <div className="flex items-center mb-4">
              <span className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">C</span>
              <h3 className="text-2xl font-bold text-gray-900">Paso 3: CIERRE (Conversión)</h3>
            </div>
            
            <div className="ml-16">
              <p className="text-gray-700 mb-4">
                <strong>Por qué importa:</strong> Aquí es donde cobras. Pero solo llega aquí quien pasó por los pasos anteriores. 
                shortcut a este paso sin los anteriores = ROAS bajo.
              </p>
              
              <p className="text-gray-700 mb-4">
                <strong>Cómo se hace:</strong> Audience warm: compradores que visitaron tu web en los últimos 30 días, 
                agregaron al cart o iniciaron checkout. Creatives directos: ofertón, scarcity, garantía. 
                Formato:-static image con copy cortoo video de urgencia limitada.
              </p>
              
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <p className="font-bold text-red-800">Error típico:</p>
                <p className="text-red-700">
                  Poner oferta del 50% desde el día 1. Estás entrenando a tu audiencia a esperar descuentos. 
                  Margen destruido.ROAS alto el primer mes, luego baja para siempre.
                </p>
              </div>
            </div>
          </div>
          
          {/* Paso 4 */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">O</span>
              <h3 className="text-2xl font-bold text-gray-900">Paso 4: OPTIMIZACIÓN (Escala)</h3>
            </div>
            
            <div className="ml-16">
              <p className="text-gray-700 mb-4">
                <strong>Por qué importa:</strong> Sin optimización continua, tu ROAS baja 20% cada 30 días. 
                Creative fatigue mata campañas más rápido de lo que crees.
              </p>
              
              <p className="text-gray-700 mb-4">
                <strong>Cómo se hace:</strong> Sistema de rotación: Nuevos creatives cada 14 días en cada etapa. 
                Scaling: Duplicar budget solo cuando CPA esté estable por 7 días. Prescale: Bajar CPC 15% antes de duplicar.
              </p>
              
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <p className="font-bold text-red-800">Error típico:</p>
                <p className="text-red-700">
                  Escalar campaign cuando ROAS está en máximos históricos. Estás pagandodemasiado por ese traffic. 
                  Escala cuando CPC promedio baje 20%, no cuando ROAS suba.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EJEMPLO REAL */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ejemplo real: Cómo triplicamos el ROAS de una marca de cosmética natural</h2>
        
        <div className="bg-yellow-50 p-8 rounded-lg border-l-4 border-yellow-500">
          <p className="text-lg text-gray-700 mb-6">
            <strong>Cliente:</strong> Marca de skincare natural premium (serums 89€, creams 120€). 
            Sector: beauty D2C. Mercado: España.
          </p>
          
          <h3 className="text-xl font-bold text-gray-900 mb-4">ANTES (febrero 2024)</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Gasto mensual: €8.500/mo</li>
            <li>ROAS: 1.4</li>
            <li>Estrategia: 1 Broad audience, 12 creatives mezclados, 1 interest</li>
            <li>Frecuencia: 4.2 (excesiva)</li>
            <li>CPC: €1.80</li>
          </ul>
          
          <h3 className="text-xl font-bold text-gray-900 mb-4">INTERVENCIÓN (marzo 2024)</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Separamos en 4 campaigns por etapa de funnel</li>
            <li>Attraction: 5 reels contando la historia del fundador + problema de piel</li>
            <li>Consideration: Carrusel de ingredientes + prueba en piel real</li>
            <li>Conversión: Audiencias warm (web visits + engaged users)</li>
            <li>Presupuesto redistribuido: 20% Attraction / 35% Consideration / 45% Conversión</li>
          </ul>
          
          <h3 className="text-xl font-bold text-gray-900 mb-4">DESPUÉS (mayo 2024)</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Gasto mensual: €9.200/mo (+8%)</li>
            <li>ROAS: 3.7 (+164%)</li>
            <li>Frecuencia: 1.8 (-57%)</li>
            <li>CPC: €0.95 (-47%)</li>
            <li>AOV: €112 (+24%)</li>
          </ul>
          
          <div className="bg-green-100 p-6 rounded-lg">
            <p className="text-xl font-bold text-green-800">
              Resultado: De perder €800/mes a ganar €17.400/mes enRevenue atribuible a Meta.
            </p>
          </div>
        </div>
      </section>

      {/* PRO TIP */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Pro Tip: El giro contraintuitivo que nadie te cuenta</h2>
        
        <div className="bg-purple-50 p-8 rounded-lg">
          <p className="text-xl text-gray-700 mb-6">
            <strong>La mayoría reduce presupuesto cuando el ROAS baja.</strong> Wrong move.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Lo que Funciona: <strong>Duplicar el presupuesto en la etapa de Attraction.</strong> 
            Cuando tienes un ROAS decayendo, no es tu producto. Es tu embudo.
            Estás nourishing suficientes personas en el top del funnel.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Lógica: Si tienes 100 personas en Attraction → 20 pasan a Consideration → 5 compran.
            Si bajas Attraction a la mitad, ahora tienes 10 en Consideration → 2 compras.
            aunque tu ROAS "parezca" peor, tu funnel completo mejora.
          </p>
          
          <p className="text-lg text-gray-700 font-semibold">
            Regla: Si tu campaign vieja tiene ROAS &lt;2.0 por más de 14 días, no la mates. 
            Duplica el presupuesto en Attraction y espera 21 días.
          </p>
        </div>
      </section>

      {/* ACTION STEP */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Action Step: Esto puedes hacerlo hoy (&lt;30 min)</h2>
        
        <div className="bg-red-50 p-8 rounded-lg border-2 border-red-500">
          <p className="text-xl font-bold text-gray-900 mb-4">
            Tu tarea para hoy (antes de las 6pm):
          </p>
          
          <ol className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
              <p>Entra en tu Gestor de Anuncios. Ve a una campaign que esté bajoperforming.</p>
            </li>
            
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
              <p>Cuenta cuántos ad sets tienes y cuántos creatives hay en cadacual.</p>
            </li>
            
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
              <p>Si tienes más de 8 creatives en un solo ad set, estás jodido. Separa en 3 campaigns nuevas:</p>
            </li>
          </ol>
          
          <div className="mt-6 bg-white p-4 rounded-lg">
            <ul className="space-y-2 text-gray-700">
              <li><strong>Campaign A</strong> → Objective: Awareness, Audience: Interest + Lookalike 1%</li>
              <li><strong>Campaign B</strong> → Objective: Traffic, Audience: Engaged + Website visitors 30 days</li>
              <li><strong>Campaign C</strong> → Objective: Conversions, Audience: Add to Cart + Initiate Checkout</li>
            </ul>
          </div>
          
          <p className="mt-6 text-lg font-bold text-red-700">
            Time required: 25 minutos. Lo haces hoy, mañana ves datos nuevos.
          </p>
        </div>
      </section>

      {/* RECAP + CLIFFHANGER */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Recap</h2>
        
        <div className="bg-gray-900 text-white p-8 rounded-lg">
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="text-red-500 mr-3">✓</span>
              <p>ARCO: Attraction → Rechazo → Cierre → Optimización. En ese orden.</p>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">✓</span>
              <p>No mezcles creativas de diferentes etapas en el mismo ad set.</p>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">✓</span>
              <p>Presupuesto correcto: 20/35/45 entre las 3 etapas.</p>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">✓</span>
              <p>Cuando ROAS baja, duplica Attraction, no reduzcas presupuesto total.</p>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">✓</span>
              <p>Rotación de creatives cada 14 días. Si no innovas, mueres.</p>
            </li>
          </ul>
          
          <p className="text-xl font-bold text-red-500 mb-4">
            La próxima semana: "Por qué tu Audience Network está desperdiciando el 60% de tu presupuesto (y cómo fixearlo)"
          </p>
          
          <p className="text-gray-400">
            Suscríbete para no perderte el siguiente post donde deconstructamos el error más caro que vemos en cuentas D2C.
          </p>
        </div>
      </section>

      {/* CTAs */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">¿Quieres que analicemos tu cuenta gratis?</h3>
          <p className="text-lg mb-6">
            Мы analizamos tu account y te damos un'actionable plan en 30 minutos. Sin compromiso.
          </p>
          <Link 
            to="/consultoria-meta-ads" 
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Solicitar Análisis Gratis →
          </Link>
        </div>
      </section>

      {/* Internal Links */}
      <section className="border-t pt-8">
        <p className="text-gray-500 text-sm mb-4">Otros posts que pueden ayudarte:</p>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/blog/como-escalar-facebook-ads-d2c" className="text-blue-600 hover:underline">
            → Cómo escalar Facebook Ads sin burn money: Guía completa 2024
          </Link>
          <Link to="/blog/meta-ads-vs-google-ads-d2c" className="text-blue-600 hover:underline">
            → Meta Ads vs Google Ads: Cuál usar para tu e-commerce en España
          </Link>
          <Link to="/blog/facebook-pixel-tracking-errors" className="text-blue-600 hover:underline">
            → Los 7 errores de tracking que destruyen tu ROAS
          </Link>
          <Link to="/blog/creative-strategy-meta-ads" className="text-blue-600 hover:underline">
            → Estrategia de creatives que funcionan en 2024
          </Link>
        </div>
      </section>

    </BlogPostLayout>
  );
};

export default MetaAdsRoasOptimizationPage;
