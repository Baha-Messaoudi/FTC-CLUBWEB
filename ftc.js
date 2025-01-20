var slides = document.querySelectorAll('.background');
var next = document.querySelector('.NEXT');
var back = document.querySelector('.BACK');
var i = 0;
var autoSlideInterval;

function nextSlide() {
    nextelement = (i + 1) % slides.length;
    slides[i].classList.remove('active');
    slides[nextelement].classList.add('active');
    i = nextelement;
}
console.log(slides.length);
function backSlide() {
    backelement = (i - 1 + slides.length) % slides.length;
    slides[i].classList.remove('active');
    slides[backelement].classList.add('active');
    i = backelement;
}

next.addEventListener('click', function() {
    nextSlide();
    resetAutoSlide(); 
});

back.addEventListener('click', function() {
    backSlide();
    resetAutoSlide(); 
});

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000); 
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}
startAutoSlide();

var suivi= document.querySelector('.NEXT1');
var reteur = document.querySelector('.BACK1');
var show =document.querySelectorAll('.qna');
var j=0;

function nextshow() {
    if (j>= show.length - 1) {
        suivant.disabled = true;
        return;
    }
    show[j].classList.remove('show');
    show[j].style.transform = 'translateX(-160%)';
    j++
    show[j].style.transform = 'translateX(160%)';
    show[j].classList.add('show');
    setTimeout(() => {
        show[j].style.transform = 'translateX(0%)';
    }, 10);
}
function backshow() {
    if (j<=0) {
        reteur.disabled = true;
        return;
    }
    show[j].classList.remove('show');
    show[j].style.transform = 'translateX(160%)';
    j--;
    show[j].style.transform = 'translateX(-160%)';
    show[j].classList.add('show');
    setTimeout(() => {
        show[j].style.transform = 'translateX(0%)';
    }, 10);
}
suivi.addEventListener('click', function() {
    nextshow();
});
reteur.addEventListener('click',function(){
    backshow();
});


/*-----------------------------------------join---------------------------------------------------------------------------*/
const nextButton = document.querySelector('.NEXT2');
const backButton = document.querySelector('.BACK2');
const cards = document.querySelectorAll('.card1');
const titles = document.querySelectorAll('.titre-identifei1');
const cardarray = Array.from(cards);
const titleArray = Array.from(titles);

let currentIndex = 1; 

function moveNext() {
    const prevIndex = currentIndex; 
    currentIndex = (currentIndex + 1) % cardarray.length; 

    cardarray[prevIndex].classList.remove('card-s');
    cardarray[prevIndex].classList.add('card-ns1');

    cardarray[currentIndex].classList.remove('card-ns1', 'card-ns');
    cardarray[currentIndex].classList.add('card-s');

    const nextIndex = (currentIndex + 1) % cardarray.length;
    cardarray[nextIndex].classList.remove('card-s');
    cardarray[nextIndex].classList.add('card-ns');
}

function moveBack() {
    const prevIndex = currentIndex; 
    currentIndex = (currentIndex - 1 + cardarray.length) % cardarray.length; 

    cardarray[prevIndex].classList.remove('card-s');
    cardarray[prevIndex].classList.add('card-ns');

    cardarray[currentIndex].classList.remove('card-ns', 'card-ns1');
    cardarray[currentIndex].classList.add('card-s');

    const nextIndex = (currentIndex - 1 + cardarray.length) % cardarray.length;
    cardarray[nextIndex].classList.remove('card-s');
    cardarray[nextIndex].classList.add('card-ns1');
}

function showtitre() {
    titleArray.forEach((title, index) => {
        if (index === currentIndex) {
            title.classList.remove('no-center');
            title.classList.add('center'); 
        } else {
            title.classList.remove('center');
            title.classList.add('no-center'); 
        }
    });
}

function showtitreback() {
    titleArray.forEach((title, index) => {
        if (index === currentIndex) {
            title.classList.remove('no-center');
            title.classList.add('center'); 
        } else {
            title.classList.remove('center');
            title.classList.add('no-center'); 
        }
    });
}

