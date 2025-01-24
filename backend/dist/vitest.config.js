"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        include: ['src/**/*.spec.ts'],
        environment: 'node',
        globals: true,
    },
});
//# sourceMappingURL=vitest.config.js.map