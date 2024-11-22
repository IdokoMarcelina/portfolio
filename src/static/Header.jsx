import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

function Header() {
    
        const [toggle, setToggle] = useState(false)
        const action =()=>{
            setToggle(!toggle)
        }
    
  return (
   <>
    <Nav>
        <Name className='name'> IDOKO MARCELINA</Name>
        <RightContainer className='RightContainer'>
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
        <Ham className='ham' onClick={action}><GiHamburgerMenu /></Ham>
    </Nav>

    {toggle === false? null : <Sidebar toggle={toggle} setToggle={setToggle}/>}
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

    @media(max-width: 800px){
       .RightContainer{
        display: none;
       }

       .name{
        width: 50px;
        font-size: 10px;
       }
    }

    nav{
        color: white; 
        text-decoration: none;
        padding: 10px;
    }

    @media(max-width: 800px){
       
    }
    
`
const Ham = styled.div`
    font-size: 20px;
    display: none;

    @media(max-width: 800px){
        display: block;
    }
`
const Name = styled.div`
  
`

const RightContainer = styled.div`
    display: flex;
    gap: 2rem;

`