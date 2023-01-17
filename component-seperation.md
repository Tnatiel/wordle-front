
# Componets sepreration

## Dumb:
- InstructionsModal
- NavBar
- SignInModal
- Keyboard
- KeyboardRow
- InputBoard
- InputRow

### Dumb components are only responsible for rendering the UI based on the props that they receive.
* [ ] Move the state and logic out of these components, and pass the data and functions they need as props.
* [ ] These components should be simple, and only focus on rendering the UI.

## Smart:
- WordleApp
- App

### Smart component handles the logic and state of the application and dispatch actions.
* [ ] Move the state and logic of your application into these components.
* [ ] These components should handle the data and behavior of your application and dispatch actions if needed


