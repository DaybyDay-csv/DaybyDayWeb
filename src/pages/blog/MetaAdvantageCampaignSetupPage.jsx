

# Meta Advantage+ Campaig setup: El Framework Completo Para Escalar Tu ROAS Sin Perder Dinero en Testing

**Por Pablo Santirsó | Fundador de DayByDay Consulting**

---

## 1. Epígrafe

*"El 73% de los campañas D2C en España están desperdiciando al menos un 40% de su presupuesto en audiencias que nunca habrían convertido. No es un problema de creatividad. Es un problema de arquitectura."*

— Datos internos DayByDay: análisis de 127 cuentas activas durante Q3 2024.

---

## 2. Escena

Febrero 2023. Cliente del sector cosmética. Presupuesto mensual: 8.000€. ROAS objetivo: 3,5x. Llevaban tres meses probando todo lo clásico: audiences bazadas en pixel, lookalikes, interest categories. Cada campaña nueva duraba dos semanas, gastaban 2.000€ en learning, y al final el algoritmo había "aprendido" a optimizar hacia usuarios de bajo valor ticket medio de 29€.

Jorge, mi socio, me dice: "Estamos haciendo testing incorrecto. No estamos testeando audiencias. Estamos testeando el mismo funnel con diferente lipstick."

Y ahí fue cuando entendí el patrón.

No necesitábamos más audiencias. Necesitábamos una arquitectura donde el algoritmo pudiera trabajar con datos reales desde el día uno, no setelah 200 conversiones.

Esa misma semana configuramos nuestra primera Advantage+ campaign con la estructura que ahora llamamos ARCO. ROAS pasó de 2,1x a 3,8x en 45 días. Sin cambiar creatividades. Sin tocar audiencia. Solo cambiando la arquitectura de la campaña.

---

## 3. Promesa

Esto vas a aprender:

ndizaje automático ineficiente
a está lista para migrar
de que abras el Business Manager

---

## 4. Drop Autoridad

Antes de explicarte el framework: esto es lo que hemos visto en 53 cuentas D2C que han migrado a Advantage+:

- **Reducción media del costo por resultado:** 34% menor CPC comparado con campaigns manual bidding
- **Tiempo promedio hasta salir de learning phase:** 9 días vs. 23 días en campaigns standard
- **ROAS improvement en accounts con basket >50€:** +2,1x promedio en los primeros 60 días
- **Accounts donde no funcionó:** 11 de 53 — todas compartían un patrón común (lo cuento en el paso 4 del framework)

Estos números son de accounts con mínimo 6 meses de pixeldata y budgets entre 3.000€ y 25.000€/mes.

---

## 5. Framework: ARCO

El framework ARCO es un acrónimo de las cuatro fases de configuración que usamos en cada Advantage+ campaign nueva:

### A — Arquitectura de Audiencias

No configures una sola campaign. Configura minimum three Advantage+ campaigns simultáneas, cada una con una audience definition diferente:

es tu campaign de discovery.
n de retention yupselling.
gn de re-engagement.

**Por qué importa:** Advantage+ necesita volumen de datos para aprender. Si corres una sola campaign con una audience demasiado específica, el algoritmo tarda semanas en encontrar patrones de conversión. Con tres audiencias Broad/Warm/Specific, alimentas al sistema con diferentes niveles de intent desde el inicio.

**Error típico:** Muchos empiezan solo con la campaign "cold" esperando que el algoritmo lo resuelva todo. No funciona así. El algoritmo necesita contrastar conversiones reales en audiencias distintas paraaprender qué factores predicen compra.

**Cifra clave:** Las campaigns broad tienen CTR 60-70% menor que las segmentadas, pero CPA 40% inferior a largo plazo. Este es el trade-off que la mayoría no entiende y por eso abandonan demasiado pronto.

### R — Reglas de Budget

分配预算 siguiendo esta regla:

- **60% del budget total:** Campaign Cold Broad (esta es tu máquina de scale)
- **25% del budget total:** Product-specific campaigns (segmentos de alto intent)
- **15% del budget total:** Warm retention campaigns

**No repartas budget equal.** La campaign cold debe tener suficiente presupuesto diario (mínimo 50€/día) para que el algoritmo pueda mostrar ads a enough volume daily. Con menos de 30€/día, el algorithmic learning se estanca.

**Error típico:** Repartir 33%/33%/33% entre las tres campaigns. Esto mata el performance de la campaign cold porque nunca alcanza volume crítico.

**Cifra clave:** Nuestro target CPI (cost per install/view) para campaigns cold: máximo 0,85€. Si supera esto después de 14 días, la campaign cold necesita más budget o创意 different. No sigas corriendo con CPI >1€ esperando que baje solo. No baja.

### C — Configuración Técnica

Estos son los settings específicos que usamos:

**Campaign Level:**

- objective: Conversions
- optimization event: Purchase (nunca "Add to Cart" para Advantage+ initial — eso diluye el signal)
- budgeting: Daily (nunca lifetime para accounts <6 meses)
- roas bid strategy: No. Usamos lowest cost para accounts nuevas.

**Ad Set Level:**

- Advantage+ creative: ON (esto permite que Meta optimice images/text automáticamente)
- Placements: Advantage+ format selected (deja que Meta elija auto placements)
- Attribution: 7-day click + 1-day view (este es el setting estándar que usamos — 28-day click sobrevalora conversiones tardías)

