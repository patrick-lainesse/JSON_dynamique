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

    /*bouton.style.display = "inline-block";
    div.style.display = "inline-block";*/
    texte.style.display = "none";

    bouton.style.visibility = "visible";
    div.style.visibility = "visible";
    //texte.style.visibility = "hidden";
}

function montrer_footer() {
    var div = document.getElementById("footer");
    //div.style.display = "inline-block";
    div.style.visibility = "visible";
}

function cacher_footer() {
    var div = document.getElementById("footer");
    //div.style.display = "none";
    div.style.visibility = "hidden";
}

function cacher_select() {
    var div = document.getElementById("menuSelect");
    div.style.visibility = "hidden";
}

function date_mots(annee, mois, jour) {

    var lesMois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    return jour + " " + lesMois[mois - 1] + " " + annee;
}

// Fonction qui s'exécute quand on sélectionne une des trois premières options (afficher patients, établissements ou hospitalisations).
// Elle reçoit comme paramètre l'élément qui a été sélectionné, pour permettre de sélectionner
// les bonnes informations à afficher.
function afficher_tableau(elem, dossier) {

    // on récupère les endroits de la page html où injecter le tableau
    var status = document.getElementById("status");
    var rangees = document.getElementById("tableau");
    var conteneur = document.getElementById("conteneur");

    // variable qui va accueillir le tableau correspondant à la sélection sur la page
    var tableauJSON;
    var msgEtat;

    conteneur.classList.add("centre");

    // vider les balises qui recevront le code du tableau
    rangees.innerHTML = "<div class=\"table-head rangee_padding\" id=\"attributs\"></div>";

    // on doit aller chercher l'emplacement de l'en-tête après avoir réinitialisé le code, sinon
    // la référence sera perdue en vidant la balise ayant "attributs" comme id
    var en_tete = document.getElementById('attributs');

    // afficher le bouton X pour faire fermer le tableau et cache la section "préparé par" si elle est visible
    afficheX();
    cacher_footer();
    cacher_select();

    switch(elem) {
        case "pati":
            tableauJSON = tabPatients;
            msgEtat = "patient(s).";
            break;
        case "etab":
            tableauJSON = tabEtablissements;
            msgEtat = "établissement(s).";
            break;
        case "hosp":
            tableauJSON = tabHospitalisations;
            msgEtat = "hospitalisation(s).";
            break;
    }

    // afficher les titres de chaque colonne avec le style approprié du template
    // et ajout des accents lorsque nécessaire
    for(attribut in tableauJSON[0]) {

        if(attribut === "prenom") {
            attribut = "prénom";
        }
        if(attribut === "etablissement") {
            attribut = "établissement";
        }

        if(attribut === "telephone") {
            attribut = "téléphone";
        }

        if(attribut === "specialite") {
            attribut = "spécialité";
        }

        en_tete.innerHTML += "<div class=\"visit rangee_padding\">" + attribut + "</div>";
    }

    // afficher les infos de chaque entrée du tableau
    for(objet in tableauJSON) {

        if(dossier === 0 || dossier === tableauJSON[objet].dossier) {
            var texte = "<div class=\"donnees_padding table-row\">";

            tabObjet = tableauJSON[objet];

            for(attribut in tabObjet) {

                // change le format de la date pour qu'elle s'affiche en mots
                if(["naissance", "admission", "sortie"].indexOf(attribut) > -1) {
                    texte += "<div class=\"visit rangee_padding\">" + date_mots(tabObjet[attribut][0], tabObjet[attribut][1], tabObjet[attribut][2]) + "</div>";
                }

                else if(attribut === "adresse") {
                    texte += "<div class=\"visit rangee_padding\">" + tabObjet[attribut][0] + ", " + tabObjet[attribut][1] + ", " +
                        tabObjet[attribut][2] + ", " + tabObjet[attribut][3] + "</div>";
                }

                else if(attribut === "code postal") {
                    texte += "<div class=\"visit rangee_padding\">" + tabObjet[attribut].toString().substring(0, 3) + " " +
                        tabObjet[attribut].toString().substring(3) + "</div>";
                }

                else if(attribut === "telephone") {
                    texte += "<div class=\"visit rangee_padding\">(" + tabObjet[attribut].toString().substring(0, 3) + ") " +
                        tabObjet[attribut].toString().substring(3, 6) + "-" + tabObjet[attribut].toString().substring(6) + "</div>";
                }

                else {
                    texte += "<div class=\"visit rangee_padding\">" + tabObjet[attribut] + "</div>";
                }
            }

            // est-ce que j'ai un /div de trop??? peut-être.... ????
            //rangees.innerHTML += texte + "</div>";
            rangees.innerHTML += texte;
        }

    }

    // afficher le message d'alert ??? penser à enlever le inline-block quand on clique sur index???
    status.innerHTML = "Il y a " + tableauJSON.length + " " + msgEtat;
    status.style.display = "inline-block";
}

// fonction qui fait apparaître la liste des patients et leur numéro de dossier
function charger_patient() {

    var emplacement = document.getElementById("menuSelect");
    // variable qui recevra le texte d'option à afficher dans le select
    var texte = "";

    var table = document.getElementById("cadre_tableau");
    //emplacement.innerHTML = "<select><option>Chien</option></select>";
    //emplacement.style.display = "inline-block";
    emplacement.style.visibility = "visible";
    emplacement.style.class = "single-element-widget default-select";       // à travailler pour style bootstrap

    var menu = document.getElementById("patients");

    /*if(typeof(element) != 'undefined' && element != null){
        alert('Element exists!');
    } else{
        alert('Element does not exist!');
    }

    var menu = document.createElement("select");*/

    if(typeof(menu) == undefined || menu == null) {
        menu = document.createElement("select");

        menu.setAttribute("id", "patients");
        menu.setAttribute("onchange", "afficher_patients()");
        //menu.classList.add("nice-select");

        // afficher le bouton X pour faire fermer le tableau et cache la section "préparé par" si elle est visible
        cacher_footer();
        //var table = document.getElementById("cadre_tableau");
        table.style.visibility = "hidden";


        for (objet in tabPatients) {

            var uneOption = document.createElement("option");
            uneOption.setAttribute("value", tabPatients[objet].dossier);
            //texte = "<option>";

            texte = tabPatients[objet].dossier + " (" + tabPatients[objet].prenom + " " + tabPatients[objet].nom + ")";
            //tabObjet = tabPatients[objet];

            var texteOption = document.createTextNode(texte);
            uneOption.appendChild(texteOption);

            menu.appendChild(uneOption);
        }

        emplacement.appendChild(menu);
    }

    else
    {
        table.style.visibility = "hidden";
    }

    //afficher_tableau("pati", 5);
}

function afficher_patients() {
    
}