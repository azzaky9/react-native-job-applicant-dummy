import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: true,
        tabBarStyle: {
          height: 60,
          paddingBottom: 5
        }
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: "Explore Jobs",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              style={{
                paddingBottom: 2
              }}
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='activity'
        options={{
          title: "Activity",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "bookmark" : "bookmark-outline"}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='notification'
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "notifications" : "notifications-outline"}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  );
}
