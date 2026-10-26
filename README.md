# jacobkurry-home

Personal site for Jacob Kurry: a terminal where each part of the CV is a workload that gets scheduled as you scroll.

- React 18 + TypeScript + Vite
- `motion` for the event stream, `lenis` for smooth scroll, IBM Plex Mono
- All copy lives in `src/content.ts`; the CV is `public/cv.pdf`

## Develop

```bash
npm install
npm run dev
npm test
```

## Deploy

Needs AWS credentials with write access to the bucket.

```bash
npm run deploy
```

Uploads `dist/` to `s3://jk-home-about.jacobkurry.com`. It never deletes objects in the bucket.

## Keys

`c` opens the CV, `e` starts an email, `/` jumps to the shell. The shell knows `help`, `whoami`, `kubectl get pods`, `kubectl describe pod <name>`, `kubectl logs <name>`, `open cv`, `mail`, `github`, `clear`.

SO SICK
