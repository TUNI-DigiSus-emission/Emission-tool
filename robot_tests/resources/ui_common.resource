*** Settings ***
Library     Browser
Resource    common.resource


*** Keywords ***
Open Browser And Navigate To Landing Page
    New Browser    browser=chromium
    New Context    viewport={'width': 1920, 'height': 1080}
    New Page    ${FRONTEND_URL}
