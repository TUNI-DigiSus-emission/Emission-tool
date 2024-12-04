*** Settings ***
Resource    ../ui_common.resource


*** Variables ***
${PROJET_NAME}      DigiSus-project
${FORM_TITLE}       xpath=//h1[text()="Form title"]


*** Keywords ***
Verify Page Title Is Project Name
    Get Title    equals    ${PROJET_NAME}

Verify Page Contains Form Title
    Wait For Elements State    ${FORM_TITLE}    visible
