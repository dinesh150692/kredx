import { ACTION_TYPE } from '../actionType';

let initialState = {
    dealDetails: {
        name: '',
        date: '',
        amount:''
    },
    invoiceDetails: {
        invoiceName: '',
        issueDate: '',
        repaymentDate:'',
        amount: ''
    },
    currentStep: 0,
    editFlow: false
};

export default function formReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPE.UPDATE_EDIT_FLOW:
            return {...state, editFlow: action.value};

        case ACTION_TYPE.UPDATE_CURRENT_STEP:
            return {...state, currentStep: action.currentStep};

        case ACTION_TYPE.UPDATE_DEAL_CREATION_DETAILS:
            return {...state, ...{dealDetails: action.details}};
        
        case ACTION_TYPE.UPDATE_INVOICE_DETAILS:
            return {...state, ...{invoiceDetails: action.details}}

        case ACTION_TYPE.CLEAR_FORM: 
            return initialState;

        default:
            return state;
    }
}
  