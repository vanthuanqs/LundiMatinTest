<?php

require './token.php';
$token = getToken();

$encodedToken = base64_encode(":$token");
$authStr =  "Basic {$encodedToken}";
$clientId = isset($_GET['id']) ? $_GET['id'] : '';
$search = isset($_GET['search']) ? $_GET['search'] : '';
$requestMethod = $_SERVER['REQUEST_METHOD'];

$command = <<<COMMAND
curl --location 'https://evaluation-technique.lundimatin.biz/api/clients/$clientId?nom=$search' \
--request $requestMethod \
--header 'Content-Type: application/json' \
--header 'Accept: application/api.rest-v1+json' \
--header 'Authorization: $authStr' 
COMMAND;

if (in_array($requestMethod, ['POST', 'PUT'])) {
    $data = json_encode(json_decode(file_get_contents('php://input')));
    $data = str_replace('"', '\"', $data);
    $data = str_replace("'", "\\'", $data);
    $command .= " --data-raw \"$data\"  ";
}

$result = exec($command, $output);

$json = json_decode($result);
http_response_code($json->code);
echo $result;