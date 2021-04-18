const form = document.querySelector('.mf-form');
const next = document.getElementById('next');
const prev= document.getElementById('prev');
const pages = document.querySelector('h3');
const log = document.querySelector('.mf-log');
const logout = document.getElementById('logout');
const declaration = document.getElementById('declaration');
const download = document.getElementById('data');
const csvInfo = document.getElementById('csvInfo');
const error = document.querySelector('.error');
// listen changes auth

let index=0;
let length=0;
let jason = [];
let Jsonindex=0

auth.onAuthStateChanged(user =>{
  if(user){
    Jsonindex=0;
    jason = [];
    length=0;
    index=0;
    form.classList.remove('d-none');
   download.classList.remove('d-none');
  declaration.classList.remove('d-none');
  log.classList.add('d-none');
  logout.classList.remove('d-none');
  next.classList.remove('d-none');
  prev.classList.remove('d-none')
  pages.classList.remove('d-none');
  log.reset();
    db.collection('Persons').orderBy('send_at','asc').get().then((snapshot) =>{
      length = snapshot.docs.length;
      index=length-1;
       snapshot.docs.forEach(doc =>{
           jason.push(doc.data());
           const when = dateFns.format( jason[Jsonindex].send_at.toDate(), 'Do.MMMM.YYYY');
           jason[Jsonindex].send_at = when;
           Jsonindex+=1;
       });
      pages.textContent = `${length-index} - ${length}`;
      form.q1.value = snapshot.docs[index].data().NameSurname;
      form.q2.value = snapshot.docs[index].data().email;
      form.q3.value = snapshot.docs[index].data().phone;
    }).catch( err => {
      console.log('cant connect to database');
    })
  }else{
    form.classList.add('d-none');
  declaration.classList.add('d-none');
  log.classList.remove('d-none');
  download.classList.add('d-none')
  logout.classList.add('d-none');
  next.classList.add('d-none');
  prev.classList.add('d-none');
  pages.classList.add('d-none');
  csvInfo.classList.add('d-none');
  jason = [];
  form.reset();
  }
})


logout.addEventListener('click', (e) =>{
  e.preventDefault();
  auth.signOut();
})

download.addEventListener('click', (e) =>{
  csvInfo.classList.remove('d-none');
  const { Parser } = require('json2csv');
const json2csvParser = new Parser();
const csv = json2csvParser.parse(jason);

var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    
    //provide the name for the CSV file to be downloaded
    hiddenElement.download = 'Candidates.csv';
    hiddenElement.click();

})

log.addEventListener('submit', (e) =>{
  e.preventDefault();
  const email = log.login.value;
  const password = log.password.value;
  auth.signInWithEmailAndPassword(email,password).then(cred =>{
    console.log(cred.user);
  }).catch(err =>{
    error.innerHTML = 'Niepoprawne hasło lub login'
    setTimeout(() =>{
      error.innerHTML ='';
    },2000)
  })

})

  
  prev.addEventListener('click', e => {
    db.collection('Persons').orderBy('send_at','asc').get().then((snapshot) =>{
      index+=1;
      if(index >= length){
        index = length-1;
      }
      if(index == length-1){
        prev.disabled=true;
      }
      if(index>0){
        next.disabled=false;
      }
      pages.textContent = `${length-index} - ${length}`;
           form.q1.value = snapshot.docs[index].data().NameSurname;
      form.q2.value = snapshot.docs[index].data().email;
      form.q3.value = snapshot.docs[index].data().phone;
  }).catch((err)=>{
    console.log(err)
  })
  })
  
  next.addEventListener('click', e => {
    db.collection('Persons').orderBy('send_at','asc').get().then((snapshot) =>{
      index-=1;
      if(index <= 0){
        index=0
        next.disabled=true;
      }
      if(index < length-1){
        prev.disabled=false;
      }
      pages.textContent = `${length-index} - ${length}`;
      form.q1.value = snapshot.docs[index].data().NameSurname;
      form.q2.value = snapshot.docs[index].data().email;
      form.q3.value = snapshot.docs[index].data().phone;
  }).catch((err)=>{
    console.log(err)
  })
  })
