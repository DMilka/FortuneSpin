import axios from 'axios';
import translate from 'translate';
import { apiWordKey, apiTranslateKey } from '../config.js';

export default class Password {
  constructor() {
    this.resolvedPass = [];
    this.gamePass = [];
  }

  async getPasswords() {
    try {
        const res = await axios(`---https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&excludePartOfSpeech=interjection%2Cabbreviation%2C%20affix%2Cauxiliary-verb%2Cfamily-name%2Cgiven-name%2Cidiom%2Cimperative&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=10&maxLength=15&limit=12&api_key=${apiWordKey}`);
        this.passwords = res.data;
        // console.log(this.passwords);

        this.translatedPass =  this.passwords.map( async (x) => {
          return await translate(x.word, { to: 'pl', engine: 'google', key: `${apiTranslateKey}` });
        });

         for(let i = 0; i < this.translatedPass.length; i++) {
          this.resolvedPass.push(await this.translatedPass[i].then( x => {
            return x;
          }));
        }
        // console.log(this.resolvedPass);

        let counter = 0;
        for(let i = 0; i < this.translatedPass.length; i++) {
          if(this.translatedPass[i] != this.resolvedPass[i]) {

            this.gamePass.push(this.resolvedPass[i]);
            counter++;
          }
          if(counter === 3) break;
        }
        console.log(this.gamePass);

        // for(let i = 0; i < this.gamePass.length; i++) {
        //   localStorage.setItem(`gamePass${i}`, this.gamePass[i]);
        // }


    } catch (error) {
      this.gamePass = ['BIOFARMACEUTA', 'ANALOGICZNY', 'MONUMENT'];
      // for(let i = 0; i < this.gamePass; i++) {
      //     localStorage.setItem(`gamePass${i}`, this.gamePass[i]);
      //   }


        console.log(error);
    }

    // console.log(this.gamePass);

    for(let i =0; i < this.gamePass.length; i++) {
      await localStorage.setItem(`gamePass${i}`, this.gamePass[i].toUpperCase());
    }

    // const passwordsForGame = new Array();
    // for(let i =0; i < this.gamePass.length; i++) {
    //   // console.log(localStorage.getItem(`gamePass${i}`));
    //   await passwordsForGame.push(localStorage.getItem(`gamePass${i}`).toUpperCase());
    //   await localStorage.removeItem(`gamePass${i}`);
    // }
  }

}