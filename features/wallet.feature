Feature: Wallet Management

  Scenario: A user can view their wallet balance
    Given an authenticated user
    When the user requests their wallet balance
    Then the response status should be 200
    And the response should contain the wallet balance
