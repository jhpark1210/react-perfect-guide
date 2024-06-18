# Setting a Dynamic Component

We can render a component by passing a string prop to the customized component. (e.g. `<Menu Container="div">`)

# Public vs Assets

If the images do not require any build process, then use `public/`. (e.g. index.html, favicon) Otherwise, `src/assets/`.

Note: The better option would be using AWS S3 Bucket with Cloudfront.

# Updating state

In React, updating state itself is asynchronous. Thus, if you want to update the state several times at once, you should write your codes like this:

```typescript
const handleClick = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
};
```

# Primitive values vs Reference (Korean)

[Original Link](https://academind.com/tutorials/reference-vs-primitive-values)

`var age = 28`

이런 단순 값들은 원시값이라고 합니다. 그에 반해 `Objects` 나 `Array`는 참조타입이라고 합니다. C#을 했다면 조금 이해하기가 편할 것 같습니다.

위와 같은 단순 원시값들은 스택이라는 메모리 영역에 저장이 되는 반면, 객체나 배열의 경우에는 힙이라는 메모리 영역에 저장이 됩니다. 이러한 차이가 생기는 이유는 C/C++로 동적 할당을 배웠다면 바로 이해할 수 있을 거라고 생각합니다. 원시값의 타입들과 다르게 객체나 배열 같은 경우에는 각 변수가 얼마만큼의 메모리를 차지하게 될 지, 어떤 구조를 띠게 될 지 미리 확신할 수 없습니다. 쉽게 말해서 컴파일러 언어의 경우에는 컴파일 단계 전, 자바스크립트 같은 인터프리터 같은 언어는 런타임 환경에서 해당 코드를 읽기 전까지 정확한 상황 파악이 안되는 것입니다.

그렇기 때문에 런타임 시간때 동적으로 할당이 되어야하므로 우리는 이런 값들을 힙 메모리에 저장을 합니다. 실질적인 값들은 힙에, 그리고 변수의 명(포인터 역할을 합니다.)은 스택에 쌓이는 것입니다.

그래서 예를 들어

`var person = { name: 'Max' }`

라는 코드가 있을 때 이걸 `var newPerson = person`이라고 한 뒤에 그 값을 바꾸려고 하면 기존의 데이터 조차 바꿔버리는 것입니다. 왜냐하면 newPerson에게 할당된 것은 person 데이터 그 자체가 아니라 결국 그 주소값을 받은 것이니까요.

그래서 그 데이터 자체를 복사해서 써야하는데, 그러기 위해서는 아래와 같은 방법들을 사용할 수 있습니다.

## The case of Array

1. Using `slice()`

```typescript
var hobbies = ['sports', 'cooking'];
var copiedHobbies = hobbies.slice();
```

2. Using the spread operator

```typescript
var hobbies = ['sports', 'cooking'];
var copiedHobbies = [...hobbies];
```

## The case of Objects

1. Using `Object.assign()`

```typescript
var person = { name: 'Max' };
var copiedPerson = Object.assign({}, person);
```

2. Using the spread operator

```typescript
var person = { name: 'Max' };
var copiedPerson = { ...person };
```

하지만 이러한 방법은 깊은 복사가 되진 않습니다. 즉, 우리의 배열이 nested 하거나 우리의 객체가 다른 배열이나 객체를 가지고 있다면 해당 값들은 저장되지 않습니다. 그러므로 각 층에 관해서 우리가 일일이 복사를 해주어야 합니다.

# Controlling the button conditionally

`disabled={boolean statement}`

# One method to update the object state

```typescript
setPlayers((prevPlayers) => {
    return {
        ...prevPlayers,
        [symbol]: newName,
    };
});
```
