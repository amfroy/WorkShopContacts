const test = require('tape')
const request = require('supertest')
const router = require('../server')


  test('GET /contactList',(t)=>{
    request(router).get('/contacts')
    .expect(200)
    .then((res)=>{
      let contact = res.body
      t.equal(12, contact.length)
      let contacts = contact[0]
      t.notEqual(undefined, contacts.id)
      t.notEqual(undefined, contacts.name)
      t.notEqual(undefined, contacts.email)
      t.notEqual(undefined, contacts.phone)
      t.notEqual(undefined, contacts.url)
      t.notEqual(undefined, contacts.notes)
      t.end()
    })
  })


   test('GET /contacts/:id Person Number 3 ',(t)=> {
     request(router).get('/contacts')
     .expect(200)
     .then((res)=>{
       let contacts = res.body
       let contact = contacts[2]
       t.equal('Samwell Tarly', contact.name)
       t.equal('starly@castleblack.com', contact.email)
       t.equal('123-456-7890', contact.phone)
       t.equal('www.google.com', contact.url)
       t.equal('Loyal brother of the watch.', contact.notes)
       t.end()
     })
   })


   test('POST /contacts',(t)=> {
     request(router).post('/contacts')
     .send([
            {id:12,name:'Nantapob',email:'nantapob007@hotmail.com',phone: '123-456-7890',url:'www.google.com' ,notes:'PUBG'},
            {id:13,name:'Sasithon',email:'Amfouy@gmail.com',phone: '123-456-7890',url:'www.google.com' ,notes:'DOTA2'}
          ])
     .expect(201)
     .then((res)=>{
       let contacts = res.body
       let contacts14 = contacts[0]
       t.equal('Nantapob', contacts14.name)
       t.equal('nantapob007@hotmail.com', contacts14.email)
       t.equal('123-456-7890', contacts14.phone)
       t.equal('www.google.com', contacts14.url)
       t.equal('PUBG', contacts14.notes)

       let contacts15 = contacts[1]
       t.equal('Sasithon', contacts15.name)
       t.equal('Amfouy@gmail.com', contacts15.email)
       t.equal('123-456-7890', contacts15.phone)
       t.equal('www.google.com', contacts15.url)
       t.equal('DOTA2', contacts15.notes)
       t.end()
     })
   })


   test('PUT id 12 to /contacts/: id number 0 or Person Number 1',(t)=> {
     request(router).put('/contacts/0')
     .send([
            {id:12,name:'Nantapob',email:'nantapob007@hotmail.com',phone: '123-456-7890',url:'www.google.com' ,notes:'PUBG'}
          ])
     .expect(200)
     .then((res)=>{
       request(router).get('/contacts/0')

     .then((res)=>{
       let contacts = res.body
       let contact = contacts[0]
       t.equal('Nantapob', contact.name)
       t.equal('nantapob007@hotmail.com', contact.email)
       t.equal('123-456-7890', contact.phone)
       t.equal('www.google.com', contact.url)
       t.equal('PUBG', contact.notes)
      })
       t.end()
      })
     })


     test('Delete /contacts/: id Number 5 or Person Number 6 ',(t)=> {
       request(router).delete('/contacts/5')
       .expect(204)
       .then((res)=>{
         request(router).get('/contacts/5')
       .then((res)=>{
         let contacts = res.body
         t.notEqual(undefined , contacts)
         t.equal(6 , contacts.id)
        })
         t.end()
        })
       })
