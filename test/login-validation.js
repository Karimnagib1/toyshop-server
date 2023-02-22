const expect = require("chai").expect;
const validateLoginInput = require('../validation/login');

describe("Login Validation", ()=> {
    it("Gives an error message if the no email is provided and set isValid to false.", () => {
        const validationObject = validateLoginInput({password: "hsjafhsdfjb"});
        expect(validationObject).to.have.property("errors").with.property("email").equal("Email field is required");
        expect(validationObject).to.have.property("isValid").equals(false);
    })
    it("Gives an error if password is not provided", () => {
        const validationObject = validateLoginInput({email: "example@example.com"});
        expect(validationObject).to.have.property("errors").with.property("password").equals("Password field is required");
        expect(validationObject).to.have.property("isValid").equals(false);
    })
    it("Gives no errors if validation passes", () => {
        const validationObject = validateLoginInput({email: "example@example.com", password: "dhsbjsmbamjhbsm"});
        expect(validationObject).to.have.property("errors").to.be.empty;
        expect(validationObject).to.have.property("isValid").equals(true);
        
    })
})