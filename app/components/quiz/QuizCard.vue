<template>
  <div class="quiz-card">
    <div class="quiz-card__actions">
      <ui-button class="quiz-card__delete" @click="onDelete">Удалить</ui-button>
      <ui-button class="quiz-card__change" @click="onChange">Изменить</ui-button>
    </div>
    <div class="quiz-card__row">
      <span class="quiz-card__label">Заголовок:</span>
      <span class="quiz-card__value">{{ quiz.title }}</span>
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__label">Описание:</span>
      <span class="quiz-card__value">{{ quiz.description }}</span>
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__label">Короткое описание:</span>
      <span class="quiz-card__value">{{ quiz.shortDescription }}</span>
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__label">Основной градиент:</span>
      <span class="quiz-card__value">{{ quiz.bgColor }}</span>
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__label">Градиент баннера:</span>
      <span class="quiz-card__value">{{ quiz.bannerBgColor }}</span>
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__label">Основное изображение:</span>
      <img :alt="quiz.title" :src="quiz.image" class="quiz-card__img" />
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__label">Изображение баннера:</span>
      <img :alt="quiz.title" :src="quiz.widgetImage" class="quiz-card__img" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ApiQuizListItemResponse } from '#shared/api/quiz/types';

const props = defineProps<{
  quiz: ApiQuizListItemResponse;
}>();

const quizStore = useQuizStore();

async function onDelete() {
  await quizStore.deleteQuiz(props.quiz.entityId);
}

function onChange() {
  emit('click:change');
}

const emit = defineEmits<{
  (event: 'click:change'): void;
}>();
</script>

<style lang="scss" scoped>
$img-size: 96px;

.quiz-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: left;
  border: 1px solid $gray-400;
  padding: 12px;
  border-radius: 12px;
  width: 100%;

  &__actions {
    position: absolute;
    right: 12px;
    bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
  }

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  &__label {
    width: 200px;
    margin-right: 8px;
    color: $gray-600;
  }

  &__value {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 576px;
  }

  &__img {
    max-width: $img-size;
    max-height: $img-size;
  }

  &__delete {
    background-color: red;
  }
}
</style>
