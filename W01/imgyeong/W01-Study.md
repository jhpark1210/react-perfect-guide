## What is JSX?

JavaScript Syntax eXtention

Used to describe & create HTML elements in JavaScript in a declarative way.

Browsers do not support this.

`.jsx` can be operated since the react project supports this extension. When the development server runs, the background build process will handle this extension.

## Component Functions Must Follow...

1. Name should start with an uppercase character
2. Should return "Renderable" content

<br>

**What does React do with the component that has been used in JSX code?**

Call the component tree that performs the commands to update the website DOM.

## Dynamic Image Loading

`import reactImg from './assets/react-core-concepts.png'`

`import` kinda guarantees not to lose the files and paths.

## About the structure of the project

If you are working on a little big project which requires a lot of reusable components, it would be better to put similar components in a single file rather than using `export default`.

## Component Styling

In the real world, we do not use plain CSS. Instead, we are using other CSS framework like [tailwindCSS](https://tailwindcss.com/)

## Using `children` VS Using Attirbutes

Using children
`<TabButton>Components</TabButton>`

Using Attributes
`<TabButton label="Components" />`

## Regard Updating Components

By default, React components execute only once.

**Note:** Well, React DOM will be re-rendered when there are some changes in their virtual DOM. Should read about [virtual DOM](https://ko.legacy.reactjs.org/docs/faq-internals.html)

## State & Hooks

### Rules

1. Only call Hooks inside of Component functions
2. Only call Hooks on the top level

**Note:** If you refresh the page, your state will be gone.

## Dynamic Styling

If you would like to use `tailwindCSS`, using `clsx`, `tailwind-merge` would be the best for this.
