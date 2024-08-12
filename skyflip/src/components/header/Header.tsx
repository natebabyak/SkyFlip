import { NavLink } from "react-router-dom"

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/bazaar">Bazaar</NavLink>
      </nav>
    </header>
  )
}