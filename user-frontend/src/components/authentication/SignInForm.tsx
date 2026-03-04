import { memo } from 'react';
import { useForm } from 'react-hook-form';
import logoImage from '../../assets/images/logo-white-bg.png';
import Button from '../common/Button/Button';
import DividerWithText from '../authentication/DividerWithText';
import SocialButton from '../authentication/SocialButton';
import CursorDepthBackground from '../common/CursorDepthBackground';
import InputField from '../authentication/InputField';

interface SignInFormData {
  email: string;
  password: string;
}

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    reset();
  }
  

  const handleGoogleSignIn = () => {
    // TODO: Google OAuth
  };

  const handleMicrosoftSignIn = () => {
    // TODO: Microsoft OAuth
  };

  return (
    <CursorDepthBackground className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <div className="relative z-10 w-full max-w-md">
        {/* Branding */}
        <div className="flex flex-col items-center text-center">
          <img
            src={logoImage}
            alt="Minutor"
            className="h-16 w-auto"
          />
          <h1 className="mt-4 text-2xl font-bold font-['Nunito'] text-black">
            Minutor : Your Trusted Companion
          </h1>
          <p className="mt-1 text-gray-700">Welcome Back !</p>
        </div>

        {/* Sign up with */}
        <DividerWithText>Sign in with</DividerWithText>
        <div className="flex justify-center gap-4">
          <SocialButton
            label="Sign in with Google"
            onClick={handleGoogleSignIn}
            icon={<GoogleIcon/>}
          
          />
          <SocialButton
            label="Sign in with Microsoft"
            onClick={handleMicrosoftSignIn}
            icon={<MicrosoftIcon/>}
          />
        </div>
        {/* Or continue with */}
        <DividerWithText>or continue with</DividerWithText>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
          <InputField
            name="email"
            type="email"
            label="Email"
            placeholder="name@example.com"
            register={register}
            validation={{
              required: 'Email is required',
            }}
            errorMessage={errors.email?.message}
          />
           <InputField
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            register={register}
            validation={{
              required: 'Password is required',
            }}
            errorMessage={errors.password?.message}
          />

          
          <div className="flex justify-center pt-2">
            <Button disabled={isSubmitting} type="submit" text="Continue" className="min-w-[200px]" />
          </div>
        </form>

      </div>
    </CursorDepthBackground>
  );
};

//Google Icon SVG
const GoogleIcon = memo(() => {
    return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    );
});

//Microsoft Icon SVG
const MicrosoftIcon = memo(() => {
    return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden>
        <path fill="#F25022" d="M1 1h10v10H1z" />
        <path fill="#00A4EF" d="M13 1h10v10H13z" />
        <path fill="#7FBA00" d="M1 13h10v10H1z" />
        <path fill="#FFB900" d="M13 13h10v10H13z" />
      </svg>
    );
});

export default SignInForm;