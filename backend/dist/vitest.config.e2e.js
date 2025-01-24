"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        include: ['test/**/*.e2e-spec.ts'],
        environment: 'node',
        globals: true,
        setupFiles: ['test/setup.ts'],
    },
});
//# sourceMappingURL=vitest.config.e2e.js.map