#!/bin/bash
# Start stripe listen in the background and redirect its output to a temporary file
stripe listen -e customer.subscription.updated,customer.subscription.deleted,checkout.session.completed --forward-to http://localhost:3000/api/stripe/webhook > temp_stripe_output.txt 2>&1 &

# Store the PID of the background process
STRIPE_PID=$!

# Wait a bit to ensure the command has time to output the initial information
sleep 5

# Search for the webhook secret in the output and extract it
WEBHOOK_SECRET=$(awk '{for(i=1;i<=NF;i++) if($i ~ /^whsec_/){print $i; exit}}' temp_stripe_output.txt)

echo "Webhook secret: $WEBHOOK_SECRET"

# Check if the webhook secret was found
if [ -z "$WEBHOOK_SECRET" ]; then
    echo "Webhook secret not found."
    # Clean up
    rm temp_stripe_output.txt
    kill $STRIPE_PID
    exit 1
else
    # Write the webhook secret to .env.local
    echo -e "\nSTRIPE_WEBHOOK_SECRET=${WEBHOOK_SECRET}" >> .env.local
    echo "Webhook secret written to .env.local"
fi

# Clean up the temporary file
rm temp_stripe_output.txt

# Optionally, bring the stripe listen process back to the foreground
# fg %1

# If you don't want to bring it to the foreground, consider how you'll manage this process
# You might want to save the PID to a file to manage it later
# echo $STRIPE_PID > stripe_listen.pid

# Note: If you bring the process to the foreground using `fg`, the script will stop executing further until the process is terminated.
