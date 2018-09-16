import React from "react";
import { StyleSheet, Text, TouchableHighlight, View, DatePickerAndroid } from 'react-native';
import { Icon } from 'native-base';
export default class DateSelection extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            open: false
        }  
        this.openDate = this.openDate.bind(this);
    }

    async openDate(){
        let config = {
            date: new Date()
        }
        this.props.maxDate ? config['maxDate'] = this.props.maxDate : null;
        if(this.props.minDate){
            let [day, month, year ] = this.props.minDate.split(' - ');
            config['minDate'] = new Date(Number(year), Number(month)-1, Number(day)+1);
        } 
        
        try {
            const {action, year, month, day} = await DatePickerAndroid.open(config);
            if (action === DatePickerAndroid.dateSetAction) {
                this.props.handleChange(day + ' - ' + Number(Number(month)+1) + ' - ' + year, this.props.fieldName);
                this.props.onSubmit(this.props.id);
            }
            if (action === DatePickerAndroid.dismissedAction) {
                this.props.handleChange('', this.props.fieldName);
            }
            setTimeout(() => {
                this.props.onBlur(this.props.fieldName);
                this.setState({open: false});
            }, 0);
        } catch ({code, message}) {
            this.props.handleChange('', this.props.fieldName);
            this.props.onBlur(this.props.fieldName);
        }
    }
    
    render(){
        const { fieldName, error, value } = this.props;
        const { open } = this.state;
        return ( 
            <React.Fragment>
                <View style={styles.inputItem}>
                    <Text style={styles.label}>{fieldName + '  *'}</Text>    
                    <TouchableHighlight 
                        delayLongPress={4000}
                        underlayColor={'black'} 
                        onPress={()=> {
                            this.setState({open: true});
                            this.openDate()
                        }} 
                        style={styles.input}
                    >
                        <React.Fragment>
                            <Text style={styles.buttonText}>
                                {value}
                            </Text>
                            <Icon 
                                android={open ?  'md-arrow-dropup' : 'md-arrow-dropdown'} 
                                ios={open ?  'md-arrow-dropup' : 'md-arrow-dropdown'}
                                style={{fontSize: 20, color: 'black', marginRight: 10}}/>
                        </React.Fragment>
                    </TouchableHighlight>
                    {error.length > 0 && <Text style={styles.error}>{error}</Text>}
                </View>
            </React.Fragment>
        );
    } 
}


const styles = StyleSheet.create({
    inputItem:{
        marginTop: 21
    },
    input:{
        height: 40,
        display: 'flex',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 16,
        width: '90%',
        borderColor: '#bdbdbd',
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
        
    },
    label:{
        fontSize: 14,
        marginBottom: 8,
        color: 'black',
        fontFamily: 'Roboto',
        marginHorizontal: '5%'
    },
    buttonText:{
        width: '70%',
        fontSize: 16, 
        marginBottom: 0,
        color: 'black',
        fontFamily: "Roboto"
    },
    error:{
        marginHorizontal: '5%',
        fontSize: 12,
        color: 'red',
        fontFamily: 'Roboto'
    }

});