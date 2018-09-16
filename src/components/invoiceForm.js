import React from "react";
import { connect }  from 'react-redux';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Button, Text, Icon } from "native-base";

import Input from '../common/input';
import DateSelection from '../common/dateSelection';

import { updateInvoiceDetails,  updateEditFlow, updateCurrentStep, clearForm } from '../redux/actions';

const NAME_REGEX = /[^a-zA-Z\s]/gi;
const NUMBER_REGEX = /^[^0-9\b]+$/;
class InvoiceForm extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            invoiceName: props.invoiceDetails.invoiceName || '',
            issueDate: props.invoiceDetails.issueDate || '',
            repaymentDate: props.invoiceDetails.repaymentDate || '',
            amount: props.invoiceDetails.amount || '',
            error: {
                invoiceName: '',
                issueDate: '',
                repaymentDate: '',
                amount: ''
            },
            previousButtonDisabled: true,
            buttonDisabled: true
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
        this.props.clearForm();
    }

    handleValueChange = (value, type) => {
        switch(type){
            case 'INVOICE NAME':
                this.setState({ invoiceName: value});
                break;
            case 'REPAYMENT DATE':
                this.setState({repaymentDate: value});
                break;
            case 'ISSUE DATE':
                this.setState({issueDate: value});
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
        if(Number(id) === 3){
            this.handleInputValidation('AMOUNT');
        } 
    }

    handleInputValidation = (type = '') => {
        let { invoiceName, repaymentDate, issueDate, amount, error} = this.state;
        switch(type){
            case 'INVOICE NAME':
                if(invoiceName !== ''){
                    error['invoiceName'] = '';
                }else{
                    error['invoiceName'] = 'Enter valid invoice name';
                }
                break;
            case 'REPAYMENT DATE':
                if(repaymentDate !== ''){
                    error['repaymentDate'] = '';
                    this.setState({previousButtonDisabled: true});
                }else{
                    error['repaymentDate'] = 'Enter valid repayment date';
                    this.setState({previousButtonDisabled: true});
                }
                if(this.dateCheck(this.state.issueDate, this.state.repaymentDate, this.props.dealDetails.date)){
                    error['repaymentDate'] = 'Listing date must be between issue date and repayment date';
                    this.setState({previousButtonDisabled: false});
                }
                break;
            case 'ISSUE DATE':
                if(issueDate !== ''){
                    error['issueDate'] = '';
                }else{
                    error['issueDate'] = 'Enter valid issue date';
                }
                break;
            case 'AMOUNT':
                if(!amount){  
                    error['amount'] = 'Enter valid amount';
                    this.setState({previousButtonDisabled: true});
                }else if(Number(this.props.dealDetails.amount) > Number(amount)){
                    error['amount'] = 'Amount must be greater than deal amount';
                    this.setState({previousButtonDisabled: false});
                }else{
                    error['amount'] = '';
                    this.setState({previousButtonDisabled: true});
                }
                break;
        }
        this.setState({error: {...error}},() => {
            this.handleButtonValidation();
        });        
    };

    handleButtonValidation = () => {
        let { invoiceName, repaymentDate, amount, issueDate, buttonDisabled, error } = this.state;
        if(invoiceName && issueDate && repaymentDate && amount && !error['invoiceName'] && !error['issueDate'] && !error['repaymentDate'] && !error['amount']){
            buttonDisabled ? this.setState({buttonDisabled: false}) : null;
            return false;
         }else{
            !buttonDisabled ? this.setState({buttonDisabled : true}): null;
            return true;
         }
    }

    dateCheck = (from,to,check) => {
        let d1 = from.split(" - ");
        let d2 = to.split(" - ");
        let c = check.split(" - ");
        from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);
        to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
        check = new Date(c[2], parseInt(c[1])-1, c[0]);
        let fDate,lDate,cDate;
        fDate = Date.parse(from);
        lDate = Date.parse(to);
        cDate = Date.parse(check);
        if((cDate <= lDate && cDate >= fDate)) {
            return false;
        }else{
            return true;
        }
    }

    handlePreviousButton = () => {
        let { invoiceName, issueDate, repaymentDate, amount } = this.state;
        let details = { invoiceName, issueDate, repaymentDate, amount };
        this.props.updateInvoiceDetails(details);
        this.props.updateCurrentStep(0)
        this.props.updateEditFlow(true)
    }

    render() {
        return ( 
            <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        CREATE AN INVOICE
                    </Text>
                </View>
                <Input 
                    id={0}
                    keyType="next" 
                    type="default" 
                    regex={NAME_REGEX}
                    fieldName="INVOICE NAME"
                    value={this.state.invoiceName}
                    onSubmit={this.onSubmitEditing}
                    onBlur={this.handleInputValidation}
                    error={this.state.error.invoiceName}
                    handleChange={this.handleValueChange}    
                />
                <DateSelection 
                    id={1}
                    maxDate={new Date()}
                    minDate={null}
                    type="default" 
                    fieldName="ISSUE DATE"
                    value={this.state.issueDate}
                    onSubmit={this.onSubmitEditing}
                    error={this.state.error.issueDate}
                    onBlur={this.handleInputValidation}
                    handleChange={this.handleValueChange}    
                />
                <DateSelection 
                    id={2}
                    maxDate={null}
                    minDate={this.state.issueDate}
                    type="default" 
                    fieldName="REPAYMENT DATE"
                    value={this.state.repaymentDate}
                    onSubmit={this.onSubmitEditing}
                    error={this.state.error.repaymentDate}
                    onBlur={this.handleInputValidation}
                    handleChange={this.handleValueChange}    
                />
                 <Input 
                    id={3}
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
                    <Text style={{fontSize: 15, color: 'white'}}>SUBMIT</Text>
                </Button>
                <Button 
                    style={{alignSelf: 'center', marginVertical: 15, paddingHorizontal: 10}} 
                    iconLeftt primary rounded 
                    onPress={this.handlePreviousButton} 
                    disabled={this.state.previousButtonDisabled}
                >
                    <Icon style={{fontSize: 25, color: 'white'}} ios={'md-arrow-dropleft-circle'} android={'md-arrow-dropright-circle'} />
                    <Text style={{fontSize: 15, color: 'white'}}>Previous</Text>
                </Button>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        invoiceDetails: state.details.invoiceDetails,
        dealDetails: state.details.dealDetails
	};
}
const mapDispatchToProps = {
    updateCurrentStep,
    updateInvoiceDetails,
    updateEditFlow,
    clearForm
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);


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