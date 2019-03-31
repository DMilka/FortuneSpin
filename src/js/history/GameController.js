// import UserInterfaceController from './UserInterfaceController';
// import WheelController from './WheelController';
// import PasswordController from './PasswordController';
// import Player from '../model/Player';
// import { elements } from '../DOMelements';


// export default class GameController {
//   constructor() {
//     this.UIController = new UserInterfaceController();
//     this.players = [];
//     this.activePlayer = Math.floor(Math.random() * 3);

//     this.UIController.showConsonants();
//     this.UIController.showVowel();
//     this.UIController.changeLetters();

//   };

//   addPlayer(name) {
//     const player = new Player(this.players.length, name);
//     this.players.push(player);
//   };

//   gameInit(e) {

//       e.preventDefault();

//       const nickname = elements.initFormValue.value;
//       if(nickname) {
//         this.addPlayer(nickname);
//         this.addPlayer('Giraffe');
//         this.addPlayer('Lion');
//         elements.initScreen.classList.add('hidden');

//         this.PasswordController.generatePass();
//         this.PasswordController.assignPasswordsToArr();
//         // console.log(this.PasswordController.passwords);


//         this.UIController.getLetter(this.PasswordController.passwords);

//       }

//   };


// }