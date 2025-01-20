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