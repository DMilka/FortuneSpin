import { elements } from '../DOMelements';



export const createConsonants = lettersArr => {
  for(let i = 0; i < lettersArr.length; i++) {
    const markup = `<button class="letters_box__letter">${lettersArr[i]}</button>`;

    elements.consonantBtnContainer.insertAdjacentHTML('beforeend', markup);
  }
}

export const createVowel = lettersArr => {
  for(let i = 0; i < lettersArr.length; i++) {
    const markup = `<button class="letters_box__letter">${lettersArr[i]}</button>`;

    elements.vowelBtnContainer.insertAdjacentHTML('beforeend', markup);
  }
}

export const changeLetters = () => {
  elements.vowelBtnContainer.classList.toggle('hidden');
  elements.consonantBtnContainer.classList.toggle('hidden');
  elements.lettersCost.classList.toggle('hidden');

  elements.vowelBtn.classList.toggle('btn-active');
  elements.consonantBtn.classList.toggle('btn-active');

  elements.passwordForm.classList.add('hidden');

}

export const getLetterValue = (element) => {
  if(element.matches('.letters_box__letter')) {
    const letter = element.innerText;
    // console.log(letter);
    return letter;
  } else return null;
}

export const showActivePlayer = (playerid) => {
  // console.log(elements.playerAvatar);

  // for(let i = 0; i < elements.playerAvatar.length; i++) {
  //   if(i != playerid) elements.playerAvatar[i].classList.remove('active_player')
  //   else elements.playerAvatar[i].classList.add('active_player');
  // }
}

export const addPoints = (points,playerid) => {
  elements.playerPointsContainers[playerid].innerText = points;
}

export const showPlayers = (players) => {
  for(let i = 0; i< players.length; i++) {
    elements.playerNick[i].innerText = players[i].name;
  }
}

export const disableLetters = () => {
  // console.log(elements.lettersBox[0].children.length);
  // console.log(elements.lettersBox[0].length);
  // console.log(elements.lettersBox[0].children[2]);
  for(let i = 0; i < elements.lettersBox.length; i++) {
    for(let j = 0; j < elements.lettersBox[i].children.length; j++) {
      elements.lettersBox[i].children[j].disabled = true;
    }
  }
}

export const disableSpin = () => {
  elements.spinWheelBtn.disabled = true;
}

export const enableSpin = () => {
  elements.spinWheelBtn.disabled = false;
}

export const enableLetters = (letters) => {
  // console.log(elements.lettersBox[0].children.length);
  // console.log(elements.lettersBox[0].length);
  // console.log(elements.lettersBox[0].children[2]);
  for(let i = 0; i < elements.lettersBox.length; i++) {
    for(let j = 0; j < elements.lettersBox[i].children.length; j++) {
      elements.lettersBox[i].children[j].disabled = false;
      for(let k = 0; k < letters.length; k++) {
        if(letters[k] == elements.lettersBox[i].children[j].innerText ) {
          elements.lettersBox[i].children[j].disabled = true;
          break;
        }

    }
  }
  }
}

export const enableConsonants = (letters) => {
  for(let i = 0; i < elements.consonantBtnContainer.children.length; i++) {
    elements.consonantBtnContainer.children[i].disabled = false;
    for(let j = 0; j < letters.length; j++) {
      if(letters[j] == elements.consonantBtnContainer.children[i].innerText ) {
        elements.consonantBtnContainer.children[i].disabled = true;
        break;
      }
    }
  }
}

export const enableVowels = (letters) => {
//

  for(let i = 0; i < elements.vowelBtnContainer.children.length; i++) {
    elements.vowelBtnContainer.children[i].disabled = false;
    // console.log(elements.vowelBtnContainer.children[i].innerText);
    for(let j = 0; j < letters.length; j++) {

      if(letters[j] == elements.vowelBtnContainer.children[i].innerText ) {

        elements.vowelBtnContainer.children[i].disabled = true;
        break;
      }
    }
  }
}

export const disableConsonants = () => {
  for(let i = 0; i < elements.consonantBtnContainer.children.length; i++) {
    elements.consonantBtnContainer.children[i].disabled = true;
  }
}

export const disableVowels = () => {

  for(let i = 0; i < elements.vowelBtnContainer.children.length; i++) {
    elements.vowelBtnContainer.children[i].disabled = true;
  }
}

export const enablePasswordsCheckForm = () => {
  elements.vowelBtnContainer.classList.add('hidden');
  elements.consonantBtnContainer.classList.add('hidden');
  elements.userAnswerContainer.classList.remove('hidden');

  elements.consonantBtn.classList.remove('btn-active');
  elements.vowelBtn.classList.remove('btn-active');
  elements.passwordBtn.classList.add('btn-active');
}

export const showConsonants = () => {
  elements.userAnswerContainer.classList.add('hidden');

  elements.vowelBtnContainer.classList.add('hidden');
  elements.consonantBtnContainer.classList.remove('hidden');

  elements.consonantBtn.classList.add('btn-active');
  elements.vowelBtn.classList.remove('btn-active');
  elements.passwordBtn.classList.remove('btn-active');
}

export const showVowels = () => {
  elements.userAnswerContainer.classList.add('hidden');

  elements.vowelBtnContainer.classList.remove('hidden');
  elements.consonantBtnContainer.classList.add('hidden');

  elements.consonantBtn.classList.remove('btn-active');
  elements.vowelBtn.classList.add('btn-active');
  elements.passwordBtn.classList.remove('btn-active');
}

export const showLettersOnScreen = (pass) => {
  for(let i = 0; i < pass.length; i++) {
    for (let j = 0; j < pass[i].length; j++) {
      elements.passwordContainer[i].children[j].innerText = pass[i][j];
    }
  }
}