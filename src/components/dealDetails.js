import React from "react";
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from "native-base";

class DealDetails extends React.Component {

    constructor(props) {
     super(props);
     this.state = {
        openDetails: false
     }
    }
    renderDetails = () => {
        return(
            <View style={{flex: 1, display: 'flex', backgroundColor: "lightblue", padding: 20}}>
                <View style={styles.valueItem}>
                    <Text>ISSUE DATE *</Text>
                    <Text>{this.props.invoiceDetails.issueDate}</Text>
                </View>
                <View style={styles.valueItem}>
                    <Text>REPAYMENT DATE *</Text>
                    <Text>{this.props.invoiceDetails.repaymentDate}</Text>
                </View>
                <View style={styles.valueItem}>
                    <Text>AMOUNT *</Text>
                    <Text>{this.props.invoiceDetails.amount}</Text>
                </View>
            </View>
        )
    }
    render() {
        return ( 
            <View style={styles.valueContainer}>
                <View style={!this.state.openDetails ? [styles.valueContent, styles.valueBorder] :styles.valueContent}>
                    <View>
                        <Text style={styles.header}>VALUES IN INVOICE FORM</Text>
                    </View>
                    <TouchableOpacity onPress={() => {this.setState({openDetails: !this.state.openDetails})}}>
                            <Icon name={this.state.openDetails ? "md-arrow-dropup" : "md-arrow-dropdown" }/>
                    </TouchableOpacity>
                </View>
                {this.state.openDetails && this.renderDetails()}
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        invoiceDetails: state.details.invoiceDetails,
	};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DealDetails);

const styles = StyleSheet.create({
    valueContainer:{
        display: 'flex',
        marginHorizontal: '4%',
    },
    valueContent:{
        display: 'flex',
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    valueBorder:{
        borderBottomWidth: 2,
        borderBottomColor: 'grey'
    },
    header:{
        fontSize: 20,
        color: 'black'
    },
    valueItem:{
        marginBottom: 15,
        height: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    }
})