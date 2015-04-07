
var _eventId = 0;

var _availableEvent = [
  {
    id: 0,
    title: 'Pic de consommation électrique',
    comments : 'Contrairement à d\'autres formes d\'énergie, l\'énergie électrique ne peut généralement pas être stockée telle quelle à grande échelle, chaque kilowatt-heure devant donc être produit au moment de sa consommation. Ce délicat équilibre entre l\'offre et la demande doit être maintenu en tout temps pour assurer la fiabilité du service électrique. Par ailleurs, la demande globale d\'électricité suit des cycles journaliers, hebdomadaires et saisonniers, basés notamment sur une combinaison de facteurs, dont la succession du jour et de la nuit, le climat, l\'activité économique et les habitudes de vie quotidienne des ménages. D\'autre part, un réseau peut être momentanément surchargé en raison de la déficience d’une ligne ou par la non-disponibilité d\'une partie du parc de production, comme ce fut le cas au Texas en février 20113 .',
    links: [
      {
        title: 'Données réelles',
        subtitle: 'Site officiel RTE',
        url: 'http://clients.rte-france.com/lang/fr/visiteurs/vie/courbes.jsp'
      },
      {
        title: 'Mieux gérer les pics de consommation',
        subtitle: 'Article Le Monde',
        url: 'http://www.lemonde.fr/economie/article/2012/12/10/mieux-gerer-les-pics-de-consommation_1802253_3234.html'
      }
    ]
  }
]


exports.setEventWithId = function(eventId) {
  _eventId = eventId;
}

exports.getEventId = function() {
  _eventId;
}

exports.getEvent = function () {
  return _availableEvent[_eventId];
}
