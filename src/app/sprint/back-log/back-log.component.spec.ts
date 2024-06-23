import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackLogComponent } from './back-log.component';

describe('BackLogComponent', () => {
  let component: BackLogComponent;
  let fixture: ComponentFixture<BackLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
