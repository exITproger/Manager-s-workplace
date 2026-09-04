export default defineNuxtRouteMiddleware((to) => {
  const token = tokenCookie()

  if (!token.value && to.path !== '/') {
    return navigateTo('/')
  }

  if (token.value && to.path === '/') {
    return navigateTo('/dashboard')
  }
})
