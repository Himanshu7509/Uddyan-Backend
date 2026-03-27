import 'dotenv/config';
import { S3Client } from "@aws-sdk/client-s3";

const requiredEnvVars = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION'];
const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
if (missingVars.length > 0) {
  console.warn(`[S3 Config] Warning: Missing required AWS environment variables: ${missingVars.join(', ')}.`);
  if (process.env.NODE_ENV === 'production') {
    throw new Error('S3 configuration failed: Missing required AWS credentials in production.');
  }
}

// Initialize S3 client (v3)
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default s3;
