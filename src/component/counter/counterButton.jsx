import PropTypes from 'prop-types';
export default function CounterButton({by, onIncrement}) {
    return (    
        <div className="Counter">        
            <button className="Counter-button" onClick={() => onIncrement(by)}>+{by}</button>
            <button className="Counter-button" onClick={() => onIncrement(-by)}>- {by}</button>
        </div>
    );
}
CounterButton.propTypes = {
    by: PropTypes.number
}
CounterButton.defaultProps = {
    by: 5
} 