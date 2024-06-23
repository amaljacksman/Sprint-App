import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintMainComponent } from './sprint-main.component';

describe('SprintMainComponent', () => {
  let component: SprintMainComponent;
  let fixture: ComponentFixture<SprintMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
