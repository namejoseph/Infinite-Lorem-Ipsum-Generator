const textContainer = document.getElementById('text-container');
const linesPerChunk = 20; // Number of lines added per chunk
const colorChangeRate = 300; // Adjusts the rate of color change
const maxContentLength = 2000; // Max number of lines to avoid overflowing the DOM

const randomWords = [
    'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'vivamus', 'lacinia',
    'odio', 'vitae', 'vestibulum', 'cras', 'venenatis', 'euismod', 'malesuada', 'commodo', 'ullamcorper',
    'cursus', 'urna', 'quis', 'lectus', 'tempus', 'elementum', 'mauris', 'dapibus', 'ante', 'nulla', 'erat',
    'volutpat', 'nunc', 'tincidunt', 'quam', 'rhoncus', 'congue', 'laoreet', 'magna', 'malesuada', 'molestie',
    'donec', 'suscipit', 'orci', 'blandit', 'ultricies', 'vel', 'tortor', 'curabitur', 'pharetra', 'vulputate',
    'nullam', 'tristique', 'mauris', 'iaculis', 'etiam', 'velit', 'neque', 'aliquam', 'faucibus', 'scelerisque',
    'feugiat', 'aliquet', 'morbi', 'facilisi', 'fringilla', 'imperdiet', 'erat', 'augue', 'tempor', 'etiam',
    'vivamus', 'tortor', 'etiam', 'leo', 'viverra', 'turpis', 'auctor', 'luctus', 'justo', 'mattis', 'mollis',
    'aenean', 'dui', 'accumsan', 'pellentesque', 'risus', 'iaculis', 'massa', 'suscipit', 'curabitur', 'cursus',
    'vestibulum', 'integer', 'fringilla', 'facilisis', 'commodo', 'viverra', 'egestas', 'etiam', 'urna', 'pellentesque',
    'proin', 'magna', 'ut', 'morbi', 'volutpat', 'mauris', 'elementum', 'vulputate', 'ipsum', 'pharetra', 'nec',
    'mi', 'congue', 'lectus', 'imperdiet', 'curabitur', 'ligula', 'sed', 'vel', 'nisi', 'dictum', 'leo'
  ];

// Function to generate a random sentence with the first letter capitalized
function generateRandomSentence() {
  const sentenceLength = Math.floor(Math.random() * 10) + 5; // Random sentence length (5 to 15 words)
  let sentence = '';
  
  for (let i = 0; i < sentenceLength; i++) {
    const word = randomWords[Math.floor(Math.random() * randomWords.length)];
    sentence += i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word; // Capitalize the first word
    sentence += i === sentenceLength - 1 ? '.' : ' '; // Add a period at the end of the sentence
  }
  
  return sentence;
}

// Function to generate a chunk of random text
function generateRandomText() {
  let textChunk = '';
  for (let i = 0; i < linesPerChunk; i++) {
    textChunk += generateRandomSentence() + ' '; // Generate sentences and append them
  }
  return textChunk;
}

// Function to add text at the bottom
function addText() {
  const textChunk = generateRandomText();
  textContainer.innerHTML += textChunk;
}

// Function to insert text at the top
// function insertTextAtTop() {
//   const textChunk = generateRandomText();
//   textContainer.insertAdjacentHTML('afterbegin', textChunk);
// }

// Function to remove excess content from top
function trimContent() {
  const textHeight = textContainer.scrollHeight;
  if (textHeight > maxContentLength) {
    // Remove excess content from the top
    textContainer.innerHTML = textContainer.innerHTML.slice(textContainer.innerHTML.indexOf('<p>') + 1);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Disable scroll restoration to prevent the browser from restoring the scroll position
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'; // Disable scroll restoration
  }

  // Delay scroll reset to after all content is loaded
  setTimeout(() => {
    window.scrollTo(0, 0);  // Ensure scroll position is at the top
  }, 0);  // Delay of 0ms, ensuring the scroll happens after page rendering

  // Add initial "Lorem ipsum" text to ensure the page starts with it
  const textContainer = document.getElementById('text-container');
  if (textContainer) {
    textContainer.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. ";
    addText(); // Add additional random text after initial "Lorem ipsum"
  } else {
    console.error('textContainer element not found!');
  }
});


// Function to change colors based on scroll position
function changeColors() {
  const scrollPosition = window.scrollY; // Current scroll position

  // Calculate color change continuously based on scroll position
  const textColor = (scrollPosition / colorChangeRate) % 360; // Full 360-degree rotation for text color
  const bgColor = (255 - (scrollPosition / colorChangeRate) % 255); // Full 255 range for background
  
  // Apply the calculated color to the page
  textContainer.style.color = `hsl(${textColor}, 70%, 50%)`;
  document.body.style.backgroundColor = `hsl(${bgColor}, 100%, 90%)`;
}

// Infinite scroll effect and color change
window.addEventListener('scroll', () => {
  // Add new text at the bottom when scrolling near the end
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50) {
    addText(); // Add more text at the bottom
    trimContent(); // Remove excess text to avoid memory overload
  }

  // Insert new content at the top when scrolling near the top
  if (window.scrollY <= 50) {
    // insertTextAtTop(); // Insert more text at the top
    trimContent(); // Remove excess text to avoid memory overload
  }

  // Change colors based on the scroll position
  changeColors();
});
