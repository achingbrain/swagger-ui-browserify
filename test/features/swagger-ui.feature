Feature: Load the Pet Store example
  Using a web browser
  I want to load a Swagger UI instance

  Scenario: Swagger UI
    Given the app is running
    And I visit /
    When I click the "pet" data link
    And I click the "getPetById" link in the "pet" section
    And I enter "39207873628" as "petId"
    And I click the "Try it out!" button
    Then I expect to see "Pet not found" in the response
