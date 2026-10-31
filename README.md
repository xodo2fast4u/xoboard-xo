<h1 align="center">Xoboard</h1>

<p align="center">
  <img src="public/android-chrome-192x192.png" width="96" height="96" alt="Xoboard logo" />
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-2E8B57?style=for-the-badge" alt="License: MIT" /></a>
  <a href="https://developer.android.com/about/versions/oreo"><img src="https://img.shields.io/badge/Android-8.0%2B-3DDC84?logo=android&logoColor=white&style=for-the-badge" alt="Android 8.0+" /></a>
  <a href="https://bun.sh/"><img src="https://img.shields.io/badge/runtime-Bun-000000?logo=bun&style=for-the-badge" alt="Bun runtime" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.4-black?logo=next.js&style=for-the-badge" alt="Next.js" /></a>
  <a href="https://github.com/xodobyte/xoboard"><img src="https://img.shields.io/badge/status-active-2ECC71?style=for-the-badge" alt="Status: active" /></a>
</p>

<p align="center">Official web platform and landing page for Xoboard a lightweight, fully code-driven Android keyboard (IME) with no XML layouts, 21 Unicode font styles, an emoji panel with device-glyph filtering, persistent clipboard history and native theming with zero external dependencies.</p>

## Disclaimer

**IMPORTANT:** Xoboard and this web distribution platform are provided under the MIT License for open and transparent use.

- **Privacy first:** All keystrokes, clipboard operations and text styles execute entirely on-device. Xoboard has zero network permissions, analytics or telemetry trackers.
- **System compatibility:** Xoboard requires Android 8.0+ (API level 26 or higher).
- **Clipboard access:** On Android 10+, system policy restricts background clipboard inspection. Xoboard captures clipboard updates only when the keyboard is active and visible.
- **Font rendering:** Unicode text styling and emoji display depend on glyph support provided by your target device and OS font fallback.

## Why Xoboard?

Most modern mobile keyboards are bloated with analytics SDKs, cloud synchronization, ad networks and heavy XML layout inflation overhead. Xoboard rethinks Android typing from first principles:

- **100% Code-Driven Architecture:** Every View, button, keycap and settings screen is constructed purely in Java with the Android SDK. Zero XML layouts.
- **Tiny Footprint:** Only ~57.7 KB APK download size and ~219 KB installed on device.
- **Zero External Dependencies:** Built strictly with core Android SDK APIs without third-party libraries.
- **Unicode Powerhouse:** 21 live Unicode font transformations applied on the fly while typing.
- **Production-Grade Web Platform:** Next.js 16 (App Router), Bun runtime, strict TypeScript validation, reverse proxy defense, rate limiting and secure APK delivery.

## Features

### Android Keyboard (IME)

- **Core Keyboard Engine:** QWERTY and symbol layouts (`?123` / `ABC`), single-tap Shift, long-press Caps Lock, accelerating repeating backspace, smart context Enter / newline on long-press, double-space period and haptic feedback.
- **Emoji Panel:** Categorized emoji browser with a scrollable tab bar, 32-recent emoji history, inline backspace and automatic device-glyph filtering to prevent missing glyph boxes.
- **21 Unicode Font Styles:** Live text transformation (Bold, Italic, Bold Italic, Sans, Sans Bold, Sans Italic, Sans Bold Italic, Script Bold, Fraktur Bold, Double Struck, Monospace, Small Caps, Superscript, Subscript, Circled, Fullwidth, Strikethrough, Underline, Slash, Overline) with automatic mid-word conversion and cross-session persistence.
- **Clipboard History Manager:** Automatically captures clipboard changes, tap-to-paste, swipe/tap individual deletions, configurable item limits (0 = unlimited) and one-tap clear all.
- **Native Theming System:** System (auto light/dark), Light, Dark and Custom themes with 4 user-defined hex tokens (`Background`, `Keys`, `Text`, `Accent`).

### Web Platform & Distribution API

- **Landing Experience:** High-performance responsive presentation built with Tailwind CSS, Phosphor Icons and partial prerendering.
- **Secure APK Distribution:** Direct streaming endpoint (`/api/v1/downloads/xoboard`) with file verification, audit logging, rate limiting and anti-abuse protection.
- **Repository & Release Metrics:** Live GitHub statistics aggregation and local APK verification with graceful offline degradation.
- **Searchable FAQ API:** Paginated, filtered and sorted FAQ endpoints (`/api/v1/faqs`) validated with Zod.
- **Built-in Security Proxy:** Edge-style middleware protecting endpoints against scanner bots, origin spoofing, oversized payloads and abusive IPs.

## Prerequisites

