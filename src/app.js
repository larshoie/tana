import Typewriter from "./llm-effect.js";


document.addEventListener('DOMContentLoaded', function () {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.tagName === 'VIDEO' && node.classList.contains('video')) {
          node.addEventListener('mouseover', () => node.play());
          node.addEventListener('mouseout', () => node.pause());
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});




var app = document.getElementById("typewriter");

var typewriter = new Typewriter(app, {
  loop: true,
  delay: 150,
  deleteSpeed: 200,
  cursor: "",
  onCreateTextNode: (character) => {
    // Create a span for each character
    const span = document.createElement("span");
    span.textContent = character;

    // Apply the fade-in animation to each character
    span.style.opacity = 0; // Start invisible
    span.style.transition = "opacity 0.2s ease-in-out"; // Smooth fade-in

    // Delay the fade-in slightly for each character
    setTimeout(() => {
      span.style.opacity = 1; // Fade in
    }, 0);

    return span; // Return the custom span
  },
  // onRemoveNode: ({ node }) => {
  //   // Apply fade-out effect
  //   node.style.transition = "opacity 0.5s ease-in-out"; // Smooth fade-out
  //   node.style.opacity = 0; // Start fade-out

  //   // Wait for the fade-out to complete before removing the node
  //   setTimeout(() => {
  //     if (node.parentNode) {
  //       node.parentNode.removeChild(node); // Remove the node from the DOM
  //     }
  //   }, 500); // Match the duration of the fade-out
  // },
});

// Add event listeners for hover actions
app.addEventListener("mouseenter", () => {
  typewriter.stop(); // Pause typing when hovering
});

app.addEventListener("mouseleave", () => {
  typewriter.start(); // Resume typing when hover ends
});

typewriter
  .pasteString(
    `<button class="clickable" popovertarget="dogs-popover" style="--anchor: dogs-popover">⦿</button>
     <div id="dogs-popover" popover style="--anchor: dogs-popover; top: 0; right: 0;">
       <p>
       <span class="tag">#dogs</span>
       Dogs: Go from thought to task, meeting agenda, tweet, or published article in seconds. Voice memos so powerful you can do real work while walking the dog.
       </p>
     </div>`
  )
  .typeString("Walk and work")

  .pasteString(
    '<video src="https://tana.inc/promo_video_2.mp4" loop muted class="video"></video>'
  )

  .pasteString(
    `<button class="clickable" popovertarget="ducks-popover" style="--anchor: ducks-popover">⦿</button>
     <div id="ducks-popover" popover style="--anchor: ducks-popover; top: 0; right: 0;">
       <p>
       Duck: Go from thought to task, meeting agenda, tweet, or published article in seconds. Voice memos so powerful you can do real work while walking the duck.
       </p>
     </div>`
  )
  .typeString("Contribute more by typing less")

  .pasteString(
    '<video src="https://tana.inc/promo_video_2.mp4" loop muted class="video"></video>'
  )

  .pasteString(
    `<button class="clickable" popovertarget="cats-popover">⦿</button>
     <div id="cats-popover" popover>
       <p>
      Use the Tana meeting assistant to get ↓

      Meeting summaries that link to the transcript
      Action items sent to your task board
      CRM that adds info about contacts
       </p>
     </div>`
  )
  .typeString("ChatGPT with benefits")
  .pasteString(
    `<button class="clickable" popovertarget="cats-popover">⦿</button>
     <div id="cats-popover" popover>
       <p>
       Experience AI in a flexible, powerful editor. Go from chat to structured knowledge embedded in your personal knowledge base. And yes, you can chat with your content.
       </p>
     </div>`
  )
  .pasteString(
    '<video src="https://tana.inc/promo_video_2.mp4" loop muted class="video"></video>'
  )
  .pauseFor(5000)
  .start();






