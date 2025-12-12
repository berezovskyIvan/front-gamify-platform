import type { ApiCreateQuizPayload, ApiQuizResponse } from '#shared/api/quiz/types';

import { HttpStatus } from 'business-modules/systemic/enums';

import { $apiBaseInternal } from '../../utils/api';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<ApiCreateQuizPayload>(event);

    return await $apiBaseInternal<ApiQuizResponse>('/v1/quiz', { method: 'POST', body });
  } catch {
    throw createError({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Failed to create quiz',
    });
  }
});
