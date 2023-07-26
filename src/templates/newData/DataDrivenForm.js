import React, { useState } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import { ToastContainer, toast } from 'react-toastify';

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 16,
};

const inputStyles = {
  width: '100%',
  padding: '12px 20px',
  margin: '8px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  borderRadius: 4,
  boxSizing: 'border-box',
};

const paragraphStyle = {
  marginTop: 0,
  marginBottom: 4,
};

const requiredStyle = {
  color: 'red',
  marginLeft: 2,
};

const errorStyle = {
  color: 'orangered',
};

const getButtonStyle = (variant) => ({
  color: 'Black',
  backgroundColor: variant === 'primary' ? '#c5e2e8' : '#888',
  padding: '8px 16px',
  borderRadius: 4,
  cursor: 'pointer',
  border: 'none',
  marginRight: 4,
});

const Button = ({ children, label, variant, ...props }) => (
  <button style={getButtonStyle(variant)} {...props}>
    {label}
  </button>
);

const FormTemplate = ({ formFields }) => {
  const { handleSubmit, onCancel } = useFormApi();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      {formFields}
      <Button type="submit" variant="primary" label="Submit" />
      <Button type="button" label="cancel" onClick={onCancel} />
    </form>
  );
};

const TextField = (props) => {
  const {
    customProp,
    label,
    input,
    isRequired,
    meta: { error, touched },
    FieldArrayProvider,
    dataType,
    ...rest
  } = useFieldApi(props);
  return (
    <div
      style={{
        ...formGroupStyle,
        ...(isRequired && requiredStyle),
        ...(error && touched && errorStyle),
      }}
    >
      <label style={{ color: 'initial' }} htmlFor={input.name}>
        {isRequired && <span style={errorStyle}>*&nbsp;</span>}
        {label}
      </label>
      <input style={inputStyles} id={input.name} {...input} {...rest} />
      {touched && error && <p style={paragraphStyle}>{error}</p>}
      {customProp && <p style={{ color: 'initial' }}></p>}
    </div>
  );
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  'custom-component-type': TextField,
};

const ComponentMapper = () => {
  const [values, setValues] = useState({});
  const schema = {
    fields: [
      {
        component: componentTypes.TEXT_FIELD,
        name: 'name',
        label: 'Name',
        validate: [(value) => (!value || value.lenght === 0 ? 'Required' : undefined)],
        customProp: true,
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: 'username',
        label: 'User Name',
        isRequired: true,
        validate: [(value) => (!value || value.lenght === 0 ? 'Required' : undefined)],
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: 'password',
        label: 'Password',
        validate: [(value) => (!value || value.lenght === 0 ? 'Required' : undefined)],
        customProp: true,
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: 'email',
        label: 'Your email',
        type: 'email',
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: 'role',
        label: 'Your role',
        type: 'text',
      },
        
    ],
  };
  
  const refreshToken= localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  return (
    <div className='h-full w-full overflow-scroll'>
      <FormRenderer
        componentMapper={componentMapper}
        FormTemplate={FormTemplate}
        schema={schema}
        onSubmit={async (values) =>  {
              
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/users/${userId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`,
              },
              body:JSON.stringify(values)
            }
          ); 
          const data = await response.json();
          console.log(data)
          if(response.ok)
            {
              toast.success(data.message)
              console.log(data.message)
            }
            else
            {
              toast.warn("Something Went Wrong")
            }
        }}
        onCancel={() => console.log('cancel action')}
      />
      <pre>{JSON.stringify(values)}</pre>
      <ToastContainer/>
    </div>
  );
};

ComponentMapper.displayName = 'Component mapper';

export default ComponentMapper;
