// This function runs when you click the "Load Day 1" button
async function loadPage(pageNumber) {
    const container = document.getElementById('quran-text-container');
    container.innerHTML = "Loading..."; // Shows while fetching data

    try {
        // Fetch the Arabic text and Mishary's audio for a specific page
        const response = await fetch(`https://api.alquran.cloud/v1/page/${pageNumber}/ar.alafasy`);
        const data = await response.json();

        container.innerHTML = ""; // Clear the "Loading..." text

        // Loop through the ayahs on that page
        data.data.ayahs.forEach(ayah => {
            // Create a clickable span for each ayah
            const span = document.createElement('span');
            span.className = 'ayah-word';
            span.innerHTML = ayah.text + " ۝ "; // Adds the end-of-ayah symbol
            
            // When clicked, play the specific audio for this ayah
            span.onclick = function() {
                playAudio(ayah.audio);
            };

            // Add it to the screen
            container.appendChild(span);
        });

    } catch (error) {
        container.innerHTML = "Error loading the Quran text. Please try again.";
        console.error(error);
    }
}

// Function to play the audio
function playAudio(audioUrl) {
    const player = document.getElementById('audio-player');
    player.src = audioUrl;
    player.play();
}

