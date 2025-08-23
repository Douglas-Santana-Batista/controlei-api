#!/bin/sh
# wait-for-db.sh

set -e

host="$1"
port="$2"
shift 2
cmd="$@"

echo "Aguardando PostgreSQL ficar disponível em $host:$port..."

# Aguarda até que a porta do PostgreSQL esteja disponível
while ! nc -z $host $port; do
  sleep 2
  echo "Aguardando PostgreSQL..."
done

echo "PostgreSQL está disponível - executando comando: $cmd"
exec $cmd