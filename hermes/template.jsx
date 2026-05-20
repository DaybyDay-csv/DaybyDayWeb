// HERMES TEMPLATE — Modelled on src/pages/blog/CustomerJourneyD2cPage.jsx (2026-05-19)
// MiniMax: Replace EVERY {{PLACEHOLDER}} token. Keep all imports, layout, structure, classNames identical.
// Filename pattern: {{ComponentName}}.jsx where ComponentName = PascalCase(slug) + "Page"
// DO NOT add new imports. DO NOT change BlogPostLayout API.
// Word count target body text: 1000-1500.

import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";
import relatedPostsData from "../../data/relatedPosts";

const faqs = [
  {
    q: "{{FAQ_1_QUESTION}}",
    a: "{{FAQ_1_ANSWER_120_180_WORDS}}"
  },
  {
    q: "{{FAQ_2_QUESTION}}",
    a: "{{FAQ_2_ANSWER_120_180_WORDS}}"
  },
  {
    q: "{{FAQ_3_QUESTION}}",
    a: "{{FAQ_3_ANSWER_120_180_WORDS}}"
  },
  {
    q: "{{FAQ_4_QUESTION}}",
    a: "{{FAQ_4_ANSWER_120_180_WORDS}}"
  },
  {
    q: "{{FAQ_5_QUESTION}}",
    a: "{{FAQ_5_ANSWER_120_180_WORDS}}"
  },
];

const {{COMPONENT_NAME}} = ({ openCalendly }) => (
  <BlogPostLayout
    title="{{TITLE_50_60_CHARS}}"
    description="{{META_DESCRIPTION_140_160_CHARS}}"
    slug="{{SLUG}}"
    datePublished="{{DATE_ISO_YYYY_MM_DD}}"
    dateModified="{{DATE_ISO_YYYY_MM_DD}}"
    readingTime="{{READING_TIME}} min"
    category="{{CATEGORY}}"
    keywords={[
      "{{KEYWORD_PRIMARY}}",
      "{{KEYWORD_SECONDARY_1}}",
      "{{KEYWORD_SECONDARY_2}}",
      "{{KEYWORD_SECONDARY_3}}",
      "{{KEYWORD_SECONDARY_4}}",
    ]}
    faqs={faqs}
    relatedPosts={relatedPostsData["{{SLUG}}"] || []}
    openCalendly={openCalendly}
  >
    {/* INTRO: 1 paragraph, 80-130 words. Wrap keyword (or close variant) in <strong>. Include 1 stat with year + source in this section or the next. */}
    <p className="text-white/70 leading-relaxed mb-5">
      <strong className="text-white">{{HOOK_SENTENCE_WITH_KEYWORD}}</strong> — {{INTRO_REMAINDER_60_100_WORDS_WITH_CITATION_AND_PROMISE}}
    </p>

    {/* SECTION 1 */}
    <h2 className="text-2xl font-black mt-10 mb-4">{{H2_SECTION_1}}</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      {{SECTION_1_PARAGRAPH_1_120_180_WORDS}}
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      {{SECTION_1_PARAGRAPH_2_120_180_WORDS}}
    </p>

    {/* SECTION 2 — Must contain a TABLE with 4-6 rows */}
    <h2 className="text-2xl font-black mt-10 mb-4">{{H2_SECTION_2}}</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      {{SECTION_2_INTRO_80_120_WORDS}}
    </p>

    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">{{TABLE_COL_1_HEADER}}</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">{{TABLE_COL_2_HEADER}}</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">{{TABLE_COL_3_HEADER}}</th>
            <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wider">{{TABLE_COL_4_HEADER}}</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c1: "{{ROW1_C1}}", c2: "{{ROW1_C2}}", c3: "{{ROW1_C3}}", c4: "{{ROW1_C4}}" },
            { c1: "{{ROW2_C1}}", c2: "{{ROW2_C2}}", c3: "{{ROW2_C3}}", c4: "{{ROW2_C4}}" },
            { c1: "{{ROW3_C1}}", c2: "{{ROW3_C2}}", c3: "{{ROW3_C3}}", c4: "{{ROW3_C4}}" },
            { c1: "{{ROW4_C1}}", c2: "{{ROW4_C2}}", c3: "{{ROW4_C3}}", c4: "{{ROW4_C4}}" },
            { c1: "{{ROW5_C1}}", c2: "{{ROW5_C2}}", c3: "{{ROW5_C3}}", c4: "{{ROW5_C4}}" },
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

    {/* SECTION 3 */}
    <h2 className="text-2xl font-black mt-10 mb-4">{{H2_SECTION_3}}</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      {{SECTION_3_PARAGRAPH_120_180_WORDS}}
    </p>
    <ul className="list-disc list-inside text-white/70 space-y-2 mb-5 ml-4">
      <li>{{BULLET_1}}</li>
      <li>{{BULLET_2}}</li>
      <li>{{BULLET_3}}</li>
      <li>{{BULLET_4}}</li>
    </ul>

    {/* SECTION 4 — Cite the 3 research sources here, inline as <a> tags */}
    <h2 className="text-2xl font-black mt-10 mb-4">{{H2_SECTION_4}}</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      {{SECTION_4_PARAGRAPH_WITH_3_CITATIONS}}
    </p>
    <p className="text-white/70 leading-relaxed mb-5">
      Fuentes consultadas: <a href="{{CITATION_1_URL}}" target="_blank" rel="nofollow noopener" className="underline text-white/80">{{CITATION_1_SOURCE}} ({{CITATION_1_YEAR}})</a>, <a href="{{CITATION_2_URL}}" target="_blank" rel="nofollow noopener" className="underline text-white/80">{{CITATION_2_SOURCE}} ({{CITATION_2_YEAR}})</a>, <a href="{{CITATION_3_URL}}" target="_blank" rel="nofollow noopener" className="underline text-white/80">{{CITATION_3_SOURCE}} ({{CITATION_3_YEAR}})</a>.
    </p>

    {/* INTERNAL LINKS section */}
    <h2 className="text-2xl font-black mt-10 mb-4">Lecturas relacionadas</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      Para profundizar te recomendamos: <Link to="/blog/{{INTERNAL_LINK_1_SLUG}}" className="underline text-white/80">{{INTERNAL_LINK_1_ANCHOR}}</Link>, <Link to="/blog/{{INTERNAL_LINK_2_SLUG}}" className="underline text-white/80">{{INTERNAL_LINK_2_ANCHOR}}</Link> y <Link to="/blog/{{INTERNAL_LINK_3_SLUG}}" className="underline text-white/80">{{INTERNAL_LINK_3_ANCHOR}}</Link>.
    </p>

    {/* DAYBYDAY APPROACH — Weave 1-2 differentiators naturally */}
    <h2 className="text-2xl font-black mt-10 mb-4">Cómo lo abordamos en DayByDay</h2>
    <p className="text-white/70 leading-relaxed mb-5">
      {{DAYBYDAY_APPROACH_PARAGRAPH_REFERENCING_PABLO_OR_JORGE_140_200_WORDS}}
    </p>

    {/* CTA */}
    <div className="mt-12 mb-6 p-6 border border-white/10 rounded-lg bg-white/5">
      <h3 className="text-xl font-black text-white mb-3">{{CTA_HEADLINE_KEYWORD_FOCUSED}}</h3>
      <p className="text-white/70 leading-relaxed mb-4">
        {{CTA_PARAGRAPH_50_80_WORDS}}
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

export default {{COMPONENT_NAME}};
