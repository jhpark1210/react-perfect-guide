# React 완벽 가이드 3강

## JSX

- **JavaScript Syntax Extension (JSX)**: 자바스크립트 문법을 확장하여 HTML과 유사한 문법을 사용합니다.
- 브라우저에서 직접 인식할 수 없으며, 빌드 과정에서 변환이 필요합니다.

```jsx
function MyComponent() {
	return (
		<div>
			<h1>Hello, JSX!</h1>
		</div>
	);
}
```

## Custom 컴포넌트 생성 및 활용

커스텀 컴포넌트는 항상 첫 글자를 대문자로 시작해야 합니다. 이렇게 하면 내장 요소와의 중복을 방지할 수 있습니다.

```jsx
import reactImg from './assets/react-core-concepts.png';

function Header() {
	return (
		<header>
			<img src={reactImg} alt='Stylized atom' />
			<h1>React Essentials</h1>
			<p>Fundamental React concepts you will need for almost any app you are going to build!</p>
		</header>
	);
}

function App() {
	return (
		<div>
			<Header />
			<main>
				<h2>Time to get started!</h2>
			</main>
		</div>
	);
}

export default App;
```

## 동적 HTML 속성, 이미지 설정

이미지 경로를 소스 속성값으로 직접 작성하면 파일이 **유실될 위험**이 있습니다. 이는 Webpack과 같은 모듈 번들러가 프로젝트를 빌드할 때 정적 자원을 처리하지 못하기 때문입니다. 이를 해결하기 위해 이미지를 JavaScript 모듈로 import합니다.

```jsx
import reactImg from './assets/react-core-concepts.png';

<img src={reactImg} alt='Stylized atom' />;
```

## Props 개념

Props는 부모 컴포넌트가 자식 컴포넌트에 데이터를 전달하는 방법입니다.

```jsx
function CoreConcept({ image, title, description }) {
	return (
		<li>
			<img src={image} alt={title} />
			<h3>{title}</h3>
			<p>{description}</p>
		</li>
	);
}

function App() {
	return (
		<main>
			<section id='core-concepts'>
				<h2>Core Concepts</h2>
				<ul>
					<CoreConcept title='제목1' description='설명1' image='imageProps' />
					<CoreConcept title='제목2' description='설명2' image='imageProps' />
					<CoreConcept title='제목3' description='설명3' image='imageProps' />
					<CoreConcept title='제목4' description='설명4' image='imageProps' />
				</ul>
			</section>
		</main>
	);
}
```

### Props를 대체할 수 있는 문법

데이터 배열을 사용하여 쉽게 관리하고, 스프레드 연산자와 구조 분해 할당을 사용할 수 있습니다.

- 스프레드 연산자?  
  JavaScript spread 연산자(...)를 사용하면 기존 배열이나 객체의 전체 또는 일부를 다른 배열이나 객체로 빠르게 복사할 수 있습니다.

```jsx
import componentsImg from './assets/components.png';
import propsImg from './assets/config.png';
import jsxImg from './assets/jsx-ui.png';
import stateImg from './assets/state-mgmt.png';

export const CORE_CONCEPTS = [
	{
		image: componentsImg,
		title: 'Components',
		description: 'The core UI building block - compose the user interface by combining multiple components.',
	},
	{
		image: jsxImg,
		title: 'JSX',
		description: 'Return (potentially dynamic) HTML(ish) code to define the actual markup that will be rendered.',
	},
	{
		image: propsImg,
		title: 'Props',
		description: 'Make components configurable (and therefore reusable) by passing input data to them.',
	},
	{
		image: stateImg,
		title: 'State',
		description: 'React-managed data which, when changed, causes the component to re-render & the UI to update.',
	},
];

function CoreConcept({ image, title, description }) {
	return (
		<li>
			<img src={image} alt={title} />
			<h3>{title}</h3>
			<p>{description}</p>
		</li>
	);
}

function App() {
	return (
		<main>
			<section id='core-concepts'>
				<h2>Core Concepts</h2>
				<ul>
					{CORE_CONCEPTS.map((concept) => (
						<CoreConcept key={concept.title} {...concept} />
					))}
				</ul>
			</section>
		</main>
	);
}
```

## Children Prop

컴포넌트 사이에 텍스트나 복잡한 JSX 구조를 정의하여 컴포넌트 합성에 사용합니다.

```jsx
// TabButton.jsx
export default function TabButton({ children }) {
	return (
		<li>
			<button>{children}</button>
		</li>
	);
}

// App.jsx
<section id='example'>
	<h2>Examples</h2>
	<menu>
		<TabButton>BUTTON</TabButton>
	</menu>
</section>;
```

## 이벤트 처리

JSX에서는 DOM 접근자 대신 이벤트 처리용 prop을 사용합니다.

```jsx
export default function TabButton({ children }) {
	function handleClick() {
		console.log('clicked');
	}

	return (
		<li>
			<button onClick={handleClick}>{children}</button>
		</li>
	);
}
```

### 함수를 Prop의 값으로 전달하기

```jsx
function handleSelect() {
	console.log('Click');
}

<TabButton onSelect={handleSelect}>Button</TabButton>;
```

