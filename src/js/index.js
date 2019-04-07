import UserInterfaceController from './controller/UserInterfaceController';
import WheelController from './controller/WheelController';
import * as WheelView from './view/WheelView';
import PasswordController from './controller/PasswordController';
import Player from './model/Player';
import { elements } from './DOMelements';


let state = {};
var makeTimeout = true;
var timeoutID;
var counter = 5;
var t;


/**
 *
 *  Initial screen and user create
 *
 */
elements.initForm.addEventListener('submit',  e => {
  e.preventDefault();


  state = {};
  timedCount();
  state.UIController = new UserInterfaceController();
  state.WheelController = new WheelController();
  state.PasswordController = new PasswordController();

  state.players = [];
  state.letterGuessedArray = [];
  state.actualPasswordGuessed = [];
  state.consonantsGuessed = [];
  state.letterGuessed = 0;
  state.activePlayer = 0;
  state.UIController.showActivePlayer(state.activePlayer);

  const nickname = elements.initFormValue.value;
  if(nickname) {
    addPlayer(nickname, 'human');
    addPlayer('Giraffe', 'bot');
    addPlayer('Lion', 'bot');
    elements.initScreen.classList.add('hidden');
    state.UIController.showPlayers(state.players);

    state.PasswordController.generatePass();


      // stworz array ktory przetrzymuje wszystkie spolgloski wystepujace w hasle

    state.generateLettersUsedInPassArr = state.UIController.generateLettersUsedInPassArr(state.PasswordController.passwords);
    // console.log(state.generateLettersUsedInPassArr);


    state.UIController.createConsonants();
    state.UIController.createVowel();
    // state.UIController.changeLetters();



    state.UIController.disableConsonants();
    state.UIController.disableVowels();

  }
});

const addPlayer = (name, type) => {
  const player = new Player(state.players.length, name, type);
  state.players.push(player);
};

elements.readyScreenBtn.addEventListener('click', () => {
  state.PasswordController.assignPasswordsToArr();
  elements.readyScreen.classList.add('hidden');
});



elements.consonantBtn.addEventListener('click', () => {
  state.UIController.showConsonants();

  if(state.wheelSpinned && state.reward > 0) {
    state.UIController.enableConsonants(state.letterGuessedArray);
  }
});


elements.vowelBtn.addEventListener('click', () => {
  state.UIController.showVowels();

  if(!state.wheelSpinned && state.consonantClicked && state.reward > 0) {
    state.UIController.enableVowels(state.letterGuessedArray);
  }
});


elements.passwordBtn.addEventListener('click', () => {
  state.UIController.enablePasswordsCheckForm();
});


/**
 *
 *  Password form check for user answers
 *
 */

elements.passwordForm.addEventListener('submit', e => {
  e.preventDefault();

  const userAnswers = [];
  // console.log(elements.passwordsInputs);

  for(let i = 0; i < elements.passwordsInputs.length; i++) {
    if(elements.passwordsInputs[i].value == '') {
      console.log("Podaj wszystkie hasła!");
      return;
    } else {
      userAnswers.push(elements.passwordsInputs[i].value.toUpperCase());
    }
  }

  for(let i = 0; i < elements.passwordsInputs.length; i++) {
    elements.passwordsInputs[i].value = '';
  }



  console.log(state.PasswordController.passwords);
  console.log(userAnswers);
  // console.log(state.PasswordController.passwords == userAnswers);
  let isPassOK = false;
  for(let i = 0; i < state.PasswordController.passwords.length; i++) {
    if(state.PasswordController.passwords[i] === userAnswers[i]) {
      isPassOK = true;
    } else {
      isPassOK = false;
      return;
    }
  }

  if(isPassOK) {
    for(let i = 0; i < state.PasswordController.passwords.length; i++) {
      for (let j = 0; j < state.PasswordController.passwords[i].length; j++) {
        elements.passwordContainer[i].children[j].innerText = userAnswers[i][j];
      }
    }
    setTimeout(() => {
      elements.initScreen.classList.remove('hidden');
    }, 2000);
  }

});

/**
 *
 *  Spin wheel and reward save
 *
 */
