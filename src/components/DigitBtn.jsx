import React from 'react';
import { ACTIONS } from '../App';

export default function DigitBtn({digit,dispatch}) {
  return (
    <button onClick={() => dispatch({type:ACTIONS.ADD_OPERAND,payload:digit})}>{digit}</button>
  )
}
