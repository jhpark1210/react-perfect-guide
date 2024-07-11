## Caution

You should not use refs for getting all kinds of data from the page since it violates the concept of React. (React pursues declarative programming)

## Ref vs State

### Ref

-  Note that `ref` is not connected at the first component rendering cycle. It is connected from the second cycle.
-  Re-rendering does not happen.

### State

-  If you require to re-render certain components (i.e. the case when the changes should be appeared immediately), you can use state rather than ref.

### forwardRef, useImperativeHandle

-  Allows to pass the `ref` as a prop
-  Allows to expose the functions (useImperativeHandle)
-  This hook is especially useful when you are building a big React project.
