var exports = module.exports = {};

function createChallenges(categories){
  // get lookup
  var categoryIdLookup = createLookupFromCategories(categories);

  // shallow copy of challenges
  var challengesWithCategory = challenges.slice(0);

  for( var i = 0; i < challengesWithCategory.length; i++) {
    var categoryName = challengesWithCategory[i].category;
    var categoryId = categoryIdLookup[categoryName];
    challengesWithCategory[i].category = categoryId;
  }
  return challengesWithCategory;
}

Array.prototype.getUnique = function(){
  var u = {}, a = [];
  for(var i = 0, l = this.length; i < l; ++i){
    if(u.hasOwnProperty(this[i])) {
      continue;
    }
    a.push(this[i]);
    u[this[i]] = 1;
  }
  return a;
};

function createCategories(){
  var categories = [];
  for (var i = 0; i < challenges.length; i++){
    categories.push(challenges[i].category);
  }
  return categories.getUnique();
}

function createLookupFromCategories(categories){
  var categoryName_categoryId_dictionary = [];
  for(var i = 0; i < categories.length; i++){
    categoryName_categoryId_dictionary[categories[i].name] = categories[i]._id;
  }
  return categoryName_categoryId_dictionary;
}

var challenges = [
  // DAG 18
  {
    title: "Donderdag veggiedag!",
    description: 'Vandaag is het donderdag. Dat wil zeggen: donderdag veggiedag!  \\nDoe mee met de community en eet vandaag geen vlees of vis. \\n\\nLees meer over donderdag-veggiedag op <a href=”http://www.donderdagveggiedag.be”>www.donderdagveggiedag.be</a>',
    category: "social",
    difficulty: 2
  },
  {
    title: "Appeltaartsmoothie",
    description: 'Bereid vandaag een appeltaartsmoothie. Dit is een overheerlijke snack als vieruurtje of snack en is ook nog eens eenvoudig te bereiden.  \\n \\n<b>Ingrediënten voor 2 personen:</b> \\n125 g yofu (vanille) \\n1 rode appel (in stukjes) \\n1 el appelmoes \\n120 ml sojamelk \\n1 el amandelpasta \\n1 el ahornsiroop \\n1 el agavesiroop \\n0,5 tl kaneel \\n1 el granola (of speculooskruimels) \\n\\n<b>Bereiding:</b> \\nDoe alle ingrediënten, behalve de granola, in een blender en mix. Garneer met granola. \\n\\n<a href=”http://www.evavzw.be/recept/appeltaartsmoothie”>(bron)</a>',
    category: "snack",
    difficulty: 2
  },
  {
    title: "Uit eten",
    description: 'Ga vandaag eens naar een vegetarisch restaurant. Bestel vegetarische gerechten.  \\n\\n<b>Tip:</b> je kan een restaurant in de buurt vinden op <a href=”http://www.evavzw.be/resto”>www.evavzw.be/resto</a>',
    category: "restaurant",
    difficulty: 2
  },

  // DAG 19
  {
    title: "Vervang melk of yoghurt",
    description: 'Vervang vandaag de melk of yogurt door een alternatief. Probeer eens iets nieuws en kijk wat je lekker vindt.\\n\\nMogelijke alternatieven voor melk zijn: rijstmelk, sojamelk, amandelmelk, kokosmelk, havermelk, speltmelk, hazelnootmelk, hennepmelk, quionamelk, …\\nMogelijke alternatieven voor yoghurt zijn sojayoghurt, kokosyoghurt, …',
    category: "breakfast",
    difficulty: 2
  },
  {
    title: "Lasagne",
    description: 'Lasagne met spinazie, champignons en tomaten is de ultieme comford food die iedereen aan tafel gelukkig maakt. Serveer de lasagne met een groene salade.  \n<b>Ingrediënten voor 8 personen:</b> \\n6 el plantaardige olie\\n2 uien (fijngehakt)\\n340 g champignons (in schijfjes)\\n700 g verse spinazie (gewassen)\\nzout & peper\\nnootmuskaat\\n4 teentjes knoflook\\n3 el tomatenpuree\\n1.2 kg gehakte tomaten (uit blik)\\n55 g tarwebloem\\n1 l ongezoete sojamelk\\n20 - 24 lasagnevel\\n1 tl italiaanse kruiden\\n1 tl paprikapoeder\\n4 el paneermeel\\n2 el olijfolie\\neen handje pijnboompitten\\n\\n<b>Bereiding:</b> \\nVerwarm de oven voor op 200° C.\\n\\nVerhit twee eetlepels olie in een grote kookpot. Voeg de ui en champignons toe en roerbak gedurende vijf minuten, tot de ui glazig is. Voeg de spinazie toe en laat deze al omscheppend slinken. Kruid naar smaak met zout, peper en Italiaanse kruiden.\\n\\nVerhit opnieuw 2 eetlepels olie in een kookpot. Voeg de knoflook toe en stoof deze kort aan (let op dat ze niet vebrand). Voeg de tomaten en de tomatenpuree toe en laat 10 minuutjes zachtjes sudderen tot de saus is ingedikt.\\n\\nLeg een laagje pasta in een ingevette ovenschaal.\\n\\nVoeg de helft van de tomatensaus en van de spinazievulling toe.\\n\\nHerhaal en eindig met een laagje pasta.\\n\\nMaak nu de béchamelsaus. Verhit de resterende olie en voeg de bloem toe. Meng goed en laat onder voortdurend roeren een minuutje bakken, tot je een lichte biscuitgeur ruikt. Voeg nu de (soja)melk onder voortdurend roeren geleidelijk toe en blijf roeren tot de saus bindt. Als de saus te dik wordt, dan kan je een extra geutje sojamelk toevoegen. Kruid de saus nu af met peper, zout, nootmuskaat en basilicum. Giet de saus over de lasagne.\\n\\nVerdeel over de lasagne hun het paneermeel en de pijnboompitjes en besprenkel lichtjjes met de olijfolie voordat je ze in de oven schuift.\\n\\nBak gedurende 35-40 minuten tot de bovenkant bruin is.\\n\\n<b>Tip:</b> Moet het even wat sneller gaan? Gebruik dan kant en klare tomatensaus.\\n\\n<b>Tip:</b> Wij werken deze lasagne af met pijnboompitjes, maar je kan er ook notenparmesaan overheen strooien of kant en klare plantaardige kaas gebruiken. Deze laatste vind je de betere biowinkels of in speciaalzaken.\\n\\n<a href=”http://www.evavzw.be/recept/lasagne-met-spinazie-champignons-en-tomaten”>(bron)</a>',
    category: "dinner",
    difficulty: 2
  },
  {
    title: "Samen uit eten",
    description: 'Ga vandaag met vrienden naar een vegetarisch restaurant. Bestel enkel vegetarische gerechten.  \\n\\n<b>Tip:</b> je kan een restaurant in de buurt vinden op <a href=”http://www.evavzw.be/resto”>www.evavzw.be/resto</a>',
    category: "social",
    difficulty: 2
  },
  // DAG 20
  {
    title: "Vegetarisch diner",
    description: 'Nodig vandaag iemand uit voor een vegetarisch diner. Zorg voor een vegetarische aperitief en nagerecht.  \\n\\n<b>Tip:</b> je kan inspiratie opdoen op <a href=”http://www.evavzw.be/zelf-koken:>www.evavzw.be/zelf-koken</a>',
    category: "social",
    difficulty: 2
  },
  {
    title: "Uit eten",
    description: 'Ga vandaag eens naar een vegetarisch restaurant. Bestel vegetarische gerechten.  \\n\\n<b>Tip:</b> je kan een restaurant in de buurt vinden op <a href=”http://www.evavzw.be/resto”>www.evavzw.be/resto</a>',
    category: "restaurant",
    difficulty: 2
  },
  {
    title: "Tofu Energie Smoothie",
    description: 'Bereid vandaag de Tofu Energie Smoothie. Dit is een overheerlijke snack als vieruurtje of snack en is ook nog eens eenvoudig te bereiden.  \\n<b>Ingrediënten voor 3 personen:</b> \\n0.5 Kopje(s) tofu \\n5 stuk(s) ananas schijven (vers of blik) \\n125 mL kokosmelk \\n2 dL soja yoghurt \\n1 eetlepel (s) lijnzaad \\n1 handvol (s) ijsbokjes \\n\\n<b>Bereiding:</b> \\nAlle ingrediënten in uw blender doen en ongeveer een halve minuut laten mixen. \\n\\n<a href=”http://www.blenderworkshop.nl/blender-recepten/blender%20recepten/696-plantaardigetofu-energie-smoothie”>(bron)</a>',
    category: "snack",
    difficulty: 2
  },

  // DAG 21
  {
    title: "Daag vrienden uit",
    description: 'Daag vandaag een vriend(in) uit om de 21-dagen challenge app te voltooien.  \\n\\nHulp nodig bij het overtuigen? Kijk eens op <a href=”http://www.evavzw.be/waarom-plantaardig”>www.evavzw.be/waarom-plantaardig</a>',
    category: "social",
    difficulty: 2
  },
  {
    title: "Zebra-ijsjes",
    description: 'Deze super vrolijke zebra-ijsjes zijn eenvoudig gemaakt, je moet alleen even geduld hebben tot alles goed bevroren is.  \\n<b>Ingrediënten voor 6 personen:</b> \\n60 g blauwe bosbessen \\n100 ml sojamelk (of een andere plantaardige melk naar smaak) \\n1,5 el agavestroop \\nvoor het sojayoghurtijs \\n160 ml (soja)yoghurt natuur \\n1 vanillestokje \\n2 el agavestroop \\n1/2 tl oranjebloesemwater \\n\\n<b>Bereiding:</b> \\nMix de bosbessen fijn met de (soja)melk en de agavestroop. Verdeel de helft van dit mengsel over de ijsvormpjes en zet ze een uur in de diepvries. \\n\\nMeng ondertussen de (soja)yoghurt, het merg uit het vanillestokje, de agavestroop en het oranjebloesemwater goed door elkaar. Giet de helft van het mengsel in de vormpjes bovenop het bosbessenmengsel. Zet de stokjes in de vormpjes en zet ze opnieuw een uur in de diepvriezer. \\n\\nVerdeel de andere helft van het bosbessenmengsel over de vormpjes, zet opnieuw een uur in de diepvriezer en doe hetzelfde met het resterende (soja)yoghurtmengsel. Laat de ijsjes minimum twee uur opstijven in de diepvries. Houd de vormpjes onder lauw water en haal de lolly’s eruit. \\n\\n<a href=”http://www.blenderworkshop.nl/blender-recepten/blender%20recepten/696-plantaardigetofu-energie-smoothie”>(bron)</a>',
    category: "snack",
    difficulty: 2
  },
  {
    title: "Vol-au-Veggie",
    description: 'Maak vol-au-vent met tofu en sojabrokken.  \\n\\n<b>Ingrediënten voor 8 personen:</b> \\n300 g tofu\\n100 g sojabrokken\\n250 g champignons (in plakjes)\\n500 ml ongezoete sojamelk\\n50 g sojaboter\\n50 g tarwebloem\\nflink wat citroensap (naar smaak)\\nverse peterselie (fijngehakt)\\nnootmuskaat\\ngroentebouillon\\nzout & peper\\nolijfolie\\n\\n<b>Bereiding:</b>\\nVerwarm de oven voor op 180°C.\\n\\nSnijd de tofu in blokjes, leg ze op een bakplaat, kruid ze met flink wat zout en sprenkel er royaal olijfolie over. Bak de tofublokjes in de oven tot ze goudbruin en krokant zijn.\\n\\nKook de sojabrokjes even in groentebouillon.\\n\\nBak de champignonschijfjes in een pan tot ze mooi bruin kleuren.\\n\\nMaak vervolgens een bechamelsaus met de sojaboter, bloem en sojamelk. Voeg er eventueel nog een beetje groentebouillon aan toe (je kan de groentebouillon gebruiken waar de sojabrokjes in hebben gekookt). Voeg flink wat citroensap toe aan de saus en breng verder op smaak met peper, zout en nootmuskaat.\\n\\nMeng tenslotte de gebakken tofublokjes, de gekookte sojabrokjes en de gebakken champignonschijfjes door de saus. Meng er flink wat verse gehakte peterselie onder.\\n\\n<b>Tip:</b> Sojabrokjes vind je in de natuurvoedingswinkel. Je kunt ze gerust weglaten of vervangen door ChickPieces naturel of quornblokjes.\\n\\n<b>Tip:</b> Om dit gerecht helemaal af te maken kan je ook zelf plantaardige videetjes maken! Neem daarvoor een groot vel bladerdeeg en steek er met een glas vier rondjes uit. Steek vervolgens nog 12 rondjes uit, waarin je in het midden een kleiner rondje uitsteekt, zodat je ringen krijgt. Bestrijk elk rondje met sojamelk en leg er een ring bladerdeeg op. Bestrijk weer met sojamelk en leg er weer een ring bladerdeeg op. Herhaal nog eens en bestrijk de bovenkant met sojamelk.Bak deze zelfgemaakte videetjes ongeveer 20 à 25 minuten in een voorverwarmde oven op 180°C. Als ze klaar zijn kun je het hoedje eraf snijden en kan je ze opvullen met heerlijke vol-au-tofu!\\n\\n<a href=”http://www.evavzw.be/recept/vol-au-veggie”>(bron)</a>',
    category: "dinner",
    difficulty: 2
  },
];

//console.log("challenges.length: "+challenges.length);
//for (var i = 0; i < challenges.length; i++){
//  if(i%3==0) {console.log("---");}
//  console.log(challenges[i].category + '\t\t\t'+challenges[i].title);
//}

exports.challengesAmount = challenges.length;
exports.createCategories = createCategories;
exports.createChallenges = createChallenges;