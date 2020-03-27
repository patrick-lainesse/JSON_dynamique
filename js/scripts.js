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

    bouton.style.visibility = "visible";
    div.style.visibility = "visible";
}

// pour montrer la section "préparé par"
function montrer_footer() {
    var div = document.getElementById("footer");
    div.style.visibility = "visible";
}

// pour cacher la section "préparé par"
function cacher_footer() {
    var div = document.getElementById("footer");
    var texte = document.getElementById("texte_pub");
    texte.style.display = "none";
    div.style.visibility = "hidden";
}

function cacher_etab() {
    var infosH = document.getElementById("infosHopital");
    if(infosH != null) {
        infosH.parentNode.removeChild(infosH);
    }
}

// pour cacher les select qui ne se rapportent pas à l'option du menu qui a été choisie
function cacher_select() {
    var div = document.getElementById("menuSelect");
    div.innerHTML = "";
}

// fonction pour convertir les dates numériques en dates alphabétiques
function date_mots(annee, mois, jour) {

    var lesMois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    return jour + " " + lesMois[mois - 1] + " " + annee;
}

/* Fonction qui s'exécute quand on sélectionne une des quatre premières options (afficher patients, établissements,...).
Elle reçoit comme paramètre l'élément qui a été sélectionné, pour permettre de sélectionner
les bonnes informations à afficher. Le deuxième paramètre est le no de dossier du patient à afficher pour l'option
hospitalisations par patient. Le no de dossier est à 0 pour les trois premières options (afficher les tableaux JSON). */
function afficher_tableau(elem, dossier, codeEtab, spec) {

    // on récupère les endroits de la page html où injecter le tableau
    var status = document.getElementById("status");
    var rangees = document.getElementById("tableau");
    //var etabSpecialite = document.getElementById("infosHopital");

    // variable qui va accueillir le tableau correspondant à la sélection sur la page
    var tableauJSON;
    var msgEtat;
    var nombreHosp = 0;     // nombre d'hospitalisations reliées à ce dossier dans le cas de la fonction hospitalisations par patient

    // vider les balises qui recevront le code du tableau
    rangees.innerHTML = "<div class=\"table-head rangee_padding tableau_entete\" id=\"attributs\"></div>";

    // on doit aller chercher l'emplacement de l'en-tête après avoir réinitialisé le code, sinon
    // la référence sera perdue en vidant la balise ayant "attributs" comme id
    var en_tete = document.getElementById('attributs');

    // afficher le bouton X pour faire fermer le tableau et cache la section "préparé par" si elle est visible
    afficheX();
    cacher_footer();
    cacher_select();

    // sélectionne le tableau JSON corresponsant à la sélection du menu et le message à afficher dans la zone d'état
    switch(elem) {
        case "pati":
            tableauJSON = tabPatients;
            msgEtat = "patient(s)";
            cacher_etab();
            break;
        case "etab":
            tableauJSON = tabEtablissements;
            msgEtat = "établissement(s)";
            cacher_etab();
            break;
        case "hosp":
            tableauJSON = tabHospitalisations;
            msgEtat = "hospitalisation(s)";
            cacher_etab();
            break;
// dne fonction ???
        case "hosp_spec":
            var cadre = document.getElementById("cadre_tableau");
            var boutonFermer = document.getElementById("boutonX");
            tableauJSON = tabHospitalisations;
            msgEtat = "hospitalisation(s)";
            cadre.insertBefore(infosHopital, boutonFermer);
            cacher_select();
            break;
    }

    // afficher les titres de chaque colonne avec le style approprié du template css
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

        if(dossier === 0 || dossier === tableauJSON[objet].dossier || (codeEtab === tableauJSON[objet].etablissement && spec === tableauJSON[objet].specialite)) {
            var texte = "<div class=\"donnees_padding table-row\">";

            nombreHosp++;           // on compte le nombre d'hospitalisations pour ce no de dossier
            var tabObjet = tableauJSON[objet];

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

            rangees.innerHTML += texte;
        }

    }

    // si la fonction n'est pas appelée à partir du select de l'option "hospitalisations par patient", dossier = 0
    if(dossier === 0) {
        cacher_select();
        // afficher le message dans la zone d'état
        status.innerHTML = "Il y a " + tableauJSON.length + " " + msgEtat + ".";
    }
    // ici ???
        else if(codeEtab != 0) {
        status.innerHTML = "Il y a " + nombreHosp + " " + msgEtat + " pour cette spécialité dans cet établissement.";
    }

    else {
        status.innerHTML = "Il y a " + nombreHosp + " " + msgEtat + " pour ce patient.";
    }

    status.style.visibility = "visible";
}

