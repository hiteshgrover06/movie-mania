import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const apiHost = `http://api.tvmaze.com`;

export interface Shows {
  [id: string]: ShowDetail[];
}

export interface SearchDetail {
  score: number;
  show: ShowDetail;
}

export interface ShowDetail {
  id: number; // 1;
  url: string; //'http://www.tvmaze.com/shows/1/under-the-dome';
  name: string; // 'Under the Dome';
  type: string; //  'Scripted';
  language: string; // 'English';
  genres: string[]; // ['Drama', 'Science-Fiction', 'Thriller'];
  status: string; //'Ended';
  runtime: number; // duration in minutes 60;
  premiered: string; // date '2013-06-24';
  officialSite: string; //'http://www.cbs.com/shows/under-the-dome/';
  schedule: {
    time: string; // '22:00';
    days: string[]; // ['Thursday'];
  };
  rating: {
    average: number; // 6.5;
  };
  weight: number; // 97;
  network: {
    id: number; // 2;
    name: string; // 'CBS';
    country: {
      name: string; // 'United States';
      code: string; // 'US';
      timezone: string; // 'America/New_York';
    };
  };
  webChannel: Object;
  externals: {
    tvrage: number; // 25988;
    thetvdb: number; //264492;
    imdb: string; // 'tt1553656';
  };
  image: {
    medium: string; // 'http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg';
    original: string; // 'http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg';
  };
  summary: string; // '<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>';
  updated: number; // 1573667713;
  _links: {
    self: {
      href: string; // 'http://api.tvmaze.com/shows/1';
    };
    nextepisode?: {
      href: string; // 'http://api.tvmaze.com/episodes/185054';
    };
    previousepisode?: {
      href: string; // 'http://api.tvmaze.com/episodes/185054';
    };
  };
}

@Injectable()
export class SearchShowsService {
  constructor(private readonly http: HttpClient) {}

  searchShows(query: string): Observable<SearchDetail[]> {
    return this.http.get<SearchDetail[]>(`${apiHost}/search/shows?q=${query}`);
  }

  getShowsBasedOnGenre(): Observable<ShowDetail[]> {
    return this.http.get<ShowDetail[]>(`${apiHost}/shows`);
  }

  getShowDetails(showId: string): Observable<ShowDetail> {
    return this.http.get<ShowDetail>(`${apiHost}/shows/${showId}`);
  }
}
