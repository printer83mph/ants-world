import { useEffect } from 'react'

const useLiveData = (callback: (data: any) => any) => {
  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.host}/api/table`)

    ws.addEventListener('message', (msg) => {
      callback(JSON.parse(msg.data))
    })

    return () => {
      ws.close()
    }
  }, [])
}

export default useLiveData
