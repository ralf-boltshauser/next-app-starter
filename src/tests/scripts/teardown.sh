#!/bin/bash

# Path to your .env.local file
ENV_FILE=".env.local"

# Use sed to in-place delete lines containing 'STRIPE_WEBHOOK_SECRET'
sed -i '' '/STRIPE_WEBHOOK_SECRET/d' "$ENV_FILE"
sed -i '' -e :a -e '/^\n*$/{$d;N;};/\n$/ba' "$ENV_FILE"

# Kill the stripe webhook listener
pkill "stripe"


echo "STRIPE_WEBHOOK_SECRET has been removed from $ENV_FILE"