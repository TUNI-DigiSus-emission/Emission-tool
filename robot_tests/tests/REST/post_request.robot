*** Settings ***
Library         RequestsLibrary
Library         Collections
Resource    ../../resources/common.resource

*** Variables ***
${ENDPOINT}         /v1/calculate
${REQUEST_BODY}     {"transportation":{"people":10,"carPercentage":75,"carDistance":50,"publicTransportPercentage":25,"publicTransportDistance":10,"shortFlightPercentage":0,"shortFlightDistance":500,"longFlightPercentage":0,"longFlightDistance":1000},
    ...     "housing":{"people":0,"nights":0},
    ...     "space":{"size":150,"time":4},
    ...     "coffee":{"days":3,"people":0},
    ...     "food":{"days":3,"meatServings":0,"nonMeatServings":0},
    ...     "bandwidth":{"people":0,"sessionLength":0},
    ...     "devices":{"people":0,"sessionLength":0},
    ...     "recording":{"recordingLength":0,"storageLifetime":0} }
${INVALID_JSON}     {"test":{"people":10} }

*** Test Cases ***
POST returns 200
    ${json_data}=        Evaluate    json.loads('${REQUEST_BODY}')    json
    ${response}=    POST    ${BACKEND_URL}${ENDPOINT}     json=${json_data}  expected_status=200
    Should Contain      ${response.json()}     total

POST returns 400 when too few arguments
    ${json_data}=        Evaluate    json.loads('${INVALID_JSON}')    json
    ${response}=      POST    ${BACKEND_URL}${ENDPOINT}     json=${json_data}  expected_status=400
    Should Contain    ${response.json()}    error

POST returns 400 when too many arguments
    ${json_data}=        Evaluate    json.loads('${REQUEST_BODY}')    json
    Set To Dictionary   ${json_data}    newArgument    100
    ${response}=      POST    ${BACKEND_URL}${ENDPOINT}     json=${json_data}  expected_status=400
    Should Contain    ${response.json()}    error

POST returns 400 when percentage value is negative
    ${json_data}=        Evaluate    json.loads('${REQUEST_BODY}')    json
    Set To Dictionary   ${json_data}[transportation]    carPercentage    -20
    ${response}=      POST    ${BACKEND_URL}${ENDPOINT}     json=${json_data}  expected_status=400
    Should Contain    ${response.json()}    error