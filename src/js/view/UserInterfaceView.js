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