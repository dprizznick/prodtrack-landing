const appUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173/mdix/'

// Link directly to the MDIX app — the app's Auth0 SDK handles the full PKCE flow
export const auth0LoginUrl = `${appUrl}login?auth0=login`
export const auth0SignupUrl = `${appUrl}login?auth0=signup`
export const demoUrl = `${appUrl}?demo=true`
