import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglesPageComponent } from './singles-page.component';

describe('SinglesPageComponent', () => {
  let component: SinglesPageComponent;
  let fixture: ComponentFixture<SinglesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
