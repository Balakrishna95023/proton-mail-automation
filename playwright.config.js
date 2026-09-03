import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './tests',

    timeout: 100 * 1000,

    expect: {
        timeout: 10_000
    },

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 2 : undefined,

    reporter: [
        ['list'],
        ['html', {
            outputFolder: 'reports/html',
            open: 'never'
        }]
    ],

    use: {
        baseURL: process.env.BASE_URL,

        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',

        headless: false,

        viewport: {
            width: 1440,
            height: 900
        }
    },

    projects: [
        {
            name: 'setup',
            testMatch: /auth\.setup\.js/
        },
        {
            name: 'chromium',
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Chrome'],
                storageState: '.auth/sender.json'
            }
        }
    ]
});