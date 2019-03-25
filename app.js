document.querySelector('.spin-btn').addEventListener('click', () => {
    const wheel = document.querySelector('.wheelImg');
    // 0. Pobierz wartość data-set o stopniach o ile koło powinno się obrócić
    const lastSpin = wheel.dataset.lastSpin;
    console.log(lastSpin);

    // 1. Wylosuj losowa liczbę od 3 do 6 mówiącą o ilości obiegów 360°
    const rotationNum = Math.floor(Math.random() * 4) + 3;

    // 2. Wylosuj liczbę od 260-360 mówiącą o ilości stopni obrotu
    const spinValue = Math.floor(Math.random() * 100) + 260;

    // 3. Pomnóż dwie wcześniejsze liczby 
    const rotationValue = rotationNum * spinValue;

    // 4. Usuń wielokrotność 360 oraz zapisz do data-set
    let multiple = rotationValue;
    let spinToSave = 0;
    while(true) {
        multiple -= 360;
        if(multiple > 0) spinToSave = multiple; else break;
    }  

    wheel.dataset.lastSpin = spinToSave;

    // 5. Obróc koło o wartość data-set natychmiast
    wheel.style.transform = `rotate(${lastSpin}deg)`;

    // 6. Obróć koło o wylosowaną nową wartość w czasie oraz dodaj animacje
    wheel.classList.add('pointerTransition');
    wheel.style.transform = `rotate(${rotationValue}deg)`;


});