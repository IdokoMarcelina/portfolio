import React from 'react'
import About from '../components/About'
import ImageCard from '../components/imageCard'
import Capabilities from '../components/Capabilities'
import Experience from '../components/Experience'
import styled from 'styled-components'

function AboutPage() {
  return (
    <>
    <About/>
    <ImageCard />

    <Capabilities />
                <Hr><hr /></Hr>

    <Experience />

                <Hr><hr /></Hr>

    </>
  )
}

export default AboutPage


const Hr  = styled.div`
  hr{
    border: 1px solid #222222;
  }
`