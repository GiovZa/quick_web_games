import PropTypes from "prop-types";
import styles from "./keyboard-styles.module.scss"
const KEYS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const Keyboard = ({ disabled, activeLetters, inactiveLetters, addGuessedLetter }) => {

    Keyboard.propTypes = {
        disabled: PropTypes.bool,
        activeLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
        inactiveLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
        addGuessedLetter: PropTypes.func.isRequired
    }

    Keyboard.defaultProps = {
        disabled: false
    }

    return (
        <div
            style = {{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
                gap: ".5rem"
            }}
        
        >
            {KEYS.map(key => {
                const isActive = activeLetters.includes(key)
                const isInactive = inactiveLetters.includes(key)
                return (
                <button 
                    /*When letter on game keyboard is clicked, add that to guessedLetters*/
                    onClick={() => addGuessedLetter(key)} 

                    //  Apply different styles dynamically based on the key's status.
                    className = {`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`}
                    
                    // Disables the button if it is either active or inactive to prevent the same letter from being guessed again.
                    disabled = {isInactive || isActive || disabled}

                    key={key}
                    >

                    {key}
                </button>
                )
            })}

        </div>


    )
};

export default Keyboard;