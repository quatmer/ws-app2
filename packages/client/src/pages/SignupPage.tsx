import React from 'react';
import { IonPage } from '@ionic/react';
import AuthLayout from 'src/layouts/AuthLayout';
import SignupForm from 'src/container/auth/SignupForm';

const SignupPage = () => {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;
