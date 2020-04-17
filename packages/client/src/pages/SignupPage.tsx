import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import SignupForm from '../container/auth/SignupForm';

const SignupPage = () => {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;
