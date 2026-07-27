import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSearch } from './modal-search';

describe('ModalSearch', () => {
  let component: ModalSearch;
  let fixture: ComponentFixture<ModalSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
