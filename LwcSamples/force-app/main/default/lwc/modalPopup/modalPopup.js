import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ModalPopup extends LightningElement 
{       
    @api recordId;
    showModal = false;    
           
    @api show(acId)
    { 
        this.recordId = acId;
        console.log('Account ID',this.accoId); 
        this.showModal = true;        
    }

    handleDialogClose()
    {
        this.showModal = false;
    }    

    closeModal()
    {
        this.showModal = false;
    }

    handleSubmit(event) 
    {
        console.log('onsubmit event recordEditForm'+ event.detail.fields);
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
    
    handleSuccess(event)
    {          
        const evt = new ShowToastEvent({
            title: "Contact created",
            message: "Record ID: " + event.detail.id,            
            variant: "success"
        });       
       
        this.dispatchEvent(evt);   
        this.showModal = false;       
        console.log('LAST CURRENT RECORD ID' +event.detail.id );
    }    
}

