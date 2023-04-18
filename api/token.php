<?php

function getToken() {
    $result = exec(
        <<<COMMAND
        curl --location 'https://evaluation-technique.lundimatin.biz/api/auth' \
        --header 'Content-Type: text/plain' \
        --data '{
            "username": "test_api",
            "password": "api123456",
            "password_type": 0,
            "code_application": "webservice_externe",
            "code_version": "1"
        }'
COMMAND
    );
    $json = json_decode($result);
    return $json->datas->token;
}

