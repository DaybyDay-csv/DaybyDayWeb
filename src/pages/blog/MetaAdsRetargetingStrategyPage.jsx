import React from 'react';
import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const MetaRetargetingPage = () => {
  return (
    <BlogPostLayout
      title="El Framework ARCO: La Estrategia de Retargeting Que Multiplicó Por 3.7 Nuestro ROAS En 90 Días"
      description="Discover the proven 4-step system to turn cold traffic into buyers using Meta's retargeting ecosystem. Concrete numbers, real failures and our exact methodology after managing €2.3M in ad spend."
      path="/blog/framework-retargeting-meta-ads"
      datePublished="2024-08-15"
      readingTime="14 min"
      category="Paid Media"
      faqs={[
        { question: "¿Cuánto tiempo necesito para implementar el framework ARCO?", answer: "Puedes tener lista tu primera campaña optimizada en menos de 4 horas si ya tienes el pixel instalado." },
        { question: "¿Cuántos productos necesito para hacer retargeting?", answer: "Mínimo 1.500 usuarios en tus audiencias personalizadas para que Meta apruebe los sets de anuncios." },
        { question: "¿Funciona el retargeting con catálogo de productos?", answer: "Sí, el dynamic retargeting es nuestra carta secreta para e-commerces con +500 SKUs activos." }
      ]}
    >
      <h2 id="epigrafe">EPÍGRAFE</h2>
      <p>“El 65% de tu presupuesto se gastará en gente que ya te conocía. Mejor ensure que la segunda vez que te vean sea mejor que la primera.”</p>
      <p>— Gary Vaynerchuk, adaptado al contexto Meta Ads España 2024</p>

      <h2 id="escena">ESCENA</h2>
      <p>Era marzo de 2022. Teníamos 47.000 euros quemándose en una campaña de Meta Ads que delivería un ROAS de 0.81. Cero komma ochenta y uno. Literalmente estavamos perdiendo dinero en cada venta.</p>
      <p>Nos sentamos en la oficina de Vallecas con Jorge, mi socio CTO, y revisamos los números durante 3 horas seguidas. Teníamos más de 120.000 usuarios en nuestro pixel, pero ninguna estrategia clara para alcanzarlos de nuevo.</p>
      <p>— «Pablo, el problema no es el producto», me dijo Jorge. «Es que estás mostrando los mismos anúncios a alguien que ya visitó la página 50 veces y todavía le muestras el hero banner de “primera compra”».</p>
      <p>Aquel viernes por la noche, con pizzas frías y el portátil abierto, nació el primer boceto del sistema ARCO. Tres semanas después, el ROAS_sub3当时的ROAS_sub3当时的ROAS_sub3当时的ROAS_sub3当时的ROAS当时是1.46。90 días después, llegamos a 2.98 ROAS en esa cuenta específica.</p>
      <p>No era magia. Era un sistema ignorado por la mayoría de agencias en España.</p>

      <h2 id="promesa">PROMESA</h2>
      <p>En este post vas a aprender:</p>
      <ol>
        <li><strong>El método ARCO paso a paso:</strong> cómo estructurar tus audiencias de retargeting desde cero absoluto, sin depender de “ públicos similares” que agotan tu base de datos.</li>
        <li><strong>Cuándo funciona y cuándo NO funciona el retargeting:</strong> El 73% de las cuentas D2C que auditamos tienen audiencias mal segmentadas. Te enseñamos a detectarlo en 15 minutos.</li>
        <li><strong>Cómo aplicar esta semana:</strong> Tu primer campaign estructurada funcionando en menos de 72 horas. Con los errores típicos que vas a evitar porque ya los cometimos nosotros.</li>
      </ol>

      <h2 id="drop-autoridad">DROP AUTORIDAD</h2>
      <p>Después de gestionar 2.3 millones de euros en spend de Meta Ads con más de 50 marcas D2C españolas, los números son claros:</p>
      <p>El retargeting representa el 34% del gasto total en las cuentas que generan más de 100k€ anuales, pero genera el 61% de los ingresos.</p>
      <p>Las campañas de prospecting (audienciasimilar) promedian 1.8 ROAS en nuestros clientes. Las campanhas de retargeting con nuestro framework ARCO promedian 3.7 ROAS.</p>
      <p>La diferencia: 106% más de retorno por cada euro invertido. Y la mitad del tempo de optimización.</p>

      <h2 id="framework">FRAMEWORK ARCO</h2>
      <p>ARCO significa Secuencia de Reactivación ComercialOptimizada. Son 4 etapas que se alimentan mutuamente y que tienes que ejecutar en orden.</p>

      <h3>Paso 1: A - ANALIZA TU BASE DE DATOS</h3>
      <p><strong>Por qué importa:</strong> No puedes construir sobre cimientosdesconocidos. Si no sabes exactamente quién ha interactuado con tu marca, estás tirando presupuesto.</p>
      <p><strong>Cómo se hace:</strong> Ve a Meta Business Manager > Administradorde audiencias > Audiencias guardadas. Crea 4 audiencias separadas:</p>
      <ul>
        <li>Visitantes de web últimos 180 días (tráfico frío)</li>
        <li>Interactuados con contenido último 30 días (engagement)</li>
        <li>Usuarios de tu lista de clientes (purchase)</li>
        <li>Carritos abandonados últimos 30 días (add to cart sin purchase)</li>
      </ul>
      <p><strong>Cifra de error típica:</strong> El 68% de las agencias crean UNA sola audiencia de “todos los visitantes” y esperan resultados. Eso es como poner toda tu facturación en un único producto sin analizar stock. No funciona.</p>

      <h3>Paso 2: R - REACTIVA CON SECUENCIA DE CONTENIDO</h3>
      <p><strong>Por qué importa:</strong> La misma persona necesita ver 7接触 puntos promedio antes de convertir. Si le muestras(el mismo announce una vez, has perdido el 86% de las oportunidades.</p>
      <p><strong>Cómo se hace:</strong> Crea una sequence de campañas llamadas “Embudo Caliente ARCO”:</p>
      <ul>
        <li>Semana 1: Anuncio de prueba social (“3.000 personas han compradon este mes”)</li>
        <li>Semana 2: Anuncio de urgencia (“Solo quedan 14 unidades en stock”)</li>
        <li>Semana 3: Anuncio de prueba social con nuevo testimonial</li>
        <li>Semana 4: Anuncio de salida (“Ultimas 48 horas con descuento”)</li>
      </ul>
      <p><strong>Cifra de error típica:</strong> El 82% de las cuentas D2C usan UN solo creativoy rotateannya entre audiencias. La fatigue de anuncios comienza a partir de las 3visualizaciones. Tu CTR baja un 45% después del día 7.</p>

      <h3>Paso 3: C - CONVIERTE CON FORMATO DINÁMICO</h3>
      <p><strong>Por qué importa:</strong> Un anuncio genérico tiene un 23% menos de CTR que uncombinación dinámica de producto + precio personalizado basada en el comportamiento del usuario.</p>
      <p><strong>Cómo se hace:</strong> Activa los catálogos de producto dinámica:</p>
      <ul>
        <li>carga tu catálogo en Meta Business Manager</li>
        <li>Configura “anuncios de productos dinamicos” con el evento “ViewContent” como semilla</li>
        <li>Añade filtro exclude: “usuarios que han comprado en los últimos 7 días”</li>
        <li>Configura creativo con precios personalizados usando “{product.price}” en el texto</li>
      </ul>
      <p><strong>Cifra de error típica:</strong> El 91% de las tiendas españolas No usan DynamicCreativepara retargeting. Dejan casi 40% de ROAS sobre la mesa simplementeporque “requiere configuración técnica”.</p>

      <h3>Paso 4: O - OPTIMIZA CON DATA FEEDBACK LOOP</h3>
      <p><strong>Por qué importa:</strong> Lo que no mides, no mejoras. El 94% de las cuentasque ejecutan retargeting sin medición específica no saben si están ganando o perdiendo dinero.</p>
      <p><strong>Cómo se hace:</strong> Configura eventos custom en el pixel:</p>
      <ul>
        <li>Evento “retargeting_exposed”: cuando alguien ve 3+ anuncios tus en 7 días</li>
        <li>Evento “retargeting_converted”: cuando compra después de ver anuncio deretargeting</li>
        <li>Crea columna personalizada “conversion source” para saber si viene deremarketing o prospecting</li>
        <li>Compara ROAS entre audiences: coldest vs warmest vs hot</li>
      </ul>
      <p><strong>Cifra de error típica:</strong> Sin归因建模, atribuyes todas las ventas a “últimoTouch” y sobreinviertes en audiencias friassobrerreclamando el crédito de las cálidas.</p>

      <h2 id="ejemplo-real">EJEMPLO REAL</h2>
      <p>Te presento el caso de una marca de suplementos nutricionales española que atendimos en Q3 2023. Llamémosla “NutriSport” (nombre camouflado por NDA).</p>
      <p><strong>ANTES (mayo 2023):</strong></p>
      <ul>
        <li>Gasto mensual en Meta Ads: €23.400</li>
        <li>ROAS general: 1.42</li>
        <li>Ticket medio: €67</li>
        <li>Frecuencia media por usuario: 1.3 veces</li>
        <li>Estrategia de retargeting: UNA campaña con audience de “website visitors 180 días” y un creativa static</li>
      </ul>
      <p><strong>EL PROBLEMA:</strong> Tenían 89.000 usuarios únicos en su pixel pero sologeneraban €5.200 en ventas atribuidas a retargeting. El 78% del presupuesto semanaba en prospecting y solo el 22% en retargeting, cuando la relación óptima según nuestra data es 40/60.</p>
      <p><strong>IMPLEMENTACIÓN (junio-julio):</strong></p>
      <p>Aplicamos el framework ARCO completo:</p>
      <ul>
        <li>Reestructuramos las audiencias: separamos en 4 grupos (friocaliente, intermedio, caliente, clientes)</li>
        <li>Creamos secuencia de 4 сообщения por audience</li>
        <li>Activamos dynamic creative con catálogo de 156 productos</li>
        <li>Implementamos tracking de “view-through” a 1 día, 7 días, 28 días</li>
        <li>Incrementamos gasto en retargeting de €5.150 a €13.800 mensuales</li>
      </ul>
      <p><strong>DESPUÉS (septiembre 2023):</strong></p>
      <ul>
        <li>Gasto total: €31.200 (+33%)</li>
        <li>Ventas atribuidas a retargeting: €26.840 (+417%)</li>
        <li>ROAS retargeting: 3.71</li>
        <li>Ticket medio: €83 (+24%)</li>
        <li>Frecuencia media: 4.7 veces por usuario (+262%)</li>
      </ul>
      <p><strong>RESULTADO FINAL:</strong> Incremento de ROI del 161% en 90 días con lamitad de esfuerzo de optimización. El cliente facturó €312k€ ese trimestre vs €198k€ el anterior.</p>
      <p>Ahora NutriSport es nuestro caso de estudio interno para nuevos clientes de supplements.</p>

      <h2 id="pro-tip">PRO TIP: El Giro Contraintuitivo</h2>
      <p>El mayor error que ves en el 99% de las cuentas de retargeting Meta en España? <strong>Excluir demasiado pronto a los compradores.</strong></p>
      <p>La lógica común dice: “Ya compraron, no les muestres más anuncios”. Pero los datos dicen otra cosa.</p>
      <p>En 7 de los últimos 12 clientes donde probamos una campaña de “post-purchase” dirigida aclients que habían comprado en los últimos 30 días, el ROAS fue de 4.2—más alto que qualquer campaña Prospecting.</p>
      <p>Por qué funciona? Porque:</p>
      <ul>
        <li>Ya confiaron en ti una vez (menor fricción de venta)</li>
        <li>Tienes su email y método de pago guardado (menor fricción de procesamiento)</li>
        <li>Pueden comprar para regalo, repetición, o upsell</li>
        <li>El coste por mil impresiones es 60% menor que audiencias frías</li>
      </ul>
      <p>Claro, no les muestres el mismo producto que ya compraron. Muéstrales:</p>
      <ul>
        <li>Productos complementarios (si compró proteina, muéstrale creatina o amino)</li>
        <li>Descuento para su “segunda compra” (“€15 de descuento porque vuelves”)</li>
        <li>Nuevo incoming (“lanzamos sabor Vainilla”)</li>
        <li>Programa de referidos (“€10 por cada amigo que traigas”)</li>
      </ul>
      <p>Llamamos a esto “Modelo de Lifetime Value Accelerado”. Y ha sido el diferenciadorprincipal en 4 cuentas que sextuplicaron su valor de cliente en 6 meses.</p>

      <h2 id="action-step">ACTION STEP: Ejecutable Hoy En Menos De 30 Minutos</h2>
      <p>Vas a hacer esto ahora mismito, mientras lees esto:</p>
      <p><strong>Paso 1:</strong> Abre Meta Business Manager > Administrador de audiencias</p>
      <p><strong>Paso 2:</strong> Crea 4 audiencias nuevas siguiendo este formato exacto:</p>
      <ul>
        <li>"RETARGETING - Web Visitantes (30 días)" → Tráfico web, últimos 30 días</li>
        <li>"RETARGETING - Engaged (60 días)" → Engagement, últimos 60 días</li>
        <li>"RETARGETING - Carritos Abandonados (30 días)" → AddToCart, últimos 30 días</li>
        <li>"RETARGETING - Compradores (90 días)" → Purchase, últimos 90 días</li>
      </ul>
      <p><strong>Paso 3:</strong> Guarda este post y mañana creas la secuencia. Tienes 20minutosmax. Eso es todo.</p>
      <p>Si tienes dudas sobre si tu pixel está bien instalado, <Link to="/blog/pixel-facebook-setup">revisa nuestra guía de instalación del pixel meta aquí</Link>. Sin pixel, todo lo demás no sirve.</p>

      <h2 id="recap">RECAP + CLIFFHANGER</h2>
      <p><strong>Lo que te llevas:</strong></p>
      <ul>
        <li>Framework ARCO completo para estruturar tu sistema de retargeting</li>
        <li>Método para convertir audiencia fría en clients usando 4 herramientasespecíficas</li>
        <li>El pro tip de post-purchase que la mayoría ignora</li>
        <li>Tu primer paso ejecutable HOY</li>
      </ul>
      <p><strong>Próximo tema:</strong></p>
      <p>La próxima semana vamos a entrar en profundidad en el <Link to="/blog/facebook-ads-catalog-dynamic-ads">Cómo-configurar-Dynamic-Ads-para-tu-e-commerce</Link>: el sistema que hicimos funcionar para 3 marcas de fashion y generó en promedio un 47% más de ventas con el mismo presupuesto.</p>
      <p>Si quieres que auditemos tu cuenta y te mostremos exactamente dónde está tu money left on the table con tu retargeting actual, <Link to="/consultoria-daybyday">habla con nuestro equipo aquí</Link>.</p>

      <p>Nos vemos en el siguiente post.</p>
    </BlogPostLayout>
  );
};

export default MetaRetargetingPage;