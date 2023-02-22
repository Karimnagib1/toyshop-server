const expect = require("chai").expect;
const validateRegisterInput = require("../validation/register");

describe("Register Validation", () => {
  it("Gives error if name is empty.", () => {
    const validationObject = validateRegisterInput({});
    expect(validationObject)
      .to.have.property("errors")
      .with.property("name")
      .equal("Name field is required");
    expect(validationObject).to.have.property("isValid").equals(false);
  });
  it("Gives error if email is empty.", () => {
    const validationObject = validateRegisterInput({});
    expect(validationObject)
      .to.have.property("errors")
      .with.property("email")
      .equal("Email field is required");
    expect(validationObject).to.have.property("isValid").equals(false);
  });
    it("Gives error if email is invalid.", () => {
    const validationObject = validateRegisterInput({email: "dadsa"});
    expect(validationObject)
      .to.have.property("errors")
      .with.property("email")
      .equal("Email is invalid");
    expect(validationObject).to.have.property("isValid").equals(false);
  });
  it("Gives error if password is empty.", () => {
    const validationObject = validateRegisterInput({});
    expect(validationObject)
      .to.have.property("errors")
      .with.property("password")
      .equal("Password field is required");
    expect(validationObject).to.have.property("isValid").equals(false);
  });
  it("Gives error if password is less than 6 characters.", () => {
    const validationObject = validateRegisterInput({password: "xyz"});
    expect(validationObject)
      .to.have.property("errors")
      .with.property("password")
      .equal("Password must be at least 6 characters");
    expect(validationObject).to.have.property("isValid").equals(false);
  });

  it("Gives error if password2 is empty.", () => {
    const validationObject = validateRegisterInput({});
    expect(validationObject)
      .to.have.property("errors")
      .with.property("password2")
      .equal("Confirm password field is required");
    expect(validationObject).to.have.property("isValid").equals(false);
  });
  it("Gives error if password and confirm password don't match.", () => {
    const validationObject = validateRegisterInput({password: "jhbajhbdhj", password2: "hdjsbjhdsbhjbds"});
    expect(validationObject)
      .to.have.property("errors")
      .with.property("password2")
      .equal("Passwords must match");
    expect(validationObject).to.have.property("isValid").equals(false);
  });
  it("Gives no errors if the validation passes", () => {
    const validationObject = validateRegisterInput({name: "jsbdjbdj", email: "example@example.com", password: "asdfgh", password2: "asdfgh"});
    expect(validationObject).to.have.property("errors").to.be.empty;
    expect(validationObject).to.have.property("isValid").equals(true);
  })
});
