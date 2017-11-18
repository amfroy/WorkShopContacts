const test = require('tape')
const request = require('supertest')
const app =require('../server')

  test('First test case',(t) =>{
    t.equal(1, 1)
    t.end()
  })

test('GET /students',(t)=>{
  request(app).get('/students')
  .expect(200)
  .then((res)=>{
    let students =res.body
    t.equal(2, students.length)
    let student=students[0]
    t.notEqual(undefined, student.id) // ถ้ามีค่าไอดี student  ค่าundefined จะไม่มี เอาสองตัวมาเทียบ กันจะเป็น false ซึงเงื่อนไขจะเป็นจริง เพราะเป็น notEqual=ไม่เหมือนกัน
    t.end()
  })
})
test('PORT /students',(t)=>{
  request(app).post('/students')
  .send({name:'Froy' ,email:'amfouy@gmail.com'})
  .expect(200)
  .then((res)=>{
     let student =res.body
      
     t.equal('Froy', student.name)
     t.end()
  })
})
