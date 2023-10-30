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

const stackedData = {
  results: [ '', 
      7.6, 
      5.2,  
      38.6,  
      4.0,  
      3.0,  
      18.4,  
      2.6, 
      19.0,  
      1.5, ],
  seriesNames:  ['Parti', 
      'V',  
      'MP',
      'S', 
      'C', 
      'L', 
      'M',  
      'KD', 
      'SD', 
      'Övr', ],
}

function Options() {
  this.title = 'Väljarbarometer september 2023',
  this.colors = Object.values(partyColors);
}


const optionsStacked = {
  'title':'Väljarbarometer september 2023',
  'isStacked': 'percent',
  colors: Object.values(partyColors),
};




// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart', 'table'],'language': 'sv'});

// Set a callback to run when the Google Visualization API is loaded.
// Can instead be specified in load above
google.charts.setOnLoadCallback(drawStacked);
google.charts.setOnLoadCallback(drawBarsV);
google.charts.setOnLoadCallback(drawLines);
google.charts.setOnLoadCallback(drawLinesByBlock);




// CALLBACKS TO DRAW CHARTS


function drawStacked() {

  // Create the data table, becomes private to function 
  // so other drawfunctions can reuse "data" but w other data
  const data = new google.visualization.arrayToDataTable([
    stackedData.seriesNames,
    stackedData.results,
  ]);

  const options = new Options();
  options.isStacked = 'percent';

  // Instantiate and draw charts, passing in different data but same options.
  const chart = new google.visualization.BarChart(document.getElementById('stackedChart'));
  chart.draw(data, options);

}




function drawBarsV() {

  const options = new Options();
  options.legend = {position: 'none'};

  const data = google.visualization.arrayToDataTable([
    ['Parti', 'Andel %', {role: 'style'}],
    ['V', 7.6, options.colors[0]],
    ['MP', 5.2, options.colors[1]],
    ['S', 38.6, options.colors[2]],
    ['C', 4.0, options.colors[3]],
    ['L', 3.0, options.colors[4]],
    ['M', 18.4, options.colors[5]],
    ['KD', 2.6, options.colors[6]],
    ['SD', 19.0, options.colors[7]],
    ['Övr', 1.5, options.colors[8]]
  ]);

  
  const view = new google.visualization.DataView(data);
  view.setColumns([0, 1,
                 { calc: "stringify",
                   sourceColumn: 1,
                   type: "string",
                   role: "annotation" },
                 2]);


  const chart = new google.visualization.ColumnChart(document.getElementById('barChartV'));
  chart.draw(view, options);
}



// LINECHART callback
function drawLines() {

  const options = new Options();
 
  const data = new google.visualization.arrayToDataTable([
    ['Tidpunkt','Vänsterpartiet','Miljöpartiet','Socialdemokraterna','Centerpartiet','Liberalerna','Moderaterna','Kristdemokraterna','Sverigedemokraterna','Övriga'],
    ['Valresultatet 2022',6.8,5.1,30.3,6.7,4.6,19.1,5.3,20.5,1.5],
    ['Juni (2023)', 7.8,5.0,36.6,4.3,3.0,18.5,4.1,18.3,2.4],
    ['September (2023)',7.6,5.2,38.6,4.0,3.0,18.4,2.6,19.0,1.5],
    ['Oktober (2023)',8.1,4.8,37.9,4.1,2.3,16.1,2.9,22.0,1.8],
    //['Förändring sedan föregående mätning',0.5,-0.4,-0.7,0.1,-0.7,-2.3,0.3,3,0,0.3,0.3,-0.5],
  ]);



  const chart = new google.visualization.LineChart(document.getElementById('lineChart'));
  chart.draw(data, options);

}



// LINECHART callback
function drawLinesByBlock() {

  const options = new Options();
  options.colors = [partyColors.m, partyColors.s];

  const data = new google.visualization.arrayToDataTable([
    ['Tidpunkt','M/L/KD/SD','S/V/MP/C'],
    ['Valresultatet 2022', 49.5, 48.9],
    ['Juni (2023)', 43.9, 53.7],
    ['September (2023)', 43.0, 55.4],
    ['Oktober (2023)', 43.3, 54.9],
  ]);


  const chart = new google.visualization.LineChart(document.getElementById('lineChartByBlock'));
  chart.draw(data, options);

}