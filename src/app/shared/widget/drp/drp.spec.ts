import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Drp } from './drp';

describe('Drp', () => {
  let component: Drp;
  let fixture: ComponentFixture<Drp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Drp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Drp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
