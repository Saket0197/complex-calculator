import React from 'react';
import { ACTIONS } from '../App';

export default function OperationBtn({operation,dispatch}) {
  return (
    <button onClick={() => dispatch({type:ACTIONS.ADD_OPERATOR,payload:operation})}>{operation}</button>
  )
}
