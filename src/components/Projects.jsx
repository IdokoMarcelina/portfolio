import styled from "styled-components"
import { MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import Cards from "./Cards"
import Flag from '../assets/images/flag.png'
import Form from '../assets/images/form.png'
import Todo from '../assets/images/todo.png'
import Kuda from '../assets/images/kuda.png'
import Product from '../assets/images/product.png'
import bcolar from '../assets/images/bcolar.png'

const Projects = () => {
  return (
    <>
   <Wrapper>
     
        <Head>
                <h2>FEATURED PROJECTS</h2>
                <p>Here are some of the selected 
                    projects that showcase my 
                    passion for front-end 
                    development.
                </p>
        </Head>

            <Pcontainer>
                <Cards 
                image={bcolar} 
                title="Bcolar App"
                text="Blue-Collar is an App that helps to connect artisans to people in need of ther services
                        using location.it is a Dynamic Platform for Artisans to Showcase their Skills 
                        and Connect with Clients.  "
                info="PROJECT INFO"
                year="Year"
                date1="2025"
                role="role"
                date2="Front-end and backend"
                liveDemo= 'https://frontendbcolar-pyxh.vercel.app/'
                github='https://github.com/IdokoMarcelina/frontendbcolar.git'
                
                />
                <Cards 
                image={Flag} 
                title="REST Countries API"
                text="Recreated the REST Countries Front-end mentor challenge, 
                        Delivered a fully responsive design that allows user to search for a 
                        country and filter region pulling data from the Rest API  "
                info="PROJECT INFO"
                year="Year"
                date1="2024"
                role="role"
                date2="Front-end Developer"
                liveDemo={<a href='https://flag-tan.vercel.app/'>LIVE DEMO <MdArrowOutward /></a>} 
                github={<a href='https://github.com/IdokoMarcelina/flag.git'>SEE ON GITHUB <FaGithub /></a>} 
                
                />
                <Cards 
                image={Todo} 
                title="Todo app"
                text="The classic todo app allows user to enter a task,
                      allowing user to save and delete task, marks completed task! 
                      This app includes a dropdown menu showing the
                      various stages of tasks.  "
                info="PROJECT INFO"
                year="Year"
                date1="2024"
                role="role"
                date2="Front-end Developer"
                liveDemo={<a href='https://to-do-list-app-eta-ruby.vercel.app/'>LIVE DEMO <MdArrowOutward /></a>} 
                github={<a href='https://github.com/IdokoMarcelina/To-do-list-app.git'>SEE ON GITHUB <FaGithub /></a>} 
                
                />
                <Cards 
                image={Form} 
                title="Form Validation"
                text="A simple Form validation 
                     that enhances user experience and ensures 
                     data integrity. Users can input data with 
                     specific fields requiring validation, including
                      email and Query-type. This validation prevents 
                      incomplete or incorrect data entry."
                info="PROJECT INFO"
                year="Year"
                date1="2024"
                role="role"
                date2="Front-end Developer"
                liveDemo={<a hre='https://form-validation-zeta-six.vercel.app/'>LIVE DEMO <MdArrowOutward /></a>} 
                github={<a href='https://github.com/IdokoMarcelina/form-validation.git'>SEE ON GITHUB <FaGithub /></a>} 
                
                />
                {/* <Cards 
                image={Kuda} 
                title="Kuda-App Clone"
                text="A Clone of Kuda-App showing ability to Route from
                     one page to the other, functional Sidebar and the use
                     of React props and components"
                info="PROJECT INFO"
                year="Year"
                date1="2024"
                role="role"
                date2="Front-end Developer"
                liveDemo={<a href='https://kuda-clone-jade.vercel.app/'>LIVE DEMO <MdArrowOutward /></a>} 
                github={<a href='https://github.com/IdokoMarcelina/kuda-clone.git'>SEE ON GITHUB <FaGithub /></a>} 
                
                /> */}
                <Cards 
                image={Product} 
                title="E-commerce Product Page"
                text="This is a Product page that allows user to add to cart or remove from cart.
                        This app shows the quantity of items in the cart,
                        number of items in the cart and total price of items 
                        in the cart"
                info="PROJECT INFO"
                year="Year"
                date1="2024"
                role="role"
                date2="Front-end Developer"
                liveDemo={<a href='https://productpage-rho.vercel.app/'>LIVE DEMO <MdArrowOutward /></a>} 
                github={<a href='https://github.com/IdokoMarcelina/productpage.git'>SEE ON GITHUB <FaGithub /></a>} 
                
                />
            </Pcontainer>
   </Wrapper>
    </>
  )
}

export default Projects


const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    padding: 0px 10px;
    max-width: 85%;

    

`

const Head = styled.div`

p{
    color: gray;
}
    

`

const Pcontainer = styled.div`



    .left{

        background-color: #222222;
        max-width: 700px;
        height: 300px;
        display: flex;
        align-items: center;
        padding: 20px;
        border-radius: 10px;

        img{
        width: 400px;
    }

    @media(max-width:800px){
        padding-left: 50px;
        padding-right: auto;
        width: 80%;
        padding-bottom: 0px;


        img{
            width: 90%;
        }
    }
    }

    .right{
        
    }
    

    .main{
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;

        hr{
            border: 1px solid #222222;
        }

        @media (max-width: 800px){
        flex-wrap: wrap;
        display: block;
        justify-content: center;
        align-items: center;
        img{
           max-width:100% ;
        

        }
    }
    }

    p{
        max-width: 500px;
        margin: 5px 0px;
        font-size: 15px;
        color: gray;
    }

    h5{
        margin-bottom: 5px;
    }

    .projectYear{
        display: flex;
        justify-content: space-between;
    }
    .projectRole{
        display: flex;
        justify-content: space-between;
    }

    .cardbutton{
        display: flex;
        gap: 1rem;
        

        a{
            background-color: transparent;
            color: #D3E978;
            font-size: 10px;
            text-decoration: none;
        }
    }

   
    
`
