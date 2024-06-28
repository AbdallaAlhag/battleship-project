import { ScreenController } from "./controller";

export function welcomePage(){
    const screen = document.querySelector('.screen')
    screen.classList.add('welcome')
    screen.textContent = '';

    const containerElement = document.createElement('div');
    containerElement.classList.add('welcome-container');

    const headerElement = document.createElement('h1')
    headerElement.textContent = 'BATTLESHIP'

    const textElement = document.createElement('p');
    textElement.textContent = 'What is your name?';

    const inputElement = document.createElement('input');

    inputElement.type = 'text'; // or 'password', 'email', 'number', etc.
    inputElement.id = 'myInput';
    inputElement.name = 'myInputName';
    inputElement.placeholder = 'Enter text here...';


    // Create a button element
    const buttonElement = document.createElement('button');

    // Set the attributes and text for the button
    buttonElement.id = 'myButton';
    buttonElement.textContent = 'Submit';

    // Optional: Add classes or styles
    buttonElement.classList.add('button-class');

    // Add an event listener for the button
    buttonElement.addEventListener('click', () => {
        const inputValue = inputElement.value;
        ScreenController(inputValue);
    });

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    containerElement.appendChild(headerElement);
    containerElement.appendChild(textElement);
    buttonContainer.appendChild(inputElement);
    buttonContainer.appendChild(buttonElement);
    containerElement.appendChild(buttonContainer)
    screen.appendChild(containerElement);
}