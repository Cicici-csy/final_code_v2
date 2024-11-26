function setup() {
  noCanvas();

  // Setup the DOM elements
  inputBox = select('#userInput');
  feedback = select('#feedback');
  typedText = select('#typedText'); // Display the typed text

  // Enable "Enter" key for submitting input
  inputBox.elt.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      getSentiment();
    }
  });
}

function getSentiment() {
  if (inputCount < maxInputs) {
    // Get the text input
    let text = inputBox.value();

    if (text.trim() === '') return; // Ignore empty input

    // Start making the prediction
    sentiment.predict(text, gotResult);

    // Display the typed text in the terminal
    typedText.html(`> ${text}`);

    // Clear the input box for the next entry
    inputBox.value('');
  }
}

function gotResult(prediction) {
  // Accumulate sentiment confidence and update count
  totalConfidence += prediction.confidence;
  inputCount++;

  // Calculate average sentiment score
  let averageConfidence = totalConfidence / inputCount;

  // Invert the confidence score
  let invertedConfidence = (1 - averageConfidence).toFixed(2);

  // Update feedback or display result
  feedback.html(`Sentiment Confidence (Inverted): ${invertedConfidence}`);

  // Optionally disable further typing after max input count
  if (inputCount >= maxInputs) {
    inputBox.attribute("disabled", true);
  }
}



