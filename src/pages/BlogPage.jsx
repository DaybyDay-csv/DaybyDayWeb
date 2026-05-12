import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import Footer from "../components/Footer";

const posts = [
  {
    slug: "incrementality-testing-meta-ads-d2c",
    title: "Incrementality testing en Meta Ads: cómo medir el lift real en eCommerce D2C",
    excerpt: "Guía operativa de incrementality testing para Meta Ads en eCommerce D2C España: qué es y por qué importa, diferencia con atribución y MMM, los 3 tipos de test (Meta Conversion Lift, geo holdout, pre/post holistic), cuándo aplicar cada uno según volumen y spend, coste real y duración esperada (4-6 semanas), lift incremental realista por tipo de campaña en D2C España 2026 (prospecting 60-85%, retargeting 7-30d 20-45%, retargeting 30-180d 10-30%), protocolo paso a paso para diseñar un geo holdout test (regiones, baseline 28d, duración 14-28d, significancia), 7 errores frecuentes y enfoque DayByDay Pablo+Jorge con pipeline Python + Shopify Admin + Meta Marketing API.",
    category: "Medición",
    date: "12 may 2026",
    readingTime: "11 min",
  },
  {
    slug: "ad-fatigue-meta-ads-rotacion-creativa",
    title: "Ad fatigue en Meta Ads: señales tempranas y protocolo de rotación creativa",
    excerpt: "Guía operativa para detectar y prevenir ad fatigue en eCommerce D2C España: 4 señales tempranas (frecuencia, Hook Rate, CPM, coste add-to-cart) que adelantan 5-7 días al CPA, ciclo de vida típico por audiencia y formato (prospecting 30-60d, audiencias medias 21-35d, retargeting 10-21d, UGC +30-50%), 6 métricas a monitorizar por creative en 3 ventanas (1d/3d/7d), protocolo de rotación escalonada sin romper aprendizaje (4-6 creatividades activas, refresco semanal 1-2 variantes, máximo 30% rotado/semana), diferencia entre refresh y retiro definitivo, versiones 2.0 del ángulo ganador para extender vida 60-120d, impacto de Advantage+ Shopping (8-15 creatividades mínimas) y enfoque DayByDay con dashboard Looker Studio + alertas Slack.",
    category: "Creatividades",
    date: "12 may 2026",
    readingTime: "10 min",
  },
  {
    slug: "meta-ads-library-analisis-competencia",
    title: "Análisis de competencia en Meta Ads Library: cómo extraer creatividades ganadoras",
    excerpt: "Guía operativa para usar Meta Ads Library en eCommerce D2C España: qué es y qué se ve gratis (creatividad, copy, formato, longevidad, plataformas), método paso a paso para detectar creatividades ganadoras (filtros, longevidad >30-45 días, variantes en paralelo, cobertura multi-país), legalidad y ética del análisis competitivo bajo DSA, herramientas complementarias (Foreplay 49$, AdSpy 149$, Minea, BigSpy), 4-6 competidores directos + 3-5 internacionales como rango operativo, cadencia semanal/mensual/trimestral, patrones de creatividad ganadora D2C España 2026 (UGC voz on-camera 6-15s, Reels 9-25s, hooks texto seg 0-2, anti-patrón MotionGraphics), método para convertir ángulos prestados en hipótesis testables sin copiar al competidor, 7 errores frecuentes y enfoque DayByDay Pablo + Jorge con workflow n8n + agente IA que automatiza scraping y tagging de la librería.",
    category: "Creatividades",
    date: "11 may 2026",
    readingTime: "11 min",
  },
  {
    slug: "suscripciones-ecommerce-ltv-cac-d2c",
    title: "Suscripciones en D2C: cómo cambia el cálculo de LTV y CAC objetivo",
    excerpt: "Guía operativa para integrar suscripciones en un eCommerce D2C en España: cómo se recalcula el LTV-12m con churn mensual por cohorte, cómo se deriva el nuevo CAC objetivo permitido (más alto porque LTV es contractual), churn saludable por sector D2C 2026 (suplementos 6-10%, café 5-8%, mascotas 4-7%, cosmética 8-13%, higiene 6-9%, alimentación 7-12%), qué descuento de suscripción funciona mejor (-15% óptimo, -10% insuficiente, -20% comprime margen), cómo medir la incrementalidad real con holdout A/B (40-65% típico), ratios LTV/CAC permitidos por fase de cuenta (lanzamiento 2,0:1, growth 2,5:1, madurez 3,0:1), 7 errores frecuentes y enfoque DayByDay (Pablo + Jorge) con caso real cuenta suplementos AOV 45€ que subió CAC blended permitido +31% manteniendo ratio LTV/CAC 2,8:1.",
    category: "Unit Economics",
    date: "11 may 2026",
    readingTime: "11 min",
  },
  {
    slug: "ai-proof-skills-founder-d2c-2027",
    title: "AI-proof skills para founders D2C en 2027: qué dominar cuando el operativo se automatiza",
    excerpt: "Qué skills debe construir un founder D2C en 2026-2027 cuando la IA absorbe la ejecución operativa: lectura de margen de contribución cohorte, criterio de pricing, decisión de apertura/cierre de canal, gestión de clientes alto LTV (top 5-10% del revenue) y arquitectura de incentivos del equipo. Qué bloques operativos van a desaparecer (creatividades, bidding, reporting, atención cliente nivel 1-2), 5 AI-proof skills ordenadas por impacto en margen, marco para decidir dónde invertir tu próxima hora de aprendizaje y enfoque DayByDay (Pablo + Jorge en cada conversación).",
    category: "Decisiones de negocio",
    date: "10 may 2026",
    readingTime: "12 min",
  },
  {
    slug: "growth-partner-vs-agencia-paid-media",
    title: "Growth partner vs agencia paid media: cuándo cada uno tiene sentido para un D2C",
    excerpt: "Diferencia operativa entre growth partner y agencia de paid media para eCommerce D2C en España: alcance de decisión (toda la cuenta de resultados vs Meta+Google), métricas reportadas (margen de contribución, payback CAC, LTV/CAC cohorte vs ROAS plataforma), coste y modelo (retainer + variable sobre margen vs honorarios fijos), fase D2C ideal (500K€-5M€/año vs 0-500K€/año), 5 señales de que necesitas partner y no agencia, cuándo SÍ tiene sentido contratar agencia, 3 errores frecuentes y enfoque DayByDay con Pablo + Jorge en cada conversación.",
    category: "Decisiones de negocio",
    date: "10 may 2026",
    readingTime: "11 min",
  },
  {
    slug: "aumentar-aov-ecommerce-d2c-palancas",
    title: "Cómo subir el AOV en D2C: 7 palancas reales para ecommerce",
    excerpt: "Guía operativa para aumentar el AOV (ticket medio) en un eCommerce D2C en España: definición y cálculo correcto (AOV bruto vs neto vs mediano), AOV saludable por sector D2C 2026 (moda 45-75€, belleza 35-65€, suplementos 40-70€, hogar 60-150€, tech 80-200€), las 7 palancas con mayor ROI ordenadas por impacto (bundles +18-35%, free shipping threshold +8-15%, cross-sell +10-20%, tier descuento +12-22%, upsell post-purchase +5-12%, suscripción, edición limitada), cómo medir si funcionan sin canibalizar conversion rate y enfoque DayByDay (Pablo + Jorge).",
    category: "Unit Economics",
    date: "10 may 2026",
    readingTime: "11 min",
  },
  {
    slug: "margen-contribucion-vs-roas-ecommerce",
    title: "Margen de contribución vs ROAS: la métrica que media buyers olvidan",
    excerpt: "Por qué el ROAS de Meta/Google es insuficiente para decidir spend en eCommerce D2C España: definición de margen de contribución, fórmula operativa por pedido (AOV − COGS − fulfilment − comisión − devoluciones − CAC), rangos saludables por sector D2C 2026 (moda 18-28%, belleza 30-45%, suplementos 40-55%, hogar 25-40%, mascotas 25-35%, alimentación 20-30%, tech 15-25%), por qué ROAS in-platform engaña (atribución last-click sobreatribuida 1,3-1,8x vs MER blended, no descuenta devoluciones del 25-30% en moda, no descuenta descuentos checkout 8-15%, ignora LTV), CAC objetivo derivado del margen × ratio LTV/CAC 3:1, dashboard mínimo viable y enfoque DayByDay (Pablo + Jorge).",
    category: "Unit Economics",
    date: "9 may 2026",
    readingTime: "11 min",
  },
  {
    slug: "cro-landing-page-meta-ads-d2c",
    title: "CRO de landing page para Meta Ads: qué cambia respecto a SEO",
    excerpt: "Guía operativa de CRO (Conversion Rate Optimization) de landing pages para Meta Ads en eCommerce D2C España: por qué tráfico paid social necesita landing distinta a SEO, conversion rate saludable por sector 2026 (CR landing→purchase y top decile), 7 errores que matan conversión, PDP Shopify vs landing dedicada (Replo/Shogun/GemPages), impacto de Core Web Vitals (LCP/CLS/INP) en CPA, cuántas landings mantener activas, protocolo de A/B testing con disciplina y enfoque DayByDay.",
    category: "CRO",
    date: "9 may 2026",
    readingTime: "11 min",
  },
  {
    slug: "tiktok-ads-ecommerce-d2c-espana-2026",
    title: "TikTok Ads para D2C en España 2026: guía completa de activación",
    excerpt: "Guía operativa para activar TikTok Ads en un eCommerce D2C en España: cuándo abrir el canal sobre Meta Ads (saturación >15-20K€/mes), 3 condiciones obligatorias, presupuesto mínimo realista (2.000-3.000€/mes), formatos que mejor rinden (Spark Ads UGC, In-Feed nativo, Collection), CPM/CPC/CPA reales 2026 vs Meta, configuración TikTok Pixel + Events API server-side compartido con Meta CAPI, decisión TikTok Shop sí/no según unit economics, medición incremental con MER blended y holdout geo, y enfoque DayByDay.",
    category: "TikTok Ads",
    date: "8 may 2026",
    readingTime: "12 min",
  },
  {
    slug: "performance-max-ecommerce-d2c-cuando-usar",
    title: "Performance Max para D2C: cuándo activarla y cómo medir si funciona en 2026",
    excerpt: "Guía operativa para activar Performance Max en un eCommerce D2C en España: las 3 condiciones obligatorias antes de activarla (30+ conversiones/mes, feed Merchant Center limpio, baseline Search Brand+non-brand), cómo detectar canibalización con Search Brand y remarketing dinámico, ROAS objetivo por sector, modelo híbrido Standard Shopping + PMax, novedades 2026 (channel-level reporting, brand exclusions, GA4 cohorts, Customer Match) y enfoque DayByDay con holdout geo trimestral.",
    category: "Google Ads",
    date: "8 may 2026",
    readingTime: "12 min",
  },
  {
    slug: "black-friday-meta-ads-d2c-preparacion",
    title: "Black Friday Meta Ads para D2C: cómo preparar Q4 con 90 días de antelación",
    excerpt: "Guía operativa para preparar Black Friday y Q4 en Meta Ads para eCommerce D2C en España: calendario de 90 días con fases foundation/warm-up/peak/post-peak, presupuestos escalonados, qué creatividades funcionan y cuáles matan la cuenta, estructura 50/30/20 durante el peak, auditoría tracking y CAPI obligatoria 6 semanas antes y enfoque DayByDay.",
    category: "Estacional",
    date: "8 may 2026",
    readingTime: "12 min",
  },
  {
    slug: "email-marketing-meta-ads-ltv-d2c",
    title: "Email marketing + Meta Ads: cómo combinar paid y owned para escalar LTV en D2C",
    excerpt: "Guía operativa de cómo combinar email marketing (Klaviyo) y Meta Ads en una D2C española para escalar LTV: 5 flujos email obligatorios (welcome, carrito, browse, post-purchase, winback), sincronización bidireccional Klaviyo↔Meta, jerarquía de Custom Audiences y lookalike, % revenue saludable email vs paid por madurez de la base, casos donde subir lista a Meta sí compensa, medición incremental con MER blended y enfoque DayByDay.",
    category: "Estrategia",
    date: "7 may 2026",
    readingTime: "11 min",
  },
  {
    slug: "ios-atribucion-meta-ads-2026-d2c",
    title: "iOS 17/18 y atribución en Meta Ads: qué ha cambiado para D2C en 2026",
    excerpt: "Análisis técnico del impacto de iOS 17 e iOS 18 en la atribución de Meta Ads para eCommerce D2C: Link Tracking Protection, Private Relay e ITP de Safari, pérdida medida de matching por tipo de cuenta (-15 a -40%), papel de Aggregated Event Measurement, qué resuelve CAPI server-side y qué no, impacto en lookalike y algoritmo de pujas, y plan operativo en 6 pasos para D2C de 50-150K€/mes.",
    category: "Tracking",
    date: "6 may 2026",
    readingTime: "11 min",
  },
  {
    slug: "server-side-tracking-shopify-conversions-api",
    title: "Tracking server-side completo para Shopify con Conversions API: guía 2026",
    excerpt: "Guía técnica completa de tracking server-side para Shopify con Meta Conversions API en 2026: arquitectura sGTM vs Stape vs apps Shopify, eventos críticos y enriquecimiento de datos, deduplicación cliente-servidor, Consent Mode v2 y RGPD, errores frecuentes que rompen el matching, impacto real en EMQ/CPA/ROAS y enfoque DayByDay para migrar cuentas D2C.",
    category: "Tracking",
    date: "6 may 2026",
    readingTime: "12 min",
  },
  {
    slug: "marketing-mix-modeling-ecommerce-d2c",
    title: "Marketing Mix Modeling (MMM) para D2C: cuándo aplicarlo y qué resuelve",
    excerpt: "Guía práctica de Marketing Mix Modeling (MMM) para eCommerce D2C en España: qué es, cuándo aplicarlo según tamaño de spend, qué datos necesita, diferencias frente a MTA, herramientas reales (Robyn, LightweightMMM, Recast, Northbeam), cómo se valida con holdout y geo-experiments, y cómo decide DayByDay si MMM tiene sentido para tu cuenta.",
    category: "Métricas",
    date: "5 may 2026",
    readingTime: "11 min",
  },
  {
    slug: "modelos-atribucion-ecommerce-d2c",
    title: "Modelos de atribución para D2C: last-click, data-driven y MMM explicados",
    excerpt: "Guía práctica de modelos de atribución en eCommerce D2C: diferencias reales entre last-click, first-click, lineal, position-based, data-driven y Marketing Mix Modeling; por qué Meta Ads sobreatribuye 20-35% frente al ROAS real; qué modelo conviene según tamaño de cuenta; impacto de iOS 17/18 y pérdida de cookies; herramientas (GA4, Triple Whale, Northbeam) y cómo decide DayByDay qué modelo aplicar.",
    category: "Métricas",
    date: "5 may 2026",
    readingTime: "11 min",
  },
  {
    slug: "cohort-analysis-ecommerce-d2c",
    title: "Cohort analysis para eCommerce D2C: la métrica que predice si tu negocio escala",
    excerpt: "Cómo usar cohort analysis para detectar si tu D2C escala con clientes de calidad o se degrada en silencio: métricas clave (retención, LTV acumulado, payback period), patrones rojos por canal y cohorte BFCM, payback saludable por sector y cómo cruzar cohortes con decisiones de paid media.",
    category: "Métricas",
    date: "4 may 2026",
    readingTime: "10 min",
  },
  {
    slug: "cac-blended-vs-cac-canal-ecommerce",
    title: "CAC blended vs CAC por canal: qué métrica usar para escalar un D2C",
    excerpt: "Diferencias entre CAC blended y CAC por canal en eCommerce D2C: cuándo usar cada uno, cómo calcularlos sin inflar resultados, ratios LTV:CAC saludables, por qué la suma de CAC por canal no cuadra con el blended y cuándo merece la pena saltar a Marketing Mix Modeling.",
    category: "Métricas",
    date: "4 may 2026",
    readingTime: "9 min",
  },
  {
    slug: "automatizaciones-reglas-meta-ads-manager",
    title: "Automatizaciones y reglas en Meta Ads Manager para escalar (D2C 2026)",
    excerpt: "Cómo usar reglas automáticas y automatizaciones en Meta Ads Manager para escalar campañas D2C sin romper el learning phase: tipos de reglas (control, escalado, notificación), umbrales realistas, niveles correctos (campaña/ad set/anuncio), errores que rompen el algoritmo y cuándo conviene saltar a Marketing API con scripts externos.",
    category: "Operaciones",
    date: "4 may 2026",
    readingTime: "9 min",
  },
  {
    slug: "presupuesto-minimo-meta-ads-ecommerce",
    title: "Presupuesto mínimo Meta Ads: ¿cuánto necesito invertir? (D2C 2026)",
    excerpt: "Cuánto presupuesto mínimo necesitas para que Meta Ads funcione en eCommerce D2C en 2026: suelo operativo realista (30-50€/día), por qué el algoritmo necesita 50 conversiones/semana para estabilizar, mínimos por ticket (40€ a 200€+), distribución prospecting/retargeting según presupuesto, Advantage+ vs tradicional y reglas de escalado sin romper el aprendizaje.",
    category: "Estrategia",
    date: "3 may 2026",
    readingTime: "9 min",
  },
  {
    slug: "ab-testing-meta-ads-que-testar-primero",
    title: "A/B testing en Meta Ads: qué testar primero para maximizar aprendizaje",
    excerpt: "Cómo priorizar A/B tests en Meta Ads para eCommerce D2C: pirámide de impacto (creativo → hook → oferta → audiencia → puja → estructura), volumen mínimo de conversiones por variante, duración óptima del test, A/B nativo vs comparación manual, y cómo evitar contaminación por audience overlap.",
    category: "Estrategia",
    date: "3 may 2026",
    readingTime: "8 min",
  },
  {
    slug: "audiencias-lookalike-meta-alta-calidad",
    title: "Audiencias lookalike en Meta de alta calidad: guía 2026 D2C",
    excerpt: "Cómo crear audiencias lookalike de alta calidad en Meta Ads para eCommerce D2C: jerarquía de semillas (compradores LTV alto, AddToCart, engagement), tamaño semilla mínimo, qué porcentaje (1-10%) usar según tamaño de cuenta, exclusiones obligatorias y cuándo Advantage+ los sustituye.",
    category: "Estrategia",
    date: "2 may 2026",
    readingTime: "9 min",
  },
  {
    slug: "retargeting-meta-ads-ecommerce-2026",
    title: "Retargeting en Meta Ads para eCommerce: guía completa 2026",
    excerpt: "Guía completa de retargeting en Meta Ads para eCommerce D2C en 2026: cómo construir la escalera de audiencias (4 peldaños), ventanas óptimas por ticket, exclusiones cruzadas obligatorias, distribución 15-25% del spend vs prospecting, sequenciado creativo y errores que matan el ROAS.",
    category: "Estrategia",
    date: "2 may 2026",
    readingTime: "10 min",
  },
  {
    slug: "remarketing-dinamico-ecommerce-guia-practica",
    title: "Remarketing dinámico para ecommerce: guía práctica (2026)",
    excerpt: "Guía operativa de remarketing dinámico para eCommerce D2C: qué es y cuándo merece la pena, requisitos técnicos en Meta y Google, ventanas óptimas por ticket, distribución de presupuesto vs prospecting, plantillas creativas que rinden y cómo evitar fatiga.",
    category: "Estrategia",
    date: "1 may 2026",
    readingTime: "9 min",
  },
  {
    slug: "performance-max-vs-meta-ads-espana",
    title: "Performance Max vs Meta Ads: ¿cuál funciona mejor en España? (2026)",
    excerpt: "Comparativa operativa Performance Max vs Meta Ads para eCommerce D2C en España: rol real de cada canal, cuándo usar cada uno, presupuesto mínimo, CPA y ROAS reales por fase, errores frecuentes (canibalización de marca) y estrategia combinada con MER blended.",
    category: "Estrategia",
    date: "1 may 2026",
    readingTime: "10 min",
  },
  {
    slug: "guia-api-conversiones-meta-ads-shopify",
    title: "Guía API de Conversiones de Meta: configuración y beneficios para eCommerce",
    excerpt: "Guía completa de la API de Conversiones de Meta (CAPI) para eCommerce D2C: qué es, impacto real en rendimiento, cómo se implementa en Shopify (3 rutas), eventos críticos, deduplicación con el píxel, RGPD y verificación en Events Manager.",
    category: "Tracking",
    date: "30 abr 2026",
    readingTime: "10 min",
  },
  {
    slug: "como-elegir-agencia-meta-ads-ecommerce",
    title: "Cómo elegir la mejor agencia de Meta Ads para tu eCommerce en España",
    excerpt: "Guía operativa para identificar la mejor agencia de Meta Ads para un eCommerce D2C en España: 6 criterios que pesan de verdad, scorecard comparativo en una hoja, modelos de pricing alineados, banderas rojas y cómo evaluar resultados reales en los primeros 90 días.",
    category: "Agencias",
    date: "30 abr 2026",
    readingTime: "9 min",
  },
  {
    slug: "combinar-google-ads-meta-ads-d2c",
    title: "Cómo combinar Google Ads y Meta Ads en una estrategia D2C",
    excerpt: "Cómo combinar Google Ads y Meta Ads en un eCommerce D2C: rol de cada canal, distribución de presupuesto según madurez, qué activar primero, doble atribución y KPIs blended para validar incrementalidad real. Con tabla operativa por fase.",
    category: "Estrategia",
    date: "29 abr 2026",
    readingTime: "9 min",
  },
  {
    slug: "estrategia-full-funnel-d2c",
    title: "Estrategia full funnel D2C: del frío al cliente recurrente",
    excerpt: "Cómo montar un full funnel real para un eCommerce D2C en España: paid media (Meta + Google), email/WhatsApp y retención. Suelo de presupuesto, distribución por canal según fase de madurez, KPIs blended (MER, CAC blended) y orden operativo de implementación.",
    category: "Estrategia",
    date: "29 abr 2026",
    readingTime: "9 min",
  },
  {
    slug: "cuanto-invertir-meta-ads-calculadora",
    title: "Cuánto invertir en Meta Ads según tu ticket y margen (con calculadora)",
    excerpt: "Fórmula operativa para fijar inversión Meta según ticket, margen, LTV y ratio LTV/CAC objetivo. Con calculadora interactiva, suelo mínimo realista por tipo de D2C, distribución TOFU/MOFU/BOFU y protocolo de subida sin reiniciar la fase de aprendizaje.",
    category: "Estrategia",
    date: "28 abr 2026",
    readingTime: "10 min",
  },
  {
    slug: "cac-vs-ltv-ecommerce-escalable",
    title: "CAC vs LTV: la métrica que define si tu D2C es escalable",
    excerpt: "Cómo calcular CAC y LTV de forma realista en un eCommerce D2C, qué ratio LTV/CAC indica que el negocio escala (3:1 saludable), payback period razonable y palancas concretas para mejorarlo sin frenar adquisición. Con tabla de benchmarks por sector y errores que destruyen caja.",
    category: "Estrategia",
    date: "28 abr 2026",
    readingTime: "9 min",
  },
  {
    slug: "por-que-anuncios-meta-no-convierten",
    title: "Por qué tus anuncios de Meta no convierten (y cómo solucionarlo)",
    excerpt: "Diagnóstico paso a paso para entender por qué tus anuncios de Meta no convierten: 5 capas (tracking, landing, audiencia, creatividad, estructura), métricas de diagnóstico y protocolo de intervención sin romper el aprendizaje del algoritmo.",
    category: "Meta Ads",
    date: "28 abr 2026",
    readingTime: "9 min",
  },
  {
    slug: "escalar-ecommerce-d2c-100k-1m-paid-media",
    title: "Cómo escalar un eCommerce D2C de 100K a 1M€ con paid media",
    excerpt: "Sistema completo para escalar un D2C de 100K a 1M€ de facturación con paid media: validación de hipótesis, métricas de escala (MER, nCPA, LTV/CAC 90/180d), motor de creatividades, protocolo de subida de presupuesto y cuándo activar un segundo canal sin romper rentabilidad.",
    category: "Estrategia",
    date: "27 abr 2026",
    readingTime: "14 min",
  },
  {
    slug: "metricas-meta-ads-importantes-ecommerce",
    title: "Métricas Meta Ads que importan de verdad (y las que no)",
    excerpt: "Guía práctica sobre qué métricas de Meta Ads usar para tomar decisiones en ecommerce D2C: MER, CPA real, CPNC, y por qué el ROAS de plataforma sobreestima el rendimiento real entre un 20-35%. Con tabla de prioridad y cadencia de revisión.",
    category: "Meta Ads",
    date: "7 abr 2026",
    readingTime: "6 min",
  },
  {
    slug: "advantage-plus-shopping-cuando-usarlo-no",
    title: "Advantage+ Shopping en Meta Ads: cuándo usarlo y cuándo no",
    excerpt: "Guía práctica de Advantage+ Shopping Campaigns (ASC) para ecommerce D2C: tabla de decisión por volumen de conversiones, ventajas reales vs campañas manuales, límites del formato y protocolo de transición sin perder ROAS.",
    category: "Meta Ads",
    date: "7 abr 2026",
    readingTime: "6 min",
  },
  {
    slug: "escalar-campanas-meta-ads-sin-romper-roas",
    title: "Cómo escalar campañas Meta Ads sin que se rompa el ROAS",
    excerpt: "Protocolo para escalar Meta Ads sin perder rentabilidad: umbrales de decisión, regla de los 7 días, tabla de subida de presupuesto y el sistema que usamos en DayByDay para llevar cuentas de 5K a 80K€/mes sin sacrificar ROAS.",
    category: "Meta Ads",
    date: "25 mar 2026",
    readingTime: "8 min",
  },
  {
    slug: "creative-testing-meta-ads",
    title: "Creative Testing en Meta Ads: el framework que usamos para encontrar creativos ganadores",
    excerpt: "Framework paso a paso para hacer creative testing en Meta Ads: estructura de campañas, métricas de evaluación (Hook Rate, CVR, CTR), cuándo declarar un ganador y cómo construir un sistema de creatividades que escale.",
    category: "Meta Ads",
    date: "25 mar 2026",
    readingTime: "7 min",
  },
  {
    slug: "como-mejorar-roas-meta-ads-7-palancas",
    title: "Cómo mejorar el ROAS en Meta Ads: 7 palancas reales",
    excerpt: "Las 7 palancas que realmente mueven el ROAS en Meta Ads para ecommerce: tracking, estructura de campañas, creatividades, landing page, pujas, segmentación por margen y retargeting. Con el orden correcto para aplicarlas.",
    category: "Meta Ads",
    date: "23 mar 2026",
    readingTime: "7 min",
  },
  {
    slug: "benchmark-roas-sector-espana-2026",
    title: "Benchmark ROAS por sector en España 2026: ¿estás por encima de la media?",
    excerpt: "ROAS medio en España por sector en Meta Ads 2026: moda, cosmética, hogar, electrónica, alimentación y más. Tabla comparativa con márgenes típicos y cómo saber si tus campañas están por encima o por debajo de la media del mercado español.",
    category: "Estrategia",
    date: "18 mar 2026",
    readingTime: "9 min",
  },
  {
    slug: "caso-exito-ecommerce-d2c-roas-meta-ads",
    title: "Caso de éxito: eCommerce D2C +156% ROAS en 90 días con Meta Ads",
    excerpt: "Cómo un ecommerce D2C de cosmética en España pasó de 1,8x a 4,6x de ROAS real en 90 días: auditoría de tracking, consolidación de campañas a Advantage+ Shopping y sistema creativo con UGC. Métricas detalladas mes a mes.",
    category: "Casos de Éxito",
    date: "16 mar 2026",
    readingTime: "7 min",
  },
  {
    slug: "guia-meta-ads-ecommerce-d2c-espana-2026",
    title: "Guía completa de Meta Ads para ecommerce D2C en España 2026",
    excerpt: "Todo lo que necesitas saber para lanzar y escalar Meta Ads en tu ecommerce D2C en España: Advantage+ Shopping, API de Conversiones, estrategia creativa, métricas que importan y el ciclo de optimización semanal.",
    category: "Meta Ads",
    date: "12 mar 2026",
    readingTime: "14 min",
  },
  {
    slug: "checklist-auditoria-campanas-paid-media",
    title: "Checklist para auditar tus campañas de paid media en 2026",
    excerpt: "Checklist completo con 6 bloques críticos: tracking, estructura, creatividades, audiencias, métricas y landing. Revisa tus campañas de Meta Ads y Google Ads con benchmarks reales.",
    category: "Estrategia",
    date: "12 mar 2026",
    readingTime: "7 min",
  },
  {
    slug: "senales-agencia-publicidad-no-rinde",
    title: "Señales de que tu agencia de publicidad no está rindiendo",
    excerpt: "8 señales claras de que tu agencia de paid media no está haciendo bien su trabajo: ROAS cayendo, falta de tests, reportes vacíos y más. Con tabla de evaluación y benchmarks.",
    category: "Estrategia",
    date: "12 mar 2026",
    readingTime: "6 min",
  },
  {
    slug: "cuanto-cobra-media-buyer-freelance-espana",
    title: "Cuánto cobra un media buyer freelance en España en 2026",
    excerpt: "Guía de precios actualizada: rangos por nivel de experiencia, modelos de precio de agencias (fee fijo, porcentaje, híbrido) y cuánto deberías pagar según tu volumen de inversión.",
    category: "Paid Media",
    date: "12 mar 2026",
    readingTime: "6 min",
  },
  {
    slug: "que-es-un-media-buyer",
    title: "Qué es un media buyer: rol, funciones y cuándo contratar uno",
    excerpt: "Descubre qué hace un media buyer, cómo se diferencia de otros perfiles de marketing digital y cuándo tu ecommerce D2C realmente necesita contratar uno. Con tabla comparativa de perfiles.",
    category: "Paid Media",
    date: "12 mar 2026",
    readingTime: "7 min",
  },
  {
    slug: "que-es-roas-meta-ads",
    title: "Qué es el ROAS y cómo mejorarlo en Meta Ads",
    excerpt: "El ROAS (Return on Ad Spend) es la métrica más importante en publicidad digital. Te explicamos qué significa, cómo calcularlo y qué acciones concretas mejoran el ROAS en Meta Ads.",
    category: "Meta Ads",
    date: "8 mar 2026",
    readingTime: "6 min",
  },
  {
    slug: "meta-ads-vs-google-ads",
    title: "Meta Ads vs Google Ads: cuál elegir para tu negocio en 2026",
    excerpt: "¿Meta Ads o Google Ads? La respuesta depende de tu modelo de negocio y el estado de la demanda de tu producto. Comparativa directa, casos de uso y la estrategia full-funnel que combina ambas.",
    category: "Paid Media",
    date: "8 mar 2026",
    readingTime: "7 min",
  },
  {
    slug: "como-reducir-cpa-ecommerce",
    title: "Cómo reducir el CPA en Meta Ads para eCommerce — Guía paso a paso",
    excerpt: "Un CPA alto es el problema más común en las cuentas de Meta Ads que auditamos. Te explicamos las 6 causas principales y el plan de acción semana a semana para reducirlo.",
    category: "Meta Ads",
    date: "8 mar 2026",
    readingTime: "8 min",
  },
  {
    slug: "estrategia-full-funnel-meta-ads-d2c",
    title: "Estrategia Full-Funnel de Meta Ads para marcas D2C — Guía completa",
    excerpt: "Aprende a estructurar tus campañas de Meta Ads en tres fases (TOFU, MOFU, BOFU) para captar audiencia fría, cultivarla y convertirla en clientes. Con casos reales y benchmarks de presupuesto.",
    category: "Meta Ads",
    date: "10 mar 2026",
    readingTime: "8 min",
  },
  {
    slug: "automatizacion-marketing-que-es",
    title: "Automatización de marketing: qué es, cómo funciona y por qué implementarla",
    excerpt: "La automatización de marketing permite escalar tu captación de clientes sin aumentar tu equipo. Explicamos qué es, cómo funciona, qué herramientas usar y cómo implantarla paso a paso.",
    category: "Automatización",
    date: "10 mar 2026",
    readingTime: "7 min",
  },
  {
    slug: "tareas-marketing-automatizar",
    title: "Las 7 tareas de marketing que deberías automatizar ahora mismo",
    excerpt: "Descubre las 7 tareas de marketing que más tiempo consumen y que puedes automatizar con las herramientas adecuadas para escalar tu negocio sin aumentar tu equipo.",
    category: "Automatización",
    date: "10 mar 2026",
    readingTime: "6 min",
  },
  {
    slug: "agencia-vs-inhouse-vs-ia",
    title: "Agencia vs In-House vs IA: el desglose honesto de costes y resultados",
    excerpt: "¿Contratas una agencia de marketing, construyes un equipo interno o usas IA? Comparativa honesta de costes, ventajas y desventajas de cada opción para que tomes la decisión correcta.",
    category: "Estrategia",
    date: "10 mar 2026",
    readingTime: "7 min",
  },
  {
    slug: "estrategias-puja-meta-ads",
    title: "Estrategias de puja en Meta Ads 2026: cuál elegir según tu objetivo",
    excerpt: "Guía completa sobre las estrategias de puja en Meta Ads: automático, Cost Cap, Bid Cap, ROAS mínimo y Value Optimization. Cuándo usar cada una y cómo afectan al rendimiento.",
    category: "Meta Ads",
    date: "10 mar 2026",
    readingTime: "7 min",
  },
  {
    slug: "escalar-meta-ads",
    title: "Cómo escalar Meta Ads de 100€ a 1.000€/día sin quemar el presupuesto",
    excerpt: "Guía paso a paso para escalar campañas de Meta Ads sin arruinar el ROAS: escala vertical, horizontal, Advantage+, señales de saturación y el sistema de creatividades rotativas.",
    category: "Meta Ads",
    date: "10 mar 2026",
    readingTime: "8 min",
  },
  {
    slug: "embudo-captacion-clientes",
    title: "Cómo construir un embudo de captación de clientes automatizado",
    excerpt: "Aprende a construir un sistema de captación de clientes que funciona 24/7: anuncios, landing page, secuencia de emails, lead scoring y CRM conectado. Paso a paso con herramientas reales.",
    category: "Automatización",
    date: "10 mar 2026",
    readingTime: "8 min",
  },
  {
    slug: "preguntas-contratar-agencia-paid-media",
    title: "10 preguntas que debes hacer antes de contratar una agencia de paid media",
    excerpt: "Antes de firmar con una agencia de Meta Ads o paid media, estas son las 10 preguntas que separan una buena agencia de una que te va a hacer perder tiempo y dinero.",
    category: "Estrategia",
    date: "10 mar 2026",
    readingTime: "6 min",
  },
  {
    slug: "ugc-meta-ads",
    title: "Cómo usar UGC para potenciar tus Meta Ads y reducir el CPM",
    excerpt: "El UGC (User Generated Content) es el formato publicitario con mejor rendimiento en Meta Ads en 2026. Aprende a conseguirlo, producirlo y escalarlo para reducir el CPM y mejorar el ROAS.",
    category: "Meta Ads",
    date: "10 mar 2026",
    readingTime: "6 min",
  },
  {
    slug: "ia-marketing-digital",
    title: "IA en marketing digital: cómo usamos la IA para superar a las agencias tradicionales",
    excerpt: "Cómo la inteligencia artificial está transformando el marketing digital en 2026 y cómo las agencias nativas en IA la usan para conseguir mejores resultados con menos recursos.",
    category: "IA y Automatización",
    date: "10 mar 2026",
    readingTime: "7 min",
  },
  {
    slug: "buen-roas-por-nicho-benchmarks-2026",
    title: "¿Qué es un buen ROAS? Benchmarks por nicho para Meta Ads y Google Ads en 2026",
    excerpt: "Benchmarks reales de ROAS por sector en Meta Ads y Google Ads para 2026: moda, belleza, salud, hogar, electrónica y más. Incluye la fórmula para calcular tu ROAS objetivo según tu margen.",
    category: "Paid Media",
    date: "10 mar 2026",
    readingTime: "8 min",
  },
  {
    slug: "metodologia-daybyday-ia-automatizacion-paid-media",
    title: "La Metodología DayByDay: Cómo Combinamos IA, Automatización y Paid Media para Escalar tu Negocio",
    excerpt: "Descubre los tres pilares que diferencian a DayByDay: IA aplicada al paid media, automatización de procesos de marketing y estrategia full-funnel. Proceso completo en 4 fases con resultados reales.",
    category: "Estrategia",
    date: "10 mar 2026",
    readingTime: "9 min",
  },
  {
    slug: "estado-paid-media-d2c-espana-2026",
    title: "Estado del Paid Media D2C en España 2026: Benchmarks, Tendencias y Datos Reales",
    excerpt: "Informe anual de DayByDay Consulting con datos originales: CPMs por sector, ROAS promedio por canal, impacto de la IA en campañas, tendencias clave y lo que diferencia a las marcas que crecen más rápido.",
    category: "Investigación",
    date: "10 mar 2026",
    readingTime: "12 min",
  },
  {
    slug: "mejores-agencias-paid-media-espana-ecommerce-d2c",
    title: "Mejores Agencias de Paid Media en España para eCommerce D2C (2026)",
    excerpt: "Guía para evaluar y elegir la mejor agencia de paid media en España para tu eCommerce D2C. Qué criterios usar, qué resultados esperar, señales de alerta y preguntas clave antes de firmar.",
    category: "Estrategia",
    date: "11 mar 2026",
    readingTime: "8 min",
  },
  {
    slug: "que-es-paid-media-guia-completa",
    title: "Qué es el Paid Media: Guía Completa para Founders de eCommerce",
    excerpt: "Guía completa sobre qué es el paid media, cómo funciona, qué plataformas usar, cuánto presupuesto necesitas y cómo medir resultados reales. Para founders de eCommerce D2C en España.",
    category: "Paid Media",
    date: "11 mar 2026",
    readingTime: "7 min",
  },
  {
    slug: "elegir-agencia-anuncios-meta-ads-d2c",
    title: "Cómo Elegir una Agencia de Anuncios en Meta Ads para tu Marca D2C",
    excerpt: "Guía completa para elegir la agencia de Meta Ads correcta para tu marca D2C: qué habilidades técnicas debe tener, qué preguntar, señales de alerta y cómo comparar propuestas.",
    category: "Meta Ads",
    date: "11 mar 2026",
    readingTime: "8 min",
  },
  {
    slug: "top-agencias-marketing-digital-espana-que-mirar",
    title: "Top Agencias de Marketing Digital en España: Qué Mirar Antes de Contratar",
    excerpt: "Cómo evaluar y seleccionar entre las top agencias de marketing digital en España. Criterios reales, modelos de comparación, señales de alerta y preguntas clave para tomar la decisión correcta.",
    category: "Estrategia",
    date: "11 mar 2026",
    readingTime: "8 min",
  },
  {
    slug: "agencia-paid-media-vs-agencia-marketing-generalista",
    title: "Agencia de Paid Media Especializada vs Agencia de Marketing Generalista",
    excerpt: "Comparativa honesta entre agencia de paid media especializada y agencia de marketing generalista: diferencias técnicas, resultados esperados, modelos de costes y cuándo elegir cada opción.",
    category: "Estrategia",
    date: "11 mar 2026",
    readingTime: "7 min",
  },
  {
    slug: "cuanto-cuesta-agencia-paid-media-espana-precios-2026",
    title: "Cuánto Cuesta una Agencia de Paid Media en España: Guía de Precios 2026",
    excerpt: "Guía completa de precios de agencias de paid media en España para 2026: modelos de honorarios, rangos por volumen de inversión, qué incluye cada modelo y cómo evaluar si merece la pena.",
    category: "Estrategia",
    date: "11 mar 2026",
    readingTime: "7 min",
  },
  {
    slug: "media-buyer-vs-agencia-ecommerce-d2c",
    title: "Media Buyer vs Agencia de Publicidad: Qué Necesita tu eCommerce D2C",
    excerpt: "Comparativa completa entre contratar un media buyer propio o trabajar con una agencia de paid media para eCommerce D2C. Costes reales, ventajas, desventajas y cuándo tiene sentido cada opción.",
    category: "Estrategia",
    date: "11 mar 2026",
    readingTime: "8 min",
  },
];

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Blog de DayByDay Consulting",
  "description": "Artículos sobre marketing digital, Meta Ads, automatización y captación de clientes.",
  "url": "https://www.daybydayconsulting.com/blog",
  "publisher": {
    "@type": "Organization",
    "name": "DayByDay Consulting",
    "url": "https://www.daybydayconsulting.com",
  },
};

