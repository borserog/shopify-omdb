import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominatedItemComponent } from './nominated-item.component';

describe('NominatedItemComponent', () => {
  let component: NominatedItemComponent;
  let fixture: ComponentFixture<NominatedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominatedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominatedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
