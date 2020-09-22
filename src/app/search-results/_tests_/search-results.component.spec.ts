import { HttpClient, HttpHandler } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Subject } from "rxjs";
import { mockSearchResults } from "src/app/utils/mock-data";
import {
  SearchDetail,
  SearchShowsService,
} from "src/services/search-shows.service";

import { SearchResultsComponent } from "../search-results.component";

describe("SearchResultsComponent", () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let searchResults$ = new Subject<SearchDetail[]>();
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SearchResultsComponent],
      providers: [
        {
          provide: SearchShowsService,
          useValue: { searchShows: () => searchResults$ },
        },
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it("should show search results", () => {
    const spyRoute = jest.spyOn(route.params, "subscribe");
    component.ngOnInit();
    spyRoute.mock.calls[0][0]({ query: "query" });
    fixture.detectChanges();

    searchResults$.next(mockSearchResults);
    fixture.detectChanges();

    component.searchResults$.subscribe((data) => {
      expect(data).toEqual(mockSearchResults);
    });
    expect(spyRoute).toBeCalled();
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it("goToDetailsPage - should navigate to details for the show", () => {
    const showId = 123;
    const mockNavigateByUrl = jest.fn();
    router.navigateByUrl = mockNavigateByUrl;

    component.goToDetailsPage(
      ({ preventDefault: jest.fn() } as unknown) as Event,
      showId
    );

    expect(mockNavigateByUrl).toBeCalledWith(`/show/123`);
  });
});
