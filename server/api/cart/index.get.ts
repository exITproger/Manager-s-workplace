import {MOCK_TOKEN} from '../../utils/auth-mock'
import {MOCK_CART} from '../../utils/cart-mock'

export default defineEventHandler((event) => {
    const auth = getHeader(event, 'authorization')

    if (auth !== `Bearer ${MOCK_TOKEN}`) {
        throw createError({
            statusCode: 401,
            data: {errors: ['Не авторизован']}
        })
    }

    return MOCK_CART
})
