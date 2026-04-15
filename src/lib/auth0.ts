const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const audience = import.meta.env.VITE_AUTH0_AUDIENCE
const appUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173'

function buildAuth0Url(screenHint?: 'signup') {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: appUrl,
    audience,
    scope: 'openid profile email',
  })
  if (screenHint) params.set('screen_hint', screenHint)
  return `https://${domain}/authorize?${params.toString()}`
}

export const auth0LoginUrl = buildAuth0Url()
export const auth0SignupUrl = buildAuth0Url('signup')
