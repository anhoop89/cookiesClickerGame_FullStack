import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/play.css";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/play.css";

type Upgrade = {
  cost: number;
  count: number;
  addMultiplier: number;
  addAutoClick: number;
};

const api = axios.create({
  baseURL: `http://localhost:8080/`,
  headers: {
    "Content-type": "application/json",
  },
  baseURL: `http://localhost:8080/`,
  headers: {
    "Content-type": "application/json",
  },
});

function pow(base: number, exponent: number): number {
  let result = 1;
  for (let i = 0; i < exponent; i++) {
    result *= base;
  }
  return result;
}
function pow(base: number, exponent: number): number {
  let result = 1;
  for (let i = 0; i < exponent; i++) {
    result *= base;
  }
  return result;
}

//const clickerGame = () => {
function clickerGame() {
  const [clickCounter, setClickCounter] = useState<number>(0);
  const [clickMultiplier, setClickMultiplier] = useState<number>(1);
  const [textCounter, setTextCounter] = useState<number>(0);

  const [autoClickBool, setAutoBool] = useState<boolean>(false);
  const [autoClickNum, setAutoClicks] = useState<number>(0);

  const [displayRewardText, setRewardText] = useState<string>("");

  const { user, isAuthenticated } = useAuth0();
  const { user, isAuthenticated } = useAuth0();

  const [getUsers, setUsers] = useState([]);
  const [showUpdate, setUpdateUser] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [getUsers, setUsers] = useState([]);
  const [showUpdate, setUpdateUser] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // since we have only 2 options to upgrade
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    { cost: 10, count: 0, addMultiplier: 1, addAutoClick: 0},
    { cost: 20, count: 0, addMultiplier: 0, addAutoClick: 1},
  ]);

  const buttonClick = () => {
    // increment one click counter every time this function is invoked
    setClickCounter(clickCounter + clickMultiplier);
    // checking the 2nd counter for flavor texts to invoke the function to change
    //    the flavor text if the counter has accumulated enough
    if (textCounter >= 25) {
      getNewFunFact();
      setTextCounter(0);
      return;
    }
    // continue increasing text counter until the fact pops up
    setTextCounter(textCounter + 1);
    setIsSaving(false);
  };

  // auto clicker purchases will increase the frequency of when the game will auto click
  const autoClicker = () =>{

    let bigButton = document.getElementById("theButton")
    let frequency = autoClickNum;
    console.log(frequency);

    if(autoClickNum > 0){
      let interval = window.setInterval(() => {
        bigButton?.click();
      }, 5000/frequency);
    }
  }

  // function to allow regular button clicks to activate auto clicker
  // with a check to prevent auto clicker from being called multiple times
  const onButtonClick = () =>{
    buttonClick();

    if(autoClickBool === true){
      return;
    }
    else{
      autoClicker();
      setAutoBool(true);
      return;
    }
  }


  // function activates only when 'textCounter' variable is ABOVE 25
  // this function pulls a new flavor text to deliver to the user
  const getNewFunFact = async () => {
    axios
      .get("https://catfact.ninja/fact")
      .then((response) => {
        let aFact: any = response.data.fact;
        return setRewardText("You got a fun fact . . ." + "\n" + aFact);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // function activates only when 'textCounter' variable is ABOVE 25
  // this function pulls a new flavor text to deliver to the user
  const getNewFunFact = async () => {
    axios
      .get("https://catfact.ninja/fact")
      .then((response) => {
        let aFact: any = response.data.fact;
        return setRewardText("You got a fun fact . . ." + "\n" + aFact);
      })
      .catch((error) => {
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
    // copy data from upgrades
    const updatedUpgrades = [...upgrades];
    updatedUpgrades[option].count += 1;
    updatedUpgrades[option].cost = Math.round(multiplierCost * 1.75);

    // update a new click goal for an upgrade based on option.
    setUpgrades(updatedUpgrades);
  };

  const increaseAutoClick = (option: number) => {
    const autoClickCost = upgrades[option].cost;
    const autoclicks = upgrades[option].addAutoClick;
    console.log("increasing auto click", autoclicks);
    setAutoClicks(autoClickNum + autoclicks);
    setClickCounter(clickCounter - autoClickCost);

    // copy data from upgrades
    const updatedUpgrades = [...upgrades];
    updatedUpgrades[option].count += 1;
    updatedUpgrades[option].cost = Math.round(autoClickCost * 1.75);

    setUpgrades(updatedUpgrades);
  }

  // 2 options: 0 - upgrade ONE | 1 - upgrade TWO
  const purchaseUpgrade = (option: number) => {
    // checking with the cost before upgrading.
    if (clickCounter < upgrades[option].cost) {
      alert("Not enough clicks!!");
      return;
    }
    increaseMultiplier(option);
  };


  const purchaseAutoClick = (option: number) => {
    // checking with the cost before upgrading.
    if (clickCounter < upgrades[option].cost) {
      alert("Not enough clicks!!");
      return;
    }
    increaseAutoClick(option);
  }


  // save the score into the database based on username
  const saveButton = () => {
    if (user && user?.email_verified === true) {
      const updateUser = async () => {
        await api
          .put(`/user`, {
            name: user?.nickname, // use the user nickname as the name to update
            userClicks: clickCounter,
            userUpgradeOne: upgrades[0]?.count,
            userUpgradeTwo: upgrades[1]?.count,
          })
          .then((response) => {
            console.log(response.data);
            setUpdateUser(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
  // save the score into the database based on username
  const saveButton = () => {
    if (user && user?.email_verified === true) {
      const updateUser = async () => {
        await api
          .put(`/user`, {
            name: user?.nickname, // use the user nickname as the name to update
            userClicks: clickCounter,
            userUpgradeOne: upgrades[0]?.count,
            userUpgradeTwo: upgrades[1]?.count,
          })
          .then((response) => {
            console.log(response.data);
            setUpdateUser(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      updateUser();
      setIsSaving(true);
    }
  };

  useEffect(() => {
    // if the user is valid, pull their game data into the game on the site.
    if (user && user?.email_verified === true) {
      const loadData = async () => {
        await api
          .get(`/user/${user?.nickname}`)
          .then((response) => {
            const num_of_clicks =
              response?.data[0]?.gameDataEntry?.num_of_clicks ?? 0;
            setClickCounter(num_of_clicks);
            const updateCountOne =
              response?.data[0]?.gameDataEntry?.num_of_upgrade_one;
            const updateCountTwo =
              response?.data[0]?.gameDataEntry?.num_of_upgrade_two;
            setClickMultiplier(updateCountOne * 1);
            setAutoClicks(updateCountTwo * 1);
            const updateCostOne = Math.round(10 * pow(1.75, updateCountOne));
            const updateCostTwo = Math.round(20 * pow(1.75, updateCountOne));
            setUpgrades([
              { cost: updateCostOne, count: updateCountOne, addMultiplier: 1, addAutoClick: 0 },
              { cost: updateCostTwo, count: updateCountTwo, addMultiplier: 0, addAutoClick: 1 },
            ]);

            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      loadData();
    }

    setIsSaving(false);
  }, []);
    setIsSaving(false);
  }, []);

  return (
    <div className=" boxGameContainer flex flex-col items-center pt-40 pb-40  ">
      <div className="bigbutton" onClick={onButtonClick} id="theButton">
        <img src="./src/img/cookies_logo.png" />
      </div>
      <h1 className="titleCount pt-10">Click Count: {clickCounter}</h1>
      <p className="rewardText overflow-hidden  max-w-md pt-5 mx-auto">
        {displayRewardText}
      </p>
      <div className="mt-10">
        {/* the single clicker upgrade option (UPGRADE ONE) */}
        <button
          className="upgradeButton mx-4 mb-3 from-pink-500 via-red-500 to-yellow-500 hover:bg-gradient-to-r"
          onClick={() => purchaseUpgrade(0)}
        >
          <div> ► Upgrade One </div>
          <div>
            {" "}
            Times Purchased: {upgrades[0].count}, Cost: {upgrades[0].cost}
          </div>
        </button>
        {/*  the single clicker upgrade option (UPGRADE TWO) */}
        <button
          className="upgradeButton mx-4  mb-3  from-pink-500 via-red-500 to-yellow-500 hover:bg-gradient-to-r"
          onClick={() => purchaseAutoClick(1)}
        >
          <div> ► Upgrade Two </div>
          <div className="">
            {" "}
            Times Purchased: {upgrades[1].count}, Cost: {upgrades[1].cost}{" "}
          </div>
        </button>
      </div>
      <div>{timeTracking()}</div>

      <button
        className=" mx-5 mt-7 mb-3 bg-pink-400 from-pink-500 via-red-500 to-yellow-500 hover:bg-gradient-to-r"
        onClick={() => saveButton()}
      >
        {isSaving && isAuthenticated ? (
          <div> ☼ SAVED the score! </div>
        ) : isAuthenticated ? (
          <div> ☼ SAVE the score! </div>
        ) : (
          <div> ☼ Please login to SAVE the score! </div>
        )}
      </button>
    </div>
  );
}
      <button
        className=" mx-5 mt-7 mb-3 bg-pink-400 from-pink-500 via-red-500 to-yellow-500 hover:bg-gradient-to-r"
        onClick={() => saveButton()}
      >
        {isSaving && isAuthenticated ? (
          <div> ☼ SAVED the score! </div>
        ) : isAuthenticated ? (
          <div> ☼ SAVE the score! </div>
        ) : (
          <div> ☼ Please login to SAVE the score! </div>
        )}
      </button>
    </div>
  );
}

const timeTracking = () => {
  const { isAuthenticated } = useAuth0();
  const [totalSeconds, setSeconds] = useState<number>(0);
  const { isAuthenticated } = useAuth0();
  const [totalSeconds, setSeconds] = useState<number>(0);

  // run useEffect hook everytime people play the game
  const increaseSec = () => {
    setSeconds((currSeconds) => currSeconds + 1);
  };
  // run useEffect hook everytime people play the game
  const increaseSec = () => {
    setSeconds((currSeconds) => currSeconds + 1);
  };

  useEffect(() => {
    const interval = setInterval(increaseSec, 1000); // +1s
    // reset
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(increaseSec, 1000); // +1s
    // reset
    return () => clearInterval(interval);
  }, []);

  if (!isAuthenticated && totalSeconds > 0 && totalSeconds % 60 === 0) {
    alert("Please login to have an auto-save for your score!");
  }
  if (!isAuthenticated && totalSeconds > 0 && totalSeconds % 60 === 0) {
    alert("Please login to have an auto-save for your score!");
  }

  const displayTimer = (() => {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let remainingSeconds = totalSeconds % 60;
  const displayTimer = (() => {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let remainingSeconds = totalSeconds % 60;

    // display hours, minutes, seconds
    // conditional operator to check a plural form
    let showHours = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""} ` : "";
    let showMinutues =
      minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""} ` : "";
    let showSeconds = `${remainingSeconds} second${
      remainingSeconds > 1 ? "s" : ""
    }`;
    // display hours, minutes, seconds
    // conditional operator to check a plural form
    let showHours = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""} ` : "";
    let showMinutues =
      minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""} ` : "";
    let showSeconds = `${remainingSeconds} second${
      remainingSeconds > 1 ? "s" : ""
    }`;

    // leave total seconds for testing
    return `You have been playing: ${showHours} ${showMinutues} ${showSeconds}`;
  })();
    // leave total seconds for testing
    return `You have been playing: ${showHours} ${showMinutues} ${showSeconds}`;
  })();

  return <p>{displayTimer}</p>;
  return <p>{displayTimer}</p>;
};

export default clickerGame;
