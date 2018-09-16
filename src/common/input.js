import React from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class Input extends React.PureComponent {
    constructor(props) {
        super(props);     
    }

    render(){
        return ( 
            <View style={styles.inputItem}>
                <Text style={styles.label}>
                    {this.props.fieldName + ' *'}
                </Text>
                <TextInput
                    style={styles.input}
                    value={this.props.value}
                    keyboardType={this.props.type}
                    maxLength={this.props.maxLength}
                    underlineColorAndroid="transparent"
                    returnKeyType={this.props.keyType || 'next'}
                    onBlur={() => {this.props.onBlur(this.props.fieldName)}}
                    onSubmitEditing={() => this.props.onSubmit(this.props.id)}
                    onChangeText={(value) => {this.props.handleChange(value.replace(this.props.regex,''), this.props.fieldName)}}
                />
                {this.props.error.length > 0 && <Text style={[styles.label, styles.error]}>{this.props.error}</Text>}
            </View>
        );
    } 
}

const styles = StyleSheet.create({
    inputItem:{
        marginTop: 21
    },
    input:{
        height: 40,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 16,
        color: 'black',
        fontFamily: 'Roboto',
        borderColor: '#bdbdbd',
        width: '90%',
        marginHorizontal: '5%'
    },
    label:{
        fontSize: 14,
        marginBottom: 8,
        color: 'black',
        fontFamily: 'Roboto',
        marginHorizontal: '5%'
    },
    error:{
        fontSize: 12,
        color: 'red',
        fontFamily: 'Roboto'
    }
});
