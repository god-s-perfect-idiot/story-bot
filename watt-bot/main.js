import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { ask } from '../oracle/main.js';

dotenv.config({path: './config/.env'})
puppeteer.use(StealthPlugin());

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const postStory = async (page, title, story) => {
    await page.goto('https://www.wattpad.com/myworks/new')
    await page.click('#main-edit-container > div > div.work-section > form > div.required-form-wrapper > div.form-group.title-form > div');
    await page.keyboard.type(title)
    await page.click('#main-edit-container > div > div.work-section > form > div.required-form-wrapper > div.form-group.description-form > textarea')
    await page.keyboard.type('From a long lost collection')
    await page.click('#edit-controls > div.actions.pull-right > button.btn.btn-orange.on-edit-save')
    await page.click('#popover821493 > div.popover-content > div.tooltip-footer > button')
    await page.waitForNavigation()
    await page.click('#story-title')
    await page.keyboard.type(title)
    await page.click('#writer-editor > div.story-editor.medium-editor-element.medium-editor-placeholder')
    await page.keyboard.type(story)
    await page.click('#writer-navigation > div.actions.pull-right > button.btn.btn-orange.on-publish')
    await page.waitForNavigation()
}

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.wattpad.com/login');
    await page.click('#authentication-panel > div > button');
    await page.waitForSelector('#login-username')
    await page.type('#login-username', process.env.USERNAME);
    await page.waitForSelector('#login-password')
    await page.type('#login-password', process.env.PASSWORD);
    await page.click('#login-form > input');
    await page.waitForNavigation();

    const files = await fs.promises.readdir("../library/temp")
    for(let file of files) {
        const filePath = path.join("../library/temp", file);
        const story = await fs.promises.readFile(filePath, 'utf-8');
        await postStory(page, file, story);
        await fs.promises.unlink(filePath);
    }
    // await fs.promises.readdir("../library/temp", async (err, files) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     files.forEach( async file => {
    //         const filePath = path.join("../library/temp", file);
    //         fs.readFile(filePath, 'utf8', async (err, data) => {
    //             if (err) {
    //                 console.error(err);
    //                 return;
    //             }
    //             const story = data.trim()
    //             const title = file;
    //             // const mainCharcters = (await ask(`Give me the names of main characters of the story as a comma separated list without anything else\n Story: ${story}`)).trim().split(',');
    //             await postStory(page, title, story);
    //             fs.unlinkSync(filePath)
    //         });
    //     });
    // });
    await browser.close();
})();