# Fixed signing key

Every release APK is signed with the same key, so new builds install **over** old ones
(progress is kept, no uninstall needed).

Add 4 repository secrets (GitHub -> Settings -> Secrets and variables -> Actions):
`KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`.

Never commit the keystore. Keep a private backup - if it is lost, existing installs cannot be updated.
Without the secrets the workflow still builds, but as a debug APK with a random key.
