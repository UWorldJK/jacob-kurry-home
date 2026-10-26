#!/usr/bin/env bash
# Build and upload the site to the S3 website bucket.
# Never uses --delete: the bucket also holds legacy CV objects (cv, cv/cv.pdf, jacob_kurry_latest.pdf).
set -euo pipefail

BUCKET="${BUCKET:-jk-home-about.jacobkurry.com}"

cd "$(dirname "$0")/.."
npm run build

# Hashed assets can be cached forever.
aws s3 sync dist/assets "s3://$BUCKET/assets" --cache-control "public, max-age=31536000, immutable"

# Everything else (index.html, cv.pdf) must revalidate so new deploys show up immediately.
aws s3 sync dist "s3://$BUCKET" --exclude "assets/*" --cache-control "no-cache"

echo "deployed to http://$BUCKET.s3-website-$(aws s3api get-bucket-location --bucket "$BUCKET" --query LocationConstraint --output text | sed 's/None/us-east-1/').amazonaws.com"
