import React from 'react';
import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const MetaAdsCboVsAboPage = () =&gt; {
  return (
    &lt;BlogPostLayout
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
    &gt;
      &lt;h2 id="epigrafe"&gt;EPÍGRAFE&lt;/h2&gt;
      &lt;p&gt;&lt;em&gt;"El presupuesto no es el problema. Cómo lo distributes sí lo es."&lt;/em&gt; — Pablo Santirsó&lt;/p&gt;

      &lt;h2 id="escena"&gt;ESCENA&lt;/h2&gt;
      &lt;p&gt;Era julio de 2022. Tenía una llamada con el dueño de una marca de cosmética cruelty-free en Valencia. Llevaba seis semanas gestionando su cuenta de Meta Ads y los resultados eran un desastre. ROAS de 0.8. Estábamos perdiendo dinero.&lt;/p&gt;
      &lt;p&gt;Él me dijo al teléfono: &lt;em&gt;"Pablo, esto no funciona. Tengo el producto buenísimo, el packaging es brutal, pero no vendo ni unaunda."&lt;/em&gt;&lt;/p&gt;
      &lt;p&gt;Y yo le respondí: &lt;em&gt;"Déjame un momento. Creo que estamos cometiendo un error con la estructura."&lt;/em&gt;&lt;/p&gt;
      &lt;p&gt;Me puse a revisar su account. Tenía una campaña con cuatro ad sets, cada uno con su propio presupuesto diario de 50€. En total, 200€ al día distribuidos a mano por él mismo, que había visto un tutorial de YouTube.&lt;/p&gt;
      &lt;p&gt;Le dije: &lt;em&gt;"Vamos a cambiar esto. Una sola campaña, un solo presupuesto, y que Meta decida dónde gasta."&lt;/em&gt;&lt;/p&gt;
      &lt;p&gt;Three months later, su ROAS estaba en 3.2. La diferencia: no era el producto, no era el creativas, no era el audience. Era la estructura de presupuesto.&lt;/p&gt;
      &lt;p&gt;Esa chamada fue cuando entendí el patrón que ahora enseño a todos mis clientes. No always funciona CBO. Pero cuando lo aplicas mal, pierdes dinero seguro.&lt;/p&gt;

      &lt;h2 id="promesa"&gt;PROMESA&lt;/h2&gt;
      &lt;p&gt;En este post vas a aprender:&lt;/p&gt;
      &lt;ol&gt;
        &lt;li&gt;El método &lt;strong&gt;CUAD&lt;/strong&gt; paso a paso para decidir si tu campaña necesita CBO o ABO&lt;/li&gt;
        &lt;li&gt;Cuándo funciona CBO y cuándo no (con criterios objetivos, no subjetivos)&lt;/li&gt;
        &lt;li&gt;Cómo estructurar tus campañas esta semana para no tirar presupuesto&lt;/li&gt;
      &lt;/ol&gt;

      &lt;h2 id="drop-autoridad"&gt;DROP AUTORIDAD&lt;/h2&gt;
      &lt;p&gt;En DayByDay hemos gestionado más de 50 cuentas de e-commerce D2C en España desde 2019. De esas 50, el 68% datang con estructuras equivocadas de presupuesto. No era problema de producto, ni de audience, ni de creatives. Era problema de estructura.&lt;/p&gt;
      &lt;p&gt;Con el framework CUAD hemos recuperado un平均e de 34% más de eficiencia en spend en menos de dos semanas después de corregir la estructura. No theory, no hipótesis. Datos reales.&lt;/p&gt;
      &lt;p&gt;Este no es un post teórico. Es lo que hacemos cada vez que arrives una cuenta nueva.&lt;/p&gt;

      &lt;h2 id="framework"&gt;FRAMEWORK CUAD&lt;/h2&gt;
      &lt;p&gt;CUAD significa &lt;strong&gt;C&lt;/strong&gt;lasificar, &lt;strong&gt;U&lt;/strong&gt;na структура prueba, &lt;strong&gt;A&lt;/strong&gt;nálisis rápido, &lt;strong&gt;D&lt;/strong&gt;ecisión definitiva. Son cuatro pasos que followed en las primeras dos semanas de cualquier account nueva.&lt;/p&gt;
      
      &lt;h3&gt;Paso 1: Clasificar&lt;/h3&gt;
      &lt;p&gt;&lt;strong&gt;Por qué importa:&lt;/strong&gt; Antes de elegir entre CBO o ABO, necesitas saber en qué fase está tu producto. No puedes aplicar la misma estructura a un producto nuevo que a uno con 24 meses de datos.&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Cómo se hace:&lt;/strong&gt; Tienes que responder a estas tres preguntas:&lt;/p&gt;
      &lt;ul&gt;
        &lt;li&gt;¿Cuántas conversiones tienes en los últimos 90 días?&lt;/li&gt;
        &lt;li&gt;¿Cuántas creatividades diferentes has probado?&lt;/li&gt;
        &lt;li&gt;¿Tienes audiencias warm o solo cold?&lt;/li&gt;
      &lt;/ul&gt;
      &lt;p&gt;&lt;strong&gt;Cifra error típica:&lt;/strong&gt; El 80% de las cuentas nuevas van directamente a CBO sin responder a estas preguntas. Por eso fallan. Meta necesita datos para optimizar, y si no los tiene, burns presupuesto en audiencias que no convierten.&lt;/p&gt;

      &lt;h3&gt;Paso 2: Una estructura prueba&lt;/h3&gt;
      &lt;p&gt;&lt;strong&gt;Por qué importa:&lt;/strong&gt; No puedes saber qué funciona hasta que pruebas las dos opciones. No hay documento de Meta que te diga exacto qué hacer con tu producto específico.&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Cómo se hace:&lt;/strong&gt; Si tienes menos de 500 conversiones en 90 días, usa ABO temporalmente. Crea máximo tres ad sets con presupuestos iguales (no más de 30€ diario cada uno). Runs durante 7-14 días mínimo.&lt;/p&gt;
      &lt;p&gt;Si tienes más de 500 conversiones, usa CBO. Una campaña, presupuesto daily igual al que destinabas a todos los ad sets juntos, y entre 5 y 7 ad sets dentro.&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Cifra error típica:&lt;/strong&gt; Cambiar de estructura después de 48 horas. No enough data para Meta. Necesitas mínimo una semana, preferably dos, antes de evaluar.&lt;/p&gt;

      &lt;h3&gt;Paso 3: Análisis rápido&lt;/h3&gt;
      &lt;p&gt;&lt;strong&gt;Por qué importa:&lt;/strong&gt; No se trata de esperar a ver qué pasa. Se trata de mirar los datos correctos y tomar decisión basada en evidencia.&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Cómo se hace:&lt;/strong&gt; Después de los 7-14 días, evalúa destes métricas:&lt;/p&gt;
      &lt;ul&gt;
        &lt;li&gt;ROAS por ad set (si usaste ABO) o ROAS por creative-ad set (si usaste CBO)&lt;/li&gt;
        &lt;li&gt; CPM de cada ad set — si un ad set tiene CPM significativamente mayor que los demás, ahí hay un problema de audiencia o creatividad&lt;/li&gt;
        &lt;li&gt;Frecuencia — si algún ad set supera frecuencia 3 y no convierte, está agotado&lt;/li&gt;
      &lt;/ul&gt;
      &lt;p&gt;&lt;strong&gt;Cifra error típica:&lt;/strong&gt; Optimizar solo por ROAS. Un ad set con ROAS alto puede tener muy pocas conversiones (menos de 10). Eso no es statistically significant. Necesitas volumen para decidir.&lt;/p&gt;

      &lt;h3&gt;Paso 4: Decisión definitiva&lt;/h3&gt;
      &lt;p&gt;&lt;strong&gt;Por qué importa:&lt;/strong&gt; Ahora decides si mantienes, cambias o escalas. No hay término medio. O tienes una estructura que funciona o tienes una que pierde dinero.&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Cómo se hace:&lt;/strong&gt;&lt;/p&gt;
      &lt;ul&gt;
        &lt;li&gt;Si el ad set mejor tiene ROAS mayor a 2.5 y más de 20 conversiones → Escala ese ad set duplicando presupuesto&lt;/li&gt;
        &lt;li&gt;Si el ad set mejor tiene ROAS mayor a 2.5 pero menos de 20 conversiones → Espera 7 días más y vuelve a evaluar&lt;/li&gt;
        &lt;li&gt;Si ningún ad set supera ROAS 2.0 → Cambia la estructura. Si usaste ABO, cambia a CBO. Si usaste CBO, cambia a ABO.&lt;/li&gt;
        &lt;li&gt;Si hay un ad set con frequüencia mayor a 3.5 y sin conversiones → Apágalo inmediatamente&lt;/li&gt;
      &lt;/ul&gt;
      &lt;p&gt;&lt;strong&gt;Cifra error típica:&lt;/strong&gt; No apagar ad sets que no funcionan "porque algún día funcionan". No. Si no converts en 14 days, no va a convertir nunca con esa audiencia.&lt;/p&gt;

      &lt;h2 id="ejemplo-real"&gt;EJEMPLO REAL&lt;/h2&gt;
      &lt;p&gt;Te pongo el ejemplo de una marca de Supplements food para runners. Llegó a nosotros en octubre de 2023. Tenían un product nuovo, apenas 180 días en el mercado, y estaban quemando presupuesto con una estructura CBO desde el día uno.&lt;/p&gt;
      &lt;p&gt;Tienen una inversión media mensual de 8.000€ en Meta Ads. Venían de una agencia anterior que les había puesto una campaña CBO con seis ad sets. No tenían historiales de conversiones, solo leads de lead ads.&lt;/p&gt;
      &lt;p&gt;El resultado: ROAS de 1.1. Estaban breaks even, essentially perdiendo dinero cuandosumas el coste de producto y shipping.&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Antes:&lt;/strong&gt; Una campaña CBO con seis ad sets budget daily de 270€ (45€ cada uno). Audiencias lookalike basadas en emails de clientes (pero solo tenían 800 contactos). Sin datos de purchase, solo leads.&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Qué hicimos:&lt;/strong&gt; Aplicamos el framework CUAD. Clasificamos: producto nuevo (&lt; 500 conversiones), audiencias cold con few warm data, sin trackeo de conversiones confiables. Decidimos usar ABO temporalmente.&lt;/p&gt;
      &lt;p&gt;Cambiamos a una campaña ABO con tres ad sets de 50€ diario cada uno durante 14 días. Cada ad set con audiences diferentes: interest "running", interest "marathon", interest "fitness nutrition".&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Resultados después de 14 días:&lt;/strong&gt;&lt;/p&gt;
      &lt;ul&gt;
        &lt;li&gt;Interest "running": ROAS 2.3, 34 conversiones, CPM 18€&lt;/li&gt;
        &lt;li&gt;Interest "marathon": ROAS 1.4, 12 conversiones, CPM 22€&lt;/li&gt;
        &lt;li&gt;Interest "fitness nutrition": ROAS 0.9, 6 conversiones, CPM 31€&lt;/li&gt;
      &lt;/ul&gt;
      &lt;p&gt;La decisión definitiva fue obvia. Subimos el presupuesto del ad set "running" a 120€ diarios. Los otros dos los apagamos.&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Después de 6 semanas:&lt;/strong&gt; ROAS promedio de 2.8. Spend mensual de 9.200€, but ahora waren break-even (antes lost money). La diferencia: no era el producto, era la estructura de presupuesto.&lt;/p&gt;
      &lt;p&gt;¿Qué habría pasado si hubiéramos dejado el CBO inicial? Hubieran seguido perdiendo dinero probablemente hasta que la agencia les convencido de que "necesitaban más datos para optimizar". Pero no iban a generate más datos si budgets se quemaba en audiencias incorrectas.&lt;/p&gt;

      &lt;h2 id="pro-tip"&gt;PRO TIP&lt;/h2&gt;
      &lt;p&gt;Aquí viene lo que nobody te dice en los tutorials de YouTube.&lt;/p&gt;
      &lt;p&gt;En Spain specifically, los audiences de interés funcionan different que en Estados Unidos o LATAM. Aquí, los users de Meta interactúan diferente con los intereses. El interés "comprar online" en España tiene casi 6 millones de personas. En Estados Unidos tiene 40 millones. La diferencia: aquí el mercado es más pequeño, more segmentado, y los usuarios responden diferente a los mensajes.&lt;/p&gt;
      &lt;p&gt;Por eso, el CBO muchas veces falla en accounts españolas nuevas. El algoritmo necesita volumen para learning, y si tienes audiencias muy amplias (interest "running" tiene 2.5 millones, interest "fitness" tiene 4.1 millones), pero con un presupuesto limitado (menos de 100€ diário), Meta no puede optimitzar correctamente. Simply because hay demasiados usuarios posibles y demasiado poco presupuesto para encontrar a los que actually van a comprar.&lt;/p&gt;
      &lt;p&gt;Por eso, en España: si tienes menos de 100€ diario, Usa ABO porque concentrated presupuesto en audiencias específicas allow al algoritmo encontrar al público correcto más rápido. Si tienes más de 100€ diario, Usa CBO because hay suficiente presupuesto para dejar que Meta explore.&lt;/p&gt;
      &lt;p&gt;Ese es el secreto que nadie te explica en los cursos de Meta Ads.&lt;/p&gt;

      &lt;h2 id="action-step"&gt;ACTION STEP&lt;/h2&gt;
      &lt;p&gt;Tienes menos de 30 minutos hoy. Esto es lo que vas a hacer:&lt;/p&gt;
      &lt;ol&gt;
        &lt;li&gt;Abre tu Business Manager y ve a la pestaña de campañas&lt;/li&gt;
        &lt;li&gt;Identifica cada campaña: ¿es CBO o ABO actualmente?&lt;/li&gt;
        &lt;li&gt;Responde estas tres preguntas en un papel:
          &lt;ul&gt;
            &lt;li&gt;¿Cuántas conversiones tienes en los últimos 90 días?&lt;/li&gt;
            &lt;li&gt;¿Cuál es tu gasto diario promedio?&lt;/li&gt;
            &lt;li&gt;¿Cuántas campañas activas tienes ahora mismo?&lt;/li&gt;
          &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;Si tienes menos de 500 conversiones Y menos de 100€ daily: cambia la estructura a ABO mañana&lt;/li&gt;
        &lt;li&gt;Si tienes más de 500 conversiones O más de 100€ daily: mantén CBO pero revisando los criterios del Paso 3 dentro de 7 días&lt;/li&gt;
      &lt;/ol&gt;
      &lt;p&gt;Esto takes 20 minutos máximo. No excuses. Tomorrow morning hazlo antes de revisar cualquier otra cosa.&lt;/p&gt;

      &lt;h2 id="recap"&gt;RECAP + CLIFFHANGER&lt;/h2&gt;
      &lt;ul&gt;
        &lt;li&gt;CBO no siempre es mejor. Depends de tu volumen de datos y presupuesto.&lt;/li&gt;
        &lt;li&gt;El framework CUAD tiene cuatro pasos: Clasificar, Una estructura prueba, Análisis rápido, Decisión definitiva.&lt;/li&gt;
        &lt;li&gt;En España, con presupuestos menores a 100€, ABO concentrated funciona better porque permite al algoritmo finding al público correcto más rápido.&lt;/li&gt;
        &lt;li&gt;No optimices por ROAS solo. Necesitas volume de conversiones.&lt;/li&gt;
      &lt;/ul&gt;
      &lt;p&gt;La próxima semana vamos a hablar de cómo estructurar los audiences dentro de cada estrategia. Cuándo usar interests, cuándo usar lookalikes, y cuándo usar retargeting. Because una vez que decides CBO o ABO, el siguiente problema es: ¿con qué audiences alimentas esos budgets?&lt;/p&gt;
      &lt;p&gt;Nos vemos.&lt;/p&gt;

      &lt;div style={{ marginTop: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}&gt;
        &lt;h3&gt;¿Quieres ayuda con tu estrategia de Meta Ads?&lt;/h3&gt;
        &lt;p&gt;Si después de leer este post sigues con dudas sobre qué estructura usar en tu cuenta, podemos hacer una llamadas de diagnóstico de 30 minutos sin compromiso.&lt;/p&gt;
        &lt;p&gt;&lt;Link to="/contact" style={{ color: '#0066cc', fontWeight: 'bold' }}&gt;Agenda tu llamada aquí&lt;/Link&gt;&lt;/p&gt;
      &lt;/div&gt;
    &lt;/BlogPostLayout&gt;
  );
};

export default MetaAdsCboVsAboPage;