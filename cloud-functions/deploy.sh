#!/usr/bin/env bash

gcloud beta functions deploy readFirestore \
--runtime nodejs14 \
--trigger-http \
--allow-unauthenticated

gcloud beta functions deploy writeFirestore \
--runtime nodejs14 \
--trigger-http \
--allow-unauthenticated

gcloud beta functions deploy queryFirestore \
--runtime nodejs14 \
--trigger-http \
--allow-unauthenticated
