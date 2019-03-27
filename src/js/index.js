import UserInterfaceController from './controller/UserInterfaceController';
import WheelController from './controller/WheelController';

const state = {};

state.UIController = new UserInterfaceController();
state.WheelController = new WheelController();


state.UIController.showConsonants();
state.UIController.showVowel();
state.UIController.changeLetters();

state.WheelController.spinWheel();





