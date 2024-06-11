
## JSX

- JacaScript Syntax Extention
- 자바스크립트 언어에 다른 언어를 섞어 사용
- 브라우저에서 인식 불가능


<br/>

## Custom 컴포넌트 생성 및 활용

```jsx
function Header() {
  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        Fundamental React concepts you will need for almost any app you are going to build!
      </p>
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

커스텀 컴포넌트 명은 항상 첫글자 대문자로 사용. 내장돼있는 요소와 중복 방지.

<br/>

## 동적 HTML 속성, 이미지 설정

이미지 path를 소스 속성값으로 나타내는 것은 파일이 유실될 위험이 있음.

배포과정에서 이미지가 사라질 수 있기 때문인데 왜그럴까?

웹팩(Webpack)과 같은 모듈 번들러가 프로젝트를 빌드할 때 발생할 수 있는 문제이기도한데,

웹팩은 기본적으로 JavaScript 및 CSS 파일만 처리하므로, 이미지와 같은 정적 자원을 처리하려면 추가 설정이 필요하기 때문.

이미지를 JavaScript 모듈로 import하고 그 결과를 src 속성에 사용하는 것이 좋다.

이렇게 하면 웹팩이 이미지를 모듈로 처리하고, 최적화 및 빌드 과정에서 이미지가 유실되는 것을 방지할 수 있다.

```jsx
import reactImg from './assets/react-core-concepts.png';

<img src={reactImg} alt="Stylized atom" />
```


## Props 개념

- 컴포넌트는 여러 번 재사용하는 경우가 많다.
- Props
    - 데이터를 jsx 문법에 맞게 컴포넌트로 전달 후 사용
    - 모든 종류의 데이터 값을 Props로 전달 가능

```jsx
import imageProps from "../../"

function CoreConcept(props) {
	return (
	<li>
		<img src={props.image} alt={props.title}/>
		<h3>{props.title}</h3>
		<p>{props.desc}</p>
	</li>
	);
}

function App() {
	<main>
		<section id="core-concepts>
		<h2>Core Concepts</h2>
		<ul>
			<CoreConcept title="제목1" desc="설명1" image="imageProps"/>
			<CoreConcept title="제목2" ... />
			<CoreConcept />
			<CoreConcept />
		**</ul>
	</main>
};
```

### Props를 대체할 수 있는 문법

1.	데이터 배열 사용: 데이터를 배열로 정의하여 쉽게 관리
2.	스프레드 연산자와 구조 분해 할당 사용

데이터 배열 사용 예제

```jsx
import componentsImg from './assets/components.png';
import propsImg from './assets/config.png';
import jsxImg from './assets/jsx-ui.png';
import stateImg from './assets/state-mgmt.png';

export const CORE_CONCEPTS = [
  {
    image: componentsImg,
    title: 'Components',
    description:
      'The core UI building block - compose the user interface by combining multiple components.',
  },
  {
    image: jsxImg,
    title: 'JSX',
    description:
      'Return (potentially dynamic) HTML(ish) code to define the actual markup that will be rendered.',
  },
  {
    image: propsImg,
    title: 'Props',
    description:
      'Make components configurable (and therefore reusable) by passing input data to them.',
  },
  {
    image: stateImg,
    title: 'State',
    description:
      'React-managed data which, when changed, causes the component to re-render & the UI to update.',
  },
];
```

```jsx
import {CORE_CONCEPTS} from "../data.jsx"

function CoreConcept(props) {
	return (
	<li>
		<img src={props.image} alt={props.title}/>
		<h3>{props.title}</h3>
		<p>{props.desc}</p>
	</li>
	);
}

...
<CoreConcept 
title={CORE_CONCEPTS[0].title}
description={CORE_CONCEPTS[0].description}
image={CORE_CONCEPTS[0].image}
/>
...

// spread 활용
<CoreConcept {..CORE_CONCEPTS[0]/}
/>
...

