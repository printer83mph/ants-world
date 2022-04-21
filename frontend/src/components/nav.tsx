import toast from 'react-hot-toast'
import { Link, NavLink } from 'react-router-dom'

import { logout } from '../api/auth'
import useAuth from '../hooks/use-auth'
import { UserAddIcon, UserIcon } from '../res/icons'

const Nav = () => {
  const { loading, loggedIn, username, fetchAuth } = useAuth()

  const onLogout = async () => {
    try {
      await logout()
      await fetchAuth()
      toast.success('Logged out!')
    } catch (err) {
      toast.error('Something went wrong logging out.')
    }
  }

  return (
    <nav className="absolute top-6 z-10 w-screen">
      <div className="container h-12 mx-auto flex flex-row items-center justify-between drop-shadow text-xl">
        <div>
          <NavLink
            to="/"
            className="p-3 mr-1 opacity-40 hover:opacity-90 duration-75"
          >
            Table
          </NavLink>
          <NavLink
            to={loggedIn ? '/collection' : '/login'}
            className="p-3 opacity-40 hover:opacity-90 duration-75"
          >
            Collection
          </NavLink>
        </div>
        <div>
          {loading ||
            (loggedIn ? (
              <button
                type="button"
                onClick={onLogout}
                className="p-3 opacity-40 hover:opacity-90 duration-75 flex flex-row items-center gap-2"
              >
                <UserIcon />
                {username}
              </button>
            ) : (
              <Link
                to="/login"
                className="p-3 opacity-40 hover:opacity-90 duration-75 flex flex-row items-center gap-2"
              >
                Join
                <UserAddIcon />
              </Link>
            ))}
        </div>
      </div>
    </nav>
  )
}

export default Nav
