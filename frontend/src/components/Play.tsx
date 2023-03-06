import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/play.css';

type Upgrade = {
    cost: number,
    count: number,
    addMultiplier: number
}

const clickerGame: React.FC = () => {

    const [clickCounter, setClickCounter] = useState<number>(0);
    const [textCounter, setTextCounter] = useState<number>(0);

    const [clickMultiplier, setClickMultiplier] = useState<number>(1);
    const [rewardText, setRewardText] = useState<string>("");

    // since we have only 2 options to upgrade
    const [upgrades, setUpgrades] = useState<Upgrade[]>([
        { cost: 25, count: 0, addMultiplier: 1 },
        { cost: 100, count: 0, addMultiplier: 2 }
    ]);


    const buttonClick = () => {
        // increment click counter every time this function is invoked
        const oneClick = clickMultiplier;
        setClickCounter(clickCounter + oneClick);

        // checking the 2nd counter for flavor texts to invoke the function to change
        //    the flavor text if the counter has accumulated enough
        if (textCounter >= 25) {
            getNewFunFact();
            setTextCounter(0);
            return;
        }
        // continue increasing text counter until the fact pops up
        setTextCounter(textCounter + 1);
    };


    // function activates only when 'textCounter' variable is ABOVE 25
    // this function pulls a new flavor text to deliver to the user
    const getNewFunFact = async () => {
        axios.get('https://catfact.ninja/fact')
            .then(response => {
                let aFact: any = response.data.fact;
                return setRewardText('You got a fun fact . . .' + "\n" + aFact);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // function activates when user purchases a clicker upgrade two args are passed in. 
    //  The cost of the multiplier and how much of an increase the multiplier gets
    const increaseMultiplier = (option: number) => {
        const multiplierCost = upgrades[option].cost;
        const multiplier = upgrades[option].addMultiplier;
        setClickMultiplier(clickMultiplier + multiplier);
        setClickCounter(clickCounter - multiplierCost);

        // copy data from upgrades 
        const updatedUpgrades = [...upgrades];
        updatedUpgrades[option].count += 1;
        updatedUpgrades[option].cost = Math.round(multiplierCost * 1.75);

        // update a new click goal for an upgrade based on option.
        setUpgrades(updatedUpgrades);
    };

    // 2 options: 0 - upgrade ONE | 1 - upgrade TWO
    const purchaseUpgrade = (option: number) => {
        // checking with the cost before upgrading. 

        if (clickCounter < upgrades[option].cost) {
            alert('Not enough clicks!!');
            return;
        }
        increaseMultiplier(option);
    };

    return (
        <div className='flex flex-col items-center pt-40 pb-40'>
            <h1 className='bigbutton' onClick={buttonClick}><img className='theButton' src="./src/img/cookies_logo.png" /></h1>
            <h2 className='titleCount pt-10'>Click Count: {clickCounter}</h2>
            <p className='rewardText'>{rewardText}</p>
            <div>
                {/* the single clicker upgrade option (UPGRADE ONE) */}
                <button onClick={() => purchaseUpgrade(0)}>
                    Upgrade One: Times Purchased: {upgrades[0].count},
                    Cost: {upgrades[0].cost}
                </button>
                {/*  the single clicker upgrade option (UPGRADE TWO) */}
                <button onClick={() => purchaseUpgrade(1)}>
                    Upgrade Two: Times Purchased: {upgrades[1].count},
                    Cost: {upgrades[1].cost}
                </button>
            </div>
        </div>
    );
};

export default clickerGame;
