let myTemplate = document.createElement("template");
myTemplate.innerHTML = `
    <style>

    .clk {
      background-color: white;
    }

    #clock {
      text-align: center;
      padding-top: 40px;
      padding-bottom: 40px;
    }
    </style>

    <div class="clk">
      <div id="clock"> </div>
      <slot name="title"> <p class="clk"> default title </p> </slot>
    </div>`;

class Clock extends HTMLElement {
  timer;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const templateNode = myTemplate.content.cloneNode(true);
    templateNode.querySelector("#clock").style.color = this.color;
    templateNode.querySelector("#clock").style.fontSize = this.size + "px";
    templateNode.querySelector(".clk").style.backgroundColor = this.bgColor;
    shadowRoot.appendChild(templateNode);
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

  disconnectedCallback() {
    clearInterval(this.timer);
    console.log("disconnected from DOM");
  }

  static get observedAttributes() {
    return ["size", "color", "bgColor"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    //name is the attribute name
    //oldValue is the old value before attribute was changed
    //newValue is the changed value
  }

  get color() {
    return this.getAttribute("color");
  }

  set color(newvalue) {
    this.setAttribute("color", newvalue);
  }

  get size() {
    return this.getAttribute("size");
  }

  set size(newvalue) {
    this.setAttribute("size", newvalue);
  }

  get bgColor() {
    return this.getAttribute("bgColor");
  }

  set bgColor(newvalue) {
    this.setAttribute("bgColor", newvalue);
  }
}

customElements.define("c-clock", Clock);
