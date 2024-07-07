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

export const UpdateProfile = (body: any) => {
  const endpoint = `/profile`

  return callApi(endpoint, 'PATCH', body)
}

export const UploadAvatar = (body: any) => {
  const endpoint = `/media/upload`

  return callApi(endpoint, 'POST', body)
}

export const ResetPassword = (body: any) => {
  const endpoint = `/profile/change-password`

  return callApi(endpoint, 'PATCH', body)
}

export const UpdatePassword = (body: any) => {
  const endpoint = `/profile/reset-password`

  return callApi(endpoint, 'PATCH', body)
}
