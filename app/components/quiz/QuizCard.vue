<template>
  <div class="quiz-card">
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

    <div v-for="(task, index) in tasks" :key="task.quizId" class="quiz-card__task">
      <span class="quiz-card__task-number">{{ `Задание №${index + 1}` }}</span>
      <div class="quiz-card__row">
        <span class="quiz-card__label">Заголовок:</span>
        <span class="quiz-card__value">{{ task.title }}</span>
      </div>
      <div class="quiz-card__row">
        <span class="quiz-card__label">Описание:</span>
        <span class="quiz-card__value">{{ task.description }}</span>
      </div>
      <div class="quiz-card__row">
        <span class="quiz-card__label">Url:</span>
        <span class="quiz-card__value">{{ task.url }}</span>
      </div>
    </div>

    <div class="quiz-card__actions">
      <ui-button class="quiz-card__btn quiz-card__btn_delete" @click="onDelete">Удалить</ui-button>
      <ui-button class="quiz-card__btn quiz-card__btn_change" @click="onChange">Изменить</ui-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ApiQuizListItemResponse, ApiTaskListResponse } from '#shared/api/quiz/types';

const props = defineProps<{
  quiz: ApiQuizListItemResponse;
  tasks: ApiTaskListResponse['items'];
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
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 24px;
  width: 100%;
  background-color: $white;
  border-radius: 15px;
  transition: box-shadow 0.3s;
  gap: 8px;

  @media #{$media-to-sm} {
    padding: 16px;
  }

  &__actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
  }

  &__row {
    display: flex;
    align-items: center;
  }

  &__label {
    flex-shrink: 0;
    width: 170px;
    margin-right: 8px;
    color: $gray-600;

    @media #{$media-to-sm} {
      width: 115px;
      flex-shrink: 0;
    }
  }

  &__value {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__img {
    max-width: $img-size;
    max-height: $img-size;
  }

  &__btn {
    cursor: pointer;

    &_delete {
      background-color: $color--accent-danger;
    }

    &_change {
      background-color: $gray-800;
      color: $black;
    }
  }

  &__task {
    display: flex;
    flex-direction: column;

    &-number {
      margin-bottom: 8px;
    }
  }
}
</style>
