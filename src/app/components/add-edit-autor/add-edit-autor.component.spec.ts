import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAutorComponent } from './add-edit-autor.component';

describe('AddEditAutorComponent', () => {
  let component: AddEditAutorComponent;
  let fixture: ComponentFixture<AddEditAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
