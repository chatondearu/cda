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
      url: 'https://www.linkedin.com/in/',
    },
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/',
    },
    {
      id: 'stackoverflow',
      label: 'Stack Overflow',
      url: 'https://stackoverflow.com/users/',
    },
  ]

  return { profileLinks }
}
