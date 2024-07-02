// make basic activity component for this application

import { ListUI } from "@/components/lists/ListItem";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/Auth";
import { Timestamp, collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { Text, View } from "react-native";

type Activity = {
  id: string;
  activity: string;
  isRead: boolean;
  timestamp: Timestamp;
};

export default function Activity() {
  const auth = useAuth();
  const [activities, setActivities] = React.useState<Activity[]>([]);

  console.log("current activity", activities);

  const getActivities = async () => {
    try {
      if (auth.user) {
        const q = query(
          collection(db, "userActivity"),
          where("uid", "==", auth.user.id)
        );

        const querySnapshot = await getDocs(q);
        // @ts-ignore
        const result = [] as Activity[];
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            const docData = doc.data() as Activity;
            result.push({ ...docData, id: doc.id });
          }
        });
        // @ts-ignore
        setActivities(result);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        console.log(error.message);
      }
    }
  };

    const formatDate = (timestamp: Timestamp) => {
      const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

  React.useEffect(() => {
    getActivities();
  }, []);

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <ListUI
        iconType='activity'
        data={activities.map((ac) => ({
          title: ac.activity,
          id: ac.id,
         description: formatDate(ac.timestamp),
          isRead: ac.isRead
        }))}
      />
    </View>
  );
}
