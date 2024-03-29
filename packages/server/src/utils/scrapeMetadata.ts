import ogs from 'open-graph-scraper';

export const scrapeMetadata = async (url: string) => {
    try {
        const { result, error } = await ogs({ url });
        if (error || result.success !== true) {
            return null;
        }

        return result;
    } catch (e) {
        return null;
    }
};
