prop drilling은 상태(state)나 데이터를 부모 컴포넌트에서 자식 컴포넌트로, 또 그 자식 컴포넌트로 계속해서 전달해야 하는 상황을 말합니다. 이 과정에서 불필요하게 많은 컴포넌트가 관여하게 되어 코드가 복잡해지고 유지보수가 어려워집니다.

```jsx
// 부모 컴포넌트 App
function App() {
  const data = "Hello from App";

  return (
    <Parent data={data} />
  );
}

// 중간 자식 컴포넌트 Parent
function Parent({ data }) {
  return (
    <Child data={data} />
  );
}

// 목적 자식 컴포넌트 Child
function Child({ data }) {
  return (
    <div>{data}</div>
  );
}
```

<br /><br/>

## Prop Drilling 해결하기

### 1. Componet Composition (컴포넌트 합성)

리액트(React)의 컴포넌트 구성(Component Composition)은 컴포넌트를 조합하고 재사용하여 더 큰 컴포넌트를 만드는 방법을 말합니다. 이는 코드의 재사용성을 높이고, 복잡한 인터페이스를 단순한 컴포넌트로 나눠서 관리할 수 있게 합니다.

주요 개념
- 컨테이너 컴포넌트와 프레젠테이셔널 컴포넌트
- 컴포넌트 속성과 Children
- 고차 컴포넌트(Higher-Order Components, HOC)
- 렌더 프로프(Render Props)

**수정 전 코드** 

App.jsx

```jsx
import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';

function App() {
  return (
    <>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop onAddItemToCart={handleAddItemToCart} />
    </>
  );
}
```

Shop.jsx
```jsx
import { DUMMY_PRODUCTS } from '../dummy-products.js';
import Product from './Product.jsx';

export default function Shop({ onAddItemToCart }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>
      <ul id="products">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```jsx
// 레이아웃 컴포넌트
function Layout({ children }) {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}

// 사용 예시
function App() {
  return (
    <Layout>
      <div>Main Content</div>
    </Layout>
  );
}
```


**수정 후 코드**

App.jsx

```jsx
import { DUMMY_PRODUCTS } from "./dummy-products.js";

import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import Product from './components/Product.jsx';

function App() {
  return (
    <>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop onAddItemToCart={handleAddItemToCart}>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))}
      </Shop>
    </>
  );
}
```

Shop.jsx

```jsx
export default function Shop({ children }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>
      <ul id="products">{children}</ul>
    </section>
  );
}
```


컴포넌트 합성 방법의 단점은 모든 컴포넌트 층에 사용하기에는 적합하지 않다는 것에 있음 
결국 모든 컴포넌트가 앱 컴포넌트로 들어가고, 나머지 컴포넌트는 감싸는 용도로만 사용되기 때문


### 2. Context API

이것은 컴포넌트나 컴포넌트 레이어 간 데이터 공유를 용이하게 해줍니다.
컨텍스트의 기능은 컨텍스트 값을 생성하고 해당 값을 제공하고 이 컨텍스트를 묶어주는데 다수의 컴포넌트 또는 앱의 모든 컴포넌트를 묶어주는 것에 있습니다.

컨텍스트의 장점은 state와 연결이 쉽다는 것 리액트의 state를 context에 연결하면 앱 전체에 제공되는 방식으로 사용합니다.

```jsx
import { createContext } from "react";

/* createContext react component가 들어있는 객체 */
export const CartContext = createContext({
    items: [],
});

export default function App() {
	return <CartContext.Provider vaule={{ items: [] }}>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop onAddItemToCart={handleAddItemToCart} />
    </CartContext.Provider>
}
```

기본 값을 설정해 두더라도 value 속성을 provider에 추가 해야 합니다. 
어차피 value를 추가하는데 왜 기본 컨텍스트 값을 입력을 하는게 좋을까요? 그것은 자동완성 기능을 사용할 수 있기 때문입니다.

#### 컨텍스트 접근하기

```jsx
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Cart({ onUpdateItemQuantity }) {
  const { items } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => onUpdateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
```

#### state와 context 연결하기

```jsx
import { useState } from 'react';

import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';

import { CartContext } from './store/shopping-cart-context.jsx';

function App() {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart
  };

  return (
    <CartContext.Provider value={ctxValue}>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop onAddItemToCart={handleAddItemToCart} />
    </CartContext.Provider>
  );
}

