## context api

- props drilling의 복잡성이 증가 함에 따라 전역적으로 사용할수 있는 값을 사용할때 유용하다.
- 컴포넌트 트리 전체에 데이터를 전달할수 있다
- 불필요한 re-render가 발생할수 있다.
- 상태 관리가 복잡해질 수 있다.
- 디버깅이 어려울수 있다.

### 사용법

```jsx
import { createContext } from "react";

const ThemeContext = createContext(null);

import { useState } from "react";
// probider 생성
function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MyComponent />
    </ThemeContext.Provider>
  );
}
// useContex를 사용
import { useContext } from "react";

function MyComponent() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>현재 테마: {theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        테마 변경
      </button>
    </div>
  );
}
```

## useReducer

- useState와 유사 하지만 더욱 복작한 상태 관리에 적합하다.
- Redux와 사용법이 유사하다
- 순수 함수 이기때문에 테스트에 유용하다.
- 복잡성이 증가 할수 있어서 useState가 유용할수 있다.
- 디버깅이 어려울수 있다.

### 사용법

```jsx
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

dispatch({ type: "INCREMENT" });
dispatch({ type: "DECREMENT" });
```

## useEffect

- 라이프 사이클 메서드를 대체하는 hook이다.
- 3가지의 경우로 간단히 나눌수 있다 mount-update-unmount
- 의존성 배열(**dependencies**)을 이용하여 update를 간단히 할수있다.
- **Cleanup**을 사용하여 컴포넌트가 꺼질경우에 effect가 실해되게 할수있다.
- 복잡성이 증가하여 과도하게 사용하면 어떤 동작을 할지 알수가 없을수 있다.

### 사용법

```jsx
useEffect(() => {
  // 컴포넌트가 마운트되거나 업데이트될 때 실행되는 코드
  return () => {
    // 컴포넌트가 언마운트되거나 업데이트되기 전에 실행되는 코드
  };
}, [dependencies]);
```

- **데이터 가져오기: API 호출, 구독 설정 등의 작업을 수행할 수 있습니다.**
- **수동 DOM 조작: 컴포넌트가 마운트/언마운트될 때 특정 DOM 요소를 조작할 수 있습니다.**
- **타이머 설정: `setTimeout`, `setInterval` 등의 타이머 함수를 설정할 수 있습니다.**
- **로깅: 컴포넌트의 라이프사이클 이벤트를 로깅할 수 있습니다.**
