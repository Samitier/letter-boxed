import { defineStore } from "pinia";

enum GameState {
  Lost,
  Won,
  Playing,
}

export const useGameStore = defineStore("game", {
  state: () => ({
    letters: [] as string[][],
    possibleWords: [] as string[],
    gameState: GameState.Playing,
    playedWords: [] as string[],
    currentWord: [] as string[],
  }),
  actions: {
    initPuzzle() {
      const { letters, possibleWords } = JSON.parse(
        `{"letters":[["q","g","r"],["a","p","z"],["n","d","c"],["o","y","k"]],"solvableIn":0,"possibleWords":["acan","acana","acanada","acanador","acanadora","acanar","acanara","acanaran","acano","acanon","acanona","acanonada","acanonar","acanonara","acanonaran","acanono","acany","acanya","acanyada","acanyar","acanyara","acanyaran","acar","acara","acarada","acarar","acarara","acararan","acarcany","acarcanya","acarcanyada","acarcanyar","acarcanyara","acarcanyaran","acaro","acaron","acarona","acaronada","acaronador","acaronadora","acaronar","acaronara","acaronaran","acarono","acarp","acocon","acocona","acoconada","acoconar","acoconara","acoconaran","acocono","acop","acopo","acor","acora","acorada","acorador","acoradora","acorar","acorara","acoraran","acorcon","acorcona","acorconada","acorconar","acorconara","acorconaran","acorcono","acord","acorda","acordada","acordador","acordar","acordara","acordaran","acordo","acordon","acordona","acordonada","acordonadora","acordonar","acordonara","acordonaran","acordono","acornada","acoro","acro","acrocarp","acrozona","adar","adon","adona","adonada","adonar","adonara","adonaran","adono","ador","adora","adorada","adorador","adoradora","adorar","adorara","adoraran","adorn","adorna","adornada","adornador","adornadora","adornar","adornara","adornaran","adorno","adoro","aganada","agar","agnada","anacard","anada","anador","anadora","anar","anara","anarca","anarco","angora","anoa","anorac","anorc","anorca","any","anyada","ara","arada","aranya","arc","arca","arcada","arcana","arcar","arcara","arcaran","arco","ardada","ardor","arn","arna","arnada","arnar","arnara","arnaran","arno","arp","arpo","arpon","arpona","arponada","arponar","arponara","arponaran","arpono","ca","caca","cacaracac","cada","cadagang","cadarn","cag","caga","cagada","cagador","cagadora","cagar","cagara","cagarada","cagaran","cago","cagona","cana","canac","canaca","canada","canador","canana","canar","canard","canoa","canoard","canoarda","canoca","canon","canona","canonada","canonar","canonara","canonaran","canono","canor","canora","canya","canyada","canyar","car","cara","carada","caragana","caranya","carca","carcanada","card","carda","cardada","cardador","cardadora","cardar","cardara","cardaran","cardo","carn","carnada","caro","carona","caror","carp","coa","coana","coanada","coc","coca","coco","coconada","coda","codony","codonya","codonyar","coga","cognada","con","conga","conr","conra","conrada","conrador","conradora","conrar","conrara","conraran","conro","cony","conya","conyac","cop","copo","copra","cor","cora","corada","corc","corca","corcada","corcar","corcara","corcaran","corco","corcon","corcona","corconada","corconar","corconara","corconaran","corcono","corcorc","corcorca","corcorcada","corcorcar","corcorcara","corcorcaran","corcorco","cord","corda","cordada","cordar","cordara","cordaran","cordo","cordonada","corn","corna","cornac","cornada","cornar","cornara","cornaran","corno","coron","corona","coronada","coronar","coronara","coronaran","corono","corp","crac","cran","crana","cranada","cranar","cranara","cranaran","crano","croada","croc","croca","cron","crono","cronozona","da","dada","dador","dadora","daga","dan","dany","danya","danyada","danyar","danyara","danyaran","dao","dar","dara","daran","dard","darda","dardada","dardar","dardara","dardaran","dardo","dg","do","doc","dodo","dog","doga","dogon","don","dona","donada","donador","donadora","donar","donara","donaran","donarda","dong","dono","dop","dopo","dorada","dorc","dorca","dr","dra","drac","drag","draga","dragada","dragador","dragadora","dragar","dragara","dragaran","drago","dragona","dragonada","drang","drog","droga","drogada","drogar","drogara","drogaran","drogo","dron","drop","dropo","gadagang","gag","gana","ganga","gany","ganya","ganyada","ganyar","ganyara","ganyaran","gardana","goa","goda","gona","gong","gonococ","gord","gorda","kg","na","nacra","nacrada","nad","nada","nadada","nadador","nadadora","nadar","nadara","nadaran","nado","nagana","nan","nana","nano","narco","nard","no","noc","noca","nocada","nocar","nocara","nocaran","noco","noga","nogada","nona","nonada","nonana","nora","nord","nyac","nyaca","nyacada","nyacar","nyacara","nyacaran","nyaco","nyag","nyaga","nyagada","nyagar","nyagara","nyagaran","nyago","oc","oca","oda","odor","odora","odorada","odorar","odorara","odoraran","odoro","on","ona","onada","or","ora","orada","orador","oradora","orango","orar","orara","oraran","orc","orca","orn","orna","ornada","ornar","ornara","ornaran","orno","oro","pg","pn","poa","poada","poador","poadora","poar","poara","poaran","poc","poca","pod","poda","podada","podador","podadora","podar","podara","podaran","podo","podocarp","podran","pon","ponga","ponor","pop","popo","por","porada","porc","porca","porcada","porcar","porcara","porcaran","porco","porcona","porno","porpra","porprada","prada","pro","proa","procarp","pron","prona","pronador","pronadora","prop","rac","raca","raconada","rad","rada","radar","raga","ran","rang","ranya","raon","raona","raonada","raonador","raonadora","raonar","raonara","raonaran","raono","raor","rar","rara","rda","ro","roc","roca","rocada","rock","rod","roda","rodada","rodador","rodadora","rodar","rodara","rodaran","rodo","rodona","rodorar","rony","ronya","ronyac","ronyada","ronyar","ronyara","ronyaran","zona"]}`
      );
      this.letters = letters;
      this.possibleWords = possibleWords;
    },
    addLetter(letter: string) {
      const currentSide = this.letters.findIndex((side) =>
        side.includes(letter)
      );
      const isCorrect =
        !this.currentWord.length ||
        !this.letters[currentSide].includes(
          this.currentWord[this.currentWord.length - 1]
        );
      if (!isCorrect) return;
      this.currentWord.push(letter);
    },
    removeLastLetter() {
      this.currentWord.pop();
    },
    playWord() {
      if (this.possibleWords.includes(this.currentWordAsString)) {
        this.playedWords.push(this.currentWordAsString);
        this.currentWord = [];
      }
    },
  },
  getters: {
    currentWordAsString() {
      return this.currentWord.join("");
    },
    playedLetters() {
      return new Set([
        ...this.currentWord,
        ...this.playedWords.reduce(
          (prev, curr) => [...prev, ...curr.split("")],
          []
        ),
      ]);
    },
  },
});
