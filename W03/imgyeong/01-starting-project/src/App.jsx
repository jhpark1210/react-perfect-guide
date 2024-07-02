import Header from './components/Header';
import { useState } from 'react';
import { UserInput } from './components/input';
import { Results } from './components/table';

function App() {
    const [userInput, setUserInput] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 19,
    });

    const inputIsValid = userInput.duration >= 1;

    function handleChange(inputIdentifier, newValue) {
        setUserInput((prevUserInput) => {
            return { ...prevUserInput, [inputIdentifier]: +newValue };
        });
    }

    return (
        <>
            <Header />
            <UserInput userInput={userInput} onChange={handleChange} />
            {!inputIsValid && <p className="center">The duration must be positive</p>}
            {inputIsValid && <Results input={userInput} />}
        </>
    );
}

export default App;
