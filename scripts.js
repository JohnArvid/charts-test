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


const optionsStacked = {
  'title':'Väljarbarometer september 2023',
  'isStacked': 'percent',
  colors: Object.values(partyColors),
};

const optionsBarV = {
    title:'Väljarbarometer september 2023',
    colors: Object.values(partyColors),
    legend: {position: 'none'},
    animation: {
      startup: 'true'}
};


const optionsLines = {
    'title':'Väljarbarometer september 2023',
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

// First callback
function drawStacked() {

  // Create the data table becomes private to function 
  // so second drawfunction can reuse "data" but w other data
  const data = new google.visualization.arrayToDataTable([
    stackedData.seriesNames,
    stackedData.results,
  ]);

  const options = optionsStacked;

  // Instantiate and draw charts, passing in different data but same options.
  const chart = new google.visualization.BarChart(document.getElementById('stackedChart'));
  chart.draw(data, options);

}




// Second callback to draw second chart
function drawBarsV() {

  const data = google.visualization.arrayToDataTable([
    ['Parti', 'Andel %', {role: 'style'}],
    ['V', 7.6, partyColors.v],
    ['MP', 5.2, partyColors.mp],
    ['S', 38.6, partyColors.s],
    ['C', 4.0, partyColors.c],
    ['L', 3.0, partyColors.l],
    ['M', 18.4, partyColors.m],
    ['KD', 2.6, partyColors.kd],
    ['SD', 19.0, partyColors.sd],
    ['Övr', 1.5, partyColors.ovr]
  ]);
  
  const view = new google.visualization.DataView(data);
  view.setColumns([0, 1,
                 { calc: "stringify",
                   sourceColumn: 1,
                   type: "string",
                   role: "annotation" },
                 2]);

  // Set chart options
  // Options can be reused for multiple charts (same w data ofc)
  const options = optionsBarV;
 

  const chart = new google.visualization.ColumnChart(document.getElementById('barChartV'));
  chart.draw(view, options);
}

// LINECHART callback
function drawLines() {

  // Create the data table becomes private to function 
  // so second drawfunction can reuse "data" but w other data
  const data = new google.visualization.arrayToDataTable([
    ['Tidpunkt','Vänsterpartiet','Miljöpartiet','Socialdemokraterna','Centerpartiet','Liberalerna','Moderaterna','Kristdemokraterna','Sverigedemokraterna','Övriga'],
    ['Valresultatet 2022',6.8,5.1,30.3,6.7,4.6,19.1,5.3,20.5,1.5],
    ['Juni (2023)', 7.8,5.0,36.6,4.3,3.0,18.5,4.1,18.3,2.4],
    ['September (2023)',7.6,5.2,38.6,4.0,3.0,18.4,2.6,19.0,1.5],
    ['Oktober (2023)',8.1,4.8,37.9,4.1,2.3,16.1,2.9,22.0,1.8],
    //['Förändring sedan föregående mätning',0.5,-0.4,-0.7,0.1,-0.7,-2.3,0.3,3,0,0.3,0.3,-0.5],
  ]);

  // Set chart options
  // Options can be reused for multiple charts (same w data ofc)
  // As long as the objects are in scope for the draw funtion...
  const options = optionsLines;

  options.colors.push("teal");
  options.colors.push("teal");

  console.log(options.colors);

  // Instantiate and draw charts, passing in data and options.
  const chart = new google.visualization.LineChart(document.getElementById('lineChart'));
  chart.draw(data, options);

}



// LINECHART callback
function drawLinesByBlock() {

  // Create the data table becomes private to function 
  // so second drawfunction can reuse "data" but w other data
  const data = new google.visualization.arrayToDataTable([
    ['Tidpunkt','M/L/KD/SD','S/V/MP/C'],
    ['Valresultatet 2022', 49.5, 48.9],
    ['Juni (2023)', 43.9, 53.7],
    ['September (2023)', 43.0, 55.4],
    ['Oktober (2023)', 43.3, 54.9],
    //['Förändring sedan föregående mätning',0.5,-0.4,-0.7,0.1,-0.7,-2.3,0.3,3,0,0.3,0.3,-0.5],
  ]);

  // Set chart options
  // Options can be reused for multiple charts (same w data ofc)
  // As long as the objects are in scope for the draw funtion...
  const options = optionsLines;

  options.colors = [partyColors.m, partyColors.s];

  console.log(options.colors);

  // Instantiate and draw charts, passing in data and options.
  const chart = new google.visualization.LineChart(document.getElementById('lineChartByBlock'));
  chart.draw(data, options);

}