import {createSignal, Show} from 'solid-js'
import {render} from 'solid-js/web'
import html from 'solid-js/html'

function Counter() {
  const [count, setCount] = createSignal(0)

  return html`
    <div>
      <p>${count}</p>

      <button
        on:click=${() => {
          setCount(count() + 1)
        }}
      >
        Increment
      </button>

      <${Show} when=${() => count() > 0}>
        <button
          on:click=${() => {
            setCount(count() - 1)
          }}
        >
          Decrement
        </button>
      <//>
    </div>
  `
}

render(Counter, document.querySelector('#solid'))