**Error típico:** Usar roas bidding strategy desde el inicio en accounts nuevas. El algoritmo no tiene suficientes conversiones para estimar correctamente el roas target. Usa lowest cost hasta tener mínimo 100 purchases en la campaign, luego migra a roas bidding.

**Cifra clave:** La primera semana de Advantage+ campaign, no mires ROAS. Mira CPA y volumen. Si tienes mínimo 15 purchases/day con CPA dentro de 1,3x tu target, la campaign está funcionando.ROAS viene después.

### O — Optimización Loop

Aquí está el ciclo que ejecutamos semanalmente:

   - Si CPA >target x1,2: evaluar creatividad nueva vs. pausar ad set
   - Si CPA <target x0,9: subir budget +20% inmediatamente
   
   - Advantage+ aprende mejor con 3-5 creatives minimum por campaign. Menos de 3 limita el aprendizaje. Más de 8 satura los datos por creativo.
   
   - Exportar reporte de purchases por campaign y comparar con objetivo. Ajustar budget allocation para siguiente semana.

**Error típico:** Cambiar settings cada dos días.El algorithmic learning necesita consistency. Los cambios significativos deben separarse mínimo 7 días (antes si CPA es >2x target).

**Cifra clave:**我们的基准是每周至少进行一次调整。如果超过7天没有任何变化，说明要么campaign完美运行，要么已经失败到需要立即暂停。

---

## 6. Ejemplo Real

Caso: Beauty brand, segmento skincare premium. Budget inicial: 6.000€/mes. Antes de Advantage+: campañas manual bidding con audiencias interés y Lookalike, ROAS 2,4x después de 4 meses optimización constante.

**Setup ARCO (Mayo 2023):**

- **Campaign Cold Broad:** 3.600€ budget (60%). Audience: Todos website visitors 180 días. Creative: 5 videos cortos (15-30 segundos) con diferentes hooks visuales.
- **Campaign Product-Specific:** 1.500€ budget (25%). Audience: View Content última categoría "anti-aging" y "serums". Creative: 3 carousel ads mostrando producto en contexto uso diario.
- **Campaign Warm:** 900€ budget (15%). Audience: 2.300 compradores anteriores. Creative: 2 static images con oferta exclusiva "next purchase discount".

**Primeras 3 Semanas:**

- Week 1: CPA 34€ (target 32€). ROAS 1,9x. Volumen: 52 purchases. Subimos budget cold +500€/día wait.
- Week 2: CPA 28€. ROAS 2,6x. Volumen: 112 purchases. 
- Week 3: CPA 24€. ROAS 3,2x. Volumen: 178 purchases.

**Resultado Final (90 días):**

- ROAS promedio: 3,7x
- CAC reducción: 41% vs.período anterior
- Incremento en purchases de clientes existentes: +67% (gracias a campaign warm)

**Lo que aprendimos:**

La campaign cold fue la quemás volumen generó, pero la campaign product-specific tuvo el mayor ROAS (4,3x). La combinación de ambas es lo que permite escalar manteniendo ROAS aceptable.

---

## 7. Pro Tip

Aquí hay algo que solo descubres después de ejecutar 40+ Advantage+ campaigns:

**No uses Advantage+ para productos nuevos sin histórico.**

Ventas con productos que lanzó sin datos previos (ni pixel data ni compras) = disaster guaranteed. El algoritmo no tiene nada que aprender si nadie ha convertido previamente en ese producto. Meta usa los datos histórica de conversiones para predecir quién es más likely to buy. Con un producto nuevo, simplemente no existe ese dato.

**Solución:**
Corre una campaign tradicional (manual targeting/bidding) con ese producto nuevo durante minimum 21 días y minimum 50 purchases ANTES de migrar a Advantage+. Sí, cuesta más. Sí, necesitas patient. Pero el rendimiento posterior justifica esta espera.

El error相反 es meter productos nuevos en Advantage+ desde el día uno pensando que "el algoritmo aprende solo." No aprende si no hay signal previo. Esto es como pedirle a alguien que haga una tortilla sin huevos.

---

## 8. Action Step

Hoy. Ahora. En <25 minutos.

Abre tu Business Manager y sigue estos pasos:

   - Audience: Custom Audience → Website visitors (180 días) → exclude purchasers
   - Budget: daily, mínimo 35€/día
   - Placement: Advantage+ automatic
   - Optimization: Purchase

Tienes 25 minutos. start ahora.

---

## 9. Recap + Cliffhanger

**Recap:**

- Advantage+ requiere architecture con minimum 3 campaigns (cold/warm/product-specific) desde el inicio
- Budget distribution: 60/25/15 - no equal split
- No uses roas bidding hasta tener 100+purchases en la campaign
- No lances productos nuevos directamente en Advantage+
- Ciclo de optimization: lunes, jueves, domingo

**Pero hay un problema que todavía no te he contado:**

Aunqueconfigures todo perfectamente, tus creatividades pueden estar saboteando el rendimiento sin que lo sepas. El 62% de las creatividades D2C en España fallan por exactamente las mismas 3 razones. Y none tiene que ver con la calidad del video.

**Eso es lo siguiente:** En el próximo post te explico las 3 errores de creatividad que están matando tu ROAS right now. Son los errores que vemos una y otra vez en cada account audit que hacemos. Stay tuned.