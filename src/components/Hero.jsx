import styled from "styled-components"
import Frame3 from '../assets/icons/Frame3.png'
import Frame4 from '../assets/icons/Frame4.png'
import Marcelina from '../assets/images/marcelina.png'
import {Link} from 'react-router-dom';


const Hero = () => {
  return (
    <>
    
    <Wrapper>

    <Container>
        <HeroText>
            <h1>HI, I AM <br /> MARCELINA IDOKO.</h1>
            <p>A Lagos based front-end developer 
                passionate about building accessible 
                and user friendly websites.
            </p>


            <Buttons>
                <Link to='/contact'>
                    <button className="contact" >CONTACT ME
                        <div className="circle"></div> 
                    </button>
                </Link>
                
                <Link to='https://www.linkedin.com/in/marcelinaidoko'>
                    <button className="in"><img src={Frame4} alt="" /></button>
                </Link>

                <Link to='https://github.com/IdokoMarcelina'>
                    <button className="in"><img src={Frame3} alt="" /></button>
                </Link>
            </Buttons>
        </HeroText>

        <HeroImage>
            <img src={Marcelina} alt="" />
        </HeroImage>

        
     </Container>
     
    

    </Wrapper>

    <Hr><hr /></Hr>
    </>
  )
}

export default Hero


const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    padding: 0px 10px;
    max-width: 85%;
    min-height: calc(100vh -70px);
`
const Container = styled.div`
    
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    @media (max-width: 800px){
        flex-wrap: wrap;
        display: block;
        justify-content: center;
        align-items: center;
        img{
           max-width:100% ;
        

        }
    }


`
const HeroText = styled.div`
    padding-top: 100px;

    
    p{
        max-width: 380px;
        margin-bottom: 40px;
        
    }

    @media (max-width: 800px){
        max-width: 400px;
     
    }
 `

 const HeroImage = styled.div`

    img{
        width: 400px;
        
    }
    

`

const Buttons = styled.div`
display: flex;
align-items: center;
gap: 2rem;
        .contact{
            max-width: 140px;
            height: 45px;
            border: 1px solid #D3E978;
            border-radius: 15px;
            background-color: #D3E978;

            
        @media (max-width: 800px){
            
        }
        }

        img{
            background-color: #222222;
            border: 1px solid #222222;
            border-radius: 50%;
            width: 40px;
        }

        .in{
            background-color: #222222;
            border: 1px solid #222222;
            border-radius: 50%;
            

        }

    
`
const Hr = styled.div`
    hr{
        background-color: #222222;
        color: #222222;
        border: 1px solid #222222;
        margin-top: 50px;
    }
`