import styled from 'styled-components'
import {Link} from 'react-router-dom'

function Header() {
  return (
   <>
    <Nav>
        <Name>MARCELINA IDOKO</Name>
        <RightContainer>
            <Link to='/'>
                <nav>Home</nav>
            </Link>
            <Link to='/aboutpage'>
                <nav>About</nav>
            </Link>
           <Link to='/contact'>
                <nav>Contact</nav>
           </Link>
        </RightContainer>
    </Nav>
   </>
  )
}

export default Header

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    margin: 0px 40px;
    list-style: none;

    nav{
        color: white; 
        text-decoration: none;
        padding: 10px;
    }


    
`

const Name = styled.div`
  
`

const RightContainer = styled.div`
    display: flex;
    gap: 2rem;

`