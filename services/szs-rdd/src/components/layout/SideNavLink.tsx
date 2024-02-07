import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'

export interface props {
  name: string
  to: string
}

function SideNavLink({ name, to }: props) {
  return (
    <NavLinkBoxStyled>
      <NavLink to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
        {name}
      </NavLink>
    </NavLinkBoxStyled>
  )
}

export default SideNavLink

const NavLinkBoxStyled = styled.div`
  & a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    white-space: pre;
    padding: 0.5rem;
    color: inherit;
    text-decoration: none;
  }
  & a:hover {
    background: #e3e3e3;
  }
  & a.active {
    background: hsl(224, 98%, 58%);
    color: white;
  }
`
