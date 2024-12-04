*** Settings ***
Library     RequestsLibrary
Resource    ../../resources/common.resource


*** Test Cases ***
GET Returns 200 And Status OK
    ${response}=    GET    ${BACKEND_URL}    expected_status=200
    Should Be Equal As Strings    ${response.json()}[status]    OK
