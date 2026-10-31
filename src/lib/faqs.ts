export type Faq = {
  id: string;
  position: number;
  category: 'general' | 'install' | 'privacy' | 'customization';
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    id: 'what-is-xoboard',
    position: 1,
    category: 'general',
    question: 'What is Xoboard?',
    answer:
      'Xoboard is a lightweight, fully code-driven Android keyboard (IME) built entirely with the Android SDK and zero XML layouts. It features an emoji panel with glyph filtering, 21 Unicode font styles, a clipboard history manager and a native theming system.',
  },
  {
    id: 'zero-xml',
    position: 2,
    category: 'general',
    question: 'What does "no XML layouts" mean?',
    answer:
      'Every single view, button, keycap, toolbar and settings activity is constructed purely in Java code. There is zero XML layout inflation overhead, keeping the footprint tiny and execution instantaneous.',
  },
  {
    id: 'supported-android',
    position: 3,
    category: 'install',
    question: 'Which Android versions and build tools are required?',
    answer:
      'Xoboard requires Android 8.0+ (compileSdk 35, minSdk 26). It is built with Android Gradle Plugin 9.4.0 and JDK 17.',
  },
  {
    id: 'how-to-install',
    position: 4,
    category: 'install',
    question: 'How do I enable and activate Xoboard?',
    answer:
      'Install the APK, open the Xoboard launcher app, tap "Enable keyboard" to turn it on in system settings, then tap "Choose active keyboard" to select Xoboard as your default input method.',
  },
  {
    id: 'font-styles',
    position: 5,
    category: 'customization',
    question: 'How do the 21 Unicode font styles work?',
    answer:
      'Styles (such as Bold, Fraktur, Monospace, Strikethrough, Small Caps and Circled) map typed letters to their target Unicode mathematical or alphanumeric blocks live as you type. Switching styles mid-word automatically converts the word or selection.',
  },
  {
    id: 'clipboard-history',
    position: 6,
    category: 'privacy',
    question: 'How does the clipboard history manager work on Android 10+?',
    answer:
      'Android 10+ restricts background processes from reading the clipboard. Xoboard captures changes directly when the keyboard is open and visible on screen (within the allowed system window). Tap any clip to paste, swipe/tap to delete or configure retention limits.',
  },
  {
    id: 'theming',
    position: 7,
    category: 'customization',
    question: 'How does theming work?',
    answer:
      'Xoboard supports System (matches device dark/light mode), Light, Dark and Custom themes. Custom themes let you specify custom #RRGGBB hex values for four tokens: Background, Keys, Text and Accent.',
  },
  {
    id: 'dependencies-and-privacy',
    position: 8,
    category: 'privacy',
    question: 'Does Xoboard use any third-party libraries or send data?',
    answer:
      'Zero external dependencies. The codebase strictly uses standard Android SDK APIs. There is no tracking, no external network calls, no analytics and no third-party SDKs.',
  },
];
