var exports = module.exports = {};

function createChallenges(categories){
  // get lookup
  var categoryIdLookup = createLookupFromCategories(categories);

  // deep copy of challenges
  var challengesWithCategory = JSON.parse(JSON.stringify(challenges));

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

var veggieRestaurant = {
  title: "Veggie restaurant",
  description: 'Ga vandaag eens naar een vegetarisch restaurant. Bestel vegetarische gerechten.  <br/><br/><b>Tip:</b> je kan een restaurant in de buurt vinden op <a href=”http://www.evavzw.be/resto”>www.evavzw.be/resto</a>',
  category: "restaurant",
  difficulty: 2
};

var challenges = [
  // DAG 18
  {
    title: "Donderdag veggiedag!",
    description: 'Vandaag is het donderdag. Dat wil zeggen: donderdag veggiedag!  <br/>Doe mee met de community en eet vandaag geen vlees of vis. <br/><br/>Lees meer over donderdag-veggiedag op <a href=”http://www.donderdagveggiedag.be”>www.donderdagveggiedag.be</a>',
    category: "social",
    difficulty: 2
  },
  {
    title: "Appeltaartsmoothie",
    description: 'Dit is een overheerlijke snack als vieruurtje of snack en is ook nog eens eenvoudig te bereiden.  <br/> <br/><b>Ingrediënten voor 2 personen:</b> <br/>125 g yofu (vanille) <br/>1 rode appel (in stukjes) <br/>1 el appelmoes <br/>120 ml sojamelk <br/>1 el amandelpasta <br/>1 el ahornsiroop <br/>1 el agavesiroop <br/>0,5 tl kaneel <br/>1 el granola (of speculooskruimels) <br/><br/><b>Bereiding:</b> <br/>Doe alle ingrediënten, behalve de granola, in een blender en mix. Garneer met granola. <br/><br/><a href=”http://www.evavzw.be/recept/appeltaartsmoothie”>(bron)</a>',
    category: "snack",
    difficulty: 2
  },
  veggieRestaurant,

  // DAG 19
  {
    title: "Vervang melk",
    description: 'Vervang vandaag de melk of yogurt door een alternatief. Probeer eens iets nieuws en kijk wat je lekker vindt.  <br/><br/>Mogelijke alternatieven voor melk zijn: rijstmelk, sojamelk, amandelmelk, kokosmelk, havermelk, speltmelk, hazelnootmelk, hennepmelk, quionamelk, …<br/>Mogelijke alternatieven voor yoghurt zijn sojayoghurt, kokosyoghurt, …',
    category: "breakfast",
    difficulty: 2
  },
  {
    title: "Lasagne",
    description: 'Lasagne met spinazie, champignons en tomaten is de ultieme comford food die iedereen aan tafel gelukkig maakt.  Serveer de lasagne met een groene salade. \n<b>Ingrediënten voor 8 personen:</b> <br/>6 el plantaardige olie<br/>2 uien (fijngehakt)<br/>340 g champignons (in schijfjes)<br/>700 g verse spinazie (gewassen)<br/>zout & peper<br/>nootmuskaat<br/>4 teentjes knoflook<br/>3 el tomatenpuree<br/>1.2 kg gehakte tomaten (uit blik)<br/>55 g tarwebloem<br/>1 l ongezoete sojamelk<br/>20 - 24 lasagnevel<br/>1 tl italiaanse kruiden<br/>1 tl paprikapoeder<br/>4 el paneermeel<br/>2 el olijfolie<br/>een handje pijnboompitten<br/><br/><b>Bereiding:</b> <br/>Verwarm de oven voor op 200° C.<br/><br/>Verhit twee eetlepels olie in een grote kookpot. Voeg de ui en champignons toe en roerbak gedurende vijf minuten, tot de ui glazig is. Voeg de spinazie toe en laat deze al omscheppend slinken. Kruid naar smaak met zout, peper en Italiaanse kruiden.<br/><br/>Verhit opnieuw 2 eetlepels olie in een kookpot. Voeg de knoflook toe en stoof deze kort aan (let op dat ze niet vebrand). Voeg de tomaten en de tomatenpuree toe en laat 10 minuutjes zachtjes sudderen tot de saus is ingedikt.<br/><br/>Leg een laagje pasta in een ingevette ovenschaal.<br/><br/>Voeg de helft van de tomatensaus en van de spinazievulling toe.<br/><br/>Herhaal en eindig met een laagje pasta.<br/><br/>Maak nu de béchamelsaus. Verhit de resterende olie en voeg de bloem toe. Meng goed en laat onder voortdurend roeren een minuutje bakken, tot je een lichte biscuitgeur ruikt. Voeg nu de (soja)melk onder voortdurend roeren geleidelijk toe en blijf roeren tot de saus bindt. Als de saus te dik wordt, dan kan je een extra geutje sojamelk toevoegen. Kruid de saus nu af met peper, zout, nootmuskaat en basilicum. Giet de saus over de lasagne.<br/><br/>Verdeel over de lasagne hun het paneermeel en de pijnboompitjes en besprenkel lichtjjes met de olijfolie voordat je ze in de oven schuift.<br/><br/>Bak gedurende 35-40 minuten tot de bovenkant bruin is.<br/><br/><b>Tip:</b> Moet het even wat sneller gaan? Gebruik dan kant en klare tomatensaus.<br/><br/><b>Tip:</b> Wij werken deze lasagne af met pijnboompitjes, maar je kan er ook notenparmesaan overheen strooien of kant en klare plantaardige kaas gebruiken. Deze laatste vind je de betere biowinkels of in speciaalzaken.<br/><br/><a href=”http://www.evavzw.be/recept/lasagne-met-spinazie-champignons-en-tomaten”>(bron)</a>',
    category: "dinner",
    difficulty: 2
  },
  {
    title: "Samen uit eten",
    description: 'Ga vandaag met vrienden naar een vegetarisch restaurant. Bestel enkel vegetarische gerechten.  <br/><br/><b>Tip:</b> je kan een restaurant in de buurt vinden op <a href=”http://www.evavzw.be/resto”>www.evavzw.be/resto</a>',
    category: "social",
    difficulty: 2
  },
  // DAG 20
  {
    title: "Vegetarisch diner",
    description: 'Nodig vandaag iemand uit voor een vegetarisch diner. Zorg voor een vegetarische aperitief en nagerecht.  <br/><br/><b>Tip:</b> je kan inspiratie opdoen op <a href=”http://www.evavzw.be/zelf-koken:>www.evavzw.be/zelf-koken</a>',
    category: "social",
    difficulty: 2
  },
  veggieRestaurant,
  {
    title: "Tofu Energie Smoothie",
    description: 'Bereid vandaag de Tofu Energie Smoothie. Dit is een overheerlijke snack als vieruurtje of snack en is ook nog eens eenvoudig te bereiden.  <br/><b>Ingrediënten voor 3 personen:</b> <br/>0.5 Kopje(s) tofu <br/>5 stuk(s) ananas schijven (vers of blik) <br/>125 mL kokosmelk <br/>2 dL soja yoghurt <br/>1 eetlepel (s) lijnzaad <br/>1 handvol (s) ijsbokjes <br/><br/><b>Bereiding:</b> <br/>Alle ingrediënten in uw blender doen en ongeveer een halve minuut laten mixen. <br/><br/><a href=”http://www.blenderworkshop.nl/blender-recepten/blender%20recepten/696-plantaardigetofu-energie-smoothie”>(bron)</a>',
    category: "snack",
    difficulty: 2
  },

  // DAG 21
  {
    title: "Daag vrienden uit",
    description: 'Daag vandaag een vriend(in) uit om de 21-dagen challenge app te voltooien.  <br/><br/>Hulp nodig bij het overtuigen? Kijk eens op <a href=”http://www.evavzw.be/waarom-plantaardig”>www.evavzw.be/waarom-plantaardig</a>',
    category: "social",
    difficulty: 2
  },
  {
    title: "Zebra-ijsjes",
    description: 'Deze super vrolijke zebra-ijsjes zijn eenvoudig gemaakt, je moet alleen even geduld hebben tot alles goed bevroren is.  <br/><b>Ingrediënten voor 6 personen:</b> <br/>60 g blauwe bosbessen <br/>100 ml sojamelk (of een andere plantaardige melk naar smaak) <br/>1,5 el agavestroop <br/>voor het sojayoghurtijs <br/>160 ml (soja)yoghurt natuur <br/>1 vanillestokje <br/>2 el agavestroop <br/>1/2 tl oranjebloesemwater <br/><br/><b>Bereiding:</b> <br/>Mix de bosbessen fijn met de (soja)melk en de agavestroop. Verdeel de helft van dit mengsel over de ijsvormpjes en zet ze een uur in de diepvries. <br/><br/>Meng ondertussen de (soja)yoghurt, het merg uit het vanillestokje, de agavestroop en het oranjebloesemwater goed door elkaar. Giet de helft van het mengsel in de vormpjes bovenop het bosbessenmengsel. Zet de stokjes in de vormpjes en zet ze opnieuw een uur in de diepvriezer. <br/><br/>Verdeel de andere helft van het bosbessenmengsel over de vormpjes, zet opnieuw een uur in de diepvriezer en doe hetzelfde met het resterende (soja)yoghurtmengsel. Laat de ijsjes minimum twee uur opstijven in de diepvries. Houd de vormpjes onder lauw water en haal de lolly’s eruit. <br/><br/><a href=”http://www.blenderworkshop.nl/blender-recepten/blender%20recepten/696-plantaardigetofu-energie-smoothie”>(bron)</a>',
    category: "snack",
    difficulty: 2
  },
  {
    title: "Vol-au-Veggie",
    description: 'Maak vol-au-vent met tofu en sojabrokken.  <br/><br/><b>Ingrediënten voor 8 personen:</b> <br/>300 g tofu<br/>100 g sojabrokken<br/>250 g champignons (in plakjes)<br/>500 ml ongezoete sojamelk<br/>50 g sojaboter<br/>50 g tarwebloem<br/>flink wat citroensap (naar smaak)<br/>verse peterselie (fijngehakt)<br/>nootmuskaat<br/>groentebouillon<br/>zout & peper<br/>olijfolie<br/><br/><b>Bereiding:</b><br/>Verwarm de oven voor op 180°C.<br/><br/>Snijd de tofu in blokjes, leg ze op een bakplaat, kruid ze met flink wat zout en sprenkel er royaal olijfolie over. Bak de tofublokjes in de oven tot ze goudbruin en krokant zijn.<br/><br/>Kook de sojabrokjes even in groentebouillon.<br/><br/>Bak de champignonschijfjes in een pan tot ze mooi bruin kleuren.<br/><br/>Maak vervolgens een bechamelsaus met de sojaboter, bloem en sojamelk. Voeg er eventueel nog een beetje groentebouillon aan toe (je kan de groentebouillon gebruiken waar de sojabrokjes in hebben gekookt). Voeg flink wat citroensap toe aan de saus en breng verder op smaak met peper, zout en nootmuskaat.<br/><br/>Meng tenslotte de gebakken tofublokjes, de gekookte sojabrokjes en de gebakken champignonschijfjes door de saus. Meng er flink wat verse gehakte peterselie onder.<br/><br/><b>Tip:</b> Sojabrokjes vind je in de natuurvoedingswinkel. Je kunt ze gerust weglaten of vervangen door ChickPieces naturel of quornblokjes.<br/><br/><b>Tip:</b> Om dit gerecht helemaal af te maken kan je ook zelf plantaardige videetjes maken! Neem daarvoor een groot vel bladerdeeg en steek er met een glas vier rondjes uit. Steek vervolgens nog 12 rondjes uit, waarin je in het midden een kleiner rondje uitsteekt, zodat je ringen krijgt. Bestrijk elk rondje met sojamelk en leg er een ring bladerdeeg op. Bestrijk weer met sojamelk en leg er weer een ring bladerdeeg op. Herhaal nog eens en bestrijk de bovenkant met sojamelk.Bak deze zelfgemaakte videetjes ongeveer 20 à 25 minuten in een voorverwarmde oven op 180°C. Als ze klaar zijn kun je het hoedje eraf snijden en kan je ze opvullen met heerlijke vol-au-tofu!<br/><br/><a href=”http://www.evavzw.be/recept/vol-au-veggie”>(bron)</a>',
    category: "dinner",
    difficulty: 2
  },
];

//console.log("challenges.length: "+challenges.length);
//for (var i = 0; i < challenges.length; i++){
//  if(i%3==0) {console.log("---");}
//  console.log(challenges[i].category + '\t\t\t'+challenges[i].title);
//}
//console.log("Categories: ");
//console.log(createCategories());

exports.challengesAmount = challenges.length;
exports.createCategories = createCategories;
exports.createChallenges = createChallenges;