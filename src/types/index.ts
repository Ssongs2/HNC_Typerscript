import View from "../core/view";

// 접근이 되게 해야 돼.
export interface NewsStore {
    getAllFeeds: () => NewsFeed[];
    getFeed: (position: number) => NewsFeed;
    setFeeds: (feeds: NewsFeed[]) => void;
    makeRead: (id: number) => void
    // 외부로 들어가는 형식으로 작성을 해야 됨.
    hasFeeds: boolean;
    currentPage: number;
    numberOfFeed: number;
    nextPage: number;
    prevPage: number;
}

export interface Store {
    currentPage: number;
    totalPage: number;
    feeds: NewsFeed[];
}

export interface News {
    readonly id: number;
    readonly time_ago: string;
    readonly title: string;
    readonly url: string;
    readonly user: string;
    readonly content: string;
}

export interface NewsFeed extends News {
    readonly comments_count: number;
    readonly points: number;
    read?: boolean; // ? optional property
}

export interface NewsDetail extends News {
    readonly comments: NewsComments[];
}

export interface NewsComments extends News {
    readonly comments: NewsComments[];
    readonly level: number;
}

export interface RouteInfo {
    path: string;
    page: View;
}