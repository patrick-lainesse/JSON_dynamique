/*
Patrick Lainesse
Matricule 740302
IFT 1142, Hiver 2020

scripts.js
Fonctions utilisées pour remplir la zone affichage de la page web
*/


// fonction qui fait apparaître le "X" pour fermer les tableaux
function afficheX() {

    var bouton = document.getElementById("cadre_tableau");
    var texte = document.getElementById("texte_pub");
    var div = document.getElementById("cadre_tableau");

    bouton.style.display = "inline-block";
    div.style.display = "inline-block";
    texte.style.display = "none";
}

function montrer_footer() {
    var div = document.getElementById("footer");
    div.style.display = "inline-block";
}

// fonction qui s'exécute quand on sélection l'option "Liste de patients"
function afficher_patients() {

    var status = document.getElementById("status");
    var rangees = document.getElementById('tableau');
    var conteneur = document.getElementById("conteneur");

    conteneur.classList.add("centre");

    // vider les balises qui recevront le code du tableau
    rangees.innerHTML = "<div class=\"table-head rangee_padding\" id=\"attributs\"></div>";

    // on doit aller chercher l'emplacement de l'en-tête après avoir réinitialisé le code, sinon
    // la référence sera perdue en vidant la balise ayant "attributs" comme id
    var en_tete = document.getElementById('attributs');

    // afficher le bouton X pour faire fermer le tableau
    afficheX();
    //cacher_footer();

    // afficher les titres de chaque colonne avec le style approprié du template
    for(attribut in tabPatients[0]) {

        if(attribut === "prenom") {
            // ajouter l'accent à prénom
            attribut = "prénom";
        }
        en_tete.innerHTML += "<div class=\"visit rangee_padding\">" + attribut + "</div>";
    }

    // afficher les infos de chaque patient
    for(patient in tabPatients) {

        // renommer la variable texte ou tester sans ????
        //var texte = "";

        var texte = "<div class=\"donnees_padding table-row\">";

        tabPat = tabPatients[patient];

        for(attribut in tabPat) {

            if(attribut === "naissance") {
                texte += "<div class=\"visit rangee_padding\">" + tabPat[attribut][0] + "/" + tabPat[attribut][1] + "/" + tabPat[attribut][2] + "</div>";
                //texte += "<div class=\"visit rangee_padding\">" + "test" + "</div>";
                //rangees.innerHTML += "<div class=\"visit\">" + "test" + "</div>";
            }
            else {
                //rangees.innerHTML += "<div class=\"visit\">" + tabPatients[patient][attribut] + "</div>";
                texte += "<div class=\"visit rangee_padding\">" + tabPat[attribut] + "</div>";
            }
        }

        // est-ce que j'ai un /div de trop???
        rangees.innerHTML += texte + "</div>";
    }

    status.innerHTML = "Il y a " + tabPatients.length + " patients.";
    status.style.display = "inline-block";
}