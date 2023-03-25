import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "../RestaurantCard/restaurantCard";
const FeaturedRow = ({ title, description, id, restaurant }) => {
  return (
    <View>
      <View
        key={id}
        className="flex-row items-center justify-between flex-1 mt-4 px-4"
      >
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color={"#00CCBB"} />
      </View>
      <Text className="text-gray-500 text-xs px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Cards */}
        {restaurant?.map((data) => {
          return (
            <RestaurantCard
              id={data?._id}
              imgUrl={data?.imageUrl}
              title={data?.name}
              rating={data?.rating}
              address={data?.address}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