/* fonction qui servira à remplir les options de chacun des select s'affichant dynamiquement, ainsi que
de leur attribuer des fonctions pour réagir aux clics. Reçoit en paramètre le type de select qu'on veut afficher */
function charger_select(identifiant) {

    var texte = "";         // recevra le texte d'option à afficher dans le select
    var emplacement = document.getElementById("menuSelect");    // où seront affichés les select dans la page
    var table = document.getElementById("cadre_tableau");       // pour cacher les tableaux quand on affiche les select
    var status = document.getElementById("status");             // section pour afficher les messages

    var menu;                        // menu à afficher dans un select
    var autre_menu;                 // menu qui devra être caché lorsqu'on en affiche un autre
    var uneOption;

    var option_barre_outil;         // pour attribuer des id aux select dans la page
    var texteOption;                // texte qui s'affiche dans les select
    var tableau;                    // tableau JSON dans lequel on va chercher nos valeurs

    // afficher le message approprié dans la zone status et initialiser les variables
    // correspondant au select que l'on veut afficher
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

            // Récupère l'établissement sélectionné du select de la liste des établissements. Variables non déclarées
            // plus tôt car elles ne sont pas nécessaires aux deux autres options.
            var menu_etab = document.getElementById("etablissements").options;
            var code_etab = menu_etab[menu_etab.selectedIndex].id;
            break;
    }

    // rendre visibles les div où afficher les tableaux s'ils ne l'étaient pas déjà
    status.style.visibility = "visible";
    emplacement.style.visibility = "visible";
    emplacement.style.class = "single-element-widget default-select";       // à travailler pour style bootstrap???

    // cache la section "préparé par" et cache la section des tableaux si elle est visible
    cacher_footer();
    table.style.visibility = "hidden";

    // on vide le select des spécialités s'il était déjà affiché
    menu = document.getElementById(option_barre_outil);
    if (menu != null) {
        menu.parentNode.removeChild(menu);
    }

    menu = document.createElement("select");
    menu.setAttribute("id", option_barre_outil);
    //menu.classList.add("nice-select");        ????

    switch (option_barre_outil) {
        case "patients":
            menu.setAttribute("onchange", "afficher_patients()");
            break;
        case "etablissements":
            // pour cette option, on affiche un deuxième select avec les specialités disponibles à cet établissement
            menu.setAttribute("onchange", "charger_select(\"specialite\")");
            break;
        case "specialites":
            menu.setAttribute("onchange", "afficher_specialite()");
    }

    uneOption = document.createElement("option");
    texteOption = document.createTextNode("Choisir...");
    uneOption.appendChild(texteOption);
    menu.appendChild(uneOption);

    // parcourt le tableau JSON correspondant au select qu'on veut remplir et ajoute des options avec un id et un texte correspondant
    for (var objet in tableau) {

        uneOption = document.createElement("option");

        switch (option_barre_outil) {
            case "patients":
                uneOption.setAttribute("id", tabPatients[objet].dossier);
                // le texte des options sous le format: 4 (Patrick Lainesse)
                texte = tabPatients[objet].dossier + " (" + tabPatients[objet].prenom + " " + tabPatients[objet].nom + ")";
                texteOption = document.createTextNode(texte);
                uneOption.appendChild(texteOption);
                menu.appendChild(uneOption);
                break;
            case "etablissements":
                uneOption.setAttribute("id", tabEtablissements[objet].etablissement);
                // options sous le format: 1234 - Hôpital Untel
                texte = tabEtablissements[objet].etablissement + " - " + tabEtablissements[objet].nom;
                texteOption = document.createTextNode(texte);
                uneOption.appendChild(texteOption);
                menu.appendChild(uneOption);
                break;
            case "specialites":
                // ajoute une spécialité au select seulement si elle ne s'y trouve pas déjà et qu'elle se retrouve dans l'établissement sélectionné
                if (code_etab === tableau[objet].etablissement && !option_existe(tabHospitalisations[objet].specialite, menu)) {
                    uneOption.setAttribute("id", tabHospitalisations[objet].specialite);
                    texte = majuscule(tabHospitalisations[objet].specialite);
                    texteOption = document.createTextNode(texte);
                    uneOption.appendChild(texteOption);
                    menu.appendChild(uneOption);
                }
        }
    }

    // si un menu select ne contient aucun élément, on ne l'affiche pas et on affiche un message d'erreur
    if(menu.length > 0) {
        emplacement.appendChild(menu);
    } else {
        status.innerHTML = "Aucune hospitalisation répertoriée à cet établissement.";
    }

    /* cacher l'autre menu si présent. Par exemple, on ne veut pas que le menu des patients reste affiché quand on veut
    afficher le menu des établissements */
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

