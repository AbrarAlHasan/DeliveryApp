import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon, MapPinIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({ id, imgUrl, title, rating, address }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="bg-white mr-3 shadow-sm w-64"
      onPress={() => navigation.navigate("Restaurant", { id })}
      key={id}
    >
      <Image source={{ uri: imgUrl }} className="h-36 w-64 rounded-sm" />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center  space-x-1 ">
          <StarIcon className="green" opacity={0.5} size={22} />
          <Text className="text-gray-500 ">
            <Text className="text-green-500">{rating}</Text>
          </Text>
        </View>
        <View className="flex-row items-center space-x-1 w-11/12">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500" numberOfLines={1}>
            Nearby - {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
