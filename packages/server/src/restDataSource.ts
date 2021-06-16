import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class IconsFinderAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.iconfinder.com/v4/';
    }

    willSendRequest(req: RequestOptions) {
        req.headers.set('Authorization', `Bearer ${process.env.ICONSFINDER_TOKEN}`);
    }

    async getIconSets() {
        return this.get('iconsets', {
            count: 1,
        });
    }

    async getIconSetIcons({ id }: { id: string }) {
        return this.get(`iconsets/${id}/icons`);
    }
}
