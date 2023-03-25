import { View, Text, ScrollView } from "react-native";
import React from "react";
import CategoryCard from "../CategoryCard";
const Index = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
    >
      {/* Catergory Card */}
      <CategoryCard
        imageUrl="https://links.papareact.com/gn7"
        title="Testing"
      />
    </ScrollView>
  );
};

export default Index;
