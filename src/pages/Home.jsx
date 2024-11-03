import Hero from "../components/Hero"
import Projects from "../components/Projects"
import About from "../components/About"

import styled from "styled-components"





function Home() {
  return (
    <>
      <Hero/>
      <Projects/>
                <Hr><hr /></Hr>
      <About/>
              <Hr><hr /></Hr>
    </>
  )
}

export default Home

const Hr  = styled.div`
  hr{
    border: 1px solid #222222;
  }
`