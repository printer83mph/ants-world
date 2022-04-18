import axios from 'axios'

const AUTH_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`

export const login = (credentials: { username: string; password: string }) =>
  axios.post(`${AUTH_URL}/login`, credentials).then((res) => res.data)

export const signup = (credentials: { username: string; password: string }) =>
  axios.post(`${AUTH_URL}/signup`, credentials).then((res) => res.data)

export const logout = () =>
  axios.post(`${AUTH_URL}/logout`).then((res) => res.data)

export const getMe = () => axios.get(`${AUTH_URL}/me`).then((res) => res.data)
