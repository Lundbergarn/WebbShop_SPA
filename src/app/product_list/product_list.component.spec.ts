/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Product_listComponent } from './product_list.component';

describe('Product_listComponent', () => {
  let component: Product_listComponent;
  let fixture: ComponentFixture<Product_listComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Product_listComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Product_listComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
