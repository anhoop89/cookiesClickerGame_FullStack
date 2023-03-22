#!/bin/bash
while ! nc -z postgres 5432; do sleep 3; done
pnpm migration:run
pnpm seed