// destructuring 활용
 function CoreConcept({image, title, description}) {
	return (
	<li>
		<img src={image} alt={title}/>
		<h3>{title}</h3>
		<p>{description}</p>
	</li>
	);
}
```

### 컴포넌트 파일 구조

•	컴포넌트 jsx 파일은 components 서브폴더에 모아놓기
•	컴포넌트 스타일 파일도 동일하게 관리
        

```jsx
// components/Header.jsx
import reactImg from "./assets/img.png"

export default function Header() { 
	return {
		<header>
			<img src={reactImg}>
		
		}

}

//App.jsx
import Header from "../components/Header.jsx"

function App() {
	return {
		<div>
			<Header />
		</div>
	}
}

```



### Children Prop

•	컴포넌트 사이에 텍스트나 복잡한 jsx 구조를 정의
•	컴포넌트 합성에 사용

```jsx

...
// TabButton.jsx
export default function tabButton(props) {
		return <li><button>{props.children}</button></li>;
}

// or
export default function tabButton({children}) {
		return <li><button>{children}</button></li>;
}

<section id="example">
	<h2>Examples</h2>
	<menu>
		<TabButton>BUTTON</TabButton> 
	</menu>
</section>

```

- 이벤트 처리
JS식 DOM 접근자 대신 이벤트 처리용 prop(onClick 등) 사용

```jsx
export default function tabButton({children}) {
		function handleClick = () => {
			console.log("click")
		}

		return {
			<li>
				<button onClick={handleClick}>{children}</button>
			</li>;
		}
}
```

### 함수를 Prop의 값으로 전달하기

```jsx
function handleSelect = () => {
	console.log("Click");
}

<TabButton onSelect={handleSelect}>Button</TabButton>
```

```jsx
// destructuring 문법으로 해당 prop에 접근
// children prop은 리액트에서 제공하는 기본 prop으로 변경 불가
// 다른 prop은 사용자 커스텀 가능

export default function tabButton({children, onSelect}) {
		
		return {
			<li>
				<button onClick={onSelect}>{children}</button>
			</li>;
		}
}
```

### 이벤트 함수에 커스텀 인자 전달

```jsx
function handleSelect = (selectedButton) => {
	console.log(selectedButton)
}

<TabButton onSelect={() => handleSelect('components')}>Button</TabButton> 
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


### State(상태) 관리 & Hooks(훅) 

- useState 함수를 리액트에서 가져오기 ⇒ import문
    
    ```jsx
    // App.jsx
    import { CORE_CONCEPTS } from "./data.js";
    import Header from "./components/Header/Header.jsx";
    import CoreConcept from "./components/CoreConcept.jsx";
    import TabButton from "./components/TabButton.jsx";
    import { useState } from "react"; // state를 사용
    ```
    
    - React Hooks = 리액트 프로젝트에서 use로 시작하는 모든 함수의 총칭
        - 리액트 컴포넌트 함수 or 다른 리액트 훅 안에서만 호출 가능
        
        ```jsx
        // 리액트 컴포넌트 함수 안 최상위에서 리액트 훅 호출
        function App() {
          useState("Please click a button"); // 괄호 안에 적힌 값 = 초기(default)값
        
          function handleSelect(selectedButton) {
            tabContent = selectedButton;
            console.log(tabContent);
          }
        
        	// (이하 코드 생략)
        ```
        
        - 다른 코드 안에 중첩시켜 호출해서는 안 됨
        
        ```jsx
        function App() {
        
          function handleSelect(selectedButton) {
        	  // 호출 시 내부 함수 안에 중첩하면 안 됨
        	  useState("Please click a button");
            tabContent = selectedButton;
            console.log(tabContent);
          }
        ```
        
    - 훅의 규칙:
        - 컴포넌트 함수 (혹은 커스텀 훅) 안에서만 훅을 호출 = 밖에서는 X
        - 최상위에서만 훅을 호출 = 내부 코드 (함수, if문, loop 등) 안에 중첩 X
    - useState 함수를 변수에 저장 가능 (단, 항상 2칸짜리 배열 형태임)
        
        ```jsx
        // 첫 번째 요소: 해당 컴포넌트 실행 주기의 현 데이터 스냅샷
        // 두 번째 요소: state를 업데이트하는 함수 + 리액트가 함수를 재실행하도록 전달
        
        // 두 코드 다 같은 기능!
        const stateArray = useState("Please click a button");
        
        // 구조 분해 할당을 이용해서도 가능 (두 요소명은 임의로 정해도 무방)
        const [ selectedTopic, setSelectedTopic ] = useState("Please click a button");
        ```
        
        - 첫 번째 요소: 실행 직후에는 default 값이 저장됨, 재실행 시 업데이트된 값이 저장됨
        - 두 번째 요소: 첫 번째 요소를 계속 업데이트된 값으로 새로 저장시킴
                                  (그래서 굳이 변수를 쓸 필요가 없음)
            
