import { html } from "../lib.js";


export const loading = () => html`<div class="lds-dual-ring"></div>`;


export const homeTempl = (onLog, onReg) => html`
<h1>COUNTRY - CAPITAL QUIZ</h1>
<div>
    <button @click=${onLog} class="entry">LOGIN</button>
    <button @click=${onReg} class="entry">REGISTER</button>
</div>`;


export const loginTempl = (onCan, onLog) => html`
<h1></h1>
<label>USER:
    <input type="text">
</label>
<label>PASSWORD:
    <input type="text">
</label>
<button @click=${onCan} class="entry">CANCEL</button>
<button @click=${onLog} class="entry">LOGIN</button>`;


export const registerTempl = (onCan, onReg) => html`
<h1>Rgister form:</h1>
<label>USER:
    <input type="text">
</label>
<label>PASSWORD:
    <input type="text">
</label>
<label>REPEATE PASS:
    <input type="text">
</label>
<button @click=${onCan} class="entry">CANCEL</button>
<button @click=${onReg} class="entry">REGISTER</button>`;


export const choiceTempl = (onChoice, onExit) => html`
<h2>Select region:</h2>
<button class="exit" @click=${onExit}>EXIT</button>
<div>
    <button id="europe" @click=${onChoice} class="entry">EUROPE</button>
    <button id="asia" @click=${onChoice} class="entry">ASIA</button>
    <button id="america" @click=${onChoice} class="entry">AMERICA</button>
    <button id="africa" @click=${onChoice} class="entry">AFRICA</button>
    <button id="oceania" @click=${onChoice} class="entry">OCEANIA</button>
</div>`;


export const startTempl = (showQuestion, continent, data, onContinue) => html`
<h4>TOP TEN OF ${continent.toUpperCase()}</h4>
${data
    ? data.map(r => html`<p>${r.name} - ${r.rating}</p>`)
    : null}
<button id="new" class="start" @click=${onContinue}>BACK</button>
<button class="start" @click=${showQuestion}>LET'S GO</button>`;


export const gameTempl = (question, answers, onChoice, onContinue) => html`
<h3>What's the Capital of:</h3>
<h2>${question.name}</h2>
<button id="new" class="exit" @click=${onContinue}>BACK</button>
<div>
    <button id=${answers[0]} @click=${onChoice} class="answ">${answers[0]}</button>
    <button id=${answers[1]} @click=${onChoice} class="answ">${answers[1]}</button>
</div>
<div>
    <button id=${answers[2]} @click=${onChoice} class="answ">${answers[2]}</button>
    <button id=${answers[3]} @click=${onChoice} class="answ">${answers[3]}</button>
</div>`;


export const endGameTempl = (continent, result, alls, time, points, onContinue) => html`
<h4>${result} true answers from ${alls} question  of ${continent.toUpperCase()} in ${time} seconds.</h4>
<h4>Your score: ${points.toFixed(4)} </h4>
<button id="exit" @click=${onContinue} class="entry">EXIT</button>
<button id="new" @click=${onContinue} class="entry">TRY AGAIN</button>`;
