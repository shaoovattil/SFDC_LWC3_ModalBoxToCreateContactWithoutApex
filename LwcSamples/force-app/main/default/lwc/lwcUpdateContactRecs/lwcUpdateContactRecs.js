import { api, LightningElement , wire } from 'lwc';
import Name_FIELD from '@salesforce/schema/Contact.Name';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import displayContacts from '@salesforce/apex/UpdateContactController.displayContacts';
import updateAccountNameOfContact from '@salesforce/apex/UpdateContactController.updateAccountNameOfContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';

const COLUMNS = [    
                    { label:'Name', fieldName:Name_FIELD.fieldApiName, type:'text' },
                    { label:'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'text' }                    
                ];

export default class LwcUpdateContactRecs extends LightningElement 
{
    columns = COLUMNS;
    @api recordId;    
    selectedConts  = [];
    
    @wire(displayContacts) contacts;

    getSelectedName(event) 
    {
        this.selectedConts=[]; 
        const selectedRows = event.detail.selectedRows;
            
        for (let i = 0; i < selectedRows.length; i++)
        {
            //alert("You selected: " + selectedRows[i].Id);            
            this.selectedConts.push(selectedRows[i].Id);                     
        }
        console.log('Selected Array',this.selectedConts);                 
    }

    showSuccessToast() 
    {
        const evt = new ShowToastEvent(
        {
            title: 'Toast Success',
            message: 'Opearion sucessful',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    
    showErrorToast() 
    {
        const evt = new ShowToastEvent(
        {
            title: 'Toast Error',
            message: 'Some unexpected error',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    handleClick(event)
    {        
        /*console.log('Selected Array',this.selectedConts);
        for (let i = 0; i < this.selectedConts.length; i++)
        {
            alert("Your Row selected: " + this.selectedConts[i]);
        }
        alert('AccountID: = '+this.recordId);*/

        updateAccountNameOfContact( {conIds:this.selectedConts,accId:this.recordId})        
        .then(result =>
        {
            //alert("Successfully Updated");
            this.showSuccessToast();
            this.error = undefined;
            this.selectedConts=[];
            return refreshApex(this.contacts);
        })
        .catch(error =>
        {
            this.showErrorToast();
            console.log('Error: Failed to Update'); 
            this.error = error;
        })        
    }

    handleShowModal()
    {
        const modal = this.template.querySelector("c-modal-popup");
        console.log('Current RecordID:',this.recordId);        
        modal.show(this.recordId);
    }
}

