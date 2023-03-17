import { NewsFeed, NewsStore } from './types';

// NewsStore를 구현한 Class임을 명시
export default class Store implements NewsStore {
    private feeds: NewsFeed[];
    private _currentPage: number;
    private totalPage: number;

    constructor() {
        this.feeds = [];
        this._currentPage = 1;
        this.totalPage = 1;
    }

    get currentPage() {
        return this._currentPage; // 내부에서 쓰는 경우 함수와 변수가 이름이 겹치면, _를 추가해줌.
    }

    set currentPage(page: number) {
        this._currentPage = page;
    }

    get nextPage(): number {
        return this.currentPage + 1 <= this.totalPage ? this.currentPage + 1 : this.currentPage
    }

    get prevPage(): number {
        return this._currentPage > 1 ? this._currentPage - 1 : 1
    }

    get numberOfFeed(): number {
        return this.feeds.length;
    }

    get hasFeeds(): boolean {
        return this.feeds.length > 0;
    }

    getAllFeeds(): NewsFeed[] {
        return this.feeds;
    }

    getFeed(position: number): NewsFeed {
        return this.feeds[position]
    }

    setFeeds(feeds: NewsFeed[]): void {
        this.feeds = feeds.map(feed => ({ // spead operator
            ...feed,
            read: false
        }));
        this.totalPage = Number(this.feeds.length / 10);
    }

    makeRead(id: number): void {
        const feed = this.feeds.find((feed: NewsFeed) => feed.id === id);

        if (feed) {
            feed.read = true;
        }
    }
}