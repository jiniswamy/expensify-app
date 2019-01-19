import * as firebase from 'firebase';

  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(config);
  const database = firebase.database();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  export {googleAuthProvider, firebase, database as default}



  // database.ref('expenses').on('child_changed' ,(snapshot) => {
  //   console.log(snapshot.key, snapshot.val());
  // })
  // const expense= (text,amount,note,createdAt) => ({text,amount,note, createdAt});
  // const expense1 = expense('Rent',200,'Yesterday',2000);
  // const expense2 = expense('Utility',300,'Tomorrow',5000);
  // const expense3 = expense('Trash',80,'Nextweek', 6000);

  //  database.ref('expenses').push(expense1);
  //  database.ref('expenses').push(expense2);
  //  database.ref('expenses').push(expense3);
  
// database.ref('expenses').on('value',(snapshot) => {
//   const expenses = [];
//   snapshot.forEach( (childSnapshot) => {
//     expenses.push({ id: childSnapshot.key,...childSnapshot.val()});   
//   });
//   console.log(expenses);
// })


//   const onValueChange =  database.ref().on('value', (snapshot) => {
//         console.log(`${snapshot.val().name} is a ${snapshot.val().job.title} working at ${snapshot.val().job.company}`);
//     }, (e) => {
//         console.log('Error occured');
//     });

//     setTimeout(() => {
//         database.ref('age').set(29)
//     },1600);

//     setTimeout(() => {
//         database.ref().off(undefined,onValueChange);
//     },2000);

//     setTimeout(() => {
//         database.ref('age').set(16)
//     },3500);
//   database.ref().set({
//       name: 'RanAway fromSwamy',
//       age: 41,
//       isSingle: false,
//       stressLevel: 6,
//       job: {
//           company: 'Google',
//           city: 'Seattle',
//           title: 'Senior Developer'
//       },
//       location :{
//           city: 'St.Louis',
//           zipcode: 63005
//       }
//   }).then(() => {
//     console.log('Data is Saved');
//   }).catch((e) => {
//     console.log('Something went wrong',e);
//   });

//   database.ref('age').set(18);
//   database.ref('location/city').set('NewYork');
//   database.ref('attributes').set({
//       height:60,
//     weight: 102}).catch((e) => {
//         console.log('Something went wrong',e);
//     });

// database.ref('isSingle').remove().then(() => {
//     console.log('Data is Removed');
// }).catch(() => {
//     console.log('Error occured while trying to remove');
// });

// database.ref().update({
//     'job/title': 'Manager',
//     'job/company' : 'Amazon',
//     stressLevel : 9,
//     'location/city' :  'Boston',
//     'location/zipcode': null,
//     country: 'United States'
// }) 

// database.ref().once('value').then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
// }).catch((e) => {
//     console.log('Error occured while trying to retrieve', e);
// })

