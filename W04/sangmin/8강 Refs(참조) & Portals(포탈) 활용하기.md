
##### useState를 사용해서 사용자 입력 관리

```jsx
import { useState } from "react";

export default function Player() {
  const [enteredPlayerName, setEnteredPlayerName] = useState();
  const [submiited, setSubmitted] = useState();

  function handleChange(event) {
    setSubmitted(false);
    setEnteredPlayerName(event.target.value);
  }

  function handleClick() {
    setSubmitted(true);
  }

  return (
    <section id="player">
      <h2>Welcome {submiited ? enteredPlayerName : "unknown entity"}</h2>
      <p>
        <input type="text" onChange={handleChange} value={enteredPlayerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
```


<img src="https://lh3.googleusercontent.com/d/1lhS1EQtIUSzC4sXG2iTm1AdbkeYfEqcr=w1335-h911-iv1">
고작 이름을 변경해주는 기능일 뿐인데도 코드가 상당히 길다.

##### useRef를 사용해서 사용자 입력 관리

```jsx
import { useRef, useState } from "react";

export default function Player() {
  const playerName = useRef(null);

  const [enteredPlayerName, setEnteredPlayerName] = useState();

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
  }

  return (
    <section id="player">
      <h2>
        Welcome {enteredPlayerName ?? "unknown entity"}
      </h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
```

useRef를 사용하면 훨신 더 코드가 간결해진다.


##### DOM 제어

ref.current는 input요소를 가리키므로 아래 코드처럼 제어가 가능 

```jsx
  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = "";
  }
```


### 참조와 상태의 차이

리액트 컴포넌트는 참조의 변화에는 컴포넌트 함수가 재실행되지 않음

반대로 상태의 경우에는 상태를 업데이트하면 컴포넌트 함수가 재실행됨

이것이 State와 Ref의 가장 큰 차이이고 사용하는 목적이 있음

**상태**

1. 상태 값들은 컴포넌트 재실행을 야기함
2. 따라서 상태는 UI에 즉각적으로 반영이 되어야 하는 값들이 있을 때 사용
3. 상태를 사용하지 않는 경우는 
	1. 시스템 내부에 보이지 않는 쪽에서 다루는 값
	2. UI에 직접적으로 영향을 끼치지 않는 값들을 가지고 있을 경우

**참조**

1. 컴포넌트를 재실행하지 않음 (컴포넌트들은 참조 값이 바뀌었다고 재실행되지 않음)
2. DOM 요소에 직접적인 접근이 필요할 때 참조를 사용


### HTML에서 제공하는 모달 태그 Dialog

[mdn dialog 태그](https://developer.mozilla.org/ko/docs/Web/HTML/Element/dialog)


### 컴포넌트 밖에 선언한 변수

아래와 같은 코드가 있다.

```jsx
let timer;

export default function TimerChallenge() {
	return <div></div>
}
```

컴포넌트 밖에 선언된 timer 변수는 TimerChallege 컴포넌트들과 공유가 된다.


##### 커스텀 컴포넌트로 Ref 전달하기

부모 컴포넌트에서 자식 컴포넌트의 요소에 접근할 수 있음

```jsx
import { useRef } from 'react'

import ResultModal from './ResultModal'

export default function TimerChallenge() {
	const dialog = useRef();

	function handleStop() {
		console.log(dialog.current)
	}

	return <>
		<ResultModal ref={dialog}></ResultModal>
		<button onClick={handleStop}></button>
	</>
}
```


부모 컴포넌트의 ref를 받기 위해서는 forwardRef라는 함수를 사용한다.

forwardRef를 사용하면 두 번째 매개변수로 부모 컴포넌트로부터 받은 ref를 받을 수 있음

```jsx
import { forwardRef } from 'react'

const ResultModal = forwardRef(function ResultModal(props, ref){
	return <dialog ref={ref}></dialog>
})

export default ResultModal
```


##### useImperativeHandle 

리액트 공식 docs 사이트에는 ref로 노출되는 핸들을 사용자가 직접 정의할 수 있게 해주는 React 훅이라고 나와 있다.

자식 컴포넌트

```jsx
import { useRef, forwardRef, useImperativeHandle } from 'react'

const ResultModal = forwardRef(function ResultModal(props, ref){
	const dialog = useRef()
	
	useImperativeHandle(ref, () => {
		open() {
			dialog.current.showModal()
		}
	})
	
	return <dialog ref={dialog}></dialog>
})

export default ResultModal
```


부모 컴포넌트

```jsx
import { useRef } from 'react'

import ResultModal from './ResultModal'

export default function TimerChallenge() {
	const dialog = useRef();

	function handleStop() {
		dialog.current.open()
	}

	return <>
		<ResultModal ref={dialog}></ResultModal>
		<button onClick={handleStop}></button>
	</>
}
```

위 코드처럼 useImperativeHandle을 사용하면 current 값을 커스텀 할 수 있다.


### Portals

포털은 Component의 특수한 위치로 옴기기 위해 사용 

포털을 사용하기 위해서는 createPortal 함수를 사용함
그리고 index.html 에 받을 수 있는 위치를 정하는 게 좋음

아래 코드를 보면 portal을 사용하기 위해서 modal 이라는 아이디를 가진 요소를 만들어 둠


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Refs & Portals</title>
  </head>
  <body>
    <div id="modal"></div>
    <div id="content">
      <header>
        <h1>The <em>Almost</em> Final Countdown</h1>
        <p>Stop the timer once you estimate that time is (almost) up</p>
      </header>
      <div id="root"></div>
    </div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```


ResultModal 컴포넌트
```jsx
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="result-modal" ref={dialog} onClose={onReset}>
      {userLost && <h2>Your {reslut}</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
```


<img src="https://lh3.googleusercontent.com/d/1eIoildE1-8Mv1qXqP9Nq1w9_6fILwjbu=w1335-h911-iv1" >
