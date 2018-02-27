import React from 'react'
import {Field, reduxForm} from 'redux-form'

const required = value => {
    console.log(value);
    if (value)
        return undefined;

    return "REQ";
};
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined
const tooOld = value =>
    value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
    value && /.+@aol\.com/.test(value) ?
        'Really? You still use AOL for your email?' : undefined

const renderField = ({input, label, type, meta: {touched, error, warning}}) => {
    return (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} placeholder={label} type={type}/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>)
}

const customListField = (props) => {

    const {items} = props;
    console.log(props.input);
    return (

        <div>
            <input type="hidden" value="1211"/>
            {
                items.map((i, k) => <div onClick={() => {

                }} key={k}>{i}</div>)
            }
        </div>
    )
};


const submit = values => {
    console.log(values);
};

const FieldLevelValidationForm = (props) => {
    const {handleSubmit, pristine, reset, submitting} = props
    return (
        <form onSubmit={handleSubmit(submit)}>
            <Field name="username" type="text"
                   component={renderField} label="Username"
                   validate={[required, maxLength15]}
            />
            <Field name="email" type="email"
                   component={renderField} label="Email"
                   validate={email}
                   warn={aol}
            />
            <Field name="age" type="number"
                   component={renderField} label="Age"
                   validate={[required, number, minValue18]}
                   warn={tooOld}
            />

            <Field name="cl"
                   items={[1, 2, 3]}
                   component={customListField}
                   validate={[required]}
            />
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'fieldLevelValidation' // a unique identifier for this form
})(FieldLevelValidationForm)