const wheelSpin = () => {
  const lastSpin = WheelView.getLastSpinValue();

  const rotationSpinValue = state.WheelController.wheelModel.randomSpinValue();

  const actualSpin = rotationSpinValue + lastSpin;

  const calculatedMinSpinValue = state.WheelController.wheelModel.calculateMinSpinValue(actualSpin);

  WheelView.saveSpinToDataset(calculatedMinSpinValue);

  WheelView.rotateWheel(actualSpin);

  const calculatedPrizeIndex = Math.ceil((calculatedMinSpinValue / 22.5 ) -1);

  // state.UIController.enableLetters(state.letterGuessedArray);
  // console.log(state.letterGuessedArray);
  setTimeout(() => {
    state.UIController.enableConsonants(state.letterGuessedArray);
  }, 3500);
  state.UIController.disableVowels();
  state.UIController.disableSpin();

  WheelView.minimalizeRotation(calculatedMinSpinValue);

  state.reward = state.WheelController.wheelModel.getReward(calculatedPrizeIndex);

  state.wheelSpinned = true;
  state.consonantClicked = false;

  if(state.reward === -1) {
    setTimeout(() => {
      state.players[state.activePlayer].points = 0;
      state.UIController.addPoints(state.players[state.activePlayer].points, state.activePlayer);
      state.activePlayer = state.UIController.changeActivePlayer(state.activePlayer);
      state.UIController.disableConsonants();
      state.UIController.disableVowels();
      state.UIController.enableSpin();
      enemyAllTurns();
    }, 3500);

  } else if (state.reward === 0) {
    setTimeout(() => {
      state.activePlayer = state.UIController.changeActivePlayer(state.activePlayer);
      state.UIController.disableConsonants();
      state.UIController.disableVowels();
      state.UIController.enableSpin();
      enemyAllTurns();
    }, 3500);
  }

  console.log(state.reward);
};


elements.spinWheelBtn.addEventListener('click', wheelSpin);


/**
 *
 *  Letter check on click
 *
 */

elements.lettersContainer.addEventListener('click', e => {

  state.letterGuessed = 0;
  let letter;
  let isAllConsUsed = false;
  if(e.target.matches('.letters_box__letter')) {

    // console.log(state.players);
    letter = state.UIController.getLetterValue(e.target);
    if(!state.letterGuessedArray.includes(letter))  state.letterGuessedArray.push(letter);

    for(let i = 0; i < state.PasswordController.passwords.length; i++) {
      // console.log(state.PasswordController.passwords[i]);
      for (let j = 0; j < state.PasswordController.passwords[i].length; j++) {
        // console.log(passwords[i][j]);
        // console.log(state.PasswordController.passwords[i][j]);
        if(state.PasswordController.passwords[i][j] == letter) {
          // elements.passwordContainer[i].children[j].innerText = letter;
          // console.log("xd");
          state.letterGuessed++;
        }
      }
    }
    // console.log(letter);
    // console.log(state.letterGuessed);
    if(state.letterGuessed > 0) {

      state.UIController.enableSpin();
      if (e.target.parentElement.matches('#consonants')) {
        state.PasswordController.calculateReward(state.reward, state.letterGuessed);
        state.players[state.activePlayer].addPoints(state.PasswordController.finalReward);
        state.UIController.addPoints(state.players[state.activePlayer].points, state.activePlayer);
        state.UIController.disableConsonants();
        state.wheelSpinned = false;

        // console.log(state.letterGuessedArray);

        if(!state.wheelSpinned) {
          state.UIController.enableVowels(state.letterGuessedArray);
        }
        state.consonantClicked = true;
        discoverLetters(letter);

        state.consonantsGuessed.push(letter);

        state.consonantsGuessed.sort();
        state.generateLettersUsedInPassArr.sort();
        console.log(state.consonantsGuessed);
        console.log(state.generateLettersUsedInPassArr);

        if(state.generateLettersUsedInPassArr.length === state.consonantsGuessed.length) {
          for(let i = 0; i < state.generateLettersUsedInPassArr.length; i++) {
            if(state.generateLettersUsedInPassArr[i] === state.consonantsGuessed[i]) {
              isAllConsUsed = true;
            } else {
              isAllConsUsed = false;
              return;
            }
            console.log(isAllConsUsed);
          }



        }

      }

      if(e.target.parentElement.matches('#vowel')) {
        if(state.players[state.activePlayer].points < 300) {
          console.log("brak kasy");
          if(state.letterGuessedArray.includes(letter))  state.letterGuessedArray.pop(letter);
          return;
        } else {
          state.players[state.activePlayer].points -= 300;
          state.UIController.addPoints(state.players[state.activePlayer].points, state.activePlayer);
          discoverLetters(letter);
          state.UIController.enableVowels(state.letterGuessedArray);
        }
      }
    } else {
      if(e.target.parentElement.matches('#vowel')) {
        if(state.players[state.activePlayer].points < 300) {
          console.log("brak kasy");
          if(state.letterGuessedArray.includes(letter))  state.letterGuessedArray.pop(letter);
          return;
        }
      }
      state.UIController.disableConsonants();
      state.UIController.disableVowels();
      state.activePlayer = state.UIController.changeActivePlayer(state.activePlayer);
      enemyAllTurns();
    }
    checkPass();
    // state.UIController.enableSpin();

    if(isAllConsUsed) {
      state.UIController.disableConsonants();
      state.UIController.disableSpin();
    }


  }
});





