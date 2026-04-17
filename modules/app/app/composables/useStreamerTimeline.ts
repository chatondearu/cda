import type { TimelineItem } from '../../../design-system-nuxt/app/composables/useSystemData'

/**
 * Public-facing timeline: ChatonDeAru creator / broadcast journey only.
 * Edit entries below with your real milestones (dates, platforms, highlights).
 */
export function useStreamerTimeline(): TimelineItem[] {
  return [
    {
      period: 'À RENSEIGNER — AUJOURD\'HUI',
      title: 'BROADCAST_STEADY_STATE',
      reference: 'REF: CHATONDEARU / LIVE_STACK',
      description: 'Rythme actuel des lives, formats récurrents, et lien fort entre dev, tooling stream et communauté. Remplacez ce texte par vos faits marquants réels.',
      tags: ['OBS', 'INTERACTION', 'COMMUNITY'],
      layout: 'a',
    },
    {
      period: 'À RENSEIGNER',
      title: 'CHANNEL_INFRA_EXPANSION',
      reference: 'REF: OVERLAYS / BOT / ALERTS',
      description: 'Mise en place ou refonte des overlays, alertes, scènes, intégrations chat — tout ce qui structure l’expérience visuelle et technique du stream.',
      tags: ['SCENES', 'API', 'UX'],
      layout: 'b',
    },
    {
      period: 'À RENSEIGNER',
      title: 'FIRST_PUBLIC_STREAMS',
      reference: 'REF: PLATFORM_ONBOARDING',
      description: 'Premiers pas en live public, apprentissage du rythme, de l’audio/vidéo et des dynamiques de communauté.',
      tags: ['DEBUT', 'LIVE'],
      layout: 'a',
    },
  ]
}
