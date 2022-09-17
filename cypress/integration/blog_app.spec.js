describe('Blog app', function() {

    beforeEach(
        function(){
            cy.request('POST', 'http://localhost:3003/api/testing/reset')
            const user = {
                username: 'test',
                name: 'test',
                password: 'test'
            }
            cy.request({
                method: 'POST',
                url: 'http://localhost:3003/api/users',
                body: user
            })
            cy.visit('http://localhost:3000')
        }
    )

    it('Shows login page', function(){
        cy.contains('Username')
        cy.contains('Password')
        cy.contains('Submit')
    })

    describe('tests login', function(){

        it('tests successful login', function(){
            cy.contains('Username').find('input').type('test')
            cy.contains('Password').find('input').type('test')
            cy.contains('Submit').click()
            cy.contains('logout')
        })

        it('tests unsuccessful login', function(){
            cy.contains('Username').find('input').type('test')
            cy.contains('Password').find('input').type('test2')
            cy.contains('Submit').click()
            cy.contains('logout')
        })
    })

    describe('once logged in', function(){
        beforeEach(
            function(){
                const user = {
                    username: 'test',
                    password: 'test'
                }
                cy.request({
                    method: 'POST',
                    url:'http://localhost:3003/api/login',
                    body: {...user}
                }).then(
                    function(res){
                        window.localStorage.setItem('loggedUser', JSON.stringify(res.body))
                    }
                )
                cy.visit('http://localhost:3000')
            }
        )
        it('tests blog can be created', function(){
            cy.contains('Show Create New').click()
            cy.contains('Title').find('input').type('SOme title')
            cy.contains('Author').find('input').type('SOme auth')
            cy.contains('Url').find('input').type('SOme url')
            cy.get('.createPost').click()
            cy.contains('SOme title')
        })
    })
    
})