import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../../../features/BasketSlice";
import { useNavigation } from "@react-navigation/native";

const BasketIcon = () => {
  const navigation = useNavigation();
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  });
  const items = useSelector(selectBasketItems);
  const totalValue = useSelector(selectBasketTotal);

  if (items.length == 0) return null;
  return (
    <View className="absolute bottom-10 z-10 w-full ">
      <TouchableOpacity
        className="flex-row m-4 p-4 rounded-lg bg-[#00CCBB] items-center"
        onPress={() => navigation.navigate("Basket")}
      >
        <Text className="text-white text-lg font-extrabold py-1 px-2 bg-[#01A296] ">
          {items.length}
        </Text>
        <Text className="flex-1 text-lg font-extrabold text-white text-center">
          ViewBasket
        </Text>
        <Text className="font-extrabold text-white">
          {"Rs." + formatter.format(totalValue)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
