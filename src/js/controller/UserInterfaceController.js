import UserInterface from '../model/UserInterface';
import * as UIview from '../view/UserInterfaceView';
import { elements } from '../DOMelements';


export default class UIController {
  constructor() {
    this.UImodel = new UserInterface();
    this.letterGuessed = 0;
  }

  createConsonants() {
    UIview.createConsonants(this.UImodel.consonants);
  }

  createVowel() {
    UIview.createVowel(this.UImodel.vowel);
  }

  changeLetters() {
    UIview.changeLetters();
  }

  getLetter(passwords) {
    console.log(passwords);

    elements.lettersContainer.addEventListener('click', e => {
      this.letterGuessed = 0;
      const letter = UIview.getLetterValue(e.target);
      // console.log(letter);
      for(let i = 0; i < passwords.length; i++) {
        for (let j = 0; j < passwords[i].length; j++) {
          // console.log(passwords[i][j]);
          if(passwords[i][j] == letter) {
            elements.passwordContainer[i].children[j].innerText = letter;
            this.letterGuessed++;

          }
        }
      }
      this.checkPass(passwords);
    });
  }

  checkPass(passwords) {
    let actualPassword =  [];
    let isOK = true;
    for(let i = 0; i < elements.passwordContainer.length; i++) {
     actualPassword[i] = '';
    }

    for(let i = 0; i < elements.passwordContainer.length; i++) {
      for(let j = 0; j < elements.passwordContainer[i].childElementCount; j++) {
        actualPassword[i] +=  elements.passwordContainer[i].children[j].innerText;
      }
    }
    // console.log(actualPassword);
    for(let i = 0; i < elements.passwordContainer.length; i++) {
      if(!(actualPassword[i] === passwords[i])) {
        isOK = false;
        break;
      }
    }
    // console.log(isOK);
    if(isOK) {
      setTimeout(() => {
        elements.initScreen.classList.remove('hidden');
      }, 2000);
    }
  }

  showActivePlayer(playerid) {
    UIview.showActivePlayer(playerid);
  }

  getLetterValue(target) {
    // console.log(target);
    return UIview.getLetterValue(target);
  }

  changeActivePlayer(activePlayer) {

    if(activePlayer === 2) activePlayer = 0;
    else activePlayer++;
    this.showActivePlayer(activePlayer);
    return activePlayer;
  }

  addPoints(reward, playerid) {
    UIview.addPoints(reward,playerid);
  }

  showPlayers(players) {
    UIview.showPlayers(players);
  }

  disableLetters() {
    UIview.disableLetters();
  }

  enableLetters(letters) {
    UIview.enableLetters(letters);
  }

  disableSpin() {
    UIview.disableSpin();
  }

  enableSpin() {
    UIview.enableSpin();
  }

  disableVowels() {
    UIview.disableVowels();
  }

  disableConsonants() {
    UIview.disableConsonants();
  }

  enableVowels(letters) {
    UIview.enableVowels(letters);
  }

  enableConsonants(letters) {
    UIview.enableConsonants(letters);
  }

  generateLettersUsedInPassArr(passwords) {
    return this.UImodel.generateLettersUsedInPassArr(passwords);
  }

  enablePasswordsCheckForm() {

    UIview.enablePasswordsCheckForm();
  }

  showConsonants() {
    UIview.showConsonants();
  }

  showVowels() {
    UIview.showVowels();
  }

  showLettersOnScreen(pass) {
    UIview.showLettersOnScreen(pass);
  }






}