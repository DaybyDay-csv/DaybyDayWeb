import BlogPostLayout from "../../components/BlogPostLayout";
import relatedPostsData from "../../data/relatedPosts";

const faqs = [
  {
    q: "¿Cuál ROAS es 'bueno' para D2C España?",
    a: "Depende del sector. Suplementos: 3 a 4x. Moda: 2.5-3x. Lo importante es el ROAS real, no el nominal."
  },
  {
    q: "¿Cuál es la diferencia entre ROAS y ROI?",
    a: "ROAS = ingresos / coste. ROI = (ingresos - costes) / costes. Un ROAS 4x = ROI 300%."
  },
  {
    q: "¿Cómo afecta el attribution window?",
    a: "Cambiando de 7 a 28 días, ROAS cae 20-30%. Pero es info más real."
  }
];

const relatedPosts = relatedPostsData.filter(post => 
  ["kpis-paid-media-cfo-ceo-d2c", "meta-ads-creative-testing-2026-d2c", "retargeting-meta-ads-ecommerce-2026"].includes(post.slug)
);

export const metadata = {
  title: "7 Tácticas para Calcular el ROAS Real de tu eCommerce D2C",
  description: "El ROAS de Meta no es real. Aprende las 7 tácticas que usan los CFOs de D2C.",
  keywords: "ROAS, ROAS real, paid media, eCommerce, D2C, métricas, CFO, ROI",
  slug: "calcular-roas-real-d2c",
  published: "2026-05-22",
  modified: "2026-05-22"
};

export default function CalcularRoasRealD2cPage({ openCalendly }) {
  return (
    <BlogPostLayout {...metadata} faqs={faqs} relatedPosts={relatedPosts}>
      <section className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
          7 Tácticas para Calcular el ROAS Real de tu eCommerce D2C
        </h1>
        <p className="text-xl text-white/70 leading-relaxed">
          El ROAS que ves en Meta es una mentira piadosa. Te dice 4x cuando estás perdiendo dinero.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black mb-4">Por qué el ROAS de Meta no es real</h2>
        <p className="text-white/70 leading-relaxed mb-5">
          Meta calcula: ingresos / coste. Pero NO descuenta IVA, NO resta COGS, NO asigna crédito correctamente.
        </p>
        <p className="text-white/70 leading-relaxed">
          Resultado: ROAS inflado. Muchos D2Cs con ROAS "3-4x" tienen márgenes reales negativos.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black mb-4">Las 7 tácticas</h2>
        <div className="space-y-8">
          <article>
            <h3 className="text-xl font-bold mb-2">1. Separar ROAS nominal del real</h3>
            <p className="text-white/70 leading-relaxed">Crea dos columnas en dashboard y compara cada semana.</p>
          </article>
          <article>
            <h3 className="text-xl font-bold mb-2">2. Incluir COGS real</h3>
            <p className="text-white/70 leading-relaxed">Un D2C con 30% margen necesita ROAS mayor a 3x.</p>
          </article>
          <article>
            <h3 className="text-xl font-bold mb-2">3. Sumar costes operativos</h3>
            <p className="text-white/70 leading-relaxed">cs, tools, atención cliente suman 15-25% adicional.</p>
          </article>
          <article>
            <h3 className="text-xl font-bold mb-2">4. Calcular LTV verdadero</h3>
            <p className="text-white/70 leading-relaxed">Cohort analysis a 90 días, no a 7 días.</p>
          </article>
          <article>
            <h3 className="text-xl font-bold mb-2">5. Attribution window correcto</h3>
            <p className="text-white/70 leading-relaxed">Cambia a 28 días. ROAS caerá 20-30% pero será más real.</p>
          </article>
          <article>
            <h3 className="text-xl font-bold mb-2">6. Métricas por cohort</h3>
            <p className="text-white/70 leading-relaxed">No promedies. Chaque mois имеет diferente comportamiento.</p>
          </article>
          <article>
            <h3 className="text-xl font-bold mb-2">7. Dashboard unificado</h3>
            <p className="text-white/70 leading-relaxed">Meta + GA4 + Shopify + CRM en una vista.</p>
          </article>
        </div>
      </section>

      <section className="mb-10 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-blue-500/20">
        <h3 className="text-2xl font-bold mb-4">¿Tienes claro tu ROAS real?</h3>
        <p className="text-white/70 mb-6">分析的Tu caso sin compromiso.</p>
        <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg">
          Agendar Discovery Call
        </a>
      </section>
    </BlogPostLayout>
  );
}