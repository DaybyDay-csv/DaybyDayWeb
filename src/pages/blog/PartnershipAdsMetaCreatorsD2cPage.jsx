import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {
    q: "¿Qué son las Partnership Ads en Meta Ads y en qué se diferencian de las Branded Content Ads anteriores?",
    a: "Las Partnership Ads (rebautizadas oficialmente en 2024, antes Branded Content Ads o whitelisting) son anuncios servidos desde la cuenta de Instagram o Facebook de un creator —no desde la de la marca— pero pagados, optimizados y atribuidos al Business Manager de la marca. El usuario ve el handle del creator (@nombre) como autor del post; la marca controla el targeting, el presupuesto, el copy y la optimización. La diferencia frente al modelo anterior es operativa: el creator concede permiso explícito desde su cuenta Instagram Settings → Branded Content → Brand Partners, y la marca aprueba el contenido vía Partnerships Hub en Meta Business Suite. Ya no se necesitan logins compartidos ni cambios de contraseña. Para D2C España es la palanca más potente para escalar UGC sin perder la autenticidad de cuenta de creator real, que rinde un 25-40% mejor en Hook Rate y un 15-30% mejor en CPA frente a la misma pieza servida desde la cuenta de marca."
  },
  {
    q: "¿Cuál es la diferencia entre Partnership Ads y Spark Ads de TikTok?",
    a: "El concepto es equivalente —servir un post orgánico de creator como anuncio pagado por la marca— pero la mecánica técnica difiere. Spark Ads (TikTok) usan un código de autorización que el creator genera desde su app y comparte con la marca por DM o herramienta; el código tiene caducidad opcional (7-365 días). Partnership Ads (Meta) se gestionan vía permisos persistentes en Partnerships Hub y son revocables en cualquier momento por ambas partes. Spark Ads conservan likes, comentarios y shares orgánicos al servirse como anuncio (acumulan social proof real); Partnership Ads también, pero con la salvedad de que comentarios moderados desde el ads manager solo afectan a la versión paid. En D2C español la combinación que mejor rinde en 2026 es Partnership Ads + Spark Ads del mismo creator + las mismas 2-3 piezas para mantener consistencia de mensaje cross-channel."
  },
  {
    q: "¿Qué creators funcionan mejor para Partnership Ads en eCommerce D2C en España?",
    a: "El perfil que escala en D2C español 2026 no es el macro-influencer (>500K seguidores). Los micro-creators (10K-80K seguidores) con engagement rate ≥3,5% en su nicho rinden mejor por tres motivos: (1) el coste de colaboración es 200-800€ por pieza vs 2.500-12.000€ del macro, (2) su contenido se percibe como recomendación honesta (Edelman Trust Barometer 2024 reporta que el 63% de consumidores confía más en micro-influencers que en celebrities), y (3) Meta permite testar 6-12 creators distintos con el presupuesto que costaría 1 macro. Los criterios operativos para shortlist son: vertical alineado al producto, audiencia España ≥60%, contenido orgánico reciente con buen Hook Rate (>20% retención 3s), formato Reels nativo (no carruseles estáticos), y disponibilidad para 2-3 versiones de la misma pieza (hook A/B test)."
  },
  {
    q: "¿Cómo se configura técnicamente una Partnership Ad paso a paso en Meta Business Suite?",
    a: "Seis pasos no negociables. (1) El creator activa Branded Content en su perfil Instagram (Settings → Creator → Branded Content → Approved Business Partners) y añade el Business Manager de la marca. (2) La marca acepta la invitación desde Partnerships Hub en Business Suite. (3) El creator publica o tiene ya publicado el post/Reel y lo marca como paid partnership etiquetando a la marca (el post mostrará 'Paid partnership with [marca]'). (4) En el Ads Manager, al crear el ad set, en Identity se selecciona 'Use existing post' y se busca el ID del post del creator (visible en Partnerships Hub). (5) Se configura targeting, optimización (Purchase con CAPI server-side), presupuesto y budget igual que cualquier ad set. (6) Se monitoriza Event Match Quality y CPA específicos del ad set; si el creator tiene varios posts elegibles, se testa cada uno en ad set separado para identificar ganador. Saltar el paso 1-2 hace imposible activar la ad."
  },
  {
    q: "¿Qué presupuesto mínimo necesito para testar Partnership Ads en mi D2C?",
    a: "Para una prueba con criterio operativo necesitas 2.500-6.000€ distribuidos en 4-6 creators × 1-2 piezas cada uno durante 10-14 días. El desglose típico para D2C España con CPA medio 30-50€ es: 200-800€ pago al creator por pieza (fee + producción) × 4-6 creators = 1.000-4.000€ en fees, más 1.500-3.000€ de media spend repartido en ad sets separados por creator (mínimo 40-70€/día/ad set durante 7-10 días para salir de aprendizaje). Por debajo de 1.500€ de media spend en la prueba no hay señal suficiente para decidir; por encima de 6.000€ sin haber validado primero estás escalando algo no probado. Una vez identificas el creator ganador, escalas su pieza a 150-400€/día y firmas continuidad mensual (2-4 piezas/mes/creator a 600-2.500€/mes según volumen)."
  },
  {
    q: "¿Las Partnership Ads ayudan al algoritmo de Meta Ads más que las creatividades servidas desde la cuenta de la marca?",
    a: "Sí, por dos razones medibles. La primera es la métrica de Hook Rate (% usuarios que ven ≥3s del video): el contenido publicado desde una cuenta real de creator activa el sesgo cognitivo de feed nativo, no de anuncio, y los Hook Rates en cuentas D2C España auditadas por DayByDay suben de un 18-25% (cuentas marca) a un 28-42% (cuentas creator) sobre la misma pieza. La segunda es la social proof acumulada: un post de creator suele tener cientos o miles de likes y comentarios orgánicos antes de promocionarse como ad, lo que reduce la resistencia inicial. Pero hay un matiz crítico: Meta penaliza Partnership Ads si el creator y la marca no comparten audiencia coherente (lifestyle vs nicho técnico) o si el contenido es manifiestamente publicitario y baja el Relevance Score. La regla es servirlas como parte del mix (15-30% del spend de creatividad), no monocultivo."
  }
];

