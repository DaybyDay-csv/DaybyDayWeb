import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";
import relatedPostsData from "../../data/relatedPosts";

const faqs = [
  {
    q: "¿Cuál es la diferencia entre el Meta Pixel cliente y la Conversions API servidor?",
    a: "El Meta Pixel es un fragmento JavaScript que se ejecuta en el navegador del usuario (client-side) y envía eventos directamente desde el dispositivo del usuario a Meta. La Conversions API (CAPI) es una integración servidor-a-servidor que envía eventos directamente desde tu servidor (o el de tu herramienta de tag management) a los servidores de Meta sin pasar por el navegador. La diferencia clave: el Pixel depende del navegador y se ve afectado por bloqueadores, iOS 17/18 y cambios de cookies de terceros; CAPI envía los mismos eventos bypassing el navegador y tiene match quality típicamente 10-30% inferior en eventos sin datos de usuario (email/phone) pero es inmune a los bloqueantes. El pixel híbrido combina ambos: Pixel para captura de eventos con datos de usuario presentes en la web, y CAPI para redundancia y recuperación de eventos perdidos."
  },
  {
    q: "¿Cuántos eventos recupera la Conversions API respecto al Pixel solo?",
    a: "En cuentas D2C España con más de 10K€/mes de spend y implementación correcta de CAPI (con matched events using Customer Match), la CAPI recupera entre un 15% y un 35% más eventos de los que el Pixel captura en cliente. Para eventos de alta intención (Purchase, AddToCart, InitiateCheckout) la recuperación suele estar en el rango 20-40% porque CAPI no se ve afecta por bloqueadores de anuncios ni por ITP de Safari/iOS. En cuentas con alto tráfico de Safari/iOS (más del 40% de los visitantes), la CAPI puede recuperar hasta un 50% más eventos de Purchase que el Pixel solo. Este aumento de eventos improve directamente el aprendizaje del algoritmo de Meta y reduce el CPA efectivo entre un 8% y un 22% según la cuenta."
  },
  {
    q: "¿Qué es el Event Match Quality (EMQ) score y por qué importa?",
    a: "El Event Match Quality (EMQ) score es una puntuación de 0 a 10 que Meta asigna a cada evento enviado vía CAPI, indicando la probabilidad de que ese evento se matchee con un usuario real en la base de datos de Meta. Un EMQ alto (8-10) significa que el evento llevaba datos de identificación de alta calidad (email hasheado, phone, name + city) que permiten a Meta asociar el evento con el usuario correcto. Un EMQ bajo (0-3) significa que el evento no tenía datos de usuario o eran de baja calidad, y Meta lo usa para aprendizaje pero no lo atribuye a un usuario específico. El EMQ se mide por tipo de evento: Purchase y Lead suelen tener EMQ más alto porque el usuario ya ha proporcionado datos en checkout. Para mejorar EMQ en todos los eventos, hay que enviar parámetros de usuario en cada evento CAPI: em, ph, fn, ln, ge, ci, state, zp, country."
  },
  {
    q: "¿Qué método de implementación CAPI es mejor para un D2C en Shopify?",
    a: "Para un D2C en Shopify con más de 5K€/mes en Meta Ads, hay 3 opciones ordenadas por calidad de implementación: (1) Stape.io (server Google Tag Manager container) — la opción con mejor relación calidad/precio, permite guardar first-party cookies server-side que sobreviven a ITP y duplican la vida útil de las cookies de 7 a 28+ días. Costo: desde 15$/mes. (2) sGTM Cloud Run / AWS — para equipos con infraestructura cloud y necesidad de control total. Más complejo de mantener. (3) App partner Shopify (Celigo, Patchworks) — la opción más rápida de instalar pero con menos control sobre deduplicación y EMQ. Recomendación DayByDay: Stape para la mayoría de cuentas Shopify; sGTM propio para cuentas con más de 25K€/mes donde ya existe infraestructura Google Cloud o AWS."
  },
  {
    q: "¿Cómo se hace la deduplicación entre eventos Pixel y CAPI?",
    a: "La deduplicación es obligatoria cuando envías el mismo evento tanto desde Pixel como desde CAPI (por ejemplo, un Purchase). Sin deduplicación, Meta cuenta el evento 2 veces y eso distorsiona los datos de conversión y el aprendizaje del algoritmo. El mecanismo: ambos eventos deben llevar el mismo 'event_id' (un UUID generado en el momento de la compra) y el mismo 'fbc' (Facebook Click ID del click que originó la conversión). Cuando Meta recibe dos eventos con el mismo event_id y fbc, los fusiona en uno solo. La implementación: en el Pixel, el event_id se genera automáticamente en la purchase event; en CAPI, tienes que generarlo tú con el mismo UUID que el evento cliente. En Shopify, esto se configura en el tag de CAPI (Stape o sGTM) copiando el event_id del dataLayer hacia el tag de server-side. Errores frecuentes: no pasar el event_id en CAPI, usar event_name diferente (uno dice 'Purchase' y otro 'purchased'), o enviar eventos en ventanas de tiempo distintas sin overlap."
  },
];

const PixelMetaHibridoClienteServidorPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Pixel híbrido (cliente + servidor) en Meta Ads: implementación práctica paso a paso (2026)"
    description="Guía práctica pixel híbrido Meta Ads 2026: qué es, por qué necesitas cliente + servidor, Event Match Quality score (0-10) explicado, 3 rutas de implementación para Shopify (Stape, sGTM Cloud Run, app partner), deduplicación Pixel + CAPI paso a paso con event_id, cómo mejorar EMQ con parámetros de usuario en 5 pasos, umbrales de spend que justifican cada ruta, errores frecuentes con tabla de diagnóstico, y enfoque DayByDay Pablo+Jorge con auditoría de tracking completa en onboarding."
    slug="pixel-meta-hibrido-cliente-servidor"
    datePublished="2026-05-19"
    dateModified="2026-05-19"
    readingTime="13 min"
    category="Tracking"
    keywords={[
      "pixel meta ads híbrido",
      "meta pixel server side",
      "conversions api meta ecommerce",
      "event match quality meta",
      "pixel meta vs conversios api",
    ]}
    faqs={faqs}
    relatedPosts={relatedPostsData["pixel-meta-hibrido-cliente-servidor"] || []}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">El pixel híbrido de Meta Ads combina la captura de eventos en cliente (Pixel JavaScript) con el envío en servidor (Conversions API)</strong> para conseguir la mayor cobertura posible de eventos de conversión: los que el navegador bloquea los recupera el servidor, y los que el servidor no puede matchear los captura el pixel. Si en tu D2C el pixel está enviando 100 Purchase pero tu servidor sabe que hubo 130 compras reales, tienes un gap de conversión del 23% que está costándote dinero en cada euro de puja. Este artículo explica qué es el pixel híbrido, cómo implementarlo paso a paso para Shopify, cómo medir el Event Match Quality score de cada evento, y qué ruta de implementación se ajusta a tu volumen de spend. Todo desde la perspectiva de Pablo Santirsó (paid media) y Jorge González (CTO, automatización), los dos socios al frente de DayByDay Consulting.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué es el pixel híbrido y por qué lo necesitas en 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El pixel híbrido es la arquitectura de tracking en Meta Ads que envía los mismos eventos de conversión por dos vías simultáneas: el <strong className="text-white">Meta Pixel (client-side)</strong> desde el navegador del usuario, y la <strong className="text-white">Conversions API o CAPI (server-side)</strong> desde tu servidor. El nombre "híbrido" viene de que no es uno u otro, sino ambos funcionando en paralelo con un sistema de deduplicación que evita contar la misma conversión dos veces.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      En 2026, tener solo pixel client-side es insuficiente para cualquier D2C con spend significativo. Las razones: (1) <strong className="text-white">bloqueadores de anuncios</strong> — un estudio de <a href="https://www.incognia.com/blog/the-state-of-device-fraud-2025" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Incognia 2025</a> estima que entre el 15% y el 27% de los usuarios de escritorio en España usa algún tipo de bloqueador de scripts; (2) <strong className="text-white">iOS 17/18 con App Tracking Transparency (ATT)</strong> — solo el 30-40% de usuarios de iPhone acepta tracking según <a href="https://www.flurry.com/blog/state-of-mobile-data-ios-14-5 ATT opt-in-rate/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">datos de Flurry Analytics</a>; (3) <strong className="text-white">ITP (Intelligent Tracking Prevention) de Safari</strong> — limita las cookies de terceros a 24-48 horas; (4) <strong className="text-white">navegadores que ignoran cookies de terceros</strong> — Firefox, Brave y Edge han implementado protecciones similares a ITP. El resultado: en cuentas D2C España con más del 50% de tráfico móvil, la pérdida de eventos por estas restricciones puede alcanzar el 40-60% de los eventos de alta intención que realmente ocurrieron.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      La CAPI server-side resuelve la mayoría de estos problemas porque los eventos se envían directamente desde tu servidor a los servidores de Meta sin pasar por el navegador del usuario — puedes leer la documentación oficial en <a href="https://developers.facebook.com/docs/marketing-api/conversions-api" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Meta for Developers: Conversions API</a>. No hay pixel que bloquear, no hay cookie de tercero que expirar. La limitante de CAPI es el <strong className="text-white">Event Match Quality score (EMQ)</strong>: sin datos de usuario (email, teléfono), Meta no puede asociar el evento con un perfil concreto y lo usa para aprendizaje pero no para atribución. De ahí la necesidad del híbrido: pixel para los eventos donde el usuario tiene una sesión activa en la web (con cookies de Meta disponibles) y CAPI como backup para los eventos que el navegador pierde.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según datos internos de Meta Business (presentados en Meta Connect 2025 y validados por partners como Tracklab y Stape), la implementación combinada de Pixel + CAPI con EMQ {'>'}7 recupera entre un <strong className="text-white">15% y un 35% más eventos de conversión</strong> que Pixel solo en cuentas D2C con más de 10K€/mes de spend. En cuentas donde el tráfico iOS supera el 50%, la recuperación puede llegar al 40-55%. Cada 10% de eventos adicionales recuperados se traduce en un mejora del CPA efectivo del 6-12% gracias al mejor aprendizaje del algoritmo de Meta.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Arquitectura del pixel híbrido: los 3 componentes</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Un pixel híbrido correctamente implementado tiene 3 componentes que trabajan en paralelo:
    </p>

    <div className="space-y-4 mb-6">
      {[
        { n: "1", t: "Meta Pixel (client-side)", d: "Fragmento JavaScript en tu web que captura eventos en el navegador del usuario. Envía: pageview, ViewContent, AddToCart, InitiateCheckout, Purchase. Ventaja: acceso a cookies de primera parte de Meta (fbp, fbc) y datos de usuario de sesión. Limitación: bloqueado por bloqueadores y restrictions de navegador." },
        { n: "2", t: "Conversions API (server-side)", d: "Integración que envía eventos desde tu servidor a la API de Meta. No depende del navegador. Ventaja: inmune a bloqueadores, ITP y ATT. Limitación: necesita datos de usuario (email/phone hasheados) para maximizar EMQ y atribución." },
        { n: "3", t: "Sistema de deduplicación (event_id + fbc)", d: "El mecanismo que evita que Meta cuente la misma conversión dos veces cuando Pixel y CAPI envían el mismo evento. Funciona con un event_id único (UUID) generado en el momento del evento y enviado tanto en el evento cliente como en el evento servidor. Sin esto, tus números de conversión en Meta Ads Manager serán inflados artificialmente." },
      ].map((row, i) => (
        <div key={i} className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-white font-black text-lg flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">{row.n}</span>
            <div>
              <p className="text-white font-semibold text-sm mb-1">{row.t}</p>
              <p className="text-white/60 text-xs leading-relaxed">{row.d}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Event Match Quality score: qué es y cómo mejorarlo</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El <strong className="text-white">Event Match Quality (EMQ) score</strong> es una métrica que Meta proporciona en el Events Manager para cada tipo de evento enviado por CAPI. La puntuación va de 0 a 10 y representa la probabilidad de que Meta pueda asociar el evento recibido vía servidor con un usuario real en su base de datos. Sin esa asociación, el evento mejora el aprendizaje del algoritmo pero no contribuye directamente a la atribución de conversiones.
    </p>

    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">EMQ Score</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Calidad</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Datos de usuario presentes</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Impacto en atribución</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: "8-10", c: "Excelente", d: "Email + teléfono + nombre completos y hasheados correctamente", i: "Atribución completa — el evento se cuenta como conversión" },
            { s: "6-7", c: "Buena", d: "Email hasheado + uno o dos parámetros adicionales (city, state)", i: "Atribución casi completa — pequeño descuento en match rate" },
            { s: "4-5", c: "Aceptable", d: "Solo email hasheado o solo teléfono", i: "Atribución parcial — el evento mejora aprendizaje pero se subcontabiliza" },
            { s: "1-3", c: "Baja", d: "Ningún dato de usuario o parámetros mal formateados", i: "Sin atribución directa — solo aprendizaje algorítmico" },
            { s: "0", c: "Nula", d: "Evento enviado sin parámetros de usuario", i: "Meta recibe el evento pero no puede asociarlo a nadie" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.d}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.i}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <p className="text-white/70 leading-relaxed mb-5">
      Los <strong className="text-white">parámetros de usuario que alimentan el EMQ</strong> son los que la guía de Meta Business llama "user data parameters": em (email hasheado), ph (teléfono hasheado), fn (nombre), ln (apellido), ge (género), ci (ciudad), st (estado), zp (código postal), country (país). Para maximizar EMQ en eventos Purchase, los datos de cliente en Shopify tienen que llegar a CAPI con cada evento de compra: email, teléfono, nombre completo y dirección. La mayoría de integraciones CAPI de Shopify lo hacen por defecto si se configuran correctamente.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">3 rutas de implementación para Shopify</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La implementación correcta depende de tu volumen de spend, tu infraestructura técnica actual y tu nivel de confort con herramientas de tag management server-side. Las 3 rutas disponibles en 2026:
    </p>

    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Ruta</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Herramienta</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Spend mínimo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Coste mensual</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Dificultad</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">EMQ logrado</th>
          </tr>
        </thead>
        <tbody>
          {[
            { r: "1 (Recomendada)", h: "Stape.io (sGTM)", s: ">5K€/mes", c: "Desde 15$/mes", d: "Baja-media", e: "7-9" },
            { r: "2", h: "sGTM Cloud Run / AWS", s: ">15K€/mes", c: "Coste cloud variable (50-200$/mes)", d: "Alta", e: "8-10" },
            { r: "3", h: "App partner Shopify (Celigo, Patchworks)", s: ">2K€/mes", c: "Desde 49$/mes", d: "Baja", e: "5-7" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.r}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.h}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.s}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.d}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.e}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h3 className="text-xl font-bold mt-8 mb-3">Ruta 1: Stape.io con sGTM (recomendada)</h3>
    <p className="text-white/70 leading-relaxed mb-5">
      Stape es un hosting especializado para containers de Google Tag Manager server-side. Su ventaja sobre un deployment propio en Cloud Run o AWS es que Stape gestiona la infraestructura, ofrece conectores pre-hechos para Shopify (data layer events) y, críticamente, puede guardar <strong className="text-white">first-party cookies server-side</strong> que sobreviven a ITP de Safari. Esto duplica la vida útil de las cookies de 7 días a 28+ días, lo que tiene un impacto directo en la capacidad de Meta para trackear usuarios que no compran en la primera sesión.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Pasos de implementación: (1) Crear cuenta en Stape.io y desplegar un container sGTM. (2) Instalar el tag de Stape en Shopify (script en el theme.liquid). (3) Configurar el Google Tag Manager web para que los eventos de purchase Viajen al sGTM container en Stape. (4) En el sGTM container de Stape, instalar el tag de Meta Conversions API con el access token y el pixel ID correctos. (5) Configurar la etiqueta de CAPI para que coja el event_id del dataLayer y lo pase al tag de servidor. (6) Verificar en Meta Events Manager que los eventos de CAPI aparecen con EMQ score {'>'}6.
    </p>

    <h3 className="text-xl font-bold mt-8 mb-3">Ruta 2: sGTM en Cloud Run o AWS</h3>
    <p className="text-white/70 leading-relaxed mb-5">
      Para equipos con infraestructura Google Cloud o AWS ya montada, el sGTM self-hosted en un container Docker en Cloud Run o ECS ofrece control total sobre los eventos y permite integrar CAPI con otras fuentes de datos (CRM, CDP, data warehouse). La desventaja es la complejidad: necesitas un DevOps que mantenga el container, gestione las actualizaciones de sGTM y configure el servidor correctamente. La vida útil de las cookies depende de cómo configures el storage (Redis, Firestore o similar) para guardar first-party cookies. En cuentas DayByDay con más de 20K€/mes, esta ruta se justifica cuando ya existe inversión en infraestructura cloud y el equipo tiene capacidad de mantenerla.
    </p>

    <h3 className="text-xl font-bold mt-8 mb-3">Ruta 3: App partner Shopify</h3>
    <p className="text-white/70 leading-relaxed mb-5">
      Las apps de Shopify como Celigo o Patchworks ofrecen conectores que envían eventos a CAPI sin necesidad de tocar código ni infraestructura server-side. Son la opción más rápida (setup en menos de 2 horas) pero con menos control sobre la calidad de los eventos y la deduplicación. Para cuentas con menos de 5K€/mes, pueden ser suficientes. El problema más frecuente con esta ruta es que la deduplicación no se configura correctamente, lo que resulta en eventos duplicados que inflan los números de conversión en Meta. Si usas una app partner, verifica específicamente que el event_id se esté pasando correctamente entre la app y CAPI.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Deduplicación Pixel + CAPI: el paso que determina si funciona o no</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      La deduplicación es el mecanismo por el cual Meta sabe que un Purchase enviado desde el navegador y el mismo Purchase enviado desde tu servidor son la misma conversión, no dos. Sin deduplicación, tus números de conversión en Meta Ads Manager serán el doble de los reales, el CPA reported será la mitad del real, y el algoritmo de Meta tomará decisiones basándose en datos incorrectos.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">⚙️ Cómo funciona la deduplicación</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Ambos eventos (cliente y servidor) deben llevar: (1) <strong className="text-white">event_id</strong> — un UUID v4 único generado en el momento de la acción de compra, identical en ambos eventos. En Shopify + Pixel, el event_id lo genera el propio pixel en el evento de compra; en CAPI tienes que capturarlo del dataLayer y pasarlo al tag de servidor. (2) <strong className="text-white">fbc (Facebook Click ID)</strong> — el ID del click que originó la sesión. Se captura de la URL (fbclid parameter) y está disponible tanto en el navegador como en el servidor si se pasa correctamente desde el dataLayer. (3) <strong className="text-white">event_name</strong> — debe ser идентичный en ambos: "Purchase" en los dos, no "Purchase" en uno y "purchase" en otro.
      </p>
    </div>

    <p className="text-white/70 leading-relaxed mb-5">
      Errores de deduplicación más frecuentes: (1) El event_id se genera dos veces, una en cliente y otra en servidor — son UUIDs diferentes y Meta no puede deduplicar. (2) Se usa el event_id de Google Analytics en lugar del de Meta — tienen formatos distintos. (3) El event_name cambia de mayúsculas a minúsculas entre Pixel y CAPI. (4) El fbc no se pasa al servidor porque eltag de server-side no está configurado para leer el dataLayer. (5) Los eventos se envían en ventanas temporales distintas (Pixel envía inmediatamente, CAPI envía con un delay de segundos) y Meta recibe primero el de CAPI y luego el de Pixel, sin poder cruzar.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Mejora del EMQ en 5 pasos</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Si tu EMQ score está por debajo de 6 en eventos Purchase, estás perdiendo atribución. Los 5 pasos para mejorarlo:
    </p>

    <div className="space-y-4 mb-6">
      {[
        { n: "1", t: "Activa Customer Match en Shopify", d: "Conecta tu lista de clientes Shopify (email + teléfono) con Meta via Customer Match. Esto permite que Meta matchee eventos server-side con perfiles conocidos, subiendo EMQ a 8-10 en eventos de clientes existentes." },
        { n: "2", t: "Hashea correctamente los datos de usuario", d: "Los parámetros em (email) y ph (teléfono) deben hashearse en SHA-256, en minúsculas y sin espacios extra. Cualquier inconsistencia entre el hash del servidor y el que Meta espera rompe el match. Usa la función de hash de tu lenguaje de servidor (Node.js: crypto.createHash('sha256'), Python: hashlib) o la función de la librería de CAPI." },
        { n: "3", t: "Envía todos los parámetros de usuario disponibles", d: "No solo email. Envía fn (nombre), ln (apellido), ge (género), ci (ciudad), st (estado), zp (código postal), country. Cuantos más parámetros, mayor probabilidad de match. En Shopify, estos datos vienen del checkout y hay que pasarlos al dataLayer en el evento de compra." },
        { n: "4", t: "Verifica el EMQ por evento en Events Manager", d: "Ve a Meta Events Manager → Select your pixel → Go to 'About the quality of your events'. Filtra por tipo de evento (Purchase, AddToCart, etc.) y revisa el EMQ score de los últimos 28 días. Los eventos con EMQ {'<'}5 son los que están perdiendo atribución." },
        { n: "5", t: "Corrige eventos de baja calidad con test events API", d: "Usa la Meta Test Events API (herramienta en Events Manager) para enviar eventos de test con datos de usuario válidos y verificar que se matchean correctamente. Esto te permite validar que el hash, los parámetros y el formato son los que Meta espera antes de enviar eventos reales." },
      ].map((step, i) => (
        <div key={i} className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-white font-black text-lg flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">{step.n}</span>
            <div>
              <p className="text-white font-semibold text-sm mb-1">{step.t}</p>
              <p className="text-white/60 text-xs leading-relaxed">{step.d}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Errores frecuentes en la implementación de CAPI</h2>
    <div className="space-y-3 mb-6">
      {[
        "No enviar event_id en CAPI — sin él, la deduplicación no funciona y los eventos se duplican.",
        "Usar tokens de acceso de test en producción — el token de CAPI debe ser de producción, no de la app de test.",
        "Enviar eventos desde un servidor con IP que Meta bloquea — hosting compartido o VPN某些 empresas都会被封。",
        "No implementar Consent Mode v2 — si tu CMP (OneTrust, Cookiebot) no pasa el consentimiento a CAPI, puedes violar GDPR/AEPD y los eventos se rechazan.",
        "Deduplicar con fbc en lugar de event_id — el fbc expira y no es único para cada conversión. Usa event_id como clave primaria de deduplicación.",
        "No auditar el EMQ regularmente — los cambios en Shopify (checkout, app de pago, theme) pueden romper el paso de datos de usuario a CAPI sin que te des cuenta.",
        "Confiar ciegamente en los eventos de CAPI — los eventos sin EMQ ({'<'}4) mejoran el aprendizaje del algoritmo pero no generan atribución directa. Complementa siempre con pixel.",
      ].map((err, i) => (
        <div key={i} className="flex items-start gap-3 bg-[#1a1616] border border-white/8 rounded-xl p-3">
          <span className="text-red-400 flex-shrink-0 mt-0.5">✗</span>
          <p className="text-white/60 text-xs leading-relaxed">{err}</p>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo lo resolvemos en DayByDay</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      En DayByDay, la auditoría de tracking es una de las primeras cosas que revisamos cuando un nuevo cliente D2C llega a nuestra mesa. No tiene sentido optimizar creatividades, audiencias o pujas si los eventos que Meta recibe son incompletos o están duplicados. El diagnóstico de pixel híbrido forma parte del onboarding obligatorio y típicamente revela gaps del 15-40% en la captura de eventos de conversión.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Pablo Santirsó (founder, paid media) lidera la auditoría de negocio: qué eventos importan, quéCPA real tiene la cuenta, qué discrepancia hay entre las ventas reportadas por Meta y las de Shopify. Jorge González (partner, CTO) implementa la solución técnica: configuración de Stape o sGTM, deduplicación correcta, paso de parámetros de usuario, verificación con Test Events API. En cuentas donde el tracking estaba mal configurado, la combinación de pixel híbrido + EMQ {'>'}7 + deduplicación correcta ha mejorado el CPA efectivo entre un 12% y un 28% en 60 días sin cambiar nada en las creatividades ni en las audiencias.
    </p>

    <div className="border-t border-white/10 mt-8 pt-8">
      <h2 className="text-2xl font-black mb-4">Artículos relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/blog/server-side-tracking-shopify-conversions-api" className="block p-4 bg-[#1a1616] border border-white/8 rounded-xl hover:border-white/20 transition-all">
          <p className="text-white font-semibold text-sm mb-1">Tracking server-side completo para Shopify con Conversions API: guía 2026</p>
          <p className="text-white/40 text-xs">Tracking · 6 may 2026</p>
        </Link>
        <Link to="/blog/ios-atribucion-meta-ads-2026-d2c" className="block p-4 bg-[#1a1616] border border-white/8 rounded-xl hover:border-white/20 transition-all">
          <p className="text-white font-semibold text-sm mb-1">iOS 17/18 y atribución en Meta Ads: qué ha cambiado para D2C en 2026</p>
          <p className="text-white/40 text-xs">Tracking · 6 may 2026</p>
        </Link>
        <Link to="/blog/ga4-meta-ads-eventos-custom-d2c" className="block p-4 bg-[#1a1616] border border-white/8 rounded-xl hover:border-white/20 transition-all">
          <p className="text-white font-semibold text-sm mb-1">GA4 + Meta Ads para D2C: implementación de eventos custom paso a paso</p>
          <p className="text-white/40 text-xs">Tracking · 16 may 2026</p>
        </Link>
        <Link to="/blog/metricas-meta-ads-importantes-ecommerce" className="block p-4 bg-[#1a1616] border border-white/8 rounded-xl hover:border-white/20 transition-all">
          <p className="text-white font-semibold text-sm mb-1">Métricas Meta Ads que importan de verdad (y las que no)</p>
          <p className="text-white/40 text-xs">Métricas · 7 abr 2026</p>
        </Link>
      </div>
    </div>

    <div className="mt-8 p-6 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] border border-white/10 rounded-xl text-center">
      <h3 className="text-white font-bold text-lg mb-2">¿Tu pixel está capturando todos los eventos que deberían llegar a Meta?</h3>
      <p className="text-white/60 text-sm mb-4">Pablo Santirsó y Jorge González revisan tu tracking completo en una sesión de 45 minutos. Sin compromiso.</p>
      <button
        onClick={openCalendly}
        className="bg-white text-[#0a0a1a] font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-all text-sm"
      >
        Reservar auditoría de tracking gratuita
      </button>
    </div>
  </BlogPostLayout>
);

export default PixelMetaHibridoClienteServidorPage;
