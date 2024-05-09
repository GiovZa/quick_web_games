import { useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types";
import words from "./wordList.json"
import HangmanDrawing from "./HangmanDrawing"
import HangmanWord from "./HangmanWord"
import Keyboard from "./Keyboard"



const HangMan = () => {
    
    function getWord() {
        return words[Math.floor(Math.random() * words.length)]
    }

    const [wordToGuess, setWordToGuess] = useState((getWord))
    
    // Empty array of used letters
    const [guessedLetters, setGuessedLetters] = useState([])

    // The incorrect letters are all the letters that are not in the word that is to be guessed
    const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))


    const isLoser = incorrectLetters.length >= 6

    // If guessedLetter includes every single letter inside of wordToGuess, we have won
    const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

    // useCallback memoizes the function so React will keep the function in memory and reuse it
    // rather than creating a new function every time the component re-renders.
    // The memoized function will only change if one of the dependencies has changed since the last render
    const addGuessedLetter = useCallback((letter) => {
        if (typeof letter !== 'string') {
            console.error('key must be a string');
            return;
          }
        // If letter is already guessed, don't do anything
        if (guessedLetters.includes(letter) || isWinner || isLoser) return

        // If not, add the guessed letter to the already guessed letters
        setGuessedLetters(currentLetters => [...currentLetters, letter])
    
    }, [guessedLetters, isWinner, isLoser]) // Dependencies


    // Event listener for physical keyboard
    useEffect(() => {
        const handler = (e) => {
            if (!(e instanceof KeyboardEvent)) {
                console.error('event must be KeyboardEvent');
                return;
            }
            

            const key = e.key;
    
            // Ignore the pressed key if it is not A-Z
            if (!key.match(/^[a-z]$/i)) return; // Added 'i' for case-insensitive matching
    
            // Prevent what would have normally happened by pressing that key
            e.preventDefault();
            addGuessedLetter(key);
        };
    
        // Add the event listener when the component mounts
        document.addEventListener('keydown', handler);
    
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, [addGuessedLetter]);


    

    // Enter-key refresh event listener
    useEffect(() => {
        const handler = (e) => {
            if (!(e instanceof KeyboardEvent)) {
                console.error('event must be KeyboardEvent');
                return;
            }

            const key = e.key;
    
            if (key !== "Enter") return
            
            e.preventDefault()
            setGuessedLetters([])
            setWordToGuess(getWord())
        };
    
        // Add the event listener when the component mounts
        document.addEventListener('keydown', handler);
    
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, []);


    return (
         <div
            style = {{
                maxWidth: "800px",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                margin: "0 auto",
                alignItems: "center"
            }}
         >
            <div style={{ fontSize: "2rem", textAlign: "center" }}>
                {isWinner && "Winner! - Hit Enter or refresh page to try again"}
                {isLoser && "You Lose! - Hit Enter or refresh page to try again"}
            </div>
            <HangmanDrawing 
                numberOfGuesses = {incorrectLetters.length}
            />
            <HangmanWord 
                reveal = {isLoser} 
                guessedLetters = {guessedLetters}
                wordToGuess={wordToGuess}
            />
            <div style = {{ alignSelf: "stretch"}}>
                <Keyboard 
                    disabled = {isWinner || isLoser}
                    activeLetters = {guessedLetters.filter(letter => 
                        wordToGuess.includes(letter)
                    )}
                    inactiveLetters = {incorrectLetters}
                    addGuessedLetter = {addGuessedLetter}
                />
            </div>            

         </div>
    )


  };
  
  export default HangMan;