// Function to check screen width and add event listeners
function checkScreenWidth() {
    if (window.matchMedia('(min-width: 600px)').matches) {
        nextButton.addEventListener('click', function () {
            moveNext();
            showtitre();
        });

        backButton.addEventListener('click', function () {
            moveBack();
            showtitreback();
        });
    } else {
        // Optionally, remove event listeners if screen width is less than 600px
        nextButton.removeEventListener('click', moveNext);
        backButton.removeEventListener('click', moveBack);
    }
}

// Check screen width on load
checkScreenWidth();

// Re-check screen width on resize
window.addEventListener('resize', checkScreenWidth);




function validateOnlyLetters(event) {
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/; 
    const urname = document.getElementById('urname');

    if (regex.test(urname.value.trim())) { 
        return true;
    } else {
        alert("Seules les lettres et espaces sont autorisés !");
        if (event) event.preventDefault(); 
        return false;
    }
}



function ajouterImage() {
    if (window.matchMedia('(max-width: 600px)').matches) {
        let image = document.createElement('img');
        image.src = './image/menu.png';
        let conteneur = document.getElementById('conteneur');
        conteneur.appendChild(image);
    }
}

ajouterImage();
window.addEventListener('resize', ajouterImage);

var list = document.querySelector(".list ul");
var menu = document.getElementById("conteneur");
menu.addEventListener('click' , function () {
    list.classList.toggle('showlist');
});

var listItems = list.querySelectorAll('li');
listItems.forEach(function (item) {
    item.addEventListener('click', function () {
        list.classList.remove('showlist');
    });
});


var totalcard = document.querySelector('.totalcard');
var card = document.querySelectorAll('.card');
var nextButton12 = document.querySelector('.nextt');
var backButton12 = document.querySelector('.backee');

// Variables pour le suivi de l'index actif et le nombre total d'éléments
var currentIndex12 = 0;
var totalItems12 = card.length;

// Fonction pour afficher les éléments en fonction de l'index
function showItem(index) {
    // Masquer tous les éléments
    for (var m = 0; m < totalItems12; m++) {
        card[m].classList.remove('active12');
        card[m].classList.remove('active-next');
        card[m].classList.remove('active-prev');
    }

    // Afficher l'élément actuel
    card[index].classList.add('active12');

    // Afficher l'élément précédent s'il existe
    if (index > 0) {
        card[index - 1].classList.add('active-next');
    } else {
        // Si index est 0, montrer le dernier élément comme précédent
        card[totalItems12 - 1].classList.add('active-next');
    }

    // Afficher l'élément suivant s'il existe
    if (index < totalItems12 - 1) {
        card[index + 1].classList.add('active-prev');
    } else {
        // Si index est le dernier élément, montrer le premier élément comme suivant
        card[0].classList.add('active-prev');
    }
}

// Fonction pour passer à l'élément suivant
function nextItem12() {
    currentIndex12 = (currentIndex12 + 1) % totalItems12;
    showItem(currentIndex12);
}

// Fonction pour revenir à l'élément précédent
function prevItem12() {
    currentIndex12 = (currentIndex12 - 1 + totalItems12) % totalItems12;
    showItem(currentIndex12);
}

// Gestion des événements pour les boutons de navigation
nextButton12.addEventListener('click', nextItem12);
backButton12.addEventListener('click', prevItem12);

// Fonction pour mettre à jour les classes en fonction de la largeur de l'écran
function updateClasses() {
    if (window.innerWidth <= 600) {
        // Masquer tous les éléments sauf le premier
        for (var m = 1; m < totalItems12; m++) {
            card[m].classList.remove('active12');
            card[m].classList.remove('active-next');
            card[m].classList.remove('active-prev');
        }
        // Afficher le premier élément
        card[0].classList.add('active12');
    } else {
        // Réinitialiser les classes pour afficher normalement sur les grands écrans
        for (var m = 0; m < totalItems12; m++) {
            card[m].classList.remove('active12');
            card[m].classList.remove('active-next');
            card[m].classList.remove('active-prev');
        }
        // Afficher le premier élément
        card[0].classList.add('active12');
    }
}

// Appeler la fonction updateClasses au chargement de la page
updateClasses();

