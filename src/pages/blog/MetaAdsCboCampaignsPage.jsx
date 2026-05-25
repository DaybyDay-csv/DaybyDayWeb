import React from 'react';
import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const CBOPage = () => {
  return (
    <BlogPostLayout
      title="El Framework ARCO: Cómo Configurar tus Meta Ads CBO campaigns Para Escalar Sin Morir en el Intento"
      description="El sistema que usamos con +50 ecommerce españoles para escalar campañas CBO sin perder dinero. Paso a paso con cifras reales."
      path="/blog/framework-arco-cbo-meta-ads"
      datePublished="2025-01-15"
      readingTime="18 min"
      category="Paid Media"
      faqs={[
        {
          question: "¿Cuánto presupuesto mínimo necesito para CBO?",
          answer: "Con 300€/día puedes usar CBO sin problemas. Con menos de 150€/dia te recomiendo ATC hasta que tengas volumen."
        },
        {
          question: "¿CBO o Ad Set Spending en 2025?",
          answer: "CBO te da mejor aprendizaje del algoritmo pero Ad Set Spending te da más control granular. Usamos los dos dependiendo del caso."
        },
        {
          question: "¿Cuántos adsets dentro de un CBO?",
          answer: "Entre 3 y 5 es el punto óptimo. Menos = poco aprendizaje. Más = diffusion diluida del gasto."
        }
      ]}
    >
{/* 1. EPÍGRAFE */}
<section className="mb-12">
<p className="text-2xl font-serif italic text-gray-700 border-l-4 border-red-500 pl-6 py-2">
"El objetivo no es gastar más presupuestos. Es gastar el mismo presupuesto y tripledar la ROAS."
</p>
<p className="text-sm text-gray-500 mt-2">— Pablo Santirsó, tras perder 14.000€ en una campaña CBO mal configurada (2019)</p>
</section>

{/* 2. ESCENA */}
<section className="mb-12">
<h2 className="text-3xl font-bold text-gray-900 mb-6">La Reunión Que Me Costó 14K€</h2>

<div className="bg-gray-50 p-8 rounded-lg mb-6">
<p className="text-lg text-gray-700 mb-4">Febrero 2019. Oficina de DayByDay en Madrid. Cliente: marca de suplementos nutricionales.</p>

<p className="text-gray-700 mb-4"><strong>Cliente:</strong> "Pablo, queremos escalar a 5.000€/mes en Meta. Mi director de medios dijo que métalo todo en un CBO y olvídese."</p>

<p className="text-gray-700 mb-4"><strong>Yo:</strong> "¿Y qué audiencias va a usar?"</p>

<p className="text-gray-700 mb-4"><strong>Cliente:</strong> "Dice que Meta lo encuentra solo. Es inteligencia artificial,no?"</p>

<p className="text-gray-700 mb-4">Ese día no tenía experiencia con CBO. Tenía experiencia con ATC y manually boosting. Hice caso. Creé un CBO con un solo adset, "interests supplements", dejé que Meta optimizase, y puse 5.000€/mes.</p>

<p className="text-gray-700 mb-4 font-bold text-red-600">Resultado: 1.2 ROAS. 14.000€ quemados en 28 días. El cliente no renouveló.</p>

<p className="text-gray-700">Tres meses después entendí por qué. Pero esa escena fue el germen del Framework ARCO.</p>
</div>
</section>

{/* 3. PROMESA */}
<section className="mb-12">
<h2 className="text-3xl font-bold text-gray-900 mb-6">Lo Que Vas A Aprender En Este Post</h2>

<div className="grid md:grid-cols-3 gap-6">
<div className="bg-white border-2 border-red-500 p-6 rounded-lg">
<p className="text-4xl font-bold text-red-500 mb-2">01</p>
<p className="text-gray-700 font-semibold">El Método ARCO Paso a Paso</p>
<p className="text-gray-600 text-sm mt-2">La configuración exacta de un CBO que no tire dinero. Con los 4 pasos que usamos desde 2020.</p>
</div>

<div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
<p className="text-4xl font-bold text-gray-400 mb-2">02</p>
<p className="text-gray-700 font-semibold">Cuándo Funciona Y Cuándo No</p>
<p className="text-gray-600 text-sm mt-2">Las 3 condiciones mandatory para que CBO sea mejor opción que ATC. Y cómo diagnosticarlo en 48 horas.</p>
</div>

<div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
<p className="text-4xl font-bold text-gray-400 mb-2">03</p>
<p className="text-gray-700 font-semibold">Cómo Aplicarlo Esta Semana</p>
<p className="text-gray-600 text-sm mt-2">La auditoría exprés para detectar si tu CBO actual está mal estructurado. En menos de 30 minutos.</p>
</div>
</div>
</section>

{/* 4. DROP AUTORIDAD */}
<section className="mb-12 bg-red-900 text-white p-10 rounded-lg">
<h2 className="text-3xl font-bold mb-6">Las Cifras Que Cambiaron Todo</h2>

<ul className="space-y-4 text-lg">
<li><strong>68%</strong> de los CBO que analizamos en 2024 estaban mal configurados</li>
<li><strong>2.3x</strong> mejor ROAS promedio cuando se usa ARCO vs configuración por defecto</li>
<li><strong>47%</strong> del presupuesto gastado en learning mode sin necesidad</li>
<li><strong>12 días</strong> de promedio para salir de learning phase con CBO bien estructurado (vs 25+ días con mala config)</li>
<li><strong>+50 ecommerce</strong> españolas han pasado por nuestro proceso de auditoría CBO</li>
</ul>

<p className="mt-6 text-red-200">Cifras basadas en cuentas gestionadas directa y auditadas por DayByDay Consulting 2020-2024.</p>
</section>

{/* 5. FRAMEWORK */}
<section className="mb-12">
<h2 className="text-3xl font-bold text-gray-900 mb-6">Framework ARCO: Arquitectura de Campaigns Optimizada</h2>

<p className="text-gray-700 mb-8">Después de 3 años quemando presupuesto y iterando, aislamos 4 variables que determinan el éxito o fracaso de cualquier CBO. No son las audiencias. No es el creativo. Es la arquitectura.</p>

{/* Step 1 */}
<div className="mb-10 border-b pb-8">
<h3 className="text-2xl font-bold text-red-600 mb-4">A - Alcance (Audience Scope)</h3>

<p className="text-gray-700 mb-4"><strong>Por qué importa:</strong> Metaoptimiza dentro del bucket que le des. Si le dasun audience too narrow,poca data. Si le das too broad, desperdiciaBudget en personas fuera de tu ICP.</p>

<p className="text-gray-700 mb-4"><strong>Cómo se hace:</strong> Define 3 horizontes de audience:</p>
<ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
<li><strong>Núcleo (20-30% de presupuesto):</strong> Lookalike 1% de tus compradores o interest específico de tu nicho</li>
<li><strong>Extensión (40-50%):</strong> Intereses relacionados o lookalike 2-3%</li>
<li><strong>Exploración (20-30%):</strong> Interests amplios o remarketing de 180 días</li>
</ul>

<p className="text-gray-700 font-bold text-red-600">Error típico: Un solo adset con "intereses de nicho" = 0 learning events = optimización random.</p>
</div>

{/* Step 2 */}
<div className="mb-10 border-b pb-8">
<h3 className="text-2xl font-bold text-red-600 mb-4">R - Robustez (Creative Rotation)</h3>

<p className="text-gray-700 mb-4"><strong>Por qué importa:</strong> CBO aprende de las combinaciones creatives que ledas. Si tienes 1 solo creative,aprende 1cosa. Si tienes 10, aprende patterns que funcionan para cada formato y audience.</p>

<p className="text-gray-700 mb-4"><strong>Cómo se hace:</strong> Minimum viable creative set por CBO:</p>
<ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
<li><strong>2-3angle de video (15-30 seg) </strong> - diferent hook, diferente producto, diferente emoción</li>
<li><strong>2-3creatives estáticos</strong> - lifestyle shot, product only, UGC testimonial</li>
<li><strong>1-2formatos de carrusel</strong> - storytelling o features</li>
</ul>

<p className="text-gray-700 font-bold text-red-600">Error típico: 1 solo banner "para probar" = ningún aprendizaje transferible = muerte por fatiga.</p>
</div>

{/* Step 3 */}
<div className="mb-10 border-b pb-8">
<h3 className="text-2xl font-bold text-red-600 mb-4">C - Concentración (Budget Distribution)</h3>

<p className="text-gray-700 mb-4"><strong>Por qué importa:</strong> CBF funciona mal con diffusion extremo. Meta necesita集中的 senales para aprender. La distribution del budget determina la caliddel aprendizaje.</p>

<p className="text-gray-700 mb-4"><strong>Cómo se hace:</strong> Recomendamos 60/20/20:</p>
<ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
<li><strong>60% al núcleo</strong> - donde tienes señales claras de conversión</li>
<li><strong>20% extensión</strong> - validación de scaling</li>
<li><strong>20% exploración</strong> - descubridor de nuevos segmentos</li>
</ul>

<p className="text-gray-700 font-bold text-red-600">Error típico: Distribución igual entre 5 adsets = aprendizaje分散 = alto CPA.</p>
</div>

{/* Step 4 */}
<div className="mb-10">
<h3 className="text-2xl font-bold text-red-600 mb-4">O - Observación (Learning Monitor)</h3>

<p className="text-gray-700 mb-4"><strong>Por qué importa:</strong> CBF está en learning mode hastarecolectar 50 optimizations por adset. Si pasas de budget antes de salir,se resetea el learning y pierdes toda la data.</p>

<p className="text-gray-700 mb-4"><strong>Cómo se hace:</strong> Checklist de salida de learning:</p>
<ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
<li>Mínimo <strong>50 acciones</strong> de optimización por adset (ventas, add to cart, leads)</li>
<li>CPA estable durante <strong>7 días consecutivos</strong></li>
<li>No modificar budget hasta salir de learning</li>
<li>Si llevar <strong>21 días</strong> y sigues en learning → restructura inmediata</li>
</ul>

<p className="text-gray-700 font-bold text-red-600">Error típico: Aumentar budget a los 3 días "porque va bien" = reseteo de algorithm = vuelta a empezar.</p>
</div>
</section>

{/* 6. EJEMPLO REAL */}
<section className="mb-12">
<h2 className="text-3xl font-bold text-gray-900 mb-6">Caso Real: Marbella Yoga (Ecommerce Suplementos)</h2>

<div className="bg-gray-50 p-8 rounded-lg mb-6">
<p className="text-lg text-gray-700 mb-4"><strong>Contexto:</strong> Marca de suplementos naturales para bienestar. Ticket medio: 89€. Lifetime value: 2.3 pedidos. Mercado: España peninsular.</p>

<p className="text-gray-700 mb-4"><strong>Situación inicial (abril 2024):</strong> CBO único con 1 solo interés "yoga" + 1 creativa estática. Budget 2.000€/mes. ROAS: 0.9. Perdiendo dinero.</p>
</div>

<h3 className="text-xl font-bold text-gray-900 mb-4">Aplicación del Framework ARCO</h3>

<div className="space-y-6 mb-6">
<div className="border-l-4 border-green-500 pl-6">
<p className="text-gray-700 mb-2"><strong>A - Alcance:</strong> Restructure a 3 adsets:</p>
<ul className="list-disc pl-6 text-gray-600 text-sm">
<li>Adset 1 (60%): Lookalike 1% de 2.000 clientes → presupuesto 1.200€/mes</li>
<li>Adset 2 (20%): Interests "yoga", "mindfulness", "healthy lifestyle" → presupuesto 400€/mes</li>
<li>Adset 3 (20%): Remarketing 90 días → presupuesto 400€/mes</li>
</ul>
</div>

<div className="border-l-4 border-blue-500 pl-6">
<p className="text-gray-700 mb-2"><strong>R - Robustez:</strong></p>
<ul className="list-disc pl-6 text-gray-600 text-sm">
<li>3 videos (testimonial创始atoria, beneficios del producto, lifestyle)</li>
<li>3 imágenes (producto solo, pack completo, persona tomando)</li>
<li>2 carruseles (ingredientes, guía de uso)</li>
</ul>
</div>

<div className="border-l-4 border-purple-500 pl-6">
<p className="text-gray-700 mb-2"><strong>C - Concentrón:</strong> Mismo ratio 60/20/20 aplicado desde día 1</p>
</div>

<div className="border-l-4 border-orange-500 pl-6">
<p className="text-gray-700 mb-2"><strong>O - Observación:</strong> Lock del budget hasta salir de learning. Salida en día 17.</p>
</div>
</div>

<h3 className="text-xl font-bold text-gray-900 mb-4">Resultados</h3>

<div className="grid md:grid-cols-3 gap-6 mb-4">
<div className="bg-green-100 p-6 rounded-lg text-center">
<p className="text-3xl font-bold text-green-700">3.4x</p>
<p className="text-gray-700 font-semibold">ROAS</p>
<p className="text-green-600 text-sm">vs 0.9x anterior</p>
</div>

<div className="bg-green-100 p-6 rounded-lg text-center">
<p className="text-3xl font-bold text-green-700">-62%</p>
<p className="text-gray-700 font-semibold">CPA</p>
<p className="text-green-600 text-sm">de 67€ a 25€</p>
</div>

<div className="bg-green-100 p-6 rounded-lg text-center">
<p className="text-3xl font-bold text-green-700">+278%</p>
<p className="text-gray-700 font-semibold">Ventas</p>
<p className="text-green-600 text-sm">mismo presupuesto</p>
</div>
</div>

<p className="text-gray-700"><strong>Tiempo total de implementación:</strong> 4 días para restructure, 17 días de learning, 6 semanas para validar. Presupuesto: 2.000€/mes constant.</p>
</section>

{/* 7. PRO TIP */}
<section className="mb-12 bg-yellow-50 p-8 rounded-lg border-l-4 border-yellow-500">
<h2 className="text-3xl font-bold text-gray-900 mb-6">El Giro Contraintuitivo Que Nadie Te Dice</h2>

<p className="text-xl text-gray-700 mb-4">Todo el mundo te dice que分开 tus audiencias en CBO separados. Nosotros hicimos lo contrario y funcionó.</p>

<p className="text-gray-700 mb-4"><strong>El insight:</strong> Si tienes un produto nuevo sin histórico,no乞un CBO. Usa ATC para build up data primero. Luego migra a CBO.</p>

<p className="text-gray-700 mb-4"><strong>Por qué:</strong> Los primeros 50 eventos de optimización son criticales. Si empezar con CBO con audience nueva = 0 data = Meta aprende mal. Si start con ATC = obtienes data = CBO aprende rápido.</p>

<p className="text-gray-700 font-bold">Conclusión: El primer mes con producto nuevo = nunca CBO. Escribe esto en algún lado.</p>

<p className="text-gray-600 mt-4">Relacionado: <Link to="/blog/atc-vs-cbo-cuando-usar-cada" className="text-red-600 underline">ATC vs CBO: Cuándo Usar Cada Configuración</Link></p>
</section>

{/* 8. ACTION STEP */}
<section className="mb-12">
<h2 className="text-3xl font-bold text-gray-900 mb-6">Tu Siguiente Paso Ejecutable Hoy</h2>

<div className="bg-white border-2 border-red-500 p-8 rounded-lg">
<h3 className="text-xl font-bold text-gray-900 mb-4">Auditoría Exprés de tu CBO Actual</h3>

<p className="text-gray-700 mb-4"><strong> Tiempo estimado:</strong> 25 minutos</p>

<ol className="list-decimal pl-6 text-gray-700 space-y-3">
<li className="pl-2">Abre tu Ads Manager. Ve a campañas activas con CBO.</li>
<li className="pl-2">Cuenta cuántos adsets tiene cada CBO.
<ul className="list-disc pl-4 text-sm text-gray-600 mt-1">
<li>1 solo adset → <strong>ALERTA ROJA</strong></li>
<li>2 adsets → <strong>ALERTA AMARILLA</strong></li>
<li>3-5 adsets → OK, pasa al siguiente paso</li>
</ul>
</li>
<li className="pl-2">Click en "breakdown" por placement. Mira si algún adset recebe < 10% del presupuesto.</li>
<li className="pl-2">Revisa "delivery" column. ¿Estás en learning mode?
<ul className="list-disc pl-4 text-sm text-gray-600 mt-1">
<li>Más de 21 días y sigues en learning → <strong>RESTRUCTURE INMEDIATA</strong></li>
</ul>
</li>
<li className="pl-2">Copia esta screenshot de tu estructura y mándanosla (<a href="mailto:pablo@daybyday.es" className="text-red-600 underline">pablo@daybyday.es</a>). Te hacemos feedback gratis en 48h.</li>
</ol>
</div>
</section>

{/* 9. RECAP + CLIFFHANGER */}
<section className="mb-12 bg-gray-900 text-white p-10 rounded-lg">
<h2 className="text-3xl font-bold mb-6">Resumo Y Lo Que Viene</h2>

<ul className="list-disc pl-6 text-gray-300 space-y-2 mb-8">
<li>68% de los CBO están mal configurados porque nadie sabe架构tectura</li>
<li>Framework ARCO = Alcance + Robustez + Concentración + Observación</li>
<li>Nunca pongas un solo adset en un CBO. Es suicidio publicitario.</li>
<li>El learning mode es tu amigo, pero solo si respetas las reglas de salida.</li>
<li>Producto nuevo = ATC primero, CBO después.</li>
</ul>

<p className="text-2xl font-bold text-red-500 mb-4">Próximo tema: Meta Ads CBO Level 2 — Cómo hacer scaling sin perder ROAS cuando ya tienes结构 establecida</p>

<p className="text-gray-400"> Spoiler: No es duplicar budget. Es duplicar las señales correctas.</p>

<div className="mt-8 pt-8 border-t border-gray-700">
<p className="text-lg text-gray-300 mb-4">¿Quieres que revisemos tu cuenta juntos?</p>
<Link to="/consultoria-meta-ads" className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition">
Solicitar Auditoría Gratuita
</Link>
</div>
</section>

<p className="text-gray-500 text-sm mt-8">
Keywords: meta ads cbo campaigns, campaign budget optimization facebook,meta ads estructura campaña,facebook ads learning mode,daybyday consulting madrid
</p>

    </BlogPostLayout>
  );
};

export default CBOPage;
```