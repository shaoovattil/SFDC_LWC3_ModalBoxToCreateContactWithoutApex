public with sharing class UpdateContactController 
{
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> displayContacts()
    {        
        return [
            
            SELECT Id, name, Email FROM Contact WHERE AccountId = null 
            
        ];        
    }   

    @AuraEnabled
    public static boolean updateAccountNameOfContact(List<String> conIds, String accId)
    {
        List<Contact> listOfContacts = new List<Contact>();
        Contact currentContact; 

        for(Integer i=0;i<conIds.size();i++)
        {
            currentContact = new Contact();
            
            String sContactId = conIds[i];            
            currentContact.Id = sContactId;
            System.debug('ContactId'+currentContact.Id);

            currentContact.AccountId = accId;
            System.debug('AccountId'+currentContact.AccountId);

            listOfContacts.add(currentContact);                
        }                              
               
        try
        {
            update(listOfContacts);		
        }
        catch(exception ex)
        {
            return false;
        }
        
        return true;
    }

    /*
    @AuraEnabled
    public static Boolean updateAccountNameOfOneContact(String conId, String accId)
    {          
        System.debug('INSIDE Apex');
        System.debug('CONTACT ID' + conId);

        System.debug('ACCOUNT ID ' + accId);
        

        Contact ct = [SELECT Name FROM Contact WHERE Id =: conId];
        ct.AccountId = accId;
        
        try
        {
            update ct;	
        }
        catch(exception ex)
        {
            System.debug('ERROR' + ex.getMessage());
            return false;
        }        
        return true;              
    }  */
    
}
