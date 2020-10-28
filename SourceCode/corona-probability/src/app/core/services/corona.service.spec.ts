import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoronaService } from './corona.service';
import { CoronaData } from '../model/CoronaData';


describe('Service: CoronaService', () => {

  let service: CoronaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CoronaService]
    }).compileComponents();
  });

  beforeEach(inject([CoronaService], s => {
    service = s;
  }));

  it('should perform calculation', () => {

    let model = new CoronaData();
    model.foundProbability = 100;
    service.Calculate(model, 1, 200);

    expect(model.foundProbability).toBe(100);
  });

});
