class Clock extends HTMLElement {
  constructor() {
    super();

    const innerHTML = `
          <style>
          .clk {
            background-color: black;
          }
          #clock {
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
    var date = new Date(); 
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    hour = this.updateTime(hour);
    min = this.updateTime(min);
    sec = this.updateTime(sec);
    this.shadowRoot.getElementById("clock").innerText =
      hour + " : " + min + " : " + sec; 
  }
  connectedCallback() {
    this.currentTime();
    setInterval(() => {
      this.currentTime();
    }, 1000);
  }
}

customElements.define("c-clock", Clock); // define custom element
