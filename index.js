import { State, html, render } from './solidjs.js';

function Counter() {
  const count = new State(0);

  return html`
    <p>${count}</p>
  `;
}

render(Counter);
