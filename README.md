# FireBaseAuth
basic authentication on firestore
It is simplified version of project that I've done for university organization
It gives chance to look through the data from databse and to download data in CSV file

try log with:
Login: example@gmail.com
password: 123456

this let me to authenticate only one user to read data in firestore:
match /Persons/{PesronId} {
    	allow read: if request.auth.uid != null && request.auth.uid == 'WB6SGoOpoTcIWOBUMDea99ubQPw1'
    }
