require("cypress-xpath");

import { Given,And,Then,When } from "cypress-cucumber-preprocessor/steps";
///<reference types="cypress"/>

Given('the user is on the Library app login page',()=>{
cy.visit("https://library2.cybertekschool.com/login.html")
cy.get("#inputEmail").type("librarian570@library",{force:true})
cy.get("#inputPassword").type("2gCucjjn",{force:true})
cy.xpath("//button[@type='submit']").click()
})

When("the user logs in as librarian",()=>{
cy.xpath("//img[@id='user_avatar']//..//span").should("contain.text","Librarian")
cy.get('#navbarDropdown').trigger("click").then(($el)=>{
    console.log($el.text())
})

})