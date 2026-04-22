import type { TimelineItem } from '../../../design-system-nuxt/app/composables/useSystemData'

/**
 * Public-facing timeline: ChatonDeAru creator / broadcast journey only.
 * Edit entries below with your real milestones (dates, platforms, highlights).
 */
export function useStreamerTimeline(): TimelineItem[] {
  const { locale } = useI18n()
  const lang = locale.value

  const map: Record<string, TimelineItem[]> = {
    fr: [
      {
        period: 'A RENSEIGNER — AUJOURD\'HUI',
        title: 'BROADCAST_STEADY_STATE',
        reference: 'REF: CHATONDEARU / LIVE_STACK',
        description: 'Rythme actuel des lives, formats recurrents et lien fort entre dev, tooling stream et communaute.',
        tags: ['OBS', 'INTERACTION', 'COMMUNITY'],
        layout: 'a',
      },
      {
        period: 'A RENSEIGNER',
        title: 'CHANNEL_INFRA_EXPANSION',
        reference: 'REF: OVERLAYS / BOT / ALERTS',
        description: 'Mise en place ou refonte des overlays, alertes, scenes et integrations chat qui structurent l experience stream.',
        tags: ['SCENES', 'API', 'UX'],
        layout: 'b',
      },
      {
        period: 'A RENSEIGNER',
        title: 'FIRST_PUBLIC_STREAMS',
        reference: 'REF: PLATFORM_ONBOARDING',
        description: 'Premiers pas en live public, apprentissage du rythme, de l audio/video et des dynamiques de communaute.',
        tags: ['DEBUT', 'LIVE'],
        layout: 'a',
      },
    ],
    en: [
      {
        period: 'TO DEFINE — TODAY',
        title: 'BROADCAST_STEADY_STATE',
        reference: 'REF: CHATONDEARU / LIVE_STACK',
        description: 'Current streaming cadence, recurring formats, and strong overlap between development, stream tooling, and community.',
        tags: ['OBS', 'INTERACTION', 'COMMUNITY'],
        layout: 'a',
      },
      {
        period: 'TO DEFINE',
        title: 'CHANNEL_INFRA_EXPANSION',
        reference: 'REF: OVERLAYS / BOT / ALERTS',
        description: 'Build or revamp overlays, alerts, scenes, and chat integrations that shape the stream experience.',
        tags: ['SCENES', 'API', 'UX'],
        layout: 'b',
      },
      {
        period: 'TO DEFINE',
        title: 'FIRST_PUBLIC_STREAMS',
        reference: 'REF: PLATFORM_ONBOARDING',
        description: 'First public streaming sessions, learning pacing, AV setup, and community dynamics.',
        tags: ['START', 'LIVE'],
        layout: 'a',
      },
    ],
  }

  return map[lang] ?? map.en ?? []
}
