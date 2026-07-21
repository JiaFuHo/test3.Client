import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ipt } from './ipt';

describe('Ipt', () => {
  let component: Ipt;
  let fixture: ComponentFixture<Ipt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ipt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ipt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
