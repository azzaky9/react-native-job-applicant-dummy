// make a simple increment counter react native component

import { CardUI } from "@/components/cards/Card";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/Auth";
import { Layout } from "@ui-kitten/components";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, ToastAndroid } from "react-native";
import { ScrollView } from "react-native";

type Jobs = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  isApplied: boolean;
};

const dummy = [
  {
    title: "Software Engineer",
    subtitle: "Full-time",
    description:
      "Design, develop, and maintain software applications to meet user requirements and improve system functionality."
  },
  {
    title: "Data Scientist",
    subtitle: "Full-time",
    description:
      "Analyze and interpret complex data sets to provide insights and support decision-making processes."
  },
  {
    title: "Product Manager",
    subtitle: "Full-time",
    description:
      "Oversee the development and launch of products, ensuring they meet customer needs and business objectives."
  },
  {
    title: "UX/UI Designer",
    subtitle: "Full-time",
    description:
      "Design intuitive and visually appealing user interfaces and experiences for web and mobile applications."
  },
  {
    title: "DevOps Engineer",
    subtitle: "Full-time",
    description:
      "Implement and manage continuous integration and deployment pipelines to streamline software development and operations."
  },
  {
    title: "Business Analyst",
    subtitle: "Full-time",
    description:
      "Gather and analyze business requirements, and translate them into technical specifications for development teams."
  },
  {
    title: "QA Engineer",
    subtitle: "Full-time",
    description:
      "Develop and execute test plans to ensure the quality and reliability of software products."
  },
  {
    title: "Cybersecurity Specialist",
    subtitle: "Full-time",
    description:
      "Implement security measures to protect systems and data from cyber threats and vulnerabilities."
  },
  {
    title: "Network Engineer",
    subtitle: "Full-time",
    description:
      "Design, implement, and maintain network infrastructure to ensure reliable and secure communication."
  },
  {
    title: "Technical Support Specialist",
    subtitle: "Full-time",
    description:
      "Provide technical assistance and support to end-users, resolving hardware and software issues."
  }
];

export default function Home() {
  const auth = useAuth();

  const [jobs, setJobs] = useState<Jobs[]>([]);

  console.log(jobs);
  console.log(jobs);

  // const insertDefaultJobs = async () => {
  //   try {
  //     await Promise.all(
  //       dummy.map(async (d) => {
  //         await addDoc(collection(db, "jobs"), {
  //           ...d,
  //           uidApplied: [],
  //           id: Math.floor(Math.random() * 9999999)
  //         });
  //       })
  //     );
  //     console.log("default jobs inserted!");
  //   } catch (e) {
  //     if (e instanceof Error) {
  //       console.log(e);
  //       console.log(e.message);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   insertDefaultJobs();
  // }, []);

  const createActivity = async () => {
    try {
      if (auth.user) {
        await addDoc(collection(db, "userActivity"), {
          uid: auth.user.id,
          activity: "Applied for a job",
          isRead: false,
          timestamp: new Date()
        });
        console.log("activity created!");
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        console.log(e.message);
      }
    }
  };

  const applied = async (id: string) => {
    try {
      const prevData = [...jobs];
      const docRef = doc(db, "jobs", id);
      if (auth.user) {
        await updateDoc(docRef, {
          uidApplied: arrayUnion(auth.user.id)
        });
        await createActivity();
        const newData = prevData.map((d) => {
          if (d.id === id) {
            return {
              ...d,
              isApplied: true
            };
          }
          return d;
        });
        setJobs(newData);
        return ToastAndroid.show("Appllied successfully.", ToastAndroid.SHORT);
      }
      ToastAndroid.show("Failed to applied.", ToastAndroid.SHORT);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        console.log(error.name);
      }
    }
  };
  const canledApplied = async (id: string) => {
    try {
      const prevData = [...jobs];
      const docRef = doc(db, "jobs", id);
      if (auth.user) {
        await updateDoc(docRef, {
          uidApplied: arrayRemove(auth.user.id)
        });
        const newData = prevData.map((d) => {
          if (d.id === id) {
            return {
              ...d,
              isApplied: false
            };
          }
          return d;
        });
        setJobs(newData);
        return ToastAndroid.show("Cancelled.", ToastAndroid.SHORT);
      }
      ToastAndroid.show("Failed to cancel.", ToastAndroid.SHORT);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        console.log(error.name);
      }
    }
  };

  React.useEffect(() => {
    const getJobs = async () => {
      try {
        const data = [] as Jobs[];
        const querySnapshot = await getDocs(collection(db, "jobs"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          if (doc.exists()) {
            const docData = doc.data() as Jobs & {
              uidApplied: string[];
              id: string;
            };
            if (auth.user) {
              data.push({
                ...docData,
                id: doc.id,
                isApplied: !!docData.uidApplied
                  ? docData.uidApplied.includes(auth.user.id)
                  : false
              });
            }
          }
        });

        setJobs(data);
      } catch (e) {
        if (e instanceof Error) {
          console.log(e);
          console.log(e.message);
        }
      }
    };

    getJobs();
  }, []);
  return (
    <Layout
      style={{
        flex: 1
      }}
    >
      <ScrollView
        style={{ padding: 10, gap: 5, backgroundColor: "transparent" }}
      >
        {jobs.map((d) => (
          <CardUI
            key={d.id}
            isApplied={d.isApplied}
            onAccept={() => {
              if (d.isApplied) {
                return canledApplied(d.id);
              }
              applied(d.id);
            }}
            onCancel={() => console.log("cancelled")}
            description={d.description}
            subtitle={d.subtitle}
            title={d.title}
          />
        ))}
      </ScrollView>
    </Layout>
  );
}
