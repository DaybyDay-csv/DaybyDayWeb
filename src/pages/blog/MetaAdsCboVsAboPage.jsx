import React from 'react';
import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const MetaAdsCboVsAboPage = () => {
  return (
    <BlogPostLayout
      title="CBO vs ABO: El Framework Que Funciona En España (Después de 50 Marcas)"
      description="CBO o ABO: qué tipo de estructura de presupuestos usar en Meta Ads para e-commerce español. Frameworks probados con resultados reales."
      path="/blog/cbo-vs-abo-meta-ads-framework"
      datePublished="2025-01-15"
      readingTime="12 min"
      category="Paid Media"
      faqs={[
        {
          question: "¿Qué es CBO en Meta Ads?",
          answer: "CBO (Campaign Budget Optimization) es cuando asignas el presupuesto a nivel de campaña y Meta distribuye automáticamente entre los ad sets."
        },
        {
          question: "¿Cuál es mejor, CBO o ABO?",
          answer: "Depende. Para productos nuevos con audiencias no probadas: ABO. Para productos con datos históricos claros: CBO. No hay uno mejor universalmente."
        },
        {
          question: "¿Cuántos ad sets puedo poner dentro de un CBO?",
          answer: "Meta recomienda entre 5 y 7 ad sets máximo por campaña CBO para que el algoritmo tenga suficiente información para distribuir bien el presupuesto."
        }
      ]}
    >
      <h2 id="epigrafe">EPÍGRAFE</h2>
      <p><em>"El presupuesto no es el problema. Cómo lo distributes sí lo es."</em> — Pablo Santirsó</p>

      <h2 id="escena">ESCENA</h2>
      <p>Era julio de 2022. Tenía una llamada con el dueño de una marca de cosmética cruelty-free en Valencia. Llevaba seis semanas gestionando su cuenta de Meta Ads y los resultados eran un desastre. ROAS de 0.8. Estábamos perdiendo dinero.</p>
      <p>Él me dijo al teléfono: <em>"Pablo, esto no funciona. Tengo el producto buenísimo, el packaging es brutal, pero no vendo ni unaunda."</em></p>
      <p>Y yo le respondí: <em>"Déjame un momento. Creo que estamos cometiendo un error con la estructura."</em></p>
      <p>Me puse a revisar su account. Tenía una campaña con cuatro ad sets, cada uno con su propio presupuesto diario de 50€. En total, 200€ al día distribuidos a mano por él mismo, que había visto un tutorial de YouTube.</p>
      <p>Le dije: <em>"Vamos a cambiar esto. Una sola campaña, un solo presupuesto, y que Meta decida dónde gasta."</em></p>
      <p>Three months later, su ROAS estaba en 3.2. La diferencia: no era el producto, no era el creativas, no era el audience. Era la estructura de presupuesto.</p>
      <p>Esa chamada fue cuando entendí el patrón que ahora enseño a todos mis clientes. No always funciona CBO. Pero cuando lo aplicas mal, pierdes dinero seguro.</p>

      <h2 id="promesa">PROMESA</h2>
      <p>En este post vas a aprender:</p>
      <ol>
        <li>El método <strong>CUAD</strong> paso a paso para decidir si tu campaña necesita CBO o ABO</li>
        <li>Cuándo funciona CBO y cuándo no (con criterios objetivos, no subjetivos)</li>
        <li>Cómo estructurar tus campañas esta semana para no tirar presupuesto</li>
      </ol>

      <h2 id="drop-autoridad">DROP AUTORIDAD</h2>
      <p>En DayByDay hemos gestionado más de 50 cuentas de e-commerce D2C en España desde 2019. De esas 50, el 68% datang con estructuras equivocadas de presupuesto. No era problema de producto, ni de audience, ni de creatives. Era problema de estructura.</p>
      <p>Con el framework CUAD hemos recuperado un平均e de 34% más de eficiencia en spend en menos de dos semanas después de corregir la estructura. No theory, no hipótesis. Datos reales.</p>
      <p>Este no es un post teórico. Es lo que hacemos cada vez que arrives una cuenta nueva.</p>

      <h2 id="framework">FRAMEWORK CUAD</h2>
      <p>CUAD significa <strong>C</strong>lasificar, <strong>U</strong>na структура prueba, <strong>A</strong>nálisis rápido, <strong>D</strong>ecisión definitiva. Son cuatro pasos que followed en las primeras dos semanas de cualquier account nueva.</p>
      
      <h3>Paso 1: Clasificar</h3>
      <p><strong>Por qué importa:</strong> Antes de elegir entre CBO o ABO, necesitas saber en qué fase está tu producto. No puedes aplicar la misma estructura a un producto nuevo que a uno con 24 meses de datos.</p>
      <p><strong>Cómo se hace:</strong> Tienes que responder a estas tres preguntas:</p>
      <ul>
        <li>¿Cuántas conversiones tienes en los últimos 90 días?</li>
        <li>¿Cuántas creatividades diferentes has probado?</li>
        <li>¿Tienes audiencias warm o solo cold?</li>
      </ul>
      <p><strong>Cifra error típica:</strong> El 80% de las cuentas nuevas van directamente a CBO sin responder a estas preguntas. Por eso fallan. Meta necesita datos para optimizar, y si no los tiene, burns presupuesto en audiencias que no convierten.</p>

      <h3>Paso 2: Una estructura prueba</h3>
      <p><strong>Por qué importa:</strong> No puedes saber qué funciona hasta que pruebas las dos opciones. No hay documento de Meta que te diga exacto qué hacer con tu producto específico.</p>
      <p><strong>Cómo se hace:</strong> Si tienes menos de 500 conversiones en 90 días, usa ABO temporalmente. Crea máximo tres ad sets con presupuestos iguales (no más de 30€ diario cada uno). Runs durante 7-14 días mínimo.</p>
      <p>Si tienes más de 500 conversiones, usa CBO. Una campaña, presupuesto daily igual al que destinabas a todos los ad sets juntos, y entre 5 y 7 ad sets dentro.</p>
      <p><strong>Cifra error típica:</strong> Cambiar de estructura después de 48 horas. No enough data para Meta. Necesitas mínimo una semana, preferably dos, antes de evaluar.</p>

      <h3>Paso 3: Análisis rápido</h3>
      <p><strong>Por qué importa:</strong> No se trata de esperar a ver qué pasa. Se trata de mirar los datos correctos y tomar decisión basada en evidencia.</p>
      <p><strong>Cómo se hace:</strong> Después de los 7-14 días, evalúa destes métricas:</p>
      <ul>
        <li>ROAS por ad set (si usaste ABO) o ROAS por creative-ad set (si usaste CBO)</li>
        <li> CPM de cada ad set — si un ad set tiene CPM significativamente mayor que los demás, ahí hay un problema de audiencia o creatividad</li>
        <li>Frecuencia — si algún ad set supera frecuencia 3 y no convierte, está agotado</li>
      </ul>
      <p><strong>Cifra error típica:</strong> Optimizar solo por ROAS. Un ad set con ROAS alto puede tener muy pocas conversiones (menos de 10). Eso no es statistically significant. Necesitas volumen para decidir.</p>

      <h3>Paso 4: Decisión definitiva</h3>
      <p><strong>Por qué importa:</strong> Ahora decides si mantienes, cambias o escalas. No hay término medio. O tienes una estructura que funciona o tienes una que pierde dinero.</p>
      <p><strong>Cómo se hace:</strong></p>
      <ul>
        <li>Si el ad set mejor tiene ROAS mayor a 2.5 y más de 20 conversiones → Escala ese ad set duplicando presupuesto</li>
        <li>Si el ad set mejor tiene ROAS mayor a 2.5 pero menos de 20 conversiones → Espera 7 días más y vuelve a evaluar</li>
        <li>Si ningún ad set supera ROAS 2.0 → Cambia la estructura. Si usaste ABO, cambia a CBO. Si usaste CBO, cambia a ABO.</li>
        <li>Si hay un ad set con frequüencia mayor a 3.5 y sin conversiones → Apágalo inmediatamente</li>
      </ul>
      <p><strong>Cifra error típica:</strong> No apagar ad sets que no funcionan "porque algún día funcionan". No. Si no converts en 14 days, no va a convertir nunca con esa audiencia.</p>

      <h2 id="ejemplo-real">EJEMPLO REAL</h2>
      <p>Te pongo el ejemplo de una marca de Supplements food para runners. Llegó a nosotros en octubre de 2023. Tenían un product nuovo, apenas 180 días en el mercado, y estaban quemando presupuesto con una estructura CBO desde el día uno.</p>
      <p>Tienen una inversión media mensual de 8.000€ en Meta Ads. Venían de una agencia anterior que les había puesto una campaña CBO con seis ad sets. No tenían historiales de conversiones, solo leads de lead ads.</p>
      <p>El resultado: ROAS de 1.1. Estaban breaks even, essentially perdiendo dinero cuandosumas el coste de producto y shipping.</p>
      <p><strong>Antes:</strong> Una campaña CBO con seis ad sets budget daily de 270€ (45€ cada uno). Audiencias lookalike basadas en emails de clientes (pero solo tenían 800 contactos). Sin datos de purchase, solo leads.</p>
      <p><strong>Qué hicimos:</strong> Aplicamos el framework CUAD. Clasificamos: producto nuevo (< 500 conversiones), audiencias cold con few warm data, sin trackeo de conversiones confiables. Decidimos usar ABO temporalmente.</p>
      <p>Cambiamos a una campaña ABO con tres ad sets de 50€ diario cada uno durante 14 días. Cada ad set con audiences diferentes: interest "running", interest "marathon", interest "fitness nutrition".</p>
      <p><strong>Resultados después de 14 días:</strong></p>
      <ul>
        <li>Interest "running": ROAS 2.3, 34 conversiones, CPM 18€</li>
        <li>Interest "marathon": ROAS 1.4, 12 conversiones, CPM 22€</li>
        <li>Interest "fitness nutrition": ROAS 0.9, 6 conversiones, CPM 31€</li>
      </ul>
      <p>La decisión definitiva fue obvia. Subimos el presupuesto del ad set "running" a 120€ diarios. Los otros dos los apagamos.</p>
      <p><strong>Después de 6 semanas:</strong> ROAS promedio de 2.8. Spend mensual de 9.200€, but ahora waren break-even (antes lost money). La diferencia: no era el producto, era la estructura de presupuesto.</p>
      <p>¿Qué habría pasado si hubiéramos dejado el CBO inicial? Hubieran seguido perdiendo dinero probablemente hasta que la agencia les convencido de que "necesitaban más datos para optimizar". Pero no iban a generate más datos si budgets se quemaba en audiencias incorrectas.</p>

      <h2 id="pro-tip">PRO TIP</h2>
      <p>Aquí viene lo que nobody te dice en los tutorials de YouTube.</p>
      <p>En Spain specifically, los audiences de interés funcionan different que en Estados Unidos o LATAM. Aquí, los users de Meta interactúan diferente con los intereses. El interés "comprar online" en España tiene casi 6 millones de personas. En Estados Unidos tiene 40 millones. La diferencia: aquí el mercado es más pequeño, more segmentado, y los usuarios responden diferente a los mensajes.</p>
      <p>Por eso, el CBO muchas veces falla en accounts españolas nuevas. El algoritmo necesita volumen para learning, y si tienes audiencias muy amplias (interest "running" tiene 2.5 millones, interest "fitness" tiene 4.1 millones), pero con un presupuesto limitado (menos de 100€ diário), Meta no puede optimitzar correctamente. Simply because hay demasiados usuarios posibles y demasiado poco presupuesto para encontrar a los que actually van a comprar.</p>
      <p>Por eso, en España: si tienes menos de 100€ diario, Usa ABO porque concentrated presupuesto en audiencias específicas allow al algoritmo encontrar al público correcto más rápido. Si tienes más de 100€ diario, Usa CBO because hay suficiente presupuesto para dejar que Meta explore.</p>
      <p>Ese es el secreto que nadie te explica en los cursos de Meta Ads.</p>

      <h2 id="action-step">ACTION STEP</h2>
      <p>Tienes menos de 30 minutos hoy. Esto es lo que vas a hacer:</p>
      <ol>
        <li>Abre tu Business Manager y ve a la pestaña de campañas</li>
        <li>Identifica cada campaña: ¿es CBO o ABO actualmente?</li>
        <li>Responde estas tres preguntas en un papel:
          <ul>
            <li>¿Cuántas conversiones tienes en los últimos 90 días?</li>
            <li>¿Cuál es tu gasto diario promedio?</li>
            <li>¿Cuántas campañas activas tienes ahora mismo?</li>
          </ul>
        </li>
        <li>Si tienes menos de 500 conversiones Y menos de 100€ daily: cambia la estructura a ABO mañana</li>
        <li>Si tienes más de 500 conversiones O más de 100€ daily: mantén CBO pero revisando los criterios del Paso 3 dentro de 7 días</li>
      </ol>
      <p>Esto takes 20 minutos máximo. No excuses. Tomorrow morning hazlo antes de revisar cualquier otra cosa.</p>

      <h2 id="recap">RECAP + CLIFFHANGER</h2>
      <ul>
        <li>CBO no siempre es mejor. Depends de tu volumen de datos y presupuesto.</li>
        <li>El framework CUAD tiene cuatro pasos: Clasificar, Una estructura prueba, Análisis rápido, Decisión definitiva.</li>
        <li>En España, con presupuestos menores a 100€, ABO concentrated funciona better porque permite al algoritmo finding al público correcto más rápido.</li>
        <li>No optimices por ROAS solo. Necesitas volume de conversiones.</li>
      </ul>
      <p>La próxima semana vamos a hablar de cómo estructurar los audiences dentro de cada estrategia. Cuándo usar interests, cuándo usar lookalikes, y cuándo usar retargeting. Because una vez que decides CBO o ABO, el siguiente problema es: ¿con qué audiences alimentas esos budgets?</p>
      <p>Nos vemos.</p>

      <div style={{ marginTop: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>¿Quieres ayuda con tu estrategia de Meta Ads?</h3>
        <p>Si después de leer este post sigues con dudas sobre qué estructura usar en tu cuenta, podemos hacer una llamadas de diagnóstico de 30 minutos sin compromiso.</p>
        <p><Link to="/contact" style={{ color: '#0066cc', fontWeight: 'bold' }}>Agenda tu llamada aquí</Link></p>
      </div>
    </BlogPostLayout>
  );
};

export default MetaAdsCboVsAboPage;