const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
chai.use(chaiHttp)

describe('/GET posts', () => {
    it('It should GET all the posts', (done) => {
        chai.request(server)
            .get('/api')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array').to.have.length(3)
                done()
            })
    })
})

describe('/POST posts', () => {
    it('It should POST the post', (done) => {
        let post = {
            id: 4,
            title: "This is a test title",
            text: "This is a test text",
            user_id: 1
        }
        chai.request(server)
            .post('/api')
            .send(post)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.a('object')
                res.body.should.have.property('message')
                res.body.should.have.property('post')
                done()
            })
    })
    it('It should not POST the post', (done) => {
        let post = {
            title: "This is a test title",
            text: "This is a test text"
        }
        chai.request(server)
            .post('/api')
            .send(post)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('error')
                res.body.should.have.property('bodyReq')
                done()
            })
    })
})

describe('/GET/:id posts', () => {
    it('It should GET a post by the given id', (done) => {
        chai.request(server)
            .get('/api/' + 2)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('id')
                res.body.should.have.property('title')
                res.body.should.have.property('text')
                done()
            })
    })
    it('It should not GET a post', (done) => {
        chai.request(server)
            .get('/api/' + 5)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('error')
                res.body.should.have.property('bodyReq')
                done()
            })
    })
})

describe('/PUT/:id posts', () => {
    it('It should UPDATE a post by the given id', (done) => {
        let post = {
            title: "This is a another title"
        }
        chai.request(server)
            .put('/api/' + 1)
            .send(post)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('Post updated!')
                done()
            })
    })
    it('It should not UPDATE a post', (done) => {
        let post = {
            title: "This is a fail"
        }
        chai.request(server)
            .put('/api/' + 5)
            .send(post)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('Post not updated!')
                done()
            })
    })
})

describe('/DELETE/:id posts', () => {
    it('It should DELETE a post', (done) => {
        chai.request(server)
            .delete('/api/' + 4)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('Post deleted!')
                done()
            })
    })
    it('It should not DELETE a post', (done) => {
        chai.request(server)
            .delete('/api/' + 42)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('Post not deleted!')
                done()
            })
    })
})

