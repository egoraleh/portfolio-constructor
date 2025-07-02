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

<style scoped>
.instruction-container {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}

.instruction-container__info {
  background: floralwhite;
  text-align: center;
  max-width: 70%;
  padding: 20px;
  border-radius: 20px;
  font-style: italic;
  font-weight: bold;
  font-size: 25px;
  line-height: 1.5;
  margin: 0 auto;
}

.instruction-container__image {
  width: 50px;
  transition: filter 0.3s ease, transform 0.3s ease;
  position: absolute;
  left: 15px;
  top: 15px;
}

.instruction-container__link:hover .instruction-container__image {
  filter: brightness(0) saturate(100%) invert(40%) sepia(70%) saturate(800%) hue-rotate(-10deg);
  transform: scale(1.1);
}
</style>