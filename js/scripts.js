/**
 * @author Harry Stevens
 */

//This project will bring in data from a Google Fusion Table and display it as a Google Geochart

//When everything is loaded, this event handler fires loadGoogle()
$(document).ready(loadGoogle);

//Called by document ready. Loades Google GeoChart package and calls loadData()
function loadGoogle() {
	google.load('visualization', '1', {
		'packages' : ['geochart'],
		callback : 'loadData'
	});
}

//Called by loadGoogle(). Loads the data from the Google Fusion table and calls drawChart()
function loadData() {
	//$.getJSON('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+%27City%27,%27Airport%27,%27Birdstrikes%27,%27Birdstrikes_100000%27,%27Birdstrike_Rating%27+FROM+1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu&key=AIzaSyB-QJux9WIJmey5IJYzPImNzg-xP1gpvU8', drawChart);
	$.getJSON('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+%27City%27,%27Birdstrikes_100000%27+FROM+1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu&key=AIzaSyB-QJux9WIJmey5IJYzPImNzg-xP1gpvU8', drawChart);
}

//Called by loadData(). Formats the data, called fusionData, and draws the GeoChart
function drawChart(fusionData) {

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'City');
	//	data.addColumn('string', 'Airport');
	//	data.addColumn('string', 'Total Birdstrikes (2012)');
	data.addColumn('number', 'Birdstrikes/100k flights (2012)');
	//	data.addColumn('string', 'Birdstrike Rating');
	data.addRows(fusionData.rows);

	var options = {
		region : 'US',
		resolution : 'provinces',
		displayMode : 'markers',
		sizeAxis : {
			minSize : 4,
			maxSize : 4
		},
		colorAxis : {
			colors : ['purple', 'blue', 'green', 'yellow', 'red']
		},
		width : 1000
	};

	var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
	chart.draw(data, options);

}

