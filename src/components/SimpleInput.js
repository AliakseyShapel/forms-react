import useInput from '../hooks/use-input';

import validateEmail from '../utility/validate-email';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    valueIsValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    resetInput: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInput: resetEmailInput,
  } = useInput(validateEmail);

  const formIsValid = enteredNameIsValid && enteredEmailIsValid;

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = `form-control ${nameInputHasError ? 'invalid' : ''}`;

  const emailInputClasses = `form-control ${
    emailInputHasError ? 'invalid' : ''
  }`;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          value={enteredName}
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          value={enteredEmail}
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Please enter correct email address.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
