import { Link } from "react-router-dom";
import styled from "styled-components";

function Sidebar(toggle, setToggle) {

    const Action=()=>{
        setToggle(false)
    }
  return (
    <>
         <Nav>
        <RightContainer className='RightContainer'>
            <Link to='/' onClick={Action} >
                <nav>Home</nav>
            </Link>
            <Link to='/aboutpage' onClick={Action}>
                <nav>About</nav>
            </Link>
           <Link to='/contact' onClick={Action}>
                <nav>Contact</nav>
           </Link>
        </RightContainer>
    </Nav>
    </>
  )
}

export default Sidebar

const Nav = styled.div`
 background-color: black;
 height: 100vh;
    nav{
        text-decoration: none;
        color: white;
        background-color: black;
        margin: 40px;
        padding-top: 40px;
        font-size: 20px;

    }
`


const RightContainer = styled.div`
   
   background-color: black;
   color: white;
`