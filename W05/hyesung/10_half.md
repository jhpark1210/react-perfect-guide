### Prop Drilling이란?

Prop drilling이란 React 컴포넌트 간에 데이터를 전달하기 위해 props를 사용하는 방법을 말합니다. 하지만 이 방법은 컴포넌트 계층이 깊어질수록 비효율적이 될 수 있습니다. 데이터를 필요로 하지 않는 중간 컴포넌트들까지 props를 전달해야 하기 때문입니다.

### Prop Drilling 해결책

Prop drilling 문제를 해결하기 위해 두 가지 방법이 있습니다:

1. **컴포넌트 합성(Component Composition)**:

   - 컴포넌트를 구성하는 방식으로, 데이터를 필요로 하는 컴포넌트를 부모 컴포넌트의 자식으로 배치해 props 전달을 최소화하는 방법입니다.
   - 예시:
     ```jsx
     function App() {
     	return (
     		<CartProvider>
     			<ShoppingCart />
     			<ProductList />
     		</CartProvider>
     	);
     }
     ```

2. **Context API 사용**:

   - Context API는 `createContext`를 사용해서 전역적으로 데이터를 관리할 수 있게 해줍니다.
   - 중간 컴포넌트를 거치지 않고 필요한 컴포넌트에서 바로 데이터를 사용할 수 있습니다.
   - 예시:

     ```jsx
     const CartContext = createContext();

     function CartProvider({ children }) {
     	const [cart, setCart] = useState([]);
     	return (
     		<CartContext.Provider value={{ cart, setCart }}>
     			{children}
     		</CartContext.Provider>
     	);
     }

     function ShoppingCart() {
     	const { cart } = useContext(CartContext);
     	return (
     		<div>
     			{cart.map((item) => (
     				<div key={item.id}>{item.name}</div>
     			))}
     		</div>
     	);
     }
     ```

### Vue의 Pinia와 Context API의 비교

- Vue의 Pinia는 Vue 생태계에서 상태 관리를 위한 라이브러리로, React의 Context API와 비교할 수 있습니다.
- Context API는 전역 상태 관리를 간단하게 해주지만, Pinia는 더 많은 기능과 구조를 제공합니다.

### Context와 상태 관리의 차이점

- **Context**:

  - 전역 데이터를 공유하는 데 유용하며, 특히 테마나 사용자 정보처럼 광범위하게 사용되는 데이터에 적합합니다.
  - 비교적 간단하고 설정하기 쉽습니다.

- **상태 관리(State Management)**:
  - Redux 같은 상태 관리 라이브러리는 복잡한 상태 관리에 적합합니다.
  - 상태를 보다 체계적으로 관리하고, 시간 여행 디버깅 등 고급 기능을 제공합니다.
