import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Inicio from "../components/Inicio";
import Sectores from "../components/Sectores";
import Nosotros from "../components/Nosotros";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";

gsap.registerPlugin(ScrollTrigger, SplitText);

const websiteSchema = {
  "@type": "WebSite",
  "name": "DayByDay Consulting",
  "url": "https://www.daybydayconsulting.com",
  "description": "Partnership especializado en paid media D2C (Pablo Santirsó, founder) y automation tech ad-hoc B2B/B2C (Jorge González, CTO). Una conversación, dos socios senior, sin account managers.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.daybydayconsulting.com/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const organizationSchema = {
  "@type": ["Organization", "ProfessionalService"],
  "name": "DayByDay Consulting",
  "url": "https://www.daybydayconsulting.com",
  "logo": "https://www.daybydayconsulting.com/images/logo-daybyday.png",
  "description": "DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo lidera paid media, estrategia y operaciones; Jorge lidera automation, agentic AI y soluciones tech ad-hoc para B2B y B2C. El cliente trata directamente con los dos socios, sin account managers, sin handoffs entre proveedores. Donde otras agencias separan marketing y tech, en DayByDay se aplica todo en la misma conversación.",
  "areaServed": "ES",
  "foundingDate": "2022",
  "founder": {
    "@type": "Person",
    "name": "Pablo Santirsó",
    "jobTitle": "Founder · Paid Media, Strategy & Operations",
    "url": "https://es.linkedin.com/in/pablo-santirso-perez",
    "sameAs": ["https://es.linkedin.com/in/pablo-santirso-perez"],
    "worksFor": { "@type": "Organization", "name": "DayByDay Consulting" },
    "knowsAbout": [
      "Paid Media",
      "Meta Ads",
      "Google Ads",
      "eCommerce D2C",
      "Estrategia de marketing",
      "Account management"
    ],
    "description": "Founder de DayByDay Consulting. Lidera paid media, estrategia y operaciones. Portfolio: Garett (expansión España + paid media), Cartri (website + ecommerce refresh), UFV Postgrado (paid media account management), La Vida Padel (social media), Arasnet/ArasLifePlus (rebranding + automation eCommerce, caso conjunto con Jorge)."
  },
  "member": [
    {
      "@type": "Person",
      "name": "Jorge González",
      "jobTitle": "Partner · CTO · Automations & Agentic AI",
      "url": "https://www.linkedin.com/in/jorge-gonz%C3%A1lez-p%C3%A9rez-4091541b6/",
      "sameAs": ["https://www.linkedin.com/in/jorge-gonz%C3%A1lez-p%C3%A9rez-4091541b6/"],
      "worksFor": { "@type": "Organization", "name": "DayByDay Consulting" },
      "knowsAbout": [
        "Agentic AI",
        "Automatización inteligente",
        "RPA UiPath",
        "Workato",
        "Power Platform",
        "Mendix",
        "Microsoft Azure",
        "Azure AI Foundry",
        "React Native",
        "Flutter",
        "Kotlin",
        "Swift",
        "React.js",
        "Next.js",
        "Node.js",
        "SQL",
        "Firebase"
      ],
      "description": "Partner y CTO de DayByDay Consulting. Lidera automation y soluciones tech ad-hoc para B2B y B2C. Track record enterprise: Total Energies, Puig, Robot Factory de Orange. Profesor universitario de tecnología."
    }
  ],
  "knowsAbout": [
    "Paid Media",
    "Meta Ads",
    "Google Ads",
    "Automatización inteligente",
    "Agentic AI",
    "RPA",
    "Soluciones ad-hoc B2B y B2C",
    "eCommerce D2C",
    "Growth Marketing",
    "Consultor Paid Media España",
    "Agencia Meta Ads España",
    "Automatización empresarial España"
  ],
  "sameAs": [
    "https://www.linkedin.com/company/daybyday-consulting",
    "https://es.linkedin.com/in/pablo-santirso-perez",
    "https://www.linkedin.com/in/jorge-gonz%C3%A1lez-p%C3%A9rez-4091541b6/"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://www.daybydayconsulting.com",
    "availableLanguage": "Spanish"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Paid Media para eCommerce D2C",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Paid Media Strategy para eCommerce D2C",
          "url": "https://www.daybydayconsulting.com/servicios/paid-media"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Automatización de Marketing con IA",
          "url": "https://www.daybydayconsulting.com/servicios/automatizacion"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Gestión de Meta Ads para eCommerce",
          "url": "https://www.daybydayconsulting.com/servicios/meta-ads"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Captación de Clientes con Paid Media",
          "url": "https://www.daybydayconsulting.com/servicios/captacion-clientes"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Marketing para eCommerce D2C",
          "url": "https://www.daybydayconsulting.com/servicios/ecommerce"
        }
      }
    ]
  }
};

