import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Cuál es el presupuesto mínimo real para empezar Meta Ads?",
    a: "150€/mes (5€/día). Con eso Meta aprende lo básico. No necesitas 3.000€/mes para probar. Lo que sí necesitas es paciencia: 30 días minimum. Con menos de 30 días no hay datos fiables.",
  },
  {
    q: "¿Cuántas ventas necesito para saber si mi producto funciona en Meta?",
    a: "Mínimo 15 ventas en 30 días. Con menos, es ruido estadístico. Si no llegas a 15, el problema puede ser: (1) producto no tiene tracción, (2) creativa mala, (3) audiencia equivocada. Revisa estas 3 cosas antes de culpar a Meta.",
  },
  {
    q: "¿Qué hago si el ROAS está por debajo de 1.5x?",
    a: "Antes de matar la campaña, cambia 2 cosas: (1) Audienia —si estás usando intereses muy amplios, estrecha; si muy estrecho, amplía a lookalike. (2) Creatividad —menos descripción, más hook en los primeros 3 segundos. Una buena creatividad puede multiplcar ROAS por 3x con el mismo presupuesto.",
  },
  {
    q: "¿Puedo probar con menos de 150€?",
    a: "Técnicamente 5€/día es el mínimo de Meta. Menos de eso y el algoritmo no tiene datos para aprender. Recomendamos 150€/mes como punto de partida razonable. Si no tienes ni eso, mejor ahorra y espera a tener el presupuesto antes de entrar.",
  },
  {
    q: "¿Cuánto tarda Meta en aprender?",
    a: "48-72 horas el algoritmo sale del learning phase. Pero para ты tener datos статистически significativos necesitas 7-14 días mínimo. No midas antes de 2 semanas. Muchos apagan campañas a los 3 días pq 'no funciona' cuando el algoritmo apenas empezó.",
  },
];

const PresupuestoMinimoMetaAdsPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Presupuesto mínimo Meta Ads sin tirar dinero: Guía práctica 2026"
    description="Cuál es el presupuesto mínimo para Meta Ads sin tirar dinero. Guía práctica para ecommerce D2C España. No necesitas 10K€ para empezar - con 150€/mes puedes validar tu producto."
    slug="presupuesto-minimo-meta-ads-sin-tirar-dinero"
    datePublished="2026-05-26"
    dateModified="2026-05-26"
    readingTime="6 min"
    category="Estrategia"
    keywords={[
      "presupuesto meta ads",
      "cuanto invertir meta ads",
      "presupuesto minimo meta ads",
      "empezar meta ads",
      "meta ads ecommerce espana",
    ]}
    faqs={faqs}
  >
    <h2 style={{marginTop: '2rem'}}>Epígrafe</h2>
    <blockquote className="callout">
      <p>"No gastes 5.000€ donde bastan 500€. Eso aprendí después de tirar 12.000€ en 3 meses." — Feb 2025</p>
    </blockquote>

    <h2>Escena de apertura</h2>
    <p>Era febrero de 2025. Un cliente de supplements me mandaba un WhatsApp a las 11 de la noche:</p>
    <p><em>"Oye Pablo, mi agencia me dice que necesito invertir 3.000€/mes mínimo para que Meta funcione. Es eso cierto?"</em></p>
    <p>Le pedí su cuenta. Llevaba 4 meses gastando 2.400€/mes. Habia generado 4 ventas. CAC: 600€. Cada venta le costaba 600€ en publicidad. El margen del producto era 80€.</p>
    <p><strong>"Le estás perdiendo 520€ por venta. Con ese gasto, el negocio te sale a pérdida."</strong></p>
    <p>Silencio en el chat. Luego escribió: <em>"Entonces qué hago?"</em></p>
    <p>Le contesté: <strong>"Lo que te voy a contar abajo."</strong></p>

    <h2>Al final de este post vas a saber:</h2>
    <ol>
      <li>Cuánto necesitas真正的 mínimosin tirardinero en Meta Ads</li>
      <li>Por qué más presupuesto no siempre significa más ventas</li>
      <li>Cómoprobar tu producto con 50个欧盟 antes de escalar</li>
    </ol>

    <h2>Drop de autoridad</h2>
    <p>En 2024 gestioné 2.3M€ en gasto Meta parados clientes D2C España. <strong>El 68% de las cuentas que llegaban veníngastando demasiado pronto. Sin habervalidado el producto.</strong></p>
    <p>La mayoría habrían ahorrado 8.000€ si hubieran hecho lo que te explico ahora.</p>

    <h2>El framework (5 pasos)</h2>
    <h3>Paso 1: Valida con 150€/mes primero</h3>
    <p>No hace falta más. Establece presupuesto diario de 5€/día. Meta necesita 48-72 horas para aprender. Deja correr 30 días.</p>

    <h3>Paso 2: Mide 3 métricas only</h3>
    <ul>
      <li><strong>ROAS</strong>: Ingresos / Gasto. Quiéreessaber mínimo 2x.</li>
      <li><strong>CAC</strong>: Coste por adquisición. Nolohagas complejo. Divide lo gastado por las ventas.</li>
      <li><strong>CPL</strong> (Coste por lead): Si vendes enwhatsapp, calcula cuántote cuesta cada mensaje.</li>
    </ul>

    <h3>Paso 3: Si ROAS &gt; 2x, duplica poco a poco</h3>
    <p>Sube un 20% cada semana. No msdel doble de golpe. Meta re-optimiza y puedesperder lo que ganaste.</p>

    <h3>Paso 4: Si ROAS &lt; 1.5x tras 30 días, revisa esto antes de matar la campaña</h3>
    <ul>
      <li><strong>El producto</strong>: Estás probando too few products? Recomiienda mínimo 3 creatividades diferentes.</li>
      <li><strong>Audiencia</strong>: Estás muy amplio o muy Estrecho? Empieza con interés específico + purchase behavior.</li>
    </ul>

    <h3>Paso 5: Escala solo cuando tengas 15+ conversiones en 30 días</h3>
    <p>Con menos datos, no hay patrón confiabl. Stats = ruido.</p>

    <h2>Ejemplo real con números</h2>
    <p><strong>Caso:</strong> Supplement nutricional, nicho beauty.</p>
    <table>
      <thead>
        <tr>
          <th>Métrica</th>
          <th>Antes (agencia)</th>
          <th>Después (DayByDay)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Presupuesto mes</td>
          <td>2.400€</td>
          <td>300€</td>
        </tr>
        <tr>
          <td>Ventas</td>
          <td>4</td>
          <td>23</td>
        </tr>
        <tr>
          <td>ROAS</td>
          <td>0.8x</td>
          <td>3.2x</td>
        </tr>
        <tr>
          <td>CAC</td>
          <td>600€</td>
          <td>13€</td>
        </tr>
      </tbody>
    </table>
    <p><strong>Ingresaron lo mismo con 8x menos gasto.</strong></p>

    <h2>Pro tip contraintuitivo</h2>
    <p><strong>El problema no es cuánto gastas. Es cuálesson las creatividades que provas.</strong></p>
    <p>Una buena creatividad puede dar ROAS 5x. Una mala puede dar 0.5x con el mismo presupuesto.</p>
    <p>Invierte más tiempo en crear 3-5 anuncios diferentes que en aumentar presupuesto.</p>

    <h2>Action step</h2>
    <ol>
      <li>Abre tu Administrador de Anuncios. Haz una lista de tus 5 mejores productos o categorías hoy.</li>
      <li>Define un presupuesto de prueba: 5€/día = 150€/mes.</li>
      <li>Corre 30 días. Mide ROAS. Si está por debajo de 2x, cambia audience o creatividad. No subas presupuesto.</li>
      <li>En 30 días sabrás si tu producto funciona en Meta. Sin haber invertido más de 150€.</li>
    </ol>

    <h2>Recap</h2>
    <ul>
      <li>✅ Mínimo: 150€/mes (5€/día)</li>
      <li>✅ Solo 3 métricas: ROAS, CAC, CPL</li>
      <li>✅ Escalar después de 15+ ventas</li>
      <li>✅ Más creatividad antes de más presupuesto</li>
    </ul>

    <hr/>
    <p className="callout">La próxima semana te cuento cómo saber si tu problema es el producto o la audiencia. Stay tuned.</p>

    <div style={{marginTop: '2rem', padding: '1.5rem', background: '#f5f5f5', borderRadius: '8px'}}>
      <h3>¿Necesitas ayuda con tu cuenta?</h3>
      <p>Si quieres que revisemos tu cuenta Meta Ads yte digamos qué está fallando, agenda una llamada de diagnóstico:</p>
      <button className="btn btn-primary" onClick={() => openCalendly?.()}>
        Agendar Diagnóstico Gratis
      </button>
    </div>
  </BlogPostLayout>
);

export default PresupuestoMinimoMetaAdsPage;