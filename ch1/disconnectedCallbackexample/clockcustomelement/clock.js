class Clock extends HTMLElement {
  timer;

  constructor() {
    super();

    const innerHTML = `
         <style>
 
         .clk {
           background-color: black;
         }
 
         #clock {
           font-family: 'Orbitron', sans-serif;
           color: red;
           font-size: 56px;
           text-align: center;
           padding-top: 40px;
           padding-bottom: 40px;
         }
         </style>
 
         <div class="clk">
 
         <div id="clock"></div>
 
         </div>`;

    const shadowDom = this.attachShadow({ mode: "open" });
    shadowDom.innerHTML = innerHTML;
  }

  updateTime(k) {
    if (k < 10) {
      return "0" + k;
    } else {
      return k;
    }
  }

  currentTime() {
    var date = new Date(); /* creating object of Date class */
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    hour = this.updateTime(hour);
    min = this.updateTime(min);
    sec = this.updateTime(sec);
    this.shadowRoot.getElementById("clock").innerText =
      hour + " : " + min + " : " + sec; /* adding time to the div */
  }

  connectedCallback() {
    this.currentTime();
    this.timer = setInterval(() => {
      this.currentTime();
    }, 1000);
  }
  // disconnectedCallback is triggered when Shadow DOM is removed from the hosting node.
  disconnectedCallback() {
    clearInterval(this.timer);
    console.log("disconnected from DOM");
  }
}

customElements.define("c-clock", Clock);
