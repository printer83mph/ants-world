import axios from 'axios'

const fetcher = (url: string) =>
  axios.get(`${import.meta.env.VITE_BACKEND_URL}${url}`).then((res) => res.data)

export default fetcher
