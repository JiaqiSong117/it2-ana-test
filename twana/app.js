document.querySelector('#search').addEventListener('click', function () {
  var name = document.querySelector('#input').value;
  if (!name) {
    window.alert("please input a name first!");
    return;
  }
  if (StoreCtrl.checkIfPersonExist(name)) {
    window.alert("This name is already there!");
    document.querySelector('#input').value = '';
    return;
  }
  ChartCtrl.clearChart();
  personService.getPersonInfoByName(name).then(function (data) {
    console.log(data);
    var person = PersonCtrl.createPerson(name, data);
    document.querySelector('#input').value = '';
    StoreCtrl.addPersonToStore(person);
    ChartCtrl.updateChart(Array.from(person.dataMap.keys()), [{ name: name, color: person.color, data: Array.from(person.dataMap.values()) }]);
  });

});

document.querySelector('#combine').addEventListener('click', function () {
  // check if data are there
  if (StoreCtrl.getSelectedPersons().size === 0) {
    window.alert("Please add person!");
    return;
  }
  // parse selected data list
  var chartsData = StoreCtrl.computeChartsData();
  // update chart UI
  ChartCtrl.updateChart(chartsData.categories, chartsData.series);
});

document.querySelector('#cleanAll').addEventListener('click', function () {
  //remove from UI cards
  var persons = StoreCtrl.getAllPersons();
  for (var key of persons.keys()) {
    document.querySelector('#' + persons.get(key).id).remove();
  }
  //remove from data store
  StoreCtrl.cleanAllData();
  // clear chart
  ChartCtrl.clearChart();

});
