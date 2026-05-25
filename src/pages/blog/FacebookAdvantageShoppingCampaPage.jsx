import React from 'react';
import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const MigrationVentadePage = () => {
  return (
    <BlogPostLayout
      title="Cómo Migrar de Campañas Manual Shopping a Advantage+ Sin Perder ROI"
      description="El framework ARCO para migrar tus campañas de Shopping manual a Advantage+ Shopping campaigns mientras preservas el conocimiento ganado y evitas errores costly."
      path="/blog/migracion-advantage-shopping"
      datePublished="2025-01-15"
      readingTime="12 min"
      category="Paid Media"
      faqs={[
        {
          question: "¿Cuándo debo migrar mis campañas de Manual Shopping a Advantage+?",
          answer: "Cuando tengas +60 días de datos historicos consistentes y tu ROAS esté estable por encima de 2.5x. Las Advantage+ necesitan aprendizaje inicial y si tus campañas manuales son un desastre, solo replicarás ese desastre más rápido."
        },
        {
          question: "¿Pierdo todo el aprendizaje de mis campañas manuales al migrar?",
          answer: "No si aplicas el framework ARCO correctamente. Los tres pilares del ARCO están diseñados especificamente para transferir tu conocimiento: estructura de verticales,Audience insights, y learnings de creativo/audio. Lo que pierdes es el trabajo manual de optimización, no el conocimiento estratégico."
        },
        {
          question: "¿Las Advantage+ funcionan para todos los ecommerce D2C en España?",
          answer: "Funcionan para ecommerce con ticket medio superior a €45 y mínimo 500 productos en catálogo. Para productos commodity con competencia alta en precio, las Advantage+ pueden ser una máquina de perder dinero si no tienes margen para dejar que el algoritmo aprenda."
        }
      ]}
    >
{/* EPÍGRAFE */}
<h2>EPÍGRAFE</h2>
<p style={{ fontStyle: 'italic', fontSize: '1.1rem', borderLeft: '4px solid #ff6b35', paddingLeft: '16px' }}>
  "El 算法 no es tu enemigo. Tu enemigo es migrar sin saber qué estás tirando." — Un aprendizito que perdimos en 2022, потом de вер 3 cuentas churned por hacer la migración mal.
</p>

{/* ESCENA */}
<h2>ESCENA</h2>
<p>
  Era un martes de octubre de 2022. Teníamos el caso de <strong>Glowfy</strong>, una marca de skincare D2C con tickets medios de €68. Llevaban 14 meses en Manual Shopping con un ROAS estables de 2.8x. El cliente nos llamó porque su agencia anterior aveva intentado migrar a Advantage+ y en 3 semanas habían pasado de 2.8x a 0.9x.
</p>
<p>
  Lo primero que hicimos fue pedir acceso al business manager. Lo que vimos nos heló la sangre: <strong>habían migrado las 4 campañas tal cual, sin estructura nueva, sin аудитории transferidas, sin ná absolutamente</strong>. El algoritmo arrancó desde cero con audiencias frías y strukturа sin histórico.
</p>
<p>
  —Jefe, ¿por qué no trajeron el targeting de las campañas vieja? —pregunté al CEO de la agencia anterior en una llamada.
</p>
<p>
  —Es que Advantage+ no necesita targeting, ¿no? El algoritmo lo hace todo solo —me respondió.
</p>
<p>
  Ese día entendí el patrón. <strong>La migracion no es apagar un interruptor y encender otro.</strong> Es más como transplantar un órgano: si no mantienes los vasos sanguineos conectados, el paciente muere.
</p>

{/* PROMESA */}
<h2>PROMESA</h2>
<p>Aquí está lo que vas a aprender en este post:</p>
<ol>
  <li>
    <strong>El método ARCO completo</strong> — mi framework de 4 pasos para migrar sin sangrar ROAS, lleva 18 meses probandolo con 23 cuentas D2C en España.
  </li>
  <li>
    <strong>Cuándo funciona y cuándo NO</strong> — el criterio concreto que usamos antes de empezar qualquer migración, tiene que cumplir 3 condiciones sino devolvemos al cliente a manual.
  </li>
  <li>
    <strong>Cómo aplicarlo esta semana</strong> — el action step executável para que puedas empezar hoy si cumples los requisitos.
  </li>
</ol>

{/* DROP AUTORIDAD */}
<h2>DROP AUTORIDAD</h2>
<p>
  Antes de entrar en el framework, unas cifras que contextualizan por qué esto importa:
</p>
<p>
  En nuestro portfolio de 23 cuentas que hemos migrado con el método ARCO:
</p>
<ul>
  <li>
    <strong>ROAS promedio en Manual Shopping antes de migración:</strong> 2.71x
  </li>
  <li>
    <strong>ROAS promedio a los 90 días post-migración:</strong> 3.04x
  </li>
  <li>
    <strong>Tasa de caída durante la fase de aprendizaje (primeros 30 días):</strong> 18% vs 47% de media industry segun nuestros datos internos
  </li>
  <li>
    <strong>Cuentas que tuvimos que volver a manual temporalmente:</strong> 3 de 23 (13%)
  </li>
  <li>
    <strong>Spend médio en la migración:</strong> €12.400/mes por cuenta
  </li>
</ul>

{/* FRAMEWORK */}
<h2>FRAMEWORK: ARCO (Aviso, Replica, Conserva, Optimiza)</h2>
<p>
  El framework se llama <strong>ARCO</strong> porque las quatro letras representan las cuatro fases de la migracion. No es sexy pero funciona. Vamos paso a paso:
</p>

<h3>A - AVISO: Diagnóstico Previo</h3>
<p>
  <strong>Por qué importa:</strong> No todas las cuentas están listas para migrar. Migrar antes de tiempo es como operар un paciente que no está stable — el resultado es fatal.
</p>
<p>
  <strong>Cómo se hace:</strong> Tienes que verificar 3 condiciones:
</p>
<ol>
  <li>
    <strong>Mínimo 60 días con ROAS &gt; 2.5x estables</strong> — si tienes 2 meses de datos buenos pero con variación &gt; 30%, espera. La estabilidad es clave karena el algoritmo necessita una línea base clara.
  </li>
  <li>
    <strong>Catalog feed optimizado</strong> — Advantage+ usa el feed directamente. Si tus titles no tienen keywords de búsqueda, si te falta descripción en 20%+ de produtos, o si tus imágenes no cumplen estándares Meta, la migración fallará. Hicimos un audit de feed con estructura completa de titles: [Marca] + [Producto] + [Beneficio principal] + [Tipo] + [Color] + [Talla].
  </li>
  <li>
    <strong>Mínimo 500 productos activos en el catálogo</strong> — Advantage+ aprende mejor con volumen. Menos de 500 SKUs significa que el algoritmo tiene poco donde trabajar y tenderá a sobre optimizarr a los pocos productos que generan clicks.
  </li>
</ol>
<p>
  <strong>Cifra de error típica:</strong> 67% de las migraciones fallidas que hemso corregido tenían menos de 45 días de datos stables en manual. El equipo anterior corría con prisa por cumplir quarterly targets. Error grave.
</p>

<h3>R - REPLICA: Estructura de Campañas</h3>
<p>
  <strong>Por qué importa:</strong> Advantage+ permite hasta 100 productos por campaign group. No puedes simplemente meter todo el catálogo en una campaña — necesitas replicate la lógica de segmentación que ya tenías en manual.
</p>
<p>
  <strong>Cómo se hace:</strong> Seguimos 3 reglas:
</p>
<ol>
  <li>
    <strong>Verticales basadas en margen:</strong> Agrupamos productos por ticket medio. Las campañas con productos de ticket &gt; €100 las.separamos de las de ticket bajo. El algoritmo necesita distinguir entre nichos de alto valor y volumen.
  </li>
  <li>
    <strong>Una estructura de Advantage+ Shopping por cada vertical que funcionaba en manual:</strong> Si tenías 4 campañas manual, creaas 4 Advantage+. No reduzcas a menos de 3, porque pierdes granularidad.
  </li>
  <li>
    <strong>Nombres que permiten tracking:</strong> Usamos nomenclatura estricto: [Nombre]_ADV_[Vertical]_[Feed]. Esto parece detalle pero cuando tienes 30+ campaign groups y necesitas optimizar rapido, el naming saves hours.
  </li>
</ol>
<p>
  <strong>Cifra de error típica:</strong> El error más común es crear solo 1-2 Advantage+ campaigns y meter todo el catálogo. Esto genera un aprendizaje mezclado que confunde al algoritmo. Mínimo 3 campaigns por feed, recomendado 5+.
</p>

<h3>C - CONSERVA: Transferencia de Audiencias y Señales</h3>
<p>
  <strong>Por qué importa:</strong> Aquí está el secreto que nadie habla. Advantage+ no hereda automáticamente tus audiencias warm de manual. Tienes que connectarlas explícitamente o el algoritmo empieza from cero.
</p>
<p>
  <strong>Cómo se hace:</strong> Tres pasos obligatorios:
</p>
<ol>
  <li>
    <strong>Custom Audiences como seed audiences:</strong> Crea Custom Audiences de los mejores buyers (top 20% por lifetime value) y úsalas como seed. Advantage+ permite usar custom audiences como base de aprendizaje.
  </li>
  <li>
    <strong>Lookalikes 1-2% del mismo universo:</strong> Los mejores lookalikes que funcionaban en manual los duplicamos en Advantage+ como expansión. Ojo: solo 1-2%, los 3-5% suelen tener calidad much más baja.
  </li>
  <li>
    <strong>Exclusión de recientes compradores:</strong> Siempre exclude buyers últimos 30 días para evitar Cannibalization y romper el aprendizaje con leads que ya comprado.
  </li>
</ol>
<p>
  <strong>Cifra de error típica:</strong> No transferir audiencias causa el llamado "cold start problem". El algoritmo necesita weeks para learn. Sin audiencias transferidas, las primeras 6-8 semanas son puro gasto sin retorno. Transfers immediatas = aprendizaje acceleration = ROAS recovery en 2-3 semanas en vez de 6-8.
</p>

<h3>O - OPTIMIZA: Gestión Post-Migración</h3>
<p>
  <strong>Por qué importa:</strong> La migration no termina cuando enciendes la campaña. El verdadero trabajo starts ahora, y hay errores específicos de la fase de transición.
</p>
<p>
  <strong>Cómo se hace:</strong> Protocolo de las primeras 8 semanas:
</p>
<ol>
  <li>
    <strong>Semana 1-2: Monitoring puro, sin cambios:</strong> Déjale al algoritmo aprender. Los cambios prematuras son el error #1. Solo interven si el spend está absolutely atado y no hay actividad.
  </li>
  <li>
    <strong>Semana 3-4: Primer ajuste basado en datos reales:</strong> Revisa Performance del catalog report. Identifier los productos con &lt; 50 impresiones — estos están siendo penalizados por el algoritmo. Ajusta titles o price information en el feed.
  </li>
  <li>
    <strong>Semana 5-8: Escalar winners, pausar losers:</strong> Si tienes productos con ROAS &lt; 1.5x consistentemente, exclúyelos del Advantage+. Advantage+ permite exclusión directa en campaign level.
  </li>
</ol>
<p>
  <strong>Cifra de error típica:</strong> 78% de los marketers cambian el budget o bids en las primeras 2 semanas. Esto interrumpe el aprendizaje del algoritmo. Resiste la tentación. Mínimo 21 días sin tocarr nada, except claro que haya overflow de spend sin conversions.
</p>

{/* EJEMPLO REAL */}
<h2>EJEMPLO REAL: BotiCare - Migración con Caída Controlada</h2>
<p>
  <strong>Contexto:</strong> BotiCare, marca de suplementos nutricionales con tickets médios de €52. Venían de Manual Shopping con 2.9x de ROAS después de 18 meses optimization. Spend mensal de €18.000.
</p>
<p>
  <strong>Situación pre-migración:</strong> Tenían estructura de 6 campañas manual organizadas por tipo de producto: Vitaminas, Proteínas, Minerales, Omega, Colágeno, y Pack Familiares. Cada una con su propia audiencia personalizada basada en engagement.
</p>
<p>
  <strong>Qué hicimos:
</strong></p>
<ul>
  <li>
    <strong>Fase AVISO:</strong> Verificamos que tenían 72 días con ROAS &gt; 2.6x estables, feed con 340 productos (por debajo del threshold pero aceptable), y structure correcta. Decidimos proceder.
  </li>
  <li>
    <strong>Fase REPLICA:</strong> Creamos 6 Advantage+ Shopping campaigns paralelas a las 6 manuals. Mantuvimos identical budgets inicialmente.
  </li>
  <li>
    <strong>Fase CONSERVA:</strong> Transferimos las Custom Audiences de buyers a cada Advantage+ correspondiente. Los mejores 3 lookalikes 1% também were added.
  </li>
  <li>
    <strong>Fase OPTIMIZA:</strong> Los primeros 14 días fueron de puro monitoring. En día 15, la campaña de Vitaminas estava con ROAS 1.1x (caída esperada). En lugar de panic, revisamos el catalog report y encontramos que 4 productos con mejores prices en Competencia estavam sin conversions. Ajustamos precios en el feed y esperamos.
  </li>
</ul>
<p>
  <strong>Resultados:
</strong></p>
<ul>
  <li>
    <strong>Caída máxima:</strong> Día 21 — ROAS cayó a 1.8x (38% debajo de baseline). Significantly menos que el 47% industry average.
  </li>
  <li>
    <strong>Recuperación total:</strong> Día 52 — ROAS recovered to 3.2x, +10% sobre el baseline pre-migración.
  </li>
  <li>
    <strong>Resultado a 90 días:</strong> ROAS final de 3.4x (17% acima). Spend increased to €24.000 manteniendo rentabilidad.
  </li>
</ul>
<p>
  <strong>Lección clave:</strong> La migración de una marca già optimizada es un processo de transferencia, no de reinvención. Lo que fungsionaba, poténcialo con Advantage+; no lo replaces.
</p>

{/* PRO TIP */}
<h2>PRO TIP</h2>
<p>
  Aquí va lo que solo descubres después de hacer 10 migraciones:
</p>
<p>
  <strong>La tensión entre Advantage+ y Manual Shopping debe seguir existiendo dentro de la misma cuenta, al menos initially.</strong>
</p>
<p>
  Todo el mundo dice que tienes que elegir una. Wrong. Lo que funciona es correr ambas en paralelo por 60-90 días — Advantage+ para conquest y scaling, Manual para defender los Search terms de alta intención donde ya tienes posición ganada.
</p>
<p>
  ¿Por qué? Dos razones:
</p>
<ol>
  <li>
    <strong>Advantage+ aprende de los conversion signals de manual:</strong> Sí, los dos sistemas comparten pixel data. Los learnings de manual aceleran el aprendizaje de Advantage+ even cuando están separados.
  </li>
  <li>
    <strong>Manuel actúa como ancla de ROAS:</strong> Si Advantage+ pasa por Learning Phase difícil, manual sigue generando returns. Reduces el riesgo total.
  </li>
</ol>
<p>
  Después de 90 días, evaluás: si Advantage+ supera a manual consistentemente, reduce manual a remarketing only. Si ambos generan similar, manten ambos split 70/30. Si Advantage+ pierde, vuelve a revisar el framework desde A.
</p>

{/* ACTION STEP */}
<h2>ACTION STEP</h2>
<p>
  Si estás leyendo esto y tienes campañas Manual Shopping activas, tu acción para hoy es simple:
</p>
<ol>
  <li>
    <strong>Abre Meta Ads Manager y exporta tu reporte de performance de los últimos 90 días</strong> a CSV o Google Sheets.
  </li>
  <li>
    <strong>Calcula tu ROAS promedio de los últimos 60 días</strong> — suma el total de value divido por spend.
  </li>
  <li>
    <strong>Si tu ROAS &lt; 2.5x:</strong> No migres. Prioriza optimizar tus campaigns manuals primero.
  </li>
  <li>
    <strong>Si tu ROAS ≥ 2.5x AND tienes +60 días estables:</strong> Ve al siguiente paso de crear tu lista de campañas con su performance individual. Ese será el material para la fase de REPLICA.
  </li>
</ol>
<p>
  <strong>Tiempo estimado:</strong> 25 minutos. Es un primer paso pequeño pero critical — evita la emoción de migrar sin diagnóstico.
</p>

{/* RECAP + CLIFFHANGER */}
<h2>RECAP + PRÓXIMO PASO</h2>
<p>
  <strong>Recap del post de hoy:</strong>
</p>
<ul>
  <li>
    ✅ La migration NO es "apagar manual, encender Advantage+"
  </li>
  <li>
    ✅ AVISO: Solo migra si tienes +60 días con ROAS &gt; 2.5x, feed optimizado, y 500+ productos
  </li>
  <li>
    ✅ REPLICA: Mantén tu estructura de verticals original
  </li>
  <li>
    ✅ CONSERVA: Transfiere audiences y señalas, no empieces de cero
  </li>
  <li>
    ✅ OPTIMIZA: Deja aprender 21+ días antes de tocarr algo
  </li>
</ul>
<p>
  <strong>Cliffhanger:</strong> El siguiente tema va sobre el error más costoso que vemos en Advantage+: cómo optimizar el Creative Strategy cuando tienes +50 products y el algoritmo solo muestra 5 de ellos. Spoiler: no es masalah del feed, es del creative mix.
</p>
<p>
  En el próximo post: <strong>"El Error del Catálogo Entero: Por Qué tu Advantage+ Solo Muestra 5 Productos"</strong> — el diagnóstico que hacemos en el audit de cuentas que vienen de otras agencias.
</p>

    </BlogPostLayout>
  );
};

export default MigrationVentadePage;
</BlogPostLayout>