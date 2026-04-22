<template>
  <UiHeroCommand icon="hub">
    <template #title>
      IDENTITY_GATE:<br>
      <span class="bg-primary px-2 text-background">[ RLienard ]</span><br>
      ACCESS_REQUEST
    </template>

    <template #description>
      Cette page sert de point d’entrée pour les personnes qui souhaitent consulter mon CV détaille.
      Le lien n’est pas public et est partagé uniquement après validation.
    </template>

    <template #actions>
      <UiButton href="mailto:contact@chatondearu.fr?subject=Demande%20d%27acc%C3%A8s%20au%20CV&body=Bonjour%2C%0A%0AJe%20souhaite%20demander%20l%27acc%C3%A8s%20au%20CV.%0A%0APr%C3%A9nom%20Nom%20%3A%0ASoci%C3%A9t%C3%A9%20%3A%0AContexte%20de%20la%20demande%20%3A%0A%0AMerci.">
        REQUEST_CV_ACCESS
      </UiButton>
      <UiButton
        variant="secondary"
        to="/contact"
      >
        OPEN_CONTACT_CHANNEL
      </UiButton>
    </template>
  </UiHeroCommand>
</template>
