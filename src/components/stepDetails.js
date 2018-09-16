import React from "react";
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';

class StepDetails extends React.Component {
    constructor(props) {
     super(props);
    }
    render() {
        return ( 
            <View style={styles.container}>
                <Button style={styles.button} rounded primary={this.props.currentStep === 0} transparent={this.props.currentStep !== 0}>
                    <Text style={this.props.currentStep === 0  ? styles.buttonTextActive : styles.buttonText }>Step 1</Text>
                </Button>
                <Button style={styles.button} rounded primary={this.props.currentStep === 1} transparent={this.props.currentStep !== 1}>
                    <Text style={this.props.currentStep === 1  ? styles.buttonTextActive : styles.buttonText }>Step 2</Text>
                </Button>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        currentStep: state.details.currentStep
	};
}
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StepDetails);


const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '80%',
        borderWidth: 2,
        borderRadius: 25,
        marginVertical: '10%',
        marginHorizontal: '10%',
        paddingHorizontal: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button:{
        width: '50%',
        height: 40,
        marginVertical: 2,
        marginHorizontal: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:{
        color: 'black',
        fontSize: 20,
        textAlign: 'center'
    },
    buttonTextActive:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
});
