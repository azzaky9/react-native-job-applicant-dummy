import React from "react";
import {
  Button,
  Icon,
  IconElement,
  IconProps,
  List,
  ListItem
} from "@ui-kitten/components";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IListItem {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
}

type TDataList = {
  title: string;
  description: string;
  isRead: boolean;
};

type ListItemProps = {
  iconType: "notification" | "activity";
  data: IListItem[];
};

export const ListUI = (props: ListItemProps): React.ReactElement => {
  const renderItem = ({
    item,
    index
  }: {
    item: IListItem;
    index: number;
  }): React.ReactElement => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={item.description}
      accessoryLeft={
        props.iconType === "notification" ? (
          <Ionicons
            name='notifications'
            size={18}
            color='gray'
          />
        ) : (
          <Ionicons
            name='timer'
            size={18}
            color='gray'
          />
        )
      }
      accessoryRight={() => (
        <Button
          size='tiny'
          onPress={() => {
            return ToastAndroid.show(
              "Appllied successfully.",
              ToastAndroid.SHORT
            );
          }}
          appearance='outline'
          status='basic'
        >
          MARK AS READ
        </Button>
      )}
    />
  );

  return props.data.length > 0 ? (
    <List
      style={styles.container}
      data={props.data}
      renderItem={renderItem}
    />
  ) : (
    <View style={{ padding: 10 }}>
      <Text style={{ fontWeight: 500, fontSize: 20 }}>
        Not currently have {props.iconType}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 340,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4
  }
});
