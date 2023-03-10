import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzharComponent } from './izhar.component';

describe('IzharComponent', () => {
  let component: IzharComponent;
  let fixture: ComponentFixture<IzharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzharComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
