The `Navbar` component displays a navigation bar with various links to different pages.

## Functions

- `handleClick` : A function is called when the menu icon is clicked, which toggles the `click` state variable.
- `closeMobileMenu` : A function is called when a navbar item is clicked, which sets the `click` state variable to `false` to close the mobile menu.
- `showButton` : A function is used to to show "Extern hemsida" button or not. It checks the width of the window, and if it is less than or equal to 960px, it sets the `button` state variable to `false`. Otherwise, it sets `button` to `true`.

## States
The `Navbar` component defines the following state variables using the useState hook:

- `click` (boolean): A boolean variable that is used to track whether the menu icon has been clicked or not.
- `button` (boolean): A boolean variable that is used to track whether to show `Extern hemsida` button or not depending on the screen size.

## UI

The `Navbar` component renders a navbar using the Material-UI components. The navbar contains four `nav-items` and a `button`. The `nav-items` are links to the different pages in the website. The `button` navigates to the `Testpersonbokaren - extern` website when clicked. If the screen size is less than or equal to 960px, the navbar will transform into a mobile menu with a toggle button at the top right corner.