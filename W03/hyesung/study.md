## 5강: 상태 끌어올리기

### 상태 끌어올리기

- **상태 끌어올리기**는 여러 컴포넌트에서 공유해야 하는 상태를 가장 가까운 공통 조상 컴포넌트로 옮기는 과정입니다.
- 이는 컴포넌트 간 상태를 일관성 있게 관리하고, 데이터 흐름을 단방향으로 유지하는 데 도움이 됩니다.

```jsx
import { useState } from 'react';
import UserInput from './UserInput';

export default function App() {
	const [userInput, setUserInput] = useState({
		initialInvestment: 10000,
		annualInvestment: 1200,
		expectedReturn: 6,
		duration: 10,
	});

	function handleChange(inputIdentifier, newValue) {
		setUserInput((prevUserInput) => {
			return {
				...prevUserInput,
				[inputIdentifier]: newValue,
			};
		});
	}

	return <UserInput userInput={userInput} onInputChange={handleChange} />;
}
```

## 6강: 리액트 컴포넌트 스타일링

### 바닐라 CSS

- **장점**: JSX 코드와 분리되어 있음, 최소한의 접근만 필요.
- **단점**: 컴포넌트 간 CSS 규칙 충돌 가능성.

### 인라인 스타일

- **장점**: 빠르고 쉬운 스타일링, 동적 스타일링이 용이.
- **단점**: 각 요소를 개별적으로 스타일링해야 하므로 코드가 지저분해짐.

### Styled Components

- **장점**: 빠르고 쉬운 추가, React와 함께 생각하기, CSS 규칙 충돌 없음.
- **단점**: React와 CSS 코드의 명확한 분리가 어려움, 많은 작은 래퍼 컴포넌트 생성.

```jsx
import styled from 'styled-components';

const Button = styled.button`
	background-color: ${(props) => (props.primary ? 'blue' : 'gray')};
	color: white;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
`;

export default Button;
```

## 7강: 리액트 디버깅

### 리액트 DevTools 사용하기

- **React DevTools**는 리액트 애플리케이션의 컴포넌트 트리와 상태를 확인하고 수정할 수 있는 브라우저 확장 프로그램입니다.
- **설치 방법**:
  1. 크롬 웹 스토어에서 `React Developer Tools` 검색 후 설치.
  2. 개발자 도구(F12)를 열고, 새로 추가된 `Components` 및 `Profiler` 탭을 확인.

### Components 탭

- 애플리케이션의 컴포넌트 트리를 시각적으로 확인할 수 있습니다.
- 각 컴포넌트의 `props`와 `state`를 실시간으로 확인 및 수정할 수 있습니다.

### Profiler 탭

- 리액트 애플리케이션의 성능을 분석하고, 성능 문제를 찾고 고치는 데 유용합니다.
- 각 렌더링의 비용을 확인하고, 성능을 최적화할 수 있는 인사이트를 제공합니다.

### 엄격 모드(StrictMode) 적용하기

- **엄격 모드**는 잠재적인 문제를 식별하고, 개발 중에 경고를 제공하는 도구입니다.
- `<StrictMode>`로 래핑된 컴포넌트는 일부 함수를 두 번 호출하여 사이드 이펙트를 감지합니다.
- 실제 배포 시에는 성능에 영향을 주지 않습니다.

```jsx
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>
);
```

이 파일을 통해 리액트 컴포넌트 스타일링 및 디버깅 방법에 대해 명확히 이해할 수 있을 것입니다.
