import type { ApiQuizResponse } from '#shared/api/quiz/types';

import { HttpStatus } from 'business-modules/systemic/enums';

import { $apiBaseInternal } from '../../utils/api';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Id is required',
        });
    }

    try {
        return await $apiBaseInternal<ApiQuizResponse>(`/v1/task/${id}`);
    } catch {
        throw createError({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Failed to fetch task',
        });
    }
});
