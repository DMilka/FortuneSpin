import { elements } from '../DOMelements';



export const showConsonants = lettersArr => {
  for(let i = 0; i < lettersArr.length; i++) {
    const markup = `<button class="letters_box__letter">${lettersArr[i]}</button>`;

    elements.consonantBtnContainer.insertAdjacentHTML('beforeend', markup);
  }
}

export const showVowel = lettersArr => {
  for(let i = 0; i < lettersArr.length; i++) {
    const markup = `<button class="letters_box__letter">${lettersArr[i]}</button>`;

    elements.vowelBtnContainer.insertAdjacentHTML('beforeend', markup);
  }
}

export const changeLetters = () => {
  elements.vowelBtn.classList.toggle('btn-active');
  elements.consonantBtn.classList.toggle('btn-active');
  elements.vowelBtnContainer.classList.toggle('hidden');
  elements.consonantBtnContainer.classList.toggle('hidden');
  elements.lettersCost.classList.toggle('hidden');
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

  for(let i = 0; i < elements.playerAvatar.length; i++) {
    if(i != playerid) elements.playerAvatar[i].classList.remove('active_player')
    else elements.playerAvatar[i].classList.add('active_player');
  }
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

