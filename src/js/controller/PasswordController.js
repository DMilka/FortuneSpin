import Password from '../model/Password';
import * as passView from '../view/PasswordView';

export default class PasswordController {
  constructor() {
    this.Pass = new Password();
    this.assigned = false;
    this.passwords = [];
  }

  async generatePass() {

    await this.Pass.getPasswords();
    for(let i = 0; i < this.Pass.gamePass.length; i++) {
      await passView.generatePasswordPlaceholder(this.Pass.gamePass[i], i);
    }

  }

  assignPasswordsToArr() {
    if(this.assigned === false) {
      this.assigned = true;

      for(let i = 0; i < 3; i++) {

        this.passwords.push(localStorage.getItem(`gamePass${i}`).toUpperCase());
        localStorage.removeItem(`gamePass${i}`);
      }
      // console.log(localStorage);
    }
  }

  calculateReward(prize, numberOfLetter) {
    this.finalReward = prize * numberOfLetter;
  }


  }

