import { createContext } from 'react'

type AuthContextState = (
  | { loggedIn: true; username: string }
  | { loggedIn: false }
) & { refetch: () => void }

const AuthContext = createContext<AuthContextState>({
  loggedIn: false,
  refetch: () => {},
})

export default AuthContext
