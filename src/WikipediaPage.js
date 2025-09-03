class WikipediaPage {
    constructor(browser) {
        this.browser = browser;
    }

    async open() {
        await this.browser.url('https://www.wikipedia.org');
    }

    async getTitle() {
        return await this.browser.getTitle();
    }

    async search(term) {
        const searchBox = await this.browser.$('input[name="search"]');
        await searchBox.setValue(term);
        await this.browser.keys('Enter');
    }

    async getMainHeading() {
        await this.browser.$('span.mw-page-title-main').waitForExist({ timeout: 20000 });
        const heading = await this.browser.$('span.mw-page-title-main');
        return await heading.getText();
    }

    async scrollToHeight(height) {
        await this.browser.execute(`window.scrollTo(0, ${height})`);
    }
}

module.exports = WikipediaPage;
