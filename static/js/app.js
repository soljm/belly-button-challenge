// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the metadata field
    let metadata = data.metadata

    // Filter the metadata for the object with the desired sample number
    metadata = metadata.filter(meta => meta.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let sampleMeta = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sampleMeta.html("")

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (const [key, value] of Object.entries(metadata)) {
      sampleMeta.append("p").text(`${key.toUpperCase()}: ${value}`);
    }  
  });
}

// Function to build both charts
function buildCharts(sampleId) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sample = data.samples

    // Filter the samples for the object with the desired sample number
    sample = sample.filter(s => s.id == sampleId)[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otuIds = sample.otu_ids;
    let otuLabels = sample.otu_labels;
    let sampleValues = sample.sample_values;

    // Build a Bubble Chart
    let bubbleData = [{
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIds
      }
    }];
    
    let layout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {
        title: {
          text: 'OTU ID'
        },
      },
      yaxis: {
        title: {
          text: 'Number of Bacteria'
        },
      },
      showlegend: false,
      height: 600,
      width: 1400
    };

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let barData = [];

    for (let i = 0; i < otuIds.length; i++) {
      barData.push({
        x: sampleValues[i],
        y: otuIds[i]
      });
    }
    
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    barData = barData.sort((a, b) => b.x - a.x).slice(0, 10).reverse();
    
    barData = [{
      x: barData.map(a => a.x),
      y: barData.map(a => "OTU " + a.y),
      type: 'bar',
      orientation: 'h',
      marker: {
        color: 'rgb(123, 170, 216)'
    }}];

    barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: {
        title: {
          text: 'Number of Bacteria'
        },
      },
      showlegend: false,
      height: 600,
      width: 1000
      
    };

    // Render the Bar Chart
    Plotly.newPlot('bar', barData, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropDown = d3.select("#selDataset");
   
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach(name => {
      dropDown.append("option").attr("value", name).text(name);
    });

    // Get the first sample from the list
    let sample = dropDown.property("value");
    
    // Build charts and metadata panel with the first sample
    buildCharts(sample);
    buildMetadata(sample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);

}

// Initialise the dashboard
init();
