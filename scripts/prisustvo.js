var podaci = {
  "studenti": [{
     "ime": "Emin Džanko",
     "index": 18763
   },
   {
     "ime": "Lea Jesenković",
     "index": 18680
   },
   {
     "ime": "Benjamin Ažman",
     "index": 18789
   }
 ],
 "prisustva": [{
     "sedmica": 1,
     "predavanja": 2,
     "vjezbe": 1,
     "index": 18763
   },
   {
     "sedmica": 1,
     "predavanja": 0,
     "vjezbe": 2,
     "index": 18680
   },
   {
       "sedmica": 1,
       "predavanja": 2,
       "vjezbe": 2,
       "index": 18789
     },
   {
     "sedmica": 2,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18763
   },
   {
     "sedmica": 2,
     "predavanja": 1,
     "vjezbe": 0,
     "index": 18680
   },
   {
     "sedmica": 2,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18789
   },
   {
     "sedmica": 3,
     "predavanja": 2,
     "vjezbe": 2,
     "index": 18763
   },
   {
     "sedmica": 3,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18680
   },
   {
     "sedmica": 3,
     "predavanja": 2,
     "vjezbe": 1,
     "index": 18789
   },
   {
     "sedmica": 4,
     "predavanja": 2,
     "vjezbe": 1,
     "index": 18763
   },
   {
     "sedmica": 4,
     "predavanja": 2,
     "vjezbe": 1,
     "index": 18680
   },
   {
     "sedmica": 4,
     "predavanja": 2,
     "vjezbe": 1,
     "index": 18789
   },
   {
     "sedmica": 5,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18763
   },
   {
     "sedmica": 5,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18680
   },
   {
     "sedmica": 5,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18789
   },
   {
     "sedmica": 6,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18763
   },
   {
     "sedmica": 6,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18680
   },
   {
     "sedmica": 6,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18789
   },
   {
     "sedmica": 7,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18763
   },
   {
     "sedmica": 7,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18680
   },
   {
     "sedmica": 7,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18789
   },
   {
     "sedmica": 8,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18763
   },
   {
     "sedmica": 8,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18680
   },
   {
     "sedmica": 8,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18789
   },
   {
     "sedmica": 9,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18763
   },
   {
     "sedmica": 9,
     "predavanja": 1,
     "vjezbe": 0,
     "index": 18680
   },
   {
     "sedmica": 9,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18789
   },
   {
     "sedmica": 10,
     "predavanja": 3,
     "vjezbe": 0,
     "index": 18763
   },
   {
     "sedmica": 10,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18680
   },
   {
     "sedmica": 10,
     "predavanja": 0,
     "vjezbe": 0,
     "index": 18789
   },
   {
     "sedmica": 11,
     "predavanja": 3,
     "vjezbe": 0,
     "index": 18763
   },
   {
     "sedmica": 11,
     "predavanja": 2,
     "vjezbe": 0,
     "index": 18680
   },
   {
     "sedmica": 11,
     "predavanja": 1,
     "vjezbe": 0,
     "index": 18789
   }
 ],
 "predmet": "Algoritmi i strukture podataka",
 "brojPredavanjaSedmicno": 3,
 "brojVjezbiSedmicno": 2
};


let div = document.getElementById("divSadrzaj");

let prisustvo = TabelaPrisustvo(div, podaci=podaci);

//let prisustvo = TabelaPrisustvo(div, {studenti: [{ime:"Neko",index:12345}], prisustva:[{sedmica:1,predavanja:1,vjezbe:1,index:12345}], predmet:"WT", brojPredavanjaSedmicno:3, brojVjezbiSedmicno:2});


prisustvo.sljedecaSedmica();
prisustvo.prethodnaSedmica();
