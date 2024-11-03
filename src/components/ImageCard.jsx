import Marcelina from '../assets/images/marcelina.png'
import styled from 'styled-components'

function ImageCard() {
  return (
    <>
     <Wrapper>
        <Container>
            <img src={Marcelina} alt="" />
        </Container>
     </Wrapper>
    </>
  )
}

export default ImageCard


const Wrapper = styled.div``
const Container = styled.div`


height: 500px;
display: flex;
justify-content: center;
align-items: center;
img{
    width: 400px;
}

@media(max-width: 800px){
    width: 100%;
}

`