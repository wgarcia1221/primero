#JIRA PRIMERO-119
# JIRA PRIMERO-607
# JIRA PRIMERO-736

@javascript @primero
Feature: Tracing Request Case Audio Form
  As a Social Worker, I want to upload photos and audio

  Scenario: I upload a photo with the incorrect format
    Given I am logged in as a social worker with username "primero_cp" and password "primero"
    When I access "tracing requests page"
    Then I press the "New Tracing Request" button
    And I press the "Photos and Audio" button
    And I attach a photo "capybara_features/resources/textfile.txt" for model "tracing_request"
    And I press "Save"
    Then I should see "Please upload a valid photo file (jpg or png) for this tracing request record" on the page

  Scenario: I upload a audio file with the incorrect format
    Given I am logged in as a social worker with username "primero_cp" and password "primero"
    When I access "tracing requests page"
    Then I press the "New Tracing Request" button
    And I press the "Photos and Audio" button
    And I attach an audio file "capybara_features/resources/textfile.txt" for model "tracing_request"
    And I press "Save"
    Then I should see "Please upload a valid audio file (amr or mp3) for this tracing request record" on the page

  Scenario: I upload a photo file with the incorrect size
    Given I am logged in as a social worker with username "primero_cp" and password "primero"
    When I access "tracing requests page"
    Then I press the "New Tracing Request" button
    And I press the "Photos and Audio" button
    And I attach a photo "capybara_features/resources/huge.jpg" for model "tracing_request"
    And I press "Save"
    Then I should see "Please upload a file smaller than 10mb" on the page

  Scenario: I upload a audio file with the incorrect size
    Given I am logged in as a social worker with username "primero_cp" and password "primero"
    When I access "tracing requests page"
    Then I press the "New Tracing Request" button
    And I press the "Photos and Audio" button
    And I attach an audio file "capybara_features/resources/huge.mp3" for model "tracing_request"
    And I press "Save"
    Then I should see "Please upload a file smaller than 10mb" on the page

  Scenario: I upload a photo file with the correct size and format
    Given I am logged in as a social worker with username "primero_cp" and password "primero"
    When I access "tracing requests page"
    Then I press the "New Tracing Request" button
    And I press the "Photos and Audio" button
    And I attach a photo "capybara_features/resources/jorge.jpg" for model "tracing_request"
    And I press "Save"
    Then I should see a success message for new Tracing Request
    And I should not see "Click the EDIT button to add Photos and Audio details"

  Scenario: I upload a audio file with the correct size and format
    Given I am logged in as a social worker with username "primero_cp" and password "primero"
    When I access "tracing requests page"
    Then I press the "New Tracing Request" button
    And I press the "Photos and Audio" button
    And I attach an audio file "capybara_features/resources/sample.mp3" for model "tracing_request"
    And I press "Save"
    Then I should see a success message for new Tracing Request
    And I should not see "Click the EDIT button to add Photos and Audio details"

  Scenario: Uploading multiple images
    Given I am logged in as a social worker with username "primero_cp" and password "primero"
    When I access "tracing requests page"
    And I press the "New Tracing Request" button
    And I click the "Photos and Audio" link
    And I attach the following photos for model "tracing_request":
      |capybara_features/resources/jorge.jpg|
      |capybara_features/resources/jeff.png |
    And I press "Save"
    Then I should see a success message for new Tracing Request
    When I click the "Photos and Audio" link
    Then I should see "2" thumbnails
    When I follow "Edit"
    And I click the "Photos and Audio" link
    Then I should see "2" thumbnails on edit

  Scenario: I delete the audio file
    Given I am logged in as a social worker with username "primero_cp" and password "primero"
    And I access "tracing requests page"
    And I press the "New Tracing Request" button
    And I press the "Photos and Audio" button
    And I attach an audio file "capybara_features/resources/sample.mp3" for model "tracing_request"
    And I press "Save"
    When I press the "Edit" button
    And I press the "Photos and Audio" button
    And I check the "Delete audio?" field
    And I press "Save"
    Then I should see a success message for updated Tracing Request
    And I should not see "Delete audio?"
    And I should not see "Recorded Audio"
    And I should not see "Download"
    And I should see "Click the EDIT button to add Photos and Audio details" on the page
