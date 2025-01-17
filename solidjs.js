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
import {isSignal, Computed} from 'watchband/signal'

export {State} from 'watchband/component'

const bindChild = chain(
  (next) => (context, element, maybeChildArray) => {
    if (!Array.isArray(maybeChildArray)) {
      return next(context, element, maybeChildArray)
    }

    for (const child of maybeChildArray) {
      next(context, element, child)
    }
  },
  (next) => (context, element, child) => {
    return next(
      context,
      element,
      isSignal(child)
        ? new Computed(() => {
            const value = child.get()
            return value?.element ?? value
          })
        : child,
    )
  },
  bindChildListSignal,
  bindChildSignal,
  bindChildListPart,
  bindChildPart,
  appendChild,
)

const baseHtml = makeHtml(
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

export function html(strings, ...values) {
  return baseHtml(strings, ...values).element
}

export function render(component, container = document.body) {
  container.append(component())
}

export function Show() {}
