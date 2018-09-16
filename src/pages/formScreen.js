import React from "react";
import { connect } from 'react-redux';
import HeaderComponent from '../common/header';
import StepDetails from "../components/stepDetails";
import DealDetails from "../components/dealDetails";
import DealForm from "../components/dealForm";
import InvoiceForm from "../components/invoiceForm";
import { Container, Content } from "native-base";
class FormScreen extends React.Component {

    constructor(props) {
     super(props);
    }

    render() {
        return ( 
            <Container style={{flex:1, backgroundColor: '#f4f2f2'}}>
                <HeaderComponent 
                    title={'Kredx Deal Creation'}
                    navigation={this.props.navigation} 
                />
                <Content>
                    <StepDetails/> 
                    {this.props.editFlow && <DealDetails/>}
                    {this.props.currentStep === 0 && <DealForm/>}
                    {this.props.currentStep === 1 && <InvoiceForm/>}
                </Content>
            </Container>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        editFlow: state.details.editFlow,
        currentStep: state.details.currentStep
	};
}
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FormScreen);