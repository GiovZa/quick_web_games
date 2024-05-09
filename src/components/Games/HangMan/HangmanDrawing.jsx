import PropTypes from "prop-types";

const HEAD = (
    <div style ={{
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        border: "10px solid black",
        position: "absolute",
        top: "50px",
        right: "-20px"
    }} />
)

const BODY = (
    <div style ={{
        width: "10px",
        height: "100px",
        background:"black",
        position: "absolute",
        top: "100px",
        right: 0,
    }} />
)

const RIGHT_ARM = (
    <div style ={{
        width: "100px",
        height: "10px",
        background:"black",
        position: "absolute",
        top: "150px",
        right: "-100px",
        rotate: "-30deg",
        // rotation occurs on bottom left of the arm instead of the center
        transformOrigin: "left bottom",
    }} />
)

const LEFT_ARM = (
    <div style ={{
        width: "100px",
        height: "10px",
        background:"black",
        position: "absolute",
        top: "150px",
        right: "10px",
        rotate: "30deg",
        // rotation occurs on bottom left of the arm instead of the center
        transformOrigin: "right bottom",
    }} />
)

const RIGHT_LEG = (
    <div style ={{
        width: "100px",
        height: "10px",
        background:"black",
        position: "absolute",
        top: "190px",
        right: "-90px",
        rotate: "60deg",
        // rotation occurs on bottom left of the arm instead of the center
        transformOrigin: "left bottom",
    }} />
)

const LEFT_LEG = (
    <div style ={{
        width: "100px",
        height: "10px",
        background:"black",
        position: "absolute",
        top: "190px",
        right: 0,
        rotate: "-60deg",
        // rotation occurs on bottom left of the arm instead of the center
        transformOrigin: "right bottom",
    }} />
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

const HangmanDrawing = ({ numberOfGuesses } ) => {
    HangmanDrawing.propTypes = {
        numberOfGuesses: PropTypes.number.isRequired

    }
    
    return (
        // Container
        <div style= {{ position: "relative "}}>
            {/*Allows us to determine how many body parts are shown based on the number of guesses that are wrong*/}
            {BODY_PARTS.slice(0, numberOfGuesses)}

            <div 
                style = {{ 
                    height: "50px", 
                    width: "10px", 
                    background: "black",
                    position: "absolute",
                    top: 0,
                    right: 0,
                }} 
            />
            <div 
                style = {{ 
                    height: "10px", 
                    width: "200px", 
                    background: "black",
                    marginLeft: "120px"
                }} 
            />
            <div 
                style = {{ 
                    height: "400px", 
                    width: "10px", 
                    background: "black",
                    marginLeft: "120px"
                }} 
            />
            <div style = {{ height: "10px", width: "250px", background: "black"}}/>
        </div>
    )
  };
  
export default HangmanDrawing;