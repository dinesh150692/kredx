import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import {
    Icon,
    Body,
    Left,
    Right,
    Title,
    Header,
    Container,    
    Content
  } from 'native-base';
class SideBar extends React.Component {

    constructor(props) {
     super(props);
     this.state = {
         list : ['MENU ITEM 1', 'MENU ITEM 2', 'MENU ITEM 3', 'MENU ITEM 4']
     }
    }

    render() {
        return ( 
            <Container style={{flex:1}}>
                <Header style = {styles.menuBackground}>
                    <Left>
                        <View style={styles.imageContainer}>
                        </View>
                    </Left>
                    <Body style= {styles.menuAlign}>
                        <Title style = {styles.menuFont}>USER NAME</Title>
                    </Body>
                    <Right>
                        <Icon android={'md-close'} ios={'md-close'} onPress={() => {this.props.navigation.navigate('DrawerClose')}} style={styles.closeIcon}/>
                    </Right>
                </Header>
                {/* {this.props.children} */}
                <Content>
                    {this.state.list.map(item => {
                        return ( 
                            <View key={item} style={styles.itemContainer}>
                                <Text style={styles.itemText}>
                                    {item}
                                </Text>
                            </View>
                        )
                    })}
                </Content>
            </Container>
        );
    }
}

export default SideBar;


const styles = StyleSheet.create({
    menuAlign:{
        flexGrow: 2,
        alignSelf: 'center',
        alignItems: 'center'
    },
    menuFont: {
        paddingLeft: 20,
        color: 'white'
    },
    menuBackground: {
        height: 80,
        backgroundColor: '#3F51B5',
        paddingBottom: 10,
        paddingTop: 10
    },
    itemContainer: {
        width: '90%',
        height: 90,
        padding: 10,
        display: 'flex',
        borderBottomWidth: 2,
        alignItems: 'center',
        marginHorizontal: '5%',
        justifyContent: 'center',
        borderBottomColor: 'grey'
    },
    itemText:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    imageContainer:{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white'
    },

    closeIcon:{
        position: 'absolute',
        fontSize: 25,
        elevation: 3,
        color: 'white',
        top: -20
    }
});