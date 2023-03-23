import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLibroComponent } from './add-edit-libro.component';

describe('AddEditLibroComponent', () => {
  let component: AddEditLibroComponent;
  let fixture: ComponentFixture<AddEditLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
