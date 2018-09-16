/* Library Import */
import React from "react";
import { Header, Left, Right, Button, Body, Icon, Title} from "native-base";

const HeaderComponent = (props) => (
    <Header>
          <Left>
            <Button
              transparent
              onPress={() => props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style={{flexGrow: 2, alignSelf: 'center'}}>
            <Title>{props.title}</Title>
          </Body>
    </Header>
);

export default HeaderComponent;