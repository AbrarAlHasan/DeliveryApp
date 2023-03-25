import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../../components/Categories";
import FeaturedRow from "../../components/FeaturedRow/FeaturedRow";
import { getFeatured } from "../../axios/Featured";

const Index = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {
    (async function fetchData() {
      try {
        const data = await getFeatured();
        setFeaturedCategories(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-row pb-2 items-center mx-4 space-x-2 bg-white">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className=" flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 mx-4 pb-2">
        <View className="flex-row items-center bg-gray-200 space-x-2 flex-1 p-3">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>
      <ScrollView
        className="bg-white"
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Categories */}
        <Categories />
        {/* Featured Row */}
        {featuredCategories?.map((data) => {
          return (
            <FeaturedRow
              id={data?._id}
              title={data.featureName}
              description={data?.shortDescription}
              restaurant={data?.restaurantId}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
