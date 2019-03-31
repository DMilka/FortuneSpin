// document.querySelector('.spin-btn').addEventListener('click', async () => {
//   // 1. Pobieramy koło
//   const wheel = document.querySelector('.wheelImg');

//   // 2. Pobierz wartość data-set o stopniach o ile koło powinno się obrócić jeśli pierwszy obrót ustaw na 0
//   let lastSpin = parseInt(wheel.dataset.lastSpin);
//   if(lastSpin === undefined || isNaN(lastSpin) ) lastSpin = 0;

//   // 3. Wylosuj losowa liczbę od 3 do 6 mówiącą o ilości obiegów 360°
//   const rotationNum = Math.floor(Math.random() * 4) + 3;

//   // 4. Wylosuj liczbę od 260-360 mówiącą o ilości stopni obrotu
//   const spinValue = Math.floor(Math.random() * 100) + 260;

//   // 5. Pomnóż dwie wcześniejsze liczby aby otrzymać wartość obrotu
//   const rotationValue = rotationNum * spinValue;

//   // 6. Zsumuj wartość poprzedniego obrotu z aktualnym obrotem
//   const actualSpin = rotationValue + lastSpin;

//   // 7. Oblicz minimalny obrót usuwając pełne obroty i zapisz go do data-set
//   //      Przykład:
//   //      Aktualny obrót: 1100°
//   //      1110° - 360°  = 750°  - 360°  = 390°  - 360°  = 30°
//   //      Rzeczywisty obrót zapisany do następnego obrotu to 30°

//   let multiple = actualSpin;
//   let spinToSave = 0;
//   while(true) {
//       multiple -= 360;
//       if(multiple > 0) spinToSave = multiple; else break;
//   }
//   wheel.dataset.lastSpin = spinToSave;


//   // 8. Obróć koło o wylosowaną nową wartość w czasie oraz dodaj animacje
//   await setTimeout(() => {
//       wheel.classList.add('pointerTransition');
//       wheel.style.transform = `rotate(-${actualSpin}deg)`;
//   }, 500);

//   //9. Oblicz, index z tablicy nagród wartość indexu pola, które wygrało
//   //      Przykład:
//   //      Aktualny obrót: 1100°
//   //      1110° - 360°  = 750°  - 360°  = 390°  - 360°  = 30°
//   //      Rzeczywisty obrót: 30°
//   //      Każde pole zajmuje 22.5° - ponieważ mamy 16 pól = 360° / 16° = 22.5°
//   //      Teraz dzielimy obrót o ilość stopni które posiada pole
//   //      30° / 22.5° = 1.3333333
//   //      Zaokrąglamy zawsze w górę ponieważ wykonało obrót o całe pole i wskaźnik znajduję się o reszte z dzielenia na kolejnym polu
//   //      Od całego wyniku odejmujmy 1 ponieważ indeksujemy tablice od 0

//   let tmp = actualSpin;
//   let calculatedSpin = 0;
//   while(true) {
//       tmp -= 360;
//       if(tmp > 0) calculatedSpin = tmp; else break;
//   }

//   const calculatedPrizeIndex = Math.ceil((calculatedSpin / 22.5 ) -1);

// //  const prizes = [ -1, 250, 150, 300, 500, 200, 0, 75, -1, 1000, 200, 150, 750, 400, 100, 1500];

//   console.log(prizes[calculatedPrizeIndex]);


//   // 10. Przywracamy minimalmną wartość obrotu po usunięciu pełnych obrotów
//   //      aby kolejny obrót nie cofał się tylko koło było kręcone w jedną stronę
//   //      z w miarę jednolitą siłą
//   //      Całość wykonujemy tylko i wyłącznie po wykonaniu animacji kręcenia z lekkim zapasem czasu.
//   await setTimeout(() => {
//       wheel.classList.remove('pointerTransition');
//       wheel.style.transform = `rotate(-${spinToSave}deg)`;
//   }, 3500);
// });

export default class Wheel {
  constructor() {
    this.prizes = [ -1, 250, 150, 300, 500, 200, 0, 75, -1, 1000, 200, 150, 750, 400, 100, 1500];
  }

  randomSpinValue() {
      // 1. Wylosuj losowa liczbę od 3 do 6 mówiącą o ilości obiegów 360°
    const rotationNum = Math.floor(Math.random() * 4) + 3;

    // 2. Wylosuj liczbę od 260-360 mówiącą o ilości stopni obrotu
    const spinValue = Math.floor(Math.random() * 100) + 260;

    // 3. Pomnóż dwie wcześniejsze liczby aby otrzymać wartość obrotu
    const rotationValue = rotationNum * spinValue;
    return rotationValue;
  }

  calculateMinSpinValue(actualSpin) {
    let tmp = actualSpin;
    let spinToSave = 0;
    while(true) {
        tmp -= 360;
        if(tmp > 0) spinToSave = tmp; else break;
    }
    return spinToSave;
  }

  getReward(index) {
    return this.prizes[index];
  }
}
