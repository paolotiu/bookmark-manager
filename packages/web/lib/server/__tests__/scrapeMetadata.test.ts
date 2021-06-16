import { scrapeMetadata } from '@lib/server/scrapeMetadata';

it('Scraping works', async () => {
    const res = await scrapeMetadata(
        'https://www.reddit.com/r/PinoyProgrammer/comments/nb9e9u/website_for_covid19_contact_tracing/',
    );
    expect(res?.success).toBeTruthy();
});