const discoverLetters = (letter) => {
  for(let i = 0; i < state.PasswordController.passwords.length; i++) {
    for (let j = 0; j < state.PasswordController.passwords[i].length; j++) {
      // console.log(passwords[i][j]);
      if(state.PasswordController.passwords[i][j] == letter) {
        elements.passwordContainer[i].children[j].innerText = letter;
      }
    }
  }
};

const checkPass = () => {
  state.actualPasswordGuessed = [];
  for(let i = 0; i < state.PasswordController.passwords.length; i++) {
    state.actualPasswordGuessed.push('');
  }
  // console.log(elements.passwordContainer);
  // console.log(elements.passwordContainer[0]);
  // console.log(elements.passwordContainer[0].children[0]);
  for(let i = 0; i <  elements.passwordContainer.length; i++) {
    for (let j = 0; j <elements.passwordContainer[i].children.length; j++) {
      // console.log(passwords[i][j]);
      if(elements.passwordContainer[i].children[j].innerText != '')
        state.actualPasswordGuessed[i] += elements.passwordContainer[i].children[j].innerText;
    }
  }
  // console.log(state.actualPasswordGuessed);
};


/* ==========================================================
 *
 *                          BOT TURN
 *
 ==========================================================*/

function enemyTurn() {
  state.letterGuessed = 0;
  console.log(state.players[state.activePlayer]);
  console.log(makeTimeout);
  wheelSpinForBot();
  const letter = randomLetter();
  if(state.reward > 0 ) {
    if(!state.letterGuessedArray.includes(letter))  state.letterGuessedArray.push(letter);
    for(let i = 0; i < state.PasswordController.passwords.length; i++) {
      // console.log(state.PasswordController.passwords[i]);
      for (let j = 0; j < state.PasswordController.passwords[i].length; j++) {
        // console.log(passwords[i][j]);
        // console.log(state.PasswordController.passwords[i][j]);
        if(state.PasswordController.passwords[i][j] == letter) {
          // elements.passwordContainer[i].children[j].innerText = letter;
          // console.log("xd");
          state.letterGuessed++;
        }
      }
    }

    if(state.letterGuessed > 0) {

      state.consonantsGuessed.push(letter);
      const isFinished = checkBotPass();
      if(isFinished) {
        makeTimeout = false;
        setTimeout(() => {
          elements.initScreen.classList.remove('hidden');
        }, 2000);
        return;
      }
      setTimeout(() => {
        state.PasswordController.calculateReward(state.reward, state.letterGuessed);
        state.players[state.activePlayer].addPoints(state.PasswordController.finalReward);
        state.UIController.addPoints(state.players[state.activePlayer].points, state.activePlayer);
        discoverLetters(letter);
      }, 3500);
    } else {
      state.activePlayer = state.UIController.changeActivePlayer(state.activePlayer);
    }


  }
  // else if (state.reward < 0) {
  //   state.players[state.activePlayer].points = 0;
  //   state.UIController.addPoints(state.players[state.activePlayer].points, state.activePlayer);
  //   state.activePlayer = state.UIController.changeActivePlayer(state.activePlayer);
  // } else {
  //   state.activePlayer = state.UIController.changeActivePlayer(state.activePlayer);
  // }

  if(state.players[state.activePlayer].type === 'human') {
    makeTimeout = false;
    state.UIController.disableConsonants();
    setTimeout(() => {
      state.UIController.enableSpin();
    }, 3500);
  } else {
    timeoutID = setTimeout(enemyTurn, 8000);
  }

}

