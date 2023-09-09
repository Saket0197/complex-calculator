import { useReducer } from 'react';
import './App.css';
import DigitBtn from './components/DigitBtn';
import OperationBtn from './components/OperationBtn';

export const ACTIONS = {
    ADD_OPERAND: 'addOperand',
    ADD_OPERATOR: 'addOperator',
    CLEAR_ALL: 'clearAll',
    DEL_DIGIT: 'deleteDigit',
    EVAL: 'evaluate'
}

function evaluate(state) {
  const op1 = parseFloat(state.prev);
  const op2 = parseFloat(state.curr);
  const opr = state.operation;
  return opr === '+' ? op1 + op2 : opr === '-' ? op1-op2 : opr === '÷' ? op1/op2 : op1*op2
}

function reducer(state,{type,payload}) {
  
  switch(type) {

    case ACTIONS.ADD_OPERAND:{
      if(!state.curr && payload === '.') return {...state,curr: `0.`};
      if(!state.curr) return {...state,curr:payload,isRes:false}
      if(state.curr === '0' && payload === '0') return state;
      if(state.curr.includes('.') && payload === '.') return state;
      if(state.isRes) return {...state,curr:payload,isRes:false}
      return {
        ...state,
        curr:`${state.curr}${payload}`
      }
      break;
    }

    case ACTIONS.ADD_OPERATOR:{
      if(!state.curr && !state.prev) return state ;
      else if(!state.prev) return {
        ...state,
        prev: state.curr,
        operation: payload,
        curr: null
      }
      else if(!state.curr) {
        return {
         ...state,
         operation: payload 
        }
      }
      else{
        return {
          ...state,
          prev: `${evaluate(state)}`,
          operation: payload,
          curr:null
        }
      }
      break;
    }

    case ACTIONS.CLEAR_ALL:{
      return{
        ...state,
        prev:null,
        curr:null,
        operation:null
      }
      break;
    }

    case ACTIONS.DEL_DIGIT:{
      if(!state.curr) return state;
      if(state.isRes) return {...state,prev:null,curr:null,operation:null,isRes:false};
      if(state.curr.length === 1) return {...state,curr:null}
      return {
        ...state,
        curr: state.curr.slice(0,-1)
      }
      break;
    }

    case ACTIONS.EVAL:{
      if(!state.curr || !state.prev) return state;
      return {
        ...state,
        curr:`${evaluate(state)}`,
        prev: null,
        operation: null,
        isRes: true
      }
      break;
    }

     default : {
      return ;
    }
  }
}

function App() {

  const [{prev,curr,operation},dispatch] = useReducer(reducer,{});

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{prev} {operation}</div>
        <div className="current-operand">{curr}</div>
      </div>

      <button className="span-two" onClick={() => dispatch({type:ACTIONS.CLEAR_ALL})}>AC</button>
      <button onClick={() => dispatch({type:ACTIONS.DEL_DIGIT})}>DEL</button>
      <OperationBtn operation='÷' dispatch={dispatch}/>
      <DigitBtn digit='1' dispatch={dispatch}/>
      <DigitBtn digit='2' dispatch={dispatch}/>
      <DigitBtn digit='3' dispatch={dispatch}/>
      <OperationBtn operation='*' dispatch={dispatch}/>
      <DigitBtn digit='4' dispatch={dispatch}/>
      <DigitBtn digit='5' dispatch={dispatch}/>
      <DigitBtn digit='6' dispatch={dispatch}/>
      <OperationBtn operation='+' dispatch={dispatch}/>
      <DigitBtn digit='7' dispatch={dispatch}/>
      <DigitBtn digit='8' dispatch={dispatch}/>
      <DigitBtn digit='9' dispatch={dispatch}/>
      <OperationBtn operation='-' dispatch={dispatch}/>
      <DigitBtn digit='.' dispatch={dispatch}/>
      <DigitBtn digit='0' dispatch={dispatch}/>
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVAL})}>=</button>
    </div>
  );
}

export default App;
