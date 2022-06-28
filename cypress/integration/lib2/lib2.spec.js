require("cypress-xpath");

import { Given,And,Then,When } from "cypress-cucumber-preprocessor/steps";
///<reference types="cypress"/>

Given('the user is on the Library app login page',()=>{
cy.visit("https://library2.cybertekschool.com/login.html")
cy.get("#inputEmail").type("librarian570@library",{force:true})
cy.get("#inputPassword").type("2gCucjjn",{force:true})
cy.xpath("//button[@type='submit']").click()
})
var userCount,bookCount,borrowedCount,totalCount;
When("the user logs in as librarian",()=>{
    cy.wait(4000)
    cy.get('#user_count').then(($el)=>{
        userCount = ($el.text())
        console.log(Number(userCount))
    }) 
    cy.get('#book_count').then(($el)=>{
        bookCount = ($el.text())
        console.log(Number(bookCount))
    }
    )
    cy.get('#borrowed_books').then(($el)=>{
        borrowedCount = ($el.text())
        console.log(Number(borrowedCount))
    }
    )
   


})
let apiCount;
When("the user logs in as librarian to API",()=>{
   

    
   
    let tkn ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiODQ2IiwiZnVsbF9uYW1lIjoiVGVzdCBMaWJyYXJpYW4gNTcwIiwiZW1haWwiOiJsaWJyYXJpYW41NzBAbGlicmFyeSIsInVzZXJfZ3JvdXBfaWQiOiIyIn0sImlhdCI6MTY1MzgyOTE0MCwiZXhwIjoxNjU2NDIxMTQwfQ.j43Ohz1JHc97Nvd-iyQEIDLf_ULVVmYxyH6GByWwESM";
    cy.request({
        method:"GET",
        contentType:"application/json",
            url:"https://library2.cybertekschool.com/rest/v1/dashboard_stats",
            headers:{
          "x-library-token" :tkn
            }

    }).then((response)=>{
        console.log(response.body)
       apiCount=Number(response.body.book_count)+Number(response.body.borrowed_books)+Number(response.body.users)
        console.log(apiCount)
    }
    )

})
Then("the informations getting from API and UI should be matched",()=>{
    totalCount=Number(userCount)+Number(bookCount)+Number(borrowedCount)
   cy.wait(4000)
   expect(totalCount).to.equal(apiCount)
})