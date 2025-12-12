import type { ApiQuizResponse, ApiUpdateQuizPayload } from '#shared/api/quiz/types';

import { $apiBaseInternal } from '../../utils/api';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody<ApiUpdateQuizPayload>(event);

  return await $apiBaseInternal<ApiQuizResponse>(`/v1/quiz/${id}`, { method: 'PATCH', body });
});
