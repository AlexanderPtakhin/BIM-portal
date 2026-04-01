import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Регистрация в BIM Portal
          </h1>
          <p className="mt-2 text-gray-600">
            Присоединяйтесь к сообществу BIM-специалистов
          </p>
        </div>

        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          forceRedirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary:
                'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
              card: 'shadow-lg',
              headerTitle: 'text-gray-900',
              headerSubtitle: 'text-gray-600',
            },
          }}
        />
      </div>
    </div>
  );
}
