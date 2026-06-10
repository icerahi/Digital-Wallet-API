Feature: External API Integration

  Scenario: A user can view live currency exchange rates
    Given the external API endpoint is available
    When the user requests the currency rates
    Then the response status should be 200
    And the response should contain exchange rate data
    And the response should include HATEOAS links
