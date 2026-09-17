# Curriculum refresh plan

## Goal

Keep all 130 lesson URLs and learner progress stable while turning the course into an accurate, backend-focused .NET 10 curriculum for experienced Flutter developers.

## Decisions

- Baseline: .NET 10 LTS and C# 14.
- Primary application persistence: Dapper with PostgreSQL.
- EF Core is permitted only as the ASP.NET Core Identity store adapter and must be labeled as that boundary.
- High-level application concepts live under `/concepts` and do not affect numbered progress.
- Examples are compilable unless explicitly labeled as excerpts, pseudocode, or expected errors.

## Implemented in this refresh

- [x] Preserve the complete Day 1–130 sequence and lesson routes.
- [x] Rename module 8 to Dapper & SQL Data Access and preserve `/modules/efcore` as a compatibility route.
- [x] Add a 12-topic C#/.NET application-concepts learning path.
- [x] Add visible learning objectives, prerequisites, and baseline guidance to every lesson.
- [x] Correct the confirmed compile-breaking C# examples.
- [x] Correct unsafe guidance around OAuth linking, 2FA attempts, token logging, uploads, rate limiting, forwarded headers, and health checks.
- [x] Align the auth and capstone material with Dapper application repositories.
- [x] Replace stale .NET 9 targets and support dates with the .NET 10 LTS baseline.
- [x] Add automated curriculum structure and regression checks.
- [x] Replace the starter README with contributor and curriculum documentation.

## Next review passes

1. Extract representative code from each module into runnable .NET 10 sample projects and compile it in CI.
2. Add lesson-specific objectives, prerequisites, and primary-source links where the generated defaults are too broad.
3. Calibrate estimated time using learner trials; split exercises whose implementation time exceeds the advertised session.
4. Perform a prose pass for repeated introductions, unsupported performance claims, and unnecessary abstractions.
5. Add accessibility and responsive-navigation checks to the site test suite.

## Release gate

- `npm test` passes.
- `npm run build` passes and emits 130 lesson pages plus 12 concept pages.
- No lesson recommends logging raw credentials or tokens.
- No application-data lesson silently switches from Dapper to EF Core.
- The old module URL remains navigable.
