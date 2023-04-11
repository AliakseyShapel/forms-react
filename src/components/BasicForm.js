import useInput from '../hooks/use-input';

import validateEmail from '../utility/validate-email';

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    valueIsValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    resetInput: resetFirstNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredLastName,
    valueIsValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    resetInput: resetLastNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInput: resetEmailInput,
  } = useInput(validateEmail);

  const formIsValid =
    enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid;

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log(enteredFirstName, enteredLastName, enteredEmail);
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const firstNameInputClasses = `form-control ${
    firstNameInputHasError ? 'invalid' : ''
  }`;
  const lastNameInputClasses = `form-control ${
    lastNameInputHasError ? 'invalid' : ''
  }`;
  const emailInputClasses = `form-control ${
    emailInputHasError ? 'invalid' : ''
  }`;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="first-name">First Name</label>
          <input
            value={enteredFirstName}
            type="text"
            id="first-name"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameInputHasError && (
            <p className="error-text"> Field must not be empty.</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="last-name">Last Name</label>
          <input
            value={enteredLastName}
            type="text"
            id="last-name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameInputHasError && (
            <p className="error-text">Field must not be empty.</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          value={enteredEmail}
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Please enter a valid email address.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