- 다른 곳에서도 state 요소를 호출해 이용
    - 함수 실행 후에 콘솔 출력을 해도 업데이트 이전 값이 출력됨
    - 앱 컴포넌트 함수를 전부 실행하고 난 뒤에야 업데이트 후 값을 사용할 수 있게 됨
        
        (아직 앱 컴포넌트 함수 도중에 있는 상태라서 이전 값밖에 이용할 수 없는 것)
        
    
    ```jsx
      function handleSelect(selectedButton) {
        setSelectedTopic(selectedButton); // setSelectedTopic 함수에 원하는 값을 넣음
        console.log(selectedTopic); // 업데이트되기 이전 값이 콘솔에 출력
      }
    ```
    
    ```jsx
    <section id="examples">
      <h2>Examples</h2>
      <menu> // Tabbutton Component Executing은 그대로 4번씩 재출력됨
        <TabButton onSelect={() => handleSelect("components")}>
        Components
        </TabButton>
        <TabButton onSelect={() => handleSelect("jsx")}>JSX</TabButton>
        <TabButton onSelect={() => handleSelect("props")}>Props</TabButton>
        <TabButton onSelect={() => handleSelect("state")}>State</TabButton>
      </menu>
      {selectedTopic} // selectedTopic 값(버튼명)으로 화면에 정상 출력됨
    </section>
    ```
    

### 데이터 기반 State(상태) 가져오기 및 출력

- 변경된 data.js로 출력
    - 변경 부분: EXAMPLES 상수 추가됨
    
    ```jsx
    // data.js에서 추가된 부분
    export const EXAMPLES = {
      components: {
        title: "Components",
        description:
          "Components are the building blocks of React applications. A component is a self-contained module (HTML + optional CSS + JS) that renders some output.",
        code: `
    function Welcome() {
      return <h1>Hello, World!</h1>;
    }`
      },
      jsx: {
        title: "JSX",
        description:
          "JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript (e.g., it may output dynamic content).",
        code: `
    <div>
      <h1>Welcome {userName}</h1>
      <p>Time to learn React!</p>
    </div>`
      },
      props: {
        title: "Props",
        description:
          "Components accept arbitrary inputs called props. They are like function arguments.",
        code: `
    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }`
      },
      state: {
        title: "State",
        description:
          "State allows React components to change their output over time in response to user actions, network responses, and anything else.",
        code: `
    function Counter() {
      const [isVisible, setIsVisible] = useState(false);
    
      function handleClick() {
        setIsVisible(true);
      }
    
      return (
        <div>
          <button onClick={handleClick}>Show Details</button>
          {isVisible && <p>Amazing details!</p>}
        </div>
      );
    }`
      }
    };
    ```
    
    - EXAMPLES 상수를 import
    
    ```jsx
    import { EXAMPLES } from "./data.js";
    ```
    
    - 각 속성(components, jsx, props, state)을 가져와 화면에 출력하고 싶은 것을 . 이후에 작성
    
    ```jsx
    <div id="tab-content">
      <h3>{EXAMPLES[selectedTopic].title}</h3>
      <p>{EXAMPLES[selectedTopic].description}</p>
      <pre>
        <code>{EXAMPLES[selectedTopic].code}</code>
      </pre>
    </div>
    ```
    
    - default 값을 알맞은 형식(data.js에서 찾을 수 있는 속성)으로 수정
    
    ```jsx
    const [selectedTopic, setSelectedTopic] = useState("components");
    ```
    


