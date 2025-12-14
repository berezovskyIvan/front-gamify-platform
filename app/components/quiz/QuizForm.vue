<template>
  <form class="quiz-form" @submit.prevent>
    <ui-input v-model="form.title" class="quiz-form__input" placeholder="Заголовок" />
    <ui-input v-model="form.description" class="quiz-form__input" placeholder="Описание" />
    <ui-input v-model="form.shortDescription" class="quiz-form__input" placeholder="Описание для виджета" />
    <ui-input v-model="form.bgColor" class="quiz-form__input" placeholder="Основной градиент" />
    <ui-input v-model="form.bannerBgColor" class="quiz-form__input" placeholder="Градиент виджета" />
    <ui-file-input v-model="form.image" button-text="Выбрать главное изображение" class="quiz-form__input quiz-form__file-input" />
    <ui-file-input v-model="form.widgetImage" button-text="Выбрать изображение виджета" class="quiz-form__input quiz-form__file-input" />
    
    <h4 class="quiz-form__tasks-title">Задания</h4>

    <template v-if="tasksForm">
      <div
        class="quiz-form__task-row"
        v-for="(task, index) in tasksForm"
        :key="index"
      >
        <ui-input
          :placeholder="`Заголовок задания №${index + 1}`"
          v-model="task.title!"
        />
        <ui-input
          :placeholder="`Описание задания №${index + 1}`"
          v-model="task.description!"
        />
        <ui-input
          :placeholder="`Url задания №${index + 1}`"
          v-model="task.url!"
        />
        
        <ui-button
          class="quiz-form__btn quiz-form__btn_danger"
          :disabled="isLoading"
          @click="deleteTask(index)"
        >
          Удалить
        </ui-button>
      </div>
    </template>

    <ui-button class="quiz-form__btn quiz-form__btn_gray" @click="addTask">Добавить задание</ui-button>

    <div class="quiz-form__actions">
      <ui-button type="submit" class="quiz-form__btn quiz-form__btn" :disabled="isLoading" @click="onSubmit">{{ btnText }}</ui-button>
      <ui-button class="quiz-form__btn quiz-form__btn_gray" :disabled="isLoading" @click="$emit('close-form')">Вернуться</ui-button>
    </div>

    <span v-if="error" class="quiz-form__error">
      {{ error }}
    </span>
  </form>
</template>

<script lang="ts" setup>
import type {
  ApiCreateQuizPayload,
  ApiCreateTaskPayload,
  ApiQuizListItemResponse, ApiTaskListItemResponse,
  ApiTaskListResponse, ApiUpdateTaskPayload,
} from '#shared/api/quiz/types';

const props = defineProps<{
  quiz: ApiQuizListItemResponse | undefined;
  tasks?: ApiTaskListResponse['items'] | undefined;
}>();

onMounted(() => {
  if (props.quiz) {
    form.value = { ...props.quiz };
    isEditing.value = true;
    
    if (props.tasks) {
      tasksForm.value = JSON.parse(JSON.stringify(props.tasks));
    }
  }
});

const form = ref<ApiCreateQuizPayload>({
  bgColor: '', // HEX
  bannerBgColor: '', // HEX
  description: '',
  image: '', // base64
  widgetImage: '', // base64
  shortDescription: '',
  title: '',
});

const tasksForm = ref<(ApiTaskListItemResponse | ApiCreateTaskPayload | ApiUpdateTaskPayload)[] | undefined>(undefined);

const quizStore = useQuizStore();

const isLoading = ref<boolean>(false);
const isEditing = ref<boolean>(false);
const error = ref<string>('');

const btnText = computed(() => (isEditing.value ? 'Сохранить' : 'Создать'));

async function onSubmit() {
  try {
    isLoading.value = true;
    error.value = '';

    const isValid = Object.values(form.value).every(Boolean);

    if (isValid) {
      const method = isEditing.value
        ? quizStore.updateQuiz(props.quiz?.entityId || 0, form.value)
        : quizStore.createQuiz(form.value);

      const res = await method;

      if (tasksForm.value && tasksForm.value?.some(task => !task.quizId)) {
        tasksForm.value = tasksForm.value.map(task => {
          if (!task.quizId) {
            return {
              ...task,
              quizId: res.entityId,
            };
          }
          return task;
        });
      }
      
      if (tasksForm.value) {
        const taskPromises = getTaskPromises();

        await Promise.all([...taskPromises]).then(() => {});
      }
      
      emit('close-form');
    } else {
      error.value = 'Не все поля формы заполнены';
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message;
    }
  } finally {
    isLoading.value = false;
  }
}

const getTaskPromises = () => {
  const promises: Array<Promise<unknown>> = [];
  
  props.tasks?.forEach((task) => {
    const index = tasksForm.value?.findIndex(formTask => {
      if ('entityId' in formTask) {
        return formTask.entityId === task.entityId;
      }
    });

    if (index === -1) {
      promises.push(quizStore.deleteTask(task.entityId));
    } else if (index !== undefined && index >= 0) {
      const formTask = tasksForm.value?.[index];
      console.log(formTask);
      if (formTask &&
          (formTask.url !== task.url || formTask.title !== task.title || formTask.description !== task.description)) {
        console.log('here');
        promises.push(quizStore.updateTask(task.entityId, formTask));
      }
    }
  });

  tasksForm.value?.forEach((task) => {
    if (!('entityId' in task) && task.extId && task.quizId && task.title && task.description && task.url) {
      promises.push(quizStore.createTask({
        extId: task.extId,
        quizId: task.quizId,
        title: task.title,
        description: task.description,
        url: task.url,
      }));
    }
  });
  
  return promises;
};

const addTask = () => {
  const task: ApiCreateTaskPayload | ApiUpdateTaskPayload = {
    description: '',
    title: '',
    url: '',
    quizId: props.quiz?.entityId,
    extId: `task-00${(tasksForm.value?.length || 0) + 1}`,
  };

  if (tasksForm.value) {
    tasksForm.value.push(task);
  } else {
    tasksForm.value = [task];
  }
};

const deleteTask = (index: number) => {
  tasksForm.value?.splice(index, 1);
};

const emit = defineEmits<{
  (event: 'close-form'): void;
}>();
</script>

<style lang="scss" scoped>
.quiz-form {
  width: 720px;
  padding: 24px;
  background-color: $white;
  border-radius: 15px;

  &__input {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  &__file-input {
    :deep {
      .ui-button {
        cursor: pointer;
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 36px;
  }

  &__error {
    @include body-h4;

    margin-top: 8px;
    color: $color--accent-danger;
  }

  &__btn {
    cursor: pointer;

    &_danger {
      background-color: $color--accent-danger;
    }

    &_gray {
      background-color: $gray-800;
      color: $black;
    }
  }

  &__tasks-title {
    margin-bottom: 8px;
  }

  &__task-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 0.5fr;
    gap: 8px;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>
