function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {
  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Deliverable 1: 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    console.log(samples[0])
    // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSample = samples.filter((sampleNumber)=> sampleNumber.id == sample);
    console.log(filteredSample)
    // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.

    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
    var firstFiltered = filteredSample[0];
    console.log(firstFiltered)
    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.

    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var [otu_ids, otu_labels, sample_values] = [firstFiltered.otu_ids,firstFiltered.otu_labels,firstFiltered.sample_values];

    var yticks = otu_ids.slice(0,10).map((label => "OTU " + label.toString())).reverse();
   

    var trace = {
      x:sample_values.slice(0,10).reverse(),
      y: yticks,
      hovertext: otu_labels.slice(0,10).reverse(),
      hoverinfo: "text",
      type: "bar",
      orientation: "h",
    };

    var barData = [trace];

    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"
      };
    
    Plotly.newPlot("bar",barData,barLayout);
    
    var trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode:"markers",
      marker: {
        color: otu_ids,
        colorscale:"Electric",
        size: sample_values



      }
      


    };

    var bubbleData = [trace2];

    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title:"OTU id" },
      automargin: true,
      hovermode: 'closest'


    };

    Plotly.newPlot("bubble",bubbleData,bubbleLayout);



    
    var metadata = data.metadata;

    var filteredData = metadata.filter((sampleNumber2) => sampleNumber2.id == sample);

    var firstFilteredData= filteredData[0];
    console.log(firstFilteredData);

    var washfreq = parseFloat(firstFilteredData.wfreq)

    var trace = {
      value: washfreq,
      type: "indicator",
      mode:"gauge+number",
      title: "Scrubs per Week",
      gauge: {
        axis: {range: [0,10], dtick: 2},
        bar: { color: "green" },
        bgcolor: "rainbow" ,
        steps: [
          {range: [0,2], color: "blue" },
          {range: [2,4], color: "green" },
          {range: [4,6], color: "yellow" },
          {range: [6,8], color: "orange" },
          {range: [8,10], color: "red" }
        ]
      }
    };
    var gaugeData = [trace];

    var gaugeLayout = {
      title: "Belly Button Washing Frequency",
    }

    Plotly.newPlot("gauge",gaugeData,gaugeLayout);

    




   




    
    
    
    
    
  
      

    
    // Deliverable 3: 3. Create a variable that holds the washing frequency.


    // Deliverable 1: 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 

  });
}