function enemyAllTurns() {
  state.UIController.disableConsonants();
  if(state.players[state.activePlayer].type === 'bot') {
    console.log(state.players[state.activePlayer]);
    makeTimeout = true;
  } else {
    makeTimeout = false;
  }

  if (makeTimeout) {
    makeTimeout = true;
    enemyTurn();
  } else {
    clearTimeout(timeoutID);
    makeTimeout = false;
  }
}


const wheelSpinForBot = () => {
  const lastSpin = WheelView.getLastSpinValue();

  const rotationSpinValue = state.WheelController.wheelModel.randomSpinValue();

  const actualSpin = rotationSpinValue + lastSpin;

  const calculatedMinSpinValue = state.WheelController.wheelModel.calculateMinSpinValue(actualSpin);

  WheelView.saveSpinToDataset(calculatedMinSpinValue);

  WheelView.rotateWheel(actualSpin);

  const calculatedPrizeIndex = Math.ceil((calculatedMinSpinValue / 22.5 ) -1);

  // state.UIController.enableLetters(state.letterGuessedArray);
  // console.log(state.letterGuessedArray);
  state.UIController.disableVowels();
  state.UIController.disableSpin();

  WheelView.minimalizeRotation(calculatedMinSpinValue);

  state.reward = state.WheelController.wheelModel.getReward(calculatedPrizeIndex);

  state.wheelSpinned = true;
  state.consonantClicked = false;

  if(state.reward === -1) {
    state.activePlayer = state.UIController.changeActivePlayer(state.activePlayer);
    setTimeout(() => {
      state.players[state.activePlayer].points = 0;
      state.UIController.addPoints(state.players[state.activePlayer].points, state.activePlayer);

      state.UIController.disableConsonants();
      state.UIController.disableVowels();


    }, 3500);

  } else if (state.reward === 0) {
    state.activePlayer = state.UIController.changeActivePlayer(state.activePlayer);
    setTimeout(() => {

      state.UIController.disableConsonants();
      state.UIController.disableVowels();
    }, 3500);
  }

  console.log(state.reward);
}


const randomLetter = () => {
  const consonants = state.UIController.UImodel.consonants;
  console.log(consonants);
  let isNotOK = true;
  let randomNum
  let randomLetter
  do {
    randomNum = Math.floor(Math.random() * consonants.length);
    randomLetter = consonants[randomNum].toUpperCase();

    console.log(randomLetter);
    if(!state.letterGuessedArray.includes(randomLetter)) isNotOK = false;

  } while (isNotOK);

  return randomLetter;
};


function timedCount() {
  elements.readyScreenTimer.innerText = counter;
  console.log(counter);
  counter--;
  if(counter >= 0)  t = setTimeout(timedCount, 1000);
  else {
    elements.readyScreenTimer.classList.add("hidden");
    elements.readyScreenBtn.classList.remove("hidden");
  }

}

const checkBotPass = () => {
  const consGuessedArrLen = state.consonantsGuessed.length;
  const allLettersArrLen = state.UIController.UImodel.generateLettersUsedInPassArr(state.PasswordController.Pass.gamePass).length;
  const divide = consGuessedArrLen / allLettersArrLen;
  const randomNum2 = Math.floor(Math.random() * 2);
  const randomNum4 = Math.floor(Math.random() * 4);

  console.log("randon2 " + randomNum2);
  console.log("random4 " + randomNum4);
  console.log(divide);

  if( divide > 0.9) {
    state.UIController.showLettersOnScreen(state.PasswordController.Pass.gamePass);
    return true;
  } else if(divide > 0.8) {
    if(randomNum2 === 0) {
      console.log(state.PasswordController.Pass.gamePass);
      state.UIController.showLettersOnScreen(state.PasswordController.Pass.gamePass);
      return true;
    }
  } else if (divide > 0.6) {
    if(randomNum4 === 0) {
      console.log(state.PasswordController.Pass.gamePass);
      state.UIController.showLettersOnScreen(state.PasswordController.Pass.gamePass);
      return true;
    }
  }


  console.log(consGuessedArrLen);
  console.log(allLettersArrLen);
}




