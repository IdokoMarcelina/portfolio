import styled from "styled-components"
import { GoArrowUpRight } from "react-icons/go";




function About() {
  return (
    <>
    <Wrapper>
    <Container>
    <Left>
    <h1>ABOUT ME</h1>
      
    </Left> 

    <Right>
      <h4>I am a Full-stack developer(MERN) based in Lagos .
          HND in COMPUTER SCIENCE
      </h4>
      <p> Passionate and inquisitive software developer 
        seeking an entry-level position in front-end. 
        Bringing extensive experience in HTML5, CSS3, 
        JavaScript ES7, TypeScript and ReactJS. Familiarity
         with Flutter and Dart programming language to build
          interactive Mobile User interface.  Experienced with 
          using Cisco packet tracer for simulations and managing
           product using product management tools such as Jira,trello, 
           Wireframes with Miro, Confluence. Eager to contribute strong technical
            skills and a passion for software development to a dynamic
             development team </p>
      <a href="https://www.linkedin.com/in/marcelinaidoko">More About Me On LinkedIn <GoArrowUpRight /></a>
      <a href="https://drive.google.com/file/d/1eohm14TnvHWJoCI1d3wZfsmlwt_GhZxq/view?usp=sharing">CV<GoArrowUpRight /></a>
    </Right>     
    </Container>
    </Wrapper>
    </>
  )
}

export default About

const Wrapper = styled.div`
  
  max-width: 85%;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;

  @media(max-width: 800px){
    margin-top: 2px;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;

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

h1{
  margin-top: 100px;
}
  
`
const Right = styled.div`



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