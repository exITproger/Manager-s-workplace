export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie<string | null>('token')

  if (!token.value && to.path !== '/') {
    return navigateTo('/')
  }

  if (token.value && to.path === '/') {
    return navigateTo('/dashboard')
  }
})
