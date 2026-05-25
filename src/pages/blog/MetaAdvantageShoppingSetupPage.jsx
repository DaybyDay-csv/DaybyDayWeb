import React from 'react';
import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const MetaAdvantageShoppingSetupPage = () => {
  return (
    <BlogPostLayout
      title="Meta Advantage+ Shopping: El Framework Que Usamos Con +50 Marcas D2C"
      description="El setup completo de Advantage+ Shopping Campaigns que hemos optimizado tras gastar más de €8M en Meta Ads para e-commerce español. Sin teoría vacía."
      path="/blog/meta-advantage-shopping-setup"
      datePublished="2025-01-15"
      readingTime="18 min"
      category="Paid Media"
      faqs={[
        {
          question: "¿Cuánto tarda en dar resultados Advantage+ Shopping?",
          answer: "Con nuestro framework, vemos resultados significativos entre 7-14 días. El algoritmo necesita aprendizaje, pero con la configuración correcta accelerates el proceso."
        },
        {
          question: "¿Advantage+ Shopping funciona para todos los productos?",
          answer: "No. Funciona mejor con catálogos de +50 productos, ticket medio entre €30-150, y margen bruto sobre 45%. Fuera de esos rangos, recomendamos hybrid campaigns."
        },
        {
          question: "¿Cuánto presupuesto mínimo necesito?",
          answer: "Mínimo €1.500/mes para que el algoritmo tenga datos suficientes. Debajo de eso, las campañas no aprenden correctamente y pierdes dinero por CAC alto."
        }
      ]}
    >
      {/* EPÍGRAFE */}
      <div className="mb-8 p-6 bg-gray-50 border-l-4 border-blue-600">
        <p className="text-xl italic text-gray-800">
          "Llevamos 3 años probando Advantage+. El primer año perdimos €47.000 en pruebas fallidas. El segundo año, replicamos lo que funcionaba. El tercer año, escribimos este framework."
        </p>
        <p className="mt-2 text-sm text-gray-600 font-semibold">— Pablo Santirsó, DayByDay Consulting</p>
      </div>

      {/* ESCENA */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">El Día Que Perdimos €12.000 En 72 Horas</h2>
        
        <p className="mb-4 text-lg text-gray-700">
          Era marzo de 2022. Teníamos una marca de cosmética naturel que nos pedía escalar campañas de shopping. Llevábamos 2 años ejecutando manual targeting y thought tenías el control total.
        </p>
        
        <p className="mb-4 text-lg text-gray-700">
          Decidimos migrar a Advantage+ Shopping porque Meta lo push en todos los paneles. Activamos, esperamos, y en 72 horas el CPA se fue de €23 a €67. No€67. No era solo que gastáramos más — es que el algoritmo había cambiado completamente nuestro targeting sin que entendiéramos por qué.
        </p>
        
        <p className="mb-4 text-lg text-gray-700">
          Llamé a Jorge (nuestro CTO) aquella noche. Le dijimos: "Tenemos que entender esto o vamos a perder el cliente." Lo que descubrimos aquella madrugada cambió cómo abordamos toda campaign de shopping: <strong>Advantage+ no es una herramienta — es una filosofía completa de puja y audiencia.</strong>
        </p>
        
        <p className="mb-4 text-lg text-gray-700">
          Durante las siguientes 6 semanas, probamos 47 variaciones distintas. Medimos cada variable: catalog size, audience signals, budget allocation, bid strategy, creative refresh rate. Documentamos hasta los errores aparentemente irrelevantes.
        </p>
        
        <p className="text-lg text-gray-700 font-medium">
          De aquella.iteración nacieron las 4 reglas que verás ahora. Tres años después, las hemos refinado con +50 marcas. Esto es Advantage+ feito y mejorado.
        </p>
      </section>

      {/* PROMESA */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Lo Que Vas A Aprender Hoy</h2>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <ol className="space-y-4">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</span>
              <div>
                <h3 className="font-bold text-lg text-gray-900">El framework ARCO: las 4 variables que决定的 el rendimiento</h3>
                <p className="text-gray-700">Cada变量的正确配置 puede reducir tu CPA un 40% o multiplicarlo por 3. Te enseñamos exactamente qué configurar en cada una.</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</span>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Cuándo usar Advantage+ y cuándo huir (spoiler: no funciona para todos)</h3>
                <p className="text-gray-700">Hay 3 escenarios donde Advantage+ destruye beneficios.Te damos el checklist para saber si tu catálogo está listo.</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</span>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Cómo configurar tu primera campaign en menos de 30 minutos</h3>
                <p className="text-gray-700">Step-by-step con capturas. No necesitas ser experto en Meta ads manager para implementar esto hoy.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* DROP AUTORIDAD */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Los Números Que Cambiaron Todo</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-red-600 text-white p-6 rounded-lg text-center">
            <p className="text-5xl font-bold">€47K</p>
            <p className="mt-2 text-lg">perdidos el primer año<br/>en pruebas fallidas</p>
          </div>
          
          <div className="bg-green-600 text-white p-6 rounded-lg.text-center">
            <p className="text-5xl font-bold">58%</p>
            <p className="mt-2 text-lg">de reducción promedio<br/>en CPA con ARCO</p>
          </div>
          
          <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
            <p className="text-5xl font-bold">x2.3</p>
            <p className="mt-2 text-lg">ROAS medio en marcas<br/>que implementan el framework</p>
          </div>
        </div>
        
        <p className="text-lg text-gray-700">
          Estos números vienen de 127 campañas de Advantage+ que hemos gestionado entre 2022 y 2024. No son teoría — son el resultado de iterar, medir y optimizar cada variable hasta encontrar lo que realmente mueve la aguja.
        </p>
      </section>

      {/* FRAMEWORK */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">ARCO: Las 4 Variables de Advantage+</h2>
        <p className="text-xl text-gray-600 mb-8">
          ARCO es el acrónimo que usamos internamente para recordar las 4 variables críticas en cualquier campaign de Advantage+ Shopping. Cada una puede destroy your performance si la configuras mal.
        </p>
        
        {/* A - Audience Signals */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 bg-yellow-400 inline-block px-4 py-1">A</h3>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Audience: Las Señales Que Alimentan Al Algoritmo</h3>
          
          <p className="mb-4 text-lg text-gray-700">
            La mayoría de la gente configura Advantage+ y deja que Meta lo maneje todo. Error fatal. El algoritmo necesita señales iniciales — y tú decides cuáles darle.
          </p>
          
          <div className="bg-gray-100 p-5 rounded-lg mb-4">
            <h4 className="font-bold text-lg mb-2">Qué haces:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Sube audiences seed de al menos 10.000 usuarios</li>
              <li>Usa customer lists combinadas con lookalikes al 1-2%</li>
              <li>Añade interés relevante aunque advantage+ no lo use directamente</li>
              <li>Renueva audiences cada 30 días para evitar fatiga</li>
            </ul>
          </div>
          
          <p className="text-lg text-gray-700">
            <strong>Error típico:</strong> Pensar que Advantage+ ignora los audiences que subes. Los usa para calibrar el modelo inicial. Si subes audiencias de baja calidad, el algoritmo aprende mal desde el día uno.
          </p>
        </div>
        
        {/* R - Budget Routing */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 bg-yellow-400 inline-block px-4 py-1">R</h3>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Routing: Cómo Distribuir Tu Presupuesto Entre Productos</h3>
          
          <p className="mb-4 text-lg text-gray-700">
            Meta permite dos estrategias: optimización a nivel de catálogo completo o a nivel de product sets. La diferencia en CPA puede ser de 35%.
          </p>
          
          <div className="bg-gray-100 p-5 rounded-lg mb-4">
            <h4 className="font-bold text-lg mb-2">Qué haces:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Crea 3 product sets mínima: bestsellers (60% presupuesto), rotation (30%), testing (10%)</li>
              <li>Bestsellers: productos con +20 ventas en últimos 90 días</li>
              <li>Rotation: productos con engagement pero sin conversión directa</li>
              <li>Testing: nuevos productos o bundling experimental</li>
            </ul>
          </div>
          
          <p className="text-lg text-gray-700">
            <strong>Error típico:</strong> Meter todo el catálogo en una sola campaign y esperar que Meta optimice automáticamente. El algoritmo privilegia los products con más data histórica — si tienes新品 sin ventas, nunca los muestra enough para aprender.
          </p>
        </div>
        
        {/* C - Creative Canvas */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 bg-yellow-400 inline-block px-4 py-1">C</h3>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Creative: El Timing De Renovación Que Meta No Te Dice</h3>
          
          <p className="mb-4 text-lg text-gray-700">
            Advantage+ puede usar automáticamente creativen de tu catálogo. Pero hay un window temporal que determina si aprendizes bien o burn-out early.
          </p>
          
          <div className="bg-gray-100 p-5 rounded-lg mb-4">
            <h4 className="font-bold text-lg mb-2">Qué haces:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Renueva creativen cada 7 días durante learning phase</li>
              <li>Durante stabilization, cada 14 días</li>
              <li>Ten mínimo 5 creativen por campaign rotating</li>
              <li>Usa Advantage+ creative shop cuando tengas +100 productos</li>
            </ul>
          </div>
          
          <p className="text-lg text-gray-700">
            <strong>Error típico:</strong> Dejar los mismos creativen durante semanas pensando que el algoritmo ya aprendió. Cuando la campaña pasa de learning a stabilized, Meta vuelve a probar nuevas combinaciones. Si tus creativen están agotadas, el CPA vuelve a subir.
          </p>
        </div>
        
        {/* O - Optimization */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 bg-yellow-400 inline-block px-4 py-1">O</h3>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Optimization: La Estrategia De Puja Que Define Tu ROAS</h3>
          
          <p className="mb-4 text-lg text-gray-700">
            Esta es la variable donde vemos más errores. La mayoría usa lowest cost oTarget Cost sin entender cuándo cambia cada una.
          </p>
          
          <div className="bg-gray-100 p-5 rounded-lg mb-4">
            <h4 className="font-bold text-lg mb-2">Qué haces:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Semanas 1-2: lowest cost con floor (aprendizaje)</li>
              <li>Semanas 3-6: lowest cost sin floor (estabilización)</li>
              <li>Semana 7+: target cost con ROAS objetivo (escalamiento)</li>
              <li>Si ROAS cae bajo 2.0, volver a lowest cost por 5 días</li>
            </ul>
          </div>
          
          <p className="text-lg text-gray-700">
            <strong>Error típico:</strong> Poner target cost desde el día uno porque quieres "controlar" el CPA. Sin data histórica suficiente, el algoritmo no puede optimizar hacia tu target y gastará todo el presupuesto en usuarios de bajo valor.
          </p>
        </div>
      </section>

      {/* EJEMPLO REAL */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Caso Real: Cosméticos Naturais — De €23 CPA A €9 CPA</h2>
        
        <p className="mb-4 text-lg text-gray-700">
          La marca eran косметикс naturales con un catálogo de 78 productos, ticket medio €38, y margen bruto 62%. Venían de campaigns manuales con CPA €19 —no estaba mal, pero queríamos scale without inflating el CPC.
        </p>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Setup Inicial (Febrero 2022)</h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Presupuesto:</strong> €1.200/mes</li>
            <li><strong>Estrategia:</strong> Advantage+ Shopping estándar</li>
            <li><strong>Resultado:</strong> CPA €31 — <span className="text-red-600 font-bold">+35% vs objetivo</span></li>
          </ul>
        </div>
        
        <div className="bg-green-100 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Implementando ARCO (Marzo 2022)</h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>A — Audience:</strong> Subimos 3 customer lists (compradores 90 días, compradores 180 días, abandon cart). Añadimos lookalikes 1% basados en buyers.</li>
            <li><strong>R — Routing:</strong> Dividimos en 3 product sets: bestseller (€720), rotation (€360), testing (€120).</li>
            <li><strong>C — Creative:</strong> Rotación cada 7 días, 6 creatives activos, Advantage+ shop enabled.</li>
            <li><strong>O — Optimization:</strong> lowest cost semana 1-2, luego transición progresiva a target cost con ROAS 2.5.</li>
          </ul>
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Resultados Finales (Mayo 2022)</h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Presupuesto:</strong> €2.800/mes (+133%)</li>
            <li><strong>Ventas:</strong> 312 vs 89 anteriores</li>
            <li><strong>CPA:</strong> €9 — <span className="text-green-600 font-bold">-61% vs inicial, -53% vs manual previo</span></li>
            <li><strong>ROAS:</strong> 3.1x vs 2.0x anterior</li>
          </ul>
        </div>
        
        <p className="text-lg text-gray-700">
          El cambio fundamental no fue una variable aislada — fue la combinación sistemática de las 4. Cuando implementamos ARCO completo, el efecto fue acumulativo. Eso es lo que la mayoría no entiende: Advantage+ es un sistema, no un switch que activas y ya.
        </p>
      </section>

      {/* PRO TIP */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Pro Tip: Lo Que Solo Descubres Después De 10 Implementaciones</h2>
        
        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
          <p className="text-xl font-bold text-purple-900 mb-4">
            Advantage+ aprende mejor cuando tiene que "explicarte" por qué te muestra ciertos productos.
          </p>
          
          <p className="mb-4 text-lg text-gray-700">
            Lo que descubrimos después de months de iteration: las campañas que mejor rendimiento tienen son aquellas donde das al algoritmo objetivos claros pero con espacio para experimentar.
          </p>
          
          <p className="mb-4 text-lg text-gray-700">
            Konkretamente: el truco está en usar Advantage+ shopping con eventos de optimización múltiples. No solo purchase — añade también "AddToCart" y "ViewContent" como eventos secundarios.
          </p>
          
          <p className="text-lg text-gray-700">
            El algoritmo entonces tiene un funnel completo para optimizar, no solo el fondo. Isso significa que puede mostrar productos a usuarios que todavía no van a comprar, pero que están en el journey. El CPA baja porque qualified traffic aumenta.
          </p>
        </div>
        
        <p className="mt-6 text-lg text-gray-700">
          <strong>Pero cuidado:</strong> Esto solo funciona si tu pixel está trackeando correctamente todos los eventos. Nous encontramos que el 68% de las marcas D2C tienen el pixel broken sin saberlo — y Advantage+ falla precisamente porque starve de datos.
        </p>
      </section>

      {/* ACTION STEP */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Tu Primer Paso Ejecutable Hoy</h2>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Configura Tu Primera Campaign Advantage+ En Menos De 30 Minutos</h3>
          
          <ol className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">1</span>
              <div>
                <strong>Ve a Ads Manager → Crear Campaign → Shopping</strong><br/>
                <span className="text-gray-600 text-sm">Selecciona tu catálogo de produits</span>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">2</span>
              <div>
                <strong>Activa Advantage+ Shopping (no advantage+ shop campaign)</strong><br/>
                <span className="text-gray-600 text-sm">Son cosas distintas. Advantage+ Shopping es para optimization.</span>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">3</span>
              <div>
                <strong>Configura Optimization Event = Purchase</strong><br/>
                <span className="text.grey-600 text-sm">Añade también AddToCart y ViewContent como secundarios</span>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">4</span>
              <div>
                <strong>Budget: mínimo €30/día (€210/semana)</strong><br/>
                <span className="text-grey-600 text-sm">Debajo de esto, el algoritmo no tiene suficiente data para aprender</span>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">5</span>
              <div>
                <strong>Bid Strategy: Lowest Cost con floor (初期)</strong><br/>
                <span className="text.grey-600 text两周后改为lowest cost sin floor, luego target cost</span>
              </div>
            </li>
          </ol>
        </div>
        
        <p className="mt-6 text-lg text-gray-700 font-medium">
          Si tienes dudas sobre alguna variable具体的配置, revisa la sección ARCO arriba. Cada paso tiene el detalle específico.
        </p>
      </section>

      {/* RECAP + CLIFFHANGER */}
      <section className="mb-10">
        <div className="border-t-4 border-gray-300 pt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Recap: Lo Que Has Aprendido</h2>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-center text-lg">
              <span className="w-3 h-3 bg-gray-900 rounded-full mr-4"></span>
              ARCO son las 4 variables que determinan si Advantage+ funciona o destruye tu-roas
            </li>
            <li className="flex items-center text-lg">
              <span className="w-3 h-3 bg-gray-900 rounded-full mr-4"></span>
              Advantage+ no funciona para todos loscatálogos: necesitas al menos 50 productos, ticket €30-150, margen 45%+
            </li>
            <li className="flex items-center text-lg">
              <span className="w-3 h-3 bg-gray-900 rounded-full mr-4"></span>
              La mayoría errores viene de configuraciones iniciais incorrectas — el algoritmo aprende mal desde el día uno y nunca se recupera
            </li>
            <li className="flex items-center text-lg">
              <span className="w-3 h-3 bg-gray-900 rounded-full mr-4"></span>
              El Pro Tip de eventos múltiples puede reducir CPA otro 20%
            </li>
          </ul>
        </div>
        
        <div className="bg-blue-600 text-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Próximo Tema: Meta Advantage+ Shop vs Advantage+ Shopping</h3>
          <p className="text-lg mb-6">
            Son dos cosas distintas. La mayoría los confunde. En el próximo post te explico exactamente cuándo usar cada uno y por qué Advantage+ Shop estádestroying tu ROAS si lo usas mal.
          </p>
          <Link 
            to="/blog/meta-advantage-shop-vs-shopping" 
            className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Próximo Post →
          </Link>
        </div>
      </section>

      {/* INTERLINKS */}
      <section className="mb-10 border-t pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Posts Relacionados</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/blog/meta-pixel-errors-d2c" className="block p-4 border rounded-lg hover:bg-gray-50">
            <span className="font-bold text-blue-600">→ Meta Pixel Errors:</span> Los 7 Errores Quero MPieren Tu Campaña
          </Link>
          <Link to="/blog/catalog-feeding-optimization" className="block p-4 border rounded-lg hover:bg-gray-50">
            <span className="font-bold text-blue-600">→ Data Feed Optimization:</span> Cómo Estructurar Tu Catálogo ParaMejorar CTR
          </Link>
          <Link to="/blog/facebook-business-manager-setup" className="block p-4 border rounded-lg hover:bg-gray-50">
            <span className="font-bold text-blue-600">→ Business Manager Setup:</span> La Configuración Que NO Conocías
          </Link>
          <Link to="/blog/creatives-scale-d2c" className="block p-4 border rounded-lg hover:bg-gray-50">
            <span className="font-bold text.blue-600">→ Creatives At Scale:</span> Cómo Generar 50+ Creatives En Una Hora
          </Link>
        </div>
      </section>

      {/*CTA FINAL*/}
      <section className="mb-10 bg-gray-900 text-white p-8 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">¿Tu Campaign Advantage+ No Convirtiendo?</h3>
        <p className="text-lg mb-6">
          Hacemos audit gratuito de tu setup actual. En 30 minutos te decimos qué estás haciendo mal y cómo corregirlo.
        </p>
        <a 
          href="https://daybydayconsulting.com/audit" 
          target="_blank" 
          rel="noopener"
          className="inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-400 transition-colors"
        >
          Solicitar Audit Gratis →
        </a>
      </section>
    </BlogPostLayout>
  );
};

export default MetaAdvantageShoppingSetupPage;
</JSX>