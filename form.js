function validate(){

    let field=document.getElementById('number');
    let valuer= field.value;
    let h=Number(valuer);
   let g=valuer.length;

    if (isNaN(h)){
        event.preventDefault;
        window.alert("Please enter only numbers");
        field.value='';
        field.focus();
    }else if(h==0){  
        event.preventDefault;
        window.alert("Please dont leave it empty");
        field.value='';
        field.focus();
    }else if(g<10 || g>10){
        event.preventDefault;
        window.alert("Digits should be 10");
        field.value='';
        field.focus();
    }}


    function validateOnlyLetters() {
        const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
        let urname = document.getElementById('urname');
    
        if (regex.test(urname.value)) {
            urname.style.borderColor = "green"; 
            return true;
        } else {
            alert("Seules les lettres et espaces sont autorisés !");
            urname.style.borderColor = "red"; 
            return false;
        }
    }
    
    function validateOnlyLetterss() {
        const regexx = /^[a-zA-ZÀ-ÿ\s]+$/; 
        let urunve = document.getElementById('urunv');
    
        if (regexx.test(urunve.value)) {
            urunve.style.borderColor = "green"; 
            return true;
        } else {
            alert("Seules les lettres et espaces sont autorisés !");
            urunve.style.borderColor = "red"; 
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