const BlogPage = ({ openCalendly }) => (
  <div className="min-h-screen bg-[#181414] text-white">
    <SEOHead
      title="Blog de Marketing Digital e IA — DayByDay Consulting"
      description="Guías prácticas, comparativas y casos de estudio sobre Meta Ads, Google Ads, automatización de marketing y captación de clientes. Sin humo, enfocado en resultados."
      canonical="/blog"
      schema={blogSchema}
    />

    {/* Top bar with logo */}
    <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#181414]/80 backdrop-blur-sm border-b border-white/5">
      <Link to="/" style={{ textDecoration: "none" }}>
        <span className="text-white font-black text-lg leading-none">Day</span>
        <span className="text-[#de0015] font-black text-lg leading-none">by</span>
        <span className="text-white font-black text-lg leading-none">Day</span>
      </Link>
    </div>

    <section className="relative pt-32 pb-16 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(222,0,21,0.10), transparent)",
        }}
      />
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#de0015] inline-block" />
            Blog
          </span>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-5">
            Marketing con IA, automatización y resultados reales
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Guías prácticas y estrategias de marketing digital que usamos con nuestros clientes. Sin humo, enfocado en resultados.
          </p>
        </div>

        {/* Article list */}
        <div className="space-y-4">
          {posts.map(({ slug, title, excerpt, category, date, readingTime }) => (
            <Link
              key={slug}
              to={`/blog/${slug}`}
              className="block bg-[#1f1a1a] border border-white/8 hover:border-white/20 rounded-2xl p-6 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-white/8 border border-white/10 text-white/50 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {category}
                </span>
                <span className="text-white/30 text-xs">{date}</span>
                <span className="text-white/30 text-xs">{readingTime}</span>
              </div>
              <h2 className="font-bold text-base sm:text-lg mb-2 group-hover:text-white transition-colors leading-snug">
                {title}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                {excerpt}
              </p>
              <div className="mt-4 text-xs text-white/40 group-hover:text-white/60 transition-colors flex items-center gap-1">
                Leer artículo
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </section>

    <Footer onAgendarClick={openCalendly} />
  </div>
);

export default BlogPage;
