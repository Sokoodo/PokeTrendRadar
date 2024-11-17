import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SealedPageComponent } from './sealed-page.component';

describe('SealedPageComponent', () => {
  let component: SealedPageComponent;
  let fixture: ComponentFixture<SealedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SealedPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SealedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
