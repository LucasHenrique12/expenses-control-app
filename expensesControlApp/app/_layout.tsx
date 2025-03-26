import { useEffect } from 'react';
import { ClerkProvider,ClerkLoaded,useAuth
 } from '@clerk/clerk-expo';
import { TokenCache } from '@clerk/clerk-expo/dist/cache';
import { useRoute } from '@react-navigation/native';
import { Slot, Stack,useRouter,useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native';
import { tokenCache } from '@/src/cache';

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Slot />
      </ClerkLoaded>
    </ClerkProvider>
  )
}
/* const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

const initiallayout = () =>{
  const {isLoaded,isSignedIn} = useAuth();
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    if(!isLoaded) return;

  },[isSignedIn])
  return <Slot/>
}
const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key)
        if (item) {
          console.log(`${key} was used 🔐 \n`)
        } else {
          console.log('No values stored under key: ' + key)
        }
        return item
      } catch (error) {
        console.error('secure store get item error: ', error)
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token)
    },
  }
}

// SecureStore is not supported on the web
export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined

export default function RootLayout(){
  return (
    <ClerkProvider  publishableKey = {publishableKey} tokenCache={tokenCache}>
     <ClerkLoaded>
        <Slot />
      </ClerkLoaded>
    </ClerkProvider>
  )
}

 */
/* export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='login' options={{headerShown:false }}/>
      <Stack.Screen name='(auth)' options={{headerShown:false }}/>
      <Stack.Screen name="(main)" options={{headerShown:false }}/>
    </Stack>
  );
}
 */