```jsx
export default function TabButton({ children, onSelect }) {
	return (
		<li>
			<button onClick={onSelect}>{children}</button>
		</li>
	);
}
```

### 이벤트 함수에 커스텀 인자 전달하기

```jsx
function handleSelect(selectedButton) {
	console.log(selectedButton);
}

<TabButton onSelect={() => handleSelect('components')}>Button</TabButton>;
```

### Decomposing (구조 분해 할당) 예제

```jsx
function MyComponent({ priority }) {
	return <p>Priority: {priority}</p>;
}

// or

function MyComponent(props) {
	return <p>Priority: {props.priority}</p>;
}
```

## State 관리 & Hooks 사용법

리액트에서 State는 `useState`라는 Hook을 통해 관리됩니다.

```jsx
import { useState } from 'react';

function App() {
	const [selectedTopic, setSelectedTopic] = useState('components');

	function handleSelect(selectedButton) {
		setSelectedTopic(selectedButton);
	}

	return (
		<div>
			<Header />
			<main>
				<section id='core-concepts'>
					<h2>Core Concepts</h2>
					<ul>
						<CoreConcept {...CORE_CONCEPTS[0]} />
						<CoreConcept {...CORE_CONCEPTS[1]} />
						<CoreConcept {...CORE_CONCEPTS[2]} />
						<CoreConcept {...CORE_CONCEPTS[3]} />
					</ul>
				</section>
				<section id='examples'>
					<h2>Example</h2>
					<menu>
						<TabButton onSelect={() => handleSelect('components')}>Components</TabButton>
						<TabButton onSelect={() => handleSelect('jsx')}>JSX</TabButton>
						<TabButton onSelect={() => handleSelect('props')}>Props</TabButton>
						<TabButton onSelect={() => handleSelect('state')}>State</TabButton>
					</menu>
					<div id='tab-content'>
						<h3>{EXAMPLES[selectedTopic].title}</h3>
						<p>{EXAMPLES[selectedTopic].description}</p>
						<pre>
							<code>{EXAMPLES[selectedTopic].code}</code>
						</pre>
					</div>
				</section>
			</main>
		</div>
	);
}

export default App;
```

## 조건부 렌더링

조건부 렌더링은 특정 조건에 따라 다른 UI를 렌더링합니다.

### 삼항 연산자 사용

```jsx
{
	!selectedTopic ? <p>Please select a topic.</p> : null;
}
{
	selectedTopic ? (
		<div id='tab-content'>
			<h3>{EXAMPLES[selectedTopic].title}</h3>
			<p>{EXAMPLES[selectedTopic].description}</p>
			<pre>
				<code>{EXAMPLES[selectedTopic].code}</code>
			</pre>
		</div>
	) : null;
}
```

### 논리적 AND 연산자 사용

```jsx
{
	!selectedTopic && <p>Please select a topic.</p>;
}
{
	selectedTopic && (
		<div id='tab-content'>
			<h3>{EXAMPLES[selectedTopic].title}</h3>
			<p>{EXAMPLES[selectedTopic].description}</p>
			<pre>
				<code>{EXAMPLES[selectedTopic].code}</code>
			</pre>
		</div>
	);
}
```

## CSS 스타일 및 동적 스타일링

탭 버튼을 클릭했을 때 탭이 선택되었음을 확인할 수 있게 className 속

성을 동적으로 변경합니다.

```jsx
export default function TabButton({ children, onSelect, isSelected }) {
	return (
		<li>
			<button className={isSelected ? 'active' : undefined} onClick={onSelect}>
				{children}
			</button>
		</li>
	);
}
```

**App 컴포넌트에서의 사용 예:**

```jsx
<TabButton
  isSelected={selectedTopic === "components"}
  onSelect={() => handleSelect("components")}
>
  Components
</TabButton>
<TabButton
  isSelected={selectedTopic === "jsx"}
  onSelect={() => handleSelect("jsx")}
>
  JSX
</TabButton>
<TabButton
  isSelected={selectedTopic === "props"}
  onSelect={() => handleSelect("props")}
>
  Props
</TabButton>
<TabButton
  isSelected={selectedTopic === "state"}
  onSelect={() => handleSelect("state")}
>
  State
</TabButton>
```

## 동적 데이터 출력

동적인 데이터를 하드코딩하는 대신 데이터 배열을 출력할 수 있으며, `map`을 사용할 수 있습니다.

```jsx
<ul>
	{CORE_CONCEPTS.map((conceptItem) => (
		<CoreConcept key={conceptItem.title} {...conceptItem} />
	))}
</ul>
```

## 데이터 기반 State 가져오기 및 출력

변경된 데이터 파일을 사용하여 상태를 관리하고 출력합니다.

```jsx
import { EXAMPLES } from './data.js';

const [selectedTopic, setSelectedTopic] = useState('components');

return (
	<div id='tab-content'>
		<h3>{EXAMPLES[selectedTopic].title}</h3>
		<p>{EXAMPLES[selectedTopic].description}</p>
		<pre>
			<code>{EXAMPLES[selectedTopic].code}</code>
		</pre>
	</div>
);
```
