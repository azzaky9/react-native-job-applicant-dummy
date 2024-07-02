import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Button, Card, Layout, Text } from "@ui-kitten/components";

type HeaderProps = ViewProps & { title: string; subtitle: string };

const Header = (props: HeaderProps): React.ReactElement => (
  <View {...props}>
    <Text category='h6'>{props.title}</Text>
    <Text category='s1'>{props.subtitle}</Text>
  </View>
);

type FooterProps = {
  onAccept: () => void;
  onCancel: () => void;
  isApplied: boolean;
};

const Footer = (props: ViewProps & FooterProps): React.ReactElement => (
  <View
    {...props}
    // eslint-disable-next-line react/prop-types
    style={[props.style, styles.footerContainer]}
  >
    <Button
      style={styles.footerControl}
      size='small'
      onPress={props.onAccept}
      appearance={props.isApplied ? "outline" : "filled"}
      status={props.isApplied ? "danger" : "primary"}
    >
      {props.isApplied ? "Cancel Applied" : "Apply"}
    </Button>
  </View>
);

type CardProps = {
  title: string;
  subtitle: string;
  description: string;
};

export const CardUI = ({
  description,
  subtitle,
  title,
  ...footerProps
}: CardProps & FooterProps): React.ReactElement => (
  <Card
    style={styles.card}
    header={
      <Header
        subtitle={subtitle}
        title={title}
      />
    }
    footer={<Footer {...footerProps} />}
  >
    <Text>{description}</Text>
  </Card>
);

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  card: {
    flex: 1,
    margin: 2
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  footerControl: {
    marginHorizontal: 2
  }
});
