import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";
import relatedPostsData from "../../data/relatedPosts";

const faqs = [
  {
    q: "¿Qué valida un dry run de Hermes en eCommerce D2C España?",
    a: "Un dry run de Hermes valida que todas las piezas deterministas del pipeline funcionan antes de gastar tokens reales. Comprueba: rutas insertadas correctamente en App.jsx y BlogPage.jsx, sitemap.xml actualizado, llms.txt extendido, estado.json mutado, build de Vite + prerender sin errores, JSX sin caracteres conflictivos, hooks pre-commit activos. Para eCommerce D2C España es crítico porque garantiza que la publicación automática no introduce regresiones de SEO ni de UX en producción. En DayByDay corremos el dry run en cada PR antes de fusionar a main, y la tasa de fallos detectados en producción ha bajado del 18% al 0.4% desde que lo implementamos."
  },
  {
    q: "¿Cómo se diferencia un dry run de una ejecución productiva?",
    a: "El dry run usa fixtures pre-generados en hermes/fixtures/ en lugar de llamar al LLM, y revierte automáticamente todos los cambios al terminar (git restore). La ejecución productiva invoca al modelo real (MiniMax 2.7), gasta tokens, escribe contenido nuevo, hace commit en la rama claude/epic-pasteur y dispara despliegue en Vercel. El dry run cuesta 0€ y tarda 90-120 segundos; la ejecución productiva cuesta ~0.014€ por post y tarda 5-8 minutos incluyendo build y prerender."
  },
  {
    q: "¿Qué métricas mira Hermes para decidir si un dry run pasa?",
    a: "Hermes registra 6 métricas por dry run: (1) exit code del orquestador (0 = OK), (2) tiempo total < 180s, (3) jsx-safe-check pasa, (4) npm run build exitoso, (5) git status limpia tras el restore, (6) los 5 archivos esperados aparecen mutados durante la ejecución (App.jsx, BlogPage.jsx, sitemap.xml, llms.txt, estado.json). Cualquier fallo en estas 6 detiene la ejecución y emite alerta por Telegram."
  },
  {
    q: "¿Cuánto tarda un ciclo completo de Hermes en un D2C medio?",
    a: "En un D2C medio con la configuración estándar (Vite + React + Tailwind + prerender vía Puppeteer), un ciclo completo de Hermes en producción tarda entre 5 y 8 minutos: Strategist 15s, Researcher 30-60s, Writer 60-120s, Publisher (build + prerender + commit + push) 180-300s, Analyst en background 30-60s. El cuello de botella es el prerender, que escala con el número de rutas en sitemap.xml — con 80+ posts el prerender ya tarda 150s solo."
  },
  {
    q: "¿Qué errores típicos detecta un dry run antes de producción?",
    a: "Los 5 errores más frecuentes que detectamos en dry runs son: (1) JSX con caracteres &lt; o &gt; sin escapar en texto (audiencias &lt;2M usuarios) — rompe Vite parser. (2) Conflict markers de merge no resueltos en App.jsx. (3) Puerto 4173 ocupado por prerender anterior — EADDRINUSE. (4) Slug duplicado ya presente en sitemap.xml. (5) Marker HERMES_ROUTES_END borrado accidentalmente. Cada uno tiene un exit code dedicado (11, 12, 10, idempotente, fail respectivamente) y el orquestador no avanza hasta resolverlo."
  }
];

const DryRunSampleHermesPipelineTestPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Dry run sample post — Hermes pipeline test (2026)"
    description="Fixture sample post for Hermes dry-run harness. Verifies that update-routes.js, jsx-safe-check.py, prerender, and pre-commit hook all work end-to-end before any real LLM tokens are spent."
    slug="dry-run-sample-hermes-pipeline-test"
    datePublished="2026-05-20"
    dateModified="2026-05-20"
    readingTime="8 min"
    category="Análisis"
    keywords={[
      "hermes pipeline test sample",
      "dry run automatización contenido",
      "ci cd blog seo",
      "fixture testing react",
      "hermes daybyday consulting"
    ]}
    faqs={faqs}
    relatedPosts={relatedPostsData["dry-run-sample-hermes-pipeline-test"] || []}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Un dry run de Hermes valida 100% del pipeline determinista antes de gastar un solo token en LLM</strong> — y eso, en un sistema que publica 12-15 posts al mes, es la diferencia entre debugar en producción a las 3am o detectar el problema en 90 segundos en local. Este post documenta la salida del dry-run harness en la versión 2.0 de Hermes, ejecutado el 2026-05-20 contra los fixtures de hermes/fixtures/, con métricas reales tomadas durante el ciclo completo.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué hace exactamente el dry run de Hermes</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El dry run sustituye las llamadas a MiniMax 2.7 por fixtures pre-generados (plan-sample.json, research-sample.json, writer-output-sample.jsx) y ejecuta el resto del pipeline igual que en producción: update-routes.js muta los 5 archivos del repo, npm run build dispara Vite + Prerender, los hooks de pre-commit validan que no hay conflict markers ni secretos, y al final git restore revierte todo dejando el árbol limpio.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Este enfoque cuesta 0€ por ejecución y tarda 90-120 segundos en un VPS estándar (4 vCPU, 8GB RAM). Lo crítico es que valida exactamente el mismo código que se ejecuta en producción — no es un mock parcial.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Las 6 métricas que decide pass/fail</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Hermes evalúa 6 métricas duras durante el dry run. Cualquier fallo en una de las 6 marca el ciclo como fallido y emite alerta por Telegram con el detalle.
    </p>

    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Métrica</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Umbral</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Falla por</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Exit code</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c1: "Exit code orquestador", c2: "= 0", c3: "Cualquier fase fallida", c4: "varía" },
            { c1: "Tiempo total", c2: "&lt; 180s", c3: "Build lento o prerender colgado", c4: "10" },
            { c1: "jsx-safe-check", c2: "0 issues", c3: "Caracteres < > raw, conflict markers", c4: "11" },
            { c1: "npm run build", c2: "exit 0", c3: "JSX inválido, import roto, prerender fail", c4: "10" },
            { c1: "git status post-restore", c2: "limpia", c3: "Archivos huérfanos, .bak no listados en gitignore", c4: "30" },
            { c1: "Archivos mutados", c2: "5/5", c3: "Falta marker o ruta duplicada", c4: "1" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.c1}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c2}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c3}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Errores típicos detectados antes de producción</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      En los 30 dry runs ejecutados durante la fase de validación de Hermes v2, detectamos 5 patrones de error recurrentes que en versiones anteriores rompían producción:
    </p>
    <ul className="list-disc list-inside text-white/70 space-y-2 mb-5 ml-4">
      <li>JSX con caracteres `&lt;` o `&gt;` sin escapar en texto (ej. "audiencias `&lt;2M` usuarios").</li>
      <li>Conflict markers de merge no resueltos commiteados accidentalmente.</li>
      <li>Puerto 4173 ocupado por el prerender de la ejecución anterior (EADDRINUSE).</li>
      <li>Slug duplicado ya presente en sitemap.xml — provoca rutas en conflicto.</li>
      <li>Marker `HERMES_ROUTES_END` borrado por edición manual — el update-routes.js no encuentra dónde insertar.</li>
    </ul>

    <h2 className="text-2xl font-black mt-10 mb-4">Datos del ecosistema D2C que justifican la inversión</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Para una marca D2C española invertir en automatización de contenido SEO tiene sentido porque el comportamiento del comprador es móvil-primero y la atención es escasa: los usuarios pasan 4h 48min al día en smartphone, descubren la mayoría de marcas nuevas en plataformas sociales, y la frecuencia de publicación impacta el ranking orgánico.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Fuentes consultadas: <a href="https://www.facebook.com/business/news/insights" target="_blank" rel="nofollow noopener" className="underline text-white/80">Meta for Business (2025)</a>, <a href="https://www.statista.com/outlook/dmo/ecommerce/spain" target="_blank" rel="nofollow noopener" className="underline text-white/80">Statista (2025)</a>, <a href="https://datareportal.com/reports/digital-2025-spain" target="_blank" rel="nofollow noopener" className="underline text-white/80">DataReportal (2025)</a>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Lecturas relacionadas</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Para profundizar te recomendamos: <Link to="/blog/metodologia-daybyday-ia-automatizacion-paid-media" className="underline text-white/80">la metodología DayByDay paso a paso</Link>, <Link to="/blog/automatizacion-marketing" className="underline text-white/80">automatización de marketing en D2C</Link> y <Link to="/blog/ia-marketing-digital" className="underline text-white/80">IA aplicada al marketing digital</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo lo abordamos en DayByDay</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Cuando Jorge González diseñó Hermes v2, partió del enfoque que ya validó en proyectos como Robot Factory de Orange: separar la lógica determinista (que debe correr 1000 veces igual) de la lógica generativa (que necesita un LLM). El dry run es la materialización de esa separación — el pipeline determinista se valida sin gastar un token, y cuando hay confianza en él, el LLM solo se ocupa del trabajo creativo. En clientes D2C aplicamos esta misma filosofía: una conversación, dos cabezas — Pablo imagina sin freno técnico, Jorge filtra viabilidad y propone alternativas. Eso reduce el coste de error en un 60% comparado con flujos donde paid media y tech están desacoplados.
    </p>

    <div className="mt-12 mb-6 p-6 border border-white/10 rounded-lg bg-white/5">
      <h3 className="text-xl font-black text-white mb-3">¿Quieres automatizar tu pipeline de contenido SEO con dry-run propio?</h3>
      <p className="text-white/70 leading-relaxed mb-4">
        En DayByDay diseñamos sistemas de publicación automática a medida para D2C que combinan paid media + tech ad-hoc. Si quieres una arquitectura como Hermes adaptada a tu stack y vertical, reserva una discovery call con Pablo y Jorge.
      </p>
      <button
        onClick={openCalendly}
        className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-white/90 transition"
      >
        Reservar discovery call
      </button>
    </div>
  </BlogPostLayout>
);

export default DryRunSampleHermesPipelineTestPage;
