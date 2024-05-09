import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel';
import Wordle from './../../assets/wordle.png'
import Ultimate_Tic_Tac_Toe from './../../assets/Ultimate_Tic_Tac_Toe.png'
import Minesweeper from './../../assets/minesweeper.png'
import Hangman from './../../assets/hangman.png'
import './carousel-styles.scss';


export default function Carouselpage() {
    return (
        <Carousel infiniteLoop={true} autoPlay={true} interval={4000} showStatus={false} showThumbs={false}>
            {/* Div for Ultimate Tic-Tac-Toe */}
            <a href='/UltimateTicTacToe' className="button-style">
                <div>
                    <img src={Ultimate_Tic_Tac_Toe} alt="Ultimate Tic-Tac-Toe" style={{height: 350, width: 350}}/>
                    <h2>Ultimate Tic-Tac-Toe</h2>
                </div>
            </a>
            {/* Div for Minesweeper */}
            <a href='/Minesweeper' className="button-style">
                <div>
                    <img src={Minesweeper} alt="Minesweeper" style={{height: 350, width: 350}}/>
                    <h2>Minesweeper</h2>
                </div>
            </a>
            {/* Div for Hangman */}
            <a href='/HangMan' className="button-style">
            <div>
                    <img src={Hangman} alt="Hangman" style={{height: 350, width: 350}}/>
                    <h2>Hangman</h2>
            </div>
            </a>
        </Carousel>
    )
    
}
