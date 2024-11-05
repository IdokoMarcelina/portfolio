import styled from "styled-components"


function Experience() {
  return (
    <>

    <Wrapper>
        <Container>
            <Left>
                <h1>MY EXPERIENCE</h1>

            </Left>
            <Right>
                
                <Title>

                <h4>Freelance Product-Manager</h4>
                <p>August 2022 - Present</p>

                </Title>
                <p>
                    •	Successfully defined a product strategy and roadmap for two-projects, Prepared a Product requirement document, coordinated stand-ups and weekly scrum meetings, prepared a project timeline, worked closely with front-end , back-end developers, product designers, content creators and graphics designers for the success of the project.
                        <br /><br />
                    •	Organized Virtual events and lead a team as the Woman in tech lead and welfare lead in Google student development club Lagos state polytechnic

                </p>
                <Title>

                <h4>Huawei Student-Ambassador</h4>
                <p>Nov 2021 - Dec 2023</p>

                </Title>
                <p>
                •	Successfully coordinated over one thousand students of Lagos state polytechnic students for ICT-Competition as Huawei student ambassador
                <br /><br />
                •	Organized seminars and ICT events for Lagos state polytechnic students.


                </p>


            </Right>
        </Container>
    </Wrapper>
    </>
  )
}

export default Experience


const Wrapper = styled.div`
  
  max-width: 85%;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;

  @media(max-width:800px){
    margin-top: 20px;
  }
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
  margin-top: 200px;

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

    button{
        width: 120px;
        height: 35px;
        background-color: #222222;
        border: 1px solid #222222;
        border-radius: 10px;
        color: white;
        
    }
`

const Title = styled.div`
    

`