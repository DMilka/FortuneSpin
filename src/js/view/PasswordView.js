import {elements} from '../DOMelements';


export const generatePasswordPlaceholder = (pass, container) => {
  const letter = `<div class="letter"></div>`;
  const space = `<div class="letter__space"></div>`;
  const dash = `<div class="letter__space">-</div>`;

  const passwordContainer = elements.passwordContainer[container];

  for(let i = 0; i < pass.length; i++) {
    if(pass.charAt(i) == ' ') passwordContainer.insertAdjacentHTML('beforeend', space);
    else if(pass.charAt(i) == '-') passwordContainer.insertAdjacentHTML('beforeend', dash);
    else passwordContainer.insertAdjacentHTML('beforeend', letter);
  }

}