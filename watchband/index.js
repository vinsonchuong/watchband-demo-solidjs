import {State, Computed, html, render, Show} from './adapter.js'

function Counter() {
  const count = new State(0)

  return html`
    <div>
      <p>${count}</p>

      <button
        on:click=${() => {
          count.set(count.get() + 1)
        }}
      >
        Increment
      </button>

      <${Show} when=${new Computed(() => count.get() > 0)}>
        <button
          on:click=${() => {
            count.set(count.get() - 1)
          }}
        >
          Decrement
        </button>
      <//>
    </div>
  `
}

render(Counter, document.querySelector('#watchband'))
