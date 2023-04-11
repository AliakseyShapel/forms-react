import { useReducer } from 'react';

const initialInputState = { value: '', isTouched: false };

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }
  if (action.type === 'RESET') {
    return initialInputState;
  }
  return initialInputState;
};

const useInput = (validateFn) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateFn(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const resetInput = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    resetInput,
  };
};

export default useInput;
