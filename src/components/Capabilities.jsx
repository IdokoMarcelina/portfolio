import styled from "styled-components"


function Capabilities() {
  return (
    <>

    <Wrapper>
        <Container>
            <Left>
                <h1>MY CAPABILITIES</h1>

            </Left>
            <Right>
                
                <p>Enjoy reading and Learning, Eager to add more skills. Presently used skills are:</p>
                <Buttons>
                <button>HTML</button>
                <button>CSS</button>
                <button>JAVA SCRIPT</button>
                <button>REACTJS</button>
                <button>TYPESCRIPT</button>
                <button>TAILWIND CSS</button>
                <button>STYLED COMPONENT</button>
                <button>FLUTTER</button>
                <button>DART</button>
                <button>GIT</button>
                <button>GITHUB</button>
                </Buttons>


            </Right>
        </Container>
    </Wrapper>
    </>
  )
}

export default Capabilities


const Wrapper = styled.div`
  
  max-width: 85%;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;


 
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;

  @media(max-width: 800px){
  flex-wrap: wrap;
  display: block;
  align-items: center;
  justify-content: center;


  p{
    width: 100%;
  }
}
`
const Left = styled.div`
    width: 30%;
h1{
  margin-top: 100px;

  @media(max-width:800px){
    margin-top: 0;
  }

}

@media(max-width:800px){
    width: 100%;
}
  
`
const Right = styled.div`
width: 50%;
@media(max-width:800px){
    width: 100%;
}


p{
  max-width: 700px;
  color: gray;
}
a{
  color: #D3E978;
  display: flex;
  align-items: center;
  
}
  
`

const Buttons = styled.div`
display: grid;
grid-template-columns: repeat(4,1fr);
align-items: center;
gap: 2rem;

@media(max-width: 800px){
grid-template-columns: repeat(2,1fr);

}

    button{
        width: 120px;
        height: 35px;
        background-color: #222222;
        border: 1px solid #222222;
        border-radius: 10px;
        color: #D3E978;
        
    }
`