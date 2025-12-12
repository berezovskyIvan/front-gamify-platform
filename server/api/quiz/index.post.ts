import type { ApiQuizListResponse } from '#shared/api/quiz/types';

import { HttpStatus } from 'business-modules/systemic/enums';

import { $apiBaseInternal } from '../../utils/api';

export default defineEventHandler(async () => {
    try {
        return await $apiBaseInternal<ApiQuizListResponse>('/v1/quiz', { method: 'POST' });
    } catch {
        throw createError({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Failed to create quiz',
        });
    }
});
