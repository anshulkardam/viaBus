import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { resetAndNavigate } from '../utils/NavigationUtils'

const SplashScreen = () => {

    const tokenCheck = async () => {
        resetAndNavigate('HomeScreen');
    }
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            tokenCheck()
        }, 1500);
        return () => clearTimeout(timeoutId)
    }, [])

    return (
        <View className='flex-1 justify-center bg-white items-center'>
            <Image source={require('../assets/images/viaTour.png')} className='h-[25%] w-[60%]' resizeMode='contain' />
        </View>
    )
}

export default SplashScreen