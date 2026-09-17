import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const lessonRoot = new URL('../src/content/lessons/', import.meta.url);
const conceptRoot = new URL('../src/content/concepts/', import.meta.url);

async function filesUnder(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async entry => {
    const location = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
    return entry.isDirectory()
      ? filesUnder(location, extension)
      : entry.name.endsWith(extension) ? [location] : [];
  }));
  return nested.flat();
}

test('lessons preserve the complete day 1 through 130 URL sequence', async () => {
  const files = await filesUnder(lessonRoot, '.mdx');
  const days = files.map(file => Number(path.basename(file.pathname).match(/day-(\d+)/)?.[1])).sort((a, b) => a - b);

  assert.deepEqual(days, Array.from({ length: 130 }, (_, index) => index + 1));
});

test('module 8 is the Dapper and SQL data-access module', async () => {
  const curriculum = await readFile(new URL('../src/lib/curriculum.ts', import.meta.url), 'utf8');

  assert.match(curriculum, /id: 8,[\s\S]*?slug: 'dapper',[\s\S]*?name: 'Dapper & SQL Data Access'/);
});

test('the old EF Core module URL remains as a compatibility redirect', async () => {
  const redirect = await readFile(new URL('../src/pages/modules/efcore.astro', import.meta.url), 'utf8');

  assert.match(redirect, /modules\/dapper/);
});

test('high-level .NET concepts have a complete twelve-topic learning path', async () => {
  const expected = [
    'clr-execution-model',
    'managed-memory',
    'resource-ownership',
    'tasks-threads-contexts',
    'concurrency-shared-state',
    'cancellation-shutdown',
    'generic-host-lifecycle',
    'dependency-injection-lifetimes',
    'aspnet-request-pipeline',
    'execution-boundaries',
    'data-ownership-transactions',
    'operational-contracts',
  ];
  const files = await filesUnder(conceptRoot, '.mdx');
  const slugs = files.map(file => path.basename(file.pathname, '.mdx')).sort();

  assert.deepEqual(slugs, expected.sort());
});

test('concept content IDs become clean public slugs', async () => {
  const { getConceptSlug } = await import('../src/lib/concepts.mjs');

  assert.equal(getConceptSlug('tasks-threads-contexts.mdx'), 'tasks-threads-contexts');
  assert.equal(getConceptSlug('tasks-threads-contexts'), 'tasks-threads-contexts');
});

test('known invalid or unsafe teaching examples stay removed', async () => {
  const checks = [
    ['src/content/lessons/month-01-csharp-fundamentals/day-015.mdx', /numbers\.Average\(\).*out double mean/],
    ['src/content/lessons/month-02-oop-and-types/day-032.mdx', /public Money : this/],
    ['src/content/lessons/month-03-linq-async-advanced/day-055.mdx', /Action<string> append = sb\.Append/],
    ['src/content/lessons/month-03-linq-async-advanced/day-051.mdx', /exceptions are swallowed/],
    ['src/content/lessons/month-05-efcore-auth/day-099.mdx', /included with the main Dapper package/i],
    ['src/content/lessons/month-05-efcore-auth/day-100.mdx', /fire and forget for this demo/i],
    ['src/content/lessons/month-05-efcore-auth/day-110.mdx', /Data Protection API \(DPAPI\)/],
    ['src/content/lessons/month-05-efcore-auth/day-111.mdx', /X-XSS-Protection"\] = "1; mode=block"/],
    ['src/content/lessons/month-05-efcore-auth/day-113.mdx', /log the caller's IP and JWT/i],
    ['src/content/lessons/month-05-efcore-auth/day-113.mdx', /SuspiciousPatterns/],
    ['src/content/lessons/month-05-efcore-auth/day-113.mdx', /setup-dotnet@v4|codeql-action\/(?:init|analyze)@v3/],
    ['src/content/lessons/month-06-realtime-testing-deploy/day-117.mdx', /checkout@v[46]|actions\/cache@v4|codecov-action@v4|metadata-action@v5|codeql-action\/upload-sarif@v3/],
  ];

  for (const [relativePath, forbidden] of checks) {
    const source = await readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');
    assert.doesNotMatch(source, forbidden, relativePath);
  }
});
