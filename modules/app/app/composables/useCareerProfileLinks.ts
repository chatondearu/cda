import type { CareerProfileLink } from '../utils/careerPdf'

/**
 * Professional outbound URLs for the unlisted career page only.
 * Replace placeholder URLs with your real profiles before sharing this page.
 */
export function useCareerProfileLinks(): { profileLinks: CareerProfileLink[] } {
  const profileLinks: CareerProfileLink[] = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/romalie/',
    },
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/chatondearu',
    },
    {
      id: 'website',
      label: 'Website',
      url: 'https://chatondearu.fr',
    },
  ]

  return { profileLinks }
}
