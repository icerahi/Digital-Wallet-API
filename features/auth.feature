Feature: Authentication

  Scenario: A user can register and receive a wallet automatically
    Given a new user with phone "01799999999" and password "Pass@123"
    When the user registers
    Then the response status should be 201
    And the user should be registered
    And a wallet should be automatically provisioned
