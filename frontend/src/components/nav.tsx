import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav className="absolute flex flex-col items-center top-0 w-screen">
    <div className="z-10 mt-4 drop-shadow text-xl">
      <NavLink
        to="/"
        className="p-3 mr-1 opacity-30 hover:opacity-90 duration-75"
      >
        Table
      </NavLink>
      <NavLink
        to="/collection"
        className="p-3 opacity-30 hover:opacity-90 duration-75"
      >
        Collection
      </NavLink>
    </div>
  </nav>
)

export default Nav
