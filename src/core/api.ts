import { NewsFeed, NewsDetail, News } from '../types';

export class Api {
    xhr: XMLHttpRequest;
    url: string;

    constructor(url: string) {
        this.xhr = new XMLHttpRequest();
        this.url = url;
    }

    // xhr의 다음 버전 보완재로 나오는 차세대 API
    async request<AjaxResponse>(): Promise<AjaxResponse> {
        const response = await fetch(this.url); // 동기 처럼 보인다?
        return await response.json() as AjaxResponse
        // fetch(this.url)
        //     .then(response => response.json())
        //     .then(cb)
        //     .catch(() => {
        //         console.error('데이터를 불러오지 못했습니다.')
        //     })
    }

}

export class NewsFeedApi extends Api {
    constructor(url: string) {
        super(url);
    }
    async getData(): Promise<NewsFeed[]> {
        return this.request<NewsFeed[]>();
    }
}

export class NewsDetailApi extends Api {
    constructor(url: string) {
        super(url);
    }
    async getData(): Promise<NewsDetail> {
        return this.request<NewsDetail>();
    }
}