const PartnershipAdsMetaCreatorsD2cPage = ({ openCalendly }) => (
  <BlogPostLayout
    title="Partnership Ads en Meta para D2C: cómo escalar UGC con cuentas de creators (2026)"
    description="Guía operativa de Partnership Ads en Meta Ads (antes Branded Content Ads / whitelisting) para eCommerce D2C España 2026: qué son y diferencias con Branded Content Ads anteriores y Spark Ads de TikTok, perfil de creator que escala en D2C (micro 10K-80K seguidores con ER ≥3,5%, audiencia ES ≥60%), criterios de shortlist y método para identificar piezas orgánicas con Hook Rate ≥20%, configuración técnica paso a paso en Partnerships Hub + Ads Manager (Branded Content opt-in, invitación, post como paid partnership, use existing post ID), presupuesto mínimo viable 2.500-6.000€ con 4-6 creators × 1-2 piezas durante 10-14 días, por qué Hook Rate sube 25-40% y CPA baja 15-30% vs misma pieza servida desde cuenta marca, 4 tipos de Partnership Ads operativos (UGC product demo, testimonial, before/after, tutorial), 7 errores frecuentes en D2C españoles (creator sin engagement real, pago único sin continuidad, no separar ad sets por creator, copiar copy de marca, falta de CAPI con UTM, audiencia desalineada, sin contrato de uso), encaje en estructura de cuenta CBO/ABO/ASC y enfoque DayByDay Pablo+Jorge con pipeline n8n + Meta Marketing API + Airtable para gestión y ranking semanal de creators."
    slug="partnership-ads-meta-ugc-creators-d2c"
    datePublished="2026-05-16"
    dateModified="2026-05-16"
    readingTime="12 min"
    category="Creatividades"
    keywords={[
      "partnership ads meta",
      "branded content ads meta",
      "whitelisting meta ads",
      "ugc meta ads creators d2c",
      "spark ads meta partnership",
    ]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">Las Partnership Ads en Meta son la diferencia entre que tu cuenta D2C escale UGC con la autenticidad de un creator real o se quede atrapada en un Hook Rate plano servido desde tu propia cuenta de marca.</strong> Bien usadas suben el Hook Rate un 25-40% y bajan el CPA un 15-30% sobre la misma pieza. Mal usadas convierten a tu marca en una factura de 800€ a un creator que ni siquiera tenía engagement real. En auditorías DayByDay vemos siempre la misma falla: la marca paga a 3-4 creators para que graben UGC, lo recibe en bruto y lo sube desde su propia cuenta como creatividad estándar, perdiendo todo lo que hace que el formato funcione. Esta guía explica cómo configurar Partnership Ads paso a paso, qué creators escalan en D2C España y cómo integrar el modelo en una estructura de cuenta que ya use CBO/ABO/Advantage+ Shopping.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué son las Partnership Ads en Meta (definición operativa)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Las <strong className="text-white">Partnership Ads</strong> son anuncios pagados por la marca pero servidos desde la cuenta de Instagram o Facebook de un creator. Técnicamente, el creator publica un post o Reel marcado como <em>paid partnership</em> y otorga permiso al Business Manager de la marca; la marca toma ese post como ad creative existente y lo promociona como cualquier otro anuncio pagado, eligiendo audiencia, presupuesto y optimización. El usuario ve el handle del creator —no el de la marca— como autor visible, mientras la marca conserva control total sobre targeting, CAPI, atribución y reporting.
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      El cambio frente al modelo anterior (Branded Content Ads, también conocido coloquialmente como whitelisting) es operativo. Según la <a href="https://www.facebook.com/business/help/200000840794423" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">documentación oficial de Partnership Ads de Meta Business</a>, ya no se necesitan logins compartidos, cambios de contraseña ni hacks de doble cuenta: todo el permiso se gestiona vía Partnerships Hub en Business Suite y ambas partes pueden revocarlo en cualquier momento. Esto profesionaliza el modelo y lo hace escalable a 10-30 creators activos simultáneos sin coste operativo extra.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-5 mb-6">
      <p className="text-white font-bold text-sm mb-2">📊 Dato de referencia</p>
      <p className="text-white/70 text-sm leading-relaxed">
        Según el <a href="https://www.edelman.com/trust/2024/trust-barometer" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">Edelman Trust Barometer 2024</a>, el 63% de los consumidores globales confía más en recomendaciones de micro-influencers que en mensajes publicitarios directos de marcas. En auditorías DayByDay de cuentas D2C España 2025-2026 con presupuestos Meta entre 8K€ y 60K€/mes, las Partnership Ads sobre la misma pieza UGC suben el Hook Rate (% usuarios que retienen ≥3s del video) de un rango 18-25% al rango 28-42%, y bajan el CPA un 15-30% frente a la versión servida desde la cuenta de marca. El efecto es consistente en cosmética, suplementos, moda y mascotas; menor en categorías muy técnicas (electrónica nicho) donde la audiencia espera contenido corporativo.
      </p>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Partnership Ads vs Spark Ads vs Branded Content tradicional</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Conviene tener claras las diferencias entre los tres modelos antes de operar:
    </p>
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Modelo</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Plataforma</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Autorización</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Caducidad</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">Atribución</th>
          </tr>
        </thead>
        <tbody>
          {[
            { m: "Partnership Ads (2024+)", p: "Meta (IG + FB)", a: "Partnerships Hub", c: "Permanente (revocable)", at: "Business Manager marca" },
            { m: "Branded Content Ads (legacy)", p: "Meta (IG + FB)", a: "Branded Content tag manual", c: "Permanente", at: "Business Manager marca" },
            { m: "Spark Ads", p: "TikTok", a: "Código autorización 7-365d", c: "Configurable", at: "TikTok Ads Manager marca" },
            { m: "Whitelisting clásico (deprecado)", p: "Meta histórico", a: "Login compartido", c: "Hasta cambio password", at: "Mixed (riesgo)" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/2">
              <td className="py-3 px-3 text-white font-semibold text-xs">{row.m}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.p}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.a}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.c}</td>
              <td className="py-3 px-3 text-white/60 text-xs">{row.at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      En una cuenta D2C que ya opera Meta + TikTok, la combinación que mejor rinde en 2026 es Partnership Ads + Spark Ads del mismo creator con las mismas 2-3 piezas para mantener mensaje cross-channel coherente y aprovechar producción única.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">Qué perfil de creator escala en D2C España (criterios operativos)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      El error más frecuente es perseguir el macro-influencer porque suena impactante. Los datos de cuentas auditadas dicen otra cosa: los micro-creators (10K-80K seguidores) rinden mejor en términos de CPA y permiten testar más volumen con el mismo presupuesto. Criterios de shortlist:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "Tamaño de cuenta: 10K-80K seguidores. Por debajo de 10K la social proof es escasa; por encima de 200K el coste por pieza se dispara sin retorno proporcional.",
        "Engagement rate ≥3,5% en últimos 30 días. Calculado como (likes + comentarios) / seguidores en posts orgánicos recientes, no en reels patrocinados.",
        "Audiencia España ≥60% (verificar en Instagram Insights del creator). Una cuenta con 80K seguidores pero solo 25% España es prácticamente inútil para un D2C que vende solo en España.",
        "Vertical alineado al producto: cosmética → beauty/skincare creators, suplementos → fitness/wellness, moda → fashion/styling. Cross-vertical solo funciona con producto de uso transversal.",
        "Formato Reels nativo. Creators que solo publican carruseles o stories no rinden en feed paid; el algoritmo Meta favorece Reels en 2026.",
        "Hook Rate orgánico ≥20% en últimos 5-10 Reels. Si su contenido orgánico no engancha, el pagado tampoco.",
        "Disponibilidad para 2-3 variantes de hook por pieza. Permite A/B testar sin negociar nueva colaboración.",
        "Track record de paid partnerships con marcas no competidoras (señal de profesionalidad).",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h2 className="text-2xl font-black mt-10 mb-4">Configuración técnica paso a paso (Partnerships Hub + Ads Manager)</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Esta es la secuencia operativa exacta. Saltarse cualquier paso hace que la ad no se pueda servir o que la atribución se rompa:
    </p>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "El creator activa Branded Content en Instagram: Settings → Creator → Branded Content → Approved Business Partners → buscar y añadir el Business Manager de la marca por nombre. Para Facebook: Page Settings → Branded Content → Add Brand Partner.",
        "La marca acepta la invitación desde Meta Business Suite → Partnerships Hub → Partnership Ads → Creator requests. Verificar que el creator aparece con estado 'Approved'.",
        "El creator publica el contenido como paid partnership: al subir el Reel/post, activar 'Add paid partnership label' y etiquetar a la marca. El post mostrará 'Paid partnership with [marca]' debajo del nombre del creator.",
        "Recoger el Post ID en Partnerships Hub: cada post elegible muestra su ID. Copiarlo —se usa en el siguiente paso.",
        "En Ads Manager crear ad set nuevo: nivel Campaign con objetivo Sales (Purchase con CAPI), nivel Ad Set con audiencia + presupuesto, nivel Ad → Identity → 'Use existing post' → pegar el Post ID. La preview mostrará el handle del creator, no el de la marca.",
        "Validar Event Match Quality: el Purchase optimization debe mostrar EMQ ≥7/10 antes de lanzar. Si está por debajo, primero arreglar CAPI server-side (Shopify Customer Events o Stape) y volver a comprobar.",
        "Lanzar con presupuesto 40-70€/día/ad set, ventana de aprendizaje 7-10 días, optimización Purchase. Cada creator en su propio ad set para poder comparar CPA y Hook Rate individuales.",
        "Monitorizar diariamente: Hook Rate, CPA, ROAS por creator. Pausar los que estén >25% por encima del CPA objetivo a partir del día 7-10. Escalar los ganadores a 150-400€/día y firmar continuidad mensual.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">4 tipos de Partnership Ads que funcionan en D2C 2026</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      No todos los formatos rinden igual. Estos son los 4 arquetipos operativos con benchmark de Hook Rate esperado en D2C España:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "UGC product demo (Hook Rate 30-42%): creator usa el producto en su rutina real, 8-15 segundos, voz on-camera. Funciona en cosmética, suplementos, hogar.",
        "Testimonial honesto (Hook Rate 28-38%): creator cuenta su experiencia tras X semanas con el producto, dato concreto (peso perdido, piel mejorada, ahorro tiempo). Funciona en wellness, fitness, productividad.",
        "Before/after (Hook Rate 32-45%): comparativa visual antes/después uso del producto. Funciona en skincare, fitness, organización hogar. Requiere transparencia sobre tiempo transcurrido para no incumplir AEPD/políticas Meta.",
        "Tutorial / how-to (Hook Rate 25-35%): creator enseña a usar el producto en 3-5 pasos. Funciona en cocina, moda (styling), productos técnicos. Más educacional, menor urgencia pero alto LTV.",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h2 className="text-2xl font-black mt-10 mb-4">Encaje en estructura CBO / ABO / Advantage+ Shopping</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Las Partnership Ads no son una campaña aparte: se integran como creatividad dentro de la estructura que ya operes. Recomendación operativa:
    </p>
    <ul className="space-y-2 mb-6">
      {[
        "En ABO (validación creator-by-creator): un ad set por creator durante los primeros 7-14 días para medir CPA y Hook Rate individuales. Presupuesto 40-70€/día/ad set.",
        "En CBO (escala de ganadores): 2-4 creators ya validados compitiendo dentro del mismo CBO con audiencia warm o LAL. Meta distribuye spend al creator que mejor rinde en cada momento.",
        "En Advantage+ Shopping Campaigns (ASC): subir los Reels de los 4-8 creators top como creatividades dentro de la ASC, permitiendo a Meta usarlas en su mix automático. Esto es lo que más sube ROAS de ASC en cuentas D2C maduras.",
        "Mantener Partnership Ads entre el 15-30% del spend total de creatividad. Por encima del 40% el algoritmo concentra y pierde diversidad de mensaje.",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/70 leading-relaxed mb-5">
      Para detalle de cuándo usar CBO o ABO en cada caso ver la <Link to="/blog/cbo-vs-abo-meta-ads-2026-d2c" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">guía CBO vs ABO en Meta Ads 2026</Link>.
    </p>

    <h2 className="text-2xl font-black mt-10 mb-4">7 errores frecuentes con Partnership Ads en D2C España</h2>
    <ol className="space-y-3 mb-6 list-decimal pl-5">
      {[
        "Pagar al creator y subir el video desde la cuenta de marca: pierdes el 100% del beneficio del modelo. Si no actívas Partnership Ads, mejor produce UGC contratado y úsalo como creatividad normal.",
        "Elegir creators por seguidores en vez de engagement: un creator con 200K seguidores y 1,2% ER rinde peor que uno con 25K y 4,5% ER. El ER es predictivo del Hook Rate paid.",
        "No separar ad sets por creator en la fase de validación: imposible identificar quién rinde. Tras 14 días se decide en bloque y se pierden los ganadores junto con los perdedores.",
        "Copiar el copy de la marca al ad del creator: rompe la autenticidad. El copy debe ser el del creator (o muy próximo), con CTA suave en línea con su tono.",
        "No firmar contrato de derechos de uso: tras 6-12 meses el creator puede revocar y la pieza se cae de Ads Manager. Negociar derechos de uso paid por 12-24 meses prorrogables.",
        "Audiencia desalineada al perfil del creator: servir un Reel de creator de skincare a hombres 18-25 baja el Relevance Score y dispara el CPM. La audiencia debe ser coherente con quien naturalmente seguiría a ese creator.",
        "No medir incrementalidad: asumir que el CPA bajo del creator es lift real, cuando puede ser canibalización de retargeting. Holdout test trimestral con geo o audiencia control es lo único que confirma incremental.",
      ].map((item) => (
        <li key={item} className="text-white/60 text-sm leading-relaxed">{item}</li>
      ))}
    </ol>

    <h2 className="text-2xl font-black mt-10 mb-4">Cómo trabajamos en DayByDay</h2>
    <div className="space-y-3 mb-6">
      {[
        "Shortlist de creators con criterios operativos: pasamos 4-8 horas filtrando creators con audiencia España ≥60%, ER ≥3,5%, formato Reels nativo y vertical alineado. Entregamos shortlist de 12-20 creators con datos de engagement, demografía y benchmark de Hook Rate orgánico.",
        "Brief estándar para creator que cubre las 5 dimensiones del framework de hipótesis: ángulo, hook seg 0-2, prueba, formato/duración y CTA. Detalle en la guía de framework de hipótesis creativas.",
        "Setup técnico end-to-end: invitación Partnerships Hub, validación CAPI EMQ ≥7, ad sets separados por creator, naming convention rígida [PA]_creator_pieza_ang.",
        "Solución ad-hoc Pablo + Jorge: para una marca D2C de cosmética con 16 creators activos simultáneos, Jorge construyó un pipeline n8n + Airtable + Meta Marketing API que cada semana cruza CPA × Hook Rate × ER orgánico del creator × cobertura legal y publica ranking semanal en Slack. Pablo decide cada lunes 2-3 creators a pausar y 1-2 nuevos a incorporar sobre datos limpios. Resultado en 90 días: Hook Rate medio paid subió de 24% a 36%, CPA bajó 21% y el equipo del cliente dejó de gestionar el seguimiento a mano.",
        "Negociación y contratos: tarifas tipo (200-800€/pieza micro), derechos de uso 12-24 meses, exclusividad sectorial 30-90 días, política de revisiones (2 vueltas máximo) y SLA de entrega.",
        "Reporting dedicado con Looker Studio: dashboard con CPA y ROAS por creator, evolución de Hook Rate week-over-week, presupuesto invertido vs ganados, fatiga creativa por ad y alertas de revocación de permisos.",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2 text-white/60 text-sm">
          <span className="text-[#de0015] mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="text-white/70 leading-relaxed mb-5">
      DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo lidera el shortlist de creators, el brief creativo y la decisión semanal sobre ranking; Jorge construye el pipeline n8n + Airtable + Meta Marketing API que mantiene los datos limpios y el reporting automatizado, además de validar la fontanería técnica (CAPI, EMQ, atribución). Donde otras agencias separan equipo creativo, media buyer y desarrollo de pipelines en 3 proveedores distintos, en DayByDay Pablo y Jorge operan como un solo equipo en la misma reunión. El cliente habla con los dos socios desde el primer día: sin account managers, sin handoffs, sin perfiles junior.
    </p>

    <div className="bg-[#1a1616] border border-white/8 rounded-xl p-6 mb-8 text-center">
      <p className="font-bold text-white text-lg mb-2">¿Quieres escalar UGC con Partnership Ads sin perder el control de la atribución?</p>
      <p className="text-white/50 text-sm mb-4">Auditoría gratuita 30 min: revisamos tu mix de creatividad actual, el setup de Partnerships Hub y la fontanería CAPI. Te entregamos shortlist orientativa de 8-15 creators alineados a tu vertical y la estructura de ad sets recomendada para arrancar.</p>
      <button
        onClick={openCalendly}
        className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm"
      >
        Solicitar auditoría gratuita →
      </button>
    </div>

    <h2 className="text-2xl font-black mt-10 mb-4">Artículos relacionados</h2>
    <div className="space-y-3">
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/ugc-meta-ads" className="text-white font-semibold hover:text-white/80">
          UGC en Meta Ads: cómo usarlo para bajar CPA en D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Fundamentos del formato UGC, qué produce CPA bajo y cómo briefar creators antes de saltar a Partnership Ads.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/framework-hipotesis-creatividades-meta-ads" className="text-white font-semibold hover:text-white/80">
          Framework de hipótesis creativas Meta Ads →
        </Link>
        <p className="text-white/40 text-xs mt-1">El brief de 1 página para diseñar pieza testable antes de gastar en producción con creator.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/cbo-vs-abo-meta-ads-2026-d2c" className="text-white font-semibold hover:text-white/80">
          CBO vs ABO en Meta Ads 2026: qué estructura usar para escalar D2C →
        </Link>
        <p className="text-white/40 text-xs mt-1">Cómo integrar Partnership Ads en estructura ABO de validación o CBO de escala según madurez de cuenta.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/ad-fatigue-meta-ads-rotacion-creativa" className="text-white font-semibold hover:text-white/80">
          Ad fatigue en Meta Ads: rotación creativa →
        </Link>
        <p className="text-white/40 text-xs mt-1">Ciclo de vida típico de UGC y Partnership Ads, y cuándo rotar al siguiente creator.</p>
      </div>
      <div className="bg-[#1a1616] border border-white/8 rounded-xl p-4">
        <Link to="/blog/tiktok-ads-ecommerce-d2c-espana-2026" className="text-white font-semibold hover:text-white/80">
          TikTok Ads para eCommerce D2C España 2026 →
        </Link>
        <p className="text-white/40 text-xs mt-1">Spark Ads en TikTok como hermano operativo de Partnership Ads para mix cross-channel coherente.</p>
      </div>
    </div>
  </BlogPostLayout>
);

export default PartnershipAdsMetaCreatorsD2cPage;
