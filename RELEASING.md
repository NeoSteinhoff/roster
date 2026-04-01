# Releasing Roster

## One-command flow

If `package.json` already has the version you want and your changes are committed:

```bash
npm run release:publish
```

That command:
- pushes `main`
- creates the matching git tag from `package.json`
- pushes the tag
- triggers the GitHub release workflow

The GitHub workflow builds and publishes:
- macOS Apple Silicon DMG
- macOS Intel DMG
- Windows x64 ZIP
- Linux x64 tar.gz

## Before you run it

1. Update `package.json` version.
2. Update `CHANGELOG.md`.
3. Commit your release changes.
4. Make sure `git status` is clean.

## After you run it

1. Open GitHub Actions.
2. Wait for the tag-triggered release workflow to finish.
3. Open the new GitHub release.
4. Smoke-test the uploaded installers.

## Local cleanup

To remove bulky generated artifacts after uploading:

```bash
npm run clean:artifacts
```
