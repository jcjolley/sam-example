#!/usr/bin/env bash

echo "Write to firestore: "

gcloud beta functions call writeFirestore \

echo "Read firestore: "

gcloud beta functions call readFirestore \

echo "Query firestore: "

gcloud beta functions call queryFirestore \
