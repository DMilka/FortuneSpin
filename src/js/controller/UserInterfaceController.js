import UserInterface from '../model/UserInterface';
import * as UIview from '../view/UserInterfaceView';
import { elements } from '../DOMelements';


export default class UIController {
  constructor() {
    this.UImodel = new UserInterface();
  }

  showConsonants() {
    UIview.showConsonants(this.UImodel.consonants);
  }

  showVowel() {
    UIview.showVowel(this.UImodel.vowel);
  }

  changeLetters() {
    elements.vowelBtn.addEventListener('click', UIview.changeLetters);
    elements.consonantBtn.addEventListener('click', UIview.changeLetters);
  }

}