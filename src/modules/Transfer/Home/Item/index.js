import React from "react";
import { Avatar, Card } from "react-native-paper";
import { Paragraph } from "react-native-paper";
import { formatMoney } from "~/lib/util";

export const Item = ({ name, value }) => {
  return (
    <Card style={{ margin: 10, marginVertical: 6 }}>
      <Card.Title
        title={name}
        subtitle={value > 0 ? "Deposito" : "Transferencia"}
        left={(props) =>
          value > 0 ? (
            <Avatar.Icon
              size={32}
              style={{ backgroundColor: "#34a853" }}
              icon="arrow-up"
            />
          ) : (
            <Avatar.Icon
              size={32}
              style={{ backgroundColor: "#ea4335" }}
              icon="arrow-down"
            />
          )
        }
        right={(props) => (
          <Paragraph style={{ margin: 20 }}>
            {formatMoney(Math.abs(value))}
          </Paragraph>
        )}
      />
    </Card>
  );
};