// fonction qui réagit à un clic sur une option du select pour afficher les patients par no de dossier
function afficher_patients() {

    // obtenir la référence de l'objet sélectionné
    var selection = event.target.options[event.target.selectedIndex];

    // afficher le tableau hospitalisation pour le patient sélectionné
    afficher_tableau("hosp", parseInt(selection.id.toString()), 0);
}

/* Fonction pour traiter Hospitalisations par établissement et par spécialité. Affiche les informations de l'établissement
sélectionné, et utilise la même fonction pour afficher les tableaux. Comme on a vu des éléments de DOM en cours cette semaine,
j'en ai profité pour l'appliquer ici, et c'est beaucoup plus lisible! */
function afficher_specialite() {

    // on récupère les endroits de la page html nécessaire pour faire afficher les informations de l'hôpital sélectionné
    var cadre = document.getElementById("cadre_tableau");
    var boutonFermer = document.getElementById("boutonX");      // sert à insérer le div avant cette section
    var uneInfo;                                                        // servira à ajouter différents éléments aux div infosHopital

    // on récupère les deux menus select et leurs options
    var menu_hopital = document.getElementById("etablissements").options;
    var choix_hopital = menu_hopital[menu_hopital.selectedIndex].id;
    var menu_specialite = document.getElementById("specialites").options;
    var choix_specialite = menu_specialite[menu_specialite.selectedIndex].id;

    infosHopital = document.getElementById("infosHopital");

    // si l'affichage des infos de l'hôpital existe déjà, on l'élimine
    if(infosHopital != null) {
        infosHopital.parentNode.removeChild(infosHopital);
    }

    infosHopital = document.createElement("div");

    infosHopital.setAttribute("class", "container border-top-generic");
    infosHopital.setAttribute("id", "infosHopital");

    cadre.insertBefore(infosHopital, boutonFermer);

    // parcourt le tableau JSON pour afficher les informations de l'hôpital sélectionné
    for(var hopital in tabEtablissements) {

        // si l'option sélectionnée correspondant à cette ligne du tableauJSON, on remplit une ligne de tableau pour afficher les infos de l'établissement sélectionné
        if(choix_hopital == tabEtablissements[hopital].etablissement) {

            //texte = "<div class=\"button-group-area\">";
            uneInfo = document.createElement("div");
            uneInfo.setAttribute("class", "button-group-area lien_inactif");
            uneInfo.setAttribute("id", "groupeHopital");
            infosHopital.appendChild(uneInfo);

            for(var attribut in tabEtablissements[hopital]) {

                uneInfo = document.createElement("a");
                uneInfo.setAttribute("class", "genric-btn danger");

                if(attribut === "adresse") {
                    uneInfo.innerHTML = "Adresse:<br>" + tabEtablissements[hopital][attribut][0] + ", " + tabEtablissements[hopital][attribut][1] + ", " +
                        tabEtablissements[hopital][attribut][2] + ", " + tabEtablissements[hopital][attribut][3];
                }

                else if(attribut === "code postal") {
                    uneInfo.innerHTML = "Code postal:<br>" + tabEtablissements[hopital][attribut].toString().substring(0, 3) + " " +
                        tabEtablissements[hopital][attribut].toString().substring(3);
                }

                else if(attribut === "telephone") {
                    uneInfo.innerHTML = "Téléphone:<br>(" + tabEtablissements[hopital][attribut].toString().substring(0, 3) + ") " +
                        tabEtablissements[hopital][attribut].toString().substring(3, 6) + "-" + tabEtablissements[hopital][attribut].toString().substring(6);
                }

                else {
                    uneInfo.innerHTML = majuscule(attribut) + ":<br>" + tabEtablissements[hopital][attribut];
                }

                document.getElementById("groupeHopital").appendChild(uneInfo);
            }
        }

    }

    afficher_tableau("hosp_spec", -1, choix_hopital, choix_specialite);
}

// vérifie si l'option fournie en paramètre existe déjà dans le menu fourni en paramètre
function option_existe (cherche, menu) {
    var optionExiste = false,
        optionsLength = menu.length;

    while (optionsLength--)
    {
        if (menu.options[optionsLength].value.toUpperCase() === cherche.toUpperCase())
        {
            optionExiste = true;
            break;
        }
    }
    return optionExiste;
}

// met la première lettre d'un mot en majuscule
function majuscule(mot) {
    return mot.charAt(0).toUpperCase() + mot.substring(1);
}