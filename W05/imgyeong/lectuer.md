**Note:** 참가하지 못했기 때문에 영어 대신 한글로 적습니다.

## Prop Drilling

다른 컴포넌트에서 어떤 prop이 필요하다고 가정했을 때, 해당 prop을 전달하기 위해 여러 개의 다른 컴포넌트를 통과하는 것을 일컫습니다. 이럴 경우, 컴포넌트의 재사용이 힘들어지기 때문에 최대한 Prop Drilling을 피하는 것이 바람직합니다.

물론 해당 Prop Drilling을 컴포넌트 구성을 애초에 잘 하거나 리팩토링을 통해 해결하는 방법이 있습니다만, 실질적으로는 Redux를 쓰거나 Context API를 쓰는 경우를 더 많이 보긴 했습니다.

## Context API

Context API는 컴포넌트와 컴포넌트간의 Prop 공유를 용이하게 해주는 것입니다. State 관리가 쉽다는 장점이 있습니다.

사용방법은 store 폴더에 (Strict한 룰은 아니지만 보통은 이런 네이밍 컨벤션을 따르니 store라고 폴더명을 짓는 것이 좋음) 관련 .tsx, .jsx 파일을 생성하고, `createContext`를 이용하여 컴포넌트를 생성합니다. 이후, Consume을 해야하는 컴포넌트 전체를 `<Context.Provider />`로 감쌉니다.

본격적으로 Consume을 하기 위해서는 관련 Context를 import하고, `useContext`를 리액트에서 마찬가지로 import합니다. 사용 방법은 다음과 같습니다:

```javascript
const cartCtx = useContext(CartContext);
```

여기서 한 가지 알아야 할 점은 context를 만들었을 때 세팅된 디폴트 값은 Provider 컴포넌트에 감싸지지 않은 컴포넌트가 context 값에 액세스할 때만 사용됩니다.

컨텍스트와 State를 연결하는 방법 또한 있습니다. 애초에 Provider Component의 value 값을 state로 넘겨주면 됩니다.

컨텍스트는 State와 마찬가지로 함수 재실행(리렌더링)이 일어납니다.

## Personal Thought

강의를 들어보니 작동 방식이 Redux와 비슷해서 한 번 관련 자료들을 찾아보았습니다. 적재적소에 잘 쓰면 Redux와 달리 많은 사전 준비 코드를 작성할 필요도 없을 뿐더러 Performance적으로도 Context API가 좋다는 글을 봤습니다. 네, 문제는 **적재적소**에 잘 써야한다는 것입니다.

Redux와는 달리 Context API의 경우, Context와 관련된 **모든 컴포넌트**의 재실행이 이루어지기 때문에 Redux처럼 Context API를 중앙 state 관리 시스템으로 너무 많이 사용할 경우 오히려 Perfomance 적으로 굉장히 좋지 않은 결과를 낳을 수 있다고 합니다.

물론 이런 문제를 `useMemo`를 이용해서 해결할 수는 있다지만... 다른 단점 중 하나로 떠오르는 것 중 하나가 Context API 커뮤니티는 Redux 커뮤니티보다 현저히 그 규모가 작다는 것입니다. 저도 React, Next.js 프로젝트를 하면서 Context API를 직접 사용해본 적이 없어서 이 부분에 대해서는 조금 더 공부를 해야할 듯 싶습니다.

## useReducer

해당 hook을 저는 AI 챗봇을 만들면서 사용한 적이 있습니다. 이때는 제가 useState를 이용해서 가장 최신 버전의 state를 업데이트 하는 방법을 잘 몰랐어서 useReducer를 사용했었지만... 다시 살펴보니 payload.action을 통해서 업데이트가 이루어지기 때문에 확실히 다른 복잡한 로직에 얽혀 있는 state를 관리하기에는 useReducer가 좋은 것 같습니다.

## useEffect

아... 와버렸습니다... useEffect... 정말 질릴 만큼 쓰는 훅입니다. 가끔 Performance 문제도 야기할 수 있기 때문에 나중에 가면 Love-hate 관계가 되는 것 같습니다.

저는 몰랐는데 useEffect는 앱 함수에 모든 준비가 끝난 후 useEffect가 실행된다는 거였습니다. (저는 useEffect가 가장 먼저 실행되는 것인 줄 알았습니다...) 의존성 배열을 빈 배열로 설정해주면 딱 한 번만 useEffect내의 코드가 실행됩니다. 반대로 어떤 상태가 변할 때마다 코드 재실행을 원한다면 해당 값을 의존성 배열에 넣어주면 됩니다.

### useEffect Cleanup

컴포넌트가 디스마운트 되기 전에 실행되는 것입니다. 보통 setTimeout와 같은 함수를 clear하기 위해서 사용합니다.

## useCallback

useEffect와 비슷한 용법을 가지고 있는 훅입니다.

사실 저는 useMemo와 useEffect만 주야장천 썼기 때문에 과연 언제 useEffect를 써야하고 언제 useCallback를 써야하는 지를 잘 모릅니다. 그래서 따로 공부를 한 결과 간단하게 말하면 이런 느낌이었습니다:

useEffect: If some variable changes, do this.

useCallback: Making the function change the reference only when dependencies change. (Avoid recalculating the function)

useMemo: It will run on every render, but with cached values. It will only use new values when certain dependencies change.
