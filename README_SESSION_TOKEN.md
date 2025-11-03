# Session Token Setup

This guide explains how to set up session token generation for Coinbase Onramp/Offramp.

## Prerequisites

1. **CDP Secret API Key**: You need a Secret API Key (not Client API Key) from the [CDP Portal](https://portal.cdp.coinbase.com/projects/api-keys)
   - Navigate to your project's **API Keys** tab
   - Select the **Secret API Keys** section
   - Click **Create API key**
   - Configure your key settings (IP allowlist recommended)
   - **Download the key file** or copy the Key ID and Private Key

## Environment Variables

Add the following environment variables to your `.env.local` file (never commit these to git):

```bash
# CDP Secret API Key credentials
CDP_SECRET_KEY="-----BEGIN EC PRIVATE KEY-----\n...your private key...\n-----END EC PRIVATE KEY-----"
CDP_KEY_ID="your-key-id-here"
```

### Important Notes:

1. **Private Key Format**: The `CDP_SECRET_KEY` should be in PEM format. When you download the key from CDP Portal, it will be in this format. You can store it in your `.env.local` file as:
   - A single line with `\n` for line breaks, OR
   - Multi-line (make sure to properly escape it)

2. **Security**: 
   - Never commit these keys to version control
   - Use environment variables or secure key management (e.g., Vercel Environment Variables, AWS Secrets Manager)
   - For production, consider using a secrets management service

3. **IP Allowlist**: It's recommended to configure an IP allowlist for your Secret API Key in the CDP Portal for enhanced security.

## How It Works

1. When a user clicks "Fund" in the wallet dropdown:
   - The `useSessionToken` hook detects the connected wallet address
   - It makes a POST request to `/api/session-token` with the wallet address
   - The API route generates a JWT using your CDP credentials
   - The API route calls Coinbase's Session Token API to generate a session token
   - The session token is returned to the client and used by the FundCard component

2. **Session Token Properties**:
   - Expires after 5 minutes
   - Can only be used once
   - Includes the user's wallet address and supported blockchains

## Testing

1. Make sure your `.env.local` has the required variables
2. Connect a wallet in the app
3. Click "Fund" in the wallet dropdown
4. The FundCard modal should appear with the funding interface

## Troubleshooting

### Error: "CDP_SECRET_KEY and CDP_KEY_ID must be set"
- Make sure both environment variables are set in `.env.local`
- Restart your Next.js dev server after adding environment variables

### Error: "Invalid private key" or JWT signing fails
- Verify your `CDP_SECRET_KEY` is in proper PEM format
- Ensure the key is a valid ECDSA private key (ES256 algorithm)
- Check that line breaks are properly formatted

### Error: "Failed to generate session token"
- Check that your CDP Secret API Key is valid and not expired
- Verify your IP is allowed if you set up an IP allowlist
- Check the API response in the server logs for more details

## Additional Resources

- [Coinbase CDP API Authentication](https://docs.cdp.coinbase.com/api-reference/v2/authentication)
- [Session Token Documentation](https://docs.cdp.coinbase.com/onramp-&-offramp/session-token-authentication)
- [CDP Portal](https://portal.cdp.coinbase.com/)

