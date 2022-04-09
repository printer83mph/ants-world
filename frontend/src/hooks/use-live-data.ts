import { useEffect } from 'react'

const useLiveData = <T>(callback: (data: T) => any) => {
  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.host}/api/table`)

    ws.addEventListener('message', (msg) => {
      callback(JSON.parse(msg.data))
    })

    return () => {
      ws.close()
    }
  }, [callback])
}

export default useLiveData
