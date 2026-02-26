export interface Module {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  phase: 'csharp' | 'dotnet';
  weeks: [number, number];
  days: [number, number];
  description: string;
  color: string;
  icon: string;
}

export const MODULES: Module[] = [
  {
    id: 1,
    slug: 'type-system',
    name: 'C# Environment & Type System',
    shortName: 'Type System',
    phase: 'csharp',
    weeks: [1, 2],
    days: [1, 10],
    description: 'Setting up .NET, value vs reference types, null safety, enums, and casting — all through the lens of what you know from Dart.',
    color: '#6366f1',
    icon: '🔷',
  },
  {
    id: 2,
    slug: 'control-flow-methods',
    name: 'Control Flow, Functions & Methods',
    shortName: 'Methods',
    phase: 'csharp',
    weeks: [3, 4],
    days: [11, 20],
    description: 'Pattern matching, ref/out/in parameters, method overloading, and extension methods — all the things Dart does differently.',
    color: '#8b5cf6',
    icon: '⚙️',
  },
  {
    id: 3,
    slug: 'oop-classes',
    name: 'OOP — Classes, Structs & Records',
    shortName: 'OOP',
    phase: 'csharp',
    weeks: [5, 7],
    days: [21, 35],
    description: 'Access modifiers, properties, constructors, interfaces, structs, and records. C#\'s richer type hierarchy vs Dart\'s simpler model.',
    color: '#a855f7',
    icon: '🏗️',
  },
  {
    id: 4,
    slug: 'collections-generics-linq',
    name: 'Collections, Generics & LINQ',
    shortName: 'LINQ',
    phase: 'csharp',
    weeks: [8, 10],
    days: [36, 50],
    description: 'C# collections, generic constraints, and LINQ — the functional query system that makes C# data processing elegant.',
    color: '#ec4899',
    icon: '📦',
  },
  {
    id: 5,
    slug: 'async-delegates-advanced',
    name: 'Async, Delegates, Events & Advanced',
    shortName: 'Async & Events',
    phase: 'csharp',
    weeks: [11, 13],
    days: [51, 65],
    description: 'Task vs Future, CancellationToken, delegates, events, and advanced C# features. Capstone: CLI Task Manager.',
    color: '#f43f5e',
    icon: '⚡',
  },
  {
    id: 6,
    slug: 'dotnet-ecosystem',
    name: '.NET Ecosystem & Tooling',
    shortName: '.NET Tools',
    phase: 'dotnet',
    weeks: [14, 15],
    days: [66, 75],
    description: 'NuGet, DI container, Options pattern, structured logging, and the HostBuilder — the foundation under every .NET app.',
    color: '#0ea5e9',
    icon: '🛠️',
  },
  {
    id: 7,
    slug: 'aspnet-fundamentals',
    name: 'ASP.NET Core Fundamentals',
    shortName: 'ASP.NET',
    phase: 'dotnet',
    weeks: [16, 18],
    days: [76, 90],
    description: 'Minimal APIs, controllers, routing, middleware, model binding, and validation. You\'re building the server your Flutter app calls.',
    color: '#06b6d4',
    icon: '🌐',
  },
  {
    id: 8,
    slug: 'efcore',
    name: 'Entity Framework Core',
    shortName: 'EF Core',
    phase: 'dotnet',
    weeks: [19, 21],
    days: [91, 105],
    description: 'Code-first ORM with migrations, LINQ-to-SQL, relationships, and the repository pattern. Think Drift, but for the server.',
    color: '#10b981',
    icon: '🗄️',
  },
  {
    id: 9,
    slug: 'auth-security',
    name: 'Auth & Security',
    shortName: 'Auth',
    phase: 'dotnet',
    weeks: [22, 23],
    days: [106, 115],
    description: 'ASP.NET Identity, JWT issuing and validation, OAuth2, and policy-based authorization. You\'re now issuing the tokens your Flutter app uses.',
    color: '#f59e0b',
    icon: '🔐',
  },
  {
    id: 10,
    slug: 'realtime-testing-deploy',
    name: 'SignalR, Testing & Deployment',
    shortName: 'Deploy',
    phase: 'dotnet',
    weeks: [24, 26],
    days: [116, 130],
    description: 'Real-time with SignalR, unit and integration testing with xUnit/Moq, and deploying with Docker. Final capstone: a full API for a Flutter app.',
    color: '#84cc16',
    icon: '🚀',
  },
];

export const TOTAL_LESSONS = 130;
export const TOTAL_WEEKS = 26;
export const TOTAL_MODULES = 10;

export function getModuleForDay(day: number): Module {
  return MODULES.find(m => day >= m.days[0] && day <= m.days[1])!;
}

export function getModuleBySlug(slug: string): Module | undefined {
  return MODULES.find(m => m.slug === slug);
}

export function getModuleById(id: number): Module | undefined {
  return MODULES.find(m => m.id === id);
}
