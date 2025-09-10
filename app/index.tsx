import { Link } from 'expo-router';
import SignIn from "./auth/signIn";
import Signup from "./auth/signUp/user";
import { View } from 'react-native';
import Request from './page/request';

export default function Index() {
  return (
    <View>
      <Link href="/auth/signIn">
        <SignIn />
      </Link>
      <Link href="/auth/signUp">
        <Signup />
      </Link>
      <Link href="/page/request">
        <Request />
      </Link>
    </View>
  );
}


