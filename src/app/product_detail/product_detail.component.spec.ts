/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Product_detailComponent } from './product_detail.component';

describe('Product_detailComponent', () => {
  let component: Product_detailComponent;
  let fixture: ComponentFixture<Product_detailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Product_detailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Product_detailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
