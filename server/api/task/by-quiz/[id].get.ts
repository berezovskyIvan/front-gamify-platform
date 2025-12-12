import type { ApiQuizResponse } from '#shared/api/quiz/types';

import { HttpStatus } from 'business-modules/systemic/enums';

import { $apiBaseInternal } from '~~/server/utils/api';

export default defineEventHandler(async (event) => {
    const quizId = getRouterParam(event, 'id');

    if (!quizId) {
        throw createError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Quiz Id is required',
        });
    }

    try {
        return await $apiBaseInternal<ApiQuizResponse>(`/v1/by-quiz/task/${quizId}`);
    } catch {
        throw createError({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Failed to fetch task',
        });
    }
});
