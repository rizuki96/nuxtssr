export default function ({ $axios, $auth }) {
  $axios.onError(async ({ config, response: { status } }) => {
    // Only intercept requests with status 401
    // Don't intercept refresh token requests
    // And check if user is logged in and tokens are available
    if (status !== 401 || config.url === $auth.strategy.options.endpoints.refresh.url || !$auth.check()) {
      return Promise.reject(error)
    }

    $auth.setUser(false)

    // Refresh tokens before retrying current request
    await $auth.refreshTokens().catch((error) => {
      // Tokens couldn't be refreshed. Force reset.
      $auth.reset()
      throw error
    })

    // Set `isRetryRequest` flag to true
    config.__isRetryRequest = true

    // Update Authorization header
    config.headers[$auth.strategy.options.token.name] = $auth.token.get()

    // Retry original request
    return $axios.request(config)
  })

  // $auth.onRedirect((to, from) => {
  //   console.error(to, from)
  //   // you can optionally change `to` by returning a new value
  //   if ($auth.loggedIn) {
  //     console.error('/auth/login', from)
  //   }
  // })
}
