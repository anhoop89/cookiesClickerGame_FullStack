#!/bin/bash
while ! nc -z postgres 5433; do sleep 3; done
pnpm migration:run
pnpm seed