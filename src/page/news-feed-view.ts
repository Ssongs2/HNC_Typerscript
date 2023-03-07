import View from "../core/view";
import { NewsFeed, NewsStore } from "../types";
import { NewsFeedApi } from "../core/api";
import { NEWS_URL } from "../config";


const template = `
        <div class="bg-gray-600 min-h-screen">
        <div class="bg-white text-xl">
          <div class="mx-auto px-4">
            <div class="flex justify-between items-center py-6">
              <div class="flex justify-start">
                <h1 class="font-extrabold">Hacker News</h1>
              </div>
              <div class="items-center justify-end">
                <a href="#/page/{{__prevpage__}}" class="text-gray-500">
                  Previous
                </a>
                <a href="#/page/{{__nextpage__}}" class="text-gray-500 ml-4">
                  Next
                </a>
              </div>
            </div> 
          </div>
        </div>
        <div class="p-4 text-2xl text-gray-700">
          {{__newsfeed__}}        
        </div>
      </div>
        `
export default class NewsFeedView extends View {
  private api: NewsFeedApi;
  private store: NewsStore;

  constructor(containerId: string, store: NewsStore) { // 생성자 - 인스턴스를 만들어놓고 계속 쓰기위함.
    // 상위클래스로부터 extends 받으면
    // 반드시 상위클래스의 생성자를 명시적으로 호출해줘야함. 

    super(containerId, template);

    this.store = store;
    this.api = new NewsFeedApi(NEWS_URL);

  }

  render(): void {
    this.store.currentPage = Number(location.hash.substr(7) || 1)


    if (!this.store.hasFeeds) {
      // newsFeed = store.feeds = makeFeeds(getData<NewsFeed[]>(NEWS_URL));
      this.api.getDatawithPromise((feeds: NewsFeed[]) => {

        this.store.setFeeds(feeds);
        this.renderView();
      })
    }

    this.renderView();

  }

  renderView = () => {
    for (let i = (this.store.currentPage - 1) * 10; i < this.store.currentPage * 10; i++) {
      const { id, title, comments_count, user, points, time_ago, read } = this.store.getFeed(i);
      // innerHTML이 HTML로 변환시켜준다는 뜻.
      this.addHtml(
        `
                <div class="p-6 ${read ? 'bg-red-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
                <div class="flex">
                  <div class="flex-auto">
                    <a href="#/show/${id}">${title}</a>  
                  </div>
                  <div class="text-center text-sm">
                    <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${comments_count}</div>
                  </div>
                </div>
                <div class="flex mt-3">
                  <div class="grid grid-cols-3 text-sm text-gray-500">
                    <div><i class="fas fa-user mr-1"></i>${user}</div>
                    <div><i class="fas fa-heart mr-1"></i>${points}</div>
                    <div><i class="far fa-clock mr-1"></i>${time_ago}</div>
                  </div>  
                </div>
              </div>    
        `);
    }

    this.setTemplateData('newsfeed', this.getHtml());
    this.setTemplateData('prevpage', String(this.store.prevPage));
    this.setTemplateData('nextpage', String(this.store.nextPage));

    this.updateView();
  }
  // private makeFeeds(): void {
  //   for (let i = 0; i < this.feeds.length; i++) {
  //     this.feeds[i].read = false;
  //   }
  //   this.store.totalPage = Number(this.feeds.length / 10);
  // }
}
