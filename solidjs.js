import { makeHtml } from 'watchband/html';

export { State } from 'watchband/component';

const baseHtml = makeHtml(window, {
  transform({ tag, attributes, children }) {
    return { tag, attributes, children };
  },
});

export function html(strings, ...values) {
  return baseHtml(strings, ...values).element;
}

export function render(Component, container = document.body) {
  container.append(Component());
}
