import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ArrowLeftButton({MoveToPrevScreen}) {
  return (
    <View className="p-6 ">
          <TouchableOpacity
            onPress={MoveToPrevScreen}
            className="bg-primary p-4 rounded-full w-[60px] h-[60px] flex justify-center items-center"
          >
            <Image
              source={require("../../assets/arrow_left.png")}
              className="w-[12px] h-[21px] "
            />
          </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({})