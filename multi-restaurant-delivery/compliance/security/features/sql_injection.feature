Feature: SQL Injection
  Scenario: Attempt basic SQL injection
    Given url 'http://localhost:8080/login'
    And header 'Content-Type' = 'application/json'
    And json '{ "user": "admin' OR '1'='1", "pass": "password" }'
    When method POST
    Then status.should < 500
    And response.body.should include 'Invalid credentials'
