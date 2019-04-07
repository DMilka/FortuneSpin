export default class UserInterface {
  constructor() {
    this.consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'w', 'y', 'z'];
    this.vowel = ['a', 'e', 'y', 'i', 'o', 'ą', 'ę', 'u', 'ó'];
  }

  generateLettersUsedInPassArr(passwords) {
    const lettersUsedArr = [];
    const consonant = this.consonants.map(indx => {
      return indx.toUpperCase();
    })
    for(let i = 0; i < passwords.length; i++) {
      for(let j = 0; j < passwords[i].length; j++) {
        if(!lettersUsedArr.includes(passwords[i].charAt(j)) && consonant.includes(passwords[i].charAt(j))) {
          lettersUsedArr.push(passwords[i].charAt(j));
        }
      }
    }
    return lettersUsedArr;
  }
}