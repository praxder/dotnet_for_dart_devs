# C# for Flutter Developers

An Astro-based, self-paced curriculum for experienced Dart and Flutter developers learning C#, .NET, ASP.NET Core, and SQL-first backend development.

The course contains 130 numbered lessons across 10 modules. Existing lesson URLs and browser-stored progress remain stable. A separate 12-topic [application concepts](src/content/concepts) guide explains the runtime and architectural ideas that syntax lessons tend to miss.

## Curriculum baseline

- .NET 10 LTS and C# 14
- ASP.NET Core Minimal APIs
- Dapper with PostgreSQL for application data
- ASP.NET Core Identity, with EF Core permitted only as its isolated persistence adapter
- Automated testing, containers, CI/CD, observability, and production operations

Version-specific statements should link to primary documentation. Historical version labels are retained when they explain when a feature was introduced.

## Local development

Requires a current Node.js release and npm.

```bash
npm install
npm test
npm run build
npm run dev
```

The site uses the `/dotnet_for_dart_devs/` base path. The production build is written to `dist/`.

## Content structure

```text
src/content/lessons/   130 progress-tracked MDX lessons
src/content/concepts/  Supplemental high-level .NET concepts
src/pages/lessons/     Stable day-based lesson routes
src/pages/modules/     Module indexes and compatibility routes
tests/                 Curriculum structure and regression checks
```

## Authoring expectations

Examples should be compilable unless explicitly labeled as an expected compiler error or pseudocode. Security examples must never recommend logging credentials or bearer tokens. Database examples use parameterized SQL, explicit connection/transaction ownership, and integration tests against the real provider.

Before submitting content changes, run:

```bash
npm test
npm run build
```

Do not renumber lesson days or change `/lessons/day-NNN` routes. Add supplemental material under `/concepts` when it should not affect learner progress.