- [Bun](https://bun.sh/) 1.0 or newer (or Node.js 20+)
- Git
- For building the Android app from source: JDK 17, Android SDK (compileSdk 35, build-tools 36.0.0, AGP 9.4.0)

Verify your development environment:

```bash
bun --version
git --version
```

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/xodobyte/xoboard.git
cd xoboard
bun install
```

### 2. Configure the environment

Create a `.env` file in the project root:

```env
APP_ORIGIN=http://localhost:3000
TRUST_PROXY=false
LOG_LEVEL=info
XOBOARD_VERSION=1.0.0
XOBOARD_APK_PATH=downloads/Xoboard.apk
GITHUB_REPO=xodo2fast4u/Xoboard
GITHUB_TOKEN=
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=120
DOWNLOAD_RATE_LIMIT_MAX=5
ABUSE_STRIKE_LIMIT=10
ABUSE_WINDOW_MS=600000
ABUSE_BLOCK_MS=900000
MAX_BODY_BYTES=10240
UPSTREAM_TIMEOUT_MS=4000
UPSTREAM_RETRIES=2
```

### 3. Start the development server

```bash
bun run dev
```

Open `http://localhost:3000` in your browser.

### 4. Build for production

```bash
bun run build
bun run start
```

## Configuration

The web application validates all environment variables with Zod in [src/lib/env.ts](src/lib/env.ts):

| Variable                  | Default                 | Description                                                  |
| ------------------------- | ----------------------- | ------------------------------------------------------------ |
| `APP_ORIGIN`              | `http://localhost:3000` | Canonical site origin used for URLs, metadata and CORS.      |
| `TRUST_PROXY`             | `false`                 | Trust `X-Forwarded-For` headers behind reverse proxies.      |
| `LOG_LEVEL`               | `info`                  | Minimum logging severity (`debug`, `info`, `warn`, `error`). |
| `XOBOARD_VERSION`         | `1.0.0`                 | Released Xoboard APK version identifier.                     |
| `XOBOARD_APK_PATH`        | `downloads/Xoboard.apk` | Path to the distributable Android APK file.                  |
| `GITHUB_REPO`             | `xodobyte/xoboard`      | Upstream repository to query for live stats.                 |
| `GITHUB_TOKEN`            | `undefined`             | Optional personal access token for higher GitHub API limits. |
| `RATE_LIMIT_WINDOW_MS`    | `60000`                 | Window size for general rate limiting in milliseconds.       |
| `RATE_LIMIT_MAX`          | `120`                   | Maximum requests per IP window across general routes.        |
| `DOWNLOAD_RATE_LIMIT_MAX` | `5`                     | Maximum APK downloads per IP window.                         |
| `ABUSE_STRIKE_LIMIT`      | `10`                    | Strikes before temporary IP blocking is triggered.           |
| `ABUSE_WINDOW_MS`         | `600000`                | Timeframe to count abuse strikes (10 minutes).               |
| `ABUSE_BLOCK_MS`          | `900000`                | Duration of temporary IP block (15 minutes).                 |
| `MAX_BODY_BYTES`          | `10240`                 | Maximum payload size permitted for incoming API calls.       |
| `UPSTREAM_TIMEOUT_MS`     | `4000`                  | Timeout for external GitHub API requests.                    |
| `UPSTREAM_RETRIES`        | `2`                     | Retry attempts for transient upstream API failures.          |

## Web & API Endpoints

| Route                       | Method | Description                                              |
| --------------------------- | ------ | -------------------------------------------------------- |
| `/`                         | GET    | Landing page, keyboard feature showcase and installation |
| `/api/v1/downloads/xoboard` | GET    | Secure direct download of `Xoboard.apk`                  |
| `/api/v1/stats`             | GET    | Upstream GitHub stars/forks and APK file metadata        |
| `/api/v1/faqs`              | GET    | Filterable, paginated and searchable technical FAQ list  |
| `/robots.txt`               | GET    | Search engine crawler instructions                       |
| `/sitemap.xml`              | GET    | Dynamic XML sitemap                                      |

## Project Structure

```
xoboard/
├── downloads/
│   └── Xoboard.apk            # Distributable standalone Android APK (~57.7 KB)
├── public/                    # Web manifest, icons and favicon assets
├── src/
│   ├── app/
│   │   ├── api/v1/            # API endpoints (downloads, stats, faqs)
│   │   ├── layout.tsx         # Root layout, fonts and SEO structured data
│   │   ├── page.tsx           # Landing page assembly
│   │   └── globals.css        # Tailwind CSS and theme design tokens
│   ├── components/            # UI components (Hero, Features, Themes, Stats, etc.)
│   ├── lib/
│   │   ├── api.ts             # Standardized API response and error wrappers
│   │   ├── apk.ts             # APK file inspection and metadata extraction
│   │   ├── clientip.ts        # IP extraction with proxy verification
│   │   ├── cors.ts            # CORS origin validation and headers
│   │   ├── env.ts             # Zod environment schema and validation
│   │   ├── errors.ts          # RFC 7807 problem details error handling
│   │   ├── faqs.ts            # Curated FAQ repository data
│   │   ├── github.ts          # GitHub API integration with retry logic
│   │   ├── logger.ts          # Structured JSON logger
│   │   ├── ratelimit.ts       # In-memory sliding window rate limiter
│   │   ├── site.ts            # Canonical site URLs and global strings
│   │   └── validation.ts      # Query parameter schema parsing
│   └── proxy.ts               # Security firewall and traffic proxy
├── LICENSE                    # MIT License
├── next.config.ts             # Next.js compiler and caching configuration
├── package.json               # Scripts and dependencies
└── tsconfig.json              # Strict TypeScript configuration
```

## Android App Setup (Building from Source)

The Android keyboard application is built entirely from code:

### 1. Build prerequisites

- JDK 17
- Android SDK (`platform-tools`, `platforms;android-35`, `build-tools;36.0.0`)
- Android Gradle Plugin 9.4.0 (minSdk 26, compileSdk 35)

### 2. Debug build & install

```bash
# Connect device or launch emulator via ADB
./gradlew installDebug
```

### 3. Enable keyboard

1. Open the Xoboard app on your Android device.
2. Tap **Enable keyboard** -> toggle Xoboard on in System Language & Input settings.
3. Tap **Choose active keyboard** -> select Xoboard.
4. Switch to any text field and type!

## Development

```bash
# Start development server
bun run dev

# Run typechecking
bun run typecheck

# Run ESLint
bun run lint

# Format code with Prettier
bun run format
```

## Contributing

Contributions are welcome! Please keep changes focused, adhere to the strict TypeScript guidelines, run `bun run typecheck && bun run lint` before submitting and ensure the zero-external-dependencies principle is maintained.

## License

This project is available under the [MIT License](LICENSE).
