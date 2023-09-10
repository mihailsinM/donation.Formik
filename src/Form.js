import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const CustomForm = () => {
    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, "Minimum 2 characters to fill!")
                    .required("Necessary field!"),
                email: Yup.string()
                    .email("Incorrect email!")
                    .required("Necessary field!"),
                amount: Yup.number()
                    .min(5, "Minimum 5 characters!")
                    .required("Necessary field!"),
                currency: Yup.string()
                    .required("Select currency!"),
                text: Yup.string()
                    .min(10, "Minimum 10 characters to fill!"),
                terms: Yup.boolean()
                    .required("Your agreement!")
                    .oneOf([true], "Necessary agreement!")
            })}
            onSubmit={values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Send a donation</h2>
                <MyTextInput
                    label="Your name"
                    id="name"
                    name="name"
                    type="text"
                />
                <MyTextInput
                    label="Your email"
                    id="email"
                    name="email"
                    type="email"
                />
                <label htmlFor="amount">Amount</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error" name="amount" component="div" />
                <label htmlFor="currency">Currency</label>
                <select
                    id="currency"
                    name="currency"
                    as="select"
                >
                    <option value="">Select currency</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
                </select>
                <ErrorMessage className="error" name="currency" component="div" />
                <label htmlFor="text">Your message</label>
                <Field
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className="error" name="text" component="div" />
                <label className="checkbox">
                    <Field
                        name="terms"
                        type="checkbox" />
                    Do you agree with the privacy policy?
                </label>
                <ErrorMessage className="error" name="terms" component="div" />
                <button type="submit">Send</button>
            </Form>
        </Formik >
    )
}

export default CustomForm;