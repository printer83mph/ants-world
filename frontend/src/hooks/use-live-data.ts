import { useEffect, useState } from 'react'

const useLiveData = <T>(callback: (data: T) => any) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.host}/api/table`)

    ws.addEventListener('message', (msg) => {
      callback(JSON.parse(msg.data))
      if (loading) setLoading(false)
    })

    return () => {
      ws.close()
    }
  }, [callback, loading])

  return { loading }
}

export default useLiveData
