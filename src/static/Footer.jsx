import styled from "styled-components"
import { FaLinkedinIn } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <>

  <Wrapper>

      <Container>

          <Left>

              <h2>LET'S CONNECT</h2>
              <p>Say hello at idokomarcelinauregu@gmail.com</p>
              <p>For more info, here's my <a href="https://drive.google.com/file/d/1LbndPYmhciAqt6qbo72XLL6mTtq2bDSE/view?usp=drivesdk">resume</a></p>

              <Icons>

              <a href='https://www.linkedin.com/in/marcelinaidoko'>
                <FaLinkedinIn />
              </a>

              <a href='https://mobile.x.com/Marcelinaidoko'>
                <CiTwitter />
              </a>

              <a href='https://github.com/IdokoMarcelina'>
               <FaGithub />
              </a>
              <a href='https://www.instagram.com/the_lady_mimi?igsh=MW5ucWo0bGJjbGpwag=='>
              <FaInstagramSquare />
              </a>

              

              </Icons>
              <span>&copy; Marcelina idoko</span>
          </Left>

          <Right>

            <form action="https://formspree.io/f/mkgnjaww" method="POST">
              <label htmlFor="name">Name</label> <br />
              <input type="text" name="text" /> <br />

              <label htmlFor="email">Email</label> <br />
              <input type="email" name="email" /> <br />

              <label htmlFor="subject">Subject</label> <br />
              <input type="text"  name="subject"/> <br />
              <label  htmlFor="subject">Message</label> <br />
              <input className="message" name="message"  type="text" /> <br />

              <button type="submit">Submit</button>
            </form>

          </Right>
      </Container>

  </Wrapper>
      
    </>
  )
}

export default Footer

const Wrapper = styled.div`
  
  max-width: 85%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  padding: 0 10px;
`
const Container = styled.div`
  
display: flex;
justify-content: space-between;

@media(max-width: 800px){
  flex-wrap: wrap;
  display: block;
  align-items: center;
  justify-content: center;
}


`
const Left = styled.div`

p{
  color: gray;
}
a{
  color: #D3E978;
}
span{
  font-size: 10px;
  color: gray;

  @media(max-width: 800px){
    display: none;
  }
}
  

`
const Right = styled.div`
  
  input{
    background-color: #222222;
    color: white;
    border: 1px solid #222222;
    height: 30px;
    width: 300px;
    margin-bottom: 5px;
    border-radius: 7px;
  }

  label{
    color: gray;
  }

  .message{
    height: 70px;
  }

  button{
    background-color: #D3E978;
    border: 1px solid #D3E978;
    border-radius: 20px;
    width: 300px;
    height: 30px;
    margin-top: 20px;
  }

`
const Icons = styled.div`

display: flex;
gap: 2rem;
color: #D3E978;
font-size: 20px;
margin-bottom: 110px;


@media(max-width: 800px){
  margin-bottom: 50px;

  }

`