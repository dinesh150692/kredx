import React from "react";
import { connect }  from 'react-redux';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Button, Text, Icon } from "native-base";

import Input from '../common/input';
import DateSelection from '../common/dateSelection';

import { updateDealDetails, updateEditFlow, updateCurrentStep } from '../redux/actions/index';

const NAME_REGEX = /[^a-zA-Z\s]/gi;
const NUMBER_REGEX = /^[^0-9\b]+$/;
class DealForm extends React.PureComponent {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            name: props.dealDetails.name || '',
            date: props.dealDetails.date || '',
            amount: props.dealDetails.amount || '',
            error: {
                name: '',
                date: '',
                amount: ''
            },
            buttonDisabled: false
        }
    }

    componentDidMount(){
        this.handleButtonValidation();
    }

    submitDetails = () => {
        Keyboard.dismiss();
        if(this.handleButtonValidation()){
            return;
        }
        let { name, amount, date } = this.state;
        let details = { 
            name: name,
            amount: amount,
            date: date
        }
        this.props.updateEditFlow(false);
        this.props.updateDealDetails(details);
        this.props.updateCurrentStep(1);
    }

    handleValueChange = (value, type) => {
        switch(type){
            case 'NAME':
                this.setState({ name: value});
                break;
            case 'DATE':
                this.setState({date: value});
                break;
            case 'AMOUNT':
                this.setState({amount: value});
                break;
            default:
                this.handleButtonValidation();
                break;
        }
    }

    onSubmitEditing = (id) => {
        if(id === 2){
            this.handleButtonValidation();
        } 
    }


    handleInputValidation = (type = '') => {
        let { name, date, amount, error} = this.state;
        switch(type){
            case 'NAME':
                if(name !== ''){
                    error['name'] = '';
                }else{
                    error['name'] = 'Enter valid name';
                }
                break;
            case 'DATE':
                if(date !== ''){
                    error['date'] = '';
                }else{
                    error['date'] = 'Enter valid date';
                }
                break;
            case 'AMOUNT':
                if(!amount){  
                    error['amount'] = 'Enter valid amount';
                }else{
                    error['amount'] = '';
                }
                break;
        }
        this.setState({error: {...error}});
        this.handleButtonValidation();
        
    };

    handleButtonValidation = () => {
       
        let { name, date, amount, buttonDisabled } = this.state;
        if(name && date && amount){
            buttonDisabled ? this.setState({buttonDisabled: false}) : null;
            return false;
         }else{
            !buttonDisabled ? this.setState({buttonDisabled : true}): null;
            return true;
         }
    }

    render() {
        return ( 
            <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        CREATE A DEAL
                    </Text>
                </View>
                <Input 
                    id={0}
                    keyType="next" 
                    type="default" 
                    regex={NAME_REGEX}
                    fieldName="NAME"
                    value={this.state.name}
                    onSubmit={this.onSubmitEditing}
                    onBlur={this.handleInputValidation}
                    error={this.state.error.name}
                    handleChange={this.handleValueChange}    
                />
                <DateSelection 
                    id={1}
                    maxDate={new Date()}
                    minDate={null}
                    type="default" 
                    fieldName="DATE"
                    value={this.state.date}
                    onSubmit={this.onSubmitEditing}
                    error={this.state.error.date}
                    onBlur={this.handleInputValidation}
                    handleChange={this.handleValueChange}    
                />
                 <Input 
                    id={2}
                    keyType="done" 
                    type="numeric" 
                    regex={NUMBER_REGEX}
                    fieldName="AMOUNT"
                    value={this.state.amount}
                    onSubmit={this.onSubmitEditing}
                    onBlur={this.handleInputValidation}
                    error={this.state.error.amount}
                    handleChange={this.handleValueChange}    
                />
                <Button style={{alignSelf: 'center', marginVertical: 15, paddingHorizontal: 10}} iconRight primary rounded onPress={this.submitDetails} disabled={this.state.buttonDisabled}>
                    <Text style={{fontSize: 15, color: 'white'}}>NEXT</Text>
                    <Icon style={{fontSize: 25, color: 'white'}} ios={'md-arrow-dropright-circle'} android={'md-arrow-dropright-circle'} />
                </Button>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        dealDetails: state.details.dealDetails
	};
}
const mapDispatchToProps = {
    updateCurrentStep,
    updateEditFlow,
    updateDealDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(DealForm);


const styles = StyleSheet.create({
    formContainer:{
        elevation: 2,
        marginBottom: '5%',
        paddingBottom: '2%',
        marginHorizontal: '4%',
        backgroundColor: 'white'
    },
    headerContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20
    },
    headerText:{
        color: 'black',
        fontSize: 25
    }
});