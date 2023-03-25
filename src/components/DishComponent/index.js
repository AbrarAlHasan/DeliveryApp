import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../../../features/BasketSlice";

const Index = ({ dishDetails }) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  });

  const [isPressed, setIsPressed] = useState(false);

  const items = useSelector((state) =>
    selectBasketItemsWithId(state, dishDetails?._id)
  );

  const dispatch = useDispatch();

  const addItemsToBasket = () => {
    dispatch(addToBasket(dishDetails));
  };
  const removeItemsFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket(dishDetails));
  };

  return (
    <>
      <TouchableOpacity
        key={dishDetails?._id}
        onPress={() => setIsPressed(!isPressed)}
        className={`p-4 bg-white border-gray-200 ${
          isPressed ? "border-t-[1px]" : "border-y-[1px]"
        }`}
      >
        <View className="flex-row ">
          <View className="flex-1 pr-2 ">
            <Text className="font-bold">{dishDetails?.name}</Text>
            <Text className="text-gray-300">
              {dishDetails?.shortDescription}
            </Text>
            <Text className="text-gray-500">
              {"Rs." + formatter.format(dishDetails?.price)}
            </Text>
          </View>
          <View>
            <Image
              source={{ uri: dishDetails?.imageUrl }}
              resizeMode="cover"
              className="h-20 w-20 bg-gray-300 px-4"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="flex-row bg-white px-4 items-center space-x-3 pb-3">
          <TouchableOpacity
            disabled={!items.length}
            onPress={removeItemsFromBasket}
          >
            <MinusCircleIcon
              size="30"
              color={items.length > 0 ? "#00CCBB" : "gray"}
            />
          </TouchableOpacity>
          <Text>{items.length}</Text>
          <TouchableOpacity onPress={addItemsToBasket}>
            <PlusCircleIcon size="30" color="#00CCBB" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Index;