// Appeler la fonction updateClasses lors du redimensionnement de la fenêtre
window.addEventListener('resize', updateClasses);
/*-------------------responsive memeber-------------------*/
function ajouterTitrep() {
    if (window.matchMedia('(max-width: 600px)').matches) {
        let presedent = document.createElement('h2');
        presedent.textContent = ' President';
        let conteneurp = document.getElementById('conteneurp');
        conteneurp.appendChild(presedent);
    }
}

ajouterTitrep();
window.addEventListener('resize', ajouterTitrep);

function ajouterTitreSc() {
    if (window.matchMedia('(max-width: 600px)').matches) {
        let Sgenerale = document.createElement('h2');
        Sgenerale.textContent = 'Secretary General';
        let conteneurSC = document.getElementById('conteneursc');
        conteneurSC.appendChild(Sgenerale);
    }
}

function ajouterTitreSp() {
    if (window.matchMedia('(max-width: 600px)').matches) {
        let Spresedent = document.createElement('h2');
        Spresedent.textContent = 'Vice President';
        let conteneursp = document.getElementById('conteneursp');
        conteneursp.appendChild(Spresedent);
    }
}

ajouterTitreSp();
window.addEventListener('resize', ajouterTitreSp);

function ajouterTitreSc() {
    if (window.matchMedia('(max-width: 600px)').matches) {
        let Sgenerale = document.createElement('h2');
        Sgenerale.textContent = 'Secretary General';
        let conteneurSC = document.getElementById('conteneursg');
        conteneurSC.appendChild(Sgenerale);
    }
}



ajouterTitreSc();
window.addEventListener('resize', ajouterTitreSc);




function moveNextR() {
    const prevIndex = currentIndex; 
    currentIndex = (currentIndex + 1) % cardarray.length; 

    cardarray[prevIndex].classList.remove('active-card');
    cardarray[prevIndex].classList.add('noactivecard');

    cardarray[currentIndex].classList.remove('noactivecard');
    cardarray[currentIndex].classList.add('active-card');

    const nextIndex = (currentIndex + 1) % cardarray.length;
    cardarray[nextIndex].classList.remove('noactivecard');
    cardarray[nextIndex].classList.add('noactivecard');
}

// Sélection des éléments HTML

function moveNextR() {
    const prevIndex = currentIndex;
    currentIndex = (currentIndex + 1) % cardarray.length;

    updateCards(prevIndex, currentIndex);
}

function moveBackR() {
    const prevIndex = currentIndex;
    currentIndex = (currentIndex - 1 + cardarray.length) % cardarray.length;

    updateCards(prevIndex, currentIndex);
}

function updateCards(prevIndex, currentIndex) {
    // Mise à jour des classes pour l'ancienne carte
    cardarray[prevIndex].classList.remove('active-card');
    cardarray[prevIndex].classList.add('noactivecard');

    // Mise à jour des classes pour la carte actuelle
    cardarray[currentIndex].classList.remove('noactivecard');
    cardarray[currentIndex].classList.add('active-card');
}

function checkScreenWidth1() {
    if (window.matchMedia('(max-width: 600px)').matches) {
        // Ajout des écouteurs d'événements si la largeur de l'écran est <= 600px
        nextButton.addEventListener('click', moveNextR);
        backButton.addEventListener('click', moveBackR);
    } else {
        // Suppression des écouteurs d'événements si la largeur de l'écran est > 600px
        nextButton.removeEventListener('click', moveNextR);
        backButton.removeEventListener('click', moveBackR);
    }
}

// Vérification initiale de la largeur de l'écran
checkScreenWidth1();

// Réévaluer la largeur de l'écran lors de la redimension
window.addEventListener('resize', checkScreenWidth1);


/*------foter---------------------*/

function ajouterbutton() {
    if (window.matchMedia('(max-width: 600px)').matches) {
        let join = document.createElement('a');
        join.textContent = 'join';
        join.setAttribute('href', 'form.html');
        let joine = document.getElementById('join');
        joine.appendChild(join);
    }
}



ajouterbutton();
window.addEventListener('resize', ajouterbutton);
