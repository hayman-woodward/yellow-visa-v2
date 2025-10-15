import { loginWithState } from '../actions/auth';
import LoginForm from '../components/login-form';

export default async function LoginPage() {
  return <LoginForm action={loginWithState} />;
}
