# React 공부 노트

## `ref`를 사용한 것과 사용하지 않은 input 관리

### `ref` 없이 사용

이 예제에서는 `useState`를 사용하여 input을 관리하고 버튼 클릭 시 플레이어 이름을 업데이트합니다. 상태 관리를 해야 하기 때문에 코드가 길어집니다.

```javascript
import { useState } from 'react';

export default function Player() {
	const [enteredPlayerName, setEnteredPlayerName] = useState('');
	const [submitted, setSubmitted] = useState(false);

	function handleChange(event) {
		setSubmitted(false);
		setEnteredPlayerName(event.target.value);
	}

	function handleClick() {
		setSubmitted(true);
	}

	return (
		<section id='player'>
			<h2>Welcome {submitted ? enteredPlayerName : 'unknown entity'}</h2>
			<p>
				<input type='text' onChange={handleChange} value={enteredPlayerName} />
				<button onClick={handleClick}>Set Name</button>
			</p>
		</section>
	);
}
```

이 방법은 단순히 입력받고 입력값을 대입하는데 코드가 길어지는 단점이 있습니다.

### `ref`를 사용

`useRef`를 사용하여 코드를 간단하게 만들 수 있습니다. `ref`를 통해 JSX 안의 HTML 요소에 접근하고 상태를 추적합니다.

```javascript
import { useRef, useState } from 'react';

export default function Player() {
	const playerName = useRef();

	const [enteredPlayerName, setEnteredPlayerName] = useState(null);

	function handleClick() {
		setEnteredPlayerName(playerName.current.value);
	}

	return (
		<section id='player'>
			<h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
			<p>
				<input ref={playerName} type='text' />
				<button onClick={handleClick}>Set Name</button>
			</p>
		</section>
	);
}
```

이렇게 간소화하여 사용할 수 있으며, `current`를 통해 현재의 HTML 요소를 추적할 수 있습니다.

## `ref`와 `state`의 차이

### `ref`

- 한 번 렌더링되면 계속 추적하며, 컴포넌트 함수가 재실행되지 않음.
- 버튼 클릭과 같은 동작에 따른 변화를 감지할 수 없음.

### `state`

- 상태가 변경될 때마다 컴포넌트를 다시 렌더링함.
- 버튼 클릭과 같은 동작에 따른 변화를 감지하고 처리할 수 있음.

## `ref`를 다른 컴포넌트로 전달하기

`forwardRef` 함수를 사용하여 `ref`를 다른 컴포넌트로 전달할 수 있습니다. 이때 JSX를 구조 분해 할당으로 새롭게 해야 합니다.

```javascript
const MyComponent = React.forwardRef((props, ref) => {
	return <input ref={ref} {...props} />;
});
```

## `useImperativeHandle` 사용

`dialog`와 같은 HTML 태그를 사용할 때, 부모 컴포넌트에서 `ref`를 통해 내장 함수를 호출할 때 발생할 수 있는 문제를 해결합니다. 예를 들어 `dialog` 태그를 `div`로 바꿀 때, 내장 함수가 작동하지 않기 때문에 직접 자식 컴포넌트에서 사용할 수 있도록 하고 부모 컴포넌트에 넘겨주는 것이 좋습니다.

```javascript
import { useImperativeHandle, forwardRef, useRef } from 'react';

const Modal = forwardRef((props, ref) => {
	const modalRef = useRef();

	useImperativeHandle(ref, () => ({
		showModal: () => {
			modalRef.current.showModal();
		},
	}));

	return <dialog ref={modalRef}>This is a modal</dialog>;
});
```

## `createPortal` 사용

`modal`을 React에서 사용하면 특정 컴포넌트 안에 위치하지만, 실제로는 페이지의 가장 상단에 위치하는 것이 보기 좋습니다. `createPortal`을 사용하여 미리 만들어둔 `modal` `div` 안에서 생성되게 할 수 있습니다.

```javascript
import ReactDOM from 'react-dom';

function Modal({ children }) {
	return ReactDOM.createPortal(
		<div className='modal'>{children}</div>,
		document.getElementById('modal-root')
	);
}
```
