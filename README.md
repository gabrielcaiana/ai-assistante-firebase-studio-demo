# **App Name**: WhatsAssist

## Core Features:

- Chat Interface: Display a user-friendly chat interface to simulate WhatsApp.
- Message Simulation: Simulate receiving and sending messages.
- Automated Responses: Implement a basic AI that uses a tool that understands user queries and provides automated responses (e.g., FAQs, simple commands).
- Agent Switching: Allow users to switch between different simulated 'agents' or response types.

## Style Guidelines:

- Primary color: WhatsApp green (#25D366) for familiarity.
- Secondary color: Light gray (#E5E5E5) for message bubbles.
- Accent: Blue (#34B7F1) for sent message indicators and interactive elements.
- Clean and intuitive chat layout mimicking WhatsApp's design.
- Use familiar WhatsApp icons (send, delivered, seen).

## Original User Request:
Desenvolva um bot de atendimento para whatsapp com typescript

## Deployment

This project is configured for deployment using AWS Amplify.

To troubleshoot error 500 after deployment, validate the following.

1.  **Environment Variables**:
Ensure that all necessary environment variables, especially `GOOGLE_GENAI_API_KEY`, are correctly configured in the AWS Amplify console. Missing or incorrect environment variables are a common cause of 500 errors.

2.  **Function Logs**:
Check the AWS Lambda function logs associated with your Next.js API routes (e.g., `/api/answer-user-query`). These logs will provide detailed error messages that can help you identify the root cause of the 500 error. You can access these logs in the AWS CloudWatch console.

3.  **IAM Permissions**:
Verify that the IAM role associated with your Lambda functions has the necessary permissions to access other AWS services, such as Secrets Manager or DynamoDB, if your application relies on them.

4.  **Check Amplify Build Settings**:
Double check that the build settings in Amplify are correct.

- Build the project: `npm run build`
- Export the project: `npm run export`

These commands will generate a static export of your Next.js application in the `out` directory. You can then deploy the contents of the `out` directory to a static hosting service like AWS Amplify.
  
