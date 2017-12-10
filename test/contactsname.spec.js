const request = require('supertest');
const router = require('../server');


describe('GET /contacts',()=>{
  it('Get contact and return status 200 ',(done)=>{
    request(router).get('/contacts')
    .expect(200)
    .then((res)=>{
      let contacts = res.body
      let contact = contacts[0]
      expect(contacts instanceof Array).toBeTruthy()
      expect(contact.id).toBeDefined()
      expect(contact.name).toBeDefined()
      expect(contact.email).toBeDefined()
      expect(contact.phone).toBeDefined()
      expect(contact.url).toBeDefined()
      expect(contact.notes).toBeDefined()
      done()
    })
  })
  it('Get contact id number 0 and return status 200',(done)=>{
    request(router).get('/contacts/0')
    .expect(200)
    .then((res)=>{
      let contact = res.body
      expect(contact.id).toBeDefined()
      expect(contact.name).toBeDefined()
      expect(contact.email).toBeDefined()
      expect(contact.phone).toBeDefined()
      expect(contact.url).toBeDefined()
      expect(contact.notes).toBeDefined()
      done()
    })
  })
})

describe('POST /contacts',()=>{
  it('Post contact id 12 and 13 and return status 201 ',(done)=>{
    request(router).post('/contacts')
    .send([
          {id:12,name:'Nantapob Vnakrua',email:'Nantapob007@hotmail.com',phone: '123-456-7890',url:'www.google.com' ,notes:'PUBG' },
          {id:13,name:'Sasithon Pinyoying',email:'Amfouy@gamil',phone: '123-456-7890',url:'www.google.com' ,notes:'DOTA2'}
         ])
    .expect(201)
    .then((res)=>{
      let contact = res.body
      let contact1 = contact[0]
     expect(contact).toBeDefined()
     expect(contact1.id).toBe(12)
     expect(contact1.name).toBe('Nantapob Vnakrua')
     expect(contact1.email).toBe('Nantapob007@hotmail.com')
     expect(contact1.phone).toBe('123-456-7890')
     expect(contact1.url).toBe('www.google.com')
     expect(contact1.notes).toBe('PUBG')

       let contact2 = contact[1]
     expect(contact2.id).toBe(13)
     expect(contact2.name).toBe('Sasithon Pinyoying')
     expect(contact2.email).toBe('Amfouy@gamil')
     expect(contact2.phone).toBe('123-456-7890')
     expect(contact2.url).toBe('www.google.com')
     expect(contact2.notes).toBe('DOTA2')
     done()
   })
 })
})

describe('PUT /contacts',()=>{
  it('Put contact id 12 to id 5 and return status 200 and id value change',(done)=>{
    request(router).put('/contacts/5')
    .send({id:12,name:'Sasithon Pinyoying',email:'Amfouy@gamil',phone: '123-456-7890',url:'www.google.com' ,notes:'DOTA2' })
    .expect(200)
    .then((res)=>{
      request(router).get('/contacts/5')
      .then((res)=>{
        let contact = res.body
        expect(contact).toBeDefined()
        expect(contact.id).toBe(12)
        expect(contact.name).toBe('Sasithon Pinyoying')
        expect(contact.email).toBe('Amfouy@gamil')
        expect(contact.phone).toBe('123-456-7890')
        expect(contact.url).toBe('www.google.com')
        expect(contact.notes).toBe('DOTA2')
      })
      done()
    })
  })
})



describe('DELETE /contacts',()=>{
    it('Delete contacs and return status 204 and id number 5 deleted',(done)=>{
    request(router).delete('/contacts/5')
    .expect(204)
    .then((res)=>{
    request(router).get('/contacts/5')
    .then((res)=>{
      let contact = res.body
      expect(contact).toBeDefined()
      expect(contact.id).not.toBe(5)
    })
      done()
    })
  })
})

//นันทภพ  ว่านเครือ  58160259
//ศศิธร  ภิญโญยิ่ง  58160543
