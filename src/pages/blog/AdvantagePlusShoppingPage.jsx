import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué es Advantage+ Shopping en Meta Ads?",
    a: "Advantage+ Shopping Campaigns (ASC) es el formato de campaña automatizado de Meta para ecommerce. A diferencia de las campañas manuales, ASC gestiona automáticamente la distribución del presupuesto entre audiencias frías y calientes, los formatos de anuncio y la puja. Meta usa señales de comportamiento de toda la cuenta para optimizar quién ve cada anuncio y cuándo. Está disponible en el Ads Manager bajo el objetivo 'Ventas' desde 2022.",
  },
  {
    q: "¿Advantage+ Shopping es mejor que las campañas manuales de Meta Ads?",
    a: "Depende del volumen de la cuenta. En cuentas con más de 50 conversiones semanales, ASC suele superar a las campañas manuales en ROAS porque el algoritmo tiene suficientes datos para optimizar bien. En cuentas con menos de 30 conversiones semanales, las campañas manuales dan más control y pueden rendir mejor. Como norma, si tu cuenta genera más de 50 compras por semana, prueba ASC en paralelo con tus campañas actuales durante 4 semanas antes de decidir.",
  },
  {
    q: "¿Puedo usar Advantage+ Shopping con un catálogo de productos pequeño?",
    a: "Sí, pero con limitaciones. ASC funciona mejor con catálogos de 50+ productos porque el algoritmo puede elegir qué producto mostrar a cada usuario según sus señales de comportamiento. Con catálogos pequeños (menos de 20 productos), la ventaja del algoritmo se reduce y una campaña manual con catálogo dinámico puede dar resultados similares con más control sobre la creatividad.",
  },
  {
    q: "¿Cuánto tiempo tarda Advantage+ Shopping en aprender?",
    a: "Entre 7 y 14 días desde el lanzamiento. Durante ese período, el ROAS puede ser más bajo de lo esperado porque el algoritmo está explorando qué combinaciones de audiencia y creatividad funcionan mejor. Necesita al menos 50 eventos de compra para salir del aprendizaje. No hagas cambios significativos durante los primeros 7 días para no reiniciar el proceso.",
  },
  {
    q: "¿Cómo se mide el rendimiento de Advantage+ Shopping vs campañas manuales?",
    a: "La comparativa más útil es mirar el ROAS a 7 días por separado para cada tipo de campaña. Meta también ofrece en los informes el desglose de ASC entre 'nuevos clientes' y 'compradores existentes', lo que permite ver si el algoritmo está equilibrando correctamente la captación y el retargeting. El error más común es comparar el CPA de ASC con el de campañas de retargeting puro — ASC incluye prospecting, por lo que el CPA será más alto que el de retargeting solo.",
  },
];

const AdvantagePlusShoppingPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Advantage+ Shopping en Meta Ads: cuándo usarlo y cuándo no"
    description="Guía práctica de Advantage+ Shopping Campaigns (ASC) para ecommerce: cómo funciona, qué cuentas se benefician más, cuándo mantener campañas manuales y cómo estructurar la transición sin perder ROAS."
    slug="advantage-plus-shopping-cuando-usarlo-no"
    datePublished="2026-04-07"
    dateModified="2026-04-07"
    readingTime="6 min"
    category="Meta Ads"
    keywords={["advantage+ shopping", "advantage+ shopping meta ads", "ASC meta ads ecommerce", "campañas advantage+ shopping", "meta ads ecommerce automatizado"]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Advantage+ Shopping Campaigns (ASC)</strong> es la apuesta de Meta por automatizar la gestión de campañas de ecommerce. Desde que Meta lo lanzó en 2022, hemos probado este formato en decenas de cuentas D2C en España — y la conclusión no es que siempre sea mejor que las campañas manuales. La clave está en saber en qué situaciones el algoritmo tiene ventaja y en cuáles no.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Este artículo recoge lo que hemos aprendido gestionando cuentas entre 5.000€ y 80.000€/mes: cuándo migrar a ASC, cuándo mantener la estructura manual y cómo hacer la transición sin que el ROAS se resinta.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo funciona Advantage+ Shopping</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      En una campaña manual de Meta, tú decides las audiencias, los formatos, los presupuestos por conjunto y las exclusiones. En ASC, cedes esas decisiones al algoritmo. Meta usa las señales de comportamiento de toda la cuenta — píxel, API de Conversiones, catálogo — para decidir automáticamente a quién impactar, con qué anuncio y cuánto gastar en cada usuario.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      El sistema gestiona de forma unificada lo que antes se dividía en prospecting y retargeting. Puedes establecer un límite de presupuesto para "nuevos clientes" (Meta lo llama budget cap de clientes nuevos), pero dentro de ese margen el algoritmo tiene libertad total.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Según la <a href="https://www.facebook.com/business/help/1986556321743605" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial de Meta sobre Advantage+ Shopping</a>, estas campañas están diseñadas para cuentas de ecommerce con historial de conversiones suficiente. El volumen mínimo recomendado es 50 eventos de compra por semana.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Cuándo usar Advantage+ Shopping (y cuándo no)</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      La pregunta no es si ASC es mejor o peor en abstracto — es si tu cuenta reúne las condiciones para que el algoritmo pueda optimizar correctamente. Esta es la tabla de decisión que usamos en DayByDay:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Situación</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Recomendación</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Motivo</th>
          </tr>
        </thead>
        <tbody>
          {[
            { situacion: "≥50 compras/semana + ROAS estable", rec: "✅ Usa ASC", motivo: "Datos suficientes para que el algoritmo supere a la gestión manual" },
            { situacion: "30-50 compras/semana", rec: "⚠️ Prueba en paralelo", motivo: "Umbral intermedio — testa 4 semanas antes de migrar" },
            { situacion: "<30 compras/semana", rec: "❌ Mantén campañas manuales", motivo: "El algoritmo no tiene suficientes datos y el aprendizaje no termina" },
            { situacion: "Catálogo >50 productos + ticket bajo", rec: "✅ Muy recomendable ASC", motivo: "El algoritmo optimiza la selección de producto por usuario mejor que tú" },
            { situacion: "Producto único o catálogo <10 SKUs", rec: "⚠️ Manual puede ser mejor", motivo: "Menor ventaja de selección automática de producto" },
            { situacion: "Fase de escala (subir >50% presupuesto)", rec: "✅ ASC protege mejor el ROAS", motivo: "Redistribuye entre prospecting/retargeting según demanda real" },
            { situacion: "Cuenta con muchas restricciones de audiencia", rec: "❌ Manual da más control", motivo: "ASC no permite exclusiones granulares por audiencia" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white/70 text-xs">{row.situacion}</td>
              <td className="py-3 px-3 font-medium text-white text-xs">{row.rec}</td>
              <td className="py-3 px-3 text-white/50 text-xs">{row.motivo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Las ventajas reales de ASC para ecommerce D2C</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      Cuando las condiciones son las correctas, ASC tiene ventajas concretas sobre la gestión manual:
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          titulo: "Equilibrio automático prospecting/retargeting",
          desc: "En campañas manuales, el ratio prospecting/retargeting es una decisión que hay que revisar semanalmente. ASC lo gestiona en tiempo real según qué usuarios tienen más probabilidad de convertir en cada momento.",
        },
        {
          titulo: "Menor impacto del aprendizaje al escalar",
          desc: "Al subir el presupuesto en campañas manuales, el algoritmo tiene que recalibrar conjuntos de anuncios individuales. En ASC, el sistema redistribuye el presupuesto extra dentro de la misma estructura, lo que amortigua la caída de ROAS post-subida.",
        },
        {
          titulo: "Selección automática del formato más eficiente",
          desc: "ASC puede servir automáticamente el formato de anuncio (imagen, vídeo, carrusel, catálogo) que el algoritmo considera más probable que convierta para cada usuario. Elimina el sesgo del gestor sobre qué formato funciona mejor.",
        },
        {
          titulo: "Menor carga de gestión operativa",
          desc: "Con campañas manuales, mantener actualizadas las audiencias, exclusiones y presupuestos de 10-20 conjuntos requiere tiempo semanal. ASC reduce esa carga, liberando tiempo para lo que sí requiere criterio humano: creatividades y estrategia.",
        },
      ].map(({ titulo, desc }) => (
        <div key={titulo} className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
          <p className="font-semibold text-white text-sm mb-2">{titulo}</p>
          <p className="text-white/55 text-sm">{desc}</p>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Los límites de Advantage+ Shopping</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      ASC no es la solución para todo. Estos son los escenarios donde preferimos mantener campañas manuales o estructuras híbridas:
    </p>
    <div className="space-y-3 mb-6">
      {[
        "Cuentas con estacionalidad muy marcada (rebajas, Black Friday): necesitas control manual para ajustar presupuestos y audiencias en ventanas cortas de 3-5 días",
        "Productos con márgenes muy diferentes: ASC no permite optimizar por margen por SKU — si tienes productos al 15% y al 60% de margen, puede priorizar los de más volumen, no los más rentables",
        "Marcas con restricciones de brand safety estrictas: el control de placements y contextos de aparición es más limitado en ASC",
        "Estrategias de prospecting puro con presupuesto limitado para retargeting: ASC mezcla ambas, lo que puede no ser óptimo si quieres destinar casi todo el presupuesto a captación",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">—</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo hacer la transición a ASC sin perder ROAS</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      El error más común al migrar a ASC es pausar todas las campañas manuales y lanzar ASC desde cero. El resultado es que el algoritmo empieza el aprendizaje sin historial y el ROAS cae las primeras 2 semanas. El protocolo correcto:
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          paso: "1",
          titulo: "Lanza ASC en paralelo con un presupuesto del 20-30% del total",
          desc: "Mantén tus campañas manuales activas y añade ASC con una fracción del presupuesto. Así el algoritmo aprende sin que el ROAS global se vea afectado.",
        },
        {
          paso: "2",
          titulo: "Espera mínimo 2 semanas antes de comparar resultados",
          desc: "ASC necesita el período de aprendizaje completo (7-14 días, mínimo 50 compras) antes de poder comparar su rendimiento con el de las campañas manuales de forma fiable.",
        },
        {
          paso: "3",
          titulo: "Compara ROAS a 7 días entre ASC y manual en el mismo período",
          desc: "Usa las columnas de comparación del Ads Manager. Si ASC supera el ROAS de las campañas manuales en 2-3 semanas consecutivas, transfiere más presupuesto gradualmente.",
        },
        {
          paso: "4",
          titulo: "Escala el presupuesto de ASC en pasos del 20-25%",
          desc: "El mismo protocolo de escala que en campañas manuales aplica en ASC. No subas más del 25% por semana para evitar que el algoritmo entre en nueva fase de aprendizaje.",
        },
      ].map(({ paso, titulo, desc }) => (
        <div key={paso} className="bg-[#1a1616] border border-white/8 rounded-xl p-4 flex gap-4">
          <div className="w-8 h-8 rounded-full bg-[#de0015]/20 border border-[#de0015]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-[#de0015] font-bold text-sm">{paso}</span>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-1">{titulo}</p>
            <p className="text-white/55 text-sm">{desc}</p>
          </div>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay con Advantage+ Shopping</h2>
    <p className="text-white/70 leading-relaxed mb-4">
      En la mayoría de las cuentas que gestionamos con más de 50 compras semanales, nuestra estructura estándar es: 1 campaña ASC principal + 1 campaña manual para testing de creatividades nuevas. La razón: ASC optimiza muy bien la distribución del presupuesto, pero tarda en adoptar creatividades nuevas. Mantenemos una campaña manual pequeña (15-20% del presupuesto) exclusivamente para testear nuevos creativos antes de añadirlos a ASC.
    </p>
    <p className="text-white/70 leading-relaxed mb-4">
      El resultado de esta estructura en los últimos 12 meses con clientes D2C en España: ROAS medio un 22% más alto que con estructura todo-manual, y un 35% menos de horas de gestión operativa semanal, liberadas para producción de creatividades y estrategia.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Para más contexto sobre por qué la calidad del tracking es el requisito previo a cualquier migración a ASC, el informe de <a href="https://www.iabspain.es/wp-content/uploads/2024-Estudio-Inversion-Publicitaria-en-Medios-Digitales-IAB.pdf" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">IAB Spain sobre inversión en medios digitales</a> recoge la evolución del entorno cookieless que hace que la API de Conversiones sea crítica para que ASC funcione bien.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿No sabes si tu cuenta está lista para Advantage+ Shopping?</p>
      <p className="text-white/50 text-sm mb-4">Revisamos tu estructura actual y te decimos exactamente qué necesita tu cuenta antes de migrar — sin coste.</p>
      <button
        onClick={openCalendly}
        className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm"
      >
        Solicitar revisión gratuita →
      </button>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Artículos relacionados</h2>
    <div className="space-y-3">
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/presupuesto-minimo-meta-ads-ecommerce" className="text-white font-semibold hover:text-white/80">
          Presupuesto mínimo Meta Ads: ¿cuánto necesito invertir? →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué Advantage+ Shopping rinde mejor en presupuestos pequeños y cuándo no activarlo desde día 0</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/escalar-campanas-meta-ads-sin-romper-roas" className="text-white font-semibold hover:text-white/80">
          Cómo escalar campañas Meta Ads sin que se rompa el ROAS →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué ASC protege mejor el ROAS en fase de escala y el protocolo de subida de presupuesto</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/como-mejorar-roas-meta-ads-7-palancas" className="text-white font-semibold hover:text-white/80">
          Cómo mejorar el ROAS en Meta Ads: 7 palancas reales →
        </Link>
        <p className="text-white/40 text-xs mt-1">Las palancas que hay que tener en orden antes de migrar a Advantage+ Shopping</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/guia-meta-ads-ecommerce-d2c-espana-2026" className="text-white font-semibold hover:text-white/80">
          Guía completa de Meta Ads para ecommerce D2C en España 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">El contexto completo de Meta Ads donde encaja Advantage+ Shopping</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/estrategias-puja-meta-ads" className="text-white font-semibold hover:text-white/80">
          Estrategias de puja en Meta Ads: cuál elegir según tu objetivo →
        </Link>
        <p className="text-white/40 text-xs mt-1">Las opciones de puja disponibles dentro de Advantage+ Shopping y cuándo usarlas</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/ad-fatigue-meta-ads-rotacion-creativa" className="text-white font-semibold hover:text-white/80">
          Ad fatigue en Meta Ads: señales tempranas y protocolo de rotación creativa →
        </Link>
        <p className="text-white/40 text-xs mt-1">Por qué ASC necesita 8-15 creatividades activas y cómo mantener el pipeline para que el algoritmo no se quede sin material</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/performance-max-vs-meta-ads-espana" className="text-white font-semibold hover:text-white/80">
          Performance Max vs Meta Ads: ¿cuál funciona mejor en España? →
        </Link>
        <p className="text-white/40 text-xs mt-1">El equivalente de Advantage+ Shopping en Google y cómo combinarlos sin canibalización</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/audiencias-lookalike-meta-alta-calidad" className="text-white font-semibold hover:text-white/80">
          Audiencias lookalike en Meta de alta calidad: guía 2026 D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cuándo migrar de un stack de lookalikes a Advantage+ Shopping y la convivencia entre ambos</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/remarketing-dinamico-ecommerce-guia-practica" className="text-white font-semibold hover:text-white/80">
          Remarketing dinámico para ecommerce: guía práctica →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo conviven Advantage+ Shopping y DPA sin solapar audiencias ni quemar frecuencia</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default AdvantagePlusShoppingPage;
