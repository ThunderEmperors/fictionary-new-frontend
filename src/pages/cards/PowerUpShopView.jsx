import React, {useEffect, useState} from "react";
import "./PowerUpShopView.css";
import useContext from "../context/UserContext";  // Ensure UserContext is imported correctly
import { useNavigate } from "react-router-dom";
import ENDPOINTS from "../../utils/APIendpoints";

const PowerUpShopView = ({card, refreshUpdateState}) => {

    const [isClicked, setIsClicked] = useState(false);
    const [available, setAvailable] = useState(false);


    const navigate = useNavigate();
    const context = useContext();

    let checkAval = () => {
        setAvailable(card.aval_cards[card.index] === '1');
        console.log('CheckAval')
    }

    let handleAvalText = () => {
        if(available){
            return(
                <div>
                    This card is available
                </div>
            )
        } else {
            return(
                <div>
                    This card is not available
                </div>
            )
        }
    }

    let handleClick = () => {
        fetch(ENDPOINTS.CHANGE_CARD_STATUS, {
            method:"POST",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Token ${
                    context.token || localStorage.getItem("fictionary_token")
                }`,

            },
            body: JSON.stringify({index : card.index, coins: card.coins}),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log('button clicked');
                console.log(card.coins);
                refreshUpdateState();
            })
        setIsClicked(!isClicked);
    }

    useEffect(checkAval, [card, isClicked]);

    if(!available){
        return (
            <div className="CardDetailView" onClick={handleClick}>
                <div className="CardName">
                    {card.text}
                </div>
                <div className="CardDesc">
                    {card.desc}
                </div>
                <div className="CardCoins">
                    Coins : {card.coins}
                </div>
                {handleAvalText()}
            </div>
        )
    } else {
        return (<></>)
    }
}

export default PowerUpShopView;