import styled from "styled-components"
import { FaLinkedinIn } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

function Footer() {
  return (
    <>

  <Wrapper>

      <Container>

          <Left>

              <h2>LET'S CONNECT</h2>
              <p>Say hello at idokomarcelinauregu@gmail.com</p>
              <p>For more info, here's my <a href="">resume</a></p>

              <Icons>
              <FaLinkedinIn />
              <CiTwitter />
              <FaGithub />
              <FaInstagramSquare />

              </Icons>
              <span>&copy; Marcelina idoko</span>
          </Left>

          <Right>

            <form action="">
              <label htmlFor="name">Name</label> <br />
              <input type="text" /> <br />

              <label htmlFor="email">Email</label> <br />
              <input type="email" /> <br />

              <label htmlFor="subject">Subject</label> <br />
              <input type="text" /> <br />
              <label  htmlFor="subject">Message</label> <br />
              <input className="message"   type="text" /> <br />

              <button>Submit</button>
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
}
  

`
const Right = styled.div`
  
  input{
    background-color: #222222;
    border: 1px solid #222222;
    height: 30px;
    width: 400px;
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
    width: 100px;
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

`