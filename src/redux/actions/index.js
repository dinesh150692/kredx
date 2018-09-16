import { ACTION_TYPE } from '../actionType';

function updateDealDetails(details){
    return { type: ACTION_TYPE.UPDATE_DEAL_CREATION_DETAILS, details }
}

function updateInvoiceDetails(details){
    return { type: ACTION_TYPE.UPDATE_INVOICE_DETAILS, details }
}

function updateCurrentStep(currentStep){
    return { type: ACTION_TYPE.UPDATE_CURRENT_STEP, currentStep }
}

function updateEditFlow(value){
    return { type: ACTION_TYPE.UPDATE_EDIT_FLOW, value }
}

function clearForm(){
    return { type: ACTION_TYPE.CLEAR_FORM }
}

export {
    clearForm,
    updateEditFlow,
    updateCurrentStep,
    updateDealDetails,
    updateInvoiceDetails
}
