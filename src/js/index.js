import UserInterfaceController from './controller/UserInterfaceController';
import WheelController from './controller/WheelController';
import * as WheelView from './view/WheelView';
import PasswordController from './controller/PasswordController';
import Player from './model/Player';
import { elements } from './DOMelements';

let state = {};

/**
 *
 *  Initial screen and user create
 *
 */
elements.initForm.addEventListener('submit',  e => {
  e.preventDefault();


  state = {};

  state.UIController = new UserInterfaceController();
  state.WheelController = new WheelController();
  state.PasswordController = new PasswordController();

  state.players = [];
  state.letterGuessedArray = [];
  state.activePlayer = 0;
  state.UIController.showActivePlayer(state.activePlayer);

  const nickname = elements.initFormValue.value;
  if(nickname) {
    addPlayer(nickname);
    addPlayer('Giraffe');
    addPlayer('Lion');
    elements.initScreen.classList.add('hidden');
    state.UIController.showPlayers(state.players);

    state.PasswordController.generatePass();
    state.PasswordController.assignPasswordsToArr();
    // console.log(this.PasswordController.passwords);

    state.UIController.showConsonants();
    state.UIController.showVowel();
    state.UIController.changeLetters();



    state.UIController.disableLetters();
  }
});

const addPlayer = (name) => {
  const player = new Player(state.players.length, name);
  state.players.push(player);
};


/**
 *
 *  Spin wheel and reward save
 *
 */

elements.spinWheelBtn.addEventListener('click', () => {
  const lastSpin = WheelView.getLastSpinValue();

  const rotationSpinValue = state.WheelController.wheelModel.randomSpinValue();

  const actualSpin = rotationSpinValue + lastSpin;

  const calculatedMinSpinValue = state.WheelController.wheelModel.calculateMinSpinValue(actualSpin);

  WheelView.saveSpinToDataset(calculatedMinSpinValue);

  WheelView.rotateWheel(actualSpin);

  const calculatedPrizeIndex = Math.ceil((calculatedMinSpinValue / 22.5 ) -1);

  state.UIController.enableLetters(state.letterGuessedArray);
  state.UIController.disableSpin();

  WheelView.minimalizeRotation(calculatedMinSpinValue);

  state.reward = state.WheelController.wheelModel.getReward(calculatedPrizeIndex);
  if(state.reward === -1) {
    setTimeout(() => {
      state.players[state.activePlayer].points = 0;
      state.UIController.addPoints(state.players[state.activePlayer].points, state.activePlayer);
      state.activePlayer = state.UIController.changeActivePlayer(state.activePlayer);
      state.UIController.disableLetters();
      state.UIController.enableSpin();

    }, 3500);

  } else if (state.reward === 0) {
    setTimeout(() => {
      state.activePlayer = state.UIController.changeActivePlayer(state.activePlayer);
      state.UIController.disableLetters();
      state.UIController.enableSpin();
    }, 3500);
  }
  // console.log(state.reward);


});

/**
 *
 *  Letter check on click
 *
 */

elements.lettersContainer.addEventListener('click', e => {
  if(e.target.parentElement.matches('#vowel')) {
    if(state.players[state.activePlayer].points < 300) {
      console.log("brak kasy");
      return;
    } else {
      state.players[state.activePlayer].points -= 300;
      checkLetter(e);
    }
  } else if (e.target.parentElement.matches('#consonants')) {
    checkLetter(e);
  }
  // checkLetter(e);

});

const checkLetter = e => {
  if(e.target.matches('.letters_box__letter')) {
    console.log(state.players);
    state.letterGuessed = 0;
    const letter = state.UIController.getLetterValue(e.target);
    // console.log(letter);
    for(let i = 0; i < state.PasswordController.passwords.length; i++) {
      for (let j = 0; j < state.PasswordController.passwords[i].length; j++) {
        // console.log(passwords[i][j]);
        if(state.PasswordController.passwords[i][j] == letter) {
          elements.passwordContainer[i].children[j].innerText = letter;
          state.letterGuessed++;
        }
      }
    }
    if(parseInt(state.letterGuessed) === 0) {
      setTimeout(() => {
        state.activePlayer = state.UIController.changeActivePlayer(state.activePlayer);
      }, 500);
    }

    if(parseInt(state.letterGuessed) > 0) {
      state.PasswordController.calculateReward(state.reward, state.letterGuessed);
      state.players[state.activePlayer].addPoints(state.PasswordController.finalReward);
      state.UIController.addPoints(state.players[state.activePlayer].points, state.activePlayer);
      state.UIController.checkPass(state.PasswordController.passwords);

      for(let i = 0; i < state.PasswordController.passwords.length; i++) {
        for (let j = 0; j < state.PasswordController.passwords[i].length; j++) {
          // console.log(passwords[i][j]);
          if(state.PasswordController.passwords[i][j] == letter) {
            elements.passwordContainer[i].children[j].innerText = letter;
          }
        }
      }
    }
    state.letterGuessedArray.push(letter);
    state.UIController.disableLetters();
    state.UIController.enableSpin();
  }
}










