import axios from 'axios'

const COLLECTION_URL = `${import.meta.env.VITE_BACKEND_URL}/collection-api`

export const addToCollection = (antId: string) =>
  axios.post(`${COLLECTION_URL}/add`, { antId }).then((res) => res.data)

export const removeFromCollection = (antId: string) =>
  axios.post(`${COLLECTION_URL}/remove`, { antId }).then((res) => res.data)
