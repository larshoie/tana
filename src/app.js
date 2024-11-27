import Typewriter from "./llm-effect.js";

var app = document.getElementById("typewriter");

var typewriter = new Typewriter(app, {
  loop: false,
  delay: 200,
  cursor: "",
});

typewriter
  .pasteString(
    `<button class="clickable" popovertarget="dogs-popover">⦿</button>
     <div id="dogs-popover" popover>
       <p>Dogs: Go from thought to task, meeting agenda, tweet, or published article in seconds. Voice memos so powerful you can do real work while walking the dog.</p>
     </div>`
  )
  .typeString("Walk and work")

  .pasteString(
    '<video src="https://tana.inc/promo_video_2.mp4" loop muted></video>'
  )

  .pasteString(
    `<button class="clickable" popovertarget="ducks-popover">⦿</button>
     <div id="ducks-popover" popover>
       <p>Duck: Go from thought to task, meeting agenda, tweet, or published article in seconds. Voice memos so powerful you can do real work while walking the duck.</p>
     </div>`
  )
  .typeString("Contribute more by typing less")

  .pasteString(
    '<video src="https://tana.inc/promo_video_2.mp4" loop muted></video>'
  )

  .pasteString(
    `<button class="clickable" popovertarget="cats-popover">⦿</button>
     <div id="cats-popover" popover>
       <p>Cats: Go from thought to task, meeting agenda, tweet, or published article in seconds. Voice memos so powerful you can do real work while walking the cat.</p>
     </div>`
  )
  .typeString("Collect, connect, and apply")

  .pasteString(
    '<video src="https://tana.inc/promo_video_2.mp4" loop muted></video>'
  )
  .start();
