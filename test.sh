echo '\n\n requesting all cars'
curl localhost:3000/api/carros

echo '\n\n requesting car with id 1'
curl localhost:3000/api/carros/1

echo '\n\n creating new car'
CREATE=$(curl --silent -X POST \
    --data '{"placa":"asa2523","chassi":"234324","renavam":"2434234","modelo":"opala","marca":"chevrolet","ano":"1967"}' \
    localhost:3000/api/carros)

echo '\n\n requesting car with id 2'
curl localhost:3000/api/carros/2