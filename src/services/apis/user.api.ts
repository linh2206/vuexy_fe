import callApi from '@core/call-api'

export const SignUp = (body: any) => {
  const endpoint = `/auth/sign-up`

  return callApi(endpoint, 'POST', body)
}

export const SignIn = (body: any) => {
  const endpoint = `/auth/login`

  return callApi(endpoint, 'POST', body)
}

export const LogOut = () => {
  const endpoint = `/auth/logout`

  return callApi(endpoint, 'POST', null)
}
