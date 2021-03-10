A simple example app for writing to and reading from a firestore database using GCP cloud functions with http triggers

Inital setup:


Setup a Google Cloud Billing account (all of this will fall under the free tier, so you shouldn't worry)

Setup the SDK
https://cloud.google.com/sdk/docs/install

Execute create-firestore.sh (or set it up manually using the GCP Cloud Console website)

Execute cloud-functions/deploy.sh to create 3 cloud functions

Execute cloud-functions/execute.sh to run them all 

Each execution will add a new item to the database.
When deploying, you should be able to see the URL you can hit to run the function without the script
