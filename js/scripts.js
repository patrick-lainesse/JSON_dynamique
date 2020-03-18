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
    //var texte = document.getElementById("texte_pub");
    var div = document.getElementById("cadre_tableau");

    /*bouton.style.display = "inline-block";
    div.style.display = "inline-block";*/
    //texte.style.display = "none";

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
    var texte = document.getElementById("texte_pub");
    texte.style.display = "none";
    div.style.visibility = "hidden";
}

function cacher_select() {
    var div = document.getElementById("menuSelect");
    //div.style.visibility = "hidden";
    div.innerHTML = "";
}

// fonction pour convertir les dates numériques en dates alphabétiques
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
    //var conteneur = document.getElementById("conteneur");

    // variable qui va accueillir le tableau correspondant à la sélection sur la page
    var tableauJSON;
    var msgEtat;
    var nombreHosp = 0;     // nombre d'hospitalisations reliées à ce dossier dans le cas de la fonction hospitalisations par patient

    //conteneur.classList.add("centre");

    // vider les balises qui recevront le code du tableau
    rangees.innerHTML = "<div class=\"table-head rangee_padding\" id=\"attributs\"></div>";

    // on doit aller chercher l'emplacement de l'en-tête après avoir réinitialisé le code, sinon
    // la référence sera perdue en vidant la balise ayant "attributs" comme id
    var en_tete = document.getElementById('attributs');

    // afficher le bouton X pour faire fermer le tableau et cache la section "préparé par" si elle est visible
    afficheX();
    cacher_footer();

    switch(elem) {
        case "pati":
            tableauJSON = tabPatients;
            msgEtat = "patient(s)";
            break;
        case "etab":
            tableauJSON = tabEtablissements;
            msgEtat = "établissement(s)";
            break;
        case "hosp":
            tableauJSON = tabHospitalisations;
            msgEtat = "hospitalisation(s)";
            break;
    }

    // afficher les titres de chaque colonne avec le style approprié du template
    // et ajout des accents lorsque nécessaire
    for(var attribut in tableauJSON[0]) {

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
    for(var objet in tableauJSON) {

        if(dossier === 0 || dossier === tableauJSON[objet].dossier) {
            var texte = "<div class=\"donnees_padding table-row\">";

            nombreHosp++;           // on compte le nombre d'hospitalisations pour ce no de dossier
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

    // si la fonction n'est pas appelée à partir du select de l'option "hospitalisations par patient"
    if(dossier === 0) {
        cacher_select();

        // afficher le message d'alert ??? penser à enlever le inline-block quand on clique sur index???
        status.innerHTML = "Il y a " + tableauJSON.length + " " + msgEtat + ".";
    } else {
        status.innerHTML = "Il y a " + nombreHosp + " " + msgEtat + " pour ce patient.";
    }

    // afficher le message d'alert ??? penser à enlever le inline-block quand on clique sur index???
    //status.innerHTML = "Il y a " + tableauJSON.length + " " + msgEtat;
    status.style.visibility = "visible";
}

/*function charger_patient() {

    // variable qui recevra le texte d'option à afficher dans le select
    var texte = "";
    var emplacement = document.getElementById("menuSelect");
    var table = document.getElementById("cadre_tableau");
    var menu = document.getElementById("patients");
    var status = document.getElementById("status");

    status.innerHTML = "Choisissez un patient pour afficher ses hospitalisations.";
    status.style.visibility = "visible";
    //status.style.visibility = "invisible";
    emplacement.style.visibility = "visible";
    emplacement.style.class = "single-element-widget default-select";       // à travailler pour style bootstrap

    // afficher le bouton X pour faire fermer le tableau et cache la section "préparé par" si elle est visible
    cacher_footer();
    table.style.visibility = "hidden";

    if(typeof(menu) == undefined || menu == null) {
        menu = document.createElement("select");

        menu.setAttribute("id", "patients");
        menu.setAttribute("onchange", "afficher_patients()");
        //menu.classList.add("nice-select");

        for (objet in tabPatients) {

            var uneOption = document.createElement("option");
            uneOption.setAttribute("id", tabPatients[objet].dossier);

            texte = tabPatients[objet].dossier + " (" + tabPatients[objet].prenom + " " + tabPatients[objet].nom + ")";

            var texteOption = document.createTextNode(texte);
            uneOption.appendChild(texteOption);

            menu.appendChild(uneOption);
        }

        emplacement.appendChild(menu);
    }
}*/

function afficher_patients() {

    // obtenir la référence de l'objet sélectionné
    var selection = event.target.options[event.target.selectedIndex];

    // afficher le tableau hospitalisation pour le patient sélectionné
    afficher_tableau("hosp", parseInt(selection.id.toString()));
    // reste un problème où le select est aligné à gauche au départ et centré quand on y revient une deuxième fois ????
}

// fonction qui servira à remplir les options de chacun des select s'affichant dynamiquement
function charger_select(identifiant) {

    // variable qui recevra le texte d'option à afficher dans le select
    // diviser et commenter à quoi vont servir les variables?????
    var texte = "";
    var emplacement = document.getElementById("menuSelect");
    var table = document.getElementById("cadre_tableau");
    var menu;
    var autre_menu;
    var status = document.getElementById("status");
    var option_barre_outil;
    var texteOption;
    var tableau;
    var menu_etab;
    var code_etab;
    var conteneur = document.getElementById("conteneur");

    //conteneur.classList.add("centre");

    // afficher le message approprié dans la zone status et initialiser les variables
    // correspondant à la sélection opérée sur le menu de la barre d'outils
    switch(identifiant) {
        case "hosp_pati":
            status.innerHTML = "Choisissez un patient pour afficher ses hospitalisations.";
            option_barre_outil = "patients";
            tableau = tabPatients;
            autre_menu = document.getElementById("etablissements");
            break;
        case "hosp_etab":
            status.innerHTML = "Choisissez un établissment pour afficher ses spécialités.";
            option_barre_outil = "etablissements";
            tableau = tabEtablissements;
            autre_menu = document.getElementById("patients");
            break;
        case "specialite":
            status.innerHTML = "Choisissez une spécialité pour afficher les hospitalisations associées à celle-ci dans cet établissement.";
            option_barre_outil = "specialites";
            tableau = tabHospitalisations;
            autre_menu = document.getElementById("patients");
            menu_etab = document.getElementById("etablissements").options;
            code_etab = menu_etab[menu_etab.selectedIndex].id;
            break;
    }

    status.style.visibility = "visible";
    emplacement.style.visibility = "visible";
    emplacement.style.class = "single-element-widget default-select";       // à travailler pour style bootstrap???

    // afficher le bouton X pour faire fermer le tableau et cache la section "préparé par" si elle est visible
    cacher_footer();
    table.style.visibility = "hidden";

    // on vide le select des spécialités s'il existe déjà
    menu = document.getElementById(option_barre_outil);
    if (option_barre_outil === "specialites" && menu != null) {
        menu.innerHTML = "";
    } else if (menu == null) {
        menu = document.createElement("select");
    }

    menu.setAttribute("id", option_barre_outil);
    //menu.classList.add("nice-select");        ????

    switch (option_barre_outil) {
        case "patients":
            menu.setAttribute("onchange", "afficher_patients()");
            break;
        case "etablissements":
            menu.setAttribute("onchange", "charger_select(\"specialite\")");
            break;
        case "specialites":
            menu.setAttribute("onchange", "afficher_specialite()");
    }

    for (objet in tableau) {

        var uneOption = document.createElement("option");

        switch (option_barre_outil) {
            case "patients":
                uneOption.setAttribute("id", tabPatients[objet].dossier);
                texte = tabPatients[objet].dossier + " (" + tabPatients[objet].prenom + " " + tabPatients[objet].nom + ")";
                var texteOption = document.createTextNode(texte);
                uneOption.appendChild(texteOption);
                menu.appendChild(uneOption);
                break;
            case "etablissements":
                uneOption.setAttribute("id", tabEtablissements[objet].etablissement);
                texte = tabEtablissements[objet].etablissement + " - " + tabEtablissements[objet].nom;
                var texteOption = document.createTextNode(texte);
                uneOption.appendChild(texteOption);
                menu.appendChild(uneOption);
                break;
            case "specialites":
                // possible de mettre ici les code_etab???
                if (code_etab === tableau[objet].etablissement && !option_existe(tabHospitalisations[objet].specialite, menu)) {
                    uneOption.setAttribute("id", tabHospitalisations[objet].specialite);
                    texte = tabHospitalisations[objet].specialite;
                    var texteOption = document.createTextNode(texte);
                    uneOption.appendChild(texteOption);
                    menu.appendChild(uneOption);
                }
        }
    }

    // si le menu ne contient aucun élément, on ne le crée pas??? est-ce que le menu vide s'affiche? à travailler
    if(menu.length > 0) {
        emplacement.appendChild(menu);
    } else {
        status.innerHTML = "Aucune hospitalisation répertoriée à cet établissement.";
    }

    // cacher l'autre menu si présent
    if (autre_menu != null) {
        autre_menu.style.visibility = "hidden";
    }
    menu.style.visibility = "visible";

    // cacher le menu spécialité pour toutes les autres options
    if (identifiant != "specialite") {
        var menu_spec = document.getElementById("specialites");
        if (menu_spec != null) {
            menu_spec.style.visibility = "hidden";
        }
    }
}

// fonction qui réagit à la dernière option de la page Web
function afficher_specialite() {
    //charger_select("specialite");

    // on récupère les endroits de la page html où injecter le tableau
    var status = document.getElementById("status");
    var rangees = document.getElementById("tableau");

    var menu_hopital = document.getElementById("etablissements").options;
    var choix_hopital = menu_hopital[menu_hopital.selectedIndex].id;
    var menu_specialite = document.getElementById("specialites").options;
    var choix_specialite = menu_specialite[menu_specialite.selectedIndex].id;
    var texte = "";
    var nombreHosp = 0;     // nombre d'hospitalisations reliées à cette spécialité

    // vider les balises qui recevront le code du tableau et éliminer le background jaune
    rangees.innerHTML = "<div class=\"table-head rangee_padding\" id=\"attributs\"></div>";
    rangees.classList.remove("tableau_largeur");

    // afficher le bouton X pour faire fermer le tableau et cache la section "préparé par" si elle est visible
    afficheX();
    cacher_footer();

    // afficher les informations de l'hôpital dans un premier tableau
    for(var hopital in tabEtablissements) {
        //var test = tabEtablissements[hopital].etablissement;
        if(choix_hopital == tabEtablissements[hopital].etablissement) {

            texte = "<div class=\"hopital_padding table-row\">";

            for(var attribut in tabEtablissements[hopital]) {

                if(attribut === "adresse") {
                    texte += "<div class=\"visit rangee_padding hopital_specialite\">Adresse:<br>" + tabEtablissements[hopital][attribut][0] + ", " + tabEtablissements[hopital][attribut][1] + ", " +
                        tabEtablissements[hopital][attribut][2] + ", " + tabEtablissements[hopital][attribut][3] + "</div>";
                }

                else if(attribut === "code postal") {
                    texte += "<div class=\"visit rangee_padding hopital_specialite\">Code postal:<br>" + tabEtablissements[hopital][attribut].toString().substring(0, 3) + " " +
                        tabEtablissements[hopital][attribut].toString().substring(3) + "</div>";
                }

                else if(attribut === "telephone") {
                    texte += "<div class=\"visit rangee_padding hopital_specialite\">Téléphone:<br>(" + tabEtablissements[hopital][attribut].toString().substring(0, 3) + ") " +
                        tabEtablissements[hopital][attribut].toString().substring(3, 6) + "-" + tabEtablissements[hopital][attribut].toString().substring(6) + "</div>";
                }

                else {
                    texte += "<div class=\"visit rangee_padding hopital_specialite\">" + majuscule(attribut) + ":<br>" + tabEtablissements[hopital][attribut] + "</div>";
                }
            }
            rangees.innerHTML += texte;
            texte = "";

            // afficher les informations des hospitalisations reliées à la spécialité choisies
            for(var lit in tabHospitalisations) {

                if (choix_specialite == tabHospitalisations[lit].specialite) {

                    texte = "<div class=\"hopital_padding table-row\">";

                    for (var attribut in tabHospitalisations[lit]) {             // Il faut aussi compter le nb ??????

                        // change le format de la date pour qu'elle s'affiche en mots
                        if (["admission", "sortie"].indexOf(attribut) > -1) {
                            texte += "<div class=\"visit rangee_padding hopital_specialite\">" + date_mots(tabHospitalisations[lit][attribut][0], tabHospitalisations[lit][attribut][1], tabHospitalisations[lit][attribut][2]) + "</div>";
                        } else {
                            texte += "<div class=\"visit rangee_padding hopital_specialite\">" + majuscule(attribut) + ":<br>" + tabHospitalisations[lit][attribut] + "</div>";
                        }
                    }
                    rangees.innerHTML += texte;
                    cacher_select();
                }
            }
        }
    }

    //var rangees = document.getElementById("tableau");
    //rangees.innerHTML += texte;

    /*for(var objet in tableauJSON) {

        if(dossier === 0 || dossier === tableauJSON[objet].dossier) {
            var texte = "<div class=\"donnees_padding table-row\">";

            nombreHosp++;           // on compte le nombre d'hospitalisations pour ce no de dossier
            tabObjet = tableauJSON[objet];

            for(attribut in tabObjet) {*/
//texte += "<div class=\"visit rangee_padding\">" + tabObjet[attribut] + "</div>";

}

function option_existe (cherche, menu) {
    var optionExiste = false,
        optionsLength = menu.length;

    while (optionsLength--)
    {
        if (menu.options[optionsLength].value === cherche)
        {
            optionExiste = true;
            break;
        }
    }
    return optionExiste;
}

function majuscule(mot) {
    return mot.charAt(0).toUpperCase() + mot.substring(1);
}
