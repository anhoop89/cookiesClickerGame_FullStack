

// variable for how many clicks the user has clicked
let clickCounter = 0;
// variable for how much each click is worth
let clickMultiplier = 1;
// variable to keep track of when to change flavor text
let textCounter = 0;
// variable to keep track of the cost of UPGRADE ONE
let upgradeOneCost = 25;
// variable to keep track of how many times UPGRADE ONE has been purchased
let upgradeOneCount = 0;
// variable to keep track of the cost of UPGRADE TWO
let upgradeTwoCost = 25;
// variable to keep track of how many times UPGRADE TWO has been purchased
let upgradeTwoCount = 0;


// function activates everytime user clicks the button
function buttonClick() {
    // increment click counter every time this function is invoked
    let aClick = clickMultiplier;
    clickCounter += aClick;

    // changes the tab banner and the click counter on the webpage to reflect 
    //    the amount of clicks that have occurred
    document.getElementById("bigButton").innerHTML = "# of clicks: " + clickCounter;
    document.getElementById("titleCount").innerHTML = "Click Count: " + clickCounter;

    // checking the 2nd counter for flavor texts to invoke the function to change
    //    the flavor text if the counter has accumulated enough
    if(textCounter >= 25){
        changeFlavorText();
        textCounter = 0;
    }
    else{
        textCounter += 1;
    }
}


// function activates only when 'textCounter' variable is above 25
// this function pulls a new flavor text to deliver to the user
function changeFlavorText() {
    
    // using axios to make a GET call to get a JSON object
    // where we use the flavor text of a cat fact
    // -- we can convert this call to our backend and have it returned to us
    //      instead of calling it here in the front end
    axios.get('https://catfact.ninja/fact')
        .then(response => {
            let someFact = response.data.fact;

            document.getElementById("flavorText").innerHTML = 'You click the icon...' + "<br />" + someFact;
        })
        .catch(error => console.error(error));

}


// function activates when user purchases a clicker upgrade two args are passed in. 
//  The cost of the multiplier and how much of an increase the multiplier gets
function increaseMultiplier(multiplierCost, multiplier) {
    clickMultiplier += multiplier;
    clickCounter = clickCounter - multiplierCost;
}


// function activates when user purchases the single clicker upgrade option (UPGRADE ONE)
function purchaseOne() {
    if(clickCounter < upgradeOneCost){
        alert('Not enough clicks!!');
    }
    else{
        increaseMultiplier(upgradeOneCost, 1);
        console.log('clickcounter: ' + clickCounter);
        let newCost = Math.round(upgradeOneCost * 1.75);
        console.log('newcost: ' + newCost);
        upgradeOneCost = newCost;
        upgradeOneCount += 1;

        document.getElementById("bigButton").innerHTML = "# of clicks: " + clickCounter;
        document.getElementById("titleCount").innerHTML = "Click Count: " + clickCounter;
        document.getElementById("firstUpgradeCount").innerHTML = "Times Purchased: " + upgradeOneCount;
        document.getElementById("firstUpgradeCost").innerHTML = "Cost: " + upgradeOneCost;
    }
}

// function activates when user purchases the single clicker upgrade option (UPGRADE TWO)
function purchaseTwo() {
    if(clickCounter < upgradeTwoCost){
        alert('Not enough clicks!!');
    }
    else{
        increaseMultiplier(upgradeTwoCost, 2);
        console.log('clickcounter: ' + clickCounter);
        let newCost = Math.round(upgradeTwoCost * 1.75);
        console.log('newcost: ' + newCost);
        upgradeTwoCost = newCost;
        upgradeTwoCount += 1;

        document.getElementById("bigButton").innerHTML = "# of clicks: " + clickCounter;
        document.getElementById("titleCount").innerHTML = "Click Count: " + clickCounter;
        document.getElementById("secondUpgradeCount").innerHTML = "Times Purchased: " + upgradeTwoCount;
        document.getElementById("secondUpgradeCost").innerHTML = "Cost: " + upgradeTwoCost;
    }
}


