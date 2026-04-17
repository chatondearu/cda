<script setup lang="ts">
useSeoMeta({
  description: '[description]',
  ogTitle: '[og:title]',
  ogDescription: '[og:description]',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
  twitterTitle: '[twitter:title]',
  twitterDescription: '[twitter:description]',
  twitterImage: '[twitter:image]',
  twitterCard: 'summary',
})

useHead({
  htmlAttrs: {
    lang: 'fr',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
})

const timelineItems = [
  {
    period: '2022 — AUJOURD\'HUI',
    title: 'LEAD FRONTEND/FULLSTACK DEVELOPER',
    reference: 'REF: FLUCTUO / CITYDIVE',
    description: 'Refonte complete de CityDive, modernisation du socle frontend, developpement de modules data pour cartes et graphiques, et implication directe dans les decisions produit strategiques.',
    tags: ['VUE 3', 'TYPESCRIPT', 'VITE', 'TAILWIND', 'MAPBOX', 'GRAPHQL'],
    layout: 'a',
  },
  {
    period: '2021 — 2022',
    title: 'SENIOR FRONTEND DEVELOPER',
    reference: 'REF: KARDINAL',
    description: 'Renforcement de l architecture frontend sur des flux cartographiques complexes et creation from scratch d un outil de gestion de milliers de POI.',
    tags: ['REACT', 'VUE', 'TYPESCRIPT', 'REST'],
    layout: 'b',
  },
  {
    period: '2020 — 2021',
    title: 'CTO / CONSULTANT',
    reference: 'REF: NEO MATIX LTD',
    description: 'Pilotage de projets clients, accompagnement d equipes frontend, et conseil en strategie produit et choix techniques des la phase d ideation.',
    tags: ['LEADERSHIP', 'CONSULTING', 'PRODUCT', 'FRONTEND'],
    layout: 'a',
  },
  {
    period: '2018 — 2020',
    title: 'LEAD FRONTEND DEVELOPER',
    reference: 'REF: SEIZE.TV',
    description: 'Construction complete de la plateforme sociale, architecture micro-service/lazy-loaded, developpement d un player HLS multi-flux, et management de l equipe frontend.',
    tags: ['VUE', 'HLS', 'PERFORMANCE', 'TEAM LEAD'],
    layout: 'b',
  },
  {
    period: '2015 — 2018',
    title: 'SENIOR APPLICATION DEVELOPER',
    reference: 'REF: DATADOG / LOGMATIC',
    description: 'Developpement frontend de l equipe Logs, integration d un frontend React from scratch et migration majeure Backbone vers Vue avec reduction importante des temps de chargement.',
    tags: ['REACT', 'VUE', 'MIGRATION', 'LOGS', 'PERF'],
    layout: 'a',
  },
  {
    period: '2012 — 2015',
    title: 'FULLSTACK WEB DEVELOPER',
    reference: 'REF: GOTO-GAMES / FUNBRIDGE',
    description: 'Developpement d outils internes, portage Javascript/HTML5 de Funbridge, creation d un plateau interactif navigateur, et contributions fullstack Symfony.',
    tags: ['JAVASCRIPT', 'HTML5', 'PHP', 'SYMFONY', 'ANGULARJS'],
    layout: 'b',
  },
  {
    period: '2010 — 2012',
    title: 'WEB & KIOSK TECH LEAD',
    reference: 'REF: KEYNEOSOFT',
    description: 'Referent web et bornes tactiles pour des clients grande distribution, encadrement d equipe, et realisation de solutions web, mobile et interactive complete.',
    tags: ['WEB', 'KIOSK', 'WPF', 'FLASH', 'TEAM LEAD'],
    layout: 'a',
  },
  {
    period: '2009 — 2010',
    title: 'EARLY CAREER TRACK',
    reference: 'REF: OKALIA / LE POINT COM / GITEM',
    description: 'Premieres experiences en developpement PHP, back-office Ajax, e-commerce et accompagnement operationnel autour des outils CRM et support client.',
    tags: ['PHP', 'MYSQL', 'JQUERY', 'CRM'],
    layout: 'b',
  },
] as const
</script>

<template>
  <div>
    <UiHeroCommand>
      <template #title>
        CAREER_LOG:<br>
        <span class="bg-primary px-2 text-background">[ 15+ YEARS ]</span><br>
        FULLSTACK_TIMELINE
      </template>

      <template #description>
        Parcours axe conception, architecture et execution produit, avec une dominante frontend de haut niveau (Vue/React/TypeScript), du leadership technique et une forte culture de l impact.
      </template>
    </UiHeroCommand>

    <UiTimeline :items="timelineItems" />
  </div>
</template>
