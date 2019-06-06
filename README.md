# Outil pour l’interrogation, la description et la navigation de la base de données du projet Inphinity

Une application pour l'accès aux données stockées dans la base de données Inphinity.

Ce software a été développé comme un projet de semestre (PRO) à l'HEIG-VD, année académique 2018-2019

Equipe de développement:

| Nom                                  | Email                                | Github          |
|---------------------------------------|--------------------------------------|-----------------|
| Nair Alic                             | nair.alic@heig-vd.ch                 | Naguir          |
| Michaël da Silva (deputy project lead)| michael.dasilva@heig-vd.ch           | Michael-DaSilva |
| Robin Fournier                        | robin.fournier@heig-vd.ch            | Dwimcore 		   |
| Joshua Gomes da Costa (project lead)  | joshua.gomesdacosta@heig-vd.ch       | JoshuaGomesDaCosta	|
| Vladimir Mbassi                       | vladimir.mbassi@heig-vd.ch           | Ethras          |
| Olivier Romeo Djeulezeck Tamegui      | olivier.djeulezecktamegui@heig-vd.ch | djeule2		     |
 
## Dependencies

Ce logiciel requièrt l'installation du module @angular/cli via npm, livré avec nodejs.

* NodeJS v. 10.x minimum
* npm (la version dépend de nodejs)
* @angular/cli v. 7.X

Des modules/librairies additionnels sont utilisés dans ce projet:

* @swimlane/ngx-charts v. 11.1.0

## Build and install

1. Forker le repository afin de récupérer les fichiers nécessaires.

2. Installez nodejs via [ce lien](https://nodejs.org/en/) (installation par défaut). 

3. Ensuite, installez le module @angular/cli via la commande suivante: `npm install -g @angular/cli`. Cela va installer angular de façon globale sur le PC (et donc sera réutilisable par la suite).

4. Placez-vous dans le répertoire contenant les fichiers angular (ici, inphinity-app). Vous êtes maintenant prêt à lancer l'application web.

## Run
1. Effectuer la commande `npm install` pour télécharger toutes les dépendances du projet

2. Lancez la commande `ng serve --host=hôtepublique --port port` dans le répertoire contenant les fichiers angular (ici, inphinity-app).

3. Allez sur `http://hôtepublique:port/` afin d'accéder au site web.

4. Commencez à utiliser l'application web !

## Documentation

User manual: see file https://drive.google.com/open?id=1-CjAfkxHJYb66vWc9tLvZewR9xZDWbhw

API documentation: see file https://drive.google.com/open?id=1n51fbnResNVuKk_VuXL_u9rIYbMDNAD-
