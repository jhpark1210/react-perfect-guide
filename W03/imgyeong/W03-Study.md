# Using Vanilla CSS

### Pros

-   CSS code is decoupled from JSX code.
-   Minimal amount of access to your JSX code.

### Cons

-   CSS rules may clash across components.

# Inline Styles

### Pros

-   Quick and Easy.
-   Dynamic Styling is easy.

### Cons

-   Need to syle every single element manually.
-   Code becomes dirty...

# Styled Components

### Pros

-   Quick and easy to add.
-   Thinking in React!
-   No CSS rule clashes.

### Cons

-   No clear separation of React and CSS code.
-   Many small wrapper components.

# TailwindCSS

### Pros

-   Rapid development
-   No style clashes
-   Highly configurable & extensible

### Cons

-   LOOOONG className
-   Require Editing JSX

### Note (About Dynamic Styling)

There is a well-known way to solve the problem with dynamic styling in TailwindCSS. You can create a utility function.

1. Should install 3rd-party modules.

`npm install clsx`

and

`npm install tailwind-merge`

2. Then, create a function like this:

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
```

You can see the detailed explanation here: [Link](https://youtu.be/re2JFITR7TI?si=dHpMxYMzheIN7za7)
