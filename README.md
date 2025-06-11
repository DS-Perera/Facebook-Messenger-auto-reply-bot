# Facebook-Messenger-auto-reply-bot

1. Create a Facebook Page
Log in to Facebook and go to Pages → Create New Page.

Choose a Business or Brand (or Community, as you like), give it a Name, Category, and Description.

Finish the setup and note down your Page’s URL (e.g. facebook.com/YourBotPage).

2. Set Up a Facebook App & Messenger Product
Go to Facebook for Developers and log in.

In the top right, click My Apps → Create App → choose Business → Next.

Name your app (e.g. “My AutoReply Bot”), provide your contact email, and click Create App.

In your app dashboard, under Add Products to Your App, click Set Up on Messenger.

3. Generate Page Access Token & Configure Webhook
In the Messenger settings of your app:

Under Token Generation, select your Page and click Generate Token.

Copy the Page Access Token (you’ll need it in your code).

In Webhooks → Setup Webhooks:

Callback URL: you’ll point this to your server’s /webhook endpoint (e.g. https://<your-domain>/webhook).

Verify Token: pick any string (e.g. my_verify_token)—you’ll use it to verify Facebook’s subscription.

Under Subscription Fields, check at least messages and messaging_postbacks.

Click Verify and Save.

In Webhooks → Page Subscriptions, click Add Subscriptions and choose your Page to connect the webhook.


6. Expose Locally with Ngrok (for Testing)
bash
Copy
npm install -g ngrok
ngrok http 3000
Copy the generated HTTPS URL (e.g. https://abcd1234.ngrok.io).

In your FB App’s Webhook settings, update Callback URL to https://abcd1234.ngrok.io/webhook and re-verify.

7. Test in Messenger
Go to your Page, click Message and send anything.

You should get an instant echo reply.

