import { useEffect, useState } from 'react'

const useLiveData = <T>(callback: (data: T) => any) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    console.log('live data hook')
    const ws = new WebSocket(`${import.meta.env.VITE_BACKEND_WS}/table`)

    ws.addEventListener('message', (msg) => {
      callback(JSON.parse(msg.data))
      if (loading) setLoading(false)
    })

    return () => {
      ws.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback])

  return { loading }
}

export default useLiveData
