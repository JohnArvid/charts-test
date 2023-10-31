const partyColors = {
  v:  '#ed1c24',
  mp: '#53a045',
  s:  '#ed1b34',
  c:  '#046a38',
  l:  '#006ab3',
  m:  '#0d9ddb',
  kd: '#005ea1',
  sd: '#e2b404',
  ovr:  '#808080',
}


const currentData = {
  results: [ 
    8.1, 
    4.2,  
    37.9,  
    4.1,  
    2.3,  
    16.1,  
    2.9, 
    22.0,  
    1.8, ],
  seriesNames:  [
    'V',  
    'MP',
    'S', 
    'C', 
    'L', 
    'M',  
    'KD', 
    'SD', 
    'Övr', ],
  changeSinceLast: [
    0.5,
    -0.4, 
    -0.7,
    0.1,
    -0.7,
    -2.3,
    0.3,
    3.0,
    0.3 ],
  month: "Oktober",
  year: 2023,
  history: [
    ['Tidpunkt','Vänsterpartiet','Miljöpartiet','Socialdemokraterna','Centerpartiet','Liberalerna','Moderaterna','Kristdemokraterna','Sverigedemokraterna','Övriga'],
    ['Valresultatet 2022',6.8,5.1,30.3,6.7,4.6,19.1,5.3,20.5,1.5],
    ['Juni (2023)', 7.8,5.0,36.6,4.3,3.0,18.5,4.1,18.3,2.4],
    ['September (2023)',7.6,5.2,38.6,4.0,3.0,18.4,2.6,19.0,1.5],
    ['Oktober (2023)',8.1,4.8,37.9,4.1,2.3,16.1,2.9,22.0,1.8],
  ],
  historyByBlock: [
    ['Tidpunkt','M/L/KD/SD','S/V/MP/C'],
    ['Valresultatet 2022', 49.5, 48.9],
    ['Juni (2023)', 43.9, 53.7],
    ['September (2023)', 43.0, 55.4],
    ['Oktober (2023)', 43.3, 54.9],
  ],
}


// Constructor for options object
function Options() {
  this.title = `Väljarbarometer ${currentData.month} ${currentData.year}`,
  this.colors = Object.values(partyColors);
  this.fontName = 'Questrial'
}



// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart', 'table'],'language': 'sv'});

// Set a callback to run when the Google Visualization API is loaded.
// Can instead be specified in load above
google.charts.setOnLoadCallback(drawCharts);


function drawCharts() {
  drawChange();
  drawStacked();
  drawBarsV();
  drawLines();
  drawLinesByBlock();
}


// CALLBACKS TO DRAW CHARTS

function drawChange() {

  const options = new Options();
  options.legend = {position: 'none'};

  
  const data = new google.visualization.arrayToDataTable([
    ['Parti', ...currentData.seriesNames],
    ['Förändring sedan senaste mätning ', ...currentData.changeSinceLast],
  ]);


  const chart = new google.visualization.ColumnChart(document.getElementById('changeChart'));
  chart.draw(data, options);
}


function drawStacked() {

  const options = new Options();
  options.isStacked = 'percent';

  
  const data = new google.visualization.arrayToDataTable([
    ['Parti', ...currentData.seriesNames],
    ['', ...currentData.results],
  ]);


  const chart = new google.visualization.BarChart(document.getElementById('stackedChart'));
  chart.draw(data, options);
}




function drawBarsV() {

  const options = new Options();
  options.legend = {position: 'none'};

  const data = google.visualization.arrayToDataTable([
    ['Parti', ...currentData.seriesNames],
    ['', ...currentData.results],
    ]);
  
/*
  const data = google.visualization.arrayToDataTable([
    ['Parti', 'Andel %', {role: 'style'}, {role: 'tooltip'}],
    ['V', currentData.results[1], options.colors[0], `Förändring sedan senaste mätning ${currentData.changeSinceLast[1]}`],
    ['MP', currentData.results[2], options.colors[1], `Förändring sedan senaste mätning ${currentData.changeSinceLast[2]}`],
    ['S', currentData.results[3], options.colors[2], `Förändring sedan senaste mätning ${currentData.changeSinceLast[3]}`],
    ['C', currentData.results[4], options.colors[3], `Förändring sedan senaste mätning ${currentData.changeSinceLast[4]}`],
    ['L', currentData.results[5], options.colors[4], `Förändring sedan senaste mätning ${currentData.changeSinceLast[5]}`],
    ['M', currentData.results[6], options.colors[5],`Förändring sedan senaste mätning ${currentData.changeSinceLast[6]}`],
    ['KD', currentData.results[7], options.colors[6], `Förändring sedan senaste mätning ${currentData.changeSinceLast[7]}`],
    ['SD', currentData.results[8], options.colors[7], `Förändring sedan senaste mätning ${currentData.changeSinceLast[8]}`],
    ['Övr', currentData.results[9], options.colors[8], `Förändring sedan senaste mätning ${currentData.changeSinceLast[9]}`]
  ]);
*/


  
  const view = new google.visualization.DataView(data);
  view.setColumns([0, 1]);


  const chart = new google.visualization.ColumnChart(document.getElementById('barChartV'));
  chart.draw(data, options);
}



function drawLines() {

  const options = new Options();
 
  const data = new google.visualization.arrayToDataTable(currentData.history);

  const chart = new google.visualization.LineChart(document.getElementById('lineChart'));
  chart.draw(data, options);
}



function drawLinesByBlock() {

  const options = new Options();
  options.colors = [partyColors.m, partyColors.s];

  const data = new google.visualization.arrayToDataTable(currentData.historyByBlock);

  const chart = new google.visualization.LineChart(document.getElementById('lineChartByBlock'));
  chart.draw(data, options);
}