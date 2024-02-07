import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
})

export function isAuthenticated() {
  return keycloak.authenticated
}

export function init() {
  return keycloak.init({
    onLoad: 'login-required',
  })
}

export function getAccessToken() {
  return keycloak.token
}

export async function logout(redirectUri = '', callback = () => {}) {
  keycloak.onAuthLogout = () => callback()
  try {
    await keycloak.logout({
      redirectUri,
    })
  } catch (error) {
    throw error
  }
}

export function isTokenExpired() {
  return keycloak.isTokenExpired()
}

export async function updateToken(callback: Function) {
  keycloak.onAuthRefreshSuccess = () => callback()
  try {
    await keycloak.updateToken(-1)
  } catch (error) {
    throw error
  }
}

export function getToken() {
  return keycloak.token
}
// header 설정
// https://www.keycloak.org/docs/latest/securing_apps/index.html#using-the-adapter
/*
async function fetchUsers() {
    const response = await fetch('/api/users', {
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${keycloak.token}`
        }
    });

    return response.json();
}
*/

// API Reference
// https://www.keycloak.org/docs/latest/securing_apps/index.html#api-reference