const homepageFaqSchema = {
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es DayByDay Consulting y en qué se especializa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DayByDay Consulting fue fundada por Pablo Santirsó y opera como un partnership con Jorge González (CTO). Pablo lidera paid media, estrategia y operaciones; Jorge lidera automation y agentic AI. Atendemos paid media para eCommerce D2C en España y automatización tech ad-hoc para clientes B2B y B2C. El cliente trata siempre con los dos socios, sin account managers."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué diferencia a DayByDay de una agencia de marketing o de una consultora tech?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Donde otras agencias separan marketing y tecnología y obligan al cliente a coordinar dos proveedores, en DayByDay Pablo y Jorge operan como un solo equipo. Pablo escucha el problema y propone la solución de negocio sin sesgo técnico; Jorge la valida técnicamente y propone alternativas tech viables. Ninguno está limitado por el expertise del otro. Aplicamos todo ad-hoc, no playbooks."
      }
    },
    {
      "@type": "Question",
      "name": "¿Quién gestiona mi cuenta en DayByDay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los dos socios. Pablo Santirsó (founder) lidera la relación cliente, paid media y estrategia. Jorge González (CTO) lidera implementación tech, automation y agentic AI. Si tu necesidad es paid media D2C, Pablo es el lead y Jorge soporta con CAPI, atribución y dashboards. Si tu necesidad es automation B2B o B2C, Jorge es el lead y Pablo soporta con estrategia y operaciones. Nunca hay account managers ni perfiles junior en medio."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué resultados ha obtenido DayByDay con sus clientes en España?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Casos reales: Garett España (CPA 4,8€ con 14.936 clicks en Meta Ads), Evercreate × Universidad privada (253.679€ gestionados en paid media, CTR Google Ads 10,35%), Aras Life Plus (proceso de ventas 100% automatizado con Shopify + WhatsApp). Todos los resultados son medibles y se reportan semanalmente."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta contratar a DayByDay como consultor de paid media en España?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los servicios de gestión de paid media parten desde 800€/mes según el volumen de inversión y los canales activos. El presupuesto mínimo recomendado en Meta Ads es de 1.500€/mes. Reserva una llamada gratuita de 30 minutos para recibir una propuesta personalizada según tus objetivos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Con qué tipos de eCommerce trabaja DayByDay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trabajamos con marcas D2C (Direct-to-Consumer) en España con facturación entre 100K y 2M€ anuales. Sectores principales: moda y accesorios, salud y bienestar, hogar y lifestyle, electrónica de consumo. Nos especializamos en marcas que venden directamente al consumidor final, principalmente a través de Shopify."
      }
    }
  ]
};

const HomePage = ({ onNavScroll, openCalendly }) => {
  return (
    <>
      <SEOHead
        title="Consultor Paid Media para eCommerce D2C en España | Meta Ads y Google Ads"
        description="DayByDay: consultor especializado en paid media para eCommerce D2C en España. Meta Ads, Google Ads y automatización con IA. El consultor trabaja directamente contigo, sin intermediarios. Consulta gratuita."
        canonical="/"
        schema={{
          "@context": "https://schema.org",
          "@graph": [websiteSchema, organizationSchema, homepageFaqSchema],
        }}
      />
      <Inicio />
      <Sectores onAgendarClick={openCalendly} />
      <Nosotros onAgendarClick={openCalendly} />
      <Footer onAgendarClick={openCalendly} />
    </>
  );
};

export default HomePage;
