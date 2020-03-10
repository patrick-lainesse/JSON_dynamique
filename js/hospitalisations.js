/*
Patrick Lainesse
Matricule 740302
IFT 1142, Hiver 2020

hospitalisations.js
Fichier contenant les tableaux de données pour peupler la page. Les fonctions principales se trouvent
dans le fichier /js/scripts.js
*/

var tabPatients = [
    {"dossier": 1, "nom": "Léger", "prenom": "Émile", "naissance": [1917, 3, 26], "sexe": 'M'},
    {"dossier": 2, "nom": "Bernard", "prenom": "Marie", "naissance": [1946, 2, 3], "sexe": 'F'},
    {"dossier": 3, "nom": "Chartrand", "prenom": "Guy", "naissance": [1959, 4, 5], "sexe": 'M'},
    {"dossier": 4, "nom": "Côté", "prenom": "André", "naissance": [1978, 9, 2], "sexe": 'M'},
    {"dossier": 5, "nom": "Lavoie", "prenom": "Carole", "naissance": [1973, 11, 4], "sexe": 'F'},
    {"dossier": 6, "nom": "Martin", "prenom": "Diane", "naissance": [1965, 12, 2], "sexe": 'F'},
    {"dossier": 7, "nom": "Lacroix", "prenom": "Pauline", "naissance": [1956, 1, 25], "sexe": 'F'},
    {"dossier": 8, "nom": "St-Jean", "prenom": "Arthur", "naissance": [1912, 10, 7], "sexe": 'M'},
    {"dossier": 9, "nom": "Béchard", "prenom": "Marc", "naissance": [1980, 8, 8], "sexe": 'M'},
    {"dossier": 10, "nom": "Chartrand", "prenom": "Mario", "naissance": [1947, 7, 23], "sexe": 'M'}];

var tabEtablissements = [
    {"etablissement":1234, "nom": "Centre hospitalier Sud", "adresse": [1234, "boul. Sud", "Montréal", "Qc"], "code postal": "H2M3Y6", "telephone":5141231234},
    {"etablissement":2346, "nom": "Hôpital Nord", "adresse": [7562, "rue du Souvenir", "Nordville", "Qc"], "code postal": "J4R2Z5", "telephone":4502223333},
    {"etablissement":3980, "nom": "Hôpital Centre", "adresse": [4637, "boul. de l'Église", "Montréal", "Qc"], "code postal": "H3J4K8", "telephone":5141235678},
    {"etablissement":4177, "nom": "Centre hospitalier Est", "adresse": [12, "rue Bernard", "Repentigny", "Qc"], "code postal": "J8R3K5", "telephone":4505892345},
    {"etablissement":7306, "nom": "Hôpital du salut", "adresse": [11, "rue de la Rédemption", "Saint-Basile", "Qc"], "code postal": "J8H2O4", "telephone":4503456789},
    {"etablissement":8895, "nom": "Dernier recours", "adresse": [999, "rue Saint-Pierre", "Longueuil", "Qc"], "code postal": "J7B3J6", "telephone":4505554741}];

var tabHospitalisations = [
    {"etablissement": "1234", "dossier": 5, "admission": [2000, 8, 14], "sortie": [2001, 8, 14], "specialite": "médecine"},
    {"etablissement": "1234", "dossier": 10, "admission": [1992, 12, 12], "sortie": [1992, 12, 12], "specialite": "chirurgie"},
    {"etablissement": "2346", "dossier": 8, "admission": [2003, 3, 3], "sortie": [2003, 3, 5], "specialite": "médecine"},
    {"etablissement": "2346", "dossier": 1, "admission": [1997, 11, 11], "sortie": [1997, 11, 12], "specialite": "orthopédie"},
    {"etablissement": "2346", "dossier": 3, "admission": [1995, 4, 12], "sortie": [1995, 4, 30], "specialite": "médecine"},
    {"etablissement": "3980", "dossier": 5, "admission": [2000, 2, 14], "sortie": [2000, 3, 14], "specialite": "médecine"},
    {"etablissement": "3980", "dossier": 5, "admission": [2001, 1, 1], "sortie": [2001, 2, 1], "specialite": "médecine"},
    {"etablissement": "3980", "dossier": 9, "admission": [1995, 4, 3], "sortie": [1995, 4, 8], "specialite": "orthopédie"},
    {"etablissement": "3980", "dossier": 7, "admission": [1999, 11, 27], "sortie": [1999, 12, 4], "specialite": "chirurgie"},
    {"etablissement": "3980", "dossier": 10, "admission": [1997, 4, 28], "sortie": [1997, 5, 5], "specialite": "chirurgie"},
    {"etablissement": "4177", "dossier": 3, "admission": [2001, 8, 3], "sortie": [2001, 12, 5], "specialite": "médecine"},
    {"etablissement": "4177", "dossier": 3, "admission": [2002, 2, 2], "sortie": [2002, 2, 23], "specialite": "orthopédie"},
    {"etablissement": "7306", "dossier": 2, "admission": [1998, 5, 23], "sortie": [1998, 5, 27], "specialite": "orthopédie"}];