import { HttpClient, HttpHandler } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SearchShowsService } from "src/services/car-details.service";

import { SearchResultsComponent } from "../search-results.component";

describe("SearchResultsComponent", () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SearchResultsComponent],
      providers: [SearchShowsService, HttpClient, HttpHandler],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it("should show search results", () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
