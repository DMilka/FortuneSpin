
import { elements } from '../DOMelements';

export const getLastSpinValue = () => {
  //  Pobierz wartość data-set o stopniach o ile koło powinno się obrócić jeśli pierwszy obrót ustaw na 0
  const wheel = elements.wheel;

  const lastSpin = parseInt(wheel.dataset.lastSpin);
  if(lastSpin === undefined || isNaN(lastSpin) ) lastSpin = 0;
  return lastSpin;
}

export const saveSpinToDataset = spin => {
  elements.wheel.dataset.lastSpin = spin;
}

export const rotateWheel = async actualSpin => {
  const wheel = elements.wheel;
  await setTimeout(() => {
    wheel.classList.add('pointerTransition');
    wheel.style.transform = `rotate(-${actualSpin}deg)`;
  }, 500);
}

export const minimalizeRotation = async spinToSave => {
  const wheel = elements.wheel;
  await setTimeout(() => {
    wheel.classList.remove('pointerTransition');
    wheel.style.transform = `rotate(-${spinToSave}deg)`;
}, 3500);
}