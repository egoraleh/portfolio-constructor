<template>
  <section class="instruction-container">
    <router-link
      class="instruction-container__link"
      to="/"
    >
      <img
        src="/src/assets/images/icons/back.png"
        class="instruction-container__image"
        alt="Назад"
      >
    </router-link>
    <p class="instruction-container__info">
      Это конструктор портфолио, на котором вы можете составить своё собственное портфолио. Добавляйте категорию,
      а потом можете добавить в эту категорию блоки с информацией, относящиеся к этой категории. Можете настроить стиль
      своего портфолио и перетаскивать блоки, как вам вздумается. Хорошего пользования!
    </p>
  </section>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
@use '@/assets/styles/instruction';
</style>