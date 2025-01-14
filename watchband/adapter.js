import {
  makeHtml,
  chain,
  configureCreateElement,
  configureCreateFragment,
  bindAttribute,
  bindChildListSignal,
  bindChildSignal,
  bindChildListPart,
  bindChildPart,
  appendChild,
} from 'watchband/html'
import {Computed} from 'watchband/signal'

export {State, Computed} from 'watchband/component'

const bindChild = chain(
  (next) => (context, element, maybeChildArray) => {
    if (!Array.isArray(maybeChildArray)) {
      return next(context, element, maybeChildArray)
    }

    for (const child of maybeChildArray) {
      next(context, element, child)
    }
  },
  bindChildListSignal,
  bindChildSignal,
  bindChildListPart,
  bindChildPart,
  appendChild,
)

export const html = makeHtml(
  window,
  chain(
    (next) => (context, tag, attributes, children) => {
      return typeof tag === 'function'
        ? tag({...attributes, children}).element
        : next(context, tag, attributes, children)
    },
    configureCreateElement(bindAttribute, bindChild),
  ),
  chain(configureCreateFragment(bindChild)),
)

export function render(component, container = document.body) {
  const {element} = component()
  container.append(element)
}

export function Show({when, fallback = '', children}) {
  const signal = new Computed(() => {
    return when.get() ? children[0] : fallback
  })
  return html`${signal}`
}

export function For({each, children: [render]}) {
  const signal = new Computed(() => {
    return each.get().map((item) => render(item).element)
  })

  return html`${signal}`
}
