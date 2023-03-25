import {
  View,
  Text,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../../../features/BasketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";

const BasketScreen = () => {
  const navigation = useNavigation();
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  });

  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const [groupedItems, setGroupedItems] = useState([]);
  const deliveryFee = Math.min(basketTotal * 0.03, 150);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return { ...results };
    }, {});

    setGroupedItems(groupedItems);
  }, [items]);
  console.log(groupedItems);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute rounded-full bg-gray-100 top-3 right-5"
          >
            <XCircleIcon height={50} width={50} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="w-7 h-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Delivery in 45-50 Mins</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y-[1px] divide-gray-300">
          {Object.entries(groupedItems).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-2 bg-white py-3 px-2"
            >
              <Text className="text-[#00CCBB] font-bold">{items.length} x</Text>
              <Image
                source={{ uri: items[0].imageUrl }}
                className="h-10 w-10 rounded-full"
              />
              <Text className="flex-1">{items[0].name}</Text>
              <Text className="text-gray-600">
                Rs.{formatter.format(items[0].price)}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ _id: key }))}
              >
                <Text className="text-[#00CCBB] text-xs">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="bg-white p-5">
          <View className="flex-row justify-between items-center pb-2">
            <Text className="text-gray-400">SubTotal</Text>
            <Text className="text-gray-400">
              Rs.{formatter.format(basketTotal)}
            </Text>
          </View>

          <View className="flex-row justify-between items-center pb-2">
            <Text className="text-gray-400">Delivery Fee (3% or Rs.150)</Text>
            <Text className="text-gray-400">
              Rs.{formatter.format(deliveryFee)}
            </Text>
          </View>

          <View className="flex-row justify-between items-center pb-2">
            <Text>Order Total</Text>
            <Text className=" font-bold text-lg">
              Rs.{formatter.format(deliveryFee + basketTotal)}
            </Text>
          </View>
          <TouchableOpacity
            className="rounded-lg bg-[#00CCBB] p-3"
            onPress={() => navigation.navigate("Preparing")}
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
