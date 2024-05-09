import PropTypes from "prop-types";

const HangmanWord = ({ reveal, guessedLetters, wordToGuess }) => {
    HangmanWord.propTypes = {
        reveal: PropTypes.bool,
        guessedLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
        wordToGuess: PropTypes.string.isRequired

    }

    HangmanWord.defaultProps = {
        reveal: false
    }

    return (
    <div style = {{ 
        display: "flex", 
        gap: ".25em", 
        fontSize: "6rem", 
        fontWeight: "bold", 
        textTransform: "uppercase", 
        fontFamily: "monospace",
    }}
    >
        {/*Dynamically gets the word to guess*/}
        {wordToGuess.split("").map((letter, index) => (
            <span style = {{ borderBottom: ".1em solid black"}} key = {index}>
                <span
                style = {{
                    visibility: guessedLetters.includes(letter) || reveal
                    ? "visible"
                    : "hidden",

                    // If we are revealing the word, and we did not guess this letter correctly, make the letter red
                    color: !guessedLetters.includes(letter) && reveal 
                    ? "red" 
                    : "black"
                }}
                >
                    {letter}
                </span>
            </span>
        ))}

    </div>
    )
};

export default HangmanWord;