// make a simple increment counter react native component

import { CardUI } from "@/components/cards/Card";
import { Layout } from "@ui-kitten/components";
import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native";

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

export default function Counter() {
  return (
    <Layout
      style={{
        flex: 1
      }}
    >
      <ScrollView
        style={{ padding: 10, gap: 5, backgroundColor: "transparent" }}
      >
        {dummy.map((d, index) => (
          <CardUI
            key={index}
            onAccept={() => console.log("dasd")}
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
