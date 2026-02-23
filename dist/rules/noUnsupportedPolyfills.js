import fs from "node:fs";
import path from "node:path";
const WEB_CRYPTO_INDICATORS = [
    "window.crypto.subtle",
    "window.crypto.getRandomValues",
    "crypto.subtle",
    "crypto.getRandomValues",
];
const NODE_CRYPTO_INDICATORS = [
    "crypto.createHash",
    "crypto.randomBytes",
    "crypto.pbkdf2",
    "crypto.createHmac",
    "crypto.createCipher",
];
const POLYFILL_APIS = {
    assert: {
        message: "Node.js assert API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]assert['"]/mv,
            /require\(['"]assert['"]\)/v,
            "assert.ok",
            "assert.equal",
            "assert.strictEqual",
        ],
        polyfillName: "assert",
    },
    buffer: {
        message: "Buffer API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]buffer['"]/mv,
            /require\(['"]buffer['"]\)/v,
            "Buffer.from",
            "Buffer.alloc",
            "Buffer.isBuffer",
            /new Buffer\(/v,
        ],
        polyfillName: "buffer",
    },
    crypto: {
        message: "Node.js crypto API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]crypto['"]/mv,
            /require\(['"]crypto['"]\)/v,
            "crypto.createHash",
            "crypto.randomBytes",
            "crypto.pbkdf2",
            "crypto.createHmac",
            "crypto.createCipher",
        ],
        polyfillName: "crypto-browserify",
        skipIfWebCryptoOnly: true,
    },
    events: {
        message: "Node.js events API requires polyfill in browser environment",
        patterns: [
            /^import.*EventEmitter.*from ['"]events['"]/mv,
            /require\(['"]events['"]\)/v,
            "events.EventEmitter",
        ],
        polyfillName: "events",
    },
    os: {
        message: "Node.js os API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]os['"]/mv,
            /require\(['"]os['"]\)/v,
            "os.platform",
            "os.arch",
            "os.EOL",
        ],
        polyfillName: "os-browserify/browser",
    },
    path: {
        message: "Node.js path API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]path['"]/mv,
            /require\(['"]path['"]\)/v,
            "path.join",
            "path.resolve",
            "path.dirname",
        ],
        polyfillName: "path-browserify",
    },
    process: {
        message: "Node.js process API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]process['"]/mv,
            /require\(['"]process['"]\)/v,
            "process.env",
            "process.nextTick",
        ],
        polyfillName: "process/browser",
    },
    punycode: {
        message: "Node.js punycode API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]punycode['"]/mv,
            /require\(['"]punycode['"]\)/v,
            "punycode.encode",
            "punycode.decode",
        ],
        polyfillName: "punycode",
    },
    querystring: {
        message: "Node.js querystring API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]querystring['"]/mv,
            /require\(['"]querystring['"]\)/v,
            "querystring.parse",
            "querystring.stringify",
        ],
        polyfillName: "querystring-es3",
    },
    stream: {
        message: "Node.js stream API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]stream['"]/mv,
            /require\(['"]stream['"]\)/v,
            "stream.Readable",
            "stream.Writable",
            "stream.Transform",
        ],
        polyfillName: "stream-browserify",
    },
    string_decoder: {
        message: "Node.js string_decoder API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]string_decoder['"]/mv,
            /require\(['"]string_decoder['"]\)/v,
            "StringDecoder",
        ],
        polyfillName: "string_decoder",
    },
    sys: {
        message: "Node.js sys API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]sys['"]/mv,
            /require\(['"]sys['"]\)/v,
            "sys.inspect",
        ],
        polyfillName: "util",
    },
    timers: {
        message: "Node.js timers API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]timers['"]/mv,
            /require\(['"]timers['"]\)/v,
            "setImmediate",
            "clearImmediate",
        ],
        polyfillName: "timers-browserify",
    },
    tty: {
        message: "Node.js tty API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]tty['"]/mv,
            /require\(['"]tty['"]\)/v,
            "tty.isatty",
        ],
        polyfillName: "tty-browserify",
    },
    url: {
        message: "Node.js url API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]url['"]/mv,
            /require\(['"]url['"]\)/v,
            "url.parse",
            "url.resolve",
            "url.format",
        ],
        polyfillName: "url",
    },
    util: {
        message: "Node.js util API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]util['"]/mv,
            /require\(['"]util['"]\)/v,
            "util.inspect",
            "util.promisify",
            "util.inherits",
        ],
        polyfillName: "util",
    },
    vm: {
        message: "Node.js vm API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]vm['"]/mv,
            /require\(['"]vm['"]\)/v,
            "vm.runInNewContext",
            "vm.runInThisContext",
        ],
        polyfillName: "vm-browserify",
    },
    zlib: {
        message: "Node.js zlib API requires polyfill in browser environment",
        patterns: [
            /^import.*from ['"]zlib['"]/mv,
            /require\(['"]zlib['"]\)/v,
            "zlib.gzip",
            "zlib.inflate",
            "zlib.deflate",
        ],
        polyfillName: "browserify-zlib",
    },
};
function checkViteConfig(cwd) {
    const viteConfigPath = path.join(cwd, "vite.config.mts");
    const configuredPolyfills = new Set();
    try {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        const content = fs.readFileSync(viteConfigPath, "utf8");
        // Estrategia 1: vite-plugin-node-polyfills (plugin centralizado)
        if (content.includes("vite-plugin-node-polyfills")) {
            parseNodePolyfillsPlugin(content, configuredPolyfills);
        }
        // Estrategia 2: alias manuales en resolve.alias
        const aliasMatch = /alias:\s*\{(?<content>[^\}]+)\}/v.exec(content);
        if (aliasMatch !== null) {
            for (const polyfillKey of Object.keys(POLYFILL_APIS)) {
                if (aliasMatch.groups?.content.includes(`${polyfillKey}:`) === true) {
                    configuredPolyfills.add(polyfillKey);
                }
            }
        }
    }
    catch {
        // vite.config.mts no encontrado — devolver set vacío
    }
    return configuredPolyfills;
}
function findMatchingLineIndex(lines, pattern) {
    return lines.findIndex((line) => matchesText(line, pattern));
}
function isWebCryptoOnly(text) {
    const hasWebCrypto = WEB_CRYPTO_INDICATORS.some((p) => text.includes(p));
    const hasNodeCrypto = NODE_CRYPTO_INDICATORS.some((p) => text.includes(p));
    return hasWebCrypto && !hasNodeCrypto;
}
function matchesText(text, pattern) {
    if (typeof pattern === "string") {
        return text.includes(pattern);
    }
    return pattern.test(text);
}
function parseNodePolyfillsPlugin(content, configuredPolyfills) {
    const includeMatch = /nodePolyfills\s*\(\s*\{[^\}]*include\s*:\s*\[(?<list>[^\]]+)\]/sv.exec(content);
    if (includeMatch === null) {
        // Plugin sin `include` explícito → cubre todos los polyfills conocidos
        for (const name of Object.keys(POLYFILL_APIS)) {
            configuredPolyfills.add(name);
        }
        return;
    }
    const { list = "" } = includeMatch.groups ?? {};
    const rawEntries = list.match(/['"](?<name>[^'"]+)['"]/gv) ?? [];
    for (const entry of rawEntries) {
        const name = entry.replaceAll(/['"]/gv, "");
        if (Object.hasOwn(POLYFILL_APIS, name)) {
            configuredPolyfills.add(name);
        }
    }
}
const noUnsupportedPolyfills = {
    create(context) {
        const configuredPolyfills = checkViteConfig(context.cwd);
        return {
            Program() {
                const text = context.sourceCode.getText();
                for (const [polyfillKey, config] of Object.entries(POLYFILL_APIS)) {
                    if (config.skipIfWebCryptoOnly === true && isWebCryptoOnly(text)) {
                        continue;
                    }
                    const matchedPattern = config.patterns.find((p) => matchesText(text, p));
                    if (matchedPattern === undefined) {
                        continue;
                    }
                    if (configuredPolyfills.has(polyfillKey)) {
                        continue;
                    }
                    const lines = text.split("\n");
                    const lineIndex = findMatchingLineIndex(lines, matchedPattern);
                    if (lineIndex !== -1) {
                        const column = typeof matchedPattern === "string"
                            ? (lines[lineIndex]?.indexOf(matchedPattern) ?? 0)
                            : 0;
                        context.report({
                            loc: { column, line: lineIndex + 1 },
                            message: `${config.message}. Configure '${polyfillKey}' via vite-plugin-node-polyfills or add '${polyfillKey}: "${config.polyfillName}"' to resolve.alias in vite.config.mts.`,
                        });
                    }
                }
            },
        };
    },
    meta: {
        docs: {
            category: "Best Practices",
            description: "Disallow Node.js APIs that require polyfills without proper configuration",
            recommended: true,
        },
        schema: [],
        type: "problem",
    },
};
export default noUnsupportedPolyfills;
//# sourceMappingURL=noUnsupportedPolyfills.js.map