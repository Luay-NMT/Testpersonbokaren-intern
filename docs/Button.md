The `button` component renders a custom styled button in the website. It is used in the navbar component to navigate to `Testpersonbokaren - extern`.

## Props

The `button` component accepts the following props:

- `children` (String): A string that represents the content of the button.
- `onClick` (function): A function that will be called when the button is clicked.

## UI

This component renders a `<button>` element wrapped in a `<Link>` component from React Router. The `<Link>` component allows to create a link to a specified URL (`http://localhost:4000/`) with a target attribute set to open the link in a new tab.