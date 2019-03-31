import Wheel from '../model/Wheel';
import * as WheelView from '../view/WheelView';
import { elements } from '../DOMelements';



export default class WheelController {
  constructor() {
    this.wheelModel = new Wheel();
  }

  spinWheel() {

      const lastSpin = WheelView.getLastSpinValue();

      const rotationSpinValue =  this.wheelModel.randomSpinValue();

      const actualSpin = rotationSpinValue + lastSpin;

      const calculatedMinSpinValue = this.wheelModel.calculateMinSpinValue(actualSpin);

      WheelView.saveSpinToDataset(calculatedMinSpinValue);

      WheelView.rotateWheel(actualSpin);

      const calculatedPrizeIndex = Math.ceil((calculatedMinSpinValue / 22.5 ) -1);



      WheelView.minimalizeRotation(calculatedMinSpinValue);

      this.reward = this.wheelModel.getReward(calculatedPrizeIndex);
      console.log(this.reward);


  }

}