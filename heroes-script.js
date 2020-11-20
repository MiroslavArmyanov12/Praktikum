var heroes;

fetch('./heroes.json').then(function(response) {
  if(response.ok) {
    response.json().then(function(json) {
      heroes = json;
      initialize();
    });
  } else {
    console.log('Заявката за heroes.json не се изпълни. Отговорът е: ' + response.status + ': ' + response.statusText);
  }
});

function initialize() {
  var category = document.querySelector('#category');
  var searchTerm = document.querySelector('#searchTerm');
  var searchBtn = document.getElementById("Filter");
  var main = document.querySelector('main');
  
  var clearBtn =  document.getElementById('Clear');
	
  var choiceOne = document.getElementById("choice1");
  var choiceTwo = document.getElementById("choice2");
  var choiceThree = document.getElementById("choice3");
 
  var i = 0;
  
  var totalDisplayed = 0;
  var totalPower = 0;
  
    var lastCategory = ''; 
	var lastSearch = '';
	
	var categoryGroup;		//съдържат резултатите от филтрирането по категория. FinalGroup ще съдържа всички герои, която трябва да бъдат показани след търсенето
	var finalGroup;
	
	//finalGroup = heroes;    //за да започнем задаваме на FinalGroup, че е равна на цялата база данни и я показваме.
	//updateDisplay();
	
	categoryGroup = [];
	finalGroup = [];
	
	
 searchBtn.onclick = selectCategory;
 clearBtn.onclick = clearAll();
 
 document.getElementById("normalView").style.color='red';			//оцветяваме в червено избрания изглед
 document.getElementById("normalView").style.background='yellow';			//оцветяваме в червено избрания изглед
 
  function selectCategory(e) {
    // Изплозваме preventDefault()за да прекъснем натискането на бутона
    e.preventDefault();

    // Изтриваме предишни търсения
    categoryGroup = [];
    finalGroup = [];

    // Ако търсената дума и категорията съвпадат или последното търсене съвпада с новото, то не се търси нищо
    if(category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
      return;
    } else {
      //ъпдейтваме последната категория или търсена дума
      lastCategory = category.value;
      lastSearch = searchTerm.value.trim();

      if(category.value === 'All') {	//ВСИЧКИ
        categoryGroup = heroes;
        selectHeroes();
      // Ако е посочена определена категория трябва да филтрираме героите, които са извън тази категория
      // после всички оставащи герои влизат в categoryGroup, преди да пуснем
      // selectHeroes()
      } else {

        var lowerCaseType = category.value.toLowerCase();
        for(var i = 0; i < heroes.length ; i++) {
          // Ако фракцията на героя съвпада с търсената категория, то го вкарваме в categoryGroup 
          if(heroes[i].fraction === lowerCaseType) {
            categoryGroup.push(heroes[i]);
          }
        }

        // След като приключим филтрирането пускаме SelectHeroes
        selectHeroes();
      }
    }
  }
  
  // selectHeroes() Взима категорията, която търсим и търси и по ключова дума, ако е зададана такава
  function selectHeroes() {
    // Ако нямаме посочена ключова дума, то finalGroup = categoryGroup
    if(searchTerm.value.trim() === '') {
      finalGroup = categoryGroup;
      updateDisplay();
    } else {
      var lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
      // за всеки герой в categoryGroup, проверяваме дали търсената дума се съдържа в името на героя
      // (Ако резултатът от indexOf() не върне -1, то тогава се съдържа и вкарваме героя във FinalGroup
      for(var i = 0; i < categoryGroup.length ; i++) {
        if(categoryGroup[i].name.indexOf(lowerCaseSearchTerm) !== -1) {
          finalGroup.push(categoryGroup[i]);
        }
      }

      // след като и втората фаза на филтриране е преминала
      updateDisplay();
    }
  }
  

  function updateDisplay() {
    // ако няма намерени резултати
    if(finalGroup.length === 0) {
      var para = document.createElement('p');
      para.textContent = 'No results to display!';
	  para.style.color="yellow";
	  para.style.fontSize = "x-large"
      main.appendChild(para);
    // всеки герой, който ще показваме се праща към fetchBlob()
    } else {
      for(var i = 0; i < finalGroup.length; i++) {
        fetchBlob(finalGroup[i]);
      }
    }
  }
  
  
  function fetchBlob(hero) {
    var url = 'images/' + hero.image;
    fetch(url).then(function(response) {
      if(response.ok) {
        response.blob().then(function(blob) {
          // конвертираме blob в URL
          var objectURL = URL.createObjectURL(blob);
          // викаме showHero
          showHero(objectURL, hero);
        });
      } else {
        console.log('Заявката за изображението на "' + hero.name + '" се провали с отговор: ' + response.status + ': ' + response.statusText);
      }
    });
  }
  
    function clearAll(){
    // премахваме всичко от екрана
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
  }
  
  
  function showHero(objectURL, hero) {
    // създаваме новите елементи, за да покажем героя
    var imagec = document.createElement('img');
    var section = document.createElement('section');
    var heading = document.createElement('h2');
    var para = document.createElement('p');
    var plevel = document.createElement('p');
	var pshards = document.createElement('p');
	
	var stars = [];	
	for (i = 0; i < 7; i++){
    stars[i] = document.createElement('img');
	stars[i].setAttribute('class', 'stars');
	stars[i].src = "star.png";
	}
	
	
	
    // даваме име на класа, което ще се използва за преоразмеряването
		imagec.setAttribute('class', 'resizeElements');
		section.setAttribute('class', 'resizeElements');
		plevel.setAttribute('class', 'cllevel');
		pshards.setAttribute('class', 'clshards');		
	
	
	if (choiceOne.checked) {heading.textContent = hero.name.replace(hero.name.charAt(0), hero.name.charAt(0).toUpperCase());}
    if (choiceThree.checked) {para.textContent =  hero.power;}

	plevel.textContent = hero.level;
	pshards.textContent = hero.shards;
	
	if (hero.shards === "max") {
		pshards.style.color = 'DarkGreen';
		pshards.style.boxShadow = '2px 2px 1px DarkGreen';
		pshards.style.background = 'YellowGreen';
		pshards.style.fontWeight = 'bold';}

	if (hero.level == 85) {
		plevel.style.color = 'DarkGreen';
		plevel.style.boxShadow = '2px 2px 1px DarkGreen';
		plevel.style.background = 'YellowGreen';
		plevel.style.fontWeight = 'bold';}
		
	if (choiceTwo.checked) {
    imagec.src = objectURL;
    imagec.alt = hero.name;
	}

    main.appendChild(section);
    section.appendChild(heading);
    section.appendChild(para);
    section.appendChild(imagec);
	section.appendChild(plevel);
	section.appendChild(pshards);
	section.appendChild(stars[0]);
	section.appendChild(stars[1]);
	section.appendChild(stars[2]);
	section.appendChild(stars[3]);
	section.appendChild(stars[4]);
	section.appendChild(stars[5]);
	section.appendChild(stars[6]);
	
	for (i = 0; i < 7; i++){
    stars[i].style.left = (20 * i + 6) + "px";
    stars[i].style.bottom = "10px";
	if (i+1 > hero.stars) {stars[i].style.visibility = "hidden"}
	}
	
	if (document.getElementById("smallView").style.color === 'red') { zoomOut();}
	if (document.getElementById("normalView").style.color === 'red') { zoomIn();}
	if (document.getElementById("largeView").style.color === 'red') { zoomMore();}	
	
	totalDisplayed++;
	totalPower = totalPower + hero.power;

	document.getElementById("resultsPower").innerHTML = 'Total power: ' + totalPower;
	document.getElementById("resultsCount").innerHTML = 'Displayed heroes: ' + totalDisplayed;
  }
 

}
