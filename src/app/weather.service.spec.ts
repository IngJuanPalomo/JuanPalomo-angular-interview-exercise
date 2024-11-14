import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { environment } from '../environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather data from the API', () => {
    const dummyWeatherData = {
      weather: [{ description: 'clear sky' }],
      main: { temp: 295.15 }
    };

    const city = 'London';
    const apiUrl = environment.apiUrl;

    service.getTemperature('London').subscribe(data => {
      expect(data).toEqual(dummyWeatherData);
    });

    const req = httpMock.expectOne(`${apiUrl}/${city}/observations?limit=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyWeatherData);

    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
