import { useState } from 'react';
import counteerStyle from './counter.css';
import CounterButton from './counterButton';

export default function Counter() {
    const [count, setCount] = useState(0);
    function increamentParentCounterFunction(by) {
        if(count + by >= 0) {
            setCount(count + by);
        }else {
            setCount(0);
        }
    }
    return(
        <div className="Counter">
            <span className="totalCount">{count}</span>
            <CounterButton by={1} onIncrement={increamentParentCounterFunction} />
            <CounterButton by={2} onIncrement={increamentParentCounterFunction} />
            <CounterButton by={5} onIncrement={increamentParentCounterFunction} />
            <div>
                <button className="reset-button" onClick={() => setCount(0)}>Reset</button>
            </div>
        </div>
    )
}


