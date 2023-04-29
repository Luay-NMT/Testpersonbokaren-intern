The `ConfirmationQuestion` is a dialog component that renders a confirmation dialog box with a title, message, and two buttons, one for confirming and one for canceling. It uses Material-UI components such as `Button`, `Dialog`, `DialogTitle`, `DialogContent`, `DialogContentText`, `DialogActions`, `CheckCircleIcon`, `CancelIcon`, and `styled` to create the dialog UI.

## Props

The `ConfirmationQuestion` component accepts the following props:
- `open` (boolean): A boolean indicating whether the form should be open or closed.
- `onClose` (function): A callback function that is called when the dialog is closed, either by clicking the cancel button or clicking outside of the dialog.
- `onConfirm` (function): A callback function that will be called when the confirm button of the dialog is clicked.
- `Id` (string): A string that contains the selected object. It is displayed as part of the confirmation question.
- `message` (string): A string that is displayed as the first part of the confirmation message.
- `warningMessage` (string): A string that is displayed as the second part of the confirmation message, after a line break.
- `title` (string): A string that is displayed as the title of the dialog box.

## Functions

The `ConfirmationQuestion` component contains one function:

- `StyledButton`: A function is used to create a custom `StyledButton` component that extends the functionality of the `Button` component. The `StyledButton` component is used for the confirm button in the dialog. The `styled` function is called with a template string that contains CSS styles to apply to the `Button` component. In this case, the `text-transform` property is set to `none` to prevent the text inside the button from being capitalized.

## UI

The `ConfirmationMessage` component renders a dialog box using the Material-UI components. The dialog contains a title and a content area with a text message and the selected object. It has two buttons for confirming and closing the dialog. The submit button calls the `onConfirm` function when clicked, and the cancel button calls the `onClose` functions when clicked.
