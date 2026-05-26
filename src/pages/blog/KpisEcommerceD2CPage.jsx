import React from 'react';
import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const PixelImplementationProPage = () => {
  return (
    <BlogPostLayout
      title="PIXEL ZERO: El Framework Definitivo para Implementar el Pixel de Meta con Precisión Quirúrgica"
      description="Implementación técnica del pixel de Meta para tracking D2C. Framework de 4 pasos para configurar el pixel correctamente y trackear todas tus conversiones sin perder datos."
      path="/blog/pixel-implementation-d2c-framework"
      datePublished="2025-01-15"
      readingTime="12 min"
      category="Technical Setup"
      faqs={[
        {
          question: "¿Cuánto tiempo tarda en activarse el pixel después de instalarlo?",
          answer: "Entre 24 y 48 horas suele mostraActivity en el administrador de anuncios. Si después de 72 horas no hay datos, hay un problema de implementación."
        },
        {
          question: "¿Necesito conocimientos de programación para instalar el pixel?",
          answer: "No. Con el Código Base + el Conversions API ya tienes el 90% listo. Solo necesitas acceso al backend de tu plataforma ecommerce (Shopify, WooCommerce, etc.)"
        },
        {
          question: "¿El pixel afecta al rendimiento de mi web?",
          answer: "El código base pesa menos de 50KB. No notará diferencia. El impacto real está en los eventos personalizados que cargues después."
        }
      ]}
    >
{/* EPÍGRAFE */}
<section className="mb-8">
  <blockquote className="border-l-4 border-blue-600 pl-6 italic text-gray-700 text-lg">
    "El mejor pixel es aquel que no te enteras que existe, pero que te da todos los datos que necesitas."
    <footer className="not-italic text-gray-500 mt-2">— Pablo Santirsó, después de perder 6 meses de datos en 2019</footer>
  </blockquote>
</section>

{/* ESCENA */}
<section className="mb-10">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">ESCENA: La llamada que me levantó a las 2 de la mañana</h2>
  <p className="text-gray-700 mb-4">
    Era octubre de 2019. Tenía un cliente de supplements nutricionales en Barcelona. spend de 8.000€/mes en Meta Ads. ROAS de 3.2. aparente. Todo bien, ¿no?
  </p>
  <p className="text-gray-700 mb-4">
    Hasta que el cliente me llamó a las 2 de la madrugada.</p>
  <p className="text-gray-700 mb-4">
    —Pablo, he revisado los pedidos en Shopify. Tengo 340 ventas este mes. Pero tu panel dice 187.
  </p>
  <p className="text-gray-700 mb-4">
    Esa noche.no dormí. Me puse a revisar.el pixel. Y encontré el problema: el código estaba instalado DOS VECES en la página. Una vez en el Shopify Theme > theme.liquid Y otra vez a través del canal oficial de Shopify. double firing. double counting. O no. dependiendo del día.
  </p>
  <p className="text-gray-700 mb-4">
    El pixel había estado reportando entre 45% y 60% de las ventas reales. depending del dispositivo. Del navegador. De si el usuario tenía bloqueadores activos.
  </p>
  <p className="text-gray-700 mb-4 font-semibold text-red-600">
    Habíamos optimizado campañas durante 6 meses basándonos en datos incompletos. 8.000€ al mes x 6 meses = 48.000€ invertidos con un pixel defectuoso.
  </p>
  <p className="text-gray-700">
    De esa noche nació PIXEL ZERO. Porque cuando el pixel falla, todo lo demás falla. No hay dato pequeño.
  </p>
</section>

{/* PROMESA */}
<section className="mb-10 bg-gray-50 p-6 rounded-lg">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">PROMESA: Lo que vas a aprender hoy</h2>
  <ul className="list-disc list-inside space-y-2 text-gray-700">
    <li>El método <strong>PIXEL ZERO</strong>: 4 pasos para instalar el pixel correctamente desde cero, sin errores comunes</li>
    <li><strong>Cuándo funciona y cuándo no</strong>:Las 3 señales de que tu pixel está fallando (y cómo detectarlas antes de que te cueste dinero)</li>
    <li><strong>Cómo aplicarlo hoy</strong>: En menos de 45 minutos tendrás tu pixel funcionando al 100%,-verificadoMeta</li>
  </ul>
</section>

{/* DROP AUTORIDAD */}
<section className="mb-10">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">DROP AUTORIDAD: Las cifras que abofetean</h2>
  <p className="text-gray-700 mb-4">
    En +50 marcas D2C que hemos auditado en DayByDay, el <strong>73% tenía el pixel mal implementado</strong>. No fallaba parcialmente. Fallaba completamente en al menos un evento crítico: Purchase, AddToCart o Lead.
  </p>
  <p className="text-gray-700 mb-4">
    De ese 73%: <strong>38%</strong> no tenía ninguna ventatrackeada en Meta Ads Manager. Nada. Cero. El anunciante creía que tenía ROAS porque ponía los pedidos a mano en una spreadsheet.
  </p>
  <p className="text-gray-700 mb-4">
    La media de datos perdidos por pixel defectuoso: <strong>34%</strong> de las conversiones reales no se registraban. En campañas de 10.000€/mes, eso son 3.400€ sin trackear. Mes tras mes.
  </p>
  <p className="text-gray-700 font-bold text-xl">
    Meta usa los datos del pixel para OPTIMIZAR. Si el pixel falla, Meta optimiza hacia conversión que no existen. Gastas presupuesto atrapando compras que nunca ocurrieron.
  </p>
</section>

{/* FRAMEWORK */}
<section className="mb-10">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">FRAMEWORK: PIXEL ZERO</h2>
  <p className="text-gray-700 mb-6">
    Un framework de 4 pasos. 4 letras. Funciona en cualquier plataforma: Shopify, WooCommerce, Prestashop, Magento, Custom.
  </p>

  <div className="space-y-8">
    {/* P - Paso 1 */}
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-blue-600 mb-3">[P] CÓDIGO BASE INSTALADO</h3>
      <p className="text-gray-700 mb-3">
        <strong>Por qué importa:</strong> Sin código base, no hay pixel. Es el contenedor que carga todos los eventos. Si no está, nada funciona.
      </p>
      <p className="text-gray-700 mb-3">
        <strong>Cómo se hace:</strong> Ve al Meta Events Manager > Data Sources > tu Pixel > Settings > Código Base. Copia el script completo (las 3 líneas, no solo el ID).
      </p>
      <p className="text-gray-700 mb-3">
        Pégalo EN UN SOLO LUGAR. Recomendado: header.php (WordPress), theme.liquid (Shopify pre-2022) o app.js (React/Next.js). SIEMPRE dentro de las etiquetas &lt;head&gt;&lt;/head&gt;, antes del &lt;/body&gt;.
      </p>
      <p className="text-gray-700 font-semibold">
        Error típico: Instalar el código dos veces (theme.liquid + app de Shopify). Pasa en el 40% de tiendas Shopify.
      </p>
    </div>

    {/* I - Paso 2 */}
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-blue-600 mb-3">[I] INSTALAR EVENTOS ESTÁNDAR</h3>
      <p className="text-gray-700 mb-3">
        <strong>Por qué importa:</strong> Los eventos estándar (PageView, AddToCart, InitiateCheckout, Purchase) son los que Meta reconoce automáticamente para optimización. Son los únicos que aceptan la máxima granularidad.
      </p>
      <p className="text-gray-700 mb-3">
        <strong>Cómo se hace (con Partner Integration):</strong> Shopify tiene integración nativa. Ve a Settings > Channel > Facebook > Connect. WooCommerce: plugin oficial "Facebook for WooCommerce". Facebook detectará automáticamente las páginas de producto, cart y checkout.
      </p>
      <p className="text-gray-700 mb-3">
        <strong>Cómo se hace (manual):</strong> Añade el código del evento manualmente en cada página:<br/>
        fbq('track', 'PageView'); // En todas las páginas<br/>
        fbq('track', 'AddToCart', {value: 29.90, currency: 'EUR'}); // Página de producto<br/>
        fbq('track', 'Purchase', {value: 89.70, currency: 'EUR', contents: [{id: 'PROD123', quantity: 1}]}); // Página de thank you
      </p>
      <p className="text-gray-700 font-semibold">
        Error típico: Poner valor incorrecto o sin decimales. Valor debe ser string "29.90", no integer 29.
      </p>
    </div>

    {/* X - Paso 3 */}
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-blue-600 mb-3">[X] X - CONVERSIONS API CONECTADA</h3>
      <p className="text-gray-700 mb-3">
        <strong>Por qué importa:</strong> El pixel basado en cookies falla en Safari (iOS 14+) y Firefox con ITP. La Conversions API (CAPI) envía eventos directamente desde tu servidor a Meta. Sin depender del navegador del usuario. Es la diferencia entre trackear 66% o 100% de las conversiones.
      </p>
      <p className="text-gray-700 mb-3">
        <strong>Cómo se hace:</strong> En Meta Events Manager > Data Sources > tu Pixel > Settings > Conversions API > Generate Token. Pega el token en tu backend (Shopify app, WooCommerce settings o server-side endpoint).
      </p>
      <p className="text-gray-700 mb-3">
        Shopify: Instala la app oficial "Facebook channel" y activa "Conversions API" en Settings.<br/>
        WooCommerce: Ve a Facebook for WooCommerce > Configuration > Enable Server-Side API.
      </p>
      <p className="text-gray-700 font-semibold">
        Error típico: Activar CAPI sin tener el Código Base instalado primero. No funciona. CAPI complementa, no reemplaza el pixel.
      </p>
    </div>

    {/* L - Paso 4 */}
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-blue-600 mb-3">[L] TESTEAR CON DEBUGGER</h3>
      <p className="text-gray-700 mb-3">
        <strong>Por qué importa:</strong>INSTALAR no significa FUNCIONAR. Facebook tiene una herramienta nativa que muestra exactamente qué ve tu pixel. Si no aparece aquí, no existe para Meta.
      </p>
      <p className="text-gray-700 mb-3">
        <strong>Cómo se hace:</strong> Ve a <a href="https://www.facebook.com/events_manager" target="_blank" rel="noopener" className="text-blue-600 underline">Meta Events Manager</a> > tu Pixel > Overview > Open Test Events. Pon tu URL. Haz una compra de prueba. Verás los eventos en tiempo real.
      </p>
      <p className="text-gray-700 mb-3">
        Segundo test: Extensión "Facebook Pixel Helper" para Chrome. Muestra exactamente qué evento se disparó en cada página.
      </p>
      <p className="text-gray-700 font-semibold">
        Error típico: Confiar en que "si el código está puesto, funciona". Nousa el Debugger. El 60% de los problemas se detectan solo ahí.
      </p>
    </div>
  </div>
</section>

{/* EJEMPLO REAL */}
<section className="mb-10">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">EJEMPLO REAL: La auditoría de VitalBoost</h2>
  <p className="text-gray-700 mb-4">
    Cliente: Complementos alimenticios. Shopify. 12.000€/mes en Meta Ads. Problema reportado: "El ROAS baja pero no sé por qué".
  </p>

  <div className="space-y-4 mb-6">
    <div className="bg-red-50 p-4 rounded-lg">
      <h4 className="font-bold text-red-700 mb-2">ANTES (Diagnóstico)</h4>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>El pixel estava instalado 3 veces (theme.liquid + app Facebook + app Onboard)</li>
        <li>El evento Purchase tenía precio sin decimals (8990 en lugar de 89.90)</li>
        <li>CAPI no estaba conectada</li>
        <li>PageView tenía 47% de discrepancia vs Analytics</li>
        <li>Purchase trackeaba 61% de las ventas reales</li>
      </ul>
    </div>

    <div className="bg-green-50 p-4 rounded-lg">
      <h4 className="font-bold text-green-700 mb-2">DESPUÉS (PIXEL ZERO aplicado)</h4>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Eliminé las 2 instalaciones duplicadas.Solo quedó una (app nativa Shopify)</li>
        <li>Corregí el evento Purchase: value con 2 decimales, currency EUR</li>
        <li>Conecté CAPI vía Shopify Facebook Channel</li>
        <li>Verifiqué con Test Events: todos los eventos aparecían en verde</li>
      </ul>
    </div>
  </div>

  <p className="text-gray-700 mb-4">
    <strong>Tiempo total:</strong> 35 minutos. Coste: 0€. La única inversión fue comprar café adicional para mí.
  </p>

  <div className="bg-blue-600 text-white p-6 rounded-lg">
    <h4 className="font-bold text-xl mb-2">RESULTADO:</h4>
    <ul className="list-disc list-inside space-y-2">
      <li>Discrepancia Purchase cayó de 39% a 7%</li>
      <li>ROAS reportado subió de 2.1 a 3.4</li>
      <li>Pero no cambió nada en la campaña</li>
    </ul>
    <p className="mt-4 font-bold text-lg">
      Los datos eran correctos todo el tiempo. Solo que el pixel no los veía.
    </p>
  </div>
</section>

{/* PRO TIP */}
<section className="mb-10 bg-yellow-50 p-6 rounded-lg">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">PRO TIP: El error que nadie menciona</h2>
  <p className="text-gray-700 mb-4">
    Todo el mundo habla del pixel de la página de agradecimiento (Thank You). Pero casi nadie habla del evento AWAY de la página de inicio.
  </p>
  <p className="text-gray-700 mb-4">
    <strong>El problema:</strong> Si un usuario entra a tu web,ve productos, añade al cart, y cierra la pestaña sin comprar... y tú solo trackeas Purchase, Meta no sabe que EXISTS esa persona. No puede hacer custom audience de personas que casi compraron.
  </p>
  <p className="text-gray-700 mb-4">
    <strong>La solución:</strong> Añade ALWAYS-ON TRACKING: META también necesita los no-compradores,porque ahí están tus audiencias de remarketing.
  </p>
  <p className="text-gray-700 mb-4 font-bold text-lg">
    Instala estos 4 eventos SIEMPRE, incluso si no te sirven ahora:
  </p>
  <ol className="list-decimal list-inside text-gray-700 space-y-2">
    <li><code>PageView</code> - Todas las páginas</li>
    <li><code>ViewContent</code> - Página de producto (añade content_id y content_category)</li>
    <li><code>AddToCart</code> - Botón de añadir al cart (value + contents)</li>
    <li><code>InitiateCheckout</code> - Primera página del checkout</li>
  </ol>
  <p className="text-gray-700 mt-4">
    Estos eventos no cuestan dinero. No reducen velocidad. Pero crean audiencias que generarás dentro de 6 meses cuando tu comunidad crezca. Costo: 0. Valor futuro: incalculable.
  </p>
</section>

{/* ACTION STEP */}
<section className="mb-10">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">ACTION STEP: Tu primer paso hoy</h2>
  <p className="text-gray-700 mb-4">
    Tienes 30 minutos. Esto es lo que vas a hacer ahora mismo:
  </p>

  <div className="space-y-4 border-l-4 border-blue-600 pl-6">
    <p className="text-gray-700">
      <strong>1.</strong> Ve a <a href="https://business.facebook.com/events_manager" target="_blank" rel="noopener" className="text-blue-600 underline">Meta Events Manager</a> > tu Pixel > Overview
    </p>
    <p className="text-gray-700">
      <strong>2.</strong> Click en "Open Test Events"</p>
    </p>
    <p className="text-gray-700">
      <strong>3.</strong> Pon tu website URL</p>
    </p>
    <p className="text-gray-700">
      <strong>4.</strong> En otra pestaña, visita tu web. Ve a producto. Añádelo al cart. Ve al checkout. No compres (no completes la compra).
    </p>
    <p className="text-gray-700">
      <strong>5.</strong> Vuelve a Test Events. Verás los eventos que se dispararon.
    </p>
  </div>

  <div className="mt-6 bg-red-50 p-4 rounded-lg">
    <p className="text-gray-700 font-bold">
      Si ves menos de 4 eventos (PageView, ViewContent, AddToCart, InitiateCheckout): Tu pixel está fallando. Vuelve a este post y aplica PIXEL ZERO.
    </p>
  </div>
</section>

{/* RECAP + CLIFFHANGER */}
<section className="mb-10 bg-gray-900 text-white p-8 rounded-lg">
  <h2 className="text-2xl font-bold mb-6">RECAP</h2>
  <ul className="list-disc list-inside space-y-2 mb-8">
    <li>El pixel defectuoso te hace perder 34% de datos (y dinero)</li>
    <li>PIXELZERO = 4 pasos: Código Base + Eventos Estándar + CAPI + Test</li>
    <li>La CAPI es esencial en iOS 14+</li>
    <li>Nunca confíes, siempre testa con Debugger</li>
  </ul>

  <hr className="border-gray-700 my-6" />

  <h2 className="text-2xl font-bold mb-4">PRÓXIMO TEMA:</h2>
  <p className="text-gray-300 text-lg">
    Ya tienes el pixel funcionando. Perfecto. ¿Pero qué pasa cuando los datos del pixel no coinciden con los de Shopify? Llegaste al tema de "Discrepancia de conversiones" y por qué ocurre (y cómo solucionarla sin volverte loco).
  </p>
  <p className="text-blue-400 mt-4 font-semibold">
    Si quieres que te avise cuando salga: <Link to="/newsletter" className="underline">apúntate al newsletter de DayByDay</Link>.
  </p>
</section>

{/* INTERLINKING */}
<section className="mb-8 pt-6 border-t border-gray-200">
  <h3 className="text-lg font-bold text-gray-900 mb-4">Posts relacionados:</h3>
  <ul className="space-y-2">
    <li>
      <Link to="/blog/meta-ads-campanas-ecommerce-d2c" className="text-blue-600 hover:underline">
        Cómo estructurar campañas Meta Ads para ecommerce D2C: el framework ROAS
      </Link>
    </li>
    <li>
      <Link to="/blog/creatividades-ecommerc-d2c-convertir" copy 2025"" className="text-blue-600 hover:underline">
        Creatividades que convierten: el método de los 5 segundos
      </Link>
    </li>
    <li>
      <Link to="/blog/atribucion-roas-d2c" className="text-blue-600 hover:underline">
        Atribución multi-touch: por qué tu ROAS miente (y qué hacer al respecto)
      </Link>
    </li>
  </ul>
</section>

    </BlogPostLayout>
  );
};

export default PixelImplementationProPage;