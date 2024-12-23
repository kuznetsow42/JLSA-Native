import { Image, StatusBar, Text, View } from 'react-native';


export default function HomeScreen() {
  return (
      <View>
        <StatusBar backgroundColor="transparent" translucent barStyle={'light-content'} />
      <Image
          source={require('@/assets/images/homeImage.jpeg')}
          className='w-full h-52'
        />
        <Text className='text-5xl text-center pt-4'>Home Page</Text>
      </View>
  );
}

