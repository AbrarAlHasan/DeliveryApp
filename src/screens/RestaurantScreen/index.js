import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getRestaurant } from "../../axios/Restaurant";
import {
  ArrowLeftIcon,
  StarIcon,
  MapPinIcon,
} from "react-native-heroicons/solid";
import {
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import Dishes from "../../components/DishComponent";
import BasketIcon from "../../components/BasketIcon/basketIcon";

const Index = () => {
  const navigation = useNavigation();
  const {
    params: { id },
  } = useRoute();
  const [restaurantDetails, setRestaurantDetails] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {
    (async function fetchData() {
      const data = await getRestaurant(id);
      setRestaurantDetails(data);
    })();
  }, []);

  return (
    <>
      <BasketIcon />

      <ScrollView className="mb-4">
        <View className="relative">
          <Image
            source={{ uri: restaurantDetails?.imageUrl }}
            className="w-full h-56 bg-gray-200 p-4"
            resizeMode="stretch"
          />
          <TouchableOpacity
            className="absolute top-14 left-4 bg-gray-200 rounded-full p-2"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon size={25} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-2xl font-bold">
              {restaurantDetails?.name}
            </Text>
            <View className="flex-row space-x-2">
              <View className="flex-row items-center space-x-2">
                <StarIcon color={"green"} size="22" />
                <Text className="text-xs text-green">
                  {restaurantDetails?.rating + " " + "Stars"}
                </Text>
              </View>
              <View className="flex-row  items-center space-x-2 flex-1">
                <MapPinIcon color={"gray"} size="22" />
                <Text className="text-xs text-green flex-1">
                  {restaurantDetails?.address}
                </Text>
              </View>
            </View>
            <Text className="py-3 text-gray-400">
              {restaurantDetails?.shortDescription}
            </Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-gray-400 border-t-[0.5px]">
            <QuestionMarkCircleIcon color="gray" size={20} />
            <Text className="flex-1 font-bold">Have Food allergy?</Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="pb-32">
          <Text className="px-4 pt-4 text-xl font-bold mb-3">Menu</Text>
          {restaurantDetails?.dishes?.map((data) => {
            return <Dishes dishDetails={data} />;
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default Index;
