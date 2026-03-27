# Testing S3 Image Upload API with Postman

### Prerequisites
1. Ensure your Express server is running (e.g., `npm start` or `npm run dev`).
2. Verify that your `.env` file contains valid AWS credentials:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `AWS_BUCKET_NAME`

### Step 1: Open Postman and Prepare the Request
1. Open Postman.
2. Open a **New Request** tab.
3. Change the HTTP method dropdown from `GET` to **`POST`**.
4. Enter your endpoint URL in the address bar:
   `http://localhost:5000/api/upload`
   *(Replace `5000` with your actual server port if it’s different)*.

### Step 2: Configure the Request Body
1. Right below the URL bar, click on the **Body** tab.
2. Select the **`form-data`** radio button.
3. In the first row under the **Key** column:
   - Type in the word exactly as: `image`
   - Hover over the right edge of that "image" box, a hidden dropdown will appear. Change it from `Text` to **`File`**.
4. In the **Value** column for that same row:
   - Click the **Select Files** button that appeared.
   - Choose a valid local image file (`.jpg`, `.jpeg`, `.png`, or `.webp`) that is under 10MB.

### Step 3: Send the Request
1. Click the large blue **Send** button.
2. Wait for the upload to complete.

### Step 4: Verify the JSON Response
In the bottom section of Postman, look at the **Response Body**. If successful, you should see a JSON response that looks exactly like this:
```json
{
    "success": true,
    "imageUrl": "https://your-bucket-name.s3.region.amazonaws.com/products/1678881234567-your-image.jpg"
}
```
*Note: A `200 OK` status code should appear in the top right of the response pane.*

---

### Step 5: Verify the Image in Your AWS S3 Bucket
Once you have the successful response, confirm it actually exists in AWS:

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/s3/).
2. Navigate to the **S3** service.
3. Click on the bucket you specified in your `AWS_BUCKET_NAME` env variable.
4. Open the **`products/`** folder (this folder is automatically created by the `multer-s3` setup if it didn't exist).
5. Look for the file named with the generated timestamp and your original filename (e.g., `1678881234567-your-image.jpg`).
6. Click on the file to view its **Object Overview**.
7. You can click the **Open** button in the top right to verify the image successfully renders in your browser. (The image should also be accessible via the `imageUrl` provided in the Postman response if your bucket permissions allow public read access).
