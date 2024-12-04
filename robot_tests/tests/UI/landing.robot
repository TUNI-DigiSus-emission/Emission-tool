*** Settings ***
Resource            ../../resources/ui_common.resource
Resource            ../../resources/pages/landing_page.resource

Test Teardown       Close Browser


*** Test Cases ***
Page Loads
    Open Browser And Navigate To Landing Page
    Verify Page Title Is Project Name
    Verify Page Contains Form Title
