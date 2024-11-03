import styled from "styled-components"

function Cards(props) {
  return (
    <>

        <div className="main">
            <div className={`left ${props.mainLeft}`}>
            <img src={props.image} alt="" />
            </div>


            <div className="right">
            <h2>{props.title}</h2>
            <p>{props.text}</p>

            
            <h5>{props.info}</h5>

            <hr />
            
            <div className="projectYear">
            <span>{props.year}</span>
            <p>{props.date1}</p>
            </div>

            <hr />

            <div className="projectRole">
            <span>{props.role}</span>
            <p>{props.date2}</p>
            </div>

            <hr />

           <div className="cardbutton">
           <a>{props.liveDemo}</a>
           <a>{props.github}</a>
           </div>

           <hr />

            </div>
        </div>
    </>
  )
}

export default Cards