export default App;
```
\
```jsx
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Cart({ onUpdateItemQuantity }) {
  const { items } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => onUpdateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
```


```jsx
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Product({
  id,
  image,
  title,
  price,
  description,
}) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
```


#### 컨텍스트를 소비하는 다른 방법 Consumer 사용하기

useContext를 사용하지 않고 아래처럼 사용할수도 있음

```jsx
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Cart({ onUpdateItemQuantity }) {
  return (
    <CartContext.Consumer>
      {(cartCtx) => {
          const totalPrice = cartCtx.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

        return     <div id="cart">
        {cartCtx.items.length === 0 && <p>No items in cart!</p>}
        {cartCtx.items.length > 0 && (
          <ul id="cart-items">
            {cartCtx.items.map((item) => {
              const formattedPrice = `$${item.price.toFixed(2)}`;
  
              return (
                <li key={item.id}>
                  <div>
                    <span>{item.name}</span>
                    <span> ({formattedPrice})</span>
                  </div>
                  <div className="cart-item-actions">
                    <button onClick={() => onUpdateItemQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateItemQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <p id="cart-total-price">
          Cart Total: <strong>{formattedTotalPrice}</strong>
        </p>
      </div>
      }}
    </CartContext.Consumer>
  );
}

```


#### 컨텍스트 값이 변경되면 생기는 일

컴포넌트의 컨텍스트 값에 접근할 때 해당 값은 그 값에 접근하는 컴포넌트의 함수를 바꾸고 업데이트된 내부 상태가 사용되었거나 부모 컴포넌트가 다시 실행되었다거나 컴포넌트 함수가 재실행되는 것과 같이 리액트에 의한 재실행이 이루어집니다. 

이러한 상황들에서 리액트는 컴포넌트 함수를 재실행하게 되는데 재실행이 진행되는 또다른 상황은 컴포넌트 함수가 useContext 훅을 사용함으로 관련 컨텍스트 값에 연결되었을때 UI 업데이트 진행을 위해 컴포넌트는 반드시 재실행되어야 하고 이에 따라 해당 값이 변경됩니다. 


#### 컨텍스트 아웃소싱 & 분리된 제공자 컴포넌트에 State(상태) 부여

```jsx
import { useState } from 'react';

import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';

import CartContextProvider from './store/shopping-cart-context.jsx';
import Product from './components/Product.jsx';

function App() {
  return (
    <CartContextProvider>
      <Header
      />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product
            {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
```

```jsx
import { createContext, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

/* createContext react component가 들어있는 객체 */
export const CartContext = createContext({
    items: [],
    addItemToCart: (id) => {},
    updatedItemQuantity: (id, quantity) => {},
});

export default function CartContextProvider({ children }) {
    const [shoppingCart, setShoppingCart] = useState({
        items: [],
      });
    
      function handleAddItemToCart(id) {
        setShoppingCart((prevShoppingCart) => {
          const updatedItems = [...prevShoppingCart.items];
    
          const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === id
          );
          const existingCartItem = updatedItems[existingCartItemIndex];
    
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === id);
            updatedItems.push({
              id: id,
              name: product.title,
              price: product.price,
              quantity: 1,
            });
          }
    
          return {
            items: updatedItems,
          };
        });
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        setShoppingCart((prevShoppingCart) => {
          const updatedItems = [...prevShoppingCart.items];
          const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === productId
          );
    
          const updatedItem = {
            ...updatedItems[updatedItemIndex],
          };
    
          updatedItem.quantity += amount;
    
          if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
          } else {
            updatedItems[updatedItemIndex] = updatedItem;
          }
    
          return {
            items: updatedItems,
          };
        });
      }
    
      const ctxValue = {
        items: shoppingCart.items,
        addItemToCart: handleAddItemToCart,
        updatedItemQuantity: handleUpdateCartItemQuantity,
      };


      return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
}
```


#### useReducer

`useReducer`는 React에서 제공하는 훅(hook) 중 하나로, 컴포넌트의 상태 관리를 보다 구조화된 방식으로 할 수 있게 해줍니다. 특히, 복잡한 상태 로직이 필요할 때 유용합니다. `useReducer`는 Redux의 리듀서 개념을 React 컴포넌트에 적용한 것이라고 생각하면 됩니다.

### 기본 개념

`useReducer`는 세 가지 요소로 구성됩니다:

1. **리듀서 함수**: 상태와 액션을 받아 새로운 상태를 반환하는 함수.
2. **현재 상태**: 리듀서 함수에서 관리하는 상태 값.
3. **디스패치 함수**: 액션을 리듀서 함수에 전달하여 상태를 업데이트하는 함수.

### `useReducer` 사용법

1. **리듀서 함수 정의**: 상태를 업데이트하는 로직을 포함합니다.
2. **`useReducer` 훅 호출**: 리듀서 함수와 초기 상태를 인자로 받아 현재 상태와 디스패치 함수를 반환합니다.
3. **디스패치 함수 호출**: 액션을 전달하여 상태를 업데이트합니다.

```jsx
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

```jsx
import React, { useReducer } from 'react';

function Counter() {
  const initialState = { count: 0 };
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
}

export default Counter;
```

useReducer는 복잡한 상태 관리 로직을 구조화된 방식으로 처리할 수 있게 해주는 React 훅입니다.

리듀서 함수는 상태와 액션을 받아 새로운 상태를 반환하는 순수 함수입니다.

useReducer 훅은 리듀서 함수와 초기 상태를 인자로 받아, 현재 상태와 디스패치 함수를 반환합니다.

디스패치 함수를 통해 액션을 전달하여 상태를 업데이트합니다.

이렇게 useReducer를 사용하면 상태 관리 로직을 컴포넌트 내에서 더 명확하고 일관성 있게 관리할 수 있습니다.


```jsx
import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

/* createContext react component가 들어있는 객체 */
export const CartContext = createContext({
    items: [],
    addItemToCart: (id) => {},
    updatedItemQuantity: (id, quantity) => {},
});

/* 밖에 선언하는 이유는 직접적인 액세스가 필요 없기 때문 */
function shoppingCartReducer(state, action) {
    if(action.type === "ADD_ITEM") {
        const updatedItems = [...state.items];
    
        const existingCartItemIndex = updatedItems.findIndex(
          (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
  
        if (existingCartItem) {
          const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1,
          };
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
          updatedItems.push({
            id: action.payload,
            name: product.title,
            price: product.price,
            quantity: 1,
          });
        }
  
        return {
            ...state,
            items: updatedItems,
        };
    }

    if(action.type === "UPDATE_ITEM") {
        const updatedItems = [...state.items];
          const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
          );
    
          const updatedItem = {
            ...updatedItems[updatedItemIndex],
          };
    
          updatedItem.quantity += action.payload.amount;
    
          if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
          } else {
            updatedItems[updatedItemIndex] = updatedItem;
          }
    
          return {
            ...state, 
            items: updatedItems,
          };
    }

    return state
}

export default function CartContextProvider({ children }) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
        items: [],
      });

      function handleAddItemToCart(id) {
        shoppingCartDispatch({
          type: "ADD_ITEM",
          payload: id,
        })
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: "UPDATE_ITEM",
            payload: {
              productId,
              amount,
            },
          })
      }
    
      const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updatedItemQuantity: handleUpdateCartItemQuantity,
      };


      return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
}
```

reducer 함수를 컴포넌트 함수 밖에 선언하는 이유는 직접적인 액세스가 필요 없기 때문